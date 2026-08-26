import React from 'react';
import { FileText, Download } from 'lucide-react';
import Link from 'next/link';

interface DocumentCardProps {
  title: string;
  category: string;
  href: string;
}

export function DocumentCard({ title, category, href }: DocumentCardProps) {
  return (
    <Link href={href} className="flex items-center p-4 bg-white rounded-lg border border-slate-200 hover:border-primary-blue hover:shadow-sm transition-all group">
      <div className="w-10 h-10 bg-secondary-offwhite text-primary-blue rounded flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors">
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <div className="text-xs font-semibold text-slate-500 mb-0.5">{category}</div>
        <h4 className="text-sm font-bold text-primary-navy group-hover:text-primary-blue transition-colors line-clamp-2">{title}</h4>
      </div>
      <div className="text-slate-400 group-hover:text-primary-blue ml-2 flex-shrink-0 transition-colors">
        <Download className="w-4 h-4" />
      </div>
    </Link>
  );
}
