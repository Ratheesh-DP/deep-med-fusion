import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, Microscope, Network, Zap, Target } from "lucide-react";

const ResearchOverview = () => {
  const architectures = [
    {
      name: "Convolutional Neural Networks",
      acronym: "CNNs",
      icon: Network,
      description: "Excellent at capturing local texture features and spatial hierarchies in medical images",
      strengths: ["Local feature extraction", "Translation invariance", "Proven medical imaging performance"],
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      name: "Vision Transformers",
      acronym: "ViTs", 
      icon: Eye,
      description: "Superior at modeling global spatial relationships and long-range dependencies",
      strengths: ["Global context modeling", "Attention mechanisms", "Sequence processing"],
      color: "bg-green-500/10 text-green-600"
    },
    {
      name: "Hybrid ViT-CNN",
      acronym: "HViT-CNN",
      icon: Zap,
      description: "Novel architecture combining CNN backbones with transformer attention mechanisms",
      strengths: ["Best of both worlds", "Localized + global features", "Superior performance"],
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  const modalities = [
    {
      name: "Brain MRI",
      icon: Brain,
      description: "Magnetic resonance imaging for brain tumor detection and classification",
      accuracy: "98.4%",
      details: "T1-weighted, T2-weighted, and FLAIR sequences for comprehensive brain tumor analysis"
    },
    {
      name: "Dermoscopic Images",
      icon: Target,
      description: "High-resolution skin imaging for melanoma and skin cancer detection",
      accuracy: "98.0%", 
      details: "Dermoscopy images with various lighting conditions and magnifications"
    },
    {
      name: "Cytology Slides",
      icon: Microscope,
      description: "Microscopic cellular imaging for cervical cancer screening",
      accuracy: "99.0%",
      details: "Pap smear cytology slides with cellular morphology analysis"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Research Overview</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Deep Learning Architectures for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Medical Imaging
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive comparison of state-of-the-art deep learning approaches 
            for automated cancer diagnosis across multiple imaging modalities.
          </p>
        </div>

        {/* Architectures */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Neural Network Architectures</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architectures.map((arch, index) => {
              const Icon = arch.icon;
              return (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${arch.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">
                      {arch.name}
                      <Badge variant="outline" className="ml-2">{arch.acronym}</Badge>
                    </CardTitle>
                    <CardDescription>{arch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Strengths:</h4>
                      <ul className="space-y-1">
                        {arch.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Medical Imaging Modalities */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Medical Imaging Modalities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modalities.map((modality, index) => {
              const Icon = modality.icon;
              return (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {modality.accuracy}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{modality.name}</CardTitle>
                    <CardDescription>{modality.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{modality.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Research Impact */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-white border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6">Research Impact</h3>
              <p className="text-xl opacity-90 mb-8">
                Our hybrid architecture demonstrates consistent superior performance across 
                all medical imaging modalities, advancing the state-of-the-art in 
                computer-aided diagnosis.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">3</div>
                  <div className="text-sm opacity-80">Cancer Types</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">98.8%</div>
                  <div className="text-sm opacity-80">Average Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-80">Reproducible</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResearchOverview;