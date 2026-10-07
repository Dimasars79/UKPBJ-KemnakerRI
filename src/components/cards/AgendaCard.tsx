import React from 'react';
import { MapPin, Clock, Video, Info } from 'lucide-react';

interface AgendaCardProps {
  date: string;
  month: string;
  title: string;
  location: string;
  time: string;
  category?: string;
  zoomUrl?: string;
  onClick?: () => void;
}

export function AgendaCard({ date, month, title, location, time, category, zoomUrl, onClick }: AgendaCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-start bg-white p-3 sm:p-3.5 md:p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-400/60 hover:-translate-y-0.5 transition-all duration-300 group w-full h-full border-l-[3px] sm:border-l-4 border-l-[#0D3B75] hover:border-l-amber-500 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Date badge - Compact Calendar Themed Royal Blue & Amber Gold */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#06182E] via-[#0D3B75] to-[#1E56A0] border border-blue-900/60 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 min-w-[54px] w-[54px] sm:min-w-[62px] sm:w-[62px] shrink-0 self-start shadow-sm shadow-blue-950/20 group-hover:scale-105 group-hover:border-amber-400/80 group-hover:shadow-amber-500/15 transition-all duration-300">
        <span className="text-xl sm:text-2xl font-black text-white leading-none mb-0.5 tracking-tight drop-shadow-sm">
          {date}
        </span>
        <span className="text-[9px] sm:text-[10px] font-black text-amber-300 uppercase tracking-widest drop-shadow-2xs">
          {month}
        </span>
      </div>

      {/* Content wrapper */}
      <div className="ml-3 sm:ml-3.5 flex flex-col justify-between flex-grow min-w-0 h-full">
        <div>
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            {category && (
              <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200/80 group-hover:bg-amber-50 group-hover:text-amber-900 group-hover:border-amber-300 transition-colors uppercase tracking-wider">
                {category}
              </span>
            )}
            {zoomUrl && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 text-[9px] sm:text-[10px] font-bold shadow-2xs">
                <Video className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                <span>Zoom</span>
              </span>
            )}
          </div>
          <h3 
            className="text-xs sm:text-sm font-bold sm:font-black text-slate-950 group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[36px]"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Meta details (location & time) pinned at the bottom */}
        <div className="flex flex-col gap-0.5 text-[10px] sm:text-[11px] text-slate-500 font-medium mt-2 sm:mt-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center text-slate-600 font-medium" title={location}>
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 shrink-0 text-amber-500" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex items-center truncate">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 shrink-0 text-blue-500" />
              <span className="truncate font-medium">{time}</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 group-hover:text-primary-blue group-hover:scale-110 transition-all inline-flex items-center gap-0.5 shrink-0 ml-1.5" title="Lihat detail">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
