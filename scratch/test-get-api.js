const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const serviceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function testFetchAll() {
  const { data: sop, error } = await supabaseAdmin.from('sop').select('*').order('created_at', { ascending: false });
  console.log('Total SOPs retrieved from Supabase:', sop ? sop.length : 0);
  if (sop) {
    sop.forEach((s, idx) => {
      console.log(`${idx + 1}. [${s.kode}] ${s.judul} - Status: ${s.status} (sync: ${s.sync_frontend})`);
    });
  }
}

testFetchAll();
