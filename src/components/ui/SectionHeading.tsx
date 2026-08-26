import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-primary-navy mb-3 tracking-tight">{title}</h2>
      {subtitle && (
        <p className={`text-slate-600 max-w-2xl text-lg ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-16 h-1 bg-accent-gold mt-4 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
