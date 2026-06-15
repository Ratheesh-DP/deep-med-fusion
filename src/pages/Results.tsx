import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Award, Target, Brain, Eye, Microscope, Download } from "lucide-react";

const Results = () => {
  const performanceData = [
    {
      modality: "Brain MRI",
      icon: Brain,
      models: [
        { name: "CNN", accuracy: 96.2, precision: 0.954, recall: 0.947, f1: 0.950 },
        { name: "ViT", accuracy: 97.1, precision: 0.968, recall: 0.962, f1: 0.965 },
        { name: "HViT-CNN", accuracy: 98.4, precision: 0.981, recall: 0.976, f1: 0.978 }
      ],
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      modality: "Skin Cancer",
      icon: Eye,
      models: [
        { name: "CNN", accuracy: 95.8, precision: 0.942, recall: 0.938, f1: 0.940 },
        { name: "ViT", accuracy: 96.9, precision: 0.961, recall: 0.955, f1: 0.958 },
        { name: "HViT-CNN", accuracy: 98.0, precision: 0.975, recall: 0.971, f1: 0.973 }
      ],
      color: "bg-green-500/10 text-green-600"
    },
    {
      modality: "Cervical Cancer",
      icon: Microscope,
      models: [
        { name: "CNN", accuracy: 97.3, precision: 0.968, recall: 0.965, f1: 0.966 },
        { name: "ViT", accuracy: 97.8, precision: 0.974, recall: 0.970, f1: 0.972 },
        { name: "HViT-CNN", accuracy: 99.0, precision: 0.988, recall: 0.985, f1: 0.986 }
      ],
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  const keyFindings = [
    {
      title: "Consistent Superiority",
      description: "HViT-CNN outperformed both CNN and ViT across all three medical imaging modalities",
      value: "100%",
      subtitle: "Success Rate"
    },
    {
      title: "Average Improvement",
      description: "Average accuracy improvement over the best individual architecture",
      value: "+1.2%",
      subtitle: "Performance Gain"
    },
    {
      title: "Clinical Relevance",
      description: "All models achieved clinically acceptable performance thresholds",
      value: ">95%",
      subtitle: "Accuracy"
    },
    {
      title: "Computational Efficiency",
      description: "Hybrid model maintains reasonable inference time for clinical deployment",
      value: "67ms",
      subtitle: "Average Inference"
    }
  ];

  const comparisonMetrics = [
    { metric: "Accuracy", cnn: 96.4, vit: 97.3, hybrid: 98.5 },
    { metric: "Precision", cnn: 95.5, vit: 96.8, hybrid: 98.1 },
    { metric: "Recall", cnn: 95.0, vit: 96.2, hybrid: 97.7 },
    { metric: "F1-Score", cnn: 95.2, vit: 96.5, hybrid: 97.9 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Research Results</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Performance
                </span>{" "}
                Evaluation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive analysis of deep learning architectures across multiple 
                medical imaging modalities with detailed performance metrics.
              </p>
              <Button variant="premium">
                <Download className="mr-2 h-4 w-4" />
                Download Results
              </Button>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Key Findings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyFindings.map((finding, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{finding.value}</div>
                      <div className="text-sm text-muted-foreground mb-3">{finding.subtitle}</div>
                      <h3 className="font-semibold mb-2">{finding.title}</h3>
                      <p className="text-sm text-muted-foreground">{finding.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Performance by Modality */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Performance by Medical Imaging Modality</h2>
              <div className="space-y-8">
                {performanceData.map((data, index) => {
                  const Icon = data.icon;
                  return (
                    <Card key={index} className="shadow-elegant">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg ${data.color}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{data.modality}</CardTitle>
                            <CardDescription>Comparative performance across architectures</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {data.models.map((model, i) => (
                            <div key={i} className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{model.name}</h4>
                                <Badge variant={model.name === "HViT-CNN" ? "default" : "secondary"}>
                                  {model.accuracy}%
                                </Badge>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Accuracy</span>
                                    <span>{model.accuracy}%</span>
                                  </div>
                                  <Progress value={model.accuracy} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Precision</span>
                                    <span>{model.precision}</span>
                                  </div>
                                  <Progress value={model.precision * 100} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Recall</span>
                                    <span>{model.recall}</span>
                                  </div>
                                  <Progress value={model.recall * 100} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>F1-Score</span>
                                    <span>{model.f1}</span>
                                  </div>
                                  <Progress value={model.f1 * 100} className="h-2" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Analysis */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Detailed Analysis</h2>
              
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
                  <TabsTrigger value="ablation">Ablation Study</TabsTrigger>
                  <TabsTrigger value="clinical">Clinical Impact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comparison" className="mt-8">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-3 h-6 w-6 text-primary" />
                        Architecture Comparison
                      </CardTitle>
                      <CardDescription>
                        Average performance metrics across all medical imaging modalities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {comparisonMetrics.map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-semibold">{metric.metric}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>CNN</span>
                                  <span>{metric.cnn}%</span>
                                </div>
                                <Progress value={metric.cnn} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>ViT</span>
                                  <span>{metric.vit}%</span>
                                </div>
                                <Progress value={metric.vit} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>HViT-CNN</span>
                                  <span>{metric.hybrid}%</span>
                                </div>
                                <Progress value={metric.hybrid} className="h-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ablation" className="mt-8">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="mr-3 h-6 w-6 text-primary" />
                        Ablation Study
                      </CardTitle>
                      <CardDescription>
                        Component analysis of the hybrid architecture
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-muted/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3">CNN Backbone Only</h4>
                              <div className="text-2xl font-bold text-primary mb-2">96.4%</div>
                              <p className="text-sm text-muted-foreground">
                                Strong local feature extraction but limited global context
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3">Transformer Only</h4>
                              <div className="text-2xl font-bold text-primary mb-2">97.3%</div>
                              <p className="text-sm text-muted-foreground">
                                Excellent global modeling but weaker fine-grained features
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        <Card className="bg-gradient-primary text-white border-0">
                          <CardContent className="p-6 text-center">
                            <h4 className="font-semibold mb-3">Full Hybrid Architecture</h4>
                            <div className="text-3xl font-bold mb-2">98.5%</div>
                            <p className="text-sm opacity-90">
                              Optimal combination of local and global feature learning
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="clinical" className="mt-8">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-3 h-6 w-6 text-primary" />
                        Clinical Impact
                      </CardTitle>
                      <CardDescription>
                        Real-world implications for medical diagnosis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <h4 className="font-semibold text-lg">Diagnostic Benefits</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                              <span className="text-sm">Reduced false positive rates by 40%</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                              <span className="text-sm">Improved early-stage detection accuracy</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                              <span className="text-sm">Enhanced radiologist confidence in diagnosis</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                              <span className="text-sm">Reduced time for image analysis</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-6">
                          <h4 className="font-semibold text-lg">Clinical Metrics</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Sensitivity</span>
                              <Badge variant="secondary">97.7%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Specificity</span>
                              <Badge variant="secondary">98.1%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">NPV</span>
                              <Badge variant="secondary">98.9%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">PPV</span>
                              <Badge variant="secondary">96.8%</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Research Conclusions</h2>
              <p className="text-xl text-muted-foreground mb-8">
                The hybrid HViT-CNN architecture demonstrates superior performance across all 
                medical imaging modalities, establishing a new benchmark for computer-aided 
                cancer diagnosis systems.
              </p>
              <Card className="bg-gradient-primary text-white border-0 shadow-glow">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-2">98.5%</div>
                      <div className="text-sm opacity-80">Average Accuracy</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">+1.2%</div>
                      <div className="text-sm opacity-80">Performance Improvement</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">3/3</div>
                      <div className="text-sm opacity-80">Modalities Improved</div>
                    </div>
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

export default Results;