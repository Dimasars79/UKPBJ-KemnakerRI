"use client"

import React, { useState, useEffect } from 'react';
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
  Layers,
  Camera,
  Video,
  Play,
  Activity,
  TrendingUp,
  Sparkles,
  Clock,
  Radio,
  Zap,
  Wifi,
  HardDrive,
  Coins,
  Percent,
  Shield,
  CheckCheck,
  Building2,
  ArrowUpRight,
  PieChart,
  Sliders,
  Workflow,
  Send,
  CheckSquare,
  Share2,
  PlusCircle,
  Award,
  Target,
  UserCheck,
  Bell,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { motion, AnimatePresence } from 'framer-motion';
import { useData, NewsItem, AgendaItem, ProcurementPackage, RegulasiItem, SopItem, PhotoItem, VideoMediaItem } from '@/contexts/DataContext';

export default function AdminPortalPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'paket' | 'monitoring' | 'manage-berita' | 'manage-agenda' | 'manage-regulasi' | 'manage-sop' | 'manage-galeri' | 'arsitektur' | 'penyedia' | 'laporan' | 'pengaturan'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPengadaanOpen, setIsPengadaanOpen] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(true);
  const [galeriTab, setGaleriTab] = useState<'foto' | 'video'>('foto');
  
  // Header Interactive States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [liveTime, setLiveTime] = useState<string>('');
  const [unreadNotifs, setUnreadNotifs] = useState(3);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' WIB';
      setLiveTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
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
    photosList,
    addPhoto,
    updatePhoto,
    deletePhoto,
    videosList,
    addVideo,
    updateVideo,
    deleteVideo,
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

  // PHOTO & VIDEO MODAL STATES
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [photoFormData, setPhotoFormData] = useState<Partial<PhotoItem>>({
    title: '',
    desc: '',
    category: 'Dokumentasi Kerja',
    src: '/gallery/gallery-1.jpg',
    size: 'small',
    date: '28 Agu 2026'
  });

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoMediaItem | null>(null);
  const [videoFormData, setVideoFormData] = useState<Partial<VideoMediaItem>>({
    title: '',
    desc: '',
    category: 'Sosialisasi Regulasi',
    duration: '10:00',
    date: '28 Agu 2026',
    views: '1.2K x ditonton',
    thumbnailUrl: '/gallery/gallery-1.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri'
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

  // Helper for converting file upload to Base64 data URL for local storage persistence
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video-thumb') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      showNotification('⚠️ Ukuran file maksimal 4MB. Silakan pilih foto yang lebih ringkas.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === 'photo') {
        setPhotoFormData((prev) => ({ ...prev, src: result }));
        showNotification('✓ Foto dari komputer berhasil dimuat & siap disimpan!');
      } else if (type === 'video-thumb') {
        setVideoFormData((prev) => ({ ...prev, thumbnailUrl: result }));
        showNotification('✓ Thumbnail video berhasil dimuat & siap disimpan!');
      }
    };
    reader.readAsDataURL(file);
  };

  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  };

  // PHOTO HANDLERS
  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, photoFormData);
      showNotification('✓ Foto dokumentasi berhasil diperbarui dan disinkronkan ke Frontend (/galeri)!');
    } else {
      addPhoto({
        title: photoFormData.title || 'Foto Dokumentasi Kegiatan PBJ',
        desc: photoFormData.desc || 'Dokumentasi kegiatan dan rapat kerja pengadaan.',
        category: photoFormData.category || 'Dokumentasi Kerja',
        src: photoFormData.src || '/gallery/gallery-1.jpg',
        size: (photoFormData.size as PhotoItem['size']) || 'small',
        date: photoFormData.date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      });
      showNotification('✓ Foto dokumentasi baru berhasil ditambahkan dan langsung tayang di Galeri (/galeri)!');
    }
    setShowPhotoModal(false);
    setEditingPhoto(null);
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri publik?')) {
      deletePhoto(id);
      showNotification('Foto dokumentasi telah dihapus.');
    }
  };

  // VIDEO HANDLERS
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      updateVideo(editingVideo.id, videoFormData);
      showNotification('✓ Video dokumentasi berhasil diperbarui dan disinkronkan ke Frontend (/galeri)!');
    } else {
      addVideo({
        title: videoFormData.title || 'Video Kegiatan PBJ Kemnaker',
        desc: videoFormData.desc || 'Dokumentasi video sosialisasi dan bimbingan teknis.',
        category: videoFormData.category || 'Sosialisasi Regulasi',
        duration: videoFormData.duration || '10:00',
        date: videoFormData.date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        views: '1.0K x ditonton',
        thumbnailUrl: videoFormData.thumbnailUrl || '/gallery/gallery-1.jpg',
        url: videoFormData.url || 'https://www.youtube.com/@kemenperin_ri'
      });
      showNotification('✓ Video baru berhasil ditambahkan ke Galeri Video (/galeri)!');
    }
    setShowVideoModal(false);
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus video ini dari galeri publik?')) {
      deleteVideo(id);
      showNotification('Video dokumentasi telah dihapus.');
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
            </div>

            {/* GRUP: PENGADAAN (COLLAPSIBLE DROPDOWN) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                  Pengadaan
                </p>
                <button
                  type="button"
                  onClick={() => setIsPengadaanOpen(!isPengadaanOpen)}
                  className="p-1 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer rounded-md"
                  title="Buka/Tutup Menu Pengadaan"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPengadaanOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Side-Down Collapsible Submenu */}
              <AnimatePresence initial={false}>
                {isPengadaanOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-1 pl-1.5 border-l-2 border-blue-500/30 ml-2"
                  >
                    {/* Paket Pengadaan */}
                    <button
                      onClick={() => setActiveTab('paket')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'paket'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5 text-blue-400" />
                      <span>Paket Pengadaan</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-blue-500/20 text-blue-400 rounded font-bold">
                        {packagesList.length}
                      </span>
                    </button>

                    {/* Monitoring */}
                    <button
                      onClick={() => setActiveTab('monitoring')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'monitoring'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Monitoring</span>
                    </button>

                    {/* Statistik */}
                    <button
                      onClick={() => setActiveTab('laporan')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'laporan'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Statistik</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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

                    {/* Galeri & Media (Foto/Video) */}
                    <button
                      onClick={() => setActiveTab('manage-galeri')}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'manage-galeri'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-700 hover:text-primary-navy hover:bg-slate-100'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Galeri & Media</span>
                      <span className="ml-auto px-1.5 py-0.2 text-[9px] bg-cyan-500/20 text-cyan-400 rounded font-bold">
                        {photosList.length + videosList.length}
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
        
        {/* Top Header - Modern Enterprise Command Bar */}
        <header className={`h-16 border-b backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 transition-all duration-300 ${
          isDark 
            ? 'border-slate-800/80 bg-slate-950/85 shadow-sm shadow-black/20' 
            : 'border-slate-200/90 bg-white/90 shadow-sm shadow-slate-200/50'
        }`}>
          {/* LEFT: Context Breadcrumb & Active Indicator */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {activeTab === 'dashboard' && <LayoutDashboard className="w-4 h-4" />}
              {activeTab === 'paket' && <Package className="w-4 h-4 text-blue-400" />}
              {activeTab === 'monitoring' && <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />}
              {activeTab === 'manage-berita' && <Newspaper className="w-4 h-4 text-amber-500" />}
              {activeTab === 'manage-agenda' && <Calendar className="w-4 h-4 text-emerald-500" />}
              {activeTab === 'manage-regulasi' && <ScrollText className="w-4 h-4 text-blue-400" />}
              {activeTab === 'manage-sop' && <Layers className="w-4 h-4 text-purple-400" />}
              {activeTab === 'manage-galeri' && <Camera className="w-4 h-4 text-cyan-400" />}
              {activeTab === 'arsitektur' && <Network className="w-4 h-4 text-accent-gold" />}
              {activeTab === 'penyedia' && <Users className="w-4 h-4 text-blue-400" />}
              {activeTab === 'laporan' && <BarChart3 className="w-4 h-4 text-purple-400" />}
              {activeTab === 'pengaturan' && <Settings className="w-4 h-4 text-slate-400" />}
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400">
                <span className="hover:text-blue-500 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Portal Admin</span>
                <span>/</span>
                <span className="text-slate-500 uppercase tracking-wider">
                  {activeTab === 'dashboard' ? 'Utama' :
                   activeTab === 'paket' || activeTab === 'monitoring' || activeTab === 'laporan' ? 'Pengadaan' :
                   activeTab.startsWith('manage-') ? 'CMS Publik' : 'Sistem'}
                </span>
              </div>
              <h2 className={`text-xs md:text-sm font-extrabold capitalize leading-none mt-0.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {activeTab === 'dashboard' ? 'Executive Command Center' :
                 activeTab === 'paket' ? 'Manajemen Paket Pengadaan' :
                 activeTab === 'monitoring' ? 'Surveillance & SLA Tracker' :
                 activeTab === 'manage-berita' ? 'Kelola Berita & Siaran' :
                 activeTab === 'manage-agenda' ? 'Kelola Jadwal & Agenda' :
                 activeTab === 'manage-regulasi' ? 'Kelola Regulasi PBJ' :
                 activeTab === 'manage-sop' ? 'Kelola Standar Operasional (SOP)' :
                 activeTab === 'manage-galeri' ? 'Kelola Galeri Foto & Video' :
                 activeTab === 'arsitektur' ? 'Arsitektur Sistem 5-Tier' :
                 activeTab === 'penyedia' ? 'Database Vendor Rekanan' :
                 activeTab === 'laporan' ? 'Statistik & Kinerja PBJ' : 'Konfigurasi & Database'}
              </h2>
            </div>
          </div>

          {/* CENTER: Smart Search Command Box with Keyboard Shortcut */}
          <div className="flex items-center space-x-3">
            <div className="relative w-44 md:w-64 lg:w-72 group">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Cari berita, agenda, paket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-10 py-1.5 border rounded-xl text-xs transition-all outline-none ${
                  isDark 
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-900' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:bg-white shadow-xs'
                }`}
              />
              <span className="hidden md:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-slate-700/60 bg-slate-800/60 text-slate-400">
                ⌘K
              </span>
            </div>

            {/* SPSE Live Health Sentinel Pill */}
            <div className="hidden xl:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>SPSE: 38ms</span>
            </div>
          </div>

          {/* RIGHT: Actions, Live Clock, Notifications, Theme & Quick Profile */}
          <div className="flex items-center space-x-2">
            
            {/* Live Clock Widget */}
            {liveTime && (
              <div className="hidden 2xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono font-semibold text-slate-400 border-slate-800/80 bg-slate-900/50">
                <Clock className="w-3.5 h-3.5 text-accent-gold" />
                <span>{liveTime}</span>
              </div>
            )}

            {/* QUICK ACTION BUTTON & DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowQuickAdd(!showQuickAdd);
                  if (showNotifications) setShowNotifications(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                title="Tambah data baru secara instan"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tambah Cepat</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showQuickAdd ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showQuickAdd && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-56 p-1.5 rounded-2xl border shadow-xl z-50 ${
                      isDark ? 'bg-slate-900 border-slate-800 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-300/60'
                    }`}
                  >
                    <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800/50">
                      Buat Konten Baru
                    </p>
                    <div className="space-y-0.5 mt-1">
                      <button
                        onClick={() => {
                          setShowQuickAdd(false);
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
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Package className="w-3.5 h-3.5 text-blue-500" />
                        <span>Paket Pengadaan</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowQuickAdd(false);
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
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Newspaper className="w-3.5 h-3.5 text-amber-500" />
                        <span>Berita / Pengumuman</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowQuickAdd(false);
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
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Agenda Kegiatan</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowQuickAdd(false);
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
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <ScrollText className="w-3.5 h-3.5 text-blue-400" />
                        <span>Regulasi & Aturan</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowQuickAdd(false);
                          setEditingPhoto(null);
                          setPhotoFormData({
                            title: '',
                            desc: '',
                            category: 'Dokumentasi Kerja',
                            src: '/gallery/gallery-1.jpg',
                            size: 'small',
                            date: '28 Agu 2026'
                          });
                          setShowPhotoModal(true);
                        }}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Foto / Video Galeri</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NOTIFICATION BELL WITH DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (showQuickAdd) setShowQuickAdd(false);
                }}
                className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
                title="Pusat Notifikasi & Audit Log"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl border shadow-2xl z-50 space-y-3 ${
                      isDark ? 'bg-slate-900 border-slate-800 shadow-black/60' : 'bg-white border-slate-200 shadow-slate-300/80'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-blue-500" />
                        <span className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Notifikasi & Audit Log</span>
                      </div>
                      <button
                        onClick={() => {
                          setUnreadNotifs(0);
                          showNotification('Semua notifikasi ditandai sebagai sudah dibaca.');
                        }}
                        className="text-[10px] text-blue-400 hover:underline font-semibold cursor-pointer"
                      >
                        Tandai Dibaca
                      </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <div className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                        isDark ? 'bg-slate-950/60 border-slate-800 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}>
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Package className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-bold text-[11px] leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            Tender Baru Diterbitkan
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">Pengadaan Server Cloud DC T.A 2026</p>
                          <p className="text-[9px] text-blue-400 font-mono mt-1">10 menit yang lalu</p>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                        isDark ? 'bg-slate-950/60 border-slate-800 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}>
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Wifi className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-bold text-[11px] leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            Sinkronisasi SPSE Berhasil
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">42 Paket terhubung normal (Latency 38ms)</p>
                          <p className="text-[9px] text-emerald-400 font-mono mt-1">25 menit yang lalu</p>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                        isDark ? 'bg-slate-950/60 border-slate-800 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}>
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-bold text-[11px] leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            Pendaftar Vendor Rekanan
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">PT Telekomunikasi Indonesia Tbk verifikasi KBLI</p>
                          <p className="text-[9px] text-purple-400 font-mono mt-1">1 jam yang lalu</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-400">
                      <span>3 notifikasi aktif</span>
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          setActiveTab('monitoring');
                        }}
                        className="text-blue-400 hover:underline font-bold"
                      >
                        Buka Monitoring &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* THEME TOGGLE (LIGHT / DARK) */}
            <div className={`flex items-center p-0.5 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-amber-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Mode Terang (Light)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mode Gelap (Dark)"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* BLUEPRINT ARSITEKTUR QUICK BUTTON */}
            <button 
              onClick={() => setActiveTab('arsitektur')}
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-accent-gold/10 border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/20 text-xs font-bold transition-all cursor-pointer"
              title="Lihat Arsitektur Sistem 5-Tier"
            >
              <Network className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Arsitektur</span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD UTAMA (ENTERPRISE 3-COLUMN COMMAND CENTER) */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* ========================================================= */}
              {/* LEFT & CENTER COLUMN (MAIN ANALYTICS & CMS COMMAND) */}
              {/* ========================================================= */}
              <div className="xl:col-span-8 2xl:col-span-8 space-y-8 min-w-0">
                
                {/* Top Greeting & Operational Telemetry Banner */}
                <div className={`p-6 sm:p-7 rounded-3xl border relative overflow-hidden transition-all ${
                  isDark 
                    ? 'bg-gradient-to-r from-slate-900 via-[#0B1E38] to-slate-900 border-slate-800/80 shadow-2xl shadow-blue-950/40' 
                    : 'bg-gradient-to-r from-white via-blue-50/50 to-slate-50 border-slate-200/90 shadow-lg shadow-slate-200/50'
                }`}>
                  {/* Background ambient accents */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                        <span>Portal Command Center • UKPBJ Kemnaker RI</span>
                      </div>
                      
                      <h2 className={`text-2xl sm:text-3xl font-black tracking-tight flex flex-wrap items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <span>Selamat Datang, Dimas Ars</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Super Admin</span>
                        </span>
                      </h2>
                      
                      <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                        Sistem kendali terpadu pengelolaan pengadaan barang/jasa, monitoring operasional SPSE, serta manajemen konten publik (CMS) terpusat dan tersinkronisasi real-time.
                      </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
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
                        <PlusCircle className="w-4 h-4" />
                        <span>Posting Cepat</span>
                      </button>

                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-primary-navy shadow-xs'
                        }`}
                      >
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span>Web Publik</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </a>

                      <button
                        onClick={() => {
                          showNotification('✓ Database Client telah disinkronkan dengan Frontend.');
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-primary-navy shadow-xs'
                        }`}
                        title="Sinkronisasi Ulang Database"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Status Chips Bar */}
                  <div className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-4 text-xs ${
                    isDark ? 'border-slate-800/80' : 'border-slate-200/80'
                  }`}>
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <Activity className="w-3.5 h-3.5" />
                      <span>Sistem Operasional Normal</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
                      <Database className="w-3.5 h-3.5 text-blue-400" />
                      <span>Persistent Engine: <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>Active</strong></span>
                    </div>

                    <div className="hidden md:flex items-center gap-1.5 text-slate-400">
                      <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Uptime: <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>99.98%</strong></span>
                    </div>

                    <div className="hidden lg:flex items-center gap-1.5 text-slate-400 ml-auto font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>WIB (UTC+7) Jakarta</span>
                    </div>
                  </div>
                </div>

                {/* 6 KPI METRICS CARDS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  
                  {/* Metric 1: Total Paket PBJ */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Paket PBJ</span>
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{packagesList.length}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-emerald-500">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+12.4% MoM</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><Coins className="w-2.5 h-2.5 text-amber-500" /> 48.2M</span>
                      <span className="flex items-center gap-0.5 text-emerald-500 font-bold"><CheckCircle2 className="w-2.5 h-2.5" /> Live</span>
                    </div>
                  </div>

                  {/* Metric 2: Berita & Warta */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-amber-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Berita Publik</span>
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                        <Newspaper className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {newsList.filter(n => n.status === 'Published').length}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-amber-500">
                        <Globe className="w-2.5 h-2.5" />
                        <span>{newsList.length} Total</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5 text-blue-400" /> 14.8K</span>
                      <span className="flex items-center gap-0.5 text-emerald-500 font-bold"><Send className="w-2.5 h-2.5" /> Sync</span>
                    </div>
                  </div>

                  {/* Metric 3: Agenda & Bimtek */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-emerald-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Agenda</span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{agendaList.length}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-emerald-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Aktif</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-red-400" /> Hybrid</span>
                      <span className="flex items-center gap-0.5 text-blue-400 font-bold"><Users className="w-2.5 h-2.5" /> 850+</span>
                    </div>
                  </div>

                  {/* Metric 4: Galeri & Video */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-cyan-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Galeri Media</span>
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {photosList.length + videosList.length}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-cyan-400">
                        <Video className="w-2.5 h-2.5" />
                        <span>{videosList.length}V • {photosList.length}F</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><Play className="w-2.5 h-2.5 text-amber-400" /> Stream</span>
                      <span className="flex items-center gap-0.5 text-cyan-400 font-bold"><Share2 className="w-2.5 h-2.5" /> /galeri</span>
                    </div>
                  </div>

                  {/* Metric 5: Regulasi & SOP */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-purple-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Regulasi/SOP</span>
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <ScrollText className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {regulasiList.length + sopList.length}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-purple-400">
                        <Layers className="w-2.5 h-2.5" />
                        <span>{regulasiList.length}R • {sopList.length}S</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> JDIH</span>
                      <span className="flex items-center gap-0.5 text-purple-400 font-bold"><CheckSquare className="w-2.5 h-2.5" /> Legal</span>
                    </div>
                  </div>

                  {/* Metric 6: Vendor SiKAP */}
                  <div className={`p-4 rounded-2xl border transition-all hover:shadow-lg space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-indigo-500/40'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-400 truncate">Penyedia</span>
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>342</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-indigo-400">
                        <CheckCheck className="w-2.5 h-2.5" />
                        <span>SiKAP Valid</span>
                      </div>
                    </div>
                    <div className={`pt-1.5 border-t text-[9px] text-slate-400 flex items-center justify-between ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="flex items-center gap-0.5"><Shield className="w-2.5 h-2.5 text-blue-400" /> Lolos</span>
                      <span className="flex items-center gap-0.5 text-indigo-400 font-bold"><Percent className="w-2.5 h-2.5" /> 98%</span>
                    </div>
                  </div>

                </div>

                {/* ANALYTICS & RECHARTS ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Chart 1: Realisasi Pengadaan Triwulan */}
                  <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-500" />
                          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Target vs Realisasi Pengadaan Triwulan
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Komparasi kuota tender dengan realisasi kontrak belanja Kementerian.
                        </p>
                      </div>
                      
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>T.A 2026</span>
                      </span>
                    </div>

                    <div className="pt-2">
                      <CategoryChart />
                    </div>

                    <div className={`pt-3 border-t grid grid-cols-3 gap-2 text-center text-xs ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <div className="p-2 rounded-xl bg-blue-500/5">
                        <p className="text-[10px] text-slate-400">Total Pagu</p>
                        <p className="font-bold text-blue-500 mt-0.5">Rp 48.2 M</p>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-500/5">
                        <p className="text-[10px] text-slate-400">Efisiensi HPS</p>
                        <p className="font-bold text-emerald-500 mt-0.5">18.4%</p>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/5">
                        <p className="text-[10px] text-slate-400">P3DN Lokal</p>
                        <p className="font-bold text-accent-gold mt-0.5">84.6%</p>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Distribusi Kategori Belanja */}
                  <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-accent-gold" />
                          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Distribusi Berdasarkan Jenis Pengadaan
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Klasifikasi paket barang, jasa konsultansi, konstruksi, dan lainnya.
                        </p>
                      </div>
                      
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>4 Sektor</span>
                      </span>
                    </div>

                    <div className="pt-2">
                      <EfficiencyChart />
                    </div>

                    <div className={`pt-3 border-t grid grid-cols-4 gap-2 text-center text-xs ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <div className="p-1.5 rounded-xl">
                        <p className="text-[10px] text-slate-400">Barang</p>
                        <p className="font-bold text-blue-600 mt-0.5">180 Pkt</p>
                      </div>
                      <div className="p-1.5 rounded-xl">
                        <p className="text-[10px] text-slate-400">Konstruksi</p>
                        <p className="font-bold text-blue-500 mt-0.5">85 Pkt</p>
                      </div>
                      <div className="p-1.5 rounded-xl">
                        <p className="text-[10px] text-slate-400">Konsultansi</p>
                        <p className="font-bold text-blue-400 mt-0.5">65 Pkt</p>
                      </div>
                      <div className="p-1.5 rounded-xl">
                        <p className="text-[10px] text-slate-400">Lainnya</p>
                        <p className="font-bold text-blue-300 mt-0.5">98 Pkt</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* CMS CENTRAL COMMAND SHORTCUTS (6 HUBS) */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`text-base font-extrabold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Sliders className="w-4 h-4 text-blue-500" />
                        <span>Pusat Kendali Konten Web Publik (CMS Hub)</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Akses cepat pengeditan modul frontend dan sinkronisasi data real-time.
                      </p>
                    </div>
                    
                    <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 self-start sm:self-auto">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Live Auto-Sync to Public Web</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* CMS Hub 1: Berita */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-amber-500/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                          <Newspaper className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500">
                          {newsList.length} Artikel
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Berita & Warta PBJ</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Publikasikan siaran pers, artikel edukasi, dan pengumuman resmi.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('manage-berita')}
                          className="flex-1 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Kelola Berita</span>
                        </button>
                        <Link
                          href="/informasi"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend Berita"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* CMS Hub 2: Agenda */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-emerald-500/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                          {agendaList.length} Agenda
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Agenda & Sosialisasi</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Kelola jadwal rapat kerja, bimbingan teknis, dan sosialisasi regulasi.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('manage-agenda')}
                          className="flex-1 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Kelola Agenda</span>
                        </button>
                        <Link
                          href="/agenda"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend Agenda"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* CMS Hub 3: Regulasi */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-500/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                          <ScrollText className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-500">
                          {regulasiList.length} Aturan
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Regulasi & Produk Hukum</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Kelola dokumen Perpres, Permenaker, SE, dan keputusan LKPP terkini.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('manage-regulasi')}
                          className="flex-1 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-600 text-blue-500 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Kelola Regulasi</span>
                        </button>
                        <Link
                          href="/informasi/peraturan"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend Regulasi"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* CMS Hub 4: SOP */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-purple-500/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                          <Layers className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400">
                          {sopList.length} Prosedur
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Standar Operasional (SOP)</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Kelola alur tahapan kerja pemilihan penyedia dan panduan operasional.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('manage-sop')}
                          className="flex-1 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-600 text-purple-400 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Workflow className="w-3.5 h-3.5" />
                          <span>Kelola SOP</span>
                        </button>
                        <Link
                          href="/informasi/sop"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend SOP"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* CMS Hub 5: Galeri & Video */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-cyan-500/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400">
                          {photosList.length + videosList.length} Media
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Galeri Foto & Video</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Kelola dokumentasi visual kegiatan, foto rapat, dan video edukasi PBJ.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('manage-galeri')}
                          className="flex-1 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-600 text-cyan-400 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Kelola Galeri</span>
                        </button>
                        <Link
                          href="/galeri"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend Galeri"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* CMS Hub 6: Paket Tender */}
                    <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isDark ? 'bg-slate-900/90 border-slate-800 hover:border-primary-blue/50' : 'bg-white border-slate-200/90 shadow-sm hover:border-primary-blue/50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400">
                          {packagesList.length} Paket
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Daftar Paket Tender</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          Kelola pengumuman paket tender aktif, status penawaran, dan detail HPS.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('paket')}
                          className="flex-1 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Kelola Paket</span>
                        </button>
                        <Link
                          href="/#pengadaan"
                          target="_blank"
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-primary-navy'
                          }`}
                          title="Lihat Frontend Pengadaan"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>

                {/* OPERATIONAL TELEMETRY & SYSTEM HEALTH */}
                <div className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-emerald-500" />
                      <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Status Infrastruktur & Telemetri Backend SPSE
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                        <Zap className="w-3 h-3" />
                        <span>Response Time: 24ms</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <Cpu className="w-4 h-4 text-blue-500 mx-auto" />
                      <p className="text-[10px] text-slate-400">CPU Load</p>
                      <p className={`font-mono text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>18.4%</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <HardDrive className="w-4 h-4 text-purple-400 mx-auto" />
                      <p className="text-[10px] text-slate-400">Memory RAM</p>
                      <p className={`font-mono text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>42.1% (3.3 GB)</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <Database className="w-4 h-4 text-amber-500 mx-auto" />
                      <p className="text-[10px] text-slate-400">Database Pool</p>
                      <p className={`font-mono text-xs font-bold text-emerald-500`}>16/20 Active</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <Cloud className="w-4 h-4 text-cyan-400 mx-auto" />
                      <p className="text-[10px] text-slate-400">Edge Cache</p>
                      <p className={`font-mono text-xs font-bold text-emerald-500`}>HIT (99.4%)</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                      <p className="text-[10px] text-slate-400">SSL Encryption</p>
                      <p className={`font-mono text-xs font-bold text-emerald-500`}>TLS 1.3 Valid</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <Radio className="w-4 h-4 text-accent-gold mx-auto animate-pulse" />
                      <p className="text-[10px] text-slate-400">SiKAP API</p>
                      <p className={`font-mono text-xs font-bold text-emerald-500`}>Connected</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* RIGHT COMMAND & INTEL PANEL (ENTERPRISE SIDEBAR WIDGETS) */}
              {/* ========================================================= */}
              <div className="xl:col-span-4 2xl:col-span-4 space-y-6 min-w-0">
                
                {/* WIDGET 1: LIVE AUDIT FEED & SYSTEM ACTIVITY */}
                <div className={`p-5 rounded-3xl border shadow-sm space-y-4 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                }`}>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Live Activity & Audit Feed
                      </h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>Live Record</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Activity Item 1 */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Newspaper className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Berita Pengadaan Terbit
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {newsList[0]?.title || 'Pembaruan Siaran Pers PBJ'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">2 menit lalu • Dimas Ars</span>
                      </div>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                        <ScrollText className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Regulasi Baru Tersinkron
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {regulasiList[0]?.nomor || 'Permenaker No. 01/2026'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">14 menit lalu • JDIH Hook</span>
                      </div>
                    </div>

                    {/* Activity Item 3 */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Verifikasi Vendor SiKAP
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          PT Telkom Akses (Kualifikasi Lolos)
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">1 jam lalu • Pokja Pemilihan</span>
                      </div>
                    </div>

                    {/* Activity Item 4 */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Dokumentasi Galeri Terkini
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {photosList[0]?.title || 'Foto Rapat Koordinasi PBJ'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">3 jam lalu • /galeri sync</span>
                      </div>
                    </div>

                    {/* Activity Item 5 */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Pembaruan Tahapan SOP
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {sopList[0]?.judul || 'SOP Pengadaan Langsung'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">Kemarin • Biro Hukum</span>
                      </div>
                    </div>
                  </div>

                  <div className={`pt-2 border-t text-[10px] text-slate-400 text-center ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span>Auto-persisted to Local Database Engine v1</span>
                  </div>
                </div>

                {/* WIDGET 2: DEADLINE TENDER & AGENDA MENDATANG */}
                <div className={`p-5 rounded-3xl border shadow-sm space-y-4 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                }`}>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent-gold" />
                      <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Deadline & Jadwal Mendatang
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded-full border border-accent-gold/20">
                      {agendaList.length} Event
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Tender Deadline Card */}
                    <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      isDark ? 'bg-slate-950/60 border-amber-500/30' : 'bg-amber-50/60 border-amber-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-slate-950">
                          Batas Tender Hari Ini
                        </span>
                        <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>16:00 WIB</span>
                        </span>
                      </div>
                      <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {packagesList[0]?.title || 'Pengadaan Server & Storage SPSE'}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Pagu: {packagesList[0]?.hps || 'Rp 500.000.000'} • {packagesList[0]?.unit || 'Biro Perencanaan'}
                      </p>
                    </div>

                    {/* Upcoming Agenda 1 */}
                    {agendaList.slice(0, 2).map((agenda) => (
                      <div key={agenda.id} className={`p-3 rounded-2xl border flex items-center justify-between ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="min-w-0 pr-2">
                          <p className={`font-bold text-xs truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            {agenda.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-emerald-500" />
                            <span>{agenda.date}</span>
                            <span>•</span>
                            <span className="truncate">{agenda.location}</span>
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400 shrink-0">
                          {agenda.category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('manage-agenda')}
                    className="w-full py-2 rounded-xl bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Jadwalkan Agenda Baru</span>
                  </button>
                </div>

                {/* WIDGET 3: GOVERNMENT ECOSYSTEM INTEGRATION STATUS */}
                <div className={`p-5 rounded-3xl border shadow-sm space-y-4 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                }`}>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Ekosistem Layanan PBJ
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      All Connected
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <a
                      href="https://lpse.kemnaker.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isDark ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/40 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>LPSE Kemnaker RI</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>18ms</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    <a
                      href="https://sikap.lkpp.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isDark ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/40 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>SiKAP LKPP Nasional</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>Live Sync</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    <a
                      href="https://jdih.kemnaker.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isDark ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/40 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>JDIH Kemnaker RI</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>Synced</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    <a
                      href="https://e-katalog.lkpp.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isDark ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/40 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>e-Katalog LKPP v6</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>Active</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* WIDGET 4: QUICK EXPORT & UTILITIES */}
                <div className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
                }`}>
                  <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Download className="w-4 h-4 text-emerald-500" />
                    <span>Utilitas Rekap & Cadangan</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => showNotification('✓ Laporan Rekap PBJ (.xlsx) berhasil diexport.')}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-emerald-400 hover:bg-slate-800' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export XLSX</span>
                    </button>

                    <button
                      onClick={() => {
                        const dataStr = JSON.stringify({ newsList, agendaList, packagesList, regulasiList, sopList, photosList, videosList }, null, 2);
                        const blob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `backup_ukpbj_db_${new Date().toISOString().slice(0,10)}.json`;
                        link.click();
                        showNotification('✓ Cadangan Database JSON berhasil diunduh.');
                      }}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-blue-400 hover:bg-slate-800' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Backup JSON</span>
                    </button>
                  </div>
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
        {/* TAB: MONITORING PENGADAAN & REAL-TIME TRACKING */}
        {/* ========================================================= */}
        {activeTab === 'monitoring' && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase mb-2">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Real-time Surveillance & SLA Tracking</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Monitoring Progres Pengadaan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pantau alur tahapan tender, performa SLA Pokja Pemilihan, dan status sinkronisasi SPSE secara live.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showNotification('Data monitoring SPSE berhasil disinkronisasi ulang!')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh Real-time Data</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Paket Berjalan</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-2xl font-black mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>42</p>
                <p className="text-[10px] text-blue-400 font-semibold mt-1">100% On-Schedule</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Kepatuhan SLA</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black mt-2 text-emerald-500">97.8%</p>
                <p className="text-[10px] text-slate-400 mt-1">Target Kementerian &gt;95%</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Tahap Evaluasi</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black mt-2 text-amber-500">18</p>
                <p className="text-[10px] text-slate-400 mt-1">Rata-rata 3 hari kerja</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Konektivitas SPSE</span>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black mt-2 text-cyan-500">Normal</p>
                <p className="text-[10px] text-emerald-400 font-semibold mt-1">Latency: 38ms (Healthy)</p>
              </div>
            </div>

            {/* Pipeline Stage Tracker */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Distribusi Tahapan Pengadaan Aktif
                  </h3>
                  <p className="text-[11px] text-slate-400">Tahapan tender dan seleksi berjalan T.A 2026</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Total 42 Paket Aktif
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">1. Persiapan & RUP</p>
                  <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>9</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className="text-[10px] font-bold text-amber-500 uppercase">2. Pengumuman</p>
                  <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>12</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className="text-[10px] font-bold text-purple-400 uppercase">3. Evaluasi Penawaran</p>
                  <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>11</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className="text-[10px] font-bold text-cyan-400 uppercase">4. Masa Sanggah</p>
                  <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>4</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">5. Penandatanganan</p>
                  <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>6</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Monitoring Table */}
            <div className={`border rounded-2xl overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`p-4 border-b flex justify-between items-center text-xs ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Live SLA & Status Pengawasan Paket
                </span>
                <span className="text-emerald-500 text-[11px] font-semibold flex items-center gap-1.5">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Real-time Sentinel Active</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`text-[11px] border-b ${
                    isDark ? 'bg-slate-950/50 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    <tr>
                      <th className="p-4 font-semibold">Paket & Kode</th>
                      <th className="p-4 font-semibold">Satuan Kerja</th>
                      <th className="p-4 font-semibold">Nilai HPS</th>
                      <th className="p-4 font-semibold">Tahap Saat Ini</th>
                      <th className="p-4 font-semibold">Batas Waktu</th>
                      <th className="p-4 font-semibold text-right">Status SLA</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isDark ? 'divide-slate-800/60' : 'divide-slate-100'
                  }`}>
                    {packagesList.map((pkg) => (
                      <tr key={pkg.id} className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{pkg.title}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{pkg.code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-400 text-xs">
                          {pkg.unit}
                        </td>
                        <td className={`p-4 font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {pkg.hps}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {pkg.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono text-[11px]">
                          {pkg.deadline}
                        </td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>On Track (0 Hari Terlambat)</span>
                          </span>
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
        {/* TAB: MANAGE GALERI (FOTO & VIDEO CMS) */}
        {/* ========================================================= */}
        {activeTab === 'manage-galeri' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-bold uppercase mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Backend Gallery & Media Management</span>
                </div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kelola Galeri Foto & Video
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola dokumentasi visual dan video kegiatan resmi. Tersinkronisasi langsung ke halaman publik (<Link href="/galeri" className="text-cyan-500 hover:underline">/galeri</Link>).
                </p>
              </div>

              {/* Sub-tab Switcher & Add Button */}
              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex items-center p-1 rounded-xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    onClick={() => setGaleriTab('foto')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      galeriTab === 'foto'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Foto ({photosList.length})</span>
                  </button>
                  <button
                    onClick={() => setGaleriTab('video')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      galeriTab === 'video'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video ({videosList.length})</span>
                  </button>
                </div>

                {galeriTab === 'foto' ? (
                  <button
                    onClick={() => {
                      setEditingPhoto(null);
                      setPhotoFormData({
                        title: '',
                        desc: '',
                        category: 'Dokumentasi Kerja',
                        src: '/gallery/gallery-1.jpg',
                        size: 'small',
                        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                      });
                      setShowPhotoModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingVideo(null);
                      setVideoFormData({
                        title: '',
                        desc: '',
                        category: 'Sosialisasi Regulasi',
                        duration: '12:00',
                        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
                        views: '1.0K x ditonton',
                        thumbnailUrl: '/gallery/gallery-1.jpg',
                        url: 'https://www.youtube.com/@kemenperin_ri'
                      });
                      setShowVideoModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB FOTO CONTENT */}
            {galeriTab === 'foto' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photosList.map((item) => (
                  <div key={item.id} className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-cyan-500/40'
                  }`}>
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <h4 className={`font-bold text-xs line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{item.desc}</p>
                    </div>

                    <div className={`pt-2 border-t flex justify-between items-center text-[10px] text-slate-400 ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span>{item.date}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingPhoto(item);
                            setPhotoFormData(item);
                            setShowPhotoModal(true);
                          }}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                            isDark ? 'bg-slate-800 hover:bg-cyan-600' : 'bg-slate-100 hover:bg-cyan-600'
                          }`}
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(item.id)}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                            isDark ? 'bg-slate-800 hover:bg-red-600' : 'bg-slate-100 hover:bg-red-600'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB VIDEO CONTENT */}
            {galeriTab === 'video' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videosList.map((item) => (
                  <div key={item.id} className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-amber-500/40'
                  }`}>
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center group">
                      <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-black/80 text-white">
                        {item.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{item.category}</span>
                      <h4 className={`font-bold text-xs line-clamp-1 mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{item.desc}</p>
                    </div>

                    <div className={`pt-2 border-t flex justify-between items-center text-[10px] text-slate-400 ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span>{item.date} • {item.views}</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                            isDark ? 'bg-slate-800 hover:bg-blue-600' : 'bg-slate-100 hover:bg-blue-600'
                          }`}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => {
                            setEditingVideo(item);
                            setVideoFormData(item);
                            setShowVideoModal(true);
                          }}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                            isDark ? 'bg-slate-800 hover:bg-amber-600' : 'bg-slate-100 hover:bg-amber-600'
                          }`}
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(item.id)}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                            isDark ? 'bg-slate-800 hover:bg-red-600' : 'bg-slate-100 hover:bg-red-600'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      {/* ========================================================= */}
      {/* MODAL 8: PHOTO MODAL (TAMBAH / EDIT FOTO - LOCAL UPLOAD READY) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showPhotoModal && (
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
                  <Camera className="w-5 h-5 text-cyan-500" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingPhoto ? 'Edit Foto Kegiatan' : 'Tambah Foto Dokumentasi Baru'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Judul Foto / Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={photoFormData.title || ''}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                    placeholder="e.g. Kunjungan Kerja dan Koordinasi Pengadaan"
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Deskripsi Foto Kegiatan</label>
                  <textarea
                    rows={2}
                    value={photoFormData.desc || ''}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, desc: e.target.value })}
                    placeholder="Keterangan singkat momen kegiatan pengadaan..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kategori Kegiatan</label>
                    <select
                      value={photoFormData.category || 'Dokumentasi Kerja'}
                      onChange={(e) => setPhotoFormData({ ...photoFormData, category: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyan-600'
                      }`}
                    >
                      <option value="Kunjungan Kerja">Kunjungan Kerja</option>
                      <option value="Rapat Koordinasi">Rapat Koordinasi</option>
                      <option value="Sosialisasi">Sosialisasi</option>
                      <option value="Bimtek">Bimtek</option>
                      <option value="Kontrak Kerja">Kontrak Kerja</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Dokumentasi Kerja">Dokumentasi Kerja</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Ukuran Tampilan Grid</label>
                    <select
                      value={photoFormData.size || 'small'}
                      onChange={(e) => setPhotoFormData({ ...photoFormData, size: e.target.value as PhotoItem['size'] })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyan-600'
                      }`}
                    >
                      <option value="small">Standar (1 Kolom)</option>
                      <option value="large">Featured / Unggulan (2 Kolom Besar)</option>
                    </select>
                  </div>
                </div>

                {/* FILE UPLOAD & PREVIEW SECTION */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="font-bold flex items-center gap-1.5 text-cyan-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload Foto dari Komputer (Local Storage)</span>
                    </label>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WEBP (Max 4MB)</span>
                  </div>

                  {/* Upload Dropzone */}
                  <label 
                    htmlFor="photo-file-upload" 
                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDark 
                        ? 'border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/5' 
                        : 'border-slate-300 hover:border-cyan-600 hover:bg-cyan-50'
                    }`}
                  >
                    <Upload className="w-6 h-6 text-cyan-500 mb-1.5 animate-bounce" />
                    <span className="font-bold text-xs">Pilih File Foto dari Perangkat / Komputer</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">File otomatis dikonversi & disimpan ke database browser</span>
                    <input 
                      id="photo-file-upload"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageFileUpload(e, 'photo')}
                      className="hidden" 
                    />
                  </label>

                  {/* Live Image Preview */}
                  {photoFormData.src && (
                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={photoFormData.src} 
                          alt="Preview Foto" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-emerald-500 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Foto Siap Ditayangkan</span>
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {photoFormData.src.startsWith('data:') ? '✓ Format: Base64 Data URL (Local)' : photoFormData.src}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Or select preset images */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block mb-1">Atau pilih dari koleksi bawaan:</span>
                    <select
                      value={photoFormData.src || '/gallery/gallery-1.jpg'}
                      onChange={(e) => setPhotoFormData({ ...photoFormData, src: e.target.value })}
                      className={`w-full px-3 py-1.5 border rounded-lg outline-none text-[11px] ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <option value="/gallery/gallery-1.jpg">Gallery Foto 1 (Kunjungan Kerja)</option>
                      <option value="/gallery/gallery-2.jpg">Gallery Foto 2 (Rakornas Pengadaan)</option>
                      <option value="/gallery/gallery-3.jpg">Gallery Foto 3 (Sosialisasi Regulasi)</option>
                      <option value="/gallery/gallery-4.jpg">Gallery Foto 4 (Bimtek PBJ)</option>
                      <option value="/gallery/gallery-5.jpg">Gallery Foto 5 (Penandatanganan Kontrak)</option>
                      <option value="/gallery/gallery-6.jpg">Gallery Foto 6 (Monitoring Evaluasi)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowPhotoModal(false)}
                    className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    {editingPhoto ? 'Perbarui Foto' : 'Terbitkan Foto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 9: VIDEO MODAL (TAMBAH / EDIT VIDEO - LOCAL THUMBNAIL READY) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showVideoModal && (
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
                  <Video className="w-5 h-5 text-amber-500" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {editingVideo ? 'Edit Video Dokumentasi' : 'Tambah Video Baru (CMS)'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Judul Video *</label>
                  <input
                    type="text"
                    required
                    value={videoFormData.title || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    placeholder="e.g. Sosialisasi Tata Cara Pengadaan Barang/Jasa..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Deskripsi Singkat Video</label>
                  <textarea
                    rows={2}
                    value={videoFormData.desc || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, desc: e.target.value })}
                    placeholder="Uraian rangkuman materi atau rekaman acara..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Kategori Video</label>
                    <select
                      value={videoFormData.category || 'Sosialisasi Regulasi'}
                      onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-xl outline-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-600'
                      }`}
                    >
                      <option value="Sosialisasi Regulasi">Sosialisasi Regulasi</option>
                      <option value="Tutorial & Juknis">Tutorial & Juknis</option>
                      <option value="Dokumentasi Rakornas">Dokumentasi Rakornas</option>
                      <option value="Bimtek & Sertifikasi">Bimtek & Sertifikasi</option>
                      <option value="Panduan Pelaku Usaha">Panduan Pelaku Usaha</option>
                      <option value="Integritas & Kepatuhan">Integritas & Kepatuhan</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Durasi Video</label>
                    <input
                      type="text"
                      value={videoFormData.duration || '12:00'}
                      onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                      placeholder="e.g. 15:30"
                      className={`w-full px-3 py-2 border rounded-xl outline-none font-mono ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold">Link URL YouTube / Video *</label>
                    <button
                      type="button"
                      onClick={() => {
                        if (videoFormData.url) {
                          const ytThumb = getYouTubeThumbnail(videoFormData.url);
                          if (ytThumb) {
                            setVideoFormData((prev) => ({ ...prev, thumbnailUrl: ytThumb }));
                            showNotification('✓ Thumbnail YouTube berhasil diambil secara otomatis!');
                          } else {
                            showNotification('⚠️ URL YouTube tidak valid untuk ekstraksi otomatis.');
                          }
                        } else {
                          showNotification('⚠️ Masukkan link URL YouTube terlebih dahulu.');
                        }
                      }}
                      className="text-[10px] text-amber-500 hover:underline font-bold cursor-pointer"
                    >
                      ⚡ Ambil Thumbnail dari YouTube
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={videoFormData.url || ''}
                    onChange={(e) => {
                      const newUrl = e.target.value;
                      setVideoFormData({ ...videoFormData, url: newUrl });
                      const autoThumb = getYouTubeThumbnail(newUrl);
                      if (autoThumb && (!videoFormData.thumbnailUrl || videoFormData.thumbnailUrl === '/gallery/gallery-1.jpg')) {
                        setVideoFormData((prev) => ({ ...prev, url: newUrl, thumbnailUrl: autoThumb }));
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full px-3 py-2 border rounded-xl outline-none font-mono ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                    }`}
                  />
                </div>

                {/* THUMBNAIL UPLOAD & PREVIEW SECTION */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="font-bold flex items-center gap-1.5 text-amber-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload Thumbnail Kustom (Local Storage)</span>
                    </label>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WEBP</span>
                  </div>

                  <label 
                    htmlFor="video-thumb-upload" 
                    className={`border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDark 
                        ? 'border-slate-700 hover:border-amber-500 hover:bg-amber-500/5' 
                        : 'border-slate-300 hover:border-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    <Upload className="w-5 h-5 text-amber-500 mb-1" />
                    <span className="font-bold text-xs">Pilih Gambar Thumbnail dari Komputer</span>
                    <input 
                      id="video-thumb-upload"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageFileUpload(e, 'video-thumb')}
                      className="hidden" 
                    />
                  </label>

                  {/* Thumbnail Preview */}
                  {videoFormData.thumbnailUrl && (
                    <div className="flex items-center gap-3 pt-1">
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={videoFormData.thumbnailUrl} 
                          alt="Preview Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-emerald-500 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Thumbnail Terpasang</span>
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {videoFormData.thumbnailUrl.startsWith('data:') ? '✓ Format: Base64 (Local File)' : videoFormData.thumbnailUrl}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 cursor-pointer"
                  >
                    {editingVideo ? 'Perbarui Video' : 'Terbitkan Video'}
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
