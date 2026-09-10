"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, Download, Calendar, 
  ChevronRight, Filter, GitBranch, 
  CheckCircle2, ArrowRight, ShieldCheck, 
  Workflow, Layers, X, FileCheck, Check,
  Eye, Building2, ExternalLink
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';

type SOPItem = {
  id: string;
  code: string;
  category: string;
  categoryLabel: string;
  title: string;
  date: string;
  revision: string;
  fileSize: string;
  fileName?: string;
  fileData?: string;
  desc: string;
  unit: string;
};

export default function SOPPage() {
  const { sopList } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewSOP, setActivePreviewSOP] = useState<SOPItem | null>(null);

  // Dynamic SOPs directly from Supabase / DataContext
  const dynamicSops: SOPItem[] = useMemo(() => {
    return sopList
      .filter(item => !item.status || item.status.toLowerCase() === 'berlaku')
      .map(item => ({
        id: item.id,
        code: item.kode,
        category: item.kategori || 'tata-kelola',
        categoryLabel: item.unit,
        unit: item.unit || 'UKPBJ Kemnaker RI',
        title: item.judul,
        date: 'Tahun 2026',
        revision: item.revisi,
        fileSize: item.fileSize || '2.0 MB',
        fileName: item.fileName || `${item.kode.replace(/\//g, '-')}.pdf`,
        fileData: item.downloadUrl || item.fileData,
        desc: item.deskripsi || `Standar operasional prosedur resmi ${item.unit} untuk menjamin tertib administrasi, transparansi, dan kepatuhan regulasi pengadaan.`
      }));
  }, [sopList]);

  const sopCategories = useMemo(() => [
    { id: 'all', label: 'Semua SOP', icon: <Layers className="w-4 h-4" />, count: dynamicSops.length },
    { id: 'tata-kelola', label: 'SOP Tata Kelola & Registrasi', icon: <FileCheck className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'tata-kelola').length },
    { id: 'perencanaan', label: 'SOP Perencanaan & HPS', icon: <Workflow className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'perencanaan').length },
    { id: 'pemilihan', label: 'SOP Pemilihan & E-Tendering', icon: <GitBranch className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'pemilihan').length },
    { id: 'kontrak', label: 'SOP Pelaksanaan Kontrak & BAST', icon: <FileText className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'kontrak').length },
    { id: 'kinerja', label: 'SOP Pengelolaan Kinerja & SIKaP', icon: <CheckCircle2 className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'kinerja').length },
    { id: 'risiko', label: 'SOP Manajemen Risiko & Pengawasan', icon: <ShieldCheck className="w-4 h-4" />, count: dynamicSops.filter(s => s.category === 'risiko').length },
  ], [dynamicSops]);

  const filteredSOPs = useMemo(() => {
    return dynamicSops.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dynamicSops, selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#071933] via-[#0E284E] to-[#091C36]">
          {/* Subtle Grid Pattern & Cyan Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Standar Operasional Prosedur</span>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <FileCheck className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Standar Operasional Prosedur (SOP) Resmi</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Standar Operasional Prosedur
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Pedoman alur kerja, instruksi kerja, dan standar mutu pelayanan pengadaan barang/jasa di lingkungan Kementerian Ketenagakerjaan.
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
                      placeholder="Cari judul SOP, nomor kode, atau alur kerja..."
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

        {/* CONTENT SECTION (Sidebar + SOP Cards) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT SIDEBAR (Categories) ================= */}
            <div className="lg:col-span-4 static lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Filter className="w-4 h-4 text-accent-gold" />
                    <h3 className="font-bold text-sm tracking-wide">Tahapan & Klaster SOP</h3>
                  </div>
                  <span className="text-[11px] font-bold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {sopCategories.length - 1} Klaster
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  {sopCategories.map((cat) => {
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

              {/* Quality Standard ISO Badge Card */}
              <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/10 flex items-center justify-center flex-shrink-0 text-emerald-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 mb-1">Standar Mutu Pelayanan ISO</h4>
                    <p className="text-[11px] text-emerald-800/80 leading-relaxed mb-3">
                      Seluruh dokumen SOP disusun dan diaudit secara berkala sesuai standar Sistem Manajemen Mutu Pelayanan Publik.
                    </p>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>SOP Aktif & Tervalidasi 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT MAIN CONTENT (SOP Cards Grid) ================= */}
            <div className="lg:col-span-8">
              {/* Results Topbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary-navy">
                    Menampilkan {filteredSOPs.length} Dokumen SOP
                  </span>
                  {selectedCategory !== 'all' && (
                    <span className="text-[10px] font-bold bg-blue-50 text-primary-blue px-2.5 py-0.5 rounded-full border border-blue-100">
                      {sopCategories.find(c => c.id === selectedCategory)?.label}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dokumen Resmi Terverifikasi & Berlaku</span>
                </div>
              </div>

              {/* SOP Cards Grid */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredSOPs.length > 0 ? (
                    filteredSOPs.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1 min-w-0">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-lg bg-primary-navy text-white tracking-wider">
                                {item.code}
                              </span>
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-primary-blue border border-blue-100 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-primary-blue" />
                                <span>{item.categoryLabel}</span>
                              </span>
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                                {item.revision}
                              </span>
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Berlaku (Aktif)</span>
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug mb-2">
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                              {item.desc}
                            </p>

                            {/* Clean Metadata Info */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100">
                              <div className="flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Unit: {item.unit}</span>
                              </div>
                              <span className="text-slate-300 hidden sm:inline">•</span>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{item.date}</span>
                              </div>
                              <span className="text-slate-300 hidden sm:inline">•</span>
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                <span>Format: PDF ({item.fileSize})</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-row lg:flex-col items-stretch gap-2.5 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 min-w-[170px]">
                            <button 
                              onClick={() => setActivePreviewSOP(item)}
                              className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer hover:border-slate-300"
                              title="Buka Pratinjau Dokumen"
                            >
                              <Eye className="w-3.5 h-3.5 text-primary-blue" />
                              <span>Pratinjau SOP</span>
                            </button>

                            {item.fileData ? (
                              <a 
                                href={item.fileData}
                                download={item.fileName || `${item.code.replace(/\//g, '-')}.pdf`}
                                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                title={`Unduh File ${item.fileName || 'SOP'}`}
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh SOP</span>
                              </a>
                            ) : (
                              <button 
                                onClick={() => {
                                  alert(`Mengunduh dokumen SOP resmi: ${item.title} (${item.fileSize})`);
                                }}
                                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                title="Unduh Dokumen SOP"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh SOP</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800 mb-1">Tidak Ada Dokumen SOP Ditemukan</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Tidak ditemukan dokumen SOP yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                      </p>
                      <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                        className="text-xs font-bold text-primary-blue hover:underline cursor-pointer"
                      >
                        Reset Filter & Pencarian
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {filteredSOPs.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-700 font-bold text-xs py-3 px-8 rounded-xl transition-all shadow-xs hover:shadow-sm">
                    <span>Lihat Seluruh Arsip SOP Unit Kerja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      {/* ================= SOP PREVIEW MODAL VIEWER ================= */}
      <AnimatePresence>
        {activePreviewSOP && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreviewSOP(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-primary-navy via-[#113264] to-[#0A2342] text-white flex items-center justify-between">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                      {activePreviewSOP.code}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                      ✓ Dokumen Resmi Berlaku
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white truncate">
                    {activePreviewSOP.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePreviewSOP(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Detailed SOP Preview */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Kode SOP</span>
                    <span className="font-bold text-slate-800">{activePreviewSOP.code}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Unit Kerja</span>
                    <span className="font-bold text-slate-800">{activePreviewSOP.unit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Revisi</span>
                    <span className="font-bold text-slate-800">{activePreviewSOP.revision}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Ukuran File</span>
                    <span className="font-bold text-slate-800 font-mono">PDF ({activePreviewSOP.fileSize})</span>
                  </div>
                </div>

                {/* Deskripsi & Ringkasan Dokumen */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary-blue" />
                    <span>Ruang Lingkup & Uraian Standar Pelayanan</span>
                  </h4>
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 leading-relaxed">
                    {activePreviewSOP.desc}
                  </div>
                </div>

                {/* Dokumen Lampiran Info Box */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">
                        {activePreviewSOP.fileName || `${activePreviewSOP.code.replace(/\//g, '-')}.pdf`}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Dokumen digital tervalidasi siap cetak & diunduh ({activePreviewSOP.fileSize})
                      </p>
                    </div>
                  </div>

                  {activePreviewSOP.fileData && (
                    <a
                      href={activePreviewSOP.fileData}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors border border-slate-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary-blue" />
                      <span>Buka Tab Baru</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  Status: <strong className="text-emerald-700">Aktif Berlaku (2026)</strong>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActivePreviewSOP(null)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  {activePreviewSOP.fileData ? (
                    <a
                      href={activePreviewSOP.fileData}
                      download={activePreviewSOP.fileName || `${activePreviewSOP.code.replace(/\//g, '-')}.pdf`}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Dokumen Lengkap</span>
                    </a>
                  ) : (
                    <button 
                      onClick={() => alert(`Mengunduh dokumen SOP resmi: ${activePreviewSOP.title}`)}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Dokumen Lengkap</span>
                    </button>
                  )}
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
