"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ProcurementSplitLedger } from '@/components/dashboard/ProcurementSplitLedger';
import { DataTable } from '@/components/dashboard/DataTable';
import { BarChart3 } from 'lucide-react';

export default function MonitoringPage() {
  const { t, trans } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20 -mt-[80px] md:-mt-[88px]">
        {/* HERO SECTION - Official Governance & Audit Analytics Theme */}
        <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-24 overflow-hidden bg-gradient-to-br from-[#02182B] via-[#082038] to-[#041322]">
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
                  <span>{trans('Indeks Tata Kelola Pengadaan (ITKP) Resmi', 'Official Procurement Governance Index (ITKP)')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  {trans('Dashboard Monitoring &', 'Monitoring Dashboard &')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-100 to-white">
                    {trans('Evaluasi Kinerja Pengadaan', 'Procurement Performance Evaluation')}
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  {t('page_monitoring.desc')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-8">
          {/* OPSI 2: PANORAMIC SPLIT LEDGER (Filter + Total Anggaran Hero + Realisasi vs Sisa) */}
          <FadeIn direction="up" delay={0.1}>
            <ProcurementSplitLedger />
          </FadeIn>

          {/* Tabel Detail Paket Pengadaan */}
          <FadeIn direction="up" delay={0.2}>
            <DataTable />
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
