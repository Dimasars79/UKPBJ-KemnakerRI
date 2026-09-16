"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData } from '@/contexts/DataContext';
import { 
  BellRing, ChevronRight, Search, Filter, Newspaper, Package, 
  Scale, Calendar, Layers, Clock, ArrowRight,
  Laptop, Globe, MessageSquare
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

export default function PusatPembaruanPage() {
  const { newsList, packagesList, regulasiList, agendaList, sopList, siteSettings } = useData();
  const [selectedType, setSelectedType] = useState<UpdateType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru');

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
          badgeColor: 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
          badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
          title: item.title,
          date: item.date,
          rawDate: item.date,
          excerpt: item.excerpt || item.content?.slice(0, 140) + '...',
          meta: `Oleh ${item.author} • ${item.views || 0} Pembaca`,
          href: `/berita/${item.id}`,
          actionLabel: 'Baca Berita',
          icon: <Newspaper className="w-4 h-4 text-blue-600" />,
          tags: item.tags && item.tags.length > 0 ? item.tags : ['#BeritaPBJ', '#UKPBJKemnaker']
        });
      });

    // 2. Paket Pengadaan
    packagesList.forEach((pkg) => {
      list.push({
        id: `pkg-${pkg.id}`,
        type: 'paket',
        typeLabel: `PENGADAAN • ${pkg.category.toUpperCase()}`,
        badgeColor: 'text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
        title: `${pkg.code}: ${pkg.title}`,
        date: `Batas: ${pkg.deadline}`,
        rawDate: pkg.deadline,
        excerpt: pkg.desc || `Paket pengadaan barang/jasa dengan metode ${pkg.method}. Status: ${pkg.status}.`,
        meta: `Satker: ${pkg.unit} • HPS: ${pkg.hps}`,
        href: '/#pengadaan',
        actionLabel: 'Lihat Paket Tender',
        icon: <Package className="w-4 h-4 text-indigo-600" />,
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
          badgeColor: 'text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
          badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
          title: `${reg.nomor} tentang ${reg.tentang}`,
          date: `Tahun ${reg.tahun}`,
          rawDate: reg.tahun,
          excerpt: `Ketentuan dan payung hukum resmi mengenai ${reg.tentang}. Dokumen PDF (${reg.fileSize}).`,
          meta: `JDIH Kemnaker • Status: ${reg.status}`,
          href: '/informasi/peraturan',
          actionLabel: 'Buka Regulasi',
          icon: <Scale className="w-4 h-4 text-purple-600" />
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
          badgeColor: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
          title: agd.title,
          date: `${agd.date} (${agd.time})`,
          rawDate: agd.date,
          excerpt: agd.description || `Jadwal ${agd.category} yang diselenggarakan oleh ${agd.organizer}. Kuota: ${agd.capacity}.`,
          meta: `Lokasi: ${agd.location} • ${agd.organizer}`,
          href: '/agenda',
          actionLabel: 'Lihat Jadwal Agenda',
          icon: <Calendar className="w-4 h-4 text-emerald-600" />,
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
          badgeColor: 'text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
          badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
          title: `${sop.kode}: ${sop.judul}`,
          date: sop.revisi,
          rawDate: sop.revisi,
          excerpt: sop.deskripsi || `Pedoman alur kerja standar pengadaan unit kerja ${sop.unit} dengan ${sop.tahapanCount} tahapan kerja.`,
          meta: `Unit: ${sop.unit} • ${sop.tahapanCount} Tahapan • ${sop.status}`,
          href: '/informasi/sop',
          actionLabel: 'Buka Dokumen SOP',
          icon: <Layers className="w-4 h-4 text-amber-600" />
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

      <main className="flex-grow pb-24">
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Pusat Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Pusat Seluruh Pembaruan</span>
            </div>

            <FadeIn direction="up">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Pusat Seluruh Informasi & Pembaruan
                </h1>
                
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                  Akses terpadu seluruh rekam jejak berita, pengumuman tender paket lelang, regulasi pengadaan terbaru, agenda kegiatan, dan standar operasional prosedur UKPBJ Kemnaker RI.
                </p>
              </div>

              {/* Statistics Counter Cards Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                {[
                  { label: 'Total Pembaruan', count: countStats.all, icon: <BellRing className="w-4 h-4 text-amber-300" />, bg: 'bg-white/10' },
                  { label: 'Berita & Warta', count: countStats.berita, icon: <Newspaper className="w-4 h-4 text-blue-300" />, bg: 'bg-blue-500/20' },
                  { label: 'Paket Tender', count: countStats.paket, icon: <Package className="w-4 h-4 text-indigo-300" />, bg: 'bg-indigo-500/20' },
                  { label: 'Regulasi JDIH', count: countStats.regulasi, icon: <Scale className="w-4 h-4 text-purple-300" />, bg: 'bg-purple-500/20' },
                  { label: 'Agenda & Jadwal', count: countStats.agenda, icon: <Calendar className="w-4 h-4 text-emerald-300" />, bg: 'bg-emerald-500/20' },
                  { label: 'Prosedur SOP', count: countStats.sop, icon: <Layers className="w-4 h-4 text-amber-300" />, bg: 'bg-amber-500/20' },
                ].map((stat, idx) => (
                  <div key={idx} className={`${stat.bg} backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-white`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-slate-300 truncate">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <p className="text-xl font-black">{stat.count}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN CONTENT & FILTER SECTION */}
        {/* ========================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          
          {/* SEARCH & CATEGORY FILTER BAR */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/80 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berita, paket tender, regulasi, jadwal agenda, nomor SK, atau SOP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-primary-blue focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-slate-500 hidden sm:inline">Urutkan:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'terbaru' | 'terlama')}
                  className="px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-primary-blue cursor-pointer"
                >
                  <option value="terbaru">Pembaruan Terbaru</option>
                  <option value="terlama">Pembaruan Terlama</option>
                </select>
              </div>
            </div>

            {/* Filter Buttons Horizontal List */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
              {[
                { type: 'all' as UpdateType, label: 'Semua Pembaruan', count: countStats.all, icon: <Filter className="w-3.5 h-3.5" /> },
                { type: 'berita' as UpdateType, label: 'Berita & Warta', count: countStats.berita, icon: <Newspaper className="w-3.5 h-3.5" /> },
                { type: 'paket' as UpdateType, label: 'Paket Pengadaan', count: countStats.paket, icon: <Package className="w-3.5 h-3.5" /> },
                { type: 'regulasi' as UpdateType, label: 'Regulasi & SK', count: countStats.regulasi, icon: <Scale className="w-3.5 h-3.5" /> },
                { type: 'agenda' as UpdateType, label: 'Agenda PBJ', count: countStats.agenda, icon: <Calendar className="w-3.5 h-3.5" /> },
                { type: 'sop' as UpdateType, label: 'Standar SOP', count: countStats.sop, icon: <Layers className="w-3.5 h-3.5" /> },
              ].map((btn) => {
                const isActive = selectedType === btn.type;
                return (
                  <button
                    key={btn.type}
                    onClick={() => setSelectedType(btn.type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-navy text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {btn.icon}
                    <span>{btn.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
                    }`}>
                      {btn.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= UPDATES LIST & SIDEBAR ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / MAIN UPDATES FEED (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-slate-500">
                  Menampilkan <strong className="text-primary-navy">{filteredUpdates.length}</strong> pembaruan informasi
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-primary-blue hover:underline"
                  >
                    Hapus Pencarian
                  </button>
                )}
              </div>

              {filteredUpdates.length > 0 ? (
                filteredUpdates.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-primary-blue/40 transition-all group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1.5 ${item.badgeBg} ${item.badgeColor}`}>
                          {item.icon}
                          <span>{item.typeLabel}</span>
                        </span>
                        {item.extraInfo && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {item.extraInfo}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <Link href={item.href} className="block group">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug mb-2">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {item.excerpt}
                    </p>

                    {/* Meta info & Action */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                        {item.meta}
                      </span>

                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-navy hover:bg-primary-blue text-white font-bold text-xs shadow-xs hover:shadow transition-all active:scale-95 ml-auto"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Tags if available */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-3 pt-2.5 flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-500">
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-navy mb-1">Pembaruan Tidak Ditemukan</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                    Tidak ada pembaruan informasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori yang dipilih.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('all');
                    }}
                    className="px-5 py-2.5 bg-primary-navy hover:bg-primary-blue text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Reset Filter & Pencarian
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* STATUS SISTEM & SERVER */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-primary-navy flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-emerald-600" />
                    <span>Status Layanan Digital</span>
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online</span>
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Portal SPSE Kemnaker', status: siteSettings.serverStatus || 'Normal' },
                    { name: 'SiRUP LKPP Terintegrasi', status: 'Normal' },
                    { name: 'Sistem Katalog Elektronik', status: 'Normal' },
                    { name: 'Layanan Pengaduan & WBS', status: 'Normal' }
                  ].map((srv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-semibold text-slate-700">{srv.name}</span>
                      <span className="font-bold text-emerald-600 text-[11px]">✓ {srv.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TAUTAN CEPAT PUSAT INFORMASI */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-sm text-primary-navy flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                  <Globe className="w-4 h-4 text-primary-blue" />
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
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/70 hover:border-blue-200 transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-primary-blue transition-colors">
                      {channel.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 group-hover:text-primary-blue">
                      {channel.count} →
                    </span>
                  </Link>
                ))}
              </div>

              {/* BANTUAN & LAYANAN HELPBOX */}
              <div className="bg-gradient-to-br from-primary-navy via-[#0c2447] to-primary-blue rounded-3xl p-6 text-white shadow-md">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">
                  Butuh Informasi Tambahan?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Hubungi Helpdesk Pengadaan dan Tim Konsultasi UKPBJ Kemnaker RI untuk klarifikasi dokumen dan jadwal.
                </p>
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 w-full bg-accent-gold hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
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
