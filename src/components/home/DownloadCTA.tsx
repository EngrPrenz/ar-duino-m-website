"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  DownloadSimple, 
  QrCode, 
  ShieldCheck, 
  AndroidLogo, 
  Check, 
  Sparkle,
  DeviceMobileCamera,
  Info
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function DownloadCTA() {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    setDownloadStarted(true);
    // In production, user will replace with actual hosted APK file link
    // For now we trigger download of /AR-DUINO.apk or notify user
    const link = document.createElement("a");
    link.href = "/AR-DUINO.apk";
    link.download = "AR-DUINO-M.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadStarted(false), 4000);
  };

  return (
    <section id="download" className="relative py-24 sm:py-32 bg-[#0E1724] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-surface-card via-surface-navy to-surface-void border border-brand-blue/30 shadow-2xl shadow-black/80 relative overflow-hidden">
          
          {/* Subtle top ambient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Download Info & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider">
                <AndroidLogo weight="fill" className="w-4 h-4 text-brand-green" />
                <span>Android Exclusive Application</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight">
                Download AR-DUINO-M APK
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Get immediate access to the interactive 3D circuit simulation app. Point your camera at any computer screen or paper printout to start building microcontroller circuits without burning components.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-surface-void/90 text-brand-blue border border-brand-blue/25">
                  <ShieldCheck weight="bold" className="w-4 h-4 text-brand-green" />
                  Verified Safe APK
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-surface-void/90 text-slate-200 border border-white/10">
                  <DeviceMobileCamera weight="bold" className="w-4 h-4 text-brand-orange" />
                  Android 8.0+ Compatible
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-surface-void/90 text-brand-green border border-brand-green/25">
                  <Sparkle weight="bold" className="w-4 h-4" />
                  100% Free & Open
                </span>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  size="lg"
                  variant="default"
                  onClick={handleDownload}
                  className="rounded-2xl h-14 px-8 font-bold text-base shadow-xl shadow-brand-blue/30 flex items-center justify-center gap-3"
                >
                  {downloadStarted ? (
                    <>
                      <Check weight="bold" className="w-5 h-5 text-surface-void animate-bounce" />
                      <span>Downloading APK...</span>
                    </>
                  ) : (
                    <>
                      <DownloadSimple weight="bold" className="w-5 h-5" />
                      <span>Download Android APK</span>
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium px-2">
                  <Info weight="bold" className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Size: ~65 MB • Requires Camera Permission for Vuforia</span>
                </div>
              </div>

              {/* 4-Step Quick Install Guidance */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-brand-blue">1. Download</div>
                  <div className="text-[11px] text-slate-300 font-light">Save APK to your Android device.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-brand-purple">2. Enable Install</div>
                  <div className="text-[11px] text-slate-300 font-light">Allow install from browser if asked.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-brand-green">3. Open App</div>
                  <div className="text-[11px] text-slate-300 font-light">Launch & grant camera access.</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-brand-orange">4. Aim & Spawn</div>
                  <div className="text-[11px] text-slate-300 font-light">Scan targets on this site!</div>
                </div>
              </div>

            </div>

            {/* Right Column: Scannable QR Code Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-surface-void border-2 border-brand-blue/40 shadow-2xl shadow-brand-blue/20 text-center max-w-xs w-full group">
                
                {/* Glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-[2rem] opacity-30 blur-lg group-hover:opacity-60 transition duration-500 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-white font-heading uppercase tracking-wider">
                      Mobile Quick Scan
                    </span>
                    <span className="px-2 py-0.5 rounded bg-brand-green/15 text-brand-green text-[10px] font-bold">
                      Direct APK
                    </span>
                  </div>

                  {/* QR Image Box */}
                  <div className="relative w-52 h-52 mx-auto rounded-2xl bg-white p-3 shadow-inner flex items-center justify-center">
                    <Image
                      src="/ar-duino-qr.png"
                      alt="AR-DUINO-M Download QR Code"
                      fill
                      sizes="208px"
                      className="object-contain p-2"
                      priority
                    />
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Open your smartphone camera and point at this QR code to download the APK directly onto your phone.
                  </p>

                  <div className="text-[10px] font-mono text-slate-400 bg-surface-navy/90 py-1.5 px-3 rounded-lg border border-white/5 truncate">
                    AR-DUINO-M.apk • v1.0.0
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
