import React from 'react';
import { UserCircle2, Users, FileSignature, Briefcase } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

import { useLanguage } from '@/contexts/LanguageContext';

interface OrgNodeProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isMain?: boolean;
  className?: string;
}

const OrgNode = ({ title, subtitle, icon, isMain = false, className = '' }: OrgNodeProps) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 
      bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-xl w-full
      ${isMain 
        ? 'border-t-4 border-t-accent-gold max-w-[270px] sm:max-w-[300px] md:max-w-xs hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] ring-1 ring-amber-400/20' 
        : 'border-t-4 border-t-primary-blue hover:shadow-[0_15px_30px_rgba(30,58,138,0.1)]'
      } ${className}
    `}>
      <div className={`w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-2.5 sm:mb-3 shadow-inner shrink-0
        ${isMain ? 'bg-gradient-to-br from-amber-50 to-yellow-100 text-accent-gold ring-1 ring-amber-200' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-primary-blue ring-1 ring-blue-200/60'}
      `}>
        {icon}
      </div>
      <h3 className={`font-bold text-xs sm:text-sm md:text-base text-center leading-snug mb-1 ${isMain ? 'text-primary-navy font-black' : 'text-primary-navy'}`}>
        {title}
      </h3>
      <p className="text-[10px] sm:text-xs text-slate-500 text-center font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export const OrganizationChart = () => {
  const { trans } = useLanguage();

  return (
    <div className="py-8 sm:py-10 md:py-12 px-3 sm:px-6 md:px-8 flex flex-col items-center relative overflow-hidden bg-slate-50/50 rounded-3xl border border-slate-200/70">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[600px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-yellow-100/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* Level 1: Kepala UKPBJ */}
      <FadeIn direction="up" delay={0.1} className="w-full flex justify-center">
        <div className="relative flex flex-col items-center w-full">
          <OrgNode 
            title={trans("Kepala UKPBJ", "Head of UKPBJ")} 
            subtitle={trans("Pimpinan Unit Kerja", "Head of Work Unit")} 
            icon={<UserCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-accent-gold" />} 
            isMain={true}
          />
          {/* Vertical flow connector: Level 1 -> Level 2 */}
          <div className="flex flex-col items-center my-1.5 sm:my-2">
            <div className="w-[2px] h-7 sm:h-9 bg-slate-400/80" />
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
          </div>
        </div>
      </FadeIn>

      {/* Level 2: Sekretariat */}
      <FadeIn direction="up" delay={0.2} className="w-full flex justify-center">
        <div className="relative flex flex-col items-center w-full">
          <OrgNode 
            title={trans("Sekretariat / Tata Usaha", "Secretariat / Administration")} 
            subtitle={trans("Administrasi & Layanan", "Administration & Services")} 
            icon={<FileSignature className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
            className="max-w-[240px] sm:max-w-[270px] md:max-w-xs"
          />
          {/* Vertical flow connector down from Sekretariat */}
          <div className="flex flex-col items-center mt-1.5 sm:mt-2">
            <div className="w-[2px] h-7 sm:h-9 bg-slate-400/80" />
            {/* Mobile arrow */}
            <div className="md:hidden w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
          </div>
        </div>
      </FadeIn>

      {/* Level 3: Pokja, Pejabat Pengadaan, Tim Pendukung */}
      <FadeIn direction="up" delay={0.3} className="w-full flex justify-center">
        <div className="relative flex justify-center w-full max-w-5xl px-2 sm:px-4">
          
          {/* Desktop Horizontal Connecting Line & Junction Node */}
          <div className="hidden md:block absolute top-0 left-[16.67%] right-[16.67%] h-[2px] bg-slate-400/80 rounded-full" />
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-navy ring-2 ring-white shadow-xs" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full pt-1 md:pt-7">
            
            {/* Pokja */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical flow down to Pokja (Desktop) */}
              <div className="hidden md:flex flex-col items-center absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-[2px] h-5 bg-slate-400/80" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>
              <OrgNode 
                title={trans("Pokja Pemilihan", "Procurement Working Group (Pokja)")} 
                subtitle={trans("Pelaksana Pemilihan Penyedia", "Vendor Selection Executors")} 
                icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

            {/* Mobile flow connector between Card 1 & Card 2 */}
            <div className="md:hidden flex flex-col items-center -my-1.5 py-1">
              <div className="w-[2px] h-5 bg-slate-400/80" />
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
            </div>

            {/* Pejabat Pengadaan */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical flow down to Pejabat Pengadaan (Desktop) */}
              <div className="hidden md:flex flex-col items-center absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-[2px] h-5 bg-slate-400/80" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>
              <OrgNode 
                title={trans("Pejabat Pengadaan", "Procurement Officers")} 
                subtitle={trans("Pengadaan Langsung & E-Purchasing", "Direct Procurement & E-Purchasing")} 
                icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

            {/* Mobile flow connector between Card 2 & Card 3 */}
            <div className="md:hidden flex flex-col items-center -my-1.5 py-1">
              <div className="w-[2px] h-5 bg-slate-400/80" />
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
            </div>

            {/* Tim Pendukung */}
            <div className="relative flex flex-col items-center w-full">
              {/* Vertical flow down to Tim Pendukung (Desktop) */}
              <div className="hidden md:flex flex-col items-center absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-[2px] h-5 bg-slate-400/80" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500" />
              </div>
              <OrgNode 
                title={trans("Tim Pendukung / Teknis", "Support & Technical Team")} 
                subtitle={trans("Dukungan Operasional & IT", "Operational & IT Support")} 
                icon={<UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-blue" />} 
              />
            </div>

          </div>
        </div>
      </FadeIn>
    </div>
  );
};
