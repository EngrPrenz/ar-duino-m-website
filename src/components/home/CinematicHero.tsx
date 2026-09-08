"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DownloadSimple,
  Sparkle,
  QrCode,
  ShieldCheck,
  Circuitry,
  Cube,
  Lightning,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // Smooth 3D Mouse Tilt Effect on the 3D Phone Mockup
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;

    mockupRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!mockupRef.current) return;
    mockupRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    mockupRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => {
      if (mockupRef.current) mockupRef.current.style.transition = "";
    }, 600);
  }, []);

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

        {/* Official AR-DUINO-M Title with Electric Blue 'M' */}
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
            CENTERED HOLOGRAPHIC STAGE: ULTRA-WIDE 3D SMARTPHONE MOCKUP
        ---------------------------------------------------------------------- */}
        <div className="relative mt-12 sm:mt-16 w-full max-w-6xl flex flex-col items-center justify-center">

          {/* Holographic Radial Back-Glow Pedestal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] lg:w-[1150px] h-[320px] sm:h-[420px] bg-gradient-to-r from-brand-blue/25 via-brand-purple/20 to-brand-blue/25 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Floating Pill Badges around 3D Mockup (Desktop / Tablet) */}
          <div className="hidden lg:flex absolute -top-8 xl:-top-10 left-0 xl:-left-6 z-30 flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-green/35 text-xs font-semibold text-brand-green shadow-xl shadow-black/70 transition-transform duration-300 hover:scale-105">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              <span>Vuforia Target Detected</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-blue/35 text-xs font-medium text-slate-200 shadow-xl shadow-black/70 transition-transform duration-300 hover:scale-105">
              <Circuitry weight="bold" className="w-4 h-4 text-brand-blue" />
              <span>3D Digital Twin Workspace</span>
            </div>
          </div>

          <div className="hidden lg:flex absolute -top-8 xl:-top-10 right-0 xl:-right-6 z-30 flex-col gap-2.5 items-end">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-blue/35 text-xs font-medium text-slate-200 shadow-xl shadow-black/70 transition-transform duration-300 hover:scale-105">
              <QrCode weight="bold" className="w-4 h-4 text-brand-blue" />
              <span>29 Optical Targets Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-surface-card/95 backdrop-blur-md border border-brand-purple/35 text-xs font-semibold text-brand-purple shadow-xl shadow-black/70 transition-transform duration-300 hover:scale-105">
              <Sparkle weight="fill" className="w-4 h-4" />
              <span>60 FPS AR Rendering</span>
            </div>
          </div>

          {/* Ultra-Wide 3D Mockup Interactive Stage */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-20 w-full flex items-center justify-center cursor-pointer select-none group px-2 sm:px-0"
          >
            <div
              ref={mockupRef}
              className="relative w-full max-w-[1100px] animate-float will-change-transform filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] drop-shadow-[0_0_45px_rgba(53,162,244,0.3)] transition-[filter] duration-500 group-hover:drop-shadow-[0_0_65px_rgba(53,162,244,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/hero-mockup.png"
                alt="AR-DUINO-M Interactive 3D Phone Mockup"
                width={1865}
                height={830}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1100px"
                className="w-full h-auto object-contain pointer-events-none select-none transition-transform duration-300"
              />
            </div>
          </div>

          {/* Stage Bottom Metadata Pill */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-brand-blue" />
              Native Android AR Experience
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="text-slate-400">
              Interactive Project Selector & Real-Time Hardware Simulation
            </span>
          </div>

        </div>

      </div>

      {/* Solid Bottom Glow Separator Line to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
    </section>
  );
}
