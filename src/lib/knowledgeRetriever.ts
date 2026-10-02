import { createClient } from '@supabase/supabase-js';

// Setup Supabase admin client untuk akses server-side
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Basis pengetahuan statis untuk Menu Layanan & Fitur Portal UKPBJ Kemnaker
const UKPBJ_SERVICES_KNOWLEDGE = [
  {
    id: 'layanan-lpse',
    keywords: ['lpse', 'spse', 'inaproc', 'tender', 'seleksi', 'e-purchasing', 'katalog', 'lelang', 'akun spse'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="LPSE (Layanan Pengadaan Secara Elektronik)">
Deskripsi: Portal resmi penyelenggaraan tender dan e-purchasing pengadaan barang/jasa pemerintah secara elektronik terintegrasi LKPP.
Fungsi & Cakupan: Pendaftaran penyedia, akses lelang tender terbuka, evaluasi dokumen penawaran, sanggah, dan katalog elektronik.
Tautan Resmi: https://spse.inaproc.id/lkpp
Lokasi Menu Portal: Navigasi Layanan -> LPSE
Helpdesk: Gedung A Lt. 4 Kemnaker RI | Email: lpse@kemnaker.go.id | WA: +62 898-8180-009
</dokumen_sumber>`
  },
  {
    id: 'layanan-sikap',
    keywords: ['sikap', 'kinerja', 'penyedia', 'vendor', 'kualifikasi', 'rekam jejak', 'data vendor'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="SIKaP (Sistem Informasi Kinerja Penyedia)">
Deskripsi: Sistem informasi terpusat LKPP untuk mengelola kualifikasi, izin usaha (NIB), pengalaman kerja, dan rekam jejak penilaian kinerja pelaku usaha/penyedia.
Fungsi: Memudahkan proses kualifikasi otomatis dalam tender SPSE tanpa perlu berulang kali mengunggah dokumen fisik.
Tautan Resmi: https://sikap.inaproc.id/
Lokasi Menu Portal: Navigasi Layanan -> SIKaP
</dokumen_sumber>`
  },
  {
    id: 'layanan-clearing-house',
    keywords: ['clearing', 'house', 'sengketa', 'konsultasi', 'advokasi', 'mediasi', 'pendapat hukum', 'telaah', 'kontrak'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Clearing House Pengadaan Barang/Jasa Kemnaker">
Deskripsi: Forum konsultasi dan penyelesaian masalah hukum, sengketa pelaksanaan kontrak, serta mitigasi risiko PBJ bagi PPK, Pokja Pemilihan, dan Penyedia.
Layanan yang Disediakan:
1. Konsultasi & Telaah Hukum Klausul Kontrak (Multi-Years, Eskalasi Harga).
2. Mediasi Keterlambatan Serah Terima (PHO/FHO) & Keadaan Kahar.
3. Pendampingan Mitigasi Risiko Pengadaan bersama Inspektorat Jenderal.
Alur Pengajuan: Masuk ke halaman Clearing House Portal (/informasi/clearing-house) -> Buat Tiket Konsultasi Baru -> Telaah oleh Tim Advokasi -> Terbit Rekomendasi/Jadwal Mediasi.
Lokasi Menu Portal: /informasi/clearing-house
</dokumen_sumber>`
  },
  {
    id: 'layanan-sertifikasi-pbj',
    keywords: ['sertifikat', 'sertifikasi', 'keahlian', 'tingkat dasar', 'ujian', 'ppk', 'pokja', 'sdm', 'lulus'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Layanan Sertifikasi PBJ Kemnaker">
Deskripsi: Layanan verifikasi dan penerbitan informasi kelulusan Sertifikasi Keahlian Pengadaan Barang/Jasa Tingkat Dasar terstandarisasi LKPP.
Peserta: Aparatur Sipil Negara (ASN), PPK, Pejabat Pengadaan, Pokja, serta Pengelola Pengadaan di lingkungan Kementerian Ketenagakerjaan RI.
Fitur Portal: Cek keaslian nomor sertifikat, unduh e-sertifikat, dan melihat jadwal ujian batch terbaru.
Lokasi Menu Portal: /informasi/sertifikat-pbj
Jadwal Ujian Terdekat: Dapat dilihat pada menu Agenda (/agenda).
</dokumen_sumber>`
  },
  {
    id: 'layanan-tkdn',
    keywords: ['tkdn', 'tingkat komponen', 'dalam negeri', 'p3dn', 'bmp', 'bobot manfaat', 'verifikasi tkdn'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Verifikasi & Konsultasi TKDN (Tingkat Komponen Dalam Negeri)">
Deskripsi: Layanan panduan dan verifikasi kepatuhan penggunaan produk dalam negeri (P3DN) serta perhitungan Bobot Manfaat Perusahaan (BMP) dalam setiap paket pengadaan Kemnaker.
Dasar Aturan: Kewajiban pengutamaan produk bersertifikat TKDN minimal 40% (atau 25% untuk kategori tertentu) sesuai instruksi Presiden dan Permenperin.
Lokasi Menu Portal: /informasi/tkdn
</dokumen_sumber>`
  },
  {
    id: 'layanan-perizinan-oss',
    keywords: ['perizinan', 'izin usaha', 'oss', 'nib', 'kbli', 'legalitas', 'administrasi'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Layanan Perizinan Berusaha & Legalitas Rekanan (OSS-RBA)">
Deskripsi: Informasi sinkronisasi Nomor Induk Berusaha (NIB) berbasis risiko (OSS-RBA), kesesuaian KBLI bidang pekerjaan pengadaan, dan pemenuhan syarat legalitas vendor.
Lokasi Menu Portal: /informasi/perizinan
</dokumen_sumber>`
  },
  {
    id: 'layanan-monitoring-realisasi',
    keywords: ['monitoring', 'evaluasi', 'realisasi', 'rup', 'sirup', 'statistik', 'serapan', 'kinerja pengadaan'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Monitoring & Realisasi Pengadaan UKPBJ">
Deskripsi: Dashboard transparansi publik yang menampilkan rekapitulasi realisasi anggaran pengadaan Kemnaker, perbandingan metode tender vs e-purchasing, dan progres pencapaian RUP.
Lokasi Menu Portal: /monitoring
</dokumen_sumber>`
  },
  {
    id: 'layanan-pengaduan-helpdesk',
    keywords: ['pengaduan', 'lapor', 'aduan', 'helpdesk', 'whatsapp', 'kontak', 'layanan', 'bantuan', 'call center', 'email', 'alamat', 'jam layanan'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Pusat Bantuan & Pengaduan Resmi UKPBJ Kemnaker">
Saluran Resmi Konsultasi & Pengaduan:
- WhatsApp Helpdesk: +62 898-8180-009
- Email Resmi: ukpbj@kemnaker.go.id / lpse@kemnaker.go.id
- Jam Layanan: Senin - Jumat, 08:00 - 16:00 WIB
- Lokasi Kantor: Gedung A Lantai 4, Kementerian Ketenagakerjaan RI, Jakarta
Fungsi: Membantu kendala teknis login SPSE/SIKaP, konsultasi penyusunan HPS/spek teknis, serta pelaporan pengaduan pengadaan secara transparan.
</dokumen_sumber>`
  }
];

/**
 * Mencari informasi relevan dari database CMS Supabase dan menu layanan UKPBJ berdasarkan query pengguna.
 */
export async function retrieveKnowledge(query: string): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const lowerQuery = query.toLowerCase();

  // Stopwords umum bahasa Indonesia yang diabaikan saat ekstraksi kata kunci
  const stopWords = new Set([
    'yang', 'untuk', 'pada', 'adalah', 'dari', 'ke', 'di', 'dan', 'atau', 'ini', 'itu',
    'apakah', 'bagaimana', 'kapan', 'dimana', 'siapa', 'kenapa', 'mengapa', 'saya', 'kamu',
    'anda', 'bisa', 'tolong', 'info', 'tentang', 'mengenai', 'terkait', 'seputar', 'ada',
    'apa', 'saja', 'ingin', 'tahu', 'kasih', 'terima', 'dengan', 'dalam', 'oleh'
  ]);

  const rawWords = lowerQuery
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  const words = Array.from(new Set(rawWords)).slice(0, 5);

  // Deteksi intensi khusus
  const isAgendaQuery = /agenda|jadwal|acara|kegiatan|event|kapan|waktu|pelaksanaan|kalender|bimtek|sosialisasi|sertifikasi|rapat|aanwijzing|ujian|upacara/i.test(lowerQuery);
  const isServiceMenuQuery = /layanan|menu|fitur|website|portal|clearing|house|lpse|spse|sikap|tkdn|sertifikat|pengaduan|helpdesk|monitoring|perizinan/i.test(lowerQuery);

  try {
    const results: string[] = [];

    // 1. Informasi Kontak & Status Sistem Resmi (site_settings dari Supabase CMS)
    try {
      const { data: settings } = await supabaseAdmin
        .from('site_settings')
        .select('*')
        .eq('id', 'global_config')
        .maybeSingle();

      if (settings) {
        results.push(
          `<dokumen_sumber jenis="Pengaturan Portal" judul="Info Layanan & Kontak Resmi">\n` +
          `Pengumuman Berjalan: ${settings.announcement_banner || '-'}\n` +
          `Status Server: ${settings.server_status || 'Normal'}\n` +
          `Pemberitahuan Khusus: ${settings.emergency_notice || '-'}\n` +
          `Layanan WhatsApp Helpdesk: +62 898-8180-009\n` +
          `Email Resmi: ukpbj@kemnaker.go.id | lpse@kemnaker.go.id\n` +
          `Jam Layanan: Senin - Jumat (08:00 - 16:00 WIB)\n` +
          `Lokasi: Gedung A Lantai 4, Kementerian Ketenagakerjaan RI\n` +
          `</dokumen_sumber>`
        );
      }
    } catch (e) {
      console.warn('Failed to fetch site_settings:', e);
    }

    // 2. Hubungkan Menu Layanan UKPBJ yang relevan
    UKPBJ_SERVICES_KNOWLEDGE.forEach(serv => {
      const match = serv.keywords.some(kw => lowerQuery.includes(kw));
      if (match || isServiceMenuQuery) {
        results.push(serv.dokumen);
      }
    });

    // 3. Jika ada query terkait agenda atau jadwal secara eksplisit, ambil seluruh agenda aktif dari Supabase CMS
    if (isAgendaQuery) {
      try {
        const { data: allAgendas } = await supabaseAdmin
          .from('agendas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (allAgendas && allAgendas.length > 0) {
          allAgendas.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="Agenda Kegiatan" judul="${item.title}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Tanggal: ${item.date || item.event_date || '-'}\n` +
              `Waktu: ${item.time || '-'}\n` +
              `Lokasi: ${item.location || '-'}\n` +
              `Penyelenggara: ${item.organizer || '-'}\n` +
              `Kapasitas / Target Peserta: ${item.capacity || '-'}\n` +
              `Status Agenda: ${item.status || 'Terjadwal'}\n` +
              `</dokumen_sumber>`
            );
          });
        }
      } catch (e) {
        console.warn('Failed to fetch all agendas:', e);
      }
    }

    // 4. Pencarian Berdasarkan Kata Kunci Spesifik di Database CMS Supabase
    if (words.length > 0) {
      for (const kw of words) {
        const pattern = `%${kw}%`;

        const searches = await Promise.allSettled([
          supabaseAdmin
            .from('regulasi')
            .select('*')
            .or(`tentang.ilike.${pattern},nomor.ilike.${pattern},kategori.ilike.${pattern},tahun.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('sop')
            .select('*')
            .or(`judul.ilike.${pattern},kode.ilike.${pattern},unit.ilike.${pattern},kategori.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('news')
            .select('*')
            .or(`title.ilike.${pattern},content.ilike.${pattern},category.ilike.${pattern},author.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('agendas')
            .select('*')
            .or(`title.ilike.${pattern},category.ilike.${pattern},location.ilike.${pattern},organizer.ilike.${pattern},date.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('procurement_packages')
            .select('*')
            .or(`title.ilike.${pattern},code.ilike.${pattern},category.ilike.${pattern},unit.ilike.${pattern},method.ilike.${pattern}`)
            .limit(3)
        ]);

        const [regulasi, sop, news, agendas, packages] = searches;

        if (regulasi.status === 'fulfilled' && regulasi.value.data) {
          regulasi.value.data.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="Regulasi" judul="${item.tentang || item.nomor}">\n` +
              `Nomor / Tahun: ${item.nomor || '-'} / ${item.tahun || '-'}\n` +
              `Tentang: ${item.tentang || '-'}\n` +
              `Kategori: ${item.kategori || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `Ukuran File: ${item.file_size || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (sop.status === 'fulfilled' && sop.value.data) {
          sop.value.data.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="SOP" judul="${item.judul}">\n` +
              `Kode SOP: ${item.kode || '-'}\n` +
              `Unit Kerja: ${item.unit || '-'}\n` +
              `Revisi: ${item.revisi || '-'}\n` +
              `Kategori: ${item.kategori || '-'}\n` +
              `Jumlah Tahapan: ${item.tahapan_count || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (news.status === 'fulfilled' && news.value.data) {
          news.value.data.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="Berita" judul="${item.title}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Penulis: ${item.author || '-'}\n` +
              `Tanggal: ${item.date || '-'}\n` +
              `Ringkasan: ${item.excerpt || '-'}\n` +
              `Isi Berita: ${item.content || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (agendas.status === 'fulfilled' && agendas.value.data) {
          agendas.value.data.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="Agenda Kegiatan" judul="${item.title}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Tanggal: ${item.date || item.event_date || '-'}\n` +
              `Waktu: ${item.time || '-'}\n` +
              `Lokasi: ${item.location || '-'}\n` +
              `Penyelenggara: ${item.organizer || '-'}\n` +
              `Kapasitas / Target Peserta: ${item.capacity || '-'}\n` +
              `Status Agenda: ${item.status || 'Terjadwal'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (packages.status === 'fulfilled' && packages.value.data) {
          packages.value.data.forEach((item: any) => {
            results.push(
              `<dokumen_sumber jenis="Paket Pengadaan" judul="${item.title}">\n` +
              `Kode Paket: ${item.code || '-'}\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Satuan Kerja: ${item.unit || '-'}\n` +
              `Nilai HPS: ${item.hps || '-'}\n` +
              `Metode Pemilihan: ${item.method || '-'}\n` +
              `Batas Waktu: ${item.deadline || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `Deskripsi: ${item.description || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }
      }
    }

    // 5. Fallback Default jika hasil pencarian masih minim
    if (results.length <= 1) {
      const searches = await Promise.allSettled([
        supabaseAdmin.from('news').select('*').order('created_at', { ascending: false }).limit(2),
        supabaseAdmin.from('agendas').select('*').order('created_at', { ascending: false }).limit(4),
        supabaseAdmin.from('procurement_packages').select('*').order('created_at', { ascending: false }).limit(2)
      ]);

      const [news, agendasFallback, packages] = searches;

      if (news.status === 'fulfilled' && news.value.data) {
        news.value.data.forEach((item: any) => {
          results.push(
            `<dokumen_sumber jenis="Berita Terbaru" judul="${item.title}">\n` +
            `Ringkasan: ${item.excerpt || item.content || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }

      if (agendasFallback.status === 'fulfilled' && agendasFallback.value.data) {
        agendasFallback.value.data.forEach((item: any) => {
          results.push(
            `<dokumen_sumber jenis="Agenda Mendatang" judul="${item.title}">\n` +
            `Tanggal: ${item.date || item.event_date || '-'}\n` +
            `Waktu: ${item.time || '-'}\n` +
            `Lokasi: ${item.location || '-'}\n` +
            `Kategori: ${item.category || '-'}\n` +
            `Penyelenggara: ${item.organizer || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }

      if (packages.status === 'fulfilled' && packages.value.data) {
        packages.value.data.forEach((item: any) => {
          results.push(
            `<dokumen_sumber jenis="Paket Pengadaan Terbaru" judul="${item.title}">\n` +
            `Kategori: ${item.category || '-'}\n` +
            `HPS: ${item.hps || '-'}\n` +
            `Status: ${item.status || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }
    }

    const uniqueResults = Array.from(new Set(results));
    return uniqueResults.join('\n\n');
  } catch (error) {
    console.error('Error in retrieveKnowledge:', error);
    return '';
  }
}
