import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kdRup = searchParams.get('kd_rup')?.trim() || '';
    const tahun = Number(searchParams.get('tahun') || '2026');
    const limit = Math.min(Number(searchParams.get('limit') || '100'), 1000);

    const supabase = getSupabaseAdmin();
    let query = supabase
      .from('history_kaji_ulang')
      .select('*', { count: 'exact' })
      .eq('tahun_anggaran', tahun)
      .order('synced_at', { ascending: false })
      .limit(limit);

    if (kdRup) {
      query = query.eq('kd_rup', kdRup);
    }

    const { data, count, error } = await query;
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      endpoint: '/api/v1/rup/history-kaji-ulang',
      table: 'history_kaji_ulang',
      count: count ?? data?.length ?? 0,
      data: data || []
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat data history_kaji_ulang', details: message },
      { status: 500 }
    );
  }
}
