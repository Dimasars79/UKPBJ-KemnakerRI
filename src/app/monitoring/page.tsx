"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { TrendingUp, Clock, PackageCheck, BarChart3 } from 'lucide-react';

export default function MonitoringPage() {
  const { t } = useLanguage();

  const performanceStats = [
    { title: 'Total Paket Selesai', value: '428', icon: <PackageCheck className="w-8 h-8 text-white" />, trend: '+12% dari bulan lalu' },
    { title: 'Efisiensi Waktu', value: '18%', icon: <Clock className="w-8 h-8 text-white" />, trend: 'Lebih cepat 4 hari/paket' },
    { title: 'Penghematan Pagu', value: 'Rp 14.500.000.000', icon: <TrendingUp className="w-8 h-8 text-white" />, trend: '12.5% efisiensi anggaran' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Official Governance & Audit Analytics Theme */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#02182B] via-[#082038] to-[#041322]">
          {/* Cyber Blueprint Lines & Emerald Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                {/* Government ITKP Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Indeks Tata Kelola Pengadaan (ITKP) Resmi</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  Dashboard Monitoring & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-100 to-white">
                    Evaluasi Kinerja Pengadaan
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  {t('page_monitoring.desc')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-12">
            {performanceStats.map((stat, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6 flex items-center gap-3.5 sm:gap-5">
                <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl p-3 sm:p-4 shadow-md shrink-0">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 truncate">{stat.title}</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-navy mb-0.5 sm:mb-1 truncate">{stat.value}</h3>
                  <p className="text-green-600 text-[11px] sm:text-xs font-bold truncate">{stat.trend}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-sm sm:text-lg font-bold text-slate-700 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Tren Penyelesaian Paket</span>
                </h3>
                <PerformanceChart />
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-sm sm:text-lg font-bold text-slate-700 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Paket per Kategori</span>
                </h3>
                <EfficiencyChart />
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-sm sm:text-lg font-bold text-slate-700 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Target vs Realisasi</span>
                </h3>
                <CategoryChart />
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.4}>
            <DataTable />
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
