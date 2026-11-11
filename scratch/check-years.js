const https = require('https');

function testYear(year) {
  return new Promise((resolve) => {
    const qs = `tahun=${year}&kode_klpd=K34&limit=3`;
    const options = {
      hostname: 'data.inaproc.id',
      path: '/api/v1/rup/paket-penyedia-terumumkan?' + qs,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer inprcd36f6044c4c34e83abfcbe04b9a162d6',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          resolve({ year, count: j.data?.length, meta: j.meta, first: j.data?.[0]?.nama_paket });
        } catch(e) {
          resolve({ year, error: data.slice(0, 100) });
        }
      });
    });
    req.on('error', (e) => resolve({ year, error: e.message }));
    req.end();
  });
}

async function run() {
  for (const y of ['2026', '2025', '2024']) {
    const r = await testYear(y);
    console.log(y, '->', JSON.stringify(r));
  }
}

run();

