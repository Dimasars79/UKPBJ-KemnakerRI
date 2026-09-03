"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { Monitor, FileText, HelpCircle, ShieldCheck } from 'lucide-react';

export default function LayananPage() {
  const { t } = useLanguage();

  const services = [
    {
      title: "LPSE",
      description: "Layanan Pengadaan Secara Elektronik untuk penyelenggaraan pengadaan barang/jasa.",
      icon: Monitor,
      href: "https://lpse.kemnaker.go.id"
    },
    {
      title: "SIKaP",
      description: "Sistem Informasi Kinerja Penyedia untuk mengelola data kinerja penyedia barang/jasa.",
      icon: FileText,
      href: "#"
    },
    {
      title: "Layanan Pengaduan",
      description: "Sampaikan laporan atau pengaduan terkait proses pengadaan barang/jasa.",
      icon: HelpCircle,
      href: "#"
    },
    {
      title: "Clearing House",
      description: "Konsultasi dan penyelesaian masalah terkait proses pengadaan barang/jasa.",
      icon: ShieldCheck,
      href: "#"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Modern Government Tech Service Desk */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#061A35] via-[#0A2540] to-[#041226]">
          {/* Tech Grid & Spotlight Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute -top-24 right-0 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <span>⚡</span>
                  <span>Layanan Pengadaan Terpadu Kemnaker</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  Pusat Solusi & Akses Layanan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-amber-200">
                    Pengadaan Barang/Jasa
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
                  {t('page_layanan.desc')}
                </p>

                {/* Service Indicator Chips */}
                <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">✓ Sistem SPSE Terintegrasi</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">✓ Akses SIKaP 24/7</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">✓ Konsultasi & Clearing House</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <StaggerItem key={idx}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <SectionHeading title="Alur Pelayanan" subtitle="Langkah-langkah umum dalam proses layanan pengadaan" />
          
          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 relative group">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 group-hover:bg-blue-100 transition-colors duration-700 -translate-y-1/2 z-0"></div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: 1, title: 'Registrasi', desc: 'Penyedia mendaftar melalui sistem SPSE' },
                { step: 2, title: 'Verifikasi', desc: 'Pengecekan kelengkapan dokumen administrasi' },
                { step: 3, title: 'Akses Sistem', desc: 'Penyedia mendapatkan akses penuh ke sistem' },
                { step: 4, title: 'Proses Tender', desc: 'Mengikuti proses lelang/pengadaan' }
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <div className="flex flex-col items-center text-center bg-white p-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer rounded-xl hover:shadow-[0_10px_30px_rgba(30,58,138,0.08)] group/item">
                    <div className="w-16 h-16 rounded-full bg-primary-navy text-accent-gold flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white group-hover/item:bg-accent-gold group-hover/item:text-primary-navy group-hover/item:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover/item:scale-110 group-hover/item:border-yellow-100 transition-all duration-300">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg text-primary-navy mb-2 group-hover/item:text-primary-blue transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
