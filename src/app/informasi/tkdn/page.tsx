"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, HelpCircle, ExternalLink, 
  ChevronRight, ChevronDown, Calculator, 
  Sparkles, CheckCircle2, Headphones 
} from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TKDNPage() {
  const { trans } = useLanguage();
  const [bahanBaku, setBahanBaku] = useState(45);
  const [tenagaKerja, setTenagaKerja] = useState(30);
  const [alatKerja, setAlatKerja] = useState(25);
  const [activeTab, setActiveTab] = useState<'flow' | 'calculator'>('flow');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Simple TKDN weighted score calculation
  const totalTKDN = Math.min(100, Math.round((bahanBaku * 0.5) + (tenagaKerja * 0.3) + (alatKerja * 0.2)));

  const faqCategories = [
    { id: 'all', label: trans('Semua Pertanyaan', 'All Questions') },
    { id: 'sertifikasi', label: trans('Sertifikasi & Biaya', 'Certification & Costs') },
    { id: 'persyaratan', label: trans('Syarat & Prosedur', 'Requirements & Procedures') },
    { id: 'tender', label: trans('Preferensi Tender PBJ', 'PBJ Tender Preference') },
  ];

  const faqItems = [
    {
      category: 'sertifikasi',
      q: trans('Berapa biaya yang dikenakan untuk sertifikasi TKDN Industri Kecil (IK)?', 'How much does it cost for Small Industry (IK) TKDN certification?'),
      a: trans(
        'Sertifikasi TKDN untuk Industri Kecil (IK) adalah 100% GRATIS (tidak dipungut biaya apapun). Program ini difasilitasi dan disubsidi penuh oleh APBN Kementerian Perindustrian RI untuk mendukung UMKM lokal bersaing di pengadaan barang/jasa pemerintah.',
        'TKDN Certification for Small Industry (IK) is 100% FREE. This program is fully subsidized by the state budget of the Ministry of Industry to support local MSMEs in competing in public procurement.'
      ),
      tag: trans('Gratis / APBN', 'Free / State Budget'),
      highlight: trans('✓ 100% Bebas Biaya Retribusi & Pendaftaran', '✓ 100% Free of Levy & Registration Fees')
    },
    {
      category: 'sertifikasi',
      q: trans('Berapa lama masa berlaku Sertifikat TKDN IK dan cara perpanjangannya?', 'How long is the validity period of the IK TKDN Certificate and how to renew it?'),
      a: trans(
        'Sertifikat TKDN Industri Kecil berlaku selama 3 (tiga) tahun sejak tanggal diterbitkan. Perpanjangan dapat diajukan secara online melalui akun SIINas sebelum masa berlaku berakhir, sepanjang tidak terjadi perubahan spesifikasi bahan baku dan alur produksi.',
        'The Small Industry TKDN Certificate is valid for 3 (three) years from issuance. Renewal can be submitted online via SIINas account before expiration, provided there are no changes to raw material specs and production flow.'
      ),
      tag: trans('Masa Berlaku: 3 Tahun', 'Validity: 3 Years'),
      highlight: trans('✓ Perpanjangan mandiri via SIINas online', '✓ Self-renewal via SIINas online')
    },
    {
      category: 'tender',
      q: trans('Mengapa penyedia wajib memiliki sertifikat TKDN dalam pengadaan Kemnaker?', 'Why do vendors need a TKDN certificate in MoM procurement?'),
      a: trans(
        'Sesuai Instruksi Presiden No. 2 Tahun 2022 dan Perpres No. 12 Tahun 2021, seluruh kementerian wajib mengalokasikan minimal 40% anggaran belanja untuk produk dalam negeri (PDN). Selain itu, produk dengan nilai TKDN ≥ 25% berhak memperoleh Preferensi Harga hingga maksimal 25% dalam evaluasi lelang SPSE.',
        'According to Presidential Instruction No. 2/2022 and Presidential Regulation No. 12/2021, ministries must allocate at least 40% of expenditure to domestic products. Furthermore, products with TKDN ≥ 25% qualify for a Price Preference of up to 25% in SPSE auction evaluations.'
      ),
      tag: trans('Preferensi s.d. 25%', 'Preference up to 25%'),
      highlight: trans('✓ Prioritas belanja APBN & insentif evaluasi tender', '✓ APBN spending priority & tender evaluation incentives')
    },
    {
      category: 'persyaratan',
      q: trans('Apa saja dokumen dan syarat utama pendaftaran akun SIINas TKDN IK?', 'What are the main documents and requirements for SIINas TKDN IK account registration?'),
      a: trans(
        'Syarat utama meliputi: (1) NIB (Nomor Induk Berusaha) berbasis risiko dengan KBLI industri, (2) Akun aktif di portal SIINas Kemenperin, (3) Bukti izin operasional/komersial, serta (4) Foto/video dokumentasi proses produksi dan faktur pembelian bahan baku lokal.',
        'Main requirements include: (1) Risk-based NIB with industrial KBLI, (2) Active account on the Ministry of Industry SIINas portal, (3) Proof of operational license, and (4) Photo/video documentation of production processes and local material invoices.'
      ),
      tag: trans('Syarat Dokumen', 'Document Requirements'),
      highlight: trans('✓ NIB KBLI Industri & Dokumentasi Fasilitas Produksi', '✓ Industrial KBLI NIB & Production Facility Documentation')
    },
    {
      category: 'persyaratan',
      q: trans('Berapa lama estimasi waktu verifikasi hingga sertifikat TKDN terbit?', 'What is the estimated verification time until the TKDN certificate is issued?'),
      a: trans(
        'Sesuai standar operasional Kemenperin RI, proses verifikasi data dan validasi mandiri oleh Kelompok Kerja Verifikasi P3DN membutuhkan waktu maksimal 5 (lima) hari kerja setelah seluruh berkas persyaratan dinyatakan lengkap dan valid di sistem SIINas.',
        'According to official standards, data verification and self-validation by the P3DN Verification Working Group takes a maximum of 5 (five) working days once all files are declared complete in the SIINas system.'
      ),
      tag: trans('Maks. 5 Hari Kerja', 'Max 5 Working Days'),
      highlight: trans('✓ Cepat & Terverifikasi Digital Elektronik', '✓ Fast & Digitally Verified')
    },
    {
      category: 'tender',
      q: trans('Bagaimana cara menghitung Bobot Manfaat Perusahaan (BMP)?', 'How is the Company Benefit Weight (BMP) calculated?'),
      a: trans(
        'Bobot Manfaat Perusahaan (BMP) dihitung berdasarkan aspek pemberdayaan tenaga kerja lokal (WNI), kepemilikan sertifikat K3 & manajemen mutu (ISO), fasilitas jaminan sosial ketenagakerjaan (BPJS), serta kemitraan UMKM dengan batas nilai maksimal BMP sebesar 15%.',
        'Company Benefit Weight (BMP) is calculated based on local manpower empowerment, OHS & ISO quality management certificates, BPJS social security facilities, and MSME partnerships with a maximum BMP value of 15%.'
      ),
      tag: trans('BMP Maks. 15%', 'BMP Max 15%'),
      highlight: trans('✓ K3, BPJS Ketenagakerjaan & Standar Mutu ISO', '✓ OHS, Social Security & ISO Quality Standards')
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

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



        {/* ================= INTERACTIVE ACCORDION FAQ SECTION ================= */}
        <section id="faq" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-14 sm:mt-18 scroll-mt-28">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 shadow-sm border border-slate-200/80">
            
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-primary-navy text-accent-gold flex items-center justify-center font-bold shadow-xs shrink-0">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-primary-navy tracking-tight">
                    {trans('Tanya Jawab Seputar TKDN & P3DN', 'Frequently Asked Questions about TKDN & P3DN')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {trans('Panduan lengkap, regulasi hukum, dan mekanisme sertifikasi komponen dalam negeri.', 'Complete guide, legal regulations, and domestic component certification mechanisms.')}
                  </p>
                </div>
              </div>

              {/* Category Pills Filter */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenFaqIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary-navy text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3 mt-6">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-blue-50/40 border-primary-blue/40 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 select-none focus:outline-none"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-colors ${
                          isOpen ? 'bg-primary-navy text-accent-gold' : 'bg-slate-200/80 text-slate-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                              {faq.tag}
                            </span>
                          </div>
                          <h4 className={`text-xs sm:text-sm md:text-base font-bold transition-colors ${
                            isOpen ? 'text-primary-navy' : 'text-slate-800'
                          }`}>
                            {faq.q}
                          </h4>
                        </div>
                      </div>

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-primary-blue text-white rotate-180' : 'bg-slate-200 text-slate-500'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-blue-100/60 pl-13 sm:pl-14">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              {faq.a}
                            </p>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] sm:text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{faq.highlight}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* ================= HELPDESK & CONSULTATION BANNER ================= */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#061B30] via-[#0A2645] to-[#071F36] text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
                
                {/* Background lighting accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-48 h-48 bg-accent-gold/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-accent-gold text-[11px] font-bold uppercase tracking-wider mb-2.5 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-accent-gold animate-pulse" />
                    <span>{trans('Layanan Konsultasi & Asistensi PBJ', 'PBJ Consultation & Assistance Service')}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {trans('Butuh Bantuan Pendaftaran Akun SIINas & Hitung TKDN?', 'Need Help with SIINas Registration & TKDN Calculation?')}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {trans(
                      'Tim Helpdesk P3DN & Advokasi UKPBJ Kemnaker siap memberikan panduan teknis bagi penyedia barang/jasa dalam pengurusan sertifikasi TKDN secara gratis.',
                      'The MoM UKPBJ P3DN Helpdesk & Advocacy team is ready to provide free technical guidance for vendors in managing TKDN certification.'
                    )}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="https://siinas.kemenperin.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>{trans('Portal SIINas Resmi', 'Official SIINas Portal')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/informasi/clearing-house"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{trans('Konsultasi Clearing House', 'Clearing House Consultation')}</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
