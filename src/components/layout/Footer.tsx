import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-30 w-full bg-[#061B30] text-white pt-16 pb-8 border-t border-slate-800 shadow-2xl mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

          {/* Column 1: Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex-shrink-0">
                <Image 
                  src="/logo-ukpbj-kemnaker-putih.png" 
                  alt="Logo UKPBJ Kemnaker RI" 
                  width={300} 
                  height={90} 
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-[1.02]" 
                />
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              {t('footer.desc')}
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <span>Gedung B Lantai 3, Jl. Jenderal Gatot Subroto Kav. 51, Jakarta Selatan.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <span>021-52921236</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <a href="mailto:ukpbj@kemnaker.go.id" className="hover:text-accent-gold transition-colors">ukpbj@kemnaker.go.id</a>
              </div>
            </div>
          </div>

          {/* Column 2: Layanan */}
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-4 text-white tracking-wide border-b border-slate-700/80 pb-2 inline-block">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><Link href="/#pengadaan" className="hover:text-accent-gold transition-colors">Tender & Seleksi</Link></li>
              <li><Link href="/layanan" className="hover:text-accent-gold transition-colors">LPSE Kemnaker</Link></li>
              <li><Link href="/informasi/clearing-house" className="hover:text-accent-gold transition-colors">Clearing House PBJ</Link></li>
              <li><Link href="/informasi/sertifikat-pbj" className="hover:text-accent-gold transition-colors">Sertifikasi & Bimtek</Link></li>
              <li><Link href="/layanan" className="hover:text-accent-gold transition-colors">Layanan Pengaduan</Link></li>
            </ul>
          </div>

          {/* Column 3: Informasi */}
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-4 text-white tracking-wide border-b border-slate-700/80 pb-2 inline-block">
              {t('footer.socials')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><Link href="/tentang" className="hover:text-accent-gold transition-colors">Profil UKPBJ</Link></li>
              <li><Link href="/informasi" className="hover:text-accent-gold transition-colors">Berita & Informasi</Link></li>
              <li><Link href="/agenda" className="hover:text-accent-gold transition-colors">Kalender Agenda</Link></li>
              <li><Link href="/galeri" className="hover:text-accent-gold transition-colors">Galeri Dokumentasi</Link></li>
              <li><Link href="/monitoring" className="hover:text-accent-gold transition-colors">Dashboard Monitoring</Link></li>
            </ul>
          </div>

          {/* Column 4: Tautan Terkait */}
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-4 text-white tracking-wide border-b border-slate-700/80 pb-2 inline-block">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><a href="https://kemnaker.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group"><span>Kementerian Ketenagakerjaan</span><ExternalLink className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100" /></a></li>
              <li><a href="https://lkpp.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group"><span>LKPP RI</span><ExternalLink className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100" /></a></li>
              <li><a href="https://inaproc.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group"><span>INAPROC</span><ExternalLink className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100" /></a></li>
              <li><a href="https://spse.kemnaker.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group"><span>SPSE Kemnaker</span><ExternalLink className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100" /></a></li>
              <li><a href="https://e-katalog.lkpp.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group"><span>E-Katalog Nasional</span><ExternalLink className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p className="text-center md:text-left">
            {t('footer.rights')}
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-accent-gold transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-accent-gold transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-accent-gold transition-colors">Peta Situs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
