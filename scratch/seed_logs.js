const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qxmdhemplqaldswspuwd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bWRoZW1wbHFhbGRzd3NwdXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODkzNjQ3NywiZXhwIjoyMTA0NTEyNDc3fQ.Yd1n7AtEZd98eHUXJU7P2KePKG9KdJq0vWqqaRIpvAU';

const client = createClient(supabaseUrl, supabaseKey);

async function seedLogs() {
  const [pkgs, news, agendas, regulasi, sop, photos, videos] = await Promise.all([
    client.from('procurement_packages').select('*'),
    client.from('news').select('*'),
    client.from('agendas').select('*'),
    client.from('regulasi').select('*'),
    client.from('sop').select('*'),
    client.from('gallery_photos').select('*'),
    client.from('gallery_videos').select('*'),
  ]);

  const logs = [];
  const now = Date.now();

  // Packages
  (pkgs.data || []).forEach((p, idx) => {
    logs.push({
      id: `LOG-PKG-${p.id || idx}`,
      time: '08:30 WIB',
      date: '15 Sep 2026',
      timestamp: now - idx * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Paket PBJ',
      category: 'pengadaan',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Penerbitan paket pengadaan tender baru: "${p.title || 'Paket PBJ'}" (${p.hps || 'Rp 0'})`,
      target: p.code || p.id || 'PKG-001',
      status: 'Berhasil'
    });
  });

  // News
  (news.data || []).forEach((n, idx) => {
    logs.push({
      id: `LOG-NWS-${n.id || idx}`,
      time: '08:45 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 10) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Berita',
      category: 'berita',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Publikasi artikel warta baru: "${n.title || 'Warta PBJ'}"`,
      target: `NEWS-${n.id || idx}`,
      status: 'Berhasil'
    });
  });

  // Agendas
  (agendas.data || []).forEach((a, idx) => {
    logs.push({
      id: `LOG-AGD-${a.id || idx}`,
      time: '09:00 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 20) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Agenda',
      category: 'agenda',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Penjadwalan agenda kegiatan baru: "${a.title || 'Agenda'}" (${a.date || 'TBA'})`,
      target: `AGD-${a.id || idx}`,
      status: 'Berhasil'
    });
  });

  // Regulasi
  (regulasi.data || []).forEach((r, idx) => {
    logs.push({
      id: `LOG-REG-${r.id || idx}`,
      time: '09:15 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 30) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Regulasi',
      category: 'regulasi',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Pengunggahan dokumen regulasi resmi: "${r.nomor || 'Regulasi'}"`,
      target: r.nomor || r.id || 'REG-001',
      status: 'Berhasil'
    });
  });

  // SOP
  (sop.data || []).forEach((s, idx) => {
    logs.push({
      id: `LOG-SOP-${s.id || idx}`,
      time: '09:30 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 40) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'SOP',
      category: 'sop',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Penerbitan dokumen standar operasional: "${s.judul || 'SOP'}"`,
      target: s.kode || s.id || 'SOP-001',
      status: 'Berhasil'
    });
  });

  // Gallery Photos
  (photos.data || []).forEach((p, idx) => {
    logs.push({
      id: `LOG-PHT-${p.id || idx}`,
      time: '09:40 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 50) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Galeri',
      category: 'galeri',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Pengunggahan dokumentasi foto: "${p.title || 'Foto Kegiatan'}"`,
      target: `PHT-${p.id || idx}`,
      status: 'Berhasil'
    });
  });

  // Gallery Videos
  (videos.data || []).forEach((v, idx) => {
    logs.push({
      id: `LOG-VID-${v.id || idx}`,
      time: '09:45 WIB',
      date: '15 Sep 2026',
      timestamp: now - (idx + 60) * 60000,
      actor: 'Dimas Ars',
      role: 'Super Administrator PBJ',
      entity: 'Galeri',
      category: 'galeri',
      action: 'INSERT',
      action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: `Penambahan tautan video sosialisasi: "${v.title || 'Video'}"`,
      target: `VID-${v.id || idx}`,
      status: 'Berhasil'
    });
  });

  // System Sync Log
  logs.push({
    id: 'LOG-SYS-001',
    time: '09:50 WIB',
    date: '15 Sep 2026',
    timestamp: now,
    actor: 'Dimas Ars',
    role: 'Super Administrator PBJ',
    entity: 'Sistem',
    category: 'sistem',
    action: 'SYNC',
    action_color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'Sinkronisasi penuh data CMS dengan database cloud Supabase PostgreSQL',
    target: 'SYS-GLOBAL-CONFIG',
    status: 'Berhasil'
  });

  console.log(`Inserting ${logs.length} activity logs to Supabase...`);
  const { data, error } = await client.from('activity_logs').upsert(logs);
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log(`SUCCESS! Inserted ${logs.length} activity log rows into Supabase.`);
  }
}

seedLogs();
