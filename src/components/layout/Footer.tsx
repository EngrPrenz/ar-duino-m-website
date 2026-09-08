"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ArrowUp, 
  EnvelopeSimple, 
  Copy, 
  Check, 
  DownloadSimple, 
  Cpu, 
  Circuitry, 
  VideoCamera, 
  ShieldCheck 
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const pathname = usePathname();
  const [copied, setCopied] = React.useState(false);
  const email = "markyisulat@gmail.com";

  if (pathname === "/presentation") {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-surface-void border-t border-brand-blue/15 text-slate-400 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Summary Column */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-1.5 bg-brand-blue/10 border border-brand-blue/30">
                <Image
                  src="/Logo Main.png"
                  alt="AR-DUINO-M Logo"
                  fill
                  sizes="40px"
                  className="object-contain filter drop-shadow-[0_0_8px_rgba(53,162,244,0.5)]"
                />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                AR-DUINO<span className="text-brand-blue">-M</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Augmented Reality Driven User Interface for Interactive Prototyping and Learning Microcontroller Electronics.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-card text-brand-green border border-brand-green/30">
                <ShieldCheck weight="bold" className="w-4 h-4" />
                Android Exclusive App
              </span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-blue transition-colors">
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-brand-blue transition-colors">
                  Vuforia Target Library (29 Targets)
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-brand-blue transition-colors">
                  Video Tutorials & Projects
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-blue transition-colors">
                  5-Step How It Works
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-brand-blue transition-colors">
                  Core Capabilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick APK & Hardware Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Resources & App
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/download" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
                  <DownloadSimple weight="bold" className="w-4 h-4 text-brand-orange" />
                  Download Android APK
                </Link>
              </li>
              <li>
                <Link href="/components?category=Microcontrollers+%26+Boards" className="hover:text-brand-blue transition-colors">
                  Microcontrollers & Boards
                </Link>
              </li>
              <li>
                <Link href="/components?category=Sensors+%26+Modules" className="hover:text-brand-blue transition-colors">
                  Sensors & Detectors
                </Link>
              </li>
              <li>
                <Link href="/components?category=Motors+%26+Drivers" className="hover:text-brand-blue transition-colors">
                  Robotics & Motor Drivers
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-brand-blue transition-colors">
                  Feedback & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Developer Contact
            </h4>
            <p className="text-xs text-slate-400">
              Have questions, feedback, or school integration requests? Reach out directly:
            </p>
            <div className="p-3 rounded-xl bg-surface-card border border-brand-blue/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-200 truncate">
                <EnvelopeSimple weight="bold" className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs flex-1 rounded-lg"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check weight="bold" className="w-3.5 h-3.5 text-brand-green" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy weight="bold" className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="default"
                  className="h-8 text-xs px-3 rounded-lg"
                >
                  <a href={`mailto:${email}`}>
                    Send
                  </a>
                </Button>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-brand-blue hover:text-white transition-colors"
            >
              <ArrowUp weight="bold" className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-brand-blue/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} AR-DUINO-M Educational Platform. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed for safe, zero-cost virtual electronics and robotics education.
          </p>
        </div>
      </div>
    </footer>
  );
}
