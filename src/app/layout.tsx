import type { Metadata } from "next";
import { outfit, inter, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ar-duino-m.vercel.app"),
  title: "AR-DUINO-M | Augmented Reality Microcontroller Platform",
  description:
    "Augmented Reality Driven User Interface for Interactive Prototyping and Learning Microcontroller Electronics. Learn electronics, circuit wiring, and Arduino code with interactive 3D digital twins and Vuforia AR tracking.",
  keywords: [
    "AR-DUINO-M",
    "Arduino",
    "Augmented Reality",
    "Vuforia",
    "Circuit Simulation",
    "Robotics",
    "STEM Education",
    "Microcontroller",
    "Android APK"
  ],
  authors: [{ name: "Marky Isulat" }],
  icons: {
    icon: "/Logo Main.png",
    shortcut: "/Logo Main.png",
    apple: "/Logo Main.png",
  },
  openGraph: {
    title: "AR-DUINO-M — Augmented Reality Microcontroller Platform",
    description:
      "Interactive 3D digital twins and AR reference cards for electronics prototyping without hardware damage risks.",
    url: "https://ar-duino-m.vercel.app",
    siteName: "AR-DUINO-M",
    images: [
      {
        url: "/Logo Main.png",
        width: 512,
        height: 512,
        alt: "AR-DUINO-M Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-surface-void text-slate-100 font-body antialiased selection:bg-brand-blue/30 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
