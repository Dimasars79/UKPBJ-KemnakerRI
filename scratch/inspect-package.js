const https = require('https');

function getOne() {
  const qs = 'tahun=2024&kode_klpd=K34';
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
      const json = JSON.parse(data);
      console.log('Total items in this page:', json.data?.length);
      console.log('First item structure:');
      console.log(JSON.stringify(json.data?.[0], null, 2));
      // check other keys in json
      console.log('Other keys:', Object.keys(json));
      if (json.pagination) console.log('Pagination:', json.pagination);
    });
  });
  req.on('error', (e) => console.error(e));
  req.end();
}

getOne();

