"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bot,
  Heart,
  Building2,
  ShoppingCart,
  Factory,
  Brain,
  Cloud,
  Database,
  Zap,
  GitBranch,
  Cpu,
  Lightbulb,
  BookOpen,
  MessageCircle,
  Play,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Download,
  Settings,
  Monitor,
  Upload,
  Search,
  FileText,
  Link,
  Plus,
} from "lucide-react";

import MediaPlayer from "../components/mediaPlayer";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "agents",
    "slm",
    "cloud",
  ]);
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "agents"
    | "slm"
    | "cloud"
    | "knowledge-base"
    | "features"
    | "solutions"
    | "speak-to-us"
  >("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [deploymentModal, setDeploymentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [deploymentStep, setDeploymentStep] = useState<
    "provider" | "credentials" | "deploying" | "complete"
  >("provider");
  const [selectedProvider, setSelectedProvider] = useState<
    "aws" | "azure" | "gcp" | ""
  >("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    subscriptionId: "",
  });
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryClick = (category: string, parentSection: string) => {
    if (parentSection === "agents") {
      setSelectedCategory(category);
      setCurrentView("agents");
    } else if (parentSection === "slm") {
      setSelectedCategory(category);
      setSelectedSection("slm");
      setCurrentView("slm");
    } else if (parentSection === "cloud") {
      setSelectedCategory(category);
      setSelectedSection("cloud");
      setCurrentView("cloud");
    } else if (parentSection === "features") {
      setSelectedCategory(category);
      setSelectedSection("features");
      setCurrentView("features");
    }
  };

  const handleSingleMenuClick = (menuId: string) => {
    if (menuId === "knowledge-base") {
      setCurrentView("knowledge-base");
      setSelectedCategory("");
      setSelectedSection("");
    } else if (menuId === "solutions") {
      setCurrentView("solutions");
      setSelectedCategory("");
      setSelectedSection("");
    } else if (menuId === "speak-to-us") {
      setCurrentView("speak-to-us");
      setSelectedCategory("");
      setSelectedSection("");
    }
  };

  const handleDeployAgent = (agent: any) => {
    setSelectedAgent(agent);
    setDeploymentModal(true);
    setDeploymentStep("provider");
    setSelectedProvider("");
    setCredentials({ username: "", password: "", subscriptionId: "" });
    setDeploymentProgress(0);
    setDeploymentUrl("");
  };

  const handleProviderSelect = (provider: "aws" | "azure" | "gcp") => {
    setSelectedProvider(provider);
    setDeploymentStep("credentials");
  };

  const handleStartDeployment = () => {
    setDeploymentStep("deploying");
    setDeploymentProgress(0);

    // Simulate deployment progress
    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeploymentStep("complete");
          setDeploymentUrl(
            `https://${selectedAgent?.id}-${selectedProvider}.${
              selectedProvider === "aws"
                ? "amazonaws.com"
                : selectedProvider === "azure"
                ? "azurewebsites.net"
                : "cloud.google.com"
            }/agent`
          );
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const resetDeployment = () => {
    setDeploymentModal(false);
    setSelectedAgent(null);
    setDeploymentStep("provider");
    setSelectedProvider("");
    setCredentials({ username: "", password: "", subscriptionId: "" });
    setDeploymentProgress(0);
    setDeploymentUrl("");
  };

  const agentData = {
    Healthcare: [
      {
        id: "face-sheet",
        name: "Face Sheet Agent",
        description:
          "Automated patient face sheet generation and management system that extracts and organizes patient demographic and clinical information.",
        videoUrl:
          "https://igenstudio.blob.core.windows.net/healthcare/Healthcare%20Facesheet.mp4?sp=r&st=2025-08-18T09:38:11Z&se=2025-09-30T17:53:11Z&spr=https&sv=2024-11-04&sr=b&sig=Dp0TgS9uUbBCwUtdIUzb4KxHjZWdP%2FTjjFrA8qmxGI4%3D",
        features: [
          "Patient Data Extraction",
          "HIPAA Compliant",
          "Real-time Updates",
        ],
      },
      {
        id: "bi-agent",
        name: "BI Agent",
        description:
          "Business intelligence agent that analyzes healthcare data to provide insights on patient outcomes and operational efficiency.",
        videoUrl:
          "https://igenstudio.blob.core.windows.net/healthcare/BI%20Agent.mp4?sp=r&st=2025-08-18T09:36:57Z&se=2025-09-30T17:51:57Z&spr=https&sv=2024-11-04&sr=b&sig=qT5RHPFnpEG3krYoK%2FMebsWbO61Fnz6AxzFlDQc%2FvnI%3D",
        features: ["Data Analytics", "Custom Reports", "Predictive Insights"],
      },

      {
        id: "interpreter",
        name: "Interpreter Services",
        description:
          "AI-powered medical interpretation service supporting multiple languages for patient-provider communication.",
        videoUrl:
          "https://igenstudio.blob.core.windows.net/healthcare/Intelliswift%20iServ%20Interpreter%20Services.mp4?sp=r&st=2025-08-19T11:20:13Z&se=2025-09-29T19:35:13Z&spr=https&sv=2024-11-04&sr=b&sig=4QxD6KVUyZ3ln2jm9J1Djae3H1p4lf%2Bj5lZs6CEnV6g%3D",
        features: [
          "Multi-Language Support",
          "Medical Terminology",
          "Real-time Translation",
        ],
      },
      {
        id: "prior-auth",
        name: "Customer Support Agent",
        description:
          "An intelligent, autonomous agent that proactively resolves customer queries and personalizes interactions to enhance satisfaction.",
        videoUrl:
          "https://igenstudio.blob.core.windows.net/healthcare/01%20Customer_Support_Agent.mp4?sp=r&st=2025-08-19T11:19:16Z&se=2025-09-29T19:34:16Z&spr=https&sv=2024-11-04&sr=b&sig=HY%2B73j7iWKMUDNdg47TJUYNV0rEtgSju7jSbUYXoVQM%3D",
        features: [
          "Personalized Assistance",
          "Reduce Wait Times",
          "Resolve Issues Proactively",
        ],
      },
    ],
  };

  const cloudProviders = [
    {
      id: "aws",
      name: "Amazon Web Services",
      icon: "🟠",
      description: "Deploy on AWS with EC2, Lambda, and S3 integration",
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      icon: "🔵",
      description: "Deploy on Azure with App Service and Cognitive Services",
    },
    {
      id: "gcp",
      name: "Google Cloud Platform",
      icon: "🔴",
      description: "Deploy on GCP with Compute Engine and AI Platform",
    },
  ];

  const slmData = {
    Healthcare: {
      name: "PHI4.0 Healthcare SLM",
      description:
        "Specialized AI system that transforms how hospitals and healthcare platforms manage clinical data. Our model automatically extracts diagnoses, procedures, allergies, and lab results from patient records (e.g., MIMIC-IV) and compares them against CDC/WHO guidelines to flag inconsistencies in care.",
      version: "PHI4.0",
      features: [
        "Automated Clinical Review : Saves hours of manual chart audits.",
        "Improved Patient Safety: Flags allergy conflicts, abnormal labs, and missed procedures.",
        "Regulatory Compliance: Ensures alignment with global care standards",
        "Scalable Intelligence: Works across millions of records with minimal setup.",
      ],
      modelSize: "7B Parameters",
      accuracy: "94.2%",
      latency: "120ms",
      downloadUrl: "/phi4-healthcare-model.bin",
    },
    Fintech: {
      name: "FinTech SLM",
      description:
        "Financial services optimized language model for risk assessment, fraud detection, and regulatory compliance.",
      version: "2.1",
      features: [
        "Fraud Detection",
        "Risk Assessment",
        "Regulatory Compliance",
        "Financial Analysis",
      ],
      modelSize: "5B Parameters",
      accuracy: "91.8%",
      latency: "95ms",
      downloadUrl: "/fintech-model.bin",
    },
  };

  const cloudData = {
    AWS: {
      name: "Amazon Web Services",
      description:
        "Deploy and manage your AI agents on AWS infrastructure with scalable compute and storage solutions.",
      services: [
        "EC2 Instances",
        "Lambda Functions",
        "S3 Storage",
        "SageMaker",
        "Bedrock",
      ],
      pricing: "Pay-as-you-go",
      regions: "25+ Global Regions",
      features: ["Auto Scaling", "Load Balancing", "99.99% Uptime SLA"],
    },
    Azure: {
      name: "Microsoft Azure",
      description:
        "Leverage Azure's AI and machine learning services for enterprise-grade agent deployment and management.",
      services: [
        "Virtual Machines",
        "App Service",
        "Cognitive Services",
        "Azure ML",
        "OpenAI Service",
      ],
      pricing: "Flexible pricing",
      regions: "60+ Global Regions",
      features: ["Hybrid Cloud", "Enterprise Security", "99.95% Uptime SLA"],
    },
    GCP: {
      name: "Google Cloud Platform",
      description:
        "Deploy on Google's infrastructure with advanced AI/ML capabilities and global network performance.",
      services: [
        "Compute Engine",
        "Cloud Functions",
        "Cloud Storage",
        "Vertex AI",
        "AI Platform",
      ],
      pricing: "Sustained use discounts",
      regions: "35+ Global Regions",
      features: [
        "Global Load Balancing",
        "Advanced AI/ML",
        "99.99% Uptime SLA",
      ],
    },
  };

  const knowledgeBaseData = [
    {
      id: "medical-kb",
      name: "Medical Knowledge Base",
      description:
        "Comprehensive medical terminology, procedures, and clinical guidelines database",
      type: "Medical",
      size: "2.4 GB",
      documents: 15420,
      lastUpdated: "2 hours ago",
      status: "active",
    },
    {
      id: "financial-kb",
      name: "Financial Regulations KB",
      description:
        "Up-to-date financial regulations, compliance requirements, and risk assessment data",
      type: "Financial",
      size: "1.8 GB",
      documents: 8750,
      lastUpdated: "1 day ago",
      status: "active",
    },
    {
      id: "legal-kb",
      name: "Legal Documents KB",
      description:
        "Legal precedents, contract templates, and regulatory compliance documentation",
      type: "Legal",
      size: "3.1 GB",
      documents: 22100,
      lastUpdated: "3 days ago",
      status: "syncing",
    },
  ];

  const featuresData = {
    MCP: {
      name: "Model Context Protocol (MCP)",
      description:
        "Standardized protocol for connecting AI models with external data sources and tools, enabling seamless integration and context sharing.",
      version: "1.2.0",
      features: [
        "Context Sharing",
        "Tool Integration",
        "Data Source Connectivity",
        "Protocol Standardization",
      ],
      benefits: [
        "Improved Model Performance",
        "Seamless Integration",
        "Standardized Communication",
        "Enhanced Capabilities",
      ],
      useCases: [
        "Multi-Agent Systems",
        "External API Integration",
        "Data Pipeline Automation",
        "Context-Aware Applications",
      ],
    },
    A2A: {
      name: "Agent-to-Agent Communication (A2A)",
      description:
        "Advanced communication framework enabling AI agents to collaborate, share information, and coordinate tasks efficiently.",
      version: "2.0.1",
      features: [
        "Real-time Communication",
        "Task Coordination",
        "Information Sharing",
        "Collaborative Workflows",
      ],
      benefits: [
        "Enhanced Collaboration",
        "Improved Efficiency",
        "Scalable Architecture",
        "Reduced Latency",
      ],
      useCases: [
        "Multi-Agent Workflows",
        "Distributed Processing",
        "Collaborative Decision Making",
        "Resource Optimization",
      ],
    },
  };

  const solutionsData = [
    {
      id: "ai-ocr",
      name: "Centralized AI OCR Solution",
      description:
        "Advanced optical character recognition system with AI-powered document processing, text extraction, and intelligent data classification.",
      features: [
        "Multi-format Support",
        "AI-powered Recognition",
        "Batch Processing",
        "API Integration",
      ],
      benefits: [
        "99.8% Accuracy",
        "50x Faster Processing",
        "Cost Reduction",
        "Automated Workflows",
      ],
      useCases: [
        "Document Digitization",
        "Invoice Processing",
        "Form Automation",
        "Archive Management",
      ],
      pricing: "Starting at $299/month",
      status: "Available",
    },
    {
      id: "ai-governance",
      name: "AI Governance Platform",
      description:
        "Comprehensive governance framework for AI systems ensuring compliance, ethics, and responsible AI deployment across your organization.",
      features: [
        "Compliance Monitoring",
        "Ethics Framework",
        "Risk Assessment",
        "Audit Trails",
      ],
      benefits: [
        "Regulatory Compliance",
        "Risk Mitigation",
        "Transparency",
        "Accountability",
      ],
      useCases: [
        "Model Governance",
        "Compliance Reporting",
        "Risk Management",
        "Ethical AI",
      ],
      pricing: "Starting at $599/month",
      status: "Available",
    },
  ];

  const menuItems = [
    {
      id: "agents",
      title: "Agents",
      icon: Bot,
      children: [
        { name: "Healthcare", icon: Heart },
        { name: "BFSI", icon: Building2 },
        { name: "Retail", icon: ShoppingCart },
        { name: "Manufacturing", icon: Factory },
      ],
    },
    {
      id: "slm",
      title: "SLM",
      icon: Brain,
      children: [
        { name: "Healthcare", icon: Heart, badge: "PHI4.0" },
        { name: "Fintech", icon: Building2 },
      ],
    },
    {
      id: "cloud",
      title: "Cloud",
      icon: Cloud,
      children: [
        { name: "AWS", icon: Cloud },
        { name: "Azure", icon: Cloud },
        { name: "GCP", icon: Cloud },
      ],
    },
    {
      id: "knowledge-base",
      title: "Knowledge Base",
      icon: Database,
    },
    {
      id: "features",
      title: "Features",
      icon: Zap,
      children: [
        { name: "MCP", icon: GitBranch },
        { name: "A2A", icon: Zap },
      ],
    },
    {
      id: "models",
      title: "Models",
      icon: Cpu,
    },
    {
      id: "solutions",
      title: "Solutions",
      icon: Lightbulb,
    },
    {
      id: "tutorials",
      title: "Tutorials",
      icon: BookOpen,
    },
    {
      id: "speak-to-us",
      title: "Speak to US",
      icon: MessageCircle,
    },
  ];

  const renderAgentCards = () => {
    const agents = agentData[selectedCategory as keyof typeof agentData] || [];

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {selectedCategory} Agents
            </h1>
            <p className="text-muted-foreground">
              Deploy specialized AI agents for {selectedCategory.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {agent.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Media Player */}
                <div className="relative bg-muted rounded-lg overflow-hidden h-48">
                  <MediaPlayer
                    url={agent.videoUrl}
                    title={`${agent.name} demo`}
                    className="w-full h-full"
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Deploy Button */}
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleDeployAgent(agent)}
                >
                  Deploy Agent
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={deploymentModal} onOpenChange={setDeploymentModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Deploy {selectedAgent?.name}</DialogTitle>
              <DialogDescription>
                Configure your deployment settings and cloud provider
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {deploymentStep === "provider" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Select Cloud Provider
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {cloudProviders.map((provider) => (
                      <Card
                        key={provider.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedProvider === provider.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() =>
                          handleProviderSelect(
                            provider.id as "aws" | "azure" | "gcp"
                          )
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{provider.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{provider.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {provider.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {deploymentStep === "credentials" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Enter Subscription Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={credentials.username}
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="Enter your password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subscription">Subscription ID</Label>
                      <Input
                        id="subscription"
                        value={credentials.subscriptionId}
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            subscriptionId: e.target.value,
                          }))
                        }
                        placeholder="Enter your subscription ID"
                      />
                    </div>
                    <Button
                      onClick={handleStartDeployment}
                      className="w-full"
                      disabled={
                        !credentials.username ||
                        !credentials.password ||
                        !credentials.subscriptionId
                      }
                    >
                      Start Deployment
                    </Button>
                  </div>
                </div>
              )}

              {deploymentStep === "deploying" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Deployment in Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🚀</div>
                      <p className="text-muted-foreground">
                        Deploying {selectedAgent?.name} to{" "}
                        {selectedProvider?.toUpperCase()}
                      </p>
                    </div>
                    <Progress value={deploymentProgress} className="w-full" />
                    <p className="text-center text-sm text-muted-foreground">
                      {deploymentProgress < 30
                        ? "Initializing deployment..."
                        : deploymentProgress < 60
                        ? "Setting up infrastructure..."
                        : deploymentProgress < 90
                        ? "Configuring agent..."
                        : "Finalizing deployment..."}
                    </p>
                  </div>
                </div>
              )}

              {deploymentStep === "complete" && (
                <div className="space-y-4">
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h3 className="text-lg font-semibold text-green-600">
                      Deployment Successful!
                    </h3>
                    <p className="text-muted-foreground">
                      Your {selectedAgent?.name} has been successfully deployed
                      to {selectedProvider?.toUpperCase()}
                    </p>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Label>Agent URL:</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={deploymentUrl}
                            readOnly
                            className="flex-1"
                          />
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={deploymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button
                      onClick={resetDeployment}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Deploy Another
                    </Button>
                    <Button onClick={resetDeployment} className="flex-1">
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderSLMSection = () => {
    const slm = slmData[selectedCategory as keyof typeof slmData];
    if (!slm) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{slm.name}</h1>
            <p className="text-muted-foreground">{slm.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Model Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Version</Label>
                  <p className="text-lg font-semibold">{slm.version}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Model Size</Label>
                  <p className="text-lg font-semibold">{slm.modelSize}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Accuracy</Label>
                  <p className="text-lg font-semibold text-green-600">
                    {slm.accuracy}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Latency</Label>
                  <p className="text-lg font-semibold text-blue-600">
                    {slm.latency}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Key Features</Label>
                <div className="flex flex-wrap gap-2">
                  {slm.features.map((feature) => {
                    // Split on the first colon (":") so we get [prefix, restOfString]
                    const [prefix, ...rest] = feature.split(":");
                    return (
                      <Badge key={feature} variant="secondary">
                        <strong>{prefix}:</strong>
                        {rest.join(":")}
                      </Badge>
                    );
                    // <Badge key={feature} variant="secondary">
                    //   {feature}
                    // </Badge>
                  })}
                  <p className="text-sm font-medium mt-5 text-muted-foreground">
                    This solution is ideal for hospitals aiming to improve care
                    quality, reduce risk, and streamline compliance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <Download className="h-4 w-4 mr-2" />
                Download Model
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Test Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCloudSection = () => {
    const cloud = cloudData[selectedCategory as keyof typeof cloudData];
    if (!cloud) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{cloud.name}</h1>
            <p className="text-muted-foreground">{cloud.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cloud Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="h-5 w-5 mr-2" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Pricing Model</Label>
                  <p className="text-lg font-semibold">{cloud.pricing}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Global Regions</Label>
                  <p className="text-lg font-semibold">{cloud.regions}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Available Services
                </Label>
                <div className="flex flex-wrap gap-2">
                  {cloud.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Key Features</Label>
                <div className="flex flex-wrap gap-2">
                  {cloud.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                View Console
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderKnowledgeBaseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Knowledge Base
              </h1>
              <p className="text-muted-foreground">
                Manage and organize your AI knowledge repositories
              </p>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Knowledge Base
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {knowledgeBaseData.map((kb) => (
            <Card key={kb.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{kb.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {kb.description}
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge variant="secondary">{kb.type}</Badge>
                        <Badge
                          variant={
                            kb.status === "active" ? "default" : "secondary"
                          }
                        >
                          {kb.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{kb.size}</p>
                    <p className="text-xs text-muted-foreground">
                      {kb.documents} documents
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {kb.lastUpdated}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <Link className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturesSection = () => {
    const feature = featuresData[selectedCategory as keyof typeof featuresData];
    if (!feature) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {feature.name}
            </h1>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feature Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Feature Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Version</Label>
                <p className="text-lg font-semibold">{feature.version}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Core Features</Label>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((feat) => (
                    <Badge key={feat} variant="secondary">
                      {feat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Key Benefits</Label>
                <div className="flex flex-wrap gap-2">
                  {feature.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Use Cases</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {feature.useCases.map((useCase) => (
                    <div
                      key={useCase}
                      className="flex items-center space-x-2 p-2 bg-muted rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <Download className="h-4 w-4 mr-2" />
                Install {selectedCategory}
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Try Example
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderSolutionsSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Solutions</h1>
            <p className="text-muted-foreground">
              Enterprise-ready AI solutions for your business needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {solutionsData.map((solution) => (
            <Card
              key={solution.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{solution.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {solution.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      solution.status === "Available" ? "default" : "secondary"
                    }
                  >
                    {solution.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Key Features</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {solution.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Benefits</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {solution.benefits.map((benefit) => (
                        <Badge
                          key={benefit}
                          variant="outline"
                          className="text-xs"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Use Cases</Label>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {solution.useCases.map((useCase) => (
                        <div
                          key={useCase}
                          className="flex items-center space-x-1 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium">{solution.pricing}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground">
              Get in touch with our team for support and inquiries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24
                hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What can we help you with?" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full min-h-[120px] px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">
                      support@igenstudio.ai
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Sales Inquiries</p>
                    <p className="text-sm text-muted-foreground">
                      sales@igenstudio.ai
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Partnership</p>
                    <p className="text-sm text-muted-foreground">
                      partners@igenstudio.ai
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>When our team is available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Monday - Friday</span>
                  <span className="text-sm text-muted-foreground">
                    9:00 AM - 6:00 PM PST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Saturday</span>
                  <span className="text-sm text-muted-foreground">
                    10:00 AM - 4:00 PM PST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sunday</span>
                  <span className="text-sm text-muted-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common requests and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    I
                  </span>
                </div>
                <span className="font-semibold text-sidebar-foreground">
                  iGEN Studio
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
                  !sidebarOpen ? "px-2" : ""
                }`}
                onClick={() =>
                  item.children
                    ? toggleSection(item.id)
                    : handleSingleMenuClick(item.id)
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="ml-2 flex-1 text-left">{item.title}</span>
                    {item.children &&
                      (expandedSections.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </>
                )}
              </Button>

              {/* Submenu */}
              {item.children &&
                sidebarOpen &&
                expandedSections.includes(item.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.name}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                        onClick={() => handleCategoryClick(child.name, item.id)}
                      >
                        <child.icon className="h-3 w-3" />
                        <span className="ml-2">{child.name}</span>
                        {child.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {child.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentView === "dashboard"
                  ? "Dashboard"
                  : currentView === "agents"
                  ? `${selectedCategory} Agents`
                  : currentView === "slm"
                  ? `${selectedCategory} SLM`
                  : currentView === "cloud"
                  ? `${selectedCategory} Cloud`
                  : currentView === "knowledge-base"
                  ? "Knowledge Base"
                  : currentView === "features"
                  ? `${selectedCategory} Feature`
                  : currentView === "solutions"
                  ? "Solutions"
                  : currentView === "speak-to-us"
                  ? "Contact Us"
                  : "Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                {currentView === "dashboard"
                  ? "Build and deploy reliable AI agents effortlessly"
                  : currentView === "agents"
                  ? `Deploy specialized AI agents for ${selectedCategory.toLowerCase()}`
                  : currentView === "slm"
                  ? `Small Language Models for ${selectedCategory.toLowerCase()}`
                  : currentView === "cloud"
                  ? `Cloud infrastructure and services`
                  : currentView === "knowledge-base"
                  ? "Manage and organize your AI knowledge repositories"
                  : currentView === "features"
                  ? `Advanced ${selectedCategory} capabilities and integration`
                  : currentView === "solutions"
                  ? "Enterprise-ready AI solutions for your business needs"
                  : currentView === "speak-to-us"
                  ? "Get in touch with our team for support and inquiries"
                  : "Build and deploy reliable AI agents effortlessly"}
              </p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create New Agent
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {currentView === "dashboard" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    Active Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-muted-foreground">
                    Running across all environments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="h-5 w-5 mr-2" />
                    Cloud Deployments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-muted-foreground">AWS, Azure, GCP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Knowledge Bases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-muted-foreground">
                    Connected data sources
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your AI agents and deployments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Healthcare Agent deployed successfully
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">
                          New knowledge base connected
                        </p>
                        <p className="text-sm text-muted-foreground">
                          15 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">
                          BFSI model training completed
                        </p>
                        <p className="text-sm text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : currentView === "agents" ? (
            renderAgentCards()
          ) : currentView === "slm" ? (
            renderSLMSection()
          ) : currentView === "cloud" ? (
            renderCloudSection()
          ) : currentView === "knowledge-base" ? (
            renderKnowledgeBaseSection()
          ) : currentView === "features" ? (
            renderFeaturesSection()
          ) : currentView === "solutions" ? (
            renderSolutionsSection()
          ) : currentView === "speak-to-us" ? (
            renderContactSection()
          ) : null}
        </main>
      </div>
    </div>
  );
}
