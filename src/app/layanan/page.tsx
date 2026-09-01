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
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#0d2e57] to-[#113a6e]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-[#f2b33a]/5 rounded-full blur-[100px] mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-overlay" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeIn direction="up">
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-6">{t('page_layanan.title')}</h1>
              <div className="w-20 h-1 bg-accent-gold mx-auto mb-8 rounded-full" />
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                {t('page_layanan.desc')}
              </p>
            </FadeIn>
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
          
          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: 1, title: 'Registrasi', desc: 'Penyedia mendaftar melalui sistem SPSE' },
                { step: 2, title: 'Verifikasi', desc: 'Pengecekan kelengkapan dokumen administrasi' },
                { step: 3, title: 'Akses Sistem', desc: 'Penyedia mendapatkan akses penuh ke sistem' },
                { step: 4, title: 'Proses Tender', desc: 'Mengikuti proses lelang/pengadaan' }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center bg-white p-4">
                  <div className="w-16 h-16 rounded-full bg-primary-navy text-accent-gold flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg text-primary-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
