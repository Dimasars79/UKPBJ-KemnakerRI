"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

export default function GaleriPage() {
  const { t } = useLanguage();

  const dummyImages = [
    { id: 1, title: 'Kunjungan Kerja', desc: 'Kunjungan dan koordinasi pimpinan dengan jajaran pengurus.', size: 'large', src: '/gallery/gallery-1.jpg' },
    { id: 2, title: 'Rapat Koordinasi Nasional', desc: 'Rapat koordinasi pimpinan mengenai evaluasi kinerja tahunan.', size: 'large', src: '/gallery/gallery-2.jpg' },
    { id: 3, title: 'Sosialisasi Pegawai', desc: 'Acara sosialisasi dan interaksi langsung dengan seluruh peserta.', size: 'large', src: '/gallery/gallery-3.jpg' },
    { id: 4, title: 'Bimbingan Teknis PBJ', desc: 'Pelatihan kompetensi pengadaan barang dan jasa untuk PPK dan Pokja.', size: 'small', src: '/gallery/gallery-4.jpg' },
    { id: 5, title: 'Penandatanganan Kontrak', desc: 'Penandatanganan pakta integritas dan kontrak kerja sama strategis.', size: 'small', src: '/gallery/gallery-5.jpg' },
    { id: 6, title: 'Penghargaan UKPBJ', desc: 'Penyerahan penghargaan UKPBJ Unggul tingkat kementerian.', size: 'small', src: '/gallery/gallery-6.jpg' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Official Media Archives & Documentation Theme */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#080E1A] via-[#101C33] to-[#0A1120]">
          {/* Spotlight & Fine Dot Matrix Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf812_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -top-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                {/* Government Media Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <span>📸</span>
                  <span>Dokumentasi & Arsip Resmi Kemnaker</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  Galeri Foto & Dokumentasi <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-slate-100 to-amber-200">
                    Kegiatan Kerja Pengadaan
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
                  {t('page_galeri.desc')}
                </p>

                {/* Media Tags */}
                <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">📷 Kunjungan Kerja</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">🏛️ Rapat Koordinasi Nasional</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">🎓 Bimbingan Teknis PBJ</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <SectionHeading title="Foto Kegiatan" subtitle="Dokumentasi terbaru" />
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {dummyImages.map((img) => (
              <StaggerItem 
                key={img.id} 
                className={`relative group overflow-hidden rounded-xl shadow-sm ${img.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`w-full bg-slate-200 ${img.size === 'large' ? 'h-[400px]' : 'h-[192px]'} flex items-center justify-center relative`}>
                  {img.src ? (
                    <Image 
                      src={img.src} 
                      alt={img.title} 
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <>
                      {/* Placeholder Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 to-primary-navy/80 mix-blend-multiply" />
                      <span className="text-slate-400 font-bold z-0 opacity-30 text-2xl text-center px-4">
                        (Belum Ada Foto)
                      </span>
                    </>
                  )}
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-primary-navy/20 pointer-events-none" />
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                  <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{img.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
