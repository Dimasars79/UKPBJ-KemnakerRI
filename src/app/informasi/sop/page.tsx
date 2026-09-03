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
  Workflow, Layers, X, FileCheck, Check
} from 'lucide-react';

type SOPItem = {
  id: string;
  code: string;
  category: string;
  categoryLabel: string;
  title: string;
  date: string;
  revision: string;
  fileSize: string;
  desc: string;
  steps: string[];
};

const sopCategories = [
  { id: 'all', label: 'Semua SOP', icon: <Layers className="w-4 h-4" />, count: 18 },
  { id: 'tata-kelola', label: 'SOP Tata Kelola & Registrasi', icon: <FileCheck className="w-4 h-4" />, count: 3 },
  { id: 'perencanaan', label: 'SOP Perencanaan & HPS', icon: <Workflow className="w-4 h-4" />, count: 3 },
  { id: 'pemilihan', label: 'SOP Pemilihan & E-Tendering', icon: <GitBranch className="w-4 h-4" />, count: 4 },
  { id: 'kontrak', label: 'SOP Pelaksanaan Kontrak & BAST', icon: <FileText className="w-4 h-4" />, count: 3 },
  { id: 'kinerja', label: 'SOP Pengelolaan Kinerja & SIKaP', icon: <CheckCircle2 className="w-4 h-4" />, count: 2 },
  { id: 'risiko', label: 'SOP Manajemen Risiko & Pengawasan', icon: <ShieldCheck className="w-4 h-4" />, count: 3 },
];

const sopItems: SOPItem[] = [
  {
    id: '1',
    code: 'SOP-PBJ-01/2026',
    category: 'tata-kelola',
    categoryLabel: 'Tata Kelola',
    title: 'SOP Registrasi, Verifikasi, dan Validasi Akun SPSE',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 02 (2026)',
    fileSize: '1.8 MB',
    desc: 'Standar baku verifikasi identitas badan usaha dan legalitas dokumen penyedia sebelum diaktifkan pada portal SPSE Kemnaker.',
    steps: ['Pendaftaran Online Penyedia', 'Pemeriksaan Dokumen Fisik/Legalitas', 'Verifikasi Petugas Verifikator', 'Aktivasi Akun Terintegrasi']
  },
  {
    id: '2',
    code: 'SOP-PBJ-02/2026',
    category: 'tata-kelola',
    categoryLabel: 'Sistem Informasi',
    title: 'SOP Pengadaan Barang dan Jasa Berbasis Sistem Informasi',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 01 (2025)',
    fileSize: '2.1 MB',
    desc: 'Pedoman alur tata kelola operasional seluruh transaksi pengadaan digital melalui aplikasi SPSE, E-Katalog, dan Bela Pengadaan.',
    steps: ['Pembuatan Paket Elektronik', 'Pemberitahuan Undangan Tender', 'Penyampaian Penawaran Terenkripsi', 'Pengumuman Pemenang Digital']
  },
  {
    id: '3',
    code: 'SOP-PBJ-03/2026',
    category: 'risiko',
    categoryLabel: 'Manajemen Risiko',
    title: 'SOP Pengendalian dan Mitigasi Risiko Pengadaan Barang/Jasa',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 03 (2026)',
    fileSize: '2.4 MB',
    desc: 'Mekanisme identifikasi dini, analisis potensi hambatan pelaksanaan, serta langkah pencegahan risiko hukum dan keterlambatan proyek.',
    steps: ['Identifikasi Risiko Pra-Tender', 'Penyusunan Matriks Mitigasi', 'Monitoring Berkala Pelaksanaan', 'Evaluasi Pasca Serah Terima']
  },
  {
    id: '4',
    code: 'SOP-PBJ-04/2026',
    category: 'perencanaan',
    categoryLabel: 'Perencanaan',
    title: 'SOP Analisa Ketersediaan Penyedia dan Survei Pasar',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 02 (2025)',
    fileSize: '1.5 MB',
    desc: 'Tata cara pelaksanaan riset pasar, ketersediaan produk dalam negeri (TKDN), dan perbandingan harga wajar sebelum tender dimulai.',
    steps: ['Penentuan Kebutuhan Barang/Jasa', 'Survei Pasar & Cek TKDN', 'Dokumentasi Bukti Harga Wajar', 'Penyusunan Rekomendasi PPK']
  },
  {
    id: '5',
    code: 'SOP-PBJ-05/2026',
    category: 'kinerja',
    categoryLabel: 'Pengelolaan Kinerja',
    title: 'SOP Penilaian dan Pengelolaan Kinerja Penyedia (SIKaP)',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 02 (2026)',
    fileSize: '1.9 MB',
    desc: 'Prosedur pemberian rating kinerja vendor setelah menyelesaikan kontrak kerja sama berdasarkan kualitas, waktu, biaya, dan layanan.',
    steps: ['Pekerjaan Selesai 100%', 'Input Nilai Indikator oleh PPK', 'Sinkronisasi ke SIKaP LKPP', 'Penetapan Profil Kinerja Vendor']
  },
  {
    id: '6',
    code: 'SOP-PBJ-06/2026',
    category: 'kontrak',
    categoryLabel: 'Pelaksanaan Kontrak',
    title: 'SOP Pengelolaan dan Pengendalian Kontrak Pengadaan',
    date: 'Senin, 04 Desember 2023',
    revision: 'Rev. 01 (2025)',
    fileSize: '2.7 MB',
    desc: 'Pengawasan tahapan SPK, penerbitan jaminan pelaksanaan, addendum perubahan kontrak, hingga serah terima hasil pekerjaan.',
    steps: ['Penandatanganan Kontrak / SPK', 'Pemeriksaan Lapangan Berkala', 'Rapat Evaluasi Kemajuan (SCM)', 'Berita Acara Serah Terima (BAST)']
  },
  {
    id: '7',
    code: 'SOP-PBJ-07/2026',
    category: 'pemilihan',
    categoryLabel: 'Pemilihan Penyedia',
    title: 'SOP Penanganan Sanggah dan Sanggah Banding Pemilihan',
    date: 'Kamis, 11 Januari 2024',
    revision: 'Rev. 01 (2026)',
    fileSize: '1.6 MB',
    desc: 'Tata cara penerimaan, klarifikasi fakta, dan penerbitan jawaban resmi atas sanggahan peserta pemilihan sesuai regulasi.',
    steps: ['Penerimaan Sanggah Melalui SPSE', 'Rapat Klarifikasi Pokja Pemilihan', 'Penyusunan Jawaban Resmi', 'Penyampaian Jawaban Tertulis']
  },
  {
    id: '8',
    code: 'SOP-PBJ-08/2026',
    category: 'kontrak',
    categoryLabel: 'Pelaksanaan Kontrak',
    title: 'SOP Serah Terima Hasil Pekerjaan dan Pembayaran Termin',
    date: 'Selasa, 20 Februari 2024',
    revision: 'Rev. 02 (2026)',
    fileSize: '2.2 MB',
    desc: 'Prosedur pemeriksaan fisik hasil pekerjaan oleh PjPHP/PPK, penandatanganan BAST, hingga proses pengajuan SPP/SPM.',
    steps: ['Permohonan Serah Terima Vendor', 'Uji Fungsi & Pemeriksaan Fisik', 'Penerbitan BAST & BAP', 'Proses Pembayaran ke KPPN']
  }
];

export default function SOPPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFlowchartSOP, setActiveFlowchartSOP] = useState<SOPItem | null>(null);

  const filteredSOPs = useMemo(() => {
    return sopItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
                  <span>📋</span>
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
            <div className="lg:col-span-4 sticky top-28">
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

                <div className="text-xs text-slate-400 font-medium">
                  Dilengkapi Diagram Alur Interaktif
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
                        className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-primary-navy text-white tracking-wider">
                                {item.code}
                              </span>
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-primary-blue border border-blue-100">
                                {item.categoryLabel}
                              </span>
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                {item.revision}
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

                            {/* Alur Tahapan Singkat / Mini Steps Badges */}
                            <div className="mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ringkasan Alur Proses:</p>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {item.steps.map((step, sIdx) => (
                                  <React.Fragment key={sIdx}>
                                    <span className="text-[11px] font-medium text-slate-700 bg-white border border-slate-200/80 px-2.5 py-1 rounded-md shadow-2xs">
                                      {sIdx + 1}. {step}
                                    </span>
                                    {sIdx < item.steps.length - 1 && (
                                      <span className="text-slate-300 text-xs">&rarr;</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>

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
                              onClick={() => setActiveFlowchartSOP(item)}
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                              title="Buka Diagram Alur Lengkap"
                            >
                              <Workflow className="w-3.5 h-3.5" />
                              <span>Lihat Diagram</span>
                            </button>

                            <button 
                              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all"
                              title="Unduh Dokumen SOP"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh SOP</span>
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
                      <h4 className="text-base font-bold text-slate-800 mb-1">Tidak Ada Dokumen SOP Ditemukan</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Tidak ditemukan dokumen SOP yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
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

      {/* ================= FLOWCHART MODAL VIEWER ================= */}
      <AnimatePresence>
        {activeFlowchartSOP && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFlowchartSOP(null)}
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
              <div className="p-6 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {activeFlowchartSOP.code}
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-white">
                    Diagram Alur: {activeFlowchartSOP.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveFlowchartSOP(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Interactive Flowchart Steps */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 leading-relaxed">
                  <strong>Deskripsi Alur:</strong> {activeFlowchartSOP.desc}
                </div>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-primary-blue before:to-slate-200">
                  {activeFlowchartSOP.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-primary-navy text-accent-gold border-2 border-white shadow-md flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex-1 hover:border-primary-blue/50 transition-colors">
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Tahap {idx + 1}: {step}</h4>
                        <p className="text-xs text-slate-500">
                          Dilaksanakan sesuai standar waktu dan spesifikasi dokumen SOP yang berlaku.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Revisi Dokumen: <strong>{activeFlowchartSOP.revision}</strong>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveFlowchartSOP(null)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    Tutup
                  </button>
                  <button 
                    className="px-5 py-2 bg-primary-navy hover:bg-primary-blue text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Dokumen Lengkap</span>
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
