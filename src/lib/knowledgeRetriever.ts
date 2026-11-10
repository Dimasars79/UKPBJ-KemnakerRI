import { createClient } from '@supabase/supabase-js';

// Tipe Data Skema Database Supabase
interface AgendaRecord {
  title?: string;
  category?: string;
  date?: string;
  event_date?: string;
  time?: string;
  location?: string;
  organizer?: string;
  capacity?: string;
  status?: string;
}

interface RegulasiRecord {
  nomor?: string;
  tentang?: string;
  tahun?: string;
  kategori?: string;
  status?: string;
  file_size?: string;
}

interface SopRecord {
  judul?: string;
  kode?: string;
  unit?: string;
  revisi?: string;
  kategori?: string;
  tahapan_count?: number | string;
  status?: string;
}

interface NewsRecord {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  content?: string;
}

interface PackageRecord {
  title?: string;
  code?: string;
  category?: string;
  unit?: string;
  hps?: string;
  method?: string;
  deadline?: string;
  status?: string;
  description?: string;
}

interface SettingsRecord {
  announcement_banner?: string;
  server_status?: string;
  emergency_notice?: string;
}

// Setup Supabase admin client untuk akses server-side
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Basis pengetahuan statis untuk Menu Layanan & Fitur Portal UKPBJ Kemnaker serta Ekosistem LKPP & Kemnaker
const UKPBJ_SERVICES_KNOWLEDGE = [
  {
    id: 'layanan-lpse-umum',
    keywords: ['lpse', 'spse', 'inaproc', 'tender', 'seleksi', 'e-purchasing', 'katalog', 'lelang', 'akun spse', 'login lpse', 'daftar lpse'],
    dokumen: `<dokumen_sumber jenis="Panduan Portal Ekosistem" judul="LPSE (Layanan Pengadaan Secara Elektronik) & SPSE Kemnaker">
Deskripsi: Sistem penyelenggaraan pengadaan barang/jasa pemerintah secara elektronik terintegrasi nasional oleh LKPP RI.
Tautan Resmi: https://spse.inaproc.id/lkpp
Panduan Pendaftaran Akun Penyedia Baru:
1. Akses portal LPSE Kemnaker atau SPSE Inaproc, pilih menu 'Pendaftaran Penyedia'.
2. Masukkan alamat email perusahaan yang aktif untuk verifikasi awal.
3. Buka tautan konfirmasi di email dan isi formulir pendaftaran elektronik (NIB, NPWP, Akta, KBLI).
4. Verifikasi Berkas Fisik: Datangi Helpdesk LPSE Kemnaker (Gedung A Lt. 4 Kemnaker, Jakarta) atau kantor LPSE terdekat dengan membawa dokumen asli KTP Direktur, NPWP, NIB, dan surat kuasa (bila diwakilkan).
5. Akun aktif dan dapat langsung digunakan di seluruh LPSE se-Indonesia (Single Sign-On Inaproc).
Solusi Lupa Password / Kendala Akun:
- Gunakan fitur 'Lupa Password' pada halaman login SPSE dengan memasukkan User ID dan email terdaftar.
- Jika email sudah tidak aktif atau penanggung jawab berganti, kirimkan Surat Permohonan Reset Akun berkop resmi perusahaan ke email lpse@kemnaker.go.id atau WhatsApp Helpdesk: +62 898-8180-009.
</dokumen_sumber>`
  },
  {
    id: 'layanan-alur-tahapan-tender',
    keywords: ['alur tender', 'tahapan lelang', 'cara ikut tender', 'aanwijzing', 'penawaran', 'apendo', 'sanggah', 'pemenang', 'sppbj', 'evaluasi lelang'],
    dokumen: `<dokumen_sumber jenis="Panduan Regulasi & Prosedur" judul="Tahapan Lengkap Mengikuti Tender SPSE di UKPBJ Kemnaker">
Berdasarkan Perpres No. 12 Tahun 2021 dan Perlem LKPP No. 12 Tahun 2021, alur tender pengadaan adalah:
1. Pengumuman Tender: Pokja mengumumkan paket tender terbuka di SPSE. Penyedia login dan menekan tombol 'Ikuti Tender'.
2. Pengunduhan Dokumen Pemilihan (KAK, HPS, Rancangan Kontrak, Syarat Kualifikasi).
3. Pemberian Penjelasan (Aanwijzing): Forum tanya jawab teknis online di SPSE antara Pokja dan penyedia. Berita Acara Pemberian Penjelasan (BAPP) akan diterbitkan.
4. Pemasukan Dokumen Penawaran: Penawaran administrasi, teknis, dan harga dienkripsi menggunakan aplikasi APENDO (Aplikasi Pengaman Dokumen) lalu diunggah ke SPSE sebelum batas waktu.
5. Pembukaan & Evaluasi Penawaran: Pokja melakukan evaluasi kualifikasi, administrasi, teknis, dan harga/biaya (termasuk pembuktian kualifikasi).
6. Penetapan & Pengumuman Pemenang: Pengumuman calon pemenang dan pemenang cadangan di portal SPSE.
7. Masa Sanggah: Penyedia yang merasa ada ketidaksesuaian prosedur berhak mengajukan sanggahan resmi via SPSE selama 5 (lima) hari kalender.
8. Penerbitan SPPBJ (Surat Penunjukan Penyedia Barang/Jasa) dan Penandatanganan Kontrak kerja sama dengan PPK.
</dokumen_sumber>`
  },
  {
    id: 'layanan-sikap',
    keywords: ['sikap', 'kinerja', 'penyedia', 'vendor', 'kualifikasi', 'rekam jejak', 'data vendor', 'update sikap', 'profil vendor'],
    dokumen: `<dokumen_sumber jenis="Panduan Portal Ekosistem" judul="SIKaP (Sistem Informasi Kinerja Penyedia) LKPP">
Deskripsi: Sistem basis data terpusat LKPP yang menyimpan profil kualifikasi, izin usaha, pengalaman kerja, kapasitas keuangan, dan penilaian kinerja penyedia barang/jasa.
Tautan Resmi: https://sikap.inaproc.id/
Manfaat bagi Penyedia:
- Kualifikasi Otomatis: Dalam tender SPSE pascakualifikasi, data penyedia ditarik otomatis dari SIKaP tanpa perlu unggah ulang dokumen izin usaha berkali-kali.
- Syarat Masuk E-Katalog: Penyedia wajib memiliki status valid dan data terverifikasi di SIKaP untuk dapat bertransaksi di E-Katalog V6.
Komponen yang Wajib Diisi di SIKaP:
1. Izin Berusaha: NIB berbasis risiko dan KBLI yang masih berlaku dari OSS.
2. Akta Pendirian & Perubahan terakhir beserta SK Kemenkumham.
3. Manajerial & SDM Tenaga Ahli bersertifikat.
4. Pengalaman Pekerjaan (dilengkapi nomor kontrak dan BAST).
5. Pajak: Bukti lapor SPT Tahunan PPh Badan dan status Konfirmasi Status Wajib Pajak (KSWP) Valid.
</dokumen_sumber>`
  },
  {
    id: 'layanan-e-katalog-v6',
    keywords: ['katalog', 'e-katalog', 'katalog elektronik', 'e-purchasing', 'katalog v6', 'etalase', 'daftar produk', 'mini kompetisi', 'negosiasi'],
    dokumen: `<dokumen_sumber jenis="Panduan Portal Ekosistem" judul="E-Katalog LKPP (Katalog Elektronik Versi 6) & E-Purchasing">
Deskripsi: Aplikasi belanja online pemerintah resmi dari LKPP untuk pengadaan barang/jasa siap pakai secara cepat, transparan, dan akuntabel.
Tautan Resmi: https://e-katalog.lkpp.go.id/
Jenis E-Katalog:
1. Katalog Nasional: Dikelola langsung oleh LKPP untuk produk skala nasional.
2. Katalog Sektoral: Dikelola kementerian/lembaga (misal: etalase peralatan pelatihan vokasi Kemnaker).
3. Katalog Lokal: Dikelola pemerintah daerah.
Cara Penyedia Mendaftarkan Produk di E-Katalog V6:
1. Pastikan memiliki akun SPSE yang telah tersinkronisasi dengan SIKaP (status KSWP Valid).
2. Login ke portal E-Katalog V6 menggunakan akun SPSE Inaproc.
3. Pilih etalase produk yang sesuai dengan KBLI izin usaha perusahaan.
4. Unggah spesifikasi barang/jasa, sertifikat TKDN (bila ada), harga tayang, garansi, brosur, dan wilayah layanan.
5. Produk langsung tayang di katalog dan siap dibeli oleh PPK/Pejabat Pengadaan Kemnaker melalui proses E-Purchasing, negosiasi harga, atau mini-kompetisi.
</dokumen_sumber>`
  },
  {
    id: 'layanan-sirup-lkpp',
    keywords: ['sirup', 'rup', 'rencana umum', 'kode rup', 'paket rup', 'pengumuman rup', 'anggaran pengadaan'],
    dokumen: `<dokumen_sumber jenis="Panduan Portal Ekosistem" judul="SiRUP LKPP (Sistem Informasi Rencana Umum Pengadaan)">
Deskripsi: Aplikasi resmi LKPP untuk mengumumkan seluruh Rencana Umum Pengadaan (RUP) barang/jasa kementerian/lembaga/pemerintah daerah yang bersumber dari APBN/APBD.
Tautan Resmi: https://sirup.lkpp.go.id/
Fungsi Penting:
- Transparansi Belanja: Seluruh paket pengadaan Kemnaker (Tender, Seleksi, Pengadaan Langsung, E-Purchasing) wajib tayang di SiRUP sebelum proses pemilihan dimulai.
- Kode RUP: Setiap paket pengadaan memiliki identitas angka unik (Kode RUP, contoh: RUP-67840087) yang dapat dilacak jadwal pelaksanaan dan pagunya oleh masyarakat.
- Satuan Kerja Kemnaker: Pengguna dapat mencari paket belanja di SiRUP dengan filter Kementerian Ketenagakerjaan dan memilih Satker yang diinginkan (misal: Balai Besar Pelatihan Vokasi, Balai K3, Ditjen Hubungan Industrial, dsb.).
</dokumen_sumber>`
  },
  {
    id: 'layanan-bela-pengadaan-toko-daring',
    keywords: ['bela pengadaan', 'toko daring', 'umkm', 'usaha mikro', 'koperasi', 'pengadaan langsung 200 juta'],
    dokumen: `<dokumen_sumber jenis="Panduan Portal Ekosistem" judul="Bela Pengadaan & Toko Daring LKPP (Pemberdayaan UMK)">
Deskripsi: Program LKPP untuk mendorong belanja pengadaan langsung pemerintah bernilai hingga Rp 200 juta kepada pelaku Usaha Mikro, Kecil, dan Koperasi (UMK-Koperasi).
Fitur & Mitra: Terintegrasi dengan berbagai marketplace mitra e-marketplace nasional.
Komoditas yang sering ditransaksikan: Makanan & minuman rapat (katering), tiket perjalanan dinas, alat tulis kantor (ATK), jasa kurir/pengiriman, akomodasi hotel, dan sewa peralatan kerja.
</dokumen_sumber>`
  },
  {
    id: 'layanan-sertifikasi-pbj-lkpp',
    keywords: ['sertifikasi pbj', 'sertifikat lkpp', 'tingkat dasar', 'level 1', 'ujian pbj', 'ppsdm lkpp', 'mooc lkpp', 'kompetensi pbj'],
    dokumen: `<dokumen_sumber jenis="Panduan Sertifikasi & SDM" judul="Sertifikasi Keahlian Pengadaan Barang/Jasa LKPP (Level 1)">
Deskripsi: Standar kompetensi resmi bagi ASN, Pokja Pemilihan, PPK, dan Pejabat Pengadaan untuk membuktikan keahlian dalam hukum dan teknis PBJ pemerintah.
Tautan Resmi: https://ppsdm.lkpp.go.id/
Alur Sertifikasi Kompetensi:
1. Mengikuti pembelajaran mandiri / blended learning melalui Massive Open Online Courses (MOOC) LKPP.
2. Mengikuti Ujian Sertifikasi Pengadaan Barang/Jasa Tingkat Dasar / Level-1 dengan sistem CAT (Computer Assisted Test).
3. Peserta yang lulus (nilai minimal 65) memperoleh Sertifikat Kompetensi PBJ berstandar BNSP/LKPP ber-barcode resmi seumur hidup.
4. Di Kemnaker RI, informasi batch ujian internal dikoordinasikan oleh UKPBJ dan diumumkan pada menu Agenda portal (/agenda).
</dokumen_sumber>`
  },
  {
    id: 'layanan-ekosistem-kemnaker-siapkerja',
    keywords: ['siapkerja', 'kemnaker', 'karirhub', 'skillhub', 'sertihub', 'bizhub', 'bpvp', 'bbpvp', 'balai vokasi', 'pelatihan kerja'],
    dokumen: `<dokumen_sumber jenis="Layanan Terkait Kemnaker" judul="Ekosistem Layanan Ketenagakerjaan Kemnaker RI & Unit Satker">
Deskripsi: Layanan ketenagakerjaan resmi Kementerian Ketenagakerjaan RI yang terhubung dengan agenda belanja dan pemberdayaan SDM.
Portal SIAPkerja: https://siapkerja.kemnaker.go.id/
Komponen Utama:
1. Karirhub: Layanan lowongan pekerjaan dan rekrutmen tenaga kerja nasional.
2. Skillhub: Program pelatihan vokasi dan peningkatan keterampilan kerja di Balai Latihan Kerja Kemnaker.
3. Sertihub: Sertifikasi kompetensi profesi dan standar BNSP.
4. Bizhub: Pendampingan wirausaha mandiri dan tenaga kerja mandiri.
Balai Pelatihan Vokasi & Produktivitas (BPVP/BBPVP):
Satuan kerja di bawah Ditjen Pembinaan Pelatihan Vokasi dan Produktivitas (Binalavotas) Kemnaker yang rutin menyelenggarakan paket pengadaan peralatan pelatihan kejuruan (otomotif, las, garmen, pembuatan roti/kue, IT, pariwisata), seperti di BPVP Bandung Barat, BBPVP Bekasi, BBPVP Serang, BBPVP Semarang, BPVP Banyuwangi, dll.
</dokumen_sumber>`
  },
  {
    id: 'layanan-tkdn-siinas',
    keywords: ['tkdn', 'tingkat komponen', 'dalam negeri', 'p3dn', 'bmp', 'bobot manfaat', 'verifikasi tkdn', 'siinas', 'preferensi harga', 'kemenperin'],
    dokumen: `<dokumen_sumber jenis="Panduan Regulasi & Prosedur" judul="Panduan Sertifikasi TKDN Industri Kecil (Gratis) & Preferensi Harga Tender">
Aturan Wajib: Berdasarkan Inpres No. 2 Tahun 2022, instansi kementerian wajib mengalokasikan minimal 40% anggaran pengadaan untuk produk dalam negeri (PDN) dan UMKM.
Preferensi Harga Tender: Produk lokal dengan nilai TKDN minimal 25% berhak memperoleh insentif preferensi harga hingga maksimal 25% dalam evaluasi lelang SPSE.
Alur Pengajuan Sertifikat TKDN Industri Kecil (IK) Gratis via SIINas Kemenperin:
1. Buat akun di portal SIINas (https://siinas.kemenperin.go.id/) menggunakan NIB berbasis risiko.
2. Masuk ke menu e-Services -> Sertifikasi TKDN Industri Kecil.
3. Input data proses produksi, bukti pembelian bahan baku dalam negeri, dan data tenaga kerja WNI.
4. Verifikasi dokumen mandiri oleh Kelompok Kerja Verifikasi P3DN (Maksimal 5 hari kerja).
5. Sertifikat TKDN resmi diterbitkan secara mandiri, berbarcode tanda tangan elektronik, dan berlaku selama 3 tahun.
Simulasi Mandiri di Portal UKPBJ: Pengguna dapat menghitung estimasi nilai TKDN produk di menu Informasi -> Pengajuan Sertifikasi TKDN (/informasi/tkdn).
</dokumen_sumber>`
  },
  {
    id: 'layanan-clearing-house',
    keywords: ['clearing', 'house', 'sengketa', 'konsultasi', 'advokasi', 'mediasi', 'pendapat hukum', 'telaah', 'kontrak'],
    dokumen: `<dokumen_sumber jenis="Menu Layanan Portal" judul="Clearing House Pengadaan Barang/Jasa Kemnaker">
Deskripsi: Forum konsultasi hukum, mediasi pelaksanaan kontrak, dan mitigasi risiko PBJ bagi PPK, Pokja Pemilihan, dan Penyedia di lingkungan Kemnaker RI.
Layanan yang Disediakan:
1. Konsultasi & Telaah Hukum Klausul Kontrak (Multi-Years, Eskalasi Harga, Denda Keterlambatan).
2. Mediasi Keterlambatan Serah Terima Hasil Pekerjaan (PHO/FHO) & Penanganan Kondisi Kahar (Force Majeure).
3. Pendampingan Mitigasi Risiko Pengadaan bersama Inspektorat Jenderal Kementerian.
Alur Pengajuan: Masuk ke halaman /informasi/clearing-house pada portal UKPBJ -> Ajukan Konsultasi / Buat Tiket Baru -> Verifikasi berkas oleh Tim Advokasi -> Penjadwalan mediasi / terbit resume rekomendasi hukum.
</dokumen_sumber>`
  },
  {
    id: 'layanan-pengaduan-helpdesk',
    keywords: ['pengaduan', 'lapor', 'aduan', 'helpdesk', 'whatsapp', 'kontak', 'layanan', 'bantuan', 'call center', 'email', 'alamat', 'jam layanan'],
    dokumen: `<dokumen_sumber jenis="Kontak Resmi & Bantuan" judul="Helpdesk & Saluran Bantuan Resmi UKPBJ Kemnaker">
Saluran Komunikasi Resmi:
- WhatsApp Helpdesk: +62 898-8180-009
- Email Resmi: ukpbj@kemnaker.go.id / lpse@kemnaker.go.id
- Alamat Kantor: Gedung A Lantai 4, Kementerian Ketenagakerjaan RI, Jl. Gatot Subroto Kav. 51, Jakarta Selatan
- Jam Operasional: Senin - Jumat (08:00 - 16:00 WIB, istirahat 12:00 - 13:00 WIB)
Layanan yang Dilayani Helpdesk:
1. Bantuan kendala teknis login SPSE, SIKaP, dan lupa password akun penyedia.
2. Konsultasi teknis penyusunan dokumen persiapan pengadaan bagi satker.
3. Verifikasi berkas fisik pendaftaran rekanan baru.
4. Saluran resmi pelaporan kendala dan pengaduan layanan pengadaan transparan.
</dokumen_sumber>`
  },
  {
    id: 'sop-perencanaan-hps-kak',
    keywords: ['sop perencanaan', 'sop hps', 'sop kak', 'spesifikasi teknis', 'harga perkiraan sendiri', 'rancangan kontrak', 'reviu dokumen persiapan'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Penyusunan KAK, Spesifikasi Teknis, dan HPS (Harga Perkiraan Sendiri)">
Pelaksana: PPK (Pejabat Pembuat Komitmen), dibantu Tim Teknis / Tenaga Ahli Pengadaan.
Tujuan: Menjamin penetapan pagu, mutu spesifikasi, dan estimasi biaya realistis, akuntabel, dan bebas dari mark-up anggaran.
Tahapan Prosedur Kerja:
1. Penyusunan Spesifikasi Teknis/KAK: Menetapkan mutu, fungsi, volume, waktu penyerahan, dan lokasi pekerjaan dengan mengutamakan Produk Dalam Negeri (TKDN minimal 40%) serta produk bersertifikat SNI.
2. Survei Harga Pasar: Melakukan riset harga minimal dari 2-3 sumber independen yang sah (harga kontrak sejenis masa lalu, katalog elektronik, info pabrikan/distributor resmi, atau standar biaya masukan Kemenkeu).
3. Perhitungan dan Penetapan HPS: Menghitung harga satuan ditambah keuntungan wajar dan PPN (tidak boleh memasukkan unsur biaya tidak terduga/overhead fiktif). HPS ditandatangani oleh PPK paling lama 28 hari kerja sebelum batas akhir penawaran.
4. Penyusunan Rancangan Kontrak: Menentukan bentuk kontrak (Surat Pesanan, SPK, atau Surat Perjanjian) dan sistem pembayaran (Termin, Lumpsum, atau Harga Satuan).
Dokumen Output: Dokumen KAK, Kertas Kerja HPS yang ditandatangani PPK, dan Berita Acara Reviu Dokumen Persiapan bersama Pokja Pemilihan.
</dokumen_sumber>`
  },
  {
    id: 'sop-pelaksanaan-kontrak-bast',
    keywords: ['sop kontrak', 'sop bast', 'serah terima pekerjaan', 'spmk', 'pcm', 'addendum kontrak', 'cco', 'pho', 'fho', 'inspeksi barang'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Pelaksanaan Kontrak, Pengendalian Pekerjaan, dan Serah Terima (BAST)">
Pelaksana: PPK, Penyedia Barang/Jasa, Konsultan Pengawas, dan Tim Pengawas Mutu.
Tahapan Prosedur Kerja:
1. Penerbitan SPPBJ & Penyerahan Jaminan Pelaksanaan (bila disyaratkan untuk nilai di atas Rp 200 juta).
2. Penandatanganan Kontrak & Penerbitan SPMK (Surat Perintah Mulai Kerja): Maksimal 14 hari kerja setelah SPPBJ.
3. Rapat Persiapan Pelaksanaan Kontrak (Pre-Construction Meeting / PCM): Menyelaraskan jadwal pelaksanaan, metode kerja, dan spesifikasi detail.
4. Pengendalian Kontrak & Uji Mutu: Pemeriksaan progres berkala. Jika terjadi deviasi minus progres > 10%, PPK menerbitkan Surat Peringatan (SP) dan menggelar Show Cause Meeting (SCM).
5. Perubahan Kontrak (Addendum / CCO): Jika ada perubahan volume/spesifikasi di lapangan (maksimal penambahan 10% dari nilai kontrak awal), dibuat Berita Acara Negosiasi dan Addendum Kontrak resmi.
6. Pemeriksaan dan Serah Terima Pekerjaan (PHO/BAST): Penyedia mengajukan permohonan serah terima tertulis -> PPK/Tim Teknis melakukan uji fungsi dan verifikasi fisik -> Penandatanganan Berita Acara Serah Terima (BAST) dan Berita Acara Pembayaran (BAP).
Dokumen Output: SPMK, Notula PCM, Addendum Kontrak (bila ada), dan BAST resmi yang ditandatangani kedua belah pihak.
</dokumen_sumber>`
  },
  {
    id: 'sop-pengadaan-langsung',
    keywords: ['sop pengadaan langsung', 'pengadaan langsung', 'pl', 'spk 200 juta', 'pejabat pengadaan pl', 'bukti pembelian'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Pengadaan Langsung Barang/Jasa Lainnya (Nilai s.d. Rp 200 Juta)">
Pelaksana: Pejabat Pengadaan (PP), PPK, dan Calon Penyedia Barang/Jasa.
Tahapan Prosedur Kerja:
1. Penerimaan Berkas KAK & HPS dari PPK ke Pejabat Pengadaan.
2. Identifikasi & Pemilihan Calon Penyedia: Pejabat Pengadaan mencari penyedia yang memenuhi kualifikasi izin usaha dan terdaftar di SIKaP/LPSE.
3. Undangan Permintaan Penawaran & Negosiasi Teknis/Harga:
   - Untuk nilai s.d. Rp 50 juta: Cukup bukti pembelian/kuitansi/nota sederhana.
   - Untuk nilai Rp 50 juta s.d. Rp 200 juta: Dilakukan klarifikasi teknis dan negosiasi harga resmi dengan Berita Acara Klarifikasi dan Negosiasi Teknis/Biaya.
4. Penetapan Penyedia & Penyampaian Berita Acara Hasil Pengadaan Langsung (BAHPL) kepada PPK.
5. Penerbitan Surat Perintah Kerja (SPK) oleh PPK dan pelaksanaan pekerjaan oleh penyedia.
6. Serah Terima Barang/Jasa dan Pembayaran langsung (LS).
</dokumen_sumber>`
  },
  {
    id: 'sop-e-purchasing-katalog',
    keywords: ['sop e-purchasing', 'sop katalog', 'prosedur katalog', 'mini kompetisi', 'surat pesanan katalog', 'negosiasi e-katalog'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Pelaksanaan E-Purchasing melalui E-Katalog Versi 6">
Pelaksana: Pejabat Pengadaan (s.d. Rp 200 juta) atau PPK (di atas Rp 200 juta) dan Penyedia Katalog Elektronik.
Tahapan Prosedur Kerja:
1. Reviu Kebutuhan & Pencarian Produk: Pejabat Pengadaan / PPK menelusuri etalase E-Katalog Nasional/Sektoral/Lokal LKPP yang sesuai spesifikasi teknis dan prioritas produk ber-TKDN.
2. Metode Pemilihan Pembelian:
   - Pembelian Langsung / Negosiasi Harga: Untuk produk dengan harga tercantum, PPK/PP melakukan negosiasi harga, biaya kirim, dan ketersediaan stok via sistem.
   - Mini-Kompetisi: Untuk produk sejenis yang tersedia dari lebih dari 2 penyedia, sistem mengadu penawaran harga terbaik.
3. Penerbitan Surat Pesanan (SP): Kesepakatan harga dan waktu pengiriman disetujui, diterbitkan Surat Pesanan elektronik di aplikasi E-Katalog.
4. Pengiriman & Pemeriksaan Barang: Penyedia mengirim barang sesuai batas waktu Surat Pesanan. PPK memeriksa kondisi fisik dan kesesuaian serial number/spesifikasi.
5. BAST & Pembayaran: Penerbitan BAST digital di aplikasi E-Katalog dan pembayaran non-tunai kepada penyedia.
</dokumen_sumber>`
  },
  {
    id: 'sop-kinerja-dan-sanksi-daftar-hitam',
    keywords: ['sop kinerja penyedia', 'sop sanksi', 'sop daftar hitam', 'blacklist', 'wanprestasi', 'denda keterlambatan', 'putus kontrak'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Penilaian Kinerja Penyedia, Denda Keterlambatan, dan Sanksi Daftar Hitam">
Pelaksana: PPK, Pokja Pemilihan, dan UKPBJ Kemnaker.
Tahapan Prosedur Kerja:
1. Penilaian Kinerja Berkala di SIKaP: Setelah BAST selesai, PPK wajib menginput penilaian kinerja penyedia di sistem SIKaP pada 4 aspek: Kualitas/Kuantitas, Waktu, Biaya, dan Layanan.
2. Penanganan Keterlambatan & Denda:
   - Apabila terjadi keterlambatan penyelesaian pekerjaan karena kesalahan penyedia, dikenakan denda keterlambatan sebesar 1/1000 (satu permil) per hari dari nilai sisa bagian kontrak atau nilai total kontrak sebelum PPN.
   - PPK dapat memberikan kesempatan penyelesaian pekerjaan maksimal 50 hari kalender dengan pengenaan denda berjalan.
3. Pemutusan Kontrak Sepihak (Wanprestasi): Jika penyedia gagal menyelesaikan pekerjaan setelah batas waktu kesempatan, PPK memutus kontrak secara sepihak, mencairkan Jaminan Pelaksanaan untuk kas negara, dan menerbitkan surat usulan Daftar Hitam.
4. Penetapan Sanksi Daftar Hitam (Blacklist):
   - PPK menyampaikan usulan sanksi kepada Inspektorat Jenderal / PA / KPA.
   - Inspektorat Jenderal melakukan reviu dan klarifikasi.
   - PA/KPA menerbitkan Surat Keputusan Sanksi Daftar Hitam (berlaku 1 s.d. 2 tahun) dan ditayangkan di Portal Inaproc LKPP Nasional.
</dokumen_sumber>`
  },
  {
    id: 'sop-pembayaran-keuangan-pbj',
    keywords: ['sop pembayaran', 'sop tagihan', 'uang muka', 'pembayaran termin', 'spp-ls', 'spm', 'kppn', 'berkas pencairan'],
    dokumen: `<dokumen_sumber jenis="SOP Baku Pengadaan Pemerintah" judul="SOP Pengajuan dan Verifikasi Dokumen Pembayaran Pengadaan (APBN)">
Pelaksana: Penyedia, PPK, Pejabat Penandatangan SPM (PPSPM), dan Bendahara Pengeluaran.
Tahapan Prosedur Kerja:
1. Pengajuan Tagihan oleh Penyedia: Penyedia menyerahkan berkas tagihan lengkap (Surat Permohonan Pembayaran, Kuitansi bermeterai, BAST, BAP, Faktur Pajak elektronik, jaminan uang muka/pemeliharaan bila ada, dan bukti potong pajak).
2. Verifikasi Dokumen oleh PPK: PPK memeriksa kelengkapan administrasi dan fisik pekerjaan. Jika lengkap, PPK menerbitkan SPP-LS (Surat Permintaan Pembayaran Langsung).
3. Pengujian oleh PPSPM: Pejabat Penandatangan Surat Perintah Membayar (PPSPM) menguji kesesuaian DIPA/pagu anggaran dan keabsahan dokumen tagihan maksimal 2 hari kerja.
4. Penerbitan SPM-LS: PPSPM menerbitkan SPM (Surat Perintah Membayar) dan mengirimkannya secara digital ke KPPN (Kantor Pelayanan Perbendaharaan Negara).
5. Penerbitan SP2D oleh KPPN: KPPN memverifikasi SPM dan menerbitkan SP2D (Surat Perintah Pencairan Dana) langsung ke rekening bank penyedia.
</dokumen_sumber>`
  }
];

/**
 * Mencari informasi relevan dari database CMS Supabase dan menu layanan UKPBJ berdasarkan query pengguna.
 */
export async function retrieveKnowledge(query: string): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const lowerQuery = query.toLowerCase();

  // Stopwords umum bahasa Indonesia yang diabaikan saat ekstraksi kata kunci
  const stopWords = new Set([
    'yang', 'untuk', 'pada', 'adalah', 'dari', 'ke', 'di', 'dan', 'atau', 'ini', 'itu',
    'apakah', 'bagaimana', 'kapan', 'dimana', 'siapa', 'kenapa', 'mengapa', 'saya', 'kamu',
    'anda', 'bisa', 'tolong', 'info', 'tentang', 'mengenai', 'terkait', 'seputar', 'ada',
    'apa', 'saja', 'ingin', 'tahu', 'kasih', 'terima', 'dengan', 'dalam', 'oleh'
  ]);

  const rawWords = lowerQuery
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  const words = Array.from(new Set(rawWords)).slice(0, 5);

  // Deteksi intensi khusus
  const isAgendaQuery = /agenda|jadwal|acara|kegiatan|event|kapan|waktu|pelaksanaan|kalender|bimtek|sosialisasi|sertifikasi|rapat|aanwijzing|ujian|upacara/i.test(lowerQuery);
  const isServiceMenuQuery = /layanan|menu|fitur|website|portal|clearing|house|lpse|spse|sikap|tkdn|sertifikat|pengaduan|helpdesk|monitoring|perizinan/i.test(lowerQuery);
  const isEcosystemQuery = /lpse|spse|lkpp|inaproc|sikap|katalog|e-katalog|sirup|rup|bela pengadaan|toko daring|sertifikasi|apendo|tender|lelang|siapkerja|kemnaker|bpvp|bbpvp/i.test(lowerQuery);
  const isSopQuery = /sop|standar operasional|prosedur|alur kerja|mekanisme kerja|tahapan kerja|alur pelaksanaan|reviu dokumen|bast|spmk|pcm|serah terima|uang muka|termin|pembayaran pengadaan|denda|sanksi/i.test(lowerQuery);

  try {
    const results: string[] = [];

    // 1. Informasi Kontak & Status Sistem Resmi (site_settings dari Supabase CMS)
    try {
      const { data: settings } = await supabaseAdmin
        .from('site_settings')
        .select('*')
        .eq('id', 'global_config')
        .maybeSingle<SettingsRecord>();

      if (settings) {
        results.push(
          `<dokumen_sumber jenis="Pengaturan Portal" judul="Info Layanan & Kontak Resmi">\n` +
          `Pengumuman Berjalan: ${settings.announcement_banner || '-'}\n` +
          `Status Server: ${settings.server_status || 'Normal'}\n` +
          `Pemberitahuan Khusus: ${settings.emergency_notice || '-'}\n` +
          `Layanan WhatsApp Helpdesk: +62 898-8180-009\n` +
          `Email Resmi: ukpbj@kemnaker.go.id | lpse@kemnaker.go.id\n` +
          `Jam Layanan: Senin - Jumat (08:00 - 16:00 WIB)\n` +
          `Lokasi: Gedung A Lantai 4, Kementerian Ketenagakerjaan RI\n` +
          `</dokumen_sumber>`
        );
      }
    } catch (e) {
      console.warn('Failed to fetch site_settings:', e);
    }

    // 2. Hubungkan Menu Layanan UKPBJ & Ekosistem Terkait yang relevan
    UKPBJ_SERVICES_KNOWLEDGE.forEach(serv => {
      const match = serv.keywords.some(kw => lowerQuery.includes(kw));
      if (match || isServiceMenuQuery || isEcosystemQuery || isSopQuery) {
        results.push(serv.dokumen);
      }
    });

    // 3. Jika ada query terkait agenda atau jadwal secara eksplisit, ambil seluruh agenda aktif dari Supabase CMS
    if (isAgendaQuery) {
      try {
        const { data: allAgendas } = await supabaseAdmin
          .from('agendas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (allAgendas && allAgendas.length > 0) {
          (allAgendas as AgendaRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="Agenda Kegiatan" judul="${item.title || '-'}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Tanggal: ${item.date || item.event_date || '-'}\n` +
              `Waktu: ${item.time || '-'}\n` +
              `Lokasi: ${item.location || '-'}\n` +
              `Penyelenggara: ${item.organizer || '-'}\n` +
              `Kapasitas / Target Peserta: ${item.capacity || '-'}\n` +
              `Status Agenda: ${item.status || 'Terjadwal'}\n` +
              `</dokumen_sumber>`
            );
          });
        }
      } catch (e) {
        console.warn('Failed to fetch all agendas:', e);
      }
    }

    // 4. Pencarian Berdasarkan Kata Kunci Spesifik di Database CMS Supabase
    if (words.length > 0) {
      for (const kw of words) {
        const pattern = `%${kw}%`;

        const searches = await Promise.allSettled([
          supabaseAdmin
            .from('regulasi')
            .select('*')
            .or(`tentang.ilike.${pattern},nomor.ilike.${pattern},kategori.ilike.${pattern},tahun.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('sop')
            .select('*')
            .or(`judul.ilike.${pattern},kode.ilike.${pattern},unit.ilike.${pattern},kategori.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('news')
            .select('*')
            .or(`title.ilike.${pattern},content.ilike.${pattern},category.ilike.${pattern},author.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('agendas')
            .select('*')
            .or(`title.ilike.${pattern},category.ilike.${pattern},location.ilike.${pattern},organizer.ilike.${pattern},date.ilike.${pattern}`)
            .limit(3),
          supabaseAdmin
            .from('procurement_packages')
            .select('*')
            .or(`title.ilike.${pattern},code.ilike.${pattern},category.ilike.${pattern},unit.ilike.${pattern},method.ilike.${pattern}`)
            .limit(3)
        ]);

        const [regulasi, sop, news, agendas, packages] = searches;

        if (regulasi.status === 'fulfilled' && regulasi.value.data) {
          (regulasi.value.data as RegulasiRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="Regulasi" judul="${item.tentang || item.nomor || '-'}">\n` +
              `Nomor / Tahun: ${item.nomor || '-'} / ${item.tahun || '-'}\n` +
              `Tentang: ${item.tentang || '-'}\n` +
              `Kategori: ${item.kategori || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `Ukuran File: ${item.file_size || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (sop.status === 'fulfilled' && sop.value.data) {
          (sop.value.data as SopRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="SOP" judul="${item.judul || '-'}">\n` +
              `Kode SOP: ${item.kode || '-'}\n` +
              `Unit Kerja: ${item.unit || '-'}\n` +
              `Revisi: ${item.revisi || '-'}\n` +
              `Kategori: ${item.kategori || '-'}\n` +
              `Jumlah Tahapan: ${item.tahapan_count || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (news.status === 'fulfilled' && news.value.data) {
          (news.value.data as NewsRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="Berita" judul="${item.title || '-'}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Penulis: ${item.author || '-'}\n` +
              `Tanggal: ${item.date || '-'}\n` +
              `Ringkasan: ${item.excerpt || '-'}\n` +
              `Isi Berita: ${item.content || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (agendas.status === 'fulfilled' && agendas.value.data) {
          (agendas.value.data as AgendaRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="Agenda Kegiatan" judul="${item.title || '-'}">\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Tanggal: ${item.date || item.event_date || '-'}\n` +
              `Waktu: ${item.time || '-'}\n` +
              `Lokasi: ${item.location || '-'}\n` +
              `Penyelenggara: ${item.organizer || '-'}\n` +
              `Kapasitas / Target Peserta: ${item.capacity || '-'}\n` +
              `Status Agenda: ${item.status || 'Terjadwal'}\n` +
              `</dokumen_sumber>`
            );
          });
        }

        if (packages.status === 'fulfilled' && packages.value.data) {
          (packages.value.data as PackageRecord[]).forEach((item) => {
            results.push(
              `<dokumen_sumber jenis="Paket Pengadaan" judul="${item.title || '-'}">\n` +
              `Kode Paket: ${item.code || '-'}\n` +
              `Kategori: ${item.category || '-'}\n` +
              `Satuan Kerja: ${item.unit || '-'}\n` +
              `Nilai HPS: ${item.hps || '-'}\n` +
              `Metode Pemilihan: ${item.method || '-'}\n` +
              `Batas Waktu: ${item.deadline || '-'}\n` +
              `Status: ${item.status || '-'}\n` +
              `Deskripsi: ${item.description || '-'}\n` +
              `</dokumen_sumber>`
            );
          });
        }
      }
    }

    // 5. Fallback Default jika hasil pencarian masih minim
    if (results.length <= 1) {
      const searches = await Promise.allSettled([
        supabaseAdmin.from('news').select('*').order('created_at', { ascending: false }).limit(2),
        supabaseAdmin.from('agendas').select('*').order('created_at', { ascending: false }).limit(4),
        supabaseAdmin.from('procurement_packages').select('*').order('created_at', { ascending: false }).limit(2)
      ]);

      const [news, agendasFallback, packages] = searches;

      if (news.status === 'fulfilled' && news.value.data) {
        (news.value.data as NewsRecord[]).forEach((item) => {
          results.push(
            `<dokumen_sumber jenis="Berita Terbaru" judul="${item.title || '-'}">\n` +
            `Ringkasan: ${item.excerpt || item.content || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }

      if (agendasFallback.status === 'fulfilled' && agendasFallback.value.data) {
        (agendasFallback.value.data as AgendaRecord[]).forEach((item) => {
          results.push(
            `<dokumen_sumber jenis="Agenda Mendatang" judul="${item.title || '-'}">\n` +
            `Tanggal: ${item.date || item.event_date || '-'}\n` +
            `Waktu: ${item.time || '-'}\n` +
            `Lokasi: ${item.location || '-'}\n` +
            `Kategori: ${item.category || '-'}\n` +
            `Penyelenggara: ${item.organizer || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }

      if (packages.status === 'fulfilled' && packages.value.data) {
        (packages.value.data as PackageRecord[]).forEach((item) => {
          results.push(
            `<dokumen_sumber jenis="Paket Pengadaan Terbaru" judul="${item.title || '-'}">\n` +
            `Kategori: ${item.category || '-'}\n` +
            `HPS: ${item.hps || '-'}\n` +
            `Status: ${item.status || '-'}\n` +
            `</dokumen_sumber>`
          );
        });
      }
    }

    const uniqueResults = Array.from(new Set(results));
    return uniqueResults.join('\n\n');
  } catch (error) {
    console.error('Error in retrieveKnowledge:', error);
    return '';
  }
}
