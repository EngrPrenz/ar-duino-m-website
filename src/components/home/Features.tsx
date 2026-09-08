"use client";

import React from "react";
import { 
  Cube, 
  BookOpen, 
  QrCode, 
  Lightning, 
  ShieldCheck, 
  WifiSlash,
  Sparkle
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "AR-Powered Simulation",
    tag: "Vuforia 3D Engine",
    description: "Overlay interactive 3D digital twins directly onto your real workbench using your phone's camera. Rotate, zoom, and inspect components from any angle in 360 degrees.",
    icon: Cube,
    color: "text-brand-blue",
    border: "group-hover:border-brand-blue/50",
    glow: "group-hover:shadow-brand-blue/15",
  },
  {
    title: "Guided Laboratory Curriculum",
    tag: "Hands-on Projects",
    description: "Structured project guides spanning Easy, Medium, and Hard difficulty levels. Includes bill of materials, circuit steps, and ready-to-run Arduino sketches.",
    icon: BookOpen,
    color: "text-brand-purple",
    border: "group-hover:border-brand-purple/50",
    glow: "group-hover:shadow-brand-purple/15",
  },
  {
    title: "29 Optical AR Reference Targets",
    tag: "Optical Tracking",
    description: "Scan printable markers or screen cards with your phone camera to inspect interactive 3D digital twins, detailed pinout diagrams, specifications, and use cases for 29 essential electronics components.",
    icon: QrCode,
    color: "text-brand-green",
    border: "group-hover:border-brand-green/50",
    glow: "group-hover:shadow-brand-green/15",
  },
  {
    title: "Real-Time Circuit Simulation",
    tag: "Interactive 3D",
    description: "Witness real-time state changes inside the 3D viewport: LEDs illuminate with true blink intervals, potentiometer wipers dynamically adjust brightness, and the RC car robotics chassis responds to directional drive controls.",
    icon: Lightning,
    color: "text-brand-orange",
    border: "group-hover:border-brand-orange/50",
    glow: "group-hover:shadow-brand-orange/15",
  },
  {
    title: "Risk-Free Circuit Prototyping",
    tag: "Safe Learning",
    description: "Troubleshoot wiring mistakes and incorrect pin connections without the risk of damaging expensive microcontroller boards or blowing delicate components. Real-time checklist validation flags errors instantly.",
    icon: ShieldCheck,
    color: "text-brand-blue",
    border: "group-hover:border-brand-blue/50",
    glow: "group-hover:shadow-brand-blue/15",
  },
  {
    title: "100% Offline Simulation",
    tag: "Standalone APK",
    description: "All 3D assets, Vuforia target database features, and simulation engines run entirely on-device without requiring continuous internet or cloud subscriptions.",
    icon: WifiSlash,
    color: "text-brand-green",
    border: "group-hover:border-brand-green/50",
    glow: "group-hover:shadow-brand-green/15",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-[#0E1724] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-4">
            Engineered for Modern STEM Education
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Eliminate equipment shortages and hardware budget constraints with interactive 3D tabletop simulations and optical AR component libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative p-7 rounded-2xl bg-surface-card/70 border border-brand-blue/15 hover:bg-surface-hover/90 transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-1.5 flex flex-col justify-between",
                  feature.border,
                  feature.glow
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-surface-navy border border-white/10 group-hover:border-brand-blue/40 transition-colors">
                      <Icon weight="duotone" className={cn("w-7 h-7", feature.color)} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-surface-navy text-slate-300 border border-white/5">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-brand-blue transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-brand-blue">AR-DUINO-M Feature</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-150 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
