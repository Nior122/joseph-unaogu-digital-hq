import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { TrustSection } from "@/components/home/trust-section";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <FeaturedWork />
      <TrustSection />
      <CtaBanner />
    </>
  );
}
