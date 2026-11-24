"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface AdminTransitionLoaderProps {
  /** Menampilkan atau menyembunyikan loading screen full-screen */
  isLoading: boolean;
  /** Dipanggil setelah progress 100%, centang selesai digambar, dan transisi keluar selesai */
  onComplete?: () => void;
  /** Durasi minimum tampil dalam milidetik agar tidak berkedip (default: 1800ms) */
  minDuration?: number;
  /**
   * Penanda kesiapan sesi/data dashboard admin (default: true).
   * Jika false, progress akan melambat secara halus di ~92% sampai isReady menjadi true.
   */
  isReady?: boolean;
}

const STATUS_MESSAGES = [
  "Mengautentikasi akun admin",
  "Menyiapkan ruang kerja CMS",
  "Memuat data dan layanan terintegrasi",
  "Hampir selesai",
] as const;

const STEP_INTERVAL_MS = 900;
const TARGET_VISUAL_DURATION_MS = 2750;
const CHECKMARK_HOLD_MS = 520;

export function AdminTransitionLoader({
  isLoading,
  onComplete,
  minDuration = 1800,
  isReady = true,
}: AdminTransitionLoaderProps) {
  const prefersReducedMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const isReadyRef = useRef<boolean>(isReady);
  const completedTriggeredRef = useRef<boolean>(false);
  const cancelledRef = useRef<boolean>(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Sinkronkan state visible dengan prop isLoading
  useEffect(() => {
    if (isLoading) {
      cancelledRef.current = false;
      completedTriggeredRef.current = false;
      startTimeRef.current = performance.now();
      setProgress(0);
      setStepIndex(0);
      setIsCompleted(false);
      setVisible(true);
    } else if (!completedTriggeredRef.current) {
      // Login gagal / dibatalkan sebelum selesai: tutup langsung tanpa animasi sukses
      cancelledRef.current = true;
      setVisible(false);
      setIsCompleted(false);
    }
  }, [isLoading]);

  // Kunci fokus & scroll body selama overlay aktif (Aksesibilitas)
  useEffect(() => {
    if (!visible) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      containerRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        containerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = prevOverflow;
      if (cancelledRef.current && previousFocusRef.current) {
        previousFocusRef.current.focus?.();
      }
    };
  }, [visible]);

  // Rotasi teks status setiap ~900ms
  useEffect(() => {
    if (!visible || isCompleted) return;

    const intervalId = window.setInterval(() => {
      setStepIndex((prev) =>
        prev < STATUS_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, STEP_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [visible, isCompleted]);

  // Animasi progress bar halus (ease-out) yang menghormati minDuration & isReady
  useEffect(() => {
    if (!visible) return;

    const effectiveMin = Math.max(minDuration, 1800);
    const nominalDuration = Math.max(effectiveMin, TARGET_VISUAL_DURATION_MS);
    let rafId = 0;
    let holdTimerId: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;

      if (isReadyRef.current && elapsed >= effectiveMin) {
        // Jika sudah siap & melewati minDuration, dorong mulus hingga 100%
        const rawT = Math.min(1, elapsed / nominalDuration);
        const eased = easeOutCubic(rawT) * 100;

        if (rawT >= 1) {
          setProgress(100);
          setStepIndex(STATUS_MESSAGES.length - 1);

          if (!completedTriggeredRef.current) {
            completedTriggeredRef.current = true;
            setIsCompleted(true);
            holdTimerId = window.setTimeout(() => {
              setVisible(false);
            }, prefersReducedMotion ? 220 : CHECKMARK_HOLD_MS);
          }
          return;
        }

        setProgress(Math.min(99, Math.round(eased)));
      } else {
        // Belum siap atau belum mencapai minDuration: melaju halus hingga maksimum 92%
        const rawT = Math.min(1, elapsed / (nominalDuration * 1.15));
        const capped = easeOutCubic(rawT) * 92;
        setProgress(Math.min(92, Math.round(capped)));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (holdTimerId !== null) {
        window.clearTimeout(holdTimerId);
      }
    };
  }, [visible, minDuration, prefersReducedMotion]);

  const handleExitComplete = () => {
    if (completedTriggeredRef.current && !cancelledRef.current) {
      onCompleteRef.current?.();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          ref={containerRef}
          key="ukpbj-admin-transition-loader"
          role="dialog"
          aria-modal="true"
          aria-busy={!isCompleted}
          aria-label="Memuat Admin Portal UKPBJ Kemnaker RI"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            cancelledRef.current || prefersReducedMotion
              ? { opacity: 0, transition: { duration: 0.24, ease: "easeOut" } }
              : {
                  y: "-100%",
                  opacity: 0.35,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between overflow-hidden outline-none select-none font-sans px-6 py-8 sm:py-10"
          style={{
            background:
              "linear-gradient(135deg, var(--ukpbj-navy-from) 0%, var(--ukpbj-navy-via) 42%, var(--ukpbj-navy-to) 100%)",
          }}
        >
          {/* Layer 1: Pola grid tipis (konsisten dengan halaman login) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]"
          />

          {/* Layer 2: Glow radial biru lembut & bias emas tipis di tengah */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 46%, var(--ukpbj-radial-blue) 0%, rgba(11, 42, 85, 0.08) 40%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: "var(--ukpbj-gold)" }}
          />

          {/* Spacer atas agar konten benar-benar center secara visual */}
          <div className="relative z-10 h-4" aria-hidden="true" />

          {/* Konten Utama di Tengah Layar */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md">
            {/* Emblem Container + Ring Spinner Emas */}
            <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 mb-7 sm:mb-8">
              {/* Track Lingkaran Tipis + Ring Emas Berputar Pelan */}
              <svg
                aria-hidden="true"
                viewBox="0 0 240 240"
                className="absolute inset-0 w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="ukpbj-gold-ring-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--ukpbj-gold)" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="var(--ukpbj-gold-bright)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="var(--ukpbj-gold-soft)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Base hairline ring */}
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1.25"
                />

                {/* Golden rotating ring */}
                {isCompleted ? (
                  <motion.circle
                    cx="120"
                    cy="120"
                    r="108"
                    fill="none"
                    stroke="var(--ukpbj-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.35, opacity: 0.8 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    style={{
                      transformOrigin: "120px 120px",
                      transform: "rotate(-90deg)",
                      filter: "drop-shadow(0 0 8px rgba(245, 197, 66, 0.45))",
                    }}
                  />
                ) : (
                  <motion.g
                    style={{ transformOrigin: "120px 120px" }}
                    animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : {
                            repeat: Infinity,
                            duration: 5.5,
                            ease: "linear",
                          }
                    }
                  >
                    <circle
                      cx="120"
                      cy="120"
                      r="108"
                      fill="none"
                      stroke="url(#ukpbj-gold-ring-grad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="190 490"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r="108"
                      fill="none"
                      stroke="var(--ukpbj-gold-soft)"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="24 656"
                      strokeDashoffset="-220"
                    />
                  </motion.g>
                )}
              </svg>

              {/* Card Logo Glassmorphism (Fade-in + Scale 0.9->1 + Breathing Pulse) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, scale: 1 }
                    : isCompleted
                    ? { opacity: 1, scale: 1.02 }
                    : {
                        opacity: 1,
                        scale: [1, 1.022, 1],
                      }
                }
                transition={
                  prefersReducedMotion || isCompleted
                    ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    : {
                        opacity: { duration: 0.45, ease: "easeOut" },
                        scale: {
                          delay: 0.45,
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
                className="relative flex items-center space-x-3.5 sm:space-x-4 bg-white/[0.06] backdrop-blur-xl px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-white/10 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src="/logo-kemnaker.png"
                  alt="Logo Kemnaker RI"
                  width={48}
                  height={48}
                  priority
                  className="object-contain h-8 sm:h-10 w-auto brightness-0 invert drop-shadow-md"
                />
                <div className="h-7 sm:h-9 border-l border-white/20" />
                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 overflow-visible">
                  <Image
                    src="/logo.png"
                    alt="Logo UKPBJ"
                    width={72}
                    height={72}
                    priority
                    className="object-contain scale-[1.4] w-full h-full drop-shadow-md"
                  />
                </div>
              </motion.div>
            </div>

            {/* Teks Utama + Centang Emas SVG saat 100% */}
            <div className="flex items-center justify-center gap-2 min-h-[28px] mb-1.5">
              <AnimatePresence mode="wait">
                {isCompleted && (
                  <motion.span
                    key="verified-check"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--ukpbj-gold)]/15 border border-[var(--ukpbj-gold)]/50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M5 12.5L9.5 17L19 7.5"
                        stroke="var(--ukpbj-gold)"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.36, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>

              <h2 className="text-white font-semibold text-base sm:text-lg tracking-tight">
                {isCompleted ? "Akses Terverifikasi" : "Memverifikasi Akses Anda..."}
              </h2>
            </div>

            {/* Teks Status Dinamis (berganti tiap ~900ms dengan fade/slide) */}
            <div
              role="status"
              aria-live="polite"
              className="h-5 sm:h-6 flex items-center justify-center overflow-hidden mb-6 sm:mb-7"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={isCompleted ? "completed-msg" : STATUS_MESSAGES[stepIndex]}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 7 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -7 }
                  }
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="text-xs sm:text-[13px] text-blue-100/75 font-normal tracking-wide"
                >
                  {isCompleted
                    ? "Membuka Portal Terpadu UKPBJ..."
                    : STATUS_MESSAGES[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Bar Tipis (4px, ~280px) + Persentase */}
            <div className="flex items-center justify-center gap-3 w-full max-w-[330px]">
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="relative w-full max-w-[280px] h-1 rounded-full bg-white/10 overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--ukpbj-gold) 0%, var(--ukpbj-gold-bright) 60%, var(--ukpbj-gold-soft) 100%)",
                    boxShadow: "0 0 12px rgba(245, 197, 66, 0.45)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    duration: prefersReducedMotion ? 0.15 : 0.25,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className="text-xs font-medium tabular-nums text-[var(--ukpbj-gold-soft)]/90 w-9 text-right shrink-0">
                {progress}%
              </span>
            </div>
          </div>

          {/* Footer Formal Pemerintah */}
          <footer className="relative z-10 text-center">
            <p className="text-xs text-white/50 tracking-wide">
              &copy; 2026 UKPBJ Kementerian Ketenagakerjaan RI
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminTransitionLoader;
