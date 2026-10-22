"use client";

import React, { useMemo } from 'react';

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
  // Geometri Donut Besar & Proporsional
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const R = 126; // Radius luar
  const r = 78;  // Radius dalam (lubang tengah lega)

  // Hitung sudut masing-masing segmen (dimulai dari -90 derajat / jam 12)
  const slices = useMemo(() => {
    const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0) || 100;
    let currentAngle = -90;

    return data.map((item, index) => {
      const sliceAngle = (item.percentage / totalPercentage) * 360;
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

      // Posisi teks persentase di tengah irisan cincin
      const textRadius = (R + r) / 2;
      const textX = cx + textRadius * Math.cos(midRad);
      const textY = cy + textRadius * Math.sin(midRad) + 5;

      return {
        ...item,
        index,
        pathData,
        textX,
        textY
      };
    });
  }, [data, cx, cy, R, r]);

  return (
    <div className="relative flex items-center justify-center select-none py-2">
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible drop-shadow-2xl max-w-full h-auto"
      >
        <defs>
          {/* Bayangan halus 3D */}
          <filter id="donut-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 1. Slices Donut Chart */}
        <g filter="url(#donut-shadow)">
          {slices.map((slice) => {
            const isHovered = activeMethod === slice.name;
            return (
              <path
                key={slice.name}
                d={slice.pathData}
                fill={slice.color}
                stroke="#07172B"
                strokeWidth={3.5}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: isHovered ? 'scale(1.045)' : 'scale(1)',
                  filter: isHovered ? 'brightness(1.15) drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                }}
                onMouseEnter={() => onHoverMethod(slice.name)}
                onMouseLeave={() => onHoverMethod(null)}
              />
            );
          })}
        </g>

        {/* 2. Teks Persentase di Setiap Irisan (Persis seperti gambar referensi) */}
        <g className="pointer-events-none">
          {slices.map((slice) => {
            if (slice.percentage < 4) return null;
            return (
              <text
                key={`label-${slice.name}`}
                x={slice.textX}
                y={slice.textY}
                textAnchor="middle"
                className="font-black text-sm sm:text-base fill-white tracking-tight"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                }}
              >
                {slice.percentage}%
              </text>
            );
          })}
        </g>

        {/* 3. Lubang Donut Tengah Gelap (Deep Navy Hub) */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 1}
          fill="#061528"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={1.5}
          className="drop-shadow-inner"
        />

        {/* 4. Metrik Teks Pusat Donut */}
        <g className="pointer-events-none text-center">
          <text
            x={cx}
            y={cy - 18}
            textAnchor="middle"
            className="text-[10px] font-bold fill-slate-400 uppercase tracking-widest"
          >
            TOTAL VALUASI
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            className="text-lg sm:text-xl font-black fill-white tracking-tight"
            style={{
              textShadow: '0 2px 6px rgba(0,0,0,0.6)'
            }}
          >
            {totalPaguFormatted}
          </text>
          <text
            x={cx}
            y={cy + 26}
            textAnchor="middle"
            className="text-[11px] font-medium fill-slate-400"
          >
            {totalPackages} Paket Pengadaan
          </text>
        </g>
      </svg>
    </div>
  );
}
