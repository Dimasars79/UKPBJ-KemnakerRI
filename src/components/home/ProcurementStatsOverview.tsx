"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, ArrowRight,
  Gavel, ShoppingCart, Users, FileText,
  PieChart
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ProcurementDonutChart, DonutMethodItem } from './ProcurementDonutChart';

export interface ProcurementStatsOverviewProps {
  onSelectMethod?: (method: string) => void;
}

export function ProcurementStatsOverview({ onSelectMethod }: ProcurementStatsOverviewProps = {}) {
  const { packagesList } = useData();
  const { trans } = useLanguage();
  
  // State hover interaktif yang menghubungkan badge samping dan sektor donut di tengah
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  // Handler klik metode untuk mengaktifkan filter paket di bawah dan scroll
  const handleMethodClick = (methodName: string) => {
    if (onSelectMethod) {
      onSelectMethod(methodName);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('filter-procurement-category', { detail: methodName }));
      const el = document.getElementById('pengadaan');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Helper konversi string Rupiah ke angka numerik
  const parseRupiahNumber = (rupiahStr: string): number => {
    if (!rupiahStr) return 0;
    const clean = rupiahStr.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  // Helper format ringkas Rupiah (Triliun / Miliar / Juta)
  const formatMiliar = (nominal: number): string => {
    if (nominal >= 1_000_000_000_000) {
      return `Rp ${(nominal / 1_000_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    if (nominal >= 1_000_000_000) {
      return `Rp ${(nominal / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
    }
    if (nominal >= 1_000_000) {
      return `Rp ${(nominal / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Jt`;
    }
    return `Rp ${nominal.toLocaleString('id-ID')}`;
  };

  // Cek apakah data paket yang dimuat berasal dari full import (>= 5000 paket)
  const isUsingFullRupData = useMemo(() => {
    return packagesList.length >= 5000;
  }, [packagesList]);

  // Total Nilai Anggaran Keseluruhan (Official RUP 2026 Kemnaker: Rp 1.510.789.870.868)
  const totalBudgetNumber = useMemo(() => {
    if (isUsingFullRupData) {
      return packagesList.reduce((acc, curr) => acc + parseRupiahNumber(curr.hps), 0);
    }
    return 1510789870868;
  }, [packagesList, isUsingFullRupData]);

  const totalAllPaguFormatted = useMemo(() => {
    return formatMiliar(totalBudgetNumber);
  }, [totalBudgetNumber]);

  // Total Jumlah Paket (Official RUP 2026: 8.333 Paket)
  const totalPackagesCount = useMemo(() => {
    if (isUsingFullRupData) return packagesList.length;
    return 8333;
  }, [packagesList, isUsingFullRupData]);

  // 1. DATA DISTRIBUSI METODE PENGADAAN (4 METODE RESMI RUP KEMNAKER)
  const methodsData = useMemo(() => {
    // Data RUP Resmi dari data_dashboard_rup_table Kemnaker RI 2026
    const defaultRupCounts: Record<string, { count: number; totalPagu: number }> = {
      'E-Purchasing': { count: 1792, totalPagu: 523553694727 },
      'Tender': { count: 30, totalPagu: 447632574750 },
      'Pengadaan Langsung': { count: 6122, totalPagu: 334239894141 },
      'Seleksi': { count: 31, totalPagu: 80618326250 }
    };

    let counts = defaultRupCounts;

    if (isUsingFullRupData) {
      const dynamicCounts: Record<string, { count: number; totalPagu: number }> = {
        'Tender': { count: 0, totalPagu: 0 },
        'E-Purchasing': { count: 0, totalPagu: 0 },
        'Seleksi': { count: 0, totalPagu: 0 },
        'Pengadaan Langsung': { count: 0, totalPagu: 0 }
      };

      packagesList.forEach((pkg) => {
        const cat = pkg.category || 'Tender';
        const num = parseRupiahNumber(pkg.hps);
        if (dynamicCounts[cat]) {
          dynamicCounts[cat].count += 1;
          dynamicCounts[cat].totalPagu += num;
        } else {
          dynamicCounts['Pengadaan Langsung'].count += 1;
          dynamicCounts['Pengadaan Langsung'].totalPagu += num;
        }
      });
      counts = dynamicCounts;
    }

    const totalPaguSum = totalBudgetNumber || 1;

    // Skema Visual Sesuai Referensi Pengguna
    const metaMap: Record<string, { 
      color: string; 
      dotColor: string;
      badgeBg: string;
      badgeText: string;
      iconBg: string; 
      barGradient: string;
      icon: React.ReactNode; 
    }> = {
      'Tender': {
        color: '#2563EB', // Biru
        dotColor: 'bg-blue-500',
        badgeBg: 'bg-blue-500/15 border-blue-400/30',
        badgeText: 'text-blue-300',
        iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
        barGradient: 'from-blue-600 to-sky-400',
        icon: <Gavel className="w-4 h-4 text-white" />
      },
      'Seleksi': {
        color: '#A855F7', // Ungu
        dotColor: 'bg-purple-500',
        badgeBg: 'bg-purple-500/15 border-purple-400/30',
        badgeText: 'text-purple-300',
        iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
        barGradient: 'from-purple-600 to-fuchsia-400',
        icon: <Users className="w-4 h-4 text-white" />
      },
      'E-Purchasing': {
        color: '#F43F5E', // Rose / Coral
        dotColor: 'bg-rose-500',
        badgeBg: 'bg-rose-500/15 border-rose-400/30',
        badgeText: 'text-rose-300',
        iconBg: 'bg-rose-600 text-white shadow-rose-500/20',
        barGradient: 'from-rose-600 to-pink-400',
        icon: <ShoppingCart className="w-4 h-4 text-white" />
      },
      'Pengadaan Langsung': {
        color: '#10B981', // Hijau Zamrud
        dotColor: 'bg-emerald-500',
        badgeBg: 'bg-emerald-500/15 border-emerald-400/30',
        badgeText: 'text-emerald-300',
        iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
        barGradient: 'from-emerald-600 to-teal-400',
        icon: <FileText className="w-4 h-4 text-white" />
      }
    };

    return Object.entries(counts).map(([name, val]) => {
      const budgetPct = Math.round((val.totalPagu / totalPaguSum) * 100);
      const meta = metaMap[name];

      return {
        name,
        count: val.count,
        totalPagu: val.totalPagu,
        paguFormatted: formatMiliar(val.totalPagu),
        percentage: budgetPct,
        color: meta.color,
        dotColor: meta.dotColor,
        badgeBg: meta.badgeBg,
        badgeText: meta.badgeText,
        iconBg: meta.iconBg,
        barGradient: meta.barGradient,
        icon: meta.icon
      };
    });
  }, [packagesList, totalBudgetNumber, isUsingFullRupData]);

  // Data khusus untuk komponen Donut Chart (format DonutMethodItem)
  const donutData: DonutMethodItem[] = useMemo(() => {
    return methodsData.map((m) => ({
      name: m.name,
      count: m.count,
      totalPagu: m.totalPagu,
      paguFormatted: m.paguFormatted,
      percentage: m.percentage,
      color: m.color,
      dotColor: m.dotColor
    }));
  }, [methodsData]);

  // Data kartu metode pengadaan
  const tenderItem = useMemo(() => methodsData.find((m) => m.name === 'Tender'), [methodsData]);
  const seleksiItem = useMemo(() => methodsData.find((m) => m.name === 'Seleksi'), [methodsData]);
  const ePurchasingItem = useMemo(() => methodsData.find((m) => m.name === 'E-Purchasing'), [methodsData]);
  const pengadaanLangsungItem = useMemo(() => methodsData.find((m) => m.name === 'Pengadaan Langsung'), [methodsData]);

  // Helper render kartu metode
  const renderMethodCard = (item: typeof methodsData[0] | undefined, extraClasses: string = "") => {
    if (!item) return null;
    const isHovered = hoveredMethod === item.name;

    return (
      <div
        key={item.name}
        onClick={() => handleMethodClick(item.name)}
        onMouseEnter={() => setHoveredMethod(item.name)}
        onMouseLeave={() => setHoveredMethod(null)}
        title={`Klik untuk melihat daftar paket ${item.name}`}
        className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer group/card flex flex-col justify-between ${
          isHovered 
            ? 'bg-white/10 border-white/30 shadow-xl scale-[1.02]' 
            : 'bg-[#071629]/80 hover:bg-white/5 border-white/10'
        } ${extraClasses}`}
      >
        {/* BARIS 1: Icon di Kiri, Badge Persentase di Kanan */}
        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-md ${item.iconBg}`}>
            {item.icon}
          </div>
          <div className={`px-2 py-0.5 rounded-md sm:rounded-lg border text-[10px] sm:text-xs font-black shadow-sm shrink-0 ${item.badgeBg} ${item.badgeText}`}>
            {item.percentage}%
          </div>
        </div>

        {/* BARIS 2: Nama Metode Lengkap Tanpa Terpotong (Lebar Penuh) */}
        <div className="mb-2 sm:mb-2.5 min-h-[36px] sm:min-h-[40px] flex flex-col justify-center">
          <h4 className="text-xs sm:text-sm lg:text-[14px] font-bold text-white tracking-tight group-hover/card:text-accent-gold transition-colors leading-snug">
            {item.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
            {item.count} Paket
          </p>
        </div>

        {/* BARIS 3: Nilai Pagu */}
        <div className="flex items-baseline justify-between gap-1 mb-2 sm:mb-2.5 pt-1.5 border-t border-white/5">
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Pagu</span>
          <span className="font-black text-white text-xs sm:text-sm lg:text-base tracking-tight shrink-0">
            {item.paguFormatted}
          </span>
        </div>

        {/* BARIS 4: Progress Bar Ramping Full Width */}
        <div className="w-full h-1.5 sm:h-2 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${item.barGradient} transition-all duration-500`}
            style={{ width: `${Math.max(item.percentage, 5)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-[#07172B] border-y border-white/10" id="kinerja">
      {/* Background ambient lighting - High-performance single-pass radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(37,99,235,0.12)_0%,transparent_50%),radial-gradient(circle_at_85%_75%,rgba(245,158,11,0.08)_0%,transparent_45%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* COMPACT SECTION HEADER */}
        <div className="mb-6 sm:mb-8">
          <FadeIn direction="left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              {trans('Komposisi & Nilai Pengadaan', 'Procurement Composition & Value')}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {trans(
                'Proporsi nilai anggaran dan sebaran paket pengadaan barang/jasa Kementerian Ketenagakerjaan RI.',
                'Proportion of budget value and distribution of procurement packages in the Ministry of Manpower.'
              )}
            </p>
          </FadeIn>
        </div>

        {/* 1. UNIFIED HERO CARD: 3-COLUMN ROBUST LAYOUT (KIRI: TENDER & SELEKSI | TENGAH: 3D DONUT | KANAN: E-PURCHASING & PL) */}
        <div className="bg-[#0B1E38] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            
            {/* SISI KIRI: Tender & Seleksi (Desktop: Kolom 1-3 | Mobile/Tablet: 2 Kartu Berdampingan) */}
            <div className="order-2 lg:order-1 col-span-1 md:col-span-1 lg:col-span-3 flex flex-col gap-2.5 sm:gap-3.5 w-full">
              {/* Badge Proporsi Valuasi Pengadaan tepat di atas widget Tender */}
              <div className="h-7 sm:h-8 inline-flex items-center gap-1.5 px-3 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider self-start whitespace-nowrap shadow-sm -mt-2 sm:-mt-3.5 mb-2.5 sm:mb-3.5">
                <BarChart3 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span>{trans('Proporsi Valuasi Pengadaan', 'Procurement Valuation')}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-4 w-full">
                {renderMethodCard(tenderItem)}
                {renderMethodCard(seleksiItem)}
              </div>
            </div>

            {/* SISI TENGAH: HERO 3D DONUT CHART (Besar & Dominan di Tengah) */}
            <div className="order-1 lg:order-2 col-span-1 md:col-span-2 lg:col-span-6 flex flex-col items-center justify-center py-1 sm:py-2 lg:py-0 w-full overflow-visible">
              <ProcurementDonutChart 
                data={donutData}
                totalPaguFormatted={totalAllPaguFormatted}
                totalPackages={totalPackagesCount}
                activeMethod={hoveredMethod}
                onHoverMethod={setHoveredMethod}
                onSelectMethod={handleMethodClick}
              />

              {/* KAPSUL PENJELASAN GRAFIK */}
              <div className="mt-2 sm:mt-2.5 lg:mt-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center gap-2 text-xs sm:text-[13px] font-bold text-white tracking-wide shadow-lg transition-all">
                <PieChart className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{trans('Proporsi Pagu per Metode Pemilihan', 'Budget Share by Selection Method')}</span>
              </div>
            </div>

            {/* SISI KANAN: E-Purchasing & Pengadaan Langsung (Desktop: Kolom 10-12 | Mobile/Tablet: 2 Kartu Berdampingan) */}
            <div className="order-3 lg:order-3 col-span-1 md:col-span-1 lg:col-span-3 flex flex-col gap-2.5 sm:gap-3.5 w-full">
              {/* Tombol Monitoring tepat di atas widget E-Purchasing */}
              <div className="h-7 sm:h-8 flex items-center self-start lg:self-end whitespace-nowrap shadow-sm -mt-2 sm:-mt-3.5 mb-2.5 sm:mb-3.5">
                <Link
                  href="/monitoring"
                  className="h-full inline-flex items-center gap-1 px-2.5 sm:px-3 rounded-full bg-accent-gold/15 hover:bg-accent-gold/25 border border-accent-gold/40 text-accent-gold text-[10px] sm:text-[11px] font-bold transition-all group shadow-sm"
                >
                  <span>{trans('Monitoring', 'Monitoring')}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-4 w-full">
                {renderMethodCard(ePurchasingItem)}
                {renderMethodCard(pengadaanLangsungItem)}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
