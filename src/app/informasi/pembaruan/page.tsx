"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData } from '@/contexts/DataContext';
import { 
  BellRing, ChevronRight, ChevronLeft, Search, Filter, Newspaper, Package, 
  Scale, Calendar, Layers, Clock, ArrowRight,
  Globe, MessageSquare
} from 'lucide-react';

type UpdateType = 'all' | 'berita' | 'paket' | 'regulasi' | 'agenda' | 'sop';

interface UnifiedUpdateItem {
  id: string;
  type: 'berita' | 'paket' | 'regulasi' | 'agenda' | 'sop';
  typeLabel: string;
  badgeColor: string;
  badgeBg: string;
  title: string;
  date: string;
  rawDate: string;
  excerpt: string;
  meta: string;
  href: string;
  actionLabel: string;
  icon: React.ReactNode;
  tags?: string[];
  extraInfo?: string;
}

const ITEMS_PER_PAGE = 6;

export default function PusatPembaruanPage() {
  const { newsList, packagesList, regulasiList, agendaList, sopList } = useData();
  const [selectedType, setSelectedType] = useState<UpdateType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru');
  const [currentPage, setCurrentPage] = useState(1);

  // Unified list mapping
  const allUpdates: UnifiedUpdateItem[] = useMemo(() => {
    const list: UnifiedUpdateItem[] = [];

    // 1. Berita (Published only)
    newsList
      .filter((n) => n.status === 'Published')
      .forEach((item) => {
        list.push({
          id: `news-${item.id}`,
          type: 'berita',
          typeLabel: `BERITA • ${item.category.toUpperCase()}`,
          badgeColor: 'text-slate-950 dark:text-white border-slate-300 dark:border-slate-700',
          badgeBg: 'bg-slate-100 dark:bg-slate-800',
          title: item.title,
          date: item.date,
          rawDate: item.date,
          excerpt: item.excerpt || item.content?.slice(0, 140) + '...',
          meta: `Oleh ${item.author} • ${item.views || 0} Pembaca`,
          href: `/berita/${item.id}`,
          actionLabel: 'Baca Berita',
          icon: <Newspaper className="w-4 h-4 text-slate-950 dark:text-white" />,
          tags: item.tags && item.tags.length > 0 ? item.tags : ['#BeritaPBJ', '#UKPBJKemnaker']
        });
      });

    // 2. Paket Pengadaan
    packagesList.forEach((pkg) => {
      list.push({
        id: `pkg-${pkg.id}`,
        type: 'paket',
        typeLabel: `PENGADAAN • ${pkg.category.toUpperCase()}`,
        badgeColor: 'text-slate-950 dark:text-white border-slate-300 dark:border-slate-700',
        badgeBg: 'bg-slate-100 dark:bg-slate-800',
        title: `${pkg.code}: ${pkg.title}`,
        date: `Batas: ${pkg.deadline}`,
        rawDate: pkg.deadline,
        excerpt: pkg.desc || `Paket pengadaan barang/jasa dengan metode ${pkg.method}. Status: ${pkg.status}.`,
        meta: `Satker: ${pkg.unit} • HPS: ${pkg.hps}`,
        href: '/#pengadaan',
        actionLabel: 'Lihat Paket Tender',
        icon: <Package className="w-4 h-4 text-slate-950 dark:text-white" />,
        extraInfo: pkg.status
      });
    });

    // 3. Regulasi
    regulasiList
      .filter((r) => r.status === 'Aktif')
      .forEach((reg) => {
        list.push({
          id: `reg-${reg.id}`,
          type: 'regulasi',
          typeLabel: `REGULASI • ${reg.kategori.toUpperCase()}`,
          badgeColor: 'text-slate-950 dark:text-white border-slate-300 dark:border-slate-700',
          badgeBg: 'bg-slate-100 dark:bg-slate-800',
          title: `${reg.nomor} tentang ${reg.tentang}`,
          date: `Tahun ${reg.tahun}`,
          rawDate: reg.tahun,
          excerpt: `Ketentuan dan payung hukum resmi mengenai ${reg.tentang}. Dokumen PDF (${reg.fileSize}).`,
          meta: `JDIH Kemnaker • Status: ${reg.status}`,
          href: '/informasi/peraturan',
          actionLabel: 'Buka Regulasi',
          icon: <Scale className="w-4 h-4 text-slate-950 dark:text-white" />
        });
      });

    // 4. Agenda
    agendaList
      .filter((a) => a.status !== 'Dibatalkan')
      .forEach((agd) => {
        list.push({
          id: `agd-${agd.id}`,
          type: 'agenda',
          typeLabel: `AGENDA • ${agd.category.toUpperCase()}`,
          badgeColor: 'text-slate-950 dark:text-white border-slate-300 dark:border-slate-700',
          badgeBg: 'bg-slate-100 dark:bg-slate-800',
          title: agd.title,
          date: `${agd.date} (${agd.time})`,
          rawDate: agd.date,
          excerpt: agd.description || `Jadwal ${agd.category} yang diselenggarakan oleh ${agd.organizer}. Kuota: ${agd.capacity}.`,
          meta: `Lokasi: ${agd.location} • ${agd.organizer}`,
          href: '/agenda',
          actionLabel: 'Lihat Jadwal Agenda',
          icon: <Calendar className="w-4 h-4 text-slate-950 dark:text-white" />,
          extraInfo: agd.status
        });
      });

    // 5. SOP
    sopList
      .filter((s) => s.status === 'Berlaku')
      .forEach((sop) => {
        list.push({
          id: `sop-${sop.id}`,
          type: 'sop',
          typeLabel: 'STANDAR OPERASIONAL (SOP)',
          badgeColor: 'text-slate-950 dark:text-white border-slate-300 dark:border-slate-700',
          badgeBg: 'bg-slate-100 dark:bg-slate-800',
          title: `${sop.kode}: ${sop.judul}`,
          date: sop.revisi,
          rawDate: sop.revisi,
          excerpt: sop.deskripsi || `Pedoman alur kerja standar pengadaan unit kerja ${sop.unit} dengan ${sop.tahapanCount} tahapan kerja.`,
          meta: `Unit: ${sop.unit} • ${sop.tahapanCount} Tahapan • ${sop.status}`,
          href: '/informasi/sop',
          actionLabel: 'Buka Dokumen SOP',
          icon: <Layers className="w-4 h-4 text-slate-950 dark:text-white" />
        });
      });

    return list;
  }, [newsList, packagesList, regulasiList, agendaList, sopList]);

  // Filtered & Searched List
  const filteredUpdates = useMemo(() => {
    return allUpdates
      .filter((item) => {
        // Type filter
        if (selectedType !== 'all' && item.type !== selectedType) {
          return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchExcerpt = item.excerpt.toLowerCase().includes(query);
          const matchMeta = item.meta.toLowerCase().includes(query);
          const matchType = item.typeLabel.toLowerCase().includes(query);
          const matchTags = item.tags ? item.tags.some(t => t.toLowerCase().includes(query)) : false;

          if (!matchTitle && !matchExcerpt && !matchMeta && !matchType && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'terlama') {
          return a.id.localeCompare(b.id);
        }
        return b.id.localeCompare(a.id);
      });
  }, [allUpdates, selectedType, searchQuery, sortOrder]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredUpdates.length / ITEMS_PER_PAGE));
  const paginatedUpdates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUpdates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUpdates, currentPage]);

  // Counts for tabs
  const countStats = useMemo(() => {
    return {
      all: allUpdates.length,
      berita: allUpdates.filter(i => i.type === 'berita').length,
      paket: allUpdates.filter(i => i.type === 'paket').length,
      regulasi: allUpdates.filter(i => i.type === 'regulasi').length,
      agenda: allUpdates.filter(i => i.type === 'agenda').length,
      sop: allUpdates.filter(i => i.type === 'sop').length,
    };
  }, [allUpdates]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-16 sm:pb-24">
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 sm:mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Pusat Informasi</Link>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-amber-300">Pusat Seluruh Pembaruan</span>
            </div>

            <FadeIn direction="up">
              <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
                  Pusat Seluruh Informasi & Pembaruan
                </h1>
                
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal mb-5 sm:mb-8">
                  Akses terpadu seluruh rekam jejak berita, pengumuman tender paket lelang, regulasi pengadaan terbaru, agenda kegiatan, dan standar operasional prosedur UKPBJ Kemnaker RI.
                </p>
              </div>

              {/* Statistics Counter Cards Strip - Sleek Transparent Glassmorphism */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 pt-1 sm:pt-2">
                {[
                  { type: 'all' as UpdateType, label: 'Total Pembaruan', count: countStats.all, icon: <BellRing className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> },
                  { type: 'berita' as UpdateType, label: 'Berita & Warta', count: countStats.berita, icon: <Newspaper className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" /> },
                  { type: 'paket' as UpdateType, label: 'Paket Tender', count: countStats.paket, icon: <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300" /> },
                  { type: 'regulasi' as UpdateType, label: 'Regulasi JDIH', count: countStats.regulasi, icon: <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" /> },
                  { type: 'agenda' as UpdateType, label: 'Agenda & Jadwal', count: countStats.agenda, icon: <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" /> },
                  { type: 'sop' as UpdateType, label: 'Prosedur SOP', count: countStats.sop, icon: <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200" /> },
                ].map((stat, idx) => {
                  const isSelected = selectedType === stat.type;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedType(stat.type);
                        setCurrentPage(1);
                      }}
                      className={`text-left rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-xl transition-all duration-300 group cursor-pointer border ${
                        isSelected
                          ? 'bg-white/[0.16] border-accent-gold/70 shadow-lg shadow-black/20 ring-1 ring-accent-gold/40 -translate-y-0.5'
                          : 'bg-white/[0.05] hover:bg-white/[0.10] border-white/10 hover:border-white/25 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors truncate">
                          {stat.label}
                        </span>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-lg sm:text-2xl font-black text-white tracking-tight leading-none">
                          {stat.count}
                        </p>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN CONTENT & FILTER SECTION */}
        {/* ========================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-4 sm:-mt-6 relative z-20">
          
          {/* SEARCH & CATEGORY FILTER BAR */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border border-slate-200/80 mb-5 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
              
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berita, paket tender, regulasi, jadwal agenda, nomor SK, atau SOP..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-primary-blue focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 hidden sm:inline">Urutkan:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as 'terbaru' | 'terlama');
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 outline-none focus:border-primary-blue cursor-pointer"
                >
                  <option value="terbaru">Pembaruan Terbaru</option>
                  <option value="terlama">Pembaruan Terlama</option>
                </select>
              </div>
            </div>

            {/* Filter Buttons Horizontal List */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
              {[
                { type: 'all' as UpdateType, label: 'Semua Pembaruan', count: countStats.all, icon: <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
                { type: 'berita' as UpdateType, label: 'Berita & Warta', count: countStats.berita, icon: <Newspaper className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
                { type: 'paket' as UpdateType, label: 'Paket Pengadaan', count: countStats.paket, icon: <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
                { type: 'regulasi' as UpdateType, label: 'Regulasi & SK', count: countStats.regulasi, icon: <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
                { type: 'agenda' as UpdateType, label: 'Agenda PBJ', count: countStats.agenda, icon: <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
                { type: 'sop' as UpdateType, label: 'Standar SOP', count: countStats.sop, icon: <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> },
              ].map((btn) => {
                const isActive = selectedType === btn.type;
                return (
                  <button
                    key={btn.type}
                    onClick={() => {
                      setSelectedType(btn.type);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-blue text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {btn.icon}
                    <span>{btn.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
                    }`}>
                      {btn.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= UPDATES GRID & SIDEBAR ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* LEFT / MAIN UPDATES GRID (8 cols) */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between px-1">
                <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                  Menampilkan <strong className="text-primary-navy">{Math.min(filteredUpdates.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredUpdates.length)}</strong> dari <strong className="text-primary-navy">{filteredUpdates.length}</strong> pembaruan
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-[11px] sm:text-xs font-bold text-primary-blue hover:underline cursor-pointer"
                  >
                    Hapus Pencarian
                  </button>
                )}
              </div>

              {paginatedUpdates.length > 0 ? (
                <>
                  {/* 2-COLUMN RESPONSIVE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                    {paginatedUpdates.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-primary-blue/40 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 ${item.badgeBg} ${item.badgeColor}`}>
                                {item.icon}
                                <span>{item.typeLabel}</span>
                              </span>
                              {item.extraInfo && (
                                <span className="px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {item.extraInfo}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-[11px] font-medium shrink-0">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{item.date}</span>
                            </div>
                          </div>

                          <Link href={item.href} className="block group mb-1.5 sm:mb-2">
                            <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug line-clamp-2 min-h-0 sm:min-h-[40px]">
                              {item.title}
                            </h3>
                          </Link>

                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2.5 sm:mb-3">
                            {item.excerpt}
                          </p>
                        </div>

                        {/* Meta info & Action at card bottom */}
                        <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs mt-auto">
                          <span className="text-slate-500 text-[10px] sm:text-[11px] font-medium truncate max-w-[130px] sm:max-w-[170px]" title={item.meta}>
                            {item.meta}
                          </span>

                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-200/80 hover:border-primary-blue/50 bg-transparent hover:bg-blue-50/60 text-primary-blue font-bold text-[10px] sm:text-xs transition-all active:scale-95 shrink-0"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PAGINATION CONTROLS */}
                  {totalPages > 1 && (
                    <div className="mt-5 sm:mt-6 flex items-center justify-between gap-2 bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                        <span className="hidden sm:inline">Halaman </span>
                        <span className="font-bold text-primary-navy">{currentPage}</span>
                        <span className="text-slate-400 font-normal"> / {totalPages}</span>
                      </p>

                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <button
                          onClick={() => {
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                          }}
                          disabled={currentPage === 1}
                          aria-label="Halaman sebelumnya"
                          className={`h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 border transition-all ${
                            currentPage === 1
                              ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-primary-blue shadow-xs cursor-pointer active:scale-95'
                          }`}
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Sebelumnya</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = currentPage === pageNum;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                  isActive
                                    ? 'bg-primary-blue text-white shadow-sm shadow-blue-500/25 scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => {
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                          }}
                          disabled={currentPage === totalPages}
                          aria-label="Halaman selanjutnya"
                          className={`h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 border transition-all ${
                            currentPage === totalPages
                              ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-primary-blue shadow-xs cursor-pointer active:scale-95'
                          }`}
                        >
                          <span className="hidden sm:inline">Selanjutnya</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-sm">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-amber-200">
                    <Search className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-navy mb-1">Pembaruan Tidak Ditemukan</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-4 sm:mb-6">
                    Tidak ada pembaruan informasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori yang dipilih.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('all');
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-primary-navy hover:bg-primary-blue text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Reset Filter & Pencarian
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR (4 cols) */}
            <aside className="lg:col-span-4 space-y-4 sm:space-y-6">

              {/* TAUTAN CEPAT PUSAT INFORMASI */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-2.5 sm:space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-primary-navy flex items-center gap-2 mb-2 sm:mb-3 pb-2.5 sm:pb-3 border-b border-slate-100">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-blue" />
                  <span>Kanal Layanan Terkait</span>
                </h4>

                {[
                  { title: 'Warta & Berita Resmi', href: '/berita', count: `${countStats.berita} Artikel` },
                  { title: 'Jadwal & Agenda PBJ', href: '/agenda', count: `${countStats.agenda} Acara` },
                  { title: 'Regulasi & JDIH Pengadaan', href: '/informasi/peraturan', count: `${countStats.regulasi} Dokumen` },
                  { title: 'Standar Operasional (SOP)', href: '/informasi/sop', count: `${countStats.sop} SOP` },
                  { title: 'Clearing House PBJ', href: '/informasi/clearing-house', count: 'Konsultasi' },
                  { title: 'Panduan & Juknis Pengadaan', href: '/informasi/panduan', count: 'Unduhan' }
                ].map((channel, idx) => (
                  <Link
                    key={idx}
                    href={channel.href}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/70 hover:border-blue-200 transition-all group"
                  >
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-primary-blue transition-colors">
                      {channel.title}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 group-hover:text-primary-blue">
                      {channel.count} →
                    </span>
                  </Link>
                ))}
              </div>

              {/* BANTUAN & LAYANAN HELPBOX */}
              <div className="bg-gradient-to-br from-primary-navy via-[#0c2447] to-primary-blue rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-3">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm mb-1 sm:mb-1.5">
                  Butuh Informasi Tambahan?
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                  Hubungi Helpdesk Pengadaan dan Tim Konsultasi UKPBJ Kemnaker RI untuk klarifikasi dokumen dan jadwal.
                </p>
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-1.5 w-full bg-accent-gold hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all shadow-md active:scale-95"
                >
                  <span>Pusat Layanan Konsultasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </aside>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
