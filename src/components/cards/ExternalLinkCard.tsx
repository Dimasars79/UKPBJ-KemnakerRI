import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface ExternalLinkCardProps {
  name: string;
  href: string;
  description?: string;
}

export function ExternalLinkCard({ name, href, description }: ExternalLinkCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-blue hover:shadow-md transition-all group h-full">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-lg text-primary-navy group-hover:text-primary-blue transition-colors">{name}</h4>
        <div className="w-8 h-8 rounded-full bg-secondary-offwhite text-slate-400 flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
      {description && <p className="text-sm text-slate-500 mt-auto">{description}</p>}
    </Link>
  );
}
