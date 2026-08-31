import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';

export default function InformasiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary-offwhite pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">Informasi Publik</h1>
            <div className="w-16 h-1 bg-accent-gold mb-8 rounded-full" />
            <div className="bg-white p-12 rounded-xl shadow-lg border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Halaman Informasi</h2>
              <p className="text-slate-500 max-w-lg">Kami sedang menyiapkan berbagai informasi publik dan dokumen pengadaan yang relevan. Halaman ini akan segera tersedia secara penuh.</p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
