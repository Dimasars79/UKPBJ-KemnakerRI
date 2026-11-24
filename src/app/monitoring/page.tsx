"use client"

import React, { Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ProcurementSplitLedger } from '@/components/dashboard/ProcurementSplitLedger';
import { SatkerMonitoringBreakdown } from '@/components/dashboard/SatkerMonitoringBreakdown';
import { BarChart3, Package, Building2, Calendar, ExternalLink, X } from 'lucide-react';

function MonitoringContent() {
  const { t, trans } = useLanguage();
  const { packagesList } = useData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const highlightedMethod = searchParams.get('metode');
  const selectedPaketCode = searchParams.get('paket');

  const selectedPackage = useMemo(() => {
    if (!selectedPaketCode) return null;
    return packagesList.find((p) => p.code === selectedPaketCode || p.id === selectedPaketCode) || null;
  }, [selectedPaketCode, packagesList]);

  const handleClearMethod = () => {
    router.replace('/monitoring', { scroll: false });
  };

  const handleClearPaket = () => {
    router.replace('/monitoring', { scroll: false });
  };

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
          {/* DETAIL PAKET TERPILIH DARI NOTIFIKASI */}
          {selectedPackage && (
            <FadeIn direction="up">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border-2 border-blue-200 relative">
                <button
                  type="button"
                  onClick={handleClearPaket}
                  title={trans('Tutup Detail Paket', 'Close Package Detail')}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2.5 pr-8">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-primary-blue border border-blue-200 text-[11px] font-extrabold font-mono">
                    <Package className="w-3.5 h-3.5" />
                    {selectedPackage.code}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
                    {selectedPackage.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                    {selectedPackage.status}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-3 pr-8">
                  {selectedPackage.title}
                </h2>

                {selectedPackage.desc && (
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {selectedPackage.desc}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {trans('Nilai Pagu / HPS', 'Budget / HPS')}
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-sm">
                      {selectedPackage.hps}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {trans('Satuan Kerja (Satker)', 'Work Unit')}
                    </span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{selectedPackage.unit}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {trans('Metode Pemilihan', 'Selection Method')}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPackage.method}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {trans('Batas Jadwal', 'Schedule Deadline')}
                      </span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{selectedPackage.deadline}</span>
                      </span>
                    </div>
                    {selectedPackage.downloadUrl && selectedPackage.downloadUrl !== '#' && (
                      <a
                        href={selectedPackage.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-navy hover:bg-primary-blue text-white text-[11px] font-bold transition-colors shrink-0"
                      >
                        <span>SiRUP</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* OPSI 2: PANORAMIC SPLIT LEDGER (Filter + Total Anggaran Hero + Realisasi vs Sisa) */}
          <FadeIn direction="up" delay={0.1}>
            <ProcurementSplitLedger />
          </FadeIn>

          {/* Peringkat 7 Eselon I / 44 Satker, Proporsi Metode Pengadaan, & Kepatuhan PDN/UKM */}
          <FadeIn direction="up" delay={0.2}>
            <SatkerMonitoringBreakdown
              highlightedMethod={highlightedMethod}
              onClearMethod={handleClearMethod}
            />
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function MonitoringPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <MonitoringContent />
    </Suspense>
  );
}
