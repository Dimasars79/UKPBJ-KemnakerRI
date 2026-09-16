"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData, NewsItem } from '@/contexts/DataContext';
import { 
  Calendar, Eye, User, ArrowLeft, ArrowRight, 
  ChevronRight, Building2, CheckCircle2, Clock, Copy, 
  MessageCircle, Printer, BookOpen, AlertCircle, Sparkles
} from 'lucide-react';

export default function BeritaDetailPage() {
  const params = useParams();
  const { newsList, agendaList } = useData();
  const [copied, setCopied] = useState(false);

  const newsId = typeof params?.id === 'string' ? decodeURIComponent(params.id) : '';

  // Find news item by id
  const currentNews = newsList.find(
    (item) => item.id === newsId || item.id.toLowerCase() === newsId.toLowerCase()
  );

  // Other published news for sidebar & recommendations
  const otherNews = newsList.filter(
    (item) => item.id !== currentNews?.id && item.status === 'Published'
  );

  // Find next and previous news for bottom navigation
  const publishedList = newsList.filter((n) => n.status === 'Published');
  const currentIndex = publishedList.findIndex((n) => n.id === currentNews?.id);
  const prevNews = currentIndex > 0 ? publishedList[currentIndex - 1] : null;
  const nextNews = currentIndex >= 0 && currentIndex < publishedList.length - 1 ? publishedList[currentIndex + 1] : null;

  // Active upcoming agendas
  const upcomingAgendas = agendaList
    .filter((a) => a.status !== 'Dibatalkan')
    .slice(0, 3);

  const getCategoryBadgeColor = (category: NewsItem['category'] | string) => {
    switch (category) {
      case 'Regulasi':
        return 'bg-blue-600 text-white border-blue-500/30';
      case 'Pengumuman Lelang':
        return 'bg-amber-500 text-slate-950 font-black border-amber-400/50';
      case 'Berita PBJ':
        return 'bg-emerald-600 text-white border-emerald-500/30';
      case 'Siaran Pers':
        return 'bg-purple-600 text-white border-purple-500/30';
      default:
        return 'bg-primary-blue text-white border-blue-400/30';
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined' && currentNews) {
      const text = `*${currentNews.title}*\n\nBaca berita selengkapnya di Portal UKPBJ Kemnaker RI:\n${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // If news not found
  if (!currentNews) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 max-w-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-primary-navy mb-2">
              Berita Tidak Ditemukan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Artikel berita dengan ID &quot;{newsId}&quot; mungkin telah diperbarui, diarsipkan, atau tidak lagi tersedia untuk publik.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/berita"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-blue text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lihat Semua Berita</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl text-xs font-bold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate approximate reading time (based on 180 words/min)
  const totalWords = (currentNews.content || '').split(/\s+/).length + (currentNews.excerpt || '').split(/\s+/).length;
  const readingTimeMin = Math.max(1, Math.ceil(totalWords / 150));

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO ARTICLE BANNER */}
        <section className="relative pt-12 pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/berita" className="hover:text-amber-300 transition-colors">Berita & Warta</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300 truncate max-w-[200px] sm:max-w-xs">{currentNews.category}</span>
            </div>

            <FadeIn direction="up">
              {/* Category & Verified Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${getCategoryBadgeColor(currentNews.category)}`}>
                  {currentNews.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Warta Resmi Terverifikasi</span>
                </span>
              </div>

              {/* Main Headline Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-6">
                {currentNews.title}
              </h1>

              {/* Author, Date, Views, & Reading Time Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-300 font-medium">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-blue/30 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span>{currentNews.author || 'Humas UKPBJ Kemnaker'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentNews.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>± {readingTimeMin} Menit Baca</span>
                  </div>

                  {currentNews.views > 0 && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{currentNews.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Pembaca</span>
                    </div>
                  )}
                </div>

                {/* Quick Share Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                    title="Bagikan ke WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    title="Salin Tautan Artikel"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    title="Cetak Artikel"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* MAIN ARTICLE & SIDEBAR SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT / MAIN CONTENT AREA (8 cols) ================= */}
            <article className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-200/80">
              {/* Featured Cover Image */}
              <div className="relative w-full h-64 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-100 shadow-xs">
                <Image
                  src={currentNews.imageUrl || '/news/news-1.png'}
                  alt={currentNews.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm font-medium drop-shadow-sm text-slate-200">
                    Dokumentasi Resmi Kegiatan Pengadaan Barang & Jasa • Biro UKPBJ Kemnaker RI
                  </p>
                </div>
              </div>

              {/* Lead Excerpt Paragraph Box */}
              {currentNews.excerpt && (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100/80 text-sm sm:text-base font-semibold text-slate-800 leading-relaxed mb-8 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-blue mt-2 shrink-0" />
                    <p className="italic">
                      &quot;{currentNews.excerpt}&quot;
                    </p>
                  </div>
                </div>
              )}

              {/* Main Body Paragraphs */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
                {currentNews.content ? (
                  currentNews.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>
                    Kementerian Ketenagakerjaan Republik Indonesia melalui Unit Kerja Pengadaan Barang/Jasa (UKPBJ) terus berkomitmen mewujudkan tata kelola pengadaan yang bersih, transparan, dan akuntabel sesuai amanat Peraturan Presiden tentang Pengadaan Barang dan Jasa Pemerintah.
                  </p>
                )}

                {/* Additional Standard PBJ Context Box */}
                <div className="my-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <h3 className="text-base font-bold text-primary-navy flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary-blue" />
                    <span>{currentNews.noticeTitle || 'Pemberitahuan Resmi UKPBJ Kemnaker RI'}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentNews.noticeContent || 'Seluruh proses tender, seleksi, dan pengadaan barang/jasa di lingkungan Kementerian Ketenagakerjaan dilaksanakan secara elektronik dan terpusat melalui Sistem Pengadaan Secara Elektronik (SPSE) dan e-Katalog LKPP.'}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                    {(currentNews.tags && currentNews.tags.length > 0
                      ? currentNews.tags
                      : ['#UKPBJKemnaker', '#TransparansiPengadaan', '#SPSEKemnaker']
                    ).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Article Bar (Share & Back) */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary-navy hover:text-primary-blue bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Indeks Berita</span>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 mr-1">Bagikan:</span>
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    title="Bagikan ke WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-primary-navy hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    title="Salin Tautan"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prev / Next Article Navigation */}
              {(prevNews || nextNews) && (
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevNews ? (
                    <Link
                      href={`/berita/${prevNews.id}`}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-primary-blue/50 hover:bg-slate-50 transition-all group"
                    >
                      <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-1">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Berita Sebelumnya</span>
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary-blue transition-colors line-clamp-2">
                        {prevNews.title}
                      </h4>
                    </Link>
                  ) : <div />}

                  {nextNews && (
                    <Link
                      href={`/berita/${nextNews.id}`}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-primary-blue/50 hover:bg-slate-50 transition-all text-right group"
                    >
                      <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-end gap-1 mb-1">
                        <span>Berita Berikutnya</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary-blue transition-colors line-clamp-2">
                        {nextNews.title}
                      </h4>
                    </Link>
                  )}
                </div>
              )}
            </article>

            {/* ================= RIGHT SIDEBAR (4 cols) ================= */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Berita Terkait / Terkini Lainnya */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-primary-navy tracking-wide flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent-gold" />
                    <span>Warta Terkini Lainnya</span>
                  </h3>
                  <Link
                    href="/berita"
                    className="text-[11px] font-bold text-primary-blue hover:underline"
                  >
                    Lihat Semua
                  </Link>
                </div>

                <div className="space-y-4">
                  {otherNews.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                        <Image
                          src={item.imageUrl || '/news/news-1.png'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-bold uppercase text-primary-blue bg-blue-50 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug line-clamp-2 mt-1">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Agenda Terdekat PBJ Widget */}
              {upcomingAgendas.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-sm text-primary-navy tracking-wide flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Agenda Terdekat PBJ</span>
                    </h3>
                    <Link
                      href="/agenda"
                      className="text-[11px] font-bold text-emerald-700 hover:underline"
                    >
                      Jadwal
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {upcomingAgendas.map((agenda) => (
                      <div
                        key={agenda.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/80 transition-colors"
                      >
                        <span className="text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {agenda.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug mt-1 line-clamp-2">
                          {agenda.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200/50">
                          <span>{agenda.date}</span>
                          <span className="font-medium truncate max-w-[120px]">{agenda.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Layanan Konsultasi & Pengaduan Helpbox */}
              <div className="bg-gradient-to-br from-primary-navy via-[#0c2447] to-primary-blue rounded-3xl p-6 text-white shadow-md">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">
                  Butuh Klarifikasi Terkait Berita Ini?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Hubungi tim layanan informasi publik dan konsultasi pengadaan barang/jasa Kemnaker RI.
                </p>
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 w-full bg-accent-gold hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <span>Pusat Layanan & Konsultasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
