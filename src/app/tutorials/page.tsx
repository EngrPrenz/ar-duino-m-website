"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Play, 
  Code, 
  ListChecks, 
  Clock, 
  Check, 
  Copy, 
  Sparkle, 
  VideoCamera, 
  Cpu, 
  ArrowRight, 
  CheckSquare, 
  Square,
  MagnifyingGlass,
  X,
  CaretRight,
  ShieldCheck,
  Lightning,
  YoutubeLogo,
  ArrowSquareOut
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TUTORIALS_DATA, ProjectTutorial } from "@/data/tutorials";
import { cn } from "@/lib/utils";

function TutorialsContent() {
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("project");

  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<ProjectTutorial | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<string>("video");
  const [codeCopied, setCodeCopied] = useState(false);
  const [checkedHardware, setCheckedHardware] = useState<Record<string, boolean>>({});

  // Auto-open project if query param exists
  React.useEffect(() => {
    if (selectedParam) {
      const found = TUTORIALS_DATA.find((p) => p.id === selectedParam);
      if (found) {
        setActiveModalProject(found);
      }
    }
  }, [selectedParam]);

  // Filter projects by difficulty and search
  const filteredProjects = useMemo(() => {
    return TUTORIALS_DATA.filter((proj) => {
      const matchesDiff =
        activeDifficulty === "All" || proj.difficulty === activeDifficulty;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q) ||
        proj.conceptualGoal.toLowerCase().includes(q) ||
        proj.hardware.some((h) => h.name.toLowerCase().includes(q));

      return matchesDiff && matchesSearch;
    });
  }, [activeDifficulty, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  const toggleHardwareCheck = (itemName: string) => {
    setCheckedHardware((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-surface-void text-slate-100 antialiased">
      {/* Ambient Lighting */}
      <div className="absolute top-20 right-1/4 w-[700px] h-[400px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <VideoCamera weight="bold" className="w-3.5 h-3.5" />
            <span>Interactive Laboratory Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-4">
            Video Tutorials & Projects
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Master embedded systems and robotics from first principles. Each project includes step-by-step assembly guides, interactive bills of materials, and production-tested Arduino C++ source code.
          </p>

          {/* Curriculum Stats Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8">
            <div className="p-3 rounded-xl bg-surface-card border border-brand-blue/20 text-center">
              <span className="text-xl font-black font-heading text-white">4</span>
              <span className="text-[11px] text-slate-400 block">Total Projects</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-card border border-brand-blue/20 text-center">
              <span className="text-xl font-black font-heading text-brand-blue">1 Easy</span>
              <span className="text-[11px] text-slate-400 block">Digital Logic</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-card border border-brand-purple/20 text-center">
              <span className="text-xl font-black font-heading text-brand-purple">2 Medium</span>
              <span className="text-[11px] text-slate-400 block">ADC & Arrays</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-card border border-brand-orange/20 text-center">
              <span className="text-xl font-black font-heading text-brand-orange">1 Hard</span>
              <span className="text-[11px] text-slate-400 block">L298N Robotics</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-card border border-brand-blue/15 w-fit">
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setActiveDifficulty(diff)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200",
                  activeDifficulty === diff
                    ? "bg-brand-blue text-surface-void font-bold shadow-md shadow-brand-blue/25"
                    : "text-slate-300 hover:text-white hover:bg-surface-hover"
                )}
              >
                {diff === "All" ? "All Levels" : diff}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-sm w-full">
            <MagnifyingGlass
              weight="bold"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by topic or hardware component..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-surface-card border border-brand-blue/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white"
              >
                <X weight="bold" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Interactive Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isEasy = project.difficulty === "Easy";
            const isMed = project.difficulty === "Medium";
            const isHard = project.difficulty === "Hard";

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-surface-card border border-brand-blue/20 hover:border-brand-blue/50 overflow-hidden shadow-2xl shadow-black/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Project Header & Thumbnail */}
                <div>
                  <div className="relative w-full aspect-video bg-black/60 overflow-hidden border-b border-white/10">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                    />

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Difficulty, Duration and Video Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10 flex-wrap">
                      <Badge
                        variant={
                          isEasy ? "easy" : isMed ? "medium" : "hard"
                        }
                        className="text-xs uppercase tracking-wider backdrop-blur-md shadow-md"
                      >
                        {project.difficulty}
                      </Badge>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-void/80 backdrop-blur-md text-slate-200 border border-white/10">
                        <Clock weight="bold" className="w-3.5 h-3.5 text-brand-blue" />
                        {project.duration}
                      </span>
                      {project.youtubeId && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-600/90 text-white backdrop-blur-md border border-red-500/30 shadow-md">
                          <YoutubeLogo weight="fill" className="w-3.5 h-3.5 text-white" />
                          Video Tutorial
                        </span>
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalProject(project);
                        setActiveModalTab("video");
                      }}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-brand-blue/90 hover:bg-brand-blue text-surface-void flex items-center justify-center shadow-xl shadow-brand-blue/40 transform transition-transform group-hover:scale-110 z-10"
                      aria-label="Open Project Video"
                    >
                      <Play weight="fill" className="w-6 h-6 ml-0.5" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-heading font-extrabold text-2xl text-white group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {project.summary}
                    </p>

                    {/* Conceptual Goal Box */}
                    <div className="p-3.5 rounded-2xl bg-surface-navy/70 border border-brand-blue/15 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                        <Sparkle weight="fill" className="w-3.5 h-3.5" />
                        <span>Core Learning Concept</span>
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {project.conceptualGoal}
                      </p>
                    </div>

                    {/* Hardware Tags Preview */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-medium mr-1">
                        Requires:
                      </span>
                      {project.hardware.slice(0, 4).map((h) => (
                        <span
                          key={h.name}
                          className="px-2.5 py-1 rounded-lg bg-surface-void border border-white/10 text-[11px] text-slate-300 font-medium"
                        >
                          {h.name}
                        </span>
                      ))}
                      {project.hardware.length > 4 && (
                        <span className="text-[11px] text-slate-400">
                          +{project.hardware.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 sm:p-7 pt-0 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      setActiveModalProject(project);
                      setActiveModalTab("video");
                    }}
                    className="w-full sm:flex-1 rounded-xl font-bold h-11"
                  >
                    <Play weight="bold" className="w-4 h-4" />
                    <span>Watch Video & Guide</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveModalProject(project);
                      setActiveModalTab("code");
                    }}
                    className="w-full sm:flex-1 rounded-xl font-semibold h-11 text-xs"
                  >
                    <Code weight="bold" className="w-4 h-4 text-brand-blue" />
                    <span>View Arduino Code</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Comprehensive Multi-Tab Project Detail Modal */}
      <Dialog
        open={!!activeModalProject}
        onOpenChange={(open) => !open && setActiveModalProject(null)}
      >
        <DialogContent className="max-w-4xl p-6 bg-surface-void border border-brand-blue/30 rounded-3xl">
          {activeModalProject && (
            <div className="space-y-6">
              
              {/* Modal Header */}
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      activeModalProject.difficulty === "Easy"
                        ? "easy"
                        : activeModalProject.difficulty === "Medium"
                        ? "medium"
                        : "hard"
                    }
                  >
                    {activeModalProject.difficulty}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock weight="bold" className="w-3.5 h-3.5 text-brand-blue" />
                    {activeModalProject.duration}
                  </span>
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-heading font-black text-white">
                  {activeModalProject.title}
                </DialogTitle>

                <DialogDescription className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeModalProject.conceptualGoal}
                </DialogDescription>
              </DialogHeader>

              {/* Navigation Tabs */}
              <Tabs
                value={activeModalTab}
                onValueChange={setActiveModalTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 w-full h-11 bg-surface-card border border-brand-blue/20">
                  <TabsTrigger value="video" className="text-xs font-bold gap-1.5">
                    <Play weight="bold" className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Video Tutorial</span>
                    <span className="sm:hidden">Video</span>
                  </TabsTrigger>
                  <TabsTrigger value="hardware" className="text-xs font-bold gap-1.5">
                    <ListChecks weight="bold" className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hardware Bill</span>
                    <span className="sm:hidden">Parts</span>
                  </TabsTrigger>
                  <TabsTrigger value="steps" className="text-xs font-bold gap-1.5">
                    <Sparkle weight="bold" className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Circuit Steps</span>
                    <span className="sm:hidden">Steps</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="text-xs font-bold gap-1.5">
                    <Code weight="bold" className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Arduino C++</span>
                    <span className="sm:hidden">Code</span>
                  </TabsTrigger>
                </TabsList>

                {/* TAB 1: Video Tutorial */}
                <TabsContent value="video" className="space-y-4 pt-4">
                  {activeModalProject.youtubeId ? (
                    <div className="space-y-4">
                      {/* Responsive YouTube Player */}
                      <div className="relative w-full aspect-video rounded-2xl bg-black border border-brand-blue/30 overflow-hidden shadow-2xl shadow-brand-blue/10">
                        {activeModalTab === "video" && (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${activeModalProject.youtubeId}?autoplay=1&rel=0`}
                            title={activeModalProject.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        )}
                      </div>

                      {/* Video Info and External Link Bar */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-card border border-brand-blue/20">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
                              <YoutubeLogo weight="fill" className="w-3.5 h-3.5 text-red-500" />
                              Official YouTube Tutorial
                            </span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-300 font-mono">
                              {activeModalProject.duration}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-light">
                            Official step-by-step physical circuit build, pinouts, and code verification for <strong className="text-white">{activeModalProject.title}</strong>.
                          </p>
                        </div>

                        <a
                          href={`https://youtu.be/${activeModalProject.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <YoutubeLogo weight="fill" className="w-4 h-4" />
                          <span>Watch on YouTube</span>
                          <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* App Advantage Notice */}
                      <div className="p-3.5 rounded-xl bg-surface-card/90 border border-brand-blue/30 text-xs text-brand-blue text-left space-y-1">
                        <span className="font-bold flex items-center gap-1.5 text-white">
                          <Lightning weight="fill" className="w-4 h-4 text-brand-orange" />
                          AR-DUINO-M App Companion:
                        </span>
                        <p className="text-slate-300 font-light text-[11px]">
                          Follow along with this video tutorial while using the AR-DUINO-M Android app to view animated 3D electrical flow, check pin assignments in Augmented Reality, and debug simulated breadboard connections.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video rounded-2xl bg-black border border-brand-blue/30 overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                      {/* Background screenshot watermark */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <Image
                          src={activeModalProject.thumbnail}
                          alt="Video Preview"
                          fill
                          className="object-cover blur-sm"
                        />
                      </div>

                      <div className="relative z-10 max-w-md space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-500 shadow-xl shadow-red-500/20">
                          <YoutubeLogo weight="fill" className="w-10 h-10" />
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-heading font-black text-xl text-white">
                            YouTube Video Tutorial Coming Soon
                          </h4>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            Official narrated demonstration and oscilloscope testing for <strong className="text-white">{activeModalProject.title}</strong> is in final post-production.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-surface-card/90 border border-brand-blue/30 text-xs text-brand-blue text-left space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-white">
                            <Lightning weight="fill" className="w-4 h-4 text-brand-orange" />
                            AR-DUINO-M App Advantage:
                          </span>
                          <p className="text-slate-300 font-light text-[11px]">
                            You don&apos;t need to wait for video playback! Open the AR-DUINO-M Android app and choose this project to experience full 360° interactive step-by-step 3D wiring immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* TAB 2: Hardware Checklist with Interactive Checkboxes */}
                <TabsContent value="hardware" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-semibold text-slate-400">
                      Check off components as you gather them for your bench:
                    </span>
                    <span className="text-xs font-mono text-brand-green">
                      {Object.values(checkedHardware).filter(Boolean).length} / {activeModalProject.hardware.length} Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.hardware.map((item) => {
                      const isChecked = !!checkedHardware[item.name];
                      return (
                        <div
                          key={item.name}
                          onClick={() => toggleHardwareCheck(item.name)}
                          className={cn(
                            "cursor-pointer p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3",
                            isChecked
                              ? "bg-brand-green/10 border-brand-green/40 text-white"
                              : "bg-surface-card/80 border-white/10 text-slate-300 hover:border-brand-blue/40"
                          )}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className={cn("text-xs font-bold font-heading", isChecked && "line-through text-brand-green")}>
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-navy border border-white/10 text-brand-orange">
                                x{item.count}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-slate-400 font-light leading-snug">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex-shrink-0 pt-0.5">
                            {isChecked ? (
                              <CheckSquare weight="fill" className="w-5 h-5 text-brand-green" />
                            ) : (
                              <Square weight="regular" className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-surface-navy/60 border border-brand-blue/20 flex items-center justify-between text-xs text-slate-300">
                    <span>Missing physical hardware?</span>
                    <Link
                      href="/components"
                      className="text-brand-blue font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Scan 3D Targets in AR instead</span>
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </TabsContent>

                {/* TAB 3: Step-by-Step Circuit Assembly */}
                <TabsContent value="steps" className="space-y-4 pt-4">
                  <div className="space-y-3">
                    {activeModalProject.steps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-4 rounded-2xl bg-surface-card/90 border border-brand-blue/15 space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-brand-blue text-surface-void font-black text-xs flex items-center justify-center flex-shrink-0">
                            {step.stepNumber}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-white">
                            {step.title}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-light pl-10">
                          {step.instruction}
                        </p>

                        {step.tip && (
                          <div className="ml-10 p-2.5 rounded-lg bg-surface-navy border border-brand-orange/25 text-[11px] text-brand-orange flex items-start gap-2">
                            <span className="font-bold">PRO TIP:</span>
                            <span className="text-slate-300 font-light">{step.tip}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* TAB 4: Full Arduino C++ Source Code */}
                <TabsContent value="code" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Language: Arduino C++ (.ino)
                    </span>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleCopyCode(activeModalProject.code)}
                      className="h-8 text-xs rounded-lg font-bold gap-1.5"
                    >
                      {codeCopied ? (
                        <>
                          <Check weight="bold" className="w-3.5 h-3.5" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy weight="bold" className="w-3.5 h-3.5" />
                          <span>Copy Sketch</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Code Container */}
                  <div className="relative rounded-2xl bg-[#090D15] border border-brand-blue/30 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[350px]">
                    <pre className="leading-relaxed">
                      <code>{activeModalProject.code}</code>
                    </pre>
                  </div>

                  {/* Code Explanation */}
                  <div className="p-3.5 rounded-xl bg-surface-card border border-brand-purple/20 space-y-1">
                    <div className="text-[11px] font-bold text-brand-purple uppercase tracking-wider">
                      How this code works:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {activeModalProject.codeExplanation}
                    </p>
                  </div>
                </TabsContent>

              </Tabs>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TutorialsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading Tutorials Portal...</div>}>
      <TutorialsContent />
    </Suspense>
  );
}
