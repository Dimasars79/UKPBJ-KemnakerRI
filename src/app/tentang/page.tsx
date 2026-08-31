import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';

export default function TentangPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary-offwhite pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">Tentang UKPBJ</h1>
            <div className="w-16 h-1 bg-accent-gold mb-8 rounded-full" />
            <div className="bg-white p-12 rounded-xl shadow-lg border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Profil Organisasi</h2>
              <p className="text-slate-500 max-w-lg">Detail lengkap mengenai visi, misi, struktur organisasi, tugas dan fungsi pokok Unit Kerja Pengadaan Barang/Jasa akan ditampilkan di halaman ini.</p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
