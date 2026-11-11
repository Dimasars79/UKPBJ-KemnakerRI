const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bWRoZW1wbHFhbGRzd3NwdXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODkzNjQ3NywiZXhwIjoyMTA0NTEyNDc3fQ.Yd1n7AtEZd98eHUXJU7P2KePKG9KdJq0vWqqaRIpvAU';
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testOrder() {
  const { data } = await supabase.from('procurement_packages').select('*').order('created_at', { ascending: false }).limit(6);
  console.log('Top 6 packages that appear on home page & monitoring:');
  data.forEach((p, i) => console.log(`${i+1}. [${p.code}] ${p.title} | ${p.hps} | ${p.unit}`));
}

testOrder();

