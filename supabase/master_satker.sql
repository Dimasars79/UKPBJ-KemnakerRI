-- ============================================================================
-- TABEL: public.master_satker
-- Endpoint INAPROC: GET /api/v1/rup/master-satker
-- Jalankan di Supabase Dashboard -> SQL Editor
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.master_satker (
  id TEXT PRIMARY KEY,
  kd_satker TEXT DEFAULT '',
  kd_satker_str TEXT DEFAULT '',
  nama_satker TEXT DEFAULT '',
  kode_klpd TEXT DEFAULT 'K34',
  tahun_anggaran INTEGER DEFAULT 2026,
  raw_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_master_satker_kd_satker ON public.master_satker (kd_satker);
CREATE INDEX IF NOT EXISTS idx_master_satker_kd_satker_str ON public.master_satker (kd_satker_str);
CREATE INDEX IF NOT EXISTS idx_master_satker_klpd_tahun ON public.master_satker (kode_klpd, tahun_anggaran);
CREATE INDEX IF NOT EXISTS idx_master_satker_nama ON public.master_satker (nama_satker);

ALTER TABLE public.master_satker ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on master_satker" ON public.master_satker;
DROP POLICY IF EXISTS "Allow admin insert on master_satker" ON public.master_satker;
DROP POLICY IF EXISTS "Allow admin update on master_satker" ON public.master_satker;
DROP POLICY IF EXISTS "Allow admin delete on master_satker" ON public.master_satker;

CREATE POLICY "Allow public read on master_satker" ON public.master_satker FOR SELECT USING (true);
CREATE POLICY "Allow admin insert on master_satker" ON public.master_satker FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update on master_satker" ON public.master_satker FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete on master_satker" ON public.master_satker FOR DELETE USING (true);

NOTIFY pgrst, 'reload schema';
