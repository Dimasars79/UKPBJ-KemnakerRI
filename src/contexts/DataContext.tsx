"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  category: 'Berita PBJ' | 'Pengumuman Lelang' | 'Regulasi' | 'Siaran Pers';
  author: string;
  date: string;
  views: number;
  status: 'Published' | 'Draft' | 'Archived';
  excerpt: string;
  content: string;
  imageUrl?: string;
  syncFrontend: boolean;
}

export interface AgendaItem {
  id: string;
  title: string;
  category: 'Tender' | 'Sosialisasi' | 'Sertifikasi' | 'Bimtek' | 'Rapat';
  date: string; // e.g. '15 Sep 2026' or '2026-09-15'
  time: string;
  location: string;
  organizer: string;
  capacity: string;
  status: 'Terjadwal' | 'Berlangsung' | 'Selesai' | 'Dibatalkan';
  syncFrontend: boolean;
}

export interface ProcurementPackage {
  id: string;
  code: string;
  title: string;
  unit: string;
  hps: string;
  category: 'Tender' | 'Seleksi' | 'Pengadaan Langsung' | 'E-Purchasing';
  status: 'Pendaftaran Dibuka' | 'Tahap Evaluasi' | 'Selesai' | 'Pemberian Penjelasan';
  deadline: string;
  method: string;
  docCount: number;
  desc?: string;
}

export interface RegulasiItem {
  id: string;
  nomor: string;
  tentang: string;
  tahun: string;
  kategori: 'Peraturan Menteri' | 'Peraturan LKPP' | 'Keputusan Menteri' | 'Surat Edaran' | 'Undang-Undang' | 'Peraturan Pemerintah';
  fileSize: string;
  downloadUrl?: string;
  status: 'Aktif' | 'Draft' | 'Dicabut';
  syncFrontend: boolean;
}

export interface SopItem {
  id: string;
  kode: string;
  judul: string;
  unit: string;
  revisi: string;
  tahapanCount: number;
  downloadUrl?: string;
  status: 'Berlaku' | 'Dalam Revisi' | 'Draft';
  syncFrontend: boolean;
}

export interface SiteSettings {
  announcementBanner: string;
  announcementActive: boolean;
  serverStatus: 'Normal' | 'Maintenance' | 'High Traffic';
  emergencyNotice: string;
}

interface DataContextType {
  // News
  newsList: NewsItem[];
  addNews: (news: Omit<NewsItem, 'id' | 'views' | 'date' | 'syncFrontend'>) => void;
  updateNews: (id: string, updated: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  toggleNewsStatus: (id: string) => void;

  // Agenda
  agendaList: AgendaItem[];
  addAgenda: (agenda: Omit<AgendaItem, 'id' | 'syncFrontend'>) => void;
  updateAgenda: (id: string, updated: Partial<AgendaItem>) => void;
  deleteAgenda: (id: string) => void;

  // Procurement Packages
  packagesList: ProcurementPackage[];
  addPackage: (pkg: Omit<ProcurementPackage, 'id'>) => void;
  updatePackage: (id: string, updated: Partial<ProcurementPackage>) => void;
  deletePackage: (id: string) => void;

  // Regulasi
  regulasiList: RegulasiItem[];
  addRegulasi: (reg: Omit<RegulasiItem, 'id' | 'syncFrontend'>) => void;
  updateRegulasi: (id: string, updated: Partial<RegulasiItem>) => void;
  deleteRegulasi: (id: string) => void;
  toggleRegulasiStatus: (id: string) => void;

  // SOP
  sopList: SopItem[];
  addSop: (sop: Omit<SopItem, 'id' | 'syncFrontend'>) => void;
  updateSop: (id: string, updated: Partial<SopItem>) => void;
  deleteSop: (id: string) => void;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Database actions
  resetToDefaults: () => void;
  isLoaded: boolean;
}

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'NWS-001',
    title: 'Sosialisasi Peraturan LKPP Nomor 12 Tahun 2024 tentang Tata Cara Pengadaan',
    category: 'Regulasi',
    author: 'Biro Hukum & Humas Kemnaker',
    date: '10 Agu 2026',
    views: 1420,
    status: 'Published',
    excerpt: 'Pedoman pelaksanaan pengadaan barang dan jasa pemerintah terbaru yang berlaku di seluruh unit kerja kementerian.',
    content: 'Dalam rangka meningkatkan akuntabilitas dan efisiensi belanja negara, UKPBJ Kemnaker menyelenggarakan sosialisasi regulasi LKPP terbaru dengan standar digital SPSE terintegrasi.',
    imageUrl: '/news/news-1.png',
    syncFrontend: true
  },
  {
    id: 'NWS-002',
    title: 'Pengumuman Penetapan Pemenang Tender Jasa Konsultan IT & Portal',
    category: 'Pengumuman Lelang',
    author: 'Pokja Pemilihan I UKPBJ',
    date: '08 Agu 2026',
    views: 2850,
    status: 'Published',
    excerpt: 'Hasil evaluasi kualifikasi administrasi, teknis, dan harga untuk paket pengembangan arsitektur portal kementerian.',
    content: 'Berdasarkan berita acara hasil pemilihan, Pokja Pemilihan menetapkan penyedia terpilih setelah melalui masa sanggah tanpa keberatan.',
    imageUrl: '/news/news-2.png',
    syncFrontend: true
  },
  {
    id: 'NWS-003',
    title: 'Workshop Peningkatan Penggunaan Produk Dalam Negeri (P3DN) & Sertifikasi TKDN',
    category: 'Berita PBJ',
    author: 'Pusat Pasar Kerja & PBJ',
    date: '05 Agu 2026',
    views: 940,
    status: 'Published',
    excerpt: 'Mendorong komitmen belanja kementerian untuk mencapai target minimal 40% produk ber-TKDN tinggi.',
    content: 'Kegiatan ini diikuti oleh seluruh PPK dan Pejabat Pengadaan di lingkungan Kementerian Ketenagakerjaan seluruh Indonesia.',
    imageUrl: '/news/news-3.png',
    syncFrontend: true
  },
  {
    id: 'NWS-004',
    title: 'Draf Rencana Pengadaan Peralatan Pelatihan Balai Vokasi Tahun 2027',
    category: 'Siaran Pers',
    author: 'Ditjen Binalavotas',
    date: '02 Agu 2026',
    views: 310,
    status: 'Draft',
    excerpt: 'Rancangan awal spesifikasi teknis dan analisis kebutuhan alat kerja laboratorium vokasi.',
    content: 'Draft internal persiapan Rencana Umum Pengadaan (SiRUP) tahun anggaran mendatang.',
    imageUrl: '/news/news-1.png',
    syncFrontend: false
  }
];

const DEFAULT_AGENDAS: AgendaItem[] = [
  {
    id: 'AGD-001',
    title: 'Bimbingan Teknis Penerapan SIKaP V.3 bagi Penyedia Barang & Jasa',
    category: 'Bimtek',
    date: '15 Sep 2026',
    time: '10:00 - 12:00 WIB',
    location: 'Auditorium Gedung A Kemnaker & Zoom',
    organizer: 'Biro Perencanaan & PBJ',
    capacity: '200 Peserta',
    status: 'Terjadwal',
    syncFrontend: true
  },
  {
    id: 'AGD-002',
    title: 'Pemberian Penjelasan (Aanwijzing) Tender Pengadaan IT Server',
    category: 'Tender',
    date: '18 Sep 2026',
    time: '09:00 - 11:30 WIB',
    location: 'Ruang Rapat UKPBJ Lt. 4',
    organizer: 'Pokja Pemilihan II',
    capacity: 'Khusus Rekanan Terdaftar',
    status: 'Terjadwal',
    syncFrontend: true
  },
  {
    id: 'AGD-003',
    title: 'Ujian Sertifikasi PBJ Tingkat Dasar Batch IV',
    category: 'Sertifikasi',
    date: '22 Sep 2026',
    time: '08:00 - 16:00 WIB',
    location: 'Pusdiklat Kemnaker RI',
    organizer: 'Pusat Pengembangan SDM PBJ',
    capacity: '50 Peserta',
    status: 'Terjadwal',
    syncFrontend: true
  },
  {
    id: 'AGD-004',
    title: 'Rapat Koordinasi Evaluasi Realisasi Anggaran PBJ Kuartal III',
    category: 'Rapat',
    date: '28 Sep 2026',
    time: '13:30 - 16:30 WIB',
    location: 'Ruang Rapat Utama Menteri',
    organizer: 'Sekretariat Jenderal Kemnaker',
    capacity: 'Internal PPK & KPA',
    status: 'Terjadwal',
    syncFrontend: true
  },
  {
    id: 'AGD-005',
    title: 'Sosialisasi Tata Cara Pengajuan Clearing House PBJ',
    category: 'Sosialisasi',
    date: '02 Okt 2026',
    time: '09:00 - 12:00 WIB',
    location: 'Hybrid (Ruang Komisi & Live Stream)',
    organizer: 'Inspektorat Jenderal & UKPBJ',
    capacity: '300 Peserta',
    status: 'Terjadwal',
    syncFrontend: true
  }
];

const DEFAULT_PACKAGES: ProcurementPackage[] = [
  {
    id: 'PKG-2026-001',
    code: 'TND-984210',
    title: 'Pengadaan Jasa Konsultan Pengembangan Arsitektur IT & Portal UKPBJ',
    unit: 'Biro Perencanaan dan Manajemen Kinerja - Kemnaker RI',
    hps: 'Rp 500.000.000',
    category: 'Tender',
    status: 'Pendaftaran Dibuka',
    deadline: '20 Agu 2026',
    method: 'Tender - Pascakualifikasi Satu File',
    docCount: 3,
    desc: 'Pengadaan jasa konsultan IT untuk mendukung implementasi sistem informasi terintegrasi dan arsitektur satu portal di lingkungan Kemnaker.'
  },
  {
    id: 'PKG-2026-002',
    code: 'TND-984211',
    title: 'Pengadaan Peralatan Workshop Pelatihan Vokasi & Produktivitas',
    unit: 'Ditjen Pembinaan Pelatihan Vokasi dan Produktivitas (Binalavotas)',
    hps: 'Rp 2.150.000.000',
    category: 'Tender',
    status: 'Tahap Evaluasi',
    deadline: '16 Agu 2026',
    method: 'Tender - Pascakualifikasi Dua File',
    docCount: 4,
    desc: 'Pengadaan sarana dan prasarana penunjang pelatihan vokasi tenaga kerja di balai besar pelatihan.'
  },
  {
    id: 'PKG-2026-003',
    code: 'SLK-882014',
    title: 'Jasa Konsultansi Pengawasan Renovasi Gedung Pusat Pasar Kerja',
    unit: 'Pusat Pasar Kerja (PaskerID) Kemnaker RI',
    hps: 'Rp 350.000.000',
    category: 'Seleksi',
    status: 'Pemberian Penjelasan',
    deadline: '22 Agu 2026',
    method: 'Seleksi Kualifikasi Kualitas & Biaya',
    docCount: 2,
    desc: 'Pengawasan berkala mutu konstruksi fisik renovasi ruang layanan ketenagakerjaan terpadu.'
  },
  {
    id: 'PKG-2026-004',
    code: 'PL-441092',
    title: 'Pengadaan Lisensi Software Keamanan & Monitoring Server SPSE',
    unit: 'Pusat Data dan Informasi (Pusdatin) Kemnaker RI',
    hps: 'Rp 180.000.000',
    category: 'Pengadaan Langsung',
    status: 'Selesai',
    deadline: '05 Agu 2026',
    method: 'Pengadaan Langsung',
    docCount: 2,
    desc: 'Lisensi tahunan firewall dan perangkat pemantau lalu lintas jaringan pengadaan.'
  },
  {
    id: 'PKG-2026-005',
    code: 'TND-984215',
    title: 'Pengadaan Jasa Kebersihan, Keamanan, dan Pengelolaan Fasilitas Kantor',
    unit: 'Biro Umum dan Pengadaan Barang/Jasa Kemnaker RI',
    hps: 'Rp 850.000.000',
    category: 'Tender',
    status: 'Pendaftaran Dibuka',
    deadline: '25 Agu 2026',
    method: 'Tender Cepat',
    docCount: 3,
    desc: 'Penyediaan alih daya tenaga pengamanan dan kebersihan gedung kementerian.'
  }
];

const DEFAULT_REGULASI: RegulasiItem[] = [
  {
    id: 'REG-001',
    nomor: 'Permenaker No. 12 Tahun 2024',
    tentang: 'Tata Cara Pelaksanaan Pengadaan Barang dan Jasa di Lingkungan Kementerian Ketenagakerjaan',
    tahun: '2024',
    kategori: 'Peraturan Menteri',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    status: 'Aktif',
    syncFrontend: true
  },
  {
    id: 'REG-002',
    nomor: 'Peraturan LKPP No. 12 Tahun 2021',
    tentang: 'Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah Melalui Penyedia',
    tahun: '2021',
    kategori: 'Peraturan LKPP',
    fileSize: '4.8 MB',
    downloadUrl: '#',
    status: 'Aktif',
    syncFrontend: true
  },
  {
    id: 'REG-003',
    nomor: 'Kepmenaker No. 84 Tahun 2025',
    tentang: 'Penetapan Standar Satuan Harga dan Honorarium Pengelola Keuangan dan Pengadaan Barang/Jasa',
    tahun: '2025',
    kategori: 'Keputusan Menteri',
    fileSize: '1.9 MB',
    downloadUrl: '#',
    status: 'Aktif',
    syncFrontend: true
  },
  {
    id: 'REG-004',
    nomor: 'Surat Edaran Sesjen No. 04/SE/2026',
    tentang: 'Pencegahan Gratifikasi dan Benturan Kepentingan dalam Pemilihan Penyedia Barang/Jasa',
    tahun: '2026',
    kategori: 'Surat Edaran',
    fileSize: '850 KB',
    downloadUrl: '#',
    status: 'Aktif',
    syncFrontend: true
  }
];

const DEFAULT_SOP: SopItem[] = [
  {
    id: 'SOP-001',
    kode: 'SOP/PBJ/01/2026',
    judul: 'Standar Operasional Prosedur Perencanaan Pengadaan & Penyusunan RUP',
    unit: 'Biro Perencanaan & UKPBJ Kemnaker',
    revisi: 'Rev. 03 (2026)',
    tahapanCount: 6,
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  },
  {
    id: 'SOP-002',
    kode: 'SOP/PBJ/02/2026',
    judul: 'SOP Pemilihan Penyedia Melalui E-Purchasing (Katalog Elektronik & Toko Daring)',
    unit: 'Pokja Pemilihan UKPBJ',
    revisi: 'Rev. 02 (2026)',
    tahapanCount: 5,
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  },
  {
    id: 'SOP-003',
    kode: 'SOP/PBJ/03/2026',
    judul: 'SOP Pelaksanaan Tender / Seleksi Cepat Pascakualifikasi SPSE 4.5',
    unit: 'Pokja Pemilihan I & II',
    revisi: 'Rev. 04 (2026)',
    tahapanCount: 8,
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  },
  {
    id: 'SOP-004',
    kode: 'SOP/PBJ/04/2026',
    judul: 'SOP Konsultasi & Penanganan Permasalahan Pengadaan (Clearing House)',
    unit: 'Inspektorat Jenderal & UKPBJ',
    revisi: 'Rev. 01 (2025)',
    tahapanCount: 4,
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  },
  {
    id: 'SOP-005',
    kode: 'SOP/PBJ/05/2026',
    judul: 'SOP Serah Terima Hasil Pekerjaan (BAST) dan Evaluasi Kinerja Vendor',
    unit: 'Pejabat Pembuat Komitmen (PPK)',
    revisi: 'Rev. 02 (2026)',
    tahapanCount: 5,
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  announcementBanner: 'Sosialisasi Peraturan LKPP Nomor 12 Tahun 2024 tentang Pedoman Pengadaan Barang/Jasa Pemerintah',
  announcementActive: true,
  serverStatus: 'Normal',
  emergencyNotice: ''
};

const STORAGE_KEY = 'ukpbj_backend_db_v1';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [agendaList, setAgendaList] = useState<AgendaItem[]>(DEFAULT_AGENDAS);
  const [packagesList, setPackagesList] = useState<ProcurementPackage[]>(DEFAULT_PACKAGES);
  const [regulasiList, setRegulasiList] = useState<RegulasiItem[]>(DEFAULT_REGULASI);
  const [sopList, setSopList] = useState<SopItem[]>(DEFAULT_SOP);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.newsList) setNewsList(parsed.newsList);
        if (parsed.agendaList) setAgendaList(parsed.agendaList);
        if (parsed.packagesList) setPackagesList(parsed.packagesList);
        if (parsed.regulasiList) setRegulasiList(parsed.regulasiList);
        if (parsed.sopList) setSopList(parsed.sopList);
        if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
      }
    } catch (e) {
      console.error('Failed to load UKPBJ local database', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever data changes
  const persist = (
    newNews = newsList,
    newAgenda = agendaList,
    newPkgs = packagesList,
    newRegulasi = regulasiList,
    newSop = sopList,
    newSettings = siteSettings
  ) => {
    try {
      const payload = {
        newsList: newNews,
        agendaList: newAgenda,
        packagesList: newPkgs,
        regulasiList: newRegulasi,
        sopList: newSop,
        siteSettings: newSettings,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to persist UKPBJ data', e);
    }
  };

  // NEWS ACTIONS
  const addNews = (news: Omit<NewsItem, 'id' | 'views' | 'date' | 'syncFrontend'>) => {
    const newEntry: NewsItem = {
      ...news,
      id: `NWS-${Date.now().toString().slice(-4)}`,
      views: 1,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      syncFrontend: news.status === 'Published'
    };
    const updated = [newEntry, ...newsList];
    setNewsList(updated);
    persist(updated);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    const updatedList = newsList.map((item) => {
      if (item.id === id) {
        const next = { ...item, ...updated };
        next.syncFrontend = next.status === 'Published';
        return next;
      }
      return item;
    });
    setNewsList(updatedList);
    persist(updatedList);
  };

  const deleteNews = (id: string) => {
    const updated = newsList.filter((item) => item.id !== id);
    setNewsList(updated);
    persist(updated);
  };

  const toggleNewsStatus = (id: string) => {
    const updatedList = newsList.map((item) => {
      if (item.id === id) {
        const nextStatus: NewsItem['status'] = item.status === 'Published' ? 'Draft' : 'Published';
        return {
          ...item,
          status: nextStatus,
          syncFrontend: nextStatus === 'Published'
        };
      }
      return item;
    });
    setNewsList(updatedList);
    persist(updatedList);
  };

  // AGENDA ACTIONS
  const addAgenda = (agenda: Omit<AgendaItem, 'id' | 'syncFrontend'>) => {
    const newEntry: AgendaItem = {
      ...agenda,
      id: `AGD-${Date.now().toString().slice(-4)}`,
      syncFrontend: true
    };
    const updated = [newEntry, ...agendaList];
    setAgendaList(updated);
    persist(newsList, updated);
  };

  const updateAgenda = (id: string, updated: Partial<AgendaItem>) => {
    const updatedList = agendaList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setAgendaList(updatedList);
    persist(newsList, updatedList);
  };

  const deleteAgenda = (id: string) => {
    const updated = agendaList.filter((item) => item.id !== id);
    setAgendaList(updated);
    persist(newsList, updated);
  };

  // PROCUREMENT PACKAGE ACTIONS
  const addPackage = (pkg: Omit<ProcurementPackage, 'id'>) => {
    const newEntry: ProcurementPackage = {
      ...pkg,
      id: `PKG-${Date.now().toString().slice(-4)}`
    };
    const updated = [newEntry, ...packagesList];
    setPackagesList(updated);
    persist(newsList, agendaList, updated);
  };

  const updatePackage = (id: string, updated: Partial<ProcurementPackage>) => {
    const updatedList = packagesList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setPackagesList(updatedList);
    persist(newsList, agendaList, updatedList);
  };

  const deletePackage = (id: string) => {
    const updated = packagesList.filter((item) => item.id !== id);
    setPackagesList(updated);
    persist(newsList, agendaList, updated);
  };

  // REGULASI ACTIONS
  const addRegulasi = (reg: Omit<RegulasiItem, 'id' | 'syncFrontend'>) => {
    const newEntry: RegulasiItem = {
      ...reg,
      id: `REG-${Date.now().toString().slice(-4)}`,
      syncFrontend: reg.status === 'Aktif'
    };
    const updated = [newEntry, ...regulasiList];
    setRegulasiList(updated);
    persist(newsList, agendaList, packagesList, updated);
  };

  const updateRegulasi = (id: string, updated: Partial<RegulasiItem>) => {
    const updatedList = regulasiList.map((item) => {
      if (item.id === id) {
        const next = { ...item, ...updated };
        next.syncFrontend = next.status === 'Aktif';
        return next;
      }
      return item;
    });
    setRegulasiList(updatedList);
    persist(newsList, agendaList, packagesList, updatedList);
  };

  const deleteRegulasi = (id: string) => {
    const updated = regulasiList.filter((item) => item.id !== id);
    setRegulasiList(updated);
    persist(newsList, agendaList, packagesList, updated);
  };

  const toggleRegulasiStatus = (id: string) => {
    const updatedList = regulasiList.map((item) => {
      if (item.id === id) {
        const nextStatus: RegulasiItem['status'] = item.status === 'Aktif' ? 'Draft' : 'Aktif';
        return {
          ...item,
          status: nextStatus,
          syncFrontend: nextStatus === 'Aktif'
        };
      }
      return item;
    });
    setRegulasiList(updatedList);
    persist(newsList, agendaList, packagesList, updatedList);
  };

  // SOP ACTIONS
  const addSop = (sop: Omit<SopItem, 'id' | 'syncFrontend'>) => {
    const newEntry: SopItem = {
      ...sop,
      id: `SOP-${Date.now().toString().slice(-4)}`,
      syncFrontend: sop.status === 'Berlaku'
    };
    const updated = [newEntry, ...sopList];
    setSopList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, updated);
  };

  const updateSop = (id: string, updated: Partial<SopItem>) => {
    const updatedList = sopList.map((item) => {
      if (item.id === id) {
        const next = { ...item, ...updated };
        next.syncFrontend = next.status === 'Berlaku';
        return next;
      }
      return item;
    });
    setSopList(updatedList);
    persist(newsList, agendaList, packagesList, regulasiList, updatedList);
  };

  const deleteSop = (id: string) => {
    const updated = sopList.filter((item) => item.id !== id);
    setSopList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, updated);
  };

  // SITE SETTINGS ACTIONS
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings };
    setSiteSettings(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, updated);
  };

  // RESET TO DEFAULT
  const resetToDefaults = () => {
    setNewsList(DEFAULT_NEWS);
    setAgendaList(DEFAULT_AGENDAS);
    setPackagesList(DEFAULT_PACKAGES);
    setRegulasiList(DEFAULT_REGULASI);
    setSopList(DEFAULT_SOP);
    setSiteSettings(DEFAULT_SETTINGS);
    persist(DEFAULT_NEWS, DEFAULT_AGENDAS, DEFAULT_PACKAGES, DEFAULT_REGULASI, DEFAULT_SOP, DEFAULT_SETTINGS);
  };

  return (
    <DataContext.Provider
      value={{
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
        updatePackage,
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
        resetToDefaults,
        isLoaded
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
