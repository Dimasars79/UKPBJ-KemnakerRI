"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AgendaCard } from '@/components/cards/AgendaCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgendaPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(15);

  type Activity = { id: number; title: string; time: string; location: string };
  const activities: Record<number, Activity[]> = {
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

  const dummyAgendas = [
    { title: 'Pembukaan Tender Konstruksi Gedung A', date: '20', month: 'Okt', time: '09:00 - 12:00 WIB', location: 'Gedung Utama Kemnaker', category: 'Tender' },
    { title: 'Sosialisasi E-Katalog Sektoral Baru', date: '25', month: 'Okt', time: '13:00 - 15:00 WIB', location: 'Zoom Meeting', category: 'Sosialisasi' },
    { title: 'Ujian Sertifikasi PBJ Tingkat Dasar', date: '02', month: 'Nov', time: '08:00 - 16:00 WIB', location: 'Pusdiklat Kemnaker', category: 'Sertifikasi' },
    { title: 'Rapat Evaluasi Kinerja Vendor Q3', date: '10', month: 'Nov', time: '10:00 - 14:00 WIB', location: 'Ruang Rapat UKPBJ', category: 'Rapat' },
    { title: 'Bimbingan Teknis Penggunaan SIKaP', date: '15', month: 'Nov', time: '09:00 - 12:00 WIB', location: 'Zoom Meeting', category: 'Bimtek' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20">
        {/* HERO SECTION - Official Schedule & Chronology Theme */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0B1528] via-[#111F3C] to-[#1A1728]">
          {/* Chronology Radial Light & Warm Amber Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                {/* Government Agenda Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                  <span>📅</span>
                  <span>Jadwal Resmi & Timeline Pengadaan</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  Kalender Kegiatan & Agenda <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white">
                    Unit Kerja PBJ Kemnaker
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
                  {t('page_agenda.desc')}
                </p>

                {/* Quick Info Chips */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Waktu Indonesia Barat (WIB) • Diperbarui Secara Berkala</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
          <SectionHeading title="Kalender Kegiatan Interaktif" subtitle="Pilih tanggal untuk melihat jadwal khusus pada hari tersebut" />
          
          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
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

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <SectionHeading title="Kegiatan Mendatang" subtitle="Agenda resmi yang akan diselenggarakan dalam waktu dekat" />
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <select className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue">
                <option>Semua Kategori</option>
                <option>Tender</option>
                <option>Sosialisasi</option>
                <option>Sertifikasi</option>
              </select>
              <select className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue">
                <option>Bulan Ini</option>
                <option>Bulan Depan</option>
              </select>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyAgendas.map((agenda, idx) => (
              <StaggerItem key={idx}>
                <AgendaCard {...agenda} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-12 text-center">
            <button className="bg-white border border-slate-200 hover:border-primary-blue text-primary-navy font-bold py-3 px-8 rounded-md transition-colors shadow-sm">
              Muat Lebih Banyak
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
