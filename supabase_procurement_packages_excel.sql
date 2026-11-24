-- ============================================================================
-- MIGRATION: Tabel procurement_packages persis sesuai 20 kolom Excel RUP
-- Jalankan di Supabase Dashboard -> SQL Editor
-- ============================================================================

DROP TABLE IF EXISTS public.procurement_packages CASCADE;

CREATE TABLE public.procurement_packages (
  "No" INTEGER,
  "Kode RUP" TEXT PRIMARY KEY,
  "Nama Paket" TEXT NOT NULL DEFAULT '',
  "Satuan Kerja (Satker)" TEXT DEFAULT '',
  "Kode Satker" TEXT DEFAULT '',
  "Pagu (Rp)" BIGINT DEFAULT 0,
  "Metode Pengadaan" TEXT DEFAULT '',
  "Jenis Pengadaan" TEXT DEFAULT '',
  "Status PDN" TEXT DEFAULT '',
  "Status UKM" TEXT DEFAULT '',
  "Volume" TEXT DEFAULT '',
  "Tgl Pengumuman" TEXT DEFAULT '',
  "Tgl Awal Pemilihan" TEXT DEFAULT '',
  "Tgl Akhir Pemilihan" TEXT DEFAULT '',
  "Tgl Awal Kontrak" TEXT DEFAULT '',
  "Tgl Akhir Kontrak" TEXT DEFAULT '',
  "Status Aktif" TEXT DEFAULT '',
  "Status Umumkan" TEXT DEFAULT '',
  "Uraian Pekerjaan" TEXT DEFAULT '',
  "Spesifikasi Pekerjaan" TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_packages_no ON public.procurement_packages ("No");
CREATE INDEX IF NOT EXISTS idx_packages_satker ON public.procurement_packages ("Satuan Kerja (Satker)");
CREATE INDEX IF NOT EXISTS idx_packages_metode ON public.procurement_packages ("Metode Pengadaan");

ALTER TABLE public.procurement_packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin insert on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin update on procurement_packages" ON public.procurement_packages;
DROP POLICY IF EXISTS "Allow admin delete on procurement_packages" ON public.procurement_packages;

CREATE POLICY "Allow public read on procurement_packages" ON public.procurement_packages FOR SELECT USING (true);
CREATE POLICY "Allow admin insert on procurement_packages" ON public.procurement_packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update on procurement_packages" ON public.procurement_packages FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete on procurement_packages" ON public.procurement_packages FOR DELETE USING (true);

NOTIFY pgrst, 'reload schema';
