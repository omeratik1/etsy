import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  colorClass?: string;
  scoreColor?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, icon: Icon, colorClass = "text-slate-600", scoreColor = false }) => {
  
  let dynamicColor = "text-slate-800";
  if (scoreColor && typeof value === 'number') {
    if (value >= 75) dynamicColor = "text-green-600";
    else if (value >= 50) dynamicColor = "text-yellow-600";
    else dynamicColor = "text-red-600";
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg bg-slate-50 ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-2xl font-bold ${scoreColor ? dynamicColor : 'text-slate-800'}`}>
          {value}
        </span>
        {subValue && (
          <span className="text-sm text-slate-400 mt-1 font-medium">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;