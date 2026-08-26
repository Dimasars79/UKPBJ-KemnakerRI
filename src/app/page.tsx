import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RoleCard } from '@/components/cards/RoleCard';
import { QuickAccessCard } from '@/components/cards/QuickAccessCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StatisticCard } from '@/components/cards/StatisticCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { AgendaCard } from '@/components/cards/AgendaCard';
import { DocumentCard } from '@/components/cards/DocumentCard';
import { ExternalLinkCard } from '@/components/cards/ExternalLinkCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Building2, Briefcase, Users, Globe, Book, Award, Scale, HelpCircle, AlertCircle, Phone, MessageSquare, ArrowRight, ShieldCheck, FileCheck, CheckCircle2, Eye, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow">
        {/* 6. Hero Section */}
        <section className="relative bg-primary-navy text-white overflow-hidden py-20 lg:py-32">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Pengadaan yang Transparan, <br className="hidden md:block"/> Profesional, dan Akuntabel
              </h1>
              <p className="text-xl md:text-2xl font-medium text-secondary-soft mb-6">
                Unit Kerja Pengadaan Barang/Jasa Kementerian Luar Negeri Republik Indonesia
              </p>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Mendukung pengadaan barang dan jasa yang efektif, efisien, transparan, dan akuntabel untuk Kementerian Luar Negeri dan Perwakilan Republik Indonesia di luar negeri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#layanan" className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors text-center shadow-md border border-blue-500">
                  Lihat Layanan
                </Link>
                <Link href="#informasi" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-md transition-colors text-center border border-white/30">
                  Informasi Pengadaan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Role-Based Access */}
        <section className="py-16 -mt-8 relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-center text-primary-navy mb-8">Bagaimana kami dapat membantu Anda?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RoleCard 
                  title="Pelaku Usaha" 
                  description="Informasi dan layanan bagi penyedia barang dan jasa."
                  icon={Briefcase}
                  href="#"
                />
                <RoleCard 
                  title="Pegawai Kemlu Pusat" 
                  description="Akses informasi dan layanan pengadaan untuk unit kerja pusat."
                  icon={Building2}
                  href="#"
                />
                <RoleCard 
                  title="Perwakilan RI" 
                  description="Informasi pengadaan untuk Perwakilan Republik Indonesia di luar negeri."
                  icon={Globe}
                  href="#"
                />
                <RoleCard 
                  title="Pengguna Lainnya" 
                  description="Akses informasi publik dan layanan UKPBJ."
                  icon={Users}
                  href="#"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Search Experience */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading title="Cari Informasi Pengadaan" centered />
            <SearchBar 
              placeholder="Cari peraturan, panduan, layanan, berita, atau dokumen..." 
              categories={['Peraturan', 'Panduan', 'SOP', 'Tender', 'Layanan']}
            />
          </div>
        </section>

        {/* 9. Quick Access */}
        <section className="py-16 bg-secondary-offwhite" id="informasi">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Akses Cepat" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickAccessCard title="Peraturan & Regulasi" icon={Scale} href="#" />
              <QuickAccessCard title="Panduan PBJ" icon={Book} href="#" />
              <QuickAccessCard title="Sertifikat PBJ" icon={Award} href="#" />
              <QuickAccessCard title="Batasan Nilai PBJ" icon={CheckCircle2} href="#" />
              <QuickAccessCard title="Permintaan Informasi" icon={HelpCircle} href="#" />
              <QuickAccessCard title="Clearing House" icon={ShieldCheck} href="#" />
            </div>
          </div>
        </section>

        {/* 10. Main Services */}
        <section className="py-16 bg-white" id="layanan">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <SectionHeading title="Layanan UKPBJ" />
              <Link href="#" className="hidden md:flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors mb-10">
                Lihat Semua Layanan <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
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
            <div className="mt-8 text-center md:hidden">
              <Link href="#" className="inline-flex items-center justify-center w-full bg-secondary-offwhite text-primary-blue font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors">
                Lihat Semua Layanan <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* 11. Performance Dashboard */}
        <section className="py-16 bg-gradient-to-br from-primary-navy to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Kinerja Pengadaan UKPBJ</h2>
                <p className="text-secondary-soft text-lg">Ringkasan performa pengadaan tahun anggaran berjalan.</p>
                <div className="w-16 h-1 bg-accent-gold mt-4 rounded-full" />
              </div>
              <Link href="#" className="mt-6 md:mt-0 flex items-center bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-bold transition-colors border border-white/20">
                Lihat Dashboard Kinerja <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatisticCard label="Total Paket" value="482" />
              <StatisticCard label="Paket Selesai" value="315" />
              <StatisticCard label="Paket Berjalan" value="84" />
              <StatisticCard label="Nilai Pengadaan" value="2.4" prefix="Rp" />
              <StatisticCard label="Efisiensi" value="14.2" prefix="%" />
              <StatisticCard label="Kepuasan" value="4.8/5" />
            </div>
          </div>
        </section>

        {/* 12. News and Information & 14. Agenda (Side by side on Large Screens) */}
        <section className="py-16 bg-secondary-offwhite">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              <div className="lg:col-span-2">
                <div className="flex justify-between items-end mb-8">
                  <SectionHeading title="Berita & Informasi Terkini" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NewsCard 
                    featured
                    title="Sosialisasi Peraturan LKPP Nomor 122 Tahun 2026 di Lingkungan Kementerian Luar Negeri"
                    summary="UKPBJ Kemlu mengadakan sosialisasi terkait regulasi terbaru mengenai pengadaan barang dan jasa pemerintah guna meningkatkan kepatuhan dan transparansi dalam setiap proses tender di lingkungan kementerian."
                    date="24 Agustus 2026"
                    category="Berita"
                    imageUrl="/placeholder"
                    href="#"
                  />
                  <NewsCard 
                    title="Peningkatan Kapasitas PPK Perwakilan RI Wilayah Eropa"
                    summary="Kegiatan bimbingan teknis yang diselenggarakan khusus untuk Pejabat Pembuat Komitmen di berbagai Perwakilan RI di Eropa."
                    date="20 Agustus 2026"
                    category="Kegiatan"
                    imageUrl="/placeholder"
                    href="#"
                  />
                  <NewsCard 
                    title="Pengumuman Tender Pembangunan Fasilitas Kedutaan"
                    summary="Diumumkan kepada seluruh penyedia barang dan jasa terdaftar mengenai pembukaan tender proyek strategis nasional untuk fasilitas diplomasi."
                    date="18 Agustus 2026"
                    category="Pengadaan"
                    imageUrl="/placeholder"
                    href="#"
                  />
                </div>
                <div className="mt-8">
                  <Link href="#" className="inline-flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors">
                    Lihat Semua Berita <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>

              <div>
                <SectionHeading title="Agenda UKPBJ" />
                <div className="space-y-4">
                  <AgendaCard 
                    date="26" month="Agu"
                    title="Bimbingan Teknis Pengadaan Barang/Jasa"
                    location="Jakarta Pusat"
                    time="14:00 WIB"
                    category="Bimtek"
                  />
                  <AgendaCard 
                    date="02" month="Sep"
                    title="Rapat Evaluasi Kinerja Kuartal III"
                    location="Daring (Zoom)"
                    time="09:00 WIB"
                    category="Evaluasi"
                  />
                  <AgendaCard 
                    date="15" month="Sep"
                    title="Workshop Pemanfaatan E-Katalog Nasional"
                    location="Pusdiklat Kemlu"
                    time="08:30 WIB"
                    category="Workshop"
                  />
                </div>
                <div className="mt-8">
                  <Link href="#" className="inline-flex items-center text-primary-blue font-bold hover:text-primary-navy transition-colors">
                    Lihat Semua Agenda <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 13. Procurement Information Center */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Pusat Informasi Pengadaan" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
              <DocumentCard title="Perpres No. 12 Tahun 2021" category="Peraturan" href="#" />
              <DocumentCard title="Panduan E-Purchasing" category="Panduan" href="#" />
              <DocumentCard title="SOP Penyusunan HPS" category="SOP" href="#" />
              <DocumentCard title="Alur Pengadaan Darurat" category="Infografis" href="#" />
              <DocumentCard title="Jadwal Ujian Sertifikasi" category="Sertifikat PBJ" href="#" />
              <DocumentCard title="Panduan Perhitungan TKDN" category="TKDN" href="#" />
              <DocumentCard title="Dokumen Standar Bidding" category="Tender & Seleksi" href="#" />
              <DocumentCard title="Formulir Konsultasi" category="Clearing House" href="#" />
            </div>
            <div className="mt-10 text-center">
              <Link href="#" className="inline-flex items-center bg-secondary-offwhite text-primary-blue font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-colors border border-slate-200">
                Akses Pustaka Dokumen <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* 15. About UKPBJ */}
        <section className="py-20 bg-primary-navy text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Tentang UKPBJ Kemlu</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              "Unit Kerja Pengadaan Barang/Jasa Kementerian Luar Negeri merupakan pusat keunggulan pengadaan barang/jasa pemerintah di lingkungan Kementerian Luar Negeri dan Perwakilan Republik Indonesia di luar negeri."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-accent-gold">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Profesional</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-accent-gold">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparan</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-accent-gold">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Akuntabel</h3>
              </div>
            </div>
            <Link href="#" className="inline-flex items-center bg-white text-primary-navy font-bold py-3 px-8 rounded-md hover:bg-secondary-offwhite transition-colors">
              Selengkapnya Tentang UKPBJ <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* 16. External Government Links */}
        <section className="py-16 bg-secondary-offwhite">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Tautan Pemerintah & Sistem Pengadaan" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ExternalLinkCard name="Kementerian Luar Negeri" description="Portal Utama Kementerian Luar Negeri RI" href="#" />
              <ExternalLinkCard name="LKPP" description="Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah" href="#" />
              <ExternalLinkCard name="INAPROC" description="Portal Pengadaan Nasional" href="#" />
              <ExternalLinkCard name="LPSE Nasional" description="Layanan Pengadaan Secara Elektronik Nasional" href="#" />
              <ExternalLinkCard name="E-Katalog" description="Katalog Elektronik LKPP" href="#" />
              <ExternalLinkCard name="SIRUP" description="Sistem Informasi Rencana Umum Pengadaan" href="#" />
            </div>
          </div>
        </section>

        {/* 17. Contact Section */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-primary-navy mb-4">Memerlukan Informasi Lebih Lanjut?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Hubungi UKPBJ Kementerian Luar Negeri untuk mendapatkan informasi dan layanan pengadaan yang Anda butuhkan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link href="#" className="flex justify-center items-center bg-primary-blue text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Kami
              </Link>
              <Link href="#" className="flex justify-center items-center bg-white text-primary-navy font-bold py-3 px-8 rounded-md border border-slate-200 hover:bg-secondary-offwhite transition-colors">
                <HelpCircle className="w-5 h-5 mr-2" />
                Pertanyaan Umum
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-sm text-slate-500 font-medium">
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2 text-primary-blue" />
                ukpbj@kemlu.go.id
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2 text-primary-blue" />
                (021) 344 1508
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-blue" />
                Jl. Taman Pejambon No. 6, Jakarta
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
