import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

export default function GaleriPage() {
  const dummyImages = [
    { id: 1, title: 'Rapat Koordinasi Nasional', desc: 'Rapat koordinasi seluruh anggota UKPBJ kementerian.', size: 'large' },
    { id: 2, title: 'Penghargaan Kinerja', desc: 'Penghargaan UKPBJ Terbaik 2025.', size: 'small' },
    { id: 3, title: 'Sosialisasi E-Katalog', desc: 'Sosialisasi e-katalog lokal bersama vendor.', size: 'small' },
    { id: 4, title: 'Bimtek PBJ', desc: 'Bimbingan teknis peraturan pengadaan terbaru.', size: 'small' },
    { id: 5, title: 'Kunjungan Kerja', desc: 'Kunjungan kerja ke UKPBJ Provinsi.', size: 'small' },
    { id: 6, title: 'Pelantikan Pejabat', desc: 'Pelantikan pejabat pembuat komitmen baru.', size: 'large' },
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
          <div className="absolute inset-0 bg-blue-900/20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction="up">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">Galeri Dokumentasi</h1>
              <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg">
                Rekam jejak visual dari setiap kegiatan, program kerja, dan pencapaian UKPBJ.
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
                <div className={`w-full bg-slate-200 ${img.size === 'large' ? 'h-[400px]' : 'h-[192px]'} flex items-center justify-center`}>
                  {/* Placeholder Background with subtle pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 to-primary-navy/80 mix-blend-multiply" />
                  <span className="text-slate-400 font-bold z-0 opacity-30 text-2xl">FOTO {img.id}</span>
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
