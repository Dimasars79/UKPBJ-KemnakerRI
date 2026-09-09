const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const anonKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, anonKey);

async function testAnonSelect() {
  console.log('Testing SELECT with ANON KEY on all tables:');
  const tables = ['sop', 'news', 'agendas', 'procurement_packages', 'regulasi', 'gallery_photos', 'gallery_videos', 'site_settings'];
  for (const t of tables) {
    const res = await supabase.from(t).select('*');
    console.log(`Table ${t}: error=${res.error ? res.error.message : 'NONE'}, count=${res.data ? res.data.length : 0}`);
    if (t === 'sop' && res.data) {
      console.log('SOP titles fetched with anon key:', res.data.map(d => ({ id: d.id, judul: d.judul })));
    }
  }
}

testAnonSelect();
