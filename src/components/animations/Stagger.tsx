"use client";

import React from "react";

/**
 * High-performance, zero-JS stagger container.
 * Eliminates scroll event listeners and IntersectionObservers for instant 60fps/120fps scrolling.
 */
export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
