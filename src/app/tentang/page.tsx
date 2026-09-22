"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Target, Users, BookOpen, Building2, Compass } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { OrganizationChart } from '@/components/ui/OrganizationChart';

export default function TentangPage() {
  const { trans } = useLanguage();

  const values = [
    { 
      title: trans('Integritas', 'Integrity'), 
      desc: trans('Bertindak jujur, transparan, dan menghindari konflik kepentingan dalam seluruh proses pengadaan.', 'Acting honestly, transparently, and avoiding conflicts of interest in all procurement processes.'), 
      icon: <ShieldCheck className="w-6 h-6" /> 
    },
    { 
      title: trans('Profesionalisme', 'Professionalism'), 
      desc: trans('Menjalankan tugas dengan kompetensi tinggi dan sesuai dengan peraturan perundang-undangan.', 'Executing duties with high competence and in compliance with laws and regulations.'), 
      icon: <Target className="w-6 h-6" /> 
    },
    { 
      title: trans('Kolaboratif', 'Collaborative'), 
      desc: trans('Membangun kerja sama yang baik dengan seluruh pihak dan pemangku kepentingan.', 'Building good cooperation with all parties and stakeholders.'), 
      icon: <Users className="w-6 h-6" /> 
    },
    { 
      title: trans('Inovatif', 'Innovative'), 
      desc: trans('Terus mengembangkan sistem dan metode pengadaan untuk mencapai efisiensi maksimal.', 'Continuously developing procurement systems and methods to achieve maximum efficiency.'), 
      icon: <BookOpen className="w-6 h-6" /> 
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Institutional Grandeur */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-primary-navy">
          {/* Architectural Background with Deep Navy Vignette Overlay */}
          <div 
            className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-primary-navy/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <FadeIn direction="up">
                {/* Government Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans('Profil & Tata Kelola Instansi', 'Institutional Profile & Governance')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                  {trans('Unit Kerja Pengadaan', 'Procurement Service Unit')} <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    {trans('Barang & Jasa Kemnaker RI', 'Goods & Services MoM RI')}
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  {trans('Pusat keunggulan pengadaan pemerintah yang berpegang teguh pada prinsip transparansi, profesionalisme, dan akuntabilitas berstandar nasional.', 'Government procurement center of excellence firmly adhering to the principles of transparency, professionalism, and national-standard accountability.')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {/* VISI & MISI SECTION */}
          <div id="visi-misi" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-20">
            <FadeIn direction="right" className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border-t-4 border-t-primary-blue">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary-blue font-bold shrink-0">
                  <Target className="w-5 h-5 text-primary-blue" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-navy">{trans('Visi', 'Vision')}</h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-lg leading-relaxed">
                &quot;{trans('Menjadi Unit Kerja Pengadaan Barang/Jasa Pemerintah yang Profesional, Modern, dan Berintegritas Tinggi untuk Mewujudkan Pengadaan yang Kredibel dan Akuntabel.', 'To become a Professional, Modern, and High-Integrity Government Procurement Unit to Realize Credible and Accountable Procurement.')}&quot;
              </p>
            </FadeIn>
            <FadeIn direction="left" className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border-t-4 border-t-accent-gold">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-accent-gold font-bold shrink-0">
                  <Compass className="w-5 h-5 text-accent-gold" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-navy">{trans('Misi', 'Mission')}</h2>
              </div>
              <ul className="text-slate-600 text-xs sm:text-base space-y-2 sm:space-y-3 list-disc pl-5">
                <li>{trans('Meningkatkan kualitas sumber daya manusia pengadaan yang berintegritas.', 'Enhance the quality of procurement human resources with high integrity.')}</li>
                <li>{trans('Mewujudkan sistem pengadaan yang transparan dan terintegrasi berbasis teknologi informasi.', 'Realize a transparent and integrated IT-based procurement system.')}</li>
                <li>{trans('Memberikan pelayanan prima kepada seluruh pemangku kepentingan dan penyedia.', 'Deliver excellent service to all stakeholders and vendors.')}</li>
                <li>{trans('Menerapkan prinsip tata kelola pemerintahan yang baik (Good Corporate Governance).', 'Implement principles of Good Governance.')}</li>
              </ul>
            </FadeIn>
          </div>

          {/* MAKLUMAT PELAYANAN SECTION */}
          <div id="maklumat" className="scroll-mt-32 mb-12 sm:mb-20">
            <FadeIn direction="up">
              <div className="bg-gradient-to-br from-[#0B1D3A] via-[#102A54] to-[#0A1830] rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3 sm:mb-4">
                    {trans('Maklumat Pelayanan UKPBJ Kemnaker RI', 'Service Charter of UKPBJ MoM RI')}
                  </h3>
                  <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto mb-4 sm:mb-6" />
                  <blockquote className="text-slate-200 text-xs sm:text-lg italic leading-relaxed font-medium">
                    &quot;{trans('Dengan ini, kami pimpinan dan seluruh jajaran Unit Kerja Pengadaan Barang/Jasa Kementerian Ketenagakerjaan RI menyatakan sanggup menyelenggarakan pelayanan pengadaan sesuai standar pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku.', 'We, the leadership and staff of the Goods/Services Procurement Unit of the Ministry of Manpower RI, declare our commitment to providing procurement services according to established service standards, and should we fail to fulfill this promise, we are prepared to accept sanctions in accordance with applicable laws and regulations.')}&quot;
                  </blockquote>
                </div>
              </div>
            </FadeIn>
          </div>

          <SectionHeading title={trans('Nilai-Nilai Dasar', 'Core Values')} subtitle={trans('Prinsip yang kami pegang teguh dalam setiap pelaksanaan tugas', 'Principles we firmly uphold in every task execution')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
            {values.map((val, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-11 h-11 sm:w-16 sm:h-16 bg-blue-50 text-primary-blue rounded-xl sm:rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300 shrink-0 shadow-2xs">
                  {val.icon}
                </div>
                <h3 className="font-bold text-xs sm:text-lg text-primary-navy mb-1 sm:mb-3">{val.title}</h3>
                <p className="text-[11px] sm:text-sm text-slate-500 leading-relaxed line-clamp-3 sm:line-clamp-none">{val.desc}</p>
              </FadeIn>
            ))}
          </div>
          
          <div className="bg-white p-3.5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 mb-12 sm:mb-20 overflow-hidden">
             <SectionHeading title={trans('Struktur Organisasi', 'Organizational Structure')} subtitle={trans('Bagan struktur kepengurusan UKPBJ', 'UKPBJ management structure chart')} />
             <div className="mt-5 sm:mt-8 overflow-x-auto">
               <OrganizationChart />
             </div>
          </div>

          {/* FAQ SECTION */}
          <div id="faq" className="scroll-mt-32 mb-10">
            <SectionHeading title={trans('Pertanyaan Umum (FAQ)', 'Frequently Asked Questions (FAQ)')} subtitle={trans('Informasi seputar pertanyaan yang sering diajukan terkait UKPBJ', 'Information on frequently asked questions about UKPBJ')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <FadeIn direction="up" delay={0.1} className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
                <h4 className="text-base font-bold text-primary-navy mb-2">{trans('Bagaimana cara mendaftar sebagai penyedia di SPSE Kemnaker?', 'How to register as a vendor in MoM SPSE?')}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {trans('Penyedia dapat mendaftar secara online melalui portal SPSE Kemnaker, kemudian membawa dokumen asli verifikasi ke kantor LPSE/UKPBJ Kemnaker untuk aktivasi akun.', 'Vendors can register online through the MoM SPSE portal, then bring original verification documents to the LPSE/UKPBJ office for account activation.')}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.2} className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
                <h4 className="text-base font-bold text-primary-navy mb-2">{trans('Di mana melihat jadwal pengumuman tender aktif?', 'Where to view active tender announcement schedules?')}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {trans('Seluruh jadwal tender aktif dapat dipantau langsung melalui menu Agenda dan portal SPSE resmi Kemnaker RI secara transparan dan real-time.', 'All active tender schedules can be monitored directly through the Agenda menu and official SPSE portal transparently and in real-time.')}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.3} className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
                <h4 className="text-base font-bold text-primary-navy mb-2">{trans('Apakah ada biaya dalam proses pengadaan barang dan jasa?', 'Are there any fees in the procurement process?')}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {trans('Seluruh layanan pengadaan barang dan jasa serta verifikasi di UKPBJ Kemnaker adalah 100% GRATIS dan bebas dari segala bentuk pungutan liar.', 'All procurement and verification services at UKPBJ Kemnaker are 100% FREE and free from any illegal levies.')}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.4} className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
                <h4 className="text-base font-bold text-primary-navy mb-2">{trans('Bagaimana mengajukan konsultasi pengadaan barang dan jasa?', 'How to request procurement consultation?')}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {trans('Anda dapat menggunakan menu Layanan > Klinik Pengadaan atau menghubungi Helpdesk UKPBJ melalui tombol kontak WhatsApp yang tersedia.', 'You can use the Services > Procurement Clinic menu or contact the UKPBJ Helpdesk via the available WhatsApp button.')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
