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

/**
 * Mencari informasi relevan dari database Supabase berdasarkan query pengguna.
 * Menghubungkan secara mendalam ke tabel agendas, regulasi, sop, news, procurement_packages, dll.
 */
export async function retrieveKnowledge(query: string): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const lowerQuery = query.toLowerCase();

  // Stopwords umum bahasa Indonesia yang diabaikan saat ekstraksi kata kunci
  const stopWords = new Set([
    'yang', 'untuk', 'pada', 'adalah', 'dari', 'ke', 'di', 'dan', 'atau', 'ini', 'itu',
    'apakah', 'bagaimana', 'kapan', 'dimana', 'siapa', 'kenapa', 'mengapa', 'saya', 'kamu',
    'anda', 'bisa', 'tolong', 'info', 'tentang', 'mengenai', 'terkait', 'seputar', 'ada',
    'apa', 'saja', 'ingin', 'tahu', 'kasih', 'terima'
  ]);

  const rawWords = lowerQuery
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  const words = Array.from(new Set(rawWords)).slice(0, 4);

  // Deteksi intensi khusus terkait agenda/jadwal kegiatan
  const isAgendaQuery = /agenda|jadwal|acara|kegiatan|event|kapan|waktu|pelaksanaan|kalender|bimtek|sosialisasi|sertifikasi|rapat|aanwijzing|ujian|upacara/i.test(lowerQuery);

  try {
    const results: string[] = [];

    // 1. Informasi Kontak & Status Sistem Resmi (site_settings)
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
          `Email Resmi: ukpbj@kemnaker.go.id\n` +
          `Jam Layanan: Senin - Jumat (08:00 - 16:00 WIB)\n` +
          `</dokumen_sumber>`
        );
      }
    } catch (e) {
      console.warn('Failed to fetch site_settings:', e);
    }

    // 2. Jika ada query terkait agenda atau jadwal secara eksplisit, ambil seluruh agenda aktif
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

    // 3. Pencarian Berdasarkan Kata Kunci Spesifik (Regulasi, SOP, News, Packages, Agendas)
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

    // 4. Fallback Default jika hasil pencarian masih sangat sedikit
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
