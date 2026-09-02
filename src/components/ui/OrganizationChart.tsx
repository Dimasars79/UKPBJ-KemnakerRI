import React from 'react';
import { UserCircle2, Users, FileSignature, Briefcase, ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

interface OrgNodeProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isMain?: boolean;
}

const OrgNode = ({ title, subtitle, icon, isMain = false }: OrgNodeProps) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 
      bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] 
      ${isMain 
        ? 'border-t-4 border-t-accent-gold z-10 w-80 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-white' 
        : 'border-t-4 border-t-primary-blue w-64 hover:shadow-[0_20px_40px_rgba(30,58,138,0.1)] hover:border-white'
      }
    `}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner
        ${isMain ? 'bg-gradient-to-br from-amber-50 to-yellow-100 text-accent-gold' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-primary-blue'}
      `}>
        {icon}
      </div>
      <h3 className={`font-bold text-lg text-center mb-1 ${isMain ? 'text-accent-gold' : 'text-primary-navy'}`}>{title}</h3>
      <p className="text-sm text-slate-500 text-center font-medium">{subtitle}</p>
    </div>
  );
};

export const OrganizationChart = () => {
  return (
    <div className="py-12 flex flex-col items-center relative overflow-hidden bg-slate-50/30 rounded-3xl border border-slate-100/50">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* Level 1: Kepala UKPBJ */}
      <FadeIn direction="up" delay={0.1}>
        <div className="relative flex flex-col items-center">
          <OrgNode 
            title="Kepala UKPBJ" 
            subtitle="Pimpinan Unit Kerja" 
            icon={<UserCircle2 className="w-8 h-8" />} 
            isMain={true}
          />
          {/* Vertical line down */}
          <div className="w-[2px] h-14 bg-gradient-to-b from-accent-gold via-slate-300 to-primary-blue my-2 rounded-full" />
        </div>
      </FadeIn>

      {/* Level 2: Sekretariat */}
      <FadeIn direction="up" delay={0.2}>
        <div className="relative flex flex-col items-center">
          <OrgNode 
            title="Sekretariat / Tata Usaha" 
            subtitle="Administrasi & Layanan" 
            icon={<FileSignature className="w-7 h-7" />} 
          />
          {/* Vertical line down from Sekretariat */}
          <div className="w-[2px] h-12 bg-slate-300 my-2 rounded-full" />
        </div>
      </FadeIn>

      {/* Connection for Level 3 */}
      <FadeIn direction="up" delay={0.3} className="w-full flex justify-center">
        <div className="relative flex justify-center w-full max-w-5xl px-4 mt-2">
          {/* Horizontal connecting line (Responsive adjustments for perfect alignment) */}
          <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-slate-300 rounded-full" />
          
          <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-4 lg:gap-8 pt-6">
            {/* Pokja */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
              {/* Vertical line up from Pokja */}
              <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
              <ChevronDown className="text-slate-400 w-5 h-5 mb-2 mt-0 md:mt-0 md:absolute md:-top-3 md:z-10" />
              <OrgNode 
                title="Pokja Pemilihan" 
                subtitle="Pelaksana Pemilihan Penyedia" 
                icon={<Users className="w-7 h-7" />} 
              />
            </div>

            {/* Pejabat Pengadaan */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
               {/* Vertical line up */}
               <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
               <ChevronDown className="text-slate-400 w-5 h-5 mb-2 mt-0 md:mt-0 md:absolute md:-top-3 md:z-10" />
              <OrgNode 
                title="Pejabat Pengadaan" 
                subtitle="Pengadaan Langsung & E-Purchasing" 
                icon={<Briefcase className="w-7 h-7" />} 
              />
            </div>

            {/* Tim Pendukung */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
               {/* Vertical line up */}
               <div className="hidden md:block absolute -top-6 w-[2px] h-6 bg-slate-300 rounded-full" />
               <ChevronDown className="text-slate-400 w-5 h-5 mb-2 mt-0 md:mt-0 md:absolute md:-top-3 md:z-10" />
              <OrgNode 
                title="Tim Pendukung / Teknis" 
                subtitle="Dukungan Operasional & IT" 
                icon={<UserCircle2 className="w-7 h-7" />} 
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
