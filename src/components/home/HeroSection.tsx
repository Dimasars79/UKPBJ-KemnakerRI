"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BarChart3, Scan, 
  Sparkles, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const { trans } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const visualItems = [
    {
      id: 'box',
      title: trans('Box Kardus Pengadaan Modern', 'Modern Procurement Box'),
      subtitle: trans('Paket Pengadaan Barang & E-Katalog Nasional', 'National Goods Procurement & E-Catalog Package'),
      badge: 'SPSE 4.5 VERIFIED',
      subBadge: 'E-KATALOG LKPP',
      image: '/hero/procurement-box-3d.jpg',
      angle: 0,
      glow: 'from-amber-500/20 via-cyan-500/20 to-blue-500/20',
      border: 'border-amber-400/40'
    },
    {
      id: 'gedung',
      title: trans('Gedung Markas Kemnaker RI 🇮🇩', 'MoM RI Headquarters Building 🇮🇩'),
      subtitle: trans('Pusat Layanan PBJ & Ketenagakerjaan', 'Integrated PBJ & Manpower Center'),
      badge: 'KEMNAKER RI 🇮🇩',
      subBadge: 'MARKAS PUSAT',
      image: '/hero/kemnaker-building-3d.jpg',
      angle: 120,
      glow: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
      border: 'border-cyan-400/40'
    },
    {
      id: 'dokumen',
      title: trans('Naskah & Berkas Tender Digital', 'Digital Tender Files & Dossier'),
      subtitle: trans('Dokumen Pengadaan & Arsip SiRUP', 'Procurement Dossier & SiRUP Archive'),
      badge: 'DOKUMEN TERVERIFIKASI',
      subBadge: '100% AKUNTABEL',
      image: '/hero/procurement-folder-3d.jpg',
      angle: 240,
      glow: 'from-emerald-500/20 via-teal-500/20 to-blue-500/20',
      border: 'border-emerald-400/40'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/monitoring?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/monitoring');
    }
  };

  return (
    <section 
      className="relative min-h-[90vh] lg:min-h-screen bg-[#07172E] text-white flex items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20 select-none"
      aria-label="Hero Section UKPBJ Pengadaan Barang dan Jasa"
    >
      {/* 1. CLEAN SLEEK DARK NAVY STAGE BACKGROUND (POLOS DENGAN SOFT LIGHTING) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />

        {/* Minimalist Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80c_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80c_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,#000_65%,transparent_100%)] opacity-50" />

        {/* Cyber Light Beam */}
        <div className="absolute bottom-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: HEADLINE, SEARCH & CTAS ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Header Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md mb-6 self-start shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
                {trans('UKPBJ KEMENTERIAN KETENAGAKERJAAN RI', 'UKPBJ MINISTRY OF MANPOWER RI')}
              </span>
            </motion.div>

            {/* Main Bold Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                {trans('Pengadaan Barang/Jasa', 'Goods & Services Procurement')}{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-sm">
                  {trans('untuk Indonesia Maju', 'for Advanced Indonesia')}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg font-normal">
                {trans(
                  'Mewujudkan pengadaan yang transparan, akuntabel, profesional dan berintegritas tinggi dengan integrasi SPSE 4.5 & E-Katalog Nasional LKPP.',
                  'Realizing transparent, accountable, professional, and high-integrity procurement integrated with SPSE 4.5 & National E-Catalog.'
                )}
              </p>
            </motion.div>

            {/* Tracking Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-xl mb-6"
            >
              <form 
                onSubmit={handleSearchSubmit}
                className="relative flex items-center rounded-full bg-slate-900/80 border border-white/20 p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl focus-within:border-cyan-400/80 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={trans('Contoh: PBJ-20260906-001', 'Example: PBJ-20260906-001')}
                  className="w-full bg-transparent px-4 sm:px-5 py-2 text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  type="submit"
                  className="shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-102 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{trans('Lacak Sekarang', 'Track Now')}</span>
                </button>
              </form>

              <p className="text-[11px] sm:text-xs text-slate-400 mt-2 pl-4 flex items-center gap-1.5">
                <span className="text-slate-300 font-bold">ⓘ</span>
                <span>
                  {trans(
                    'Format: [KODE-JENIS]-YYYYMMDD-XXX atau Nama Paket Tender',
                    'Format: [TYPE-CODE]-YYYYMMDD-XXX or Tender Package Name'
                  )}
                </span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8"
            >
              <Link
                href="/layanan"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-102 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>{trans('Jelajahi Pengadaan', 'Explore Procurement')}</span>
              </Link>

              <Link
                href="/monitoring"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white bg-white/5 hover:bg-white/15 border border-white/20 backdrop-blur-md hover:border-cyan-400/50 hover:scale-102 transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 text-cyan-300" />
                <span>{trans('Monitoring & Realisasi', 'Monitoring & Realization')}</span>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10"
            >
              <div>
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">100%</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{trans('Digital SPSE', 'Digital SPSE')}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">Rp 12.4M</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{trans('Efisiensi Anggaran', 'Budget Efficiency')}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">95%</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{trans('Tepat Waktu', 'On-Time Delivery')}</p>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN: PURE AUTOMATED 3D REVOLVING ORBIT (NO BUTTONS) ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] relative overflow-visible">
            
            {/* 3D Perspective Stage */}
            <div className="relative w-full max-w-[500px] h-[460px] sm:h-[500px] flex items-center justify-center [perspective:1400px]">
              
              {/* Glowing Neon Circular Base Ring on the Floor */}
              <div className="absolute bottom-6 sm:bottom-10 w-72 sm:w-96 h-28 sm:h-36 rounded-[100%] border-2 border-cyan-400/40 bg-gradient-to-t from-cyan-500/15 via-blue-500/10 to-transparent shadow-[0_0_50px_rgba(34,211,238,0.3)] [transform:rotateX(75deg)] pointer-events-none" />
              <div className="absolute bottom-10 sm:bottom-14 w-48 sm:w-64 h-20 sm:h-24 rounded-[100%] border border-amber-400/40 bg-amber-400/10 shadow-[0_0_30px_rgba(251,191,36,0.3)] [transform:rotateX(75deg)] pointer-events-none animate-pulse" />

              {/* Master 3D Carousel Cylinder (Continuously Revolving 360 Degrees) */}
              <motion.div
                animate={{ rotateY: [0, -360] }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "linear",
                }}
                className="relative w-60 sm:w-72 md:w-80 h-72 sm:h-88 md:h-96 [transform-style:preserve-3d] flex items-center justify-center"
              >
                {visualItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      transform: `rotateY(${item.angle}deg) translateZ(230px)`,
                    }}
                    className="absolute inset-0 [transform-style:preserve-3d] [backface-visibility:visible]"
                  >
                    {/* Visual Card Container */}
                    <div className={`relative w-full h-full rounded-3xl overflow-hidden border-2 ${item.border} shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-slate-950/90 backdrop-blur-md`}>
                      
                      {/* Ambient Glowing Background */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${item.glow} rounded-3xl blur-xl pointer-events-none`} />

                      {/* Image Asset */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority
                        className="object-cover object-center scale-105"
                      />

                      {/* Scanning Laser Beam (on Box) */}
                      {item.id === 'box' && (
                        <motion.div
                          animate={{ y: ['-100%', '300%'] }}
                          transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                          className="absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent border-b border-cyan-400 pointer-events-none"
                        />
                      )}

                      {/* Top Status Header */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 shadow-md">
                          <Scan className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                          <span>{item.badge}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-bold text-emerald-300 backdrop-blur-md shadow-md">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{item.subBadge}</span>
                        </span>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/20 text-left pointer-events-none shadow-xl">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-xs font-extrabold text-white flex items-center gap-1.5 truncate">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-300 line-clamp-1">
                          {item.subtitle}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
