"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { 
  Monitor, FileText, HelpCircle, ShieldCheck, Zap, CheckCircle2,
  PhoneCall, MessageSquare, Clock, MapPin, Building2, ExternalLink,
  ArrowRight, Mail, Scale
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

        {/* SECTION: PUSAT BANTUAN & KANAL KONSULTASI PBJ */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <SectionHeading 
            title="Pusat Bantuan & Kanal Konsultasi PBJ" 
            subtitle="Saluran resmi bantuan teknis SPSE, konsultasi regulasi pengadaan, dan layanan pendampingan bagi stakeholder" 
          />
          
          <div className="mt-12">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Helpdesk LPSE */}
              <StaggerItem>
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary-blue border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Senin - Jumat (08:00 - 16:00 WIB)</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-blue transition-colors mb-2">
                      Helpdesk SPSE & LPSE
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Bantuan teknis penggunaan sistem SPSE, aktivasi akun penyedia, reset kata sandi, dan panduan e-katalog.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>lpse@kemnaker.go.id</span>
                    </div>
                    <a
                      href="https://wa.me/628119988776"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-primary-blue text-primary-blue hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp Helpdesk</span>
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Card 2: Klinik Konsultasi & Clearing House */}
              <StaggerItem>
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Pendampingan Teknis
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                      Clearing House PBJ
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Konsultasi mitigasi risiko, telaah hukum pengadaan, mediasi sengketa kontrak, dan pemberian rekomendasi teknis.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Reservasi Sesi Terjadwal</span>
                    </div>
                    <a
                      href="/informasi/clearing-house"
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                    >
                      <span>Buka Layanan Konsultasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Card 3: Kanal Pengaduan WBS */}
              <StaggerItem>
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Kerahasiaan Terjamin
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-2">
                      Pengaduan & WBS
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Saluran resmi pelaporan indikasi kecurangan, pelanggaran kode etik, dan penyimpangan proses tender secara aman.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-500" />
                      <span>Anonim & Terenkripsi</span>
                    </div>
                    <a
                      href="https://wbs.kemnaker.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                    >
                      <span>Sampaikan Pengaduan</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Card 4: Ruang Layanan Tatap Muka */}
              <StaggerItem>
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Ruang Layanan Terpadu
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                      Layanan Tatap Muka
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Verifikasi berkas fisik penyedia, penyerahan jaminan pelaksanaan, dan layanan informasi langsung di kantor UKPBJ.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">Gedung A Lt. 4 Kemnaker</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Kementerian+Ketenagakerjaan+RI+Gatot+Subroto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                    >
                      <span>Petunjuk Lokasi Kantor</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
