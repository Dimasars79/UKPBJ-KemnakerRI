"use client";

import React, { useState } from 'react';
import { 
  Landmark, 
  FileText, 
  Users, 
  Handshake, 
  Settings, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Award,
  BookOpen,
  Scale,
  ExternalLink,
  GitBranch,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface SubUnit {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  icon: React.ReactNode;
}

interface NodeData {
  id: string;
  titleId: string;
  titleEn: string;
  roleBadgeId: string;
  roleBadgeEn: string;
  category: 'pimpinan' | 'koordinator' | 'sekretariat' | 'pengelolaan' | 'kelembagaan' | 'spse';
  descId: string;
  descEn: string;
  legalBasis?: string;
  tugasId: string[];
  tugasEn: string[];
  subUnits?: SubUnit[];
  relatedLink?: {
    labelId: string;
    labelEn: string;
    href: string;
  };
  icon: React.ReactNode;
  theme: {
    accentColor: string;
    bgGradient: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    glow: string;
    lightBg: string;
  };
}

export const OrganizationChart = () => {
  const { trans } = useLanguage();
  const [activeTab, setActiveTab] = useState<'flowchart' | 'grid'>('flowchart');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const orgData: Record<string, NodeData> = {
    kepalaUkpbj: {
      id: 'kepalaUkpbj',
      titleId: 'Kepala UKPBJ',
      titleEn: 'Head of UKPBJ',
      roleBadgeId: 'Pimpinan Utama Unit Kerja',
      roleBadgeEn: 'Chief Executive Leadership',
      category: 'pimpinan',
      descId: 'Pimpinan tertinggi Unit Kerja Pengadaan Barang/Jasa Kemnaker RI yang memegang mandat strategis dalam penetapan kebijakan, pembinaan tata kelola, dan pertanggungjawaban menyeluruh seluruh aktivitas pengadaan di lingkungan Kementerian Ketenagakerjaan.',
      descEn: 'Highest executive leader of UKPBJ Kemnaker holding the strategic mandate for policy formulation, governance supervision, and overall accountability for all procurement activities across the Ministry of Manpower.',
      legalBasis: 'Perpres No. 12 Tahun 2021 & Permenaker No. 1 Tahun 2021 tentang Organisasi dan Tata Kerja Kemnaker',
      tugasId: [
        'Menetapkan arah kebijakan, strategi pengadaan tahunan, dan rencana kerja strategis UKPBJ.',
        'Mengoordinasikan pelaksanaan pengadaan barang/jasa yang transparan, terbuka, dan akuntabel.',
        'Membina hubungan kelembagaan dengan LKPP, BPK, BPKP, dan instansi pengawas terkait.',
        'Menetapkan dan mengevaluasi capaian kinerja seluruh kelompok kerja dan pejabat pengadaan.'
      ],
      tugasEn: [
        'Establish strategic procurement policies, annual operational guidelines, and UKPBJ milestones.',
        'Coordinate transparent, competitive, and accountable public procurement processes.',
        'Foster institutional partnerships with LKPP, BPK, BPKP, and relevant oversight authorities.',
        'Evaluate and oversee organizational performance targets across all working units.'
      ],
      icon: <Landmark className="w-6 h-6 text-white" />,
      theme: {
        accentColor: '#1E3A8A',
        bgGradient: 'from-[#0F2C59] via-[#1E3A8A] to-[#172554] text-white',
        border: 'border-blue-500/40',
        badgeBg: 'bg-amber-400/20 text-amber-300 border border-amber-400/30',
        badgeText: 'text-amber-300',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-900/40 ring-2 ring-white/20',
        glow: 'hover:shadow-[0_12px_36px_rgba(30,58,138,0.35)] hover:border-amber-300',
        lightBg: 'bg-blue-50/70 border-blue-200'
      }
    },
    kepalaBagian: {
      id: 'kepalaBagian',
      titleId: 'Kepala Bagian Layanan Pengadaan',
      titleEn: 'Head of Procurement Services Division',
      roleBadgeId: 'Koordinator Operasional Layanan',
      roleBadgeEn: 'Operational Service Coordinator',
      category: 'koordinator',
      descId: 'Pejabat struktural koordinator yang mengendalikan kelancaran operasional pengadaan barang/jasa, pengelolaan sistem LPSE/SPSE, tata usaha, serta pembinaan kelembagaan dan SDM pengadaan.',
      descEn: 'Structural coordinator overseeing daily procurement operations, LPSE/SPSE digital systems, administrative management, and institutional HR capacity development.',
      legalBasis: 'Permenaker tentang Rincian Tugas Unit Kerja Pengadaan Barang/Jasa',
      tugasId: [
        'Mengendalikan dan menyelaraskan alur kerja Tim Pengelolaan, Kelembagaan/SDM, SPSE, dan Sekretariat.',
        'Memastikan kepatuhan setiap tahapan pengadaan terhadap prinsip kehati-hatian dan regulasi LKPP.',
        'Menyusun laporan berkala pelaksanaan pengadaan kepada Kepala UKPBJ dan Pimpinan Kementerian.',
        'Menyelesaikan hambatan operasional dan melakukan mitigasi risiko proses tender/seleksi.'
      ],
      tugasEn: [
        'Harmonize workflows between Procurement, Institutional/HR, SPSE, and Secretariat teams.',
        'Ensure rigorous compliance with LKPP regulations and procurement governance standards.',
        'Prepare periodic procurement reports for the Head of UKPBJ and Ministry Leadership.',
        'Mitigate operational procurement risks and streamline selection bottlenecks.'
      ],
      icon: <FileText className="w-6 h-6 text-white" />,
      theme: {
        accentColor: '#2563EB',
        bgGradient: 'from-blue-600 via-indigo-600 to-blue-700 text-white',
        border: 'border-blue-400/40',
        badgeBg: 'bg-white/20 text-blue-100 border border-white/20',
        badgeText: 'text-blue-100',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-indigo-900/30 ring-2 ring-white/20',
        glow: 'hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:border-blue-200',
        lightBg: 'bg-indigo-50/70 border-indigo-200'
      }
    },
    sekretariat: {
      id: 'sekretariat',
      titleId: 'Sekretariat Tata Usaha',
      titleEn: 'Administrative Secretariat',
      roleBadgeId: 'Pilar Pendukung & Tata Usaha',
      roleBadgeEn: 'Administrative Support Pillar',
      category: 'sekretariat',
      descId: 'Unit penopang operasional yang menyelenggarakan layanan persuratan dinas, kearsipan dokumen kontrak pengadaan, logistik operasional, kepegawaian, dan pelaporan internal UKPBJ Kemnaker.',
      descEn: 'Operational support unit handling official correspondence, procurement contract archiving, logistics, staffing administration, and internal reporting.',
      legalBasis: 'Tata Kelola Administrasi dan Kearsipan Kementerian Ketenagakerjaan',
      tugasId: [
        'Pengelolaan tata naskah dinas, surat masuk/keluar, dan arsip dokumen pengadaan.',
        'Fasilitasi sarana, prasarana, perlengkapan kerja, dan logistik penunjang UKPBJ.',
        'Penyusunan rencana kebutuhan anggaran internal dan laporan pertanggungjawaban unit.',
        'Pelayanan administrasi kepegawaian dan absensi personil UKPBJ.'
      ],
      tugasEn: [
        'Manage official correspondence, dispatching, and secure procurement contract archives.',
        'Maintain facilities, IT peripherals, and operational supplies supporting UKPBJ duties.',
        'Formulate internal unit budget proposals and performance accountability reports.',
        'Administer personnel records and day-to-day administrative attendance.'
      ],
      icon: <Users className="w-5 h-5 text-white" />,
      theme: {
        accentColor: '#9333EA',
        bgGradient: 'from-purple-900 via-purple-800 to-indigo-950 text-white',
        border: 'border-purple-200',
        badgeBg: 'bg-purple-100 text-purple-800 border border-purple-200',
        badgeText: 'text-purple-700',
        iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-200',
        glow: 'hover:shadow-[0_10px_28px_rgba(147,51,234,0.18)] hover:border-purple-400',
        lightBg: 'bg-purple-50/80 border-purple-200/90 text-slate-800'
      }
    },
    pengelolaanPbj: {
      id: 'pengelolaanPbj',
      titleId: 'Tim Pengelolaan PBJ & Kelompok Kerja',
      titleEn: 'Procurement Management & Working Groups',
      roleBadgeId: 'Pilar Pelaksana Pemilihan',
      roleBadgeEn: 'Procurement Execution Pillar',
      category: 'pengelolaan',
      descId: 'Divisi inti fungsional yang merencanakan dan mengeksekusi proses pemilihan penyedia, penugasan Kelompok Kerja Pemilihan (POKJA), pengadaan langsung, e-purchasing, hingga evaluasi teknis dokumen penawaran.',
      descEn: 'Core functional division planning and executing vendor selection, Pokja task distribution, direct procurement, e-purchasing, and technical evaluation.',
      legalBasis: 'Standar Kompetensi Jabatan Fungsional Pengelola Pengadaan Barang/Jasa LKPP',
      tugasId: [
        'Perencanaan paket pengadaan dan penyusunan strategi pemilihan penyedia berkala.',
        'Penugasan dan koordinasi Pokja Pemilihan untuk paket tender/seleksi nasional.',
        'Pelaksanaan evaluasi kualifikasi, teknis, harga, dan klarifikasi faktual penawaran.',
        'Penyusunan Berita Acara Hasil Pemilihan (BAHP) dan penetapan calon penyedia.'
      ],
      tugasEn: [
        'Formulate procurement package schedules and selection methodologies.',
        'Assign and coordinate Pokja Working Groups for national tender and selection packages.',
        'Execute qualification, technical, and financial bid evaluations and on-site reviews.',
        'Compile formal Selection Minutes (BAHP) and declare winning bidders.'
      ],
      subUnits: [
        {
          id: 'pokjaTender',
          nameId: 'Tim Pokja Pemilihan (Tender & Seleksi)',
          nameEn: 'Selection Working Group (Tender & Selection)',
          descId: 'Melaksanakan pemilihan penyedia melalui metode Tender, Seleksi, dan Pengadaan Cepat.',
          descEn: 'Executing vendor selection via Open Tender, Competitive Selection, and Rapid Procurement.',
          icon: <FileText className="w-4 h-4 text-emerald-600" />
        },
        {
          id: 'pejabatPengadaan',
          nameId: 'Pejabat Pengadaan & Evaluasi Teknis',
          nameEn: 'Procurement Officers & Technical Review',
          descId: 'Melaksanakan pengadaan langsung, e-katalog kementerian, dan penelaahan spesifikasi teknis.',
          descEn: 'Managing direct procurement, e-catalogue purchases, and technical specification reviews.',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        }
      ],
      relatedLink: {
        labelId: 'Lihat Agenda & Paket Tender Aktif',
        labelEn: 'View Active Agenda & Tender Packages',
        href: '/agenda'
      },
      icon: <Handshake className="w-5 h-5 text-white" />,
      theme: {
        accentColor: '#059669',
        bgGradient: 'from-emerald-900 via-emerald-800 to-teal-950 text-white',
        border: 'border-emerald-200',
        badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        badgeText: 'text-emerald-700',
        iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-200',
        glow: 'hover:shadow-[0_10px_28px_rgba(5,150,105,0.18)] hover:border-emerald-400',
        lightBg: 'bg-emerald-50/80 border-emerald-200/90 text-slate-800'
      }
    },
    kelembagaanSdm: {
      id: 'kelembagaanSdm',
      titleId: 'Tim Kelembagaan & Pengembangan SDM',
      titleEn: 'Institutional & HR Capacity Team',
      roleBadgeId: 'Pilar Tata Kelola & Kompetensi',
      roleBadgeEn: 'Governance & Competency Pillar',
      category: 'kelembagaan',
      descId: 'Divisi strategis yang memacu peningkatan maturitas kelembagaan UKPBJ (Level Proaktif), penyusunan SOP pengadaan terstandarisasi, serta pembinaan dan sertifikasi kompetensi SDM Pengadaan Kemnaker.',
      descEn: 'Strategic division driving UKPBJ organizational maturity (Proactive Level), standardized SOPs, and competency certification for Kemnaker procurement personnel.',
      legalBasis: 'Model Kematangan UKPBJ LKPP & Peraturan Pembinaan Fungsional PBJ',
      tugasId: [
        'Mendorong pencapaian 9 Variabel Kematangan UKPBJ menuju predikat Proaktif.',
        'Menyusun dan memperbarui Standar Operasional Prosedur (SOP) dan pedoman teknis.',
        'Memfasilitasi pelatihan berkala, bimtek regulasi, dan uji sertifikasi keahlian PBJ.',
        'Monitoring pemenuhan angka kredit dan formasi Pejabat Fungsional PBJ.'
      ],
      tugasEn: [
        'Elevate 9 UKPBJ Maturity Variables towards the national Proactive standard.',
        'Draft and update Standard Operating Procedures (SOPs) and technical guidelines.',
        'Facilitate regular competency workshops, regulatory briefings, and certification exams.',
        'Monitor credit points and professional career structures for certified officers.'
      ],
      subUnits: [
        {
          id: 'subSdm',
          nameId: 'Sub-Unit Pengembangan SDM & Sertifikasi',
          nameEn: 'HR Development & Certification Sub-Unit',
          descId: 'Peningkatan kapasitas aparatur, diklat kompetensi, dan sertifikasi keahlian PBJ level 1 s/d fungsional.',
          descEn: 'Competency workshops, functional procurement career paths, and Level 1 certification.',
          icon: <GraduationCap className="w-4 h-4 text-amber-600" />
        },
        {
          id: 'subKelembagaan',
          nameId: 'Sub-Unit Tata Kelola & Maturitas Kelembagaan',
          nameEn: 'Governance & Maturity Sub-Unit',
          descId: 'Penyusunan instrumen tata kelola organisasi, SOP terintegrasi, dan pemenuhan standar UKPBJ LKPP.',
          descEn: 'Organizational governance instruments, integrated SOPs, and UKPBJ maturity standards.',
          icon: <Building2 className="w-4 h-4 text-amber-600" />
        }
      ],
      relatedLink: {
        labelId: 'Lihat Standar Operasional Prosedur (SOP)',
        labelEn: 'View Standard Operating Procedures (SOP)',
        href: '/informasi/sop'
      },
      icon: <Settings className="w-5 h-5 text-white" />,
      theme: {
        accentColor: '#D97706',
        bgGradient: 'from-amber-900 via-orange-800 to-amber-950 text-white',
        border: 'border-amber-200',
        badgeBg: 'bg-amber-100 text-amber-800 border border-amber-200',
        badgeText: 'text-amber-700',
        iconBg: 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-200',
        glow: 'hover:shadow-[0_10px_28px_rgba(217,119,6,0.18)] hover:border-amber-400',
        lightBg: 'bg-amber-50/80 border-amber-200/90 text-slate-800'
      }
    },
    spse: {
      id: 'spse',
      titleId: 'Tim Layanan SPSE & LPSE',
      titleEn: 'SPSE & LPSE Service Team',
      roleBadgeId: 'Pilar Sistem Digital & Helpdesk',
      roleBadgeEn: 'Digital Systems & Helpdesk Pillar',
      category: 'spse',
      descId: 'Divisi teknologi dan pelayanan publik yang mengelola infrastruktur Sistem Pengadaan Secara Elektronik (SPSE), verifikasi berkas penyedia, keamanan data, serta pusat bantuan (Helpdesk & Klinik Pengadaan).',
      descEn: 'Technology and public service division operating the Electronic Procurement System (SPSE), vendor credential verification, data security, and the Helpdesk / Procurement Clinic.',
      legalBasis: '17 Standar Layanan Pengadaan Secara Elektronik (LPSE) LKPP & ISO 27001',
      tugasId: [
        'Memelihara keandalan server, jaringan, dan integritas basis data portal SPSE Kemnaker.',
        'Melakukan verifikasi faktual berkas pendaftaran dan aktivasi akun penyedia rekanan.',
        'Menyediakan layanan konsultasi pengadaan (Klinik Pengadaan) dan helpdesk pengguna.',
        'Menjamin penerapan 17 Standar LPSE dan standar keamanan informasi (SMKI).'
      ],
      tugasEn: [
        'Maintain stability, security, and high availability of the Kemnaker SPSE portal.',
        'Verify vendor legal documentation and activate official vendor accounts.',
        'Operate the Procurement Clinic advisory desk and user helpdesk channels.',
        'Ensure continuous adherence to 17 National LPSE Standards and ISO 27001.'
      ],
      relatedLink: {
        labelId: 'Akses Layanan Klinik & Konsultasi Pengadaan',
        labelEn: 'Access Procurement Clinic & Advisory',
        href: '/layanan'
      },
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      theme: {
        accentColor: '#0284C7',
        bgGradient: 'from-sky-900 via-blue-800 to-cyan-950 text-white',
        border: 'border-sky-200',
        badgeBg: 'bg-sky-100 text-sky-800 border border-sky-200',
        badgeText: 'text-sky-700',
        iconBg: 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-200',
        glow: 'hover:shadow-[0_10px_28px_rgba(2,132,199,0.18)] hover:border-sky-400',
        lightBg: 'bg-sky-50/80 border-sky-200/90 text-slate-800'
      }
    }
  };

  return (
    <div className="w-full">
      {/* Control Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs">
        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'flowchart'
                ? 'bg-white text-primary-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-primary-blue" />
            <span>{trans('Bagan Alur (Flowchart)', 'Flowchart View')}</span>
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'grid'
                ? 'bg-white text-primary-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-primary-blue" />
            <span>{trans('Katalog Unit & Tupoksi', 'Unit Directory')}</span>
          </button>
        </div>

        {/* Legend / Info hint */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{trans('Klik kotak manapun untuk membuka lembar tugas & fungsi lengkap', 'Click any box to inspect full roles and responsibilities')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: FLOWCHART VIEW (MODERN HIERARCHICAL TREE)            */}
      {/* ============================================================ */}
      {activeTab === 'flowchart' && (
        <div className="relative w-full bg-gradient-to-b from-slate-50/90 to-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-auto shadow-xs">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none rounded-3xl" />

          <div className="relative min-w-[780px] lg:min-w-full flex flex-col items-center">
            
            {/* LEVEL 1: Kepala UKPBJ (Leadership Box) */}
            <div className="w-full max-w-[420px] z-20">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNode(orgData.kepalaUkpbj)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border ${orgData.kepalaUkpbj.theme.bgGradient} ${orgData.kepalaUkpbj.theme.border} ${orgData.kepalaUkpbj.theme.glow} shadow-lg transition-all duration-300 relative group`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${orgData.kepalaUkpbj.theme.iconBg}`}>
                    {orgData.kepalaUkpbj.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-1 bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>{trans(orgData.kepalaUkpbj.roleBadgeId, orgData.kepalaUkpbj.roleBadgeEn)}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                      {trans(orgData.kepalaUkpbj.titleId, orgData.kepalaUkpbj.titleEn)}
                    </h3>
                    <p className="text-xs text-blue-100/80 font-normal truncate mt-0.5">
                      {trans('Pengarah Kebijakan & Penanggung Jawab Utama', 'Policy Director & Principal Authority')}
                    </p>
                  </div>
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FLOW STEM 1 -> 2 */}
            <div className="flex flex-col items-center my-1 z-10">
              <div className="w-[3px] h-7 bg-gradient-to-b from-blue-700 to-blue-500 rounded-full" />
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-blue-500" />
            </div>

            {/* LEVEL 2: Kepala Bagian Layanan Pengadaan (Coordinator Box) */}
            <div className="w-full max-w-[440px] z-20">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNode(orgData.kepalaBagian)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-4.5 border ${orgData.kepalaBagian.theme.bgGradient} ${orgData.kepalaBagian.theme.border} ${orgData.kepalaBagian.theme.glow} shadow-md transition-all duration-300 relative group`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${orgData.kepalaBagian.theme.iconBg}`}>
                    {orgData.kepalaBagian.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1 bg-white/20 text-blue-100 border border-white/20">
                      <span>{trans(orgData.kepalaBagian.roleBadgeId, orgData.kepalaBagian.roleBadgeEn)}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
                      {trans(orgData.kepalaBagian.titleId, orgData.kepalaBagian.titleEn)}
                    </h3>
                    <p className="text-xs text-blue-100/80 font-normal truncate mt-0.5">
                      {trans('Koordinator Penyelenggara Pengadaan, LPSE & SDM', 'Procurement, LPSE & HR Coordinator')}
                    </p>
                  </div>
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* HORIZONTAL BRANCHING SYSTEM to 4 Pillars */}
            <div className="w-full max-w-5xl relative mt-2 mb-3 hidden md:block">
              {/* Vertical center stem down */}
              <div className="w-[2.5px] h-6 bg-slate-400 mx-auto" />
              
              {/* Horizontal Bar with Junctions */}
              <div className="h-[2.5px] bg-slate-400 rounded-full mx-[12.5%] relative">
                {/* Branch 1 Dropper: Sekretariat (0%) */}
                <div className="absolute left-0 top-0 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 -translate-y-1/2 ring-2 ring-white" />
                  <div className="w-[2.5px] h-6 bg-slate-400" />
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
                </div>

                {/* Branch 2 Dropper: Pengelolaan PBJ (33.33%) */}
                <div className="absolute left-[33.33%] -translate-x-1/2 top-0 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 -translate-y-1/2 ring-2 ring-white" />
                  <div className="w-[2.5px] h-6 bg-slate-400" />
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
                </div>

                {/* Branch 3 Dropper: Kelembagaan & SDM (66.66%) */}
                <div className="absolute left-[66.66%] -translate-x-1/2 top-0 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 -translate-y-1/2 ring-2 ring-white" />
                  <div className="w-[2.5px] h-6 bg-slate-400" />
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
                </div>

                {/* Branch 4 Dropper: SPSE & LPSE (100%) */}
                <div className="absolute right-0 top-0 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-600 -translate-y-1/2 ring-2 ring-white" />
                  <div className="w-[2.5px] h-6 bg-slate-400" />
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
                </div>
              </div>
            </div>

            {/* LEVEL 3 & 4: 4 COLUMNS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5 w-full max-w-5xl mt-2 z-10">
              
              {/* COLUMN 1: Sekretariat Tata Usaha */}
              <div className="flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(orgData.sekretariat)}
                  className={`cursor-pointer rounded-2xl p-4 border bg-white ${orgData.sekretariat.theme.border} ${orgData.sekretariat.theme.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${orgData.sekretariat.theme.iconBg}`}>
                        {orgData.sekretariat.icon}
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${orgData.sekretariat.theme.badgeBg}`}>
                        {trans('Dukungan', 'Support')}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-purple-700 transition-colors">
                      {trans(orgData.sekretariat.titleId, orgData.sekretariat.titleEn)}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                      {trans(orgData.sekretariat.descId, orgData.sekretariat.descEn)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-[11px] font-semibold text-purple-700">
                    <span>{trans('Lihat 4 Tugas Pokok', 'View 4 Key Duties')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* COLUMN 2: Pengelolaan PBJ & Pokja (With Sub-Units) */}
              <div className="flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(orgData.pengelolaanPbj)}
                  className={`cursor-pointer rounded-2xl p-4 border bg-white ${orgData.pengelolaanPbj.theme.border} ${orgData.pengelolaanPbj.theme.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${orgData.pengelolaanPbj.theme.iconBg}`}>
                        {orgData.pengelolaanPbj.icon}
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${orgData.pengelolaanPbj.theme.badgeBg}`}>
                        {trans('Pelaksana', 'Execution')}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
                      {trans(orgData.pengelolaanPbj.titleId, orgData.pengelolaanPbj.titleEn)}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {trans(orgData.pengelolaanPbj.descId, orgData.pengelolaanPbj.descEn)}
                    </p>

                    {/* Nested Sub-unit Badges */}
                    <div className="mt-3 space-y-1.5">
                      {orgData.pengelolaanPbj.subUnits?.map((sub) => (
                        <div key={sub.id} className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-1.5 px-2 flex items-center gap-1.5 text-[10px] text-emerald-900 font-medium">
                          {sub.icon}
                          <span className="truncate">{trans(sub.nameId, sub.nameEn)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                    <span>{trans('Lihat Tupoksi & Alur', 'View Duties & Flow')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* COLUMN 3: Kelembagaan & SDM (With Sub-Units) */}
              <div className="flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(orgData.kelembagaanSdm)}
                  className={`cursor-pointer rounded-2xl p-4 border bg-white ${orgData.kelembagaanSdm.theme.border} ${orgData.kelembagaanSdm.theme.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${orgData.kelembagaanSdm.theme.iconBg}`}>
                        {orgData.kelembagaanSdm.icon}
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${orgData.kelembagaanSdm.theme.badgeBg}`}>
                        {trans('Tata Kelola', 'Governance')}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-amber-700 transition-colors">
                      {trans(orgData.kelembagaanSdm.titleId, orgData.kelembagaanSdm.titleEn)}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {trans(orgData.kelembagaanSdm.descId, orgData.kelembagaanSdm.descEn)}
                    </p>

                    {/* Nested Sub-unit Badges */}
                    <div className="mt-3 space-y-1.5">
                      {orgData.kelembagaanSdm.subUnits?.map((sub) => (
                        <div key={sub.id} className="bg-amber-50/70 border border-amber-100 rounded-lg p-1.5 px-2 flex items-center gap-1.5 text-[10px] text-amber-900 font-medium">
                          {sub.icon}
                          <span className="truncate">{trans(sub.nameId, sub.nameEn)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] font-semibold text-amber-700">
                    <span>{trans('Maturitas & SDM', 'Maturity & HR')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* COLUMN 4: Tim Layanan SPSE */}
              <div className="flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(orgData.spse)}
                  className={`cursor-pointer rounded-2xl p-4 border bg-white ${orgData.spse.theme.border} ${orgData.spse.theme.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${orgData.spse.theme.iconBg}`}>
                        {orgData.spse.icon}
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${orgData.spse.theme.badgeBg}`}>
                        {trans('LPSE & SPSE', 'LPSE / SPSE')}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-sky-700 transition-colors">
                      {trans(orgData.spse.titleId, orgData.spse.titleEn)}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                      {trans(orgData.spse.descId, orgData.spse.descEn)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] font-semibold text-sky-700">
                    <span>{trans('Layanan IT & Helpdesk', 'IT & Helpdesk Service')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: DETAILED DIRECTORY / GRID VIEW                        */}
      {/* ============================================================ */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.values(orgData).map((node) => (
            <motion.div
              key={node.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedNode(node)}
              className="cursor-pointer bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${node.theme.iconBg}`}>
                      {node.icon}
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold mb-1 ${node.theme.badgeBg}`}>
                        {trans(node.roleBadgeId, node.roleBadgeEn)}
                      </span>
                      <h4 className="font-black text-base text-primary-navy leading-tight">
                        {trans(node.titleId, node.titleEn)}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {trans(node.descId, node.descEn)}
                </p>

                {/* Tupoksi Preview List */}
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2">
                  <h6 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {trans('Tupoksi Utama:', 'Key Responsibilities:')}
                  </h6>
                  <ul className="space-y-1.5">
                    {node.tugasId.slice(0, 2).map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{trans(t, node.tugasEn[idx])}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-blue">
                <span>{trans('Buka Rincian Lengkap', 'Open Full Specification')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* DETAIL MODAL DRAWER (POP-UP ON NODE CLICK)                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-primary-navy/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className={`p-5 sm:p-6 text-white relative ${selectedNode.theme.bgGradient}`}>
                <div className="flex items-center gap-4 pr-8">
                  <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${selectedNode.theme.iconBg}`}>
                    {selectedNode.icon}
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1.5 bg-white/20 text-white border border-white/20">
                      {trans(selectedNode.roleBadgeId, selectedNode.roleBadgeEn)}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                      {trans(selectedNode.titleId, selectedNode.titleEn)}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {/* Description */}
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary-blue" />
                    <span>{trans('Mandat & Deskripsi Jabatan', 'Mandate & Position Overview')}</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {trans(selectedNode.descId, selectedNode.descEn)}
                  </p>
                </div>

                {/* Legal Basis */}
                {selectedNode.legalBasis && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5">
                    <h6 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                      <Scale className="w-3 h-3 text-amber-600" />
                      <span>{trans('Dasar Hukum / Regulasi Acuan', 'Legal Basis & Reference')}</span>
                    </h6>
                    <p className="text-xs text-slate-700 font-medium">
                      {selectedNode.legalBasis}
                    </p>
                  </div>
                )}

                {/* Sub-Units (if any) */}
                {selectedNode.subUnits && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{trans('Sub-Unit Pelaksana', 'Operational Sub-Units')}</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedNode.subUnits.map((sub) => (
                        <div key={sub.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                          <div className="flex items-center gap-2 mb-1.5">
                            {sub.icon}
                            <span className="text-xs font-bold text-slate-800 leading-tight">
                              {trans(sub.nameId, sub.nameEn)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {trans(sub.descId, sub.descEn)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Functions / Tupoksi */}
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{trans('Rincian Tugas Pokok & Fungsi (Tupoksi)', 'Key Duties & Responsibilities')}</span>
                  </h5>
                  <ul className="space-y-2">
                    {selectedNode.tugasId.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{trans(tugas, selectedNode.tugasEn[idx])}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {selectedNode.relatedLink ? (
                  <Link
                    href={selectedNode.relatedLink.href}
                    onClick={() => setSelectedNode(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <span>{trans(selectedNode.relatedLink.labelId, selectedNode.relatedLink.labelEn)}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                ) : <div />}

                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-5 py-2 text-xs sm:text-sm font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl transition-colors"
                >
                  {trans('Tutup', 'Close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
