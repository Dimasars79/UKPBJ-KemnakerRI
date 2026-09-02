"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { Monitor, FileText, HelpCircle, ShieldCheck, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayananPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(15);

  const activities: Record<number, any[]> = {
    10: [{ id: 1, title: 'Pembukaan Tender Alat Tulis Kantor', time: '09:00 WIB', location: 'Portal LPSE' }],
    15: [
      { id: 2, title: 'Bimbingan Teknis SIKaP', time: '10:00 - 12:00 WIB', location: 'Gedung A Kemenaker' },
      { id: 3, title: 'Konsultasi Pengadaan', time: '13:00 - 15:00 WIB', location: 'Ruang Rapat UKPBJ' }
    ],
    20: [{ id: 4, title: 'Batas Akhir Sanggahan Tender', time: '15:00 WIB', location: 'Sistem SPSE' }],
    25: [{ id: 5, title: 'Sosialisasi Regulasi Baru', time: '08:30 WIB', location: 'Zoom Meeting' }],
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const services = [
    {
      title: "LPSE",
      description: "Layanan Pengadaan Secara Elektronik untuk penyelenggaraan pengadaan barang/jasa.",
      icon: Monitor,
      href: "https://lpse.kemnaker.go.id"
    },
    {
      title: "SIKaP",
      description: "Sistem Informasi Kinerja Penyedia untuk mengelola data kinerja penyedia barang/jasa.",
      icon: FileText,
      href: "#"
    },
    {
      title: "Layanan Pengaduan",
      description: "Sampaikan laporan atau pengaduan terkait proses pengadaan barang/jasa.",
      icon: HelpCircle,
      href: "#"
    },
    {
      title: "Clearing House",
      description: "Konsultasi dan penyelesaian masalah terkait proses pengadaan barang/jasa.",
      icon: ShieldCheck,
      href: "#"
    }
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
          <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-overlay" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeIn direction="up">
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-6">{t('page_layanan.title')}</h1>
              <div className="w-20 h-1 bg-accent-gold mx-auto mb-8 rounded-full" />
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                {t('page_layanan.desc')}
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <StaggerItem key={idx}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <SectionHeading title="Kalender Kegiatan" subtitle="Jadwal layanan, tender, dan bimbingan teknis UKPBJ Kemenaker" />
          
          <div className="mt-12 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
            {/* Left: Calendar Grid */}
            <div className="w-full lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-primary-navy">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <div className="flex space-x-2">
                  <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                  <div key={day} className="text-xs font-bold text-slate-400 py-2 uppercase tracking-wider">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 md:h-12" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const hasActivity = activities[day];
                  const isSelected = selectedDate === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`h-10 md:h-12 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                        isSelected 
                          ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/30 font-bold scale-110 z-10' 
                          : 'bg-white hover:bg-slate-100 text-slate-700 font-medium border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <span>{day}</span>
                      {hasActivity && (
                        <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-accent-gold'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Activity Details */}
            <div className="w-full lg:w-1/2 bg-white p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <CalendarIcon className="w-7 h-7 text-primary-blue" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Jadwal pada tanggal</p>
                  <h3 className="text-2xl font-black text-primary-navy tracking-tight">
                    {selectedDate ? `${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}` : 'Pilih Tanggal'}
                  </h3>
                </div>
              </div>

              <div className="relative min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDate}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 absolute inset-0"
                  >
                    {selectedDate && activities[selectedDate] ? (
                      activities[selectedDate].map(activity => (
                        <div key={activity.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group border-l-4 border-l-accent-gold">
                          <h4 className="font-bold text-primary-navy mb-3 group-hover:text-primary-blue transition-colors text-lg">{activity.title}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-500 font-medium">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-slate-400" />
                              {activity.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                              {activity.location}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <CalendarIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="font-medium text-sm">Tidak ada kegiatan pada tanggal ini.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <SectionHeading title="Alur Pelayanan" subtitle="Langkah-langkah umum dalam proses layanan pengadaan" />
          
          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 relative group">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 group-hover:bg-blue-100 transition-colors duration-700 -translate-y-1/2 z-0"></div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: 1, title: 'Registrasi', desc: 'Penyedia mendaftar melalui sistem SPSE' },
                { step: 2, title: 'Verifikasi', desc: 'Pengecekan kelengkapan dokumen administrasi' },
                { step: 3, title: 'Akses Sistem', desc: 'Penyedia mendapatkan akses penuh ke sistem' },
                { step: 4, title: 'Proses Tender', desc: 'Mengikuti proses lelang/pengadaan' }
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <div className="flex flex-col items-center text-center bg-white p-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer rounded-xl hover:shadow-[0_10px_30px_rgba(30,58,138,0.08)] group/item">
                    <div className="w-16 h-16 rounded-full bg-primary-navy text-accent-gold flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white group-hover/item:bg-accent-gold group-hover/item:text-primary-navy group-hover/item:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover/item:scale-110 group-hover/item:border-yellow-100 transition-all duration-300">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg text-primary-navy mb-2 group-hover/item:text-primary-blue transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
