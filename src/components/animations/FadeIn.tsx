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
    up: { y: 12, x: 0 },
    down: { y: -12, x: 0 },
    left: { x: 12, y: 0 },
    right: { x: -12, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
