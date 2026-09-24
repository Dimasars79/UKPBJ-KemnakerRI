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
import { HeroSection } from '@/components/home/HeroSection';
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
  const { t, trans } = useLanguage();
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
      
      <main className="flex-grow overflow-hidden -mt-[80px] md:-mt-[88px]">
        {/* 1. Modern 3D Hero Section with Moving Buildings and Procurement Cardboard Box Visual */}
        <HeroSection />

        {/* Floating Core Values & Navy CTA Banner */}
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
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                        {trans('Transparan', 'Transparent')}
                      </h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {trans('Informasi terbuka dan dapat diakses oleh semua.', 'Open information accessible to everyone.')}
                      </p>
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
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                        {trans('Profesional', 'Professional')}
                      </h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {trans('Dikelola oleh SDM yang kompeten dan berdedikasi.', 'Managed by competent and dedicated personnel.')}
                      </p>
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
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                        {trans('Akuntabel', 'Accountable')}
                      </h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {trans('Setiap proses dapat dipertanggungjawabkan.', 'Every process is fully accountable.')}
                      </p>
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
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                        {trans('Berintegritas', 'High Integrity')}
                      </h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {trans('Menjunjung tinggi etika, moralitas, dan keadilan.', 'Upholding ethics, morality, and fairness.')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>

                {/* 5. Navy CTA Card */}
                <Link 
                  href="/layanan" 
                  className="col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1E3D] via-[#091833] to-[#040C1A] p-4 lg:p-5 text-white flex flex-col justify-between shadow-lg group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-blue/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-10 h-0.5 bg-accent-gold rounded-full mb-2 sm:mb-3" />
                    <p className="font-bold text-xs sm:text-sm text-white leading-snug">
                      {trans('Dukung Pengadaan yang Lebih Baik untuk Ketenagakerjaan Indonesia', 'Support Better Procurement for Indonesian Manpower')}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-bold text-accent-gold group-hover:underline flex items-center gap-1">
                      <span>{trans('Jelajahi Layanan', 'Explore Services')}</span>
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

        {/* 2. Profil UKPBJ */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white" id="profil">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
          
          <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-primary-blue/10 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent-gold/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <FadeIn direction="right" className="w-full lg:w-1/3 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-2xl sm:blur-3xl group-hover:bg-accent-gold/40 transition-colors duration-700 pointer-events-none animate-pulse" />
                  <Image 
                    src="/logo-ukpbj-kemnaker.png" 
                    alt="Logo UKPBJ" 
                    width={400} 
                    height={145} 
                    className="w-44 sm:w-56 md:w-64 lg:w-80 h-auto object-contain drop-shadow-[0_15px_35px_rgba(10,35,66,0.12)] group-hover:scale-105 transition-transform duration-700 relative z-10" 
                  />
                </div>
              </FadeIn>
              
              <div className="w-full lg:w-2/3 text-left">
                <FadeIn direction="left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-primary-navy tracking-tight">{t('home.about_title')}</h2>
                  <div className="w-12 sm:w-16 h-1 bg-accent-gold mb-5 sm:mb-6 md:mb-8 rounded-full" />
                  
                  <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 sm:mb-8 md:mb-10 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                    <Quote className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-accent-gold/15 transform -scale-x-100 group-hover:scale-110 group-hover:-scale-x-110 transition-transform duration-500" />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium relative z-10 pl-3 sm:pl-4 md:pl-8 border-l-2 sm:border-l-4 border-accent-gold/50">
                      {t('home.about_desc')}
                    </p>
                  </div>
                </FadeIn>
                
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6">
                  <StaggerItem>
                    <div className="flex flex-col p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-1.5 h-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-blue-50/70 group-hover:bg-primary-blue flex items-center justify-center mb-3 sm:mb-4 md:mb-5 transition-colors duration-300 shrink-0">
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">
                        {trans('Eksekusi Pengadaan', 'Procurement Execution')}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {trans('Menyelenggarakan proses tender dan pemilihan penyedia yang tangkas dan adil.', 'Conducting agile and fair tender and vendor selection processes.')}
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-1.5 h-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-blue-50/70 group-hover:bg-primary-blue flex items-center justify-center mb-3 sm:mb-4 md:mb-5 transition-colors duration-300 shrink-0">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">
                        {trans('Pembinaan SDM', 'Human Resource Development')}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {trans('Meningkatkan kapasitas dan keahlian Pejabat Pembuat Komitmen (PPK) secara berkelanjutan.', 'Continuously enhancing the capacity and skills of Commitment Making Officers (PPK).')}
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-1.5 h-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-blue-50/70 group-hover:bg-primary-blue flex items-center justify-center mb-3 sm:mb-4 md:mb-5 transition-colors duration-300 shrink-0">
                        <Scale className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">
                        {trans('Advokasi & Konsultasi', 'Advocacy & Consultation')}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {trans('Memberikan pendampingan hukum dan solusi penyelesaian sengketa pengadaan.', 'Providing legal assistance and procurement dispute resolution solutions.')}
                      </p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Performance Dashboard */}
        <section className="py-14 sm:py-24 relative overflow-hidden bg-[#0a2342] border-y border-white/10" id="kinerja">
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
                  {trans('Indikator Kinerja Pengadaan Barang/Jasa UKPBJ Kementerian Ketenagakerjaan', 'Procurement Performance Indicators of Kemnaker UKPBJ')}
                </p>
              </FadeIn>
              
              {/* Year Dropdown */}
              <FadeIn direction="right">
                <div className="relative group self-start md:self-auto">
                  <select className="appearance-none bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-xs sm:text-base rounded-full px-4 sm:px-6 py-2 sm:py-2.5 pr-9 sm:pr-12 focus:outline-none focus:border-accent-gold/40 focus:ring-2 focus:ring-accent-gold/20 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-sm">
                    <option value="2026" className="text-primary-navy">{trans('Tahun 2026', 'Year 2026')}</option>
                    <option value="2025" className="text-primary-navy">{trans('Tahun 2025', 'Year 2025')}</option>
                    <option value="2024" className="text-primary-navy">{trans('Tahun 2024', 'Year 2024')}</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white pointer-events-none group-hover:text-accent-gold transition-colors" />
                </div>
              </FadeIn>
            </div>
            
            {/* 4 Stat Cards */}
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-8 sm:mb-12">
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-accent-gold/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-accent-gold/20 transition-colors">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-accent-gold" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">
                    {trans('Waktu', 'Time')}
                  </h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-accent-gold transition-colors">95%</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">
                    {trans('Ketepatan waktu proses', 'Process timeliness')}
                  </p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-green-400/50 hover:shadow-[0_8px_30px_rgba(74,222,128,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-green-400/20 transition-colors">
                    <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">
                    {trans('Efisiensi', 'Efficiency')}
                  </h4>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-green-400 transition-colors">Rp 12.4M</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">
                    {trans('Penghematan anggaran', 'Budget savings')}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-[0_8px_30px_rgba(192,132,252,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-purple-400/20 transition-colors">
                    <Award className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">
                    {trans('Kualitas', 'Quality')}
                  </h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-purple-400 transition-colors">A+</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">
                    {trans('Indeks tata kelola', 'Governance index')}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-pink-400/50 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-pink-400/20 transition-colors">
                    <ThumbsUp className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                  <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-0.5 sm:mb-1 relative z-10">
                    {trans('Layanan', 'Service')}
                  </h4>
                  <p className="text-xl sm:text-3xl font-black text-white relative z-10 drop-shadow-sm group-hover:text-pink-400 transition-colors">98%</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 relative z-10 line-clamp-1 sm:line-clamp-none">
                    {trans('Kepuasan pengguna', 'User satisfaction')}
                  </p>
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
                      <span>{trans('Realisasi Paket Selesai', 'Completed Packages Realization')}</span>
                    </h4>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/10">
                      {trans('Tahun 2026', 'Year 2026')}
                    </span>
                  </div>
                  <PerformanceChart />
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span>{trans('Efisiensi Anggaran PBJ', 'PBJ Budget Efficiency')}</span>
                    </h4>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/10">
                      {trans('Kuartal', 'Quarter')}
                    </span>
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
