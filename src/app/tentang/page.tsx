import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Target, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { OrganizationChart } from '@/components/ui/OrganizationChart';

export default function TentangPage() {
  const values = [
    { title: 'Integritas', desc: 'Bertindak jujur, transparan, dan menghindari konflik kepentingan dalam seluruh proses pengadaan.', icon: <ShieldCheck className="w-6 h-6" /> },
    { title: 'Profesionalisme', desc: 'Menjalankan tugas dengan kompetensi tinggi dan sesuai dengan peraturan perundang-undangan.', icon: <Target className="w-6 h-6" /> },
    { title: 'Kolaboratif', desc: 'Membangun kerja sama yang baik dengan seluruh pihak dan pemangku kepentingan.', icon: <Users className="w-6 h-6" /> },
    { title: 'Inovatif', desc: 'Terus mengembangkan sistem dan metode pengadaan untuk mencapai efisiensi maksimal.', icon: <BookOpen className="w-6 h-6" /> },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#0d2e57] to-[#113a6e]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-[#f2b33a]/5 rounded-full blur-[100px] mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-blue-900/20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <FadeIn direction="up">
              <Image src="/logo-ukpbj-kemnaker-putih.png" alt="Logo UKPBJ" width={600} height={300} className="w-auto h-40 md:h-56 lg:h-64 object-contain mb-12 mx-auto drop-shadow-2xl" />
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">Tentang Organisasi Kami</h1>
              <p className="text-slate-300 text-center max-w-3xl mx-auto text-lg leading-relaxed">
                Unit Kerja Pengadaan Barang/Jasa (UKPBJ) merupakan pusat keunggulan pengadaan barang/jasa pemerintah yang berkomitmen pada standar layanan internasional.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <FadeIn direction="right" className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-t-primary-blue">
              <h2 className="text-2xl font-bold text-primary-navy mb-4">Visi</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                &quot;Menjadi Unit Kerja Pengadaan Barang/Jasa Pemerintah yang Profesional, Modern, dan Berintegritas Tinggi untuk Mewujudkan Pengadaan yang Kredibel dan Akuntabel.&quot;
              </p>
            </FadeIn>
            <FadeIn direction="left" className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-t-accent-gold">
              <h2 className="text-2xl font-bold text-primary-navy mb-4">Misi</h2>
              <ul className="text-slate-600 space-y-3 list-disc pl-5">
                <li>Meningkatkan kualitas sumber daya manusia pengadaan.</li>
                <li>Mewujudkan sistem pengadaan yang transparan dan terintegrasi berbasis teknologi informasi.</li>
                <li>Memberikan pelayanan prima kepada seluruh pemangku kepentingan.</li>
                <li>Menerapkan prinsip tata kelola pemerintahan yang baik (Good Corporate Governance).</li>
              </ul>
            </FadeIn>
          </div>

          <SectionHeading title="Nilai-Nilai Dasar" subtitle="Prinsip yang kami pegang teguh dalam setiap pelaksanaan tugas" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 mb-20">
            {values.map((val, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-primary-navy mb-3">{val.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
              </FadeIn>
            ))}
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 mb-10">
             <SectionHeading title="Struktur Organisasi" subtitle="Bagan struktur kepengurusan UKPBJ" />
             <div className="mt-8">
               <OrganizationChart />
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
