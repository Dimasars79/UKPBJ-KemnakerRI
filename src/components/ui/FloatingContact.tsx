"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Bot, MessageCircle, Mail, X } from 'lucide-react';
import { ChatModal } from '../chat/ChatModal';

export const FloatingContact = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sembunyikan widget Contact Us jika sedang berada di admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const openChat = () => {
    setIsOpen(false);
    setIsChatOpen(true);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "ukpbj@kemnaker.go.id";
    const subject = encodeURIComponent("Konsultasi Layanan UKPBJ Kemnaker RI");
    const body = encodeURIComponent("Halo Tim UKPBJ Kemnaker,\n\nSaya ingin berkonsultasi / mengajukan informasi mengenai:\n");

    if (isMobile) {
      // Perangkat Mobile -> Buka aplikasi email default bawaan hp (Gmail / Apple Mail)
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      // Laptop / Komputer Desktop -> Otomatis langsung buka tab baru web Gmail Compose
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {/* Dropup Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="mb-2.5 sm:mb-4 bg-white rounded-xl sm:rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden min-w-[210px] sm:min-w-[240px] max-w-[85vw]"
            >
              <div className="bg-primary-navy p-2.5 sm:p-4">
                <h4 className="text-white font-bold text-xs sm:text-base text-center">Pusat Bantuan & Layanan</h4>
              </div>
              <div className="flex flex-col p-1.5 sm:p-2 space-y-0.5 sm:space-y-1">
                {/* Asisten PBJ - Buka Interactive Chatbot */}
                <button 
                  type="button"
                  onClick={openChat}
                  className="w-full text-left flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50/70 rounded-lg sm:rounded-xl transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary-blue transition-colors shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className="font-semibold text-slate-800 group-hover:text-primary-blue transition-colors text-xs sm:text-sm">Asisten PBJ</span>
                      <span className="text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-md bg-blue-50 text-primary-blue border border-blue-100/80">
                        Live Chat
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 truncate">Konsultasi & Tanya Regulasi</span>
                  </div>
                </button>

                {/* WhatsApp Helpdesk */}
                <a 
                  href="https://wa.me/628988180009?text=Halo%20Helpdesk%20UKPBJ%20Kemnaker%2C%20saya%20butuh%20informasi%20atau%20bantuan%20terkait%20layanan%20pengadaan." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors shrink-0 shadow-xs">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors text-xs sm:text-sm">WhatsApp Helpdesk</span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">+62 898-8180-009</span>
                  </div>
                </a>

                {/* Email Resmi - Langsung Buka Gmail Web (Laptop) atau Aplikasi Mail (Mobile) */}
                <button 
                  type="button"
                  onClick={handleEmailClick}
                  className="w-full text-left flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-navy transition-colors shrink-0 shadow-xs">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className="font-semibold text-slate-800 group-hover:text-primary-navy transition-colors text-xs sm:text-sm">Email Resmi</span>
                      <span className="text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-primary-navy group-hover:text-white group-hover:border-primary-navy transition-colors">
                        Kirim Email
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 truncate">ukpbj@kemnaker.go.id</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (with Headset Icon & Expand on Hover) */}
        <div 
          className="p-1 sm:p-1.5 rounded-full border-[1.5px] sm:border-2 border-dashed border-accent-gold cursor-pointer transition-all duration-300 hover:border-solid hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleMenu}
        >
          <motion.div 
            className="bg-primary-navy text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden h-10 sm:h-14"
            animate={{ 
              width: isHovered || isOpen 
                ? (isMobile ? "128px" : "160px") 
                : (isMobile ? "40px" : "56px") 
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center justify-center w-full px-2 sm:px-4 gap-1.5 sm:gap-2 whitespace-nowrap">
              <span className="flex-shrink-0">
                {isOpen ? (
                  <X className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <Headset className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                )}
              </span>
              <AnimatePresence>
                {(isHovered || isOpen) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-bold text-xs sm:text-sm"
                  >
                    {isOpen ? "Tutup" : "Bantuan PBJ"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive AI Chatbot Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
