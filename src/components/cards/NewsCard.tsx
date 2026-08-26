import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  href: string;
  featured?: boolean;
}

export function NewsCard({ title, summary, date, category, imageUrl, href, featured = false }: NewsCardProps) {
  return (
    <Link href={href} className={`group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'md:flex-row md:col-span-2 lg:col-span-2' : ''}`}>
      <div className={`relative ${featured ? 'md:w-1/2' : 'h-48'} overflow-hidden bg-slate-200 flex-shrink-0`}>
        {/* Placeholder for image */}
        <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-slate-400">
           Gambar: {category}
        </div>
        <div className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {category}
        </div>
      </div>
      <div className={`p-6 flex flex-col flex-grow ${featured ? 'md:w-1/2 justify-center' : ''}`}>
        <div className="flex items-center text-slate-500 text-xs font-medium mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </div>
        <h3 className={`font-bold text-primary-navy mb-3 group-hover:text-primary-blue transition-colors ${featured ? 'text-2xl' : 'text-lg leading-tight'}`}>
          {title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {summary}
        </p>
        <div className="mt-auto flex items-center text-sm font-bold text-primary-blue">
          <span>Baca Selengkapnya</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
