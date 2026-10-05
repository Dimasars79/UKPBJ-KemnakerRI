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
  Sparkles,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface NodeData {
  id: string;
  titleId: string;
  titleEn: string;
  category: 'pimpinan' | 'koordinator' | 'sekretariat' | 'pengelolaan' | 'kelembagaan' | 'spse';
  descId: string;
  descEn: string;
  tugasId: string[];
  tugasEn: string[];
  icon: React.ReactNode;
  theme: {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconText: string;
    hoverShadow: string;
    connectorColor: string;
  };
}

export const OrganizationChart = () => {
  const { trans } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const orgNodes: Record<string, NodeData> = {
    kepalaUkpbj: {
      id: 'kepalaUkpbj',
      titleId: 'Kepala UKPBJ',
      titleEn: 'Head of UKPBJ',
      category: 'pimpinan',
      descId: 'Pimpinan tertinggi Unit Kerja Pengadaan Barang/Jasa Kemnaker RI yang bertanggung jawab atas seluruh kebijakan, perumusan strategi, dan pengawasan tata kelola pengadaan kementerian.',
      descEn: 'Highest executive leader of the Kemnaker RI Procurement Unit responsible for all strategic formulation, procurement policy, and ministry-wide oversight.',
      tugasId: [
        'Merumuskan kebijakan teknis dan strategis pengadaan barang/jasa.',
        'Mengoordinasikan pelaksanaan tata kelola pengadaan yang kredibel dan akuntabel.',
        'Membina, mengawasi, dan mengevaluasi seluruh unit kerja di bawah UKPBJ.'
      ],
      tugasEn: [
        'Formulate technical and strategic policies for public procurement.',
        'Coordinate the implementation of credible and accountable procurement governance.',
        'Supervise, mentor, and evaluate all functional teams under UKPBJ.'
      ],
      icon: <Landmark className="w-6 h-6 text-white" />,
      theme: {
        bg: 'bg-gradient-to-r from-blue-900 via-primary-navy to-slate-900 text-white',
        border: 'border-blue-700/60 shadow-xl shadow-blue-950/20',
        badgeBg: 'bg-blue-800/80',
        badgeText: 'text-amber-300',
        iconBg: 'bg-blue-600/60 border border-blue-400/40',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-2xl hover:shadow-blue-900/30 hover:border-amber-400/60',
        connectorColor: 'bg-blue-600'
      }
    },
    kepalaBagian: {
      id: 'kepalaBagian',
      titleId: 'Kepala Bagian Layanan Pengadaan',
      titleEn: 'Head of Procurement Services Division',
      category: 'koordinator',
      descId: 'Pejabat struktural yang memimpin Bagian Layanan Pengadaan, bertindak sebagai koordinator operasional pengelolaan pengadaan barang/jasa, LPSE, dan kelembagaan SDM.',
      descEn: 'Structural official leading the Procurement Services Division, coordinating procurement operations, SPSE/LPSE system, and institutional HR capacity building.',
      tugasId: [
        'Mengendalikan dan mengoordinasikan operasionalisasi unit pengadaan.',
        'Memantau kepatuhan prosedur regulasi pengadaan barang/jasa pemerintah.',
        'Menjamin integrasi layanan antara Tim Pengelolaan, Kelembagaan, dan SPSE.'
      ],
      tugasEn: [
        'Direct and coordinate daily operational procurement workflows.',
        'Monitor procedural compliance with government procurement regulations.',
        'Ensure seamless synergy between Procurement, Institutional, and SPSE teams.'
      ],
      icon: <FileText className="w-6 h-6 text-white" />,
      theme: {
        bg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
        border: 'border-blue-400/50 shadow-lg shadow-blue-500/15',
        badgeBg: 'bg-blue-700/60',
        badgeText: 'text-blue-100',
        iconBg: 'bg-blue-500/50 border border-blue-300/40',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-xl hover:shadow-indigo-500/25 hover:border-white/80',
        connectorColor: 'bg-indigo-600'
      }
    },
    sekretariat: {
      id: 'sekretariat',
      titleId: 'Sekretariat Tata Usaha',
      titleEn: 'Administrative Secretariat',
      category: 'sekretariat',
      descId: 'Unit pendukung ketatausahaan, persuratan, kearsipan, administrasi kepegawaian, sarana prasarana, dan pelaporan internal UKPBJ Kemnaker.',
      descEn: 'Support unit for office management, correspondence, filing, staffing administration, logistics, and internal reporting of UKPBJ Kemnaker.',
      tugasId: [
        'Melaksanakan pengelolaan surat-menyurat dan kearsipan dokumen UKPBJ.',
        'Mengelola administrasi ketatausahaan, perlengkapan, dan sarana operasional.',
        'Mengoordinasikan penyusunan laporan akuntabilitas kinerja unit.'
      ],
      tugasEn: [
        'Manage official correspondence and institutional procurement filing.',
        'Administer general office operations, supplies, and logistics.',
        'Coordinate the compilation of organizational performance reports.'
      ],
      icon: <Users className="w-5 h-5 text-white" />,
      theme: {
        bg: 'bg-purple-50/90 hover:bg-purple-50 text-slate-800',
        border: 'border-purple-300 hover:border-purple-500',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-700',
        iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-600/30',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-xl hover:shadow-purple-500/15',
        connectorColor: 'bg-purple-500'
      }
    },
    pengelolaanPbj: {
      id: 'pengelolaanPbj',
      titleId: 'Tim Pengelolaan PBJ',
      titleEn: 'Procurement Management Team',
      category: 'pengelolaan',
      descId: 'Tim fungsional yang mengelola siklus pengadaan barang/jasa pemerintah, penyusunan strategi pemilihan, serta pembagian penugasan Kelompok Kerja (POKJA).',
      descEn: 'Functional team managing the procurement lifecycle, vendor selection strategy, and allocation of Procurement Working Groups (POKJA).',
      tugasId: [
        'Merencanakan dan mengelola paket pengadaan barang/jasa berkala.',
        'Mengoordinasikan penugasan Pokja Pemilihan untuk paket tender/seleksi.',
        'Memantau progres pemilihan penyedia dan mitigasi kendala pemilihan.'
      ],
      tugasEn: [
        'Plan and manage scheduled goods and services procurement packages.',
        'Coordinate assignments of Working Groups (POKJA) for tenders and selections.',
        'Monitor vendor selection progress and mitigate procedural risks.'
      ],
      icon: <Handshake className="w-5 h-5 text-white" />,
      theme: {
        bg: 'bg-emerald-50/90 hover:bg-emerald-50 text-slate-800',
        border: 'border-emerald-300 hover:border-emerald-500',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-700',
        iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-xl hover:shadow-emerald-500/15',
        connectorColor: 'bg-emerald-500'
      }
    },
    pokja1: {
      id: 'pokja1',
      titleId: 'Tim POKJA',
      titleEn: 'POKJA Team (Working Group)',
      category: 'pengelolaan',
      descId: 'Kelompok Kerja Pemilihan yang bertugas menyusun dokumen tender/seleksi, melakukan kualifikasi, evaluasi penawaran, dan menetapkan calon pemenang tender.',
      descEn: 'Selection Working Group responsible for drafting tender documents, qualifying vendors, evaluating bids, and determining winning tenderers.',
      tugasId: [
        'Menyusun dan menetapkan dokumen pemilihan penyedia.',
        'Melakukan evaluasi administrasi, teknis, kualifikasi, dan harga penawaran.',
        'Menetapkan pemenang tender/seleksi sesuai regulasi pengadaan LKPP.'
      ],
      tugasEn: [
        'Draft and issue tender and selection documentation.',
        'Perform administrative, technical, qualification, and financial bid evaluations.',
        'Determine and announce successful winning vendors in compliance with LKPP rules.'
      ],
      icon: <FileText className="w-4.5 h-4.5 text-white" />,
      theme: {
        bg: 'bg-emerald-50/70 hover:bg-emerald-50 text-slate-800',
        border: 'border-emerald-300/80 hover:border-emerald-500',
        badgeBg: 'bg-emerald-100/90',
        badgeText: 'text-emerald-800',
        iconBg: 'bg-emerald-600 text-white shadow-sm',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-lg hover:shadow-emerald-500/15',
        connectorColor: 'bg-emerald-500'
      }
    },
    pokja2: {
      id: 'pokja2',
      titleId: 'Tim POKJA',
      titleEn: 'POKJA Team (Technical Execution)',
      category: 'pengelolaan',
      descId: 'Tim Pokja fungsional pelaksana teknis pengadaan khusus, pengadaan langsung, konsultansi, dan penanganan klarifikasi serta sanggah.',
      descEn: 'Functional Pokja team executing specialized procurement tasks, direct consultations, clarifications, and objection review handling.',
      tugasId: [
        'Melakukan verifikasi faktual dan klarifikasi teknis penawaran penyedia.',
        'Menjawab sanggahan atau penjelasan dokumen pemilihan secara transparan.',
        'Menyusun berita acara hasil pemilihan (BAHP) yang komprehensif.'
      ],
      tugasEn: [
        'Perform on-site verification and technical clarifications with bidders.',
        'Address tender inquiries and objections transparently within regulatory timeframes.',
        'Compile comprehensive formal minutes of procurement outcomes (BAHP).'
      ],
      icon: <FileText className="w-4.5 h-4.5 text-white" />,
      theme: {
        bg: 'bg-emerald-50/70 hover:bg-emerald-50 text-slate-800',
        border: 'border-emerald-300/80 hover:border-emerald-500',
        badgeBg: 'bg-emerald-100/90',
        badgeText: 'text-emerald-800',
        iconBg: 'bg-emerald-600 text-white shadow-sm',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-lg hover:shadow-emerald-500/15',
        connectorColor: 'bg-emerald-500'
      }
    },
    kelembagaanSdm: {
      id: 'kelembagaanSdm',
      titleId: 'Tim Kelembagaan dan SDM PBJ',
      titleEn: 'Institutional & HR Capacity Team',
      category: 'kelembagaan',
      descId: 'Tim yang membidangi pembinaan tata kelola kelembagaan pengadaan, sertifikasi kompetensi SDM pengadaan, serta peningkatan maturitas UKPBJ Kemnaker.',
      descEn: 'Team responsible for institutional governance fostering, procurement professional competency certifications, and maturity model elevation of UKPBJ.',
      tugasId: [
        'Mengembangkan dan menyelaraskan struktur kelembagaan UKPBJ.',
        'Memfasilitasi pelatihan, uji kompetensi, dan sertifikasi keahlian PBJ.',
        'Mendorong pencapaian tingkat kematangan (maturitas) UKPBJ ke Level Proaktif.'
      ],
      tugasEn: [
        'Develop and align UKPBJ institutional frameworks and organizational procedures.',
        'Facilitate competency training and official certification for procurement practitioners.',
        'Drive UKPBJ capability maturity elevation towards Proactive Level standard.'
      ],
      icon: <Settings className="w-5 h-5 text-white" />,
      theme: {
        bg: 'bg-orange-50/90 hover:bg-orange-50 text-slate-800',
        border: 'border-orange-300 hover:border-orange-500',
        badgeBg: 'bg-orange-100',
        badgeText: 'text-orange-700',
        iconBg: 'bg-orange-600 text-white shadow-md shadow-orange-600/30',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-xl hover:shadow-orange-500/15',
        connectorColor: 'bg-orange-500'
      }
    },
    sdm: {
      id: 'sdm',
      titleId: 'SDM',
      titleEn: 'Human Resources (SDM)',
      category: 'kelembagaan',
      descId: 'Sub-unit fokus pengembangan profesionalisme, pemenuhan formasi fungsional Pengelola PBJ, serta peningkatan kapabilitas aparatur pengadaan.',
      descEn: 'Sub-unit focusing on professional development, functional procurement personnel placement, and continuous human capital empowerment.',
      tugasId: [
        'Pemetaan kompetensi dan kebutuhan formasi Pejabat Fungsional PBJ.',
        'Penyelenggaraan workshop dan bimbingan teknis peraturan PBJ.',
        'Monitoring pemenuhan angka kredit dan jenjang karier fungsional.'
      ],
      tugasEn: [
        'Map competencies and staffing needs for Functional Procurement Officers.',
        'Organize workshops and technical guidance on the latest procurement regulations.',
        'Monitor credit points and professional career paths of certified personnel.'
      ],
      icon: <GraduationCap className="w-4.5 h-4.5 text-white" />,
      theme: {
        bg: 'bg-amber-50/80 hover:bg-amber-50 text-slate-800',
        border: 'border-amber-300 hover:border-amber-500',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-800',
        iconBg: 'bg-amber-500 text-white shadow-sm',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-lg hover:shadow-amber-500/15',
        connectorColor: 'bg-amber-500'
      }
    },
    kelembagaan: {
      id: 'kelembagaan',
      titleId: 'Kelembagaan',
      titleEn: 'Institutional Governance',
      category: 'kelembagaan',
      descId: 'Sub-unit penguatan tata kelola organisasi, SOP pengadaan, standardisasi LPSE, serta integrasi regulasi internal Kementerian Ketenagakerjaan.',
      descEn: 'Sub-unit strengthening organizational governance, standard operating procedures, LPSE ISO standardizations, and regulatory alignment.',
      tugasId: [
        'Penyusunan standar operasional prosedur (SOP) dan pedoman kerja UKPBJ.',
        'Pemenuhan 17 Standar LPSE dan integrasi sistem mutu pengadaan.',
        'Evaluasi efektivitas kelembagaan dan koordinasi antar unit kerja kemnaker.'
      ],
      tugasEn: [
        'Formulate Standard Operating Procedures (SOPs) and operational work guidelines.',
        'Fulfill 17 LPSE National Standards and quality management compliance.',
        'Evaluate institutional performance and inter-agency coordination across Kemnaker.'
      ],
      icon: <Building2 className="w-4.5 h-4.5 text-white" />,
      theme: {
        bg: 'bg-amber-50/80 hover:bg-amber-50 text-slate-800',
        border: 'border-amber-300 hover:border-amber-500',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-800',
        iconBg: 'bg-amber-500 text-white shadow-sm',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-lg hover:shadow-amber-500/15',
        connectorColor: 'bg-amber-500'
      }
    },
    spse: {
      id: 'spse',
      titleId: 'Tim Layanan SPSE',
      titleEn: 'SPSE & LPSE Service Team',
      category: 'spse',
      descId: 'Tim pengelola sistem pengadaan secara elektronik (SPSE/LPSE), helpdesk pengguna, verifikasi dokumen penyedia, serta infrastruktur teknologi informasi PBJ.',
      descEn: 'Team managing the Electronic Procurement System (SPSE/LPSE), helpdesk support, vendor verification, and IT server infrastructure for UKPBJ.',
      tugasId: [
        'Mengelola dan memelihara keandalan server dan aplikasi SPSE Kemnaker.',
        'Melakukan verifikasi berkas dan registrasi akun penyedia barang/jasa.',
        'Memberikan layanan konsultasi (Helpdesk/Klinik Pengadaan) kepada pengguna.'
      ],
      tugasEn: [
        'Maintain stability and high availability of the Kemnaker SPSE portal.',
        'Execute vendor credential verification and account activation.',
        'Deliver comprehensive Helpdesk and Procurement Clinic advisory services.'
      ],
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      theme: {
        bg: 'bg-sky-50/90 hover:bg-sky-50 text-slate-800',
        border: 'border-sky-300 hover:border-sky-500',
        badgeBg: 'bg-sky-100',
        badgeText: 'text-sky-700',
        iconBg: 'bg-sky-600 text-white shadow-md shadow-sky-600/30',
        iconText: 'text-white',
        hoverShadow: 'hover:shadow-xl hover:shadow-sky-500/15',
        connectorColor: 'bg-sky-500'
      }
    }
  };

  const renderCard = (node: NodeData, isCompact = false) => {
    const isMain = node.id === 'kepalaUkpbj' || node.id === 'kepalaBagian';

    return (
      <motion.div
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedNode(node)}
        className={`group relative cursor-pointer rounded-2xl border transition-all duration-300 
          ${node.theme.bg} ${node.theme.border} ${node.theme.hoverShadow}
          ${isCompact ? 'p-3 sm:p-3.5' : isMain ? 'p-4 sm:p-5' : 'p-3.5 sm:p-4'}
          shadow-sm flex items-center gap-3 select-none
        `}
      >
        {/* Leading Icon Circle */}
        <div className={`shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 
          ${isCompact ? 'w-9 h-9' : isMain ? 'w-11 h-11 sm:w-12 sm:h-12' : 'w-10 h-10'}
          ${node.theme.iconBg}
        `}>
          {node.icon}
        </div>

        {/* Title and Detail Hint */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-1">
            <h4 className={`font-bold leading-snug truncate ${isMain ? 'text-sm sm:text-base tracking-tight text-white' : 'text-xs sm:text-sm text-slate-800'}`}>
              {trans(node.titleId, node.titleEn)}
            </h4>
          </div>
          <p className={`text-[10px] sm:text-xs truncate font-medium mt-0.5 ${isMain ? 'text-blue-100/90' : 'text-slate-500'}`}>
            {trans(
              node.id === 'kepalaUkpbj' ? 'Pimpinan Unit Kerja' :
              node.id === 'kepalaBagian' ? 'Koordinator Layanan' :
              node.id === 'sekretariat' ? 'Dukungan Administrasi' :
              node.id === 'pengelolaanPbj' ? 'Pelaksana Tender' :
              node.id === 'kelembagaanSdm' ? 'Tata Kelola & SDM' :
              node.id === 'spse' ? 'Sistem Elektronik LPSE' : 'Unit Fungsional',
              node.id === 'kepalaUkpbj' ? 'Executive Leadership' :
              node.id === 'kepalaBagian' ? 'Operations Coordinator' :
              node.id === 'sekretariat' ? 'Administrative Support' :
              node.id === 'pengelolaanPbj' ? 'Tender Execution' :
              node.id === 'kelembagaanSdm' ? 'Governance & HR' :
              node.id === 'spse' ? 'SPSE / LPSE System' : 'Functional Unit'
            )}
          </p>
        </div>

        {/* Info Icon Indicator */}
        <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-opacity duration-200 opacity-60 group-hover:opacity-100 ${isMain ? 'text-white/80' : 'text-slate-400 group-hover:text-primary-navy'}`}>
          <Info className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      {/* Top Banner Guide */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary-blue text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            {trans(
              'Bagan interaktif Struktur Organisasi UKPBJ Kemnaker RI. Klik pada setiap kotak jabatan untuk melihat rincian tugas dan fungsi.',
              'Interactive UKPBJ Kemnaker RI Organizational Chart. Click any position card to explore detailed roles and duties.'
            )}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-blue bg-white px-3 py-1 rounded-full shadow-2xs border border-blue-200 shrink-0">
          <Maximize2 className="w-3 h-3" />
          {trans('Interaktif', 'Interactive')}
        </span>
      </div>

      {/* Main Flowchart Canvas */}
      <div className="relative w-full bg-slate-50/60 rounded-3xl border border-slate-200/90 p-4 sm:p-6 md:p-8 overflow-x-auto">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none rounded-3xl" />

        <div className="relative min-w-[760px] lg:min-w-full flex flex-col items-center">
          
          {/* LEVEL 1: Kepala UKPBJ */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] z-10">
            {renderCard(orgNodes.kepalaUkpbj)}
          </div>

          {/* CONNECTOR Level 1 -> Level 2 */}
          <div className="flex flex-col items-center -my-0.5">
            <div className="w-[2.5px] h-6 bg-blue-600 rounded-full" />
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-blue-600" />
          </div>

          {/* LEVEL 2: Kepala Bagian Layanan Pengadaan */}
          <div className="w-full max-w-[360px] sm:max-w-[420px] z-10">
            {renderCard(orgNodes.kepalaBagian)}
          </div>

          {/* HORIZONTAL CONNECTOR TREE to 4 Branches */}
          <div className="w-full max-w-5xl relative mt-3 mb-4 hidden md:block">
            {/* Center stem down from Kepala Bagian */}
            <div className="w-[2.5px] h-5 bg-slate-400 mx-auto" />
            
            {/* Horizontal branch bar spanning across 4 branches */}
            <div className="h-[2.5px] bg-slate-400 rounded-full mx-[12.5%] relative">
              {/* Branch 1 Dropper (Sekretariat - left 0%) */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="w-[2.5px] h-5 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 2 Dropper (Pengelolaan PBJ - left 33.33%) */}
              <div className="absolute left-[33.33%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-[2.5px] h-5 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 3 Dropper (Kelembagaan & SDM - left 66.66%) */}
              <div className="absolute left-[66.66%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-[2.5px] h-5 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 4 Dropper (SPSE - right 0%) */}
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="w-[2.5px] h-5 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>
            </div>
          </div>

          {/* LEVEL 3 & 4: 4 Main Columns */}
          <div className="grid grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-5xl mt-2">
            
            {/* COLUMN 1: Sekretariat Tata Usaha */}
            <div className="flex flex-col items-center">
              <div className="w-full">
                {renderCard(orgNodes.sekretariat)}
              </div>
            </div>

            {/* COLUMN 2: Tim Pengelolaan PBJ -> Tim POKJA -> Tim POKJA */}
            <div className="flex flex-col items-center">
              {/* Level 3: Tim Pengelolaan PBJ */}
              <div className="w-full">
                {renderCard(orgNodes.pengelolaanPbj)}
              </div>

              {/* Stem down to POKJA 1 */}
              <div className="flex flex-col items-center -my-0.5">
                <div className="w-[2px] h-5 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-emerald-600" />
              </div>

              {/* Level 4: Tim POKJA (1) */}
              <div className="w-full">
                {renderCard(orgNodes.pokja1, true)}
              </div>

              {/* Stem down to POKJA 2 */}
              <div className="flex flex-col items-center -my-0.5">
                <div className="w-[2px] h-5 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-emerald-600" />
              </div>

              {/* Level 5: Tim POKJA (2) */}
              <div className="w-full">
                {renderCard(orgNodes.pokja2, true)}
              </div>
            </div>

            {/* COLUMN 3: Tim Kelembagaan & SDM PBJ -> SDM & Kelembagaan */}
            <div className="flex flex-col items-center">
              {/* Level 3: Tim Kelembagaan dan SDM PBJ */}
              <div className="w-full">
                {renderCard(orgNodes.kelembagaanSdm)}
              </div>

              {/* Sub-branch stem & fork to SDM + Kelembagaan */}
              <div className="w-full relative mt-0.5 mb-2">
                <div className="w-[2px] h-4 bg-orange-400 mx-auto" />
                {/* Mini horizontal bar */}
                <div className="h-[2px] bg-orange-400 rounded-full mx-[25%] relative">
                  {/* Left fork to SDM */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-orange-500" />
                  </div>
                  {/* Right fork to Kelembagaan */}
                  <div className="absolute right-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-orange-500" />
                  </div>
                </div>
              </div>

              {/* Level 4: 2 Sub-items (SDM & Kelembagaan) */}
              <div className="grid grid-cols-2 gap-2 w-full mt-1">
                <div className="w-full">
                  {renderCard(orgNodes.sdm, true)}
                </div>
                <div className="w-full">
                  {renderCard(orgNodes.kelembagaan, true)}
                </div>
              </div>
            </div>

            {/* COLUMN 4: Tim Layanan SPSE */}
            <div className="flex flex-col items-center">
              <div className="w-full">
                {renderCard(orgNodes.spse)}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* DETAIL MODAL (Pop-up on card click) */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              {/* Modal Header */}
              <div className={`p-5 sm:p-6 text-white relative ${selectedNode.theme.bg}`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${selectedNode.theme.iconBg}`}>
                    {selectedNode.icon}
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-80">
                      {trans('Rincian Posisi / Unit', 'Position / Unit Details')}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black leading-tight">
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

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {trans('Deskripsi Tugas', 'Role Description')}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {trans(selectedNode.descId, selectedNode.descEn)}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {trans('Tugas Pokok & Fungsi', 'Key Responsibilities & Functions')}
                  </h5>
                  <ul className="space-y-2">
                    {(trans(selectedNode.tugasId.join('|||'), selectedNode.tugasEn.join('|||')).split('|||')).map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tugas}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="px-5 py-2 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    {trans('Tutup', 'Close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
