"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft,
  ChevronsRight,
  ExternalLink, 
  Info, 
  X, 
  ShieldCheck, 
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { useData, ProcurementPackage } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export function DataTable() {
  const { packagesList } = useData();
  const { trans } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const [selectedPackage, setSelectedPackage] = useState<ProcurementPackage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPackage]);

  // Reset ke halaman 1 saat filter atau pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, itemsPerPage]);

  // Filter paket berdasarkan pencarian, kategori, dan status
  const filteredPackages = useMemo(() => {
    return packagesList.filter((pkg) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q ||
        pkg.title.toLowerCase().includes(q) ||
        pkg.code.toLowerCase().includes(q) ||
        pkg.unit.toLowerCase().includes(q);
      
      const matchCat = selectedCategory === 'Semua' || pkg.category === selectedCategory;
      const matchStatus = selectedStatus === 'Semua' || pkg.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [packagesList, searchQuery, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage) || 1;
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredPackages.length);
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const el = document.getElementById('monitoring-table-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Algoritma Pintar Pagination dengan Ellipsis (...)
  // Menghasilkan maksimal 7 tombol halaman agar selalu rapi dan proporsional
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (validCurrentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (validCurrentPage >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(validCurrentPage - 1);
      pages.push(validCurrentPage);
      pages.push(validCurrentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const getTargetUrl = (pkg: ProcurementPackage) => {
    if (pkg.category === 'E-Purchasing') {
      return 'https://katalog.inaproc.id/';
    }
    return 'https://spse.kemnaker.go.id/eproc4/lelang';
  };

  return (
    <div id="monitoring-table-container" className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8 scroll-mt-24">
      {/* Table Header & Quick Action */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 md:justify-between md:items-center bg-slate-50/50">
        <div>
          <h3 className="text-xl font-bold text-primary-navy">{trans('Analisis Data Pengadaan', 'Procurement Data Analysis')}</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {trans(
              `Daftar paket pengadaan resmi dari basis data SPSE/RUP Kemnaker RI (${filteredPackages.length.toLocaleString('id-ID')} paket ditemukan)`,
              `Official procurement packages list from MoM SPSE/RUP database (${filteredPackages.length.toLocaleString('id-ID')} packages found)`
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="https://spse.kemnaker.go.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-blue-50 border border-blue-200 text-primary-blue rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span>Portal SPSE Kemnaker</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Link href="/#pengadaan" className="px-3.5 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap text-center">
            {trans('Lihat di Beranda', 'View on Homepage')}
          </Link>
        </div>
      </div>

      {/* Toolbar Filter & Pencarian Cepat */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-white flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={trans('Cari nama paket, kode RUP, atau satker...', 'Search package name, RUP code, or unit...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Kategori */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">{trans('Kategori:', 'Category:')}</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="Semua">Semua Metode ({packagesList.length})</option>
              <option value="Tender">Tender</option>
              <option value="Seleksi">Seleksi</option>
              <option value="E-Purchasing">E-Purchasing</option>
              <option value="Pengadaan Langsung">Pengadaan Langsung</option>
            </select>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="Semua">Semua Status</option>
              <option value="Pendaftaran Dibuka">Pendaftaran Dibuka</option>
              <option value="Tahap Evaluasi">Tahap Evaluasi</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* Items Per Page */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 font-semibold cursor-pointer hover:bg-slate-100 transition-colors"
              title="Jumlah baris per halaman"
            >
              <option value={10}>10 / hal</option>
              <option value={20}>20 / hal</option>
              <option value={50}>50 / hal</option>
              <option value={100}>100 / hal</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">{trans('Nama Paket & Kode', 'Package Name & Code')}</th>
              <th className="px-6 py-4">{trans('Kategori', 'Category')}</th>
              <th className="px-6 py-4">{trans('Nilai Pagu (HPS)', 'Budget (HPS)')}</th>
              <th className="px-6 py-4">{trans('Unit Kerja', 'Work Unit')}</th>
              <th className="px-6 py-4">{trans('Status', 'Status')}</th>
              <th className="px-6 py-4 text-right">{trans('Batas Akhir', 'Deadline')}</th>
              <th className="px-6 py-4 text-center">{trans('Alur / Aksi', 'Action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentPackages.length > 0 ? (
              currentPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary-navy">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary-blue flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <span className="block font-bold truncate text-slate-900" title={pkg.title}>{pkg.title}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{pkg.code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{pkg.hps}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs max-w-xs truncate" title={pkg.unit}>{pkg.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pkg.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                      pkg.status === 'Tahap Evaluasi' ? 'bg-amber-100 text-amber-700' :
                      pkg.status === 'Pendaftaran Dibuka' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {pkg.status === 'Selesai' ? trans('Selesai', 'Completed') :
                       pkg.status === 'Tahap Evaluasi' ? trans('Tahap Evaluasi', 'Evaluation Stage') :
                       pkg.status === 'Pendaftaran Dibuka' ? trans('Pendaftaran Dibuka', 'Registration Open') :
                       pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-medium text-slate-500">
                    {pkg.deadline}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                        pkg.status === 'Pendaftaran Dibuka'
                          ? 'bg-primary-blue hover:bg-blue-700 text-white'
                          : pkg.status === 'Tahap Evaluasi'
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {pkg.status === 'Pendaftaran Dibuka' ? (
                        <>
                          <span>{trans('Ikuti Tender', 'Join Tender')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </>
                      ) : pkg.status === 'Tahap Evaluasi' ? (
                        <>
                          <span>{trans('Pantau SPSE', 'Monitor SPSE')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          <span>{trans('Detail SPSE', 'SPSE Detail')}</span>
                          <Info className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  {trans('Tidak ada data paket pengadaan yang cocok dengan kriteria pencarian.', 'No procurement package data matches the search criteria.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Smart, Compact, and Elegant Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          {/* Showing Counter */}
          <p className="text-xs text-slate-500 font-medium order-2 sm:order-1 text-center sm:text-left">
            {trans(
              `Menampilkan ${startIndex + 1} - ${endIndex} dari ${filteredPackages.length.toLocaleString('id-ID')} paket (Halaman ${validCurrentPage} dari ${totalPages})`,
              `Showing ${startIndex + 1} - ${endIndex} of ${filteredPackages.length.toLocaleString('id-ID')} packages (Page ${validCurrentPage} of ${totalPages})`
            )}
          </p>

          {/* Page Buttons with Smart Ellipsis */}
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {/* Lompat ke Halaman Pertama */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={validCurrentPage === 1}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium transition-all ${
                validCurrentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50 opacity-60'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 cursor-pointer bg-white shadow-2xs'
              }`}
              title="Halaman Pertama"
              aria-label="Halaman Pertama"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Halaman Sebelumnya */}
            <button
              onClick={() => handlePageChange(validCurrentPage - 1)}
              disabled={validCurrentPage === 1}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium transition-all ${
                validCurrentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50 opacity-60'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 cursor-pointer bg-white shadow-2xs'
              }`}
              title="Halaman Sebelumnya"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Nomor Halaman di Layar Desktop (Maksimal 7 tombol rapi) */}
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((item, idx) => {
                if (item === '...') {
                  return (
                    <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 select-none">
                      •••
                    </span>
                  );
                }
                const pageNum = item as number;
                const isActive = validCurrentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[34px] h-[34px] px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-navy text-white shadow-xs scale-105'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Indikator Halaman di Layar Mobile */}
            <div className="sm:hidden px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
              {validCurrentPage} / {totalPages}
            </div>

            {/* Halaman Berikutnya */}
            <button
              onClick={() => handlePageChange(validCurrentPage + 1)}
              disabled={validCurrentPage === totalPages}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium transition-all ${
                validCurrentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50 opacity-60'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 cursor-pointer bg-white shadow-2xs'
              }`}
              title="Halaman Berikutnya"
              aria-label="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Lompat ke Halaman Terakhir */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={validCurrentPage === totalPages}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium transition-all ${
                validCurrentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50 opacity-60'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 cursor-pointer bg-white shadow-2xs'
              }`}
              title="Halaman Terakhir"
              aria-label="Halaman Terakhir"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Alur Pendaftaran & Koneksi SPSE / INAPROC via createPortal to break out of all parent stacking contexts */}
      {mounted && selectedPackage && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={() => setSelectedPackage(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-auto max-h-[85vh] flex flex-col relative z-[100000]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-primary-navy to-slate-800 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">
                    {trans('Alur Pendaftaran & Informasi SPSE', 'Registration Flow & SPSE Information')}
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Sistem Pengadaan Secara Elektronik Kemnaker RI
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPackage(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Package Summary Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-100/70 text-blue-800 font-bold">
                    {selectedPackage.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedPackage.status === 'Pendaftaran Dibuka' ? 'bg-green-100 text-green-700' :
                    selectedPackage.status === 'Tahap Evaluasi' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {selectedPackage.status}
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm leading-snug">
                  {selectedPackage.title}
                </h5>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Nilai Pagu (HPS)</span>
                    <span className="font-bold text-slate-900">{selectedPackage.hps}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Batas Pendaftaran</span>
                    <span className="font-semibold text-slate-700">{selectedPackage.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-step guidance */}
              <div>
                <h6 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-primary-blue" />
                  <span>{trans('Petunjuk Mengikuti Paket Pengadaan Ini', 'Steps to Participate in this Package')}</span>
                </h6>
                <ol className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                    <span className="w-5 h-5 rounded-full bg-primary-blue text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-900 block">Akun Penyedia (SIKaP / INAPROC)</strong>
                      Pastikan perusahaan/rekanan Anda telah terdaftar dan terverifikasi di portal SIKaP LKPP (INAPROC) atau LPSE Kemnaker.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                    <span className="w-5 h-5 rounded-full bg-primary-blue text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-900 block">Akses Aplikasi SPSE Kemnaker RI</strong>
                      Pendaftaran resmi, pengunduhan Kerangka Acuan Kerja (KAK), pemberian penjelasan (Aanwijzing), hingga pemasukan penawaran diproses langsung melalui SPSE Kemnaker.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                    <span className="w-5 h-5 rounded-full bg-primary-blue text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-900 block">Batas Waktu Pengiriman Dokumen</strong>
                      Perhatikan jadwal penutupan dokumen pemilihan pada <strong>{selectedPackage.deadline}</strong> melalui server SPSE.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Informational Callout */}
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  Sesuai ketentuan LKPP, portal UKPBJ ini berfungsi sebagai <strong>media monitoring transparansi publik</strong>. Seluruh proses penawaran resmi hanya sah apabila dilakukan pada portal <strong>SPSE Kemnaker</strong>.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0">
              <a
                href="https://spse.kemnaker.go.id/eproc4/registrasi/penyedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-blue hover:text-blue-800 font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <span>Belum punya akun? Registrasi Penyedia</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
                >
                  Tutup
                </button>
                <a
                  href={getTargetUrl(selectedPackage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-primary-navy hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>{selectedPackage.category === 'E-Purchasing' ? 'Buka E-Katalog' : 'Lanjut ke SPSE Kemnaker'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent-gold" />
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
