"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { 
  Camera, Building2, GraduationCap, Video, Play, 
  ExternalLink, X, Film, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type VideoItem = {
  id: string;
  title: string;
  desc: string;
  category: string;
  duration: string;
  date: string;
  views: string;
  thumbnailUrl: string;
  youtubeId?: string;
  url: string;
};

export default function GaleriPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const dummyImages = [
    { id: 1, title: 'Kunjungan Kerja Pimpinan', desc: 'Kunjungan dan koordinasi pimpinan dengan jajaran pengurus UKPBJ.', size: 'large', src: '/gallery/gallery-1.jpg' },
    { id: 2, title: 'Rapat Koordinasi Nasional PBJ', desc: 'Rapat koordinasi pimpinan mengenai evaluasi kinerja tahunan pengadaan.', size: 'large', src: '/gallery/gallery-2.jpg' },
    { id: 3, title: 'Sosialisasi Tata Kelola Pengadaan', desc: 'Acara sosialisasi dan interaksi langsung dengan seluruh peserta stakeholder.', size: 'large', src: '/gallery/gallery-3.jpg' },
    { id: 4, title: 'Bimbingan Teknis PPK & Pokja', desc: 'Pelatihan kompetensi pengadaan barang dan jasa untuk PPK dan Pokja.', size: 'small', src: '/gallery/gallery-4.jpg' },
    { id: 5, title: 'Penandatanganan Kontrak Strategis', desc: 'Penandatanganan pakta integritas dan kontrak kerja sama strategis.', size: 'small', src: '/gallery/gallery-5.jpg' },
    { id: 6, title: 'Rapat Evaluasi & Monitoring Berkala', desc: 'Sesi monitoring dan evaluasi target penyerapan anggaran pengadaan.', size: 'small', src: '/gallery/gallery-6.jpg' },
  ];

  const videoList: VideoItem[] = [
    {
      id: 'v1',
      title: 'Sosialisasi & Tata Cara Pengadaan Barang/Jasa Sesuai Perpres No. 12 Tahun 2021',
      desc: 'Penjelasan komprehensif mengenai kebijakan tata kelola, mitigasi risiko pengadaan, dan kewajiban penggunaan produk dalam negeri (P3DN).',
      category: 'Sosialisasi Regulasi',
      duration: '18:45',
      date: '28 Agu 2026',
      views: '1.4K x ditonton',
      thumbnailUrl: '/gallery/gallery-1.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    },
    {
      id: 'v2',
      title: 'Tutorial Lengkap Penginputan RUP pada SiRUP & Pemanfaatan E-Katalog Nasional LKPP',
      desc: 'Panduan teknis langkah demi langkah pengisian rencana umum pengadaan dan transaksi e-purchasing bagi Pejabat Pembuat Komitmen (PPK).',
      category: 'Tutorial & Petunjuk Teknis',
      duration: '14:20',
      date: '15 Agu 2026',
      views: '2.8K x ditonton',
      thumbnailUrl: '/gallery/gallery-2.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    },
    {
      id: 'v3',
      title: 'Highlight Rakornas UKPBJ Kemnaker RI 2026: Akselerasi Transformasi Digital Pengadaan',
      desc: 'Dokumentasi rangkuman sesi panel, arahan Menteri Ketenagakerjaan, dan pemberian penghargaan UKPBJ Berprestasi Tingkat Nasional.',
      category: 'Dokumentasi Rakornas',
      duration: '09:15',
      date: '05 Agu 2026',
      views: '3.1K x ditonton',
      thumbnailUrl: '/gallery/gallery-3.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    },
    {
      id: 'v4',
      title: 'Bimbingan Teknis Uji Kompetensi & Sertifikasi Pejabat Pengadaan Barang/Jasa Batch 3',
      desc: 'Liputan kegiatan pelatihan peningkatan kapasitas SDM pengadaan barang dan jasa aparatur sipil negara di lingkungan kementerian.',
      category: 'Bimtek & Sertifikasi',
      duration: '12:30',
      date: '22 Jul 2026',
      views: '980 x ditonton',
      thumbnailUrl: '/gallery/gallery-4.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    },
    {
      id: 'v5',
      title: 'Tata Cara Pengajuan Sertifikasi TKDN Industri Kecil & Menengah Gratis Melalui SIINas',
      desc: 'Panduan pelaku usaha dalam negeri untuk melakukan self-assessment nilai komponen lokal dan penerbitan sertifikat TKDN IK.',
      category: 'Panduan Pelaku Usaha',
      duration: '11:05',
      date: '10 Jun 2026',
      views: '4.5K x ditonton',
      thumbnailUrl: '/gallery/gallery-5.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    },
    {
      id: 'v6',
      title: 'Penerapan Manajemen Integritas & Pengawasan Anti-Gratifikasi PBJ Kemnaker',
      desc: 'Sosialisasi penguatan sistem pengendalian intern dan kanal aduan Whistleblowing System (WBS) dalam mencegah tindak pidana korupsi.',
      category: 'Integritas & Kepatuhan',
      duration: '08:50',
      date: '18 Mei 2026',
      views: '1.2K x ditonton',
      thumbnailUrl: '/gallery/gallery-6.jpg',
      url: 'https://www.youtube.com/@kemenperin_ri'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pb-24">
        {/* HERO BANNER SECTION - Studio Spotlight & Media Archive */}
        <section className="relative py-16 lg:py-22 overflow-hidden bg-gradient-to-br from-[#061B30] via-[#0B2A4A] to-[#071F36]">
          {/* Spotlight & Fine Dot Matrix Pattern */}
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

                {/* CONNECTING PAGE BUTTONS (FOTO & VIDEO) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <button
                    onClick={() => setActiveTab('foto')}
                    className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === 'foto'
                        ? 'bg-gradient-to-r from-primary-blue to-blue-700 text-white shadow-lg shadow-blue-900/30'
                        : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>Galeri Foto Kegiatan ({dummyImages.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('video')}
                    className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === 'video'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/30'
                        : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md'
                    }`}
                  >
                    <Video className="w-4 h-4 text-accent-gold" />
                    <span>Galeri Video Dokumentasi ({videoList.length})</span>
                  </button>
                </div>

                {/* Media Tags */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-300">
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kunjungan Kerja</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rapat Koordinasi Nasional</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bimbingan Teknis PBJ</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    <Film className="w-3.5 h-3.5 text-rose-400" />
                    <span>Video Edukasi</span>
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* MAIN MEDIA CONTENT (FOTO OR VIDEO BASED ON ACTIVE TAB) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12">
          {activeTab === 'foto' ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-primary-navy bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    Dokumentasi Foto
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
                    Foto Dokumentasi Kegiatan PBJ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Rangkuman visual agenda kerja, penandatanganan pakta integritas, dan rapat koordinasi pengadaan
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('video')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-navy hover:text-primary-blue bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-xs transition-all"
                >
                  <span>Buka Galeri Video</span>
                  <Video className="w-4 h-4 text-accent-gold" />
                </button>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {dummyImages.map((img) => (
                  <StaggerItem 
                    key={img.id} 
                    className={`relative group overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 ${img.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <div className={`w-full bg-slate-200 ${img.size === 'large' ? 'h-[400px]' : 'h-[192px]'} flex items-center justify-center relative`}>
                      {img.src ? (
                        <Image 
                          src={img.src} 
                          alt={img.title} 
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 to-primary-navy/80 mix-blend-multiply" />
                          <span className="text-slate-400 font-bold z-0 opacity-30 text-2xl text-center px-4">
                            (Belum Ada Foto)
                          </span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-primary-navy/20 pointer-events-none" />
                    </div>
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg sm:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 leading-snug">
                        {img.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {img.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ) : (
            /* VIDEO GALLERY SECTION */
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                    Dokumentasi Video & Multimedia
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-navy mt-2">
                    Video Kegiatan & Tutorial Pengadaan
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Tayangan video rekaman sosialisasi, materi bimtek, dan tutorial teknis resmi UKPBJ Kemnaker
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/@kemenperin_ri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <span>Kanal YouTube Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {videoList.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Video Thumbnail with Play Button */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold">
                          {video.duration}
                        </span>

                        {/* Category Badge */}
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-primary-navy/90 text-amber-300 text-[10px] font-bold border border-white/20 backdrop-blur-xs">
                          {video.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {video.date}
                          </span>
                          <span>•</span>
                          <span>{video.views}</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-snug line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {video.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-navy group-hover:text-primary-blue">
                        <span>Putar Video Dokumentasi</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* MODAL VIDEO PLAYER POPUP */}
        <AnimatePresence>
          {selectedVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
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
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
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
