"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, FileText, Calendar, Building, ChevronRight, 
  Package, BookOpen, Layers, Newspaper, Sparkles, Scale
} from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchableItem {
  id: string;
  title: string;
  subtext: string;
  type: string;
  category: 'tender' | 'berita' | 'agenda' | 'regulasi' | 'sop' | 'panduan' | 'layanan';
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badgeColor: string;
  tags?: string[];
}

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const { trans } = useLanguage();
  const { newsList, agendaList, packagesList, regulasiList, sopList, panduanList } = useData();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key & arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Build Unified Search Index across all dynamic & static collections
  const searchIndex: SearchableItem[] = useMemo(() => {
    const items: SearchableItem[] = [];

    // 1. Paket Pengadaan (Tender / Seleksi / Non-Tender)
    if (Array.isArray(packagesList)) {
      packagesList.forEach((pkg) => {
        items.push({
          id: `pkg-${pkg.code || pkg.id}`,
          title: pkg.title,
          subtext: `${pkg.code} • ${pkg.hps} • ${pkg.unit} • Status: ${pkg.status}`,
          type: trans('Tender PBJ', 'Procurement Tender'),
          category: 'tender',
          icon: Package,
          href: `/?package=${encodeURIComponent(pkg.code || pkg.id)}#pengadaan`,
          badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          tags: [pkg.code, pkg.unit, pkg.hps, pkg.category, pkg.status, pkg.method || '']
        });
      });
    }

    // 2. Berita & Siaran Resmi
    if (Array.isArray(newsList)) {
      newsList.forEach((news) => {
        items.push({
          id: `news-${news.id}`,
          title: news.title,
          subtext: `${news.category} • ${news.date || 'Terbaru'} • ${news.author || 'Admin UKPBJ'}`,
          type: trans('Berita', 'News'),
          category: 'berita',
          icon: Newspaper,
          href: news.id ? `/berita/${news.id}` : '/berita',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          tags: [news.category, news.author || '', ...(news.tags || [])]
        });
      });
    }

    // 3. Agenda & Jadwal Bimtek / Sertifikasi
    if (Array.isArray(agendaList)) {
      agendaList.forEach((agenda) => {
        items.push({
          id: `agenda-${agenda.id}`,
          title: agenda.title,
          subtext: `${agenda.date} • ${agenda.location || 'Gedung Kemnaker RI'} • ${agenda.category}`,
          type: trans('Agenda PBJ', 'Agenda'),
          category: 'agenda',
          icon: Calendar,
          href: '/agenda',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          tags: [agenda.date, agenda.location || '', agenda.category, agenda.organizer || '']
        });
      });
    }

    // 4. Regulasi & Produk Hukum
    if (Array.isArray(regulasiList)) {
      regulasiList.forEach((reg) => {
        items.push({
          id: `reg-${reg.id}`,
          title: `${reg.nomor} - ${reg.tentang}`,
          subtext: `${reg.kategori} • Tahun ${reg.tahun} • Ukuran Dokumen: ${reg.fileSize || 'PDF'}`,
          type: trans('Regulasi', 'Regulation'),
          category: 'regulasi',
          icon: Scale,
          href: '/informasi/peraturan',
          badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          tags: [reg.nomor, reg.tahun, reg.kategori]
        });
      });
    }

    // 5. Standar Operasional Prosedur (SOP)
    if (Array.isArray(sopList)) {
      sopList.forEach((sop) => {
        items.push({
          id: `sop-${sop.id}`,
          title: `${sop.kode} - ${sop.judul}`,
          subtext: `${sop.unit} • ${sop.revisi} • Status: ${sop.status || 'Berlaku'}`,
          type: trans('SOP PBJ', 'SOP'),
          category: 'sop',
          icon: Layers,
          href: '/informasi/sop',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          tags: [sop.kode, sop.unit, sop.revisi]
        });
      });
    }

    // 6. Panduan & Juknis
    if (Array.isArray(panduanList)) {
      panduanList.forEach((panduan) => {
        items.push({
          id: `panduan-${panduan.id}`,
          title: panduan.title,
          subtext: `${panduan.desc || 'Buku panduan teknis dan modul pedoman operasional pengadaan'}`,
          type: trans('Panduan', 'Guide'),
          category: 'panduan',
          icon: BookOpen,
          href: '/informasi/panduan',
          badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          tags: [panduan.category || '']
        });
      });
    }

    // 7. Layanan Unggulan & Fitur Portal Utama
    const portalFeatures: SearchableItem[] = [
      {
        id: 'feature-tkdn',
        title: trans('Kalkulator Simulasi Nilai TKDN', 'TKDN Value Simulation Calculator'),
        subtext: trans('Simulasi mandiri estimasi kandungan lokal produk & alur sertifikasi gratis SIINas', 'Self-simulation of local product content & free SIINas certification'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Sparkles,
        href: '/informasi/tkdn',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['tkdn', 'p3dn', 'kalkulator', 'hitung', 'kandungan lokal', 'siinas', 'preferensi harga']
      },
      {
        id: 'feature-clearing-house',
        title: trans('Clearing House Pengadaan & Konsultasi Kontrak', 'Procurement Clearing House & Contract Advisory'),
        subtext: trans('Layanan advokasi hukum, mitigasi sengketa lelang, dan mediasi pelaksanaan kontrak PBJ', 'Legal advocacy, bid protest mitigation, and contract mediation'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Building,
        href: '/informasi/clearing-house',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['clearing house', 'sengketa', 'konsultasi', 'kontrak', 'advokasi', 'mediasi', 'hukum']
      },
      {
        id: 'feature-perizinan',
        title: trans('Persyaratan Izin Berusaha & NIB OSS KBLI', 'Business Licensing & NIB OSS KBLI Requirements'),
        subtext: trans('Daftar syarat kelayakan legalitas dokumen rekanan penyedia untuk tender kementerian', 'List of supplier legal eligibility requirements for ministerial tenders'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: FileText,
        href: '/informasi/perizinan',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['izin', 'nib', 'oss', 'kbli', 'syarat usaha', 'kualifikasi']
      },
      {
        id: 'feature-pemilu-sounding',
        title: trans('Pengumuman Tender & Market Sounding', 'Tender Announcements & Market Sounding'),
        subtext: trans('Portal warta pengumuman penjajakan pasar, paket aktif, dan pengumuman pemenang', 'Market sounding announcements, active tender packages, and winners portal'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Package,
        href: '/informasi/pemilu',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['pengumuman lelang', 'market sounding', 'pemenang', 'sounding', 'daftar tender']
      },
      {
        id: 'feature-lpse-ekosistem',
        title: trans('Portal Layanan Terpadu SPSE, SIKaP & E-Katalog', 'SPSE, SIKaP & E-Catalog Integrated Services'),
        subtext: trans('Pintu gerbang akses login dan panduan ekosistem pengadaan elektronik LKPP', 'Gateway to login access and LKPP electronic procurement ecosystem guides'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Building,
        href: '/layanan',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['lpse', 'spse', 'sikap', 'katalog', 'sirup', 'inaproc', 'bela pengadaan']
      },
      {
        id: 'feature-organisasi',
        title: trans('Profil & Struktur Organisasi UKPBJ Kemnaker', 'UKPBJ Kemnaker Profile & Organizational Structure'),
        subtext: trans('Visi, misi, bagan hierarki pimpinan, dan tugas kelompok kerja pemilihan', 'Vision, mission, leadership hierarchy, and working committee duties'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Building,
        href: '/organisasi',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['organisasi', 'struktur', 'pimpinan', 'pejabat', 'profil', 'pokja', 'biro']
      },
      {
        id: 'feature-galeri',
        title: trans('Galeri Foto & Video Dokumentasi Kegiatan PBJ', 'PBJ Activity Documentation Photo & Video Gallery'),
        subtext: trans('Dokumentasi visual kunjungan kerja, rapat koordinasi pimpinan, dan bimtek', 'Visual records of official visits, leadership meetings, and technical guidance'),
        type: trans('Layanan', 'Service'),
        category: 'layanan',
        icon: Sparkles,
        href: '/galeri',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        tags: ['galeri', 'foto', 'video', 'dokumentasi', 'kegiatan']
      }
    ];

    items.push(...portalFeatures);

    return items;
  }, [packagesList, newsList, agendaList, regulasiList, sopList, panduanList, trans]);

  // Intelligent Search Matching Algorithm
  const filteredResults = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    if (rawQ.length === 0) return [];

    const queryWords = rawQ.split(/\s+/).filter(Boolean);

    return searchIndex
      .map((item) => {
        let score = 0;
        const itemTitle = item.title.toLowerCase();
        const itemSubtext = item.subtext.toLowerCase();
        const itemType = item.type.toLowerCase();
        const allTags = (item.tags || []).join(' ').toLowerCase();

        // Exact query match bonus
        if (itemTitle === rawQ) score += 100;
        else if (itemTitle.startsWith(rawQ)) score += 60;
        else if (itemTitle.includes(rawQ)) score += 40;

        // Individual word matches
        queryWords.forEach((word) => {
          if (itemTitle.includes(word)) score += 25;
          if (allTags.includes(word)) score += 20;
          if (itemSubtext.includes(word)) score += 10;
          if (itemType.includes(word)) score += 5;
        });

        return { item, score };
      })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item)
      .slice(0, 10);
  }, [query, searchIndex]);

  // Popular / Featured Recommendations when query is empty
  const defaultRecommendations = useMemo(() => {
    return [
      searchIndex.find((i) => i.id === 'feature-tkdn'),
      searchIndex.find((i) => i.category === 'tender'),
      searchIndex.find((i) => i.category === 'agenda'),
      searchIndex.find((i) => i.id === 'feature-clearing-house'),
      searchIndex.find((i) => i.category === 'regulasi'),
      searchIndex.find((i) => i.category === 'berita')
    ].filter(Boolean) as SearchableItem[];
  }, [searchIndex]);

  const displayList = query.trim().length > 0 ? filteredResults : defaultRecommendations;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Command Palette Modal */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[6vh] sm:pt-[10vh] px-3 sm:px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-blue-950/30 border border-slate-200/80 dark:border-slate-800 overflow-hidden pointer-events-auto flex flex-col max-h-[82vh]"
            >
              {/* Search Input Area */}
              <div className="relative flex items-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue ml-1.5 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={trans("Ketik kata kunci lelang, RUP, berita, agenda, atau regulasi...", "Search tenders, RUP, news, agenda, or regulations...")}
                  className="w-full bg-transparent border-none outline-none px-3 text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold mr-1 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Results Content Area */}
              <div className="overflow-y-auto p-3 sm:p-4 flex-1 space-y-2">
                <div className="flex items-center justify-between px-2 pt-1 pb-1">
                  <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {query.trim().length > 0 
                      ? `${trans("Hasil Pencarian", "Search Results")} (${filteredResults.length})` 
                      : trans("Rekomendasi & Pencarian Populer", "Popular & Recommended")}
                  </h3>
                  {query.trim().length > 0 && filteredResults.length > 0 && (
                    <span className="text-[10px] text-slate-400">
                      {trans("Klik item untuk membuka langsung", "Click to open directly")}
                    </span>
                  )}
                </div>

                {displayList.length === 0 ? (
                  /* Empty State */
                  <div className="p-8 sm:p-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                      {trans(`Tidak ada hasil untuk "${query}"`, `No results found for "${query}"`)}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      {trans(
                        "Coba periksa ejaan atau gunakan kata kunci umum seperti 'roti', 'tender', 'agenda', 'tkdn', atau 'sop'.",
                        "Please check your spelling or try common keywords like 'tender', 'agenda', 'tkdn', or 'sop'."
                      )}
                    </p>
                  </div>
                ) : (
                  /* Render List */
                  <div className="space-y-1.5 sm:space-y-2">
                    {displayList.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          if (item.category === 'tender') {
                            const codeOrId = item.id.replace('pkg-', '');
                            if (typeof window !== 'undefined') {
                              window.dispatchEvent(
                                new CustomEvent('open-package-detail', { detail: codeOrId })
                              );
                            }
                          }
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 group transition-all cursor-pointer border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700/80"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0 pr-2">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.badgeColor}`}>
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold border ${item.badgeColor}`}>
                                {item.type}
                              </span>
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-primary-blue transition-colors leading-snug line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                              {item.subtext}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-blue transform group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
