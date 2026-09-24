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
  Award, ShieldAlert, BookOpen, RotateCcw, Info
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, trans } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTender, setSelectedTender] = useState<TenderAnnouncement | null>(null);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

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

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const displayedData = filteredData.slice((validCurrentPage - 1) * pageSize, validCurrentPage * pageSize);

  const renderCategoryBadge = (category: string, label: string) => {
    switch (category) {
      case 'pemenang':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{label}</span>
          </span>
        );
      case 'tender-aktif':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{label}</span>
          </span>
        );
      case 'sounding':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>{label}</span>
          </span>
        );
      case 'tender-ulang':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-slate-100 text-slate-700 border border-slate-200/90 shadow-2xs">
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24 -mt-[80px] md:-mt-[88px]">
        {/* HERO BANNER SECTION */}
        <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 lg:py-18 overflow-hidden bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c712_1px,transparent_1px),linear-gradient(to_bottom,#0284c712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-5">
              <Link href="/" className="hover:text-amber-300 transition-colors">{t('nav.home')}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">{t('nav.info')}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">{trans('Tender & Seleksi INAPROC', 'INAPROC Tenders & Selections')}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Vote className="w-3.5 h-3.5 text-rose-300" />
                  <span>{trans('Integrasi Sistem INAPROC SPSE LKPP', 'INAPROC SPSE LKPP System Integration')}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {trans('Tender & Seleksi Pengadaan Pemerintah', 'Government Procurement Tenders & Selections')}
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                  {trans('Pusat informasi daftar pengumuman tender terbuka, seleksi jasa konsultansi, market sounding, dan penetapan pemenang pengadaan barang/jasa terintegrasi INAPROC LKPP.', 'Information center for open tenders, consulting selections, market sounding, and winner determinations integrated with INAPROC LKPP.')}
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
                    <span>{trans('Portal Resmi INAPROC', 'Official INAPROC Portal')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://sikap.lkpp.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl backdrop-blur-md transition-all"
                  >
                    <span>{trans('Pendaftaran SiKAP', 'SiKAP Registration')}</span>
                    <ArrowUpRight className="w-4 h-4 text-accent-gold" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* METRICS SUMMARY CARDS */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-5 sm:-mt-6 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 hover:border-slate-300 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-blue-50 text-primary-navy flex items-center justify-center font-bold flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                  {trans('Total Pengumuman', 'Total Announcements')}
                </span>
                <div className="text-xs sm:text-base lg:text-xl font-black text-slate-900 leading-tight truncate mt-0.5">
                  {tenderData.length} {trans('Paket', 'Packages')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 hover:border-slate-300 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                  {trans('Pemenang Ditetapkan', 'Winners Decided')}
                </span>
                <div className="text-xs sm:text-base lg:text-xl font-black text-slate-900 leading-tight truncate mt-0.5">
                  {tenderData.filter(t => t.category === 'pemenang').length} {trans('Paket', 'Packages')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 hover:border-slate-300 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                  {trans('Tender Aktif & Sounding', 'Active Tenders & Sounding')}
                </span>
                <div className="text-xs sm:text-base lg:text-xl font-black text-slate-900 leading-tight truncate mt-0.5">
                  {tenderData.filter(t => t.category === 'tender-aktif' || t.category === 'sounding').length} {trans('Paket', 'Packages')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 hover:border-slate-300 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                  {trans('Total Pagu Terdaftar', 'Total Registered Budget')}
                </span>
                <div className="text-xs sm:text-base lg:text-xl font-black text-slate-900 leading-tight truncate mt-0.5">Rp 83,5 M</div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN DATA TABLE SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200/80">
            
            {/* Table Header Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <h2 className="text-xl sm:text-2xl font-black text-primary-navy">
                    {trans('Daftar Pengumuman Pengadaan', 'Procurement Announcements List')}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {trans('Sinkronisasi langsung dengan basis data Sistem Pengadaan Secara Elektronik (SPSE) Nasional', 'Direct synchronization with the National Electronic Procurement System (SPSE) database')}
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 overflow-x-auto scrollbar-none w-full lg:w-auto">
                {[
                  { id: 'all', label: trans('Semua', 'All') },
                  { id: 'tender-aktif', label: trans('Tender Aktif', 'Active Tenders') },
                  { id: 'pemenang', label: trans('Pemenang', 'Winners') },
                  { id: 'sounding', label: trans('Market Sounding', 'Market Sounding') },
                  { id: 'tender-ulang', label: trans('Tender Ulang', 'Retender') },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleCategorySelect(tab.id)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                      selectedCategory === tab.id
                        ? 'bg-white text-primary-navy shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Filter Controls (Page Size & Search Bar) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>{trans('Tampilan', 'Display')}</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue cursor-pointer"
                >
                  <option value={10}>10 {trans('data', 'items')}</option>
                  <option value={25}>25 {trans('data', 'items')}</option>
                  <option value={50}>50 {trans('data', 'items')}</option>
                </select>
                <span className="text-slate-400 text-xs">
                  {trans('dari', 'of')} {filteredData.length} {trans('pengumuman', 'announcements')}
                </span>
              </div>

              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={trans("Cari judul, kode tender, atau satker...", "Search title, tender code, or work unit...")}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-slate-50 pl-10 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue shadow-2xs placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    aria-label="Bersihkan pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 1. MOBILE RESPONSIVE CARD VIEW (< 768px) */}
            <div className="block md:hidden space-y-3 mt-1">
              {displayedData.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium bg-slate-50/50 rounded-2xl border border-slate-100">
                  {trans('Tidak ada pengumuman tender yang sesuai dengan kriteria pencarian.', 'No tender announcements match your search criteria.')}
                </div>
              ) : (
                displayedData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTender(item)}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-primary-blue/40 transition-all cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {renderCategoryBadge(
                        item.category,
                        item.category === 'pemenang' ? trans('Pemenang Ditetapkan', 'Winner Decided') :
                        item.category === 'tender-aktif' ? trans('Tender Aktif', 'Active Tender') :
                        item.category === 'sounding' ? trans('Market Sounding', 'Market Sounding') :
                        item.category === 'tender-ulang' ? trans('Tender Ulang', 'Retender') : item.categoryLabel
                      )}
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-primary-navy group-hover:text-primary-blue transition-colors leading-snug mb-2">
                      {item.title}
                    </h4>

                    <div className="text-[11px] text-slate-500 mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>{trans('Kode:', 'Code:')} <strong className="text-slate-700 font-mono">{item.code}</strong></span>
                      <span>•</span>
                      <span>{item.workUnit}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-1">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                          {trans('Nilai Pagu', 'Budget Ceiling')}
                        </span>
                        <span className="text-xs font-black text-primary-navy font-mono bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/60 inline-block mt-0.5">
                          {item.paguBudget}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-blue group-hover:underline">
                        <span>{trans('Detail', 'Details')}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 2. DESKTOP & TABLET TABULAR VIEW (>= 768px) */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200/80 mt-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 w-44">{trans('Tanggal & Waktu', 'Date & Time')}</th>
                    <th className="py-3.5 px-4">{trans('Judul Pengumuman', 'Announcement Title')}</th>
                    <th className="py-3.5 px-4 w-44">{trans('Metode Pengadaan', 'Procurement Method')}</th>
                    <th className="py-3.5 px-4 w-40">{trans('Nilai Pagu', 'Budget Ceiling')}</th>
                    <th className="py-3.5 px-4 w-36 text-center">{trans('Status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                  {displayedData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                        {trans('Tidak ada pengumuman tender yang sesuai dengan kriteria pencarian.', 'No tender announcements match your search criteria.')}
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
                            <span>{trans('Kode:', 'Code:')} <strong className="text-slate-600 font-mono">{item.code}</strong></span>
                            <span>•</span>
                            <span>{item.workUnit}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                          {item.procurementMethod}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                            {item.paguBudget}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {renderCategoryBadge(
                            item.category,
                            item.category === 'pemenang' ? trans('Pemenang Ditetapkan', 'Winner Decided') :
                            item.category === 'tender-aktif' ? trans('Tender Aktif', 'Active Tender') :
                            item.category === 'sounding' ? trans('Market Sounding', 'Market Sounding') :
                            item.category === 'tender-ulang' ? trans('Tender Ulang', 'Retender') : item.categoryLabel
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer & Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100 mt-4 text-xs text-slate-500">
              <div>
                {trans('Menampilkan', 'Showing')} <strong>{displayedData.length > 0 ? (validCurrentPage - 1) * pageSize + 1 : 0} - {Math.min(validCurrentPage * pageSize, filteredData.length)}</strong> {trans('dari', 'of')} <strong>{filteredData.length}</strong> {trans('pengumuman', 'announcements')}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={validCurrentPage === 1}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                  >
                    {trans('Sebelumnya', 'Prev')}
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        validCurrentPage === num
                          ? 'bg-primary-navy text-white shadow-xs'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={validCurrentPage === totalPages}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                  >
                    {trans('Berikutnya', 'Next')}
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <a
                  href="https://inaproc.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-primary-navy hover:underline text-xs"
                >
                  <span>{trans('Lihat Seluruh Paket di INAPROC SPSE', 'View All Packages on INAPROC SPSE')}</span>
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
              {trans('Ekosistem Terintegrasi', 'Integrated Ecosystem')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
              {trans('Layanan Terkait Pengadaan Barang & Jasa Nasional', 'National Procurement Related Services')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://sirup.inaproc.id/sirup/loginctr/index"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">SiRUP LKPP</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {trans('Sistem Informasi Rencana Umum Pengadaan APBN/APBD nasional.', 'National procurement plan information system.')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>{trans('Akses SiRUP', 'Access SiRUP')}</span>
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
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">
                  {trans('Daftar Hitam Terpusat', 'Centralized Blacklist')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {trans('Daftar sanksi penyedia barang/jasa yang terkena penalti pengadaan.', 'Sanction list of penalized vendors/contractors.')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>{trans('Cek Badan Usaha', 'Check Vendor')}</span>
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
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">
                  {trans('SiKAP Kualifikasi', 'SiKAP Qualification')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {trans('Sistem Informasi Kinerja Penyedia untuk validasi izin dan kualifikasi.', 'Vendor performance system for license validation.')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>{trans('Profil Penyedia', 'Vendor Profile')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="https://katalog.inaproc.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-navy group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-blue text-sm mb-1">
                  {trans('Katalog Elektronik', 'Electronic Catalog')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {trans('E-Purchasing katalog nasional, sektoral, dan lokal LKPP.', 'National and sectoral e-purchasing catalog.')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy">
                <span>{trans('E-Katalog', 'E-Catalog')}</span>
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
                    <span>{trans('Kode:', 'Code:')} {selectedTender.code} • {selectedTender.categoryLabel}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold pr-8 leading-snug">
                    {selectedTender.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2">
                    {trans('Satuan Kerja:', 'Work Unit:')} <strong>{selectedTender.workUnit}</strong>
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
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">
                        {trans('Metode Pengadaan', 'Procurement Method')}
                      </span>
                      <strong className="text-slate-800 text-xs sm:text-sm">{selectedTender.procurementMethod}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">
                        {trans('Tahapan Saat Ini', 'Current Stage')}
                      </span>
                      <strong className="text-slate-800 text-xs sm:text-sm">{selectedTender.stage}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <span className="text-[11px] font-bold text-primary-blue block uppercase">
                        {trans('Pagu Anggaran', 'Budget Ceiling')}
                      </span>
                      <strong className="text-primary-navy text-sm sm:text-base font-extrabold">{selectedTender.paguBudget}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[11px] font-bold text-emerald-700 block uppercase">
                        {trans('Nilai HPS', 'Owner Estimate (HPS)')}
                      </span>
                      <strong className="text-emerald-900 text-sm sm:text-base font-extrabold">{selectedTender.hpsBudget}</strong>
                    </div>
                  </div>

                  {selectedTender.winner && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {trans('Pemenang Tender Ditetapkan:', 'Decided Tender Winner:')}
                      </span>
                      <div className="font-extrabold text-slate-900 text-sm">{selectedTender.winner}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {trans('Nilai Penawaran Terkoreksi:', 'Corrected Bid Price:')} <strong className="text-emerald-700 font-bold">{selectedTender.winnerPrice}</strong>
                      </div>
                    </div>
                  )}

                  {selectedTender.deadline && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <strong>{trans('Batas Akhir Penawaran:', 'Bid Deadline:')}</strong> {selectedTender.deadline}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {trans('Data sinkron dengan SPSE INAPROC', 'Data synchronized with SPSE INAPROC')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTender(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      {trans('Tutup', 'Close')}
                    </button>
                    <a
                      href={selectedTender.inaprocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      <span>{trans('Buka di SPSE INAPROC', 'Open in SPSE INAPROC')}</span>
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
