"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

type LanguageContextType = {
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  // Load language from localStorage on client side mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'id' || savedLang === 'en') {
      setLanguage(savedLang);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Optionally update document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Helper function to get translation by dot notation path (e.g. 'nav.home')
  const t = (path: string) => {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path; // Fallback to key
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
