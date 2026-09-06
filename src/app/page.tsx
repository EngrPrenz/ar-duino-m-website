import { CinematicHero } from "@/components/home/CinematicHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { ComponentsPreview } from "@/components/home/ComponentsPreview";
import { DownloadCTA } from "@/components/home/DownloadCTA";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <CinematicHero />
      <HowItWorks />
      <Features />
      <ComponentsPreview />
      <DownloadCTA />
      <ContactSection />
    </div>
  );
}
