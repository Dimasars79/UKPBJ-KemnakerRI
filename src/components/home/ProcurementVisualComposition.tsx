"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProcurementVisualCompositionProps {
  className?: string;
}

export function ProcurementVisualComposition({ className = "" }: ProcurementVisualCompositionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] aspect-[4/3.8] select-none flex items-center justify-center mx-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* 1. CYBER LIGHTING & HOLOGRAM BASE (ORGANIC BACKGROUND GLOW) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-4 w-[300px] sm:w-[400px] h-[75px] bg-cyan-500/25 rounded-[100%] blur-2xl" />
        
        {/* Futuristic Cyber Rings */}
        <div className="absolute bottom-8 w-[260px] sm:w-[350px] h-[65px] border border-cyan-400/35 rounded-[100%] scale-y-50 [box-shadow:0_0_25px_rgba(34,211,238,0.3)]" />
        <div className="absolute bottom-5 w-[340px] sm:w-[430px] h-[85px] border border-blue-400/25 rounded-[100%] scale-y-50 border-dashed animate-spin [animation-duration:45s]" />
      </div>

      {/* 2. PARALLAX 3D FLOATING SCENE (COMPLETELY CARDLESS & FRAMELESS) */}
      <motion.div
        style={{
          rotateX: mousePos.y * -14,
          rotateY: mousePos.x * 14,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
      >

        {/* ================= ELEMENT 1: GEDUNG KONSTRUKSI (SEAMLESS FLOATING 3D OBJECT) ================= */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotateZ: [-0.5, 0.5, -0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 6.5,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute left-[0%] sm:left-[2%] top-[6%] sm:top-[4%] w-[58%] sm:w-[54%] aspect-square z-20 group cursor-pointer"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute inset-4 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -z-10 group-hover:bg-cyan-400/30 transition-colors duration-500" />
          
          {/* Frameless Seamless Blended Image */}
          <div 
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.2) 84%, transparent 92%)',
              maskImage: 'radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.2) 84%, transparent 92%)',
            }}
          >
            <Image
              src="/assets/3d-elements/gedung-proyek-konstruksi.jpg"
              alt="3D Gedung Proyek Konstruksi & Tower Crane UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 60vw, 360px"
              className="object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* ================= ELEMENT 2: LAPTOP E-KATALOG & SPSE PORTAL (SEAMLESS FLOATING 3D OBJECT) ================= */}
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotateZ: [0.8, -0.8, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.6,
            ease: "easeInOut",
            delay: 0.8,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute right-[0%] sm:right-[2%] bottom-[2%] sm:bottom-[4%] w-[54%] sm:w-[50%] aspect-square z-30 group cursor-pointer"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute inset-4 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none -z-10 group-hover:bg-cyan-400/35 transition-colors duration-500" />

          {/* Frameless Seamless Blended Image */}
          <div 
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.2) 84%, transparent 92%)',
              maskImage: 'radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.2) 84%, transparent 92%)',
            }}
          >
            <Image
              src="/assets/3d-elements/laptop-ekatalog-spse.jpg"
              alt="3D Laptop Portal Pengadaan e-Katalog LKPP dan SPSE UKPBJ Kemnaker"
              fill
              sizes="(max-width: 768px) 55vw, 340px"
              className="object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* ================= ELEMENT 3: KOP SURAT & DOKUMEN RESMI (SEAMLESS FLOATING 3D OBJECT) ================= */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotateZ: [-1, 1, -1],
          }}
          transition={{
            repeat: Infinity,
            duration: 7.2,
            ease: "easeInOut",
            delay: 1.4,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute right-[2%] sm:right-[4%] top-[0%] sm:top-[2%] w-[46%] sm:w-[44%] aspect-square z-10 group cursor-pointer"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute inset-4 bg-blue-500/15 rounded-full blur-2xl pointer-events-none -z-10 group-hover:bg-blue-400/30 transition-colors duration-500" />

          {/* Frameless Seamless Blended Image */}
          <div 
            className="relative w-full h-full overflow-visible"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 54%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.2) 82%, transparent 92%)',
              maskImage: 'radial-gradient(circle at 50% 50%, #000 54%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.2) 82%, transparent 92%)',
            }}
          >
            <Image
              src="/assets/3d-elements/kop-surat-dokumen.jpg"
              alt="3D Kop Surat dan Dokumen Resmi Republik Indonesia"
              fill
              sizes="(max-width: 768px) 48vw, 280px"
              className="object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
