"use client"

import React, { useState, useEffect, useRef } from 'react';

interface ScrambleDecoderNumberProps {
  value: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const GLYPHS = '0123456789';

export function ScrambleDecoderNumber({
  value,
  delay = 100,
  duration = 2000,
  className = ""
}: ScrambleDecoderNumberProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [displayText, setDisplayText] = useState(value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Viewport / Scroll Trigger
  useEffect(() => {
    if (!isMounted) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMounted]);

  // Run scramble when inView or value changes - 100% clean without neon artifacts
  useEffect(() => {
    if (!inView) return;

    let animId: number;
    let startTime: number | null = null;
    let lastTickTime = 0;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Throttle random digit flicker to ~55ms so motion looks relaxed, deliberate, and readable
        if (rawProgress < 1 && timestamp - lastTickTime < 55) {
          animId = requestAnimationFrame(step);
          return;
        }
        lastTickTime = timestamp;

        // Ease-out curve so final digits lock in smoothly
        const easedProgress = 1 - Math.pow(1 - rawProgress, 2);
        const resolvedCount = Math.floor(easedProgress * value.length);

        let result = '';
        for (let i = 0; i < value.length; i++) {
          const targetChar = value[i];
          if (i < resolvedCount) {
            result += targetChar;
          } else if (targetChar === ' ' || targetChar === '.' || targetChar === ',' || targetChar === '%' || targetChar === 'R' || targetChar === 'p') {
            result += targetChar;
          } else if (i <= resolvedCount + 3) {
            // Numeric digit scramble
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            result += '0';
          }
        }

        setDisplayText(result);

        if (rawProgress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setDisplayText(value);
        }
      };

      animId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [inView, value, delay, duration]);

  // Avoid hydration mismatch on initial render
  if (!isMounted) {
    return <span className={`inline-flex items-center font-mono tabular-nums ${className}`}>{value}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center font-mono tabular-nums select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
