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
  duration = 1200,
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMounted]);

  // Run scramble when inView or value changes - 100% clean without neon artifacts
  useEffect(() => {
    if (!inView) return;

    let animId: number;
    let startTime: number | null = null;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate how many characters are locked into place
        const resolvedCount = Math.floor(progress * value.length);

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

        if (progress < 1) {
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
