import React, { useState } from 'react';
import { Activity, BarChart3, Target, Zap } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MetricCard from './components/MetricCard';
import TrendChart from './components/TrendChart';
import KeywordTable from './components/KeywordTable';
import AnalysisSection from './components/AnalysisSection';
import SourcesSidebar from './components/SourcesSidebar';
import { analyzeKeyword } from './services/geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    data: null,
    groundingSources: [],
    error: null
  });

  const handleSearch = async (keyword: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { result, sources } = await analyzeKeyword(keyword);
      setState({
        isLoading: false,
        data: result,
        groundingSources: sources,
        error: null
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "An unexpected error occurred while analyzing the keyword."
      }));
    }
  };

  return (
    <div className="min-h-screen bg-etsy-bg pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} isLoading={state.isLoading} />

        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {state.error}
          </div>
        )}

        {/* Loading Skeleton / State */}
        {state.isLoading && (
            <div className="text-center py-20 animate-pulse">
                 <div className="text-2xl font-medium text-slate-400">Scanning Etsy Ecosystem...</div>
                 <div className="mt-2 text-sm text-slate-400">Simulating deep scrape of {state.groundingSources.length > 0 ? state.groundingSources.length : 'multiple'} pages</div>
            </div>
        )}

        {/* Main Dashboard */}
        {!state.isLoading && state.data && (
          <div className="animate-fade-in">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard 
                title="Opportunity Score" 
                value={state.data.score} 
                icon={Zap} 
                colorClass="text-orange-600 bg-orange-100"
                scoreColor={true}
                subValue="Out of 100"
              />
              <MetricCard 
                title="Est. Search Volume" 
                value={state.data.searchVolumeLabel} 
                icon={Activity}
                colorClass="text-blue-600 bg-blue-100"
              />
              <MetricCard 
                title="Competition Level" 
                value={state.data.competitionLabel} 
                icon={Target}
                colorClass="text-purple-600 bg-purple-100"
              />
               <MetricCard 
                title="Trend Status" 
                value={state.data.trendDescription.split(' ')[0]} 
                subValue={state.data.trendDescription}
                icon={BarChart3}
                colorClass="text-green-600 bg-green-100"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Column */}
              <div className="flex-1 space-y-8">
                <AnalysisSection 
                    marketLeaders={state.data.marketLeaders} 
                    generatedTitles={state.data.generatedTitles} 
                />
                
                <TrendChart data={state.data.trendData} />
                
                <KeywordTable keywords={state.data.relatedKeywords} />
              </div>

              {/* Sidebar Column */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <SourcesSidebar sources={state.groundingSources} />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!state.isLoading && !state.data && !state.error && (
            <div className="text-center py-20 opacity-50">
                <div className="inline-block p-6 rounded-full bg-white shadow-sm mb-4">
                    <BarChart3 size={48} className="text-slate-300" />
                </div>
                <h2 className="text-xl font-medium text-slate-500">Ready to dominate Etsy Search?</h2>
                <p className="text-slate-400 mt-2">Enter a keyword above to generate a comprehensive report.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;