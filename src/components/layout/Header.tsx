"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, User, Globe, Eye, ChevronDown, ChevronRight, 
  Bell, AlertTriangle, FileText, Package,
  Home, Briefcase, Calendar, Image as ImageIcon, BarChart3, 
  Building2, Scale, BookOpen, FileCheck, Award, ShieldCheck, 
  FileSpreadsheet, Vote, Target, ScrollText, HelpCircle,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { SearchPalette } from '@/components/ui/SearchPalette';
import { useData } from '@/contexts/DataContext';

export function Header() {
  const { newsList, agendaList, packagesList, regulasiList, sopList, siteSettings } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isA11yMenuOpen, setIsA11yMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [readNotifCount, setReadNotifCount] = useState<number>(0);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const a11y = useAccessibility();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ukpbj_public_read_notif_count');
        if (saved) setReadNotifCount(parseInt(saved, 10));
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  // Top Dynamic CMS Notifications: Paket Pengadaan PBJ, Berita/Pengumuman, Agenda/Jadwal, Regulasi/Aturan, dan Standar SOP
  const cmsNotifications = React.useMemo(() => {
    const list: Array<{
      id: string;
      category: string;
      title: string;
      desc: string;
      time: string;
      href: string;
      badgeClass: string;
      iconBg: string;
      iconColor: string;
      icon: React.ReactNode;
    }> = [];

    // 1. Pengumuman Resmi (Banner Aktif)
    if (siteSettings?.announcementActive && siteSettings?.announcementBanner) {
      list.push({
        id: 'banner-announcement',
        category: 'Pengumuman Resmi',
        title: 'Pemberitahuan UKPBJ',
        desc: siteSettings.announcementBanner,
        time: 'Penting',
        href: '/informasi',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        icon: <AlertTriangle className="w-4 h-4" />
      });
    }

    // 2. Paket Pengadaan PBJ Terbaru (Tender, Seleksi, E-Purchasing)
    if (packagesList && packagesList.length > 0) {
      packagesList
        .slice(0, 3)
        .forEach((pkg) => {
          list.push({
            id: `pkg-${pkg.id}`,
            category: pkg.category === 'Tender' ? 'Tender PBJ' : `${pkg.category}`,
            title: `${pkg.code}: ${pkg.title}`,
            desc: `Nilai HPS: ${pkg.hps} • ${pkg.unit}`,
            time: `Batas: ${pkg.deadline}`,
            href: '/#pengadaan',
            badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
            icon: <Package className="w-4 h-4" />
          });
        });
    }

    // 3. Berita & Warta Terbit
    if (newsList && newsList.length > 0) {
      newsList
        .filter((n) => n.status === 'Published')
        .slice(0, 2)
        .forEach((news) => {
          list.push({
            id: `news-${news.id}`,
            category: news.category || 'Berita & Pengumuman',
            title: news.title,
            desc: news.excerpt || (news.content ? news.content.slice(0, 85) + '...' : ''),
            time: news.date || 'Terbaru',
            href: `/berita/${news.id}`,
            badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            icon: <FileText className="w-4 h-4" />
          });
        });
    }

    // 4. Agenda & Jadwal (Bimtek, Rapat Kerja, Sosialisasi)
    if (agendaList && agendaList.length > 0) {
      agendaList
        .filter((a) => a.status !== 'Dibatalkan')
        .slice(0, 2)
        .forEach((agenda) => {
          list.push({
            id: `agenda-${agenda.id}`,
            category: `Agenda ${agenda.category}`,
            title: agenda.title,
            desc: `${agenda.location} • ${agenda.time}`,
            time: agenda.date || 'Jadwal Aktif',
            href: '/agenda',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            icon: <Calendar className="w-4 h-4" />
          });
        });
    }

    // 5. Regulasi & Aturan (Perpres, Permenaker, SE)
    if (regulasiList && regulasiList.length > 0) {
      regulasiList
        .filter((r) => r.status === 'Aktif')
        .slice(0, 2)
        .forEach((reg) => {
          list.push({
            id: `reg-${reg.id}`,
            category: reg.kategori || 'Regulasi JDIH',
            title: reg.nomor,
            desc: reg.tentang,
            time: `Tahun ${reg.tahun}`,
            href: '/informasi/peraturan',
            badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            icon: <Scale className="w-4 h-4" />
          });
        });
    }

    // 6. Standar SOP (Prosedur & Alur Kerja)
    if (sopList && sopList.length > 0) {
      sopList
        .filter((s) => s.status === 'Berlaku')
        .slice(0, 1)
        .forEach((sop) => {
          list.push({
            id: `sop-${sop.id}`,
            category: 'Standar SOP',
            title: `${sop.kode}: ${sop.judul}`,
            desc: `${sop.unit} • ${sop.tahapanCount} Tahapan Kerja`,
            time: sop.revisi || 'Berlaku',
            href: '/informasi/sop',
            badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
            iconBg: 'bg-teal-100',
            iconColor: 'text-teal-600',
            icon: <FileCheck className="w-4 h-4" />
          });
        });
    }

    // Ambil data CMS teratas
    return list.slice(0, 7);
  }, [packagesList, newsList, agendaList, regulasiList, sopList, siteSettings]);

  const unreadPublicCount = Math.max(0, cmsNotifications.length - readNotifCount);

  const handleOpenNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setReadNotifCount(cmsNotifications.length);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ukpbj_public_read_notif_count', String(cmsNotifications.length));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const infoSubmenu = [
    { label: t('nav.menu_info_regulasi'), href: '/informasi/peraturan', icon: <Scale className="w-4 h-4" />, desc: t('nav.menu_info_regulasi_desc') },
    { label: t('nav.menu_info_panduan'), href: '/informasi/panduan', icon: <BookOpen className="w-4 h-4" />, desc: t('nav.menu_info_panduan_desc') },
    { label: t('nav.menu_info_sop'), href: '/informasi/sop', icon: <FileCheck className="w-4 h-4" />, desc: t('nav.menu_info_sop_desc') },
    { label: t('nav.menu_info_sertifikat'), href: '/informasi/sertifikat-pbj', icon: <Award className="w-4 h-4" />, desc: t('nav.menu_info_sertifikat_desc') },
    { label: t('nav.menu_info_tkdn'), href: '/informasi/tkdn', icon: <ShieldCheck className="w-4 h-4" />, desc: t('nav.menu_info_tkdn_desc') },
    { label: t('nav.menu_info_perizinan'), href: '/informasi/perizinan', icon: <FileSpreadsheet className="w-4 h-4" />, desc: t('nav.menu_info_perizinan_desc') },
    { label: t('nav.menu_info_pemilu'), href: '/informasi/pemilu', icon: <Vote className="w-4 h-4" />, desc: t('nav.menu_info_pemilu_desc') },
    { label: t('nav.menu_info_berita'), href: '/berita', icon: <Newspaper className="w-4 h-4" />, desc: t('nav.menu_info_berita_desc') },
  ];

  const aboutSubmenu = [
    { label: t('nav.menu_about_visi'), href: '/tentang#visi-misi', icon: <Target className="w-4 h-4" />, desc: t('nav.menu_about_visi_desc') },
    { label: t('nav.menu_about_maklumat'), href: '/tentang#maklumat', icon: <ScrollText className="w-4 h-4" />, desc: t('nav.menu_about_maklumat_desc') },
    { label: t('nav.menu_about_monitoring'), href: '/monitoring', icon: <BarChart3 className="w-4 h-4" />, desc: t('nav.menu_about_monitoring_desc') },
    { label: t('nav.menu_about_sop'), href: '/informasi/sop', icon: <Building2 className="w-4 h-4" />, desc: t('nav.menu_about_sop_desc') },
    { label: t('nav.menu_about_faq'), href: '/tentang#faq', icon: <HelpCircle className="w-4 h-4" />, desc: t('nav.menu_about_faq_desc') },
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
    { label: t('nav.home'), href: '/', icon: <Home className="w-4 h-4" /> },
    { label: t('nav.info'), href: '/informasi', hasDropdown: true, dropdownType: 'info', icon: <FileText className="w-4 h-4" /> },
    { label: t('nav.services'), href: '/layanan', icon: <Briefcase className="w-4 h-4" /> },
    { label: t('nav.agenda'), href: '/agenda', icon: <Calendar className="w-4 h-4" /> },
    { label: t('nav.gallery'), href: '/galeri', icon: <ImageIcon className="w-4 h-4" /> },
    { label: t('nav.monitoring'), href: '/monitoring', icon: <BarChart3 className="w-4 h-4" /> },
    { label: t('nav.about'), href: '/tentang', hasDropdown: true, dropdownType: 'about', icon: <Building2 className="w-4 h-4" /> }
  ];

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-[#07172E] border-b border-white/10">
      {/* Top Government Bar */}
      <div className="bg-[#051122] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium tracking-wide border-b border-white/10 shadow-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] sm:text-xs tracking-normal md:tracking-widest leading-tight text-center md:text-left w-full font-semibold text-slate-200">
              {t('nav.gov_title')}
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 200)}
                className="hover:text-accent-gold transition-colors flex items-center space-x-1.5 cursor-pointer bg-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 hover:border-accent-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] relative overflow-hidden group text-[10px] sm:text-xs text-white"
              >
                <div className="absolute inset-0 bg-accent-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10" />
                <span className="relative z-10 font-bold tracking-wider">{language.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180 text-accent-gold' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-2 w-36 bg-[#0A2246] rounded-xl shadow-2xl overflow-hidden border border-white/15 z-50 text-white"
                  >
                    <div className="p-1">
                      <button 
                        onClick={() => toggleLanguage('id')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${language === 'id' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-white/10 text-slate-200'}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">🇮🇩</span>
                          <span>Indonesia</span>
                        </span>
                        {language === 'id' && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </button>
                      <button 
                        onClick={() => toggleLanguage('en')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${language === 'en' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-white/10 text-slate-200'}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">🇬🇧</span>
                          <span>English</span>
                        </span>
                        {language === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
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
                className="hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer text-slate-300 hover:text-white"
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
                    className="absolute right-0 mt-3 w-72 bg-[#0A2246] rounded-xl shadow-2xl overflow-hidden border border-white/15 z-50 text-white"
                  >
                    <div className="p-4 border-b border-white/10 bg-[#07172E]">
                      <h3 className="font-bold text-white">Mode Aksesibilitas</h3>
                      <p className="text-xs text-slate-400">Sesuaikan tampilan untuk kenyamanan Anda.</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      {/* Toggle Large Text */}
                      <div 
                        onClick={() => a11y.toggleSetting('isLargeText')}
                        className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200">Perbesar Teks</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isLargeText ? 'bg-blue-600' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isLargeText ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle High Contrast */}
                      <div 
                        onClick={() => a11y.toggleSetting('isHighContrast')}
                        className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200">Kontras Tinggi</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isHighContrast ? 'bg-blue-600' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isHighContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Grayscale */}
                      <div 
                        onClick={() => a11y.toggleSetting('isGrayscale')}
                        className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200">Mode Monokrom</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isGrayscale ? 'bg-blue-600' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isGrayscale ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Highlight Links */}
                      <div 
                        onClick={() => a11y.toggleSetting('isHighlightLinks')}
                        className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200">Sorot Tautan</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isHighlightLinks ? 'bg-blue-600' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isHighlightLinks ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {/* Toggle Reduce Motion */}
                      <div 
                        onClick={() => a11y.toggleSetting('isReduceMotion')}
                        className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200">Hentikan Animasi</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${a11y.isReduceMotion ? 'bg-blue-600' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${a11y.isReduceMotion ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t border-white/10">
                      <button 
                        onClick={() => { a11y.resetSettings(); setIsA11yMenuOpen(false); }}
                        className="w-full py-2 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors"
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

      {/* Main Navigation (Floating White Island Dock on Blue Background) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 md:py-2.5 transition-all duration-300 bg-[#07172E]">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 sm:px-6 py-2 flex justify-between items-center transition-all duration-300">
          
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
              <div className="h-6 md:h-7 border-l border-slate-200"></div>
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
                                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/60 flex items-center justify-center text-sm flex-shrink-0 group-hover/sub:bg-primary-navy group-hover/sub:text-white group-hover/sub:border-primary-navy transition-all shadow-2xs">
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
                onClick={handleOpenNotifications}
                className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] relative cursor-pointer"
                title="Notifikasi & Pembaruan Terkini"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 transform group-hover:scale-110 transition-transform" />
                {unreadPublicCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 px-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                    {unreadPublicCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    {/* Backdrop on mobile for clean focus & click-outside */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsNotificationOpen(false)}
                      className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 sm:hidden"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-x-3 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96 max-w-md mx-auto sm:max-w-none bg-white border border-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden z-[100] flex flex-col max-h-[80vh] sm:max-h-[500px]"
                    >
                      {/* Header Panel */}
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-primary-navy">Notifikasi & Pembaruan</h3>
                          {unreadPublicCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">
                              {unreadPublicCount} baru
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
                            {cmsNotifications.length} Aktivitas
                          </span>
                          <button
                            onClick={() => setIsNotificationOpen(false)}
                            className="p-1 -mr-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer flex items-center justify-center w-7 h-7 text-xs font-bold"
                            title="Tutup Notifikasi"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      
                      {/* Scrollable list of notifications */}
                      <div className="overflow-y-auto divide-y divide-slate-100 bg-white flex-1 overscroll-contain">
                        {cmsNotifications.length > 0 ? (
                          cmsNotifications.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setIsNotificationOpen(false)}
                              className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-start gap-3 group cursor-pointer block bg-white"
                            >
                              <div className={`w-9 h-9 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs`}>
                                {item.icon}
                              </div>
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border max-w-[170px] truncate bg-slate-100 text-slate-600 border-slate-200`}>
                                    {item.category}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                                    {item.time}
                                  </span>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-primary-blue transition-colors leading-snug line-clamp-2">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-8 text-center text-slate-400 text-xs bg-white">
                            Belum ada notifikasi atau pembaruan konten baru.
                          </div>
                        )}
                      </div>
                      
                      {/* Bottom Footer Action */}
                      <div className="p-3.5 bg-slate-50 border-t border-slate-100 shrink-0">
                        <Link 
                          href="/informasi/pembaruan" 
                          onClick={() => setIsNotificationOpen(false)}
                          className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-gradient-to-r from-primary-navy to-primary-blue rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-98"
                        >
                          <span>Lihat Pusat Informasi & Pembaruan</span>
                          <span className="text-accent-gold">→</span>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Elegant Search */}
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
              className="hidden md:flex relative overflow-hidden group items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span className="relative z-10">{t('nav.login')}</span>
            </Link>

            {/* Mobile Navbar Toggler */}
            <button 
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 border shadow-xs relative z-[1001] cursor-pointer ${
                isMobileMenuOpen 
                  ? 'bg-primary-navy text-white border-primary-navy shadow-lg' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative pointer-events-none">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`w-5 h-0.5 rounded-full origin-center ${isMobileMenuOpen ? 'bg-white' : 'bg-slate-700'}`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-5 h-0.5 rounded-full ${isMobileMenuOpen ? 'bg-white' : 'bg-slate-700'}`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`w-5 h-0.5 rounded-full origin-center ${isMobileMenuOpen ? 'bg-white' : 'bg-slate-700'}`}
                />
              </div>
            </button>
          </div>
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
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Side Drawer Panel */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-[82%] max-w-[340px] h-full bg-white border-r border-slate-200 shadow-2xl z-[1000] flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header with Logos */}
                <div className="p-5 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/80">
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
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                isCurrentActive
                                  ? 'bg-primary-navy text-accent-gold shadow-xs'
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-primary-navy/10 group-hover:text-primary-navy'
                              }`}>
                                {item.icon}
                              </div>
                              <span className="text-sm font-semibold">{item.label}</span>
                            </div>
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
                                    className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-primary-navy hover:bg-slate-50 transition-colors group/sub"
                                  >
                                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover/sub:bg-primary-navy group-hover/sub:text-white transition-colors shadow-2xs">
                                      {sub.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-semibold truncate">{sub.label}</p>
                                      <p className="text-[10px] text-slate-400 truncate">{sub.desc}</p>
                                    </div>
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
                        className={`py-3 px-2 flex items-center justify-between transition-colors group ${
                          pathname === item.href
                            ? 'text-primary-navy font-bold'
                            : 'text-slate-700 font-semibold hover:text-primary-blue'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                            pathname === item.href
                              ? 'bg-primary-navy text-accent-gold shadow-xs'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-primary-navy/10 group-hover:text-primary-navy'
                          }`}>
                            {item.icon}
                          </div>
                          <span className="text-sm font-semibold">{item.label}</span>
                        </div>
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
      
      {/* Search Command Palette Overlay */}
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
