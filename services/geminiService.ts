import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../types";

// Initialize client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Parses the raw text response from Gemini, removing Markdown code blocks if present.
 */
const parseJSON = (text: string): any => {
  try {
    // Remove markdown code blocks like ```json ... ```
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    console.error("Raw Text:", text);
    throw new Error("Failed to parse AI response. The model might be overloaded or returned invalid format.");
  }
};

export const analyzeKeyword = async (keyword: string): Promise<{ result: AnalysisResult; sources: GroundingSource[] }> => {
  const modelId = "gemini-2.5-flash";

  // We rely on the prompt to enforce strict constraints because 
  // responseSchema is NOT allowed when using the googleSearch tool.
  const prompt = `
    You are an expert Etsy SEO Strategist and Data Analyst.
    
    TASK:
    Perform a "Deep Scrape Simulation" for the keyword: "${keyword}".
    You MUST use the Google Search tool.
    Your search query MUST be: "${keyword} site:etsy.com".
    
    STRICT RULES FOR DATA EXTRACTION:
    1. **Evidence-Based Only:** Do NOT hallucinate search volumes. Look at the search snippets for "X bought in past month", number of reviews, or "Bestseller" badges. 
    2. **Volume Estimation:** If you see "1k+ bought in past month", estimate volume as High. If snippets are sparse, volume is Low.
    3. **Competition:** Analyze the number of results found in your search.
    4. **Trends:** Infer seasonality based on the keyword type (e.g., "Christmas" = Q4 spike, "Wedding" = Summer/Spring spike) combined with any recent dates in search snippets.

    OUTPUT FORMAT:
    Return ONLY a raw, valid JSON object. Do not include any markdown formatting or explanation outside the JSON.
    
    The JSON structure must be:
    {
      "score": number (0-100 based on opportunity vs competition),
      "searchVolumeLabel": string (e.g., "High (Monthly 5k+)", "Medium", "Low"),
      "competitionLabel": string (e.g., "Very High", "Moderate", "Low"),
      "trendDescription": string (Short insight about seasonality),
      "trendData": [
        { "month": "Jan", "interest": number (0-100) },
        ... (for all 12 months)
      ],
      "relatedKeywords": [
        { 
          "keyword": string (Long tail variation found in titles), 
          "searchVolume": string (Estimate), 
          "ctr": string (Estimate e.g. "2.5%"), 
          "competition": "Low" | "Medium" | "High",
          "cpc": string (Estimate e.g. "$0.40")
        }
      ],
      "marketLeaders": [
        { "title": string (Exact title from search result), "price": string, "salesIndicator": string (e.g. "2k+ reviews") }
      ],
      "generatedTitles": [
        string (3 optimized, keyword-stuffed titles based on the high-performing competitors found)
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.1, // Force analytical, deterministic output
        tools: [{ googleSearch: {} }], // Enable Search Grounding
      },
    });

    const rawText = response.text;
    if (!rawText) throw new Error("No content generated");

    const parsedData = parseJSON(rawText) as AnalysisResult;

    // Extract and Filter Grounding Chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Filter for unique etsy.com links only
    const uniqueSources = new Map<string, GroundingSource>();
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        const uri = chunk.web.uri;
        // Strict filter: Must be from Etsy
        if (uri.includes('etsy.com')) {
            uniqueSources.set(uri, {
                title: chunk.web.title,
                uri: uri
            });
        }
      }
    });

    return {
      result: parsedData,
      sources: Array.from(uniqueSources.values())
    };

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};