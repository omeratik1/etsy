export interface TrendPoint {
  month: string;
  interest: number; // 0-100
}

export interface RelatedKeyword {
  keyword: string;
  searchVolume: string;
  ctr: string;
  competition: 'Low' | 'Medium' | 'High';
  cpc: string;
}

export interface MarketLeader {
  title: string;
  price: string;
  shopName?: string;
  salesIndicator?: string; // e.g., "2k+ bought"
}

export interface AnalysisResult {
  score: number; // 0-100
  searchVolumeLabel: string; // e.g. "High (10k+)"
  competitionLabel: string; // e.g. "Very High"
  trendDescription: string;
  trendData: TrendPoint[];
  relatedKeywords: RelatedKeyword[];
  marketLeaders: MarketLeader[];
  generatedTitles: string[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AppState {
  isLoading: boolean;
  data: AnalysisResult | null;
  groundingSources: GroundingSource[];
  error: string | null;
}