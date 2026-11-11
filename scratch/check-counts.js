const https = require('https');

function fetchPackages(tahun, limit = 50) {
  return new Promise((resolve) => {
    const qs = `tahun=${tahun}&kode_klpd=K34&limit=${limit}`;
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
          resolve({ tahun, count: j.data?.length, totalInPage: j.data?.length, sample: j.data?.slice(0, 3).map(p => ({ kode: p.kd_rup, nama: p.nama_paket, pagu: p.pagu, satker: p.nama_satker })) });
        } catch(e) {
          resolve({ tahun, error: e.message });
        }
      });
    });
    req.on('error', (e) => resolve({ tahun, error: e.message }));
    req.end();
  });
}

async function run() {
  const r2026 = await fetchPackages('2026', 100);
  console.log('2026:', JSON.stringify(r2026, null, 2));
  const r2025 = await fetchPackages('2025', 100);
  console.log('2025:', JSON.stringify(r2025, null, 2));
}

run();

