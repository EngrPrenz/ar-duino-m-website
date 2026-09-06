"use client";

import React, { useState } from "react";
import { 
  EnvelopeSimple, 
  Copy, 
  Check, 
  PaperPlaneTilt, 
  ChatCircleText, 
  Sparkle 
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "markyisulat@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#162133] border-t border-brand-blue/15 overflow-hidden isolate z-10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
          <ChatCircleText weight="fill" className="w-3.5 h-3.5" />
          <span>Support & Feedback</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-4">
          Have Inquiries or Feedback?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Whether you are an educator evaluating AR-DUINO-M for your laboratory classes, a student with feature ideas, or reporting an issue, we welcome your feedback.
        </p>

        {/* Interactive Email Box */}
        <div className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-surface-card border border-brand-blue/25 shadow-xl shadow-black/40 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
            <span>Primary Developer Email</span>
            <span className="text-brand-green font-semibold">Active Inquiries</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-void border border-brand-blue/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-mono font-medium text-white truncate">
              <EnvelopeSimple weight="bold" className="w-5 h-5 text-brand-blue flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-lg bg-surface-card hover:bg-surface-hover text-slate-300 hover:text-white transition-colors flex-shrink-0"
              title="Copy Email Address"
            >
              {copied ? (
                <Check weight="bold" className="w-4 h-4 text-brand-green" />
              ) : (
                <Copy weight="bold" className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              asChild
              variant="default"
              className="flex-1 rounded-xl h-11 font-bold text-sm"
            >
              <a href={`mailto:${email}?subject=AR-DUINO-M%20Inquiry%20or%20Feedback`}>
                <PaperPlaneTilt weight="bold" className="w-4 h-4" />
                <span>Open Mail Client</span>
              </a>
            </Button>

            <Button
              variant="outline"
              onClick={handleCopy}
              className="rounded-xl h-11 font-semibold text-sm px-4"
            >
              {copied ? "Copied!" : "Copy Address"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
