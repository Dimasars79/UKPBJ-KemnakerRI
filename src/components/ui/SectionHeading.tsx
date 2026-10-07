import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-5 sm:mb-7 md:mb-9 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-navy mb-1 sm:mb-2 md:mb-2.5 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-600 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-accent-gold mt-2 sm:mt-2.5 md:mt-3.5 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
