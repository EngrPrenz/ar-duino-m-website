"use client";

import React from "react";
import { 
  DownloadSimple, 
  ListChecks, 
  VideoCamera, 
  Scan, 
  PlayCircle,
  ArrowRight,
  Sparkle
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Download the App",
    subtitle: "Install the APK",
    description: "Download and install the official AR-DUINO-M APK on any Android smartphone (Android 8.0+). No registration or internet connection required after install.",
    icon: DownloadSimple,
    accent: "text-brand-blue",
    border: "border-brand-blue/30",
    bg: "bg-brand-blue/10",
  },
  {
    step: "02",
    title: "Choose a Project",
    subtitle: "Select Curriculum",
    description: "Browse curated laboratory modules categorized from Beginner to Advanced, from simple Blinking LEDs to full differential-drive RC Car robotics.",
    icon: ListChecks,
    accent: "text-brand-purple",
    border: "border-brand-purple/30",
    bg: "bg-brand-purple/10",
  },
  {
    step: "03",
    title: "Learn the Steps",
    subtitle: "Schematics & Pinouts",
    description: "Inspect verified breadboard schematics, polarity guidelines, and hardware requirements. Review embedded video guides before physical assembly.",
    icon: VideoCamera,
    accent: "text-brand-green",
    border: "border-brand-green/30",
    bg: "bg-brand-green/10",
  },
  {
    step: "04",
    title: "Build the Circuit",
    subtitle: "Scan Target Markers",
    description: "Point your phone camera at printable target cards or monitor screens to spawn accurate 3D digital twins of Arduino boards, motors, and sensors.",
    icon: Scan,
    accent: "text-brand-orange",
    border: "border-brand-orange/30",
    bg: "bg-brand-orange/10",
  },
  {
    step: "05",
    title: "Run Simulation",
    subtitle: "Real-Time Logic",
    description: "Flash Arduino C++ logic inside the simulator and watch LEDs blink, stepper motors rotate, and sensors respond to virtual stimuli in real-time.",
    icon: PlayCircle,
    accent: "text-brand-blue",
    border: "border-brand-blue/30",
    bg: "bg-brand-blue/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#162133] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
            <span>Interactive Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-4">
            How AR-DUINO-M Works in 5 Steps
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Transition seamlessly from conceptual electronics theory to physical breadboard prototyping with intuitive augmented reality guidance.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative p-6 rounded-2xl bg-surface-card/80 border border-brand-blue/15 hover:border-brand-blue/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg shadow-black/20"
              >
                {/* Step Pill & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading font-black text-2xl text-slate-400 group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                    <div className={cn("p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-110", item.bg, item.border)}>
                      <Icon weight="duotone" className={cn("w-6 h-6", item.accent)} />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Phase {index + 1}</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
