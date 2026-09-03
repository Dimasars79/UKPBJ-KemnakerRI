"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Globe, Eye, Menu, X, ChevronDown, Bell, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
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
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const a11y = useAccessibility();

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
    { label: t('nav.info'), href: '/informasi' },
    { label: t('nav.services'), href: '/layanan' },
    { label: t('nav.agenda'), href: '/agenda' },
    { label: t('nav.gallery'), href: '/galeri' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.about'), href: '/tentang' }
  ];

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
      {/* Top Government Bar */}
      <div className="bg-primary-navy text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium tracking-wide">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] sm:text-xs tracking-normal md:tracking-widest leading-tight text-center md:text-left w-full">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</span>
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

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Area */}
          <div className="flex items-center space-x-2 sm:space-x-3 max-w-[70%]">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2 sm:space-x-4">
              <Image src="/logo-kemnaker.png" alt="Logo Kementerian Ketenagakerjaan" width={64} height={64} className="h-10 sm:h-12 md:h-16 w-auto object-contain drop-shadow-sm" />
              <div className="h-8 sm:h-10 md:h-14 border-l border-slate-300"></div>
              <Image src="/logo-ukpbj-kemnaker-new.png" alt="Logo UKPBJ" width={300} height={120} className="h-16 sm:h-20 md:h-28 w-auto object-contain drop-shadow-sm scale-110 origin-left" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-bold group"
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  pathname === item.href
                    ? 'text-accent-gold'
                    : 'text-slate-600 group-hover:text-primary-navy'
                }`}>
                  {item.label}
                </span>
                
                {/* Underline Animation */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-accent-gold via-yellow-400 to-accent-gold transition-all duration-300 rounded-full ${
                  pathname === item.href
                    ? 'w-3/4 opacity-100 shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                    : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                }`} />
                
                {/* Subtle Hover Background */}
                <span className="absolute inset-0 bg-accent-gold/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            ))}
          </nav>

          {/* Unified Actions & Toggler (Visible on All Devices) */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="group flex items-center justify-center w-10 h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] relative"
              >
                <Bell className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
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
              className="hidden md:flex group items-center justify-center w-10 h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              title="Cari (Ctrl+K)"
            >
              <Search className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Elegant Login (Hidden on mobile) */}
            <Link
              href="/login"
              className="hidden md:flex relative overflow-hidden group items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] hover:-translate-y-0.5 border border-transparent hover:border-blue-400/30"
            >
              <User className="w-4 h-4 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span className="relative z-10">{t('nav.login')}</span>
            </Link>

            {/* Mobile Navbar Toggler */}
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-secondary-offwhite hover:bg-primary-blue text-primary-navy hover:text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-slate-100 bg-white shadow-lg absolute top-full left-0 w-full z-40"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-primary-navy hover:bg-secondary-offwhite hover:text-primary-blue transition-colors group flex items-center justify-between border border-transparent hover:border-slate-100"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all text-accent-gold">&rarr;</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile-only actions inside the menu */}
              <div className="md:hidden mt-6 pt-6 border-t border-slate-100 flex flex-col space-y-3">
                <div className="flex gap-3">
                  <button className="flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-600 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <Link href="/informasi" className="flex items-center justify-center flex-grow space-x-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-medium relative">
                    <Bell className="w-5 h-5" />
                    <span>Notifikasi Baru</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Link>
                </div>
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white w-full px-4 py-3 rounded-xl font-bold shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span>Masuk Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Command Palette Overlay */}
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
