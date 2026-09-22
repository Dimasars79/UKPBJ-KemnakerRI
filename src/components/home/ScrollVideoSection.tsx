"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Play, Pause, Building2, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ScrollVideoSection() {
  const { trans } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressBadgeRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlayingFallback, setIsPlayingFallback] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const video = videoRef.current;
      const title = titleRef.current;
      const cards = cardsRef.current;
      const progressBadge = progressBadgeRef.current;

      if (!section || !container || !video) return;

      // Ensure video metadata is loaded before binding ScrollTrigger duration
      const initScrollAnimation = () => {
        // Master Timeline for Scroll-Driven Video & Overlays
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1, // Smooth catch-up
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(Math.round(p * 100));

              // Scrub video timeline directly with scroll position
              if (video && !isNaN(video.duration) && video.duration > 0) {
                const targetTime = video.duration * p;
                if (isFinite(targetTime)) {
                  video.currentTime = targetTime;
                }
              }
            }
          }
        });

        // 1. Initial Entry: Subtle scale up & focus (0% -> 25%)
        tl.fromTo(
          container,
          { scale: 0.94, opacity: 0.9, borderRadius: '2rem' },
          { scale: 1, opacity: 1, borderRadius: '1.5rem', ease: 'power1.out', duration: 0.25 }
        );

        // 2. Title & badge appearance / subtle shift (10% -> 50%)
        if (title) {
          tl.fromTo(
            title,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out', duration: 0.3 },
            0.1
          );
        }

        if (progressBadge) {
          tl.fromTo(
            progressBadge,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out', duration: 0.2 },
            0.15
          );
        }

        // 3. Floating institutional milestone cards stagger in (35% -> 80%)
        if (cards) {
          const cardItems = cards.children;
          tl.fromTo(
            cardItems,
            { y: 40, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: 'power2.out', duration: 0.4 },
            0.35
          );
        }

        // 4. Subtle exit transition as scroll reaches completion (85% -> 100%)
        tl.to(
          container,
          { scale: 0.98, opacity: 0.95, ease: 'power1.inOut', duration: 0.15 },
          0.85
        );
      };

      if (video.readyState >= 1) {
        initScrollAnimation();
      } else {
        video.addEventListener('loadedmetadata', initScrollAnimation, { once: true });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  // Fallback toggle for manual playback if reduced motion or user wants continuous play
  const toggleFallbackPlay = () => {
    if (!videoRef.current) return;
    if (isPlayingFallback) {
      videoRef.current.pause();
      setIsPlayingFallback(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlayingFallback(true);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#07172C] text-white flex items-center justify-center overflow-hidden py-12 md:py-16 selection:bg-amber-400 selection:text-primary-navy"
      aria-label={trans('Transformasi Digital Pengadaan UKPBJ Kemnaker', 'UKPBJ MoM Digital Procurement Transformation')}
    >
      {/* Background Subtle Ambient Navy & Gold Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,46,84,0.7),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 w-full flex flex-col items-center justify-center my-auto transition-transform"
      >
        {/* Top Header Badge & Institutional Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <div 
            ref={progressBadgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md mb-4 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="tracking-wide uppercase text-[11px] font-bold text-amber-300">
              {trans('Transformasi Digital Pengadaan', 'Digital Procurement Transformation')}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-[11px] text-slate-300">
              {trans('Kemnaker RI', 'Ministry of Manpower RI')}
            </span>
          </div>

          <div ref={titleRef}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {trans('Modernisasi Tata Kelola', 'Modernizing Governance')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                {trans('Pengadaan Barang & Jasa', 'Goods & Services Procurement')}
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300/90 mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
              {trans(
                'Menghadirkan ekosistem pengadaan elektronik yang transparan, akuntabel, kredibel, dan terintegrasi penuh dengan LPSE & SPSE Nasional.',
                'Delivering an electronic procurement ecosystem that is transparent, accountable, credible, and fully integrated with National SPSE.'
              )}
            </p>
          </div>
        </div>

        {/* Video Canvas / Player Card Frame */}
        <div className="relative w-full max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/15 bg-slate-900/90 aspect-video group">
          
          {/* Main Scrubbing HTML5 Video */}
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            poster="/gedung-kemnaker.jpg"
            className="w-full h-full object-cover object-center pointer-events-none brightness-90 contrast-105 transition-all duration-300"
          >
            {/* High quality clean institutional video stream source */}
            <source 
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
              type="video/mp4" 
            />
            {trans('Browser Anda tidak mendukung pemutar video HTML5.', 'Your browser does not support HTML5 video.')}
          </video>

          {/* Vignette & Gradient Overlays for High Institutional Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172C]/90 via-transparent to-[#07172C]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172C]/60 via-transparent to-[#07172C]/60 pointer-events-none" />

          {/* Top Left Status Watermark */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider text-slate-200">
              {trans('SISTEM SPSE 4.5 TERINTEGRASI', 'INTEGRATED SPSE 4.5 SYSTEM')}
            </span>
          </div>

          {/* Top Right Scroll Progress Indicator */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-amber-300">
            <span className="text-[11px] text-slate-300">{trans('Progress:', 'Scroll:')}</span>
            <span className="font-bold">{scrollProgress}%</span>
          </div>

          {/* Center Scroll Hint (when near start) */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${
              scrollProgress > 25 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="bg-slate-950/70 border border-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
              <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center animate-bounce">
                <ChevronDown className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">
                  {trans('Gulir ke bawah untuk memutar video', 'Scroll down to play video timeline')}
                </p>
                <p className="text-[10px] text-slate-400">
                  {trans('Sinkronisasi kecepatan scroll interaktif', 'Interactive scroll-driven speed sync')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Milestone Badges (Revealed during scroll scrubbing) */}
          <div 
            ref={cardsRef}
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pointer-events-none"
          >
            {/* Pillar 1 */}
            <div className="bg-slate-950/75 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {trans('Integritas & Kepatuhan', 'Integrity & Compliance')}
                </h4>
                <p className="text-[10px] text-slate-300 truncate">
                  {trans('Sesuai Perpres No. 12/2021', 'Compliant with Presidential Reg.')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-950/75 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/20 text-blue-300 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {trans('Efisiensi Anggaran', 'Budget Efficiency')}
                </h4>
                <p className="text-[10px] text-slate-300 truncate">
                  {trans('Optimasi E-Purchasing & Tender', 'E-Purchasing & Tender Optimization')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-950/75 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {trans('Akurasi & Transparansi', 'Accuracy & Transparency')}
                </h4>
                <p className="text-[10px] text-slate-300 truncate">
                  {trans('Audit Trail Real-Time Terbuka', 'Real-Time Open Audit Trail')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Scrub Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Accessibility & Fallback Manual Control Toolbar */}
        {reducedMotion && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={toggleFallbackPlay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              {isPlayingFallback ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans('Jeda Video', 'Pause Video')}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans('Putar Video Normal', 'Play Normal Video')}</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-slate-400">
              {trans('(Mode gerakan terbatas aktif)', '(Reduced motion mode active)')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
