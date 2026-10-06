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
  clickable?: boolean;
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
      subtitleId: 'Dukungan Administrasi, Keuangan & Tata Kelola',
      subtitleEn: 'Administrative, Financial & Governance Support',
      roleBadgeId: 'Tata Usaha',
      roleBadgeEn: 'Administration',
      descId: 'Unit pendukung strategis yang mengoordinasikan ketatausahaan, pengelolaan perbendaharaan & anggaran, tata kelola aset BMN, serta kearsipan resmi dokumen pengadaan UKPBJ.',
      descEn: 'Strategic support unit coordinating secretariat affairs, treasury and budget management, state asset (BMN) governance, and official procurement archiving.',
      tugasId: [
        'Dukungan administrasi dan tata kelola keuangan UKPBJ.',
        'Pengelolaan persuratan dan kearsipan dokumen pengadaan.',
        'Pengelolaan dan pertanggungjawaban anggaran operasional.',
        'Pengelolaan persediaan, sarana prasarana, dan aset BMN.',
        'Penyusunan laporan kinerja dan administrasi kegiatan.'
      ],
      tugasEn: [
        'Administrative support and UKPBJ financial governance.',
        'Correspondence and procurement document archiving.',
        'Operational budget management and accountability.',
        'Supplies, office facilities, and BMN asset management.',
        'Performance and administrative activity reporting.'
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
        'Penerimaan dan verifikasi berkas permohonan pengadaan.',
        'Pengelolaan dan koordinasi penugasan Pokja Pemilihan.',
        'Pengendalian mutu dan kelancaran pelaksanaan proses pemilihan.',
        'Penjaminan kepatuhan terhadap regulasi dan standar tata kelola pengadaan.',
        'Monitoring dan evaluasi kepatuhan timeline tahapan pemilihan.'
      ],
      tugasEn: [
        'Receiving and verifying procurement package applications.',
        'Managing and coordinating Selection Pokja assignments.',
        'Quality control and supervision of selection process execution.',
        'Ensuring compliance with procurement regulations and governance standards.',
        'Monitoring and evaluating selection timeline milestone compliance.'
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
      subtitleId: 'LOAN',
      subtitleEn: 'LOAN',
      roleBadgeId: 'POKJA',
      roleBadgeEn: 'POKJA',
      descId: '',
      descEn: '',
      tugasId: [],
      tugasEn: [],
      clickable: false,
      icon: <FileText className="w-4.5 h-4.5 text-emerald-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-emerald-200',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50 ring-1 ring-emerald-200',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700 border border-emerald-200',
        hoverShadow: ''
      }
    },
    pokja2: {
      id: 'pokja2',
      titleId: 'Tim POKJA',
      titleEn: 'POKJA Team',
      subtitleId: 'APBN',
      subtitleEn: 'APBN',
      roleBadgeId: 'POKJA',
      roleBadgeEn: 'POKJA',
      descId: '',
      descEn: '',
      tugasId: [],
      tugasEn: [],
      clickable: false,
      icon: <FileText className="w-4.5 h-4.5 text-emerald-600" />,
      theme: {
        cardBg: 'bg-white text-slate-800',
        border: 'border-emerald-200',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50 ring-1 ring-emerald-200',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700 border border-emerald-200',
        hoverShadow: ''
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
        'Penguatan kelembagaan UKPBJ.',
        'Pengembangan kapasitas SDM PBJ.'
      ],
      tugasEn: [
        'Strengthening UKPBJ institutional capacity and governance.',
        'Developing PBJ human resource capacity and competence.'
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
        'Pengelolaan database dan profil SDM PBJ.',
        'Pengelolaan administrasi dan pembinaan Jabatan Fungsional (JF) PPBJ.',
        'Pemetaan dan analisis kebutuhan formasi SDM pengadaan.',
        'Monitoring dan evaluasi penugasan JF PPBJ.',
        'Perencanaan program pelatihan, bimtek, dan sertifikasi kompetensi.'
      ],
      tugasEn: [
        'Managing PBJ human resource database and profiles.',
        'Managing administration and career fostering of functional procurement officers (JF PPBJ).',
        'Mapping and analyzing procurement personnel requirements.',
        'Monitoring and evaluating JF PPBJ operational assignments.',
        'Planning training programs, workshops, and competency certifications.'
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
        'Penyusunan dan pembaruan regulasi serta SOP internal.',
        'Pengelolaan data Indeks Tata Kelola Pengadaan (ITKP).',
        'Fasilitasi penyelenggaraan bimtek, workshop, dan sosialisasi.',
        'Penyusunan bahan monitoring dan evaluasi (Monev) berkala.',
        'Pengelolaan komunikasi publik dan media sosial resmi UKPBJ.',
        'Koordinasi audit PBJ, program P3DN, SMAP, dan Clearing House.',
        'Penyusunan laporan kegiatan periodik (bulanan, triwulanan, tahunan).'
      ],
      tugasEn: [
        'Formulating and updating internal regulations and SOPs.',
        'Managing Procurement Governance Index (ITKP) data.',
        'Facilitating technical guidance, workshops, and socialization.',
        'Preparing periodic monitoring and evaluation (Monev) materials.',
        'Managing public communications and official UKPBJ social media.',
        'Coordinating PBJ audits, P3DN programs, SMAP, and Clearing House.',
        'Compiling periodic activity reports (monthly, quarterly, annually).'
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
        'Penjaminan keandalan, keamanan, dan integrasi sistem SPSE dengan aplikasi pendukung.',
        'Penyelenggaraan digitalisasi end-to-end dalam seluruh tahapan proses PBJ.',
        'Pemberian layanan bantuan teknis (helpdesk) dan konsultasi bagi seluruh pengguna sistem pengadaan.'
      ],
      tugasEn: [
        'Ensuring reliability, security, and integration of the SPSE system with supporting applications.',
        'Advancing end-to-end digitalization across all procurement process stages.',
        'Providing technical helpdesk and advisory services for all procurement system users.'
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
    const isClickable = node.clickable !== false;

    return (
      <motion.div
        whileHover={isClickable ? { y: -2 } : undefined}
        whileTap={isClickable ? { scale: 0.98 } : undefined}
        onClick={isClickable ? () => setSelectedNode(node) : undefined}
        className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} rounded-2xl ${node.theme.cardBg} border ${node.theme.border} ${isClickable ? node.theme.hoverShadow : ''} shadow-2xs transition-all duration-200 relative group overflow-hidden flex flex-col justify-between w-full p-4 sm:p-4.5 min-h-[82px]`}
      >
        {/* Top Accent Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${node.theme.accentBar}`} />

        <div className="flex items-center gap-3.5 pt-0.5">
          {/* Icon */}
          <div className={`rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${isClickable ? 'group-hover:scale-105' : ''} w-10 h-10 ${node.theme.iconBg}`}>
            {node.icon}
          </div>

          {/* Texts */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-xs sm:text-sm text-slate-800 leading-snug ${isClickable ? 'group-hover:text-primary-blue' : ''} transition-colors`}>
              {trans(node.titleId, node.titleEn)}
            </h4>
            {node.subtitleId && (
              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-1">
                {trans(node.subtitleId, node.subtitleEn || '')}
              </p>
            )}
          </div>

          {/* Detail / Info button - only for clickable cards */}
          {isClickable && (
            <div className="shrink-0 text-slate-300 group-hover:text-primary-blue transition-colors">
              <Info className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Saran 1: Centered Vertical Minimalist Stack for SDM & Kelembagaan Sub-Cards
  const renderSubCard = (node: NodeItem) => {
    const isClickable = node.clickable !== false;

    return (
      <motion.div
        whileHover={isClickable ? { y: -2 } : undefined}
        whileTap={isClickable ? { scale: 0.98 } : undefined}
        onClick={isClickable ? () => setSelectedNode(node) : undefined}
        className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} rounded-2xl ${node.theme.cardBg} border ${node.theme.border} ${isClickable ? node.theme.hoverShadow : ''} shadow-2xs transition-all duration-200 relative group overflow-hidden flex flex-col items-center justify-center text-center p-3.5 sm:py-4 min-h-[82px] w-full`}
      >
        {/* Top Accent Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${node.theme.accentBar}`} />

        {/* Centered Icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 ${isClickable ? 'group-hover:scale-105' : ''} ${node.theme.iconBg}`}>
          {node.icon}
        </div>

        {/* Centered Title (100% visible, fully spelled out, no ellipsis) */}
        <h5 className={`font-bold text-xs text-slate-800 leading-tight ${isClickable ? 'group-hover:text-primary-blue' : ''} transition-colors`}>
          {trans(node.titleId, node.titleEn)}
        </h5>

        {/* Detail / Info button - only for clickable cards */}
        {isClickable && (
          <div className="absolute top-2.5 right-2.5 text-slate-300 group-hover:text-primary-blue transition-colors">
            <Info className="w-3 h-3" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Flowchart Tree Canvas with ample horizontal breathing room */}
      <div className="w-full overflow-x-auto pb-8 pt-2">
        <div className="min-w-[1060px] max-w-6xl mx-auto flex flex-col items-center px-4">
          
          {/* ============================================================ */}
          {/* LEVEL 1: KEPALA UKPBJ                                        */}
          {/* ============================================================ */}
          <div className="w-full max-w-[380px] sm:max-w-[400px] z-20">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedNode(nodes.kepalaUkpbj)}
              className="cursor-pointer rounded-2xl p-4 sm:p-4.5 bg-gradient-to-r from-primary-navy via-[#1E3A8A] to-[#172554] text-white shadow-lg shadow-blue-950/20 border-2 border-blue-500/40 hover:border-amber-400 transition-all duration-200 relative group overflow-hidden"
            >
              {/* Gold Top Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" />

              <div className="flex items-center justify-between gap-3.5 pt-0.5">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    {nodes.kepalaUkpbj.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-base tracking-tight text-white leading-tight">
                      {trans(nodes.kepalaUkpbj.titleId, nodes.kepalaUkpbj.titleEn)}
                    </h3>
                    {nodes.kepalaUkpbj.subtitleId && (
                      <p className="text-[11px] text-blue-200/90 font-medium leading-tight mt-1 truncate">
                        {trans(nodes.kepalaUkpbj.subtitleId, nodes.kepalaUkpbj.subtitleEn || '')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Detail / Info icon */}
                <div className="shrink-0 text-amber-300/70 group-hover:text-amber-300 transition-colors">
                  <Info className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CONNECTOR: Level 1 -> Level 2 */}
          <div className="flex flex-col items-center my-1.5 z-10">
            <div className="w-[2px] h-8 bg-primary-navy" />
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary-navy" />
          </div>

          {/* ============================================================ */}
          {/* LEVEL 2: KEPALA BAGIAN LAYANAN PENGADAAN                     */}
          {/* ============================================================ */}
          <div className="w-full max-w-[440px] z-20">
            {renderCard(nodes.kepalaBagian)}
          </div>

          {/* ============================================================ */}
          {/* CONNECTOR TREE: Level 2 -> Level 3 (4 Columns)               */}
          {/* ============================================================ */}
          <div className="w-full relative mt-2 mb-4">
            {/* Center stem down */}
            <div className="w-[2px] h-8 bg-slate-400 mx-auto" />
            
            {/* Horizontal branch bar across 4 columns */}
            <div className="h-[2px] bg-slate-400 rounded-full mx-[12.5%] relative">
              {/* Branch 1 -> Sekretariat (0%) */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-8 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 2 -> Tim Pengelolaan PBJ (33.33%) */}
              <div className="absolute left-[33.33%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-8 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 3 -> Tim Kelembagaan & SDM (66.66%) */}
              <div className="absolute left-[66.66%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-8 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>

              {/* Branch 4 -> Tim Layanan SPSE (100%) */}
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-600 -translate-y-1/2 ring-2 ring-white" />
                <div className="w-[2px] h-8 bg-slate-400" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] border-t-slate-500" />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* LEVEL 3 & 4: 4 COLUMNS                                       */}
          {/* ============================================================ */}
          <div className="grid grid-cols-4 gap-6 lg:gap-7 w-full mt-2 z-10">
            
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
              <div className="flex flex-col items-center my-2.5">
                <div className="w-[2px] h-7 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-emerald-600" />
              </div>

              {/* Middle: Tim POKJA 1 */}
              <div className="w-full">
                {renderCard(nodes.pokja1)}
              </div>

              {/* Arrow to Tim POKJA 2 */}
              <div className="flex flex-col items-center my-2.5">
                <div className="w-[2px] h-7 bg-emerald-500" />
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
              <div className="w-full relative mt-1.5 mb-2.5">
                <div className="w-[2px] h-6 bg-orange-400 mx-auto" />
                {/* Horizontal branch */}
                <div className="h-[2px] bg-orange-400 rounded-full mx-[25%] relative">
                  {/* Left branch -> SDM */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-orange-500" />
                  </div>
                  {/* Right branch -> Kelembagaan */}
                  <div className="absolute right-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-orange-500" />
                  </div>
                </div>
              </div>

              {/* Sub-cards: SDM & Kelembagaan (Centered Vertical Minimalist Stack - 100% visible text) */}
              <div className="grid grid-cols-2 gap-3 w-full mt-0.5">
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
