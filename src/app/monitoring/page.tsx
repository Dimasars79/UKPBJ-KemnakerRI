import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';

export default function MonitoringPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary-offwhite pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">Monitoring Evaluasi</h1>
            <div className="w-16 h-1 bg-accent-gold mb-8 rounded-full" />
            <div className="bg-white p-12 rounded-xl shadow-lg border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Pusat Data & Evaluasi</h2>
              <p className="text-slate-500 max-w-lg">Sistem monitoring waktu nyata (real-time) terkait efisiensi pengadaan, laporan RUP, dan statistik kinerja pengadaan sedang dibangun.</p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
