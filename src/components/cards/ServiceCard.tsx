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
    <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-100 hover:border-accent-gold/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(10,35,66,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full z-10 hover:z-20">
      <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-navy group-hover:text-white transition-colors duration-300 shadow-xs">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-primary-blue transition-colors">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{description}</p>
      
      {isExternal ? (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-sm font-bold text-primary-blue group-hover:text-primary-navy transition-colors mt-auto"
        >
          <span>Akses Layanan</span>
          <ExternalLink className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      ) : (
        <Link 
          href={href} 
          className="inline-flex items-center text-sm font-bold text-primary-blue group-hover:text-primary-navy transition-colors mt-auto"
        >
          <span>Selengkapnya</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

