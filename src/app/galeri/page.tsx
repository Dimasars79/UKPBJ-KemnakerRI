"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData, PhotoItem, VideoMediaItem } from '@/contexts/DataContext';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { 
  Camera, Building2, GraduationCap, Video, Play, 
  ExternalLink, X, Film, Calendar, Eye, ZoomIn, 
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GaleriPage() {
  const { t } = useLanguage();
  const { photosList, videosList } = useData();
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoMediaItem | null>(null);
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [videoFilter, setVideoFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categories extracted dynamically
  const photoCategories = ['all', ...Array.from(new Set(photosList.map(p => p.category)))];
  const videoCategories = ['all', ...Array.from(new Set(videosList.map(v => v.category)))];

  // Filtered Photo List
  const filteredPhotos = photosList.filter(p => {
    const matchCat = photoFilter === 'all' || p.category === photoFilter;
    const matchSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Filtered Video List
  const filteredVideos = videosList.filter(v => {
    const matchCat = videoFilter === 'all' || v.category === videoFilter;
    const matchSearch = searchQuery === '' || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (v.desc && v.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
          {/* Background fine grid and ambient spotlights */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c712_1px,transparent_1px),linear-gradient(to_bottom,#0284c712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                {/* Government Media Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Dokumentasi & Media Resmi UKPBJ Kemnaker</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                  Galeri Foto & Video Dokumentasi <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-slate-100 to-amber-200">
                    Kegiatan Kerja Pengadaan
                  </span>
                </h1>

                <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
                  {t('page_galeri.desc')}
                </p>

                {/* PRIMARY TAB SWITCHER BUTTONS */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <button
                    onClick={() => setActiveTab('foto')}
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'foto'
                        ? 'bg-gradient-to-r from-primary-blue to-blue-700 text-white shadow-xl shadow-blue-900/40 ring-2 ring-cyan-400/30 scale-102'
                        : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-cyan-300" />
                    <span>Galeri Foto Kegiatan ({photosList.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('video')}
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'video'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xl shadow-amber-900/40 ring-2 ring-amber-300/40 scale-102'
                        : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md'
                    }`}
                  >
                    <Video className="w-4 h-4 text-slate-950" />
                    <span>Video Dokumentasi ({videosList.length})</span>
                  </button>
                </div>

                {/* Quick Topic Tags */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-300">
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kunjungan Kerja</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rapat Koordinasi & Evaluasi</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bimbingan Teknis PBJ</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Film className="w-3.5 h-3.5 text-rose-400" />
                    <span>Video Edukasi & Sosialisasi</span>
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* MAIN MEDIA CONTENT AREA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10">
          
          {/* ========================================================= */}
          {/* TAB 1: GALERI FOTO KEGIATAN (PERFECTIONIST BALANCED GRID) */}
          {/* ========================================================= */}
          {activeTab === 'foto' ? (
            <div className="space-y-8">
              
              {/* Header & Filter Control Bar */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200">
                      Dokumentasi Visual
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Foto Liputan & Kegiatan Pengadaan ({filteredPhotos.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Arsip foto agenda kerja resmi, rapat monitoring, pelatihan teknis, dan kunjungan dinas
                  </p>
                </div>

                {/* Search & Category Filter */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-64 group">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-600 transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari dokumentasi foto..."
                      className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-cyan-600 focus:outline-none transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    {photoCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPhotoFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          photoFilter === cat
                            ? 'bg-primary-navy text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        {cat === 'all' ? 'Semua' : cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photos Grid - Balanced 3-Column Studio Cards */}
              {filteredPhotos.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPhotos.map((img) => (
                    <StaggerItem key={img.id}>
                      <div 
                        onClick={() => setSelectedPhoto(img)}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
                      >
                        {/* Photo Image Banner with Hover Zoom & Badge Overlays */}
                        <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                          {img.src ? (
                            <Image 
                              src={img.src} 
                              alt={img.title} 
                              fill
                              className="object-cover transform group-hover:scale-106 transition-transform duration-700" 
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">
                              (Tidak Ada Gambar)
                            </div>
                          )}
                          
                          {/* Ambient Dark Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 opacity-60 group-hover:opacity-80 transition-opacity" />
                          
                          {/* Top Badges */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                            <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-primary-navy/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-xs">
                              {img.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/60 text-white border border-white/15 backdrop-blur-md">
                              {img.date || '2026'}
                            </span>
                          </div>

                          {/* Hover Zoom Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                              <ZoomIn className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        {/* Card Body Information (Cleanly Visible at All Times) */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1.5">
                            <h3 className="text-slate-900 font-black text-sm sm:text-base leading-snug group-hover:text-primary-blue transition-colors line-clamp-2">
                              {img.title}
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                              {img.desc || 'Dokumentasi resmi pelaksanaan kegiatan kerja pengadaan barang/jasa.'}
                            </p>
                          </div>

                          {/* Card Footer Action */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700 group-hover:text-primary-blue transition-colors">
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Lihat Resolusi Penuh</span>
                            </span>
                            <span className="text-[11px] bg-cyan-50 group-hover:bg-cyan-100 px-2 py-0.5 rounded-md border border-cyan-200">
                              HD Photo &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <Camera className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700">Tidak ada foto ditemukan</h3>
                  <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
                  <button
                    onClick={() => { setPhotoFilter('all'); setSearchQuery(''); }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            /* ========================================================= */
            /* TAB 2: GALERI VIDEO DOKUMENTASI & MULTIMEDIA */
            /* ========================================================= */
            <div className="space-y-8">
              {/* Header & Filter Control Bar */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      Multimedia & Video Resmi
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Video Kegiatan & Bimbingan Teknis ({filteredVideos.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Tayangan rekaman sosialisasi regulasi, materi bimtek, dan video panduan pengadaan
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-64 group">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-600 transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari video kegiatan..."
                      className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-amber-600 focus:outline-none transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    {videoCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setVideoFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          videoFilter === cat
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        {cat === 'all' ? 'Semua' : cat}
                      </button>
                    ))}
                  </div>

                  <a
                    href="https://www.youtube.com/@kemenperin_ri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <span>Kanal YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Video Grid */}
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        {/* Video Thumbnail with Play Button */}
                        <div className="relative aspect-video bg-slate-950 overflow-hidden">
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover opacity-85 group-hover:opacity-95 group-hover:scale-106 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent pointer-events-none" />
                          
                          {/* Play Icon */}
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                              <Play className="w-6 h-6 fill-white ml-0.5" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-mono font-bold border border-white/10 z-10">
                            {video.duration}
                          </span>

                          {/* Category Badge */}
                          <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider border border-white/20 shadow-xs z-10">
                            {video.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-2">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1 font-semibold text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-amber-500" />
                              {video.date}
                            </span>
                            <span>•</span>
                            <span>{video.views}</span>
                          </div>

                          <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                            {video.title}
                          </h3>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {video.desc}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 mt-auto">
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                          <span className="flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Putar Video Lengkap</span>
                          </span>
                          <span className="text-[11px] bg-amber-50 group-hover:bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">
                            Play &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <Video className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700">Tidak ada video ditemukan</h3>
                  <p className="text-xs text-slate-500">Coba gunakan kata kunci pencarian yang berbeda.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* MODAL 1: PHOTO LIGHTBOX POPUP */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    <Camera className="w-4 h-4 text-cyan-300" />
                    <span>{selectedPhoto.category} • {selectedPhoto.date}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Full High-Resolution Image Container */}
                <div className="relative aspect-[16/10] max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                  {selectedPhoto.src ? (
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.title}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <p className="text-slate-400">Gambar tidak tersedia</p>
                  )}
                </div>

                {/* Modal Info Footer */}
                <div className="p-6 space-y-2 bg-slate-50 border-t border-slate-200">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedPhoto.desc || 'Dokumentasi resmi kegiatan UKPBJ Kementerian Ketenagakerjaan RI.'}
                  </p>
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="px-4 py-2 bg-primary-navy hover:bg-primary-blue text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Tutup Pratinjau
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: VIDEO PLAYER POPUP */}
        <AnimatePresence>
          {selectedVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-5 bg-gradient-to-r from-primary-navy to-[#113264] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                    <Film className="w-4 h-4 text-amber-300" />
                    <span>{selectedVideo.category} • Durasi {selectedVideo.duration}</span>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Video Preview Player Box */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <Image
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="relative z-10 text-center p-6">
                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white inline-flex items-center justify-center shadow-2xl transition-transform hover:scale-110 mb-3"
                    >
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </a>
                    <p className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                      Tonton Tayangan Lengkap di YouTube Resmi
                    </p>
                    <p className="text-slate-300 text-xs mt-1">
                      Kementerian Ketenagakerjaan Republik Indonesia
                    </p>
                  </div>
                </div>

                {/* Modal Video Info */}
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedVideo.desc}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <span>Diunggah pada: <strong>{selectedVideo.date}</strong></span>
                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Buka di YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
