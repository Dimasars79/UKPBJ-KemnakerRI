"use client"

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  BellRing, ChevronRight, FileText, Calendar, Megaphone, 
  Newspaper, Laptop, Globe, MessageSquare, Download, 
  BarChart2, Bookmark, QrCode, Share2, Printer, 
  CheckCircle2, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export default function InformasiPage() {
  const { newsList, agendaList } = useData();
  const publishedNews = newsList.filter(n => n.status === 'Published');
  
  const recentUpdates = publishedNews.map((news) => ({
    date: news.date,
    type: news.category.toUpperCase(),
    title: news.title,
    icon: <Newspaper className="w-5 h-5 text-blue-300"/>,
    color: 'bg-blue-500/20'
  }));

  const serviceStatuses = [
    { name: 'SPSE Kemnaker', status: 'NORMAL', icon: <Laptop className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: 'Portal Informasi', status: 'NORMAL', icon: <Globe className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: 'Layanan Konsultasi', status: 'NORMAL', icon: <MessageSquare className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: 'Download Dokumen', status: 'NORMAL', icon: <Download className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: 'Layanan Pengaduan', status: 'NORMAL', icon: <ShieldCheck className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: 'SIRUP Kemnaker', status: 'NORMAL', icon: <BarChart2 className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
      {/* Background Decorative Patterns & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c712_1px,transparent_1px),linear-gradient(to_bottom,#0284c712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl relative z-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            {/* HERO SECTION */}
            <FadeIn direction="up">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-white/30 h-64 flex flex-col justify-center p-8 group backdrop-blur-md">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />
                
                <div className="relative z-10 max-w-xs">
                  <span className="text-[10px] font-bold text-primary-navy bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 uppercase tracking-wider mb-2 inline-block">
                    # Kemnaker RI
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-primary-navy leading-tight mb-2 drop-shadow-xs">
                    UKPBJ<br/>UPDATE CENTER
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Pusat informasi terbaru Unit Kerja Pengadaan Barang/Jasa Kementerian Ketenagakerjaan RI
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* WHAT'S NEW CARD */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-[#0A1E38]/90 rounded-3xl text-white overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md flex-grow flex flex-col">
                <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <BellRing className="w-5 h-5 text-accent-gold" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">APA YANG BARU?</h2>
                    <span className="bg-accent-gold text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full ml-2">
                      {recentUpdates.length}
                    </span>
                  </div>
                  <Link href="/informasi/peraturan" className="text-xs sm:text-sm text-slate-300 hover:text-accent-gold flex items-center transition-colors font-semibold">
                    Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  <div className="px-6 md:px-8 py-2">
                    {recentUpdates.map((item, idx) => (
                      <div key={idx} className="flex items-center py-4 border-b border-white/5 last:border-0 group cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors">
                        <div className="w-12 text-center text-[11px] font-bold text-slate-400 whitespace-pre-line leading-tight">
                          {item.date}
                        </div>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mx-3 flex-shrink-0 ${item.color}`}>
                          {item.icon}
                        </div>
                        <div className="flex-grow min-w-0 pr-3">
                          <p className="text-[10px] font-bold text-amber-300 tracking-wider mb-0.5">{item.type}</p>
                          <p className="text-xs sm:text-sm text-white font-medium truncate group-hover:text-amber-200 transition-colors">{item.title}</p>
                        </div>
                        <div className="flex items-center justify-end w-14">
                          <span className="bg-primary-blue/30 text-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                            Baru
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <Link href="/informasi/peraturan" className="block text-center w-full py-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl text-xs font-bold text-white transition-all">
                    Lihat Semua Pembaruan
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* BOTTOM INFO WIDGET */}
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white/95 rounded-3xl p-6 border border-white/40 shadow-lg backdrop-blur-md flex items-center space-x-4">
                <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary-navy">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-primary-navy">Terakhir diperbarui: 2 September 2026, 13:40 WIB</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">UKPBJ Kementerian Ketenagakerjaan RI berkomitmen menyajikan informasi yang akurat dan transparan.</p>
                </div>
              </div>
            </FadeIn>

          </div>


          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6">
            
            {/* STATUS LAYANAN */}
            <FadeIn direction="up">
              <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-white/40 shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg sm:text-xl font-bold text-primary-navy tracking-tight">STATUS LAYANAN</h2>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <Link href="/layanan" className="text-xs sm:text-sm text-primary-navy hover:text-primary-blue flex items-center font-bold">
                    Lihat Detail <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                  {serviceStatuses.map((service, idx) => (
                    <div key={idx} className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white transition-colors">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${service.color} shadow-2xs`}>
                        {service.icon}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{service.name}</p>
                        <p className="text-[11px] font-extrabold text-emerald-600 mt-0.5 uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {service.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t border-slate-100 text-xs text-slate-500 gap-2">
                  <div className="flex items-center text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Semua layanan berjalan normal
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Terakhir diperbarui: 2 Sep 2026, 13:40 WIB
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* QUICK STATS ROW */}
            <FadeIn direction="up" delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Regulasi */}
                <Link href="/informasi/peraturan" className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md flex flex-col h-full hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-0.5">128</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">Regulasi</p>
                  <p className="text-[11px] text-slate-500 mb-3">Total Regulasi</p>
                  <div className="mt-auto flex items-center text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Agenda */}
                <Link href="/agenda" className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md flex flex-col h-full hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-0.5">{agendaList.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">Agenda</p>
                  <p className="text-[11px] text-slate-500 mb-3">Agenda Mendatang</p>
                  <div className="mt-auto flex items-center text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Pengumuman */}
                <Link href="/informasi/pemilu" className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md flex flex-col h-full hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-0.5">36</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">Pengumuman</p>
                  <p className="text-[11px] text-slate-500 mb-3">Pengumuman Aktif</p>
                  <div className="mt-auto flex items-center text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Berita */}
                <Link href="/informasi" className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md flex flex-col h-full hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-0.5">{publishedNews.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">Berita</p>
                  <p className="text-[11px] text-slate-500 mb-3">Berita Publikasi</p>
                  <div className="mt-auto flex items-center text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              </div>
            </FadeIn>

            {/* QUICK ACTIONS ROW */}
            <FadeIn direction="up" delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                
                <div className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md text-center flex flex-col items-center hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-2xs">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-primary-navy mb-1">Simpan Info</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Simpan regulasi penting untuk dibaca nanti.</p>
                  <button className="mt-auto w-full py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 group-hover:bg-primary-navy group-hover:text-white group-hover:border-transparent transition-colors">
                    Tersimpan
                  </button>
                </div>

                <div className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md text-center flex flex-col items-center hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-2xs">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-primary-navy mb-1">QR Code</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Akses cepat dokumen melalui QR Code.</p>
                  <button className="mt-auto w-full py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 group-hover:bg-primary-navy group-hover:text-white group-hover:border-transparent transition-colors">
                    Pindai
                  </button>
                </div>

                <div className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md text-center flex flex-col items-center hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-2xs">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-primary-navy mb-1">Bagikan</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Bagikan info ke rekan kerja secara instan.</p>
                  <button className="mt-auto w-full py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 group-hover:bg-primary-navy group-hover:text-white group-hover:border-transparent transition-colors">
                    Bagikan
                  </button>
                </div>

                <div className="bg-white/95 rounded-3xl p-5 border border-white/40 shadow-lg backdrop-blur-md text-center flex flex-col items-center hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-2xs">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-primary-navy mb-1">Cetak PDF</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Cetak halaman atau simpan dokumen PDF.</p>
                  <button className="mt-auto w-full py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 group-hover:bg-primary-navy group-hover:text-white group-hover:border-transparent transition-colors">
                    Cetak
                  </button>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

