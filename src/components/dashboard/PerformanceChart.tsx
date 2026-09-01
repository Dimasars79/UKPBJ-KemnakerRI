"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Triwulan I', Selesai: 45, Proses: 12 },
  { name: 'Triwulan II', Selesai: 85, Proses: 20 },
  { name: 'Triwulan III', Selesai: 120, Proses: 34 },
  { name: 'Triwulan IV', Selesai: 190, Proses: 18 },
];

export function PerformanceChart() {
  return (
    <div className="h-[350px] md:h-[400px] w-full bg-white rounded-xl shadow-lg border border-slate-100 p-4 md:p-6 flex flex-col">
      <h3 className="text-lg md:text-xl font-bold text-primary-navy mb-4 md:mb-6 text-center">Data Penyelesaian Paket Pengadaan 2024</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <YAxis tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{fill: '#f1f5f9'}}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
            <Bar dataKey="Selesai" name="Paket Selesai" fill="#1e3a8a" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Proses" name="Sedang Proses" fill="#d4af37" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
