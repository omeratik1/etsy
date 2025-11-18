import React from 'react';
import { ShoppingBag, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-etsy-orange p-2 rounded-lg text-white">
                <TrendingUp size={24} />
              </div>
              <span className="font-bold text-xl text-etsy-navy tracking-tight">
                Etsy<span className="text-etsy-orange">Ranker</span> AI
              </span>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="border-etsy-orange text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Keyword Research
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Listing Auditor
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <ShoppingBag size={20} />
            </button>
            <div className="ml-3 relative">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    JS
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;