"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { useData, NewsItem } from '@/contexts/DataContext';
import { 
  Search, Calendar, ArrowRight, 
  ChevronRight, BookOpen, AlertCircle,
  Tag, Check, X, SlidersHorizontal, RotateCcw
} from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';

function BeritaContent() {
  const { trans } = useLanguage();
  const { newsList } = useData();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sync initial tag from URL params if present (e.g. /berita?tag=UKPBJKemnaker)
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      const formattedTag = tagParam.startsWith('#') ? tagParam : `#${tagParam}`;
      setSelectedTags((prev) => (prev.includes(formattedTag) ? prev : [...prev, formattedTag]));
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const baseCategories = [
      { id: 'all', label: trans('Semua Berita', 'All News') },
      { id: 'Berita PBJ', label: trans('Berita PBJ', 'PBJ News') },
      { id: 'Pengumuman Lelang', label: trans('Pengumuman Lelang', 'Tender Announcements') },
      { id: 'Regulasi', label: trans('Regulasi', 'Regulations') },
      { id: 'Siaran Pers', label: trans('Siaran Pers', 'Press Releases') },
    ];
    const customCats = Array.from(
      new Set(
        newsList
          .map((n) => n.category)
          .filter((cat) => cat && !baseCategories.some((b) => b.id === cat))
      )
    );
    return [
      ...baseCategories,
      ...customCats.map((cat) => ({ id: cat, label: cat }))
    ];
  }, [newsList, trans]);

  const publishedNews = useMemo(() => {
    return newsList.filter((item) => item.status === 'Published');
  }, [newsList]);

  // Aggregate all unique tags from published news with count
  const availableTagsWithCount = useMemo(() => {
    const defaultTagPresets = ['#UKPBJKemnaker', '#SPSEKemnaker', '#TransparansiPBJ', '#PengadaanBarangJasa', '#RegulasiPBJ'];
    const tagCountMap: Record<string, number> = {};

    publishedNews.forEach((item) => {
      const itemTags = item.tags && item.tags.length > 0 
        ? item.tags 
        : ['#UKPBJKemnaker', '#TransparansiPBJ'];
      
      itemTags.forEach((t) => {
        const norm = t.startsWith('#') ? t : `#${t}`;
        tagCountMap[norm] = (tagCountMap[norm] || 0) + 1;
      });
    });

    // Ensure common presets exist in list
    defaultTagPresets.forEach((p) => {
      if (!tagCountMap[p]) {
        tagCountMap[p] = 0;
      }
    });

    return Object.entries(tagCountMap)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [publishedNews]);

  // Toggle multi-select tag
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const filteredNews = useMemo(() => {
    return publishedNews.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const itemTags = (item.tags && item.tags.length > 0 
        ? item.tags 
        : ['#UKPBJKemnaker', '#TransparansiPBJ']).map((t) => t.startsWith('#') ? t : `#${t}`);

      const matchTags = selectedTags.length === 0 || selectedTags.some((selectedTag) => 
        itemTags.includes(selectedTag)
      );

      return matchCat && matchSearch && matchTags;
    });
  }, [publishedNews, selectedCategory, searchQuery, selectedTags]);

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

  // First news as featured headline (if no filters active)
  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedTags.length > 0;
  const featuredNews = !isFiltered && filteredNews.length > 0 ? filteredNews[0] : null;
  const gridNews = featuredNews ? filteredNews.slice(1) : filteredNews;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pb-24 -mt-[80px] md:-mt-[88px]">
        {/* HERO BANNER */}
        <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#06182E] via-[#0D264A] to-[#081B33]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-300 transition-colors">{trans('Beranda', 'Home')}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-300">{trans('Warta & Berita PBJ', 'PBJ News & Articles')}</span>
            </div>

            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                <span>{trans('Pusat Publikasi & Informasi Resmi', 'Official Publication & Information Center')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {trans('Warta & Berita Pengadaan', 'Procurement News & Updates')}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                {trans(
                  'Kumpulan siaran pers, pengumuman hasil lelang, update regulasi, dan liputan kegiatan pengadaan barang/jasa Kementerian Ketenagakerjaan.',
                  'Collection of press releases, tender results announcements, regulatory updates, and event coverage of procurement at the Ministry of Manpower.'
                )}
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
                    placeholder={trans("Cari berita pengadaan, judul, atau kata kunci...", "Search procurement news, titles, or keywords...")}
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 relative z-20 space-y-3">
          {/* Main Category Bar */}
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
              {trans(`Menampilkan ${filteredNews.length} Berita`, `Showing ${filteredNews.length} News Articles`)}
            </span>
          </div>

          {/* MULTI-SELECT TAGS FILTER BAR */}
          {availableTagsWithCount.length > 0 && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 px-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary-blue" />
                  <span>{trans('Filter Tag:', 'Filter Tags:')}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {availableTagsWithCount.map(({ tag, count }) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border select-none ${
                          isSelected
                            ? 'bg-primary-navy border-primary-navy text-white shadow-sm ring-2 ring-primary-blue/30 scale-102'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs hover:border-slate-400'
                        }`}
                      >
                        <span>{tag}</span>
                        {count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {count}
                          </span>
                        )}
                        <span className={`text-xs font-bold transition-transform ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-5">
                        {featuredNews.excerpt}
                      </p>

                      {/* Card Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {(featuredNews.tags && featuredNews.tags.length > 0 
                          ? featuredNews.tags 
                          : ['#UKPBJKemnaker', '#TransparansiPBJ']
                        ).map((tag, tIdx) => {
                          const norm = tag.startsWith('#') ? tag : `#${tag}`;
                          const isTagActive = selectedTags.includes(norm);
                          return (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleTag(norm);
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                                isTagActive 
                                  ? 'bg-primary-blue text-white border-primary-blue'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {norm}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center pt-4 border-t border-slate-100 text-xs font-bold text-primary-blue group-hover:text-primary-navy">
                      <span className="inline-flex items-center gap-1.5">
                        <span>{trans('Baca Berita Lengkap', 'Read Full Article')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Other Articles */}
          {gridNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridNews.map((item, idx) => {
                const itemTags = item.tags && item.tags.length > 0 
                  ? item.tags 
                  : ['#UKPBJKemnaker', '#TransparansiPBJ'];

                return (
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
                      </div>

                      {/* Body */}
                      <div className="p-5 sm:p-6 space-y-2.5">
                        <div className="flex items-center text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            <span className="font-semibold text-slate-600">{item.date}</span>
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-primary-navy leading-snug line-clamp-2 group-hover:text-primary-blue transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>

                        {/* Tag Chips */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                          {itemTags.slice(0, 3).map((tag, tIdx) => {
                            const norm = tag.startsWith('#') ? tag : `#${tag}`;
                            const isTagActive = selectedTags.includes(norm);
                            return (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleTag(norm);
                                }}
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                                  isTagActive 
                                    ? 'bg-primary-blue text-white border-primary-blue'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                {norm}
                              </button>
                            );
                          })}
                          {itemTags.length > 3 && (
                            <span className="text-[10px] font-semibold text-slate-400">
                              +{itemTags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[140px]">
                        {item.author || trans('Humas Kemnaker', 'MoM Public Relations')}
                      </span>
                      <span className="font-bold text-primary-blue group-hover:text-primary-navy inline-flex items-center gap-1">
                        <span>{trans('Baca', 'Read')}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">{trans('Tidak Ada Berita Ditemukan', 'No News Articles Found')}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {trans(
                  `Tidak ada artikel berita yang cocok dengan kriteria pencarian atau tag yang dipilih.`,
                  `No news articles matched the search criteria or selected tags.`
                )}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTags([]); }}
                className="text-xs font-bold text-primary-blue hover:underline cursor-pointer"
              >
                {trans('Reset Semua Filter & Tag', 'Reset All Filters & Tags')}
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BeritaIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-400">Memuat warta berita...</div>}>
      <BeritaContent />
    </Suspense>
  );
}
