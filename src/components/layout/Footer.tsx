import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

          {/* Column 1: Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0 bg-white rounded p-1">
                <Image src="/logo.png" alt="Logo Kementerian" width={160} height={40} className="h-10 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">UKPBJ</span>
                <span className="text-secondary-soft text-sm font-medium">Kementerian Luar Negeri</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Unit Kerja Pengadaan Barang/Jasa Kementerian Luar Negeri merupakan pusat keunggulan pengadaan barang/jasa pemerintah di lingkungan Kementerian Luar Negeri dan Perwakilan Republik Indonesia di luar negeri.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary-soft flex-shrink-0 mt-0.5" />
                <span>Jl. Taman Pejambon No. 6, Jakarta Pusat, 10110, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary-soft flex-shrink-0" />
                <span>(021) 344 1508</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary-soft flex-shrink-0" />
                <span>ukpbj@kemlu.go.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Layanan */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Layanan</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">LPSE</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Pengaduan</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Permintaan Informasi</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Bimbingan Teknis</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Clearing House</Link></li>
            </ul>
          </div>

          {/* Column 3: Informasi */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Informasi</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Peraturan</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Panduan & SOP</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Berita Terkini</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Agenda Kegiatan</Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors">Galeri</Link></li>
            </ul>
          </div>

          {/* Column 4: Tautan */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Tautan Terkait</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="#" className="hover:text-secondary-soft transition-colors flex items-center group"><span>Kementerian Luar Negeri</span><ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors flex items-center group"><span>LKPP</span><ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors flex items-center group"><span>INAPROC</span><ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors flex items-center group"><span>SPSE Nasional</span><ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-secondary-soft transition-colors flex items-center group"><span>E-Katalog</span><ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} UKPBJ Kementerian Luar Negeri Republik Indonesia. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-white transition-colors">Peta Situs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
