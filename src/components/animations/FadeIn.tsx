"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  forceAnimate?: boolean;
}

/**
 * Scroll-driven Reveal Animation.
 * Dikhususkan aktif hanya pada Beranda ("/") agar performa halaman lain (admin, monitoring, dll.)
 * tetap 100% cepat tanpa beban observer atau frame drop.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  forceAnimate = false,
}: FadeInProps) {
  const pathname = usePathname();
  const isHome = pathname === "/" || forceAnimate;

  if (!isHome) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
