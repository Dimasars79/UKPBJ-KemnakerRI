"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { TrendingUp, Clock, PackageCheck } from 'lucide-react';

export default function MonitoringPage() {
  const { t } = useLanguage();

  const performanceStats = [
    { title: 'Total Paket Selesai', value: '428', icon: <PackageCheck className="w-8 h-8 text-white" />, trend: '+12% dari bulan lalu' },
    { title: 'Efisiensi Waktu', value: '18%', icon: <Clock className="w-8 h-8 text-white" />, trend: 'Lebih cepat 4 hari/paket' },
    { title: 'Penghematan Pagu', value: 'Rp 14.5 M', icon: <TrendingUp className="w-8 h-8 text-white" />, trend: '12.5% efisiensi anggaran' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#0d2e57] to-[#113a6e]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-[#f2b33a]/5 rounded-full blur-[100px] mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction="up">
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-6 text-center">{t('page_monitoring.title')}</h1>
              <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg">
                {t('page_monitoring.desc')}
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {performanceStats.map((stat, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex items-center">
                <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl p-4 mr-6 shadow-md">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-1">{stat.value}</h3>
                  <p className="text-green-600 text-xs font-bold">{stat.trend}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <SectionHeading title="Grafik Kinerja Tahunan" subtitle="Statistik paket dan pagu pengadaan berjalan" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <FadeIn direction="right">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-700 mb-6 border-b pb-4">Statistik Total Pengadaan</h3>
                <PerformanceChart />
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-700 mb-6 border-b pb-4">Efisiensi Waktu & Pagu</h3>
                <EfficiencyChart />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
