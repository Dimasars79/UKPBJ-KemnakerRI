"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';

interface ProcurementVisualCompositionProps {
  className?: string;
}

export function ProcurementVisualComposition({ className = "" }: ProcurementVisualCompositionProps) {
  // Smooth spring physics for organic mouse parallax response
  const springX = useSpring(0, { stiffness: 65, damping: 20 });
  const springY = useSpring(0, { stiffness: 65, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    springX.set(x * 16);
    springY.set(y * -16);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <div 
      className={`relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] aspect-[4/3.7] select-none flex items-center justify-center mx-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400 }}
    >
      {/* ================= 1. CLEAN SOFT AMBIENT LIGHTING ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Core Soft Ambient Glow */}
        <div className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] bg-gradient-to-tr from-blue-600/25 via-cyan-400/20 to-transparent rounded-full blur-[110px]" />
        
        {/* Soft Ground Ambient Shadow / Light */}
        <div className="absolute bottom-2 sm:bottom-4 w-[300px] sm:w-[400px] h-[70px] sm:h-[90px] bg-cyan-500/15 rounded-[100%] blur-3xl" />
      </div>

      {/* ================= 2. MASTER 3D PARALLAX STAGE ================= */}
      <motion.div
        style={{
          rotateX: springY,
          rotateY: springX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
      >

        {/* ================= ELEMENT 1: GEDUNG KONSTRUKSI (TRANSPARENT 3D ANCHOR - MIDGROUND LEFT) ================= */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotateX: [-1, 1.2, -1],
            rotateY: [1.2, -1, 1.2],
            rotateZ: [-0.6, 0.6, -0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 7.2,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute left-[1%] sm:left-[3%] top-[3%] sm:top-[2%] w-[60%] sm:w-[56%] aspect-square z-10 group cursor-pointer"
        >
          {/* Volumetric Backlight Aura */}
          <div className="absolute inset-8 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-cyan-400/35 transition-colors duration-500" />
          
          {/* Pure Transparent PNG Cutout - 100% Zero Box */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/gedung-proyek-konstruksi.png"
              alt="3D Gedung Proyek Konstruksi & Tower Crane UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 60vw, 400px"
              className="object-contain object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 2: KOP SURAT & DOKUMEN (TRANSPARENT AIR CURRENT HOVER - TOP RIGHT) ================= */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            x: [0, 5, 0],
            rotateZ: [-2, 2.5, -2],
            rotateX: [1.5, -2, 1.5],
            rotateY: [-1.5, 2, -1.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 6.4,
            ease: "easeInOut",
            delay: 0.8,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute right-[1%] sm:right-[3%] top-[-2%] sm:top-[-1%] w-[48%] sm:w-[44%] aspect-square z-20 group cursor-pointer"
        >
          {/* Volumetric Gold/Amber Aura */}
          <div className="absolute inset-8 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-amber-400/30 transition-colors duration-500" />

          {/* Pure Transparent PNG Cutout - 100% Zero Box */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -6, rotateZ: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/kop-surat-dokumen.png"
              alt="3D Kop Surat dan Dokumen Resmi Republik Indonesia"
              fill
              sizes="(max-width: 768px) 45vw, 300px"
              className="object-contain object-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 3: LAPTOP E-KATALOG & SPSE (TRANSPARENT DIGITAL CORE - FOREGROUND BOTTOM RIGHT) ================= */}
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotateZ: [0.8, -0.8, 0.8],
            rotateX: [0.6, -0.8, 0.6],
            rotateY: [-0.6, 0.8, -0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.6,
            ease: "easeInOut",
            delay: 0.4,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute right-[-1%] sm:right-[1%] bottom-[-1%] sm:bottom-[0%] w-[64%] sm:w-[60%] aspect-square z-30 group cursor-pointer"
        >
          {/* Dynamic Cyan Hologram Backlight */}
          <motion.div 
            animate={{
              opacity: [0.25, 0.45, 0.25],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute inset-6 bg-cyan-400/30 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-cyan-400/50 transition-colors duration-500" 
          />

          {/* Pure Transparent PNG Cutout - 100% Zero Box */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/laptop-ekatalog-spse.png"
              alt="3D Laptop Portal Pengadaan e-Katalog LKPP dan SPSE UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 65vw, 440px"
              className="object-contain object-center drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]"
            />
          </motion.div>
        </motion.div>

        {/* ================= CONNECTING INTERSECTION CYBER GLOW ================= */}
        <div className="absolute top-[46%] left-[44%] w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none z-20 animate-pulse" />

      </motion.div>
    </div>
  );
}
