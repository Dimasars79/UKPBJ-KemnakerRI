"use client"

import React from 'react';
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
      <div className="bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-1.5 z-50">
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
  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(245, 158, 11, 0.08)', radius: 6 }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

