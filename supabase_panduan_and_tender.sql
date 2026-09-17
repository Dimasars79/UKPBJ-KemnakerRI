-- ==============================================================================
-- UKPBJ KEMNAKER RI - SUPABASE SCHEMA: PANDUAN & PAKET TENDER / SELEKSI
-- ==============================================================================
-- Jalankan query ini pada Supabase Dashboard > SQL Editor untuk membuat tabel
-- dan mengaktifkan integrasi realtime untuk modul Panduan dan Tender / Seleksi.
-- ==============================================================================

-- 1. TABEL PANDUAN & PETUNJUK TEKNIS PBJ
CREATE TABLE IF NOT EXISTS public.panduan (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'pa-kpa', -- 'pa-kpa', 'ppk', 'pp', 'pokja', 'penyedia', 'mdp', 'bimtek', 'lain'
    role TEXT NOT NULL DEFAULT 'PA / KPA',
    date TEXT NOT NULL,
    format TEXT NOT NULL DEFAULT 'PDF', -- 'PDF', 'DOCX', 'VIDEO', 'SLIDE'
    file_size TEXT NOT NULL DEFAULT '2.5 MB',
    file_name TEXT,
    file_url TEXT,
    download_url TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Published', -- 'Published', 'Draft', 'Archived'
    sync_frontend BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing untuk tabel panduan
CREATE INDEX IF NOT EXISTS idx_panduan_category ON public.panduan (category);
CREATE INDEX IF NOT EXISTS idx_panduan_status ON public.panduan (status);
CREATE INDEX IF NOT EXISTS idx_panduan_created_at ON public.panduan (created_at DESC);

-- Enable Row Level Security (RLS) pada tabel panduan
ALTER TABLE public.panduan ENABLE ROW LEVEL SECURITY;

-- Drop policies lama jika ada
DROP POLICY IF EXISTS "Allow public read on panduan" ON public.panduan;
DROP POLICY IF EXISTS "Allow admin insert on panduan" ON public.panduan;
DROP POLICY IF EXISTS "Allow admin update on panduan" ON public.panduan;
DROP POLICY IF EXISTS "Allow admin delete on panduan" ON public.panduan;

-- Policies untuk tabel panduan
CREATE POLICY "Allow public read on panduan" ON public.panduan FOR SELECT USING (true);
CREATE POLICY "Allow admin insert on panduan" ON public.panduan FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update on panduan" ON public.panduan FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete on panduan" ON public.panduan FOR DELETE USING (true);


-- 2. TABEL PAKET TENDER & SELEKSI PBJ
CREATE TABLE IF NOT EXISTS public.procurement_packages (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    unit TEXT NOT NULL,
    hps TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Tender', -- 'Tender', 'Seleksi', 'Pengadaan Langsung', 'E-Purchasing'
    status TEXT NOT NULL DEFAULT 'Pendaftaran Dibuka', -- 'Pendaftaran Dibuka', 'Tahap Evaluasi', 'Selesai', 'Pemberian Penjelasan'
    deadline TEXT NOT NULL,
    method TEXT NOT NULL,
    doc_count INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    file_name TEXT,
    file_size TEXT,
    file_url TEXT,
    download_url TEXT,
    documents JSONB DEFAULT '[]'::jsonb,
    sync_frontend BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing untuk tabel procurement_packages
CREATE INDEX IF NOT EXISTS idx_packages_code ON public.procurement_packages (code);
CREATE INDEX IF NOT EXISTS idx_packages_category ON public.procurement_packages (category);
CREATE INDEX IF NOT EXISTS idx_packages_status ON public.procurement_packages (status);
CREATE INDEX IF NOT EXISTS idx_packages_created_at ON public.procurement_packages (created_at DESC);

-- Enable Row Level Security (RLS) pada procurement_packages
ALTER TABLE public.procurement_packages ENABLE ROW LEVEL SECURITY;

-- Drop policies lama jika ada
DROP POLICY IF EXISTS "Allow public read on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin insert on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin update on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin delete on procurement_packages" ON public.procurement_packages;

-- Policies untuk procurement_packages
CREATE POLICY "Allow public read on procurement_packages" ON public.procurement_packages FOR SELECT USING (true);
CREATE POLICY "Allow admin insert on procurement_packages" ON public.procurement_packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update on procurement_packages" ON public.procurement_packages FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete on procurement_packages" ON public.procurement_packages FOR DELETE USING (true);


-- ==============================================================================
-- 3. INITIAL SEED DATA (DATA AWAL RESMI)
-- ==============================================================================

-- Seed data panduan
INSERT INTO public.panduan (id, title, category, role, date, format, file_size, file_name, description, status, sync_frontend)
VALUES
('GUI-001', 'Panduan Pengisian Sistem Informasi Rencana Umum Pengadaan (SiRUP)', 'pa-kpa', 'PA / KPA', '28 Nov 2023', 'PDF', '3.2 MB', 'Panduan-SiRUP-Kemnaker.pdf', 'Petunjuk teknis penginputan paket RUP, penetapan struktur anggaran, dan pengumuman paket belanja kementerian.', 'Published', true),
('GUI-002', 'Panduan INAPROC - Tata Kelola dan Monitoring Daftar Hitam Terpusat', 'pa-kpa', 'PA / KPA', '01 Nov 2023', 'PDF', '1.8 MB', 'Panduan-INAPROC-Daftar-Hitam.pdf', 'Pedoman verifikasi status badan usaha dan tata cara pengusulan sanksi daftar hitam melalui portal LKPP.', 'Published', true),
('GUI-003', 'Panduan SPSE untuk Kepala Unit Pengelola PBJ (UKPBJ Kemnaker)', 'pa-kpa', 'PA / KPA', '01 Nov 2023', 'PDF', '2.4 MB', 'Panduan-SPSE-Kepala-UKPBJ.pdf', 'Manual operasional pengelolaan sistem SPSE, penetapan admin Pokja, dan monitoring progres tender secara berkala.', 'Published', true),
('GUI-004', 'Modul Penyusunan Harga Perkiraan Sendiri (HPS) dan Spesifikasi Teknis', 'ppk', 'PPK', '14 Des 2023', 'PDF', '4.1 MB', 'Modul-Penyusunan-HPS.pdf', 'Tata cara survei pasar, penghitungan komponen HPS, serta penyusunan Kerangka Acuan Kerja (KAK) pengadaan barang/jasa.', 'Published', true),
('GUI-005', 'Panduan Registrasi & Verifikasi Dokumen Kualifikasi SIKaP bagi Pelaku Usaha', 'penyedia', 'Penyedia', '08 Jan 2024', 'PDF', '2.9 MB', 'Panduan-SIKaP-Pelaku-Usaha.pdf', 'Langkah pendaftaran izin usaha, NIB, laporan keuangan, dan pengalaman kerja pada portal Sistem Informasi Kinerja Penyedia.', 'Published', true),
('GUI-006', 'Tata Cara Evaluasi Dokumen Penawaran & Pembuktian Kualifikasi E-Tendering', 'pokja', 'Pokja Pemilihan', '26 Jan 2024', 'PDF', '3.5 MB', 'Juknis-Evaluasi-Pokja.pdf', 'Panduan teknis bagi anggota Pokja dalam melakukan evaluasi administrasi, teknis, harga, serta klarifikasi dokumen tender.', 'Published', true),
('GUI-007', 'Model Dokumen Pengadaan (MDP) Pekerjaan Konstruksi & Jasa Konsultansi 2026', 'mdp', 'Standar Dokumen', '19 Feb 2024', 'DOCX', '1.1 MB', 'MDP-Konstruksi-2026.docx', 'Template rancangan kontrak, syarat umum dan khusus kontrak (SUKK/SSKK), serta form standar penawaran.', 'Published', true),
('GUI-008', 'Slide Presentasi Sosialisasi E-Katalog Sektoral Ketenagakerjaan', 'bimtek', 'Materi Pelatihan', '06 Mar 2024', 'SLIDE', '8.4 MB', 'Slide-E-Katalog-Kemnaker.pdf', 'Materi komprehensif tata cara e-purchasing produk barang dan jasa pelatihan vokasi melalui katalog elektronik sektor Kemnaker.', 'Published', true)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    role = EXCLUDED.role,
    date = EXCLUDED.date,
    format = EXCLUDED.format,
    file_size = EXCLUDED.file_size,
    description = EXCLUDED.description,
    status = EXCLUDED.status,
    updated_at = NOW();

-- Seed data procurement_packages
INSERT INTO public.procurement_packages (id, code, title, unit, hps, category, status, deadline, method, doc_count, file_name, file_size, description, sync_frontend)
VALUES
('PKG-2026-001', 'TND-984210', 'Pengadaan Jasa Konsultan Pengembangan Arsitektur IT & Portal UKPBJ', 'Biro Perencanaan dan Manajemen Kinerja - Kemnaker RI', 'Rp 500.000.000', 'Tender', 'Pendaftaran Dibuka', '20 Agu 2026', 'Tender - Pascakualifikasi Satu File', 3, 'KAK-Konsultan-Portal-UKPBJ.pdf', '2.4 MB', 'Pengadaan jasa konsultan IT untuk mendukung implementasi sistem informasi terintegrasi dan arsitektur satu portal di lingkungan Kemnaker.', true),
('PKG-2026-002', 'TND-984211', 'Pengadaan Peralatan Workshop Pelatihan Vokasi & Produktivitas', 'Ditjen Pembinaan Pelatihan Vokasi dan Produktivitas (Binalavotas)', 'Rp 2.150.000.000', 'Tender', 'Tahap Evaluasi', '16 Agu 2026', 'Tender - Pascakualifikasi Dua File', 4, 'Dokumen-Pemilihan-Peralatan-Workshop.pdf', '3.8 MB', 'Pengadaan sarana dan prasarana penunjang pelatihan vokasi tenaga kerja di balai besar pelatihan.', true),
('PKG-2026-003', 'SLK-882014', 'Jasa Konsultansi Pengawasan Renovasi Gedung Pusat Pasar Kerja', 'Pusat Pasar Kerja (PaskerID) Kemnaker RI', 'Rp 350.000.000', 'Seleksi', 'Pemberian Penjelasan', '22 Agu 2026', 'Seleksi Kualifikasi Kualitas & Biaya', 2, 'Spesifikasi-Pengawasan-Renovasi.pdf', '1.9 MB', 'Pengawasan berkala mutu konstruksi fisik renovasi ruang layanan ketenagakerjaan terpadu.', true),
('PKG-2026-004', 'PL-441092', 'Pengadaan Lisensi Software Keamanan & Monitoring Server SPSE', 'Pusat Data dan Informasi (Pusdatin) Kemnaker RI', 'Rp 180.000.000', 'Pengadaan Langsung', 'Selesai', '05 Agu 2026', 'Pengadaan Langsung', 2, 'Rincian-Lisensi-Firewall-SPSE.pdf', '1.2 MB', 'Lisensi tahunan firewall dan perangkat pemantau lalu lintas jaringan pengadaan.', true),
('PKG-2026-005', 'TND-984215', 'Pengadaan Jasa Kebersihan, Keamanan, dan Pengelolaan Fasilitas Kantor', 'Biro Umum dan Pengadaan Barang/Jasa Kemnaker RI', 'Rp 850.000.000', 'Tender', 'Pendaftaran Dibuka', '25 Agu 2026', 'Tender Cepat', 3, 'Kerangka-Acuan-Kerja-Cleaning-Security.pdf', '2.1 MB', 'Penyediaan alih daya tenaga pengamanan dan kebersihan gedung kementerian.', true)
ON CONFLICT (id) DO UPDATE SET
    code = EXCLUDED.code,
    title = EXCLUDED.title,
    unit = EXCLUDED.unit,
    hps = EXCLUDED.hps,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    deadline = EXCLUDED.deadline,
    method = EXCLUDED.method,
    file_name = EXCLUDED.file_name,
    file_size = EXCLUDED.file_size,
    description = EXCLUDED.description,
    updated_at = NOW();
