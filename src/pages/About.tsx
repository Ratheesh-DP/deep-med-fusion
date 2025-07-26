import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Linkedin, Github, ExternalLink, GraduationCap, Award, BookOpen, Users } from "lucide-react";

const About = () => {
  const achievements = [
    {
      title: "Research Excellence",
      description: "Published work achieving state-of-the-art results in medical AI",
      icon: Award,
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      title: "Technical Innovation", 
      description: "Novel hybrid architecture combining CNNs and Vision Transformers",
      icon: GraduationCap,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Clinical Impact",
      description: "Direct applications in cancer diagnosis and patient care",
      icon: Users,
      color: "bg-green-500/10 text-green-600"
    },
    {
      title: "Open Science",
      description: "Commitment to reproducible research and open-source contributions",
      icon: BookOpen,
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  const skills = {
    "Machine Learning": ["Deep Learning", "Computer Vision", "Medical AI", "PyTorch", "TensorFlow"],
    "Software Engineering": ["Python", "React", "TypeScript", "Node.js", "Docker", "AWS"],
    "Research": ["Statistical Analysis", "Research Design", "Academic Writing", "Peer Review"],
    "Medical Domain": ["Medical Imaging", "Cancer Diagnosis", "Clinical Validation", "Healthcare IT"]
  };

  const experience = [
    {
      role: "AI Research Scientist",
      company: "Medical AI Research Lab",
      period: "2022 - Present",
      description: "Leading research in deep learning for medical imaging with focus on cancer diagnosis."
    },
    {
      role: "Machine Learning Engineer", 
      company: "HealthTech Innovations",
      period: "2021 - 2022",
      description: "Developed production ML systems for medical image analysis and clinical decision support."
    },
    {
      role: "Research Assistant",
      company: "University Medical Center",
      period: "2020 - 2021", 
      description: "Collaborated on computer vision projects for automated medical diagnosis systems."
    }
  ];

  const education = [
    {
      degree: "Ph.D. Computer Science",
      institution: "Stanford University",
      period: "2019 - 2023",
      focus: "Artificial Intelligence, Medical Imaging"
    },
    {
      degree: "M.S. Computer Science",
      institution: "MIT",
      period: "2017 - 2019",
      focus: "Machine Learning, Computer Vision"
    },
    {
      degree: "B.S. Computer Engineering",
      institution: "UC Berkeley",
      period: "2013 - 2017",
      focus: "Software Engineering, Mathematics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">About the Researcher</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Advancing Medical AI
                </span>{" "}
                Through Innovation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Passionate about developing cutting-edge AI solutions that improve healthcare 
                outcomes and advance the field of computer-aided diagnosis.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="premium">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="ghost">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${achievement.color} mb-4`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Technical Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-xl">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.role}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{edu.degree}</h3>
                          <p className="text-primary font-medium">{edu.institution}</p>
                        </div>
                        <Badge variant="outline">{edu.period}</Badge>
                      </div>
                      <p className="text-muted-foreground">Focus: {edu.focus}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Research Philosophy */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Research Philosophy</h2>
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      My research is driven by the belief that artificial intelligence has the 
                      potential to revolutionize healthcare by providing accurate, accessible, 
                      and reliable diagnostic tools. I focus on developing robust deep learning 
                      architectures that can handle the complexity and variability of medical imaging data.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The hybrid approach presented in this work exemplifies my commitment to 
                      combining theoretical innovation with practical clinical applications. 
                      By integrating the strengths of different architectures, we can create 
                      systems that are both scientifically rigorous and clinically valuable.
                    </p>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <h4 className="font-semibold mb-2">Innovation</h4>
                        <p className="text-sm text-muted-foreground">
                          Pushing the boundaries of what's possible in medical AI
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          Developing solutions that improve patient outcomes
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Collaboration</h4>
                        <p className="text-sm text-muted-foreground">
                          Working with clinicians and researchers worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Let's Collaborate</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Interested in discussing research opportunities, collaborations, or 
                potential applications of this work? I'd love to hear from you.
              </p>
              <Card className="bg-gradient-primary text-white border-0 shadow-glow">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <Mail className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm opacity-80">Email</div>
                      <div className="font-semibold">researcher@medai.com</div>
                    </div>
                    <div>
                      <Linkedin className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm opacity-80">LinkedIn</div>
                      <div className="font-semibold">/in/medai-researcher</div>
                    </div>
                    <div>
                      <Github className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm opacity-80">GitHub</div>
                      <div className="font-semibold">@medai-researcher</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="lg">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Schedule a Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;