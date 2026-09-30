"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Bot, MessageCircle, Mail, X } from 'lucide-react';

export const FloatingContact = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sembunyikan widget Contact Us jika sedang berada di admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dropup Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden min-w-[240px]"
          >
            <div className="bg-primary-navy p-3.5 sm:p-4">
              <h4 className="text-white font-bold text-sm sm:text-base text-center">Pusat Bantuan & Layanan</h4>
            </div>
            <div className="flex flex-col p-2 space-y-1">
              {/* Asisten PBJ */}
              <Link 
                href="/informasi/clearing-house"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary-blue transition-colors shrink-0 shadow-xs">
                  <Bot className="w-5 h-5 text-primary-blue group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800 group-hover:text-primary-blue transition-colors text-sm">Asisten PBJ</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-primary-blue border border-blue-100/80">
                      Live Chat
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Konsultasi & Tanya Regulasi</span>
                </div>
              </Link>

              {/* WhatsApp Helpdesk */}
              <a 
                href="https://wa.me/628988180009?text=Halo%20Helpdesk%20UKPBJ%20Kemnaker%2C%20saya%20butuh%20informasi%20atau%20bantuan%20terkait%20layanan%20pengadaan." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors text-sm">WhatsApp Helpdesk</span>
                  <span className="text-[11px] text-slate-400">+62 898-8180-009</span>
                </div>
              </a>

              {/* Email Resmi */}
              <a 
                href="mailto:ukpbj@kemnaker.go.id" 
                className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-navy transition-colors shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 group-hover:text-primary-navy transition-colors text-sm">Email Resmi</span>
                  <span className="text-[11px] text-slate-400">ukpbj@kemnaker.go.id</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (with Headset Icon & Expand on Hover) */}
      <div 
        className="p-1.5 rounded-full border-2 border-dashed border-accent-gold cursor-pointer transition-all duration-300 hover:border-solid hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleMenu}
      >
        <motion.div 
          className="bg-primary-navy text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden h-14"
          animate={{ 
            width: isHovered || isOpen ? "160px" : "56px" 
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="flex items-center justify-center w-full px-4 gap-2 whitespace-nowrap">
            <span className="flex-shrink-0">
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Headset className="w-6 h-6 text-white" />
              )}
            </span>
            <AnimatePresence>
              {(isHovered || isOpen) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-sm"
                >
                  {isOpen ? "Tutup" : "Bantuan PBJ"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
