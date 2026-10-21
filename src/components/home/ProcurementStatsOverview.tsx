"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Layers, TrendingUp, ArrowRight 
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { Donut3DChart } from './Donut3DChart';

export function ProcurementStatsOverview() {
  const { packagesList } = useData();
  const { trans } = useLanguage();
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  // Helper konversi string Rupiah ke angka
  const parseRupiahNumber = (rupiahStr: string): number => {
    if (!rupiahStr) return 0;
    const clean = rupiahStr.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  // Helper format ringkas Rupiah (Miliar / Juta)
  const formatMiliar = (nominal: number): string => {
    if (nominal >= 1_000_000_000) {
      return `Rp ${(nominal / 1_000_000_000).toFixed(1)} M`;
    }
    if (nominal >= 1_000_000) {
      return `Rp ${(nominal / 1_000_000).toFixed(0)} Jt`;
    }
    return `Rp ${nominal.toLocaleString('id-ID')}`;
  };

  // 1. DATA SEBARAN METODE (Untuk 3D Infographic Pie Chart)
  const methodDistribution = useMemo(() => {
    const counts: Record<string, { count: number; totalPagu: number; color: string }> = {
      'Tender': { count: 0, totalPagu: 0, color: '#38BDF8' },
      'E-Purchasing': { count: 0, totalPagu: 0, color: '#FB7185' },
      'Pengadaan Langsung': { count: 0, totalPagu: 0, color: '#4ADE80' },
      'Seleksi': { count: 0, totalPagu: 0, color: '#C084FC' }
    };

    packagesList.forEach((pkg) => {
      const cat = pkg.category || 'Tender';
      const num = parseRupiahNumber(pkg.hps);
      if (counts[cat]) {
        counts[cat].count += 1;
        counts[cat].totalPagu += num;
      } else {
        counts['Tender'].count += 1;
        counts['Tender'].totalPagu += num;
      }
    });

    const totalPackages = packagesList.length || 1;

    return Object.entries(counts).map(([name, data]) => ({
      name,
      value: data.count,
      totalPagu: data.totalPagu,
      percentage: Math.round((data.count / totalPackages) * 100),
      color: data.color
    }));
  }, [packagesList]);

  // 2. DATA TAHAPAN STATUS (4 Cards Progres Cepat)
  const stageSummary = useMemo(() => {
    const totalPackages = packagesList.length || 1;

    const stages = [
      {
        key: 'Pendaftaran Dibuka',
        label: trans('Pendaftaran Dibuka', 'Registration Open'),
        dotColor: 'bg-emerald-400',
        barColor: 'from-emerald-500 to-teal-400',
        textColor: 'text-emerald-300'
      },
      {
        key: 'Pemberian Penjelasan',
        label: trans('Aanwijzing / Tanya Jawab', 'Clarification (Aanwijzing)'),
        dotColor: 'bg-amber-400',
        barColor: 'from-amber-500 to-yellow-400',
        textColor: 'text-amber-300'
      },
      {
        key: 'Tahap Evaluasi',
        label: trans('Tahap Evaluasi', 'Evaluation Stage'),
        dotColor: 'bg-blue-400',
        barColor: 'from-blue-500 to-cyan-400',
        textColor: 'text-blue-300'
      },
      {
        key: 'Selesai',
        label: trans('Selesai / Penetapan', 'Completed / Awarded'),
        dotColor: 'bg-purple-400',
        barColor: 'from-purple-500 to-indigo-400',
        textColor: 'text-purple-300'
      }
    ];

    return stages.map((stg) => {
      const matched = packagesList.filter((p) => p.status === stg.key);
      const totalPagu = matched.reduce((acc, curr) => acc + parseRupiahNumber(curr.hps), 0);
      const percentage = Math.round((matched.length / totalPackages) * 100);

      return {
        ...stg,
        count: matched.length,
        percentage,
        totalPagu: totalPagu > 0 ? formatMiliar(totalPagu) : 'Rp 0'
      };
    });
  }, [packagesList, trans]);

  // Total Pagu Keseluruhan
  const totalAllPagu = useMemo(() => {
    const sum = packagesList.reduce((acc, curr) => acc + parseRupiahNumber(curr.hps), 0);
    return formatMiliar(sum);
  }, [packagesList]);

  // Smooth scroll handler ke bagian daftar paket pengadaan di beranda
  const scrollToPengadaan = () => {
    const el = document.getElementById('pengadaan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-[#0a2342] border-y border-white/10" id="kinerja">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-gold/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* COMPACT SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <FadeIn direction="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
              <span>{trans('Infografis Pengadaan 3D', '3D Procurement Infographic')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              {trans('Sebaran Metode & Status Pengadaan', 'Procurement Method & Status Distribution')}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {trans(
                'Visualisasi sebaran metode lelang dan progres tahapan paket pengadaan aktif di Kementerian Ketenagakerjaan RI.',
                'Visual distribution of tender methods and active stage progress in the Ministry of Manpower.'
              )}
            </p>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-bold text-white">{packagesList.length} Paket</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">{totalAllPagu}</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* MAIN 3D INFOGRAPHIC CONTAINER */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-7 shadow-2xl">
          
          {/* 1. 3D INFOGRAPHIC PIE CHART WITH CALLOUT LEADER LINES */}
          <div className="w-full">
            <Donut3DChart 
              data={methodDistribution}
              totalCount={packagesList.length}
              activeSegmentIndex={activeSegmentIndex}
              onHoverSegment={setActiveSegmentIndex}
              formatMiliar={formatMiliar}
            />
          </div>

          {/* 2. COMPACT 4-STAGE PROGRESS STRIP DI BAWAH PIE CHART */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {trans('Status Tahapan Paket Berjalan:', 'Active Package Stage Progress:')}
              </span>
              <Link
                href="/monitoring"
                className="text-accent-gold font-bold hover:underline inline-flex items-center gap-1.5 text-[11px] group transition-all"
              >
                <span>{trans('Telusuri Daftar Paket Lengkap', 'Explore All Packages')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {stageSummary.map((stg) => (
                <div 
                  key={stg.key}
                  onClick={scrollToPengadaan}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-accent-gold transition-colors truncate">
                      {stg.label}
                    </span>
                    <span className={`font-mono font-bold text-[11px] ${stg.textColor}`}>
                      {stg.count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                    <span>{stg.totalPagu}</span>
                    <span className="font-semibold text-slate-300">{stg.percentage}%</span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stg.barColor} transition-all duration-500`}
                      style={{ width: `${Math.max(stg.percentage, 6)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
