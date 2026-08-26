import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function RoleCard({ title, description, icon: Icon, href }: RoleCardProps) {
  return (
    <Link href={href} className="group flex flex-col items-center text-center p-8 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-primary-blue transition-colors" />
      <div className="w-16 h-16 rounded-full bg-secondary-offwhite text-primary-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-primary-navy mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
