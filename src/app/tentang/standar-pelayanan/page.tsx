"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  Building2, Clock, ShieldCheck, CheckCircle2, 
  FileText, ChevronDown, MessageSquare, 
  Users, Scale
} from 'lucide-react';

export default function StandarPelayananPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const serviceStandards = [
    {
      id: "spse-account",
      title: "Verifikasi Akun & Kualifikasi Penyedia SPSE",
      sla: "1 Hari Kerja",
      cost: "Rp 0,- (GRATIS)",
      output: "Akun SPSE Aktif & Terverifikasi Nasional",
      requirements: [
        "KTP Direktur / Penanggung Jawab Perusahaan",
        "Nomor Induk Berusaha (NIB) / SIUP & TDP",
        "Nomor Pokok Wajib Pajak (NPWP) Perusahaan",
        "Akta Pendirian Perusahaan & SK Kemenkumham",
        "Formulir Pendaftaran SPSE & Surat Kuasa (bila dikuasakan)"
      ],
      procedures: [
        "Penyedia mendaftar secara mandiri melalui portal SPSE Kemnaker / INAPROC.",
        "Membawa dokumen asli & salinan ke Helpdesk UKPBJ / LPSE Kemnaker.",
        "Verifikator memeriksa keabsahan dokumen fisik dan mencocokkan data online.",
        "Aktivasi akun diterbitkan dan penyedia langsung dapat mengikuti tender."
      ],
      legalBasis: "Perpres No. 12 Tahun 2021 & Peraturan LKPP No. 11 Tahun 2021."
    },
    {
      id: "bimtek-ppk",
      title: "Pendampingan Teknis & Bimtek Pengadaan PPK/Pokja",
      sla: "2 Hari Kerja",
      cost: "Rp 0,- (GRATIS)",
      output: "Laporan Pendampingan & Rekomendasi Teknis PBJ",
      requirements: [
        "Surat Permohonan Pendampingan dari Kepala Satuan Kerja / PPK",
        "Kerangka Acuan Kerja (KAK) & Spesifikasi Teknis yang direncanakan",
        "Rencana Anggaran Biaya (RAB) dan HPS awal"
      ],
      procedures: [
        "PPK mengajukan surat permohonan pendampingan ke Kepala UKPBJ.",
        "Kepala UKPBJ menugaskan Tim Pendamping / Tenaga Ahli Pengadaan.",
        "Pelaksanaan rapat telaah teknis, mitigasi risiko, dan sinkronisasi HPS.",
        "Penerbitan berita acara pendampingan pengadaan."
      ],
      legalBasis: "Keputusan Menteri Ketenagakerjaan tentang Tata Kelola UKPBJ."
    },
    {
      id: "clearing-house",
      title: "Konsultasi Clearing House & Mediasi Sengketa PBJ",
      sla: "3 Hari Kerja",
      cost: "Rp 0,- (GRATIS)",
      output: "Legal Opinion (Pendapat Hukum) / Risalah Mediasi PBJ",
      requirements: [
        "Surat Permohonan Konsultasi Kasus / Permasalahan Kontrak PBJ",
        "Salinan Dokumen Kontrak, Adendum, & Kronologi Permasalahan",
        "Bukti pendukung (Berita Acara, Laporan Pengawasan, dll.)"
      ],
      procedures: [
        "Pemohon mendaftar konsultasi via portal Clearing House UKPBJ.",
        "Tim Advokasi & Hukum menelaah berkas perkara dan regulasi terkait.",
        "Sidang pleno telaah hukum / mediasi bersama para pihak.",
        "Penerbitan rekomendasi penyelesaian hukum PBJ resmi."
      ],
      legalBasis: "Peraturan LKPP No. 12 Tahun 2021 tentang Advokasi & Layanan Hukum PBJ."
    },
    {
      id: "verifikasi-tkdn",
      title: "Fasilitasi & Verifikasi Sertifikasi TKDN",
      sla: "2 Hari Kerja",
      cost: "Rp 0,- (GRATIS)",
      output: "Surat Rekomendasi Perhitungan Bobot Manfaat Perusahaan (BMP)",
      requirements: [
        "Sertifikat TKDN resmi dari Kementerian Perindustrian",
        "Struktur harga penawaran dan daftar komponen bahan baku dalam negeri",
        "Formulir Deklarasi Komitmen P3DN"
      ],
      procedures: [
        "Penyedia menyampaikan dokumen sertifikat TKDN dalam dokumen penawaran.",
        "Pokja Pemilihan memvalidasi keaslian sertifikat pada database Kemenperin.",
        "Perhitungan nilai preferensi harga berdasarkan skor TKDN + BMP.",
        "Penerbitan rekapitulasi penilaian evaluasi penawaran."
      ],
      legalBasis: "Instruksi Presiden No. 2 Tahun 2022 tentang P3DN."
    },
    {
      id: "penanganan-pengaduan",
      title: "Layanan Penanganan Pengaduan & Sanggahan Pengadaan",
      sla: "Maksimal 5 Hari Kerja",
      cost: "Rp 0,- (GRATIS)",
      output: "Surat Jawaban Sanggah Resmi & Tindak Lanjut APIP",
      requirements: [
        "Surat Sanggah resmi bermaterai yang diunggah via SPSE",
        "Uraian bukti konkret dan referensi dokumen tender yang disanggah",
        "Identitas jelas penyedia peserta tender"
      ],
      procedures: [
        "Penyedia menyampaikan sanggahan resmi sesuai masa sanggah tender di SPSE.",
        "Pokja Pemilihan dan UKPBJ meneliti materi sanggahan dan bukti yang dilampirkan.",
        "Pokja menyusun jawaban komprehensif berdasarkan regulasi pengadaan.",
        "Jawaban resmi diumumkan secara transparan melalui sistem SPSE."
      ],
      legalBasis: "Perpres No. 16 Tahun 2018 jo. Perpres No. 12 Tahun 2021."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 pb-20">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-primary-navy">
          <div className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-primary-navy/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <FadeIn direction="up">
                {/* Government Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Standar Pelayanan Publik Resmi</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  Standar Pelayanan Publik <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    UKPBJ Kemnaker RI
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Pedoman baku penyelenggaraan pelayanan pengadaan barang dan jasa sesuai Undang-Undang No. 25 Tahun 2009 tentang Pelayanan Publik untuk menjamin kepastian waktu, prosedur, dan transparansi.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4 CORE GUARANTEES BANNER */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <FadeIn direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Biaya Layanan</span>
                  <p className="text-lg font-black text-primary-navy">Rp 0,- (GRATIS)</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Kepastian Waktu</span>
                  <p className="text-lg font-black text-primary-navy">SLA 1 - 3 Hari</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-accent-gold flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Dasar Regulasi</span>
                  <p className="text-lg font-black text-primary-navy">UU 25/2009</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Helpdesk Aktif</span>
                  <p className="text-lg font-black text-primary-navy">Senin - Jumat</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* INTERACTIVE SERVICE STANDARDS TABS & DETAILS */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-blue text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Katalog Standar Pelayanan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-navy tracking-tight mb-4">
                Rincian Standar Mutu Pelayanan
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Pilih jenis layanan di bawah ini untuk melihat persyaratan, prosedur alur kerja, durasi penyelesaian, dan produk layanan yang dihasilkan.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Nav Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {serviceStandards.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-between border ${
                    activeTab === idx
                      ? 'bg-primary-navy text-white shadow-lg border-primary-navy'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="line-clamp-2">{item.title}</span>
                  <ChevronDown className={`w-4 h-4 ml-2 shrink-0 transition-transform ${activeTab === idx ? '-rotate-90 text-accent-gold' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>

            {/* Right Detailed Card */}
            <div className="lg:col-span-8">
              <FadeIn key={activeTab} direction="right">
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Standar Pelayanan</span>
                      <h3 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                        {serviceStandards[activeTab].title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                        {serviceStandards[activeTab].cost}
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-primary-blue border border-blue-200 font-bold text-xs">
                        Waktu: {serviceStandards[activeTab].sla}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* Persyaratan */}
                    <div>
                      <h4 className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary-blue" />
                        <span>Persyaratan Dokumen</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {serviceStandards[activeTab].requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue mt-2 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prosedur & Alur */}
                    <div>
                      <h4 className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-blue" />
                        <span>Prosedur / Alur Pelayanan</span>
                      </h4>
                      <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                        {serviceStandards[activeTab].procedures.map((proc, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-xs">
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-primary-blue font-bold text-xs flex items-center justify-center shrink-0">
                              {pIdx + 1}
                            </div>
                            <span className="leading-relaxed">{proc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Output & Dasar Hukum */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                      <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                        <span className="font-bold text-primary-navy block mb-1">Produk Layanan / Output:</span>
                        <p className="text-slate-600 font-semibold">{serviceStandards[activeTab].output}</p>
                      </div>
                      <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100">
                        <span className="font-bold text-primary-navy block mb-1">Dasar Hukum:</span>
                        <p className="text-slate-600">{serviceStandards[activeTab].legalBasis}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* BOTTOM HELPDESK CTA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary-navy to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Butuh Bantuan atau Panduan Prosedur?</h3>
                <p className="text-slate-300 text-sm">Konsultasikan persyaratan pengadaan Anda langsung dengan Tim Helpdesk UKPBJ Kemnaker.</p>
              </div>
              <a 
                href="https://wa.me/628988180009?text=Halo%20UKPBJ%20Kemnaker%2C%20saya%20ingin%20menanyakan%20tentang%20standar%20pelayanan%20pengadaan." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp Helpdesk</span>
              </a>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
