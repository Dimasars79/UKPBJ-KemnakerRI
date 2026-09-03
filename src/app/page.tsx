"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Briefcase, Users, Globe, HelpCircle, AlertCircle, MessageSquare, ArrowRight, ShieldCheck, FileCheck, Eye, Calendar, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      
      <main className="flex-grow overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero-bg.png" 
              alt="Gedung Kementerian Ketenagakerjaan" 
              fill
              className="object-cover object-center animate-slow-zoom"
              priority
            />
          </div>
          {/* Gradient Overlay for better readability on left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2342] via-[#0a2342]/80 to-transparent z-0" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
            <div className="max-w-4xl">
              <FadeIn direction="left" delay={0.1}>
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 text-white">
                  UKPBJ
                </h1>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white leading-tight">
                  {t('home.hero_title')}
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f2b33a] mb-8">
                  {t('home.hero_subtitle')}
                </h3>
              </FadeIn>
              
              <FadeIn direction="left" delay={0.3}>
                <p className="text-base md:text-lg text-slate-200 mb-12 max-w-3xl leading-relaxed">
                  {t('home.hero_desc')}
                </p>
              </FadeIn>

              {/* Four Pillars */}
              <FadeIn direction="up" delay={0.5}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-8 pt-8 border-t border-white/20 relative">
                  
                  {/* Item 1 */}
                  <div className="flex flex-col border-r border-white/20 pr-4 group hover:bg-white/5 p-3 -m-3 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-md group-hover:bg-primary-blue/30 group-hover:border-accent-gold/50 animate-float-subtle group-hover:animate-glow-pulse transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      <ShieldCheck className="w-6 h-6 text-[#f2b33a] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-accent-gold transition-colors duration-300">TRANSPARAN</h4>
                    <p className="text-xs text-slate-300 group-hover:text-white transition-colors duration-300">Informasi terbuka dan dapat diakses oleh semua.</p>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="flex flex-col border-r-0 md:border-r border-white/20 pr-0 md:pr-4 group hover:bg-white/5 p-3 -m-3 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-md group-hover:bg-primary-blue/30 group-hover:border-accent-gold/50 animate-float-subtle group-hover:animate-glow-pulse transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" style={{ animationDelay: '0.5s' }}>
                      <Users className="w-6 h-6 text-[#f2b33a] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-accent-gold transition-colors duration-300">PROFESIONAL</h4>
                    <p className="text-xs text-slate-300 group-hover:text-white transition-colors duration-300">Dikelola oleh SDM yang kompeten dan berdedikasi.</p>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="flex flex-col border-r border-white/20 pr-4 group hover:bg-white/5 p-3 -m-3 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-md group-hover:bg-primary-blue/30 group-hover:border-accent-gold/50 animate-float-subtle group-hover:animate-glow-pulse transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" style={{ animationDelay: '1s' }}>
                      <svg className="w-6 h-6 text-[#f2b33a] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-accent-gold transition-colors duration-300">AKUNTABEL</h4>
                    <p className="text-xs text-slate-300 group-hover:text-white transition-colors duration-300">Setiap proses dapat dipertanggungjawabkan.</p>
                  </div>
                  
                  {/* Item 4 */}
                  <div className="flex flex-col group hover:bg-white/5 p-3 -m-3 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-md group-hover:bg-primary-blue/30 group-hover:border-accent-gold/50 animate-float-subtle group-hover:animate-glow-pulse transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" style={{ animationDelay: '1.5s' }}>
                      <svg className="w-6 h-6 text-[#f2b33a] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-accent-gold transition-colors duration-300">BERINTEGRITAS</h4>
                    <p className="text-xs text-slate-300 group-hover:text-white transition-colors duration-300">Menjunjung tinggi nilai etika, moralitas, dan keadilan.</p>
                  </div>
                  
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Bottom Right Graphic & Slogan (Absolute) */}
          <div className="absolute bottom-0 right-0 w-full md:w-[600px] h-[200px] z-10 pointer-events-none hidden md:block">
            {/* A simplistic CSS interpretation of the blue/gold wave */}
            <div className="absolute bottom-0 right-0 w-full h-full">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,200 C150,200 250,50 400,80 C500,100 550,0 600,0 L600,200 Z" fill="#071b36" opacity="0.9" />
                <path d="M50,200 C200,200 300,80 450,110 C530,125 570,50 600,30 L600,200 Z" fill="#f2b33a" opacity="0.8" />
                <path d="M100,200 C250,200 350,110 500,140 C550,150 580,100 600,80 L600,200 Z" fill="#0a2342" />
              </svg>
              
              <div className="absolute bottom-10 right-10 text-right">
                <div className="flex justify-end gap-3 mb-3 text-white/70">
                  <FileCheck className="w-5 h-5" />
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                </div>
                <p className="text-[#f2b33a] font-bold text-sm">Melayani dengan Hati,</p>
                <p className="text-white font-bold text-base">Mengabdi untuk Negeri</p>
              </div>
            </div>
          </div>

          {/* Marquee Text */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#0a2342]/80 py-3 border-t border-white/10 z-20 backdrop-blur-sm">
            <p className="animate-marquee whitespace-nowrap text-xs md:text-sm font-bold tracking-[0.1em] text-[#f2b33a]">
              Informasi Pengadaan Barang/Jasa &bull; Transparansi dan Akuntabilitas Pengadaan &bull; Pengumuman Terbaru &bull; Regulasi dan Kebijakan Pengadaan &bull; Rencana Umum Pengadaan &bull; Layanan Pengadaan untuk Penyedia &bull; Kementerian Ketenagakerjaan Republik Indonesia &nbsp;&nbsp;&nbsp;&nbsp; Informasi Pengadaan Barang/Jasa &bull; Transparansi dan Akuntabilitas Pengadaan &bull; Pengumuman Terbaru &bull; Regulasi dan Kebijakan Pengadaan &bull; Rencana Umum Pengadaan &bull; Layanan Pengadaan untuk Penyedia &bull; Kementerian Ketenagakerjaan Republik Indonesia
            </p>
          </div>
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
                        <Briefcase className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Profesional</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">SDM yang kompeten dan berintegritas tinggi.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 group-hover:bg-primary-blue flex items-center justify-center mb-5 transition-colors duration-300">
                        <Eye className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Transparan</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Proses yang terbuka dan dapat diawasi publik.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-accent-gold/30 transition-all duration-300 group transform hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 group-hover:bg-primary-blue flex items-center justify-center mb-5 transition-colors duration-300">
                        <FileCheck className="w-7 h-7 text-primary-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-navy group-hover:text-accent-gold transition-colors duration-300">Akuntabel</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Dapat dipertanggungjawabkan sesuai peraturan.</p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Performance Dashboard (ZEBRA STRIPING: DARK MODE) */}
        <section className="py-24 relative overflow-hidden bg-[#0a2342] border-y border-white/10" id="kinerja">
          {/* Subtle overlay grid for dark mode */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none" />
          
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <FadeIn direction="left" className="mb-6 md:mb-0">
                <div className="inline-block relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 relative z-10">
                    {t('home.dashboard_title')}
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent-gold rounded-full" />
                </div>
                <p className="text-slate-300 max-w-2xl mt-6">
                  {t('home.dashboard_desc')}
                </p>
              </FadeIn>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="text-sm font-medium text-slate-300 mb-1 relative z-10">{t('home.stats_saving')}</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-accent-gold relative z-10 drop-shadow-sm">Rp 12.400.000.000</p>
                  <p className="text-sm text-slate-400 mt-2 relative z-10">{t('home.stats_year')}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="text-lg font-bold text-slate-100 mb-2 relative z-10">{t('home.stats_done')}</h4>
                  <p className="text-2xl md:text-3xl font-extrabold text-white relative z-10 drop-shadow-sm">440 Paket</p>
                  <p className="text-sm text-slate-400 mt-2 relative z-10">{t('home.stats_target')}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="text-lg font-bold text-slate-100 mb-2 relative z-10">{t('home.stats_time')}</h4>
                  <p className="text-2xl md:text-3xl font-extrabold text-white relative z-10 drop-shadow-sm">14 Hari</p>
                  <p className="text-sm text-slate-400 mt-2 relative z-10">{t('home.stats_avg')}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FadeIn direction="up" delay={0.2}>
                <PerformanceChart />
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <EfficiencyChart />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. Main Services (Tempat untuk services nantinya) */}
        <section className="py-20 bg-gradient-to-tr from-blue-50/40 via-slate-50 to-white relative overflow-hidden border-y border-slate-100" id="layanan">
          {/* Subtle cubes pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex justify-between items-end mb-10">
                <SectionHeading title={t('home.services_title')} />
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StaggerItem>
                <ServiceCard 
                  title="LPSE" 
                  description="Layanan Pengadaan Secara Elektronik untuk proses tender dan seleksi penyedia barang/jasa."
                  icon={Globe}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Permintaan Informasi" 
                  description="Akses layanan permohonan informasi publik terkait kegiatan pengadaan barang/jasa."
                  icon={HelpCircle}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Pelatihan & Bimtek" 
                  description="Program peningkatan kapasitas dan kompetensi SDM di bidang pengadaan barang/jasa."
                  icon={Users}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Clearing House" 
                  description="Fasilitasi penyelesaian permasalahan dan konsultasi khusus pengadaan barang/jasa."
                  icon={ShieldCheck}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Pengaduan" 
                  description="Saluran resmi penyampaian pengaduan masyarakat terkait proses pengadaan."
                  icon={AlertCircle}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Konsultasi PBJ" 
                  description="Layanan konsultasi umum mengenai kebijakan dan regulasi pengadaan barang/jasa."
                  icon={MessageSquare}
                  href="#"
                />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* 4. Berita / Pengumuman Terkini */}
        <section className="py-20 bg-gradient-to-bl from-white via-blue-50/30 to-slate-50 border-t border-slate-100 relative overflow-hidden" id="berita">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <FadeIn>
              <div className="flex justify-between items-end mb-8">
                <SectionHeading title={t('home.news_title')} />
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <NewsCard 
                  featured={false}
                  title="Sosialisasi Peraturan Pengadaan Terbaru"
                  summary="UKPBJ Kementerian Ketenagakerjaan mengadakan sosialisasi terkait regulasi terbaru mengenai pengadaan barang dan jasa pemerintah."
                  date="24 Agustus 2026"
                  category="Berita"
                  imageUrl="/news/news-1.png"
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <NewsCard 
                  title="Peningkatan Kapasitas PPK"
                  summary="Kegiatan bimbingan teknis yang diselenggarakan khusus untuk Pejabat Pembuat Komitmen Kementerian Ketenagakerjaan."
                  date="20 Agustus 2026"
                  category="Kegiatan"
                  imageUrl="/news/news-2.png"
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <NewsCard 
                  title="Pengumuman Tender Pembangunan Fasilitas"
                  summary="Diumumkan kepada seluruh penyedia barang dan jasa terdaftar mengenai pembukaan tender."
                  date="18 Agustus 2026"
                  category="Pengadaan"
                  imageUrl="/news/news-3.png"
                  href="#"
                />
              </StaggerItem>
            </StaggerContainer>
            <FadeIn direction="up" delay={0.4} className="mt-8 text-center">
              <Link href="#" className="inline-flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors">
                {t('home.news_more')} <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* 5. Agenda & Poster Kegiatan */}
        <section className="py-20 bg-primary-navy text-white relative overflow-hidden" id="agenda">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-accent-gold font-medium text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>{t('home.agenda_title')}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                  {t('home.agenda_subtitle')}
                </h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {t('home.agenda_desc')}
                </p>
                <StaggerContainer className="space-y-4 mb-8">
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent-gold">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Sabtu, 26 Oktober 2026</h4>
                        <p className="text-slate-400">08:30 - 16:30 WIB</p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent-gold">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Auditorium Utama</h4>
                        <p className="text-slate-400">Gedung Pusat LKPP, Jakarta Pusat</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
                <Link href="#" className="inline-flex justify-center items-center bg-accent-gold hover:bg-yellow-500 text-primary-navy font-bold py-3 px-8 rounded-md transition-colors shadow-lg">
                  {t('home.agenda_btn')} <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </FadeIn>
              <FadeIn direction="left" delay={0.2} className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <Image 
                  src="/poster_kegiatan.jpg" 
                  alt="Poster Bimbingan Teknis Pengadaan Barang dan Jasa" 
                  width={800} 
                  height={800} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">{t('home.agenda_hint')}</p>
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
