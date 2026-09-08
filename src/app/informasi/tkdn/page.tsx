"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  ShieldCheck, FileText, BarChart3, HelpCircle, 
  Video, BookOpen, ExternalLink, ChevronRight, 
  CheckCircle2, Building2, Calculator, Layers
} from 'lucide-react';

export default function TKDNPage() {
  const [bahanBaku, setBahanBaku] = useState(45);
  const [tenagaKerja, setTenagaKerja] = useState(30);
  const [alatKerja, setAlatKerja] = useState(25);
  const [activeTab, setActiveTab] = useState<'flow' | 'calculator'>('flow');

  // Simple TKDN weighted score calculation
  const totalTKDN = Math.min(100, Math.round((bahanBaku * 0.5) + (tenagaKerja * 0.3) + (alatKerja * 0.2)));

  const flowSteps = [
    {
      step: 1,
      title: 'Penghitungan Mandiri (Self-Assessment)',
      desc: 'Perusahaan melakukan penghitungan estimasi nilai persentase TKDN produk secara mandiri sesuai pedoman teknis kementerian.',
      tag: 'Langkah 1'
    },
    {
      step: 2,
      title: 'Permohonan Melalui Akun SIINas',
      desc: 'Ajukan permohonan penerbitan sertifikat TKDN IK secara online melalui portal Sistem Informasi Industri Nasional (SIINas).',
      tag: 'Langkah 2'
    },
    {
      step: 3,
      title: 'Input Data Perusahaan & Bukti Produksi',
      desc: 'Lengkapi profil industri, legalitas NIB, bukti pembelian bahan baku lokal, serta dokumentasi fasilitas proses produksi.',
      tag: 'Langkah 3'
    },
    {
      step: 4,
      title: 'Verifikasi Data oleh Kelompok Kerja',
      desc: 'Tunggu proses verifikasi dan validasi lapangan oleh Kelompok Kerja Verifikasi P3DN (Maksimal 5 hari kerja setelah dokumen lengkap).',
      tag: 'Langkah 4'
    },
    {
      step: 5,
      title: 'Penerbitan Sertifikat TKDN Mandiri',
      desc: 'Setelah disetujui, Sertifikat TKDN resmi berbarcode tanda tangan elektronik dapat langsung dicetak secara mandiri dan berlaku nasional.',
      tag: 'Langkah 5 (Selesai)'
    }
  ];

  const serviceCards = [
    {
      title: 'Sertifikat Terdaftar',
      desc: 'Data Sertifikat TKDN dan Bobot Manfaat Perusahaan (BMP) yang telah diterbitkan secara resmi.',
      icon: <FileText className="w-5 h-5" />,
      href: 'https://tkdn.kemenperin.go.id/sertifikat.php',
      tag: 'Database Resmi'
    },
    {
      title: 'Rekapitulasi Produk',
      desc: 'Rekapitulasi capaian Sertifikat TKDN berdasarkan kelompok barang, sektor industri, dan sebaran wilayah.',
      icon: <BarChart3 className="w-5 h-5" />,
      href: 'https://tkdn.kemenperin.go.id/rekap.php',
      tag: 'Statistik P3DN'
    },
    {
      title: 'TKDN Industri Kecil (IK)',
      desc: 'Fasilitas sertifikasi TKDN gratis khusus pelaku usaha mikro dan industri kecil dalam pengadaan pemerintah.',
      icon: <ShieldCheck className="w-5 h-5" />,
      href: 'https://siinas.kemenperin.go.id',
      tag: 'Fasilitasi Gratis'
    },
    {
      title: 'FAQ & Tanya Jawab',
      desc: 'Informasi komprehensif mengenai kebijakan P3DN, ketentuan minimal 40% TKDN, dan mekanisme sertifikasi.',
      icon: <HelpCircle className="w-5 h-5" />,
      href: '#faq',
      tag: 'Pusat Bantuan'
    },
    {
      title: 'Regulasi P3DN',
      desc: 'Kumpulan Undang-Undang, Perpres No. 12/2021, dan Permenperin tentang kewajiban penggunaan produk lokal.',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/informasi/peraturan',
      tag: 'Dasar Hukum'
    },
    {
      title: 'Video Panduan',
      desc: 'Tutorial visual langkah-demi-langkah tata cara pendaftaran akun SIINas dan pengajuan berkas verifikasi.',
      icon: <Video className="w-5 h-5" />,
      href: 'https://www.youtube.com/@kemenperin_ri',
      tag: 'Video Tutorial'
    },
    {
      title: 'Katalog Referensi Produk',
      desc: 'Daftar produk barang dan jasa dalam negeri yang siap dibeli melalui E-Katalog Nasional & Sektoral.',
      icon: <Layers className="w-5 h-5" />,
      href: 'https://e-katalog.lkpp.go.id',
      tag: 'E-Katalog LKPP'
    },
    {
      title: 'Portal SIINas Kemenperin',
      desc: 'Akses langsung ke portal registrasi dan login Sistem Informasi Industri Nasional Kementerian Perindustrian.',
      icon: <Building2 className="w-5 h-5" />,
      href: 'https://siinas.kemenperin.go.id',
      tag: 'Portal Layanan'
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
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/informasi" className="hover:text-amber-300 transition-colors">Informasi</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Pengajuan Sertifikasi TKDN</span>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                {/* Formal Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Program P3DN & Sertifikasi TKDN Nasional</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                  Sertifikasi TKDN Industri Kecil & Menengah
                </h1>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                  Fasilitas sertifikasi Tingkat Komponen Dalam Negeri (TKDN) gratis bagi pelaku usaha dalam negeri untuk memperkuat daya saing pada pengadaan barang/jasa pemerintah.
                </p>

                {/* Top Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://siinas.kemenperin.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <span>Ajukan Sertifikat via SIINas</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveTab(activeTab === 'calculator' ? 'flow' : 'calculator')}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all"
                  >
                    <Calculator className="w-4 h-4 text-accent-gold" />
                    <span>{activeTab === 'calculator' ? 'Lihat Alur 5 Tahapan' : 'Simulasi Hitung TKDN'}</span>
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ALUR 5 TAHAP PENGAJUAN (Matching Screenshot) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
            
            {activeTab === 'flow' ? (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-primary-blue bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Mekanisme Resmi Kemenperin RI
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
                      5 Tahapan Alur Pengajuan Sertifikasi TKDN IK (Gratis)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Proses verifikasi data dilaksanakan maksimal 5 (lima) hari kerja setelah seluruh berkas dinyatakan lengkap.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>100% Bebas Biaya (Gratis)</span>
                  </div>
                </div>

                {/* 5 Flow Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                  {flowSteps.map((step, idx) => (
                    <div 
                      key={step.step}
                      className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-primary-blue/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-8 h-8 rounded-xl bg-primary-navy text-accent-gold text-xs font-black flex items-center justify-center shadow-xs">
                            {step.step}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {step.tag}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-primary-blue transition-colors mb-2 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-primary-navy">
                        <span>Tahap {idx + 1}</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* TKDN Interactive Calculator Tool */
              <div>
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Simulasi Mandiri
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
                    Kalkulator Simulasi Estimasi Nilai TKDN
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Geser parameter di bawah untuk mensimulasikan persentase kandungan komponen lokal pada barang/jasa Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Komponen Bahan Baku Lokal:</span>
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
                        <span>Tenaga Kerja Warga Negara Indonesia (WNI):</span>
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
                        <span>Fasilitas Mesin & Peralatan Kerja Lokal:</span>
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

                  <div className="lg:col-span-5 bg-gradient-to-br from-primary-navy to-[#113264] rounded-2xl p-6 text-white text-center shadow-lg">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Estimasi Nilai TKDN Anda</span>
                    <div className="text-5xl sm:text-6xl font-black text-accent-gold my-3 tracking-tight">
                      {totalTKDN}%
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-white/10 text-white">
                      {totalTKDN >= 40 ? '✓ Memenuhi Syarat Preferensi PBJ (≥ 40%)' : 'Belum Memenuhi Ambang 40%'}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Produk dengan nilai TKDN ≥ 40% mendapatkan prioritas utama dalam belanja barang/jasa APBN/APBD kementerian.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 8 PUSAT LAYANAN & NAVIGASI TKDN (From Bottom of Screenshot) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-primary-navy bg-slate-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-slate-200">
              Pusat Data & Layanan Terpadu
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mt-3 tracking-tight">
              Akses Cepat Layanan & Database TKDN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Pilih menu navigasi di bawah untuk mengakses sertifikat, rekapitulasi, regulasi, dan petunjuk teknis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-primary-navy group-hover:text-white transition-colors shadow-2xs">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                  <span>Akses Menu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-20 scroll-mt-28">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-navy text-accent-gold flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-navy">Pertanyaan Umum Seputar TKDN & P3DN</h3>
                <p className="text-xs text-slate-500">Hal-hal yang sering ditanyakan mengenai sertifikasi komponen dalam negeri</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Berapa biaya yang dikenakan untuk sertifikasi TKDN Industri Kecil (IK)?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sertifikasi TKDN untuk Industri Kecil (IK) adalah <strong>100% GRATIS</strong> dan difasilitasi penuh oleh APBN Kementerian Perindustrian RI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Berapa lama masa berlaku Sertifikat TKDN IK?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sertifikat TKDN Industri Kecil berlaku selama <strong>3 (tiga) tahun</strong> sejak tanggal diterbitkan, sepanjang tidak terjadi perubahan spesifikasi teknis atau bahan baku.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Mengapa penyedia harus memiliki sertifikat TKDN dalam pengadaan Kemnaker?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sesuai Instruksi Presiden No. 2 Tahun 2022, instansi pemerintah diwajibkan mengalokasikan minimal 40% anggaran belanja untuk produk dalam negeri ber-TKDN, sehingga produk ber-TKDN mendapatkan preferensi harga dan prioritas pemilihan tender.
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
