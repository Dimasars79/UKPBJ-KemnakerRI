"use client"

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  BellRing, ChevronRight, FileText, Calendar, Megaphone, 
  Newspaper, Laptop, Globe, MessageSquare, Download, 
  BarChart2, CheckCircle2, Clock, ShieldCheck, ArrowRight, Package, Scale
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Helper function to parse dates accurately from news, agenda, packages, etc.
const parseItemDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;
  const cleaned = dateStr.trim();

  // 1. ISO format e.g. "2026-09-02T13:40:00.000Z" or "2026-09-02"
  if (/^\d{4}-\d{1,2}-\d{1,2}/.test(cleaned)) {
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) return d;
  }

  // 2. Format "DD/MM/YYYY" or "DD-MM-YYYY"
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(cleaned)) {
    const parts = cleaned.split(/[\/\-]/);
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }

  // 3. Textual Indonesian/English date e.g. "09 Sep 2026", "2 September 2026"
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
      return new Date(year, month, day, 12, 0);
    }
  }

  const parsed = new Date(cleaned);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export default function InformasiPage() {
  const { newsList, agendaList, regulasiList, packagesList, siteSettings, lastUpdated } = useData();
  const { trans } = useLanguage();
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const publishedNews = newsList.filter(n => n.status === 'Published');

  // Format tanggal & jam terakhir diperbarui secara dinamis mengikuti timestamp CMS
  const lastUpdatedFormatted = React.useMemo(() => {
    if (!isMounted) {
      return {
        id: 'Terakhir diperbarui: Sinkronisasi data...',
        en: 'Last updated: Syncing data...'
      };
    }
    const targetDate = lastUpdated ? new Date(lastUpdated) : new Date();
    const validDate = isNaN(targetDate.getTime()) ? new Date() : targetDate;

    const indonesianMonths = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const englishMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = validDate.getDate();
    const monthId = indonesianMonths[validDate.getMonth()];
    const monthEn = englishMonths[validDate.getMonth()];
    const year = validDate.getFullYear();
    const hours = String(validDate.getHours()).padStart(2, '0');
    const minutes = String(validDate.getMinutes()).padStart(2, '0');

    return {
      id: `Terakhir diperbarui: ${day} ${monthId} ${year}, ${hours}:${minutes} WIB`,
      en: `Last updated: ${monthEn} ${day}, ${year}, ${hours}:${minutes} WIB`
    };
  }, [lastUpdated, isMounted]);
  
  const recentUpdates = React.useMemo(() => {
    const list: Array<{
      date: string;
      type: string;
      title: string;
      href?: string;
      icon: React.ReactNode;
      color: string;
      timestamp: number;
    }> = [];

    // Packages
    if (packagesList && packagesList.length > 0) {
      packagesList.forEach((pkg) => {
        const parsed = parseItemDate(pkg.deadline);
        const categoryLabel = pkg.category.toLowerCase().includes('tender')
          ? pkg.category.toUpperCase()
          : `TENDER ${pkg.category.toUpperCase()}`;

        list.push({
          date: pkg.deadline || trans('Tender Baru', 'New Tender'),
          type: categoryLabel,
          title: `${pkg.code}: ${pkg.title}`,
          href: '/#pengadaan',
          icon: <Package className="w-5 h-5 text-indigo-300" />,
          color: 'bg-indigo-500/20',
          timestamp: parsed ? parsed.getTime() : 0
        });
      });
    }

    // Published News
    publishedNews.forEach((news) => {
      const parsed = parseItemDate(news.date);
      list.push({
        date: news.date,
        type: news.category.toUpperCase(),
        title: news.title,
        href: `/berita/${news.id}`,
        icon: <Newspaper className="w-5 h-5 text-blue-300" />,
        color: 'bg-blue-500/20',
        timestamp: parsed ? parsed.getTime() : 0
      });
    });

    // Agenda
    if (agendaList && agendaList.length > 0) {
      agendaList.forEach((agenda) => {
        const parsed = parseItemDate(agenda.date);
        list.push({
          date: agenda.date,
          type: `AGENDA ${agenda.category.toUpperCase()}`,
          title: agenda.title,
          href: '/agenda',
          icon: <Calendar className="w-5 h-5 text-emerald-300" />,
          color: 'bg-emerald-500/20',
          timestamp: parsed ? parsed.getTime() : 0
        });
      });
    }

    // Regulasi
    if (regulasiList && regulasiList.length > 0) {
      regulasiList.forEach((reg) => {
        const parsed = parseItemDate(`01 Jan ${reg.tahun}`);
        list.push({
          date: trans(`Tahun ${reg.tahun}`, `Year ${reg.tahun}`),
          type: trans('REGULASI JDIH', 'JDIH REGULATION'),
          title: `${reg.nomor} - ${reg.tentang}`,
          href: '/informasi/peraturan',
          icon: <Scale className="w-5 h-5 text-purple-300" />,
          color: 'bg-purple-500/20',
          timestamp: parsed ? parsed.getTime() : 0
        });
      });
    }

    // Urutkan secara kronologis menurun: update terbaru selalu di paling atas
    return list.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  }, [packagesList, publishedNews, agendaList, regulasiList, trans]);

  const serviceStatuses = [
    { name: trans('SPSE Kemnaker', 'MoM SPSE Portal'), status: siteSettings.serverStatus === 'Maintenance' ? 'MAINTENANCE' : 'NORMAL', icon: <Laptop className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: trans('Portal Informasi', 'Information Portal'), status: 'NORMAL', icon: <Globe className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: trans('Layanan Konsultasi', 'Consultation Desk'), status: 'NORMAL', icon: <MessageSquare className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: trans('Download Dokumen', 'Document Downloads'), status: 'NORMAL', icon: <Download className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: trans('Layanan Pengaduan', 'Whistleblowing / Complaints'), status: 'NORMAL', icon: <ShieldCheck className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
    { name: trans('SIRUP Kemnaker', 'SiRUP MoM'), status: 'NORMAL', icon: <BarChart2 className="w-6 h-6 text-primary-navy"/>, color: 'bg-slate-100' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Soft Ambient Glows for Depth */}
      <div className="absolute top-12 left-1/4 w-[550px] h-[550px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-8 w-[480px] h-[480px] bg-amber-400/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-[420px] h-[420px] bg-sky-400/8 rounded-full blur-[140px] pointer-events-none" />

      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-20 max-w-7xl relative z-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            {/* HERO SECTION */}
            <FadeIn direction="up">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/70 border border-slate-200/80 h-64 flex flex-col justify-center p-8 group backdrop-blur-md">
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
                    UKPBJ<br/>{trans('PUSAT INFORMASI', 'UPDATE CENTER')}
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {trans(
                      'Pusat informasi terbaru Unit Kerja Pengadaan Barang/Jasa Kementerian Ketenagakerjaan RI',
                      'Latest official updates from the Procurement Division of the Ministry of Manpower RI'
                    )}
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
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                      {trans('APA YANG BARU?', 'WHAT\'S NEW?')}
                    </h2>
                    <span className="bg-accent-gold text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full ml-2">
                      {recentUpdates.length}
                    </span>
                  </div>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  <div className="px-5 sm:px-7 py-3 space-y-1">
                    {recentUpdates.map((item, idx) => (
                      <Link 
                        key={idx} 
                        href={item.href || '/berita'}
                        className="flex items-center py-3 px-3 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 group cursor-pointer transition-all duration-200 gap-3 sm:gap-4"
                      >
                        {/* Icon Box */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} border border-white/10 shadow-inner group-hover:scale-105 transition-transform`}>
                          {item.icon}
                        </div>

                        {/* Middle Content */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                              {item.type}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-500" />
                            <span className="text-[11px] font-medium text-slate-400 truncate">
                              {item.date}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-white font-medium truncate group-hover:text-amber-200 transition-colors">
                            {item.title}
                          </p>
                        </div>

                        {/* Right: Action / Status */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="hidden sm:inline-block bg-primary-blue/30 text-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                            {trans('Baru', 'New')}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-accent-gold group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <Link href="/informasi/pembaruan" className="block text-center w-full py-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl text-xs font-bold text-white transition-all">
                    {trans('Lihat Semua Pembaruan', 'View All Updates')}
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>


          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6">
            
            {/* STATUS LAYANAN */}
            <FadeIn direction="up">
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/70 backdrop-blur-md">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base sm:text-xl font-bold text-primary-navy tracking-tight">
                      {trans('STATUS LAYANAN', 'SERVICE STATUS')}
                    </h2>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <Link href="/layanan" className="text-xs sm:text-sm text-primary-navy hover:text-primary-blue flex items-center font-bold">
                    {trans('Lihat Detail', 'View Details')} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  {serviceStatuses.map((service, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-white hover:border-blue-200 transition-colors">
                      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${service.color} shadow-2xs`}>
                        {service.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{service.name}</p>
                        <p className="text-[10px] sm:text-[11px] font-extrabold text-emerald-600 mt-0.5 uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> {service.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* QUICK STATS ROW */}
            <FadeIn direction="up" delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                {/* Regulasi */}
                <Link href="/informasi/peraturan" className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-md flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-2.5 sm:mb-4 transition-colors shadow-2xs">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary-navy mb-0.5">{regulasiList.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">{trans('Regulasi', 'Regulations')}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 sm:mb-3">{trans('Total Regulasi', 'Total Regulations')}</p>
                  <div className="mt-auto flex items-center text-[11px] sm:text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>{trans('Lihat Semua', 'View All')}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Agenda */}
                <Link href="/agenda" className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-md flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-2.5 sm:mb-4 transition-colors shadow-2xs">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary-navy mb-0.5">{agendaList.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">{trans('Agenda', 'Events')}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 sm:mb-3">{trans('Jadwal PBJ', 'PBJ Schedule')}</p>
                  <div className="mt-auto flex items-center text-[11px] sm:text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>{trans('Lihat Semua', 'View All')}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Pengumuman */}
                <Link href="/informasi/pemilu" className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-md flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-2.5 sm:mb-4 transition-colors shadow-2xs">
                    <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary-navy mb-0.5">{packagesList.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">{trans('Paket PBJ', 'Packages')}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 sm:mb-3">{trans('Paket Terdaftar', 'Listed Packages')}</p>
                  <div className="mt-auto flex items-center text-[11px] sm:text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>{trans('Lihat Semua', 'View All')}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>

                {/* Berita */}
                <Link href="/berita" className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-md flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary-navy group-hover:text-white flex items-center justify-center mb-2.5 sm:mb-4 transition-colors shadow-2xs">
                    <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary-navy mb-0.5">{publishedNews.length}</h3>
                  <p className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">{trans('Berita', 'News')}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 sm:mb-3">{trans('Publikasi Warta', 'Articles')}</p>
                  <div className="mt-auto flex items-center text-[11px] sm:text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                    <span>{trans('Lihat Semua', 'View All')}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              </div>
            </FadeIn>

            {/* BOTTOM INFO WIDGET */}
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-md flex items-center space-x-4 mt-auto">
                <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary-navy">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-primary-navy" suppressHydrationWarning>
                    {trans(lastUpdatedFormatted.id, lastUpdatedFormatted.en)}
                  </p>
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

