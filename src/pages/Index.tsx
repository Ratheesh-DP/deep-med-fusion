import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ResearchOverview from "@/components/ResearchOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ResearchOverview />
    </div>
  );
};

export default Index;
