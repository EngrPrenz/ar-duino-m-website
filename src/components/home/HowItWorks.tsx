"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DownloadSimple,
  ListChecks,
  VideoCamera,
  PlayCircle,
  ArrowRight,
  Sparkle,
  Circuitry,
  CaretLeft,
  CaretRight,
  Eye,
  CheckCircle,
  Scan
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface StepItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  accent: string;
  border: string;
  bg: string;
  screenshot: string;
  screenshotAlt: string;
  screenshotTag: string;
  keyFeature: string;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    title: "Download App & Access Library",
    subtitle: "Install APK & Scan Targets",
    description: "Download and install the official AR-DUINO-M APK on any Android smartphone (Android 8.0+). Use the in-app Arduino Library portal to view or scan all 29 optical component target markers.",
    icon: DownloadSimple,
    accent: "text-brand-blue",
    border: "border-brand-blue/30",
    bg: "bg-brand-blue/10",
    screenshot: "/screenshots/v2/ar-library-qr.png",
    screenshotAlt: "In-App Arduino Library & Target Card QR Portal",
    screenshotTag: "Target Library Portal",
    keyFeature: "Instant access to 29 optical AR tracking markers without login"
  },
  {
    step: "02",
    title: "Choose a Lab Project & Hardware BOM",
    subtitle: "Select Curriculum & Parts",
    description: "Browse curated laboratory modules from Blinking LED to RC-Car robotics. Inspect component requirements, polarity guidelines, and hardware specs before starting.",
    icon: ListChecks,
    accent: "text-brand-purple",
    border: "border-brand-purple/30",
    bg: "bg-brand-purple/10",
    screenshot: "/screenshots/v2/project-details.png",
    screenshotAlt: "Project Overview and Hardware BOM Checklist",
    screenshotTag: "Hardware Checklist & BOM",
    keyFeature: "Verified component bill of materials and polarity instructions"
  },
  {
    step: "03",
    title: "Follow Step-by-Step Instructions",
    subtitle: "Schematics & Wiring Guide",
    description: "Follow guided assembly steps with clear diagrams, component pin orientations, and circuit safety tips before physical or virtual wiring.",
    icon: VideoCamera,
    accent: "text-brand-green",
    border: "border-brand-green/30",
    bg: "bg-brand-green/10",
    screenshot: "/screenshots/v2/step-instructions.png",
    screenshotAlt: "Guided Step-by-Step Wiring Instructions",
    screenshotTag: "Guided Assembly Steps",
    keyFeature: "Numbered steps with pinout tips and breadboard positioning"
  },
  {
    step: "04",
    title: "Assemble the Circuit in 3D",
    subtitle: "Interactive Workspace",
    description: "Enter the 3D tabletop workspace to spawn digital twins of Arduino boards, LEDs, resistors, and breadboards. Snap components into place with real-time wire and pin validation.",
    icon: Circuitry,
    accent: "text-brand-orange",
    border: "border-brand-orange/30",
    bg: "bg-brand-orange/10",
    screenshot: "/screenshots/v2/ar-workspace-led.png",
    screenshotAlt: "Interactive 3D Breadboard Workspace",
    screenshotTag: "3D Breadboard Workspace",
    keyFeature: "Real-time checklist confirms wiring accuracy and pin connections"
  },
  {
    step: "05",
    title: "Simulate, Code & Test Circuit",
    subtitle: "Code Upload & Testing",
    description: "Review sketches in the Mock IDE, simulate code upload with a single tap, and watch your circuit spring to life with synchronized blinking LEDs, potentiometer dimming, or robotics motor drives.",
    icon: PlayCircle,
    accent: "text-brand-blue",
    border: "border-brand-blue/30",
    bg: "bg-brand-blue/10",
    screenshot: "/screenshots/v2/ar-workspace-rccar.png",
    screenshotAlt: "Robotics Chassis L298N Circuit Simulation",
    screenshotTag: "Simulation & Logic Engine",
    keyFeature: "Zero-burnout simulation with dynamic LED, motor, and sensor responses"
  },
];

export function HowItWorks() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = STEPS[activeStepIdx];
  const Icon = activeStep.icon;

  const nextStep = () => {
    setActiveStepIdx((prev) => (prev + 1) % STEPS.length);
  };

  const prevStep = () => {
    setActiveStepIdx((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  };

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#162133] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
            <span>Interactive Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-4">
            How AR-DUINO-M Works in 5 Steps
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Master breadboard wiring and microcontroller basics in a risk-free 3D virtual workspace before building on physical hardware.
          </p>
        </div>

        {/* 5-Step Process Tabs Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {STEPS.map((item, index) => {
            const StepIcon = item.icon;
            const isActive = index === activeStepIdx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepIdx(index)}
                className={cn(
                  "group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between shadow-lg",
                  isActive
                    ? "bg-surface-card border-brand-blue shadow-[0_10px_25px_rgba(53,162,244,0.25)] -translate-y-1"
                    : "bg-surface-card/60 border-brand-blue/15 hover:border-brand-blue/40 hover:bg-surface-card/80 text-slate-400"
                )}
              >
                {/* Step Pill & Icon */}
                <div className="flex items-center justify-between mb-3 w-full">
                  <span className={cn(
                    "font-heading font-black text-xl transition-colors",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                  )}>
                    {item.step}
                  </span>
                  <div className={cn("p-2 rounded-xl border transition-all duration-300", item.bg, item.border)}>
                    <StepIcon weight="duotone" className={cn("w-5 h-5", item.accent)} />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Phase {index + 1}
                  </span>
                  <h3 className={cn(
                    "font-heading font-bold text-xs sm:text-sm line-clamp-1 transition-colors",
                    isActive ? "text-brand-blue" : "text-slate-200 group-hover:text-white"
                  )}>
                    {item.title}
                  </h3>
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-blue rounded-full shadow-[0_0_8px_#35A2F4]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive In-App Screenshot Showcase Card */}
        <div className="relative rounded-3xl p-5 sm:p-8 bg-surface-card/90 border-2 border-brand-blue/30 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden">
          {/* Subtle Corner Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Step Details & Explanation */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/15 text-brand-blue text-xs font-mono font-bold border border-brand-blue/30">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span>STEP {activeStep.step} OF 05</span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {activeStep.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
                  {activeStep.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {activeStep.description}
              </p>

              {/* Key Advantage Pill */}
              <div className="p-3.5 rounded-2xl bg-surface-void/90 border border-brand-blue/20 flex items-start gap-3">
                <CheckCircle weight="fill" className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    In-App Feature
                  </div>
                  <div className="text-xs text-slate-300 font-light leading-relaxed">
                    {activeStep.keyFeature}
                  </div>
                </div>
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="p-3 rounded-xl bg-surface-void border border-white/10 text-slate-300 hover:text-white hover:border-brand-blue/40 transition-all flex items-center gap-2 text-xs font-semibold"
                  aria-label="Previous Step"
                >
                  <CaretLeft weight="bold" className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-surface-void transition-all flex items-center gap-2 text-xs font-bold shadow-lg shadow-brand-blue/30"
                  aria-label="Next Step"
                >
                  <span>Next: Phase {((activeStepIdx + 1) % STEPS.length) + 1}</span>
                  <CaretRight weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-400 ml-auto">
                  {activeStepIdx + 1} / {STEPS.length}
                </span>
              </div>
            </div>

            {/* Right: Authentic Smartphone Screenshot Mockup */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-[#0C1017] border-2 border-brand-blue/40 shadow-2xl shadow-black/90">
                {/* Widescreen Landscape Viewport Container */}
                <div className="relative aspect-[20/9.5] sm:aspect-[20/9] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner flex items-center justify-center">
                  <Image
                    src={activeStep.screenshot}
                    alt={activeStep.screenshotAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-contain object-center transition-all duration-500"
                    priority
                  />

                  {/* Top HUD Tag */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold bg-[#162133]/90 text-brand-blue border border-brand-blue/30 backdrop-blur-md shadow-md">
                    {activeStep.screenshotTag}
                  </div>

                  {/* Bottom Scanline Indicator */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-void/90 text-slate-300 border border-white/10 backdrop-blur-md">
                    Native Android Capture
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
