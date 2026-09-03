"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, Download, Eye, Calendar, 
  ChevronRight, Filter, BookOpen, GraduationCap, 
  CheckCircle2, ArrowRight, Video, FileCheck, Users, HelpCircle
} from 'lucide-react';

type GuideItem = {
  id: string;
  category: string;
  role: string;
  title: string;
  date: string;
  format: 'PDF' | 'DOCX' | 'VIDEO' | 'SLIDE';
  fileSize: string;
  desc: string;
};

const guideCategories = [
  { id: 'all', label: 'Semua Panduan', icon: <BookOpen className="w-4 h-4" />, count: 16 },
  { id: 'pa-kpa', label: 'Panduan PA / KPA', icon: <Users className="w-4 h-4" />, count: 3 },
  { id: 'ppk', label: 'Panduan PPK', icon: <FileCheck className="w-4 h-4" />, count: 4 },
  { id: 'pp', label: 'Panduan Pejabat Pengadaan', icon: <FileText className="w-4 h-4" />, count: 2 },
  { id: 'pokja', label: 'Panduan Pokja Pemilihan', icon: <Users className="w-4 h-4" />, count: 3 },
  { id: 'penyedia', label: 'Panduan Pelaku Usaha / Penyedia', icon: <GraduationCap className="w-4 h-4" />, count: 4 },
  { id: 'mdp', label: 'Model Dokumen Pengadaan (MDP)', icon: <FileText className="w-4 h-4" />, count: 3 },
  { id: 'bimtek', label: 'Materi Bimtek & Sosialisasi', icon: <Video className="w-4 h-4" />, count: 3 },
  { id: 'lain', label: 'Lain-Lain & Standar Teknis', icon: <BookOpen className="w-4 h-4" />, count: 2 },
];

const guideItems: GuideItem[] = [
  {
    id: '1',
    category: 'pa-kpa',
    role: 'PA / KPA',
    title: 'Panduan Pengisian Sistem Informasi Rencana Umum Pengadaan (SiRUP)',
    date: 'Selasa, 28 November 2023',
    format: 'PDF',
    fileSize: '3.2 MB',
    desc: 'Petunjuk teknis penginputan paket RUP, penetapan struktur anggaran, dan pengumuman paket belanja kementerian.'
  },
  {
    id: '2',
    category: 'pa-kpa',
    role: 'PA / KPA',
    title: 'Panduan INAPROC - Tata Kelola dan Monitoring Daftar Hitam Terpusat',
    date: 'Rabu, 01 November 2023',
    format: 'PDF',
    fileSize: '1.8 MB',
    desc: 'Pedoman verifikasi status badan usaha dan tata cara pengusulan sanksi daftar hitam melalui portal LKPP.'
  },
  {
    id: '3',
    category: 'pa-kpa',
    role: 'PA / KPA',
    title: 'Panduan SPSE untuk Kepala Unit Pengelola PBJ (UKPBJ Kemnaker)',
    date: 'Rabu, 01 November 2023',
    format: 'PDF',
    fileSize: '2.4 MB',
    desc: 'Manual operasional pengelolaan sistem SPSE, penetapan admin Pokja, dan monitoring progres tender secara berkala.'
  },
  {
    id: '4',
    category: 'ppk',
    role: 'PPK',
    title: 'Modul Penyusunan Harga Perkiraan Sendiri (HPS) dan Spesifikasi Teknis',
    date: 'Kamis, 14 Desember 2023',
    format: 'PDF',
    fileSize: '4.1 MB',
    desc: 'Tata cara survei pasar, penghitungan komponen HPS, serta penyusunan Kerangka Acuan Kerja (KAK) pengadaan barang/jasa.'
  },
  {
    id: '5',
    category: 'penyedia',
    role: 'Penyedia',
    title: 'Panduan Registrasi & Verifikasi Dokumen Kualifikasi SIKaP bagi Pelaku Usaha',
    date: 'Senin, 08 Januari 2024',
    format: 'PDF',
    fileSize: '2.9 MB',
    desc: 'Langkah pendaftaran izin usaha, NIB, laporan keuangan, dan pengalaman kerja pada portal Sistem Informasi Kinerja Penyedia.'
  },
  {
    id: '6',
    category: 'pokja',
    role: 'Pokja Pemilihan',
    title: 'Tata Cara Evaluasi Dokumen Penawaran & Pembuktian Kualifikasi E-Tendering',
    date: 'Jumat, 26 Januari 2024',
    format: 'PDF',
    fileSize: '3.5 MB',
    desc: 'Panduan teknis bagi anggota Pokja dalam melakukan evaluasi administrasi, teknis, harga, serta klarifikasi dokumen tender.'
  },
  {
    id: '7',
    category: 'mdp',
    role: 'Standar Dokumen',
    title: 'Model Dokumen Pengadaan (MDP) Pekerjaan Konstruksi & Jasa Konsultansi 2026',
    date: 'Senin, 19 Februari 2024',
    format: 'DOCX',
    fileSize: '1.1 MB',
    desc: 'Template rancangan kontrak, syarat umum dan khusus kontrak (SUKK/SSKK), serta form standar penawaran.'
  },
  {
    id: '8',
    category: 'bimtek',
    role: 'Materi Pelatihan',
    title: 'Slide Presentasi Sosialisasi E-Katalog Sektoral Ketenagakerjaan',
    date: 'Rabu, 06 Maret 2024',
    format: 'SLIDE',
    fileSize: '8.4 MB',
    desc: 'Materi komprehensif tata cara e-purchasing produk barang dan jasa pelatihan vokasi melalui katalog elektronik sektor Kemnaker.'
  }
];

export default function PanduanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGuides = useMemo(() => {
    return guideItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#061A35] via-[#0D2E57] to-[#081F3E]">
          {/* Subtle Grid Pattern & Sapphire Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Panduan & Petunjuk Teknis</span>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <span>📘</span>
                  <span>Pedoman & Petunjuk Teknis Operasional PBJ</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Panduan Pelaksanaan Pengadaan
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Modul, petunjuk teknis aplikasi (SPSE, SiRUP, SIKaP), serta pedoman kerja bagi seluruh pelaku pengadaan barang dan jasa.
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
                      placeholder="Cari modul panduan (e.g. SiRUP, PPK, SIKaP)..."
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

        {/* CONTENT SECTION (Sidebar + Guide Cards) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT SIDEBAR (Categories) ================= */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Filter className="w-4 h-4 text-accent-gold" />
                    <h3 className="font-bold text-sm tracking-wide">Kategori Panduan</h3>
                  </div>
                  <span className="text-[11px] font-bold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {guideCategories.length - 1} Peran
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  {guideCategories.map((cat) => {
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

              {/* Consultation & Helpdesk Card */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-blue/10 flex items-center justify-center flex-shrink-0 text-primary-blue">
                    <HelpCircle className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy mb-1">Klinik Konsultasi PBJ</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                      Butuh bimbingan teknis khusus atau klarifikasi mengenai penerapan panduan pengadaan?
                    </p>
                    <Link 
                      href="/layanan"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-primary-navy hover:underline"
                    >
                      <span>Ajukan Konsultasi</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
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
                    Menampilkan {filteredGuides.length} Modul Panduan
                  </span>
                  {selectedCategory !== 'all' && (
                    <span className="text-[10px] font-bold bg-blue-50 text-primary-blue px-2.5 py-0.5 rounded-full border border-blue-100">
                      {guideCategories.find(c => c.id === selectedCategory)?.label}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Modul & Petunjuk Teknis Terverifikasi
                </div>
              </div>

              {/* Guide Cards Grid */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredGuides.length > 0 ? (
                    filteredGuides.map((item, idx) => (
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
                            {/* Role Badge & Format Badge */}
                            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-primary-blue border border-blue-100">
                                {item.role}
                              </span>
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                                <FileText className="w-3 h-3 text-slate-500" />
                                <span>{item.format}</span>
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
                                <span>Ukuran: {item.fileSize}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col items-center gap-2 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <button 
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                              title="Unduh Panduan"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh Modul</span>
                            </button>

                            <button 
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                              title="Buka Pratinjau Petunjuk"
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
                      <h4 className="text-base font-bold text-slate-800 mb-1">Tidak Ada Panduan Ditemukan</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Tidak ditemukan modul panduan yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
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
              {filteredGuides.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-700 font-bold text-xs py-3 px-8 rounded-xl transition-all shadow-xs hover:shadow-sm">
                    <span>Lihat Seluruh Arsip Panduan</span>
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
