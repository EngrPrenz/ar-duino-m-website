"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  CaretRight,
  Play,
  Pause,
  ArrowCounterClockwise,
  ArrowsOut,
  ArrowsIn,
  House,
  DeviceMobile,
  CheckCircle,
  Sparkle,
  Circuitry,
  Globe,
  ClipboardText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ==========================================
// CONFIGURATION CONSTANTS (Easily Customizable)
// ==========================================
export const PRESENTATION_CONFIG = {
  autoplayDurationMs: 5500, // 5.5s per slide
  urls: {
    website: "https://ar-duino-m.vercel.app/",
    websiteDisplay: "ar-duino-m.vercel.app",
    // Replace with your real Google Form URL when ready:
    googleForms: "https://forms.gle/ar-duino-feedback",
    googleFormsDisplay: "forms.gle/ar-duino-feedback",
  },
  qrAssets: {
    websiteQr: "/ar-duino-qr.png",
    // Replace with your real Google Forms QR image if you generate one later:
    googleFormsQr: "/gforms-qr-placeholder.svg",
  },
};

interface SlideMeta {
  id: string;
  label: string;
  accent: string;
  secondary: string;
}

const SLIDES: SlideMeta[] = [
  { id: "intro", label: "AR-DUINO", accent: "#35A2F4", secondary: "#49F996" },
  { id: "choose", label: "Choose", accent: "#9B5FF5", secondary: "#35A2F4" },
  { id: "interactive", label: "Interactive", accent: "#49F996", secondary: "#35A2F4" },
  { id: "ar", label: "AR", accent: "#FC904F", secondary: "#9B5FF5" },
  { id: "scan", label: "Scan", accent: "#35A2F4", secondary: "#49F996" },
];

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isHudVisible, setIsHudVisible] = React.useState(true);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const hudTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastProgressUpdateRef = React.useRef<number>(Date.now());

  // Current Slide Colors for dynamic ambient glows
  const activeSlide = SLIDES[currentSlide] ?? SLIDES[0];

  // Read URL params on mount (e.g. ?slide=2&pause=true) without breaking static generation
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const slideParam = params.get("slide");
      const pauseParam = params.get("pause");

      if (slideParam) {
        const slideIndex = parseInt(slideParam, 10) - 1;
        if (slideIndex >= 0 && slideIndex < SLIDES.length) {
          setCurrentSlide(slideIndex);
        }
      }
      if (pauseParam === "true" || pauseParam === "1") {
        setIsPlaying(false);
      }
    }
  }, []);

  // ==========================================
  // AUTOPLAY TICK ENGINE
  // ==========================================
  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }

    lastProgressUpdateRef.current = Date.now();
    const intervalMs = 25;
    const increment = (intervalMs / PRESENTATION_CONFIG.autoplayDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide and wrap around
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Handle slide jump
  const goToSlide = React.useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const togglePlayPause = React.useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // ==========================================
  // FULLSCREEN HANDLER
  // ==========================================
  const toggleFullscreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (!fs) {
        setIsHudVisible(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Auto-hide HUD in Fullscreen on mouse inactivity
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    setIsHudVisible(true);
    if (hudTimeoutRef.current) {
      clearTimeout(hudTimeoutRef.current);
    }

    // In fullscreen, hide after 3.2 seconds unless cursor is near bottom 100px
    if (document.fullscreenElement) {
      const windowHeight = window.innerHeight;
      if (e.clientY < windowHeight - 110) {
        hudTimeoutRef.current = setTimeout(() => {
          setIsHudVisible(false);
        }, 3200);
      }
    }
  }, []);

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input
      if (["input", "textarea"].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(SLIDES.length - 1);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          const idx = parseInt(e.key, 10) - 1;
          if (idx >= 0 && idx < SLIDES.length) {
            goToSlide(idx);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, togglePlayPause, toggleFullscreen, goToSlide]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden bg-[#0A101D] text-white select-none flex flex-col justify-between font-sans"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, #162133 0%, #0A101D 100%)",
      }}
    >
      {/* Cyber Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Dynamic Ambient Glow Orbs */}
      <div
        className="absolute top-[15%] left-[18%] w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-30 transition-all duration-1000 ease-out z-0"
        style={{ backgroundColor: activeSlide.accent }}
      />
      <div
        className="absolute bottom-[18%] right-[18%] w-[650px] h-[650px] rounded-full blur-[170px] pointer-events-none opacity-25 transition-all duration-1000 ease-out z-0"
        style={{ backgroundColor: activeSlide.secondary }}
      />

      {/* ==========================================
          SLIDES VIEWPORT (Main Stage)
          ========================================== */}
      <main className="relative z-10 flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-4 pb-24 flex items-center justify-center">
        {/* SLIDE 1: LOGO & NAME + CLEAN WHITE TAGLINE */}
        <div
          className={cn(
            "w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out",
            currentSlide === 0 ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-95"
          )}
        >
          {/* Glowing Animated Logo Frame */}
          <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
            <div
              className="absolute -inset-6 rounded-3xl opacity-75 blur-2xl animate-pulse transition-all duration-700"
              style={{
                background: "linear-gradient(135deg, #35A2F4, #9B5FF5, #49F996)",
              }}
            />
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl p-3 bg-surface-card/60 backdrop-blur-xl border-2 border-brand-blue/40 shadow-[0_0_50px_rgba(53,162,244,0.6)] flex items-center justify-center">
              <Image
                src="/Logo Main.png"
                alt="AR-DUINO Logo"
                fill
                priority
                className="object-contain p-2 filter drop-shadow-[0_0_30px_rgba(53,162,244,0.8)]"
              />
            </div>
          </div>

          <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white mb-4 sm:mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            AR-DUINO
          </h1>

          <p className="max-w-4xl font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-snug sm:leading-snug tracking-tight px-4 drop-shadow-md">
            Augmented Reality Driven User Interface for Interactive Prototyping and Learning Microcontroller Electronics
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-blue/15 text-brand-blue border border-brand-blue/30 backdrop-blur-md">
              <Circuitry weight="bold" className="w-4 h-4" />
              Vuforia Engine AR
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-green/15 text-brand-green border border-brand-green/30 backdrop-blur-md">
              <Sparkle weight="bold" className="w-4 h-4" />
              Zero Hardware Cost Simulation
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange border border-brand-orange/30 backdrop-blur-md">
              <DeviceMobile weight="bold" className="w-4 h-4" />
              Android Exclusive APK
            </span>
          </div>
        </div>

        {/* SLIDE 2: CHOOSE YOUR PROJECT */}
        <div
          className={cn(
            "w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out",
            currentSlide === 1 ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-95"
          )}
        >
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow-md">
              Choose Your Project
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-[#9B5FF5] max-w-3xl mx-auto px-4">
              Graduated difficulty curriculum with step-by-step guides and hardware checklists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl items-center justify-center px-2">
            {/* Device Mockup 1 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-blue/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-blue/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/project-details.png"
                  alt="Hardware Checklist Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-blue border border-brand-blue/30 backdrop-blur-sm shadow-md">
                  1. Hardware Checklist
                </div>
              </div>
            </div>

            {/* Device Mockup 2 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-green/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-green/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/step-instructions.png"
                  alt="Guided Wiring Steps Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-green border border-brand-green/30 backdrop-blur-sm shadow-md">
                  2. Guided Wiring Steps
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: INTERACTIVE PROTOTYPING GAMIFIED */}
        <div
          className={cn(
            "w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out",
            currentSlide === 2 ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-95"
          )}
        >
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
              Interactive Prototyping & Hardware Learning Gamified
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-brand-green max-w-3xl mx-auto px-4">
              Digital twin electronics with real-time logic simulation and zero burnout risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl items-center justify-center px-2">
            {/* Device Mockup 1 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-green/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-green/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/ar-workspace-led.png"
                  alt="3D Digital Twin Breadboard Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-green border border-brand-green/30 backdrop-blur-sm shadow-md">
                  ● 1. 3D Digital Twin Breadboard
                </div>
              </div>
            </div>

            {/* Device Mockup 2 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-orange/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-orange/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/ar-workspace-rccar.png"
                  alt="L298N Robotics Mode Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-orange border border-brand-orange/30 backdrop-blur-sm shadow-md">
                  2. L298N Robotics Mode
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 4: AR RECOGNITION: POINT CAMERA THEN SPAWN */}
        <div
          className={cn(
            "w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out",
            currentSlide === 3 ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-95"
          )}
        >
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
              AR Recognition: Point Camera Then Spawn
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-brand-orange max-w-3xl mx-auto px-4">
              Scan target card to instantly materialize interactive 3D microcontrollers and live pinouts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl items-center justify-center px-2">
            {/* Device Mockup 1 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-orange/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-orange/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/ar-library-qr.png"
                  alt="Target Card Input Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-orange border border-brand-orange/30 backdrop-blur-sm shadow-md">
                  1. Target Card Input
                </div>
              </div>
            </div>

            {/* Device Mockup 2 */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#162133]/90 border-2 border-brand-green/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-brand-green/80 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src="/screenshots/ar-camera-view.png"
                  alt="Live 3D Model Spawned in AR Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#162133]/90 text-brand-green border border-brand-green/30 backdrop-blur-sm shadow-md">
                  ● 2. 3D Model Spawned
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 5: DUAL QR CODES (WEBSITE + GOOGLE FORMS) */}
        <div
          className={cn(
            "w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out",
            currentSlide === 4 ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-95"
          )}
        >
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
              Scan QR Codes for Website & Feedback
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-brand-blue max-w-3xl mx-auto px-4">
              Explore the live online platform • Submit congress evaluation directly from your phone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-4xl px-2">
            {/* CARD 1: WEBSITE QR */}
            <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#162133]/90 border-2 border-brand-blue/40 shadow-[0_20px_50px_rgba(53,162,244,0.18)] backdrop-blur-xl hover:border-brand-blue transition-all duration-300 flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-blue/15 text-brand-blue border border-brand-blue/30 mb-5">
                <Globe weight="bold" className="w-4 h-4" />
                <span>OFFICIAL WEBSITE</span>
              </div>

              {/* QR Image Box */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 p-3 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src={PRESENTATION_CONFIG.qrAssets.websiteQr}
                    alt="Scan Website QR Code"
                    fill
                    className="object-contain"
                  />
                  {/* Center Emblem Logo */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-lg bg-surface-card border-2 border-brand-blue p-1 flex items-center justify-center shadow-lg">
                    <Image
                      src="/Logo Main.png"
                      alt="AR-DUINO"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* URL Display */}
              <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-brand-blue/30 text-xs font-mono text-brand-blue/90 font-bold mb-4 max-w-[260px] truncate">
                {PRESENTATION_CONFIG.urls.websiteDisplay}
              </div>

              {/* Quick Guidance */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Scan with phone camera to open Target Library, view 4 tutorials, and download APK.
              </p>
            </div>

            {/* CARD 2: GOOGLE FORMS EVALUATION QR */}
            <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#162133]/90 border-2 border-brand-purple/40 shadow-[0_20px_50px_rgba(155,95,245,0.18)] backdrop-blur-xl hover:border-brand-purple transition-all duration-300 flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-purple/15 text-brand-purple border border-brand-purple/30 mb-5">
                <ClipboardText weight="bold" className="w-4 h-4" />
                <span>CONGRESS EVALUATION (GFORMS)</span>
              </div>

              {/* QR Image Box */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 p-3 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src={PRESENTATION_CONFIG.qrAssets.googleFormsQr}
                    alt="Scan Google Forms Survey QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* URL Display */}
              <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-brand-purple/30 text-xs font-mono text-brand-purple/90 font-bold mb-4 max-w-[260px] truncate">
                {PRESENTATION_CONFIG.urls.googleFormsDisplay}
              </div>

              {/* Quick Guidance */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Scan to share reviewer feedback, rate the AR-DUINO exhibit, and submit responses.
              </p>
            </div>
          </div>

          {/* Stepper Guide */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-white/10 text-slate-200">
              <span className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs font-bold">
                1
              </span>
              Open Phone Camera
            </span>
            <span className="text-slate-500">→</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-white/10 text-slate-200">
              <span className="w-5 h-5 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-xs font-bold">
                2
              </span>
              Point at Target QR Code
            </span>
            <span className="text-slate-500">→</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-white/10 text-slate-200">
              <span className="w-5 h-5 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center text-xs font-bold">
                3
              </span>
              Access Website or Submit Form
            </span>
          </div>
        </div>
      </main>

      {/* ==========================================
          ALL-IN-ONE BOTTOM NAVBAR & HUD
          ========================================== */}
      <footer
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-[#0E1724]/95 border-t border-white/15 backdrop-blur-2xl shadow-[0_-15px_30px_rgba(0,0,0,0.7)] flex flex-col transition-all duration-300 ease-out",
          isFullscreen && !isHudVisible ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        )}
      >
        {/* Dynamic Linear Progress Bar */}
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full transition-all duration-75 linear shadow-[0_0_12px_rgba(53,162,244,0.8)]"
            style={{
              width: `${progress}%`,
              backgroundColor: activeSlide.accent,
            }}
          />
        </div>

        {/* HUD Content Bar */}
        <div className="w-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
          {/* Left: Brand Pill & Slide Pills */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
            {/* Brand Emblem */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/15 flex-shrink-0">
              <div className="relative w-6 h-6 rounded-md overflow-hidden bg-brand-blue/10 border border-brand-blue/30 p-0.5">
                <Image
                  src="/Logo Main.png"
                  alt="AR-DUINO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-tight hidden sm:inline-block">
                AR-DUINO
              </span>
            </div>

            {/* Slide Navigation Bullets */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-xl font-heading font-extrabold text-xs transition-all duration-200 cursor-pointer border",
                      isActive
                        ? "bg-brand-blue/20 border-brand-blue text-white shadow-[0_4px_14px_rgba(53,162,244,0.3)]"
                        : "bg-[#1C2B3F]/60 border-white/10 text-slate-400 hover:text-white hover:bg-[#1C2B3F]"
                    )}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? slide.accent : "#64748B",
                      }}
                    />
                    <span className="hidden md:inline-block">{slide.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Play / Pause & Prev / Next */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={prevSlide}
              type="button"
              className="w-8 h-8 rounded-xl bg-[#1C2B3F] border border-white/15 text-white hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Previous Slide (Left Arrow)"
              aria-label="Previous Slide"
            >
              <CaretLeft weight="bold" className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              type="button"
              className="h-8 px-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green text-[#0A101D] font-heading font-black text-xs flex items-center gap-1.5 shadow-[0_4px_14px_rgba(53,162,244,0.35)] hover:opacity-95 transition-all cursor-pointer active:scale-95"
              title="Play / Pause Autoplay (Spacebar)"
            >
              {isPlaying ? (
                <>
                  <Pause weight="fill" className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play weight="fill" className="w-3.5 h-3.5" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              type="button"
              className="w-8 h-8 rounded-xl bg-[#1C2B3F] border border-white/15 text-white hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Next Slide (Right Arrow)"
              aria-label="Next Slide"
            >
              <CaretRight weight="bold" className="w-4 h-4" />
            </button>

            {/* Loop timer duration pill */}
            <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C2B3F]/90 border border-white/10 text-[11px] font-mono text-slate-300">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isPlaying ? "bg-brand-green animate-pulse" : "bg-brand-orange"
                )}
              />
              {isPlaying ? "5.5s" : "PAUSED"}
            </span>
          </div>

          {/* Right: Kiosk Tools (Counter, Restart, Fullscreen, Website Exit) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Slide Counter */}
            <div className="px-2.5 py-1 rounded-full bg-[#1C2B3F]/90 border border-white/15 text-xs font-mono text-slate-300">
              <span className="font-bold text-brand-blue">{currentSlide + 1}</span> / <span>5</span>
            </div>

            {/* Restart Button */}
            <button
              onClick={() => goToSlide(0)}
              type="button"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#1C2B3F] border border-white/15 text-xs font-heading font-bold text-slate-200 hover:text-white hover:border-brand-blue transition-all cursor-pointer active:scale-95"
              title="Restart Presentation (Home key)"
            >
              <ArrowCounterClockwise weight="bold" className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#1C2B3F] border border-white/15 text-xs font-heading font-bold text-slate-200 hover:text-white hover:border-brand-blue transition-all cursor-pointer active:scale-95"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? (
                <>
                  <ArrowsIn weight="bold" className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="hidden md:inline-block">Exit</span>
                </>
              ) : (
                <>
                  <ArrowsOut weight="bold" className="w-3.5 h-3.5 text-brand-green" />
                  <span className="hidden md:inline-block">Fullscreen</span>
                </>
              )}
            </button>

            {/* Exit to Main Website */}
            <Link
              href="/"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-card border border-white/15 text-xs font-heading font-bold text-slate-200 hover:text-brand-blue hover:border-brand-blue transition-all active:scale-95"
              title="Return to Main Website"
            >
              <House weight="bold" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block">Website</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
