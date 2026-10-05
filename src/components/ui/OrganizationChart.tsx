"use client";

import React from 'react';
import { 
  Building2, 
  FileText, 
  Users, 
  Handshake, 
  Settings, 
  Shield, 
  Landmark 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const OrganizationChart = () => {
  const { trans } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scrollable Container for Mobile/Tablet */}
      <div className="w-full overflow-x-auto pb-6 pt-2">
        <div className="min-w-[860px] max-w-5xl mx-auto flex flex-col items-center px-4">
          
          {/* ============================================================ */}
          {/* LEVEL 1: KEPALA UKPBJ                                        */}
          {/* ============================================================ */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-72 bg-[#1E3A8A] text-white rounded-2xl p-4 shadow-lg shadow-blue-950/20 border border-blue-600 flex items-center justify-center gap-3.5 z-10 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-extrabold text-base tracking-tight text-white">
              {trans('Kepala UKPBJ', 'Head of UKPBJ')}
            </h3>
          </motion.div>

          {/* CONNECTOR: Level 1 -> Level 2 */}
          <div className="flex flex-col items-center">
            <div className="w-[2px] h-6 bg-[#1E3A8A]" />
            <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[6px] border-t-[#1E3A8A]" />
          </div>

          {/* ============================================================ */}
          {/* LEVEL 2: KEPALA BAGIAN LAYANAN PENGADAAN                     */}
          {/* ============================================================ */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-80 bg-blue-50/90 border-2 border-blue-400 rounded-2xl p-3.5 shadow-md shadow-blue-500/10 flex items-center gap-3.5 z-10 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-primary-navy leading-snug">
              {trans('Kepala Bagian Layanan Pengadaan', 'Head of Procurement Services')}
            </h3>
          </motion.div>

          {/* ============================================================ */}
          {/* CONNECTOR TREE: Level 2 -> Level 3 (4 Columns)               */}
          {/* ============================================================ */}
          <div className="w-full relative mt-0 mb-3">
            {/* Center stem down from Kepala Bagian */}
            <div className="w-[2px] h-6 bg-slate-400 mx-auto" />
            
            {/* Horizontal Branch Bar */}
            <div className="h-[2px] bg-slate-400 rounded-full mx-[11.5%] relative">
              {/* Branch 1 Dropper -> Sekretariat (0%) */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 2 Dropper -> Tim Pengelolaan PBJ (33.33%) */}
              <div className="absolute left-[33.33%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 3 Dropper -> Tim Kelembagaan & SDM (66.66%) */}
              <div className="absolute left-[66.66%] -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>

              {/* Branch 4 Dropper -> Tim Layanan SPSE (100%) */}
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="w-[2px] h-6 bg-slate-400" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* LEVEL 3 & 4: 4 COLUMNS                                       */}
          {/* ============================================================ */}
          <div className="grid grid-cols-4 gap-4 sm:gap-5 w-full mt-2">
            
            {/* ------------------------------------------------------------ */}
            {/* COLUMN 1: Sekretariat Tata Usaha (Purple Theme)             */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-purple-50/80 border-2 border-purple-400 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-600/30">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Sekretariat Tata Usaha', 'Administrative Secretariat')}
                </h4>
              </motion.div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 2: Tim Pengelolaan PBJ -> Tim POKJA -> Tim POKJA    */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center w-full">
              {/* Top: Tim Pengelolaan PBJ */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-emerald-50/80 border-2 border-emerald-500 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-700/30">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim Pengelolaan PBJ', 'Procurement Management Team')}
                </h4>
              </motion.div>

              {/* Stem down to first Tim POKJA */}
              <div className="flex flex-col items-center my-0.5">
                <div className="w-[2px] h-5 bg-emerald-600" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-emerald-600" />
              </div>

              {/* Middle: Tim POKJA 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-700/30">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim POKJA', 'POKJA Team')}
                </h4>
              </motion.div>

              {/* Stem down to second Tim POKJA */}
              <div className="flex flex-col items-center my-0.5">
                <div className="w-[2px] h-5 bg-emerald-600" />
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-emerald-600" />
              </div>

              {/* Bottom: Tim POKJA 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-700/30">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim POKJA', 'POKJA Team')}
                </h4>
              </motion.div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 3: Tim Kelembagaan dan SDM PBJ -> SDM & Kelembagaan */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center w-full">
              {/* Top: Tim Kelembagaan dan SDM PBJ */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-orange-50/80 border-2 border-orange-400 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-600/30">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim Kelembagaan dan SDM PBJ', 'Institutional & HR PBJ Team')}
                </h4>
              </motion.div>

              {/* Fork branch down to SDM and Kelembagaan */}
              <div className="w-full relative mt-0 mb-1">
                <div className="w-[2px] h-4 bg-orange-400 mx-auto" />
                {/* Horizontal branch */}
                <div className="h-[2px] bg-orange-400 rounded-full mx-[25%] relative">
                  {/* Left branch -> SDM */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3.5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-orange-500" />
                  </div>
                  {/* Right branch -> Kelembagaan */}
                  <div className="absolute right-0 top-0 flex flex-col items-center">
                    <div className="w-[2px] h-3.5 bg-orange-400" />
                    <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-orange-500" />
                  </div>
                </div>
              </div>

              {/* Sub-cards: SDM & Kelembagaan */}
              <div className="grid grid-cols-2 gap-2 w-full mt-1">
                {/* SDM */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-amber-50/80 border-2 border-amber-400 rounded-2xl p-3 shadow-2xs flex flex-col items-center justify-center text-center gap-2 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-800">
                    {trans('SDM', 'HR (SDM)')}
                  </h5>
                </motion.div>

                {/* Kelembagaan */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-amber-50/80 border-2 border-amber-400 rounded-2xl p-3 shadow-2xs flex flex-col items-center justify-center text-center gap-2 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-800">
                    {trans('Kelembagaan', 'Institutional')}
                  </h5>
                </motion.div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 4: Tim Layanan SPSE (Blue Theme)                     */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full bg-sky-50/80 border-2 border-sky-400 rounded-2xl p-3.5 shadow-sm flex items-center gap-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-600/30">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim Layanan SPSE', 'SPSE Service Team')}
                </h4>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
