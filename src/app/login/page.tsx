"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, LogIn, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // 1. Otentikasi Kredensial via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error || !data.user) {
        setErrorMsg(
          error?.message === 'Invalid login credentials'
            ? 'Kombinasi email dan kata sandi tidak sesuai. Pastikan akun Anda telah terdaftar sebagai pengelola layanan.'
            : (error?.message || 'Gagal melakukan autentikasi dengan server.')
        );
        setIsLoading(false);
        return;
      }

      // 2. Verifikasi Hak Akses pada Tabel public.admin_users
      const { data: adminProfile, error: profileErr } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileErr && profileErr.code !== 'PGRST116') {
        console.warn('Gagal membaca profil admin:', profileErr);
      }

      if (adminProfile) {
        // Cek status keaktifan akun
        if (adminProfile.status === 'nonaktif') {
          await supabase.auth.signOut();
          setErrorMsg('Akses ditolak: Akun admin Anda sedang dinonaktifkan.');
          setIsLoading(false);
          return;
        }

        // Perbarui timestamp last_login di database
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);

        // Simpan sesi profil aktif ke localStorage untuk kelancaran UI CMS
        if (typeof window !== 'undefined') {
          localStorage.setItem('ukpbj_admin_profile', JSON.stringify(adminProfile));
        }
      } else {
        // Jika tabel admin_users belum memiliki baris untuk user ini,
        // buat profil default otomatis agar admin yang dibuat di dashboard Supabase langsung aktif
        const defaultProfile = {
          id: data.user.id,
          nip: 'NIP-' + data.user.id.slice(0, 8).toUpperCase(),
          nama_lengkap: data.user.email?.split('@')[0].toUpperCase() || 'ADMINISTRATOR',
          email: data.user.email || email.trim(),
          unit_kerja: 'Biro UKPBJ Kemnaker RI',
          jabatan: 'Administrator Portal',
          role: 'admin',
          status: 'aktif',
          last_login: new Date().toISOString()
        };

        const { error: insertErr } = await supabase
          .from('admin_users')
          .insert(defaultProfile);

        if (!insertErr && typeof window !== 'undefined') {
          localStorage.setItem('ukpbj_admin_profile', JSON.stringify(defaultProfile));
        }
      }

      setSuccessMsg('Autentikasi berhasil! Mengarahkan ke Portal Admin...');
      setTimeout(() => {
        router.push('/admin');
      }, 500);

    } catch (err: unknown) {
      console.error('Error saat login:', err);
      setErrorMsg('Terjadi kendala saat menghubungkan ke server sistem. Silakan coba kembali.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#051323] relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 lg:p-12 overflow-x-hidden">
      {/* Background Decorative Ambient Canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] bg-accent-gold/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* Top Navigation Bar Above Card (Mobile Only: md:hidden) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-5xl mb-3 flex items-center justify-start z-30 px-1 md:hidden"
      >
        <Link 
          href="/" 
          className="group inline-flex items-center space-x-2.5 px-3.5 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/95 border border-slate-700/70 hover:border-slate-500/80 text-slate-300 hover:text-white transition-all duration-200 text-xs font-semibold backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-accent-gold group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Kembali ke Beranda</span>
        </Link>
      </motion.div>

      {/* CENTERED FLOATING BENTO BOX CARD WITH SMOOTH LEFT-TO-RIGHT SWIPE ANIMATION */}
      <div className="w-full max-w-5xl relative z-10 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, x: -90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] border border-slate-700/60 flex flex-col md:flex-row bg-[#081E36] relative overflow-hidden"
        >
          {/* Global Light Sheen Sweep Effect from Left to Right */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '250%', opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.25 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-30 transform -skew-x-12"
          />

          {/* Left Side: Branding & Welcome (Left Panel Swipe In) */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full md:w-1/2 lg:w-7/12 bg-gradient-to-br from-[#06182B] via-[#0A223D] to-[#041220] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 text-white border-b md:border-b-0 md:border-r border-slate-800/90 shadow-[inset_-10px_0_20px_-10px_rgba(0,0,0,0.5)]"
          >
            {/* Internal ambient highlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Emblem Logo with Left Swipe */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 mb-8 sm:mb-12"
            >
              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl w-fit p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-lg">
                <Image 
                  src="/logo-kemnaker.png" 
                  alt="Logo Kemnaker" 
                  width={50} 
                  height={50} 
                  className="object-contain h-10 sm:h-12 w-auto brightness-0 invert drop-shadow-md" 
                />
                <div className="h-8 sm:h-10 border-l border-white/20" />
                <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 overflow-visible">
                  <Image 
                    src="/logo.png" 
                    alt="Logo UKPBJ" 
                    width={80} 
                    height={80} 
                    className="object-contain scale-[1.45] w-full h-full drop-shadow-md" 
                  />
                </div>
              </div>
            </motion.div>

            {/* Center Main Text with Left Swipe */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="relative z-10 flex-grow flex flex-col justify-center my-4 sm:my-6"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black leading-tight tracking-tight mb-4">
                Selamat Datang di <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-amber-200 to-yellow-400">
                  Portal Terpadu UKPBJ
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed font-normal max-w-lg">
                Gerbang utama menuju ekosistem layanan pengadaan barang dan jasa Kementerian Ketenagakerjaan Republik Indonesia yang berintegritas, transparan, dan profesional.
              </p>
            </motion.div>

            {/* Bottom Copyright */}
            <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-white/10 text-[11px] text-blue-200/50">
              &copy; {new Date().getFullYear()} UKPBJ Kementerian Ketenagakerjaan RI. Hak Cipta Dilindungi.
            </div>
          </motion.div>

          {/* Right Side: Clean Login Form (Right Panel Swipe In) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-1/2 lg:w-5/12 bg-white flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 relative z-20 shadow-[inset_15px_0_25px_-12px_rgba(0,0,0,0.18)]"
          >
            <div className="w-full max-w-md mx-auto">
            
            {/* Form Header with Staggered Left Swipe */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                Masuk Akun Admin
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Sistem Autentikasi Pengelola Layanan Terintegrasi
              </p>
            </motion.div>

            {/* Notification Alerts (Ultra Compact & Minimalist) */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  className="mb-3 py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-md bg-rose-50/90 border border-rose-200/70 text-rose-800 text-[10px] sm:text-[11px] flex items-start gap-1.5 sm:gap-2 shadow-xs"
                >
                  <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-bold text-[9.5px] sm:text-[10.5px] leading-tight">Gagal Masuk</p>
                    <p className="mt-0.5 text-[9px] sm:text-[10px] leading-tight text-rose-700">{errorMsg}</p>
                  </div>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  className="mb-3 py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-md bg-emerald-50/90 border border-emerald-200/70 text-emerald-800 text-[10px] sm:text-[11px] flex items-start gap-1.5 sm:gap-2 shadow-xs"
                >
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-bold text-[9.5px] sm:text-[10.5px] leading-tight">Berhasil</p>
                    <p className="mt-0.5 text-[9px] sm:text-[10px] leading-tight text-emerald-700">{successMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Fields with Staggered Left Swipe */}
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              
              {/* Field 1: Email / Username */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-bold text-slate-800 ml-0.5">
                  Email / Username Akun *
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/90 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all outline-none"
                    placeholder="admin@kemnaker.go.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Field 2: Password */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-center ml-0.5">
                  <label className="text-xs font-bold text-slate-800">
                    Kata Sandi *
                  </label>
                  <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Lupa Sandi?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/90 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-[#0B2341] to-[#123868] hover:from-[#123868] hover:to-[#1E4D8C] text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl shadow-md shadow-blue-950/20 hover:shadow-lg hover:shadow-blue-950/30 hover:-translate-y-0.5 transition-all duration-200 mt-5 disabled:opacity-70 cursor-pointer text-xs sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-accent-gold" />
                    <span>Memverifikasi Sesi Supabase...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Admin Portal</span>
                    <LogIn className="w-4 h-4 ml-1" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Bottom Helpdesk Hint & Desktop Back to Home */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="mt-6 sm:mt-8 text-center space-y-3"
            >
              <p className="text-xs text-slate-500">
                Butuh bantuan akses atau reset akun?{' '}
                <Link href="/layanan" className="font-bold text-[#0B2341] hover:text-blue-600 transition-colors">
                  Hubungi Helpdesk PBJ
                </Link>
              </p>

              {/* Desktop / Laptop "Kembali ke Beranda" Link */}
              <div className="hidden md:flex items-center justify-center pt-1">
                <Link 
                  href="/" 
                  className="group inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-[#0B2341] transition-colors py-1 px-3 rounded-lg hover:bg-slate-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B2341] group-hover:-translate-x-0.5 transition-all" />
                  <span>Kembali ke Beranda</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
  );
}

