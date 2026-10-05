"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const OrganizationChart = () => {
  const { trans } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto pb-4 pt-1">
        <div className="min-w-[860px] max-w-5xl mx-auto flex flex-col items-center px-4">
          
          {/* ============================================================ */}
          {/* LEVEL 1: KEPALA UKPBJ                                        */}
          {/* ============================================================ */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-72 bg-gradient-to-r from-primary-navy via-[#1E3A8A] to-primary-navy text-white rounded-2xl py-3.5 px-6 shadow-md shadow-blue-950/20 border-2 border-blue-500/40 flex items-center justify-center text-center transition-all duration-200"
          >
            <h3 className="font-extrabold text-base tracking-tight text-white">
              {trans('Kepala UKPBJ', 'Head of UKPBJ')}
            </h3>
          </motion.div>

          {/* CONNECTOR: Level 1 -> Level 2 */}
          <div className="flex flex-col items-center my-0.5">
            <div className="w-[2px] h-6 bg-primary-navy" />
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary-navy" />
          </div>

          {/* ============================================================ */}
          {/* LEVEL 2: KEPALA BAGIAN LAYANAN PENGADAAN                     */}
          {/* ============================================================ */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-80 bg-blue-50/90 border-2 border-blue-400 text-primary-navy rounded-2xl py-3 px-6 shadow-xs flex items-center justify-center text-center transition-all duration-200"
          >
            <h3 className="font-extrabold text-sm sm:text-base text-primary-navy leading-snug">
              {trans('Kepala Bagian Layanan Pengadaan', 'Head of Procurement Services')}
            </h3>
          </motion.div>

          {/* ============================================================ */}
          {/* CONNECTOR TREE: Level 2 -> Level 3 (4 Columns)               */}
          {/* ============================================================ */}
          <div className="w-full relative mt-1 mb-3">
            {/* Center stem down */}
            <div className="w-[2px] h-5 bg-slate-400 mx-auto" />
            
            {/* Horizontal branch bar */}
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
          <div className="grid grid-cols-4 gap-4 w-full mt-2">
            
            {/* ------------------------------------------------------------ */}
            {/* COLUMN 1: Sekretariat Tata Usaha (Purple Theme)             */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center">
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full bg-purple-50/90 border-2 border-purple-400 text-slate-800 rounded-2xl py-3.5 px-4 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
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
                whileHover={{ y: -2 }}
                className="w-full bg-emerald-50/90 border-2 border-emerald-500 text-slate-800 rounded-2xl py-3.5 px-4 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim Pengelolaan PBJ', 'Procurement Management Team')}
                </h4>
              </motion.div>

              {/* Arrow to Tim POKJA 1 */}
              <div className="flex flex-col items-center my-1">
                <div className="w-[2px] h-4 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-emerald-600" />
              </div>

              {/* Middle: Tim POKJA 1 */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full bg-emerald-50/80 border-2 border-emerald-400 text-slate-800 rounded-2xl py-3 px-4 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim POKJA', 'POKJA Team')}
                </h4>
              </motion.div>

              {/* Arrow to Tim POKJA 2 */}
              <div className="flex flex-col items-center my-1">
                <div className="w-[2px] h-4 bg-emerald-500" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4.5px] border-t-emerald-600" />
              </div>

              {/* Bottom: Tim POKJA 2 */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full bg-emerald-50/80 border-2 border-emerald-400 text-slate-800 rounded-2xl py-3 px-4 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim POKJA', 'POKJA Team')}
                </h4>
              </motion.div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 3: Tim Kelembagaan & SDM PBJ -> SDM & Kelembagaan    */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center w-full">
              {/* Top: Tim Kelembagaan dan SDM PBJ */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full bg-orange-50/90 border-2 border-orange-400 text-slate-800 rounded-2xl py-3.5 px-3 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {trans('Tim Kelembagaan dan SDM PBJ', 'Institutional & HR PBJ Team')}
                </h4>
              </motion.div>

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

              {/* Sub-cards: SDM & Kelembagaan */}
              <div className="grid grid-cols-2 gap-2 w-full mt-0.5">
                {/* SDM */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-amber-50/90 border-2 border-amber-400 text-slate-800 rounded-2xl py-3 px-2 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
                >
                  <h5 className="font-bold text-xs text-slate-800 leading-tight">
                    {trans('SDM', 'SDM')}
                  </h5>
                </motion.div>

                {/* Kelembagaan */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-amber-50/90 border-2 border-amber-400 text-slate-800 rounded-2xl py-3 px-1 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
                >
                  <h5 className="font-bold text-xs text-slate-800 leading-tight">
                    {trans('Kelembagaan', 'Kelembagaan')}
                  </h5>
                </motion.div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 4: Tim Layanan SPSE (Blue Theme)                     */}
            {/* ------------------------------------------------------------ */}
            <div className="flex flex-col items-center">
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full bg-sky-50/90 border-2 border-sky-400 text-slate-800 rounded-2xl py-3.5 px-4 shadow-2xs flex items-center justify-center text-center transition-all duration-200"
              >
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
