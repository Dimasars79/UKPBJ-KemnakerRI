import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DocumentCard } from '@/components/cards/DocumentCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { Search } from 'lucide-react';

export default function InformasiPage() {
  const dummyDocs = [
    { title: 'Peraturan Presiden No. 16 Tahun 2018', category: 'Regulasi', href: '#' },
    { title: 'Peraturan Presiden No. 12 Tahun 2021', category: 'Regulasi', href: '#' },
    { title: 'SOP Pengadaan Barang/Jasa Secara Elektronik', category: 'SOP', href: '#' },
    { title: 'Surat Edaran Kepala LKPP No. 3 Tahun 2023', category: 'Edaran', href: '#' },
  ];

  const dummyNews = [
    { title: 'Peningkatan Kapasitas SDM Pengadaan', summary: 'Bimbingan teknis terbaru untuk seluruh anggota Pokja UKPBJ.', date: '12 Okt 2026', category: 'Berita', href: '#', imageUrl: '/poster_kegiatan_1787841596732.jpg' },
    { title: 'Pembaruan Sistem SPSE v4.5', summary: 'Jadwal maintenance dan panduan penggunaan sistem SPSE terbaru.', date: '08 Okt 2026', category: 'Pengumuman', href: '#', imageUrl: '/poster_kegiatan_1787841596732.jpg' },
    { title: 'Sosialisasi E-Katalog Sektoral', summary: 'Kemnaker mengadakan sosialisasi terkait produk dalam negeri.', date: '01 Okt 2026', category: 'Berita', href: '#', imageUrl: '/poster_kegiatan_1787841596732.jpg' },
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
          <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction="up">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">Pusat Informasi & Regulasi</h1>
              <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg mb-10">
                Temukan berbagai dokumen penting, regulasi terbaru, panduan, serta pengumuman resmi terkait pengadaan barang/jasa.
              </p>
              
              {/* Search Bar Mockup */}
              <div className="max-w-2xl mx-auto flex items-center bg-white rounded-full p-2 shadow-lg">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Cari dokumen, peraturan, atau pengumuman..." 
                  className="w-full bg-transparent border-none focus:ring-0 px-4 py-2 text-slate-700 outline-none"
                />
                <button className="bg-accent-gold hover:bg-yellow-600 text-primary-navy font-bold py-2 px-6 rounded-full transition-colors">
                  Cari
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 mb-16">
            <SectionHeading title="Dokumen & Regulasi" subtitle="Unduh peraturan dan standar operasional prosedur terbaru" />
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {dummyDocs.map((doc, idx) => (
                <StaggerItem key={idx}>
                  <DocumentCard {...doc} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <div className="mt-8 text-center">
              <button className="text-primary-blue font-semibold hover:underline">Lihat Semua Dokumen &rarr;</button>
            </div>
          </div>
          
          <div className="mt-20">
            <SectionHeading title="Berita & Pengumuman" subtitle="Informasi terkini seputar kegiatan UKPBJ" />
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {dummyNews.map((news, idx) => (
                <StaggerItem key={idx}>
                  <NewsCard {...news} />
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
