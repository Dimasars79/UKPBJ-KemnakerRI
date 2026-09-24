import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProcurementVisualComposition } from './ProcurementVisualComposition';

export function HeroSection() {
  const { trans } = useLanguage();

  return (
    <section 
      className="relative bg-[#07172E] text-white flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 select-none"
      aria-label="Hero Section UKPBJ Pengadaan Barang dan Jasa"
    >
      {/* 1. FUTURISTIC BACKGROUND LIGHTING & CYBER GRID */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Ambient Lights - optimized for mobile GPU */}
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[650px] h-[300px] sm:h-[650px] bg-blue-600/15 rounded-full blur-[70px] sm:blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] bg-cyan-500/12 rounded-full blur-[70px] sm:blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[60px] sm:blur-[150px]" />

        {/* Minimalist Tech Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80e_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,#000_65%,transparent_100%)] opacity-60" />

        {/* Cyber Light Beam */}
        <div className="absolute bottom-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ================= LEFT COLUMN: HEADLINE & CTAS ================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left">
            
            {/* Header Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md mb-4 sm:mb-5 self-start shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
                {trans('UKPBJ Kementerian Ketenagakerjaan RI', 'UKPBJ Ministry of Manpower RI')}
              </span>
            </motion.div>

            {/* Main Bold Headline - Precision 2-Line Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-extrabold text-white tracking-tight mb-5 sm:mb-6">
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.95rem] leading-[1.2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:whitespace-nowrap">
                  {trans('Pengadaan Barang/Jasa', 'Goods & Services Procurement')}
                </span>
                <span className="block mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] xl:text-[2.5rem] leading-[1.25] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 drop-shadow-[0_4px_20px_rgba(251,191,36,0.35)] tracking-tight sm:whitespace-nowrap">
                  {trans('Kementerian Ketenagakerjaan RI', 'Ministry of Manpower RI')}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
                {trans(
                  'Mewujudkan tata kelola pengadaan barang dan jasa yang transparan, akuntabel, dan terintegrasi secara nasional.',
                  'Realizing transparent, accountable, and nationally integrated procurement governance.'
                )}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-4 sm:mb-6"
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
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE 3D VISUAL COMPOSITION (KOP SURAT, GEDUNG KONSTRUKSI, BOX) ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] w-full relative overflow-visible mt-6 lg:mt-0">
            <ProcurementVisualComposition />
          </div>

        </div>
      </div>
    </section>
  );
}
