import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

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

export async function GET(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table');

    if (table) {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // Fetch all 8 tables in parallel using service role
    const [
      newsRes,
      agendasRes,
      packagesRes,
      regulasiRes,
      sopRes,
      photosRes,
      videosRes,
      settingsRes
    ] = await Promise.all([
      supabaseAdmin.from('news').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('agendas').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('procurement_packages').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('regulasi').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('sop').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('gallery_photos').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('gallery_videos').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('site_settings').select('*').eq('id', 'global_config').maybeSingle()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        news: newsRes.data || [],
        agendas: agendasRes.data || [],
        procurement_packages: packagesRes.data || [],
        regulasi: regulasiRes.data || [],
        sop: sopRes.data || [],
        gallery_photos: photosRes.data || [],
        gallery_videos: videosRes.data || [],
        site_settings: settingsRes.data || null
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal mengambil data database';
    console.error('API GET Data Error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();
    const { table, action, id, data } = body;

    if (!table || !action) {
      return NextResponse.json(
        { success: false, error: 'Parameter table dan action diperlukan' },
        { status: 400 }
      );
    }

    const validTables = [
      'news',
      'agendas',
      'procurement_packages',
      'regulasi',
      'sop',
      'gallery_photos',
      'gallery_videos',
      'site_settings'
    ];

    if (!validTables.includes(table)) {
      return NextResponse.json(
        { success: false, error: `Tabel "${table}" tidak valid` },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'insert': {
        const { data: inserted, error } = await supabaseAdmin
          .from(table)
          .insert(data)
          .select()
          .single();

        if (error) throw error;
        result = inserted;
        break;
      }

      case 'update': {
        if (!id) {
          return NextResponse.json(
            { success: false, error: 'ID diperlukan untuk operasi update' },
            { status: 400 }
          );
        }

        const { data: updated, error } = await supabaseAdmin
          .from(table)
          .update(data)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        result = updated;
        break;
      }

      case 'delete': {
        if (!id) {
          return NextResponse.json(
            { success: false, error: 'ID diperlukan untuk operasi delete' },
            { status: 400 }
          );
        }

        const { error } = await supabaseAdmin
          .from(table)
          .delete()
          .eq('id', id);

        if (error) throw error;
        result = { id, deleted: true };
        break;
      }

      case 'upsert': {
        const { data: upserted, error } = await supabaseAdmin
          .from(table)
          .upsert(data)
          .select()
          .single();

        if (error) throw error;
        result = upserted;
        break;
      }

      default:
        return NextResponse.json(
          { success: false, error: `Action "${action}" tidak didukung` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan pada server database';
    console.error('API Admin Data Error:', err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
