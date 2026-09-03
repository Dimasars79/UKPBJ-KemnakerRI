"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Target, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { OrganizationChart } from '@/components/ui/OrganizationChart';

export default function TentangPage() {
  const { t } = useLanguage();
  const values = [
    { title: 'Integritas', desc: 'Bertindak jujur, transparan, dan menghindari konflik kepentingan dalam seluruh proses pengadaan.', icon: <ShieldCheck className="w-6 h-6" /> },
    { title: 'Profesionalisme', desc: 'Menjalankan tugas dengan kompetensi tinggi dan sesuai dengan peraturan perundang-undangan.', icon: <Target className="w-6 h-6" /> },
    { title: 'Kolaboratif', desc: 'Membangun kerja sama yang baik dengan seluruh pihak dan pemangku kepentingan.', icon: <Users className="w-6 h-6" /> },
    { title: 'Inovatif', desc: 'Terus mengembangkan sistem dan metode pengadaan untuk mencapai efisiensi maksimal.', icon: <BookOpen className="w-6 h-6" /> },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Institutional Grandeur */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-primary-navy">
          {/* Architectural Background with Deep Navy Vignette Overlay */}
          <div 
            className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-primary-navy/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <FadeIn direction="up">
                {/* Government Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <span>🏛️</span>
                  <span>Profil & Tata Kelola Instansi</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  Unit Kerja Pengadaan <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    Barang & Jasa Kemnaker RI
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8">
                  Pusat keunggulan pengadaan pemerintah yang berpegang teguh pada prinsip transparansi, profesionalisme, dan akuntabilitas berstandar nasional.
                </p>

                {/* Integrity Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-accent-gold" />
                    <span>Zona Integritas Bebas Korupsi</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Standar Pelayanan Prima UKPBJ</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <FadeIn direction="right" className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-t-primary-blue">
              <h2 className="text-2xl font-bold text-primary-navy mb-4">Visi</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                &quot;Menjadi Unit Kerja Pengadaan Barang/Jasa Pemerintah yang Profesional, Modern, dan Berintegritas Tinggi untuk Mewujudkan Pengadaan yang Kredibel dan Akuntabel.&quot;
              </p>
            </FadeIn>
            <FadeIn direction="left" className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-t-accent-gold">
              <h2 className="text-2xl font-bold text-primary-navy mb-4">Misi</h2>
              <ul className="text-slate-600 space-y-3 list-disc pl-5">
                <li>Meningkatkan kualitas sumber daya manusia pengadaan.</li>
                <li>Mewujudkan sistem pengadaan yang transparan dan terintegrasi berbasis teknologi informasi.</li>
                <li>Memberikan pelayanan prima kepada seluruh pemangku kepentingan.</li>
                <li>Menerapkan prinsip tata kelola pemerintahan yang baik (Good Corporate Governance).</li>
              </ul>
            </FadeIn>
          </div>

          <SectionHeading title="Nilai-Nilai Dasar" subtitle="Prinsip yang kami pegang teguh dalam setiap pelaksanaan tugas" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 mb-20">
            {values.map((val, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-primary-navy mb-3">{val.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
              </FadeIn>
            ))}
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 mb-10">
             <SectionHeading title="Struktur Organisasi" subtitle="Bagan struktur kepengurusan UKPBJ" />
             <div className="mt-8">
               <OrganizationChart />
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
