import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function ServiceCard({ title, description, icon: Icon, href }: ServiceCardProps) {
  return (
    <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white/50 hover:border-accent-gold/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full z-10 hover:z-20">
      <div className="w-12 h-12 bg-secondary-offwhite text-primary-navy rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-navy group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-primary-navy mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 flex-grow">{description}</p>
      <Link href={href} className="inline-flex items-center text-sm font-semibold text-primary-blue group-hover:text-primary-navy transition-colors">
        <span>Selengkapnya</span>
        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
