"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  BellRing, ChevronRight, FileText, Calendar, Megaphone, 
  Newspaper, Laptop, Globe, MessageSquare, Download, 
  BarChart2, Bookmark, QrCode, Share2, Printer, 
  CheckCircle2, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';

export default function InformasiPage() {
  
  const recentUpdates = [
    { date: '2 SEP\n2026', type: 'REGULASI', title: 'Peraturan Menteri Ketenagakerjaan tentang Pedoman PBJ', icon: <FileText className="w-5 h-5 text-blue-500"/>, color: 'bg-blue-400/20' },
    { date: '1 SEP\n2026', type: 'AGENDA', title: 'Bimbingan Teknis Pengadaan Barang/Jasa Batch 4', icon: <Calendar className="w-5 h-5 text-green-500"/>, color: 'bg-green-400/20' },
    { date: '31 AGU\n2026', type: 'PENGUMUMAN', title: 'Pengumuman Tender Baru Bulan September 2026', icon: <Megaphone className="w-5 h-5 text-yellow-500"/>, color: 'bg-yellow-400/20' },
    { date: '30 AGU\n2026', type: 'DOKUMEN', title: 'Dokumen Kontrak Standar Diperbarui', icon: <FileText className="w-5 h-5 text-purple-400"/>, color: 'bg-purple-400/20' },
    { date: '29 AGU\n2026', type: 'BERITA', title: 'Kemnaker Perkuat Kompetensi SDM Pengadaan', icon: <Newspaper className="w-5 h-5 text-blue-400"/>, color: 'bg-blue-400/20' },
  ];

  const serviceStatuses = [
    { name: 'SPSE Kemnaker', status: 'NORMAL', icon: <Laptop className="w-6 h-6 text-blue-500"/>, color: 'bg-blue-50 text-blue-600' },
    { name: 'Portal Informasi', status: 'NORMAL', icon: <Globe className="w-6 h-6 text-indigo-500"/>, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Layanan Konsultasi', status: 'NORMAL', icon: <MessageSquare className="w-6 h-6 text-sky-500"/>, color: 'bg-sky-50 text-sky-600' },
    { name: 'Download Dokumen', status: 'NORMAL', icon: <Download className="w-6 h-6 text-blue-500"/>, color: 'bg-blue-50 text-blue-600' },
    { name: 'Layanan Pengaduan', status: 'NORMAL', icon: <ShieldCheck className="w-6 h-6 text-sky-500"/>, color: 'bg-sky-50 text-sky-600' },
    { name: 'SIRUP Kemnaker', status: 'NORMAL', icon: <BarChart2 className="w-6 h-6 text-indigo-500"/>, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            {/* HERO SECTION */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 h-64 flex flex-col justify-center p-8 group">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-[url('/gedung-kemnaker.jpg')] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
              
              <div className="relative z-10 max-w-xs">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-navy leading-tight mb-4 drop-shadow-sm">
                  UKPBJ<br/>UPDATE CENTER
                </h1>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Pusat informasi terbaru Unit Kerja Pengadaan Barang/Jasa Kementerian Ketenagakerjaan RI
                </p>
              </div>
            </div>

            {/* WHAT'S NEW CARD */}
            <div className="bg-[#0B1B3D] rounded-3xl text-white overflow-hidden shadow-xl shadow-blue-900/10 flex-grow flex flex-col">
              <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <BellRing className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold">APA YANG BARU?</h2>
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">12</span>
                </div>
                <button className="text-sm text-blue-200 hover:text-white flex items-center transition-colors">
                  Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <div className="px-6 md:px-8 py-2">
                  {recentUpdates.map((item, idx) => (
                    <div key={idx} className="flex items-center py-4 border-b border-white/5 last:border-0 group cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors">
                      <div className="w-12 text-center text-xs font-bold text-slate-400 whitespace-pre-line leading-tight">
                        {item.date}
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-4 flex-shrink-0 ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-grow min-w-0 pr-4">
                        <p className="text-[10px] font-bold text-blue-300 tracking-wider mb-1">{item.type}</p>
                        <p className="text-sm text-white font-medium truncate group-hover:text-blue-200 transition-colors">{item.title}</p>
                      </div>
                      <div className="flex items-center justify-end w-16">
                        <span className="bg-[#054593] text-blue-100 text-[10px] px-3 py-1 rounded-full border border-blue-400/20 group-hover:bg-blue-600 transition-colors">
                          Baru
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-all">
                  Lihat Semua Pembaruan
                </button>
              </div>
            </div>

            {/* BOTTOM INFO WIDGET */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-navy">Terakhir diperbarui: 2 September 2026, 13:40 WIB</p>
                <p className="text-xs text-slate-500 mt-1">UKPBJ Kementerian Ketenagakerjaan RI berkomitmen menyajikan informasi yang akurat, transparan, dan akuntabel.</p>
              </div>
              <button className="ml-auto bg-primary-navy hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center whitespace-nowrap transition-colors flex-shrink-0">
                Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>

          </div>


          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6">
            
            {/* STATUS LAYANAN */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-primary-navy">STATUS LAYANAN</h2>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <button className="text-sm text-primary-blue hover:text-blue-700 flex items-center font-medium">
                  Lihat Detail <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-8">
                {serviceStatuses.map((service, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${service.color}`}>
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{service.name}</p>
                      <p className="text-xs font-bold text-green-500 mt-1 uppercase tracking-wide">{service.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-100 text-sm text-slate-500">
                <div className="flex items-center text-green-600 font-medium mb-2 sm:mb-0">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Semua layanan berjalan normal
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Terakhir diperbarui: 2 Sep 2026, 13:40 WIB
                </div>
              </div>
            </div>

            {/* QUICK STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Regulasi */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-3xl font-black text-primary-navy mb-1">128</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Regulasi</p>
                <p className="text-xs text-slate-500 mb-4">Total Regulasi</p>
                <div className="mt-auto flex items-center text-xs font-bold text-primary-navy">
                  Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Agenda */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-primary-navy mb-1">24</h3>
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Agenda</p>
                <p className="text-xs text-slate-500 mb-4">Agenda Mendatang</p>
                <div className="mt-auto flex items-center text-xs font-bold text-primary-navy">
                  Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Pengumuman */}
              <div className="bg-[#FFFDF5] rounded-3xl p-6 border border-yellow-100/50 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100/50 flex items-center justify-center mb-6">
                  <Megaphone className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-3xl font-black text-primary-navy mb-1">36</h3>
                <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">Pengumuman</p>
                <p className="text-xs text-slate-500 mb-4">Pengumuman Aktif</p>
                <div className="mt-auto flex items-center text-xs font-bold text-primary-navy">
                  Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Berita */}
              <div className="bg-[#F8F7FC] rounded-3xl p-6 border border-purple-100/50 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                  <Newspaper className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-3xl font-black text-primary-navy mb-1">87</h3>
                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Berita</p>
                <p className="text-xs text-slate-500 mb-4">Berita Publikasi</p>
                <div className="mt-auto flex items-center text-xs font-bold text-primary-navy">
                  Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center flex flex-col items-center hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Bookmark className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-primary-navy mb-2">Simpan Informasi</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Simpan regulasi, berita, atau dokumen penting untuk dibaca nanti.</p>
                <button className="mt-auto w-full py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                  Lihat Tersimpan
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center flex flex-col items-center hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <QrCode className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-primary-navy mb-2">QR Code Dokumen</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Akses cepat dokumen melalui QR Code untuk kemudahan berbagi.</p>
                <button className="mt-auto w-full py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                  Pindai / Lihat
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center flex flex-col items-center hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-primary-navy mb-2">Bagikan Informasi</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Bagikan informasi penting ke rekan kerja melalui berbagai media.</p>
                <button className="mt-auto w-full py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                  Bagikan Sekarang
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center flex flex-col items-center hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Printer className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-primary-navy mb-2">Cetak Halaman</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Cetak halaman informasi atau simpan sebagai dokumen PDF.</p>
                <button className="mt-auto w-full py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                  Cetak / PDF
                </button>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
