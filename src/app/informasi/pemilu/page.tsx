"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ExternalLink, ChevronRight, Building2, 
  FileText, CheckCircle2, Calendar, 
  Vote, DollarSign, ArrowUpRight, X, Clock,
  Award, ShieldAlert, BookOpen
} from 'lucide-react';

type TenderAnnouncement = {
  id: string;
  code: string;
  date: string;
  title: string;
  category: 'tender-aktif' | 'pemenang' | 'sounding' | 'tender-ulang';
  categoryLabel: string;
  workUnit: string;
  procurementMethod: string;
  paguBudget: string;
  hpsBudget: string;
  stage: string;
  deadline?: string;
  winner?: string;
  winnerPrice?: string;
  inaprocUrl: string;
};

const tenderData: TenderAnnouncement[] = [
  {
    id: '1',
    code: 'TND-2026-0419',
    date: '21 April 2026 19:14',
    title: 'Market Sounding Pengadaan Pakaian Dinas Aparatur Sipil Negara & Perlengkapan Kerja Lapangan TA 2026',
    category: 'sounding',
    categoryLabel: 'Market Sounding',
    workUnit: 'Biro Umum dan Pengadaan Barang/Jasa',
    procurementMethod: 'Tender Terbuka Nasional',
    paguBudget: 'Rp 6.850.000.000',
    hpsBudget: 'Rp 6.620.000.000',
    stage: 'Penjajakan Pasar (Market Sounding)',
    deadline: '28 April 2026 15:00 WIB',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '2',
    code: 'TND-2026-0284',
    date: '26 Februari 2026 13:46',
    title: 'Pengumuman Penetapan Pemenang Tender Jasa Professional Conference Organizer (PCO) Pertemuan Menteri Tenaga Kerja',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Biro Kerjasama Luar Negeri & Hubungan Internasional',
    procurementMethod: 'Seleksi Terbuka Jasa Konsultansi',
    paguBudget: 'Rp 4.200.000.000',
    hpsBudget: 'Rp 4.050.000.000',
    stage: 'Masa Sanggah Selesai',
    winner: 'PT Nusantara Citra Eventindo',
    winnerPrice: 'Rp 3.890.500.000',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '3',
    code: 'TND-2026-0192',
    date: '30 Januari 2026 09:46',
    title: 'Pengumuman Tender Pengadaan Jasa PCO Pertemuan Komisioner dan Konferensi Tingkat Menteri',
    category: 'tender-aktif',
    categoryLabel: 'Tender Aktif',
    workUnit: 'Sekretariat Jenderal',
    procurementMethod: 'Seleksi Terbuka',
    paguBudget: 'Rp 5.500.000.000',
    hpsBudget: 'Rp 5.380.000.000',
    stage: 'Evaluasi Penawaran & Kualifikasi Teknis',
    deadline: '15 Februari 2026 12:00 WIB',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '4',
    code: 'TND-2025-1208',
    date: '20 Desember 2025 08:09',
    title: 'Pengumuman Pemenang Tender Ulang Ke-2 Pengadaan Tenaga Pendukung Helpdesk TIK TA 2026-2028',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Pusat Data dan Teknologi Informasi (Pusdatin)',
    procurementMethod: 'Tender Cepat',
    paguBudget: 'Rp 8.750.000.000',
    hpsBudget: 'Rp 8.520.000.000',
    stage: 'Penandatanganan Kontrak / SPK',
    winner: 'PT Solusi Informatika Solusindo',
    winnerPrice: 'Rp 8.125.000.000',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '5',
    code: 'TND-2025-1209',
    date: '09 Desember 2025 07:43',
    title: 'Pengumuman Tender Ulang Kedua Pengadaan Jasa Lainnya Helpdesk Pusdatin TA 2026-2028',
    category: 'tender-ulang',
    categoryLabel: 'Tender Ulang',
    workUnit: 'Pusdatin Ketenagakerjaan',
    procurementMethod: 'Tender Terbuka Pascakualifikasi',
    paguBudget: 'Rp 8.750.000.000',
    hpsBudget: 'Rp 8.520.000.000',
    stage: 'Pemasukan Dokumen Penawaran Ulang',
    deadline: '18 Desember 2025 16:00 WIB',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '6',
    code: 'TND-2025-1203',
    date: '08 Desember 2025 15:08',
    title: 'Pengumuman Tender Ulang Gagal Pengadaan Jasa Lainnya Helpdesk Pusdatin TA 2026-2028',
    category: 'tender-ulang',
    categoryLabel: 'Tender Ulang',
    workUnit: 'Pusdatin Ketenagakerjaan',
    procurementMethod: 'Tender Terbuka',
    paguBudget: 'Rp 8.750.000.000',
    hpsBudget: 'Rp 8.520.000.000',
    stage: 'Dinyatakan Tender Gagal (Jumlah Penyedia < 3)',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '7',
    code: 'TND-2025-1124',
    date: '24 November 2025 16:43',
    title: 'Pengumuman Tender Ulang Pengadaan Jasa Lainnya Helpdesk Pusdatin TA 2026-2028',
    category: 'tender-ulang',
    categoryLabel: 'Tender Ulang',
    workUnit: 'Pusdatin Ketenagakerjaan',
    procurementMethod: 'Tender Terbuka',
    paguBudget: 'Rp 8.750.000.000',
    hpsBudget: 'Rp 8.520.000.000',
    stage: 'Klarifikasi & Pembuktian Kualifikasi',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '8',
    code: 'TND-2025-1120',
    date: '20 November 2025 15:29',
    title: 'Pengumuman Pemenang Tender Jasa Tenaga Pendukung SIPPNWILN TA 2026-2028',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Direktorat Penempatan & Perlindungan Tenaga Kerja Luar Negeri',
    procurementMethod: 'Tender Terbuka',
    paguBudget: 'Rp 12.400.000.000',
    hpsBudget: 'Rp 12.150.000.000',
    stage: 'Penerbitan SPPBJ',
    winner: 'PT Sumber Daya Prima Sentosa',
    winnerPrice: 'Rp 11.780.000.000',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '9',
    code: 'TND-2025-1021',
    date: '21 Oktober 2025 15:38',
    title: 'Pengumuman Tender Pengadaan Jasa Lainnya Helpdesk Layanan TIK TA 2026-2028',
    category: 'tender-aktif',
    categoryLabel: 'Tender Aktif',
    workUnit: 'Pusdatin',
    procurementMethod: 'Tender Cepat',
    paguBudget: 'Rp 8.750.000.000',
    hpsBudget: 'Rp 8.520.000.000',
    stage: 'Pembukaan Dokumen Penawaran',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '10',
    code: 'TND-2025-1003',
    date: '03 Oktober 2025 21:58',
    title: 'Pengumuman Penetapan Pemenang Tender Renovasi Ruang Kerja Lantai 1 Gedung Utama TA 2025',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Biro Umum',
    procurementMethod: 'Tender Pekerjaan Konstruksi',
    paguBudget: 'Rp 3.500.000.000',
    hpsBudget: 'Rp 3.390.000.000',
    stage: 'Masa Sanggah Berakhir',
    winner: 'PT Graha Cipta Konstruksindo',
    winnerPrice: 'Rp 3.185.000.000',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '11',
    code: 'TND-2025-1001',
    date: '01 Oktober 2025 14:45',
    title: 'PENGUMUMAN PENETAPAN PENYEDIA PEKERJAAN RENOVASI RUANG KERJA LANTAI 5 GEDUNG UTAMA',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Biro Umum',
    procurementMethod: 'Tender Pascakualifikasi',
    paguBudget: 'Rp 2.950.000.000',
    hpsBudget: 'Rp 2.870.000.000',
    stage: 'Penerbitan SPPBJ',
    winner: 'CV Karya Bersama Mandiri',
    winnerPrice: 'Rp 2.680.000.000',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '12',
    code: 'TND-2025-0916',
    date: '16 September 2025 10:40',
    title: 'Pengumuman Tender Pekerjaan Renovasi Ruang Kerja Lantai 1 Gedung Utama Kementerian Ketenagakerjaan',
    category: 'tender-aktif',
    categoryLabel: 'Tender Aktif',
    workUnit: 'Biro Umum',
    procurementMethod: 'Tender Terbuka',
    paguBudget: 'Rp 3.500.000.000',
    hpsBudget: 'Rp 3.390.000.000',
    stage: 'Aanwijzing / Pemberian Penjelasan',
    inaprocUrl: 'https://inaproc.id'
  },
  {
    id: '13',
    code: 'TND-2025-0221',
    date: '21 Februari 2025 18:49',
    title: 'Pengumuman Tender Ulang Ke-2 Pengadaan Jasa Manajemen Fasilitas Terpadu (Facility Management) TA 2025-2027',
    category: 'pemenang',
    categoryLabel: 'Pemenang Ditetapkan',
    workUnit: 'Biro Umum & Fasilitas Kantor',
    procurementMethod: 'Tender Terbuka Jasa Lainnya',
    paguBudget: 'Rp 16.500.000.000',
    hpsBudget: 'Rp 15.980.000.000',
    stage: 'Pelaksanaan Pekerjaan (Kontrak Berjalan)',
    winner: 'PT Sentra Jasa Prima Terpadu',
    winnerPrice: 'Rp 15.420.000.000',
    inaprocUrl: 'https://inaproc.id'
  }
];

export default function TenderPemiluPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(25);
  const [selectedTender, setSelectedTender] = useState<TenderAnnouncement | null>(null);

  const filteredData = useMemo(() => {
    return tenderData.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.workUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.procurementMethod.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedData = filteredData.slice(0, pageSize);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-14 lg:py-18 overflow-hidden bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c712_1px,transparent_1px),linear-gradient(to_bottom,#0284c712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-5">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Tender/Seleksi Pemilu & INAPROC</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Vote className="w-3.5 h-3.5 text-rose-300" />
                  <span>Integrasi Sistem INAPROC SPSE LKPP</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Tender & Seleksi Pengadaan Pemerintah
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                  Pusat informasi daftar pengumuman tender terbuka, seleksi jasa konsultansi, market sounding, dan penetapan pemenang pengadaan barang/jasa terintegrasi INAPROC LKPP.
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn direction="up" delay={0.1}>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://inaproc.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <span>Portal Resmi INAPROC</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://sikap.lkpp.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl backdrop-blur-md transition-all"
                  >
                    <span>Pendaftaran SiKAP</span>
                    <ArrowUpRight className="w-4 h-4 text-accent-gold" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* METRICS SUMMARY CARDS */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary-navy flex items-center justify-center font-bold flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pengumuman</span>
                <div className="text-xl font-black text-slate-900">{tenderData.length} Paket</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pemenang Ditetapkan</span>
                <div className="text-xl font-black text-slate-900">
                  {tenderData.filter(t => t.category === 'pemenang').length} Paket
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tender Aktif & Sounding</span>
                <div className="text-xl font-black text-slate-900">
                  {tenderData.filter(t => t.category === 'tender-aktif' || t.category === 'sounding').length} Paket
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pagu Terdaftar</span>
                <div className="text-xl font-black text-slate-900">Rp 83,5 M</div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN DATA TABLE SECTION (Matching screenshot layout adapted to government theme) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            
            {/* Table Header Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <h2 className="text-xl sm:text-2xl font-black text-primary-navy">
                    Daftar Pengumuman Pengadaan
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Sinkronisasi langsung dengan basis data Sistem Pengadaan Secara Elektronik (SPSE) Nasional
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'tender-aktif', label: 'Tender Aktif' },
                  { id: 'pemenang', label: 'Pemenang' },
                  { id: 'sounding', label: 'Market Sounding' },
                  { id: 'tender-ulang', label: 'Tender Ulang' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === tab.id
                        ? 'bg-white text-primary-navy shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Filter Controls (Page Size & Search Bar) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>Tampilan</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                >
                  <option value={10}>10 data</option>
                  <option value={25}>25 data</option>
                  <option value={50}>50 data</option>
                </select>
                <span className="text-slate-400">dari {filteredData.length} pengumuman</span>
              </div>

              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kata kunci judul, kode, atau satker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 pl-10 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* DATA TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 w-44">Tanggal & Waktu</th>
                    <th className="py-3.5 px-4">Judul Pengumuman</th>
                    <th className="py-3.5 px-4 w-44">Metode Pengadaan</th>
                    <th className="py-3.5 px-4 w-36">Nilai Pagu</th>
                    <th className="py-3.5 px-4 w-36 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                  {displayedData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                        Tidak ada pengumuman tender yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    displayedData.map((item) => (
                      <tr 
                        key={item.id}
                        onClick={() => setSelectedTender(item)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.date}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-primary-navy group-hover:text-primary-blue transition-colors leading-snug">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                            <span>Kode: <strong className="text-slate-600">{item.code}</strong></span>
                            <span>•</span>
                            <span>{item.workUnit}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                          {item.procurementMethod}
                        </td>

                        <td className="py-3.5 px-4 text-slate-800 font-bold whitespace-nowrap text-xs">
                          {item.paguBudget}
                        </td>

                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            item.category === 'pemenang'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.category === 'tender-aktif'
                              ? 'bg-blue-100 text-primary-navy'
                              : item.category === 'sounding'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.categoryLabel}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 text-xs text-slate-500">
              <div>
                Menampilkan <strong>1 - {displayedData.length}</strong> dari <strong>{filteredData.length}</strong> pengumuman
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://inaproc.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-primary-navy hover:underline"
                >
                  <span>Lihat Seluruh Paket di INAPROC SPSE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 4 INAPROC ECOSYSTEM HUB CARDS */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-primary-navy bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
              Ekosistem Terintegrasi
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
              Layanan Terkait Pengadaan Barang & Jasa Nasional
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://sirup.lkpp.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">SiRUP LKPP</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Sistem Informasi Rencana Umum Pengadaan APBN/APBD nasional.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>Akses SiRUP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="https://inaproc.id/daftar-hitam"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">Daftar Hitam Terpusat</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Daftar sanksi penyedia barang/jasa yang terkena penalti pengadaan.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>Cek Badan Usaha</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="https://sikap.lkpp.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">SiKAP Kualifikasi</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Sistem Informasi Kinerja Penyedia untuk validasi izin dan kualifikasi.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>Profil Penyedia</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="https://e-katalog.lkpp.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">Katalog Elektronik</h4>
                <p className="text-xs text-slate-500 leading-relaxed">E-Purchasing katalog nasional, sektoral, dan lokal LKPP.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>E-Katalog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </section>

        {/* DETAIL MODAL */}
        <AnimatePresence>
          {selectedTender && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
              >
                {/* Modal Header */}
                <div className="p-6 bg-gradient-to-r from-primary-navy to-[#113264] text-white relative">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    <Vote className="w-4 h-4 text-amber-300" />
                    <span>Kode: {selectedTender.code} • {selectedTender.categoryLabel}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold pr-8 leading-snug">
                    {selectedTender.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2">
                    Satuan Kerja: <strong>{selectedTender.workUnit}</strong>
                  </p>
                  <button
                    onClick={() => setSelectedTender(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-5 flex-grow text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">Metode Pengadaan</span>
                      <strong className="text-slate-800 text-xs sm:text-sm">{selectedTender.procurementMethod}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">Tahapan Saat Ini</span>
                      <strong className="text-slate-800 text-xs sm:text-sm">{selectedTender.stage}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <span className="text-[11px] font-bold text-primary-blue block uppercase">Pagu Anggaran</span>
                      <strong className="text-primary-navy text-sm sm:text-base font-extrabold">{selectedTender.paguBudget}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[11px] font-bold text-emerald-700 block uppercase">Nilai HPS</span>
                      <strong className="text-emerald-900 text-sm sm:text-base font-extrabold">{selectedTender.hpsBudget}</strong>
                    </div>
                  </div>

                  {selectedTender.winner && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Pemenang Tender Ditetapkan:
                      </span>
                      <div className="font-extrabold text-slate-900 text-sm">{selectedTender.winner}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Nilai Penawaran Terkoreksi: <strong className="text-emerald-700 font-bold">{selectedTender.winnerPrice}</strong>
                      </div>
                    </div>
                  )}

                  {selectedTender.deadline && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <strong>Batas Akhir Penawaran:</strong> {selectedTender.deadline}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Data sinkron dengan SPSE INAPROC
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTender(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      Tutup
                    </button>
                    <a
                      href={selectedTender.inaprocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      <span>Buka di SPSE INAPROC</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
