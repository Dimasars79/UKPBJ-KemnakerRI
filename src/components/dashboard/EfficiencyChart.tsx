"use client";

import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

interface TkdnDataItem {
  name: string;
  value: number;
  nominal: string;
  color: string;
}

export function EfficiencyChart() {
  const { trans } = useLanguage();
  const { packagesList } = useData();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Helper konversi string Rupiah ke angka numerik
  const parseRupiahNumber = (rupiahStr: string): number => {
    if (!rupiahStr) return 0;
    const clean = rupiahStr.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  // Helper format ringkas Rupiah
  const formatMiliar = (val: number): string => {
    if (val >= 1_000_000_000_000) {
      return `Rp ${(val / 1_000_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    if (val >= 1_000_000_000) {
      return `Rp ${(val / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
    }
    return `Rp ${(val / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Jt`;
  };

  // Kalkulasi Dinamis dari packagesList (Terkoneksi ke Supabase / RUP Kemnaker)
  const { tkdnData, pdnPctDisplay, umkPctDisplay, pdnNominalDisplay, imporNominalDisplay } = useMemo(() => {
    if (!packagesList || packagesList.length === 0) {
      return {
        tkdnData: [
          { name: trans('Produk Dalam Negeri (PDN)', 'Domestic Products (PDN)'), value: 92.4, nominal: 'Rp 1.368,4 M', color: '#10B981' },
          { name: trans('Produk Impor Khusus', 'Special Imported Products'), value: 7.6, nominal: 'Rp 112,6 M', color: '#F59E0B' }
        ],
        pdnPctDisplay: '92.4%',
        umkPctDisplay: '74.8%',
        pdnNominalDisplay: 'Rp 1,36 T',
        imporNominalDisplay: 'Rp 112 M'
      };
    }

    let pdnSum = 0;
    let imporSum = 0;
    let umkCount = 0;

    packagesList.forEach((pkg) => {
      const hpsNum = parseRupiahNumber(pkg.hps);
      const isImpor = pkg.desc?.includes('PDN: Tidak');
      const isUmk = pkg.desc?.includes('Usaha Mikro/Kecil: Ya');

      if (isImpor) {
        imporSum += hpsNum;
      } else {
        pdnSum += hpsNum;
      }

      if (isUmk) {
        umkCount++;
      }
    });

    // Fallback jika semua data kosong
    const totalSum = pdnSum + imporSum || 1;
    const pdnPercentage = Number(((pdnSum / totalSum) * 100).toFixed(1));
    const imporPercentage = Number((100 - pdnPercentage).toFixed(1));
    const umkPercentage = Number(((umkCount / (packagesList.length || 1)) * 100).toFixed(1));

    return {
      tkdnData: [
        {
          name: trans('Produk Dalam Negeri (PDN)', 'Domestic Products (PDN)'),
          value: pdnPercentage,
          nominal: formatMiliar(pdnSum),
          color: '#10B981'
        },
        {
          name: trans('Produk Impor Khusus', 'Special Imported Products'),
          value: imporPercentage,
          nominal: formatMiliar(imporSum),
          color: '#F59E0B'
        }
      ],
      pdnPctDisplay: `${pdnPercentage}%`,
      umkPctDisplay: `${umkPercentage}%`,
      pdnNominalDisplay: formatMiliar(pdnSum),
      imporNominalDisplay: formatMiliar(imporSum)
    };
  }, [packagesList, trans]);

  return (
    <div className="h-[280px] w-full flex flex-col justify-between">
      {/* DONUT RING CONTAINER */}
      <div className="relative flex-1 w-full min-h-[160px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TkdnDataItem;
                  return (
                    <div className="bg-slate-950/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700/80 shadow-2xl text-xs space-y-1 z-50 pointer-events-none">
                      <p className="font-bold text-white flex items-center gap-1.5 border-b border-white/10 pb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </p>
                      <div className="flex items-center justify-between gap-4 text-[11px] pt-0.5">
                        <span className="text-slate-400 font-medium">Persentase:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.value}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[11px]">
                        <span className="text-slate-400 font-medium">Nilai Pagu:</span>
                        <span className="font-mono font-bold text-white">{item.nominal}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={tkdnData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={74}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              strokeWidth={0}
            >
              {tkdnData.map((entry, index) => {
                const isHovered = activeIndex === index;
                const isAnyHovered = activeIndex !== null;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={isHovered ? 1 : isAnyHovered ? 0.45 : 0.95}
                    style={{
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      filter: isHovered ? `drop-shadow(0px 0px 8px ${entry.color}90)` : 'none'
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* METRIK DI TENGAH LINGKARAN DONUT (DINAMIS DARI DATABASE) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {pdnPctDisplay}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            PDN / TKDN
          </span>
        </div>
      </div>

      {/* LEGENDA DI BAWAH DONUT (DINAMIS) */}
      <div className="pt-2 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-500 block truncate">PDN (TKDN)</span>
              <span className="text-xs font-black text-emerald-700 truncate block">{pdnPctDisplay} ({pdnNominalDisplay})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-50 border border-amber-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-500 block truncate">Impor Khusus</span>
              <span className="text-xs font-black text-amber-700 truncate block">{tkdnData[1].value}% ({imporNominalDisplay})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
