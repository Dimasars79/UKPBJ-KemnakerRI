import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface AgendaCardProps {
  date: string;
  month: string;
  title: string;
  location: string;
  time: string;
  category?: string;
}

export function AgendaCard({ date, month, title, location, time, category }: AgendaCardProps) {
  return (
    <div className="flex items-start bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group w-full h-full">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center bg-secondary-offwhite border border-slate-200 rounded-lg p-3 min-w-[76px] w-[76px] shrink-0 self-start group-hover:bg-primary-blue group-hover:text-white group-hover:border-primary-blue transition-colors">
        <span className="text-2xl font-bold leading-none mb-1">{date}</span>
        <span className="text-xs font-bold uppercase tracking-wider">{month}</span>
      </div>

      {/* Content wrapper */}
      <div className="ml-5 flex flex-col justify-between flex-grow min-w-0 h-full">
        <div>
          {category && (
            <div className="text-[11px] font-bold text-primary-blue mb-1 uppercase tracking-wider">
              {category}
            </div>
          )}
          <h3 
            className="text-base sm:text-[17px] font-bold text-primary-navy group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug min-h-[44px]"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Meta details (location & time) pinned at the bottom */}
        <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-500 font-medium mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center text-slate-500" title={location}>
            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-slate-400" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-slate-500">
            <Clock className="w-4 h-4 mr-1.5 shrink-0 text-slate-400" />
            <span className="truncate">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
