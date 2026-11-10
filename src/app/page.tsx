"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, ArrowRight, ShieldCheck, Quote, ShoppingCart, 
  BookOpen, Scale, TrendingUp, Calendar, Globe, FileText,
  Clock, MapPin, Building2, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/home/HeroSection';
import { ProcurementStatsOverview } from '@/components/home/ProcurementStatsOverview';
import { PengadaanSection } from '@/components/home/PengadaanSection';
import { BeritaSection } from '@/components/home/BeritaSection';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { useData } from '@/contexts/DataContext';

import { parseAgendaDateObject, parseAgendaDate, isAgendaExpired } from '@/lib/agendaUtils';

export default function Home() {
  const { t, trans } = useLanguage();
  const { agendaList } = useData();

  // State sinkronisasi metode pengadaan yang dipilih dari kartu atas ke tabel bawah
  const [selectedMethodCategory, setSelectedMethodCategory] = React.useState<string>('Semua');

  const handleSelectMethod = (method: string) => {
    setSelectedMethodCategory(method);
    const el = document.getElementById('pengadaan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamically sort and find the closest upcoming agenda (Jadwal Terdekat)
  const sortedUpcomingAgendas = React.useMemo(() => {
    const activeAgendas = agendaList.filter(
      (a) => a.status !== 'Dibatalkan' && !isAgendaExpired(a)
    );

    const withParsed = activeAgendas.map((item) => {
      const d = parseAgendaDateObject(item.date);
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

  // Format parsed date details for Digital Event Pass fallback
  const parsedDateInfo = React.useMemo(() => {
    if (!latestAgenda?.date) return null;
    return parseAgendaDate(latestAgenda.date);
  }, [latestAgenda]);

  const monthNamesID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
  const agendaDayStr = parsedDateInfo ? String(parsedDateInfo.day).padStart(2, '0') : '26';
  const agendaMonthStr = parsedDateInfo && parsedDateInfo.month >= 0 ? monthNamesID[parsedDateInfo.month] : 'OKT';
  const agendaYearStr = parsedDateInfo ? String(parsedDateInfo.year) : '2026';

  return (
    <>
      <Header />
      
      <main className="flex-grow overflow-hidden -mt-[80px] md:-mt-[88px]">
        {/* 1. Modern 3D Hero Section with Moving Buildings and Procurement Cardboard Box Visual */}
        <HeroSection />

        {/* Floating Core Values & Navy CTA Banner */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-14 sm:-mt-16 lg:-mt-20 mb-2 sm:mb-4">
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

        {/* 2. Profil UKPBJ - Minimalist & Clean with Single Direct CTA */}
        <section className="pt-2 sm:pt-4 md:pt-6 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white" id="profil">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-14">
              
              {/* Kolom Kiri: Logo Bersih & Elegan */}
              <FadeIn direction="right" className="w-full lg:w-4/12 flex justify-center">
                <div className="relative group p-4 sm:p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-accent-gold/10 transition-colors duration-500 pointer-events-none" />
                  <Image 
                    src="/logo-ukpbj-kemnaker-new.png" 
                    alt="Logo UKPBJ Kementerian Ketenagakerjaan RI" 
                    width={480} 
                    height={160} 
                    className="w-52 sm:w-64 md:w-72 lg:w-80 h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 relative z-10" 
                  />
                </div>
              </FadeIn>
              
              {/* Kolom Kanan: Narasi, 3 Pilar Bersih & 1 Tombol Aksi */}
              <div className="w-full lg:w-8/12 text-left">
                <FadeIn direction="left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy tracking-tight mb-2">
                    {t('home.about_title')}
                  </h2>
                  <div className="w-12 h-1 bg-accent-gold mb-6 rounded-full" />
                  
                  {/* Quote / Deskripsi Utama */}
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                    <Quote className="absolute top-4 left-4 w-9 h-9 text-accent-gold/15 transform -scale-x-100 group-hover:scale-110 group-hover:-scale-x-110 transition-transform duration-500 pointer-events-none" />
                    <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed font-medium relative z-10 pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-accent-gold/60">
                      {t('home.about_desc')}
                    </p>
                  </div>
                </FadeIn>
                
                {/* 3 Pilar Layanan Utama (Clean & Minimal) */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {/* Pilar 1 */}
                  <StaggerItem>
                    <div className="flex flex-col p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 group transform hover:-translate-y-1 h-full">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-primary-blue flex items-center justify-center mb-3 transition-colors duration-300 shrink-0">
                        <ShoppingCart className="w-5 h-5 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm font-bold text-primary-navy group-hover:text-primary-blue transition-colors mb-1.5">
                        {trans('Eksekusi Pengadaan', 'Procurement Execution')}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {trans('Menyelenggarakan proses tender dan pemilihan penyedia yang tangkas dan adil.', 'Conducting agile and fair tender and vendor selection processes.')}
                      </p>
                    </div>
                  </StaggerItem>

                  {/* Pilar 2 */}
                  <StaggerItem>
                    <div className="flex flex-col p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 group transform hover:-translate-y-1 h-full">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-accent-gold flex items-center justify-center mb-3 transition-colors duration-300 shrink-0">
                        <BookOpen className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm font-bold text-primary-navy group-hover:text-primary-blue transition-colors mb-1.5">
                        {trans('Pembinaan SDM', 'Human Resource Development')}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {trans('Meningkatkan kapasitas dan keahlian Pejabat Pembuat Komitmen (PPK) secara berkelanjutan.', 'Continuously enhancing the capacity and skills of Commitment Making Officers (PPK).')}
                      </p>
                    </div>
                  </StaggerItem>

                  {/* Pilar 3 */}
                  <StaggerItem>
                    <div className="flex flex-col p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 group transform hover:-translate-y-1 h-full">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 group-hover:bg-purple-600 flex items-center justify-center mb-3 transition-colors duration-300 shrink-0">
                        <Scale className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm font-bold text-primary-navy group-hover:text-primary-blue transition-colors mb-1.5">
                        {trans('Advokasi & Konsultasi', 'Advocacy & Consultation')}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {trans('Memberikan pendampingan hukum dan solusi penyelesaian sengketa pengadaan.', 'Providing legal assistance and procurement dispute resolution solutions.')}
                      </p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {/* 1 Tombol Aksi Tunggal (Clean & Minimal) */}
                <FadeIn direction="up" delay={0.2}>
                  <div className="pt-1 flex justify-end">
                    <Link 
                      href="/tentang"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-navy hover:bg-primary-blue text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <span>{trans('Pelajari Profil Selengkapnya', 'Learn More About UKPBJ')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-accent-gold" />
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Ikhtisar Distribusi & Tahapan Pengadaan (Pengganti Dashboard Kinerja) */}
        <ProcurementStatsOverview onSelectMethod={handleSelectMethod} />

        {/* 3. Menu Pengadaan Barang & Jasa */}
        <PengadaanSection 
          activeCategory={selectedMethodCategory} 
          onCategoryChange={setSelectedMethodCategory} 
        />

        {/* 4. Berita & Pengumuman Carousel */}
        <BeritaSection />

        {/* 5. Agenda & Poster Kegiatan */}
        <section className="py-10 sm:py-14 md:py-16 bg-primary-navy text-white relative overflow-hidden" id="agenda">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            {latestAgenda?.imageUrl ? (
              /* ==============================================================
                 TAMPILAN 1: JIKA ADA POSTER GAMBAR DARI CMS (2 Kolom Kiri & Kanan)
                 ============================================================== */
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
                    {latestAgenda?.description || t('home.agenda_desc')}
                  </p>

                  {/* 2 Quick Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/10">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-accent-gold flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-white truncate">{latestAgenda ? latestAgenda.date : 'Sabtu, 26 Oktober 2026'}</h4>
                        <p className="text-[11px] text-slate-300 truncate">{latestAgenda ? latestAgenda.time : '08:30 - 16:30 WIB'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/10">
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

                <FadeIn direction="left" delay={0.2} className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group max-w-lg mx-auto w-full bg-slate-900 flex items-center justify-center p-3 sm:p-4">
                  {/* Background ambient lighting */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/15 via-primary-blue/20 to-cyan-500/10 opacity-70 pointer-events-none" />

                  <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/60 border border-white/10">
                    <Image 
                      src={latestAgenda.imageUrl} 
                      alt={latestAgenda?.title || "Poster Kegiatan Pengadaan Barang dan Jasa Kemnaker"} 
                      width={800} 
                      height={1000} 
                      loading="lazy"
                      sizes="(max-width: 768px) 90vw, 500px"
                      className="w-full h-auto max-h-[300px] sm:max-h-[480px] object-contain transform group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl drop-shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 pointer-events-none">
                      <p className="text-white text-xs sm:text-sm font-medium">{t('home.agenda_hint')}</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0C2344] via-[#091C36] to-[#051122] border border-amber-400/30 hover:border-amber-400/60 p-4 sm:p-6 lg:p-7 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(251,191,36,0.1)]"
              >
                {/* Background ambient radial glow dengan animasi breathing halus */}
                <motion.div 
                  animate={{ 
                    opacity: [0.2, 0.35, 0.2], 
                    scale: [1, 1.08, 1] 
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-20 -right-20 w-72 h-72 pointer-events-none rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)' }}
                />
                
                {/* Watermark Shield dengan efek rotasi mikro */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.06] pointer-events-none text-white select-none transition-opacity duration-700">
                  <ShieldCheck className="w-64 h-64 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-700 ease-out" />
                </div>

                {/* Top Bar: Agenda Pill + Kategori & Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-white/10 relative z-10">
                  <div className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full text-accent-gold font-semibold text-xs transition-colors duration-300">
                    <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{t('home.agenda_title')}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {latestAgenda?.category && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-accent-gold text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                        {latestAgenda.category}
                      </span>
                    )}
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{latestAgenda?.status || trans('Terjadwal', 'Scheduled')}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content Layout (Stamp Tanggal + Rincian Kegiatan + Tombol Aksi) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-center py-4 sm:py-5 relative z-10">
                  {/* Left: Kalender Tanggal Tegas & Menonjol (Interactive Ticket Pass) */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-3 lg:gap-1 bg-gradient-to-b from-[#14325E] to-[#0A1B33] border-2 border-amber-400/70 hover:border-amber-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-md shadow-black/40 hover:shadow-amber-500/20 transition-all duration-300 cursor-default select-none relative overflow-hidden group/ticket"
                  >
                    {/* Subtle light sweep reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/ticket:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    
                    <span className="text-[11px] sm:text-xs font-black text-amber-300 tracking-widest uppercase">
                      {agendaMonthStr}
                    </span>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none my-0.5 tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
                      {agendaDayStr}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-300 tracking-wider">
                      {agendaYearStr}
                    </span>
                  </motion.div>

                  {/* Center: Judul, Deskripsi & Info Waktu/Tempat/Penyelenggara */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white mb-1.5 sm:mb-2 leading-snug group-hover:text-amber-100 transition-colors duration-300">
                      {latestAgenda ? latestAgenda.title : t('home.agenda_subtitle')}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-3.5 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {latestAgenda?.description || t('home.agenda_desc')}
                    </p>

                    {/* Unified Glassmorphism Info Bar dengan Mikro-Hover */}
                    <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/30 text-[11px] sm:text-xs text-slate-300 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-white/10 w-full sm:w-fit max-w-full shadow-inner transition-colors duration-300 overflow-hidden">
                      <div className="flex items-center gap-2.5 px-3.5 sm:pl-3.5 sm:pr-3 py-2 sm:py-1.5 shrink-0 group/info">
                        <div className="w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                          <Clock className="w-3 h-3 text-accent-gold group-hover/info:scale-110 transition-transform duration-200" />
                        </div>
                        <span className="font-medium text-slate-200 whitespace-nowrap">{latestAgenda ? latestAgenda.time : '08:30 - 16:30 WIB'}</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3.5 sm:px-3 py-2 sm:py-1.5 min-w-0 group/info">
                        <div className="w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-3 h-3 text-accent-gold group-hover/info:scale-110 transition-transform duration-200" />
                        </div>
                        <span className="font-medium text-slate-200 truncate" title={latestAgenda ? latestAgenda.location : 'Auditorium Kemnaker'}>
                          {latestAgenda ? latestAgenda.location : 'Auditorium Kemnaker'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3.5 sm:pl-3 sm:pr-5 py-2 sm:py-1.5 min-w-0 group/info">
                        <div className="w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                          <Building2 className="w-3 h-3 text-accent-gold group-hover/info:scale-110 transition-transform duration-200" />
                        </div>
                        <span className="font-medium text-slate-200 truncate" title={latestAgenda ? latestAgenda.organizer : 'UKPBJ Kemnaker'}>
                          {latestAgenda ? latestAgenda.organizer : 'UKPBJ Kemnaker'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Tombol CTA & Zoom */}
                  <div className="lg:col-span-3 flex flex-col gap-2.5 justify-center lg:border-l lg:border-white/10 lg:pl-5">
                    <Link 
                      href="/agenda" 
                      className="group/btn relative overflow-hidden inline-flex justify-center items-center bg-gradient-to-r from-accent-gold via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-primary-navy font-extrabold py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-102 text-xs sm:text-xs text-center"
                    >
                      {/* Shimmer sweep reflection on button */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                      <span className="relative z-10">{t('home.agenda_btn')}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {latestAgenda?.zoomUrl && (
                      <a 
                        href={latestAgenda.zoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center bg-blue-600 hover:bg-blue-500 hover:scale-102 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl transition-all duration-300 text-xs sm:text-xs text-center shadow-sm shadow-blue-600/30"
                      >
                        <span>Ikuti via Zoom</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom: Jadwal Kegiatan Berikutnya (Grid Kartu dengan Hover Lift) */}
                {nextAgendas && nextAgendas.length > 0 && (
                  <div className="pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                      Jadwal Kegiatan Berikutnya:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                      {nextAgendas.map((nextAg) => (
                        <motion.div
                          key={nextAg.id}
                          whileHover={{ y: -1, x: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href="/agenda"
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 hover:shadow-md hover:shadow-black/20 transition-all duration-300 text-xs group/next h-full"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold text-slate-200 group-hover/next:text-accent-gold transition-colors truncate text-[11px] sm:text-xs">
                                {nextAg.title}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                <span>{nextAg.location || 'Kemnaker RI'}</span>
                              </p>
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-accent-gold shrink-0 font-bold ml-1.5 flex items-center gap-1">
                              <span>{nextAg.date}</span>
                              <ArrowRight className="w-3 h-3 group-hover/next:translate-x-0.5 transition-transform duration-200" />
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
