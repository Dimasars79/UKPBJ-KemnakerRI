"use client"

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  BarChart3,
  ShieldCheck,
  Store,
  Award,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SatkerSummary {
  name: string;
  packages: number;
  pagu: number;
}

interface MethodSummary {
  name: string;
  packages: number;
  pagu: number;
  pct: number;
  colorClass: string;
  dotClass: string;
}

const TOP_SATKERS: SatkerSummary[] = [
  { name: 'Direktorat Bina Kelembagaan Pelatihan Vokasi', packages: 132, pagu: 1151518917703 },
  { name: 'Badan Perencanaan dan Pengembangan Ketenagakerjaan', packages: 199, pagu: 259566146000 },
  { name: 'Sekretariat Jenderal Kemnaker', packages: 530, pagu: 165111792000 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Bandung', packages: 205, pagu: 55269778000 },
  { name: 'Ditjen Binapenta & Perluasan Kesempatan Kerja', packages: 204, pagu: 51406038000 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Bandung Barat', packages: 432, pagu: 39914224000 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Serang', packages: 114, pagu: 36490511000 },
  { name: 'Pusat Pasar Kerja', packages: 83, pagu: 35056178000 },
  { name: 'Direktorat Bina Penyelenggaraan Pelatihan Vokasi & Pemagangan', packages: 52, pagu: 34826570000 },
  { name: 'Ditjen Pembinaan Hubungan Industrial & Jamsos Tenaga Kerja', packages: 427, pagu: 34226043000 }
];

const METHOD_BREAKDOWN: MethodSummary[] = [
  {
    name: 'Tender',
    packages: 30,
    pagu: 1204172487703,
    pct: 52.48,
    colorClass: 'from-blue-500 to-cyan-400',
    dotClass: 'bg-blue-500'
  },
  {
    name: 'E-Purchasing (e-Katalog)',
    packages: 1831,
    pagu: 540573731127,
    pct: 23.56,
    colorClass: 'from-emerald-500 to-teal-400',
    dotClass: 'bg-emerald-500'
  },
  {
    name: 'Pengadaan Langsung',
    packages: 6143,
    pagu: 359647831141,
    pct: 15.67,
    colorClass: 'from-amber-400 to-orange-400',
    dotClass: 'bg-amber-400'
  },
  {
    name: 'Seleksi',
    packages: 31,
    pagu: 145930314000,
    pct: 6.36,
    colorClass: 'from-purple-500 to-indigo-400',
    dotClass: 'bg-purple-500'
  },
  {
    name: 'Lainnya (Penunjukan / Dikecualikan)',
    packages: 286,
    pagu: 44153538000,
    pct: 1.92,
    colorClass: 'from-slate-400 to-slate-500',
    dotClass: 'bg-slate-400'
  }
];

function formatFullRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })
    .format(amount)
    .replace('IDR', 'Rp');
}

export function SatkerMonitoringBreakdown() {
  const { trans } = useLanguage();
  const [sortBy, setSortBy] = useState<'pagu' | 'packages'>('pagu');

  const sortedSatkers = useMemo(() => {
    const copy = [...TOP_SATKERS];
    if (sortBy === 'packages') {
      copy.sort((a, b) => b.packages - a.packages);
    } else {
      copy.sort((a, b) => b.pagu - a.pagu);
    }
    return copy;
  }, [sortBy]);

  const maxMetricValue = useMemo(() => {
    if (sortBy === 'packages') {
      return Math.max(...sortedSatkers.map((s) => s.packages), 1);
    }
    return Math.max(...sortedSatkers.map((s) => s.pagu), 1);
  }, [sortedSatkers, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
      {/* LEFT (7 COLS): PERINGKAT 10 BESAR SATUAN KERJA (SATKER) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  {trans('Peringkat 10 Besar Satker Kemnaker RI', 'Top 10 Kemnaker Work Units (Satker)')}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {trans('Distribusi alokasi pagu RUP terumumkan dari total 44 Satker (TA 2026)', 'RUP budget allocation distribution across 44 Satkers (FY 2026)')}
                </p>
              </div>
            </div>

            {/* Sort Toggle */}
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
              <ArrowUpDown className="w-3 h-3 text-slate-400 ml-1.5" />
              <button
                type="button"
                onClick={() => setSortBy('pagu')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  sortBy === 'pagu'
                    ? 'bg-primary-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {trans('Nilai Pagu', 'Budget')}
              </button>
              <button
                type="button"
                onClick={() => setSortBy('packages')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  sortBy === 'packages'
                    ? 'bg-primary-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {trans('Jumlah Paket', 'Packages')}
              </button>
            </div>
          </div>

          {/* Ranked Bars */}
          <div className="space-y-3.5">
            {sortedSatkers.map((satker, idx) => {
              const barPct =
                sortBy === 'packages'
                  ? (satker.packages / maxMetricValue) * 100
                  : (satker.pagu / maxMetricValue) * 100;

              return (
                <div key={satker.name} className="group">
                  <div className="flex items-start justify-between gap-2 text-xs mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                          idx === 0
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : idx < 3
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800 truncate group-hover:text-primary-blue transition-colors">
                        {satker.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <span className="font-extrabold text-slate-900 text-[11px] sm:text-xs">
                        {formatFullRupiah(satker.pagu)}
                      </span>
                      <span className="ml-1.5 text-[10px] font-semibold text-slate-500">
                        ({satker.packages.toLocaleString('id-ID')} pkt)
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(barPct, 2)}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.9, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${
                        idx === 0
                          ? 'bg-gradient-to-r from-primary-navy via-blue-600 to-cyan-500'
                          : 'bg-gradient-to-r from-blue-600 to-sky-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{trans('Sumber: Open Data INAPROC LKPP (KLPD K34)', 'Source: INAPROC LKPP Open Data (KLPD K34)')}</span>
          <span className="font-bold text-primary-navy">8.321 Paket • 44 Satker</span>
        </div>
      </div>

      {/* RIGHT (5 COLS): METODE PENGADAAN + KPI PDN & UKM */}
      <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
        {/* Card 1: Distribusi Metode Pengadaan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  {trans('Proporsi Metode Pengadaan', 'Procurement Method Distribution')}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {trans('Berdasarkan porsi nilai pagu anggaran RUP 2026', 'Based on FY 2026 RUP budget share')}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {METHOD_BREAKDOWN.map((m, idx) => (
                <div key={m.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-2 font-bold text-slate-800">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${m.dotClass}`} />
                      <span>{m.name}</span>
                    </span>
                    <span className="font-mono font-extrabold text-slate-900">
                      {m.pct.toFixed(2).replace('.', ',')}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(m.pct, 2)}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.9, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${m.colorClass}`}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>{m.packages.toLocaleString('id-ID')} {trans('paket', 'packages')}</span>
                    <span>{formatFullRupiah(m.pagu)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Komitmen Strategis PDN & UMKM */}
        <div className="rounded-2xl bg-gradient-to-br from-[#031B33] via-[#07264A] to-[#04192F] text-white p-5 shadow-md border border-cyan-500/25">
          <div className="flex items-center gap-2 mb-3.5">
            <Award className="w-4 h-4 text-accent-gold" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-cyan-200">
              {trans('Kepatuhan Strategis PDN & UMKM', 'PDN & MSME Strategic Compliance')}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* PDN */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{trans('Produk Dalam Negeri', 'Domestic Products')}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white">
                98,22%
              </div>
              <p className="text-[10px] text-slate-300 font-mono mt-0.5 mb-2">
                8.173 / 8.321 paket
              </p>
              <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '98.22%' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-emerald-400 h-full rounded-full"
                />
              </div>
            </div>

            {/* UKM */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-bold mb-1">
                <Store className="w-3.5 h-3.5" />
                <span>{trans('Porsi Usaha Kecil (UKM)', 'MSME Allocation')}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white">
                96,42%
              </div>
              <p className="text-[10px] text-slate-300 font-mono mt-0.5 mb-2">
                8.023 / 8.321 paket
              </p>
              <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '96.42%' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-amber-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-300" />
              {trans('Data Terverifikasi INAPROC', 'INAPROC Verified Data')}
            </span>
            <span className="text-cyan-200 font-mono font-bold">TA 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
