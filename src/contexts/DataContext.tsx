"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: string;
  status: 'Terjadwal' | 'Berlangsung' | 'Selesai' | 'Dibatalkan';
  imageUrl?: string;
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
  fileName?: string;
  fileSize?: string;
  fileData?: string;
  downloadUrl?: string;
}

export interface RegulasiItem {
  id: string;
  nomor: string;
  tentang: string;
  tahun: string;
  kategori: 'Peraturan Menteri' | 'Peraturan LKPP' | 'Keputusan Menteri' | 'Surat Edaran' | 'Undang-Undang' | 'Peraturan Pemerintah';
  fileSize: string;
  fileName?: string;
  fileData?: string;
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
  fileName?: string;
  fileSize?: string;
  fileData?: string;
  kategori?: 'tata-kelola' | 'perencanaan' | 'pemilihan' | 'kontrak' | 'kinerja' | 'risiko';
  deskripsi?: string;
  status: 'Berlaku' | 'Dalam Revisi' | 'Draft';
  syncFrontend: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  src: string;
  date: string;
  size?: 'large' | 'small';
  syncFrontend: boolean;
}

export interface VideoMediaItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  duration: string;
  date: string;
  views: string;
  thumbnailUrl: string;
  url: string;
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

  // Photos Gallery
  photosList: PhotoItem[];
  addPhoto: (photo: Omit<PhotoItem, 'id' | 'syncFrontend'>) => void;
  updatePhoto: (id: string, updated: Partial<PhotoItem>) => void;
  deletePhoto: (id: string) => void;

  // Videos Media
  videosList: VideoMediaItem[];
  addVideo: (video: Omit<VideoMediaItem, 'id' | 'syncFrontend'>) => void;
  updateVideo: (id: string, updated: Partial<VideoMediaItem>) => void;
  deleteVideo: (id: string) => void;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Database actions
  refreshFromSupabase: () => Promise<void>;
  resetToDefaults: () => void;
  isLoaded: boolean;
  isSupabaseConnected: boolean;
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
    title: 'Implementasi E-Katalog V6 untuk Percepatan Transaksi Belanja Sektoral',
    category: 'Berita PBJ',
    author: 'Tim Transformasi Digital PBJ',
    date: '01 Agu 2026',
    views: 1120,
    status: 'Published',
    excerpt: 'Optimalisasi sistem katalog elektronik versi 6 guna mempermudah satuan kerja dalam memilih produk terverifikasi LKPP.',
    content: 'Penerapan e-Katalog V6 mempercepat siklus pengadaan barang/jasa pemerintah dengan efisiensi waktu hingga 60%.',
    imageUrl: '/news/news-1.png',
    syncFrontend: true
  },
  {
    id: 'NWS-005',
    title: 'Penandatanganan Pakta Integritas Pejabat Pembuat Komitmen Tahun 2026',
    category: 'Siaran Pers',
    author: 'Inspektorat Jenderal Kemnaker',
    date: '28 Jul 2026',
    views: 780,
    status: 'Published',
    excerpt: 'Komitmen bersama seluruh PPK untuk menjaga transparansi, netralitas, dan akuntabilitas pengelolaan anggaran.',
    content: 'Seluruh Pejabat Pembuat Komitmen Kemnaker menandatangani pakta integritas sebagai komitmen anti-korupsi dalam proses pengadaan.',
    imageUrl: '/news/news-2.png',
    syncFrontend: true
  },
  {
    id: 'NWS-006',
    title: 'Draf Rencana Pengadaan Peralatan Pelatihan Balai Vokasi Tahun 2027',
    category: 'Siaran Pers',
    author: 'Ditjen Binalavotas',
    date: '20 Jul 2026',
    views: 310,
    status: 'Draft',
    excerpt: 'Rancangan awal spesifikasi teknis dan analisis kebutuhan alat kerja laboratorium vokasi.',
    content: 'Draft internal persiapan Rencana Umum Pengadaan (SiRUP) tahun anggaran mendatang.',
    imageUrl: '/news/news-3.png',
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
    imageUrl: '/poster_kegiatan.jpg',
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
    fileName: 'KAK-Konsultan-Portal-UKPBJ.pdf',
    fileSize: '2.4 MB',
    downloadUrl: '#',
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
    fileName: 'Dokumen-Pemilihan-Peralatan-Workshop.pdf',
    fileSize: '3.8 MB',
    downloadUrl: '#',
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
    fileName: 'Spesifikasi-Pengawasan-Renovasi.pdf',
    fileSize: '1.9 MB',
    downloadUrl: '#',
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
    fileName: 'Rincian-Lisensi-Firewall-SPSE.pdf',
    fileSize: '1.2 MB',
    downloadUrl: '#',
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
    fileName: 'Kerangka-Acuan-Kerja-Cleaning-Security.pdf',
    fileSize: '2.1 MB',
    downloadUrl: '#',
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
    kategori: 'perencanaan',
    fileSize: '2.4 MB',
    fileName: 'SOP-Perencanaan-RUP-2026.pdf',
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
    kategori: 'pemilihan',
    fileSize: '1.8 MB',
    fileName: 'SOP-E-Purchasing-2026.pdf',
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
    kategori: 'pemilihan',
    fileSize: '3.2 MB',
    fileName: 'SOP-Tender-SPSE-2026.pdf',
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
    kategori: 'risiko',
    fileSize: '1.5 MB',
    fileName: 'SOP-Clearing-House-2026.pdf',
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
    kategori: 'kontrak',
    fileSize: '2.1 MB',
    fileName: 'SOP-BAST-Evaluasi-Vendor.pdf',
    downloadUrl: '#',
    status: 'Berlaku',
    syncFrontend: true
  }
];

const DEFAULT_PHOTOS: PhotoItem[] = [
  { id: 'PHO-001', title: 'Kunjungan Kerja Pimpinan UKPBJ', desc: 'Kunjungan dan koordinasi pimpinan dengan jajaran pengurus UKPBJ kementerian.', category: 'Kunjungan Kerja', size: 'large', src: '/gallery/gallery-1.jpg', date: '25 Agu 2026', syncFrontend: true },
  { id: 'PHO-002', title: 'Rapat Koordinasi Nasional PBJ', desc: 'Rapat koordinasi pimpinan mengenai evaluasi kinerja tahunan pengadaan barang/jasa.', category: 'Rapat Koordinasi', size: 'large', src: '/gallery/gallery-2.jpg', date: '18 Agu 2026', syncFrontend: true },
  { id: 'PHO-003', title: 'Sosialisasi Tata Kelola Pengadaan', desc: 'Acara sosialisasi dan interaksi langsung dengan seluruh peserta stakeholder.', category: 'Sosialisasi', size: 'large', src: '/gallery/gallery-3.jpg', date: '10 Agu 2026', syncFrontend: true },
  { id: 'PHO-004', title: 'Bimbingan Teknis PPK & Pokja', desc: 'Pelatihan kompetensi pengadaan barang dan jasa untuk PPK dan Pokja Pemilihan.', category: 'Bimtek', size: 'small', src: '/gallery/gallery-4.jpg', date: '02 Agu 2026', syncFrontend: true },
  { id: 'PHO-005', title: 'Penandatanganan Kontrak Strategis', desc: 'Penandatanganan pakta integritas dan kontrak kerja sama strategis.', category: 'Kontrak Kerja', size: 'small', src: '/gallery/gallery-5.jpg', date: '26 Jul 2026', syncFrontend: true },
  { id: 'PHO-006', title: 'Rapat Evaluasi & Monitoring Berkala', desc: 'Sesi monitoring dan evaluasi target penyerapan anggaran pengadaan.', category: 'Monitoring', size: 'small', src: '/gallery/gallery-6.jpg', date: '15 Jul 2026', syncFrontend: true },
];

const DEFAULT_VIDEOS: VideoMediaItem[] = [
  {
    id: 'VID-001',
    title: 'Sosialisasi & Tata Cara Pengadaan Barang/Jasa Sesuai Perpres No. 12 Tahun 2021',
    desc: 'Penjelasan komprehensif mengenai kebijakan tata kelola, mitigasi risiko pengadaan, dan kewajiban penggunaan produk dalam negeri (P3DN).',
    category: 'Sosialisasi Regulasi',
    duration: '18:45',
    date: '28 Agu 2026',
    views: '1.4K x ditonton',
    thumbnailUrl: '/gallery/gallery-1.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
    syncFrontend: true
  },
  {
    id: 'VID-002',
    title: 'Tutorial Lengkap Penginputan RUP pada SiRUP & Pemanfaatan E-Katalog Nasional LKPP',
    desc: 'Panduan teknis langkah demi langkah pengisian rencana umum pengadaan dan transaksi e-purchasing bagi Pejabat Pembuat Komitmen (PPK).',
    category: 'Tutorial & Juknis',
    duration: '14:20',
    date: '15 Agu 2026',
    views: '2.8K x ditonton',
    thumbnailUrl: '/gallery/gallery-2.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
    syncFrontend: true
  },
  {
    id: 'VID-003',
    title: 'Highlight Rakornas UKPBJ Kemnaker RI 2026: Akselerasi Transformasi Digital Pengadaan',
    desc: 'Dokumentasi rangkuman sesi panel, arahan Menteri Ketenagakerjaan, dan pemberian penghargaan UKPBJ Berprestasi Tingkat Nasional.',
    category: 'Dokumentasi Rakornas',
    duration: '09:15',
    date: '05 Agu 2026',
    views: '3.1K x ditonton',
    thumbnailUrl: '/gallery/gallery-3.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
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
  const [photosList, setPhotosList] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [videosList, setVideosList] = useState<VideoMediaItem[]>(DEFAULT_VIDEOS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Local storage save helper
  const saveToLocal = (data: Record<string, unknown>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  // Sync / Fetch data from Supabase PostgreSQL
  const refreshFromSupabase = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data');
      if (!res.ok) throw new Error('API fetch failed');
      const json = await res.json();

      if (json.success && json.data) {
        const {
          news,
          agendas,
          procurement_packages,
          regulasi,
          sop,
          gallery_photos,
          gallery_videos,
          site_settings
        } = json.data;

        if (Array.isArray(news)) {
          const mappedNews: NewsItem[] = news.map((n: {
            id: string;
            title: string;
            category: NewsItem['category'];
            author?: string;
            date?: string;
            views?: number;
            status?: NewsItem['status'];
            excerpt?: string;
            content?: string;
            image_url?: string;
            sync_frontend?: boolean;
          }) => ({
            id: n.id,
            title: n.title,
            category: n.category,
            author: n.author || 'Admin UKPBJ',
            date: n.date ? (typeof n.date === 'string' && n.date.includes('T') ? new Date(n.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : n.date) : '2026',
            views: n.views || 0,
            status: n.status || 'Published',
            excerpt: n.excerpt || '',
            content: n.content || '',
            imageUrl: n.image_url || '/news/news-1.png',
            syncFrontend: n.sync_frontend ?? true
          }));
          setNewsList(mappedNews);
        }

        if (Array.isArray(agendas)) {
          const mappedAgendas: AgendaItem[] = agendas.map((a: {
            id: string;
            title: string;
            category: AgendaItem['category'];
            date: string;
            time: string;
            location: string;
            organizer: string;
            capacity: string;
            status: AgendaItem['status'];
            image_url?: string;
            imageUrl?: string;
            sync_frontend?: boolean;
          }) => ({
            id: a.id,
            title: a.title,
            category: a.category,
            date: a.date,
            time: a.time,
            location: a.location,
            organizer: a.organizer,
            capacity: a.capacity,
            status: a.status,
            imageUrl: a.image_url || a.imageUrl,
            syncFrontend: a.sync_frontend ?? true
          }));
          setAgendaList(mappedAgendas);
        }

        if (Array.isArray(procurement_packages)) {
          const mappedPkgs: ProcurementPackage[] = procurement_packages.map((p: {
            id: string;
            code: string;
            title: string;
            unit: string;
            hps: string;
            category: ProcurementPackage['category'];
            status: ProcurementPackage['status'];
            deadline: string;
            method: string;
            doc_count?: number;
            description?: string;
            file_name?: string;
            file_size?: string;
            file_url?: string;
          }) => ({
            id: p.id,
            code: p.code,
            title: p.title,
            unit: p.unit,
            hps: p.hps,
            category: p.category,
            status: p.status,
            deadline: p.deadline,
            method: p.method,
            docCount: p.doc_count ?? 1,
            desc: p.description,
            fileName: p.file_name,
            fileSize: p.file_size,
            downloadUrl: p.file_url || '#'
          }));
          setPackagesList(mappedPkgs);
        }

        if (Array.isArray(regulasi)) {
          const mappedReg: RegulasiItem[] = regulasi.map((r: {
            id: string;
            nomor: string;
            tentang: string;
            tahun: string;
            kategori: RegulasiItem['kategori'];
            file_size: string;
            download_url?: string;
            status: RegulasiItem['status'];
            sync_frontend?: boolean;
          }) => ({
            id: r.id,
            nomor: r.nomor,
            tentang: r.tentang,
            tahun: r.tahun,
            kategori: r.kategori,
            fileSize: r.file_size,
            downloadUrl: r.download_url || '#',
            status: r.status,
            syncFrontend: r.sync_frontend ?? true
          }));
          setRegulasiList(mappedReg);
        }

        if (Array.isArray(sop)) {
          const mappedSop: SopItem[] = sop.map((s: {
            id: string;
            kode: string;
            judul: string;
            unit: string;
            revisi: string;
            tahapan_count?: number;
            download_url?: string;
            file_name?: string;
            file_size?: string;
            kategori?: SopItem['kategori'];
            deskripsi?: string;
            status: SopItem['status'];
            sync_frontend?: boolean;
          }) => ({
            id: s.id,
            kode: s.kode,
            judul: s.judul,
            unit: s.unit,
            revisi: s.revisi,
            tahapanCount: s.tahapan_count ?? 5,
            downloadUrl: s.download_url || '#',
            fileName: s.file_name,
            fileSize: s.file_size,
            kategori: s.kategori,
            deskripsi: s.deskripsi,
            status: s.status,
            syncFrontend: s.sync_frontend ?? true
          }));
          setSopList(mappedSop);
        }

        if (Array.isArray(gallery_photos)) {
          const mappedPhotos: PhotoItem[] = gallery_photos.map((p: {
            id: string;
            title: string;
            description?: string;
            category: string;
            src: string;
            date: string;
            size?: 'large' | 'small';
            sync_frontend?: boolean;
          }) => ({
            id: p.id,
            title: p.title,
            desc: p.description || '',
            category: p.category,
            src: p.src,
            date: p.date,
            size: p.size,
            syncFrontend: p.sync_frontend ?? true
          }));
          setPhotosList(mappedPhotos);
        }

        if (Array.isArray(gallery_videos)) {
          const mappedVideos: VideoMediaItem[] = gallery_videos.map((v: {
            id: string;
            title: string;
            description?: string;
            category: string;
            duration: string;
            date: string;
            views: string;
            thumbnail_url: string;
            url: string;
            sync_frontend?: boolean;
          }) => ({
            id: v.id,
            title: v.title,
            desc: v.description || '',
            category: v.category,
            duration: v.duration,
            date: v.date,
            views: v.views,
            thumbnailUrl: v.thumbnail_url,
            url: v.url,
            syncFrontend: v.sync_frontend ?? true
          }));
          setVideosList(mappedVideos);
        }

        if (site_settings) {
          setSiteSettings({
            announcementBanner: site_settings.announcement_banner,
            announcementActive: site_settings.announcement_active,
            serverStatus: site_settings.server_status,
            emergencyNotice: site_settings.emergency_notice || ''
          });
        }

        setIsSupabaseConnected(true);
      }
    } catch (err) {
      console.warn('Database sync fetch failed, using cached snapshot:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Initial load from LocalStorage fallback and then Supabase
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.newsList)) setNewsList(parsed.newsList);
        if (Array.isArray(parsed.agendaList)) setAgendaList(parsed.agendaList);
        if (Array.isArray(parsed.packagesList)) setPackagesList(parsed.packagesList);
        if (Array.isArray(parsed.regulasiList)) setRegulasiList(parsed.regulasiList);
        if (Array.isArray(parsed.sopList)) setSopList(parsed.sopList);
        if (Array.isArray(parsed.photosList)) setPhotosList(parsed.photosList);
        if (Array.isArray(parsed.videosList)) setVideosList(parsed.videosList);
        if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
      }
    } catch (e) {
      console.error('Failed to load LocalStorage fallback', e);
    }

    refreshFromSupabase();
  }, [refreshFromSupabase]);

  // Persist snapshot to LocalStorage
  const persist = (
    newNews = newsList,
    newAgenda = agendaList,
    newPkgs = packagesList,
    newRegulasi = regulasiList,
    newSop = sopList,
    newPhotos = photosList,
    newVideos = videosList,
    newSettings = siteSettings
  ) => {
    saveToLocal({
      newsList: newNews,
      agendaList: newAgenda,
      packagesList: newPkgs,
      regulasiList: newRegulasi,
      sopList: newSop,
      photosList: newPhotos,
      videosList: newVideos,
      siteSettings: newSettings,
      updatedAt: new Date().toISOString()
    });
  };

  // Helper to sync changes with server-side admin API (bypasses RLS)
  const syncAdminData = async (
    table: string,
    action: 'insert' | 'update' | 'delete' | 'upsert',
    payload?: { id?: string; data?: Record<string, unknown> }
  ) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table,
          action,
          id: payload?.id,
          data: payload?.data
        })
      });
      return await res.json();
    } catch (err) {
      console.error(`syncAdminData failed for table "${table}":`, err);
      return { success: false, error: err };
    }
  };

  // ==========================================
  // NEWS CRUD & SUPABASE SYNC
  // ==========================================
  const addNews = async (news: Omit<NewsItem, 'id' | 'views' | 'date' | 'syncFrontend'>) => {
    const tempId = `NWS-${Date.now().toString().slice(-4)}`;
    const newEntry: NewsItem = {
      ...news,
      id: tempId,
      views: 1,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      syncFrontend: news.status === 'Published'
    };

    const updated = [newEntry, ...newsList];
    setNewsList(updated);
    persist(updated);

    const res = await syncAdminData('news', 'insert', {
      data: {
        title: news.title,
        category: news.category,
        author: news.author,
        status: news.status,
        excerpt: news.excerpt,
        content: news.content,
        image_url: news.imageUrl || '/news/news-1.png',
        sync_frontend: news.status === 'Published'
      }
    });

    if (res?.success && res.data) {
      setNewsList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updateNews = async (id: string, updated: Partial<NewsItem>) => {
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

    await syncAdminData('news', 'update', {
      id,
      data: {
        title: updated.title,
        category: updated.category,
        author: updated.author,
        status: updated.status,
        excerpt: updated.excerpt,
        content: updated.content,
        image_url: updated.imageUrl,
        sync_frontend: updated.status === 'Published'
      }
    });
  };

  const deleteNews = async (id: string) => {
    const updated = newsList.filter((item) => item.id !== id);
    setNewsList(updated);
    persist(updated);

    await syncAdminData('news', 'delete', { id });
  };

  const toggleNewsStatus = async (id: string) => {
    const target = newsList.find((n) => n.id === id);
    if (!target) return;
    const nextStatus: NewsItem['status'] = target.status === 'Published' ? 'Draft' : 'Published';

    const updatedList = newsList.map((item) =>
      item.id === id ? { ...item, status: nextStatus, syncFrontend: nextStatus === 'Published' } : item
    );
    setNewsList(updatedList);
    persist(updatedList);

    await syncAdminData('news', 'update', {
      id,
      data: {
        status: nextStatus,
        sync_frontend: nextStatus === 'Published'
      }
    });
  };

  // ==========================================
  // AGENDA CRUD & SUPABASE SYNC
  // ==========================================
  const addAgenda = async (agenda: Omit<AgendaItem, 'id' | 'syncFrontend'>) => {
    const tempId = `AGD-${Date.now().toString().slice(-4)}`;
    const newEntry: AgendaItem = {
      ...agenda,
      id: tempId,
      syncFrontend: true
    };
    const updated = [newEntry, ...agendaList];
    setAgendaList(updated);
    persist(newsList, updated);

    const res = await syncAdminData('agendas', 'insert', {
      data: {
        title: agenda.title,
        category: agenda.category,
        date: agenda.date,
        time: agenda.time,
        location: agenda.location,
        organizer: agenda.organizer,
        capacity: agenda.capacity,
        status: agenda.status,
        image_url: agenda.imageUrl,
        sync_frontend: true
      }
    });

    if (res?.success && res.data) {
      setAgendaList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updateAgenda = async (id: string, updated: Partial<AgendaItem>) => {
    const updatedList = agendaList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setAgendaList(updatedList);
    persist(newsList, updatedList);

    await syncAdminData('agendas', 'update', {
      id,
      data: {
        title: updated.title,
        category: updated.category,
        date: updated.date,
        time: updated.time,
        location: updated.location,
        organizer: updated.organizer,
        capacity: updated.capacity,
        status: updated.status,
        image_url: updated.imageUrl
      }
    });
  };

  const deleteAgenda = async (id: string) => {
    const updated = agendaList.filter((item) => item.id !== id);
    setAgendaList(updated);
    persist(newsList, updated);

    await syncAdminData('agendas', 'delete', { id });
  };

  // ==========================================
  // PROCUREMENT PACKAGES CRUD & SUPABASE SYNC
  // ==========================================
  const addPackage = async (pkg: Omit<ProcurementPackage, 'id'>) => {
    const tempId = `PKG-${Date.now().toString().slice(-4)}`;
    const newEntry: ProcurementPackage = {
      ...pkg,
      id: tempId
    };
    const updated = [newEntry, ...packagesList];
    setPackagesList(updated);
    persist(newsList, agendaList, updated);

    const res = await syncAdminData('procurement_packages', 'insert', {
      data: {
        code: pkg.code,
        title: pkg.title,
        unit: pkg.unit,
        hps: pkg.hps,
        category: pkg.category,
        status: pkg.status,
        deadline: pkg.deadline,
        method: pkg.method,
        doc_count: pkg.docCount || 1,
        description: pkg.desc,
        file_name: pkg.fileName,
        file_size: pkg.fileSize,
        file_url: pkg.downloadUrl
      }
    });

    if (res?.success && res.data) {
      setPackagesList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updatePackage = async (id: string, updated: Partial<ProcurementPackage>) => {
    const updatedList = packagesList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setPackagesList(updatedList);
    persist(newsList, agendaList, updatedList);

    await syncAdminData('procurement_packages', 'update', {
      id,
      data: {
        code: updated.code,
        title: updated.title,
        unit: updated.unit,
        hps: updated.hps,
        category: updated.category,
        status: updated.status,
        deadline: updated.deadline,
        method: updated.method,
        doc_count: updated.docCount,
        description: updated.desc,
        file_name: updated.fileName,
        file_size: updated.fileSize,
        file_url: updated.downloadUrl
      }
    });
  };

  const deletePackage = async (id: string) => {
    const updated = packagesList.filter((item) => item.id !== id);
    setPackagesList(updated);
    persist(newsList, agendaList, updated);

    await syncAdminData('procurement_packages', 'delete', { id });
  };

  // ==========================================
  // REGULASI CRUD & SUPABASE SYNC
  // ==========================================
  const addRegulasi = async (reg: Omit<RegulasiItem, 'id' | 'syncFrontend'>) => {
    const tempId = `REG-${Date.now().toString().slice(-4)}`;
    const newEntry: RegulasiItem = {
      ...reg,
      id: tempId,
      syncFrontend: reg.status === 'Aktif'
    };
    const updated = [newEntry, ...regulasiList];
    setRegulasiList(updated);
    persist(newsList, agendaList, packagesList, updated);

    const res = await syncAdminData('regulasi', 'insert', {
      data: {
        nomor: reg.nomor,
        tentang: reg.tentang,
        tahun: reg.tahun,
        kategori: reg.kategori,
        file_size: reg.fileSize,
        download_url: reg.downloadUrl,
        status: reg.status,
        sync_frontend: reg.status === 'Aktif'
      }
    });

    if (res?.success && res.data) {
      setRegulasiList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updateRegulasi = async (id: string, updated: Partial<RegulasiItem>) => {
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

    await syncAdminData('regulasi', 'update', {
      id,
      data: {
        nomor: updated.nomor,
        tentang: updated.tentang,
        tahun: updated.tahun,
        kategori: updated.kategori,
        file_size: updated.fileSize,
        download_url: updated.downloadUrl,
        status: updated.status,
        sync_frontend: updated.status === 'Aktif'
      }
    });
  };

  const deleteRegulasi = async (id: string) => {
    const updated = regulasiList.filter((item) => item.id !== id);
    setRegulasiList(updated);
    persist(newsList, agendaList, packagesList, updated);

    await syncAdminData('regulasi', 'delete', { id });
  };

  const toggleRegulasiStatus = async (id: string) => {
    const target = regulasiList.find((r) => r.id === id);
    if (!target) return;
    const nextStatus: RegulasiItem['status'] = target.status === 'Aktif' ? 'Draft' : 'Aktif';

    const updatedList = regulasiList.map((item) =>
      item.id === id ? { ...item, status: nextStatus, syncFrontend: nextStatus === 'Aktif' } : item
    );
    setRegulasiList(updatedList);
    persist(newsList, agendaList, packagesList, updatedList);

    await syncAdminData('regulasi', 'update', {
      id,
      data: {
        status: nextStatus,
        sync_frontend: nextStatus === 'Aktif'
      }
    });
  };

  // ==========================================
  // SOP CRUD & SUPABASE SYNC
  // ==========================================
  const addSop = async (sop: Omit<SopItem, 'id' | 'syncFrontend'>) => {
    const tempId = `SOP-${Date.now().toString().slice(-4)}`;
    const newEntry: SopItem = {
      ...sop,
      id: tempId,
      syncFrontend: sop.status === 'Berlaku'
    };
    const updated = [newEntry, ...sopList];
    setSopList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, updated);

    const res = await syncAdminData('sop', 'insert', {
      data: {
        kode: sop.kode,
        judul: sop.judul,
        unit: sop.unit,
        revisi: sop.revisi,
        tahapan_count: sop.tahapanCount || 5,
        download_url: sop.downloadUrl,
        file_name: sop.fileName,
        file_size: sop.fileSize,
        kategori: sop.kategori,
        deskripsi: sop.deskripsi,
        status: sop.status,
        sync_frontend: sop.status === 'Berlaku'
      }
    });

    if (res?.success && res.data) {
      setSopList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updateSop = async (id: string, updated: Partial<SopItem>) => {
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

    await syncAdminData('sop', 'update', {
      id,
      data: {
        kode: updated.kode,
        judul: updated.judul,
        unit: updated.unit,
        revisi: updated.revisi,
        tahapan_count: updated.tahapanCount,
        download_url: updated.downloadUrl,
        file_name: updated.fileName,
        file_size: updated.fileSize,
        kategori: updated.kategori,
        deskripsi: updated.deskripsi,
        status: updated.status,
        sync_frontend: updated.status === 'Berlaku'
      }
    });
  };

  const deleteSop = async (id: string) => {
    const updated = sopList.filter((item) => item.id !== id);
    setSopList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, updated);

    await syncAdminData('sop', 'delete', { id });
  };

  // ==========================================
  // PHOTOS GALLERY CRUD & SUPABASE SYNC
  // ==========================================
  const addPhoto = async (photo: Omit<PhotoItem, 'id' | 'syncFrontend'>) => {
    const tempId = `PHO-${Date.now().toString().slice(-4)}`;
    const newEntry: PhotoItem = {
      ...photo,
      id: tempId,
      syncFrontend: true
    };
    const updated = [newEntry, ...photosList];
    setPhotosList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, updated);

    const res = await syncAdminData('gallery_photos', 'insert', {
      data: {
        title: photo.title,
        description: photo.desc,
        category: photo.category,
        src: photo.src,
        date: photo.date,
        size: photo.size || 'small',
        sync_frontend: true
      }
    });

    if (res?.success && res.data) {
      setPhotosList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updatePhoto = async (id: string, updated: Partial<PhotoItem>) => {
    const updatedList = photosList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setPhotosList(updatedList);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, updatedList);

    await syncAdminData('gallery_photos', 'update', {
      id,
      data: {
        title: updated.title,
        description: updated.desc,
        category: updated.category,
        src: updated.src,
        date: updated.date,
        size: updated.size
      }
    });
  };

  const deletePhoto = async (id: string) => {
    const updated = photosList.filter((item) => item.id !== id);
    setPhotosList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, updated);

    await syncAdminData('gallery_photos', 'delete', { id });
  };

  // ==========================================
  // VIDEOS GALLERY CRUD & SUPABASE SYNC
  // ==========================================
  const addVideo = async (video: Omit<VideoMediaItem, 'id' | 'syncFrontend'>) => {
    const tempId = `VID-${Date.now().toString().slice(-4)}`;
    const newEntry: VideoMediaItem = {
      ...video,
      id: tempId,
      syncFrontend: true
    };
    const updated = [newEntry, ...videosList];
    setVideosList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, photosList, updated);

    const res = await syncAdminData('gallery_videos', 'insert', {
      data: {
        title: video.title,
        description: video.desc,
        category: video.category,
        duration: video.duration,
        date: video.date,
        views: video.views,
        thumbnail_url: video.thumbnailUrl,
        url: video.url,
        sync_frontend: true
      }
    });

    if (res?.success && res.data) {
      setVideosList((prev) => prev.map((item) => (item.id === tempId ? { ...item, id: res.data.id } : item)));
    }
  };

  const updateVideo = async (id: string, updated: Partial<VideoMediaItem>) => {
    const updatedList = videosList.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setVideosList(updatedList);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, photosList, updatedList);

    await syncAdminData('gallery_videos', 'update', {
      id,
      data: {
        title: updated.title,
        description: updated.desc,
        category: updated.category,
        duration: updated.duration,
        date: updated.date,
        views: updated.views,
        thumbnail_url: updated.thumbnailUrl,
        url: updated.url
      }
    });
  };

  const deleteVideo = async (id: string) => {
    const updated = videosList.filter((item) => item.id !== id);
    setVideosList(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, photosList, updated);

    await syncAdminData('gallery_videos', 'delete', { id });
  };

  // ==========================================
  // SITE SETTINGS & SUPABASE SYNC
  // ==========================================
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings };
    setSiteSettings(updated);
    persist(newsList, agendaList, packagesList, regulasiList, sopList, photosList, videosList, updated);

    await syncAdminData('site_settings', 'upsert', {
      data: {
        id: 'global_config',
        announcement_banner: updated.announcementBanner,
        announcement_active: updated.announcementActive,
        server_status: updated.serverStatus,
        emergency_notice: updated.emergencyNotice,
        updated_at: new Date().toISOString()
      }
    });
  };

  // ==========================================
  // RESET TO DEFAULT
  // ==========================================
  const resetToDefaults = () => {
    setNewsList(DEFAULT_NEWS);
    setAgendaList(DEFAULT_AGENDAS);
    setPackagesList(DEFAULT_PACKAGES);
    setRegulasiList(DEFAULT_REGULASI);
    setSopList(DEFAULT_SOP);
    setPhotosList(DEFAULT_PHOTOS);
    setVideosList(DEFAULT_VIDEOS);
    setSiteSettings(DEFAULT_SETTINGS);
    persist(DEFAULT_NEWS, DEFAULT_AGENDAS, DEFAULT_PACKAGES, DEFAULT_REGULASI, DEFAULT_SOP, DEFAULT_PHOTOS, DEFAULT_VIDEOS, DEFAULT_SETTINGS);
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
        refreshFromSupabase,
        resetToDefaults,
        isLoaded,
        isSupabaseConnected
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
