import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Globe, Eye, Menu, ChevronDown } from 'lucide-react';

export function Header() {
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
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo Kementerian" width={200} height={48} className="h-12 w-auto object-contain" />
            </Link>
            <div className="flex flex-col">
              <span className="font-bold text-primary-navy text-lg leading-tight tracking-tight">UKPBJ</span>
              <span className="text-sm text-slate-500 font-medium leading-tight">Kementerian Luar Negeri</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { label: 'Beranda', href: 'https://ukpbj.kemlu.go.id/' },
              { label: 'Informasi', href: '#' },
              { label: 'Layanan', href: 'https://ukpbj.kemlu.go.id/layanan' },
              { label: 'Agenda', href: 'https://ukpbj.kemlu.go.id/agenda' },
              { label: 'Galeri', href: '#' },
              { label: 'Monitoring', href: 'https://ukpbj.kemlu.go.id/monitoring' },
              { label: 'Tentang UKPBJ', href: 'https://ukpbj.kemlu.go.id/profil/tentang-ukpbj' }
            ].map((item) => (
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
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 text-slate-600 hover:text-primary-blue hover:bg-secondary-offwhite rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="#"
              className="flex items-center space-x-2 bg-primary-blue hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button className="p-2 text-slate-600">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
