"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, ExternalLink, ChevronRight, 
  Building2, ShieldCheck, HelpCircle, CheckCircle2, 
  X, Info, BookOpen, AlertCircle, Layers
} from 'lucide-react';

type GuideItem = {
  id: string;
  category: 'all' | 'umk' | 'non-umk' | 'rba' | 'fasilitas' | 'pbj';
  categoryLabel: string;
  title: string;
  desc: string;
  targetUser: string;
  fileSize?: string;
  steps: string[];
  docRequirements: string[];
  externalUrl?: string;
};

const guideCategories = [
  { id: 'all', label: 'Semua Panduan' },
  { id: 'umk', label: 'USAHA MIKRO DAN KECIL (UMK)' },
  { id: 'non-umk', label: 'NON USAHA MIKRO DAN KECIL (NON UMK)' },
  { id: 'rba', label: 'PERIZINAN BERBASIS RISIKO (OSS RBA)' },
  { id: 'fasilitas', label: 'FASILITAS & INSENTIF USAHA' },
  { id: 'pbj', label: 'LEGALITAS PENYEDIA PBJ & KBLI' },
];

const guideData: GuideItem[] = [
  {
    id: '1',
    category: 'fasilitas',
    categoryLabel: 'Fasilitas & Insentif Usaha',
    title: 'Pengajuan dan Pemanfaatan Super Tax Deduction untuk Kegiatan Penelitian dan Pengembangan (Litbang)',
    desc: 'Panduan tata cara permohonan fasilitas pengurangan penghasilan bruto paling tinggi 300% atas pengeluaran kegiatan Litbang tertentu di Indonesia.',
    targetUser: 'Pelaku Usaha Non-UMK / Badan Usaha Riset',
    fileSize: '2.4 MB',
    steps: [
      'Login ke akun OSS RBA menggunakan Hak Akses Badan Usaha.',
      'Pilih menu Fasilitas Usaha > Super Tax Deduction Litbang.',
      'Unggah proposal penelitian, rencana anggaran belanja (RAB), dan kerjasama institusi litbang terakreditasi.',
      'Sistem OSS menerbitkan tanda terima permohonan insentif pajak.',
      'Kementerian Keuangan/BKPM memproses verifikasi dan penetapan pemanfaatan fasilitas.'
    ],
    docRequirements: [
      'Nomor Induk Berusaha (NIB) aktif',
      'Proposal Rencana Kegiatan Litbang & Anggaran Tahunan',
      'Surat Keterangan Fiskal (SKF) dari Ditjen Pajak',
      'Laporan Keuangan 2 Tahun Terakhir yang Telah Diaudit'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '2',
    category: 'fasilitas',
    categoryLabel: 'Fasilitas & Insentif Usaha',
    title: 'Pengajuan Super Tax Deduction untuk Kegiatan Vokasi',
    desc: 'Panduan pemberian pengurangan penghasilan bruto hingga 200% bagi badan usaha yang menyelenggarakan program magang, praktik kerja, atau pembelajaran vokasi SDM ketenagakerjaan.',
    targetUser: 'Badan Usaha Mitra Pelatihan Kerja / Kemnaker',
    fileSize: '1.9 MB',
    steps: [
      'Masuk ke portal OSS RBA melalui menu Fasilitas Ketenagakerjaan.',
      'Pilih Pengajuan Fasilitas Super Tax Deduction Vokasi.',
      'Lampirkan Perjanjian Kerja Sama (PKS) pemagangan dengan SMK / Balai Pelatihan Vokasi dan Produktivitas (BBPVP/BPVP Kemnaker).',
      'Input estimasi biaya pelaksanaan magang dan sertifikasi kompetensi peserta.',
      'Penerbitan surat notifikasi persetujuan insentif perpajakan.'
    ],
    docRequirements: [
      'NIB dengan KBLI sesuai bidang usaha',
      'PKS Pemagangan dengan Lembaga Vokasi / BPVP Kemnaker',
      'Daftar Peserta Pemagangan & Kurikulum Pelatihan Kerja',
      'Rincian Realisasi Biaya Pemagangan / Sertifikasi BNSP'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '3',
    category: 'umk',
    categoryLabel: 'Usaha Mikro dan Kecil (UMK)',
    title: 'Pengajuan Fasilitas Impor Mesin (UMK)',
    desc: 'Petunjuk teknis permohonan fasilitas pembebasan bea masuk dan/atau pajak dalam rangka impor untuk mesin peralatan penunjang produksi industri kecil.',
    targetUser: 'Pelaku Usaha Mikro & Kecil Manufaktur',
    fileSize: '1.5 MB',
    steps: [
      'Akses menu Fasilitas Kepabeanan pada Dashboard OSS RBA.',
      'Pilih kategori Fasilitas Mesin Industri Kecil.',
      'Isi data teknis mesin (HS Code, invoice/proforma, negara asal, spesifikasi kapasitas produksi).',
      'Unggah surat rekomendasi pembinaan dari Dinas Perindustrian/Kemenperin.',
      'Kementerian Keuangan menerbitkan Surat Keputusan Fasilitas Impor Mesin.'
    ],
    docRequirements: [
      'NIB UMK Berstatus Aktif',
      'Proforma Invoice & Spesifikasi Teknis Mesin',
      'Rekomendasi Teknis dari Kementerian Teknis Terkait',
      'NPWP Badan/Perorangan Valid'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '4',
    category: 'umk',
    categoryLabel: 'Usaha Mikro dan Kecil (UMK)',
    title: 'Permohonan Pembatalan Perizinan Berusaha (UMK)',
    desc: 'Tata cara pembatalan perizinan berusaha, penutupan NIB proyek, atau penghapusan kegiatan usaha yang sudah tidak beroperasi secara resmi pada sistem OSS.',
    targetUser: 'Pelaku Usaha Mikro & Kecil',
    fileSize: '1.1 MB',
    steps: [
      'Buka menu Perizinan Berusaha > Pembatalan Kegiatan Usaha pada OSS RBA.',
      'Pilih nomor proyek atau KBLI yang ingin dibatalkan.',
      'Sertakan alasan pembatalan dan dokumen Berita Acara Penutupan Usaha.',
      'Sistem melakukan verifikasi pemenuhan kewajiban perpajakan/ketenagakerjaan.',
      'Penerbitan Surat Keterangan Pembatalan Izin Berusaha resmi.'
    ],
    docRequirements: [
      'NIB dan Izin Usaha lama yang akan dibatalkan',
      'Surat Pernyataan Pembatalan bermaterai cukup',
      'Bukti pelunasan kewajiban pajak/BPJS Ketenagakerjaan (jika ada)'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '5',
    category: 'umk',
    categoryLabel: 'Usaha Mikro dan Kecil (UMK)',
    title: 'Pendaftaran Nomor Induk Berusaha (NIB) bagi UMK Perseorangan',
    desc: 'Langkah cepat penerbitan NIB 100% online gratis dalam hitungan menit sebagai legalitas utama pelaku usaha mikro/kecil untuk mengikuti pengadaan pemerintah.',
    targetUser: 'Usaha Mikro & Kecil Perseorangan (Modal < Rp 5 Miliar)',
    fileSize: '2.8 MB',
    steps: [
      'Kunjungi oss.go.id lalu klik Daftar / Masuk dengan NIK KTP.',
      'Lengkapi data profil usaha, modal usaha, dan alamat lokasi kegiatan.',
      'Pilih Klasifikasi Baku Lapangan Usaha Indonesia (KBLI 2020) yang sesuai.',
      'Ceklis pernyataan mandiri (K3L, Tata Ruang, SPPL Lingkungan).',
      'NIB resmi berbarcode QR Code langsung terbit dan dapat diunduh.'
    ],
    docRequirements: [
      'Nomor Induk Kependudukan (NIK) e-KTP Pemilik Usaha',
      'Nomor Pokok Wajib Pajak (NPWP) Pribadi',
      'Nomor HP WhatsApp & Email Aktif',
      'Data Titik Koordinat Lokasi Usaha'
    ],
    externalUrl: 'https://oss.go.id'
  },
  {
    id: '6',
    category: 'rba',
    categoryLabel: 'Perizinan Berbasis Risiko (OSS RBA)',
    title: 'Penerbitan Sertifikat Standar & Izin Operasional Berbasis Risiko',
    desc: 'Pedoman pemenuhan standar bagi kegiatan usaha tingkat risiko Menengah Rendah (MR), Menengah Tinggi (MT), dan Risiko Tinggi (T).',
    targetUser: 'Badan Usaha PT, CV, Koperasi, Firma',
    fileSize: '3.5 MB',
    steps: [
      'Ajukan perizinan baru pada OSS RBA dan identifikasi tingkat risiko KBLI.',
      'Unduh format pemenuhan persyaratan standar teknis sektoral.',
      'Unggah dokumen pemenuhan komitmen (AMDAL/UKL-UPL, Sertifikat Laik Fungsi, Standar Mutu).',
      'Organisasi Perangkat Daerah (OPD) / Kementerian teknis melakukan verifikasi berkas dan validasi lapangan.',
      'Sertifikat Standar Terverifikasi / Izin Operasional diterbitkan otomatis.'
    ],
    docRequirements: [
      'NIB Badan Usaha & Akta Notaris + SK Kemenkumham',
      'Dokumen Persetujuan Lingkungan (AMDAL / UKL-UPL / SPPL)',
      'Persetujuan Bangunan Gedung (PBG) & SLF (jika disyaratkan)',
      'Sertifikat Standar Teknis Sektoral'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '7',
    category: 'non-umk',
    categoryLabel: 'Non Usaha Mikro dan Kecil (Non UMK)',
    title: 'Tata Cara Migrasi Data Perizinan Berusaha Lama ke Sistem OSS RBA',
    desc: 'Prosedur pembaruan dan migrasi hak akses akun OSS versi 1.1 / lama ke sistem OSS Berbasis Risiko (OSS RBA) sesuai PP No. 5 Tahun 2021.',
    targetUser: 'Perusahaan Non-UMK / Penanaman Modal Dalam Negeri & Asing',
    fileSize: '2.1 MB',
    steps: [
      'Lakukan penggantian hak akses akun lama melalui menu Lupa Password / Migrasi Akun.',
      'Validasi NIK Direktur Penanggung Jawab dan NPWP Perusahaan.',
      'Periksa daftar KBLI versi lama dan sesuaikan dengan KBLI 2020 5 Digit.',
      'Lengkapi data proyek investasi dan komitmen perizinan yang masih berlaku.',
      'Simpan dan cetak NIB format terbaru OSS RBA.'
    ],
    docRequirements: [
      'NIB format lama atau Izin Usaha / Izin Operasional terdahulu',
      'Akta Perubahan Anggaran Dasar Terakhir & SK Kemenkumham',
      'KTP & NPWP Direktur Utama / Penanggung Jawab Perusahaan'
    ],
    externalUrl: 'https://oss.go.id/panduan'
  },
  {
    id: '8',
    category: 'pbj',
    categoryLabel: 'Legalitas Penyedia PBJ & KBLI',
    title: 'Panduan Legalitas Usaha Penyedia Jasa Ketenagakerjaan & Pengadaan Kemnaker',
    desc: 'Ketentuan pemenuhan izin berusaha untuk penyedia barang/jasa, alih daya tenaga kerja, sertifikasi K3, dan syarat kualifikasi tender SPSE Kemnaker.',
    targetUser: 'Calon Penyedia & Rekanan Tender Kementerian Ketenagakerjaan',
    fileSize: '4.2 MB',
    steps: [
      'Pastikan NIB memuat KBLI yang dipersyaratkan dalam Dokumen Pemilihan Tender.',
      'Lengkapi Izin Usaha Jasa Terkait (misal: Izin Perusahaan Alih Daya / Jasa K3).',
      'Daftarkan akun penyedia ke SiKAP (Sistem Informasi Kinerja Penyedia) LKPP.',
      'Lakukan integrasi data NIB dan status perpajakan Konfirmasi Status Wajib Pajak (KSWP).',
      'Ikuti tender pengadaan barang/jasa pada portal LPSE Kemnaker RI.'
    ],
    docRequirements: [
      'NIB OSS RBA dengan KBLI yang Sesuai Paket PBJ',
      'Status Validitas Konfirmasi Status Wajib Pajak (KSWP Valid)',
      'Bukti Sertifikat Standar / Izin Sektoral Aktif',
      'Bukti Kepesertaan BPJS Ketenagakerjaan & BPJS Kesehatan'
    ],
    externalUrl: 'https://lpse.kemnaker.go.id'
  }
];

export default function PerizinanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [showTopNotice, setShowTopNotice] = useState<boolean>(true);

  const filteredGuides = useMemo(() => {
    return guideData.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetUser.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* NOTICE BANNER AT VERY TOP (Matching screenshot) */}
      <AnimatePresence>
        {showTopNotice && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-400 text-slate-900 text-xs sm:text-[13px] font-medium py-2.5 px-4 relative z-50 border-b border-amber-500/30"
          >
            <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-grow">
                <Info className="w-4 h-4 text-slate-900 flex-shrink-0" />
                <p className="leading-snug">
                  <strong>Pengumuman Pelaku Usaha:</strong> Bagi Pelaku Usaha yang memiliki data proyek transisi sebelum penerapan PP 28 dengan persyaratan tata ruang telah terbit namun perizinan berusahanya belum rampung, silakan mengakses panduan Pengajuan Perizinan Berusaha (Data Lama).
                </p>
              </div>
              <button 
                onClick={() => setShowTopNotice(false)}
                className="p-1 hover:bg-black/10 rounded-md transition-colors flex-shrink-0"
                aria-label="Tutup Pengumuman"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main className="flex-grow pb-24">
        {/* HERO HEADER SECTION */}
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
              <span className="text-amber-300">Panduan Perizinan/Usaha</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Building2 className="w-3.5 h-3.5 text-blue-300" />
                  <span>OSS-RBA & Legalitas Penyedia Pengadaan</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  PANDUAN PERIZINAN BERUSAHA
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                  Panduan teknis pengurusan perizinan berusaha berbasis risiko (OSS RBA), Nomor Induk Berusaha (NIB), izin operasional, fasilitas insentif pajak, serta legalitas penyedia barang/jasa Kemnaker.
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn direction="up" delay={0.1}>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://oss.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <span>Portal Resmi OSS.go.id</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://oss.go.id/panduan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl backdrop-blur-md transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-accent-gold" />
                    <span>Petunjuk Teknis OSS</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* MAIN INTERACTIVE CONTENT (SIDEBAR + LIST) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR - KATEGORI (Matching Screenshot Style) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 static lg:sticky lg:top-24">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Kategori</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {guideData.length} Panduan
                </span>
              </h2>

              <nav className="space-y-1.5" aria-label="Kategori Panduan">
                {guideCategories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? guideData.length 
                    : guideData.filter(g => g.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-[13px] font-bold transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#8B1E1E] text-white shadow-sm'
                          : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/50'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.label}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white text-slate-500 border border-slate-200 group-hover:border-slate-300'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Help Widget in Sidebar */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                  <div className="flex items-center gap-2 text-primary-navy font-bold text-xs mb-1.5">
                    <HelpCircle className="w-4 h-4 text-primary-navy" />
                    <span>Butuh Bantuan Teknis?</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                    Hubungi Call Center OSS Kementerian Investasi/BKPM atau Helpdesk UKPBJ Kemnaker.
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:169"
                      className="inline-flex items-center justify-center gap-1.5 flex-1 bg-white hover:bg-slate-100 text-primary-navy text-xs font-bold py-2 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                    >
                      <span>Kontak 169</span>
                    </a>
                    <Link
                      href="/layanan"
                      className="inline-flex items-center justify-center gap-1.5 flex-1 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      <span>Helpdesk</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN AREA - SEARCH & GUIDE CARDS */}
            <div className="lg:col-span-8 space-y-4">
              {/* Search Bar matching screenshot */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Panduan Perizinan / KBLI / Super Tax / NIB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue shadow-xs placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Active Filter Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  Menampilkan <strong>{filteredGuides.length}</strong> panduan untuk kategori: <strong>{guideCategories.find(c => c.id === selectedCategory)?.label}</strong>
                </span>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="text-primary-navy hover:underline font-bold"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Guide List Cards */}
              <div className="space-y-3">
                {filteredGuides.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                    <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-700">Panduan Tidak Ditemukan</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Tidak ada panduan yang sesuai dengan kata kunci pencarian atau kategori yang dipilih.
                    </p>
                    <button
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                      className="mt-4 px-4 py-2 bg-primary-navy text-white text-xs font-bold rounded-xl hover:bg-[#071F36] transition-colors"
                    >
                      Tampilkan Semua Panduan
                    </button>
                  </div>
                ) : (
                  filteredGuides.map((guide) => (
                    <div
                      key={guide.id}
                      onClick={() => setSelectedGuide(guide)}
                      className="bg-white hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-primary-navy bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                            {guide.categoryLabel}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            • Sasaran: {guide.targetUser}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                          {guide.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:flex-col sm:items-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGuide(guide);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 group-hover:bg-primary-navy text-slate-700 group-hover:text-white text-xs font-bold transition-colors shadow-2xs"
                        >
                          <span>Lihat Alur & Syarat</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </section>

        {/* MODAL DETAIL PANDUAN */}
        <AnimatePresence>
          {selectedGuide && (
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
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>{selectedGuide.categoryLabel}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold pr-8 leading-snug">
                    {selectedGuide.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2">
                    Target Pengguna: <strong>{selectedGuide.targetUser}</strong>
                  </p>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-grow text-xs sm:text-sm">
                  {/* Deskripsi */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary-navy" />
                      <span>Ringkasan Panduan</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {selectedGuide.desc}
                    </p>
                  </div>

                  {/* Dokumen Persyaratan */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Dokumen & Persyaratan yang Harus Disiapkan</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedGuide.docRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-700">
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="leading-snug">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tahapan Alur */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary-navy" />
                      <span>Tahapan Langkah Pelaksanaan</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedGuide.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="w-6 h-6 rounded-lg bg-primary-navy text-accent-gold text-xs font-black flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-slate-700 leading-relaxed font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Format: <strong>PDF Juknis Resmi</strong> • Ukuran: <strong>{selectedGuide.fileSize || '2.0 MB'}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedGuide(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      Tutup
                    </button>
                    {selectedGuide.externalUrl && (
                      <a
                        href={selectedGuide.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        <span>Akses Portal OSS</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
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
