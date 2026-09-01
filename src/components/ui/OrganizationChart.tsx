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
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg border-t-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white
      ${isMain ? 'border-t-accent-gold z-10 w-72' : 'border-t-primary-blue w-64'}
    `}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 
        ${isMain ? 'bg-amber-50 text-accent-gold' : 'bg-blue-50 text-primary-blue'}
      `}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-primary-navy text-center mb-1">{title}</h3>
      <p className="text-sm text-slate-500 text-center font-medium">{subtitle}</p>
    </div>
  );
};

export const OrganizationChart = () => {
  return (
    <div className="py-10 flex flex-col items-center relative overflow-hidden bg-slate-50/50 rounded-3xl border border-slate-100">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      
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
          <div className="w-px h-12 bg-gradient-to-b from-accent-gold to-primary-blue my-2" />
          <ChevronDown className="text-primary-blue w-5 h-5 -mt-4 mb-2 z-10" />
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
          <div className="w-px h-12 bg-primary-blue/50 my-2" />
        </div>
      </FadeIn>

      {/* Connection for Level 3 */}
      <FadeIn direction="up" delay={0.3} className="w-full flex justify-center">
        <div className="relative flex justify-center w-full max-w-4xl px-4">
          {/* Horizontal connecting line */}
          <div className="absolute top-0 left-[15%] right-[15%] md:left-[16%] md:right-[16%] lg:left-[18%] lg:right-[18%] h-px bg-primary-blue/50" />
          
          <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-4 lg:gap-12 pt-8">
            {/* Pokja */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
              {/* Vertical line up from Pokja */}
              <div className="absolute -top-8 w-px h-8 bg-primary-blue/50" />
              <ChevronDown className="text-primary-blue/50 w-5 h-5 absolute -top-3 z-10" />
              <OrgNode 
                title="Pokja Pemilihan" 
                subtitle="Pelaksana Pemilihan Penyedia" 
                icon={<Users className="w-7 h-7" />} 
              />
            </div>

            {/* Pejabat Pengadaan */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
               {/* Vertical line up */}
               <div className="absolute -top-8 w-px h-8 bg-primary-blue/50" />
               <ChevronDown className="text-primary-blue/50 w-5 h-5 absolute -top-3 z-10" />
              <OrgNode 
                title="Pejabat Pengadaan" 
                subtitle="Pengadaan Langsung & E-Purchasing" 
                icon={<Briefcase className="w-7 h-7" />} 
              />
            </div>

            {/* Tim Pendukung */}
            <div className="relative flex flex-col items-center w-full md:w-1/3">
               {/* Vertical line up */}
               <div className="absolute -top-8 w-px h-8 bg-primary-blue/50" />
               <ChevronDown className="text-primary-blue/50 w-5 h-5 absolute -top-3 z-10" />
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
