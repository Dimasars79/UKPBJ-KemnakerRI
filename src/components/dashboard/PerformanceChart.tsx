"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
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
];

export function PerformanceChart() {
  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 11}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area type="monotone" dataKey="Selesai" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSelesai)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
