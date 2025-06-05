import FeatureSection from "@/components/home/feature-section";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
  
  return (
    <div className="flex flex-col gap-2">
      <HeroSection />
      <FeatureSection />
    </div>
  )
}
