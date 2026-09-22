import React from 'react';
import { UserCircle2, Users, FileSignature, Briefcase, ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

interface OrgNodeProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isMain?: boolean;
  className?: string;
}

const OrgNode = ({ title, subtitle, icon, isMain = false, className = '' }: OrgNodeProps) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-3.5 sm:p-4 md:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 
      bg-white/90 backdrop-blur-md border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl w-full
      ${isMain 
        ? 'border-t-4 border-t-accent-gold max-w-[260px] sm:max-w-[290px] md:max-w-xs hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)]' 
        : 'border-t-4 border-t-primary-blue hover:shadow-[0_15px_30px_rgba(30,58,138,0.1)]'
      } ${className}
    `}>
      <div className={`w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-2 sm:mb-3 shadow-inner shrink-0
        ${isMain ? 'bg-gradient-to-br from-amber-50 to-yellow-100 text-accent-gold' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-primary-blue'}
      `}>
        {icon}
      </div>
      <h3 className={`font-bold text-xs sm:text-sm md:text-base text-center leading-snug mb-0.5 sm:mb-1 ${isMain ? 'text-primary-navy font-black' : 'text-primary-navy'}`}>
        {title}
      </h3>
      <p className="text-[10px] sm:text-xs text-slate-500 text-center font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export const OrganizationChart = () => {
  return (
    <div className="py-8 sm:py-10 md:py-12 px-3 sm:px-6 md:px-8 flex flex-col items-center relative overflow-hidden bg-slate-50/40 rounded-3xl border border-slate-100/70">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[600px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-yellow-100/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* Level 1: Kepala UKPBJ */}
      <FadeIn direction="up" delay={0.1} className="w-full flex justify-center">
        <div className="relative flex flex-col items-center w-full">
          <OrgNode 
            title="Kepala UKPBJ" 
            subtitle="Pimpinan Unit Kerja" 
            icon={<UserCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-accent-gold" />} 
            isMain={true}
          />
          {/* Vertical line down */}
          <div className="w-[2px] h-8 sm:h-10 md:h-12 bg-gradient-to-b from-accent-gold via-slate-300 to-primary-blue my-1 sm:my-1.5 rounded-full" />
        </div>
      </FadeIn>

      {/* Level 2: Sekretariat */}
      <FadeIn direction="up" delay={0.2} className="w-full flex justify-center">
        <div className="relative flex flex-col items-center w-full">
          <OrgNode 
            title="Sekretariat / Tata Usaha" 
            subtitle="Administrasi & Layanan" 
            icon={<FileSignature className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
            className="max-w-[240px] sm:max-w-[270px] md:max-w-xs"
          />
          {/* Vertical line down from Sekretariat */}
          <div className="w-[2px] h-8 sm:h-10 md:h-10 bg-slate-300 my-1 sm:my-1.5 rounded-full" />
        </div>
      </FadeIn>

      {/* Level 3: Pokja, Pejabat Pengadaan, Tim Pendukung */}
      <FadeIn direction="up" delay={0.3} className="w-full flex justify-center">
        <div className="relative flex justify-center w-full max-w-5xl px-2 sm:px-4 mt-1 sm:mt-2">
          {/* Horizontal connecting line on Tablet (iPad) & Desktop */}
          <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-slate-300 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-4 lg:gap-6 w-full pt-1 md:pt-6">
            
            {/* Pokja */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical line up on Tablet & Desktop */}
              <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
              <ChevronDown className="hidden md:block text-slate-400 w-4 h-4 absolute -top-2.5 z-10" />
              <OrgNode 
                title="Pokja Pemilihan" 
                subtitle="Pelaksana Pemilihan Penyedia" 
                icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

            {/* Pejabat Pengadaan */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical line up on Tablet & Desktop */}
              <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
              <ChevronDown className="hidden md:block text-slate-400 w-4 h-4 absolute -top-2.5 z-10" />
              <OrgNode 
                title="Pejabat Pengadaan" 
                subtitle="Pengadaan Langsung & E-Purchasing" 
                icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

            {/* Tim Pendukung */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical line up on Tablet & Desktop */}
              <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
              <ChevronDown className="hidden md:block text-slate-400 w-4 h-4 absolute -top-2.5 z-10" />
              <OrgNode 
                title="Tim Pendukung / Teknis" 
                subtitle="Dukungan Operasional & IT" 
                icon={<UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

          </div>
        </div>
      </FadeIn>
    </div>
  );
};
