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
      className={`relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[560px] aspect-square select-none flex items-center justify-center mx-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* ================= 1. BASE NEON CONCENTRIC GLOW RINGS ================= */}
      <div className="absolute -bottom-6 sm:-bottom-10 w-[95%] sm:w-[105%] h-36 sm:h-44 pointer-events-none flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div 
          className="absolute w-full h-full rounded-[100%] border-2 border-cyan-400/40 bg-gradient-to-t from-cyan-500/20 via-blue-600/10 to-transparent shadow-[0_0_80px_rgba(6,182,212,0.45)]"
          style={{ transform: 'rotateX(76deg) translateZ(-40px)' }}
        />
        {/* Middle Pulse Ring */}
        <motion.div 
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute w-[80%] h-[80%] rounded-[100%] border border-cyan-300/70 bg-cyan-400/15 shadow-[0_0_50px_rgba(34,211,238,0.5)]"
          style={{ transform: 'rotateX(76deg) translateZ(-20px)' }}
        />
      </div>

      {/* ================= 2. PARALLAX 3D COMPOSITION STAGE ================= */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: "easeInOut",
        }}
        style={{
          rotateX: mousePos.y * -14,
          rotateY: mousePos.x * 14,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer group"
      >
        {/* Ambient Back Glow Aura */}
        <div className="absolute inset-6 bg-gradient-to-tr from-cyan-500/30 via-blue-600/30 to-amber-500/20 rounded-3xl blur-3xl pointer-events-none" />

        {/* ================= 3. MASTER 3D ARTWORK (FRAMELESS & SEAMLESS BLEND) ================= */}
        <div className="relative w-full h-full overflow-visible [mask-image:radial-gradient(circle_at_center,#000_74%,transparent_100%)]">
          <Image
            src="/hero/hero-procurement-kemnaker-master.jpg"
            alt="3D Komposisi Pengadaan Barang dan Jasa Kemnaker RI dengan Bendera Merah Putih, Dokumen Pengadaan, Buku Resmi RI, dan Kardus Logistik"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          />

          {/* Futuristic Scanning Laser Bar */}
          <motion.div
            animate={{ y: ['-100%', '320%'] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "linear" }}
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent border-b border-cyan-400/30 pointer-events-none"
          />
        </div>

      </motion.div>
    </div>
  );
}
