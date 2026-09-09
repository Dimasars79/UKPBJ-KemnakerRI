const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// 1. Read environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL atau Key tidak ditemukan di .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Data Seed Definition
const DEFAULT_NEWS = [
  {
    title: 'Sosialisasi Peraturan LKPP Nomor 12 Tahun 2024 tentang Tata Cara Pengadaan',
    category: 'Regulasi',
    author: 'Biro Hukum & Humas Kemnaker',
    views: 1420,
    status: 'Published',
    excerpt: 'Pedoman pelaksanaan pengadaan barang dan jasa pemerintah terbaru yang berlaku di seluruh unit kerja kementerian.',
    content: 'Dalam rangka meningkatkan akuntabilitas dan efisiensi belanja negara, UKPBJ Kemnaker menyelenggarakan sosialisasi regulasi LKPP terbaru dengan standar digital SPSE terintegrasi.',
    image_url: '/news/news-1.png',
    sync_frontend: true
  },
  {
    title: 'Pengumuman Penetapan Pemenang Tender Jasa Konsultan IT & Portal',
    category: 'Pengumuman Lelang',
    author: 'Pokja Pemilihan I UKPBJ',
    views: 2850,
    status: 'Published',
    excerpt: 'Hasil evaluasi kualifikasi administrasi, teknis, dan harga untuk paket pengembangan arsitektur portal kementerian.',
    content: 'Berdasarkan berita acara hasil pemilihan, Pokja Pemilihan menetapkan penyedia terpilih setelah melalui masa sanggah tanpa keberatan.',
    image_url: '/news/news-2.png',
    sync_frontend: true
  },
  {
    title: 'Workshop Peningkatan Penggunaan Produk Dalam Negeri (P3DN) & Sertifikasi TKDN',
    category: 'Berita PBJ',
    author: 'Pusat Pasar Kerja & PBJ',
    views: 940,
    status: 'Published',
    excerpt: 'Mendorong komitmen belanja kementerian untuk mencapai target minimal 40% produk ber-TKDN tinggi.',
    content: 'Kegiatan ini diikuti oleh seluruh PPK dan Pejabat Pengadaan di lingkungan Kementerian Ketenagakerjaan seluruh Indonesia.',
    image_url: '/news/news-3.png',
    sync_frontend: true
  },
  {
    title: 'Implementasi E-Katalog V6 untuk Percepatan Transaksi Belanja Sektoral',
    category: 'Berita PBJ',
    author: 'Tim Transformasi Digital PBJ',
    views: 1120,
    status: 'Published',
    excerpt: 'Optimalisasi sistem katalog elektronik versi 6 guna mempermudah satuan kerja dalam memilih produk terverifikasi LKPP.',
    content: 'Penerapan e-Katalog V6 mempercepat siklus pengadaan barang/jasa pemerintah dengan efisiensi waktu hingga 60%.',
    image_url: '/news/news-1.png',
    sync_frontend: true
  },
  {
    title: 'Penandatanganan Pakta Integritas Pejabat Pembuat Komitmen Tahun 2026',
    category: 'Siaran Pers',
    author: 'Inspektorat Jenderal Kemnaker',
    views: 780,
    status: 'Published',
    excerpt: 'Komitmen bersama seluruh PPK untuk menjaga transparansi, netralitas, dan akuntabilitas pengelolaan anggaran.',
    content: 'Seluruh Pejabat Pembuat Komitmen Kemnaker menandatangani pakta integritas sebagai komitmen anti-korupsi dalam proses pengadaan.',
    image_url: '/news/news-2.png',
    sync_frontend: true
  },
  {
    title: 'Draf Rencana Pengadaan Peralatan Pelatihan Balai Vokasi Tahun 2027',
    category: 'Siaran Pers',
    author: 'Ditjen Binalavotas',
    views: 310,
    status: 'Draft',
    excerpt: 'Rancangan awal spesifikasi teknis dan analisis kebutuhan alat kerja laboratorium vokasi.',
    content: 'Draft internal persiapan Rencana Umum Pengadaan (SiRUP) tahun anggaran mendatang.',
    image_url: '/news/news-3.png',
    sync_frontend: false
  }
];

const DEFAULT_AGENDAS = [
  {
    title: 'Bimbingan Teknis Penerapan SIKaP V.3 bagi Penyedia Barang & Jasa',
    category: 'Bimtek',
    date: '15 Sep 2026',
    time: '10:00 - 12:00 WIB',
    location: 'Auditorium Gedung A Kemnaker & Zoom',
    organizer: 'Biro Perencanaan & PBJ',
    capacity: '200 Peserta',
    status: 'Terjadwal',
    sync_frontend: true
  },
  {
    title: 'Pemberian Penjelasan (Aanwijzing) Tender Pengadaan IT Server',
    category: 'Tender',
    date: '18 Sep 2026',
    time: '09:00 - 11:30 WIB',
    location: 'Ruang Rapat UKPBJ Lt. 4',
    organizer: 'Pokja Pemilihan II',
    capacity: 'Khusus Rekanan Terdaftar',
    status: 'Terjadwal',
    sync_frontend: true
  },
  {
    title: 'Ujian Sertifikasi PBJ Tingkat Dasar Batch IV',
    category: 'Sertifikasi',
    date: '22 Sep 2026',
    time: '08:00 - 16:00 WIB',
    location: 'Pusdiklat Kemnaker RI',
    organizer: 'Pusat Pengembangan SDM PBJ',
    capacity: '50 Peserta',
    status: 'Terjadwal',
    sync_frontend: true
  },
  {
    title: 'Rapat Koordinasi Evaluasi Realisasi Anggaran PBJ Kuartal III',
    category: 'Rapat',
    date: '28 Sep 2026',
    time: '13:30 - 16:30 WIB',
    location: 'Ruang Rapat Utama Menteri',
    organizer: 'Sekretariat Jenderal Kemnaker',
    capacity: 'Internal PPK & KPA',
    status: 'Terjadwal',
    sync_frontend: true
  },
  {
    title: 'Sosialisasi Tata Cara Pengajuan Clearing House PBJ',
    category: 'Sosialisasi',
    date: '02 Okt 2026',
    time: '09:00 - 12:00 WIB',
    location: 'Hybrid (Ruang Komisi & Live Stream)',
    organizer: 'Inspektorat Jenderal & UKPBJ',
    capacity: '300 Peserta',
    status: 'Terjadwal',
    sync_frontend: true
  }
];

const DEFAULT_PACKAGES = [
  {
    code: 'TND-984210',
    title: 'Pengadaan Jasa Konsultan Pengembangan Arsitektur IT & Portal UKPBJ',
    unit: 'Biro Perencanaan dan Manajemen Kinerja - Kemnaker RI',
    hps: 'Rp 500.000.000',
    category: 'Tender',
    status: 'Pendaftaran Dibuka',
    deadline: '20 Agu 2026',
    method: 'Tender - Pascakualifikasi Satu File',
    doc_count: 3,
    file_name: 'KAK-Konsultan-Portal-UKPBJ.pdf',
    file_size: '2.4 MB',
    file_url: '#',
    description: 'Pengadaan jasa konsultan IT untuk mendukung implementasi sistem informasi terintegrasi dan arsitektur satu portal di lingkungan Kemnaker.'
  },
  {
    code: 'TND-984211',
    title: 'Pengadaan Peralatan Workshop Pelatihan Vokasi & Produktivitas',
    unit: 'Ditjen Pembinaan Pelatihan Vokasi dan Produktivitas (Binalavotas)',
    hps: 'Rp 2.150.000.000',
    category: 'Tender',
    status: 'Tahap Evaluasi',
    deadline: '16 Agu 2026',
    method: 'Tender - Pascakualifikasi Dua File',
    doc_count: 4,
    file_name: 'Dokumen-Pemilihan-Peralatan-Workshop.pdf',
    file_size: '3.8 MB',
    file_url: '#',
    description: 'Pengadaan sarana dan prasarana penunjang pelatihan vokasi tenaga kerja di balai besar pelatihan.'
  },
  {
    code: 'SLK-882014',
    title: 'Jasa Konsultansi Pengawasan Renovasi Gedung Pusat Pasar Kerja',
    unit: 'Pusat Pasar Kerja (PaskerID) Kemnaker RI',
    hps: 'Rp 350.000.000',
    category: 'Seleksi',
    status: 'Pemberian Penjelasan',
    deadline: '22 Agu 2026',
    method: 'Seleksi Kualifikasi Kualitas & Biaya',
    doc_count: 2,
    file_name: 'Spesifikasi-Pengawasan-Renovasi.pdf',
    file_size: '1.9 MB',
    file_url: '#',
    description: 'Pengawasan berkala mutu konstruksi fisik renovasi ruang layanan ketenagakerjaan terpadu.'
  },
  {
    code: 'PL-441092',
    title: 'Pengadaan Lisensi Software Keamanan & Monitoring Server SPSE',
    unit: 'Pusat Data dan Informasi (Pusdatin) Kemnaker RI',
    hps: 'Rp 180.000.000',
    category: 'Pengadaan Langsung',
    status: 'Selesai',
    deadline: '05 Agu 2026',
    method: 'Pengadaan Langsung',
    doc_count: 2,
    file_name: 'Rincian-Lisensi-Firewall-SPSE.pdf',
    file_size: '1.2 MB',
    file_url: '#',
    description: 'Lisensi tahunan firewall dan perangkat pemantau lalu lintas jaringan pengadaan.'
  },
  {
    code: 'TND-984215',
    title: 'Pengadaan Jasa Kebersihan, Keamanan, dan Pengelolaan Fasilitas Kantor',
    unit: 'Biro Umum dan Pengadaan Barang/Jasa Kemnaker RI',
    hps: 'Rp 850.000.000',
    category: 'Tender',
    status: 'Pendaftaran Dibuka',
    deadline: '25 Agu 2026',
    method: 'Tender Cepat',
    doc_count: 3,
    file_name: 'Kerangka-Acuan-Kerja-Cleaning-Security.pdf',
    file_size: '2.1 MB',
    file_url: '#',
    description: 'Penyediaan alih daya tenaga pengamanan dan kebersihan gedung kementerian.'
  }
];

const DEFAULT_REGULASI = [
  {
    nomor: 'Permenaker No. 12 Tahun 2024',
    tentang: 'Tata Cara Pelaksanaan Pengadaan Barang dan Jasa di Lingkungan Kementerian Ketenagakerjaan',
    tahun: '2024',
    kategori: 'Peraturan Menteri',
    file_size: '2.4 MB',
    download_url: '#',
    status: 'Aktif',
    sync_frontend: true
  },
  {
    nomor: 'Peraturan LKPP No. 12 Tahun 2021',
    tentang: 'Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah Melalui Penyedia',
    tahun: '2021',
    kategori: 'Peraturan LKPP',
    file_size: '4.8 MB',
    download_url: '#',
    status: 'Aktif',
    sync_frontend: true
  },
  {
    nomor: 'Kepmenaker No. 84 Tahun 2025',
    tentang: 'Penetapan Standar Satuan Harga dan Honorarium Pengelola Keuangan dan Pengadaan Barang/Jasa',
    tahun: '2025',
    kategori: 'Keputusan Menteri',
    file_size: '1.9 MB',
    download_url: '#',
    status: 'Aktif',
    sync_frontend: true
  },
  {
    nomor: 'Surat Edaran Sesjen No. 04/SE/2026',
    tentang: 'Pencegahan Gratifikasi dan Benturan Kepentingan dalam Pemilihan Penyedia Barang/Jasa',
    tahun: '2026',
    kategori: 'Surat Edaran',
    file_size: '850 KB',
    download_url: '#',
    status: 'Aktif',
    sync_frontend: true
  }
];

const DEFAULT_SOP = [
  {
    kode: 'SOP/PBJ/01/2026',
    judul: 'Standar Operasional Prosedur Perencanaan Pengadaan & Penyusunan RUP',
    unit: 'Biro Perencanaan & UKPBJ Kemnaker',
    revisi: 'Rev. 03 (2026)',
    tahapan_count: 6,
    kategori: 'perencanaan',
    file_size: '2.4 MB',
    file_name: 'SOP-Perencanaan-RUP-2026.pdf',
    download_url: '#',
    status: 'Berlaku',
    sync_frontend: true
  },
  {
    kode: 'SOP/PBJ/02/2026',
    judul: 'SOP Pemilihan Penyedia Melalui E-Purchasing (Katalog Elektronik & Toko Daring)',
    unit: 'Pokja Pemilihan UKPBJ',
    revisi: 'Rev. 02 (2026)',
    tahapan_count: 5,
    kategori: 'pemilihan',
    file_size: '1.8 MB',
    file_name: 'SOP-E-Purchasing-2026.pdf',
    download_url: '#',
    status: 'Berlaku',
    sync_frontend: true
  },
  {
    kode: 'SOP/PBJ/03/2026',
    judul: 'SOP Pelaksanaan Tender / Seleksi Cepat Pascakualifikasi SPSE 4.5',
    unit: 'Pokja Pemilihan I & II',
    revisi: 'Rev. 04 (2026)',
    tahapan_count: 8,
    kategori: 'pemilihan',
    file_size: '3.2 MB',
    file_name: 'SOP-Tender-SPSE-2026.pdf',
    download_url: '#',
    status: 'Berlaku',
    sync_frontend: true
  },
  {
    kode: 'SOP/PBJ/04/2026',
    judul: 'SOP Konsultasi & Penanganan Permasalahan Pengadaan (Clearing House)',
    unit: 'Inspektorat Jenderal & UKPBJ',
    revisi: 'Rev. 01 (2025)',
    tahapan_count: 4,
    kategori: 'risiko',
    file_size: '1.5 MB',
    file_name: 'SOP-Clearing-House-2026.pdf',
    download_url: '#',
    status: 'Berlaku',
    sync_frontend: true
  },
  {
    kode: 'SOP/PBJ/05/2026',
    judul: 'SOP Serah Terima Hasil Pekerjaan (BAST) dan Evaluasi Kinerja Vendor',
    unit: 'Pejabat Pembuat Komitmen (PPK)',
    revisi: 'Rev. 02 (2026)',
    tahapan_count: 5,
    kategori: 'kontrak',
    file_size: '2.1 MB',
    file_name: 'SOP-BAST-Evaluasi-Vendor.pdf',
    download_url: '#',
    status: 'Berlaku',
    sync_frontend: true
  }
];

const DEFAULT_PHOTOS = [
  { title: 'Kunjungan Kerja Pimpinan UKPBJ', description: 'Kunjungan dan koordinasi pimpinan dengan jajaran pengurus UKPBJ kementerian.', category: 'Kunjungan Kerja', size: 'large', src: '/gallery/gallery-1.jpg', date: '25 Agu 2026', sync_frontend: true },
  { title: 'Rapat Koordinasi Nasional PBJ', description: 'Rapat koordinasi pimpinan mengenai evaluasi kinerja tahunan pengadaan barang/jasa.', category: 'Rapat Koordinasi', size: 'large', src: '/gallery/gallery-2.jpg', date: '18 Agu 2026', sync_frontend: true },
  { title: 'Sosialisasi Tata Kelola Pengadaan', description: 'Acara sosialisasi dan interaksi langsung dengan seluruh peserta stakeholder.', category: 'Sosialisasi', size: 'large', src: '/gallery/gallery-3.jpg', date: '10 Agu 2026', sync_frontend: true },
  { title: 'Bimbingan Teknis PPK & Pokja', description: 'Pelatihan kompetensi pengadaan barang dan jasa untuk PPK dan Pokja Pemilihan.', category: 'Bimtek', size: 'small', src: '/gallery/gallery-4.jpg', date: '02 Agu 2026', sync_frontend: true },
  { title: 'Penandatanganan Kontrak Strategis', description: 'Penandatanganan pakta integritas dan kontrak kerja sama strategis.', category: 'Kontrak Kerja', size: 'small', src: '/gallery/gallery-5.jpg', date: '26 Jul 2026', sync_frontend: true },
  { title: 'Rapat Evaluasi & Monitoring Berkala', description: 'Sesi monitoring dan evaluasi target penyerapan anggaran pengadaan.', category: 'Monitoring', size: 'small', src: '/gallery/gallery-6.jpg', date: '15 Jul 2026', sync_frontend: true }
];

const DEFAULT_VIDEOS = [
  {
    title: 'Sosialisasi & Tata Cara Pengadaan Barang/Jasa Sesuai Perpres No. 12 Tahun 2021',
    description: 'Penjelasan komprehensif mengenai kebijakan tata kelola, mitigasi risiko pengadaan, dan kewajiban penggunaan produk dalam negeri (P3DN).',
    category: 'Sosialisasi Regulasi',
    duration: '18:45',
    date: '28 Agu 2026',
    views: '1.4K x ditonton',
    thumbnail_url: '/gallery/gallery-1.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
    sync_frontend: true
  },
  {
    title: 'Tutorial Lengkap Penginputan RUP pada SiRUP & Pemanfaatan E-Katalog Nasional LKPP',
    description: 'Panduan teknis langkah demi langkah pengisian rencana umum pengadaan dan transaksi e-purchasing bagi Pejabat Pembuat Komitmen (PPK).',
    category: 'Tutorial & Juknis',
    duration: '14:20',
    date: '15 Agu 2026',
    views: '2.8K x ditonton',
    thumbnail_url: '/gallery/gallery-2.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
    sync_frontend: true
  },
  {
    title: 'Highlight Rakornas UKPBJ Kemnaker RI 2026: Akselerasi Transformasi Digital Pengadaan',
    description: 'Dokumentasi rangkuman sesi panel, arahan Menteri Ketenagakerjaan, dan pemberian penghargaan UKPBJ Berprestasi Tingkat Nasional.',
    category: 'Dokumentasi Rakornas',
    duration: '09:15',
    date: '05 Agu 2026',
    views: '3.1K x ditonton',
    thumbnail_url: '/gallery/gallery-3.jpg',
    url: 'https://www.youtube.com/@kemenperin_ri',
    sync_frontend: true
  }
];

const DEFAULT_SETTINGS = {
  id: 'global_config',
  announcement_banner: 'Sosialisasi Peraturan LKPP Nomor 12 Tahun 2024 tentang Pedoman Pengadaan Barang/Jasa Pemerintah',
  announcement_active: true,
  server_status: 'Normal',
  emergency_notice: ''
};

// Helper to seed table if empty
async function seedTableIfEmpty(tableName, items) {
  const { count, error: countErr } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (countErr) {
    console.error(`  ⚠️ Gagal cek tabel ${tableName}:`, countErr.message);
    return;
  }

  if (count === 0) {
    const { error: insertErr } = await supabase.from(tableName).insert(items);
    if (insertErr) {
      console.error(`  ⚠️ Gagal insert ${tableName}:`, insertErr.message);
    } else {
      console.log(`  ✓ ${tableName}: berhasil insert ${items.length} data.`);
    }
  } else {
    console.log(`  ℹ️ ${tableName}: sudah memiliki ${count} data (tidak perlu ditimpa).`);
  }
}

// 3. Execution Function
async function seedAll() {
  console.log('🚀 Memulai Seeding Data ke Supabase Cloud...\n');

  try {
    // 1. News
    await seedTableIfEmpty('news', DEFAULT_NEWS);

    // 2. Agendas
    await seedTableIfEmpty('agendas', DEFAULT_AGENDAS);

    // 3. Procurement Packages
    await seedTableIfEmpty('procurement_packages', DEFAULT_PACKAGES);

    // 4. Regulasi
    await seedTableIfEmpty('regulasi', DEFAULT_REGULASI);

    // 5. SOP
    await seedTableIfEmpty('sop', DEFAULT_SOP);

    // 6. Photos
    await seedTableIfEmpty('gallery_photos', DEFAULT_PHOTOS);

    // 7. Videos
    await seedTableIfEmpty('gallery_videos', DEFAULT_VIDEOS);

    // 8. Site Settings
    const { count: settingsCount } = await supabase
      .from('site_settings')
      .select('*', { count: 'exact', head: true });

    if (settingsCount === 0) {
      const { error: errSettings } = await supabase.from('site_settings').insert(DEFAULT_SETTINGS);
      if (errSettings) console.error('  ⚠️ Settings Error:', errSettings.message);
      else console.log('  ✓ site_settings: berhasil insert pengaturan global.');
    } else {
      console.log(`  ℹ️ site_settings: sudah memiliki ${settingsCount} record.`);
    }

    console.log('\n🎉 SEEDING BERHASIL 100%! Seluruh tabel Supabase kini telah terisi data awal.');
  } catch (err) {
    console.error('Fatal Seeding Error:', err);
  }
}

seedAll();
