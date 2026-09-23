"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';

interface ProcurementVisualCompositionProps {
  className?: string;
}

export function ProcurementVisualComposition({ className = "" }: ProcurementVisualCompositionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth spring physics for organic mouse parallax response
  const springX = useSpring(0, { stiffness: 65, damping: 20 });
  const springY = useSpring(0, { stiffness: 65, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    springX.set(x * 16);
    springY.set(y * -16);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
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
      {/* ================= 1. DYNAMIC HOLOGRAPHIC ENERGY BASE & CYBER ORBIT ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        
        {/* Core Volumetric Pulse */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.32, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] bg-gradient-to-tr from-blue-600/30 via-cyan-400/25 to-transparent rounded-full blur-[100px]" 
        />
        
        {/* Hologram Floor Oval Glow */}
        <div className="absolute bottom-2 sm:bottom-4 w-[320px] sm:w-[420px] h-[80px] sm:h-[100px] bg-cyan-500/25 rounded-[100%] blur-2xl" />
        
        {/* Ring 1: Primary Neon Cyan Beam (Clockwise slow spin) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute bottom-6 sm:bottom-8 w-[270px] sm:w-[370px] h-[70px] sm:h-[90px] border border-cyan-400/40 rounded-[100%] scale-y-50 [box-shadow:0_0_30px_rgba(34,211,238,0.35)] border-t-cyan-300 border-r-transparent" 
        />

        {/* Ring 2: Secondary Dashed Tech Orbit (Counter-clockwise spin) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="absolute bottom-4 sm:bottom-6 w-[340px] sm:w-[440px] h-[85px] sm:h-[110px] border border-blue-400/30 rounded-[100%] scale-y-50 border-dashed" 
        />

        {/* Ring 3: Outer Atmospheric Horizon */}
        <div className="absolute bottom-1 sm:bottom-3 w-[400px] sm:w-[500px] h-[100px] sm:h-[125px] border border-cyan-300/15 rounded-[100%] scale-y-50" />
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

        {/* ================= ELEMENT 1: GEDUNG KONSTRUKSI (SOLID 3D ANCHOR - MIDGROUND LEFT) ================= */}
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
          
          {/* Seamless Feathered 3D Render */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 38%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 72%, transparent 86%)',
              maskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 38%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 72%, transparent 86%)',
            }}
          >
            <Image
              src="/assets/3d-elements/gedung-proyek-konstruksi.jpg"
              alt="3D Gedung Proyek Konstruksi & Tower Crane UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 60vw, 400px"
              className="object-cover object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 2: KOP SURAT & DOKUMEN (AIR CURRENT HOVER - TOP RIGHT) ================= */}
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

          {/* Seamless Feathered 3D Render */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -6, rotateZ: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.2) 70%, transparent 85%)',
              maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.2) 70%, transparent 85%)',
            }}
          >
            <Image
              src="/assets/3d-elements/kop-surat-dokumen.jpg"
              alt="3D Kop Surat dan Dokumen Resmi Republik Indonesia"
              fill
              sizes="(max-width: 768px) 45vw, 300px"
              className="object-cover object-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 3: LAPTOP E-KATALOG & SPSE (DIGITAL CORE - FOREGROUND BOTTOM RIGHT) ================= */}
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

          {/* Seamless Feathered 3D Render */}
          <motion.div 
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 40%, rgba(0,0,0,0.9) 56%, rgba(0,0,0,0.25) 72%, transparent 86%)',
              maskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 40%, rgba(0,0,0,0.9) 56%, rgba(0,0,0,0.25) 72%, transparent 86%)',
            }}
          >
            <Image
              src="/assets/3d-elements/laptop-ekatalog-spse.jpg"
              alt="3D Laptop Portal Pengadaan e-Katalog LKPP dan SPSE UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 65vw, 440px"
              className="object-cover object-center drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]"
            />
          </motion.div>
        </motion.div>

        {/* ================= CONNECTING INTERSECTION CYBER GLOW ================= */}
        <div className="absolute top-[46%] left-[44%] w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none z-20 animate-pulse" />

      </motion.div>
    </div>
  );
}
