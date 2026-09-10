"use client"

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { 
  Monitor, FileText, HelpCircle, ShieldCheck, Zap, CheckCircle2,
  PhoneCall, MessageSquare, Clock, Building2, Mail
} from 'lucide-react';

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
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
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
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sistem SPSE Terintegrasi</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Akses SIKaP 24/7</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Konsultasi & Clearing House</span>
                  </span>
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

        {/* SECTION: CONSOLIDATED HELPDESK & CONSULTATION BANNER */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <FadeIn direction="up">
            <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-br from-[#061a35] via-[#0a2540] to-[#041226] text-white border border-white/15 shadow-xl">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary-blue/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left: Info */}
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-accent-gold text-xs font-bold uppercase tracking-wider mb-4">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Pusat Bantuan & Layanan Konsultasi</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                    Butuh Bantuan Teknis atau Konsultasi Pengadaan?
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Tim Helpdesk LPSE dan Pokja UKPBJ Kemnaker RI siap membantu kendala teknis SPSE, aktivasi akun penyedia, hingga pendampingan regulasi pengadaan.
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-accent-gold" />
                      <span>Senin – Jumat (08:00 – 16:00 WIB)</span>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-accent-gold" />
                      <span>lpse@kemnaker.go.id</span>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-accent-gold" />
                      <span>Gedung A Lt. 4 Kemnaker</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[220px]">
                  <a
                    href="https://wa.me/628119988776"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat WhatsApp Helpdesk</span>
                  </a>

                  <Link
                    href="/informasi/clearing-house"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs py-3.5 px-6 rounded-xl transition-all active:scale-95 backdrop-blur-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-300" />
                    <span>Konsultasi Clearing House</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
