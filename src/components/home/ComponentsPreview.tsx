"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, QrCode, Sparkle, Eye, Cube } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { COMPONENT_DATA } from "@/data/components";

// Showcase 4 distinctive components across categories
const PREVIEW_IDS = [
  "arduino-uno-r3",
  "hc-sr04-ultrasonic-sensor",
  "servo-motor",
  "lcd-display",
];

export function ComponentsPreview() {
  const previewItems = COMPONENT_DATA.filter((item) =>
    PREVIEW_IDS.includes(item.id)
  );

  return (
    <section className="relative py-24 sm:py-32 bg-[#162133] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-semibold uppercase tracking-wider mb-4">
              <QrCode weight="bold" className="w-3.5 h-3.5" />
              <span>Optical AR Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-3">
              29 High-Resolution Vuforia Targets
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Display these target markers on your desktop screen or print them on paper. Point your AR-DUINO-M phone app to immediately project accurate 3D interactive hardware.
            </p>
          </div>

          <Button asChild size="lg" variant="default" className="rounded-xl font-bold shadow-lg shadow-brand-blue/20 flex-shrink-0">
            <Link href="/components" className="flex items-center gap-2">
              <span>Explore All 29 Targets</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* 4 Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewItems.map((comp) => (
            <Link
              key={comp.id}
              href={`/components?selected=${comp.id}`}
              className="group relative rounded-2xl bg-surface-card border border-brand-blue/15 hover:border-brand-blue/50 overflow-hidden shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Target Image Frame */}
              <div className="relative w-full aspect-[4/3] bg-black/40 p-4 flex items-center justify-center overflow-hidden border-b border-brand-blue/10">
                <div className="relative w-full h-full">
                  <Image
                    src={comp.targetFile}
                    alt={comp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Scanline beam hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_12px_#35A2F4] animate-scanline" />
                </div>

                {/* Target badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-surface-void/90 border border-brand-blue/30 text-[10px] font-mono text-brand-blue font-bold">
                  Vuforia Target
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-brand-orange uppercase tracking-wider block mb-1">
                    {comp.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-blue group-hover:text-white transition-colors font-medium">
                  <span>Inspect Target</span>
                  <Eye weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
