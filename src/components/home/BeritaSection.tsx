"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Newspaper, 
  Eye, 
  Sparkles
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData, NewsItem } from '@/contexts/DataContext';

export function BeritaSection() {
  const { t } = useLanguage();
  const { newsList } = useData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter only published news
  const publishedNews = newsList.filter((item) => item.status === 'Published');

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [publishedNews]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getCategoryBadgeColor = (category: NewsItem['category']) => {
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

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-100 relative overflow-hidden" id="berita">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header with Carousel Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <FadeIn direction="left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-navy text-xs font-bold tracking-wide uppercase mb-2">
              <Newspaper className="w-3.5 h-3.5 text-accent-gold" />
              <span>Kabar & Publikasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-navy tracking-tight">
              {t('home.news_title')}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
              Informasi terkini, pengumuman pemenang lelang, dan perkembangan regulasi pengadaan barang/jasa.
            </p>
          </FadeIn>

          {/* Controls: Left & Right Scroll Arrows */}
          <FadeIn direction="right">
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs text-slate-400 font-semibold hidden md:inline-flex items-center gap-1.5 mr-2">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                <span>Geser ke kanan</span>
              </span>

              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Geser Berita ke Kiri"
                className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-xs ${
                  canScrollLeft
                    ? 'bg-white border-slate-200 text-primary-navy hover:bg-primary-navy hover:text-white hover:border-primary-navy hover:shadow-md'
                    : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Geser Berita ke Kanan"
                className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-xs ${
                  canScrollRight
                    ? 'bg-primary-navy border-primary-navy text-white hover:bg-primary-blue hover:border-primary-blue hover:shadow-md'
                    : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Horizontal Scrollable News Carousel Track */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {publishedNews.map((item, idx) => (
            <div
              key={item.id}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-start flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-primary-blue/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group"
            >
              {/* Card Image Cover */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={item.imageUrl || `/news/news-${(idx % 3) + 1}.png`}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md border backdrop-blur-xs ${getCategoryBadgeColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                {/* Date Tag */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/90 text-xs">
                  <div className="flex items-center gap-1.5 font-medium drop-shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{item.date}</span>
                  </div>
                  {item.views > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-white/80 font-mono drop-shadow-sm">
                      <Eye className="w-3 h-3" />
                      <span>{item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-primary-navy leading-snug line-clamp-2 group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[160px]">
                    {item.author || 'Humas Kemnaker'}
                  </span>

                  <Link 
                    href="/informasi"
                    className="inline-flex items-center text-xs font-bold text-primary-blue group-hover:text-primary-navy transition-colors gap-1.5"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-navy to-primary-blue rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">
            {publishedNews.length} Berita Aktif
          </span>
        </div>

        {/* Bottom CTA to /informasi */}
        <FadeIn direction="up" delay={0.2} className="mt-8 text-center">
          <Link 
            href="/informasi" 
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white hover:bg-primary-navy text-primary-navy hover:text-white font-bold text-xs sm:text-sm border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <span>{t('home.news_more')}</span>
            <ArrowRight className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
