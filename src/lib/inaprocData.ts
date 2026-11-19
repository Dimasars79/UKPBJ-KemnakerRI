export interface InaprocSatkerItem {
  name: string;
  eselon1: string;
  packages: number;
  pagu: number;
  ekatCount: number;
  kontrakPct: number;
}

export interface InaprocMethodItem {
  key: 'Tender' | 'E-Purchasing' | 'Pengadaan Langsung' | 'Seleksi' | 'Lainnya';
  label: string;
  packages: number;
  pagu: number;
  pct: number;
}

export const INAPROC_TOTAL_PACKAGES = 8321;
export const INAPROC_TOTAL_PAGU = 2294477901971;
export const INAPROC_SPSE_EKAT_PACKAGES = 1979;

export const INAPROC_METHOD_TOTALS: InaprocMethodItem[] = [
  {
    key: 'Tender',
    label: 'Tender',
    packages: 30,
    pagu: 1204172487703,
    pct: 52.48
  },
  {
    key: 'E-Purchasing',
    label: 'E-Purchasing (e-Katalog)',
    packages: 1831,
    pagu: 540573731127,
    pct: 23.56
  },
  {
    key: 'Pengadaan Langsung',
    label: 'Pengadaan Langsung',
    packages: 6143,
    pagu: 359647831141,
    pct: 15.67
  },
  {
    key: 'Seleksi',
    label: 'Seleksi',
    packages: 31,
    pagu: 145930314000,
    pct: 6.36
  },
  {
    key: 'Lainnya',
    label: 'Lainnya (Penunjukan / Dikecualikan)',
    packages: 286,
    pagu: 44153538000,
    pct: 1.92
  }
];

export const INAPROC_SATKERS_44: InaprocSatkerItem[] = [
  { name: 'Direktorat Bina Kelembagaan Pelatihan Vokasi', eselon1: 'Ditjen Binalavotas', packages: 132, pagu: 1151518917703, ekatCount: 29, kontrakPct: 46.8 },
  { name: 'Badan Perencanaan dan Pengembangan Ketenagakerjaan', eselon1: 'Barenbang Ketenagakerjaan', packages: 199, pagu: 259566146000, ekatCount: 119, kontrakPct: 52.4 },
  { name: 'Sekretariat Jenderal Kemnaker', eselon1: 'Sekretariat Jenderal', packages: 530, pagu: 165111792000, ekatCount: 86, kontrakPct: 51.2 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Bandung', eselon1: 'Ditjen Binalavotas', packages: 205, pagu: 55269778000, ekatCount: 74, kontrakPct: 54.1 },
  { name: 'Ditjen Binapenta & Perluasan Kesempatan Kerja', eselon1: 'Ditjen Binapenta & PKK', packages: 204, pagu: 51406038000, ekatCount: 153, kontrakPct: 58.6 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Bandung Barat', eselon1: 'Ditjen Binalavotas', packages: 432, pagu: 39914224000, ekatCount: 41, kontrakPct: 47.5 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Serang', eselon1: 'Ditjen Binalavotas', packages: 114, pagu: 36490511000, ekatCount: 11, kontrakPct: 45.2 },
  { name: 'Pusat Pasar Kerja', eselon1: 'Sekretariat Jenderal', packages: 83, pagu: 35056178000, ekatCount: 65, kontrakPct: 62.15 },
  { name: 'Direktorat Bina Penyelenggaraan Pelatihan Vokasi & Pemagangan', eselon1: 'Ditjen Binalavotas', packages: 52, pagu: 34826570000, ekatCount: 10, kontrakPct: 44.8 },
  { name: 'Ditjen Pembinaan Hubungan Industrial & Jamsos Tenaga Kerja', eselon1: 'Ditjen PHI & Jamsos', packages: 427, pagu: 34226043000, ekatCount: 151, kontrakPct: 53.4 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Surakarta', eselon1: 'Ditjen Binalavotas', packages: 188, pagu: 33793133600, ekatCount: 174, kontrakPct: 64.2 },
  { name: 'Ditjen Pembinaan Pelatihan Vokasi dan Produktivitas', eselon1: 'Ditjen Binalavotas', packages: 250, pagu: 33076109327, ekatCount: 27, kontrakPct: 49.1 },
  { name: 'Ditjen Pembinaan Pengawasan Ketenagakerjaan dan K3', eselon1: 'Ditjen Binwasnaker & K3', packages: 264, pagu: 31699850000, ekatCount: 25, kontrakPct: 48.5 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Bekasi', eselon1: 'Ditjen Binalavotas', packages: 325, pagu: 24311475000, ekatCount: 12, kontrakPct: 46.3 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Ternate', eselon1: 'Ditjen Binalavotas', packages: 89, pagu: 23898927000, ekatCount: 1, kontrakPct: 43.2 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Banda Aceh', eselon1: 'Ditjen Binalavotas', packages: 346, pagu: 21422913000, ekatCount: 8, kontrakPct: 45.8 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Samarinda', eselon1: 'Ditjen Binalavotas', packages: 275, pagu: 20611671000, ekatCount: 41, kontrakPct: 50.4 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Banyuwangi', eselon1: 'Ditjen Binalavotas', packages: 162, pagu: 20330955000, ekatCount: 105, kontrakPct: 59.3 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Semarang', eselon1: 'Ditjen Binalavotas', packages: 117, pagu: 19554936000, ekatCount: 24, kontrakPct: 49.7 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Lombok Timur', eselon1: 'Ditjen Binalavotas', packages: 596, pagu: 17995690000, ekatCount: 386, kontrakPct: 61.8 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Padang', eselon1: 'Ditjen Binalavotas', packages: 41, pagu: 17650121000, ekatCount: 6, kontrakPct: 47.1 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Medan', eselon1: 'Ditjen Binalavotas', packages: 218, pagu: 15818630000, ekatCount: 25, kontrakPct: 48.9 },
  { name: 'Balai Besar Pelatihan Vokasi dan Produktivitas Makassar', eselon1: 'Ditjen Binalavotas', packages: 182, pagu: 15592235000, ekatCount: 35, kontrakPct: 51.5 },
  { name: 'Sekretariat Badan Nasional Sertifikasi Profesi', eselon1: 'Sekretariat Jenderal', packages: 64, pagu: 13948561000, ekatCount: 31, kontrakPct: 56.2 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Sidoarjo', eselon1: 'Ditjen Binalavotas', packages: 485, pagu: 13894425000, ekatCount: 36, kontrakPct: 46.9 },
  { name: 'Politeknik Ketenagakerjaan', eselon1: 'Sekretariat Jenderal', packages: 243, pagu: 11941140000, ekatCount: 6, kontrakPct: 45.4 },
  { name: 'Pusat Pengembangan Sumber Daya Manusia Ketenagakerjaan', eselon1: 'Sekretariat Jenderal', packages: 237, pagu: 9821608000, ekatCount: 50, kontrakPct: 52.8 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Sorong', eselon1: 'Ditjen Binalavotas', packages: 211, pagu: 8299662000, ekatCount: 2, kontrakPct: 44.1 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Bantaeng', eselon1: 'Ditjen Binalavotas', packages: 259, pagu: 8137267400, ekatCount: 44, kontrakPct: 50.6 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Kendari', eselon1: 'Ditjen Binalavotas', packages: 254, pagu: 7695515000, ekatCount: 4, kontrakPct: 44.5 },
  { name: 'Inspektorat Jenderal', eselon1: 'Inspektorat Jenderal', packages: 231, pagu: 7105856000, ekatCount: 57, kontrakPct: 54.8 },
  { name: 'Balai Besar Perluasan Kesempatan Kerja', eselon1: 'Ditjen Binapenta & PKK', packages: 104, pagu: 6955862000, ekatCount: 24, kontrakPct: 51.9 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Ambon', eselon1: 'Ditjen Binalavotas', packages: 240, pagu: 6748878000, ekatCount: 38, kontrakPct: 49.4 },
  { name: 'Balai Perluasan Kesempatan Kerja Bekasi', eselon1: 'Ditjen Binapenta & PKK', packages: 144, pagu: 5864189000, ekatCount: 2, kontrakPct: 45.0 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Pangkep', eselon1: 'Ditjen Binalavotas', packages: 69, pagu: 5695222000, ekatCount: 6, kontrakPct: 46.7 },
  { name: 'Balai Pelatihan Vokasi dan Produktivitas Belitung', eselon1: 'Ditjen Binalavotas', packages: 103, pagu: 5182210941, ekatCount: 25, kontrakPct: 53.1 },
  { name: 'Direktorat Bina Perluasan Kesempatan Kerja', eselon1: 'Ditjen Binapenta & PKK', packages: 57, pagu: 5078635000, ekatCount: 10, kontrakPct: 49.8 },
  { name: 'Balai Besar Keselamatan dan Kesehatan Kerja Jakarta', eselon1: 'Ditjen Binwasnaker & K3', packages: 49, pagu: 4280263000, ekatCount: 20, kontrakPct: 57.4 },
  { name: 'Balai Keselamatan dan Kesehatan Kerja Bandung', eselon1: 'Ditjen Binwasnaker & K3', packages: 23, pagu: 3352889000, ekatCount: 8, kontrakPct: 55.2 },
  { name: 'Balai Keselamatan dan Kesehatan Kerja Medan', eselon1: 'Ditjen Binwasnaker & K3', packages: 27, pagu: 2891648000, ekatCount: 2, kontrakPct: 46.1 },
  { name: 'Balai Keselamatan dan Kesehatan Kerja Makassar', eselon1: 'Ditjen Binwasnaker & K3', packages: 22, pagu: 2538401000, ekatCount: 1, kontrakPct: 43.8 },
  { name: 'Balai Perluasan Kesempatan Kerja Kendari', eselon1: 'Ditjen Binapenta & PKK', packages: 34, pagu: 2499093000, ekatCount: 1, kontrakPct: 44.6 },
  { name: 'Balai Keselamatan dan Kesehatan Kerja Samarinda', eselon1: 'Ditjen Binwasnaker & K3', packages: 20, pagu: 2317374000, ekatCount: 5, kontrakPct: 52.5 },
  { name: 'Balai Higiene Perusahaan, Kesehatan dan Keselamatan Kerja di Surabaya', eselon1: 'Ditjen Binwasnaker & K3', packages: 14, pagu: 1086359000, ekatCount: 1, kontrakPct: 43.5 }
];
