import React from 'react';

interface StatisticCardProps {
  label: string;
  value: string;
  prefix?: string;
}

export function StatisticCard({ label, value, prefix }: StatisticCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
      <div className="text-3xl font-bold text-primary-blue mb-2">
        {prefix && <span className="text-xl mr-1">{prefix}</span>}
        {value}
      </div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
  );
}
