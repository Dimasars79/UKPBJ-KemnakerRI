"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  "Bagaimana cara pendaftaran penyedia di SPSE?",
  "Apa syarat sertifikasi pengadaan PBJ Tingkat Dasar?",
  "Bagaimana alur pengajuan konsultasi Clearing House?",
  "Berapa batas nilai pengadaan langsung barang/jasa?"
];

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Halo! Saya **Asisten Virtual PBJ Kemnaker** 🤖. Ada yang bisa saya bantu terkait regulasi, panduan SPSE, paket tender, atau layanan pengadaan hari ini?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Format context messages for backend API
      const historyPayload = newMessages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memuat respon asisten.');
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || 'Maaf, saya tidak dapat menjawab saat ini.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Silakan periksa konfigurasi API key atau koneksi internet Anda.';
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `⚠️ Maaf, terjadi kendala koneksi: ${errMessage}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        text: 'Percakapan telah direset. Ada informasi pengadaan barang & jasa lain yang ingin Anda ketahui?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Enhanced lightweight Markdown text renderer (bold, headings, lists, quotes)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Headings
      if (line.startsWith('### ')) {
        return <h5 key={idx} className="font-bold text-xs sm:text-sm text-primary-navy mt-2 mb-1">{line.replace('### ', '')}</h5>;
      }
      if (line.startsWith('## ')) {
        return <h4 key={idx} className="font-bold text-sm sm:text-base text-primary-navy mt-2.5 mb-1">{line.replace('## ', '')}</h4>;
      }
      if (line.startsWith('# ')) {
        return <h3 key={idx} className="font-bold text-base text-primary-navy mt-3 mb-1">{line.replace('# ', '')}</h3>;
      }

      // Quote / Tip callout
      if (line.trim().startsWith('>')) {
        const quoteContent = line.replace(/^>\s*/, '');
        return (
          <div key={idx} className="border-l-3 border-amber-400 bg-amber-50/70 px-2.5 py-1.5 my-1.5 rounded-r-lg text-xs text-amber-900 font-medium" dangerouslySetInnerHTML={{ __html: quoteContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        );
      }

      // Bold & Italic formatting
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Bullet list item
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        const itemContent = line.replace(/^[\s•\-\*]+/, '');
        return (
          <li key={idx} className="ml-4 list-disc my-0.5 text-slate-700" dangerouslySetInnerHTML={{ __html: itemContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        );
      }

      // Numbered list item
      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={idx} className="my-1 text-slate-700 pl-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }

      // Standard paragraph / empty space
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
          {/* Backdrop on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs sm:hidden pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full sm:w-[420px] h-[85vh] sm:h-[580px] max-h-[90vh] bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden pointer-events-auto z-10"
          >
            {/* Header */}
            <div className="bg-primary-navy px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between text-white border-b border-white/10 shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-blue to-cyan-500 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-primary-navy" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm sm:text-base leading-tight">Asisten PBJ</h3>
                    <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-400/30">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">Konsultasi Pengadaan Kemnaker</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset Percakapan"
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  title="Tutup"
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-primary-navy text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Bot className="w-4 h-4 text-cyan-300" />
                    </div>
                  )}

                  <div className={`group relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-primary-blue text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/70 rounded-tl-xs'
                  }`}>
                    {renderFormattedText(msg.text)}

                    <div className={`flex items-center justify-between gap-2 mt-1.5 text-[10px] ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      <span>{msg.time}</span>
                      
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity p-0.5"
                          title="Salin Pesan"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-xl bg-primary-navy text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-blue animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-blue animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-blue animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Quick Questions on initial conversation */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 px-1">
                    <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                    Rekomendasi Pertanyaan:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-left text-xs bg-white hover:bg-slate-100/80 border border-slate-200/90 text-slate-700 hover:text-primary-navy p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-between group active:scale-[0.99]"
                      >
                        <span className="line-clamp-1">{q}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 -rotate-90 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-2 bg-slate-100/80 rounded-2xl px-3 py-1.5 border border-slate-200/80 focus-within:border-primary-blue focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan terkait PBJ..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden disabled:opacity-50 py-1.5"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-xl bg-primary-blue hover:bg-blue-600 disabled:bg-slate-300 text-white transition-all shadow-xs active:scale-95 disabled:active:scale-100 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                <span>Didukung oleh AI Gemini • UKPBJ Kemnaker</span>
                <span>Enter ↵ kirim</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
