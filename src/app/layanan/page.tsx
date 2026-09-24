"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import {
  Monitor, FileText, HelpCircle, Zap,
  MessageSquare, Clock, Building2, Mail, Newspaper
} from 'lucide-react';

export default function LayananPage() {
  const { t, trans } = useLanguage();

  const services = [
    {
      title: "LPSE",
      description: trans(
        "Layanan Pengadaan Secara Elektronik untuk penyelenggaraan tender dan e-purchasing pengadaan barang/jasa.",
        "Electronic Procurement Service for managing tenders and e-purchasing for goods/services procurement."
      ),
      icon: Monitor,
      href: "https://spse.inaproc.id/lkpp"
    },
    {
      title: "SIKaP",
      description: trans(
        "Sistem Informasi Kinerja Penyedia untuk mengelola kualifikasi dan rekam jejak data vendor terpusat.",
        "Vendor Performance Information System to manage centralized vendor qualifications and track record."
      ),
      icon: FileText,
      href: "https://sikap.inaproc.id/"
    },
    {
      title: trans("Layanan Pengaduan", "Whistleblowing & Complaints"),
      description: trans(
        "Sampaikan laporan, kendala teknis, atau pengaduan pengadaan langsung via WhatsApp Helpdesk resmi UKPBJ.",
        "Submit reports, technical issues, or procurement complaints directly via official UKPBJ WhatsApp Helpdesk."
      ),
      icon: HelpCircle,
      href: "https://wa.me/628988180009?text=Halo%20Helpdesk%20UKPBJ%20Kemnaker%2C%20saya%20ingin%20menyampaikan%20laporan%20atau%20pengaduan%20terkait%20layanan%20pengadaan."
    },
    {
      title: trans("Layanan Berita", "News Services"),
      description: trans(
        "Pusat warta terkini, siaran pers, pengumuman pemenang lelang, dan publikasi resmi pengadaan barang/jasa.",
        "Latest news center, press releases, tender award announcements, and official procurement publications."
      ),
      icon: Newspaper,
      href: "/berita"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20 -mt-[80px] md:-mt-[88px]">
        {/* HERO SECTION - Modern Government Tech Service Desk */}
        <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-24 overflow-hidden bg-gradient-to-br from-[#061A35] via-[#0A2540] to-[#041226]">
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
                  <span>{trans('Layanan Pengadaan Terpadu Kemnaker', 'MoM Integrated Procurement Services')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  {trans('Pusat Solusi & Akses Layanan', 'Solution Center & Service Access')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-amber-200">
                    {trans('Pengadaan Barang/Jasa', 'Goods & Services Procurement')}
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  {t('page_layanan.desc')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
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
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                    {trans('Butuh Bantuan Teknis atau Konsultasi Pengadaan?', 'Need Technical Assistance or Procurement Consultation?')}
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {trans(
                      'Tim Helpdesk LPSE dan Pokja UKPBJ Kemnaker RI siap membantu kendala teknis SPSE, aktivasi akun penyedia, hingga pendampingan regulasi pengadaan.',
                      'The MoM LPSE Helpdesk and UKPBJ Pokja team are ready to assist with SPSE technical issues, vendor account activation, and procurement regulatory guidance.'
                    )}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-accent-gold" />
                      <span>{trans('Senin – Jumat (08:00 – 16:00 WIB)', 'Monday – Friday (08:00 – 16:00 WIB)')}</span>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-accent-gold" />
                      <span>lpse@kemnaker.go.id</span>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-accent-gold" />
                      <span>{trans('Gedung A Lt. 4 Kemnaker', 'Building A 4th Floor MoM')}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[220px]">
                  <a
                    href="https://wa.me/628988180009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{trans('Chat WhatsApp Helpdesk', 'Chat WhatsApp Helpdesk')}</span>
                  </a>
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
