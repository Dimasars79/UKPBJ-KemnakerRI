"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AgendaCard } from '@/components/cards/AgendaCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, MessageSquare, Building2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

interface SelectedAgendaModalData {
  id?: string | number;
  title: string;
  category?: string;
  date: string;
  time: string;
  location: string;
  organizer?: string;
  capacity?: string;
  status?: string;
  description?: string;
}

// Robust helper to parse Indonesian / ISO / Standard date strings
const parseAgendaDate = (dateStr: string): { day: number; month: number; year: number } | null => {
  if (!dateStr) return null;
  const cleaned = dateStr.trim();

  // 1. ISO or standard format "YYYY-MM-DD"
  if (/^\d{4}-\d{1,2}-\d{1,2}/.test(cleaned)) {
    const parts = cleaned.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const day = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 2. Format "DD/MM/YYYY" or "DD-MM-YYYY"
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(cleaned)) {
    const parts = cleaned.split(/[\/\-]/);
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 3. Textual Indonesian & English format e.g. "15 Sep 2026", "02 Oktober 2026"
  const monthMap: Record<string, number> = {
    jan: 0, januari: 0, january: 0,
    feb: 1, februari: 1, february: 1,
    mar: 2, maret: 2, march: 2,
    apr: 3, april: 3,
    mei: 4, may: 4,
    jun: 5, juni: 5, june: 5,
    jul: 6, juli: 6, july: 6,
    agu: 7, ags: 7, agustus: 7, aug: 7, august: 7,
    sep: 8, september: 8,
    okt: 9, oktober: 9, oct: 9, october: 9,
    nov: 10, november: 10,
    des: 11, desember: 11, dec: 11, december: 11
  };

  const tokens = cleaned.split(/\s+/);
  if (tokens.length >= 3) {
    const day = parseInt(tokens[0], 10);
    const monthKey = tokens[1].toLowerCase().replace(/[^a-z]/g, '');
    const month = monthMap[monthKey] !== undefined ? monthMap[monthKey] : -1;
    const year = parseInt(tokens[2], 10);

    if (!isNaN(day) && month !== -1 && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 4. Native Date fallback
  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) {
    return {
      day: parsed.getDate(),
      month: parsed.getMonth(),
      year: parsed.getFullYear()
    };
  }

  return null;
};

export default function AgendaPage() {
  const { t } = useLanguage();
  const { agendaList } = useData();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Default: September 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedAgendaModal, setSelectedAgendaModal] = useState<SelectedAgendaModalData | null>(null);
  
  // Category & Period Filters for Upcoming Activities
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua Kategori');
  const [periodFilter, setPeriodFilter] = useState<string>('Semua');

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Build activities dynamically ONLY for the current active month and year
  const activities: Record<number, SelectedAgendaModalData[]> = {};
  agendaList.forEach((ag, idx) => {
    const parsed = parseAgendaDate(ag.date);
    if (parsed && parsed.year === currentYear && parsed.month === currentMonth) {
      if (!activities[parsed.day]) {
        activities[parsed.day] = [];
      }
      activities[parsed.day].push({
        id: ag.id || idx,
        title: ag.title,
        category: ag.category,
        date: ag.date,
        time: ag.time,
        location: ag.location,
        organizer: ag.organizer,
        capacity: ag.capacity,
        status: ag.status
      });
    }
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  // Map dummyAgendas with parsed dates for filtering
  const dummyAgendas = agendaList.map((ag) => {
    const parsed = parseAgendaDate(ag.date);
    const dayStr = parsed ? String(parsed.day).padStart(2, '0') : (ag.date.split(' ')[0] || '15');
    const monthStr = parsed ? monthNames[parsed.month].slice(0, 3) : (ag.date.split(' ')[1] || 'Sep');
    return {
      id: ag.id,
      title: ag.title,
      date: dayStr,
      month: monthStr,
      fullDate: ag.date,
      time: ag.time,
      location: ag.location,
      category: ag.category,
      organizer: ag.organizer,
      capacity: ag.capacity,
      status: ag.status,
      parsedMonth: parsed ? parsed.month : 8,
      parsedYear: parsed ? parsed.year : 2026
    };
  });

  // Filtered upcoming agendas
  const filteredAgendas = dummyAgendas.filter((agenda) => {
    const matchCategory = categoryFilter === 'Semua Kategori' || agenda.category === categoryFilter;
    let matchPeriod = true;
    if (periodFilter === 'Bulan Ini') {
      matchPeriod = agenda.parsedMonth === 8 && agenda.parsedYear === 2026; // September 2026
    } else if (periodFilter === 'Bulan Depan') {
      matchPeriod = agenda.parsedMonth === 9 && agenda.parsedYear === 2026; // Oktober 2026
    }
    return matchCategory && matchPeriod;
  });

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
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jadwal Resmi & Timeline Pengadaan</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  Kalender Kegiatan & Agenda <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white">
                    Unit Kerja PBJ Kemnaker
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  {t('page_agenda.desc')}
                </p>
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
                  <button onClick={prevMonth} aria-label="Bulan sebelumnya" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button onClick={nextMonth} aria-label="Bulan berikutnya" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
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
                  const hasActivity = activities[day] && activities[day].length > 0;
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
                    key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {selectedDate && activities[selectedDate] && activities[selectedDate].length > 0 ? (
                      activities[selectedDate].map(activity => (
                        <div 
                          key={activity.id} 
                          onClick={() => setSelectedAgendaModal(activity)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedAgendaModal(activity); }}
                          className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-primary-blue/30 transition-all group border-l-4 border-l-accent-gold cursor-pointer text-left"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-bold text-primary-navy group-hover:text-primary-blue transition-colors text-lg leading-snug">{activity.title}</h4>
                            {activity.category && (
                              <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-blue-50 text-primary-blue text-xs font-bold">
                                {activity.category}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-500 font-medium mt-3">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                              {activity.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-primary-blue">
                            <span>Klik untuk detail kegiatan</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full py-12 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <CalendarIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="font-medium text-sm">
                          {selectedDate 
                            ? `Tidak ada kegiatan pada ${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}.`
                            : 'Pilih tanggal pada kalender untuk melihat rincian kegiatan.'
                          }
                        </p>
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
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue text-sm cursor-pointer"
              >
                <option value="Semua Kategori">Semua Kategori</option>
                <option value="Tender">Tender</option>
                <option value="Bimtek">Bimtek</option>
                <option value="Sosialisasi">Sosialisasi</option>
                <option value="Sertifikasi">Sertifikasi</option>
                <option value="Rapat">Rapat</option>
              </select>
              <select 
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md shadow-sm outline-none focus:border-primary-blue text-sm cursor-pointer"
              >
                <option value="Semua">Semua Jadwal</option>
                <option value="Bulan Ini">Bulan Ini (September)</option>
                <option value="Bulan Depan">Bulan Depan (Oktober)</option>
              </select>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredAgendas.map((agenda, idx) => (
              <StaggerItem key={agenda.id || idx} className="h-full flex">
                <AgendaCard 
                  {...agenda} 
                  onClick={() => setSelectedAgendaModal({
                    id: agenda.id || idx,
                    title: agenda.title,
                    category: agenda.category,
                    date: agenda.fullDate,
                    time: agenda.time,
                    location: agenda.location,
                    organizer: agenda.organizer,
                    capacity: agenda.capacity,
                    status: agenda.status
                  })}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {filteredAgendas.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400">
              <p className="text-sm font-medium">Tidak ada kegiatan yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </section>

        {/* SIMPLE DETAIL POPUP MODAL */}
        <AnimatePresence>
          {selectedAgendaModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedAgendaModal(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Modal Dialog Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-8"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-primary-navy to-[#152a54] p-6 sm:p-7 text-white relative">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {selectedAgendaModal.category || 'Agenda PBJ'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAgendaModal(null)}
                      aria-label="Tutup modal"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {selectedAgendaModal.title}
                  </h3>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* 4 Quick Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal Kegiatan</div>
                        <div className="text-sm sm:text-base font-bold text-primary-navy mt-0.5">{selectedAgendaModal.date}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Waktu Pelaksanaan</div>
                        <div className="text-sm sm:text-base font-bold text-primary-navy mt-0.5">{selectedAgendaModal.time}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lokasi / Ruang</div>
                        <div className="text-sm sm:text-base font-bold text-primary-navy mt-0.5">{selectedAgendaModal.location}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Penyelenggara</div>
                        <div className="text-sm sm:text-base font-bold text-primary-navy mt-0.5">
                          {selectedAgendaModal.organizer || 'Biro Perencanaan & UKPBJ Kemnaker'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan Singkat / Deskripsi */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center gap-2 mb-2 text-primary-navy font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-slate-900" />
                      <span>Keterangan & Informasi Kegiatan</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedAgendaModal.description || 
                        `Kegiatan resmi "${selectedAgendaModal.title}" ini diselenggarakan oleh ${selectedAgendaModal.organizer || 'UKPBJ Kemnaker'} guna memberikan bimbingan teknis, koordinasi pengadaan, serta pendampingan bagi para pemangku kepentingan demi kelancaran proses pengadaan barang dan jasa yang transparan dan akuntabel.`
                      }
                    </p>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="bg-slate-50 px-6 sm:px-7 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedAgendaModal(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors shadow-sm"
                  >
                    Tutup
                  </button>

                  <a
                    href={`https://wa.me/628988180009?text=${encodeURIComponent(`Halo Admin UKPBJ Kemnaker, saya ingin bertanya informasi mengenai agenda: "${selectedAgendaModal.title}" (Tanggal: ${selectedAgendaModal.date})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Tanya via WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

