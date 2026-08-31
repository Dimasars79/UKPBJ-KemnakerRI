"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Globe, Eye, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Informasi', href: '#' },
    { label: 'Layanan', href: '#' },
    { label: 'Agenda', href: '#' },
    { label: 'Galeri', href: '#' },
    { label: 'Monitoring', href: '#' },
    { label: 'Tentang UKPBJ', href: '#' }
  ];

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
      {/* Top Government Bar */}
      <div className="bg-primary-navy text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium tracking-wide">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span>KEMENTERIAN LUAR NEGERI REPUBLIK INDONESIA</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="hover:text-secondary-soft transition-colors flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>Bahasa Indonesia</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hover:text-secondary-soft transition-colors flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>Aksesibilitas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo Kementerian" width={200} height={48} className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <div className="flex flex-col ml-2 border-l border-slate-300 pl-4">
              <Image src="/logo-ukpbj-kemnaker.png" alt="Logo UKPBJ" width={120} height={48} className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${item.label === 'Beranda'
                    ? 'text-primary-blue'
                    : 'text-slate-700 hover:text-primary-blue hover:bg-secondary-offwhite'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Unified Actions & Toggler (Visible on All Devices) */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Elegant Search (Hidden on very small screens to save space, but visible on md+) */}
            <button className="hidden md:flex group items-center justify-center w-10 h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Search className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Elegant Login (Hidden on mobile) */}
            <Link
              href="#"
              className="hidden md:flex relative overflow-hidden group items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] hover:-translate-y-0.5 border border-transparent hover:border-blue-400/30"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <User className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Masuk Portal</span>
            </Link>

            {/* Mobile Navbar Toggler */}
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-secondary-offwhite hover:bg-primary-blue text-primary-navy hover:text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-slate-100 bg-white shadow-lg absolute top-full left-0 w-full z-40"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-primary-navy hover:bg-secondary-offwhite hover:text-primary-blue transition-colors group flex items-center justify-between border border-transparent hover:border-slate-100"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all text-accent-gold">&rarr;</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile-only actions inside the menu */}
              <div className="md:hidden mt-6 pt-6 border-t border-slate-100 flex flex-col space-y-3">
                <button className="flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-medium w-full">
                  <Search className="w-5 h-5" />
                  <span>Pencarian</span>
                </button>
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white w-full px-4 py-3 rounded-xl font-bold shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span>Masuk Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
