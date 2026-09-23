"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, ShieldCheck, Box, Check, ArrowRight, 
  Sparkles, CheckCircle2, Award, ExternalLink,
  ChevronRight, Layers, ArrowUpRight, Scale, Clock, Lock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';

export function ProcurementPillarsSection() {
  const { trans } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const cycles = [
    {
      step: '01',
      title: trans('Perencanaan Pengadaan', 'Procurement Planning'),
      desc: trans('Penyusunan RUP, spesifikasi teknis, Kerangka Acuan Kerja (KAK), dan penetapan HPS yang akurat.', 'Preparation of RUP, technical specifications, TOR, and setting accurate HPS.'),
      tag: 'SiRUP & RUP',
      href: '/informasi/pemilu'
    },
    {
      step: '02',
      title: trans('Pemilihan Penyedia', 'Vendor Selection'),
      desc: trans('Tender terbuka SPSE 4.5, seleksi cepat, mini-kompetisi, dan E-Purchasing melalui E-Katalog Nasional.', 'Open SPSE 4.5 tender, rapid selection, mini-competitions, and E-Purchasing via National E-Catalog.'),
      tag: 'SPSE & E-Katalog',
      href: '/layanan'
    },
    {
      step: '03',
      title: trans('Pelaksanaan Kontrak', 'Contract Execution'),
      desc: trans('Penerbitan SPPBJ, penandatanganan kontrak kerja, Surat Perintah Mulai Kerja (SPMK), dan pengawasan.', 'Issuance of SPPBJ, contract signing, Work Commencement Orders (SPMK), and supervision.'),
      tag: 'Monitoring Kontrak',
      href: '/monitoring'
    },
    {
      step: '04',
      title: trans('Serah Terima Hasil', 'Handover & Acceptance'),
      desc: trans('Pemeriksaan fisik/kualitas pekerjaan, penandatanganan BAST, dan evaluasi kinerja penyedia jasa.', 'Physical/quality inspection of deliverables, BAST signing, and vendor performance evaluation.'),
      tag: 'BAST & Pembayaran',
      href: '/monitoring'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-[#0B1E38] to-[#07172E] text-white relative overflow-hidden">
      {/* Ambient background lightings */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{trans('Pilar Pengadaan Barang/Jasa Pemerintah', 'Government Procurement Pillars')}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {trans('Tata Kelola, Dokumen & Realisasi PBJ', 'Governance, Documents & PBJ Realization')}
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {trans(
                'Ekosistem pengadaan terintegrasi berlandaskan hukum yang sah, kepatuhan dokumen transparan, dan realisasi logistik paket yang tepat guna untuk Indonesia.',
                'An integrated procurement ecosystem grounded in valid law, transparent document compliance, and effective logistics realization for Indonesia.'
              )}
            </p>
          </FadeIn>
        </div>

        {/* 3 Main Interactive Modern Cards matching the Visual 3D objects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= CARD 1: DOKUMEN PENGADAAN (CYAN NEON GLASS) ================= */}
          <FadeIn direction="up" delay={0.1} className="h-full">
            <div className="h-full rounded-3xl bg-gradient-to-b from-[#082846]/90 via-[#0A2540]/80 to-[#07192C]/95 border-2 border-cyan-400/40 p-6 sm:p-7 shadow-[0_20px_50px_rgba(6,182,212,0.2)] backdrop-blur-xl flex flex-col justify-between relative group hover:border-cyan-400/80 transition-all duration-500">
              
              {/* Glowing Corner Badge */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-cyan-400/20 border border-cyan-300/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 text-cyan-300" />
              </div>

              <div>
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <FileText className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{trans('Tahapan Pengadaan', 'Procurement Stages')}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  {trans('Dokumen & 4 Siklus PBJ', 'Documents & 4 PBJ Cycles')}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {trans(
                    'Tahapan standar pengadaan barang dan jasa dari perencanaan hingga serah terima hasil pekerjaan sesuai regulasi.',
                    'Standard stages of procurement from planning to handover of work results according to regulations.'
                  )}
                </p>

                {/* Interactive 4-Cycle Stepper */}
                <div className="space-y-2.5 mb-6">
                  {cycles.map((item, idx) => {
                    const isActive = activeStepIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isActive ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300'
                            }`}>
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className={`text-xs sm:text-sm font-bold ${isActive ? 'text-cyan-200' : 'text-slate-200'}`}>
                              {item.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                            {item.step}
                          </span>
                        </div>

                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-slate-300 text-xs mt-2 pl-8 leading-relaxed"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Action */}
              <Link
                href="/informasi/pemilu"
                className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-bold text-xs sm:text-sm group/btn transition-all duration-300"
              >
                <span>{trans('Pelajari Regulasi & Panduan', 'Learn Regulations & Guide')}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

            </div>
          </FadeIn>


          {/* ================= CARD 2: DOKUMEN RESMI RI (GOLDEN ACCORD & RED WAX SEAL) ================= */}
          <FadeIn direction="up" delay={0.2} className="h-full">
            <div className="h-full rounded-3xl bg-gradient-to-b from-[#1E293B]/90 via-[#0F172A]/90 to-[#0B1528]/95 border-2 border-amber-400/40 p-6 sm:p-7 shadow-[0_20px_50px_rgba(245,158,11,0.15)] backdrop-blur-xl flex flex-col justify-between relative group hover:border-amber-400/80 transition-all duration-500">
              
              {/* Glowing Red Wax Seal Badge at top right */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-2 border-amber-300 shadow-[0_0_15px_rgba(239,68,68,0.7)] flex items-center justify-center text-amber-200 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4 text-amber-200" />
              </div>

              <div>
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans('Legalitas & Integritas RI', 'RI Legality & Integrity')}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  {trans('Republik Indonesia & Perpres', 'Republic of Indonesia & Perpres')}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {trans(
                    'Penyelenggaraan pengadaan berlandaskan kepatuhan hukum, integritas bebas korupsi, dan transparansi publik.',
                    'Procurement administration based on legal compliance, anti-corruption integrity, and public transparency.'
                  )}
                </p>

                {/* 4 Feature Points with Gold Badges */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Scale className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {trans('Dasar Hukum Perpres 16/2018 & 12/2021', 'Legal Basis Perpres 16/2018 & 12/2021')}
                      </h4>
                      <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                        {trans('Selaras dengan pedoman dan standar nasional LKPP.', 'Aligned with national LKPP guidelines and standards.')}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {trans('Zona Integritas Anti-Gratifikasi', 'Anti-Gratification Integrity Zone')}
                      </h4>
                      <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                        {trans('Komitmen transparansi penuh dan perlindungan pengaduan.', 'Full transparency commitment and whistleblower protection.')}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {trans('Clearing House & Advokasi', 'Clearing House & Advocacy')}
                      </h4>
                      <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                        {trans('Penyelesaian kendala teknis dan pendampingan hukum pengadaan.', 'Resolution of technical constraints and procurement legal assistance.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <Link
                href="/tentang"
                className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm group/btn transition-all duration-300"
              >
                <span>{trans('Lihat Profil & Visi Misi', 'View Profile & Vision Mission')}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

            </div>
          </FadeIn>


          {/* ================= CARD 3: LOGISTIK & PAKET PENGADAAN (3D CARGO BOX & BARCODE) ================= */}
          <FadeIn direction="up" delay={0.3} className="h-full">
            <div className="h-full rounded-3xl bg-gradient-to-b from-[#3B200C]/90 via-[#271507]/90 to-[#1A0E05]/95 border-2 border-amber-600/40 p-6 sm:p-7 shadow-[0_20px_50px_rgba(217,119,6,0.15)] backdrop-blur-xl flex flex-col justify-between relative group hover:border-amber-500/80 transition-all duration-500">
              
              {/* Box Icon Header Badge */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Box className="w-4 h-4 text-amber-300" />
              </div>

              <div>
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <Box className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans('Logistik & Eksekusi', 'Logistics & Execution')}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  {trans('Pengadaan Barang/Jasa', 'Goods/Services Procurement')}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {trans(
                    'Penyediaan aset, sarana prasarana, serta layanan jasa untuk menunjang operasional ketenagakerjaan.',
                    'Provision of assets, infrastructure, and services to support manpower operations.'
                  )}
                </p>

                {/* 4 Procurement Types Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-300 mb-1">01. Barang</p>
                    <p className="text-[11px] text-slate-300 leading-tight">Peralatan, ATK, IT & Logistik</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-300 mb-1">02. Konstruksi</p>
                    <p className="text-[11px] text-slate-300 leading-tight">Gedung, Balai & Fasilitas</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-300 mb-1">03. Konsultansi</p>
                    <p className="text-[11px] text-slate-300 leading-tight">Kajian, Perencanaan & Desain</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-300 mb-1">04. Jasa Lainnya</p>
                    <p className="text-[11px] text-slate-300 leading-tight">Keamanan, Kebersihan & Sewa</p>
                  </div>
                </div>

                {/* Barcode tracking visual */}
                <div className="p-2.5 rounded-2xl bg-black/40 border border-amber-500/30 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] text-amber-200/70 block">Pelacakan Sistem</span>
                    <span className="text-xs font-bold text-amber-200">E-Katalog & SPSE 4.5</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      ● Live Sync
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <Link
                href="/layanan"
                className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-amber-600/25 hover:bg-amber-600/35 border border-amber-500/40 text-amber-200 font-bold text-xs sm:text-sm group/btn transition-all duration-300"
              >
                <span>{trans('Jelajahi Paket & E-Katalog', 'Explore Packages & E-Catalog')}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
}
