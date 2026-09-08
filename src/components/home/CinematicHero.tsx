"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DownloadSimple,
  Sparkle,
  CaretLeft,
  CaretRight,
  QrCode,
  ShieldCheck,
  Cpu,
  Circuitry,
  Cube,
  Eye,
  Lightning,
  ArrowsClockwise
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 7 Real App Screenshots from public/screenshots (all native landscape)
const APP_SCREENS = [
  {
    id: "ar-camera",
    title: "Live AR Vuforia Scanner",
    category: "Vuforia AR",
    src: "/screenshots/ar-camera-view.png",
    caption: "Real-time 3D Arduino detection on optical image targets"
  },
  {
    id: "ar-workspace-led",
    title: "3D Breadboard Workspace",
    category: "Simulation",
    src: "/screenshots/ar-workspace-led.png",
    caption: "360° interactive circuit twin with live LED logic"
  },
  {
    id: "ar-workspace-rccar",
    title: "Robotics Chassis Mode",
    category: "Advanced",
    src: "/screenshots/ar-workspace-rccar.png",
    caption: "L298N dual H-bridge motor driver & DC gearmotor wiring"
  },
  {
    id: "project-list",
    title: "Curated Project Catalog",
    category: "Curriculum",
    src: "/screenshots/project-list.png",
    caption: "Graduated electronics projects from Beginner to Advanced"
  },
  {
    id: "project-details",
    title: "Hardware BOM & Specs",
    category: "Checklist",
    src: "/screenshots/project-details.png",
    caption: "Pre-assembly component requirements and pinout guides"
  },
  {
    id: "step-instructions",
    title: "Guided Circuit Steps",
    category: "Tutorial",
    src: "/screenshots/step-instructions.png",
    caption: "Numbered wiring guidance with rail polarity checks"
  },
  {
    id: "ar-library-qr",
    title: "Target Library QR Portal",
    category: "Optical Targets",
    src: "/screenshots/ar-library-qr.png",
    caption: "Quick mobile scan to access all 29 target markers"
  }
];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  const [currentScreenIdx, setCurrentScreenIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotation of phone mockup screens every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentScreenIdx((prev) => (prev + 1) % APP_SCREENS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextScreen = useCallback(() => {
    setCurrentScreenIdx((prev) => (prev + 1) % APP_SCREENS.length);
  }, []);

  const prevScreen = useCallback(() => {
    setCurrentScreenIdx((prev) => (prev - 1 + APP_SCREENS.length) % APP_SCREENS.length);
  }, []);

  // Smooth 3D Mouse Tilt Effect on the Landscape Phone Mockup
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;

    mockupRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    if (!mockupRef.current) return;
    mockupRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    mockupRef.current.style.transition = "transform 0.5s ease-out";
    setTimeout(() => {
      if (mockupRef.current) mockupRef.current.style.transition = "";
    }, 500);
  }, []);

  const activeScreen = APP_SCREENS[currentScreenIdx];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[#0E1724] text-slate-100 isolate z-10"
    >
      {/* Background Holographic Grid Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none ar-grid-bg opacity-60"
        aria-hidden="true"
      />

      {/* Cyber Ambient Radial Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-96 left-1/4 w-[500px] h-[350px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-1/4 w-[450px] h-[350px] bg-brand-blue/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">

        {/* Top Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-brand-blue/10">
          <Sparkle weight="fill" className="w-4 h-4 text-brand-blue animate-pulse" />
          <span>Augmented Reality Electronics Simulator</span>
        </div>

        {/* User Requested: Just AR-DUINO-M with Electric Blue 'M' */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight text-white mb-4 leading-[1.05] filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          AR-DUINO<span className="text-brand-blue drop-shadow-[0_0_35px_rgba(53,162,244,0.7)]">-M</span>
        </h1>

        {/* Expanded Official Acronym Definition */}
        <p className="text-slate-300 text-base sm:text-xl md:text-2xl mt-2 max-w-3xl font-light leading-relaxed">
          Augmented Reality Driven User Interface for Interactive Prototyping and Learning Microcontroller Electronics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button asChild size="lg" variant="default" className="rounded-2xl font-bold shadow-xl shadow-brand-blue/30 text-base px-8 h-13">
            <Link href="/#download" className="flex items-center gap-2.5">
              <DownloadSimple weight="bold" className="w-5 h-5" />
              <span>Download Android APK</span>
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="rounded-2xl font-semibold text-base px-8 h-13">
            <Link href="/components" className="flex items-center gap-2.5">
              <Cube weight="bold" className="w-5 h-5 text-brand-blue" />
              <span>Explore 29 AR Targets</span>
            </Link>
          </Button>
        </div>

        {/* Key Platform Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-card border border-brand-green/30 text-brand-green">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
            Vuforia Engine 3D
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-card border border-brand-blue/30 text-slate-200">
            <ShieldCheck weight="fill" className="w-4 h-4 text-brand-blue" />
            Zero Hardware Risk
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-card border border-brand-orange/30 text-brand-orange font-bold">
            <Lightning weight="fill" className="w-4 h-4" />
            100% Free & Open
          </span>
        </div>

        {/* -------------------------------------------------------------------
            CENTERED HOLOGRAPHIC STAGE: LANDSCAPE SMARTPHONE MOCKUP
        ---------------------------------------------------------------------- */}
        <div className="relative mt-14 sm:mt-18 w-full max-w-5xl flex flex-col items-center justify-center">

          {/* Holographic Pedestal Back-Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-r from-brand-blue/20 via-brand-purple/20 to-brand-blue/20 rounded-full blur-[110px] pointer-events-none" />

          {/* Floating Pill Badges around Landscape Mockup (Desktop / Tablet) */}
          <div className="hidden lg:flex absolute -top-4 left-4 xl:-left-6 z-30 flex-col gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-green/30 text-xs font-semibold text-brand-green shadow-xl shadow-black/60">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              <span>Vuforia Target Detected</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-blue/30 text-xs font-medium text-slate-200 shadow-xl shadow-black/60">
              <Circuitry weight="bold" className="w-4 h-4 text-brand-blue" />
              <span>3D Digital Twin Workspace</span>
            </div>
          </div>

          <div className="hidden lg:flex absolute -top-4 right-4 xl:-right-6 z-30 flex-col gap-3 items-end">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-blue/30 text-xs font-medium text-slate-200 shadow-xl shadow-black/60">
              <QrCode weight="bold" className="w-4 h-4 text-brand-blue" />
              <span>29 Optical Targets Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-purple/30 text-xs font-semibold text-brand-purple shadow-xl shadow-black/60">
              <Sparkle weight="fill" className="w-4 h-4" />
              <span>60 FPS AR Rendering</span>
            </div>
          </div>

          {/* Landscape Smartphone Bezel Outer Container */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseLeave}
            className="relative z-20 cursor-grab active:cursor-grabbing p-3 sm:p-4 rounded-[2.5rem] sm:rounded-[3.2rem] bg-gradient-to-b from-white/10 via-surface-card/60 to-surface-void/90 border border-brand-blue/35 shadow-2xl shadow-black/90 backdrop-blur-md w-full max-w-[800px]"
          >
            {/* The Landscape iPhone Bezel */}
            <div
              ref={mockupRef}
              className="relative w-full aspect-[16/9.5] sm:aspect-[16/9] rounded-[2.2rem] sm:rounded-[2.8rem] bg-[#0C1017] p-2.5 sm:p-3 shadow-[inset_0_0_0_2px_#3f4d66,inset_0_0_0_6px_#000,0_35px_70px_-15px_rgba(0,0,0,0.95)] transition-transform duration-100 ease-out will-change-transform flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Landscape Hardware Buttons on Top Edge */}
              <div className="absolute -top-[3px] left-[15%] w-[42px] h-[3px] bg-slate-700 rounded-t-md" />
              <div className="absolute -top-[3px] left-[23%] w-[42px] h-[3px] bg-slate-700 rounded-t-md" />
              <div className="absolute -top-[3px] right-[18%] w-[65px] h-[3px] bg-slate-700 rounded-t-md" />

              {/* Landscape Hardware Button on Right Edge (Power) */}
              <div className="absolute top-[40%] -right-[3px] w-[3px] h-[45px] bg-slate-700 rounded-r-md" />

              {/* Left Edge Landscape Camera Island */}
              <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-[16px] sm:w-[20px] h-[75px] sm:h-[90px] bg-black rounded-full z-40 flex flex-col items-center justify-between py-2 sm:py-2.5 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#151515] border border-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_#49F996]" />
              </div>

              {/* Inner Screen Display (True 16:9 Widescreen) */}
              <div className="relative w-full h-full bg-black rounded-[1.8rem] sm:rounded-[2.3rem] overflow-hidden shadow-inner flex flex-col justify-between select-none">

                {/* Horizontal & Vertical Laser Scanline Overlays */}
                <div
                  className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_15px_#35A2F4] animate-scanline" />
                </div>

                {/* Top Landscape Status Bar */}
                <div className="pt-2 sm:pt-3 pl-10 sm:pl-14 pr-4 sm:pr-6 flex items-center justify-between z-20 text-[10px] sm:text-xs text-slate-300 font-semibold border-b border-white/10 pb-1.5 bg-surface-void/90 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
                    <span className="uppercase tracking-wider font-mono text-[10px] sm:text-xs text-white">
                      {activeScreen.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-blue/20 text-brand-blue font-bold hidden sm:inline-block">
                      Vuforia Engine AR Active
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-bold">
                      {currentScreenIdx + 1} / {APP_SCREENS.length}
                    </span>
                  </div>
                </div>

                {/* Main Landscape Screenshot Viewport */}
                <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={activeScreen.src}
                    alt={activeScreen.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 780px"
                    className="object-cover object-center transition-all duration-500"
                    priority
                  />

                  {/* Screenshot Caption Overlay (Glassmorphic HUD) */}
                  <div className="absolute bottom-2.5 left-10 sm:left-14 right-2.5 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-surface-void/95 backdrop-blur-md border border-brand-blue/30 text-left z-20 shadow-xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                          {activeScreen.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-blue font-bold flex-shrink-0">
                          AR 60fps
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 font-light">
                        {activeScreen.caption}
                      </p>
                    </div>

                    {/* Quick Stepper Controls in HUD */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={prevScreen}
                        className="p-1.5 rounded-lg bg-surface-card hover:bg-brand-blue/20 text-slate-300 hover:text-white transition-colors"
                        aria-label="Previous App Screen"
                      >
                        <CaretLeft weight="bold" className="w-4 h-4" />
                      </button>

                      {/* Pagination Dots */}
                      <div className="hidden sm:flex items-center gap-1 px-1">
                        {APP_SCREENS.map((screen, idx) => (
                          <button
                            key={screen.id}
                            type="button"
                            onClick={() => setCurrentScreenIdx(idx)}
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              idx === currentScreenIdx
                                ? "w-4 bg-brand-blue shadow-[0_0_8px_#35A2F4]"
                                : "w-1.5 bg-slate-600 hover:bg-slate-400"
                            )}
                            aria-label={`Jump to screen ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={nextScreen}
                        className="p-1.5 rounded-lg bg-surface-card hover:bg-brand-blue/20 text-slate-300 hover:text-white transition-colors"
                        aria-label="Next App Screen"
                      >
                        <CaretRight weight="bold" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Stage Bottom Metadata Pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowsClockwise weight="bold" className="w-3.5 h-3.5 text-brand-blue animate-spin" />
              Auto-rotating in-app landscape captures • Hover to pause
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="text-slate-300">
              Native 16:9 widescreen Android application
            </span>
          </div>

        </div>

      </div>

      {/* Solid Bottom Glow Separator Line to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
    </section>
  );
}
