"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Network, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  Server, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  FileCheck, 
  ExternalLink, 
  Plus,
  Newspaper,
  Calendar,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  Check,
  RefreshCw,
  Sun,
  Moon,
  ChevronDown,
  ScrollText,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData, NewsItem, AgendaItem, ProcurementPackage, RegulasiItem, SopItem } from '@/contexts/DataContext';

export default function AdminPortalPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'paket' | 'manage-berita' | 'manage-agenda' | 'manage-regulasi' | 'manage-sop' | 'arsitektur' | 'penyedia' | 'laporan' | 'pengaturan'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCmsOpen, setIsCmsOpen] = useState(true);
  
  // DataContext Hook
  const {
    newsList,
    addNews,
    updateNews,
    deleteNews,
    toggleNewsStatus,
    agendaList,
    addAgenda,
    updateAgenda,
    deleteAgenda,
    packagesList,
    addPackage,
    deletePackage,
    regulasiList,
    addRegulasi,
    updateRegulasi,
    deleteRegulasi,
    toggleRegulasiStatus,
    sopList,
    addSop,
    updateSop,
    deleteSop,
    siteSettings,
    updateSiteSettings,
    resetToDefaults
  } = useData();

  // Package Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ProcurementPackage | null>(null);

  // Add Package Modal State
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [packageFormData, setPackageFormData] = useState<Partial<ProcurementPackage>>({
    code: 'TND-2026-009',
    title: '',
    unit: 'Biro Perencanaan Kemnaker RI',
    hps: 'Rp 500.000.000',
    category: 'Tender',
    status: 'Pendaftaran Dibuka',
    deadline: '25 Sep 2026',
    method: 'Tender - Pascakualifikasi Satu File - Harga Terendah Sistem Gugur',
    docCount: 3,
    desc: ''
  });

  // Vendor Form Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [vendorSuccess, setVendorSuccess] = useState(false);

  // Modals for CRUD News & Agenda
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFormData, setNewsFormData] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Berita PBJ',
    author: 'Admin UKPBJ Kemnaker',
    status: 'Published',
    excerpt: '',
    content: ''
  });

  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null);
  const [agendaFormData, setAgendaFormData] = useState<Partial<AgendaItem>>({
    title: '',
    category: 'Bimtek',
    date: '15 Sep 2026',
    time: '09:00 - 12:00 WIB',
    location: 'Gedung Kemnaker RI',
    organizer: 'UKPBJ Kemnaker RI',
    capacity: '100 Peserta',
    status: 'Terjadwal'
  });

  // REGULASI & SOP MODAL STATES
  const [showRegulasiModal, setShowRegulasiModal] = useState(false);
  const [editingRegulasi, setEditingRegulasi] = useState<RegulasiItem | null>(null);
  const [regulasiFormData, setRegulasiFormData] = useState<Partial<RegulasiItem>>({
    nomor: '',
    tentang: '',
    tahun: '2026',
    kategori: 'Peraturan Menteri',
    fileSize: '2.5 MB',
    status: 'Aktif'
  });

  const [showSopModal, setShowSopModal] = useState(false);
  const [editingSop, setEditingSop] = useState<SopItem | null>(null);
  const [sopFormData, setSopFormData] = useState<Partial<SopItem>>({
    kode: 'SOP/PBJ/06/2026',
    judul: '',
    unit: 'UKPBJ Kemnaker RI',
    revisi: 'Rev. 01 (2026)',
    tahapanCount: 5,
    status: 'Berlaku'
  });

  const [previewNews, setPreviewNews] = useState<NewsItem | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // NEWS HANDLERS
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      updateNews(editingNews.id, newsFormData);
      showNotification('✓ Berita berhasil diperbarui dan tersinkronisasi ke Frontend (/informasi & /)!');
    } else {
      addNews({
        title: newsFormData.title || 'Judul Berita Baru',
        category: (newsFormData.category as NewsItem['category']) || 'Berita PBJ',
        author: newsFormData.author || 'Admin UKPBJ Kemnaker',
        status: (newsFormData.status as NewsItem['status']) || 'Published',
        excerpt: newsFormData.excerpt || '',
        content: newsFormData.content || '',
        imageUrl: '/news/news-1.png'
      });
      showNotification('✓ Berita baru berhasil diterbitkan dan langsung tayang di Frontend (/informasi)!');
    }
    setShowNewsModal(false);
    setEditingNews(null);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini? Data akan langsung terhapus dari backend dan frontend.')) {
      deleteNews(id);
      showNotification('Berita telah dihapus dari backend & frontend.');
    }
  };

  const handleToggleNewsStatus = (id: string) => {
    toggleNewsStatus(id);
    showNotification('Status publikasi berita berhasil diubah dan disinkronkan!');
  };

  // AGENDA HANDLERS
  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgenda) {
      updateAgenda(editingAgenda.id, agendaFormData);
      showNotification('✓ Agenda berhasil diperbarui dan tersinkronisasi ke Frontend (/agenda)!');
    } else {
      addAgenda({
        title: agendaFormData.title || 'Agenda Baru',
        category: (agendaFormData.category as AgendaItem['category']) || 'Bimtek',
        date: agendaFormData.date || '15 Sep 2026',
        time: agendaFormData.time || '09:00 - 12:00 WIB',
        location: agendaFormData.location || 'Gedung Kemnaker RI',
        organizer: agendaFormData.organizer || 'UKPBJ Kemnaker RI',
        capacity: agendaFormData.capacity || '100 Peserta',
        status: (agendaFormData.status as AgendaItem['status']) || 'Terjadwal'
      });
      showNotification('✓ Agenda baru berhasil ditambahkan ke kalender publik (/agenda)!');
    }
    setShowAgendaModal(false);
    setEditingAgenda(null);
  };

  const handleDeleteAgenda = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus agenda ini? Data akan langsung terhapus dari kalender publik.')) {
      deleteAgenda(id);
      showNotification('Agenda telah dihapus dari sistem backend dan frontend.');
    }
  };

  // REGULASI HANDLERS
  const handleSaveRegulasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRegulasi) {
      updateRegulasi(editingRegulasi.id, regulasiFormData);
      showNotification('✓ Regulasi berhasil diperbarui dan disinkronkan ke Frontend (/informasi/peraturan)!');
    } else {
      addRegulasi({
        nomor: regulasiFormData.nomor || 'Permenaker No. 01 Tahun 2026',
        tentang: regulasiFormData.tentang || 'Pedoman Teknis Pengadaan Barang/Jasa',
        tahun: regulasiFormData.tahun || '2026',
        kategori: (regulasiFormData.kategori as RegulasiItem['kategori']) || 'Peraturan Menteri',
        fileSize: regulasiFormData.fileSize || '2.0 MB',
        downloadUrl: '#',
        status: (regulasiFormData.status as RegulasiItem['status']) || 'Aktif'
      });
      showNotification('✓ Regulasi baru berhasil ditambahkan dan langsung aktif di Frontend!');
    }
    setShowRegulasiModal(false);
    setEditingRegulasi(null);
  };

  const handleDeleteRegulasi = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus regulasi ini? Data akan langsung terhapus dari portal publik.')) {
      deleteRegulasi(id);
      showNotification('Regulasi telah dihapus dari sistem.');
    }
  };

  const handleToggleRegulasiStatus = (id: string) => {
    toggleRegulasiStatus(id);
    showNotification('Status regulasi berhasil diubah!');
  };

  // SOP HANDLERS
  const handleSaveSop = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSop) {
      updateSop(editingSop.id, sopFormData);
      showNotification('✓ SOP berhasil diperbarui dan disinkronkan ke Frontend (/informasi/sop)!');
    } else {
      addSop({
        kode: sopFormData.kode || `SOP/PBJ/0${sopList.length + 1}/2026`,
        judul: sopFormData.judul || 'Standar Operasional Prosedur Pengadaan',
        unit: sopFormData.unit || 'UKPBJ Kemnaker RI',
        revisi: sopFormData.revisi || 'Rev. 01 (2026)',
        tahapanCount: sopFormData.tahapanCount || 5,
        downloadUrl: '#',
        status: (sopFormData.status as SopItem['status']) || 'Berlaku'
      });
      showNotification('✓ SOP baru berhasil ditambahkan ke daftar panduan operasional!');
    }
    setShowSopModal(false);
    setEditingSop(null);
  };

  const handleDeleteSop = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus SOP ini?')) {
      deleteSop(id);
      showNotification('SOP telah dihapus dari sistem.');
    }
  };

  // PACKAGE HANDLERS
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    addPackage({
      code: packageFormData.code || `TND-2026-00${packagesList.length + 1}`,
      title: packageFormData.title || 'Paket Pengadaan Baru',
      unit: packageFormData.unit || 'Biro Perencanaan Kemnaker RI',
      hps: packageFormData.hps || 'Rp 500.000.000',
      category: (packageFormData.category as ProcurementPackage['category']) || 'Tender',
      status: (packageFormData.status as ProcurementPackage['status']) || 'Pendaftaran Dibuka',
      deadline: packageFormData.deadline || '25 Sep 2026',
      method: packageFormData.method || 'Tender - Pascakualifikasi Satu File',
      docCount: 3,
      desc: packageFormData.desc || ''
    });
    showNotification('✓ Paket Pengadaan berhasil ditambahkan dan langsung tampil di Homepage Publik (/ & /#pengadaan)!');
    setShowPackageModal(false);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus paket pengadaan ini dari sistem?')) {
      deletePackage(id);
      showNotification('Paket pengadaan telah dihapus.');
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  // Dynamic Theme Helpers
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'
    }`}>
      
      {/* NOTIFICATION TOAST */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400/30 text-xs font-bold"
          >
            <Check className="w-4 h-4" />
            <span>{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-full md:w-64 border-r flex flex-col justify-between shrink-0 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          {/* Logo & Portal Brand */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-accent-gold flex items-center justify-center shadow-md">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`font-extrabold text-sm tracking-wide ${isDark ? 'text-white' : 'text-primary-navy'}`}>
                  PORTAL ADMIN
                </h1>
                <p className="text-[10px] text-accent-gold font-bold">UKPBJ KEMNAKER RI</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-4">
            {/* GRUP 1: UTAMA */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Utama
              </p>
              
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('paket')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'paket'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Paket Pengadaan</span>
                <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-accent-gold text-slate-950 rounded-full font-extrabold">{packagesList.length}</span>
              </button>
            </div>

            {/* GRUP 2: KELOLA WEB PUBLIK (CMS) - SIDE DOWN ACCORDION */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-accent-gold">
                  Kelola Web Publik (CMS)
                </p>
                <button
                  type="button"
                  onClick={() => setIsCmsOpen(!isCmsOpen)}
                  className="p-1 text-slate-400 hover:text-accent-gold transition-colors cursor-pointer rounded-md"
                  title="Buka/Tutup Menu Kelola Web"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCmsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Side-Down Collapsible Submenu */}
              <AnimatePresence initial={false}>
                {isCmsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-1 pl-1.5 border-l-2 border-accent-gold/30 ml-2"
                  >
                    {/* Berita */}
                    <button
                      onClick={() => setActiveTab('manage-berita')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'manage-berita'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Newspaper className="w-3.5 h-3.5 text-amber-500" />
                      <span>Berita & Pengumuman</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-amber-500/20 text-amber-500 dark:text-amber-400 rounded font-bold">
                        {newsList.length}
                      </span>
                    </button>

                    {/* Agenda */}
                    <button
                      onClick={() => setActiveTab('manage-agenda')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'manage-agenda'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Agenda & Jadwal</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 rounded font-bold">
                        {agendaList.length}
                      </span>
                    </button>

                    {/* Regulasi */}
                    <button
                      onClick={() => setActiveTab('manage-regulasi')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'manage-regulasi'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <ScrollText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Regulasi & Aturan</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-blue-500/20 text-blue-400 rounded font-bold">
                        {regulasiList.length}
                      </span>
                    </button>

                    {/* SOP */}
                    <button
                      onClick={() => setActiveTab('manage-sop')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'manage-sop'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>Standar SOP</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-purple-500/20 text-purple-400 rounded font-bold">
                        {sopList.length}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GRUP 3: SISTEM & BLUEPRINT */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Sistem & Blueprint
              </p>

              <button
                onClick={() => setActiveTab('arsitektur')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'arsitektur'
                    ? 'bg-gradient-to-r from-accent-gold to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Arsitektur Portal</span>
                <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded font-bold">5-Tier</span>
              </button>

              <button
                onClick={() => setActiveTab('penyedia')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'penyedia'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Vendor / Penyedia</span>
              </button>

              <button
                onClick={() => setActiveTab('laporan')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'laporan'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Laporan & Kinerja</span>
              </button>

              <button
                onClick={() => setActiveTab('pengaturan')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'pengaturan'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-primary-navy hover:bg-slate-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Profile Card & Back to Home */}
        <div className={`p-4 border-t space-y-3 ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className={`flex items-center space-x-3 px-2 py-2 rounded-xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="w-9 h-9 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center font-bold text-accent-gold text-xs">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>Dimas Ars</p>
              <p className="text-[10px] text-slate-400 truncate">Admin UKPBJ Kemnaker</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors ${
                isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Web Publik</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className={`flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-950' : 'bg-slate-100'
      }`}>
        
        {/* Top Header */}
        <header className={`h-16 border-b backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300 ${
          isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white/90'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="relative w-64 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berita, agenda, paket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-1.5 border rounded-xl text-xs transition-all outline-none ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:bg-white'
                }`}
              />
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Backend Ready</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            
            {/* THEME TOGGLE BUTTON (LIGHT / DARK) */}
            <div className={`flex items-center p-1 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-amber-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Aktifkan Mode Terang (Light Mode)"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Aktifkan Mode Gelap (Dark Mode)"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            <button 
              onClick={() => setActiveTab('arsitektur')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent-gold/10 border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/20 text-xs font-bold transition-all cursor-pointer"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Blueprint Arsitektur</span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD UTAMA */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Dashboard Admin</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Selamat datang, <strong className={isDark ? 'text-white' : 'text-slate-800'}>Dimas Ars 👋</strong> — Monitoring pengelolaan pengadaan, berita, dan agenda terkini.
              </p>
            </div>

            {/* 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border shadow-sm ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Total Paket PBJ</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>128</p>
                <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                  <span>↑ 12% dari bulan lalu</span>
                </p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Berita Published</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Newspaper className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {newsList.filter(n => n.status === 'Published').length}
                </p>
                <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                  <span>Terkoneksi Frontend (/informasi)</span>
                </p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Agenda Terjadwal</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {agendaList.length}
                </p>
                <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                  <span>Terkoneksi Kalender (/agenda)</span>
                </p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">Penyedia Terverifikasi</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>342</p>
                <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                  <span>SiKAP LKPP Sinkron</span>
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left: Berita Terkini Quick Monitor */}
              <div className={`border rounded-2xl p-5 space-y-4 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-amber-500" />
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Monitoring Berita & Pengumuman
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('manage-berita')}
                    className="text-xs text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Editor Berita</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {newsList.slice(0, 3).map((item) => (
                    <div key={item.id} className={`p-3 rounded-xl border flex justify-between items-center ${
                      isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
                    }`}>
                      <div className="min-w-0 pr-3">
                        <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.category} • {item.author}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                        item.status === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Agenda Terkini Quick Monitor */}
              <div className={`border rounded-2xl p-5 space-y-4 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Monitoring Agenda & Bimtek
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('manage-agenda')}
                    className="text-xs text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Kelola Agenda</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {agendaList.slice(0, 3).map((item) => (
                    <div key={item.id} className={`p-3 rounded-xl border flex justify-between items-center ${
                      isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
                    }`}>
                      <div className="min-w-0 pr-3">
                        <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.date} • {item.location}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MANAGE BERITA (FRONTEND <-> BACKEND HANDLER) */}
        {/* ========================================================= */}
        {activeTab === 'manage-berita' && (
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Header with Backend Sync Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase mb-2">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Backend Content Management System (CMS)</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Manage Berita & Pengumuman
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola konten berita dari backend untuk otomatis tampil secara real-time pada halaman publik (<Link href="/informasi" className="text-blue-500 hover:underline">/informasi</Link>).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingNews(null);
                    setNewsFormData({
                      title: '',
                      category: 'Berita PBJ',
                      author: 'Admin UKPBJ Kemnaker',
                      status: 'Published',
                      excerpt: '',
                      content: ''
                    });
                    setShowNewsModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Berita Baru</span>
                </button>
              </div>
            </div>

            {/* News Table */}
            <div className={`border rounded-2xl overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`p-4 border-b flex justify-between items-center text-xs ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Daftar Berita Aktif ({newsList.length})
                </span>
                <span className="text-emerald-500 text-[11px] font-semibold flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Auto-Sync to Frontend Active</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`text-[11px] border-b ${
                    isDark ? 'bg-slate-950/50 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    <tr>
                      <th className="p-4 font-semibold">Judul Berita</th>
                      <th className="p-4 font-semibold">Kategori</th>
                      <th className="p-4 font-semibold">Penulis / Unit</th>
                      <th className="p-4 font-semibold">Status Publikasi</th>
                      <th className="p-4 font-semibold">Tanggal & Views</th>
                      <th className="p-4 font-semibold text-right">Aksi Manajemen</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isDark ? 'divide-slate-800/60' : 'divide-slate-100'
                  }`}>
                    {newsList.map((item) => (
                      <tr key={item.id} className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}>
                        <td className="p-4">
                          <p className={`font-bold text-xs max-w-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.excerpt}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {item.category}
                          </span>
                        </td>
                        <td className={`p-4 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {item.author}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleNewsStatus(item.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                              item.status === 'Published'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                          >
                            {item.status === 'Published' ? '✓ Published (Live)' : 'Draft (Hidden)'}
                          </button>
                        </td>
                        <td className="p-4 text-slate-400 text-[11px]">
                          <div>{item.date}</div>
                          <div className="text-[10px] text-slate-500">{item.views.toLocaleString()} pembaca</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setPreviewNews(item)}
                              title="Preview Frontend"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark ? 'bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingNews(item);
                                setNewsFormData(item);
                                setShowNewsModal(true);
                              }}
                              title="Edit Berita"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark ? 'bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-amber-600 text-slate-600 hover:text-white'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              title="Hapus Berita"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark ? 'bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: MANAGE AGENDA (FRONTEND <-> BACKEND HANDLER) */}
        {/* ========================================================= */}
        {activeTab === 'manage-agenda' && (
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Header with Backend Sync Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Backend Schedule & Timeline Handler</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Manage Agenda & Jadwal PBJ
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola jadwal tender, bimbingan teknis, dan sertifikasi untuk otomatis tersinkronisasi ke kalender publik (<Link href="/agenda" className="text-blue-500 hover:underline">/agenda</Link>).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingAgenda(null);
                    setAgendaFormData({
                      title: '',
                      category: 'Bimtek',
                      date: '15 Sep 2026',
                      time: '09:00 - 12:00 WIB',
                      location: 'Gedung Kemnaker RI',
                      organizer: 'UKPBJ Kemnaker RI',
                      capacity: '100 Peserta',
                      status: 'Terjadwal'
                    });
                    setShowAgendaModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>
            </div>

            {/* Agenda List & Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agendaList.map((item) => (
                <div key={item.id} className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/40'
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-500">
                      {item.status}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item.date} • {item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{item.organizer} ({item.capacity})</span>
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex justify-between items-center ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Synced to /agenda</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingAgenda(item);
                          setAgendaFormData(item);
                          setShowAgendaModal(true);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white' : 'bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white'
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAgenda(item.id)}
                        className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-red-600' : 'bg-slate-100 hover:bg-red-600'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ARSITEKTUR PORTAL (5-TIER SYSTEM ARCHITECTURE) */}
        {/* ========================================================= */}
        {activeTab === 'arsitektur' && (
          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-bold uppercase mb-2">
                  <Network className="w-3.5 h-3.5" />
                  <span>Blueprint Arsitektur Sistem</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Arsitektur Portal UKPBJ Kementerian Ketenagakerjaan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Satu Portal, Seluruh Informasi Pengadaan Terintegrasi.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                  Status: Operasional 100%
                </span>
              </div>
            </div>

            {/* 5-Tier Horizontal Pipeline from Uploaded Image */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              {/* TIER 1: PENGGUNA */}
              <div className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Pengguna</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {['PPK / PA', 'Pokja Pemilihan', 'Penyedia / Vendor', 'Masyarakat Umum', 'Admin UKPBJ'].map((userRole, idx) => (
                      <div key={userRole} className={`flex items-center space-x-2 p-2 rounded-lg border ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{userRole}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] text-slate-400 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  Role-Based Access Control
                </div>
              </div>

              {/* TIER 2: FRONTEND (WEB PORTAL) */}
              <div className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-blue-900/40' : 'bg-white border-blue-200 shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-blue-500 uppercase tracking-wider mb-3">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>Frontend Portal</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-3 text-center">
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Web Browser</p>
                    <p className="text-[10px] text-blue-500">(Desktop & Mobile)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>UI/UX Modern & Formal</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Responsive Design</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Aksesibilitas (A11y)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Multi Bahasa (ID/EN)</span>
                    </li>
                  </ul>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] text-slate-400 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  Next.js Client Components
                </div>
              </div>

              {/* TIER 3: BACKEND / APPLICATION LAYER */}
              <div className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-accent-gold uppercase tracking-wider mb-3">
                    <Server className="w-4 h-4 text-accent-gold" />
                    <span>Backend / App Layer</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3 text-center">
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Next.js / Node.js</p>
                    <p className="text-[10px] text-accent-gold">(API & Business Logic)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Manajemen Pengguna</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Manajemen Pengadaan</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Notifikasi & Messaging</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Integrasi External API</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span>Security & Auth</span>
                    </li>
                  </ul>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] text-slate-400 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  RESTful & Edge Endpoints
                </div>
              </div>

              {/* TIER 4: DATABASE */}
              <div className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-emerald-900/40' : 'bg-white border-emerald-200 shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-500 uppercase tracking-wider mb-3">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span>Database</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-3 text-center">
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>PostgreSQL</p>
                    <p className="text-[10px] text-emerald-500">(Cloud Database)</p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Data Pengguna & Hak</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Data Paket Pengadaan</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Data Dokumen & KAK</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Log Aktivitas & Audit</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Metadata & Config</span>
                    </li>
                  </ul>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] text-slate-400 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  ACID Compliant & Encrypted
                </div>
              </div>

              {/* TIER 5: EXTERNAL SERVICES */}
              <div className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-purple-900/40' : 'bg-white border-purple-200 shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 text-xs font-extrabold text-purple-500 uppercase tracking-wider mb-3">
                    <Cloud className="w-4 h-4 text-purple-500" />
                    <span>External Services</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className={`p-2.5 rounded-lg border ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`font-bold text-[11px] ${isDark ? 'text-white' : 'text-slate-800'}`}>LKPP (SiKAP, SiRUP)</p>
                      <p className="text-[9px] text-slate-400">API Integration</p>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`font-bold text-[11px] ${isDark ? 'text-white' : 'text-slate-800'}`}>Email / Notifikasi</p>
                      <p className="text-[9px] text-slate-400">SMTP Notification Service</p>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`font-bold text-[11px] ${isDark ? 'text-white' : 'text-slate-800'}`}>Storage / CDN</p>
                      <p className="text-[9px] text-slate-400">Cloud Storage & Dokumen</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] text-slate-400 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  Secure API Gateway
                </div>
              </div>

            </div>

            {/* Bottom 3 Badges: Keamanan, Hosting, Monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Keamanan Berlapis</h4>
                  <p className="text-[10px] text-slate-400">SSL/TLS, Firewall, Role Based Access Control, Audit Log</p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Hosting & Deployment</h4>
                  <p className="text-[10px] text-slate-400">Vercel Edge Network / Cloud Infrastructure</p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Monitoring & Logging</h4>
                  <p className="text-[10px] text-slate-400">99.9% Uptime, Error Tracking, Audit Trail</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PAKET PENGADAAN & DETAIL (LIVE BACKEND CRUD) */}
        {/* ========================================================= */}
        {activeTab === 'paket' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase mb-2">
                  <Package className="w-3.5 h-3.5" />
                  <span>Backend Procurement Database</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Manajemen Paket Pengadaan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola paket tender & seleksi aktif. Perubahan langsung tersinkronisasi ke homepage publik (<Link href="/#pengadaan" className="text-blue-500 hover:underline">/#pengadaan</Link>).
                </p>
              </div>
              <button 
                onClick={() => {
                  setPackageFormData({
                    code: `TND-2026-00${packagesList.length + 1}`,
                    title: '',
                    unit: 'Biro Perencanaan Kemnaker RI',
                    hps: 'Rp 500.000.000',
                    category: 'Tender',
                    status: 'Pendaftaran Dibuka',
                    deadline: '28 Sep 2026',
                    method: 'Tender - Pascakualifikasi Satu File',
                    docCount: 3,
                    desc: ''
                  });
                  setShowPackageModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Paket Pengadaan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packagesList.map((pkg) => (
                <div key={pkg.id} className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-blue-500/40'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {pkg.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        {pkg.code}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {pkg.status}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{pkg.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{pkg.desc || 'Pengadaan barang/jasa untuk mendukung kegiatan operasional kementerian.'}</p>

                  <div className="text-[11px] text-slate-400">
                    <span>Satuan Kerja: </span>
                    <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>{pkg.unit}</strong>
                  </div>

                  <div className={`pt-3 border-t flex justify-between items-center ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Nilai HPS:</span>
                      <strong className="text-xs text-accent-gold font-mono font-bold">{pkg.hps}</strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setShowDetailModal(true);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white' : 'bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white'
                        }`}
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        title="Hapus Paket"
                        className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-red-600' : 'bg-slate-100 hover:bg-red-600'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: PENDAFTARAN PENYEDIA */}
        {/* ========================================================= */}
        {activeTab === 'penyedia' && (
          <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Formulir Pendaftaran Penyedia</h2>
              <p className="text-xs text-slate-400 mt-1">Lengkapi data berikut untuk mendaftar sebagai penyedia barang/jasa Kemnaker RI.</p>
            </div>

            {/* Stepper Wizard Header */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className={`flex items-center space-x-2 ${wizardStep >= 1 ? 'text-blue-500' : 'text-slate-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                  1
                </div>
                <span className="text-xs font-bold">Data Perusahaan</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-300 dark:bg-slate-800" />
              <div className={`flex items-center space-x-2 ${wizardStep >= 2 ? 'text-blue-500' : 'text-slate-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                  2
                </div>
                <span className="text-xs font-bold">Dokumen Legalitas</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-300 dark:bg-slate-800" />
              <div className={`flex items-center space-x-2 ${wizardStep >= 3 ? 'text-blue-500' : 'text-slate-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                  3
                </div>
                <span className="text-xs font-bold">Konfirmasi</span>
              </div>
            </div>

            {wizardStep === 1 && (
              <div className={`border rounded-2xl p-6 space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Nama Perusahaan / PT / CV *</label>
                    <input type="text" placeholder="Masukkan nama perusahaan" className={`w-full px-3 py-2 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`} />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>NPWP Perusahaan *</label>
                    <input type="text" placeholder="00.000.000.0-000.000" className={`w-full px-3 py-2 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`} />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Jenis Usaha *</label>
                    <select className={`w-full px-3 py-2 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-600'
                    }`}>
                      <option>Jasa Konsultansi IT & Konstruksi</option>
                      <option>Pengadaan Barang / Alat</option>
                      <option>Jasa Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alamat Kantor *</label>
                    <input type="text" placeholder="Masukkan alamat lengkap kantor" className={`w-full px-3 py-2 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`} />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setWizardStep(2)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Selanjutnya &rarr;
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className={`border rounded-2xl p-6 space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border border-dashed text-center ${
                    isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Unggah NIB & Akta Pendirian Perusahaan (PDF)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Maksimal 10 MB</p>
                    <button className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}>Pilih File</button>
                  </div>

                  <div className={`p-4 rounded-xl border border-dashed text-center ${
                    isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <FileCheck className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Unggah Sertifikat Badan Usaha (SBU / KTA)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Maksimal 10 MB</p>
                    <button className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}>Pilih File</button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    &larr; Kembali
                  </button>
                  <button 
                    onClick={() => setWizardStep(3)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Konfirmasi &rarr;
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className={`border rounded-2xl p-6 space-y-4 text-center ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Konfirmasi Data Penyedia</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Dengan mengklik submit, data perusahaan Anda akan diverifikasi oleh Pokja Pemilihan UKPBJ Kemnaker RI.
                </p>

                {vendorSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold">
                    ✓ Pendaftaran Penyedia Berhasil Dikirimkan ke Sistem UKPBJ!
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 pt-4">
                    <button 
                      onClick={() => setWizardStep(2)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                        isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      &larr; Ubah Data
                    </button>
                    <button 
                      onClick={() => setVendorSuccess(true)}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 cursor-pointer"
                    >
                      Kirim Pendaftaran
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: MANAGE REGULASI (CMS) */}
        {/* ========================================================= */}
        {activeTab === 'manage-regulasi' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase mb-2">
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>Backend Regulation & Legal CMS</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Manage Regulasi & Aturan PBJ
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola dokumen hukum dan peraturan resmi. Perubahan akan langsung disinkronkan ke halaman publik (<Link href="/informasi/peraturan" className="text-blue-500 hover:underline">/informasi/peraturan</Link>).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingRegulasi(null);
                    setRegulasiFormData({
                      nomor: '',
                      tentang: '',
                      tahun: '2026',
                      kategori: 'Peraturan Menteri',
                      fileSize: '2.5 MB',
                      status: 'Aktif'
                    });
                    setShowRegulasiModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Regulasi Baru</span>
                </button>
              </div>
            </div>

            {/* Regulasi Table */}
            <div className={`border rounded-2xl overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`p-4 border-b flex justify-between items-center text-xs ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Daftar Regulasi Aktif ({regulasiList.length})
                </span>
                <span className="text-emerald-500 text-[11px] font-semibold flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Live Dynamic Sync to Frontend</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`text-[11px] border-b ${
                    isDark ? 'bg-slate-950/50 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    <tr>
                      <th className="p-4 font-semibold">Nomor & Judul Regulasi</th>
                      <th className="p-4 font-semibold">Kategori</th>
                      <th className="p-4 font-semibold">Tahun</th>
                      <th className="p-4 font-semibold">Ukuran File</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isDark ? 'divide-slate-800/60' : 'divide-slate-100'
                  }`}>
                    {regulasiList.map((item) => (
                      <tr key={item.id} className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 max-w-md">
                              <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.nomor}</p>
                              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.tentang}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {item.kategori}
                          </span>
                        </td>
                        <td className={`p-4 font-mono font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {item.tahun}
                        </td>
                        <td className="p-4 text-slate-400 font-mono text-[11px]">
                          {item.fileSize}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleRegulasiStatus(item.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                              item.status === 'Aktif'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                          >
                            {item.status === 'Aktif' ? '✓ Aktif (Live)' : 'Draft (Hidden)'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingRegulasi(item);
                                setRegulasiFormData(item);
                                setShowRegulasiModal(true);
                              }}
                              title="Edit Regulasi"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark ? 'bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-amber-600 text-slate-600 hover:text-white'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRegulasi(item.id)}
                              title="Hapus Regulasi"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark ? 'bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: MANAGE SOP (CMS) */}
        {/* ========================================================= */}
        {activeTab === 'manage-sop' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Backend Standard Operating Procedures CMS</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Manage Standar Operasional Prosedur (SOP)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola dokumen dan panduan alur tahapan operasional. Tersinkronisasi ke portal publik (<Link href="/informasi/sop" className="text-purple-500 hover:underline">/informasi/sop</Link>).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingSop(null);
                    setSopFormData({
                      kode: `SOP/PBJ/0${sopList.length + 1}/2026`,
                      judul: '',
                      unit: 'UKPBJ Kemnaker RI',
                      revisi: 'Rev. 01 (2026)',
                      tahapanCount: 5,
                      status: 'Berlaku'
                    });
                    setShowSopModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah SOP Baru</span>
                </button>
              </div>
            </div>

            {/* SOP Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sopList.map((item) => (
                <div key={item.id} className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-purple-500/40'
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">
                      {item.kode}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {item.status}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.judul}</h3>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Satuan Kerja / Unit:</span>
                      <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>{item.unit}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Versi Dokumen:</span>
                      <span className="font-semibold text-accent-gold">{item.revisi}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Jumlah Tahapan Prosedur:</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">{item.tahapanCount} Langkah</span>
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex justify-between items-center ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Synced to /informasi/sop</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingSop(item);
                          setSopFormData(item);
                          setShowSopModal(true);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white' : 'bg-slate-100 hover:bg-purple-600 text-slate-700 hover:text-white'
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSop(item.id)}
                        className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-red-600' : 'bg-slate-100 hover:bg-red-600'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: LAPORAN & KINERJA */}
        {/* ========================================================= */}
        {activeTab === 'laporan' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Laporan & Evaluasi Kinerja Pengadaan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Rekapitulasi efisiensi anggaran, realisasi belanja e-Katalog, dan kepatuhan regulasi PBJ.
                </p>
              </div>
              <button 
                onClick={() => showNotification('Laporan Bulanan UKPBJ berhasil diexport ke format XLSX!')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Rekap Excel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs text-slate-400 font-medium">Realisasi Efisiensi Tender</p>
                <p className={`text-2xl font-black mt-1 text-emerald-500`}>18.4%</p>
                <p className="text-[10px] text-slate-400 mt-1">Penghematan dari total pagu HPS</p>
              </div>
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs text-slate-400 font-medium">Tingkat Belanja Produk DN (P3DN)</p>
                <p className={`text-2xl font-black mt-1 text-blue-500`}>84.6%</p>
                <p className="text-[10px] text-slate-400 mt-1">Target nasional minimal 40%</p>
              </div>
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs text-slate-400 font-medium">Paket Selesai Tepat Waktu</p>
                <p className={`text-2xl font-black mt-1 text-accent-gold`}>98.2%</p>
                <p className="text-[10px] text-slate-400 mt-1">Kuartal berjalan T.A 2026</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: PENGATURAN BACKEND & KONTROL DATABASE */}
        {/* ========================================================= */}
        {activeTab === 'pengaturan' && (
          <div className="p-6 md:p-8 space-y-6 max-w-4xl">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase mb-2">
                <Settings className="w-3.5 h-3.5" />
                <span>Global Site & Database Settings</span>
              </div>
              <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Pengaturan Sistem & Database
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Atur konfigurasi portal publik, banner siaran, status server, dan kelola database sinkronisasi.
              </p>
            </div>

            {/* Section 1: Running Banner Announcement */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Banner Pengumuman Darurat / Siaran Penting (Public Header)
                  </h3>
                  <p className="text-[11px] text-slate-400">Teks ini akan muncul di bagian teratas website publik.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ announcementActive: !siteSettings.announcementActive });
                    showNotification(`Banner pengumuman publik telah ${!siteSettings.announcementActive ? 'diaktifkan' : 'dinonaktifkan'}.`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    siteSettings.announcementActive
                      ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                      : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                  }`}
                >
                  {siteSettings.announcementActive ? '✓ Status: Aktif' : '✕ Status: Nonaktif'}
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={siteSettings.announcementBanner}
                  onChange={(e) => updateSiteSettings({ announcementBanner: e.target.value })}
                  placeholder="Tulis pesan pengumuman publik..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
                  }`}
                />
                <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Tersimpan otomatis ke database client & tersinkronisasi</span>
                </p>
              </div>
            </div>

            {/* Section 2: Server Status */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Status Operasional Layanan SPSE / Server Backend
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {(['Normal', 'Maintenance', 'High Traffic'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      updateSiteSettings({ serverStatus: status });
                      showNotification(`Status backend diatur ke: ${status}`);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      siteSettings.serverStatus === status
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Factory Reset Database */}
            <div className={`p-6 rounded-2xl border border-red-500/20 space-y-3 ${
              isDark ? 'bg-red-950/10' : 'bg-red-50/50'
            }`}>
              <h3 className="text-sm font-bold text-red-500 flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Reset Database ke Pengaturan Awal (Factory Reset)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Mengembalikan seluruh data Berita, Agenda, dan Paket Pengadaan ke data bawaan resmi Kementerian Ketenagakerjaan.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin me-reset seluruh database ke data awal? Semua perubahan berita, agenda, dan paket baru akan dikembalikan ke default.')) {
                    resetToDefaults();
                    showNotification('✓ Database berhasil di-reset ke kondisi awal!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all cursor-pointer"
              >
                Reset Database Sekarang
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL 1: CREATE / EDIT NEWS */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showNewsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingNews ? 'Edit Berita Pengadaan' : 'Terbitkan Berita / Pengumuman Baru'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Konten akan langsung ter-update di backend dan tampil di frontend publik.</p>
                </div>
                <button
                  onClick={() => setShowNewsModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Judul Berita *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul berita lengkap..."
                    value={newsFormData.title || ''}
                    onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kategori *</label>
                    <select
                      value={newsFormData.category || 'Berita PBJ'}
                      onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value as NewsItem['category'] })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-600'
                      }`}
                    >
                      <option value="Berita PBJ">Berita PBJ</option>
                      <option value="Pengumuman Lelang">Pengumuman Lelang</option>
                      <option value="Regulasi">Regulasi</option>
                      <option value="Siaran Pers">Siaran Pers</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Penulis / Unit Kerja *</label>
                    <input
                      type="text"
                      placeholder="e.g. Biro Umum & Pengadaan"
                      value={newsFormData.author || ''}
                      onChange={(e) => setNewsFormData({ ...newsFormData, author: e.target.value })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Status Publikasi *</label>
                    <select
                      value={newsFormData.status || 'Published'}
                      onChange={(e) => setNewsFormData({ ...newsFormData, status: e.target.value as NewsItem['status'] })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-600'
                      }`}
                    >
                      <option value="Published">Published (Tayang di Frontend)</option>
                      <option value="Draft">Draft (Simpan Internal)</option>
                      <option value="Archived">Archived (Arsip)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Ringkasan / Excerpt *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ringkasan singkat untuk tampilan kartu di beranda / info..."
                    value={newsFormData.excerpt || ''}
                    onChange={(e) => setNewsFormData({ ...newsFormData, excerpt: e.target.value })}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Konten Lengkap Berita *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Isi berita atau pengumuman lengkap..."
                    value={newsFormData.content || ''}
                    onChange={(e) => setNewsFormData({ ...newsFormData, content: e.target.value })}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div className={`flex justify-end gap-3 pt-4 border-t ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setShowNewsModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    Simpan & Publikasikan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 2: CREATE / EDIT AGENDA */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showAgendaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingAgenda ? 'Edit Agenda PBJ' : 'Tambah Agenda / Kegiatan Baru'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Jadwal akan otomatis muncul pada kalender interaktif (/agenda).</p>
                </div>
                <button
                  onClick={() => setShowAgendaModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveAgenda} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Nama Kegiatan / Agenda *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bimbingan Teknis E-Katalog Sektoral"
                    value={agendaFormData.title || ''}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, title: e.target.value })}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kategori *</label>
                    <select
                      value={agendaFormData.category || 'Bimtek'}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, category: e.target.value as AgendaItem['category'] })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-emerald-600'
                      }`}
                    >
                      <option value="Bimtek">Bimbingan Teknis</option>
                      <option value="Tender">Tender / Aanwijzing</option>
                      <option value="Sertifikasi">Sertifikasi PBJ</option>
                      <option value="Sosialisasi">Sosialisasi</option>
                      <option value="Rapat">Rapat Koordinasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Status Kegiatan *</label>
                    <select
                      value={agendaFormData.status || 'Terjadwal'}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, status: e.target.value as AgendaItem['status'] })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-emerald-600'
                      }`}
                    >
                      <option value="Terjadwal">Terjadwal</option>
                      <option value="Berlangsung">Sedang Berlangsung</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Tanggal Pelaksanaan *</label>
                    <input
                      type="text"
                      placeholder="e.g. 15 Sep 2026"
                      value={agendaFormData.date || ''}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, date: e.target.value })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Waktu Pelaksanaan *</label>
                    <input
                      type="text"
                      placeholder="e.g. 09:00 - 12:00 WIB"
                      value={agendaFormData.time || ''}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, time: e.target.value })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Lokasi / Media *</label>
                    <input
                      type="text"
                      placeholder="e.g. Gedung Kemnaker / Zoom"
                      value={agendaFormData.location || ''}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, location: e.target.value })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Penyelenggara / Satker *</label>
                    <input
                      type="text"
                      placeholder="e.g. Biro Umum & Pengadaan"
                      value={agendaFormData.organizer || ''}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, organizer: e.target.value })}
                      className={`w-full px-3 py-2.5 border rounded-xl text-xs outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>

                <div className={`flex justify-end gap-3 pt-4 border-t ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setShowAgendaModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    Simpan Agenda
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 3: PREVIEW BERITA FRONTEND */}
      {/* ========================================================= */}
      <AnimatePresence>
        {previewNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-primary-navy text-xs font-bold border border-blue-200">
                  {previewNews.category}
                </span>
                <button
                  onClick={() => setPreviewNews(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-2">
                {previewNews.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                Oleh <strong className="text-slate-700">{previewNews.author}</strong> • {previewNews.date}
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {previewNews.excerpt}
                </p>
                <p>{previewNews.content}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Pratinjau Tampilan Web Publik</span>
                </span>
                <button
                  onClick={() => setPreviewNews(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Tutup Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 4: TAMBAH PAKET PENGADAAN BARU */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showPackageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Tambah Paket Pengadaan Baru
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Paket baru akan langsung tersimpan di database dan muncul pada homepage publik (/#pengadaan).</p>
                </div>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kode Paket / RUP *</label>
                    <input
                      type="text"
                      required
                      value={packageFormData.code || ''}
                      onChange={(e) => setPackageFormData({ ...packageFormData, code: e.target.value })}
                      placeholder="e.g. TND-2026-009"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Kategori Pengadaan *</label>
                    <select
                      value={packageFormData.category || 'Tender'}
                      onChange={(e) => setPackageFormData({ ...packageFormData, category: e.target.value as ProcurementPackage['category'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-600'
                      }`}
                    >
                      <option value="Tender">Tender</option>
                      <option value="Seleksi">Seleksi</option>
                      <option value="Pengadaan Langsung">Pengadaan Langsung</option>
                      <option value="E-Purchasing">E-Purchasing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Nama / Judul Paket Pengadaan *</label>
                  <input
                    type="text"
                    required
                    value={packageFormData.title || ''}
                    onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                    placeholder="e.g. Pengadaan Perangkat Server dan Keamanan Jaringan Data Center"
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Satuan Kerja / Unit *</label>
                    <input
                      type="text"
                      required
                      value={packageFormData.unit || ''}
                      onChange={(e) => setPackageFormData({ ...packageFormData, unit: e.target.value })}
                      placeholder="e.g. Pusdatin Kemnaker RI"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Nilai Pagu HPS *</label>
                    <input
                      type="text"
                      required
                      value={packageFormData.hps || ''}
                      onChange={(e) => setPackageFormData({ ...packageFormData, hps: e.target.value })}
                      placeholder="e.g. Rp 850.000.000"
                      className={`w-full px-3 py-2 border rounded-xl outline-none font-mono ${
                        isDark ? 'bg-slate-950 border-slate-700 text-accent-gold focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-amber-600 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Status Paket</label>
                    <select
                      value={packageFormData.status || 'Pendaftaran Dibuka'}
                      onChange={(e) => setPackageFormData({ ...packageFormData, status: e.target.value as ProcurementPackage['status'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-600'
                      }`}
                    >
                      <option value="Pendaftaran Dibuka">Pendaftaran Dibuka</option>
                      <option value="Tahap Evaluasi">Tahap Evaluasi</option>
                      <option value="Pemberian Penjelasan">Pemberian Penjelasan</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Batas Akhir Pendaftaran *</label>
                    <input
                      type="text"
                      required
                      value={packageFormData.deadline || ''}
                      onChange={(e) => setPackageFormData({ ...packageFormData, deadline: e.target.value })}
                      placeholder="e.g. 28 Sep 2026, 15:00 WIB"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Deskripsi / Ruang Lingkup Pekerjaan</label>
                  <textarea
                    rows={3}
                    value={packageFormData.desc || ''}
                    onChange={(e) => setPackageFormData({ ...packageFormData, desc: e.target.value })}
                    placeholder="Uraian singkat spesifikasi dan lingkup pengadaan..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPackageModal(false)}
                    className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    Simpan & Publikasikan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 5: DETAIL PAKET PENGADAAN */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showDetailModal && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-500 border border-blue-500/30 text-xs font-bold">
                      {selectedPackage.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {selectedPackage.code}
                    </span>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedPackage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border mb-6 text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className="text-slate-400 block">Nilai HPS:</span>
                  <strong className="text-accent-gold text-sm font-mono">{selectedPackage.hps}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Satuan Kerja:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedPackage.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Batas Pendaftaran:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedPackage.deadline}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Deskripsi Pekerjaan</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{selectedPackage.desc || 'Pengadaan barang/jasa resmi unit kerja Kemnaker RI.'}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Dokumen Pengadaan Resmi</h4>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-3 rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-red-500" />
                        <div>
                          <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>KAK.pdf</p>
                          <p className="text-[10px] text-slate-400">2.5 MB • Kerangka Acuan Kerja</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <Download className="w-3 h-3" />
                        <span>Unduh</span>
                      </button>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Spesifikasi Teknis.pdf</p>
                          <p className="text-[10px] text-slate-400">1.8 MB • Dokumen Teknis</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <Download className="w-3 h-3" />
                        <span>Unduh</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex justify-end gap-3 pt-4 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Tutup
                </button>
                <a
                  href="https://inaproc.lkpp.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buka di SPSE LKPP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 6: REGULASI MODAL (TAMBAH / EDIT) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showRegulasiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-blue-500" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingRegulasi ? 'Edit Regulasi / Peraturan' : 'Tambah Regulasi Baru (CMS)'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowRegulasiModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveRegulasi} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Nomor Peraturan / Surat *</label>
                  <input
                    type="text"
                    required
                    value={regulasiFormData.nomor || ''}
                    onChange={(e) => setRegulasiFormData({ ...regulasiFormData, nomor: e.target.value })}
                    placeholder="e.g. Permenaker No. 05 Tahun 2026"
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Judul / Tentang Regulasi *</label>
                  <textarea
                    rows={3}
                    required
                    value={regulasiFormData.tentang || ''}
                    onChange={(e) => setRegulasiFormData({ ...regulasiFormData, tentang: e.target.value })}
                    placeholder="e.g. Pedoman Pelaksanaan Pengadaan Barang dan Jasa Pemerintah Lingkungan Kemnaker..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kategori Dokumen</label>
                    <select
                      value={regulasiFormData.kategori || 'Peraturan Menteri'}
                      onChange={(e) => setRegulasiFormData({ ...regulasiFormData, kategori: e.target.value as RegulasiItem['kategori'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-600'
                      }`}
                    >
                      <option value="Peraturan Menteri">Peraturan Menteri</option>
                      <option value="Peraturan LKPP">Peraturan LKPP</option>
                      <option value="Keputusan Menteri">Keputusan Menteri</option>
                      <option value="Surat Edaran">Surat Edaran</option>
                      <option value="Undang-Undang">Undang-Undang</option>
                      <option value="Peraturan Pemerintah">Peraturan Pemerintah</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Tahun Penerbitan *</label>
                    <input
                      type="text"
                      required
                      value={regulasiFormData.tahun || '2026'}
                      onChange={(e) => setRegulasiFormData({ ...regulasiFormData, tahun: e.target.value })}
                      placeholder="e.g. 2026"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Estimasi Ukuran File (PDF)</label>
                    <input
                      type="text"
                      value={regulasiFormData.fileSize || '2.5 MB'}
                      onChange={(e) => setRegulasiFormData({ ...regulasiFormData, fileSize: e.target.value })}
                      placeholder="e.g. 2.5 MB"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Status Dokumen</label>
                    <select
                      value={regulasiFormData.status || 'Aktif'}
                      onChange={(e) => setRegulasiFormData({ ...regulasiFormData, status: e.target.value as RegulasiItem['status'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-600'
                      }`}
                    >
                      <option value="Aktif">Aktif (Live di Portal Publik)</option>
                      <option value="Draft">Draft (Disembunyikan)</option>
                      <option value="Dicabut">Dicabut (Tidak Berlaku)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowRegulasiModal(false)}
                    className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    {editingRegulasi ? 'Perbarui Regulasi' : 'Publikasikan Regulasi'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 7: SOP MODAL (TAMBAH / EDIT) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showSopModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-500" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingSop ? 'Edit Standar Operasional (SOP)' : 'Tambah SOP Baru (CMS)'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowSopModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveSop} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kode Dokumen SOP *</label>
                    <input
                      type="text"
                      required
                      value={sopFormData.kode || ''}
                      onChange={(e) => setSopFormData({ ...sopFormData, kode: e.target.value })}
                      placeholder="e.g. SOP/PBJ/06/2026"
                      className={`w-full px-3 py-2 border rounded-xl outline-none font-mono ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Status Prosedur</label>
                    <select
                      value={sopFormData.status || 'Berlaku'}
                      onChange={(e) => setSopFormData({ ...sopFormData, status: e.target.value as SopItem['status'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-purple-600'
                      }`}
                    >
                      <option value="Berlaku">Berlaku (Live di Portal)</option>
                      <option value="Dalam Revisi">Dalam Revisi</option>
                      <option value="Draft">Draft Internal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Judul / Nama SOP *</label>
                  <input
                    type="text"
                    required
                    value={sopFormData.judul || ''}
                    onChange={(e) => setSopFormData({ ...sopFormData, judul: e.target.value })}
                    placeholder="e.g. SOP Penilaian Kinerja Penyedia & SIKaP"
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Unit Pengampu *</label>
                    <input
                      type="text"
                      required
                      value={sopFormData.unit || 'UKPBJ Kemnaker RI'}
                      onChange={(e) => setSopFormData({ ...sopFormData, unit: e.target.value })}
                      placeholder="e.g. UKPBJ Kemnaker RI"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Versi Revisi *</label>
                    <input
                      type="text"
                      required
                      value={sopFormData.revisi || 'Rev. 01 (2026)'}
                      onChange={(e) => setSopFormData({ ...sopFormData, revisi: e.target.value })}
                      placeholder="e.g. Rev. 02 (2026)"
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Jumlah Langkah</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={sopFormData.tahapanCount || 5}
                      onChange={(e) => setSopFormData({ ...sopFormData, tahapanCount: parseInt(e.target.value) || 5 })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowSopModal(false)}
                    className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    {editingSop ? 'Perbarui SOP' : 'Publikasikan SOP'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
