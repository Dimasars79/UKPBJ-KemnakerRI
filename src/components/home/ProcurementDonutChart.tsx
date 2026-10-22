"use client";

import React, { useMemo, useState } from 'react';

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
  const [internalHover, setInternalHover] = useState<string | null>(null);
  const currentActive = activeMethod || internalHover;

  // Dimensi Isometrik 3D
  const vbWidth = 340;
  const vbHeight = 310;
  const cx = 170;
  const cy = 138;
  const Rx = 120; // Radius luar horizontal
  const Ry = 86;  // Radius luar vertikal (aspek rasio elips isometrik 3D)
  const rx = 66;  // Radius dalam horizontal
  const ry = 47;  // Radius dalam vertikal
  const depth = 22; // Ketebalan dinding silinder 3D ke bawah

  // Perhitungan Geometri Segmen Isometrik 3D
  const segments = useMemo(() => {
    const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0) || 100;
    let currentAngle = -90; // Mulai dari jam 12

    // Skema Warna Claymorphism 3D: Permukaan Atas Glossy + Dinding Samping Dalam
    const colorThemes: Record<string, {
      topLight: string;
      topDark: string;
      wallLight: string;
      wallDark: string;
      glow: string;
    }> = {
      'Tender': {
        topLight: '#60A5FA',
        topDark: '#1D4ED8',
        wallLight: '#1E40AF',
        wallDark: '#0F266A',
        glow: 'rgba(59, 130, 246, 0.5)'
      },
      'E-Purchasing': {
        topLight: '#FB7185',
        topDark: '#BE123C',
        wallLight: '#9F1239',
        wallDark: '#5E0820',
        glow: 'rgba(244, 63, 94, 0.5)'
      },
      'Pengadaan Langsung': {
        topLight: '#34D399',
        topDark: '#059669',
        wallLight: '#047857',
        wallDark: '#023829',
        glow: 'rgba(16, 185, 129, 0.5)'
      },
      'Seleksi': {
        topLight: '#C084FC',
        topDark: '#7E22CE',
        wallLight: '#6B21A8',
        wallDark: '#3B0764',
        glow: 'rgba(168, 85, 247, 0.5)'
      }
    };

    return data.map((item, index) => {
      const sliceAngle = (item.percentage / totalPercentage) * 360;
      
      // Celah tipis antar irisan kapsul
      const gap = 3.5;
      const startAngle = currentAngle + gap / 2;
      const endAngle = currentAngle + sliceAngle - gap / 2;
      const midAngle = currentAngle + sliceAngle / 2;
      currentAngle += sliceAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const midRad = (midAngle * Math.PI) / 180;

      // Koordinat Permukaan Atas (Top Face)
      const x1 = cx + Rx * Math.cos(startRad);
      const y1 = cy + Ry * Math.sin(startRad);
      const x2 = cx + Rx * Math.cos(endRad);
      const y2 = cy + Ry * Math.sin(endRad);

      const x3 = cx + rx * Math.cos(endRad);
      const y3 = cy + ry * Math.sin(endRad);
      const x4 = cx + rx * Math.cos(startRad);
      const y4 = cy + ry * Math.sin(startRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;

      // Path Permukaan Atas
      const topPath = [
        `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
        `A ${Rx} ${Ry} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
        `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
        `A ${rx} ${ry} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
        'Z'
      ].join(' ');

      // Path Dinding Luar Silinder 3D (Side Wall Extrusion)
      const wallPath = [
        `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
        `A ${Rx} ${Ry} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
        `L ${x2.toFixed(2)} ${(y2 + depth).toFixed(2)}`,
        `A ${Rx} ${Ry} 0 ${largeArc} 0 ${x1.toFixed(2)} ${(y1 + depth).toFixed(2)}`,
        'Z'
      ].join(' ');

      // Posisi Teks Persentase di Tengah Permukaan Irisan
      const textRadiusX = (Rx + rx) / 2;
      const textRadiusY = (Ry + ry) / 2;
      const textX = cx + textRadiusX * Math.cos(midRad);
      const textY = cy + textRadiusY * Math.sin(midRad) + 4;

      const theme = colorThemes[item.name] || {
        topLight: '#60A5FA',
        topDark: '#2563EB',
        wallLight: '#1D4ED8',
        wallDark: '#1E3A8A',
        glow: 'rgba(59, 130, 246, 0.4)'
      };

      // Vector angkat 3D saat di-hover
      const liftY = -8;

      return {
        ...item,
        index,
        topPath,
        wallPath,
        textX,
        textY,
        theme,
        liftY
      };
    });
  }, [data, cx, cy, Rx, Ry, rx, ry, depth]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      {/* 1. AMBIENT BACKLIGHT GLOW (Cahaya di belakang diagram) */}
      <div className="absolute w-64 h-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-pulse" />

      {/* 2. ISOMETRIC 3D SVG CONTAINER */}
      <svg
        width={vbWidth}
        height={vbHeight}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="overflow-visible select-none max-w-full h-auto drop-shadow-2xl"
      >
        <defs>
          {/* Bayangan Lantai Pekat (Floor Ambient Shadow) */}
          <filter id="clay-floor-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="13" />
          </filter>

          {/* Bayangan Jatuh Antar Segmen 3D */}
          <filter id="clay-slice-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          {/* Filter Timbul Piringan Silinder Putih */}
          <filter id="center-podium-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          {/* Gradien untuk Dinding Samping dan Permukaan Atas Tiap Irisan */}
          {segments.map((seg) => (
            <React.Fragment key={`grads-${seg.index}`}>
              {/* Gradien Permukaan Atas Glossy */}
              <linearGradient
                id={`grad-top-${seg.index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={seg.theme.topLight} />
                <stop offset="100%" stopColor={seg.theme.topDark} />
              </linearGradient>

              {/* Gradien Dinding Silinder 3D */}
              <linearGradient
                id={`grad-wall-${seg.index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={seg.theme.wallLight} />
                <stop offset="100%" stopColor={seg.theme.wallDark} />
              </linearGradient>
            </React.Fragment>
          ))}

          {/* Gradien Piringan Silinder Putih Pusat */}
          <radialGradient id="podium-top" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>

          {/* Efek Kilau Cahaya Berputar (Sheen Sweep Beam) */}
          <linearGradient id="sheen-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* 1. BAYANGAN LANTAI ISOMETRIK PEKAT (Deep Floor Shadow di Bawah Silinder) */}
        <ellipse
          cx={cx}
          cy={cy + depth + 48}
          rx={Rx * 1.08}
          ry={Ry * 0.42}
          fill="#000000"
          opacity="0.75"
          filter="url(#clay-floor-shadow)"
        />

        {/* 2. LAPISAN DINDING SAMPING 3D SILINDER (Extruded Side Walls) */}
        <g>
          {segments.map((seg) => {
            const isHovered = currentActive === seg.name;
            const offsetY = isHovered ? seg.liftY : 0;

            return (
              <path
                key={`wall-${seg.name}`}
                d={seg.wallPath}
                fill={`url(#grad-wall-${seg.index})`}
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth={0.8}
                className="transition-transform duration-300"
                style={{
                  transform: `translateY(${offsetY}px)`
                }}
              />
            );
          })}
        </g>

        {/* 3. LAPISAN PERMUKAAN ATAS GLOSSY (Top Claymorphic Faces) */}
        <g filter="url(#clay-slice-shadow)">
          {segments.map((seg) => {
            const isHovered = currentActive === seg.name;
            const offsetY = isHovered ? seg.liftY : 0;

            return (
              <g
                key={`top-group-${seg.name}`}
                className="cursor-pointer transition-transform duration-300"
                style={{
                  transform: `translateY(${offsetY}px)`
                }}
                onMouseEnter={() => {
                  setInternalHover(seg.name);
                  onHoverMethod(seg.name);
                }}
                onMouseLeave={() => {
                  setInternalHover(null);
                  onHoverMethod(null);
                }}
              >
                {/* Permukaan Atas Busur */}
                <path
                  d={seg.topPath}
                  fill={`url(#grad-top-${seg.index})`}
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  className="transition-all duration-300 hover:brightness-110"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 10px ${seg.theme.glow})` : 'none'
                  }}
                />

                {/* Garis Kilau Bevel Lengkung di Tepi Atas */}
                <path
                  d={seg.topPath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={1}
                />
              </g>
            );
          })}
        </g>

        {/* 4. KILAU CAHAYA MELINGKAR PERIODIK (Sheen Sweep Light) */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={Rx - 2}
          ry={Ry - 2}
          fill="none"
          stroke="url(#sheen-beam)"
          strokeWidth={depth}
          opacity="0.6"
          className="pointer-events-none animate-spin"
          style={{
            animationDuration: '10s',
            transformOrigin: `${cx}px ${cy}px`
          }}
        />

        {/* 5. TEKS PERSENTASE DI PERMUKAAN IRISAN */}
        <g className="pointer-events-none">
          {segments.map((seg) => {
            if (seg.percentage < 5) return null;
            const isHovered = currentActive === seg.name;
            const offsetY = isHovered ? seg.liftY : 0;

            return (
              <text
                key={`label-${seg.name}`}
                x={seg.textX}
                y={seg.textY + offsetY}
                textAnchor="middle"
                className="font-black text-xs sm:text-[13px] fill-white tracking-tight transition-all duration-300"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontWeight: 800
                }}
              >
                {seg.percentage}%
              </text>
            );
          })}
        </g>

        {/* 6. PIRINGAN SILINDER TIMBUL PUTIH DI TENGAH (3D White Raised Podium) */}
        <g filter="url(#center-podium-shadow)">
          {/* Sisi Tebal Silinder Putih */}
          <ellipse
            cx={cx}
            cy={cy + 8}
            rx={rx * 0.76}
            ry={ry * 0.76}
            fill="#94A3B8"
          />

          {/* Permukaan Atas Piringan Putih Glossy */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx * 0.76}
            ry={ry * 0.76}
            fill="url(#podium-top)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Cincin Aksen Emas Halus di Sekeliling Piringan */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx * 0.76 - 3}
            ry={ry * 0.76 - 3}
            fill="none"
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth="1"
          />
        </g>

        {/* 7. KONTEN METRIK PADA PODIUM PUSAT */}
        <g className="pointer-events-none text-center">
          <text
            x={cx}
            y={cy - 12}
            textAnchor="middle"
            className="text-[9px] font-black fill-slate-500 uppercase tracking-widest"
          >
            TOTAL
          </text>
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            className="text-sm sm:text-[15px] font-black fill-[#0A2342] tracking-tight"
            style={{
              textShadow: '0 1px 2px rgba(255,255,255,0.8)'
            }}
          >
            {totalPaguFormatted}
          </text>
          <text
            x={cx}
            y={cy + 19}
            textAnchor="middle"
            className="text-[10px] font-bold fill-slate-600"
          >
            {totalPackages} Paket
          </text>
        </g>
      </svg>
    </div>
  );
}
