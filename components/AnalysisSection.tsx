import React from 'react';
import { MarketLeader } from '../types';
import { CheckCircle, Trophy } from 'lucide-react';

interface AnalysisSectionProps {
  marketLeaders: MarketLeader[];
  generatedTitles: string[];
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ marketLeaders, generatedTitles }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* AI Generated Titles */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-etsy-orange"></div>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg text-etsy-orange">
                <CheckCircle size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">AI Optimized Titles</h3>
        </div>
        <div className="space-y-4">
            {generatedTitles.map((title, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed hover:bg-orange-50 hover:border-orange-200 transition-colors cursor-pointer group">
                    <span className="font-semibold text-etsy-orange mr-2">Option {i + 1}:</span>
                    {title}
                </div>
            ))}
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Trophy size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Top Ranking Competitors</h3>
        </div>
        <div className="space-y-4">
            {marketLeaders.slice(0, 3).map((leader, i) => (
                <div key={i} className="flex justify-between items-start p-3 border-b border-slate-50 last:border-0">
                    <div className="flex-1 pr-4">
                        <p className="text-sm text-slate-700 font-medium line-clamp-2">{leader.title}</p>
                        {leader.salesIndicator && (
                            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {leader.salesIndicator}
                            </span>
                        )}
                    </div>
                    <div className="text-right whitespace-nowrap">
                         <span className="block text-sm font-bold text-slate-900">{leader.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;