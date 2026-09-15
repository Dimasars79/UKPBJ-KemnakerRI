"use client"

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { 
  Target, Compass, ShieldCheck, Award, Users, BookOpen, 
  Sparkles, CheckCircle2, ArrowRight, Scale, Zap
} from 'lucide-react';

export default function VisiMisiPage() {
  const missions = [
    {
      num: "01",
      title: "Peningkatan Kapasitas SDM Pengadaan",
      desc: "Meningkatkan profesionalisme, integritas, dan kompetensi Pejabat Pembuat Komitmen (PPK), Pokja Pemilihan, dan Pejabat Pengadaan secara berkelanjutan.",
      icon: Users,
      color: "bg-blue-50 text-primary-blue group-hover:bg-primary-blue group-hover:text-white"
    },
    {
      num: "02",
      title: "Sistem Pengadaan Terintegrasi & Modern",
      desc: "Mewujudkan tata kelola pengadaan barang dan jasa berbasis teknologi informasi terkini yang transparan, efektif, dan akuntabel.",
      icon: Zap,
      color: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
    },
    {
      num: "03",
      title: "Pelayanan Prima & Kemitraan Strategis",
      desc: "Memberikan layanan konsultasi, advokasi, dan pendampingan PBJ yang responsif bagi seluruh unit kerja dan mitra penyedia nasional.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
    },
    {
      num: "04",
      title: "Tata Kelola Bersih (Good Governance)",
      desc: "Menerapkan prinsip kehati-hatian, transparansi publik, serta pencegahan dini risiko hukum dan sengketa pengadaan barang/jasa.",
      icon: Scale,
      color: "bg-amber-50 text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-navy"
    }
  ];

  const values = [
    {
      title: "Integritas",
      desc: "Bertindak jujur, mematuhi kode etik, dan bebas dari benturan kepentingan maupun gratifikasi.",
      icon: ShieldCheck
    },
    {
      title: "Profesionalisme",
      desc: "Menjalankan tugas secara tuntas, tepat waktu, dan berlandaskan keahlian serta regulasi yang berlaku.",
      icon: Target
    },
    {
      title: "Akuntabilitas",
      desc: "Setiap keputusan dan tahapan pengadaan dapat dipertanggungjawabkan secara hukum dan keuangan negara.",
      icon: Award
    },
    {
      title: "Transparansi",
      desc: "Menjamin keterbukaan akses informasi proses tender dan pengadaan bagi publik dan penyedia.",
      icon: Sparkles
    },
    {
      title: "Kolaboratif",
      desc: "Membangun sinergi harmonis antar unit kerja, aparat pengawas (APIP/Itjen), dan LKPP RI.",
      icon: Users
    },
    {
      title: "Inovatif",
      desc: "Adaptif terhadap perkembangan digitalisasi pengadaan nasional (SPSE, e-Katalog, & Toko Daring).",
      icon: BookOpen
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
                  <Target className="w-3.5 h-3.5 text-amber-300" />
                  <span>Arah & Komitmen Strategis</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  Visi, Misi & <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    Nilai-Nilai Dasar UKPBJ
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Landasan fundamental dan komitmen strategis UKPBJ Kementerian Ketenagakerjaan RI dalam mewujudkan pengadaan yang kredibel, bernilai tambah, dan bebas korupsi.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* VISI CARD SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <FadeIn direction="up">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-primary-blue font-bold shadow-xs">
                    <Target className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-blue">Visi Utama</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-primary-navy">Visi UKPBJ Kemnaker RI</h2>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 p-6 sm:p-8 rounded-2xl border-l-4 border-primary-blue text-slate-800">
                  <p className="text-lg sm:text-2xl font-bold leading-relaxed text-primary-navy italic">
                    &quot;Menjadi Unit Kerja Pengadaan Barang/Jasa Pemerintah yang Profesional, Modern, dan Berintegritas Tinggi untuk Mewujudkan Pengadaan yang Kredibel, Transparan, dan Berkelanjutan.&quot;
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* MISI CARDS SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-blue text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Pilar Pelaksanaan Tugas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-navy tracking-tight mb-4">
                4 Misi Strategis UKPBJ
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Langkah konkret dan terarah yang diimplementasikan dalam seluruh siklus pengadaan pemerintah.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((m, idx) => {
              const IconComponent = m.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${m.color}`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-black text-slate-200 group-hover:text-primary-blue/30 transition-colors">
                          {m.num}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-blue transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-primary-blue">
                      <span>Komitmen Pelaksanaan</span>
                      <CheckCircle2 className="w-4 h-4 ml-1.5 text-emerald-500" />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* NILAI-NILAI DASAR SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Budaya Kerja Utama</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-navy tracking-tight mb-4">
                Nilai-Nilai Dasar (Core Values)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Prinsip etika dan standar perilaku yang wajib dipedomani oleh setiap insan pengadaan UKPBJ Kemnaker.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <FadeIn key={idx} direction="up" delay={idx * 0.05}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary-navy text-primary-blue group-hover:text-accent-gold flex items-center justify-center mb-4 transition-colors duration-300 shadow-xs">
                      <ValIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-primary-blue transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* BOTTOM NAV / CTA LINK */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-primary-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Ingin Mempelajari Janji Pelayanan Kami?</h3>
                <p className="text-slate-300 text-sm">Lihat Maklumat Pelayanan UKPBJ Kemnaker RI dan standar komitmen mutu kami.</p>
              </div>
              <Link 
                href="/tentang/maklumat" 
                className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-navy font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
              >
                <span>Lihat Maklumat Pelayanan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
