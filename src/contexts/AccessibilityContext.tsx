"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type AccessibilityState = {
  isLargeText: boolean;
  isHighContrast: boolean;
  isGrayscale: boolean;
  isHighlightLinks: boolean;
  isReduceMotion: boolean;
};

type AccessibilityContextType = AccessibilityState & {
  toggleSetting: (key: keyof AccessibilityState) => void;
  resetSettings: () => void;
};

const defaultState: AccessibilityState = {
  isLargeText: false,
  isHighContrast: false,
  isGrayscale: false,
  isHighlightLinks: false,
  isReduceMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilityState>(defaultState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse a11y settings', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('a11y-settings', JSON.stringify(settings));
      
      const classList = document.documentElement.classList;
      
      if (settings.isLargeText) classList.add('a11y-large-text');
      else classList.remove('a11y-large-text');
      
      if (settings.isHighContrast) classList.add('a11y-high-contrast');
      else classList.remove('a11y-high-contrast');
      
      if (settings.isGrayscale) classList.add('a11y-grayscale');
      else classList.remove('a11y-grayscale');
      
      if (settings.isHighlightLinks) classList.add('a11y-highlight-links');
      else classList.remove('a11y-highlight-links');
      
      if (settings.isReduceMotion) classList.add('a11y-reduce-motion');
      else classList.remove('a11y-reduce-motion');
    }
  }, [settings, mounted]);

  const toggleSetting = (key: keyof AccessibilityState) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSettings = () => {
    setSettings(defaultState);
  };

  // We return null on first render to prevent hydration mismatch with client-only local storage state
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AccessibilityContext.Provider value={{ ...settings, toggleSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
