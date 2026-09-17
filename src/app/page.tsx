"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, ArrowRight, ShieldCheck, ChevronDown, Quote, ShoppingCart, 
  BookOpen, Scale, Clock, TrendingDown, TrendingUp, Award, ThumbsUp, 
  Calendar, Globe, FileText
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { PengadaanSection } from '@/components/home/PengadaanSection';
import { BeritaSection } from '@/components/home/BeritaSection';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { useData } from '@/contexts/DataContext';

// Helper function to parse agenda dates accurately for chronological sorting
const parseAgendaDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const cleaned = dateStr.trim();

  // 1. ISO format "YYYY-MM-DD"
  if (/^\d{4}-\d{1,2}-\d{1,2}/.test(cleaned)) {
    const parts = cleaned.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  // 2. Format "DD/MM/YYYY" or "DD-MM-YYYY"
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(cleaned)) {
    const parts = cleaned.split(/[\/\-]/);
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }

  // 3. Textual Indonesian & English format e.g. "15 Sep 2026", "02 Oktober 2026"
  const monthMap: Record<string, number> = {
    jan: 0, januari: 0, january: 0,
    feb: 1, februari: 1, february: 1,
    mar: 2, maret: 2, march: 2,
    apr: 3, april: 3,
    mei: 4, may: 4,
    jun: 5, juni: 5, june: 5,
    jul: 6, juli: 6, july: 6,
    agu: 7, ags: 7, agustus: 7, aug: 7, august: 7,
    sep: 8, september: 8,
    okt: 9, oktober: 9, oct: 9, october: 9,
    nov: 10, november: 10,
    des: 11, desember: 11, dec: 11, december: 11
  };

  const tokens = cleaned.split(/\s+/);
  if (tokens.length >= 3) {
    const day = parseInt(tokens[0], 10);
    const monthKey = tokens[1].toLowerCase().replace(/[^a-z]/g, '');
    const month = monthMap[monthKey] !== undefined ? monthMap[monthKey] : -1;
    const year = parseInt(tokens[2], 10);

    if (!isNaN(day) && month !== -1 && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  const parsed = new Date(cleaned);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export default function Home() {
  const { t } = useLanguage();
  const { agendaList } = useData();

  // Dynamically sort and find the closest upcoming agenda (Jadwal Terdekat)
  const sortedUpcomingAgendas = React.useMemo(() => {
    const activeAgendas = agendaList.filter(
      (a) => a.status !== 'Dibatalkan'
    );

    const listToProcess = activeAgendas.length > 0 ? activeAgendas : agendaList;

    const withParsed = listToProcess.map((item) => {
      const d = parseAgendaDate(item.date);
      return {
        ...item,
        parsedTime: d ? d.getTime() : Number.MAX_SAFE_INTEGER
      };
    });

    // Sort ascending chronologically (closest upcoming date first)
    return withParsed.sort((a, b) => a.parsedTime - b.parsedTime);
  }, [agendaList]);

  // Pick the closest upcoming active agenda
  const latestAgenda = sortedUpcomingAgendas[0] || null;
  const nextAgendas = sortedUpcomingAgendas.slice(1, 3);

  return (
    <>
      <Header />
      
      <main className="flex-grow overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative text-white overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero-bg.png" 
              alt="Gedung Kementerian Ketenagakerjaan" 
              fill
              className="object-cover object-[75%_center] md:object-center animate-slow-zoom"
              priority
            />
          </div>
          {/* Gradient Overlay for better readability on left side across mobile and desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342] via-[#0a2342]/90 to-[#0a2342]/70 sm:bg-gradient-to-r sm:from-[#0a2342] sm:via-[#0a2342]/85 sm:to-transparent z-0" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-20 sm:py-24 lg:py-32">
            <div className="max-w-4xl">
              <FadeIn direction="left" delay={0.1}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 text-white">
                  UKPBJ
                </h1>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white leading-tight">
                  {t('home.hero_title')}
                </h2>
                {t('home.hero_subtitle') ? (
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#f2b33a] mb-4 sm:mb-6">
                    {t('home.hero_subtitle')}
                  </h3>
                ) : null}
              </FadeIn>
              
              <FadeIn direction="left" delay={0.3}>
                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                  {t('home.hero_desc')}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link 
                    href="/layanan" 
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-blue to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-blue-900/30 hover:scale-102 transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>{t('home.btn_services')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/monitoring" 
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl backdrop-blur-md hover:scale-102 transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>{t('home.btn_monitoring')}</span>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Floating Core Values & Navy CTA Banner (Matches design screenshot) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-14 sm:-mt-16 lg:-mt-20 mb-8">
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(10,35,66,0.12)] border border-slate-100 p-3 sm:p-4 lg:p-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-0 items-stretch">
                
                {/* 1. Transparan */}
                <Link 
                  href="/informasi/pemilu" 
                  className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between group hover:bg-slate-50/80 rounded-2xl transition-all duration-300 border border-slate-100 lg:border-0 lg:border-r lg:border-slate-100 bg-slate-50/30 lg:bg-transparent"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">Transparan</h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">Informasi terbuka dan dapat diakses oleh semua.</p>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>

                {/* 2. Profesional */}
                <Link 
                  href="/tentang" 
                  className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between group hover:bg-slate-50/80 rounded-2xl transition-all duration-300 border border-slate-100 lg:border-0 lg:border-r lg:border-slate-100 bg-slate-50/30 lg:bg-transparent"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">Profesional</h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">Dikelola oleh SDM yang kompeten dan berdedikasi.</p>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>

                {/* 3. Akuntabel */}
                <Link 
                  href="/monitoring" 
                  className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between group hover:bg-slate-50/80 rounded-2xl transition-all duration-300 border border-slate-100 lg:border-0 lg:border-r lg:border-slate-100 bg-slate-50/30 lg:bg-transparent"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">Akuntabel</h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">Setiap proses dapat dipertanggungjawabkan.</p>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>

                {/* 4. Berintegritas */}
                <Link 
                  href="/tentang#visi-misi" 
                  className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between group hover:bg-slate-50/80 rounded-2xl transition-all duration-300 border border-slate-100 lg:border-0 lg:border-r lg:border-slate-100 bg-slate-50/30 lg:bg-transparent"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">Berintegritas</h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">Menjunjung tinggi nilai etika, moralitas, dan keadilan.</p>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>

                {/* 5. Navy CTA Card (Full width on mobile 2-col layout) */}
                <Link 
                  href="/layanan" 
                  className="col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1E3D] via-[#091833] to-[#040C1A] p-4 lg:p-5 text-white flex flex-col justify-between shadow-lg group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                >
                  {/* Subtle Grid / Glow */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-blue/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-10 h-0.5 bg-accent-gold rounded-full mb-2 sm:mb-3" />
                    <p className="font-bold text-xs sm:text-sm text-white leading-snug">
                      Dukung Pengadaan yang Lebih Baik untuk Ketenagakerjaan Indonesia
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-bold text-accent-gold group-hover:underline flex items-center gap-1">
                      <span>Jelajahi Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-accent-gold group-hover:text-accent-gold transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </FadeIn>
        </section>

        {/* 2. Profil UKPBJ (Prioritized) */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white" id="profil">
          {/* Subtle Polkadot Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
          
          {/* Giant Blur Orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-blue/10 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <FadeIn direction="right" className="lg:w-1/3 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-3xl group-hover:bg-accent-gold/40 transition-colors duration-700 pointer-events-none animate-pulse" />
                  <Image src="/logo-ukpbj-kemnaker.png" alt="Logo UKPBJ" width={400} height={145} className="w-64 md:w-80 h-auto object-contain drop-shadow-[0_20px_50px_rgba(10,35,66,0.15)] group-hover:scale-105 transition-transform duration-700 relative z-10" />
                </div>
              </FadeIn>
              
              <div className="lg:w-2/3">
                <FadeIn direction="left">
                  <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary-navy">{t('home.about_title')}</h2>
                  <div className="w-16 h-1 bg-accent-gold mb-8 rounded-full" />
                  
                  <div className="relative p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                    <Quote className="absolute top-6 left-6 w-16 h-16 text-accent-gold/10 transform -scale-x-100 group-hover:scale-110 group-hover:-scale-x-110 transition-transform duration-500" />
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium relative z-10 pl-4 md:pl-8 border-l-4 border-accent-gold/50">
                      &quot;Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Ketenagakerjaan merupakan <span className="text-primary-blue font-bold">pusat keunggulan</span> pengadaan barang/jasa pemerintah yang berkomitmen untuk mewujudkan proses pengadaan yang berkualitas dan berintegritas.&quot;
                    </p>
                  </div>
                </FadeIn>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <StaggerItem>
                    <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 group-hover:bg-primary-blue flex items-center justify-center mb-5 transition-colors duration-300">
                        <ShoppingCart className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Eksekusi Pengadaan</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Menyelenggarakan proses tender dan pemilihan penyedia yang tangkas dan adil.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 group-hover:bg-primary-blue flex items-center justify-center mb-5 transition-colors duration-300">
                        <BookOpen className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Pembinaan SDM</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Meningkatkan kapasitas dan keahlian Pejabat Pembuat Komitmen (PPK) secara berkelanjutan.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 group-hover:bg-primary-blue flex items-center justify-center mb-5 transition-colors duration-300">
                        <Scale className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Advokasi & Konsultasi</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Memberikan pendampingan hukum dan solusi penyelesaian sengketa pengadaan.</p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Performance Dashboard (ZEBRA STRIPING: DARK MODE) */}
        <section className="py-14 sm:py-24 relative overflow-hidden bg-[#0a2342] border-y border-white/10" id="kinerja">
          {/* Subtle overlay grid for dark mode */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none" />
          
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
              <FadeIn direction="left" className="mb-2 md:mb-0">
                <div className="inline-block relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 relative z-10">
                    {t('home.dashboard_title')}
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent-gold rounded-full" />
                </div>
                <p className="text-slate-300 max-w-2xl mt-4 sm:mt-6 text-xs sm:text-base leading-relaxed">
                  Indikator Kinerja Pengadaan Barang/Jasa UKPBJ Kementerian Ketenagakerjaan
                </p>
              </FadeIn>
              
              {/* Year Dropdown */}
              <FadeIn direction="right">
                <div className="relative group self-start md:self-auto">
                  <select className="appearance-none bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-xs sm:text-base rounded-full px-4 sm:px-6 py-2 sm:py-2.5 pr-9 sm:pr-12 focus:outline-none focus:border-accent-gold/40 focus:ring-2 focus:ring-accent-gold/20 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-sm">
                    <option value="2026" className="text-primary-navy">Tahun 2026</option>
                    <option value="2025" className="text-primary-navy">Tahun 2025</option>
                    <option value="2024" className="text-primary-navy">Tahun 2024</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white pointer-events-none group-hover:text-accent-gold transition-colors" />
                </div>
              </FadeIn>
            </div>
            
            {/* 4 Stat Cards - 2x2 Matrix on Mobile, 4 Cols on Desktop */}
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-8 sm:mb-12">
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-accent-gold/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-accent-gold/20 transition-colors">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-accent-gold" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">Waktu</h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-accent-gold transition-colors">95%</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">Ketepatan waktu proses</p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-green-400/50 hover:shadow-[0_8px_30px_rgba(74,222,128,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-green-400/20 transition-colors">
                    <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">Efisiensi</h4>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-green-400 transition-colors">Rp 12.4M</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">Penghematan anggaran</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-[0_8px_30px_rgba(192,132,252,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-purple-400/20 transition-colors">
                    <Award className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">Kualitas</h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-purple-400 transition-colors">A+</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">Indeks tata kelola</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-pink-400/50 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-pink-400/20 transition-colors">
                    <ThumbsUp className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">Layanan</h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-pink-400 transition-colors">98%</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">Kepuasan pengguna</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Performance & Efficiency Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <FadeIn direction="up" delay={0.2}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span>Realisasi Paket Selesai</span>
                    </h4>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/10">Tahun 2026</span>
                  </div>
                  <PerformanceChart />
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span>Efisiensi Anggaran PBJ</span>
                    </h4>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/10">Kuartal</span>
                  </div>
                  <EfficiencyChart />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. Menu Pengadaan Barang & Jasa */}
        <PengadaanSection />

        {/* 4. Berita & Pengumuman Carousel */}
        <BeritaSection />

        {/* 5. Agenda & Poster Kegiatan */}
        <section className="py-14 sm:py-20 bg-primary-navy text-white relative overflow-hidden" id="agenda">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <FadeIn direction="right">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-accent-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t('home.agenda_title')}</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-6 leading-tight">
                  {latestAgenda ? latestAgenda.title : t('home.agenda_subtitle')}
                </h2>
                <p className="text-sm sm:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                  {t('home.agenda_desc')}
                </p>

                {/* 2 Quick Info Cards side by side or responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-accent-gold flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">{latestAgenda ? latestAgenda.date : 'Sabtu, 26 Oktober 2026'}</h4>
                      <p className="text-[11px] text-slate-300 truncate">{latestAgenda ? latestAgenda.time : '08:30 - 16:30 WIB'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-accent-gold flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">{latestAgenda ? latestAgenda.location : 'Auditorium Utama'}</h4>
                      <p className="text-[11px] text-slate-300 truncate">{latestAgenda ? latestAgenda.organizer : 'Gedung LKPP / Kemnaker'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link href="/agenda" className="w-full sm:w-auto inline-flex justify-center items-center bg-accent-gold hover:bg-yellow-500 text-primary-navy font-bold py-3 px-6 sm:px-8 rounded-xl transition-all shadow-lg hover:scale-102 text-xs sm:text-sm">
                    <span>{t('home.agenda_btn')}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                {nextAgendas && nextAgendas.length > 0 && (
                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                    <p className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold mb-2.5 sm:mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                      Jadwal Kegiatan Berikutnya:
                    </p>
                    <div className="flex flex-col gap-2">
                      {nextAgendas.map((nextAg) => (
                        <Link
                          key={nextAg.id}
                          href="/agenda"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs group"
                        >
                          <span className="font-semibold text-slate-200 group-hover:text-accent-gold transition-colors truncate max-w-[200px] sm:max-w-xs">
                            {nextAg.title}
                          </span>
                          <span className="text-[11px] text-accent-gold shrink-0 font-bold ml-2">
                            {nextAg.date} &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>

              <FadeIn direction="left" delay={0.2} className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group max-w-lg mx-auto w-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
                {/* Background ambient lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/15 via-primary-blue/20 to-cyan-500/10 opacity-70 pointer-events-none" />

                <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/60 border border-white/10">
                  <Image 
                    src={latestAgenda?.imageUrl || "/poster_kegiatan.jpg"} 
                    alt={latestAgenda?.title || "Poster Kegiatan Pengadaan Barang dan Jasa Kemnaker"} 
                    width={800} 
                    height={1000} 
                    unoptimized={true}
                    className="w-full h-auto max-h-[300px] sm:max-h-[480px] object-contain transform group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 pointer-events-none">
                    <p className="text-white text-xs sm:text-sm font-medium">{t('home.agenda_hint')}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
