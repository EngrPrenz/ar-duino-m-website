"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, DownloadSimple, Sparkle, ArrowRight, VideoCamera, Bookmarks } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background blur trigger
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / show on scroll direction
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (pathname === "/presentation") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Vuforia Library", href: "/components" },
    { name: "Video Tutorials", href: "/tutorials" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 transition-all duration-300 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl transition-all duration-300 border",
            isScrolled
              ? "bg-surface-void/85 backdrop-blur-xl border-brand-blue/25 shadow-xl shadow-black/40"
              : "bg-surface-navy/70 backdrop-blur-md border-white/10 shadow-lg"
          )}
        >
          {/* Logo & Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden p-1.5 bg-brand-blue/10 border border-brand-blue/30 group-hover:border-brand-blue/70 transition-all duration-300">
              <Image
                src="/Logo Main.png"
                alt="AR-DUINO-M Logo"
                fill
                sizes="40px"
                className="object-contain filter drop-shadow-[0_0_8px_rgba(53,162,244,0.6)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-blue transition-colors">
                  AR-DUINO<span className="text-brand-blue">-M</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-green/15 text-brand-green border border-brand-green/30 hidden sm:inline-flex">
                  AR APP
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden md:inline-block -mt-1">
                Virtual Microcontrollers
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-brand-blue bg-brand-blue/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-surface-hover/80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              asChild
              variant="default"
              size="sm"
              className="rounded-xl shadow-md font-bold text-xs"
            >
              <Link href="/download" className="flex items-center gap-2">
                <DownloadSimple weight="bold" className="w-4 h-4" />
                <span>Download APK</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden p-2 rounded-xl bg-surface-card border border-brand-blue/20 text-slate-200 hover:text-white hover:border-brand-blue focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X weight="bold" className="w-6 h-6 text-brand-orange" />
            ) : (
              <List weight="bold" className="w-6 h-6 text-brand-blue" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-20 left-4 right-4 bg-surface-void border border-brand-blue/30 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in-0 zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-blue/15">
              <div className="flex items-center gap-2">
                <Sparkle weight="fill" className="text-brand-blue w-5 h-5" />
                <span className="font-heading font-bold text-white">Menu Navigation</span>
              </div>
              <span className="text-xs text-brand-green font-semibold bg-brand-green/10 px-2 py-0.5 rounded border border-brand-green/20">
                Vuforia Engine Ready
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-brand-blue/15 text-brand-blue font-bold border border-brand-blue/30"
                        : "text-slate-300 hover:bg-surface-hover hover:text-white"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowRight weight="bold" className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-brand-blue/15 space-y-2">
              <Button
                asChild
                variant="default"
                className="w-full justify-center rounded-xl py-3 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/download" className="flex items-center justify-center gap-2">
                  <DownloadSimple weight="bold" className="w-5 h-5" />
                  <span>Download AR-DUINO-M APK</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
