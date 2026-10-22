"use client";

import React, { useMemo, useState, useRef } from 'react';

export interface DonutMethodItem {
  name: string;
  count: number;
  totalPagu: number;
  paguFormatted: string;
  percentage: number;
  color: string;
  dotColor: string;
}

interface ProcurementDonutChartProps {
  data: DonutMethodItem[];
  totalPaguFormatted: string;
  totalPackages: number;
  activeMethod: string | null;
  onHoverMethod: (method: string | null) => void;
}

export function ProcurementDonutChart({
  data,
  totalPaguFormatted,
  totalPackages,
  activeMethod,
  onHoverMethod
}: ProcurementDonutChartProps) {
  // Ref container untuk mendeteksi posisi kursor mouse (3D Parallax Tilt)
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Parameter Geometri Cincin 3D Kapsul Membulat
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 98; // Radius cincin tengah
  const strokeWidth = 38; // Ketebalan busur kapsul
  const innerPuckRadius = 52; // Jari-jari tombol silinder putih di tengah

  // Hitung sudut masing-masing busur kapsul membulat
  const arcs = useMemo(() => {
    const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0) || 100;
    
    // Sudut awal: jam 12 (-90 derajat)
    let currentAngle = -90;

    // Gradien khusus untuk memberikan efek kedalaman 3D lengkung per segmen
    const gradientsMap: Record<string, { start: string; end: string; shadow: string }> = {
      'Tender': {
        start: '#38BDF8',
        end: '#1D4ED8',
        shadow: '#0F2A6B'
      },
      'E-Purchasing': {
        start: '#FB7185',
        end: '#BE123C',
        shadow: '#5F091F'
      },
      'Seleksi': {
        start: '#C084FC',
        end: '#6D28D9',
        shadow: '#3B1475'
      },
      'Pengadaan Langsung': {
        start: '#34D399',
        end: '#047857',
        shadow: '#023829'
      }
    };

    return data.map((item, index) => {
      // Sudut sebaran busur
      const sliceAngle = (item.percentage / totalPercentage) * 360;
      
      // Berikan jarak napas tipis di antara busur kapsul membulat
      const gapAngle = 6; 
      const startAngle = currentAngle + gapAngle / 2;
      const endAngle = currentAngle + sliceAngle - gapAngle / 2;
      const midAngle = currentAngle + sliceAngle / 2;
      currentAngle += sliceAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const midRad = (midAngle * Math.PI) / 180;

      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);

      const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;

      // Path busur utama untuk stroke
      const pathD = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;

      // Posisi teks persentase di tengah lengkungan busur
      const textX = cx + radius * Math.cos(midRad);
      const textY = cy + radius * Math.sin(midRad) + 5;

      const grad = gradientsMap[item.name] || {
        start: item.color,
        end: item.color,
        shadow: '#0B1F3D'
      };

      return {
        ...item,
        index,
        pathD,
        textX,
        textY,
        grad
      };
    });
  }, [data, cx, cy, radius]);

  // Handler interaksi mouse untuk efek 3D Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalisasi -1 s.d 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Maksimal kemiringan 12 derajat
    setTilt({
      x: -normY * 12,
      y: normX * 12
    });
  };

  const handleMouseEnter = () => {
    setIsHoveringCard(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCard(false);
    setTilt({ x: 0, y: 0 });
    onHoverMethod(null);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center select-none py-2 cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* 1. AMBIENT BACKLIGHT GLOW (Cahaya di belakang cincin) */}
      <div 
        className="absolute w-60 h-60 rounded-full bg-blue-500/20 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          transform: isHoveringCard ? 'scale(1.15)' : 'scale(1)',
          opacity: isHoveringCard ? 0.9 : 0.5
        }}
      />

      {/* 2. ELEMEN 3D YANG DAPAT DIMIRINGKAN (Tilt & Floating Motion) */}
      <div
        className="relative transition-transform ease-out"
        style={{
          transform: isHoveringCard
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transitionDuration: isHoveringCard ? '120ms' : '600ms',
          transformStyle: 'preserve-3d'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible select-none max-w-full h-auto drop-shadow-2xl animate-float-slow"
        >
          <defs>
            {/* Filter Bayangan Tumpuk Antar Busur (3D Extrusion Shadow) */}
            <filter id="arc-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="-2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.65" />
            </filter>

            {/* Filter Bayangan Piringan Silinder Putih Tengah */}
            <filter id="puck-depth" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
            </filter>

            {/* Gradien untuk Tiap Busur Cincin */}
            {arcs.map((arc) => (
              <linearGradient
                key={`grad-arc-${arc.index}`}
                id={`grad-arc-${arc.index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={arc.grad.start} />
                <stop offset="100%" stopColor={arc.grad.end} />
              </linearGradient>
            ))}

            {/* Gradien Piringan Silinder Putih */}
            <radialGradient id="puck-grad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </radialGradient>
          </defs>

          {/* LAPISAN 1: SISI BAWAH 3D SILINDER (Extruded Side Rim di bawah busur) */}
          <g>
            {arcs.map((arc) => (
              <path
                key={`base-shadow-${arc.name}`}
                d={arc.pathD}
                fill="none"
                stroke={arc.grad.shadow}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                transform="translate(0, 5)"
                opacity="0.9"
              />
            ))}
          </g>

          {/* LAPISAN 2: BUSUR UTAMA 3D DENGAN ROUNDED CAPS (Persis Gambar Referensi) */}
          <g filter="url(#arc-depth-shadow)">
            {arcs.map((arc) => {
              const isHovered = activeMethod === arc.name;
              return (
                <path
                  key={`main-arc-${arc.name}`}
                  d={arc.pathD}
                  fill="none"
                  stroke={`url(#grad-arc-${arc.index})`}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered ? 'brightness(1.2)' : 'none'
                  }}
                  onMouseEnter={() => onHoverMethod(arc.name)}
                  onMouseLeave={() => onHoverMethod(null)}
                />
              );
            })}
          </g>

          {/* LAPISAN 3: TEKS PERSENTASE DI TENGAH BUSUR */}
          <g className="pointer-events-none">
            {arcs.map((arc) => {
              if (arc.percentage < 5) return null;
              const isHovered = activeMethod === arc.name;
              return (
                <text
                  key={`text-pct-${arc.name}`}
                  x={arc.textX}
                  y={arc.textY}
                  textAnchor="middle"
                  className="font-black text-xs sm:text-[13px] fill-white tracking-tight transition-all duration-300"
                  style={{
                    textShadow: '0 2px 5px rgba(0,0,0,0.8)',
                    fontWeight: 800,
                    transformOrigin: `${arc.textX}px ${arc.textY}px`,
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  {arc.percentage}%
                </text>
              );
            })}
          </g>

          {/* LAPISAN 4: PIRINGAN SILINDER PUTIH TIMBUL DI TENGAH (Floating 3D Raised Puck) */}
          <g filter="url(#puck-depth)">
            {/* Sisi Tebal Silinder (Bevel Layer bawah) */}
            <circle
              cx={cx}
              cy={cy + 4}
              r={innerPuckRadius}
              fill="#94A3B8"
            />

            {/* Piringan Utama Putih Atas */}
            <circle
              cx={cx}
              cy={cy}
              r={innerPuckRadius}
              fill="url(#puck-grad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            {/* Lingkaran cincin dalam piringan */}
            <circle
              cx={cx}
              cy={cy}
              r={innerPuckRadius - 5}
              fill="none"
              stroke="rgba(0, 0, 0, 0.06)"
              strokeWidth="1"
            />
          </g>

          {/* LAPISAN 5: KONTEN TEKS PADA SILINDER TENGAH (Total Valuasi) */}
          <g className="pointer-events-none text-center">
            {/* Label Judul Kecil */}
            <text
              x={cx}
              y={cy - 16}
              textAnchor="middle"
              className="text-[9px] font-extrabold fill-slate-500 uppercase tracking-widest"
            >
              TOTAL
            </text>

            {/* Nominal Besar Pagu */}
            <text
              x={cx}
              y={cy + 5}
              textAnchor="middle"
              className="text-sm sm:text-base font-black fill-[#0A2342] tracking-tight"
              style={{
                textShadow: '0 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              {totalPaguFormatted}
            </text>

            {/* Subteks Jumlah Paket */}
            <text
              x={cx}
              y={cy + 21}
              textAnchor="middle"
              className="text-[10px] font-bold fill-slate-600"
            >
              {totalPackages} Paket
            </text>
          </g>
        </svg>

        {/* 3. BAYANGAN LANTAI DINAMIS (Ground Blur Shadow) */}
        <div 
          className="w-44 h-4 mx-auto rounded-full bg-black/60 blur-md transition-all duration-500"
          style={{
            transform: isHoveringCard ? 'scale(1.1) translateY(4px)' : 'scale(1) translateY(0px)',
            opacity: isHoveringCard ? 0.75 : 0.45
          }}
        />
      </div>

      {/* Petunjuk Interaktif Mikro */}
      <span className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        Geser kursor untuk melihat efek 3D
      </span>
    </div>
  );
}
