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
  ArrowUpDown,
  Search
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  INAPROC_SATKERS_44,
  INAPROC_METHOD_TOTALS
} from '@/lib/inaprocData';

interface MethodStyleMeta {
  colorClass: string;
  dotClass: string;
}

const ALL_SATKERS_44 = INAPROC_SATKERS_44;

const METHOD_STYLE_MAP: Record<string, MethodStyleMeta> = {
  'Tender': { colorClass: 'from-blue-500 to-cyan-400', dotClass: 'bg-blue-500' },
  'E-Purchasing': { colorClass: 'from-emerald-500 to-teal-400', dotClass: 'bg-emerald-500' },
  'Pengadaan Langsung': { colorClass: 'from-amber-400 to-orange-400', dotClass: 'bg-amber-400' },
  'Seleksi': { colorClass: 'from-purple-500 to-indigo-400', dotClass: 'bg-purple-500' },
  'Lainnya': { colorClass: 'from-slate-400 to-slate-500', dotClass: 'bg-slate-400' }
};

const METHOD_BREAKDOWN = INAPROC_METHOD_TOTALS.map((m) => ({
  ...m,
  name: m.label,
  ...(METHOD_STYLE_MAP[m.key] || METHOD_STYLE_MAP['Lainnya'])
}));

function formatFullRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })
    .format(amount)
    .replace('IDR', 'Rp');
}

export interface SatkerMonitoringBreakdownProps {
  highlightedMethod?: string | null;
  onClearMethod?: () => void;
}

export function SatkerMonitoringBreakdown({
  highlightedMethod = null,
  onClearMethod
}: SatkerMonitoringBreakdownProps = {}) {
  const { trans } = useLanguage();
  const [sortBy, setSortBy] = useState<'pagu' | 'packages'>('pagu');
  const [viewMode, setViewMode] = useState<'satker' | 'eselon1'>('eselon1');
  const [selectedEselon1, setSelectedEselon1] = useState<string>('Semua Eselon I');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const eselon1Summary = useMemo(() => {
    const map = new Map<string, { name: string; satkerCount: number; packages: number; pagu: number }>();
    for (const s of ALL_SATKERS_44) {
      const existing = map.get(s.eselon1);
      if (existing) {
        existing.satkerCount += 1;
        existing.packages += s.packages;
        existing.pagu += s.pagu;
      } else {
        map.set(s.eselon1, {
          name: s.eselon1,
          satkerCount: 1,
          packages: s.packages,
          pagu: s.pagu
        });
      }
    }
    const list = Array.from(map.values());
    if (sortBy === 'packages') {
      list.sort((a, b) => b.packages - a.packages);
    } else {
      list.sort((a, b) => b.pagu - a.pagu);
    }
    return list;
  }, [sortBy]);

  const eselon1Options = useMemo(() => {
    return ['Semua Eselon I', ...eselon1Summary.map((e) => e.name)];
  }, [eselon1Summary]);

  const sortedSatkers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = ALL_SATKERS_44.filter((s) => {
      const matchEselon = selectedEselon1 === 'Semua Eselon I' || s.eselon1 === selectedEselon1;
      const matchQuery = !q || s.name.toLowerCase().includes(q) || s.eselon1.toLowerCase().includes(q);
      return matchEselon && matchQuery;
    });
    if (sortBy === 'packages') {
      filtered.sort((a, b) => b.packages - a.packages);
    } else {
      filtered.sort((a, b) => b.pagu - a.pagu);
    }
    return filtered;
  }, [sortBy, selectedEselon1, searchQuery]);

  const maxSatkerMetric = useMemo(() => {
    if (sortBy === 'packages') {
      return Math.max(...sortedSatkers.map((s) => s.packages), 1);
    }
    return Math.max(...sortedSatkers.map((s) => s.pagu), 1);
  }, [sortedSatkers, sortBy]);

  const maxEselonMetric = useMemo(() => {
    if (sortBy === 'packages') {
      return Math.max(...eselon1Summary.map((e) => e.packages), 1);
    }
    return Math.max(...eselon1Summary.map((e) => e.pagu), 1);
  }, [eselon1Summary, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
      {/* LEFT (7 COLS): DISTRIBUSI 44 SATKER & 7 UNIT ESELON I KEMNAKER RI */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  {viewMode === 'satker'
                    ? trans('Peringkat 44 Satker Kemnaker RI', 'All 44 Kemnaker Work Units (Satker)')
                    : trans('Rekapitulasi 7 Unit Eselon I Kemnaker RI', 'Summary of 7 Echelon I Units')}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {viewMode === 'satker'
                    ? trans('Seluruh 44 Satker beserta unit Eselon I pembina (TA 2026)', 'All 44 Satkers with supervising Echelon I units (FY 2026)')
                    : trans('Agregasi pagu dan paket pengadaan per Unit Eselon I (TA 2026)', 'Budget and package aggregation per Echelon I unit (FY 2026)')}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between gap-2">
              {/* View Mode Switcher: Eselon I vs Satker */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('eselon1')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'eselon1'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Eselon I
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('satker')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'satker'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Satker
                </button>
              </div>

              {/* Sort Toggle */}
              <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold ml-auto">
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
          </div>

          {/* Search & Eselon I Filter Bar (when viewing 44 Satkers) */}
          {viewMode === 'satker' && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mb-4">
              <div className="sm:col-span-7 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={trans('Cari nama satker atau unit Eselon I...', 'Search work unit or Echelon I...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="sm:col-span-5">
                <select
                  value={selectedEselon1}
                  onChange={(e) => setSelectedEselon1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {eselon1Options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Ranked Bars */}
          {viewMode === 'eselon1' ? (
            <div className="space-y-3.5">
              {eselon1Summary.map((eselon, idx) => {
                const barPct =
                  sortBy === 'packages'
                    ? (eselon.packages / maxEselonMetric) * 100
                    : (eselon.pagu / maxEselonMetric) * 100;

                return (
                  <button
                    key={eselon.name}
                    type="button"
                    onClick={() => {
                      setSelectedEselon1(eselon.name);
                      setViewMode('satker');
                    }}
                    title={trans('Klik untuk melihat daftar Satker di bawah Eselon I ini', 'Click to view Satkers under this Echelon I')}
                    className="w-full text-left group rounded-xl p-2 -mx-2 hover:bg-blue-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 text-xs mb-1.5">
                      <div className="flex items-start sm:items-center gap-2 min-w-0">
                        <span
                          className={`w-5 h-5 mt-0.5 sm:mt-0 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                            idx === 0
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : idx < 3
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                          <span className="font-bold text-slate-800 leading-snug break-words sm:truncate group-hover:text-primary-blue transition-colors">
                            {eselon.name}
                          </span>
                          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {eselon.satkerCount} Satker
                          </span>
                        </div>
                      </div>
                      <div className="pl-7 sm:pl-0 text-left sm:text-right shrink-0 font-mono leading-tight">
                        <div className="font-extrabold text-slate-900 text-[11px] sm:text-xs">
                          {formatFullRupiah(eselon.pagu)}
                        </div>
                        <div className="mt-0.5 text-[10px] font-semibold text-slate-500">
                          ({eselon.packages.toLocaleString('id-ID')} {trans('paket', 'packages')})
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(barPct, 2)}%` }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${
                          idx === 0
                            ? 'bg-gradient-to-r from-primary-navy via-blue-600 to-cyan-500'
                            : 'bg-gradient-to-r from-indigo-600 to-blue-400'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1.5">
              {sortedSatkers.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500">
                  {trans('Tidak ada satker yang sesuai filter pencarian.', 'No work unit matches the filter.')}
                </div>
              ) : (
                sortedSatkers.map((satker, idx) => {
                  const barPct =
                    sortBy === 'packages'
                      ? (satker.packages / maxSatkerMetric) * 100
                      : (satker.pagu / maxSatkerMetric) * 100;

                  return (
                    <div key={satker.name} className="group">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 text-xs mb-1.5">
                        <div className="flex items-start gap-2 min-w-0">
                          <span
                            className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                              idx === 0
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : idx < 3
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 leading-snug break-words sm:truncate group-hover:text-primary-blue transition-colors">
                              {satker.name}
                            </div>
                            <span className="inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/80">
                              {satker.eselon1}
                            </span>
                          </div>
                        </div>
                        <div className="pl-7 sm:pl-0 text-left sm:text-right shrink-0 font-mono leading-tight">
                          <div className="font-extrabold text-slate-900 text-[11px] sm:text-xs">
                            {formatFullRupiah(satker.pagu)}
                          </div>
                          <div className="mt-0.5 text-[10px] font-semibold text-slate-500">
                            ({satker.packages.toLocaleString('id-ID')} {trans('paket', 'packages')})
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.max(barPct, 2)}%` }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{ duration: 0.6, delay: Math.min(idx * 0.02, 0.3), ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full ${
                            idx === 0
                              ? 'bg-gradient-to-r from-primary-navy via-blue-600 to-cyan-500'
                              : 'bg-gradient-to-r from-blue-600 to-sky-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{trans('Sumber: Open Data INAPROC LKPP (KLPD K34)', 'Source: INAPROC LKPP Open Data (KLPD K34)')}</span>
          <span className="font-bold text-primary-navy">
            {viewMode === 'eselon1'
              ? '8.321 Paket • 7 Eselon I • 44 Satker'
              : `${sortedSatkers.length} dari 44 Satker • 8.321 Paket`}
          </span>
        </div>
      </div>

      {/* RIGHT (5 COLS): METODE PENGADAAN + KPI PDN & UKM */}
      <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
        {/* Card 1: Distribusi Metode Pengadaan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
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
              {highlightedMethod && onClearMethod && (
                <button
                  type="button"
                  onClick={onClearMethod}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer shrink-0"
                >
                  {trans('Reset Sorotan', 'Clear Focus')}
                </button>
              )}
            </div>

            <div className="space-y-3">
              {METHOD_BREAKDOWN.map((m, idx) => {
                const isHighlighted = highlightedMethod === m.key;
                return (
                  <div
                    key={m.name}
                    className={`rounded-xl transition-all ${
                      isHighlighted
                        ? 'bg-blue-50/80 ring-1 ring-blue-300 p-2.5 -mx-2.5'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-2 font-bold text-slate-800">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${m.dotClass}`} />
                        <span>{m.name}</span>
                        {isHighlighted && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-600 text-white">
                            {trans('Terpilih', 'Selected')}
                          </span>
                        )}
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
                );
              })}
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
