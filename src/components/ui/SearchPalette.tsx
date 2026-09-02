import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Calendar, Building, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const popularSearches = [
    { title: 'Tender Konstruksi Gedung Kemenaker', type: 'Tender', icon: Building, href: '/layanan' },
    { title: 'Jadwal Ujian Sertifikasi PBJ 2026', type: 'Agenda', icon: Calendar, href: '/agenda' },
    { title: 'Pedoman E-Katalog Sektoral', type: 'Dokumen', icon: FileText, href: '/informasi' },
  ];

  const searchResults = query.length > 2 ? [
    { title: `Hasil pencarian untuk "${query}" di Berita`, type: 'Berita', icon: FileText, href: '/informasi' },
    { title: `Pengumuman terkait "${query}"`, type: 'Pengumuman', icon: Calendar, href: '/informasi' },
  ] : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Command Palette Modal */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/50 overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
            >
              {/* Search Input Area */}
              <div className="relative flex items-center p-4 border-b border-slate-200/50 bg-white/50">
                <Search className="w-6 h-6 text-primary-blue ml-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari layanan, pengumuman, atau agenda..."
                  className="w-full bg-transparent border-none outline-none px-4 text-lg text-slate-800 placeholder-slate-400 font-medium"
                />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results Area */}
              <div className="overflow-y-auto p-4 space-y-6 flex-1 custom-scrollbar">
                {query.length > 2 ? (
                  /* Search Results */
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Hasil Pencarian</h3>
                    {searchResults.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/80 group transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-blue group-hover:scale-110 transition-transform">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-primary-blue transition-colors">{item.title}</h4>
                            <p className="text-xs text-slate-500 font-medium">{item.type}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-blue transform group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Popular Searches */
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Pencarian Populer</h3>
                    {popularSearches.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-accent-gold group-hover:scale-110 transition-transform border border-slate-100">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-primary-navy transition-colors">{item.title}</h4>
                            <p className="text-xs text-slate-500 font-medium">{item.type}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-navy transform group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Hotkey Hint */}
              <div className="p-3 border-t border-slate-200/50 bg-slate-50/80 text-center flex items-center justify-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Navigasi pintas: </span>
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-600 shadow-sm">ESC</kbd>
                <span className="text-xs text-slate-500 font-medium"> untuk menutup</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
