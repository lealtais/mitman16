import HeroSection from "@/components/HeroSection";
import TheDreamSection from "@/components/TheDreamSection";
import DynamicDuoSection from "@/components/DynamicDuoSection";
import StatsFooter from "@/components/StatsFooter";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TheDreamSection />
      <DynamicDuoSection />
      <StatsFooter />
    </main>
  );
};

export default Index;
