-- ============================================================================
-- TABEL: public.history_kaji_ulang
-- Endpoint INAPROC: GET /api/v1/rup/history-kaji-ulang
-- Jalankan di Supabase Dashboard -> SQL Editor
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.history_kaji_ulang (
  id TEXT PRIMARY KEY,
  kd_rup TEXT DEFAULT '',
  kode_klpd TEXT DEFAULT 'K34',
  tahun_anggaran INTEGER DEFAULT 2026,
  raw_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_history_kaji_ulang_kd_rup ON public.history_kaji_ulang (kd_rup);
CREATE INDEX IF NOT EXISTS idx_history_kaji_ulang_klpd_tahun ON public.history_kaji_ulang (kode_klpd, tahun_anggaran);
CREATE INDEX IF NOT EXISTS idx_history_kaji_ulang_synced_at ON public.history_kaji_ulang (synced_at DESC);

ALTER TABLE public.history_kaji_ulang ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on history_kaji_ulang" ON public.history_kaji_ulang;
DROP POLICY IF EXISTS "Allow admin insert on history_kaji_ulang" ON public.history_kaji_ulang;
DROP POLICY IF EXISTS "Allow admin update on history_kaji_ulang" ON public.history_kaji_ulang;
DROP POLICY IF EXISTS "Allow admin delete on history_kaji_ulang" ON public.history_kaji_ulang;

CREATE POLICY "Allow public read on history_kaji_ulang" ON public.history_kaji_ulang FOR SELECT USING (true);
CREATE POLICY "Allow admin insert on history_kaji_ulang" ON public.history_kaji_ulang FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update on history_kaji_ulang" ON public.history_kaji_ulang FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete on history_kaji_ulang" ON public.history_kaji_ulang FOR DELETE USING (true);

NOTIFY pgrst, 'reload schema';
