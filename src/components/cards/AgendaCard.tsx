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
    <div className="flex items-start bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col items-center justify-center bg-secondary-offwhite border border-slate-200 rounded-lg p-3 min-w-[80px] group-hover:bg-primary-blue group-hover:text-white group-hover:border-primary-blue transition-colors">
        <span className="text-2xl font-bold leading-none mb-1">{date}</span>
        <span className="text-xs font-bold uppercase tracking-wider">{month}</span>
      </div>
      <div className="ml-5 flex-grow">
        {category && <div className="text-xs font-bold text-primary-blue mb-1 uppercase tracking-wide">{category}</div>}
        <h3 className="text-lg font-bold text-primary-navy mb-3 group-hover:text-primary-blue transition-colors">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
