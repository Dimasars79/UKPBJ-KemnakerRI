"use client"

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Layers, 
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrambleDecoderNumber } from '@/components/animations/ScrambleDecoderNumber';

export function ProcurementSplitLedger() {
  const { trans } = useLanguage();

  // Filter States
  const [selectedSatker, setSelectedSatker] = useState('Semua Satker');
  const [selectedPpk, setSelectedPpk] = useState('Semua PPK');
  const [selectedTa, setSelectedTa] = useState('Seluruh Tahun');
  const [basisRealisasi, setBasisRealisasi] = useState<'kontrak' | 'pagu'>('kontrak');

  const satkerOptions = [
    'Semua Satker',
    'Sekretariat Jenderal Kemnaker',
    'Ditjen Binapenta & PKK',
    'Ditjen Binalavotas',
    'Ditjen Binwasnaker & K3',
    'Ditjen PHI & Jamsos',
    'Badan Perencanaan & Pengembangan',
    'Inspektorat Jenderal',
    'Politeknik Ketenagakerjaan'
  ];

  const ppkOptions = [
    'Semua PPK',
    'PPK Biro Umum & Pengadaan',
    'PPK Dit. Bina Kelembagaan',
    'PPK Dit. Standardisasi Kompetensi',
    'PPK Pusdatin Ketenagakerjaan',
    'PPK Balai Besar Pelatihan Vokasi'
  ];

  const taOptions = [
    'Seluruh Tahun',
    'TA 2026 (Tahun Berjalan)',
    'TA 2025',
    'TA 2024'
  ];

  // Base Transparency Financial Data (Numbers strictly unabbreviated for government transparency)
  const metrics = useMemo(() => {
    // If basis is pagu vs kontrak, small dynamic variation or exact baseline
    return {
      totalPaguNominal: 'Rp 2.407.606.973.071',
      totalPaket: 8408,
      sudahRealisasiNominal: basisRealisasi === 'kontrak' ? 'Rp 1.155.712.610.751' : 'Rp 1.310.070.752.471',
      sudahRealisasiPct: basisRealisasi === 'kontrak' ? 48.00 : 54.41,
      paketRealisasi: 824,
      paketRealisasiPct: 9.80,
      belumRealisasiNominal: basisRealisasi === 'kontrak' ? 'Rp 1.251.894.362.320' : 'Rp 1.097.536.220.600',
      belumRealisasiPct: basisRealisasi === 'kontrak' ? 52.00 : 45.59,
      paketBelumRealisasi: 7584,
      paketBelumRealisasiPct: 90.20,
      targetTw3Pct: 80,
    };
  }, [basisRealisasi]);

  const handleReset = () => {
    setSelectedSatker('Semua Satker');
    setSelectedPpk('Semua PPK');
    setSelectedTa('Seluruh Tahun');
    setBasisRealisasi('kontrak');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. FILTER DATA PANEL - Civic Ribbon Layout */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-primary-blue" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm tracking-tight flex items-center gap-2">
                <span>{trans('Filter Parameter Monitoring Pengadaan', 'Procurement Monitoring Filter Parameters')}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {trans('Data Resmi SPSE & e-Katalog', 'Official SPSE & e-Katalog Data')}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                {trans('Sesuaikan unit kerja Satker, PPK, dan basis evaluasi realisasi belanja APBN', 'Filter by Satker, PPK, and budget realization basis')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{trans('Reset Filter', 'Reset Filter')}</span>
            </button>

            <a
              href={`https://dewa-kemnaker.vercel.app/ringkasan?basis=${basisRealisasi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <span>{trans('Buka Portal DEWA Kemnaker', 'Open DEWA Kemnaker Portal')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Satker Dropdown */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>{trans('Satuan Kerja (Satker)', 'Work Unit (Satker)')}</span>
            </label>
            <div className="relative">
              <select
                value={selectedSatker}
                onChange={(e) => setSelectedSatker(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer truncate"
              >
                {satkerOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* PPK Dropdown */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" />
              <span>{trans('Pejabat Pembuat Komitmen', 'Commitment Officer (PPK)')}</span>
            </label>
            <div className="relative">
              <select
                value={selectedPpk}
                onChange={(e) => setSelectedPpk(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer truncate"
              >
                {ppkOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tahun Anggaran */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
              {trans('Tahun Anggaran Dana', 'Fiscal Year')}
            </label>
            <div className="relative">
              <select
                value={selectedTa}
                onChange={(e) => setSelectedTa(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer truncate"
              >
                {taOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Basis Realisasi Toggle */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
              {trans('Basis Realisasi', 'Realization Basis')}
            </label>
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setBasisRealisasi('kontrak')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  basisRealisasi === 'kontrak'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>{trans('Nilai Kontrak', 'Contract Value')}</span>
              </button>
              <button
                type="button"
                onClick={() => setBasisRealisasi('pagu')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  basisRealisasi === 'pagu'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>{trans('Pagu', 'Ceiling')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PANORAMIC SPLIT LEDGER (40% HERO TOTAL + 60% COMPARATIVE DUAL LEDGER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* SISI KIRI: HERO TOTAL PAGU ANGGARAN (5 COLS / ~42%) */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#031B33] via-[#072B52] to-[#04192F] text-white p-5 sm:p-6 shadow-md border border-cyan-500/25 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glow Background */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
                <span>{trans('Alokasi Pagu Induk APBN', 'Main APBN Budget Allocation')}</span>
              </div>
              <span className="text-[11px] font-mono font-bold bg-white/10 text-cyan-200 px-2.5 py-0.5 rounded-md border border-white/10">
                100% Pagu
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-1">
              {trans('Nilai pagu belanja keseluruhan:', 'Total procurement budget ceiling:')}
            </p>
            {/* Strict Full Number for Government Transparency with Matrix Cyber Scramble Animation */}
            <div className="text-2xl sm:text-3xl lg:text-3xl font-black font-mono tracking-tight text-white mb-4">
              <ScrambleDecoderNumber value={metrics.totalPaguNominal} delay={150} duration={1200} />
            </div>

            {/* Mini Dashboard Highlights Inside Hero */}
            <div className="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10 backdrop-blur-xs">
              <div>
                <p className="text-[11px] text-slate-300 font-medium">
                  {trans('Jumlah Paket Keseluruhan', 'Total Packages')}
                </p>
                <p className="text-lg sm:text-xl font-black font-mono text-white flex items-center gap-1">
                  <ScrambleDecoderNumber value={metrics.totalPaket.toLocaleString('id-ID')} delay={350} duration={900} />
                  <span className="text-xs font-normal text-cyan-300">{trans('paket', 'packages')}</span>
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-300 font-medium">
                  {trans('Tingkat Capaian Pagu', 'Budget Utilization Rate')}
                </p>
                <p className="text-lg sm:text-xl font-black font-mono text-emerald-400">
                  <ScrambleDecoderNumber value={`${metrics.sudahRealisasiPct.toFixed(2).replace('.', ',')}%`} delay={500} duration={900} />
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>{trans('Basis Evaluasi:', 'Evaluation Basis:')} <strong className="text-cyan-200">{basisRealisasi === 'kontrak' ? trans('Nilai Kontrak Terikat', 'Bound Contract Value') : trans('Pagu Pengadaan', 'Procurement Ceiling')}</strong></span>
            <span className="text-slate-300 font-semibold">{trans('UKPBJ Kemnaker RI', 'UKPBJ MoM RI')}</span>
          </div>
        </div>

        {/* SISI KANAN: DUAL COMPARATIVE LEDGER (7 COLS / ~58%) - Blue Theme */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#031B33] via-[#07264A] to-[#04192F] text-white p-5 sm:p-6 shadow-md border border-cyan-500/25 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glow Background */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header Ledger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
              <div>
                <h4 className="font-extrabold text-white text-sm tracking-tight">
                  {trans('Distribusi Realisasi vs Sisa Anggaran', 'Realization vs Remaining Budget Distribution')}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {trans('Perbandingan visual langsung penyerapan nilai kontrak terhadap pagu belanja', 'Direct visual comparison of contracted amount vs budget ceiling')}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold backdrop-blur-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{trans('Di bawah target TW3 (80%)', 'Below Q3 target (80%)')}</span>
              </div>
            </div>

            {/* INTEGRATED DUAL STACKED BAR */}
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {trans('Sudah Realisasi', 'Realized')}: {metrics.sudahRealisasiPct.toFixed(2).replace('.', ',')}%
                </span>
                <span className="text-amber-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {trans('Belum Realisasi (Sisa)', 'Remaining')}: {metrics.belumRealisasiPct.toFixed(2).replace('.', ',')}%
                </span>
              </div>
              <div className="w-full bg-slate-900/80 rounded-xl h-4 overflow-hidden flex shadow-inner border border-white/15 p-0.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-l-lg transition-all duration-500 flex items-center justify-center text-[10px] text-white font-extrabold font-mono"
                  style={{ width: `${metrics.sudahRealisasiPct}%` }}
                >
                  {metrics.sudahRealisasiPct > 15 ? `${metrics.sudahRealisasiPct.toFixed(1)}%` : ''}
                </div>
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-400 h-full rounded-r-lg transition-all duration-500 flex items-center justify-center text-[10px] text-white font-extrabold font-mono"
                  style={{ width: `${metrics.belumRealisasiPct}%` }}
                >
                  {metrics.belumRealisasiPct > 15 ? `${metrics.belumRealisasiPct.toFixed(1)}%` : ''}
                </div>
              </div>
            </div>

            {/* TWO COMPARATIVE LEDGER BOXES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Box Realisasi */}
              <div className="p-4 rounded-xl bg-white/5 border border-emerald-400/30 backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold text-xs uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{trans('Sudah Realisasi', 'Already Realized')}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-2 py-0.5 rounded">
                      {metrics.sudahRealisasiPct.toFixed(2).replace('.', ',')}% {trans('pagu', 'budget')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 mb-0.5">
                    {trans('Nilai kontrak terikat:', 'Bound contract value:')}
                  </p>
                  <div className="text-base sm:text-lg font-black font-mono text-white tracking-tight mb-2">
                    <ScrambleDecoderNumber value={metrics.sudahRealisasiNominal} delay={350} duration={1200} />
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 mt-1">
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-slate-300">{trans('Paket Selesai / Kontrak:', 'Completed Packages:')}</span>
                    <span className="font-extrabold text-emerald-300">
                      {metrics.paketRealisasi.toLocaleString('id-ID')} <span className="text-[11px] font-normal text-slate-400">({metrics.paketRealisasiPct.toFixed(2).replace('.', ',')}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${metrics.paketRealisasiPct}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Box Belum Realisasi */}
              <div className="p-4 rounded-xl bg-white/5 border border-amber-400/30 backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs uppercase tracking-wide">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{trans('Belum Realisasi', 'Not Yet Realized')}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-400/40 text-amber-200 px-2 py-0.5 rounded">
                      {metrics.belumRealisasiPct.toFixed(2).replace('.', ',')}% {trans('sisa', 'remaining')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 mb-0.5">
                    {trans('Sisa pagu belum kontrak:', 'Remaining budget to contract:')}
                  </p>
                  <div className="text-base sm:text-lg font-black font-mono text-white tracking-tight mb-2">
                    <ScrambleDecoderNumber value={metrics.belumRealisasiNominal} delay={500} duration={1200} />
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 mt-1">
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-slate-300">{trans('Sisa Paket Berjalan:', 'Remaining Packages:')}</span>
                    <span className="font-extrabold text-amber-300">
                      {metrics.paketBelumRealisasi.toLocaleString('id-ID')} <span className="text-[11px] font-normal text-slate-400">({metrics.paketBelumRealisasiPct.toFixed(2).replace('.', ',')}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${metrics.paketBelumRealisasiPct}%` }}></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Ledger Note */}
          <div className="relative z-10 pt-3 border-t border-white/10 mt-4 text-[10px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span>
              {trans('Realisasi dihitung dari paket berkontrak SPSE & e-Katalog tahun berjalan.', 'Realization calculated from active SPSE & e-Katalog contracts.')}
            </span>
            <span className="text-cyan-200 font-semibold">
              {trans('Evaluasi TW3 Kementerian Ketenagakerjaan RI', 'Q3 Evaluation Ministry of Manpower RI')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

