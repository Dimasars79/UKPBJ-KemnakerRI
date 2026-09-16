import React from 'react';
import { LucideIcon, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function ServiceCard({ title, description, icon: Icon, href }: ServiceCardProps) {
  const isExternal = href.startsWith('http') || href.startsWith('https://wa.me');

  return (
    <div className="relative bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-100 hover:border-accent-gold/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(10,35,66,0.12)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full z-10 hover:z-20">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-primary-blue rounded-xl flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary-navy group-hover:text-white transition-colors duration-300 shadow-xs shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h3 className="text-sm sm:text-lg font-bold text-primary-navy mb-1.5 sm:mb-2 group-hover:text-primary-blue transition-colors leading-snug">{title}</h3>
      <p className="text-slate-600 text-xs sm:text-sm mb-3.5 sm:mb-6 flex-grow leading-relaxed line-clamp-3 sm:line-clamp-none">{description}</p>
      
      {isExternal ? (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-xs sm:text-sm font-bold text-primary-blue group-hover:text-primary-navy transition-colors mt-auto"
        >
          <span>Akses Layanan</span>
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      ) : (
        <Link 
          href={href} 
          className="inline-flex items-center text-xs sm:text-sm font-bold text-primary-blue group-hover:text-primary-navy transition-colors mt-auto"
        >
          <span>Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

