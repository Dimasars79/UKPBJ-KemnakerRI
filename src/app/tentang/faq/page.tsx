"use client"

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  HelpCircle, Search, ChevronDown, MessageSquare
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Pendaftaran & SPSE",
    question: "Bagaimana cara mendaftar sebagai penyedia di SPSE Kemnaker?",
    answer: "Penyedia dapat mendaftar secara online melalui portal SPSE Kemnaker atau INAPROC LKPP. Setelah mengisi formulir pendaftaran dan mengunggah berkas legalitas (NIB, NPWP, KTP Direktur, Akta), bawa dokumen fisik asli ke Helpdesk LPSE Kemnaker di Gedung B Lantai 3 Kemnaker untuk verifikasi dan aktivasi akun."
  },
    {
      category: "Pendaftaran & SPSE",
      question: "Berapa lama proses verifikasi akun penyedia sampai aktif?",
      answer: "Proses verifikasi dokumen fisik dan aktivasi akun penyedia di Helpdesk LPSE Kemnaker diselesaikan dalam waktu 1 (satu) hari kerja setelah seluruh dokumen persyaratan lengkap dan valid."
    },
    {
      category: "Pendaftaran & SPSE",
      question: "Apakah ada biaya pendaftaran atau administrasi di UKPBJ Kemnaker?",
      answer: "Seluruh layanan pengadaan di UKPBJ Kementerian Ketenagakerjaan RI—termasuk pendaftaran penyedia, verifikasi berkas, pendampingan, hingga konsultasi—adalah 100% GRATIS (Rp 0,-) dan bebas dari pungutan liar."
    },
    {
      category: "Tender & E-Purchasing",
      question: "Di mana saya bisa melihat jadwal dan pengumuman paket tender yang sedang aktif?",
      answer: "Seluruh paket tender dan non-tender aktif dapat dipantau langsung melalui halaman Beranda (section Pengadaan), menu Agenda pada website ini, atau langsung di portal LPSE SPSE LKPP (spse.inaproc.id)."
    },
    {
      category: "Tender & E-Purchasing",
      question: "Bagaimana cara mengikuti pengadaan melalui e-Katalog / Toko Daring Kemnaker?",
      answer: "Penyedia yang sudah memiliki akun SPSE dan terdaftar di e-Katalog LKPP atau Toko Daring dapat langsung menayangkan produk barang/jasanya. Pejabat Pembuat Komitmen (PPK) atau Pejabat Pengadaan Kemnaker akan melakukan e-purchasing sesuai kebutuhan satker."
    },
    {
      category: "Tender & E-Purchasing",
      question: "Apa yang harus dilakukan jika hasil evaluasi tender dirasa tidak sesuai (Sanggahan)?",
      answer: "Peserta tender yang memasukkan penawaran berhak menyampaikan Sanggahan secara elektronik melalui aplikasi SPSE dalam masa sanggah yang telah ditentukan pada jadwal tender. Pokja Pemilihan akan memberikan jawaban resmi paling lambat 5 hari kerja."
    },
    {
      category: "Regulasi & Sertifikasi",
      question: "Apa syarat sertifikasi kompetensi bagi pengelola pengadaan di lingkungan Kemnaker?",
      answer: "Seluruh PPK, Pokja Pemilihan, dan Pejabat Pengadaan wajib memiliki Sertifikat Keahlian Pengadaan Barang/Jasa Tingkat Dasar atau Sertifikat Kompetensi PBJ Level 1 yang diterbitkan oleh LKPP RI."
    },
    {
      category: "Regulasi & Sertifikasi",
      question: "Bagaimana ketentuan penggunaan produk dalam negeri (TKDN) dalam pengadaan Kemnaker?",
      answer: "Sesuai Inpres No. 2 Tahun 2022, Kemnaker mewajibkan penggunaan produk dengan sertifikat TKDN minimal 25% atau penjumlahan TKDN dan Bobot Manfaat Perusahaan (BMP) minimal 40% jika produk tersebut telah tersedia pada katalog nasional."
    },
    {
      category: "Pengaduan & Konsultasi",
      question: "Bagaimana cara mengajukan konsultasi hukum atau mediasi kontrak melalui Clearing House?",
      answer: "Anda dapat mengakses menu Informasi > Clearing House pada portal ini, mengisi formulir permohonan konsultasi atau telaah hukum, dan mengunggah dokumen pendukung kontrak. Tim Advokasi UKPBJ akan memproses dalam 3 hari kerja."
    },
    {
      category: "Pengaduan & Konsultasi",
      question: "Ke mana saya bisa melapor jika menemukan indikasi kecurangan atau pelanggaran etika?",
      answer: "Laporan dapat disampaikan langsung melalui WhatsApp Helpdesk UKPBJ (+62 898-8180-009), email ukpbj@kemnaker.go.id, atau melalui Sistem Pengaduan Masyarakat / Whistleblowing System (WBS) Inspektorat Jenderal Kemnaker RI."
    }
  ];

const CATEGORIES = ['Semua', 'Pendaftaran & SPSE', 'Tender & E-Purchasing', 'Regulasi & Sertifikasi', 'Pengaduan & Konsultasi'];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaq = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
                  <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pusat Informasi & Tanya Jawab</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  Frequently Asked Questions <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    (FAQ) UKPBJ Kemnaker
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Jawaban resmi dan panduan cepat atas pertanyaan yang paling sering diajukan terkait layanan pengadaan, SPSE, sertifikasi, dan prosedur pengaduan.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER BAR */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <FadeIn direction="up">
            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ketik kata kunci pertanyaan (misal: daftar penyedia, sanggah, gratis, TKDN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-blue-100 text-sm font-medium transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FAQ ACCORDION LIST */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 max-w-4xl">
          <div className="space-y-4">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <FadeIn key={idx} direction="up" delay={idx * 0.03}>
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:border-blue-200">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50/80"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-primary-blue font-bold text-[10px] uppercase tracking-wider shrink-0 mt-0.5">
                            {faq.category}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-primary-navy leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-blue' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                );
              })
            ) : (
              <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-700 mb-1">Pertanyaan tidak ditemukan</h4>
                <p className="text-slate-500 text-xs sm:text-sm">Coba cari dengan kata kunci lain atau hubungi Helpdesk kami langsung.</p>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM HELP BANNER */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 max-w-4xl">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10 text-center sm:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Pertanyaan Anda Belum Terjawab?</h3>
                <p className="text-slate-300 text-xs sm:text-sm">Tim Helpdesk UKPBJ Kemnaker siap melayani konsultasi langsung via WhatsApp.</p>
              </div>
              <a 
                href="https://wa.me/628988180009?text=Halo%20UKPBJ%20Kemnaker%2C%20saya%20memiliki%20pertanyaan%20terkait%20layanan%20pengadaan." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0 active:scale-95"
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
