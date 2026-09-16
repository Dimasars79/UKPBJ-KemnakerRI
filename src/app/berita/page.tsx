"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData, NewsItem } from '@/contexts/DataContext';
import { 
  Search, Calendar, Eye, ArrowRight, 
  ChevronRight, BookOpen, AlertCircle
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'Semua Berita' },
  { id: 'Berita PBJ', label: 'Berita PBJ' },
  { id: 'Pengumuman Lelang', label: 'Pengumuman Lelang' },
  { id: 'Regulasi', label: 'Regulasi' },
  { id: 'Siaran Pers', label: 'Siaran Pers' },
];

export default function BeritaIndexPage() {
  const { newsList } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedNews = useMemo(() => {
    return newsList.filter((item) => item.status === 'Published');
  }, [newsList]);

  const filteredNews = useMemo(() => {
    return publishedNews.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [publishedNews, selectedCategory, searchQuery]);

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

  // First news as featured headline (if no search filter)
  const featuredNews = selectedCategory === 'all' && searchQuery.trim() === '' && filteredNews.length > 0 ? filteredNews[0] : null;
  const gridNews = featuredNews ? filteredNews.slice(1) : filteredNews;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24">
        {/* HERO BANNER */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">Warta & Berita PBJ</span>
            </div>

            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                <span>Pusat Publikasi & Informasi Resmi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Warta & Berita Pengadaan
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                Kumpulan siaran pers, pengumuman hasil lelang, update regulasi, dan liputan kegiatan pengadaan barang/jasa Kementerian Ketenagakerjaan.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="relative flex items-center bg-white rounded-full shadow-2xl p-1.5 border border-slate-200/80 focus-within:border-primary-blue focus-within:ring-4 focus-within:ring-primary-blue/15 transition-all">
                  <div className="pl-4 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari berita pengadaan, judul, atau kata kunci..."
                    className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-3 text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CATEGORY TABS SECTION */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = cat.id === 'all' 
                  ? publishedNews.length 
                  : publishedNews.filter(n => n.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-primary-navy text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-medium text-slate-400 px-2 hidden md:inline">
              Menampilkan {filteredNews.length} Berita
            </span>
          </div>
        </section>

        {/* CONTENT AREA: FEATURED + GRID */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
          {/* Featured Headline Article (if available) */}
          {featuredNews && (
            <div className="mb-10">
              <Link
                href={`/berita/${featuredNews.id}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[400px] overflow-hidden bg-slate-100">
                    <Image
                      src={featuredNews.imageUrl || '/news/news-1.png'}
                      alt={featuredNews.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${getCategoryBadgeColor(featuredNews.category)}`}>
                        {featuredNews.category}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{featuredNews.date}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">{featuredNews.author || 'Humas Kemnaker'}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-primary-navy leading-snug group-hover:text-primary-blue transition-colors mb-4">
                        {featuredNews.title}
                      </h2>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-6">
                        {featuredNews.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-primary-blue group-hover:text-primary-navy">
                      <span className="inline-flex items-center gap-1.5">
                        <span>Baca Berita Lengkap</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      {featuredNews.views > 0 && (
                        <span className="text-slate-400 font-mono font-medium text-[11px] flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{featuredNews.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Other Articles */}
          {gridNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridNews.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-primary-blue/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Cover */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.imageUrl || `/news/news-${(idx % 3) + 1}.png`}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${getCategoryBadgeColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-white/90 text-xs font-medium drop-shadow-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>{item.date}</span>
                        </span>
                        {item.views > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-mono">
                            <Eye className="w-3 h-3" />
                            <span>{item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 space-y-2">
                      <h3 className="font-bold text-base text-primary-navy leading-snug line-clamp-2 group-hover:text-primary-blue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[140px]">
                      {item.author || 'Humas Kemnaker'}
                    </span>
                    <span className="font-bold text-primary-blue group-hover:text-primary-navy inline-flex items-center gap-1">
                      <span>Baca</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Tidak Ada Berita Ditemukan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Tidak ada artikel berita yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori yang dipilih.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs font-bold text-primary-blue hover:underline cursor-pointer"
              >
                Reset Filter & Pencarian
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
