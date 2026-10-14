"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart3, FileSpreadsheet, Download, Search, Filter, 
  Plus, CheckCircle2, ChevronRight, Eye, Copy, Check, 
  Printer, Database, Shield, Layers, 
  Info, X
} from 'lucide-react';

type PeriodeType = 'Bulanan' | 'Triwulanan' | 'Tahunan' | 'Real-time';

interface StatistikDataItem {
  id: number;
  namaData: string;
  kategori: string;
  definisi: string;
  caraPemerolehan: string;
  tingkatKedetailan: string;
  periode: PeriodeType;
  relasiKodeStandar: string;
  taggingSPBE: string;
  kodeSDS: string;
  keterangan: string;
}

const INITIAL_STATISTIK_DATA: StatistikDataItem[] = [
  {
    id: 1,
    namaData: "Data Rencana Umum Pengadaan (RUP) Kemnaker",
    kategori: "Perencanaan",
    definisi: "Data mengenai rencana pengadaan barang/jasa yang disusun dan diumumkan oleh Pengguna Anggaran (PA/KPA) seluruh Satuan Kerja di lingkungan Kementerian Ketenagakerjaan melalui aplikasi SiRUP LKPP.",
    caraPemerolehan: "Kompilasi produk administratif melalui integrasi API SiRUP LKPP dan verifikasi sistem UKPBJ Kemnaker",
    tingkatKedetailan: "Per paket pengadaan, Satker/UPTP, jenis pengadaan (Barang, Konstruksi, Konsultansi, Jasa Lainnya), metode pemilihan, sumber dana, wilayah",
    periode: "Tahunan",
    relasiKodeStandar: "Kode Satker Kemenkeu, Kode KBLI BPS",
    taggingSPBE: "RAL.02.04.01 PERENCANAAN PENGADAAN BARANG DAN JASA KEMNAKER",
    kodeSDS: "SDS 10210101",
    keterangan: "Jumlah Paket Rencana Umum Pengadaan (RUP) Kemnaker"
  },
  {
    id: 2,
    namaData: "Data Paket Pengadaan Tender dan Seleksi (SPSE)",
    kategori: "Pemilihan",
    definisi: "Data mengenai paket pengadaan barang/jasa pemerintah yang dilaksanakan melalui metode tender terbuka dan seleksi jasa konsultansi menggunakan Sistem Pengadaan Secara Elektronik (SPSE) Kemnaker.",
    caraPemerolehan: "Kompilasi produk administratif melalui sinkronisasi database SPSE Kemnaker dan portal UKPBJ",
    tingkatKedetailan: "Per nomor tender/paket, unit kerja pengusul, nilai pagu/HPS, nilai penawaran, metode evaluasi, status tahapan lelang",
    periode: "Real-time",
    relasiKodeStandar: "Kode Klasifikasi Tender LKPP",
    taggingSPBE: "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
    kodeSDS: "SDS 10210102",
    keterangan: "Jumlah Paket Tender dan Seleksi Terlaksana"
  },
  {
    id: 3,
    namaData: "Data Paket Pengadaan Non-Tender (Pengadaan Langsung)",
    kategori: "Pemilihan",
    definisi: "Data mengenai pelaksanaan pengadaan barang/jasa bernilai hingga batas nominal tertentu yang dilaksanakan melalui metode Pengadaan Langsung dan Penunjukan Langsung oleh Pejabat Pengadaan.",
    caraPemerolehan: "Kompilasi produk administratif melalui aplikasi SPSE Non-Tender Kemnaker",
    tingkatKedetailan: "Per paket, Pejabat Pengadaan, penyedia terpilih, nilai kontrak, komoditas barang/jasa, satker",
    periode: "Bulanan",
    relasiKodeStandar: "Kode Transaksi Pengadaan Langsung",
    taggingSPBE: "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
    kodeSDS: "SDS 10210103",
    keterangan: "Jumlah Paket Non-Tender / Pengadaan Langsung"
  },
  {
    id: 4,
    namaData: "Data Transaksi E-Purchasing (Katalog Elektronik & Toko Daring)",
    kategori: "E-Purchasing",
    definisi: "Data transaksi pembelian barang/jasa pemerintah melalui sistem Katalog Elektronik (Katalog Nasional, Sektoral Ketenagakerjaan, dan Lokal) serta Toko Daring (Bela Pengadaan).",
    caraPemerolehan: "Kompilasi produk administratif transaksi modul E-Purchasing LKPP di lingkungan Kemnaker RI",
    tingkatKedetailan: "Per pesanan/transaksi, Pejabat Pembuat Komitmen (PPK), komoditas etalase, penyedia rekanan, nilai transaksi riil",
    periode: "Bulanan",
    relasiKodeStandar: "Kode KBKI BPS, ID Produk E-Katalog",
    taggingSPBE: "RAL.02.04.03 PENGADAAN SECARA ELEKTRONIK (E-PURCHASING)",
    kodeSDS: "SDS 10210104",
    keterangan: "Nilai dan Frekuensi Transaksi E-Purchasing Kemnaker"
  },
  {
    id: 5,
    namaData: "Data Kontrak Pengadaan Barang dan Jasa",
    kategori: "Kontrak",
    definisi: "Data mengenai perikatan hukum antara Pejabat Pembuat Komitmen (PPK) dengan Penyedia Barang/Jasa atas paket pekerjaan yang telah selesai proses pemilihannya.",
    caraPemerolehan: "Kompilasi produk administratif dokumen kontrak, Surat Perintah Kerja (SPK), dan Surat Perjanjian pada sistem pengadaan",
    tingkatKedetailan: "Per dokumen kontrak, nomor SPK, identitas penyedia, nilai kontrak, jangka waktu pelaksanaan, jaminan pelaksanaan, satker",
    periode: "Bulanan",
    relasiKodeStandar: "Kode NIB Penyedia, NPWP",
    taggingSPBE: "RAL.02.04.04 MANAJEMEN KONTRAK PENGADAAN KEMNAKER",
    kodeSDS: "SDS 10210105",
    keterangan: "Jumlah dan Nilai Kontrak Pengadaan Tertandatangani"
  },
  {
    id: 6,
    namaData: "Data Realisasi Anggaran Pengadaan Barang/Jasa",
    kategori: "Kinerja & P3DN",
    definisi: "Data capaian penyerapan anggaran pengadaan barang/jasa baik fisik maupun keuangan dibandingkan dengan alokasi pagu DIPA Kemnaker.",
    caraPemerolehan: "Rekonsiliasi data SPSE, SiRUP, dan Sistem Informasi Keuangan Kemnaker/Kemenkeu (SAKTI)",
    tingkatKedetailan: "Per satker, per program belanja (modal, operasional, jasa), persentase realisasi, deviasi target",
    periode: "Bulanan",
    relasiKodeStandar: "Bagan Akun Standar (BAS) Kemenkeu",
    taggingSPBE: "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
    kodeSDS: "SDS 10210106",
    keterangan: "Persentase Realisasi Anggaran Pengadaan Barang/Jasa"
  },
  {
    id: 7,
    namaData: "Data Penggunaan Produk Dalam Negeri (P3DN & Nilai TKDN)",
    kategori: "Kinerja & P3DN",
    definisi: "Data komitmen dan realisasi belanja produk buatan dalam negeri serta capaian persentase Tingkat Komponen Dalam Negeri (TKDN) pada belanja pengadaan Kemnaker.",
    caraPemerolehan: "Kompilasi produk administratif form pencatatan TKDN dan pelaporan e-katalog/SPSE Kemnaker",
    tingkatKedetailan: "Per paket pekerjaan, sertifikat TKDN, nilai belanja PDN vs Impor, satker pelaksana",
    periode: "Bulanan",
    relasiKodeStandar: "Sertifikat TKDN Kemenperin",
    taggingSPBE: "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
    kodeSDS: "SDS 10210107",
    keterangan: "Persentase Belanja Produk Dalam Negeri (PDN)"
  },
  {
    id: 8,
    namaData: "Data Belanja Pengadaan untuk Usaha Mikro, Kecil, dan Koperasi (UMKK)",
    kategori: "Kinerja & P3DN",
    definisi: "Data alokasi dan realisasi belanja pengadaan barang/jasa Kementerian Ketenagakerjaan yang diperuntukkan bagi pelaku Usaha Mikro, Kecil, dan Koperasi sesuai amanat regulasi pengadaan.",
    caraPemerolehan: "Kompilasi transaksi SPSE, E-Purchasing, dan Toko Daring terverifikasi kualifikasi UMKK",
    tingkatKedetailan: "Per paket pengadaan, NIB penyedia UMKK, nilai belanja UMKK, proporsi terhadap total belanja pengadaan",
    periode: "Bulanan",
    relasiKodeStandar: "Klasifikasi Usaha OSS Kemeninvest/BKPM",
    taggingSPBE: "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
    kodeSDS: "SDS 10210108",
    keterangan: "Persentase Realisasi Belanja Produk UMK dan Koperasi"
  },
  {
    id: 9,
    namaData: "Data Penyedia / Rekanan Terdaftar (SIKaP Kemnaker)",
    kategori: "Manajemen Penyedia",
    definisi: "Data mengenai profil pelaku usaha atau rekanan yang telah terkualifikasi dan terdaftar dalam Sistem Informasi Kinerja Penyedia (SIKaP) LKPP di lingkungan Kemnaker RI.",
    caraPemerolehan: "Kompilasi produk administratif verifikasi data kualifikasi penyedia oleh Pokja Pemilihan dan Pejabat Pengadaan",
    tingkatKedetailan: "Per entitas perusahaan, Nomor Induk Berusaha (NIB), NPWP, izin usaha/KBLI, riwayat pekerjaan, wilayah domisili",
    periode: "Bulanan",
    relasiKodeStandar: "Nomor Induk Berusaha (NIB) OSS",
    taggingSPBE: "RAL.02.04.06 MANAJEMEN PENYEDIA DAN VENDOR (SIKAP)",
    kodeSDS: "SDS 10210109",
    keterangan: "Jumlah Penyedia Barang/Jasa Terdaftar dan Terkualifikasi"
  },
  {
    id: 10,
    namaData: "Data Evaluasi Kinerja Penyedia (Vendor Performance Management)",
    kategori: "Manajemen Penyedia",
    definisi: "Data penilaian berkala atas performa dan kepatuhan penyedia dalam menyelesaikan kewajiban kontrak (mutu, ketepatan waktu, biaya, dan layanan).",
    caraPemerolehan: "Kompilasi formulir evaluasi penilaian kinerja yang diinput oleh PPK pada sistem pasca serah terima pekerjaan",
    tingkatKedetailan: "Per kontrak, ID penyedia, skor indikator kinerja (Sangat Baik, Baik, Cukup, Buruk), sanksi/denda",
    periode: "Triwulanan",
    relasiKodeStandar: "Indikator Kinerja Vendor LKPP",
    taggingSPBE: "RAL.02.04.06 MANAJEMEN PENYEDIA DAN VENDOR (SIKAP)",
    kodeSDS: "SDS 10210110",
    keterangan: "Indeks Kinerja Penyedia Pengadaan Barang/Jasa"
  },
  {
    id: 11,
    namaData: "Data Pejabat Fungsional Pengelola Pengadaan Barang/Jasa (JF PPBJ)",
    kategori: "SDM & Kelembagaan",
    definisi: "Data mengenai aparatur sipil negara yang menduduki jabatan fungsional keahlian pengelola pengadaan barang/jasa di lingkungan Kemnaker RI.",
    caraPemerolehan: "Kompilasi data kepegawaian Biro Perencanaan dan PBJ berkoordinasi dengan Biro Organisasi dan SDM Kemnaker",
    tingkatKedetailan: "Per individu/NIP, jenjang jabatan (Pertama, Muda, Madya, Utama), penempatan unit kerja, masa kerja",
    periode: "Bulanan",
    relasiKodeStandar: "Kode Jabatan Fungsional BKN",
    taggingSPBE: "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
    kodeSDS: "SDS 10210111",
    keterangan: "Jumlah Jabatan Fungsional Pengelola PBJ (JF PPBJ) Aktif"
  },
  {
    id: 12,
    namaData: "Data Personil Bersertifikat Kompetensi Pengadaan (Sertifikasi PBJ)",
    kategori: "SDM & Kelembagaan",
    definisi: "Data pegawai Kemnaker RI yang telah lulus dan memiliki sertifikat kompetensi keahlian pengadaan barang/jasa pemerintah tingkat dasar atau okupasi dari LKPP/BNSP.",
    caraPemerolehan: "Kompilasi produk administratif pendaftaran, ujian sertifikasi, dan validasi sertifikat kompetensi LKPP",
    tingkatKedetailan: "Per individu/pegawai, nomor sertifikat kompetensi, masa berlaku lisensi, unit eselon I asal",
    periode: "Bulanan",
    relasiKodeStandar: "Sertifikasi Okupasi PBJ LKPP",
    taggingSPBE: "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
    kodeSDS: "SDS 10210112",
    keterangan: "Jumlah Personil Bersertifikat Kompetensi PBJ"
  },
  {
    id: 13,
    namaData: "Data Pejabat Pembuat Komitmen (PPK) dan Pejabat Pengadaan Satker",
    kategori: "SDM & Kelembagaan",
    definisi: "Data mengenai aparatur yang ditetapkan melalui Keputusan Kuasa Pengguna Anggaran (KPA) sebagai PPK dan Pejabat Pengadaan pada setiap Satuan Kerja Kemnaker.",
    caraPemerolehan: "Kompilasi SK pengangkatan PPK dan Pejabat Pengadaan dari seluruh satker pusat dan UPTP daerah",
    tingkatKedetailan: "Per dokumen SK penetapan, nama pejabat, NIP, satker yang diampu, nomor sertifikat PBJ",
    periode: "Tahunan",
    relasiKodeStandar: "Kode Satker Kemnaker",
    taggingSPBE: "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
    kodeSDS: "SDS 10210113",
    keterangan: "Jumlah PPK dan Pejabat Pengadaan Ditetapkan"
  },
  {
    id: 14,
    namaData: "Data Kelompok Kerja (Pokja) Pemilihan UKPBJ Kemnaker",
    kategori: "Pemilihan",
    definisi: "Data penetapan dan penugasan Tim Pokja Pemilihan struktural (Pokja I, II, III, IV, dan Ad-Hoc) dalam melaksanakan pemilihan penyedia paket strategis.",
    caraPemerolehan: "Kompilasi SK Kepala UKPBJ Kemnaker tentang pembagian personil Pokja dan surat tugas pemilihan paket",
    tingkatKedetailan: "Per tim Pokja, personil anggota, paket tender yang ditugaskan, beban kerja per Pokja, durasi pemilihan",
    periode: "Bulanan",
    relasiKodeStandar: "SK Kelembagaan UKPBJ Kemnaker",
    taggingSPBE: "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
    kodeSDS: "SDS 10210114",
    keterangan: "Jumlah Penugasan Kelompok Kerja (Pokja) Pemilihan"
  },
  {
    id: 15,
    namaData: "Data Kegiatan Bimbingan Teknis (Bimtek) dan Sosialisasi PBJ",
    kategori: "SDM & Kelembagaan",
    definisi: "Data pelaksanaan program pelatihan, workshop, bimbingan teknis, dan sosialisasi regulasi baru PBJ bagi aparatur dan penyedia.",
    caraPemerolehan: "Kompilasi pencatatan agenda, daftar hadir peserta, dan materi bimtek pada portal UKPBJ",
    tingkatKedetailan: "Per agenda kegiatan, topik/modul pembinaan, narasumber, jumlah peserta hadir, evaluasi kepuasan",
    periode: "Bulanan",
    relasiKodeStandar: "Modul Pusdiklat PBJ LKPP",
    taggingSPBE: "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
    kodeSDS: "SDS 10210115",
    keterangan: "Frekuensi dan Peserta Bimtek Pengadaan Barang/Jasa"
  },
  {
    id: 16,
    namaData: "Data Layanan Konsultasi dan Pendampingan Pengadaan (Klinik PBJ)",
    kategori: "Tata Kelola & WBS",
    definisi: "Data permohonan dan pelaksanaan konsultasi teknis, telaah dokumen, probity advice, serta pendampingan pengadaan bagi satuan kerja.",
    caraPemerolehan: "Kompilasi tiket konsultasi daring, buku tamu klinik PBJ, dan berita acara hasil telaah konsultasi",
    tingkatKedetailan: "Per tiket konsultasi, satker pemohon, isu bahasan (HPS, spesifikasi teknis, kontrak, e-purchasing), rekomendasi solusi",
    periode: "Bulanan",
    relasiKodeStandar: "Kategori Permasalahan PBJ LKPP",
    taggingSPBE: "RAL.02.04.08 KONSULTASI DAN PENDAMPINGAN PBJ",
    kodeSDS: "SDS 10210116",
    keterangan: "Jumlah Konsultasi dan Pendampingan PBJ Terselesaikan"
  },
  {
    id: 17,
    namaData: "Data Pengaduan Pengadaan dan Sanggah Tender",
    kategori: "Tata Kelola & WBS",
    definisi: "Data penerimaan dan penanganan sanggah tender, sanggah banding, serta pengaduan masyarakat seputar pelaksanaan PBJ.",
    caraPemerolehan: "Kompilasi modul sanggah SPSE dan formulir kanal pengaduan/Whistleblowing System (WBS) UKPBJ Kemnaker",
    tingkatKedetailan: "Per nomor tiket aduan/sanggah, paket pekerjaan, substansi pengaduan, status telaah, rekomendasi tindak lanjut",
    periode: "Bulanan",
    relasiKodeStandar: "Kode Klasifikasi Aduan WBS KemenpanRB/Kemnaker",
    taggingSPBE: "RAL.02.04.09 PENGADUAN DAN PENGAWASAN PBJ",
    kodeSDS: "SDS 10210117",
    keterangan: "Jumlah Pengaduan dan Sanggah PBJ Tertangani"
  },
  {
    id: 18,
    namaData: "Data Tingkat Kematangan Kelembagaan UKPBJ (Maturity Level)",
    kategori: "Tata Kelola & WBS",
    definisi: "Data hasil penilaian dan pengukuran tingkat kematangan kelembagaan UKPBJ Kemnaker RI berdasarkan 4 domain (Proses Bisnis, Kelembagaan, SDM, dan Sistem Informasi) sesuai standar LKPP.",
    caraPemerolehan: "Hasil asesmen mandiri (Self-Assessment) dan validasi tim penilai kematangan UKPBJ LKPP",
    tingkatKedetailan: "Skor per variabel, level kematangan (Inisiasi, Berkembang, Proaktif, Kolaboratif, Strategis), bukti dukung dokumen",
    periode: "Tahunan",
    relasiKodeStandar: "Indeks Kematangan UKPBJ LKPP (Perka 10/2021)",
    taggingSPBE: "RAL.02.04.10 TATA KELOLA DAN KELEMBAGAAN UKPBJ",
    kodeSDS: "SDS 10210118",
    keterangan: "Nilai Tingkat Kematangan UKPBJ Kemnaker"
  },
  {
    id: 19,
    namaData: "Data Indeks Tata Kelola Pengadaan (ITKP) Kemnaker",
    kategori: "Tata Kelola & WBS",
    definisi: "Data indeks komposit pengukuran pemanfaatan sistem pengadaan, kualifikasi SDM, dan tata kelola pengadaan kementerian yang diterbitkan oleh LKPP.",
    caraPemerolehan: "Hasil rekapitulasi penilaian tahunan LKPP terhadap Kementerian Ketenagakerjaan RI",
    tingkatKedetailan: "Nilai total indeks ITKP, komponen pemanfaatan pengadaan digital, persentase e-purchasing, capaian RUP tepat waktu",
    periode: "Tahunan",
    relasiKodeStandar: "Standar Penilaian ITKP Nasional LKPP",
    taggingSPBE: "RAL.02.04.10 TATA KELOLA DAN KELEMBAGAAN UKPBJ",
    kodeSDS: "SDS 10210119",
    keterangan: "Skor Indeks Tata Kelola Pengadaan (ITKP) Kemnaker"
  },
  {
    id: 20,
    namaData: "Data Dokumen Standar Pemilihan (SDP) dan SOP Tata Kelola PBJ",
    kategori: "Tata Kelola & WBS",
    definisi: "Data mengenai inventaris regulasi internal, Standar Dokumen Pemilihan (SDP), Surat Edaran, Pedoman Teknis, dan Standar Operasional Prosedur (SOP) PBJ yang aktif di Kemnaker RI.",
    caraPemerolehan: "Kompilasi produk hukum dan peraturan yang diunggah serta dipublikasikan pada repositori portal UKPBJ",
    tingkatKedetailan: "Per dokumen regulasi, nomor ketetapan, tahun berlaku, kategori (SOP, SDP, SE, Kepmenaker), tautan unduh berkas",
    periode: "Triwulanan",
    relasiKodeStandar: "JDIH Kemnaker / JDIH Nasional",
    taggingSPBE: "RAL.02.04.11 MANAJEMEN PENGETAHUAN DAN REGULASI PBJ",
    kodeSDS: "SDS 10210120",
    keterangan: "Jumlah SOP dan Dokumen Standar PBJ Tersedia"
  }
];

export default function DataStatistikPage() {
  const { trans } = useLanguage();
  
  const [dataList, setDataList] = useState<StatistikDataItem[]>(INITIAL_STATISTIK_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [selectedPeriode, setSelectedPeriode] = useState('Semua');
  
  // Modal States
  const [detailModalItem, setDetailModalItem] = useState<StatistikDataItem | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // New Data Form State
  const [formData, setFormData] = useState<Partial<StatistikDataItem>>({
    namaData: '',
    kategori: 'Perencanaan',
    definisi: '',
    caraPemerolehan: 'Kompilasi produk administratif melalui aplikasi UKPBJ / SPSE Kemnaker',
    tingkatKedetailan: '',
    periode: 'Bulanan',
    relasiKodeStandar: '',
    taggingSPBE: 'RAL.02.04.01 PERENCANAAN PENGADAAN BARANG DAN JASA KEMNAKER',
    kodeSDS: '',
    keterangan: ''
  });

  const categories = useMemo(() => {
    const set = new Set(dataList.map(item => item.kategori));
    return ['Semua', ...Array.from(set)];
  }, [dataList]);

  const periods = ['Semua', 'Bulanan', 'Triwulanan', 'Tahunan', 'Real-time'];

  const filteredData = useMemo(() => {
    return dataList.filter(item => {
      const matchSearch = 
        item.namaData.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definisi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kodeSDS.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.taggingSPBE.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchKategori = selectedKategori === 'Semua' || item.kategori === selectedKategori;
      const matchPeriode = selectedPeriode === 'Semua' || item.periode === selectedPeriode;

      return matchSearch && matchKategori && matchPeriode;
    });
  }, [dataList, searchQuery, selectedKategori, selectedPeriode]);

  const handleCopyCode = (item: StatistikDataItem) => {
    navigator.clipboard.writeText(`${item.kodeSDS} - ${item.taggingSPBE}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaData || !formData.definisi) return;

    const newItem: StatistikDataItem = {
      id: dataList.length + 1,
      namaData: formData.namaData || '',
      kategori: formData.kategori || 'Perencanaan',
      definisi: formData.definisi || '',
      caraPemerolehan: formData.caraPemerolehan || '-',
      tingkatKedetailan: formData.tingkatKedetailan || '-',
      periode: (formData.periode as PeriodeType) || 'Bulanan',
      relasiKodeStandar: formData.relasiKodeStandar || '-',
      taggingSPBE: formData.taggingSPBE || 'RAL.02.04',
      kodeSDS: formData.kodeSDS || `SDS 10210${120 + dataList.length + 1}`,
      keterangan: formData.keterangan || '-'
    };

    setDataList([newItem, ...dataList]);
    setIsFormModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
    
    // Reset Form
    setFormData({
      namaData: '',
      kategori: 'Perencanaan',
      definisi: '',
      caraPemerolehan: 'Kompilasi produk administratif melalui aplikasi UKPBJ / SPSE Kemnaker',
      tingkatKedetailan: '',
      periode: 'Bulanan',
      relasiKodeStandar: '',
      taggingSPBE: 'RAL.02.04.01 PERENCANAAN PENGADAAN BARANG DAN JASA KEMNAKER',
      kodeSDS: '',
      keterangan: ''
    });
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-50/70 pb-24 -mt-[80px] md:-mt-[88px]">
        
        {/* HERO SECTION - Official Satu Data & SPBE Theme */}
        <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#06182C] via-[#0B2545] to-[#041220] text-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-4 font-medium flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">{trans('Beranda', 'Home')}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/informasi" className="hover:text-white transition-colors">{trans('Pusat Informasi', 'Information')}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-400 font-bold">{trans('Daftar Data Statistik (SMData)', 'Statistical Data Form (SMData)')}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Database className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Satu Data Kemnaker &middot; Definisi SMData Pusdatik</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Form Daftar Data Statistik <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-200 to-white">
                    Pengadaan Barang/Jasa (UKPBJ)
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {trans(
                    'Kompilasi resmi Standar Metadata Data (SMData) Pengadaan Barang dan Jasa Pemerintah Kementerian Ketenagakerjaan RI sesuai Referensi Arsitektur SPBE (RAL.02.04) dan Standar Data Statistik (SDS) Pusdatik Kemnaker.',
                    'Official compilation of Procurement Metadata Standards (SMData) of the Ministry of Manpower RI in accordance with SPBE Architecture Reference (RAL.02.04) and SDS Pusdatik.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <a
                  href="/docs/2026_Form_Daftar_Data_Statistik_UKPBJ_Kemnaker_Pusdatik.xlsx"
                  download="2026_Form_Daftar_Data_Statistik_UKPBJ_Kemnaker_Pusdatik.xlsx"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{trans('Unduh Excel Resmi (.xlsx)', 'Download Official Excel')}</span>
                </a>

                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>{trans('Tambah Usulan Data', 'Propose New Data')}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
                  title="Cetak Dokumen"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS KPI CARDS */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-8">
            
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/60 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{dataList.length}</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {trans('Indikator Data Statistik', 'Statistical Indicators')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/60 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{categories.length - 1}</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {trans('Klaster Domain PBJ', 'Procurement Clusters')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/60 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">RAL.02.04</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {trans('Tagging Arsitektur SPBE', 'SPBE Architecture Tag')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/60 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {trans('Kepatuhan Kode SDS', 'SDS Code Compliance')}
                </div>
              </div>
            </div>

          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={trans(
                    'Cari nama data, deskripsi, kode SDS, atau tagging SPBE...',
                    'Search data name, definition, SDS code, or SPBE tag...'
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-xs sm:text-sm text-slate-800 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Klaster:</span>
                  </span>
                  <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {categories.map((kat) => (
                      <option key={kat} value={kat}>{kat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-slate-500">Periode:</span>
                  <select
                    value={selectedPeriode}
                    onChange={(e) => setSelectedPeriode(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {periods.map((per) => (
                      <option key={per} value={per}>{per}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* MAIN DATA TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>Daftar Data Statistik (SMData Pusdatik) UKPBJ Kemnaker</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Menampilkan {filteredData.length} dari total {dataList.length} data statistik terdaftar
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Format SMData Pusdatik v2026.07
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-[#0B1E36] text-white text-[11px] uppercase tracking-wider font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-4 text-center w-12">No</th>
                    <th className="px-5 py-4 min-w-[220px]">Nama Data</th>
                    <th className="px-5 py-4 min-w-[320px]">Definisi / Deskripsi Data</th>
                    <th className="px-5 py-4 min-w-[240px]">Cara Pemerolehan Data</th>
                    <th className="px-4 py-4 min-w-[180px]">Tingkat Kedetailan</th>
                    <th className="px-4 py-4 text-center min-w-[130px]">Periode Pemutakhiran</th>
                    <th className="px-5 py-4 min-w-[220px]">Tagging Arsitektur SPBE</th>
                    <th className="px-5 py-4 min-w-[200px]">Kode SDS &amp; Keterangan</th>
                    <th className="px-4 py-4 text-center w-24">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-blue-50/50 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        }`}
                      >
                        {/* No */}
                        <td className="px-3 py-4 text-center font-bold text-slate-500">
                          {item.id}
                        </td>

                        {/* Nama Data */}
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 hover:text-blue-700 cursor-pointer" onClick={() => setDetailModalItem(item)}>
                            {item.namaData}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              {item.kategori}
                            </span>
                          </div>
                        </td>

                        {/* Definisi */}
                        <td className="px-5 py-4 text-xs leading-relaxed text-slate-600">
                          {item.definisi}
                        </td>

                        {/* Cara Pemerolehan */}
                        <td className="px-5 py-4 text-xs text-slate-600">
                          {item.caraPemerolehan}
                        </td>

                        {/* Tingkat Kedetailan */}
                        <td className="px-4 py-4 text-xs text-slate-600">
                          {item.tingkatKedetailan}
                        </td>

                        {/* Periode */}
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.periode === 'Real-time'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : item.periode === 'Bulanan'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : item.periode === 'Triwulanan'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}>
                            {item.periode}
                          </span>
                        </td>

                        {/* Tagging SPBE */}
                        <td className="px-5 py-4">
                          <div className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1.5 rounded-lg leading-relaxed">
                            {item.taggingSPBE}
                          </div>
                        </td>

                        {/* Kode SDS & Keterangan */}
                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mb-1">
                            {item.kodeSDS}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {item.keterangan}
                          </div>
                        </td>

                        {/* Aksi */}
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setDetailModalItem(item)}
                              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                              title="Lihat Detail Metadata"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCopyCode(item)}
                              className="p-1.5 rounded-lg hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 transition-colors"
                              title="Salin Kode SDS & SPBE"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-slate-500">
                        <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="font-bold text-slate-700">Tidak ada data statistik yang sesuai filter</p>
                        <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
              <div>
                Daftar data statistik ini mengadopsi standar <strong>Satu Data Indonesia</strong> dan <strong>Metadata Statistik Nasional (BPS/Pusdatik)</strong>.
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/docs/2026_Form_Daftar_Data_Statistik_UKPBJ_Kemnaker_Pusdatik.xlsx"
                  download
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .xlsx</span>
                </a>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* ================= MODAL DETAIL METADATA ================= */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/80 rounded-t-3xl">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Data #{detailModalItem.id} &middot; {detailModalItem.kategori}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1.5">
                  {detailModalItem.namaData}
                </h3>
              </div>
              <button 
                onClick={() => setDetailModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Definisi / Deskripsi Data</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {detailModalItem.definisi}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cara Pemerolehan Data</h4>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {detailModalItem.caraPemerolehan}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Periode Pemutakhiran</h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {detailModalItem.periode}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tingkat Kedetailan Data</h4>
                <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {detailModalItem.tingkatKedetailan}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Tagging Referensi Arsitektur SPBE
                </div>
                <div className="font-mono text-xs font-bold text-indigo-800 bg-white p-2.5 rounded-lg border border-indigo-200">
                  {detailModalItem.taggingSPBE}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Standar Data Statistik (SDS) &amp; Keterangan
                </div>
                <div className="font-mono text-xs font-bold text-emerald-800 bg-white p-2.5 rounded-lg border border-emerald-200">
                  {detailModalItem.kodeSDS} : {detailModalItem.keterangan}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-between items-center">
              <button
                onClick={() => handleCopyCode(detailModalItem)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                {copiedId === detailModalItem.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Kode SDS &amp; SPBE</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setDetailModalItem(null)}
                className="px-5 py-2 rounded-xl bg-primary-navy hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL TAMBAH USULAN DATA STATISTIK ================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/80 rounded-t-3xl">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Formulir SMData Pusdatik
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1.5">
                  Tambah Usulan Data Statistik PBJ
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daftarkan data statistik pengadaan baru untuk standarisasi Satu Data Kemnaker
                </p>
              </div>
              <button 
                onClick={() => setIsFormModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Data Statistik <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Data Realisasi Belanja E-Katalog per Satker"
                  value={formData.namaData}
                  onChange={(e) => setFormData({ ...formData, namaData: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Klaster Kategori PBJ
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm"
                  >
                    <option value="Perencanaan">Perencanaan</option>
                    <option value="Pemilihan">Pemilihan</option>
                    <option value="E-Purchasing">E-Purchasing</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Kinerja & P3DN">Kinerja &amp; P3DN</option>
                    <option value="Manajemen Penyedia">Manajemen Penyedia</option>
                    <option value="SDM & Kelembagaan">SDM &amp; Kelembagaan</option>
                    <option value="Tata Kelola & WBS">Tata Kelola &amp; WBS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Periode Pemutakhiran Data
                  </label>
                  <select
                    value={formData.periode}
                    onChange={(e) => setFormData({ ...formData, periode: e.target.value as PeriodeType })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm"
                  >
                    <option value="Real-time">Real-time</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Triwulanan">Triwulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Definisi / Deskripsi Data <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan ruang lingkup, tujuan, dan karakteristik data..."
                  value={formData.definisi}
                  onChange={(e) => setFormData({ ...formData, definisi: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cara Pemerolehan Data Statistik
                </label>
                <input
                  type="text"
                  placeholder="Kompilasi produk administratif melalui aplikasi..."
                  value={formData.caraPemerolehan}
                  onChange={(e) => setFormData({ ...formData, caraPemerolehan: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tingkat Kedetailan Data (Granularitas)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Per paket pengadaan, satker, jenis belanja, nilai riil"
                  value={formData.tingkatKedetailan}
                  onChange={(e) => setFormData({ ...formData, tingkatKedetailan: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tagging Referensi Arsitektur SPBE
                  </label>
                  <input
                    type="text"
                    placeholder="RAL.02.04.xx NAMA DOMAIN LAYANAN"
                    value={formData.taggingSPBE}
                    onChange={(e) => setFormData({ ...formData, taggingSPBE: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kode Standar Data Statistik (SDS)
                  </label>
                  <input
                    type="text"
                    placeholder="SDS 102101xx"
                    value={formData.kodeSDS}
                    onChange={(e) => setFormData({ ...formData, kodeSDS: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/30"
                >
                  Simpan Usulan Data
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* TOAST SUKSES */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-bold text-xs sm:text-sm">Usulan Data Berhasil Ditambahkan!</div>
            <div className="text-[11px] text-emerald-100">Data telah tercatat pada formulir SMData UKPBJ.</div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
