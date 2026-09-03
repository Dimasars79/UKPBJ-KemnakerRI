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
  CheckCircle2, ArrowRight, ExternalLink
} from 'lucide-react';

type Regulation = {
  id: string;
  category: string;
  title: string;
  nomor: string;
  date: string;
  status: 'Berlaku' | 'Diubah' | 'Dicabut';
  fileSize: string;
  desc: string;
};

const categories = [
  { id: 'all', label: 'Semua Regulasi', icon: <BookOpen className="w-4 h-4" />, count: 18 },
  { id: 'uu', label: 'Undang-Undang', icon: <FileText className="w-4 h-4" />, count: 3 },
  { id: 'pp', label: 'Peraturan Pemerintah', icon: <FileText className="w-4 h-4" />, count: 2 },
  { id: 'perpres', label: 'Peraturan Presiden', icon: <FileText className="w-4 h-4" />, count: 4 },
  { id: 'inpres', label: 'Keputusan / Instruksi Presiden', icon: <FileText className="w-4 h-4" />, count: 2 },
  { id: 'permen', label: 'Peraturan Menteri / Lembaga', icon: <FileText className="w-4 h-4" />, count: 4 },
  { id: 'kepmen', label: 'Keputusan Menteri / Lembaga', icon: <FileText className="w-4 h-4" />, count: 2 },
  { id: 'se', label: 'Surat Edaran', icon: <FileText className="w-4 h-4" />, count: 3 },
  { id: 'lain', label: 'Lain-Lain & Pedoman', icon: <FileText className="w-4 h-4" />, count: 2 },
];

const regulations: Regulation[] = [
  {
    id: '1',
    category: 'uu',
    nomor: 'UU No. 03 Tahun 2014',
    title: 'Undang-Undang Nomor 03 Tahun 2014 tentang Perindustrian',
    date: 'Jumat, 24 November 2023',
    status: 'Berlaku',
    fileSize: '1.4 MB',
    desc: 'Mengatur mengenai penyelenggaraan perindustrian, standardisasi industri, dan pemanfaatan produk dalam negeri.'
  },
  {
    id: '2',
    category: 'uu',
    nomor: 'UU No. 17 Tahun 2003',
    title: 'Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara',
    date: 'Rabu, 01 November 2023',
    status: 'Berlaku',
    fileSize: '980 KB',
    desc: 'Asas-asas umum pengelolaan keuangan negara dalam rangka mendukung terwujudnya tata kelola pemerintahan yang baik.'
  },
  {
    id: '3',
    category: 'uu',
    nomor: 'UU No. 01 Tahun 2004',
    title: 'Undang-Undang Nomor 01 Tahun 2004 tentang Perbendaharaan Negara',
    date: 'Rabu, 01 November 2023',
    status: 'Berlaku',
    fileSize: '1.2 MB',
    desc: 'Ketentuan mengenai pengelolaan dan pertanggungjawaban keuangan negara termasuk pelaksanaan pengadaan barang dan jasa.'
  },
  {
    id: '4',
    category: 'perpres',
    nomor: 'Perpres No. 12 Tahun 2021',
    title: 'Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan atas Perpres No. 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah',
    date: 'Senin, 15 Januari 2024',
    status: 'Berlaku',
    fileSize: '2.8 MB',
    desc: 'Landasan hukum utama pelaksanaan pengadaan barang dan jasa pemerintah Republik Indonesia.'
  },
  {
    id: '5',
    category: 'perpres',
    nomor: 'Perpres No. 16 Tahun 2018',
    title: 'Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah',
    date: 'Kamis, 10 Mei 2023',
    status: 'Diubah',
    fileSize: '3.1 MB',
    desc: 'Pedoman pokok penyelenggaraan pengadaan barang dan jasa instansi pemerintah kementerian/lembaga.'
  },
  {
    id: '6',
    category: 'pp',
    nomor: 'PP No. 29 Tahun 2018',
    title: 'Peraturan Pemerintah Nomor 29 Tahun 2018 tentang Pemberdayaan Industri',
    date: 'Selasa, 12 Desember 2023',
    status: 'Berlaku',
    fileSize: '1.7 MB',
    desc: 'Ketentuan tentang peningkatan penggunaan produk dalam negeri (P3DN) dan kewajiban TKDN dalam belanja pemerintah.'
  },
  {
    id: '7',
    category: 'permen',
    nomor: 'Permenaker No. 05 Tahun 2023',
    title: 'Peraturan Menteri Ketenagakerjaan tentang Pedoman Pengadaan Barang dan Jasa di Lingkungan Kemnaker',
    date: 'Senin, 04 Maret 2024',
    status: 'Berlaku',
    fileSize: '1.5 MB',
    desc: 'Petunjuk teknis dan tata kelola internal pelaksanaan PBJ khusus di unit kerja Kementerian Ketenagakerjaan.'
  },
  {
    id: '8',
    category: 'se',
    nomor: 'SE Menaker No. 02/2024',
    title: 'Surat Edaran Menteri Ketenagakerjaan tentang Percepatan Pelaksanaan Pengadaan Dini Tahun Anggaran 2026',
    date: 'Jumat, 16 Februari 2024',
    status: 'Berlaku',
    fileSize: '650 KB',
    desc: 'Instruksi percepatan tender dini untuk memastikan penyerapan anggaran yang efektif dan tepat sasaran.'
  }
];

export default function PeraturanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRegulations = useMemo(() => {
    return regulations.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
                  <span>⚖️</span>
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
            <div className="lg:col-span-4 sticky top-28">
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
                        className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
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
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                              title="Unduh Salinan Resmi"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh PDF</span>
                            </button>

                            <button 
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                              title="Lihat Pratinjau Dokumen"
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

      <Footer />
    </div>
  );
}
