"use client"

import React, { useState, useEffect } from 'react';

interface TypewriterNumberProps {
  value: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before typing starts
  className?: string;
  cursorColor?: string;
  showCursor?: boolean;
}

export function TypewriterNumber({
  value,
  speed = 30,
  delay = 100,
  className = "",
  cursorColor = "currentColor",
  showCursor = true
}: TypewriterNumberProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    setIsTyping(true);
    setDisplayText('');

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayText(value.slice(0, currentIndex));

        if (currentIndex >= value.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [value, speed, delay]);

  return (
    <span className={`inline-flex items-center font-mono tabular-nums ${className}`}>
      <span>{displayText}</span>
      {showCursor && isTyping && (
        <span 
          className="inline-block w-[2px] h-[0.85em] ml-0.5 animate-pulse rounded-xs"
          style={{ backgroundColor: cursorColor }}
        />
      )}
    </span>
  );
}
