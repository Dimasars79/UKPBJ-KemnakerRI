"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, Briefcase, Globe, Shield, 
  Monitor, Server, Database, Cloud, 
  ShieldCheck, Activity, Cpu, 
  CheckCircle2, FileText, Download, Smartphone,
  Layers, Search, Bell, Settings, LayoutDashboard,
  Building2, ChevronRight, BarChart3
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail' | 'form' | 'mobile'>('dashboard');

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06192E] via-[#0A2540] to-[#06192E] text-white border-t border-white/10" id="arsitektur">
      {/* Background Decorative Mesh & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-blue-300" />
              <span>Arsitektur Sistem & Ekosistem Digital</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Arsitektur Portal UKPBJ Kemnaker
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Satu Portal, Seluruh Informasi Pengadaan — Terintegrasi dari Pengguna, Frontend, Backend, Cloud Database, hingga Layanan Nasional LKPP.
            </p>
          </FadeIn>
        </div>

        {/* 1. ARCHITECTURE 5-TIER DIAGRAM FLOW (Matching Top Diagram) */}
        <FadeIn direction="up" delay={0.1}>
          <div className="bg-[#0B1E38]/90 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl backdrop-blur-md mb-16">
            
            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              {/* Card 1: Pengguna */}
              <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">
                    <Users className="w-4 h-4 text-blue-300" />
                    <span>Pengguna</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-200">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <UserCheck className="w-3.5 h-3.5 text-accent-gold" />
                      <span>PPK / PA</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Briefcase className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Pokja Pemilihan</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Building2 className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Penyedia / Vendor</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Globe className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Masyarakat Umum</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Shield className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Admin UKPBJ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Frontend */}
              <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider mb-3">
                    <Monitor className="w-4 h-4 text-sky-300" />
                    <span>Frontend (Web Portal)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-center mb-3">
                    <span className="text-xs font-extrabold text-sky-200">Web Browser</span>
                    <span className="block text-[10px] text-slate-400">(Desktop & Mobile)</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-sky-400">•</span> UI/UX Modern & Formal
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-sky-400">•</span> Responsive Design
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-sky-400">•</span> Aksesibilitas (A11y)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-sky-400">•</span> Multi Bahasa (ID / EN)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 3: Backend / App Layer */}
              <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
                    <Server className="w-4 h-4 text-indigo-300" />
                    <span>Backend / App Layer</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-center mb-3">
                    <span className="text-xs font-extrabold text-indigo-200">Next.js / Node.js</span>
                    <span className="block text-[10px] text-slate-400">(API & Business Logic)</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span> Manajemen Pengguna
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span> Manajemen Pengadaan
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span> Notifikasi & Messaging
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span> Integrasi External API
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span> Security & Auth
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 4: Database */}
              <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
                    <Database className="w-4 h-4 text-emerald-300" />
                    <span>Database</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-center mb-3">
                    <span className="text-xs font-extrabold text-emerald-200">PostgreSQL Database</span>
                    <span className="block text-[10px] text-slate-400">(Cloud Database)</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span> Data Pengguna & Hak Akses
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span> Data Paket Pengadaan
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span> Data Dokumen & KAK
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span> Log Aktivitas & Audit Trail
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span> Metadata & Config
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 5: External Services */}
              <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                    <Cloud className="w-4 h-4 text-amber-300" />
                    <span>External Services</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-200">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20">
                      <span className="font-bold text-amber-200 block text-xs">LKPP (SiKAP & SiRUP)</span>
                      <span className="text-[10px] text-slate-400">API Integration</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20">
                      <span className="font-bold text-amber-200 block text-xs">Email / Notifikasi</span>
                      <span className="text-[10px] text-slate-400">SMTP Notification Service</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20">
                      <span className="font-bold text-amber-200 block text-xs">Cloud Storage / CDN</span>
                      <span className="text-[10px] text-slate-400">Document Asset Storage</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Security & Infra Pills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <strong className="text-white block">Keamanan Berlapis:</strong>
                  <span className="text-slate-400 text-[11px]">SSL/TLS, Firewall, Role-Based Access Control, Audit Log</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Cloud className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <strong className="text-white block">Hosting & Deployment:</strong>
                  <span className="text-slate-400 text-[11px]">Vercel Edge Network / Cloud Infrastructure</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Activity className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <strong className="text-white block">Monitoring & Logging:</strong>
                  <span className="text-slate-400 text-[11px]">99.9% Uptime, Error Tracking, Real-time Analytics</span>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>

        {/* 2. CONTOH TAMPILAN UI PORTAL (INTERACTIVE SHOWCASE) */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Prototipe & Simulasi Tampilan
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Contoh Tampilan Antarmuka Portal Pengadaan
              </h3>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard Admin</span>
              </button>

              <button
                onClick={() => setActiveTab('detail')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'detail'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Detail Paket Pengadaan</span>
              </button>

              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'form'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Formulir Pendaftaran</span>
              </button>

              <button
                onClick={() => setActiveTab('mobile')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'mobile'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Tampilan Mobile</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE MOCKUP VIEWERS */}
          <div className="bg-slate-900/90 rounded-3xl border border-white/20 p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            
            {/* TAB 1: DASHBOARD ADMIN VIEW */}
            {activeTab === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden text-slate-900 border border-slate-200 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row min-h-[520px]">
                  {/* Left Mock Sidebar */}
                  <div className="w-full lg:w-56 bg-[#0A2540] text-white p-5 flex flex-col justify-between border-r border-white/10">
                    <div>
                      <div className="flex items-center gap-2.5 pb-5 border-b border-white/10 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-gold text-slate-950 flex items-center justify-center font-black text-xs">
                          UK
                        </div>
                        <div>
                          <strong className="text-xs font-bold block leading-tight">UKPBJ Kemnaker</strong>
                          <span className="text-[10px] text-slate-400">Portal Admin PBJ</span>
                        </div>
                      </div>

                      <nav className="space-y-1 text-xs font-medium">
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/15 text-white font-bold">
                          <LayoutDashboard className="w-4 h-4 text-accent-gold" />
                          <span>Dashboard</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <Briefcase className="w-4 h-4" />
                          <span>Paket Pengadaan</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <Bell className="w-4 h-4" />
                          <span>Pengumuman</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <FileText className="w-4 h-4" />
                          <span>Regulasi</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <Users className="w-4 h-4" />
                          <span>Vendor / Penyedia</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <BarChart3 className="w-4 h-4" />
                          <span>Laporan</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5">
                          <Settings className="w-4 h-4" />
                          <span>Pengaturan</span>
                        </div>
                      </nav>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400">
                      <span>Versi Sistem 2.4.0 • Kemnaker RI</span>
                    </div>
                  </div>

                  {/* Main Mock Content */}
                  <div className="flex-1 p-6 bg-slate-50 overflow-x-auto">
                    {/* Top Admin Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
                      <div>
                        <h4 className="text-lg font-black text-primary-navy">Dashboard Pengadaan</h4>
                        <p className="text-xs text-slate-500">Selamat datang, <strong>Dimas Ars 👋</strong> (Admin UKPBJ Kemnaker)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="text" placeholder="Cari di portal..." className="bg-white pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none w-44" readOnly />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary-navy text-accent-gold text-xs font-bold flex items-center justify-center">
                          DA
                        </div>
                      </div>
                    </div>

                    {/* 4 Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-5">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Total Paket</span>
                        <div className="text-xl font-black text-slate-900 mt-1">128</div>
                        <span className="text-[10px] text-emerald-600 font-bold">↑ 12% dari bulan lalu</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Sedang Berjalan</span>
                        <div className="text-xl font-black text-slate-900 mt-1">48</div>
                        <span className="text-[10px] text-blue-600 font-bold">↑ 8% dari bulan lalu</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Selesai</span>
                        <div className="text-xl font-black text-slate-900 mt-1">72</div>
                        <span className="text-[10px] text-emerald-600 font-bold">↑ 15% dari bulan lalu</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Penyedia Terdaftar</span>
                        <div className="text-xl font-black text-slate-900 mt-1">342</div>
                        <span className="text-[10px] text-purple-600 font-bold">↑ 5% dari bulan lalu</span>
                      </div>
                    </div>

                    {/* Recent Packages Table */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <strong className="text-xs font-bold text-slate-900">Paket Pengadaan Terbaru</strong>
                        <span className="text-[11px] font-bold text-primary-navy">Lihat Semua →</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                              <th className="py-2">No</th>
                              <th className="py-2">Nama Paket</th>
                              <th className="py-2">Nilai HPS</th>
                              <th className="py-2">Status</th>
                              <th className="py-2">Tanggal</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            <tr>
                              <td className="py-2.5">1</td>
                              <td className="py-2.5 font-bold text-primary-navy">Pengadaan Jasa Konsultan IT</td>
                              <td className="py-2.5">Rp 500.000.000</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Tender</span></td>
                              <td className="py-2.5 text-slate-500">12 Agu 2026</td>
                            </tr>
                            <tr>
                              <td className="py-2.5">2</td>
                              <td className="py-2.5 font-bold text-primary-navy">Pengadaan Mebelair Kantor</td>
                              <td className="py-2.5">Rp 350.000.000</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Tender</span></td>
                              <td className="py-2.5 text-slate-500">10 Agu 2026</td>
                            </tr>
                            <tr>
                              <td className="py-2.5">3</td>
                              <td className="py-2.5 font-bold text-primary-navy">Pengadaan Jasa Kebersihan</td>
                              <td className="py-2.5">Rp 200.000.000</td>
                              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Selesai</span></td>
                              <td className="py-2.5 text-slate-500">8 Agu 2026</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DETAIL PAKET PENGADAAN */}
            {activeTab === 'detail' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 border border-slate-200 shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                  <span>Paket Pengadaan</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary-navy font-bold">Detail Pengadaan Jasa Konsultan IT</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl sm:text-2xl font-black text-primary-navy">
                        Pengadaan Jasa Konsultan IT
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-primary-navy text-[10px] font-bold uppercase">
                        Tender Aktif
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Kode Tender: <strong>TND-2026-KMNK-0812</strong> • Satuan Kerja: Pusdatin Kemnaker</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Nilai HPS</span>
                    <div className="text-lg font-black text-primary-navy mt-0.5">Rp 500.000.000</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tanggal Pengumuman</span>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">12 Agustus 2026</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Batas Akhir Pendaftaran</span>
                    <div className="text-sm font-bold text-red-600 mt-0.5">20 Agustus 2026 15:00 WIB</div>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Deskripsi Paket:</h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                    Pengadaan jasa konsultansi IT untuk mendukung implementasi sistem informasi dan transformasi tata kelola layanan digital di lingkungan Kementerian Ketenagakerjaan Republik Indonesia.
                  </p>

                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Download Dokumen Pemilihan:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <FileText className="w-4 h-4 text-red-500" />
                        <div>
                          <span>KAK.pdf</span>
                          <span className="block text-[10px] text-slate-400 font-normal">2.5 MB</span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <span>Spesifikasi Teknis.pdf</span>
                          <span className="block text-[10px] text-slate-400 font-normal">1.8 MB</span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        <div>
                          <span>Formulir Pendaftaran.pdf</span>
                          <span className="block text-[10px] text-slate-400 font-normal">1.2 MB</span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: FORMULIR PENDAFTARAN PENYEDIA */}
            {activeTab === 'form' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 border border-slate-200 shadow-xl max-w-2xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-primary-navy">Formulir Pendaftaran Penyedia</h4>
                  <p className="text-xs text-slate-500 mt-1">Lengkapi data profil badan usaha untuk mendaftar sebagai rekanan resmi pengadaan Kemnaker</p>
                </div>

                {/* 3 Step Wizard Progress */}
                <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-primary-blue">
                    <span className="w-6 h-6 rounded-full bg-primary-blue text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Data Perusahaan</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">2</span>
                    <span>Dokumen</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">3</span>
                    <span>Konfirmasi</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Perusahaan / Badan Usaha *</label>
                      <input type="text" placeholder="Masukkan nama perusahaan" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none" readOnly value="PT Solusi Teknologi Nusantara" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nomor Pokok Wajib Pajak (NPWP) *</label>
                      <input type="text" placeholder="Masukkan NPWP" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none" readOnly value="01.234.567.8-901.000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Jenis Usaha *</label>
                      <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none" disabled>
                        <option>Perseroan Terbatas (PT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nomor Induk Berusaha (NIB) *</label>
                      <input type="text" placeholder="13 Digit NIB OSS" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none" readOnly value="9120003450912" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Alamat Domisili Kantor</label>
                    <textarea rows={2} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none" readOnly value="Jl. Gatot Subroto Kav. 51, Jakarta Selatan, DKI Jakarta 12950" />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                    <button className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl">Batal</button>
                    <button className="px-5 py-2 text-xs font-bold text-white bg-primary-navy rounded-xl">Selanjutnya →</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: MOBILE RESPONSIVE PREVIEW */}
            {activeTab === 'mobile' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center p-4"
              >
                {/* Smartphone Device Frame */}
                <div className="w-[320px] bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-700 relative">
                  {/* Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                  {/* Screen Content */}
                  <div className="bg-slate-50 rounded-[28px] overflow-hidden text-slate-900 min-h-[480px] flex flex-col justify-between p-4 border border-slate-200">
                    <div>
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded bg-primary-navy text-accent-gold text-[10px] font-black flex items-center justify-center">UK</div>
                          <span className="text-xs font-bold text-primary-navy">UKPBJ Kemnaker</span>
                        </div>
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold">≡</div>
                      </div>

                      {/* Mobile Hero */}
                      <div className="bg-gradient-to-br from-primary-navy to-[#113264] text-white p-3.5 rounded-2xl mb-3 text-center">
                        <span className="text-[8px] font-bold text-amber-300 uppercase block">Portal Pengadaan</span>
                        <strong className="text-xs block mt-0.5">UKPBJ Kemnaker RI</strong>
                        <p className="text-[9px] text-slate-300 mt-1">Transparan, Akuntabel, dan Profesional</p>
                      </div>

                      {/* 4 Icon Quick Menu */}
                      <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <FileText className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                          <span className="text-[8px] font-bold block">Paket</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <Bell className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                          <span className="text-[8px] font-bold block">Info</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                          <span className="text-[8px] font-bold block">Regulasi</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                          <span className="text-[8px] font-bold block">Vendor</span>
                        </div>
                      </div>

                      {/* Status Banner */}
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Sistem SPSE & SiRUP Berjalan Normal</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-center text-[8px] text-slate-400">
                      <span>© 2026 UKPBJ Kementerian Ketenagakerjaan RI</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
