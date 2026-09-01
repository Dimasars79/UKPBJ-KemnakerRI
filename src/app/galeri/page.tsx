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
    { id: 4, title: 'Bimbingan Teknis PBJ', desc: 'Saran: Tambahkan foto pelatihan kompetensi pengadaan barang dan jasa untuk PPK dan Pokja.', size: 'small', src: null },
    { id: 5, title: 'Penandatanganan Kontrak', desc: 'Saran: Tambahkan foto penandatanganan pakta integritas atau kontrak kerja sama strategis.', size: 'small', src: null },
    { id: 6, title: 'Penghargaan UKPBJ', desc: 'Saran: Tambahkan foto pencapaian, sertifikasi, atau penghargaan tingkat nasional.', size: 'small', src: null },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#0d2e57] to-[#113a6e]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-[#f2b33a]/5 rounded-full blur-[100px] mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')] opacity-20 mix-blend-overlay" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction="up">
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-6 text-center">{t('page_galeri.title')}</h1>
              <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg">
                {t('page_galeri.desc')}
              </p>
            </FadeIn>
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
