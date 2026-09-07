"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  DownloadSimple,
  CheckCircle,
  AndroidLogo,
  ShieldCheck,
  DeviceMobileCamera,
  Sparkle,
  ArrowSquareOut,
  Question,
  Cpu,
  BookOpen,
  ArrowLeft,
  WarningCircle,
  Lightning
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { APK_CONFIG } from "@/lib/download-config";

export default function DownloadPage() {
  const [countdown, setCountdown] = useState(3);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const hasTriggeredRef = useRef(false);

  const triggerDirectDownload = () => {
    setDownloadTriggered(true);
    // Open download URL
    const a = document.createElement("a");
    a.href = APK_CONFIG.downloadUrl;
    a.download = APK_CONFIG.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      triggerDirectDownload();
    }
  }, [countdown]);

  return (
    <div className="relative min-h-screen py-16 sm:py-24 overflow-hidden isolate">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-blue/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Back navigation link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Download Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-surface-card/90 via-surface-navy/80 to-surface-void/90 border border-brand-blue/30 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden text-center space-y-8">
          
          {/* Glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider">
            <AndroidLogo weight="fill" className="w-4 h-4 text-brand-green" />
            <span>Official Android APK Build</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Downloading AR-DUINO-M
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
              Experience the hands-on augmented reality microcontroller laboratory directly on your Android phone.
            </p>
          </div>

          {/* Auto-download progress status box */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-surface-void/80 border border-white/10 space-y-3">
            {countdown > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-2">
                    <Lightning weight="fill" className="w-4 h-4 text-brand-orange animate-pulse" />
                    Preparing your APK download...
                  </span>
                  <span className="font-mono text-brand-blue font-bold">Starts in {countdown}s</span>
                </div>
                <div className="h-2 w-full bg-surface-navy rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-green">
                <CheckCircle weight="fill" className="w-5 h-5 text-brand-green animate-pulse" />
                <span>Download initiated! Check your browser downloads.</span>
              </div>
            )}
          </div>

          {/* Direct Manual Download Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              variant="default"
              onClick={triggerDirectDownload}
              className="w-full sm:w-auto rounded-2xl h-14 px-8 font-bold text-base shadow-xl shadow-brand-blue/25 flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <DownloadSimple weight="bold" className="w-5 h-5" />
              <span>{downloadTriggered ? "Download Again" : "Download APK Now"} ({APK_CONFIG.fileSizeDisplay})</span>
            </Button>

            <Link
              href={APK_CONFIG.releasePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold transition-all hover:border-white/30"
            >
              <span>GitHub Release v{APK_CONFIG.version}</span>
              <ArrowSquareOut weight="bold" className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Quick Specs Strip */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-void/60 border border-white/5">
              <ShieldCheck weight="bold" className="w-4 h-4 text-brand-green" />
              Verified APK
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-void/60 border border-white/5">
              <Sparkle weight="bold" className="w-4 h-4 text-brand-blue" />
              v{APK_CONFIG.version}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-void/60 border border-white/5">
              <DeviceMobileCamera weight="bold" className="w-4 h-4 text-brand-orange" />
              {APK_CONFIG.minAndroidVersion}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-void/60 border border-white/5">
              {APK_CONFIG.fileSizeDisplay}
            </span>
          </div>

        </div>

        {/* 4-Step Android Installation Guide */}
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              How to Install on Android
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Because AR-DUINO-M is distributed directly without the Play Store, follow these standard sideloading steps:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-surface-card/60 border border-brand-blue/20 space-y-3 relative overflow-hidden group hover:border-brand-blue/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-brand-blue/15 text-brand-blue flex items-center justify-center font-bold text-sm font-mono border border-brand-blue/30">
                1
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Download APK
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Save <code className="text-brand-blue font-mono">{APK_CONFIG.fileName}</code> ({APK_CONFIG.fileSizeDisplay}) to your Android device storage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-surface-card/60 border border-brand-purple/20 space-y-3 relative overflow-hidden group hover:border-brand-purple/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-brand-purple/15 text-brand-purple flex items-center justify-center font-bold text-sm font-mono border border-brand-purple/30">
                2
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Allow Unknown Apps
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                If prompted with <em>&quot;File might be harmful&quot;</em>, select <strong>Download anyway</strong>. In settings, allow browser installs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-surface-card/60 border border-brand-green/20 space-y-3 relative overflow-hidden group hover:border-brand-green/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-brand-green/15 text-brand-green flex items-center justify-center font-bold text-sm font-mono border border-brand-green/30">
                3
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Install & Open
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Tap the completed download notification or open in Files app, then tap <strong>Install</strong>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-surface-card/60 border border-brand-orange/20 space-y-3 relative overflow-hidden group hover:border-brand-orange/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold text-sm font-mono border border-brand-orange/30">
                4
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Grant Camera Access
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Allow camera permissions on first launch so Vuforia AR can track printed or screen-displayed image targets.
              </p>
            </div>

          </div>
        </div>

        {/* Security & Troubleshooting Notice */}
        <div className="p-6 rounded-2xl bg-surface-void border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/25 text-brand-orange flex items-center justify-center flex-shrink-0">
            <WarningCircle weight="bold" className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Google Play Protect Notice
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Play Protect may display a prompt stating <em>&quot;Unrecognized app&quot;</em> because the APK is distributed outside Google Play. Tap <strong>More details</strong> then <strong>Install anyway</strong> to proceed safely.
            </p>
          </div>
        </div>

        {/* Post-Download Next Steps */}
        <div className="p-8 rounded-3xl bg-surface-card/40 border border-white/10 space-y-6 text-center sm:text-left">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
              Ready to experiment?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              While the APK installs, explore the target library or interactive tutorials:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components"
              className="p-5 rounded-2xl bg-surface-void/70 border border-brand-blue/20 hover:border-brand-blue/50 transition-all flex items-center gap-4 group text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/15 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Cpu weight="bold" className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white group-hover:text-brand-blue transition-colors">
                  Circuit Target Library
                </div>
                <div className="text-xs text-slate-400 font-light">
                  View and print high-res tracking markers to spawn 3D components.
                </div>
              </div>
            </Link>

            <Link
              href="/tutorials"
              className="p-5 rounded-2xl bg-surface-void/70 border border-brand-purple/20 hover:border-brand-purple/50 transition-all flex items-center gap-4 group text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/15 text-brand-purple flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen weight="bold" className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white group-hover:text-brand-purple transition-colors">
                  Interactive Tutorials
                </div>
                <div className="text-xs text-slate-400 font-light">
                  Follow 4 guided projects with schematics, wiring, and Arduino code.
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
