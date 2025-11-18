import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Enter a keyword to analyze (e.g. 'linen dress', 'minimalist wall art')..."
          className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-slate-200 focus:border-etsy-orange focus:ring-4 focus:ring-orange-100 outline-none transition-all text-lg shadow-sm text-slate-700 placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
        />
        <div className="absolute left-4 text-slate-400">
            <Search size={24} />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 h-10 px-6 bg-etsy-orange hover:bg-orange-600 text-white rounded-full font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Analyze'}
        </button>
      </form>
      <p className="text-center text-xs text-slate-400 mt-3">
        Powered by Gemini 2.5 • Real-time Etsy Grounding • Deep Scrape Simulation
      </p>
    </div>
  );
};

export default SearchBar;