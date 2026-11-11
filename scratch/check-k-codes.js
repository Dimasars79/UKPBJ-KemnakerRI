const https = require('https');

function test(kode) {
  return new Promise((resolve) => {
    const qs = `tahun=2024&kode_klpd=${kode}`;
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
      res.on('end', () => resolve({ kode, status: res.statusCode, body: data }));
    });
    req.on('error', (e) => resolve({ kode, error: e.message }));
    req.end();
  });
}

async function run() {
  const codes = [];
  for (let i = 1; i <= 35; i++) {
    codes.push('K' + i);
  }
  for (const c of codes) {
    const res = await test(c);
    if (res.status === 200) {
      console.log('SUCCESS! Found kode_klpd:', c);
      console.log('Body:', res.body.slice(0, 500));
      return;
    } else if (!res.body.includes('tidak diizinkan')) {
      console.log(c, 'returned:', res.status, res.body.slice(0, 150));
    }
  }
  console.log('None of K1-K35 succeeded.');
}

run();

