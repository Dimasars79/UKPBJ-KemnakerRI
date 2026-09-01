"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Waktu: 8, Pagu: 5, Paket: 4 },
  { name: 'Feb', Waktu: 16, Pagu: 12, Paket: 10 },
  { name: 'Mar', Waktu: 25, Pagu: 22, Paket: 18 },
  { name: 'Apr', Waktu: 33, Pagu: 35, Paket: 30 },
  { name: 'Mei', Waktu: 41, Pagu: 48, Paket: 45 },
  { name: 'Jun', Waktu: 50, Pagu: 60, Paket: 58 },
  { name: 'Jul', Waktu: 58, Pagu: 68, Paket: 70 },
  { name: 'Ags', Waktu: 66, Pagu: 75, Paket: 82 },
];

export function EfficiencyChart() {
  return (
    <div className="h-[350px] md:h-[400px] w-full bg-white rounded-xl shadow-lg border border-slate-100 p-4 md:p-6 flex flex-col">
      <h3 className="text-lg md:text-xl font-bold text-primary-navy mb-4 md:mb-6 text-center">Progres Waktu vs Efisiensi Tender</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} unit="%" />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="Waktu" name="Target Waktu (%)" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Pagu" name="Progres Pagu (%)" stroke="#d4af37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Paket" name="Progres Paket (%)" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
