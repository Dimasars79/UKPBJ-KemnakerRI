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
      className="relative bg-[#07172E] text-white flex items-center overflow-hidden pt-3 pb-12 sm:pt-4 sm:pb-16 lg:pt-6 lg:pb-20 select-none"
      aria-label="Hero Section UKPBJ Pengadaan Barang dan Jasa"
    >
      {/* 1. FUTURISTIC BACKGROUND LIGHTING & CYBER GRID */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />

        {/* Minimalist Tech Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80e_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,#000_65%,transparent_100%)] opacity-60" />

        {/* Cyber Light Beam */}
        <div className="absolute bottom-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: HEADLINE & CTAS ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Header Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md mb-4 sm:mb-5 self-start shadow-sm"
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] font-extrabold text-white tracking-normal leading-[1.3] sm:leading-[1.24] mb-4 sm:mb-5">
                {trans('Pengadaan Barang/Jasa', 'Goods & Services Procurement')}{' '}
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-sm whitespace-nowrap">
                  {trans('untuk Indonesia Maju', 'for Advanced Indonesia')}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal">
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

          {/* ================= RIGHT COLUMN: INTERACTIVE 3D COMPOSITION STAGE ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] w-full relative overflow-visible mt-4 lg:mt-0">
            <ProcurementVisualComposition />
          </div>

        </div>
      </div>
    </section>
  );
}
