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
            <div className="flex flex-col">
              <span className="font-bold text-primary-navy text-base md:text-lg leading-tight tracking-tight">UKPBJ</span>
              <span className="text-xs md:text-sm text-slate-500 font-medium leading-tight">Kementerian Luar Negeri</span>
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

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="group flex items-center justify-center w-10 h-10 bg-slate-50 border border-slate-200 hover:border-accent-gold/50 text-slate-600 hover:text-accent-gold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Search className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </button>
            <Link
              href="#"
              className="relative overflow-hidden group flex items-center space-x-2 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] hover:-translate-y-0.5 border border-transparent hover:border-blue-400/30"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <User className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Masuk Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-1">
            <button className="p-2 text-slate-600">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              className="p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
            className="lg:hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    item.label === 'Beranda' 
                      ? 'bg-secondary-offwhite text-primary-blue' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary-blue'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100">
                <Link
                  href="#"
                  className="flex items-center justify-center space-x-2 bg-primary-blue hover:bg-blue-900 text-white w-full px-4 py-3 rounded-md text-base font-medium transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
