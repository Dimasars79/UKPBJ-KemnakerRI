"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ShieldCheck, 
  Award, Download, Search, CheckCircle2, 
  LogOut, ChevronRight, QrCode, ExternalLink
} from 'lucide-react';

export default function SertifikatPBJPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchCertQuery, setSearchCertQuery] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const userCertificates = [
    {
      id: 'CERT-001',
      nomor: 'LKPP/PBJ-DASAR/2024/09812',
      nama: 'Sertifikat Keahlian Pengadaan Barang/Jasa Tingkat Dasar',
      pemilik: email || 'Pegawai Kemnaker RI',
      instansi: 'Kementerian Ketenagakerjaan RI',
      tglLulus: '15 Maret 2024',
      masaBerlaku: 'Seumur Hidup',
      status: 'Terverifikasi LKPP',
      skor: '88 / 100',
    },
    {
      id: 'CERT-002',
      nomor: 'KEMNAKER/PPK-KOMPETEN/2025/00431',
      nama: 'Sertifikat Kompetensi Pejabat Pembuat Komitmen (PPK)',
      pemilik: email || 'Pegawai Kemnaker RI',
      instansi: 'Pusdiklat SDM Pengadaan Kemnaker',
      tglLulus: '20 Agustus 2025',
      masaBerlaku: '20 Agustus 2028',
      status: 'Aktif',
      skor: 'Sangat Memuaskan',
    }
  ];

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
            <span className="text-primary-navy font-bold">Akses Sertifikat PBJ</span>
          </div>

          {!isLoggedIn ? (
            /* ================= LOGIN FORM VIEW (Matching Screenshot) ================= */
            <FadeIn direction="up">
              <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100 p-8 sm:p-12 text-center relative overflow-hidden">
                
                {/* Decorative Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-navy via-primary-blue to-accent-gold" />

                {/* Header Text */}
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight mb-2">
                  Selamat Datang !
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed">
                  Untuk dapat mengakses anda harus login terlebih dahulu !
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
                      placeholder="you@kemnaker.go.id"
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
                    className="w-full bg-[#1e1b4b] hover:bg-primary-blue text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 mt-4 text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </form>

                {/* Footer Security Note */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sistem Autentikasi Terenkripsi Kemnaker RI</span>
                </div>
              </div>
            </FadeIn>
          ) : (
            /* ================= AUTHENTICATED CERTIFICATE DASHBOARD ================= */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* User Bar */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-navy to-primary-blue text-accent-gold flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-primary-navy">
                        Portal Sertifikat PBJ Resmi
                      </h2>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Akun Aktif</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Masuk sebagai: <strong className="text-slate-700">{email}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors border border-red-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Portal</span>
                  </button>
                </div>
              </div>

              {/* Search Cert Bar */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    value={searchCertQuery}
                    onChange={(e) => setSearchCertQuery(e.target.value)}
                    placeholder="Verifikasi nomor register sertifikat atau nama pemegang..."
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none font-medium"
                  />
                </div>
                <button className="bg-primary-navy hover:bg-primary-blue text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors">
                  Cari Sertifikat
                </button>
              </div>

              {/* Certificates List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider px-1">
                  Daftar Sertifikat Terdaftar ({userCertificates.length})
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {userCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-700 mt-1">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {cert.nomor}
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                              ✓ {cert.status}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-primary-navy mb-1">
                            {cert.nama}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Penerbit:</span>
                              <strong>{cert.instansi}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Tanggal Terbit:</span>
                              <strong>{cert.tglLulus}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Masa Berlaku:</span>
                              <strong className="text-emerald-700">{cert.masaBerlaku}</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <button className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all">
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh e-Sertifikat</span>
                        </button>
                        <button className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
                          <QrCode className="w-3.5 h-3.5 text-slate-500" />
                          <span>Cek Barcode</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LKPP Portal Integration Note */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue text-white flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-primary-navy">Verifikasi Nasional LKPP</h5>
                    <p className="text-[11px] text-slate-600">Sertifikat terdaftar otomatis di database Pusat Pengembangan Kompetensi LKPP RI.</p>
                  </div>
                </div>
                <a
                  href="https://ppk.lkpp.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-primary-navy whitespace-nowrap bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-2xs hover:shadow-xs transition-all"
                >
                  <span>Portal PPK LKPP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
