import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-medical-ai.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            Published Research • 2024
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Hybrid Deep Learning
            </span>
            <br />
            <span className="text-foreground">
              for Medical Imaging
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive evaluation of CNN, ViT, and hybrid architectures achieving{" "}
            <span className="text-primary font-semibold">98-99% accuracy</span> in cancer 
            classification across brain MRI, dermoscopic, and cytology imaging.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-2">98.4%</div>
              <div className="text-sm text-muted-foreground">Brain Tumor Detection</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-2">98.0%</div>
              <div className="text-sm text-muted-foreground">Skin Cancer Classification</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-2">99.0%</div>
              <div className="text-sm text-muted-foreground">Cervical Cancer Analysis</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="premium" size="lg" className="text-lg px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download Paper
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" size="lg" className="text-lg px-8 py-4">
              <ExternalLink className="mr-2 h-5 w-5" />
              GitHub Repository
            </Button>
          </div>

          {/* Research Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Deep Learning Architectures</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Medical Imaging Modalities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Novel Hybrid Architecture</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Reproducible Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/30 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-primary-glow/50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;