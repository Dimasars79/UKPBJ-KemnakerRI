import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-30 w-full bg-[#061B30] text-white pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 border-t border-slate-800 shadow-2xl mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8">

          {/* Column 1: Identity */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3 mb-1">
              <div className="flex-shrink-0">
                <Image 
                  src="/logo-ukpbj-kemnaker-putih.png" 
                  alt="Logo UKPBJ Kemnaker RI" 
                  width={280} 
                  height={80} 
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-[1.02]" 
                />
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              {t('footer.desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-start space-x-2.5 sm:col-span-2 lg:col-span-1">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-xs sm:text-[13px]">Gedung B Lantai 3, Jl. Jenderal Gatot Subroto Kav. 51, Jakarta Selatan.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-gold flex-shrink-0" />
                <a href="tel:021-52921236" className="hover:text-accent-gold transition-colors text-xs sm:text-[13px]">021-52921236</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-gold flex-shrink-0" />
                <a href="mailto:ukpbj@kemnaker.go.id" className="hover:text-accent-gold transition-colors text-xs sm:text-[13px] truncate">ukpbj@kemnaker.go.id</a>
              </div>
            </div>
          </div>

          {/* Links Section: Layanan, Informasi, Tautan Terkait */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {/* Column 2: Layanan */}
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 text-white tracking-wide border-b border-slate-700/80 pb-1.5 inline-block">
                {t('footer.services')}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] text-slate-300">
                <li><Link href="/#pengadaan" className="hover:text-accent-gold transition-colors block py-0.5">Tender & Seleksi</Link></li>
                <li><Link href="/layanan" className="hover:text-accent-gold transition-colors block py-0.5">LPSE Kemnaker</Link></li>
                <li><Link href="/berita" className="hover:text-accent-gold transition-colors block py-0.5">Layanan Berita PBJ</Link></li>
                <li><Link href="/informasi/sertifikat-pbj" className="hover:text-accent-gold transition-colors block py-0.5">Sertifikasi & Bimtek</Link></li>
                <li><Link href="/layanan" className="hover:text-accent-gold transition-colors block py-0.5">Layanan Pengaduan</Link></li>
              </ul>
            </div>

            {/* Column 3: Informasi */}
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 text-white tracking-wide border-b border-slate-700/80 pb-1.5 inline-block">
                {t('footer.socials')}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] text-slate-300">
                <li><Link href="/tentang" className="hover:text-accent-gold transition-colors block py-0.5">Profil UKPBJ</Link></li>
                <li><Link href="/informasi" className="hover:text-accent-gold transition-colors block py-0.5">Berita & Informasi</Link></li>
                <li><Link href="/agenda" className="hover:text-accent-gold transition-colors block py-0.5">Kalender Agenda</Link></li>
                <li><Link href="/galeri" className="hover:text-accent-gold transition-colors block py-0.5">Galeri Dokumentasi</Link></li>
                <li><Link href="/monitoring" className="hover:text-accent-gold transition-colors block py-0.5">Dashboard Monitoring</Link></li>
              </ul>
            </div>

            {/* Column 4: Tautan Terkait */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 text-white tracking-wide border-b border-slate-700/80 pb-1.5 inline-block">
                {t('footer.links')}
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-slate-300">
                <li><a href="https://kemnaker.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group py-0.5"><span>Kemnaker RI</span><ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" /></a></li>
                <li><a href="https://lkpp.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group py-0.5"><span>LKPP RI</span><ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" /></a></li>
                <li><a href="https://inaproc.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group py-0.5"><span>INAPROC</span><ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" /></a></li>
                <li><a href="https://spse.kemnaker.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group py-0.5"><span>SPSE Kemnaker</span><ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" /></a></li>
                <li><a href="https://katalog.inaproc.id/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors flex items-center group py-0.5"><span>E-Katalog LKPP</span><ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" /></a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-slate-400 gap-2.5 sm:gap-4">
          <p className="text-center sm:text-left">
            {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1">
            <Link href="#" className="hover:text-accent-gold transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-accent-gold transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-accent-gold transition-colors">Peta Situs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
