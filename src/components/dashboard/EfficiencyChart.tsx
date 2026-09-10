"use client"

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Barang', count: 180 },
  { name: 'Konstruksi', count: 85 },
  { name: 'Jasa Konsultasi', count: 65 },
  { name: 'Jasa Lainnya', count: 98 },
];

const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

interface TooltipPayloadItem {
  color?: string;
  fill?: string;
  name: string;
  value: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-1.5 z-50 pointer-events-none">
        <p className="font-bold text-slate-200 border-b border-slate-800/80 pb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Pengadaan {label}</span>
        </p>
        <div className="flex items-center justify-between gap-5 text-[11px] pt-0.5">
          <span className="text-slate-400 font-medium">Total Volume:</span>
          <span className="font-mono font-bold text-white">
            {payload[0].value} Paket
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function EfficiencyChart() {
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
            <Bar 
              dataKey="count" 
              radius={[8, 8, 0, 0]} 
              maxBarSize={48}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => {
                const isHovered = activeIndex === index;
                const isAnyHovered = activeIndex !== null;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    opacity={isHovered ? 1 : isAnyHovered ? 0.35 : 1}
                    stroke={isHovered ? '#ffffff' : 'transparent'}
                    strokeWidth={isHovered ? 2 : 0}
                    style={{
                      transition: 'opacity 0.25s ease, filter 0.25s ease',
                      cursor: 'pointer',
                      filter: isHovered ? 'drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.75))' : 'none',
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

