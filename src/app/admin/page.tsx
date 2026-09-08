"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Network, 
  Users, 
  Bell, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  CheckCircle2, 
  Clock, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  Server, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  FileCheck, 
  Sparkles, 
  ExternalLink, 
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackageItem {
  id: number;
  name: string;
  hps: string;
  status: string;
  date: string;
  deadline: string;
  unit: string;
  desc: string;
}

export default function AdminPortalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'paket' | 'arsitektur' | 'penyedia' | 'pengumuman' | 'regulasi' | 'laporan' | 'pengaturan'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  // Vendor Form Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [vendorSuccess, setVendorSuccess] = useState(false);

  const packagesList = [
    {
      id: 1,
      name: 'Pengadaan Jasa Konsultan IT & Portal Terpadu',
      hps: 'Rp 500.000.000',
      status: 'Tender',
      date: '12 Agu 2026',
      deadline: '20 Agu 2026',
      unit: 'Biro Perencanaan Kemnaker RI',
      desc: 'Pengadaan jasa konsultan IT untuk mendukung implementasi sistem informasi terintegrasi di lingkungan Kementerian Ketenagakerjaan.'
    },
    {
      id: 2,
      name: 'Pengadaan Peralatan Workshop Balai Vokasi',
      hps: 'Rp 350.000.000',
      status: 'Tender',
      date: '10 Agu 2026',
      deadline: '18 Agu 2026',
      unit: 'Ditjen Binalavotas',
      desc: 'Pengadaan sarana dan prasarana penunjang pelatihan vokasi dan produktivitas tenaga kerja.'
    },
    {
      id: 3,
      name: 'Pengadaan Jasa Kebersihan & Keamanan Gedung',
      hps: 'Rp 200.000.000',
      status: 'Seleksi',
      date: '8 Agu 2026',
      deadline: '15 Agu 2026',
      unit: 'Biro Umum Kemnaker RI',
      desc: 'Penyediaan tenaga alih daya kebersihan dan pengamanan lingkungan kantor kementerian.'
    },
    {
      id: 4,
      name: 'Pengadaan Lisensi Software & Monitoring Server',
      hps: 'Rp 750.000.000',
      status: 'Tender',
      date: '5 Agu 2026',
      deadline: '14 Agu 2026',
      unit: 'Pusdatin Kemnaker RI',
      desc: 'Lisensi tahunan piranti lunak firewall, monitoring jaringan, dan keamanan data SPSE.'
    },
    {
      id: 5,
      name: 'Penyusunan Pedoman Standar Operasional PBJ',
      hps: 'Rp 120.000.000',
      status: 'Seleksi',
      date: '1 Agu 2026',
      deadline: '10 Agu 2026',
      unit: 'UKPBJ Kemnaker RI',
      desc: 'Kajian dan penyusunan buku pedoman standar operasional prosedur pengadaan barang/jasa pemerintah.'
    }
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Portal Brand */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-accent-gold flex items-center justify-center shadow-md">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-white tracking-wide">PORTAL ADMIN</h1>
                <p className="text-[10px] text-accent-gold font-bold">UKPBJ KEMNAKER RI</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('paket')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'paket'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Paket Pengadaan</span>
              <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-accent-gold text-slate-950 rounded-full font-extrabold">128</span>
            </button>

            <button
              onClick={() => setActiveTab('arsitektur')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'arsitektur'
                  ? 'bg-gradient-to-r from-accent-gold to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Arsitektur Portal</span>
              <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-300 rounded font-bold">5-Tier</span>
            </button>

            <button
              onClick={() => setActiveTab('penyedia')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'penyedia'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Vendor / Penyedia</span>
            </button>

            <button
              onClick={() => setActiveTab('pengumuman')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pengumuman'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Pengumuman</span>
            </button>

            <button
              onClick={() => setActiveTab('regulasi')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'regulasi'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Regulasi & SOP</span>
            </button>

            <button
              onClick={() => setActiveTab('laporan')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'laporan'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Laporan & Kinerja</span>
            </button>

            <button
              onClick={() => setActiveTab('pengaturan')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pengaturan'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </button>
          </nav>
        </div>

        {/* Profile Card & Back to Home */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center space-x-3 px-2 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center font-bold text-accent-gold text-xs">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Dimas Ars</p>
              <p className="text-[10px] text-slate-400 truncate">Admin UKPBJ Kemnaker</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Web Publik</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen bg-slate-950">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <div className="relative w-64 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Cari di portal admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SPSE Server Online</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('arsitektur')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent-gold/10 border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/20 text-xs font-bold transition-all cursor-pointer"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Lihat Blueprint Arsitektur</span>
            </button>

            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </div>
          </div>
        </header>

        {/* TAB 1: DASHBOARD UTAMA */}
        {activeTab === 'dashboard' && (
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Greeting */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Dashboard</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Selamat datang, <strong className="text-white">Dimas Ars 👋</strong> — Berikut adalah ringkasan aktivitas pengadaan hari ini.
              </p>
            </div>

            {/* 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Total Paket</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white">128</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                  <span>↑ 12% dari bulan lalu</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Sedang Berjalan</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white">48</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                  <span>↑ 8% dari bulan lalu</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Selesai</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white">72</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                  <span>↑ 15% dari bulan lalu</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Penyedia Terdaftar</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white">342</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                  <span>↑ 5% dari bulan lalu</span>
                </p>
              </div>
            </div>

            {/* 2-Column Section: Paket Pengadaan Terbaru & Berita/Pengumuman */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Paket Pengadaan Terbaru Table */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-white">Paket Pengadaan Terbaru</h3>
                  <button 
                    onClick={() => setActiveTab('paket')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                        <th className="pb-3 font-semibold">No</th>
                        <th className="pb-3 font-semibold">Nama Paket</th>
                        <th className="pb-3 font-semibold">Nilai HPS</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Tanggal</th>
                        <th className="pb-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {packagesList.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 text-slate-500">{idx + 1}</td>
                          <td className="py-3 font-semibold text-slate-200">{item.name}</td>
                          <td className="py-3 text-slate-300 font-mono">{item.hps}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'Tender' 
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400 text-[11px]">{item.date}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedPackage(item);
                                setShowDetailModal(true);
                              }}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-[10px] font-bold transition-colors"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right 1 Col: Berita & Pengumuman */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white">Berita & Pengumuman</h3>
                  <button 
                    onClick={() => setActiveTab('pengumuman')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Lihat Semua &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <p className="text-xs font-bold text-white">Sosialisasi Peraturan LKPP No. 12 Tahun 2024</p>
                    <p className="text-[10px] text-slate-400 mt-1">Pedoman pelaksanaan pengadaan barang/jasa pemerintah terkini.</p>
                    <span className="text-[9px] text-slate-500 mt-2 block">10 Agu 2026</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <p className="text-xs font-bold text-white">Pengumuman Pemenang Tender Konsultan IT</p>
                    <p className="text-[10px] text-slate-400 mt-1">Hasil evaluasi kualifikasi dan penetapan pemenang paket IT.</p>
                    <span className="text-[9px] text-slate-500 mt-2 block">8 Agu 2026</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <p className="text-xs font-bold text-white">Revisi Jadwal Tender Peralatan Kantor</p>
                    <p className="text-[10px] text-slate-400 mt-1">Perpanjangan masa sanggah dan upload penawaran teknis.</p>
                    <span className="text-[9px] text-slate-500 mt-2 block">6 Agu 2026</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ARSITEKTUR PORTAL (5-TIER SYSTEM ARCHITECTURE BLUEPRINT) */}
        {activeTab === 'arsitektur' && (
          <div className="p-6 md:p-8 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-bold uppercase mb-2">
                  <Network className="w-3.5 h-3.5" />
                  <span>Blueprint Arsitektur Sistem</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  Arsitektur Portal UKPBJ Kementerian Ketenagakerjaan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Satu Portal, Seluruh Informasi Pengadaan Terintegrasi.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  Status: Operasional 100%
                </span>
              </div>
            </div>

            {/* 5-Tier Horizontal Pipeline from Uploaded Image */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              {/* TIER 1: PENGGUNA */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-3">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Pengguna</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">PA</div>
                      <span className="text-slate-300">PPK / PA</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-bold">PJ</div>
                      <span className="text-slate-300">Pokja Pemilihan</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-[10px] font-bold">VD</div>
                      <span className="text-slate-300">Penyedia / Vendor</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] font-bold">MS</div>
                      <span className="text-slate-300">Masyarakat Umum</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-[10px] font-bold">AD</div>
                      <span className="text-slate-300">Admin UKPBJ</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  Role-Based Access Control
                </div>
              </div>

              {/* TIER 2: FRONTEND (WEB PORTAL) */}
              <div className="bg-slate-900 border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Frontend Portal</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 mb-3 text-center">
                    <p className="text-xs font-bold text-white">Web Browser</p>
                    <p className="text-[10px] text-blue-300">(Desktop & Mobile)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>UI/UX Modern & Formal</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Responsive Design</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Aksesibilitas (A11y)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Multi Bahasa (ID/EN)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  Next.js Client Components
                </div>
              </div>

              {/* TIER 3: BACKEND / APPLICATION LAYER */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-accent-gold/50 transition-all">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-accent-gold uppercase tracking-wider mb-3">
                    <Server className="w-4 h-4 text-accent-gold" />
                    <span>Backend / App Layer</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 mb-3 text-center">
                    <p className="text-xs font-bold text-white">Next.js / Node.js</p>
                    <p className="text-[10px] text-accent-gold">(API & Business Logic)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Manajemen Pengguna</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Manajemen Pengadaan</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Notifikasi & Messaging</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Integrasi External API</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Security & Auth</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  RESTful & Edge Endpoints
                </div>
              </div>

              {/* TIER 4: DATABASE */}
              <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400 transition-all">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-3">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Database</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 mb-3 text-center">
                    <p className="text-xs font-bold text-white">PostgreSQL</p>
                    <p className="text-[10px] text-emerald-300">(Cloud Database)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Data Pengguna & Hak</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Data Paket Pengadaan</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Data Dokumen & KAK</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Log Aktivitas & Audit</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Metadata & Config</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  ACID Compliant & Encrypted
                </div>
              </div>

              {/* TIER 5: EXTERNAL SERVICES */}
              <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-400 transition-all">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-purple-400 uppercase tracking-wider mb-3">
                    <Cloud className="w-4 h-4 text-purple-400" />
                    <span>External Services</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <p className="font-bold text-white text-[11px]">LKPP (SiKAP, SiRUP)</p>
                      <p className="text-[9px] text-slate-400">API Integration</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <p className="font-bold text-white text-[11px]">Email / Notifikasi</p>
                      <p className="text-[9px] text-slate-400">SMTP Notification Service</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <p className="font-bold text-white text-[11px]">Storage / CDN</p>
                      <p className="text-[9px] text-slate-400">Cloud Storage & Dokumen</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  Secure API Gateway
                </div>
              </div>

            </div>

            {/* Bottom 3 Badges: Keamanan, Hosting, Monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Keamanan Berlapis</h4>
                  <p className="text-[10px] text-slate-400">SSL/TLS, Firewall, Role Based Access Control, Audit Log</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Hosting & Deployment</h4>
                  <p className="text-[10px] text-slate-400">Vercel Edge Network / Cloud Infrastructure</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Monitoring & Logging</h4>
                  <p className="text-[10px] text-slate-400">99.9% Uptime, Error Tracking, Audit Trail</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PAKET PENGADAAN & DETAIL */}
        {activeTab === 'paket' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Manajemen Paket Pengadaan</h2>
                <p className="text-xs text-slate-400">Daftar seluruh paket tender dan seleksi di lingkungan Kemnaker RI.</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedPackage(packagesList[0]);
                  setShowDetailModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Paket Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packagesList.map((pkg) => (
                <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {pkg.status}
                    </span>
                    <span className="text-[11px] text-slate-400">Batas: {pkg.deadline}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{pkg.desc}</p>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Nilai HPS:</span>
                      <strong className="text-xs text-accent-gold font-mono">{pkg.hps}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowDetailModal(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Buka Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PENDAFTARAN PENYEDIA (WIZARD) */}
        {activeTab === 'penyedia' && (
          <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Formulir Pendaftaran Penyedia</h2>
              <p className="text-xs text-slate-400 mt-1">Lengkapi data berikut untuk mendaftar sebagai penyedia barang/jasa Kemnaker RI.</p>
            </div>

            {/* Stepper Wizard Header */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className={`flex items-center space-x-2 ${wizardStep >= 1 ? 'text-blue-400' : 'text-slate-600'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  1
                </div>
                <span className="text-xs font-bold">Data Perusahaan</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-800" />
              <div className={`flex items-center space-x-2 ${wizardStep >= 2 ? 'text-blue-400' : 'text-slate-600'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  2
                </div>
                <span className="text-xs font-bold">Dokumen Legalitas</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-800" />
              <div className={`flex items-center space-x-2 ${wizardStep >= 3 ? 'text-blue-400' : 'text-slate-600'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  3
                </div>
                <span className="text-xs font-bold">Konfirmasi</span>
              </div>
            </div>

            {/* Wizard Step 1 */}
            {wizardStep === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Nama Perusahaan / PT / CV *</label>
                    <input type="text" placeholder="Masukkan nama perusahaan" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">NPWP Perusahaan *</label>
                    <input type="text" placeholder="00.000.000.0-000.000" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Jenis Usaha *</label>
                    <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500">
                      <option>Jasa Konsultansi IT & Konstruksi</option>
                      <option>Pengadaan Barang / Alat</option>
                      <option>Jasa Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Alamat Kantor *</label>
                    <input type="text" placeholder="Masukkan alamat lengkap kantor" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setWizardStep(2)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    Selanjutnya &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 2 */}
            {wizardStep === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center">
                    <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-white">Unggah NIB & Akta Pendirian Perusahaan (PDF)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Maksimal 10 MB</p>
                    <button className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">Pilih File</button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center">
                    <FileCheck className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                    <p className="text-xs font-bold text-white">Unggah Sertifikat Badan Usaha (SBU / KTA)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Maksimal 10 MB</p>
                    <button className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">Pilih File</button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    &larr; Kembali
                  </button>
                  <button 
                    onClick={() => setWizardStep(3)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    Konfirmasi &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 3 */}
            {wizardStep === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Konfirmasi Data Penyedia</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Dengan mengklik submit, data perusahaan Anda akan diverifikasi oleh Pokja Pemilihan UKPBJ Kemnaker RI.
                </p>

                {vendorSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ✓ Pendaftaran Penyedia Berhasil Dikirimkan ke Sistem UKPBJ!
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 pt-4">
                    <button 
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      &larr; Ubah Data
                    </button>
                    <button 
                      onClick={() => setVendorSuccess(true)}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Kirim Pendaftaran
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB 5: PENGUMUMAN & REGULASI */}
        {(activeTab === 'pengumuman' || activeTab === 'regulasi') && (
          <div className="p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab} UKPBJ</h2>
            <p className="text-xs text-slate-400">Dokumen dan berita resmi kebijakan pengadaan barang/jasa Kementerian Ketenagakerjaan.</p>
            
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-gold" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Peraturan Menteri Ketenagakerjaan No. {i} Tahun 2026</h4>
                      <p className="text-[10px] text-slate-400">Petunjuk teknis pengadaan dan tata cara pemilihan penyedia.</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: LAPORAN & PENGATURAN */}
        {(activeTab === 'laporan' || activeTab === 'pengaturan') && (
          <div className="p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab}</h2>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-accent-gold mx-auto" />
              <h3 className="text-sm font-bold text-white">Modul Terintegrasi Database Cloud</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Konfigurasi sistem terhubung ke Neon PostgreSQL dan API LKPP secara real-time.
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Semua Layanan Berjalan Normal
              </span>
            </div>
          </div>
        )}

      </main>

      {/* DETAIL PAKET MODAL */}
      <AnimatePresence>
        {showDetailModal && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
                    {selectedPackage.status}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2">
                    {selectedPackage.name}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 text-xs">
                <div>
                  <span className="text-slate-500 block">Nilai HPS:</span>
                  <strong className="text-accent-gold text-sm font-mono">{selectedPackage.hps}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Tanggal Pengumuman:</span>
                  <span className="font-semibold text-white">{selectedPackage.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Batas Pendaftaran:</span>
                  <span className="font-semibold text-white">{selectedPackage.deadline}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Deskripsi Pekerjaan</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedPackage.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Dokumen Pengadaan Resmi</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-xs font-bold text-white">KAK.pdf</p>
                          <p className="text-[10px] text-slate-500">2.5 MB • Kerangka Acuan Kerja</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>Unduh</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-xs font-bold text-white">Spesifikasi Teknis.pdf</p>
                          <p className="text-[10px] text-slate-500">1.8 MB • Dokumen Teknis</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>Unduh</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="text-xs font-bold text-white">Formulir Pendaftaran.pdf</p>
                          <p className="text-[10px] text-slate-500">1.2 MB • Formulir Isian</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>Unduh</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Tutup
                </button>
                <a
                  href="https://inaproc.lkpp.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Buka di SPSE LKPP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
