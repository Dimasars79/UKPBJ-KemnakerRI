"use client";

import React, { useState, useMemo } from 'react';

export interface DonutSegment {
  name: string;
  value: number;
  totalPagu: number;
  percentage: number;
  color: string;
}

interface Donut3DChartProps {
  data: DonutSegment[];
  totalCount?: number;
  activeSegmentIndex: number | null;
  onHoverSegment: (index: number | null) => void;
  formatMiliar: (nominal: number) => string;
}

export function Donut3DChart({
  data,
  activeSegmentIndex,
  onHoverSegment,
  formatMiliar
}: Donut3DChartProps) {
  // Sektor yang default agak mencuat keluar (seperti segmen merah di gambar referensi)
  const [internalHoverIndex, setInternalHoverIndex] = useState<number | null>(null);

  const activeIndex = activeSegmentIndex !== null ? activeSegmentIndex : internalHoverIndex;

  // Parameter Geometri Infografis 3D
  const vbWidth = 760;
  const vbHeight = 400;
  const cx = 380;
  const cy = 200;
  const R = 120; // Radius luar
  const r = 24;  // Radius lingkaran tengah kecil (seperti piringan pada gambar referensi)
  const markerR = 72; // Posisi pin lingkaran target di tengah irisan

  // Hitung sudut proporsional untuk 4 metode
  const slices = useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;

    // Sudut awal agar penempatan 4 callout seimbang (2 kiri, 2 kanan)
    // 0: Tender (Kiri atas)
    // 1: E-Purchasing (Kanan atas)
    // 2: Pengadaan Langsung (Kanan bawah)
    // 3: Seleksi (Kiri bawah)
    let currentAngle = 145; 

    return data.map((item, index) => {
      const sliceAngle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      const midAngle = currentAngle + sliceAngle / 2;
      currentAngle += sliceAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const midRad = (midAngle * Math.PI) / 180;

      // Koordinat busur luar
      const x1 = cx + R * Math.cos(startRad);
      const y1 = cy + R * Math.sin(startRad);
      const x2 = cx + R * Math.cos(endRad);
      const y2 = cy + R * Math.sin(endRad);

      // Koordinat busur dalam
      const x3 = cx + r * Math.cos(endRad);
      const y3 = cy + r * Math.sin(endRad);
      const x4 = cx + r * Math.cos(startRad);
      const y4 = cy + r * Math.sin(startRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;

      const pathData = [
        `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
        `A ${R} ${R} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
        `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
        `A ${r} ${r} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
        'Z'
      ].join(' ');

      // Vektor pop-out (mencuat keluar saat di-hover)
      const isPopOutDefault = false; 
      const popDistance = 14;
      const popX = Math.cos(midRad) * popDistance;
      const popY = Math.sin(midRad) * popDistance;

      // Titik target marker (double ring)
      const mx = cx + markerR * Math.cos(midRad);
      const my = cy + markerR * Math.sin(midRad);

      // Tentukan posisi siku dan garis callout (Kiri atau Kanan)
      const isLeft = Math.cos(midRad) < 0;
      const isTop = Math.sin(midRad) < 0;

      // Koordinat siku callout
      const elbowX = isLeft ? mx - 45 : mx + 45;
      const elbowY = isTop ? my - 38 : my + 38;
      const lineEndX = isLeft ? 120 : 640;

      // Warna tema visual 3D (sesuai referensi: biru, merah-oranye, hijau, ungu)
      const colorsMap: Record<string, { topGrad: [string, string]; side: string; glow: string }> = {
        'Tender': {
          topGrad: ['#38BDF8', '#1D4ED8'],
          side: '#1E3A8A',
          glow: 'rgba(56, 189, 248, 0.4)'
        },
        'E-Purchasing': {
          topGrad: ['#FB7185', '#E11D48'],
          side: '#9F1239',
          glow: 'rgba(244, 63, 94, 0.4)'
        },
        'Pengadaan Langsung': {
          topGrad: ['#4ADE80', '#15803D'],
          side: '#14532D',
          glow: 'rgba(74, 222, 128, 0.4)'
        },
        'Seleksi': {
          topGrad: ['#C084FC', '#7E22CE'],
          side: '#581C87',
          glow: 'rgba(192, 132, 252, 0.4)'
        }
      };

      const theme = colorsMap[item.name] || {
        topGrad: ['#60A5FA', '#2563EB'],
        side: '#1E40AF',
        glow: 'rgba(96, 165, 250, 0.4)'
      };

      return {
        ...item,
        pathData,
        index,
        popX,
        popY,
        isPopOutDefault,
        mx,
        my,
        elbowX,
        elbowY,
        lineEndX,
        isLeft,
        isTop,
        theme
      };
    });
  }, [data, cx, cy, R, r, markerR]);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center select-none py-2">
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="w-full h-auto max-h-[380px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Bayangan Lantai di Bawah Chart (Ground Blur) */}
          <filter id="ground-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>

          {/* Efek Bayangan 3D Tumpang Tindih Antar Irisan (Stepped 3D Shadow) */}
          <filter id="step-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-4" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
          </filter>

          {/* Drop shadow untuk Callout Line & Rings */}
          <filter id="glow-marker" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          {/* Linear Gradient untuk Setiap Sektor (Memberikan kedalaman 3D lengkung) */}
          {slices.map((slice) => (
            <linearGradient
              key={`grad-slice-${slice.index}`}
              id={`grad-slice-${slice.index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={slice.theme.topGrad[0]} />
              <stop offset="100%" stopColor={slice.theme.topGrad[1]} />
            </linearGradient>
          ))}

          {/* Inner Shadow untuk Lubang Tengah */}
          <radialGradient id="center-hole" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* 1. BAYANGAN LANTAI 3D (Ground Shadow di bawah piringan) */}
        <ellipse
          cx={cx}
          cy={cy + R + 25}
          rx={R * 1.05}
          ry={16}
          fill="#000000"
          opacity="0.6"
          filter="url(#ground-shadow)"
        />

        {/* 2. LAPISAN SLICE PIE 3D DENGAN EFEK STEPPED SHADOW */}
        <g>
          {slices.map((slice) => {
            const isHovered = activeIndex === slice.index;
            // Pop out jika di-hover atau default pop-out untuk segmen tertentu
            const shouldPop = isHovered || (activeIndex === null && slice.isPopOutDefault);
            const shiftX = shouldPop ? slice.popX : 0;
            const shiftY = shouldPop ? slice.popY : 0;

            return (
              <g
                key={`slice-${slice.name}`}
                className="cursor-pointer transition-transform duration-300"
                style={{
                  transform: `translate(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px)`
                }}
                onMouseEnter={() => {
                  setInternalHoverIndex(slice.index);
                  onHoverSegment(slice.index);
                }}
                onMouseLeave={() => {
                  setInternalHoverIndex(null);
                  onHoverSegment(null);
                }}
              >
                {/* Sektor Pie Utama */}
                <path
                  d={slice.pathData}
                  fill={`url(#grad-slice-${slice.index})`}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  filter="url(#step-shadow)"
                  className="transition-all duration-300 hover:brightness-110"
                />

                {/* Sisi Tebal 3D / Bevel Edge saat Popped Out */}
                {shouldPop && (
                  <path
                    d={slice.pathData}
                    fill="none"
                    stroke={slice.theme.side}
                    strokeWidth={3}
                    opacity={0.7}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* 3. LUBANG TENGAH KECIL GELAP (Small Dark Center Hub seperti pada gambar) */}
        <g>
          {/* Cincin luar lubang */}
          <circle
            cx={cx}
            cy={cy}
            r={r + 1}
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
          />
          {/* Lubang hitam solid dengan inner gradient */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="url(#center-hole)"
            stroke="#0A2240"
            strokeWidth="2.5"
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.8))"
          />
        </g>

        {/* 4. CALLOUT LEADER LINES & TARGET MARKERS (Sesuai Referensi Gambar) */}
        <g>
          {slices.map((slice) => {
            const isHovered = activeIndex === slice.index;
            const shouldPop = isHovered || (activeIndex === null && slice.isPopOutDefault);
            const shiftX = shouldPop ? slice.popX : 0;
            const shiftY = shouldPop ? slice.popY : 0;

            const markerX = slice.mx + shiftX;
            const markerY = slice.my + shiftY;

            return (
              <g 
                key={`callout-${slice.name}`}
                className="transition-opacity duration-300 cursor-pointer"
                style={{
                  opacity: activeIndex === null || isHovered ? 1 : 0.55
                }}
                onMouseEnter={() => {
                  setInternalHoverIndex(slice.index);
                  onHoverSegment(slice.index);
                }}
                onMouseLeave={() => {
                  setInternalHoverIndex(null);
                  onHoverSegment(null);
                }}
              >
                {/* A. Garis Penunjuk (Leader Line dengan Siku Horizontal) */}
                <polyline
                  points={`
                    ${markerX},${markerY}
                    ${slice.elbowX},${slice.elbowY}
                    ${slice.lineEndX},${slice.elbowY}
                  `}
                  fill="none"
                  stroke={isHovered ? slice.theme.topGrad[0] : 'rgba(255, 255, 255, 0.45)'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow-marker)"
                  className="transition-all duration-300"
                />

                {/* B. Pin Target Marker di Atas Slice (Double Concentric Ring) */}
                <g transform={`translate(${markerX}, ${markerY})`} filter="url(#glow-marker)">
                  {/* Cincin Putih Luar */}
                  <circle
                    r={7.5}
                    fill="#FFFFFF"
                    stroke="rgba(0, 0, 0, 0.3)"
                    strokeWidth={1}
                  />
                  {/* Titik Warna Dalam */}
                  <circle
                    r={3.8}
                    fill={slice.theme.topGrad[1]}
                  />
                </g>

                {/* C. Teks Infografis (Persentase Besar + Judul + Keterangan Ringkas) */}
                <g 
                  transform={`translate(${slice.isLeft ? slice.lineEndX - 8 : slice.lineEndX + 8}, ${slice.elbowY})`}
                  textAnchor={slice.isLeft ? 'end' : 'start'}
                >
                  {/* Angka Persentase Besar (seperti 55%, 30%, 15% pada gambar referensi) */}
                  <text
                    y={-10}
                    className="font-black text-2xl sm:text-3xl fill-white tracking-tight"
                    style={{
                      fill: isHovered ? slice.theme.topGrad[0] : '#FFFFFF',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                  >
                    {slice.percentage}%
                  </text>

                  {/* Nama Metode Pengadaan */}
                  <text
                    y={12}
                    className="font-bold text-xs sm:text-sm fill-slate-200"
                    style={{
                      fill: isHovered ? '#FDE68A' : '#E2E8F0'
                    }}
                  >
                    {slice.name}
                  </text>

                  {/* Rincian Jumlah Paket & Nominal Pagu */}
                  <text
                    y={28}
                    className="text-[11px] font-mono fill-slate-400 font-medium"
                  >
                    {slice.value} Paket · {formatMiliar(slice.totalPagu)}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
