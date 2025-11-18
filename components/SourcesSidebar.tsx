import React from 'react';
import { GroundingSource } from '../types';
import { Link, ExternalLink } from 'lucide-react';

interface SourcesSidebarProps {
  sources: GroundingSource[];
}

const SourcesSidebar: React.FC<SourcesSidebarProps> = ({ sources }) => {
  if (sources.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4 text-slate-500">
        <Link size={16} />
        <h3 className="text-xs font-bold uppercase tracking-wider">Evidence (Grounding)</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        The AI analyzed specific data from these real Etsy pages to generate this report.
      </p>
      <ul className="space-y-3">
        {sources.map((source, idx) => (
          <li key={idx}>
            <a 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-2 group"
            >
                <div className="mt-1 min-w-[16px]">
                     <div className="w-1.5 h-1.5 rounded-full bg-etsy-orange group-hover:scale-125 transition-transform"></div>
                </div>
                <span className="text-xs text-slate-600 group-hover:text-etsy-orange transition-colors line-clamp-2 break-words">
                    {source.title}
                </span>
                <ExternalLink size={10} className="text-slate-300 group-hover:text-etsy-orange opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourcesSidebar;