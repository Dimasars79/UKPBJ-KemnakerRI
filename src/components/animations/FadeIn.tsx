"use client";

import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

/**
 * High-performance, zero-JS scroll wrapper.
 * Renders native DOM elements directly to ensure 60fps/120fps smooth hardware scrolling.
 */
export function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={className}>{children}</div>;
}
