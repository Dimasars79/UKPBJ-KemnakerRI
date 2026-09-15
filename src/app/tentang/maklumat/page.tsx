"use client"

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  ScrollText, ShieldCheck, Award, CheckCircle2, 
  AlertTriangle, ArrowRight, MessageSquare, Scale, Clock, HeartHandshake
} from 'lucide-react';

export default function MaklumatPage() {
  const promises = [
    {
      title: "Pelayanan Profesional & Berintegritas",
      desc: "Menyelenggarakan proses pengadaan secara objektif, adil, tidak memihak, dan bebas dari benturan kepentingan.",
      icon: ShieldCheck
    },
    {
      title: "Transparansi & Akuntabilitas Penuh",
      desc: "Membuka akses informasi pengadaan publik secara akurat, real-time, dan sesuai ketentuan perundang-undangan.",
      icon: Scale
    },
    {
      title: "Ketepatan Waktu & SLA Terukur",
      desc: "Memproses verifikasi akun, tender, konsultasi, dan evaluasi pengadaan sesuai standar waktu yang ditetapkan.",
      icon: Clock
    },
    {
      title: "Pelayanan Bebas Pungutan (Rp 0 / GRATIS)",
      desc: "Menjamin tidak ada biaya, gratifikasi, atau suap dalam seluruh tahapan layanan pengadaan UKPBJ Kemnaker.",
      icon: Award
    },
    {
      title: "Respons Cepat Penanganan Aduan",
      desc: "Menindaklanjuti setiap pertanyaan, sanggah tender, serta laporan kendala pengadaan secara cepat dan tuntas.",
      icon: HeartHandshake
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20 pb-20">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-primary-navy">
          <div className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-primary-navy/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.2),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <FadeIn direction="up">
                {/* Government Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <ScrollText className="w-3.5 h-3.5 text-amber-300" />
                  <span>Komitmen & Janji Standar Mutu</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  Maklumat Pelayanan <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-yellow-300">
                    UKPBJ Kemnaker RI
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Pernyataan kesanggupan resmi seluruh pimpinan dan jajaran UKPBJ Kemnaker dalam memberikan pelayanan publik yang bermartabat, beretika, dan berorientasi pada kepuasan pengguna.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* OFFICIAL MAKLUMAT CERTIFICATE PLAQUE */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <FadeIn direction="up">
            <div className="bg-gradient-to-br from-[#0B1D3A] via-[#102A54] to-[#0A1830] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border-2 border-amber-400/30">
              {/* Gold Ornament Frame */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <ScrollText className="w-8 h-8 text-accent-gold" />
                </div>

                <span className="text-xs font-bold tracking-widest uppercase text-amber-300 mb-2 block">
                  DEKLARASI RESMI KEMENTERIAN KETENAGAKERJAAN RI
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-snug">
                  MAKLUMAT PELAYANAN
                </h2>
                
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto mb-8" />

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 mb-8 shadow-inner">
                  <blockquote className="text-slate-100 text-base sm:text-xl md:text-2xl italic leading-relaxed font-serif font-medium">
                    &quot;Dengan ini, kami pimpinan dan seluruh aparatur Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Ketenagakerjaan Republik Indonesia menyatakan sanggup menyelenggarakan pelayanan pengadaan sesuai standar pelayanan yang telah ditetapkan, serta siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku apabila tidak menepati janji ini.&quot;
                  </blockquote>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-amber-300">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                    <ShieldCheck className="w-4 h-4 text-accent-gold" />
                    <span>Zona Integritas WBK / WBBM</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                    <Award className="w-4 h-4 text-accent-gold" />
                    <span>Layanan Bebas Pungli 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 5 JANJI KOMITMEN LAYANAN */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-blue text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pilar Pelayanan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-navy tracking-tight mb-4">
                5 Janji Pokok Mutu Pelayanan
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Prinsip operasional yang diwujudkan dalam setiap interaksi pengadaan dengan penyedia dan masyarakat.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promises.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <FadeIn key={idx} direction="up" delay={idx * 0.08}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-primary-navy text-accent-gold flex items-center justify-center mb-5 transition-colors duration-300 shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-primary-blue transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600">
                      <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" />
                      <span>Terikat Secara Hukum</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* KANAL PENGADUAN PELANGGARAN */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <FadeIn direction="up">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-red-100 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  <span>Kanal Pengawasan Masyarakat</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-primary-navy mb-3">
                  Menemukan Pelanggaran Terhadap Maklumat Ini?
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Jika Anda menemukan pelayanan yang tidak sesuai standar, adanya pungutan liar, atau perilaku tidak profesional dari petugas kami, segera laporkan melalui Helpdesk WhatsApp resmi atau saluran pengaduan kami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://wa.me/628988180009?text=Halo%20UKPBJ%20Kemnaker%2C%20saya%20ingin%20melaporkan%20adanya%20pelanggaran%20standar%20maklumat%20pelayanan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Lapor via WhatsApp Helpdesk</span>
                </a>
                <Link
                  href="/tentang/standar-pelayanan"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-all"
                >
                  <span>Lihat Standar Pelayanan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
