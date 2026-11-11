const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bWRoZW1wbHFhbGRzd3NwdXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODkzNjQ3NywiZXhwIjoyMTA0NTEyNDc3fQ.Yd1n7AtEZd98eHUXJU7P2KePKG9KdJq0vWqqaRIpvAU';
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function test() {
  const { data, count, error } = await supabase.from('procurement_packages').select('*', { count: 'exact' });
  console.log('Total in Supabase:', count, 'Error:', error);
  console.log('Sample 3 real packages in Supabase:');
  console.log(data?.slice(0, 3).map(p => ({ code: p.code, title: p.title, hps: p.hps, unit: p.unit })));
}

test();

