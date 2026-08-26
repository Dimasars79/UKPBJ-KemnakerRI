import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickAccessCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
}

export function QuickAccessCard({ title, icon: Icon, href }: QuickAccessCardProps) {
  return (
    <Link href={href} className="flex items-center space-x-4 p-5 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-blue/30 transition-all group">
      <div className="flex-shrink-0 w-12 h-12 bg-secondary-soft/50 text-primary-blue rounded-lg flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-semibold text-primary-navy group-hover:text-primary-blue transition-colors">{title}</span>
    </Link>
  );
}
