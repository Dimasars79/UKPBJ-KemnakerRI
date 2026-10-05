"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AgendaCard } from '@/components/cards/AgendaCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, Building2, Video, ExternalLink } from 'lucide-react';
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
  zoomUrl?: string;
}

import { parseAgendaDate, isAgendaExpired } from '@/lib/agendaUtils';
import { getNationalHoliday, isSunday } from '@/lib/nationalHolidays';

export default function AgendaPage() {
  const { t, trans, language } = useLanguage();
  const { agendaList } = useData();

  // Real-world dynamic date state (auto-updates every minute if day changes)
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  // Active calendar view (defaults to real-world current month and year)
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(() => new Date().getDate());
  const [selectedAgendaModal, setSelectedAgendaModal] = useState<SelectedAgendaModalData | null>(null);
  
  // Category & Period Filters for Upcoming Activities
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua Kategori');
  const [periodFilter, setPeriodFilter] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  const monthNamesID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const monthNamesEN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNames = language === 'en' ? monthNamesEN : monthNamesID;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Real-world next month computation
  const nextRealMonth = (todayMonth + 1) % 12;
  const nextRealYear = todayMonth === 11 ? todayYear + 1 : todayYear;

  // Build activities dynamically ONLY for the current active month and year (excluding expired)
  const activities: Record<number, SelectedAgendaModalData[]> = {};
  agendaList.forEach((ag, idx) => {
    if (isAgendaExpired(ag, now)) return;
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
        status: ag.status,
        description: ag.description,
        zoomUrl: ag.zoomUrl
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

  const goToToday = () => {
    const liveNow = new Date();
    setCurrentDate(new Date(liveNow.getFullYear(), liveNow.getMonth(), 1));
    setSelectedDate(liveNow.getDate());
  };

  // Map dummyAgendas with parsed dates for chronological sorting & filtering (excluding expired)
  const dummyAgendas = agendaList
    .filter((ag) => !isAgendaExpired(ag, now))
    .map((ag) => {
      const parsed = parseAgendaDate(ag.date);
      const dayStr = parsed ? String(parsed.day).padStart(2, '0') : (ag.date.split(' ')[0] || '15');
      const monthStr = parsed ? monthNames[parsed.month].slice(0, 3) : (ag.date.split(' ')[1] || 'Sep');
      const timestamp = parsed ? new Date(parsed.year, parsed.month, parsed.day).getTime() : Number.MAX_SAFE_INTEGER;
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
        description: ag.description,
        zoomUrl: ag.zoomUrl,
        parsedDay: parsed ? parsed.day : 1,
        parsedMonth: parsed ? parsed.month : todayMonth,
        parsedYear: parsed ? parsed.year : todayYear,
        parsedTimestamp: timestamp
      };
    });

  // Filtered upcoming agendas (preserves CMS update/insert order with newest first)
  const filteredAgendas = dummyAgendas
    .filter((agenda) => {
      const matchCategory = categoryFilter === 'Semua Kategori' || agenda.category === categoryFilter;
      let matchPeriod = true;
      if (periodFilter === 'Bulan Ini') {
        matchPeriod = agenda.parsedMonth === todayMonth && agenda.parsedYear === todayYear;
      } else if (periodFilter === 'Bulan Depan') {
        matchPeriod = agenda.parsedMonth === nextRealMonth && agenda.parsedYear === nextRealYear;
      }
      return matchCategory && matchPeriod;
    });

  // Pagination calculation (6 items per page)
  const totalPages = Math.ceil(filteredAgendas.length / ITEMS_PER_PAGE) || 1;
  const paginatedAgendas = filteredAgendas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setCurrentPage(1);
  };

  const handlePeriodChange = (val: string) => {
    setPeriodFilter(val);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pb-20 -mt-[80px] md:-mt-[88px]">
        {/* HERO SECTION - Official Schedule & Chronology Theme */}
        <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0B1528] via-[#111F3C] to-[#1A1728]">
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
                  <span>{trans('Jadwal Resmi & Timeline Pengadaan', 'Official Schedule & Procurement Timeline')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                  {trans('Kalender Kegiatan & Agenda', 'Events & Activities Calendar')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white">
                    {trans('Unit Kerja PBJ Kemnaker', 'MoM PBJ Work Unit')}
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  {t('page_agenda.desc')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 mb-12 sm:mb-16">
          <SectionHeading title={trans("Kalender Kegiatan Interaktif", "Interactive Events Calendar")} subtitle={trans("Pilih tanggal untuk melihat jadwal khusus pada hari tersebut", "Select a date to view special schedules for that day")} />
          
          {/* Elegant Gold & Black Frame Border Calendar Widget Container */}
          <div className="mt-6 sm:mt-8 p-[2px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-amber-400 to-slate-950 shadow-xl shadow-slate-950/10">
            <div className="rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-2px)] bg-white relative overflow-hidden flex flex-col lg:flex-row">
              {/* Left: Calendar Grid */}
              <div className="w-full lg:w-1/2 p-5 sm:p-7 md:p-9 relative z-10 bg-white">
                <div>
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-xl font-black text-slate-950 tracking-tight">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <button 
                        onClick={goToToday}
                        title={trans("Kembali ke hari ini", "Back to today")}
                        className="px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-amber-200 border border-amber-400/50 transition-all shadow-xs cursor-pointer"
                      >
                        {trans('Hari Ini', 'Today')}
                      </button>
                      <button onClick={prevMonth} aria-label={trans("Bulan sebelumnya", "Previous month")} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-xs cursor-pointer">
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      </button>
                      <button onClick={nextMonth} aria-label={trans("Bulan berikutnya", "Next month")} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-xs cursor-pointer">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center mb-2">
                    {[
                      trans('Min', 'Sun'),
                      trans('Sen', 'Mon'),
                      trans('Sel', 'Tue'),
                      trans('Rab', 'Wed'),
                      trans('Kam', 'Thu'),
                      trans('Jum', 'Fri'),
                      trans('Sab', 'Sat')
                    ].map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`text-[10px] sm:text-xs font-bold py-1 sm:py-2 uppercase tracking-wider ${
                          idx === 0 ? 'text-rose-600 font-black' : 'text-slate-400'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8 sm:h-10 md:h-12" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const hasActivity = activities[day] && activities[day].length > 0;
                      const isSelected = selectedDate === day;
                      const isToday = currentYear === todayYear && currentMonth === todayMonth && day === todayDate;
                      const holiday = getNationalHoliday(currentYear, currentMonth, day);
                      const isSun = isSunday(currentYear, currentMonth, day);
                      const isRedDay = isSun || Boolean(holiday);

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          title={holiday ? (language === 'en' ? holiday.nameEn : holiday.name) : undefined}
                          className={`h-8 sm:h-10 md:h-12 rounded-lg sm:rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 text-xs sm:text-sm cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-950 text-amber-300 shadow-lg shadow-slate-950/25 font-black scale-105 sm:scale-110 z-10 ring-2 ring-amber-400 border border-amber-400' 
                              : isToday
                              ? `bg-amber-50 ${isRedDay ? 'text-rose-600' : 'text-slate-950'} font-black border-2 border-amber-500 hover:bg-amber-100 shadow-xs`
                              : isRedDay
                              ? 'bg-rose-50/60 hover:bg-rose-50 text-rose-600 font-bold border border-rose-200/80 hover:border-rose-400 hover:shadow-xs'
                              : 'bg-slate-50/80 hover:bg-white text-slate-800 font-semibold border border-slate-200/80 hover:border-slate-400 hover:text-slate-950 hover:shadow-xs'
                          }`}
                        >
                          <span>
                            {day}
                          </span>
                          <div className="flex items-center gap-0.5 sm:gap-1 absolute bottom-1 sm:bottom-1.5">
                            {holiday && (
                              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isSelected ? 'bg-rose-400 ring-1 ring-white' : 'bg-rose-500'}`} />
                            )}
                            {hasActivity && (
                              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isSelected ? 'bg-amber-300 ring-1 ring-white' : isToday ? 'bg-amber-600' : 'bg-amber-500'}`} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Calendar Legend Bar */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shrink-0" />
                      <span>{trans('Libur Nasional / Min', 'National Holiday / Sun')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0" />
                      <span>{trans('Agenda PBJ', 'PBJ Event')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs border border-slate-300 bg-slate-100 inline-block shrink-0" />
                      <span>{trans('Hari Kerja', 'Workday')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Vertical Divider */}
              <div className="hidden lg:flex items-center justify-center relative z-10">
                <div className="w-[1px] h-4/5 bg-slate-200" />
              </div>
              <div className="block lg:hidden px-6 relative z-10">
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Right: Activity Details */}
              <div className="w-full lg:w-1/2 p-5 sm:p-7 md:p-9 relative z-10 flex flex-col justify-between bg-slate-50/30">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-950 text-amber-400 border border-amber-400/30 flex items-center justify-center flex-shrink-0 shadow-md shadow-slate-950/20">
                      <CalendarIcon className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">{trans('Jadwal pada tanggal', 'Schedule on date')}</p>
                      <h3 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                        {selectedDate ? `${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}` : trans('Pilih Tanggal', 'Select Date')}
                      </h3>
                    </div>
                  </div>

                  {/* Selected Date National Holiday Banner */}
                  {selectedDate && (() => {
                    const selectedHoliday = getNationalHoliday(currentYear, currentMonth, selectedDate);
                    if (!selectedHoliday) return null;
                    return (
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50/40 border border-rose-200/90 text-rose-900 shadow-xs flex items-start gap-3 mb-4">
                        <span className="text-xl sm:text-2xl select-none leading-none mt-0.5">🇮🇩</span>
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                            <span>{trans('Hari Libur Nasional', 'National Holiday')}</span>
                          </div>
                          <h4 className="font-bold text-rose-950 text-sm sm:text-base mt-1">
                            {language === 'en' ? selectedHoliday.nameEn : selectedHoliday.name}
                          </h4>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="relative min-h-[200px] sm:min-h-[250px] flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {selectedDate && activities[selectedDate] && activities[selectedDate].length > 0 ? (
                          activities[selectedDate].map(activity => (
                            <div 
                              key={activity.id} 
                              onClick={() => setSelectedAgendaModal(activity)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedAgendaModal(activity); }}
                              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white hover:bg-white hover:shadow-lg hover:border-amber-400 transition-all group border-l-4 border-l-slate-950 cursor-pointer text-left shadow-xs"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                                <h4 className="font-bold text-slate-950 group-hover:text-primary-blue transition-colors text-sm sm:text-lg leading-snug">{activity.title}</h4>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {activity.category && (
                                    <span className="shrink-0 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[10px] sm:text-xs font-bold">
                                      {activity.category}
                                    </span>
                                  )}
                                  {activity.zoomUrl && (
                                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-blue-100/90 text-blue-700 border border-blue-300/60 text-[10px] sm:text-xs font-bold flex items-center gap-1">
                                      <Video className="w-3 h-3" />
                                      <span>Zoom</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium mt-2 sm:mt-3">
                                <div className="flex items-center">
                                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-slate-400 shrink-0" />
                                  {activity.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-slate-400 shrink-0" />
                                  <span className="truncate">{activity.location}</span>
                                </div>
                              </div>
                              <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-900 group-hover:text-primary-blue">
                                <span>{trans('Klik untuk detail kegiatan', 'Click for activity details')}</span>
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full py-8 sm:py-12 flex flex-col items-center justify-center text-slate-400 space-y-3 sm:space-y-4 bg-white rounded-2xl border border-dashed border-slate-200 p-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                              <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                            </div>
                            <p className="font-medium text-xs sm:text-sm text-center px-4 text-slate-500">
                              {selectedDate 
                                ? trans(
                                    `Tidak ada kegiatan PBJ internal pada ${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}.`,
                                    `No internal PBJ activities scheduled on ${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}.`
                                  )
                                : trans('Pilih tanggal pada kalender untuk melihat rincian kegiatan.', 'Select a date on the calendar to view activity details.')
                              }
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <SectionHeading title={trans("Kegiatan Mendatang", "Upcoming Activities")} subtitle={trans("Agenda resmi yang akan diselenggarakan dalam waktu dekat", "Official agenda to be held in the near future")} />
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <select 
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-xl shadow-xs outline-none focus:border-primary-blue text-sm cursor-pointer"
              >
                <option value="Semua Kategori">{trans('Semua Kategori', 'All Categories')}</option>
                <option value="Tender">{trans('Tender', 'Tender')}</option>
                <option value="Bimtek">{trans('Bimtek', 'Technical Guidance')}</option>
                <option value="Sosialisasi">{trans('Sosialisasi', 'Socialization')}</option>
                <option value="Sertifikasi">{trans('Sertifikasi', 'Certification')}</option>
                <option value="Rapat">{trans('Rapat', 'Meeting')}</option>
              </select>
              <select 
                value={periodFilter}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-xl shadow-xs outline-none focus:border-primary-blue text-sm cursor-pointer"
              >
                <option value="Semua">{trans('Semua Jadwal', 'All Schedules')}</option>
                <option value="Bulan Ini">{trans(`Bulan Ini (${monthNames[todayMonth]})`, `This Month (${monthNames[todayMonth]})`)}</option>
                <option value="Bulan Depan">{trans(`Bulan Depan (${monthNames[nextRealMonth]})`, `Next Month (${monthNames[nextRealMonth]})`)}</option>
              </select>
            </div>
          </div>

          {/* 6 Cards Grid (2 Rows x 3 Columns) */}
          <StaggerContainer key={currentPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {paginatedAgendas.map((agenda, idx) => (
              <StaggerItem key={agenda.id || idx} className="h-full flex">
                <AgendaCard 
                  {...agenda} 
                  zoomUrl={agenda.zoomUrl}
                  onClick={() => setSelectedAgendaModal({
                    id: agenda.id || idx,
                    title: agenda.title,
                    category: agenda.category,
                    date: agenda.fullDate,
                    time: agenda.time,
                    location: agenda.location,
                    organizer: agenda.organizer,
                    capacity: agenda.capacity,
                    status: agenda.status,
                    description: agenda.description,
                    zoomUrl: agenda.zoomUrl
                  })}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {filteredAgendas.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400">
              <p className="text-sm font-medium">{trans('Tidak ada kegiatan yang sesuai dengan filter yang dipilih.', 'No activities match the selected filter.')}</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 sm:mt-12 flex items-center justify-between gap-2 border-t border-slate-200/80 pt-4 sm:pt-6">
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                <span className="hidden sm:inline">{trans('Menampilkan ', 'Showing ')}</span>
                <span className="font-bold text-primary-navy">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredAgendas.length)}</span> {trans('dari', 'of')} <span className="font-bold text-primary-navy">{filteredAgendas.length}</span>
              </p>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                  disabled={currentPage === 1}
                  aria-label={trans("Halaman sebelumnya", "Previous page")}
                  className={`h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 border transition-all ${
                    currentPage === 1
                      ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-primary-blue shadow-xs cursor-pointer active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{trans('Sebelumnya', 'Previous')}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = currentPage === pageNum;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? 'bg-primary-navy text-white shadow-sm scale-105'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                  disabled={currentPage === totalPages}
                  aria-label={trans("Halaman selanjutnya", "Next page")}
                  className={`h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 border transition-all ${
                    currentPage === totalPages
                      ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-primary-blue shadow-xs cursor-pointer active:scale-95'
                  }`}
                >
                  <span className="hidden sm:inline">{trans('Selanjutnya', 'Next')}</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* SIMPLE DETAIL POPUP MODAL */}
        <AnimatePresence>
          {selectedAgendaModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
                className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-primary-navy to-[#152a54] p-4 sm:p-6 text-white relative shrink-0">
                  <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/15 border border-white/20 text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {selectedAgendaModal.category || trans('Agenda PBJ', 'PBJ Agenda')}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAgendaModal(null)}
                      aria-label={trans("Tutup modal", "Close modal")}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <h3 className="text-base sm:text-2xl font-bold sm:font-black text-white leading-snug">
                    {selectedAgendaModal.title}
                  </h3>
                </div>

                {/* Modal Body (Scrollable if content overflows on tiny screens) */}
                <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-5 overflow-y-auto">
                  {/* 4 Quick Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 sm:gap-3.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{trans('Tanggal Kegiatan', 'Activity Date')}</div>
                        <div className="text-xs sm:text-base font-bold text-primary-navy mt-0.5 truncate">{selectedAgendaModal.date}</div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 sm:gap-3.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{trans('Waktu Pelaksanaan', 'Execution Time')}</div>
                        <div className="text-xs sm:text-base font-bold text-primary-navy mt-0.5 truncate">{selectedAgendaModal.time}</div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 sm:gap-3.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{trans('Lokasi / Ruang', 'Location / Venue')}</div>
                        <div className="text-xs sm:text-base font-bold text-primary-navy mt-0.5 truncate">{selectedAgendaModal.location}</div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 sm:gap-3.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-200/70 text-slate-900 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{trans('Penyelenggara', 'Organizer')}</div>
                        <div className="text-xs sm:text-base font-bold text-primary-navy mt-0.5 truncate">
                          {selectedAgendaModal.organizer || trans('Biro Perencanaan & UKPBJ Kemnaker', 'MoM Planning Bureau & UKPBJ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Link Zoom Meeting Card */}
                  {selectedAgendaModal.zoomUrl && (
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600/10 via-sky-50 to-blue-50 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary-navy">
                              {trans('Tautan Video Conference / Zoom', 'Video Conference / Zoom Link')}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold uppercase tracking-wide">
                              Live Meeting
                            </span>
                          </div>
                          <p className="text-xs font-mono text-blue-700 truncate mt-0.5 max-w-xs sm:max-w-md" title={selectedAgendaModal.zoomUrl}>
                            {selectedAgendaModal.zoomUrl}
                          </p>
                        </div>
                      </div>

                      <a
                        href={selectedAgendaModal.zoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-primary-blue hover:from-blue-700 hover:to-[#0A326E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all shrink-0 cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>{trans('Gabung Zoom Meeting', 'Join Zoom Meeting')}</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                      </a>
                    </div>
                  )}

                  {/* Ringkasan Singkat / Deskripsi */}
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-primary-navy font-bold text-xs sm:text-sm">
                      <span>{trans('Keterangan & Informasi Kegiatan', 'Description & Event Information')}</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedAgendaModal.description || 
                        trans(
                          `Kegiatan resmi "${selectedAgendaModal.title}" ini diselenggarakan oleh ${selectedAgendaModal.organizer || 'UKPBJ Kemnaker'} guna memberikan bimbingan teknis, koordinasi pengadaan, serta pendampingan bagi para pemangku kepentingan demi kelancaran proses pengadaan barang dan jasa yang transparan dan akuntabel.`,
                          `This official event "${selectedAgendaModal.title}" is organized by ${selectedAgendaModal.organizer || 'UKPBJ MoM'} to provide technical guidance, procurement coordination, and support for stakeholders to ensure a transparent and accountable procurement process.`
                        )
                      }
                    </p>
                  </div>
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

