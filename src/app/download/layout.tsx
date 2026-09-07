import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download AR-DUINO-M APK (v1.0.0) | Official Android Application",
  description:
    "Download the official AR-DUINO-M Android APK (123 MB). Install the augmented reality microcontroller circuit laboratory on your Android phone.",
  openGraph: {
    title: "Download AR-DUINO-M APK (v1.0.0)",
    description:
      "Official Android APK for interactive 3D augmented reality microcontroller learning with Vuforia tracking.",
    url: "https://ar-duino-m.vercel.app/download",
    images: [
      {
        url: "/Logo Main.png",
        width: 512,
        height: 512,
        alt: "AR-DUINO-M Logo",
      },
    ],
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
