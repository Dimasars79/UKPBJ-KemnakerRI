"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ExternalLink, 
  FileText, 
  Calendar, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData, ProcurementPackage } from '@/contexts/DataContext';

export function PengadaanSection() {
  const { packagesList } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [activeModalPackage, setActiveModalPackage] = useState<ProcurementPackage | null>(null);

  const categories = ['Semua', 'Tender', 'Seleksi', 'Pengadaan Langsung', 'E-Purchasing'];
  const statuses = ['Semua', 'Pendaftaran Dibuka', 'Tahap Evaluasi', 'Selesai'];

  const filteredPackages = useMemo(() => {
    return packagesList.filter((pkg) => {
      const matchSearch = 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.unit.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCat = selectedCategory === 'Semua' || pkg.category === selectedCategory;
      const matchStatus = selectedStatus === 'Semua' || pkg.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [packagesList, searchQuery, selectedCategory, selectedStatus]);

  const getStatusBadge = (status: ProcurementPackage['status']) => {
    switch (status) {
      case 'Pendaftaran Dibuka':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Pendaftaran Dibuka
          </span>
        );
      case 'Tahap Evaluasi':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
            <Clock className="w-3 h-3 mr-1 text-amber-600" />
            Tahap Evaluasi
          </span>
        );
      case 'Pemberian Penjelasan':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
            <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
            Aanwijzing / Penjelasan
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3 h-3 mr-1 text-slate-500" />
            Selesai
          </span>
        );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200 relative overflow-hidden" id="pengadaan">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <FadeIn direction="left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-navy text-xs font-bold tracking-wide uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-accent-gold" />
              <span>Satu Data Pengadaan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-navy tracking-tight">
              Informasi & Paket Pengadaan
            </h2>
            <p className="text-slate-600 max-w-2xl mt-2 text-sm sm:text-base leading-relaxed">
              Transparansi pengadaan barang dan jasa Kementerian Ketenagakerjaan RI yang terintegrasi dengan SPSE LKPP dan INAProc.
            </p>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-navy to-primary-blue text-white text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Masuk Portal Admin</span>
                <ArrowRight className="w-4 h-4 text-accent-gold" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Search & Filter Card */}
        <FadeIn direction="up">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-200/50 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="lg:col-span-6 relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari nama paket, kode tender, atau unit kerja..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="lg:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-navy text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status Filter Dropdown */}
              <div className="lg:col-span-2 relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary-blue cursor-pointer"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st === 'Semua' ? 'Semua Status' : st}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Package Grid / List */}
        <div className="space-y-4 mb-10">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg, idx) => (
              <FadeIn key={pkg.id} delay={idx * 0.05} direction="up">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-blue/40 transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                          {pkg.code}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-primary-navy text-xs font-semibold">
                          {pkg.category}
                        </span>
                        {getStatusBadge(pkg.status)}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-blue transition-colors">
                        {pkg.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{pkg.unit}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Batas: <strong className="text-slate-700">{pkg.deadline}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right: HPS & Action */}
                    <div className="flex flex-row lg:flex-col lg:items-end justify-between items-center pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 gap-3">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 block lg:text-right font-medium">Nilai HPS / Pagu</span>
                        <span className="text-base sm:text-lg font-black text-primary-navy">
                          {pkg.hps}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveModalPackage(pkg)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-primary-navy hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Detail Paket</span>
                        </button>

                        <a
                          href="https://inaproc.lkpp.go.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary-blue hover:bg-blue-50 hover:border-blue-200 transition-all"
                          title="Buka di SPSE LKPP"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </FadeIn>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">Tidak ada paket yang sesuai</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau sesuaikan filter kategori dan status pengadaan.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setSelectedStatus('Semua');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Quick Links Banner */}
        <FadeIn direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary-navy to-slate-900 text-white rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <ShieldCheck className="w-8 h-8 text-accent-gold mb-3" />
              <h4 className="font-bold text-base mb-1">Pendaftaran Penyedia Baru</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Daftarkan perusahaan Anda dalam sistem SiKAP & LPSE untuk mengikuti tender pengadaan Kemnaker.
              </p>
              <Link 
                href="/layanan" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-gold hover:text-yellow-300 transition-colors"
              >
                <span>Pelajari Syarat & Alur</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
              <FileText className="w-8 h-8 text-primary-blue mb-3" />
              <h4 className="font-bold text-base text-primary-navy mb-1">Rencana Umum Pengadaan (SiRUP)</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Transparansi seluruh rencana paket pengadaan barang dan jasa Kemnaker RI Tahun Anggaran 2026.
              </p>
              <a 
                href="https://sirup.lkpp.go.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-blue-700 transition-colors"
              >
                <span>Buka SiRUP LKPP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
              <Sparkles className="w-8 h-8 text-accent-gold mb-3" />
              <h4 className="font-bold text-base text-primary-navy mb-1">Portal Admin & Operator PBJ</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Akses dashboard internal UKPBJ untuk pengelolaan paket, verifikasi vendor, dan arsitektur data.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-blue-700 transition-colors"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {activeModalPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500">{activeModalPackage.code}</span>
                  <h3 className="text-xl font-bold text-primary-navy mt-1">
                    {activeModalPackage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalPackage(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-all text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Nilai HPS:</span>
                  <strong className="text-primary-navy text-sm">{activeModalPackage.hps}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Batas Akhir:</span>
                  <strong className="text-slate-800 text-sm">{activeModalPackage.deadline}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Metode Pengadaan:</span>
                  <span className="font-semibold text-slate-700">{activeModalPackage.method}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Satuan Kerja:</span>
                  <span className="font-semibold text-slate-700">{activeModalPackage.unit}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-primary-navy">Dokumen Pengadaan Tersedia:</h4>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                    activeModalPackage.fileData 
                      ? 'border-blue-200 bg-blue-50/50' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {activeModalPackage.fileName || 'Kerangka Acuan Kerja (KAK).pdf'}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {activeModalPackage.fileSize || '2.4 MB'} • {activeModalPackage.fileData ? '✓ Dokumen Resmi Terverifikasi' : 'Versi Resmi'}
                        </p>
                      </div>
                    </div>
                    {activeModalPackage.fileData ? (
                      <a
                        href={activeModalPackage.fileData}
                        download={activeModalPackage.fileName || `${activeModalPackage.code}-Dokumen.pdf`}
                        className="px-3.5 py-1.5 rounded-lg bg-primary-navy hover:bg-primary-blue text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                        title="Unduh Dokumen Pengadaan"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Dokumen</span>
                      </a>
                    ) : (
                      <a
                        href="https://inaproc.lkpp.go.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-primary-blue text-xs font-bold hover:bg-primary-blue hover:text-white transition-all flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Spesifikasi Teknis & Rincian HPS.pdf</p>
                        <p className="text-[10px] text-slate-400">1.8 MB • Dokumen Teknis Resmi</p>
                      </div>
                    </div>
                    <a
                      href="https://inaproc.lkpp.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalPackage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>
                <a
                  href="https://inaproc.lkpp.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-primary-navy text-white text-xs font-bold hover:bg-primary-blue transition-colors flex items-center gap-2"
                >
                  <span>Ikuti Tender di SPSE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
