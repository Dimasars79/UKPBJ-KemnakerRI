"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, Gavel, 
  CheckCircle2, LogOut, ChevronRight,
  Clock, Plus, X,
  FileCheck, Shield, HelpCircle
} from 'lucide-react';

type ConsultationTicket = {
  id: string;
  ticketNo: string;
  date: string;
  title: string;
  applicantRole: 'PPK' | 'Pokja Pemilihan' | 'Penyedia / Pelaku Usaha' | 'PA / KPA';
  category: string;
  status: 'Dalam Telaah Hukum' | 'Jadwal Mediasi Ditetapkan' | 'Rekomendasi Terbit' | 'Selesai';
  mediator: string;
  summary: string;
  recommendation?: string;
};

export default function ClearingHousePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Dashboard states
  const [tickets, setTickets] = useState<ConsultationTicket[]>([
    {
      id: '1',
      ticketNo: 'CH-KMNK/2026/0142',
      date: '15 April 2026',
      title: 'Konsultasi Perubahan Klausul Eskalasi Harga pada Kontrak Tahun Jamak (Multi-Years) Fasilitas Vokasi',
      applicantRole: 'PPK',
      category: 'Tata Kelola & Penyesuaian Kontrak',
      status: 'Rekomendasi Terbit',
      mediator: 'Tim Advokasi Hukum & UKPBJ Kemnaker',
      summary: 'Permohonan pendapat hukum terkait dasar pemberlakuan eskalasi harga akibat fluktuasi indeks bahan bangunan impor sesuai Perpres No. 12/2021.',
      recommendation: 'Diberikan rekomendasi adendum kontrak dengan melampirkan indeks BPS resmi dan persetujuan tertulis KPA.'
    },
    {
      id: '2',
      ticketNo: 'CH-KMNK/2026/0109',
      date: '02 Maret 2026',
      title: 'Mediasi Penyelesaian Keterlambatan Serah Terima Sementara (PHO) Paket TIK Pusdatin',
      applicantRole: 'Penyedia / Pelaku Usaha',
      category: 'Penyelesaian Sengketa Kontrak',
      status: 'Jadwal Mediasi Ditetapkan',
      mediator: 'Panel Mediator Independen LKPP & Biro Hukum',
      summary: 'Penyedia mengajukan permohonan mediasi atas pengenaan denda keterlambatan yang disebabkan oleh kendala logistik global (keadaan kahar).',
    },
    {
      id: '3',
      ticketNo: 'CH-KMNK/2025/0871',
      date: '10 Desember 2025',
      title: 'Pendampingan Hukum Pembuktian Kualifikasi Calon Pemenang Tender Pengadaan Alat Uji K3',
      applicantRole: 'Pokja Pemilihan',
      category: 'Evaluasi Tender & Mitigasi Risiko',
      status: 'Selesai',
      mediator: 'Tim Clearing House & APIP Inspektorat Jenderal',
      summary: 'Klarifikasi keabsahan surat izin edar dan sertifikat kalibrasi pabrikan luar negeri pada dokumen penawaran teknis.',
      recommendation: 'Dokumen dinyatakan sah setelah konfirmasi faktual ke instansi penerbit sertifikasi.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ConsultationTicket | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState<'PPK' | 'Pokja Pemilihan' | 'Penyedia / Pelaku Usaha' | 'PA / KPA'>('PPK');
  const [newCategory, setNewCategory] = useState('Tata Kelola & Penyesuaian Kontrak');
  const [newSummary, setNewSummary] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setSelectedTicket(null);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    const newTicketObj: ConsultationTicket = {
      id: String(tickets.length + 1),
      ticketNo: `CH-KMNK/2026/0${Math.floor(100 + Math.random() * 900)}`,
      date: 'Hari ini',
      title: newTitle,
      applicantRole: newRole,
      category: newCategory,
      status: 'Dalam Telaah Hukum',
      mediator: 'Tim Clearing House UKPBJ Kemnaker',
      summary: newSummary
    };

    setTickets([newTicketObj, ...tickets]);
    setNewTitle('');
    setNewSummary('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col justify-center py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 justify-center">
            <Link href="/" className="hover:text-primary-blue transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/informasi" className="hover:text-primary-blue transition-colors">Informasi</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary-navy font-bold">Clearing House Pengadaan</span>
          </div>

          {!isLoggedIn ? (
            /* ================= LOGIN FORM VIEW (Matching Screenshot) ================= */
            <FadeIn direction="up">
              <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100 p-8 sm:p-12 text-center relative overflow-hidden">
                
                {/* Decorative Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-navy via-primary-blue to-accent-gold" />

                {/* Formal Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <Gavel className="w-3.5 h-3.5 text-primary-navy" />
                  <span>Forum Mediasi & Konsultasi Hukum PBJ</span>
                </div>

                {/* Header Text */}
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight mb-2">
                  Selamat Datang !
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed">
                  Untuk dapat mengakses layanan <strong>Clearing House Pengadaan</strong> anda harus login terlebih dahulu !
                </p>

                {/* Error Alert */}
                {errorMsg && (
                  <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
                  {/* Email Field */}
                  <div className="relative flex items-center bg-slate-100/80 hover:bg-slate-100 rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-primary-blue focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-blue/10 transition-all">
                    <Mail className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@kemnaker.go.id atau email penyedia"
                      required
                      className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none font-medium"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative flex items-center bg-slate-100/80 hover:bg-slate-100 rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-primary-blue focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-blue/10 transition-all">
                    <Lock className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      required
                      className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none ml-2"
                      title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-navy via-[#113264] to-primary-navy hover:bg-[#071F36] text-white text-sm font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 mt-6 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Gavel className="w-4 h-4 text-accent-gold" />
                        <span>Masuk ke Portal Clearing House</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Note */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400">
                    Layanan terenkripsi khusus Pejabat Pengadaan (PPK/Pokja/PA) dan Penyedia Terdaftar UKPBJ Kemnaker.
                  </p>
                </div>

              </div>
            </FadeIn>
          ) : (
            /* ================= AUTHENTICATED DASHBOARD VIEW ================= */
            <FadeIn direction="up">
              <div className="space-y-6">
                
                {/* User Info Bar */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-navy to-[#113264] text-accent-gold flex items-center justify-center font-bold text-xl shadow-md">
                      <Gavel className="w-7 h-7 text-accent-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-primary-navy">
                          Dashboard Layanan Clearing House
                        </h2>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Akun Terverifikasi
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Login sebagai: <strong className="text-slate-800">{email}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors"
                    >
                      <Plus className="w-4 h-4 text-accent-gold" />
                      <span>Ajukan Kasus / Konsultasi Baru</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold rounded-2xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-navy flex items-center justify-center font-bold">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Total Tiket Masuk</span>
                      <div className="text-lg font-extrabold text-slate-900">{tickets.length} Berkas Permohonan</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Dalam Proses Mediasi</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        {tickets.filter(t => t.status === 'Dalam Telaah Hukum' || t.status === 'Jadwal Mediasi Ditetapkan').length} Kasus Aktif
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Rekomendasi / Selesai</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        {tickets.filter(t => t.status === 'Rekomendasi Terbit' || t.status === 'Selesai').length} Sengketa Tuntas
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket List */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-primary-navy">
                        Daftar Permohonan Konsultasi & Mediasi PBJ
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Klik pada kartu tiket untuk melihat telaah hukum, mediator, dan dokumen rekomendasi
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                              {ticket.ticketNo}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              Pemohon: <strong className="text-primary-navy">{ticket.applicantRole}</strong> • {ticket.date}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug">
                            {ticket.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                            {ticket.summary}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            ticket.status === 'Rekomendasi Terbit' || ticket.status === 'Selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ticket.status === 'Jadwal Mediasi Ditetapkan'
                              ? 'bg-blue-100 text-primary-navy'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ticket.status}
                          </span>

                          <span className="text-xs font-bold text-primary-navy group-hover:text-primary-blue flex items-center gap-1">
                            <span>Detail Telaah</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Note on Clearing House */}
                <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 flex items-start gap-3 text-xs text-slate-600">
                  <HelpCircle className="w-5 h-5 text-primary-navy flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Tentang Clearing House Pengadaan:</strong> Clearing House merupakan instrumen formal pendampingan hukum dan mediasi independen yang dibentuk oleh UKPBJ Kemnaker bersama APIP (Inspektorat Jenderal) dan Biro Hukum untuk memberikan kepastian hukum dan menyelesaikan potensi sengketa kontrak PBJ secara musyawarah dan objektif.
                  </p>
                </div>

              </div>
            </FadeIn>
          )}

        </div>

        {/* MODAL PENGAJUAN TIKET BARU */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200"
              >
                <div className="p-6 bg-gradient-to-r from-primary-navy to-[#113264] text-white relative">
                  <h3 className="text-lg font-bold">Formulir Permohonan Clearing House PBJ</h3>
                  <p className="text-xs text-slate-300 mt-1">Konsultasi regulasi, telaah hukum kontrak, atau permohonan mediasi sengketa.</p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {formSuccess ? (
                  <div className="p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-800">Permohonan Berhasil Dikirim</h4>
                    <p className="text-xs text-slate-500 mt-1">Tim Clearing House akan menelaah berkas Anda dalam 1-2 hari kerja.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateTicket} className="p-6 space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Peran Pemohon</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as 'PPK' | 'Pokja Pemilihan' | 'Penyedia / Pelaku Usaha' | 'PA / KPA')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                      >
                        <option value="PPK">Pejabat Pembuat Komitmen (PPK)</option>
                        <option value="Pokja Pemilihan">Pokja Pemilihan</option>
                        <option value="PA / KPA">Pengguna Anggaran / KPA</option>
                        <option value="Penyedia / Pelaku Usaha">Penyedia / Pelaku Usaha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Permasalahan</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                      >
                        <option value="Tata Kelola & Penyesuaian Kontrak">Tata Kelola & Penyesuaian Kontrak</option>
                        <option value="Penyelesaian Sengketa Kontrak">Penyelesaian Sengketa Kontrak</option>
                        <option value="Evaluasi Tender & Mitigasi Risiko">Evaluasi Tender & Mitigasi Risiko</option>
                        <option value="Keadaan Kahar & Denda Keterlambatan">Keadaan Kahar & Denda Keterlambatan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Pokok Masalah</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Konsultasi Adendum Waktu Pelaksanaan Pekerjaan..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Kronologi & Pokok Permohonan</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Jelaskan secara singkat latar belakang paket pengadaan dan hal-hal yang dimohonkan pendapat hukumnya..."
                        value={newSummary}
                        onChange={(e) => setNewSummary(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-primary-navy hover:bg-[#071F36] text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Kirim Permohonan
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL DETAIL TIKET */}
        <AnimatePresence>
          {selectedTicket && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200"
              >
                <div className="p-6 bg-gradient-to-r from-primary-navy to-[#113264] text-white relative">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    <Gavel className="w-4 h-4 text-amber-300" />
                    <span>{selectedTicket.ticketNo}</span>
                  </div>
                  <h3 className="text-lg font-bold pr-8 leading-snug">{selectedTicket.title}</h3>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Pemohon</span>
                      <strong className="text-slate-800">{selectedTicket.applicantRole}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Status Kasus</span>
                      <strong className="text-primary-navy">{selectedTicket.status}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">Kronologi & Substansi Masalah</span>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      {selectedTicket.summary}
                    </p>
                  </div>

                  {selectedTicket.recommendation && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Rekomendasi & Pendapat Hukum Clearing House:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {selectedTicket.recommendation}
                      </p>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500">
                    Tim Mediator/Penelaah: <strong>{selectedTicket.mediator}</strong>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="px-5 py-2 bg-primary-navy text-white text-xs font-bold rounded-xl"
                  >
                    Tutup
                  </button>
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
