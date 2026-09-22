"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  ShieldCheck, FileText, BarChart3, HelpCircle, 
  Video, BookOpen, ExternalLink, ChevronRight, 
  Building2, Calculator, Layers
} from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TKDNPage() {
  const { trans } = useLanguage();
  const [bahanBaku, setBahanBaku] = useState(45);
  const [tenagaKerja, setTenagaKerja] = useState(30);
  const [alatKerja, setAlatKerja] = useState(25);
  const [activeTab, setActiveTab] = useState<'flow' | 'calculator'>('flow');

  // Simple TKDN weighted score calculation
  const totalTKDN = Math.min(100, Math.round((bahanBaku * 0.5) + (tenagaKerja * 0.3) + (alatKerja * 0.2)));

  const flowSteps = [
    {
      step: 1,
      title: trans('Penghitungan Mandiri (Self-Assessment)', 'Self-Assessment Calculation'),
      desc: trans('Perusahaan melakukan penghitungan estimasi nilai persentase TKDN produk secara mandiri sesuai pedoman teknis kementerian.', 'The company calculates the estimated percentage of product TKDN independently in accordance with ministry technical guidelines.'),
      tag: trans('Langkah 1', 'Step 1')
    },
    {
      step: 2,
      title: trans('Permohonan Melalui Akun SIINas', 'Application via SIINas Account'),
      desc: trans('Ajukan permohonan penerbitan sertifikat TKDN IK secara online melalui portal Sistem Informasi Industri Nasional (SIINas).', 'Submit an application for the issuance of small industry TKDN certificate online through the SIINas portal.'),
      tag: trans('Langkah 2', 'Step 2')
    },
    {
      step: 3,
      title: trans('Input Data Perusahaan & Bukti Produksi', 'Company Data & Production Evidence Input'),
      desc: trans('Lengkapi profil industri, legalitas NIB, bukti pembelian bahan baku lokal, serta dokumentasi fasilitas proses produksi.', 'Complete the industrial profile, NIB legality, proof of local raw material purchase, and documentation of production facilities.'),
      tag: trans('Langkah 3', 'Step 3')
    },
    {
      step: 4,
      title: trans('Verifikasi Data oleh Kelompok Kerja', 'Data Verification by Working Group'),
      desc: trans('Tunggu proses verifikasi dan validasi lapangan oleh Kelompok Kerja Verifikasi P3DN (Maksimal 5 hari kerja setelah dokumen lengkap).', 'Wait for verification and validation by the P3DN Verification Working Group (Max 5 working days after documents are complete).'),
      tag: trans('Langkah 4', 'Step 4')
    },
    {
      step: 5,
      title: trans('Penerbitan Sertifikat TKDN Mandiri', 'Self-Issuance of TKDN Certificate'),
      desc: trans('Setelah disetujui, Sertifikat TKDN resmi berbarcode tanda tangan elektronik dapat langsung dicetak secara mandiri dan berlaku nasional.', 'Once approved, the official TKDN certificate with electronic signature barcode can be printed directly and is valid nationwide.'),
      tag: trans('Langkah 5 (Selesai)', 'Step 5 (Completed)')
    }
  ];

  const serviceCards = [
    {
      title: trans('Sertifikat Terdaftar', 'Registered Certificates'),
      desc: trans('Data Sertifikat TKDN dan Bobot Manfaat Perusahaan (BMP) yang telah diterbitkan secara resmi.', 'Official data on issued TKDN and Company Benefit Weight (BMP) certificates.'),
      icon: <FileText className="w-5 h-5" />,
      href: 'https://tkdn.kemenperin.go.id/sertifikat.php',
      tag: trans('Database Resmi', 'Official Database')
    },
    {
      title: trans('Rekapitulasi Produk', 'Product Summary'),
      desc: trans('Rekapitulasi capaian Sertifikat TKDN berdasarkan kelompok barang, sektor industri, dan sebaran wilayah.', 'Summary of TKDN Certificate achievements by product group, industry sector, and regional distribution.'),
      icon: <BarChart3 className="w-5 h-5" />,
      href: 'https://tkdn.kemenperin.go.id/rekap.php',
      tag: trans('Statistik P3DN', 'P3DN Statistics')
    },
    {
      title: trans('TKDN Industri Kecil (IK)', 'Small Industry (IK) TKDN'),
      desc: trans('Fasilitas sertifikasi TKDN gratis khusus pelaku usaha mikro dan industri kecil dalam pengadaan pemerintah.', 'Free TKDN certification facility specifically for micro and small industry enterprises in public procurement.'),
      icon: <ShieldCheck className="w-5 h-5" />,
      href: 'https://siinas.kemenperin.go.id',
      tag: trans('Fasilitasi Gratis', 'Free Facility')
    },
    {
      title: trans('FAQ & Tanya Jawab', 'FAQ & Questions'),
      desc: trans('Informasi komprehensif mengenai kebijakan P3DN, ketentuan minimal 40% TKDN, dan mekanisme sertifikasi.', 'Comprehensive information regarding P3DN policies, the minimum 40% TKDN requirement, and certification mechanisms.'),
      icon: <HelpCircle className="w-5 h-5" />,
      href: '#faq',
      tag: trans('Pusat Bantuan', 'Help Center')
    },
    {
      title: trans('Regulasi P3DN', 'P3DN Regulations'),
      desc: trans('Kumpulan Undang-Undang, Perpres No. 12/2021, dan Permenperin tentang kewajiban penggunaan produk lokal.', 'Collection of Laws, Presidential Regulation No. 12/2021, and Ministerial Regulations on local product usage obligations.'),
      icon: <BookOpen className="w-5 h-5" />,
      href: '/informasi/peraturan',
      tag: trans('Dasar Hukum', 'Legal Basis')
    },
    {
      title: trans('Video Panduan', 'Video Guides'),
      desc: trans('Tutorial visual langkah-demi-langkah tata cara pendaftaran akun SIINas dan pengajuan berkas verifikasi.', 'Step-by-step visual tutorials on SIINas account registration and verification document submission procedures.'),
      icon: <Video className="w-5 h-5" />,
      href: 'https://www.youtube.com/@kemenperin_ri',
      tag: trans('Video Tutorial', 'Video Tutorial')
    },
    {
      title: trans('Katalog Referensi Produk', 'Product Reference Catalog'),
      desc: trans('Daftar produk barang dan jasa dalam negeri yang siap dibeli melalui E-Katalog Nasional & Sektoral.', 'List of domestic goods and services products ready for purchase via National & Sectoral E-Catalog.'),
      icon: <Layers className="w-5 h-5" />,
      href: 'https://katalog.inaproc.id/',
      tag: trans('E-Katalog LKPP', 'LKPP E-Catalog')
    },
    {
      title: trans('Portal SIINas Kemenperin', 'MoI SIINas Portal'),
      desc: trans('Akses langsung ke portal registrasi dan login Sistem Informasi Industri Nasional Kementerian Perindustrian.', 'Direct access to the National Industrial Information System portal of the Ministry of Industry.'),
      icon: <Building2 className="w-5 h-5" />,
      href: 'https://siinas.kemenperin.go.id',
      tag: trans('Portal Layanan', 'Service Portal')
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
          {/* Background Patterns & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c712_1px,transparent_1px),linear-gradient(to_bottom,#0284c712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">{trans('Beranda', 'Home')}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">{trans('Informasi', 'Information')}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">{trans('Pengajuan Sertifikasi TKDN', 'TKDN Certification Submission')}</span>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                {/* Formal Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{trans('Program P3DN & Sertifikasi TKDN Nasional', 'National P3DN Program & TKDN Certification')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                  {trans('Sertifikasi TKDN Industri Kecil & Menengah', 'Small & Medium Industry TKDN Certification')}
                </h1>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                  {trans('Fasilitas sertifikasi Tingkat Komponen Dalam Negeri (TKDN) gratis bagi pelaku usaha dalam negeri untuk memperkuat daya saing pada pengadaan barang/jasa pemerintah.', 'Free Domestic Component Level (TKDN) certification facility for domestic enterprises to strengthen competitiveness in government procurement.')}
                </p>

                {/* Top Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://siinas.kemenperin.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <span>{trans('Ajukan Sertifikat via SIINas', 'Apply Certificate via SIINas')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveTab(activeTab === 'calculator' ? 'flow' : 'calculator')}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all"
                  >
                    <Calculator className="w-4 h-4 text-accent-gold" />
                    <span>{activeTab === 'calculator' ? trans('Lihat Alur 5 Tahapan', 'View 5-Step Flow') : trans('Simulasi Hitung TKDN', 'TKDN Calculator Simulation')}</span>
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ALUR 5 TAHAP PENGAJUAN / KALKULATOR */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-5 sm:-mt-6 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200/80">
            
            {activeTab === 'flow' ? (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-8 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-primary-blue bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
                      {trans('Mekanisme Resmi Kemenperin RI', 'Official Ministry of Industry Mechanism')}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-navy mt-2 leading-snug">
                      {trans('5 Tahapan Alur Pengajuan Sertifikasi TKDN IK (Gratis)', '5 Steps of Small Industry TKDN Certification Submission (Free)')}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {trans('Proses verifikasi data dilaksanakan maksimal 5 (lima) hari kerja setelah seluruh berkas dinyatakan lengkap.', 'The data verification process takes a maximum of 5 (five) working days after all documents are declared complete.')}
                    </p>
                  </div>
                </div>

                {/* 5 Flow Steps Grid - 1 col on mobile, 2 cols on small tablet, 3 cols on iPad/Tablet, 5 cols on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
                  {flowSteps.map((step, idx) => (
                    <div 
                      key={step.step}
                      className="bg-slate-50/80 hover:bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 border border-slate-200/80 hover:border-primary-blue/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary-navy text-accent-gold text-xs font-black flex items-center justify-center shadow-xs">
                            {step.step}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {step.tag}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-primary-blue transition-colors mb-1 sm:mb-2 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/50 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slate-400 group-hover:text-primary-navy">
                        <span>{trans(`Tahap ${idx + 1}`, `Stage ${idx + 1}`)}</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* TKDN Interactive Calculator Tool */
              <div>
                <div className="pb-4 sm:pb-6 border-b border-slate-100 mb-5 sm:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-navy mt-1 leading-snug">
                    {trans('Kalkulator Simulasi Estimasi Nilai TKDN', 'TKDN Estimated Value Simulation Calculator')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {trans('Geser parameter di bawah untuk mensimulasikan persentase kandungan komponen lokal pada barang/jasa Anda.', 'Slide parameters below to simulate domestic component percentage on your goods/services.')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="md:col-span-7 space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>{trans('Komponen Bahan Baku Lokal:', 'Local Raw Material Component:')}</span>
                        <span className="text-primary-blue font-extrabold">{bahanBaku}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={bahanBaku}
                        onChange={(e) => setBahanBaku(Number(e.target.value))}
                        className="w-full accent-primary-blue h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>{trans('Tenaga Kerja Warga Negara Indonesia (WNI):', 'Indonesian Citizen (WNI) Labor:')}</span>
                        <span className="text-primary-blue font-extrabold">{tenagaKerja}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={tenagaKerja}
                        onChange={(e) => setTenagaKerja(Number(e.target.value))}
                        className="w-full accent-primary-blue h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>{trans('Fasilitas Mesin & Peralatan Kerja Lokal:', 'Local Machinery & Work Equipment Facility:')}</span>
                        <span className="text-primary-blue font-extrabold">{alatKerja}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={alatKerja}
                        onChange={(e) => setAlatKerja(Number(e.target.value))}
                        className="w-full accent-primary-blue h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-gradient-to-br from-primary-navy to-[#113264] rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg flex flex-col justify-center items-center">
                    <span className="text-[11px] sm:text-xs font-semibold text-blue-200 uppercase tracking-wider">{trans('Estimasi Nilai TKDN Anda', 'Your Estimated TKDN Value')}</span>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-accent-gold my-2 sm:my-3 tracking-tight">
                      {totalTKDN}%
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 bg-white/10 text-white">
                      {totalTKDN >= 40 ? trans('✓ Memenuhi Syarat Preferensi PBJ (≥ 40%)', '✓ Meets PBJ Preference Criteria (≥ 40%)') : trans('Belum Memenuhi Ambang 40%', 'Does Not Meet 40% Threshold')}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      {trans('Produk dengan nilai TKDN ≥ 40% mendapatkan prioritas utama dalam belanja barang/jasa APBN/APBD kementerian.', 'Products with TKDN value ≥ 40% receive top priority in ministry APBN/APBD procurement.')}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 8 PUSAT LAYANAN & NAVIGASI TKDN */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-bold text-primary-navy bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
              {trans('Pusat Data & Layanan Terpadu', 'Integrated Data & Service Center')}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-navy mt-2.5 sm:mt-3 tracking-tight">
              {trans('Akses Cepat Layanan & Database TKDN', 'Quick Access to TKDN Services & Database')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 sm:mt-2">
              {trans('Pilih menu navigasi di bawah untuk mengakses sertifikat, rekapitulasi, regulasi, dan petunjuk teknis.', 'Select navigation options below to access certificates, summaries, regulations, and technical guidelines.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {serviceCards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-primary-navy group-hover:text-white transition-colors shadow-2xs shrink-0">
                      {card.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors mb-1 sm:mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                  <span>{trans('Akses Menu', 'Access Menu')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12 sm:mt-16 scroll-mt-28">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-navy text-accent-gold flex items-center justify-center font-bold shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-navy">{trans('Pertanyaan Umum Seputar TKDN & P3DN', 'Frequently Asked Questions about TKDN & P3DN')}</h3>
                <p className="text-[11px] sm:text-xs text-slate-500">{trans('Hal-hal yang sering ditanyakan mengenai sertifikasi komponen dalam negeri', 'Common questions regarding domestic component certification')}</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 text-xs sm:text-sm">{trans('Berapa biaya yang dikenakan untuk sertifikasi TKDN Industri Kecil (IK)?', 'How much does it cost for Small Industry (IK) TKDN certification?')}</h4>
                <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs sm:text-sm">
                  {trans('Sertifikasi TKDN untuk Industri Kecil (IK) adalah 100% GRATIS dan difasilitasi penuh oleh APBN Kementerian Perindustrian RI.', 'TKDN Certification for Small Industry (IK) is 100% FREE and fully subsidized by the state budget of the Ministry of Industry.')}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 text-xs sm:text-sm">{trans('Berapa lama masa berlaku Sertifikat TKDN IK?', 'How long is the validity period of the IK TKDN Certificate?')}</h4>
                <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs sm:text-sm">
                  {trans('Sertifikat TKDN Industri Kecil berlaku selama 3 (tiga) tahun sejak tanggal diterbitkan, sepanjang tidak terjadi perubahan spesifikasi teknis atau bahan baku.', 'The Small Industry TKDN Certificate is valid for 3 (three) years from issuance date, provided there are no changes to technical specifications or raw materials.')}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 text-xs sm:text-sm">{trans('Mengapa penyedia harus memiliki sertifikat TKDN dalam pengadaan Kemnaker?', 'Why do vendors need a TKDN certificate in MoM procurement?')}</h4>
                <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs sm:text-sm">
                  {trans('Sesuai Instruksi Presiden No. 2 Tahun 2022, instansi pemerintah diwajibkan mengalokasikan minimal 40% anggaran belanja untuk produk dalam negeri ber-TKDN, sehingga produk ber-TKDN mendapatkan preferensi harga dan prioritas pemilihan tender.', 'According to Presidential Instruction No. 2/2022, government institutions must allocate at least 40% of expenditure to domestic products with TKDN, giving TKDN products price preferences and priority.')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
