import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Briefcase, Users, Globe, HelpCircle, AlertCircle, MessageSquare, ArrowRight, ShieldCheck, FileCheck, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Pengadaan yang Transparan, <br className="hidden md:block"/> Profesional, dan Akuntabel
              </h1>
              <p className="text-xl md:text-2xl font-medium text-secondary-soft mb-6">
                Unit Kerja Pengadaan Barang/Jasa Kementerian Luar Negeri
              </p>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Mendukung pengadaan barang dan jasa yang efektif, efisien, transparan, dan akuntabel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#profil" className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors text-center shadow-md border border-blue-500">
                  Profil UKPBJ
                </Link>
                <Link href="#layanan" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-md transition-colors text-center border border-white/30">
                  Layanan Kami
                </Link>
              </div>
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
        <section className="py-20 bg-white text-center" id="profil">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-primary-navy">Profil UKPBJ</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              "Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Luar Negeri merupakan pusat keunggulan pengadaan barang/jasa pemerintah yang berkomitmen untuk mewujudkan proses pengadaan yang berkualitas."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-navy">Profesional</h3>
                <p className="text-slate-500 text-sm">SDM yang kompeten dan berintegritas tinggi.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-navy">Transparan</h3>
                <p className="text-slate-500 text-sm">Proses yang terbuka dan dapat diawasi publik.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary-offwhite flex items-center justify-center mb-4 text-primary-blue shadow-sm">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-navy">Akuntabel</h3>
                <p className="text-slate-500 text-sm">Dapat dipertanggungjawabkan sesuai peraturan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Main Services (Tempat untuk services nantinya) */}
        <section className="py-16 bg-secondary-offwhite" id="layanan">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <SectionHeading title="Layanan UKPBJ" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="LPSE" 
                description="Layanan Pengadaan Secara Elektronik untuk proses tender dan seleksi penyedia barang/jasa."
                icon={Globe}
                href="#"
              />
              <ServiceCard 
                title="Permintaan Informasi" 
                description="Akses layanan permohonan informasi publik terkait kegiatan pengadaan barang/jasa."
                icon={HelpCircle}
                href="#"
              />
              <ServiceCard 
                title="Pelatihan & Bimtek" 
                description="Program peningkatan kapasitas dan kompetensi SDM di bidang pengadaan barang/jasa."
                icon={Users}
                href="#"
              />
              <ServiceCard 
                title="Clearing House" 
                description="Fasilitasi penyelesaian permasalahan dan konsultasi khusus pengadaan barang/jasa."
                icon={ShieldCheck}
                href="#"
              />
              <ServiceCard 
                title="Pengaduan" 
                description="Saluran resmi penyampaian pengaduan masyarakat terkait proses pengadaan."
                icon={AlertCircle}
                href="#"
              />
              <ServiceCard 
                title="Konsultasi PBJ" 
                description="Layanan konsultasi umum mengenai kebijakan dan regulasi pengadaan barang/jasa."
                icon={MessageSquare}
                href="#"
              />
            </div>
          </div>
        </section>

        {/* 4. News and Information */}
        <section className="py-16 bg-white" id="berita">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
              <SectionHeading title="Berita & Informasi Terkini" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NewsCard 
                featured={false}
                title="Sosialisasi Peraturan Pengadaan Terbaru"
                summary="UKPBJ Kementerian Luar Negeri mengadakan sosialisasi terkait regulasi terbaru mengenai pengadaan barang dan jasa pemerintah."
                date="24 Agustus 2026"
                category="Berita"
                imageUrl="/placeholder"
                href="#"
              />
              <NewsCard 
                title="Peningkatan Kapasitas PPK"
                summary="Kegiatan bimbingan teknis yang diselenggarakan khusus untuk Pejabat Pembuat Komitmen Kementerian Luar Negeri."
                date="20 Agustus 2026"
                category="Kegiatan"
                imageUrl="/placeholder"
                href="#"
              />
              <NewsCard 
                title="Pengumuman Tender Pembangunan Fasilitas"
                summary="Diumumkan kepada seluruh penyedia barang dan jasa terdaftar mengenai pembukaan tender."
                date="18 Agustus 2026"
                category="Pengadaan"
                imageUrl="/placeholder"
                href="#"
              />
            </div>
            <div className="mt-8 text-center">
              <Link href="#" className="inline-flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors">
                Lihat Semua Berita <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
