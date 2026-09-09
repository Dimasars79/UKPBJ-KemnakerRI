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

export function EfficiencyChart() {
  return (
    <div className="h-[280px] w-full flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{fill: '#475569', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <YAxis tick={{fill: '#475569', fontSize: 11, fontWeight: 600}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }}
              cursor={{fill: '#f1f5f9'}}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={50}>
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
