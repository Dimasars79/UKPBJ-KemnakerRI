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
    >
      {/* ================= 1. CLEAN HIGH-PERFORMANCE AMBIENT LIGHTING ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Core Soft Ambient Radial Glow (Single-pass GPU native, zero gaussian convolution) */}
        <div className="w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-[radial-gradient(circle,rgba(37,99,235,0.2)_0%,rgba(6,182,212,0.12)_45%,transparent_70%)] rounded-full" />
        
        {/* Soft Ground Ambient Base */}
        <div className="absolute bottom-2 sm:bottom-4 w-[240px] sm:w-[380px] h-[40px] sm:h-[60px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.15)_0%,transparent_75%)] rounded-[100%]" />
      </div>

      {/* ================= 2. MASTER PARALLAX STAGE (GPU Accelerated) ================= */}
      <motion.div
        style={{
          rotateX: springY,
          rotateY: springX,
        }}
        className="relative w-full h-full flex items-center justify-center will-change-transform"
      >

        {/* ================= ELEMENT 1: GEDUNG KONSTRUKSI ================= */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6.5,
            ease: "easeInOut",
          }}
          className="absolute left-[1%] sm:left-[3%] top-[3%] sm:top-[2%] w-[60%] sm:w-[56%] aspect-square z-10 group cursor-pointer will-change-transform"
        >
          <motion.div 
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/gedung-proyek-konstruksi.webp"
              alt="3D Gedung Proyek Konstruksi & Tower Crane UKPBJ Kemnaker"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 60vw, 400px"
              className="object-contain object-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 2: KOP SURAT & DOKUMEN ================= */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="absolute right-[1%] sm:right-[3%] top-[-2%] sm:top-[-1%] w-[48%] sm:w-[44%] aspect-square z-20 group cursor-pointer will-change-transform"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -4, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/kop-surat-dokumen.webp"
              alt="3D Kop Surat dan Dokumen Resmi Republik Indonesia"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 45vw, 300px"
              className="object-contain object-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </motion.div>


        {/* ================= ELEMENT 3: LAPTOP E-KATALOG & SPSE ================= */}
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.8,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute right-[-1%] sm:right-[1%] bottom-[-1%] sm:bottom-[0%] w-[64%] sm:w-[60%] aspect-square z-30 group cursor-pointer will-change-transform"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full overflow-visible"
          >
            <Image
              src="/assets/3d-elements/laptop-ekatalog-spse.webp"
              alt="3D Laptop Portal Pengadaan e-Katalog LKPP dan SPSE UKPBJ Kemnaker"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 65vw, 440px"
              className="object-contain object-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)]"
            />
          </motion.div>
        </motion.div>

        {/* Ambient Center Accent Dot */}
        <div className="absolute top-[48%] left-[46%] w-16 h-16 bg-cyan-400/10 rounded-full blur-xl pointer-events-none z-20" />

      </motion.div>
    </div>
  );
}
