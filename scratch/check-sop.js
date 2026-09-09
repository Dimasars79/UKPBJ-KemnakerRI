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

const supabase = createClient(supabaseUrl, serviceKey);

async function checkSop() {
  const { data, error } = await supabase.from('sop').select('*');
  console.log('SOP error:', error);
  console.log('SOP count in Supabase:', data ? data.length : 0);
  console.log('SOP data:', JSON.stringify(data, null, 2));
}

checkSop();
