"use client"

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const data = [
  { name: 'TW I', Target: 100, Realisasi: 95 },
  { name: 'TW II', Target: 150, Realisasi: 140 },
  { name: 'TW III', Target: 200, Realisasi: 185 },
  { name: 'TW IV', Target: 250, Realisasi: 245 },
];

interface TooltipPayloadItem {
  color?: string;
  fill?: string;
  name: string;
  value: number | string;
  unit?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-2 z-50 pointer-events-none">
        <p className="font-bold text-slate-200 border-b border-slate-800/80 pb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Periode {label}</span>
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-5 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-mono font-bold text-white">
              {entry.value} Paket
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CategoryChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }} 
              iconType="circle" 
            />
            <Bar 
              dataKey="Target" 
              fill="#60a5fa" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={28}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => {
                const isHovered = activeIndex === index;
                const isAnyHovered = activeIndex !== null;
                return (
                  <Cell 
                    key={`target-${index}`} 
                    fill="#60a5fa"
                    opacity={isHovered ? 1 : isAnyHovered ? 0.35 : 1}
                    stroke={isHovered ? '#ffffff' : 'transparent'}
                    strokeWidth={isHovered ? 1.5 : 0}
                    style={{
                      transition: 'opacity 0.25s ease, filter 0.25s ease',
                      cursor: 'pointer',
                      filter: isHovered ? 'drop-shadow(0px 0px 8px rgba(96, 165, 250, 0.7))' : 'none',
                    }}
                  />
                );
              })}
            </Bar>
            <Bar 
              dataKey="Realisasi" 
              fill="#2563eb" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={28}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => {
                const isHovered = activeIndex === index;
                const isAnyHovered = activeIndex !== null;
                return (
                  <Cell 
                    key={`realisasi-${index}`} 
                    fill="#2563eb"
                    opacity={isHovered ? 1 : isAnyHovered ? 0.35 : 1}
                    stroke={isHovered ? '#ffffff' : 'transparent'}
                    strokeWidth={isHovered ? 1.5 : 0}
                    style={{
                      transition: 'opacity 0.25s ease, filter 0.25s ease',
                      cursor: 'pointer',
                      filter: isHovered ? 'drop-shadow(0px 0px 8px rgba(37, 99, 235, 0.8))' : 'none',
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


