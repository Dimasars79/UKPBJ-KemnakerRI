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
      {/* ================= 1. SUBTLE BACKGROUND AMBIENT GLOW (SEAMLESS NAVY COMPOSITING) ================= */}
      <div className="absolute inset-0 bg-[#07172E] rounded-full blur-2xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute inset-10 bg-gradient-to-tr from-blue-900/30 via-cyan-900/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= 2. PARALLAX 3D COMPOSITION STAGE ================= */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        style={{
          rotateX: mousePos.y * -10,
          rotateY: mousePos.x * 10,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer group"
      >
        {/* ================= 3. SEAMLESS BLENDED 3D ILLUSTRATION ================= */}
        {/* The multi-stop feathered radial mask ensures the image background seamlessly dissolves into #07172E with ZERO hard edges */}
        <div 
          className="relative w-full h-full overflow-visible"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 50%, rgba(0,0,0,0.95) 60%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.15) 84%, transparent 92%)',
            maskImage: 'radial-gradient(circle at 50% 50%, #000 50%, rgba(0,0,0,0.95) 60%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.15) 84%, transparent 92%)',
          }}
        >
          <Image
            src="/hero/hero-procurement-kemnaker-master.jpg"
            alt="3D Komposisi Pengadaan Barang dan Jasa Kemnaker RI dengan Gedung Proyek Konstruksi, Buku Resmi RI, Kardus Logistik, dan Bendera Merah Putih"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </motion.div>
    </div>
  );
}
