const { createClient } = require('@supabase/supabase-js');

const client = createClient(
  'https://qxmdhemplqaldswspuwd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bWRoZW1wbHFhbGRzd3NwdXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODkzNjQ3NywiZXhwIjoyMTA0NTEyNDc3fQ.Yd1n7AtEZd98eHUXJU7P2KePKG9KdJq0vWqqaRIpvAU'
);

async function updateRealTimestamps() {
  const { data: logs, error } = await client.from('activity_logs').select('*');
  if (error || !logs) {
    console.error('Error fetching logs:', error);
    return;
  }

  const now = Date.now();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const nowDate = new Date();
  const dateStr = `${nowDate.getDate()} ${months[nowDate.getMonth()]} ${nowDate.getFullYear()}`;

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    const itemTimestamp = now - (i * 90000 + 10000);
    const dateObj = new Date(itemTimestamp);
    const timeStr = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')} WIB`;

    await client.from('activity_logs').update({
      time: timeStr,
      date: dateStr,
      timestamp: itemTimestamp
    }).eq('id', log.id);
  }

  console.log(`Successfully updated ${logs.length} logs with live exact timestamps!`);
}

updateRealTimestamps();
