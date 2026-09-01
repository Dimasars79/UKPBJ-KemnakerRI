"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'TW I', Target: 100, Realisasi: 95 },
  { name: 'TW II', Target: 150, Realisasi: 140 },
  { name: 'TW III', Target: 200, Realisasi: 185 },
  { name: 'TW IV', Target: 250, Realisasi: 245 },
];

export function CategoryChart() {
  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 11}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{fill: '#f8fafc'}}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} iconType="circle" />
            <Bar dataKey="Target" fill="#93c5fd" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="Realisasi" fill="#1e40af" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
