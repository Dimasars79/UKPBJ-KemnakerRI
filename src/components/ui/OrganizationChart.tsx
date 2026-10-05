"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Users, 
  Handshake, 
  Settings, 
  ShieldCheck, 
  GraduationCap, 
  Landmark, 
  CheckCircle2, 
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface NodeItem {
  id: string;
  titleId: string;
  titleEn: string;
  subtitleId?: string;
  subtitleEn?: string;
  roleBadgeId: string;
  roleBadgeEn: string;
  descId: string;
  descEn: string;
  tugasId: string[];
  tugasEn: string[];
  icon: React.ReactNode;
  theme: {
    cardBg: string;
    border: string;
    accentBar: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    hoverShadow: string;
  };
}

export const OrganizationChart = () => {
  const { trans } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);

  const nodes: Record<string, NodeItem> = {
    kepalaUkpbj: {
      id: 'kepalaUkpbj',
      titleId: 'Kepala UKPBJ',
      titleEn: 'Head of UKPBJ',
      subtitleId: 'Pimpinan Unit Kerja & Pengarah Kebijakan',
      subtitleEn: 'Head of Unit & Policy Director',
      roleBadgeId: 'Pimpinan Utama',
      roleBadgeEn: 'Executive Leadership',
      descId: 'Pimpinan tertinggi Unit Kerja Pengadaan Barang/Jasa Kemnaker RI yang memegang mandat perumusan kebijakan, pengawasan strategis, dan tata kelola pengadaan kementerian.',
      descEn: 'Highest executive leader of UKPBJ Kemnaker holding the strategic mandate for policy formulation, supervision, and ministry-wide procurement governance.',
      tugasId: [
        'Menetapkan arah kebijakan dan strategi pengadaan tahunan.',
        'Mengoordinasikan pelaksanaan tata kelola pengadaan yang transparan dan akuntabel.',
        'Membina hubungan kelembagaan dengan instansi pembina (LKPP) dan pengawas.'
      ],
      tugasEn: [
        'Establish strategic procurement policies and annual operational milestones.',
        'Coordinate transparent and accountable procurement implementation.',
        'Foster institutional partnerships with LKPP and supervisory bodies.'
      ],
      icon: <Landmark className="w-6 h-6 text-amber-300" />,
      theme: {
        cardBg: 'bg-gradient-to-r from-primary-navy via-[#1E3A8A] to-[#172554] text-white',
        border: 'border-blue-500/50',
        accentBar: 'bg-gradient-to-r from-amber-300 to-yellow-400',
        iconBg: 'bg-white/10 ring-1 ring-white/20',
        iconColor: 'text-amber-300',
        badgeBg: 'bg-amber-400/20',
        badgeText: 'text-amber-300 border border-amber-400/30',
        hoverShadow: 'hover:shadow-xl hover:shadow-blue-950/30 hover:border-amber-400'
      }
    },
    kepalaBagian: {
      id: 'kepalaBagian',
      titleId: 'Kepala Bagian Layanan Pengadaan',
      titleEn: 'Head of Procurement Services',
      subtitleId: 'Koordinator Operasional Layanan',
      subtitleEn: 'Operational Service Coordinator',
      roleBadgeId: 'Koordinator',
      roleBadgeEn: 'Coordinator',
      descId: 'Pejabat struktural yang mengoordinasikan kelancaran pelaksanaan tugas Tim Pengelolaan PBJ, Kelembagaan & SDM, Layanan SPSE, serta Sekretariat.',
      descEn: 'Structural coordinator overseeing operational synergies between Procurement, Institutional/HR, SPSE Systems, and Secretariat teams.',
      tugasId: [
        'Mengendalikan operasionalisasi harian seluruh divisi pengadaan.',
        'Memantau kepatuhan prosedur regulasi pengadaan barang/jasa.',
        'Menyusun laporan kinerja pengadaan kepada Kepala UKPBJ.'
      ],
      tugasEn: [
        'Direct and coordinate daily operational procurement workflows.',
        'Monitor procedural compliance with government regulations.',
        'Compile periodic performance reports for the Head of UKPBJ.'
      ],
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-blue-200 hover:border-blue-400',
        accentBar: 'bg-blue-600',
        iconBg: 'bg-blue-50 ring-1 ring-blue-200',
        iconColor: 'text-blue-600',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-700 border border-blue-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-blue-500/10'
      }
    },
    sekretariat: {
      id: 'sekretariat',
      titleId: 'Sekretariat Tata Usaha',
      titleEn: 'Administrative Secretariat',
      subtitleId: 'Dukungan Administrasi & Persuratan',
      subtitleEn: 'Administration & Correspondence Support',
      roleBadgeId: 'Tata Usaha',
      roleBadgeEn: 'Administration',
      descId: 'Unit penunjang operasional yang mengelola ketatausahaan, arsip dokumen pengadaan, sarana prasarana kerja, dan administrasi kepegawaian internal UKPBJ.',
      descEn: 'Operational support unit managing administration, procurement contract archives, office facilities, and internal staffing.',
      tugasId: [
        'Pengelolaan tata naskah dinas dan arsip pengadaan.',
        'Fasilitasi sarana prasarana operasional unit.',
        'Penyusunan laporan akuntabilitas kinerja internal.'
      ],
      tugasEn: [
        'Manage official correspondence and procurement filing.',
        'Facilitate operational facilities and office logistics.',
        'Compile internal organizational accountability reports.'
      ],
      icon: <Users className="w-5 h-5 text-purple-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-purple-200 hover:border-purple-400',
        accentBar: 'bg-purple-600',
        iconBg: 'bg-purple-50 ring-1 ring-purple-200',
        iconColor: 'text-purple-600',
        badgeBg: 'bg-purple-50',
        badgeText: 'text-purple-700 border border-purple-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-purple-500/10'
      }
    },
    pengelolaanPbj: {
      id: 'pengelolaanPbj',
      titleId: 'Tim Pengelolaan PBJ',
      titleEn: 'Procurement Management Team',
      subtitleId: 'Manajemen & Pelaksanaan Pemilihan',
      subtitleEn: 'Selection Management & Execution',
      roleBadgeId: 'Pelaksana PBJ',
      roleBadgeEn: 'Procurement',
      descId: 'Divisi pengelola siklus pemilihan penyedia, penjadwalan paket, serta koordinasi teknis pelaksanaan tender/seleksi di lingkungan kementerian.',
      descEn: 'Division managing vendor selection cycles, package scheduling, and technical tender/selection coordination.',
      tugasId: [
        'Perencanaan dan pengelolaan paket pengadaan berkala.',
        'Mengoordinasikan penugasan Pokja Pemilihan.',
        'Memantau progres pemilihan penyedia barang/jasa.'
      ],
      tugasEn: [
        'Plan and manage regular procurement packages.',
        'Coordinate assignments of Working Groups (Pokja).',
        'Monitor vendor selection progress.'
      ],
      icon: <Handshake className="w-5 h-5 text-emerald-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-emerald-200 hover:border-emerald-400',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50 ring-1 ring-emerald-200',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700 border border-emerald-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-emerald-500/10'
      }
    },
    pokja1: {
      id: 'pokja1',
      titleId: 'Tim POKJA',
      titleEn: 'POKJA Team',
      subtitleId: 'Kelompok Kerja Pemilihan (Tender)',
      subtitleEn: 'Selection Working Group (Tender)',
      roleBadgeId: 'POKJA',
      roleBadgeEn: 'POKJA',
      descId: 'Kelompok kerja fungsional yang menyusun dokumen pemilihan, kualifikasi, evaluasi penawaran, dan penetapan pemenang tender.',
      descEn: 'Functional working group drafting selection documents, evaluating bids, and determining winning tenderers.',
      tugasId: [
        'Menyusun dan menetapkan dokumen pemilihan.',
        'Melakukan evaluasi administrasi, teknis, dan harga.',
        'Menetapkan pemenang tender sesuai ketentuan LKPP.'
      ],
      tugasEn: [
        'Draft and issue tender documentation.',
        'Evaluate administrative, technical, and financial bids.',
        'Determine winning bidders in compliance with LKPP rules.'
      ],
      icon: <FileText className="w-4.5 h-4.5 text-emerald-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-emerald-200 hover:border-emerald-400',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50 ring-1 ring-emerald-200',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700 border border-emerald-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-emerald-500/10'
      }
    },
    pokja2: {
      id: 'pokja2',
      titleId: 'Tim POKJA',
      titleEn: 'POKJA Team',
      subtitleId: 'Pelaksana Teknis & Evaluasi',
      subtitleEn: 'Technical Review & Verification',
      roleBadgeId: 'POKJA',
      roleBadgeEn: 'POKJA',
      descId: 'Tim Pokja fungsional pelaksana verifikasi faktual lapangan, klarifikasi penawaran penyedia, dan penanganan sanggahan.',
      descEn: 'Functional Pokja team executing on-site verification, bidder clarifications, and formal objection reviews.',
      tugasId: [
        'Verifikasi faktual kualifikasi calon rekanan.',
        'Klarifikasi teknis dan penelaahan kewajaran harga.',
        'Penyusunan Berita Acara Hasil Pemilihan (BAHP).'
      ],
      tugasEn: [
        'Execute on-site qualification verifications.',
        'Perform technical and price reasonableness clarifications.',
        'Compile formal Selection Minutes (BAHP).'
      ],
      icon: <FileText className="w-4.5 h-4.5 text-emerald-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-emerald-200 hover:border-emerald-400',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50 ring-1 ring-emerald-200',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700 border border-emerald-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-emerald-500/10'
      }
    },
    kelembagaanSdm: {
      id: 'kelembagaanSdm',
      titleId: 'Tim Kelembagaan & SDM PBJ',
      titleEn: 'Institutional & HR Team',
      subtitleId: 'Tata Kelola, SOP & Pembinaan SDM',
      subtitleEn: 'Governance, SOP & HR Fostering',
      roleBadgeId: 'Kelembagaan & SDM',
      roleBadgeEn: 'Governance & HR',
      descId: 'Divisi penguatan tata kelola kelembagaan pengadaan, standarisasi SOP, pencapaian maturitas UKPBJ, serta pembinaan dan sertifikasi kompetensi SDM pengadaan.',
      descEn: 'Division fostering institutional governance, SOP standardization, UKPBJ maturity advancement, and HR competency certifications.',
      tugasId: [
        'Pengembangan struktur dan maturitas kelembagaan UKPBJ.',
        'Penyusunan dan pemutakhiran SOP pengadaan terstandarisasi.',
        'Fasilitasi bimtek, pelatihan, dan uji sertifikasi keahlian PBJ.'
      ],
      tugasEn: [
        'Advance UKPBJ organizational capability and maturity.',
        'Draft and update standardized procurement SOPs.',
        'Facilitate competency workshops and certification exams.'
      ],
      icon: <Settings className="w-5 h-5 text-orange-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-orange-200 hover:border-orange-400',
        accentBar: 'bg-orange-600',
        iconBg: 'bg-orange-50 ring-1 ring-orange-200',
        iconColor: 'text-orange-600',
        badgeBg: 'bg-orange-50',
        badgeText: 'text-orange-700 border border-orange-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-orange-500/10'
      }
    },
    sdm: {
      id: 'sdm',
      titleId: 'SDM',
      titleEn: 'SDM (HR)',
      subtitleId: 'Kompetensi & Sertifikasi',
      subtitleEn: 'Competency & Training',
      roleBadgeId: 'Sub-Unit',
      roleBadgeEn: 'Sub-Unit',
      descId: 'Sub-unit fokus pembinaan aparatur pengadaan, pemenuhan formasi Pejabat Fungsional PBJ, dan sertifikasi keahlian pengadaan pemerintah.',
      descEn: 'Sub-unit focusing on personnel capacity building, functional procurement career paths, and competency certifications.',
      tugasId: [
        'Pemetaan kompetensi aparatur pengadaan kementerian.',
        'Penyelenggaraan pelatihan dan uji kompetensi PBJ.',
        'Monitoring jenjang karier fungsional pengadaan.'
      ],
      tugasEn: [
        'Map procurement competencies across the ministry.',
        'Organize training and competency examinations.',
        'Monitor functional procurement career advancement.'
      ],
      icon: <GraduationCap className="w-4.5 h-4.5 text-amber-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-amber-200 hover:border-amber-400',
        accentBar: 'bg-amber-500',
        iconBg: 'bg-amber-50 ring-1 ring-amber-200',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-700 border border-amber-200',
        hoverShadow: 'hover:shadow-md hover:shadow-amber-500/15'
      }
    },
    kelembagaan: {
      id: 'kelembagaan',
      titleId: 'Kelembagaan',
      titleEn: 'Kelembagaan',
      subtitleId: 'Tata Kelola & SOP',
      subtitleEn: 'Governance & SOP',
      roleBadgeId: 'Sub-Unit',
      roleBadgeEn: 'Sub-Unit',
      descId: 'Sub-unit perumusan instrumen kelembagaan, pemenuhan standar LPSE, SOP kerja terintegrasi, dan evaluasi efektivitas organisasi.',
      descEn: 'Sub-unit formulating organizational governance instruments, LPSE standard compliance, and integrated SOPs.',
      tugasId: [
        'Penyusunan standar operasional prosedur (SOP) pengadaan.',
        'Pemenuhan standar kematangan kelembagaan LKPP.',
        'Evaluasi efektivitas tata kelola antar unit kerja.'
      ],
      tugasEn: [
        'Formulate standard operating procedures (SOPs).',
        'Fulfill LKPP institutional maturity standards.',
        'Evaluate governance effectiveness across work units.'
      ],
      icon: <Building2 className="w-4.5 h-4.5 text-amber-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-amber-200 hover:border-amber-400',
        accentBar: 'bg-amber-500',
        iconBg: 'bg-amber-50 ring-1 ring-amber-200',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-700 border border-amber-200',
        hoverShadow: 'hover:shadow-md hover:shadow-amber-500/15'
      }
    },
    spse: {
      id: 'spse',
      titleId: 'Tim Layanan SPSE',
      titleEn: 'SPSE Service Team',
      subtitleId: 'Sistem LPSE, Server & Helpdesk',
      subtitleEn: 'LPSE System, Server & Helpdesk',
      roleBadgeId: 'Layanan SPSE',
      roleBadgeEn: 'SPSE Services',
      descId: 'Divisi pengelola infrastruktur Sistem Pengadaan Secara Elektronik (SPSE), verifikasi berkas penyedia rekanan, dan layanan konsultasi bantuan pengadaan.',
      descEn: 'Division managing the Electronic Procurement System (SPSE) infrastructure, vendor verification, and helpdesk consultancy.',
      tugasId: [
        'Pengelolaan dan pemeliharaan keandalan server SPSE.',
        'Verifikasi berkas dan aktivasi akun penyedia.',
        'Layanan konsultasi pengadaan (Helpdesk / Klinik PBJ).'
      ],
      tugasEn: [
        'Maintain stability and security of SPSE servers.',
        'Verify vendor legal files and activate accounts.',
        'Provide procurement helpdesk and advisory services.'
      ],
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-sky-200 hover:border-sky-400',
        accentBar: 'bg-sky-600',
        iconBg: 'bg-sky-50 ring-1 ring-sky-200',
        iconColor: 'text-sky-600',
        badgeBg: 'bg-sky-50',
        badgeText: 'text-sky-700 border border-sky-200',
        hoverShadow: 'hover:shadow-lg hover:shadow-sky-500/10'
      }
    }
  };

  const renderCard = (node: NodeItem) => {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedNode(node)}
        className={`cursor-pointer rounded-2xl ${node.theme.cardBg} border ${node.theme.border} ${node.theme.hoverShadow} shadow-2xs transition-all duration-200 relative group overflow-hidden flex flex-col justify-between w-full p-3.5 sm:p-4`}
      >
        {/* Top Accent Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${node.theme.accentBar}`} />

        <div className="flex items-center gap-3 pt-1">
          {/* Icon */}
          <div className={`rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 w-10 h-10 ${node.theme.iconBg}`}>
            {node.icon}
          </div>

          {/* Texts */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug group-hover:text-primary-blue transition-colors">
              {trans(node.titleId, node.titleEn)}
            </h4>
            {node.subtitleId && (
              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                {trans(node.subtitleId, node.subtitleEn)}
              </p>
            )}
          </div>

          {/* Info icon */}
          <div className="shrink-0 text-slate-300 group-hover:text-primary-blue transition-colors">
            <Info className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>
    );
  };

  // Saran 1: Centered Vertical Minimalist Stack for SDM & Kelembagaan Sub-Cards
  const renderSubCard = (node: NodeItem) => {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedNode(node)}
        className={`cursor-pointer rounded-2xl ${node.theme.cardBg} border ${node.theme.border} ${node.theme.hoverShadow} shadow-2xs transition-all duration-200 relative group overflow-hidden flex flex-col items-center justify-center text-center p-3 sm:py-3.5 w-full`}
      >
        {/* Top Accent Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${node.theme.accentBar}`} />

        {/* Centered Icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-105 ${node.theme.iconBg}`}>
          {node.icon}
        </div>

        {/* Centered Title (100% visible, fully spelled out, no ellipsis) */}
        <h5 className="font-bold text-xs text-slate-800 leading-tight group-hover:text-primary-blue transition-colors">
          {trans(node.titleId, node.titleEn)}
        </h5>
      </motion.div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Flowchart Tree Canvas with ample horizontal breathing room */}
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <div className="min-w-[980px] max-w-5xl mx-auto flex flex-col items-center px-4">
          
          {/* ============================================================ */}
          {/* LEVEL 1: KEPALA UKPBJ                                        */}
          {/* ============================================================ */}
          <div className="w-full max-w-[400px] z-20">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedNode(nodes.kepalaUkpbj)}
              className="cursor-pointer rounded-2xl p-4 bg-gradient-to-r from-primary-navy via-[#1E3A8A] to-[#172554] text-white shadow-lg shadow-blue-950/20 border-2 border-blue-500/40 hover:border-amber-400 transition-all duration-200 relative group overflow-hidden"
            >
              {/* Gold Top Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" />

              <div className="flex items-center gap-3.5 pt-0.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  {nodes.kepalaUkpbj.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black tracking-tight text-white leading-tight">
                    {trans(nodes.kepalaUkpbj.titleId, nodes.kepalaUkpbj.titleEn)}
                  </h3>
                </div>
                <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors">
                  <Info className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CONNECTOR: Level 1 -> Level 2 */}
          <div className="flex flex-col items-center my-0.5 z-10">
            <div className="w-[2px] h-6 bg-primary-navy" />
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary-navy" />
          </div>

          {/* ============================================================ */}
          {/* LEVEL 2: KEPALA BAGIAN LAYANAN PENGADAAN                     */}
          {/* ============================================================ */}
          <div className="w-full max-w-[420px] z-20">
            {renderCard(nodes.kepalaBagian)}
          </div>

          {/* ============================================================ */}
          {/* CONNECTOR TREE: Level 2 -> Level 3 (4 Columns)               */}
          {/* ============================================================ */}
          <div className="w-full relative mt-1 mb-3">
            {/* Center stem down */}
            <div className="w-[2px] h-5 bg-slate-400 mx-auto" />
            
            {/* Horizontal branch bar across 4 columns */}
            <div className="h-[2px] bg-slate-400 rounded-full mx-[12.5%] relative">
              {/* Branch 1 -> Sekretariat (0%) */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-purple-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 2 -> Tim Pengelolaan PBJ (33.33%) */}
              <div className="absolute left-[33.33%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 3 -> Tim Kelembagaan & SDM (66.66%) */}
              <div className="absolute left-[66.66%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-orange-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 4 -> Tim Layanan SPSE (100%) */}
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-sky-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* LEVEL 3 & 4: 4 COLUMNS                                       */}
          {/* ============================================================ */}
          <div className="grid grid-cols-4 gap-4 w-full mt-2 z-10">
            
            {/* ------------------------------------------------------------ */}
            {/* COLUMN 1: Sekretariat Tata Usaha                             */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col">
              <div className="w-full">
                {renderCard(nodes.sekretariat)}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 2: Tim Pengelolaan PBJ -> Tim POKJA -> Tim POKJA    */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center w-full">
              {/* Top: Tim Pengelolaan PBJ */}
              <div className="w-full">
                {renderCard(nodes.pengelolaanPbj)}
              </div>

              {/* Arrow to Tim POKJA 1 */}
              <div className="flex flex-col items-center my-1">
                <div className="w-[2px] h-4 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-emerald-600" />
              </div>

              {/* Middle: Tim POKJA 1 */}
              <div className="w-full">
                {renderCard(nodes.pokja1)}
              </div>

              {/* Arrow to Tim POKJA 2 */}
              <div className="flex flex-col items-center my-1">
                <div className="w-[2px] h-4 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-emerald-600" />
              </div>

              {/* Bottom: Tim POKJA 2 */}
              <div className="w-full">
                {renderCard(nodes.pokja2)}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 3: Tim Kelembagaan & SDM -> SDM & Kelembagaan        */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center w-full">
              {/* Top: Tim Kelembagaan dan SDM PBJ */}
              <div className="w-full">
                {renderCard(nodes.kelembagaanSdm)}
              </div>

              {/* Fork branch to SDM and Kelembagaan */}
              <div className="w-full relative mt-0.5 mb-1">
                <div className="w-[2px] h-3.5 bg-orange-400 mx-auto" />
                {/* Horizontal branch */}
                <div className="h-[2px] bg-orange-400 rounded-full mx-[25%] relative">
                  {/* Left branch -> SDM */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3.5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-orange-500" />
                  </div>
                  {/* Right branch -> Kelembagaan */}
                  <div className="absolute right-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3.5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-orange-500" />
                  </div>
                </div>
              </div>

              {/* Sub-cards: SDM & Kelembagaan (Centered Vertical Minimalist Stack - 100% visible text) */}
              <div className="grid grid-cols-2 gap-2 w-full mt-0.5">
                <div className="w-full">
                  {renderSubCard(nodes.sdm)}
                </div>
                <div className="w-full">
                  {renderSubCard(nodes.kelembagaan)}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 4: Tim Layanan SPSE                                  */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col">
              <div className="w-full">
                {renderCard(nodes.spse)}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* DETAIL MODAL (ON NODE CLICK)                                 */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-primary-navy/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-primary-navy via-[#1E3A8A] to-[#172554] text-white relative">
                <div className="flex items-center gap-3.5 pr-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                    {selectedNode.icon}
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1 bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {trans(selectedNode.roleBadgeId, selectedNode.roleBadgeEn)}
                    </span>
                    <h3 className="text-lg font-black leading-tight text-white">
                      {trans(selectedNode.titleId, selectedNode.titleEn)}
                    </h3>
                    {selectedNode.subtitleId && (
                      <p className="text-xs text-blue-100/80 font-medium mt-0.5">
                        {trans(selectedNode.subtitleId, selectedNode.subtitleEn || '')}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {trans('Deskripsi Tugas & Fungsi', 'Role & Responsibilities')}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {trans(selectedNode.descId, selectedNode.descEn)}
                  </p>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {trans('Tugas Pokok Utama (Tupoksi)', 'Key Duties')}
                  </h5>
                  <ul className="space-y-2">
                    {selectedNode.tugasId.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{trans(tugas, selectedNode.tugasEn[idx])}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
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
