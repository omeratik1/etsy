import React from 'react';
import { RelatedKeyword } from '../types';
import { ArrowRight } from 'lucide-react';

interface KeywordTableProps {
  keywords: RelatedKeyword[];
}

const KeywordTable: React.FC<KeywordTableProps> = ({ keywords }) => {
  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Related Long-Tail Opportunities</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Keyword</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Vol. Estimate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Competition</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CTR</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CPC</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {keywords.map((kw, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 flex items-center gap-2">
                  {kw.keyword}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{kw.searchVolume}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(kw.competition)}`}>
                    {kw.competition}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{kw.ctr}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{kw.cpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
        <button className="text-etsy-orange text-sm font-medium hover:text-orange-700 inline-flex items-center gap-1">
            View all opportunities <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default KeywordTable;