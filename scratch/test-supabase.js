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

console.log('Testing with SERVICE ROLE KEY:');
const supabase = createClient(supabaseUrl, serviceKey);

async function testServiceRole() {
  console.log('--- 1. Testing news INSERT with service key ---');
  const newsRes = await supabase.from('news').insert({
    title: 'Test Berita Service Role ' + Date.now(),
    category: 'Berita PBJ',
    author: 'Admin Test',
    status: 'Published',
    excerpt: 'Test excerpt',
    content: 'Test content',
    image_url: '/news/news-1.png',
    sync_frontend: true
  }).select().single();
  console.log('News insert result:', newsRes);

  if (newsRes.data) {
    console.log('Cleaning up test news...');
    await supabase.from('news').delete().eq('id', newsRes.data.id);
    console.log('Cleaned up!');
  }
}

testServiceRole();
