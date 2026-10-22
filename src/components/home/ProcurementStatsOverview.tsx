"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Layers, TrendingUp, ArrowRight,
  Gavel, ShoppingCart, Users, FileText
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ProcurementDonutChart, DonutMethodItem } from './ProcurementDonutChart';

export function ProcurementStatsOverview() {
  const { packagesList } = useData();
  const { trans } = useLanguage();
  
  // State untuk Toggle Switch: 'budget' (Nilai Anggaran) vs 'count' (Jumlah Paket)
  const [metricMode, setMetricMode] = useState<'budget' | 'count'>('budget');
  
  // State hover interaktif yang menghubungkan bar kiri dan donut kanan
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  // Helper konversi string Rupiah ke angka numerik
  const parseRupiahNumber = (rupiahStr: string): number => {
    if (!rupiahStr) return 0;
    const clean = rupiahStr.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  // Helper format ringkas Rupiah (Miliar / Juta)
  const formatMiliar = (nominal: number): string => {
    if (nominal >= 1_000_000_000) {
      return `Rp ${(nominal / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
    }
    if (nominal >= 1_000_000) {
      return `Rp ${(nominal / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Jt`;
    }
    return `Rp ${nominal.toLocaleString('id-ID')}`;
  };

  // Total Nilai Anggaran Keseluruhan
  const totalBudgetNumber = useMemo(() => {
    return packagesList.reduce((acc, curr) => acc + parseRupiahNumber(curr.hps), 0);
  }, [packagesList]);

  const totalAllPaguFormatted = useMemo(() => {
    return formatMiliar(totalBudgetNumber);
  }, [totalBudgetNumber]);

  // 1. DATA DISTRIBUSI METODE PENGADAAN (4 METODE)
  const methodsData: (DonutMethodItem & { 
    icon: React.ReactNode; 
    iconBg: string; 
    barGradient: string;
    budgetPercentage: number;
    countPercentage: number;
  })[] = useMemo(() => {
    const counts: Record<string, { count: number; totalPagu: number }> = {
      'Tender': { count: 0, totalPagu: 0 },
      'E-Purchasing': { count: 0, totalPagu: 0 },
      'Seleksi': { count: 0, totalPagu: 0 },
      'Pengadaan Langsung': { count: 0, totalPagu: 0 }
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

    const totalPkgs = packagesList.length || 1;
    const totalPaguSum = totalBudgetNumber || 1;

    // Skema Warna sesuai gambar referensi pengguna (Biru, Merah/Coral, Ungu, Hijau/Teal)
    const metaMap: Record<string, { 
      color: string; 
      dotColor: string;
      iconBg: string; 
      barGradient: string;
      icon: React.ReactNode; 
    }> = {
      'Tender': {
        color: '#2563EB', // Biru primer
        dotColor: 'bg-blue-500',
        iconBg: 'bg-blue-500 text-white shadow-blue-500/30',
        barGradient: 'from-blue-600 to-sky-400',
        icon: <Gavel className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      },
      'E-Purchasing': {
        color: '#F43F5E', // Rose / Coral
        dotColor: 'bg-rose-500',
        iconBg: 'bg-rose-500 text-white shadow-rose-500/30',
        barGradient: 'from-rose-600 to-pink-400',
        icon: <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      },
      'Seleksi': {
        color: '#A855F7', // Ungu
        dotColor: 'bg-purple-500',
        iconBg: 'bg-purple-500 text-white shadow-purple-500/30',
        barGradient: 'from-purple-600 to-fuchsia-400',
        icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      },
      'Pengadaan Langsung': {
        color: '#10B981', // Hijau Zamrud / Teal
        dotColor: 'bg-emerald-500',
        iconBg: 'bg-emerald-500 text-white shadow-emerald-500/30',
        barGradient: 'from-emerald-600 to-teal-400',
        icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      }
    };

    return Object.entries(counts).map(([name, val]) => {
      const budgetPct = Math.round((val.totalPagu / totalPaguSum) * 100);
      const countPct = Math.round((val.count / totalPkgs) * 100);
      const activePct = metricMode === 'budget' ? budgetPct : countPct;
      const meta = metaMap[name];

      return {
        name,
        count: val.count,
        totalPagu: val.totalPagu,
        paguFormatted: formatMiliar(val.totalPagu),
        percentage: activePct,
        budgetPercentage: budgetPct,
        countPercentage: countPct,
        color: meta.color,
        dotColor: meta.dotColor,
        iconBg: meta.iconBg,
        barGradient: meta.barGradient,
        icon: meta.icon
      };
    });
  }, [packagesList, totalBudgetNumber, metricMode]);

  // Data khusus untuk Donut Chart (Berdasarkan Valuasi / Budget sesuai judul Proporsi Valuasi)
  const donutData: DonutMethodItem[] = useMemo(() => {
    return methodsData.map((m) => ({
      name: m.name,
      count: m.count,
      totalPagu: m.totalPagu,
      paguFormatted: m.paguFormatted,
      percentage: m.budgetPercentage, // Nilai proporsi valuasi
      color: m.color,
      dotColor: m.dotColor
    }));
  }, [methodsData]);

  // 2. DATA TAHAPAN STATUS (4 Cards Progres Cepat di Baris Bawah)
  const stageSummary = useMemo(() => {
    const totalPackages = packagesList.length || 1;

    const stages = [
      {
        key: 'Pendaftaran Dibuka',
        label: trans('Pendaftaran Dibuka', 'Registration Open'),
        dotColor: 'bg-emerald-400',
        barColor: 'from-emerald-500 to-teal-400',
        textColor: 'text-emerald-400'
      },
      {
        key: 'Pemberian Penjelasan',
        label: trans('Aanwijzing / Tanya Jawab', 'Clarification (Aanwijzing)'),
        dotColor: 'bg-amber-400',
        barColor: 'from-amber-500 to-yellow-400',
        textColor: 'text-amber-400'
      },
      {
        key: 'Tahap Evaluasi',
        label: trans('Tahap Evaluasi', 'Evaluation Stage'),
        dotColor: 'bg-blue-400',
        barColor: 'from-blue-500 to-cyan-400',
        textColor: 'text-blue-400'
      },
      {
        key: 'Selesai',
        label: trans('Selesai / Penetapan', 'Completed / Awarded'),
        dotColor: 'bg-purple-400',
        barColor: 'from-purple-500 to-indigo-400',
        textColor: 'text-purple-400'
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

  // Smooth scroll handler ke bagian daftar paket pengadaan di beranda
  const scrollToPengadaan = () => {
    const el = document.getElementById('pengadaan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-[#07172B] border-y border-white/10" id="kinerja">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-5 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* COMPACT SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <FadeIn direction="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
              <span>{trans('Statistik Pengadaan', 'Procurement Analytics')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              {trans('Sebaran Metode & Valuasi Pengadaan', 'Method Distribution & Valuation')}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {trans(
                'Ringkasan realisasi nilai anggaran dan volume paket pengadaan barang/jasa Kementerian Ketenagakerjaan RI.',
                'Summary of budget realization and procurement package volumes in the Ministry of Manpower.'
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
                <span className="text-xs font-bold text-emerald-300">{totalAllPaguFormatted}</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 1. TOP DUAL CARDS (Kiri: Bar Chart Metode + Toggle, Kanan: Donut Proporsi Valuasi) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-6">
          
          {/* CARD KIRI: Nilai Anggaran per Metode Pengadaan (Col-span 7) */}
          <div className="lg:col-span-7 bg-[#0C1E38]/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header Card Kiri dengan Toggle Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {metricMode === 'budget' 
                        ? trans('Nilai Anggaran per Metode Pengadaan', 'Budget Value per Procurement Method')
                        : trans('Jumlah Paket per Metode Pengadaan', 'Package Count per Procurement Method')}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {metricMode === 'budget'
                        ? trans('Berdasarkan total nilai pagu paket (dalam miliar rupiah)', 'Based on total package ceiling value (in billion IDR)')
                        : trans('Berdasarkan total kuantitas paket pengadaan aktif', 'Based on total active package quantity')}
                    </p>
                  </div>
                </div>

                {/* Toggle Pill Group */}
                <div className="inline-flex items-center bg-[#071527] p-1 rounded-xl border border-white/10 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setMetricMode('budget')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      metricMode === 'budget'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {trans('Nilai Anggaran', 'Budget Value')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricMode('count')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      metricMode === 'count'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {trans('Jumlah Paket', 'Package Count')}
                  </button>
                </div>
              </div>

              {/* Rows List 4 Metode Pengadaan */}
              <div className="space-y-4">
                {methodsData.map((item) => {
                  const isHovered = hoveredMethod === item.name;
                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredMethod(item.name)}
                      onMouseLeave={() => setHoveredMethod(null)}
                      className={`p-2.5 sm:p-3 rounded-2xl transition-all ${
                        isHovered ? 'bg-white/10 ring-1 ring-white/20' : 'bg-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Icon Lingkaran Warna-warni */}
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${item.iconBg}`}>
                          {item.icon}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="w-32 sm:w-36 shrink-0 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {item.count} Paket
                          </p>
                        </div>

                        {/* Horizontal Rounded Progress Bar */}
                        <div className="flex-1 min-w-0">
                          <div className="w-full h-3 sm:h-3.5 bg-slate-950/60 border border-white/5 rounded-full overflow-hidden p-0.5">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${item.barGradient} transition-all duration-500`}
                              style={{ width: `${Math.max(item.percentage, 4)}%` }}
                            />
                          </div>
                        </div>

                        {/* Persentase */}
                        <div className="w-10 sm:w-12 text-right shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-slate-300">
                            {item.percentage}%
                          </span>
                        </div>

                        {/* Nilai Nominal Rupiah */}
                        <div className="w-20 sm:w-24 text-right shrink-0">
                          <span className="text-xs sm:text-sm font-extrabold text-white">
                            {item.paguFormatted}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CARD KANAN: Proporsi Valuasi Pengadaan (Donut Chart + Legenda) (Col-span 5) */}
          <div className="lg:col-span-5 bg-[#0C1E38]/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header Card Kanan */}
              <div className="mb-5">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {trans('Proporsi Valuasi Pengadaan', 'Procurement Valuation Proportion')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {trans('Persentase nilai anggaran per metode pengadaan', 'Percentage of budget value by procurement method')}
                </p>
              </div>

              {/* Komponen Donut Pie Sesuai Gambar Referensi */}
              <div className="py-1">
                <ProcurementDonutChart 
                  data={donutData}
                  totalPaguFormatted={totalAllPaguFormatted}
                  totalPackages={packagesList.length}
                  activeMethod={hoveredMethod}
                  onHoverMethod={setHoveredMethod}
                />
              </div>
            </div>
          </div>

        </div>

        {/* 2. CARD BAWAH: STATUS TAHAPAN PAKET BERJALAN (Full Width Card) */}
        <div className="bg-[#0C1E38]/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <span className="font-extrabold text-slate-200 uppercase tracking-wider text-xs sm:text-[13px] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              {trans('STATUS TAHAPAN PAKET BERJALAN:', 'ACTIVE PACKAGE STAGE PROGRESS:')}
            </span>

            <Link
              href="/monitoring"
              className="text-accent-gold font-bold hover:underline inline-flex items-center gap-1.5 text-xs group transition-all self-start sm:self-auto"
            >
              <span>{trans('Telusuri Daftar Paket Lengkap', 'Explore All Packages')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stageSummary.map((stg) => (
              <div 
                key={stg.key}
                onClick={scrollToPengadaan}
                className="p-3.5 rounded-2xl bg-[#071629]/80 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-white group-hover:text-accent-gold transition-colors truncate">
                    {stg.label}
                  </span>
                  <span className={`font-mono font-bold text-xs sm:text-sm ${stg.textColor}`}>
                    {stg.count}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
                  <span className="font-semibold text-slate-300">{stg.totalPagu}</span>
                  <span className="font-bold text-slate-200">{stg.percentage}%</span>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full h-1.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${stg.barColor} transition-all duration-500`}
                    style={{ width: `${Math.max(stg.percentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
