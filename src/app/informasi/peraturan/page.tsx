"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, Download, Eye, Calendar, 
  ChevronRight, Filter, BookOpen, ShieldCheck, 
  CheckCircle2, ArrowRight, ExternalLink, Scale,
  X, ChevronLeft, ZoomIn, ZoomOut
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';

type Regulation = {
  id: string;
  category: string;
  title: string;
  nomor: string;
  date: string;
  status: 'Berlaku' | 'Diubah' | 'Dicabut';
  fileSize: string;
  downloadUrl?: string;
  desc: string;
};

const mapCategoryToId = (kategori: string): string => {
  switch (kategori) {
    case 'Undang-Undang': return 'uu';
    case 'Peraturan Pemerintah': return 'pp';
    case 'Peraturan Presiden': return 'perpres';
    case 'Peraturan Menteri':
    case 'Peraturan LKPP': return 'permen';
    case 'Keputusan Menteri': return 'kepmen';
    case 'Surat Edaran': return 'se';
    default: return 'lain';
  }
};

export default function PeraturanPage() {
  const { regulasiList } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewRegulation, setActivePreviewRegulation] = useState<Regulation | null>(null);
  const [previewPage, setPreviewPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Dynamic regulations directly from Supabase / DataContext
  const dynamicRegulations: Regulation[] = useMemo(() => {
    return regulasiList
      .filter(item => item.status === 'Aktif')
      .map(item => ({
        id: item.id,
        category: mapCategoryToId(item.kategori),
        nomor: item.nomor,
        title: item.nomor + ' - ' + item.tentang,
        date: `Tahun ${item.tahun}`,
        status: 'Berlaku',
        fileSize: item.fileSize || '2.0 MB',
        downloadUrl: item.downloadUrl,
        desc: item.tentang
      }));
  }, [regulasiList]);

  const categories = useMemo(() => [
    { id: 'all', label: 'Semua Regulasi', icon: <BookOpen className="w-4 h-4" />, count: dynamicRegulations.length },
    { id: 'uu', label: 'Undang-Undang', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'uu').length },
    { id: 'pp', label: 'Peraturan Pemerintah', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'pp').length },
    { id: 'perpres', label: 'Peraturan Presiden', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'perpres').length },
    { id: 'permen', label: 'Peraturan Menteri / Lembaga', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'permen').length },
    { id: 'kepmen', label: 'Keputusan Menteri', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'kepmen').length },
    { id: 'se', label: 'Surat Edaran', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'se').length },
    { id: 'lain', label: 'Lain-Lain & Pedoman', icon: <FileText className="w-4 h-4" />, count: dynamicRegulations.filter(r => r.category === 'lain').length },
  ], [dynamicRegulations]);

  const filteredRegulations = useMemo(() => {
    return dynamicRegulations.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dynamicRegulations, selectedCategory, searchQuery]);

  const handleDownloadRegulation = (item: Regulation) => {
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank');
      return;
    }
    const content = `SALINAN RESMI DOKUMEN HUKUM & REGULASI PBJ\n` +
      `KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA\n` +
      `============================================================\n\n` +
      `Nomor Peraturan : ${item.nomor}\n` +
      `Tentang         : ${item.desc}\n` +
      `Status          : ${item.status}\n` +
      `Tahun/Tanggal   : ${item.date}\n` +
      `Format          : Dokumen PDF Resmi (${item.fileSize})\n\n` +
      `Diterbitkan oleh JDIH & Biro UKPBJ Kementerian Ketenagakerjaan RI.\n` +
      `Dokumen ini berlaku sebagai pedoman operasional pengadaan barang dan jasa pemerintah.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.nomor.replace(/[\/\s:,]/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          {/* Subtle Grid Pattern & Lights */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Peraturan & Regulasi</span>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <Scale className="w-3.5 h-3.5 text-amber-300" />
                  <span>JDIH & Regulasi Resmi Pengadaan</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Peraturan & Dasar Hukum PBJ
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Kumpulan produk hukum, undang-undang, peraturan presiden, dan keputusan menteri yang menjadi pedoman resmi pengadaan barang dan jasa.
                </p>

                {/* Main Search Bar */}
                <div className="relative max-w-xl mx-auto">
                  <div className="relative flex items-center bg-white rounded-full shadow-2xl p-1.5 border border-slate-200/80 focus-within:border-primary-blue focus-within:ring-4 focus-within:ring-primary-blue/15 transition-all">
                    <div className="pl-4 text-slate-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nomor peraturan, judul, atau kata kunci..."
                      className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="px-3 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION (Sidebar + Regulation Cards) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT SIDEBAR (Categories) ================= */}
            <div className="lg:col-span-4 static lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Filter className="w-4 h-4 text-accent-gold" />
                    <h3 className="font-bold text-sm tracking-wide">Kategori Peraturan</h3>
                  </div>
                  <span className="text-[11px] font-bold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {categories.length - 1} Klasifikasi
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all text-left ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-navy to-primary-blue text-white shadow-md font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-primary-navy'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/15 text-accent-gold' : 'bg-slate-100 text-slate-500'}`}>
                            {cat.icon}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* JDIH Helpbox Card */}
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-accent-gold/20 flex items-center justify-center flex-shrink-0 text-accent-gold">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 mb-1">Integrasi JDIH Kemnaker</h4>
                    <p className="text-[11px] text-amber-800/80 leading-relaxed mb-3">
                      Seluruh dokumen hukum terhubung langsung dengan Jaringan Dokumentasi dan Informasi Hukum Nasional.
                    </p>
                    <a 
                      href="https://jdih.kemnaker.go.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 hover:underline"
                    >
                      <span>Buka Portal JDIH</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT MAIN CONTENT (Cards Grid) ================= */}
            <div className="lg:col-span-8">
              {/* Results Topbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary-navy">
                    Menampilkan {filteredRegulations.length} Dokumen Regulasi
                  </span>
                  {selectedCategory !== 'all' && (
                    <span className="text-[10px] font-bold bg-blue-50 text-primary-blue px-2.5 py-0.5 rounded-full border border-blue-100">
                      {categories.find(c => c.id === selectedCategory)?.label}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Format: Dokumen PDF Resmi
                </div>
              </div>

              {/* Regulation Cards */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredRegulations.length > 0 ? (
                    filteredRegulations.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                {item.nomor}
                              </span>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                item.status === 'Berlaku'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{item.status}</span>
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug mb-2">
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                              {item.desc}
                            </p>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{item.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                <span>PDF ({item.fileSize})</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col items-center gap-2 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <button 
                              onClick={() => handleDownloadRegulation(item)}
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                              title="Unduh Salinan Resmi"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh PDF</span>
                            </button>

                            <button 
                              onClick={() => {
                                setActivePreviewRegulation(item);
                                setPreviewPage(1);
                                setZoomLevel(100);
                              }}
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-primary-navy px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                              title="Buka Pratinjau Dokumen"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              <span>Pratinjau</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800 mb-1">Tidak Ada Regulasi Ditemukan</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Tidak ditemukan peraturan yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori yang dipilih.
                      </p>
                      <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                        className="text-xs font-bold text-primary-blue hover:underline"
                      >
                        Reset Filter & Pencarian
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {filteredRegulations.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-700 font-bold text-xs py-3 px-8 rounded-xl transition-all shadow-xs hover:shadow-sm">
                    <span>Lihat Seluruh Arsip JDIH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      {/* ================= REGULATION DOCUMENT PREVIEW MODAL ================= */}
      <AnimatePresence>
        {activePreviewRegulation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreviewRegulation(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-[#1e293b] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-700 flex flex-col h-[92vh]"
            >
              {/* Topbar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#0f172a] border-b border-slate-800 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {activePreviewRegulation.nomor}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">• {activePreviewRegulation.date}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
                      {activePreviewRegulation.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-slate-300 text-xs">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                      className="p-1 hover:text-white transition-colors"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-mono text-[11px]">{zoomLevel}%</span>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                      className="p-1 hover:text-white transition-colors"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDownloadRegulation(activePreviewRegulation)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                    title="Unduh Salinan PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Unduh PDF</span>
                  </button>

                  <button
                    onClick={() => setActivePreviewRegulation(null)}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Tutup Pratinjau"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Document Viewport */}
              <div className="flex-1 bg-[#334155] p-3 sm:p-6 overflow-y-auto flex justify-center items-start custom-scrollbar">
                <div 
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="bg-white text-slate-800 w-full max-w-[760px] min-h-[920px] rounded-lg shadow-2xl p-6 sm:p-12 relative flex flex-col justify-between transition-transform duration-200 border border-slate-200"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
                    <span className="text-5xl sm:text-7xl font-black uppercase rotate-[-35deg] text-slate-900 tracking-widest text-center">
                      JDIH KEMNAKER RI
                    </span>
                  </div>

                  <div>
                    {/* Official Regulation Letterhead */}
                    <div className="text-center border-b-2 border-slate-900 pb-5 mb-6">
                      <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-primary-navy text-accent-gold flex items-center justify-center font-bold text-2xl shadow-sm">
                        <Scale className="w-7 h-7 text-amber-400" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                        KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA
                      </h3>
                      <p className="text-[11px] text-slate-600 font-bold uppercase mt-1">
                        JARINGAN DOKUMENTASI DAN INFORMASI HUKUM (JDIH) PBJ
                      </p>
                    </div>

                    {/* Regulation Title */}
                    <div className="text-center my-6">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-800 border border-slate-200 mb-2">
                        {activePreviewRegulation.nomor}
                      </span>
                      <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase max-w-xl mx-auto leading-snug">
                        TENTANG {activePreviewRegulation.desc}
                      </h2>
                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Status: {activePreviewRegulation.status}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    {previewPage === 1 && (
                      <div className="space-y-4 text-xs sm:text-[13px] text-slate-700 leading-relaxed pt-4 border-t border-slate-100">
                        <div>
                          <h5 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-primary-navy">
                            Menimbang:
                          </h5>
                          <ul className="space-y-2 list-disc list-inside text-slate-600 pl-1">
                            <li>Bahwa untuk melaksanakan tertib administrasi, akuntabilitas, dan transparansi pengadaan barang/jasa pemerintah di lingkungan Kementerian Ketenagakerjaan.</li>
                            <li>Bahwa berdasarkan ketentuan perundang-undangan nasional, perlu menetapkan dasar hukum pelaksanaan PBJ yang terintegrasi.</li>
                          </ul>
                        </div>

                        <div className="pt-2">
                          <h5 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-primary-navy">
                            Mengingat:
                          </h5>
                          <ul className="space-y-2 list-disc list-inside text-slate-600 pl-1">
                            <li>Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan.</li>
                            <li>Peraturan Presiden Nomor 12 Tahun 2021 tentang Pengadaan Barang/Jasa Pemerintah.</li>
                            <li>Peraturan Menteri Ketenagakerjaan tentang Organisasi dan Tata Kerja Kemnaker.</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {previewPage === 2 && (
                      <div className="space-y-4 text-xs sm:text-[13px] text-slate-700 leading-relaxed pt-4 border-t border-slate-100">
                        <div>
                          <h5 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-primary-navy">
                            MEMUTUSKAN & MENETAPKAN:
                          </h5>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                            <div>
                              <span className="font-bold text-slate-900 block text-xs">Pasal 1</span>
                              <p className="text-[11px] text-slate-600">Seluruh unit kerja dan satuan kerja di lingkungan Kementerian Ketenagakerjaan wajib memedomani petunjuk teknis ini dalam seluruh proses PBJ.</p>
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block text-xs">Pasal 2</span>
                              <p className="text-[11px] text-slate-600">Pelaksanaan e-purchasing, e-tendering, dan pemilihan penyedia dilaksanakan secara elektronik melalui SPSE Kemnaker.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                    <span>JDIH Kementerian Ketenagakerjaan RI</span>
                    <span className="font-bold text-slate-600">Halaman {previewPage} dari 2</span>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="px-4 sm:px-6 py-3 bg-[#0f172a] border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewPage(prev => Math.max(1, prev - 1))}
                    disabled={previewPage === 1}
                    className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </button>
                  <span className="text-xs text-slate-400 font-semibold px-2">
                    Hal <strong className="text-white">{previewPage}</strong> / 2
                  </span>
                  <button
                    onClick={() => setPreviewPage(prev => Math.min(2, prev + 1))}
                    disabled={previewPage === 2}
                    className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePreviewRegulation(null)}
                    className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => handleDownloadRegulation(activePreviewRegulation)}
                    className="flex items-center gap-1.5 bg-primary-blue hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
