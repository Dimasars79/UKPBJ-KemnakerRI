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
  // Geometri Donut
  const size = 230;
  const cx = size / 2;
  const cy = size / 2;
  const R = 100; // Radius luar
  const r = 62;  // Radius dalam (lubang donut)

  // Hitung sudut masing-masing segmen (dimulai dari -90 derajat / jam 12)
  const slices = useMemo(() => {
    const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0) || 100;
    let currentAngle = -90;

    return data.map((item, index) => {
      // Sudut proporsional
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

      // Posisi teks persentase di tengah irisan
      const textRadius = (R + r) / 2;
      const textX = cx + textRadius * Math.cos(midRad);
      const textY = cy + textRadius * Math.sin(midRad) + 4; // Penyesuaian vertikal font

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      {/* 1. DONUT SVG CHART DENGAN INNER METRICS */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible select-none drop-shadow-lg"
        >
          <defs>
            {/* Bayangan halus segmen */}
            <filter id="donut-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Slices Donut */}
          <g filter="url(#donut-shadow)">
            {slices.map((slice) => {
              const isHovered = activeMethod === slice.name;
              return (
                <path
                  key={slice.name}
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="#0A1D37"
                  strokeWidth={3}
                  className="transition-all duration-300 cursor-pointer hover:opacity-95"
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    filter: isHovered ? 'brightness(1.15)' : 'none'
                  }}
                  onMouseEnter={() => onHoverMethod(slice.name)}
                  onMouseLeave={() => onHoverMethod(null)}
                />
              );
            })}
          </g>

          {/* Teks Persentase di Tengah Irisan Donut */}
          <g className="pointer-events-none">
            {slices.map((slice) => {
              if (slice.percentage < 5) return null; // Sembunyikan bila terlalu kecil
              return (
                <text
                  key={`label-${slice.name}`}
                  x={slice.textX}
                  y={slice.textY}
                  textAnchor="middle"
                  className="font-bold text-xs sm:text-[13px] fill-white"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    fontWeight: 700
                  }}
                >
                  {slice.percentage}%
                </text>
              );
            })}
          </g>

          {/* Lubang Donut Tengah (Dark Center Hub) */}
          <circle
            cx={cx}
            cy={cy}
            r={r - 1}
            fill="#081A32"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={1}
            className="drop-shadow-inner"
          />

          {/* Konten Metrik di Pusat Lubang Donut */}
          <g className="pointer-events-none text-center">
            <text
              x={cx}
              y={cy - 14}
              textAnchor="middle"
              className="text-[10px] font-medium fill-slate-400 uppercase tracking-wider"
            >
              Total
            </text>
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              className="text-sm sm:text-base font-extrabold fill-white tracking-tight"
            >
              {totalPaguFormatted}
            </text>
            <text
              x={cx}
              y={cy + 22}
              textAnchor="middle"
              className="text-[10px] font-semibold fill-slate-400"
            >
              {totalPackages} Paket
            </text>
          </g>
        </svg>
      </div>

      {/* 2. LEGEND METODE DI SEBELAH KANAN CHART */}
      <div className="flex-1 w-full flex flex-col justify-center gap-3">
        {data.map((item) => {
          const isHovered = activeMethod === item.name;
          return (
            <div
              key={item.name}
              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                isHovered ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'
              }`}
              onMouseEnter={() => onHoverMethod(item.name)}
              onMouseLeave={() => onHoverMethod(null)}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{item.name}</p>
                  <p className="text-[11px] font-semibold text-slate-300">
                    {item.paguFormatted}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.count} Paket</p>
                </div>
              </div>

              <div className="text-right shrink-0 pl-2">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {item.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
