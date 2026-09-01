import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AgendaCard } from '@/components/cards/AgendaCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

export default function AgendaPage() {
  const dummyAgendas = [
    { title: 'Pembukaan Tender Konstruksi Gedung A', date: '20', month: 'Okt', time: '09:00 - 12:00 WIB', location: 'Gedung Utama Kemnaker', category: 'Tender' },
    { title: 'Sosialisasi E-Katalog Sektoral Baru', date: '25', month: 'Okt', time: '13:00 - 15:00 WIB', location: 'Zoom Meeting', category: 'Sosialisasi' },
    { title: 'Ujian Sertifikasi PBJ Tingkat Dasar', date: '02', month: 'Nov', time: '08:00 - 16:00 WIB', location: 'Pusdiklat Kemnaker', category: 'Sertifikasi' },
    { title: 'Rapat Evaluasi Kinerja Vendor Q3', date: '10', month: 'Nov', time: '10:00 - 14:00 WIB', location: 'Ruang Rapat UKPBJ', category: 'Rapat' },
    { title: 'Bimbingan Teknis Penggunaan SIKaP', date: '15', month: 'Nov', time: '09:00 - 12:00 WIB', location: 'Zoom Meeting', category: 'Bimtek' },
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
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">Agenda & Kegiatan</h1>
              <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg">
                Jadwal lengkap kegiatan, tender, sosialisasi, dan pelatihan di lingkungan UKPBJ Kementerian.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <SectionHeading title="Kegiatan Mendatang" subtitle="Agenda resmi yang akan diselenggarakan dalam waktu dekat" />
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <select className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue">
                <option>Semua Kategori</option>
                <option>Tender</option>
                <option>Sosialisasi</option>
                <option>Sertifikasi</option>
              </select>
              <select className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue">
                <option>Bulan Ini</option>
                <option>Bulan Depan</option>
              </select>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyAgendas.map((agenda, idx) => (
              <StaggerItem key={idx}>
                <AgendaCard {...agenda} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-12 text-center">
            <button className="bg-white border border-slate-200 hover:border-primary-blue text-primary-navy font-bold py-3 px-8 rounded-md transition-colors shadow-sm">
              Muat Lebih Banyak
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
