import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Briefcase, Users, Globe, HelpCircle, AlertCircle, MessageSquare, ArrowRight, ShieldCheck, FileCheck, Eye, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative bg-primary-navy text-white overflow-hidden py-20 lg:py-32">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image 
              src="/hero-bg.png" 
              alt="Gedung Kementerian Luar Negeri" 
              fill
              className="object-cover opacity-40 mix-blend-overlay"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/90 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <FadeIn direction="left" delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Pengadaan yang Transparan, <br className="hidden md:block"/> Profesional, dan Akuntabel
                </h1>
              </FadeIn>
              <FadeIn direction="left" delay={0.3}>
                <p className="text-xl md:text-2xl font-medium text-secondary-soft mb-6">
                  Unit Kerja Pengadaan Barang/Jasa Kementerian Luar Negeri
                </p>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                  Berkomitmen menghadirkan ekosistem pengadaan yang berintegritas, efisien, dan inovatif guna mewujudkan tata kelola pemerintahan yang unggul dan tepercaya.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#profil" className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors text-center shadow-md border border-blue-500">
                    Profil UKPBJ
                  </Link>
                  <Link href="#layanan" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-md transition-colors text-center border border-white/30">
                    Layanan Kami
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Marquee Text */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-primary-navy/40 py-3 border-t border-white/10 z-20 backdrop-blur-sm">
            <p className="animate-marquee whitespace-nowrap text-xs md:text-sm font-bold tracking-[0.25em] text-accent-gold">
              TRANSPARENT PROCUREMENT &bull; PROFESSIONAL SERVICE &bull; ACCOUNTABLE GOVERNANCE &bull; GLOBAL CONNECTION &nbsp;&nbsp;&nbsp;&nbsp; TRANSPARENT PROCUREMENT &bull; PROFESSIONAL SERVICE &bull; ACCOUNTABLE GOVERNANCE &bull; GLOBAL CONNECTION &nbsp;&nbsp;&nbsp;&nbsp; TRANSPARENT PROCUREMENT &bull; PROFESSIONAL SERVICE &bull; ACCOUNTABLE GOVERNANCE &bull; GLOBAL CONNECTION
            </p>
          </div>
        </section>

        {/* 2. Profil UKPBJ (Prioritized) */}
        <section className="py-20 bg-white" id="profil">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <FadeIn direction="right" className="lg:w-1/3 flex justify-center">
                <Image src="/logo-ukpbj-kemnaker.png" alt="Logo UKPBJ" width={400} height={145} className="w-64 md:w-80 h-auto object-contain drop-shadow-2xl" />
              </FadeIn>
              
              <div className="lg:w-2/3">
                <FadeIn direction="left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-navy">Profil UKPBJ</h2>
                  <div className="w-16 h-1 bg-accent-gold mb-8 rounded-full" />
                  <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                    &quot;Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Luar Negeri merupakan pusat keunggulan pengadaan barang/jasa pemerintah yang berkomitmen untuk mewujudkan proses pengadaan yang berkualitas.&quot;
                  </p>
                </FadeIn>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                  <StaggerItem>
                    <div className="flex flex-col">
                      <div className="w-14 h-14 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-primary-navy">Profesional</h3>
                      <p className="text-slate-500 text-sm">SDM yang kompeten dan berintegritas tinggi.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col">
                      <div className="w-14 h-14 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                        <Eye className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-primary-navy">Transparan</h3>
                      <p className="text-slate-500 text-sm">Proses yang terbuka dan dapat diawasi publik.</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col">
                      <div className="w-14 h-14 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                        <FileCheck className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-primary-navy">Akuntabel</h3>
                      <p className="text-slate-500 text-sm">Dapat dipertanggungjawabkan sesuai peraturan.</p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Performance Dashboard */}
        <section className="py-16 bg-slate-50 border-y border-slate-100" id="kinerja">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <FadeIn direction="left" className="mb-6 md:mb-0">
                <SectionHeading title="Dashboard Kinerja" />
                <p className="text-slate-600 max-w-2xl mt-2">
                  Transparansi capaian kinerja pengadaan barang dan jasa di lingkungan Kementerian Luar Negeri.
                </p>
              </FadeIn>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StaggerItem>
                <div className="bg-primary-navy text-white rounded-xl p-6 shadow-md h-full">
                  <h4 className="text-lg font-bold mb-2">Total Penghematan</h4>
                  <p className="text-3xl font-extrabold text-accent-gold">Rp 12.4 Miliar</p>
                  <p className="text-sm text-slate-300 mt-2">Tahun Anggaran 2024</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-full">
                  <h4 className="text-lg font-bold text-primary-navy mb-2">Paket Selesai</h4>
                  <p className="text-3xl font-extrabold text-primary-blue">440 Paket</p>
                  <p className="text-sm text-slate-500 mt-2">Dari total 498 target paket</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-full">
                  <h4 className="text-lg font-bold text-primary-navy mb-2">Efisiensi Waktu</h4>
                  <p className="text-3xl font-extrabold text-primary-blue">14 Hari</p>
                  <p className="text-sm text-slate-500 mt-2">Rata-rata proses pemilihan</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FadeIn direction="up" delay={0.2}>
                <PerformanceChart />
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <EfficiencyChart />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. Main Services (Tempat untuk services nantinya) */}
        <section className="py-16 bg-secondary-offwhite" id="layanan">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex justify-between items-end mb-10">
                <SectionHeading title="Layanan UKPBJ" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StaggerItem>
                <ServiceCard 
                  title="LPSE" 
                  description="Layanan Pengadaan Secara Elektronik untuk proses tender dan seleksi penyedia barang/jasa."
                  icon={Globe}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Permintaan Informasi" 
                  description="Akses layanan permohonan informasi publik terkait kegiatan pengadaan barang/jasa."
                  icon={HelpCircle}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Pelatihan & Bimtek" 
                  description="Program peningkatan kapasitas dan kompetensi SDM di bidang pengadaan barang/jasa."
                  icon={Users}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Clearing House" 
                  description="Fasilitasi penyelesaian permasalahan dan konsultasi khusus pengadaan barang/jasa."
                  icon={ShieldCheck}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Pengaduan" 
                  description="Saluran resmi penyampaian pengaduan masyarakat terkait proses pengadaan."
                  icon={AlertCircle}
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <ServiceCard 
                  title="Konsultasi PBJ" 
                  description="Layanan konsultasi umum mengenai kebijakan dan regulasi pengadaan barang/jasa."
                  icon={MessageSquare}
                  href="#"
                />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* 4. News and Information */}
        <section className="py-16 bg-white" id="berita">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <FadeIn>
              <div className="flex justify-between items-end mb-8">
                <SectionHeading title="Berita & Informasi Terkini" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <NewsCard 
                  featured={false}
                  title="Sosialisasi Peraturan Pengadaan Terbaru"
                  summary="UKPBJ Kementerian Luar Negeri mengadakan sosialisasi terkait regulasi terbaru mengenai pengadaan barang dan jasa pemerintah."
                  date="24 Agustus 2026"
                  category="Berita"
                  imageUrl="/placeholder"
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <NewsCard 
                  title="Peningkatan Kapasitas PPK"
                  summary="Kegiatan bimbingan teknis yang diselenggarakan khusus untuk Pejabat Pembuat Komitmen Kementerian Luar Negeri."
                  date="20 Agustus 2026"
                  category="Kegiatan"
                  imageUrl="/placeholder"
                  href="#"
                />
              </StaggerItem>
              <StaggerItem>
                <NewsCard 
                  title="Pengumuman Tender Pembangunan Fasilitas"
                  summary="Diumumkan kepada seluruh penyedia barang dan jasa terdaftar mengenai pembukaan tender."
                  date="18 Agustus 2026"
                  category="Pengadaan"
                  imageUrl="/placeholder"
                  href="#"
                />
              </StaggerItem>
            </StaggerContainer>
            <FadeIn direction="up" delay={0.4} className="mt-8 text-center">
              <Link href="#" className="inline-flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors">
                Lihat Semua Berita <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* 5. Agenda & Poster Kegiatan */}
        <section className="py-20 bg-primary-navy text-white relative overflow-hidden" id="agenda">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-accent-gold font-medium text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Agenda Mendatang</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Bimbingan Teknis Pengadaan Barang & Jasa Pemerintah
                </h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Tingkatkan kompetensi dan pemahaman Anda seputar regulasi terbaru pengadaan barang dan jasa pemerintah melalui bimbingan teknis komprehensif bersama pakar dan praktisi dari LKPP.
                </p>
                <StaggerContainer className="space-y-4 mb-8">
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent-gold">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Sabtu, 26 Oktober 2026</h4>
                        <p className="text-slate-400">08:30 - 16:30 WIB</p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg text-accent-gold">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Auditorium Utama</h4>
                        <p className="text-slate-400">Gedung Pusat LKPP, Jakarta Pusat</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
                <Link href="#" className="inline-flex justify-center items-center bg-accent-gold hover:bg-yellow-500 text-primary-navy font-bold py-3 px-8 rounded-md transition-colors shadow-lg">
                  Daftar Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </FadeIn>
              <FadeIn direction="left" delay={0.2} className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <Image 
                  src="/poster_kegiatan.jpg" 
                  alt="Poster Bimbingan Teknis Pengadaan Barang dan Jasa" 
                  width={800} 
                  height={800} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">Klik gambar untuk mengunduh resolusi tinggi.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
