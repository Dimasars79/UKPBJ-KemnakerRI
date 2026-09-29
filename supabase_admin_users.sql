-- ==============================================================================
-- UKPBJ KEMNAKER RI - SUPABASE SCHEMA: AKUN ADMIN (SINGLE ROLE: ADMIN)
-- ==============================================================================
-- Jalankan skrip ini pada Supabase Dashboard > SQL Editor
-- ==============================================================================

-- 1. Buat Tabel Akun Admin (public.admin_users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nip VARCHAR(30) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    unit_kerja VARCHAR(150) NOT NULL DEFAULT 'Biro UKPBJ Kemnaker RI',
    jabatan VARCHAR(100) DEFAULT 'Administrator Portal',
    role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    status VARCHAR(20) NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
    no_hp VARCHAR(25),
    avatar_url TEXT,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexing untuk efisiensi pencarian dan login
CREATE INDEX IF NOT EXISTS idx_admin_users_nip ON public.admin_users (nip);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);
CREATE INDEX IF NOT EXISTS idx_admin_users_status ON public.admin_users (status);

-- 3. Trigger Otomatis untuk Kolom updated_at
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER tr_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_users_updated_at();

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Policies RLS untuk Operasional CMS Admin
DROP POLICY IF EXISTS "Allow read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow insert admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow update admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow delete admin_users" ON public.admin_users;

-- Kebijakan baca seluruh data akun admin
CREATE POLICY "Allow read admin_users" 
    ON public.admin_users FOR SELECT 
    USING (true);

-- Kebijakan tambah akun admin
CREATE POLICY "Allow insert admin_users" 
    ON public.admin_users FOR INSERT 
    WITH CHECK (true);

-- Kebijakan update akun admin
CREATE POLICY "Allow update admin_users" 
    ON public.admin_users FOR UPDATE 
    USING (true);

-- Kebijakan hapus akun admin
CREATE POLICY "Allow delete admin_users" 
    ON public.admin_users FOR DELETE 
    USING (true);
