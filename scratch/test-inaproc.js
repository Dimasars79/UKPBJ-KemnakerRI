const https = require('https');

function getPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'data.inaproc.id',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(data));
    });
    req.on('error', (e) => resolve(''));
    req.end();
  });
}

async function run() {
  const html = await getPage('/docs');
  const matches = html.match(/src="(\/docs\/_next\/static\/chunks\/[^"]+)"/g) || [];
  const scriptPaths = matches.map(m => m.replace('src="', '').replace('"', ''));
  console.log('Found scripts count:', scriptPaths.length);

  for (const s of scriptPaths) {
    const code = await getPage(s);
    if (code.includes('paket-penyedia-terumumkan')) {
      console.log('Found in script:', s);
      const idx = code.indexOf('paket-penyedia-terumumkan');
      console.log(code.substring(Math.max(0, idx - 200), idx + 600));
    }
    if (code.includes('kode_klpd')) {
      console.log('kode_klpd in:', s);
    }
  }
}

run();

