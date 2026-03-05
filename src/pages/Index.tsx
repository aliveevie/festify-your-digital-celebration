import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FestifyBotSection } from "@/components/FestifyBotSection";
import { GallerySection } from "@/components/GallerySection";
import { AvatarShowcase } from "@/components/AvatarShowcase";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FestifyBotSection />
        <GallerySection />
        <AvatarShowcase />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
