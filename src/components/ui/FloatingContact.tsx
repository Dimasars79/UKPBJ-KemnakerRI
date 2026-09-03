"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, PhoneCall, X } from 'lucide-react';

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
            className="mb-4 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden min-w-[200px]"
          >
            <div className="bg-primary-navy p-4">
              <h4 className="text-white font-bold text-center">Butuh Bantuan?</h4>
            </div>
            <div className="flex flex-col p-2">
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-green-600 transition-colors">WhatsApp</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary-blue transition-colors">
                  <Mail className="w-5 h-5 text-primary-blue group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-primary-blue transition-colors">Email</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-accent-gold transition-colors">
                  <PhoneCall className="w-5 h-5 text-accent-gold group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-accent-gold transition-colors">Call Center</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (with Expand on Hover) */}
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
                <X className="w-6 h-6" />
              ) : (
                <Mail className="w-6 h-6" />
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
                  {isOpen ? "Tutup" : "Contact Us"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
