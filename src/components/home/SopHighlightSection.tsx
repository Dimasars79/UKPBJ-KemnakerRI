"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Download,
  Building2,
  ListChecks,
  FileCheck2
} from 'lucide-react';
import { useData, SopItem } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

const CATEGORY_LABELS: Record<string, { id: string; en: string; badgeClass: string }> = {
  'tata-kelola': {
    id: 'Tata Kelola',
    en: 'Governance',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  'perencanaan': {
    id: 'Perencanaan',
    en: 'Planning',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  'pemilihan': {
    id: 'Pemilihan Penyedia',
    en: 'Vendor Selection',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  'kontrak': {
    id: 'Pelaksanaan Kontrak',
    en: 'Contract Execution',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  'kinerja': {
    id: 'Evaluasi Kinerja',
    en: 'Performance',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  'risiko': {
    id: 'Manajemen Risiko',
    en: 'Risk Management',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
  }
};

export function SopHighlightSection() {
  const { sopList } = useData();
  const { trans } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const activeSops = useMemo(() => {
    const synced = sopList.filter((s) => s.syncFrontend !== false);
    if (activeFilter === 'all') return synced.slice(0, 6);
    return synced.filter((s) => s.kategori === activeFilter).slice(0, 6);
  }, [sopList, activeFilter]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    sopList.forEach((s) => {
      if (s.syncFrontend !== false && s.kategori) {
        cats.add(s.kategori);
      }
    });
    return Array.from(cats);
  }, [sopList]);

  const handleDownload = (sop: SopItem) => {
    if (sop.fileData) {
      const link = document.createElement('a');
      link.href = sop.fileData;
      link.download = sop.fileName || `${sop.kode}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (sop.downloadUrl && sop.downloadUrl !== '#') {
      window.open(sop.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="sop"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-blue-50/40 border-y border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Flowing Wave Lines Accent */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-36 sm:h-48 pointer-events-none select-none opacity-60"
      >
        <defs>
          <linearGradient id="sop-wave-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="sop-wave-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.02" />
            <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path
          d="M0,224 C240,176 480,260 720,216 C960,172 1200,120 1440,176 L1440,320 L0,320 Z"
          fill="url(#sop-wave-blue)"
        />
        <path
          d="M0,248 C300,200 540,280 840,224 C1080,180 1280,152 1440,192"
          fill="none"
          stroke="url(#sop-wave-blue)"
          strokeWidth="1.5"
        />
        <path
          d="M0,268 C360,216 620,292 920,238 C1140,198 1300,182 1440,212"
          fill="none"
          stroke="url(#sop-wave-gold)"
          strokeWidth="1.25"
        />
      </svg>

      {/* Subtle Kemnaker RI Logo Watermark */}
      <div
        aria-hidden="true"
        className="absolute right-[-4%] bottom-[-8%] sm:right-6 sm:bottom-4 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] opacity-[0.045] pointer-events-none select-none"
      >
        <Image
          src="/logo-kemnaker.png"
          alt=""
          fill
          className="object-contain grayscale"
        />
      </div>

      {/* Subtle Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <FadeIn direction="left" className="max-w-2xl">
            <div className="flex items-start sm:items-center gap-4">
              {/* Custom SOP Emblem Logo (60% opacity) */}
              <div
                aria-hidden="true"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 opacity-60 shadow-xs"
              >
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 sm:w-10 sm:h-10"
                >
                  {/* Document Base */}
                  <rect x="12" y="8" width="34" height="44" rx="5" stroke="#1e3a8a" strokeWidth="2.8" fill="#ffffff" />
                  {/* Top Header Bar */}
                  <path d="M20 18H38" stroke="#1e3a8a" strokeWidth="2.8" strokeLinecap="round" />
                  {/* Workflow Step Nodes */}
                  <circle cx="21" cy="28" r="2.6" fill="#d4af37" />
                  <path d="M27 28H38" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="21" cy="36" r="2.6" fill="#1e3a8a" />
                  <path d="M27 36H35" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="21" cy="44" r="2.6" fill="#1e3a8a" />
                  <path d="M27 44H33" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Verified Seal Badge */}
                  <circle cx="44" cy="44" r="11" fill="#0f172a" stroke="#d4af37" strokeWidth="2.4" />
                  <path
                    d="M39.5 44.2L42.6 47.2L48.8 41"
                    stroke="#d4af37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-navy tracking-tight leading-tight">
                  {trans('Pedoman & Alur Kerja Pengadaan', 'Procurement Workflow & Standards')}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5 leading-relaxed">
                  {trans(
                    'Standar baku pelaksanaan tugas pengadaan barang dan jasa UKPBJ Kementerian Ketenagakerjaan RI yang terstruktur, cepat, dan akuntabel.',
                    'Structured, fast, and accountable standard operating procedures for goods and services procurement at the Ministry of Manpower.'
                  )}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" className="shrink-0">
            <Link
              href="/informasi/sop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-navy hover:bg-primary-blue text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <span>{trans('Lihat Semua SOP', 'View All SOPs')}</span>
              <ArrowRight className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        {/* Category Filter Pills */}
        {availableCategories.length > 0 && (
          <FadeIn direction="up" delay={0.05} className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                activeFilter === 'all'
                  ? 'bg-primary-navy text-white border-primary-navy shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-primary-navy'
              }`}
            >
              {trans('Semua Kategori', 'All Categories')}
            </button>
            {availableCategories.map((cat) => {
              const info = CATEGORY_LABELS[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    activeFilter === cat
                      ? 'bg-primary-navy text-white border-primary-navy shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-primary-navy'
                  }`}
                >
                  {info ? trans(info.id, info.en) : cat}
                </button>
              );
            })}
          </FadeIn>
        )}

        {/* SOP Cards Grid */}
        {activeSops.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            {trans('Belum ada dokumen SOP yang tersedia untuk kategori ini.', 'No SOP documents available for this category.')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {activeSops.map((sop, idx) => {
              const catInfo = sop.kategori ? CATEGORY_LABELS[sop.kategori] : null;
              const hasDownload = Boolean(sop.fileData || (sop.downloadUrl && sop.downloadUrl !== '#'));

              return (
                <motion.div
                  key={`${activeFilter}-${sop.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-full bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 p-5 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px] font-bold border border-slate-200">
                          <FileCheck2 className="w-3 h-3 text-primary-blue" />
                          {sop.kode}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {catInfo && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${catInfo.badgeClass}`}>
                              {trans(catInfo.id, catInfo.en)}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-semibold">
                            {sop.revisi}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-primary-blue transition-colors line-clamp-2">
                        {sop.judul}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {sop.deskripsi || trans('Pedoman standar operasional pelaksanaan pengadaan barang dan jasa pemerintah di lingkungan Kemnaker RI.', 'Standard operating procedure for procurement at the Ministry of Manpower.')}
                      </p>
                    </div>

                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mb-3">
                        <span className="inline-flex items-center gap-1 truncate max-w-[60%]">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate font-medium">{sop.unit}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-primary-navy shrink-0">
                          <ListChecks className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{sop.tahapanCount} {trans('Tahapan', 'Steps')}</span>
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          href="/informasi/sop"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-primary-navy text-slate-800 hover:text-white text-xs font-bold transition-colors"
                        >
                          <span>{trans('Lihat Alur SOP', 'View Workflow')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {hasDownload && (
                          <button
                            type="button"
                            onClick={() => handleDownload(sop)}
                            title={trans('Unduh Dokumen SOP', 'Download SOP Document')}
                            className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
