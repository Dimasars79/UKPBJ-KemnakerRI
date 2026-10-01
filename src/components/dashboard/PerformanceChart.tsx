"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const yearlyData: Record<string, { name: string; Selesai: number }[]> = {
  '2026': [
    { name: 'Jan', Selesai: 45 },
    { name: 'Feb', Selesai: 52 },
    { name: 'Mar', Selesai: 68 },
    { name: 'Apr', Selesai: 74 },
    { name: 'Mei', Selesai: 95 },
    { name: 'Jun', Selesai: 110 },
    { name: 'Jul', Selesai: 140 },
    { name: 'Ags', Selesai: 180 },
    { name: 'Sep', Selesai: 210 },
    { name: 'Okt', Selesai: 250 },
    { name: 'Nov', Selesai: 310 },
    { name: 'Des', Selesai: 428 },
  ],
  '2025': [
    { name: 'Jan', Selesai: 38 },
    { name: 'Feb', Selesai: 44 },
    { name: 'Mar', Selesai: 59 },
    { name: 'Apr', Selesai: 65 },
    { name: 'Mei', Selesai: 80 },
    { name: 'Jun', Selesai: 98 },
    { name: 'Jul', Selesai: 125 },
    { name: 'Ags', Selesai: 160 },
    { name: 'Sep', Selesai: 190 },
    { name: 'Okt', Selesai: 225 },
    { name: 'Nov', Selesai: 280 },
    { name: 'Des', Selesai: 380 },
  ],
  '2024': [
    { name: 'Jan', Selesai: 30 },
    { name: 'Feb', Selesai: 38 },
    { name: 'Mar', Selesai: 48 },
    { name: 'Apr', Selesai: 55 },
    { name: 'Mei', Selesai: 70 },
    { name: 'Jun', Selesai: 85 },
    { name: 'Jul', Selesai: 110 },
    { name: 'Ags', Selesai: 140 },
    { name: 'Sep', Selesai: 170 },
    { name: 'Okt', Selesai: 195 },
    { name: 'Nov', Selesai: 240 },
    { name: 'Des', Selesai: 320 },
  ],
};

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
  year?: string;
}

const CustomTooltip = ({ active, payload, label, year = '2026' }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-1.5 z-50">
        <p className="font-bold text-slate-200 border-b border-slate-800/80 pb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Bulan {label} {year}</span>
        </p>
        <div className="flex items-center justify-between gap-5 text-[11px] pt-0.5">
          <span className="text-slate-400 font-medium">Paket Selesai:</span>
          <span className="font-mono font-bold text-blue-400">
            {payload[0].value} Paket
          </span>
        </div>
      </div>
    );
  }
  return null;
};

interface PerformanceChartProps {
  year?: string;
}

export function PerformanceChart({ year = '2026' }: PerformanceChartProps) {
  const chartData = yearlyData[year] || yearlyData['2026'];

  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <Tooltip 
              content={<CustomTooltip year={year} />}
              cursor={{ stroke: 'rgba(59, 130, 246, 0.4)', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            />
            <Area type="monotone" dataKey="Selesai" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSelesai)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

