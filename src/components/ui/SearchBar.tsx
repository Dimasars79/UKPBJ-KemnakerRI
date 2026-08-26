import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  categories?: string[];
}

export function SearchBar({ placeholder = "Cari informasi...", categories = [] }: SearchBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-slate-200 focus-within:border-primary-blue transition-all">
        <div className="grid place-items-center h-full w-14 text-slate-400">
          <Search className="h-6 w-6" />
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-slate-700 pr-4 placeholder-slate-400 bg-transparent"
          type="text"
          id="search"
          placeholder={placeholder}
        />
        <button className="h-10 px-6 mr-2 bg-primary-blue hover:bg-blue-900 text-white font-semibold rounded-full text-sm transition-colors">
          Cari
        </button>
      </div>
      
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
          <span className="text-slate-500 font-medium">Saran pencarian:</span>
          {categories.map((cat, idx) => (
            <React.Fragment key={cat}>
              <button className="text-primary-blue hover:text-primary-navy hover:underline font-medium transition-colors">
                {cat}
              </button>
              {idx < categories.length - 1 && <span className="text-slate-300">|</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
