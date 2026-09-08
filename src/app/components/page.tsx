"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  MagnifyingGlass, 
  X, 
  DownloadSimple, 
  ArrowSquareOut, 
  Sparkle, 
  QrCode, 
  Cpu, 
  ArrowsClockwise, 
  CaretLeft, 
  CaretRight, 
  CheckCircle,
  Eye,
  SlidersHorizontal,
  Info
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { COMPONENT_DATA, CATEGORIES, ComponentTarget } from "@/data/components";
import { cn } from "@/lib/utils";

function ComponentsContent() {
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("selected");
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam && CATEGORIES.includes(categoryParam as any) ? categoryParam : "All Hardware"
  );
  const [activeModalComponent, setActiveModalComponent] = useState<ComponentTarget | null>(null);

  // Open modal if ?selected= is present in URL
  useEffect(() => {
    if (selectedParam) {
      const found = COMPONENT_DATA.find((c) => c.id === selectedParam);
      if (found) {
        setActiveModalComponent(found);
      }
    }
  }, [selectedParam]);

  // Filter components by search and category
  const filteredComponents = useMemo(() => {
    return COMPONENT_DATA.filter((comp) => {
      const matchesCategory =
        activeCategory === "All Hardware" || comp.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        comp.name.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.circuitRole.toLowerCase().includes(q) ||
        comp.targetIdentifier.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Navigate next/previous inside modal
  const handleModalNavigate = (direction: "prev" | "next") => {
    if (!activeModalComponent) return;
    const currentIndex = COMPONENT_DATA.findIndex((c) => c.id === activeModalComponent.id);
    if (currentIndex === -1) return;

    if (direction === "next") {
      const nextIdx = (currentIndex + 1) % COMPONENT_DATA.length;
      setActiveModalComponent(COMPONENT_DATA[nextIdx]);
    } else {
      const prevIdx = (currentIndex - 1 + COMPONENT_DATA.length) % COMPONENT_DATA.length;
      setActiveModalComponent(COMPONENT_DATA[prevIdx]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-surface-void text-slate-100 antialiased">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <QrCode weight="bold" className="w-3.5 h-3.5" />
            <span>Official Vuforia Target Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-4">
            Optical AR Target Library
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Display any of these <strong className="text-white font-semibold">29 target markers</strong> on your computer monitor or print them on paper. Launch the <strong className="text-brand-blue font-semibold">AR-DUINO-M</strong> mobile app and point your phone camera at the screen to inspect 3D component digital twins, detailed pinouts, and hardware specifications.
          </p>

          {/* Quick Scanning Tips Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 py-2 px-4 rounded-xl bg-surface-navy/60 border border-white/10 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-brand-green font-medium">
              <CheckCircle weight="fill" className="w-4 h-4" />
              Optimal Screen Scanning Ready
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span>Click any card for isolated anti-glare scanner view</span>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="space-y-6 mb-10">
          
          {/* Search Bar & Result Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search components, pins, sensors, or drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-surface-card border border-brand-blue/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-hover transition-colors"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium px-2">
              <SlidersHorizontal weight="bold" className="w-4 h-4 text-brand-blue" />
              <span>
                Showing <strong className="text-white">{filteredComponents.length}</strong> of{" "}
                <strong className="text-white">{COMPONENT_DATA.length}</strong> targets
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All Hardware"
                  ? COMPONENT_DATA.length
                  : COMPONENT_DATA.filter((c) => c.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border",
                    isActive
                      ? "bg-brand-blue text-surface-void border-brand-blue font-bold shadow-md shadow-brand-blue/25"
                      : "bg-surface-card/90 text-slate-300 border-white/10 hover:border-brand-blue/40 hover:text-white hover:bg-surface-hover"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px]",
                      isActive ? "bg-black/20 text-surface-void font-extrabold" : "bg-white/10 text-slate-400"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 29-Card Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setActiveModalComponent(comp)}
                className="group cursor-pointer relative rounded-2xl bg-surface-card border border-brand-blue/15 hover:border-brand-blue/50 overflow-hidden shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Target Image Canvas */}
                <div className="relative w-full aspect-[4/3] bg-[#0c121d] p-4 flex items-center justify-center overflow-hidden border-b border-brand-blue/10">
                  <div className="relative w-full h-full">
                    <Image
                      src={comp.targetFile}
                      alt={comp.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Laser Scan-line on Hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_12px_#35A2F4] animate-scanline" />
                  </div>

                  {/* Top Badge: Vuforia Status */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-surface-void/90 backdrop-blur-sm border border-brand-blue/30 text-[10px] font-mono text-brand-blue font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    <span>Vuforia Target</span>
                  </div>

                  {/* Corner Target Reticles (AR aesthetic) */}
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-blue/40 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-blue/40 pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                      {comp.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                      {comp.circuitRole}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-blue group-hover:text-white transition-colors">
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {comp.targetIdentifier}
                    </span>
                    <div className="flex items-center gap-1 font-semibold">
                      <span>Inspect</span>
                      <Eye weight="bold" className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-4 rounded-3xl bg-surface-card/50 border border-brand-blue/15 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-navy border border-brand-blue/30 flex items-center justify-center mx-auto text-slate-400">
              <MagnifyingGlass weight="bold" className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white">
              No matching targets found
            </h3>
            <p className="text-xs text-slate-300 font-light">
              We couldn&apos;t find any components matching &quot;{searchQuery}&quot; in {activeCategory}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Hardware");
              }}
              className="rounded-xl"
            >
              Reset All Filters
            </Button>
          </div>
        )}

      </div>

      {/* High-Definition Target Inspection Modal */}
      <Dialog
        open={!!activeModalComponent}
        onOpenChange={(open) => !open && setActiveModalComponent(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-surface-void border border-brand-blue/30 rounded-3xl">
          {activeModalComponent && (
            <div className="flex flex-col">
              
              {/* Modal Top Navigation Bar */}
              <div className="px-6 py-4 border-b border-brand-blue/15 flex items-center justify-between bg-surface-navy/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {activeModalComponent.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {activeModalComponent.category} • Target ID:{" "}
                      <code className="text-brand-blue font-mono">{activeModalComponent.targetIdentifier}</code>
                    </span>
                  </div>
                </div>

                {/* Stepper buttons (prev/next) */}
                <div className="flex items-center gap-1.5 mr-8">
                  <button
                    type="button"
                    onClick={() => handleModalNavigate("prev")}
                    className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-hover text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Previous Component Target"
                  >
                    <CaretLeft weight="bold" className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModalNavigate("next")}
                    className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-hover text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Next Component Target"
                  >
                    <CaretRight weight="bold" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Modal Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left Side: Anti-Glare High-Contrast Optical Target Canvas */}
                <div className="lg:col-span-7 bg-[#05080E] p-8 flex flex-col items-center justify-center relative min-h-[380px] lg:min-h-[460px] border-b lg:border-b-0 lg:border-r border-brand-blue/15">
                  
                  {/* Optical Scanner Reticles (Camera alignment markers) */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-blue/60" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-brand-blue/60" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-brand-blue/60" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-blue/60" />

                  {/* Target Image Frame */}
                  <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-black/40 border border-white/10 flex items-center justify-center p-2">
                    <Image
                      src={activeModalComponent.targetFile}
                      alt={activeModalComponent.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-contain"
                      priority
                    />

                    {/* Animated Scanning Beam */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_15px_#35A2F4] animate-scanline" />
                    </div>
                  </div>

                  {/* Target Calibration Badge */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">
                    <CheckCircle weight="fill" className="w-4 h-4" />
                    <span>Calibrated for On-Screen AR Detection</span>
                  </div>
                </div>

                {/* Right Side: Component Specifications & Target Actions */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-surface-void">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-base text-white mb-1">
                        Functional Description
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {activeModalComponent.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-card border border-brand-blue/20 space-y-2">
                      <div className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">
                        Circuit Role
                      </div>
                      <p className="text-xs text-slate-200 font-medium leading-normal">
                        {activeModalComponent.circuitRole}
                      </p>
                    </div>

                    {/* Technical Specifications */}
                    {activeModalComponent.specs && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Hardware Specifications
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {activeModalComponent.specs.operatingVoltage && (
                            <div className="p-2 rounded-lg bg-surface-navy/70 border border-white/5">
                              <span className="text-[10px] text-slate-400 block">Voltage</span>
                              <span className="font-mono text-white font-medium">
                                {activeModalComponent.specs.operatingVoltage}
                              </span>
                            </div>
                          )}
                          {activeModalComponent.specs.interface && (
                            <div className="p-2 rounded-lg bg-surface-navy/70 border border-white/5">
                              <span className="text-[10px] text-slate-400 block">Interface</span>
                              <span className="font-mono text-white font-medium truncate block">
                                {activeModalComponent.specs.interface}
                              </span>
                            </div>
                          )}
                          {activeModalComponent.specs.pinCount && (
                            <div className="p-2 rounded-lg bg-surface-navy/70 border border-white/5 col-span-2">
                              <span className="text-[10px] text-slate-400 block">Pin Count / Channels</span>
                              <span className="font-mono text-white font-medium">
                                {activeModalComponent.specs.pinCount}
                              </span>
                            </div>
                          )}
                        </div>

                        {activeModalComponent.specs.features && (
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {activeModalComponent.specs.features.map((feat) => (
                              <span
                                key={feat}
                                className="px-2 py-0.5 rounded bg-surface-card border border-white/10 text-[10px] text-slate-300 font-medium"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions: Download Target & Full Screen */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <Button
                      asChild
                      variant="default"
                      className="w-full justify-center rounded-xl font-bold h-11"
                    >
                      <a
                        href={activeModalComponent.targetFile}
                        download={`${activeModalComponent.targetIdentifier}.jpg`}
                      >
                        <DownloadSimple weight="bold" className="w-4 h-4" />
                        <span>Download High-Res JPG Target</span>
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center rounded-xl font-semibold h-11 text-xs"
                    >
                      <a
                        href={activeModalComponent.targetFile}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowSquareOut weight="bold" className="w-4 h-4" />
                        <span>Open Full Screen in New Tab</span>
                      </a>
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading AR Target Catalog...</div>}>
      <ComponentsContent />
    </Suspense>
  );
}
