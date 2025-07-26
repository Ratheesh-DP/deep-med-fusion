import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, BookOpen, Code, Database } from "lucide-react";

const Research = () => {
  const methodology = [
    {
      title: "Data Collection & Preprocessing",
      description: "Curated datasets from multiple medical imaging sources with standardized preprocessing pipelines",
      details: [
        "Brain MRI: BRATS dataset with T1, T2, T1CE, and FLAIR sequences",
        "Dermoscopic: ISIC 2019 dataset with 25,331 images",
        "Cytology: SIPaKMeD dataset with 4,049 Pap smear images"
      ]
    },
    {
      title: "Architecture Design",
      description: "Novel hybrid architecture combining CNN feature extraction with transformer attention",
      details: [
        "ResNet-50 backbone for local feature extraction",
        "Vision Transformer encoder for global spatial modeling",
        "Custom fusion layer for feature integration",
        "Multi-head attention for cross-modal learning"
      ]
    },
    {
      title: "Training & Validation",
      description: "Rigorous training protocol with cross-validation and performance metrics",
      details: [
        "5-fold cross-validation for robust evaluation",
        "Data augmentation with geometric and intensity transforms",
        "Adam optimizer with learning rate scheduling",
        "Early stopping and model checkpointing"
      ]
    }
  ];

  const keyContributions = [
    "Novel hybrid architecture combining CNN and Vision Transformer strengths",
    "Comprehensive evaluation across three medical imaging modalities",
    "Consistent performance improvement over individual architectures",
    "Detailed analysis of feature learning and attention mechanisms",
    "Open-source implementation with reproducible results"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Research Methodology</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Deep Learning
                </span>{" "}
                for Medical Imaging
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A comprehensive evaluation of hybrid architectures for accurate and reliable 
                cancer classification across multiple imaging modalities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="premium">
                  <Download className="mr-2 h-4 w-4" />
                  Download Paper
                </Button>
                <Button variant="outline">
                  <Code className="mr-2 h-4 w-4" />
                  View Code
                </Button>
                <Button variant="ghost">
                  <Database className="mr-2 h-4 w-4" />
                  Access Data
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Abstract */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <BookOpen className="mr-3 h-6 w-6 text-primary" />
                    Abstract
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Accurate and reliable classification of cancer from medical imaging is essential for 
                    effective computer-aided diagnosis. In this study, we conduct a comprehensive evaluation 
                    of three deep learning architectures—Convolutional Neural Networks (CNNs), Vision 
                    Transformers (ViTs), and a hybrid model (HViT-CNN) that integrates CNN backbones with 
                    transformer-based attention mechanisms. These models are benchmarked across three diverse 
                    and clinically relevant imaging modalities: brain magnetic resonance imaging (MRI), 
                    dermoscopic images for skin cancer, and cytology slides for cervical cancer.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    While CNNs demonstrate strong performance in capturing local texture features and ViTs 
                    offer advantages in modeling global spatial relationships, both architectures exhibit 
                    modality-specific limitations. The proposed HViT-CNN addresses these limitations by 
                    combining localized feature extraction with global contextual reasoning. Across all 
                    datasets, the hybrid model consistently achieved the highest classification accuracy 
                    of 98.4% for brain tumors, 98.0% for skin cancer, and 99.0% for cervical cancer—outperforming 
                    its individual components.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Contributions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Contributions</h2>
              <div className="space-y-4">
                {keyContributions.map((contribution, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground">{contribution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Research Methodology</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {methodology.map((method, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {method.details.map((detail, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Technical Implementation</h2>
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Model Architecture</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• ResNet-50 feature extractor</li>
                        <li>• 12-layer Vision Transformer</li>
                        <li>• Multi-head attention (8 heads)</li>
                        <li>• Feature fusion layer</li>
                        <li>• Classification head with dropout</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Training Configuration</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Batch size: 32</li>
                        <li>• Learning rate: 1e-4</li>
                        <li>• Epochs: 100 (early stopping)</li>
                        <li>• Optimizer: AdamW</li>
                        <li>• Loss: Cross-entropy</li>
                      </ul>
                    </div>
                  </div>
                  <Separator className="my-8" />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">98.8%</div>
                        <div className="text-sm text-muted-foreground">Average Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">0.987</div>
                        <div className="text-sm text-muted-foreground">F1-Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">0.986</div>
                        <div className="text-sm text-muted-foreground">Precision</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">0.988</div>
                        <div className="text-sm text-muted-foreground">Recall</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-gradient-primary text-white border-0 shadow-glow">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold mb-4">Explore the Research</h2>
                  <p className="text-xl opacity-90 mb-8">
                    Access the full paper, source code, and datasets to reproduce our results 
                    and build upon our work.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="secondary" size="lg">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      ArXiv Paper
                    </Button>
                    <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Code className="mr-2 h-5 w-5" />
                      GitHub Repository
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Research;