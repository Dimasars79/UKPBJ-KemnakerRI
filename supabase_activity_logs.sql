-- ==============================================================================
-- UKPBJ KEMNAKER RI - SUPABASE SCHEMA: ACTIVITY LOGS & AUDIT TRAIL
-- ==============================================================================
-- Jalankan query ini pada Supabase Dashboard > SQL Editor untuk membuat tabel log audit.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    time TEXT,
    date TEXT,
    timestamp BIGINT,
    actor TEXT NOT NULL DEFAULT 'Dimas Ars',
    role TEXT NOT NULL DEFAULT 'Super Administrator PBJ',
    entity TEXT NOT NULL,
    category TEXT NOT NULL,
    action TEXT NOT NULL,
    action_color TEXT,
    description TEXT NOT NULL,
    target TEXT,
    status TEXT NOT NULL DEFAULT 'Berhasil',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing untuk kecepatan pencarian dan filtering
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_category ON public.activity_logs (category);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs (action);

-- Enable Row Level Security (RLS)
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Drop policy lama jika ada untuk mencegah konflik
DROP POLICY IF EXISTS "Allow all read on activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow all insert on activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow all update on activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow all delete on activity_logs" ON public.activity_logs;

-- Policies untuk akses baca & tulis dari CMS Admin
CREATE POLICY "Allow all read on activity_logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow all insert on activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on activity_logs" ON public.activity_logs FOR UPDATE USING (true);
CREATE POLICY "Allow all delete on activity_logs" ON public.activity_logs FOR DELETE USING (true);
