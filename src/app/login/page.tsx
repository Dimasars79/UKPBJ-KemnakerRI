"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">
      {/* Left Panel - Branding & Welcome */}
      <div className="relative w-full md:w-1/2 lg:w-3/5 bg-primary-navy overflow-hidden flex flex-col justify-between p-8 md:p-16 lg:p-24 text-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-blue/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-gold/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[80px]" />
        </div>

        {/* Content Z-10 */}
        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-6 mb-12 bg-white/5 backdrop-blur-xl w-fit p-5 md:p-6 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative overflow-hidden group"
          >
            {/* Inner subtle glow for the glassmorphism box */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <Image src="/logo-kemnaker.png" alt="Logo Kemnaker" width={80} height={80} className="object-contain h-14 md:h-20 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <div className="h-16 md:h-20 border-l-2 border-white/20 rounded-full" />
            {/* mix-blend-screen removes the black background of the logo, leaving only the white text! */}
            <Image src="/logo.png" alt="Logo UKPBJ" width={220} height={80} className="object-contain h-14 md:h-20 w-auto mix-blend-screen drop-shadow-lg" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Selamat Datang di <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">
              Portal Terpadu UKPBJ
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-blue-100/80 max-w-xl leading-relaxed font-light"
          >
            Gerbang utama menuju ekosistem layanan pengadaan barang dan jasa Kementerian Ketenagakerjaan Republik Indonesia yang berintegritas, transparan, dan profesional.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10 mt-12 text-sm text-blue-200/60"
        >
          &copy; {new Date().getFullYear()} UKPBJ Kementerian Ketenagakerjaan RI. Hak Cipta Dilindungi.
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white flex flex-col justify-center p-8 md:p-12 lg:p-16 relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20">
        <Link href="/" className="absolute top-8 right-8 text-slate-400 hover:text-primary-navy flex items-center space-x-2 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali ke Beranda</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-navy mb-3">Masuk Akun</h2>
            <p className="text-slate-500">Silakan masukkan kredensial Anda untuk melanjutkan</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email / NIP</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-blue transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white transition-all outline-none"
                  placeholder="Masukkan email atau NIP"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Kata Sandi</label>
                <Link href="#" className="text-xs font-semibold text-primary-blue hover:text-accent-gold transition-colors">
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-blue transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue hover:from-primary-blue hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all duration-300 mt-8"
            >
              <span>Masuk Sekarang</span>
              <LogIn className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Belum memiliki akses?{' '}
              <Link href="/layanan" className="font-bold text-primary-blue hover:text-accent-gold transition-colors">
                Pelajari Layanan
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
