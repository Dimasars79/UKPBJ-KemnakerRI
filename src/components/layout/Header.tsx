"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Globe, Eye, Menu, X, ChevronDown, ChevronRight, Bell, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { SearchPalette } from '@/components/ui/SearchPalette';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isA11yMenuOpen, setIsA11yMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const a11y = useAccessibility();

  const infoSubmenu = [
    { label: 'Peraturan', href: '/informasi/peraturan', icon: '📜', desc: 'Regulasi & dasar hukum PBJ' },
    { label: 'Panduan', href: '/informasi/panduan', icon: '📘', desc: 'Petunjuk teknis pengadaan' },
    { label: 'Standar Operasional Prosedur', href: '/informasi/sop', icon: '📋', desc: 'SOP tata kelola kerja resmi' },
    { label: 'Sertifikat PBJ', href: '/informasi/sertifikat-pbj', icon: '🎓', desc: 'Verifikasi kompetensi pengadaan' },
    { label: 'Pengajuan Sertifikasi TKDN', href: '/informasi?kategori=tkdn', icon: '🇮🇩', desc: 'Tingkat Komponen Dalam Negeri' },
    { label: 'Panduan Perizinan/Usaha', href: '/informasi?kategori=perizinan', icon: '📑', desc: 'Legalitas & izin usaha penyedia' },
    { label: 'Tender/Seleksi Pemilu', href: '/informasi?kategori=pemilu', icon: '🗳️', desc: 'Paket tender & seleksi khusus' },
    { label: 'Clearing House', href: '/informasi?kategori=clearing-house', icon: '⚖️', desc: 'Konsultasi & penyelesaian PBJ' },
  ];

  const aboutSubmenu = [
    { label: 'Visi & Misi', href: '/tentang#visi-misi', icon: '🎯', desc: 'Arah dan komitmen strategis' },
    { label: 'Maklumat UKPBJ', href: '/tentang#maklumat', icon: '📜', desc: 'Janji standar mutu pelayanan' },
    { label: 'Survey + Monitoring', href: '/monitoring', icon: '📊', desc: 'Indeks kepuasan & evaluasi' },
    { label: 'Standar Pelayanan Publik', href: '/informasi/sop', icon: '🏛️', desc: 'Standar mutu operasional' },
    { label: 'FAQ', href: '/tentang#faq', icon: '❓', desc: 'Pertanyaan umum & informasi' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.info'), href: '/informasi', hasDropdown: true, dropdownType: 'info' },
    { label: t('nav.services'), href: '/layanan' },
    { label: t('nav.agenda'), href: '/agenda' },
    { label: t('nav.gallery'), href: '/galeri' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.about'), href: '/tentang', hasDropdown: true, dropdownType: 'about' }
  ];

  return (
    <header className="w-full flex flex-col z-50 sticky top-0">
      {/* Top Government Bar */}
      <div className="bg-primary-navy text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium tracking-wide border-b border-white/10 shadow-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] sm:text-xs tracking-normal md:tracking-widest leading-tight text-center md:text-left w-full font-semibold">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 200)}
                className="hover:text-accent-gold transition-colors flex items-center space-x-1.5 cursor-pointer bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:border-accent-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Globe className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10 font-bold tracking-wider">{language.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180 text-accent-gold' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 z-50 text-slate-800"
                  >
                    <div className="p-1">
                      <button 
                        onClick={() => toggleLanguage('id')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${language === 'id' ? 'bg-blue-50 text-primary-blue font-bold' : 'hover:bg-slate-50'}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">🇮🇩</span>
                          <span>Indonesia</span>
                        </span>
                        {language === 'id' && <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />}
                      </button>
                      <button 
                        onClick={() => toggleLanguage('en')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${language === 'en' ? 'bg-blue-50 text-primary-blue font-bold' : 'hover:bg-slate-50'}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">🇬🇧</span>
                          <span>English</span>
                        </span>
                        {language === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Accessibility Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsA11yMenuOpen(!isA11yMenuOpen)}
                className="hover:text-secondary-soft transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Eye className="w-3 h-3" />
                <span>{t('nav.accessibility')}</span>
              </button>

              <AnimatePresence>
                {isA11yMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 z-50 text-slate-800"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <h3 className="font-bold text-primary-navy">Mode Aksesibilitas</h3>
                      <p className="text-xs text-slate-500">Sesuaikan tampilan untuk kenyamanan Anda.</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      {/* Toggle Large Text */}
                      <div 
                        onClick={() => a11y.toggleSetting('isLargeText')}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">Perbesar Teks</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isLargeText ? 'bg-primary-blue' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isLargeText ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle High Contrast */}
                      <div 
                        onClick={() => a11y.toggleSetting('isHighContrast')}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">Kontras Tinggi</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isHighContrast ? 'bg-primary-blue' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isHighContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Grayscale */}
                      <div 
                        onClick={() => a11y.toggleSetting('isGrayscale')}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">Mode Monokrom</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isGrayscale ? 'bg-primary-blue' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isGrayscale ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Highlight Links */}
                      <div 
                        onClick={() => a11y.toggleSetting('isHighlightLinks')}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">Sorot Tautan</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isHighlightLinks ? 'bg-primary-blue' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isHighlightLinks ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Reduce Motion */}
                      <div 
                        onClick={() => a11y.toggleSetting('isReduceMotion')}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">Hentikan Animasi</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isReduceMotion ? 'bg-primary-blue' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isReduceMotion ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t border-slate-100">
                      <button 
                        onClick={() => { a11y.resetSettings(); setIsA11yMenuOpen(false); }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors"
                      >
                        Kembalikan ke Pengaturan Awal
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Floating Island Dock) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 md:py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 sm:px-6 py-2 flex justify-between items-center transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] hover:border-slate-300">
          
          {/* Logo Area */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <Image 
                src="/logo-kemnaker.png" 
                alt="Logo Kementerian Ketenagakerjaan" 
                width={44} 
                height={44} 
                className="h-9 md:h-11 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="h-6 md:h-7 border-l border-slate-300"></div>
              <Image 
                src="/logo-ukpbj-kemnaker-new.png" 
                alt="Logo UKPBJ" 
                width={150} 
                height={45} 
                className="h-8 md:h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                const isInfo = item.dropdownType === 'info';
                const isDropdownOpen = isInfo ? isInfoDropdownOpen : isAboutDropdownOpen;
                const setDropdownOpen = isInfo ? setIsInfoDropdownOpen : setIsAboutDropdownOpen;
                const isCurrentActive = isInfo ? pathname.startsWith('/informasi') : pathname.startsWith('/tentang');
                const submenuList = isInfo ? infoSubmenu : aboutSubmenu;

                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="relative px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 group flex items-center gap-1.5"
                    >
                      <span className={`relative z-10 transition-colors duration-200 ${
                        isCurrentActive
                          ? 'text-primary-navy font-bold'
                          : 'text-slate-600 group-hover:text-primary-navy'
                      }`}>
                        {item.label}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 relative z-10 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary-navy' : ''}`} />
                      
                      {/* Floating active pill highlight */}
                      {isCurrentActive && (
                        <motion.span 
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-slate-100 border border-slate-200/80 rounded-full -z-0 shadow-xs"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      
                      {/* Subtle Hover Background */}
                      <span className="absolute inset-0 bg-slate-100/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none -z-0" />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`absolute ${isInfo ? 'left-1/2 -translate-x-1/2 w-[540px]' : 'right-0 w-[300px]'} mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/80 p-3.5 z-50 overflow-hidden`}
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-primary-navy uppercase tracking-wider">
                              {isInfo ? 'Kanal Informasi & Dokumen' : 'Profil & Tata Kelola'}
                            </span>
                            <span className="text-[10px] font-bold text-primary-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                              {submenuList.length} Pilihan
                            </span>
                          </div>

                          <div className={isInfo ? "grid grid-cols-2 gap-1.5" : "flex flex-col gap-1"}>
                            {submenuList.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200 group/sub"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-sm flex-shrink-0 group-hover/sub:bg-primary-blue group-hover/sub:text-white transition-all">
                                  {sub.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-slate-800 group-hover/sub:text-primary-blue transition-colors truncate">
                                    {sub.label}
                                  </p>
                                  <p className="text-[10px] text-slate-500 line-clamp-1">
                                    {sub.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 group"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-navy font-bold'
                      : 'text-slate-600 group-hover:text-primary-navy'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Floating active pill highlight */}
                  {pathname === item.href && (
                    <motion.span 
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-slate-100 border border-slate-200/80 rounded-full -z-0 shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Subtle Hover Background */}
                  <span className="absolute inset-0 bg-slate-100/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none -z-0" />
                </Link>
              );
            })}
          </nav>

          {/* Unified Actions & Toggler (Visible on All Devices) */}
          <div className="flex items-center space-x-2.5 md:space-x-3.5">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] relative"
                title="Notifikasi"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 transform group-hover:scale-110 transition-transform" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full animate-pulse" />
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                      <h3 className="font-bold text-primary-navy">Notifikasi Terbaru</h3>
                      <button className="text-[10px] text-primary-blue hover:text-accent-gold font-semibold transition-colors">
                        Tandai dibaca
                      </button>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 mb-1">Peringatan Sistem</p>
                          <p className="text-[11px] text-slate-500 leading-tight">Server SPSE akan mengalami pemeliharaan rutin malam ini jam 23:00 WIB.</p>
                          <p className="text-[9px] text-slate-400 mt-2">15 menit yang lalu</p>
                        </div>
                      </div>
                      
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 mb-1">Pengumuman Tender</p>
                          <p className="text-[11px] text-slate-500 leading-tight">Tender Baru: Pengadaan Fasilitas Pelatihan Kemenaker telah dibuka.</p>
                          <p className="text-[9px] text-slate-400 mt-2">2 jam yang lalu</p>
                        </div>
                      </div>

                      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 mb-1">Regulasi Baru</p>
                          <p className="text-[11px] text-slate-500 leading-tight">Dokumen Standar Kontrak versi 2026 telah diterbitkan.</p>
                          <p className="text-[9px] text-slate-400 mt-2">1 hari yang lalu</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 border-t border-slate-100">
                      <Link 
                        href="/informasi" 
                        onClick={() => setIsNotificationOpen(false)}
                        className="block w-full py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-primary-navy to-primary-blue rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        Lihat Semua Pembaruan &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Elegant Search (Hidden on very small screens to save space, but visible on md+) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex group items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              title="Cari (Ctrl+K)"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 transform group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Elegant Login */}
            <Link
              href="/login"
              className="hidden md:flex relative overflow-hidden group items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] hover:-translate-y-0.5 border border-transparent hover:border-blue-400/30"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span className="relative z-10">{t('nav.login')}</span>
            </Link>

            {/* Mobile Navbar Toggler */}
            <button 
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 hover:bg-primary-blue text-primary-navy hover:text-white rounded-full transition-all duration-300 border border-slate-200 shadow-xs"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 transform hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

      {/* Mobile Navigation Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[999] lg:hidden">
            {/* Dark Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Close Button on Top Right of Overlay */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-primary-navy hover:bg-primary-blue text-white p-3 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 z-[1001]"
              aria-label="Tutup Menu"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Side Drawer Panel */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-[82%] max-w-[340px] h-full bg-white shadow-2xl z-[1000] flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header with Logos */}
                <div className="p-5 border-b border-slate-100 flex items-center space-x-3 bg-white">
                  <Image 
                    src="/logo-kemnaker.png" 
                    alt="Logo Kementerian Ketenagakerjaan" 
                    width={40} 
                    height={40} 
                    className="h-9 w-auto object-contain drop-shadow-xs" 
                  />
                  <div className="h-7 border-l border-slate-200"></div>
                  <Image 
                    src="/logo-ukpbj-kemnaker-new.png" 
                    alt="Logo UKPBJ" 
                    width={130} 
                    height={40} 
                    className="h-8 w-auto object-contain drop-shadow-xs" 
                  />
                </div>

                {/* Menu Item List */}
                <div className="py-2 px-4 divide-y divide-slate-100">
                  {navLinks.map((item) => {
                    if (item.hasDropdown) {
                      const isInfo = item.dropdownType === 'info';
                      const isAccordionOpen = isInfo ? isMobileInfoOpen : isMobileAboutOpen;
                      const setIsAccordionOpen = isInfo ? setIsMobileInfoOpen : setIsMobileAboutOpen;
                      const isCurrentActive = isInfo ? pathname.startsWith('/informasi') : pathname.startsWith('/tentang');
                      const submenuList = isInfo ? infoSubmenu : aboutSubmenu;

                      return (
                        <div key={item.label} className="py-1">
                          <button
                            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                            className={`w-full py-3 px-2 flex items-center justify-between transition-colors group ${
                              isCurrentActive
                                ? 'text-primary-navy font-bold'
                                : 'text-slate-700 font-semibold hover:text-primary-blue'
                            }`}
                          >
                            <span className="text-base">{item.label}</span>
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isAccordionOpen
                                ? 'bg-primary-navy text-white rotate-90'
                                : 'bg-primary-navy/10 text-primary-navy'
                            }`}>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </button>

                          {/* Mobile Submenu Accordion */}
                          <AnimatePresence>
                            {isAccordionOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 pr-1 py-1 space-y-1 overflow-hidden"
                              >
                                {submenuList.map((sub, idx) => (
                                  <Link
                                    key={idx}
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-primary-navy hover:bg-slate-50 transition-colors"
                                  >
                                    <span>{sub.icon}</span>
                                    <span>{sub.label}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-3.5 px-2 flex items-center justify-between transition-colors group ${
                          pathname === item.href
                            ? 'text-primary-navy font-bold'
                            : 'text-slate-700 font-semibold hover:text-primary-blue'
                        }`}
                      >
                        <span className="text-base">{item.label}</span>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          pathname === item.href
                            ? 'bg-primary-navy text-white shadow-xs'
                            : 'bg-primary-navy/10 text-primary-navy group-hover:bg-primary-navy group-hover:text-white'
                        }`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions & CTA */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-slate-50 transition-colors"
                  >
                    <Search className="w-4 h-4 text-primary-navy" />
                    <span>Pencarian</span>
                  </button>
                  <Link 
                    href="/informasi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-slate-50 transition-colors relative"
                  >
                    <Bell className="w-4 h-4 text-primary-navy" />
                    <span>Notifikasi</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2 animate-pulse" />
                  </Link>
                </div>

                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk Portal</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
      
      {/* Search Command Palette Overlay */}
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
