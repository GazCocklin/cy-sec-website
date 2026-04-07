import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lightbulb, Target, ShieldCheck, Users, BarChart, FileText, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MarketingInsights = () => {
  const navigate = useNavigate();

  const differentiators = [
    {
      icon: ShieldCheck,
      title: "Integrated Risk Management",
      description: "Unlike single-point solutions, we offer a unified platform for both internal compliance (ISO, NIST) and external third-party vendor risk. This provides a holistic view of an organisation's entire risk landscape.",
      keywords: ["Holistic Security", "Unified Platform", "360-Degree Risk View"]
    },
    {
      icon: Zap,
      title: "AI-Powered & Future-Ready",
      description: "We are one of the few platforms explicitly supporting AI-specific risk assessments (NIST AI RMF). This positions us as a forward-thinking partner ready for the next wave of technology challenges.",
      keywords: ["AI Risk Management", "NIST AI RMF", "Future-Proof Compliance"]
    },
    {
      icon: Users,
      title: "Consultancy-Backed Platform",
      description: "The platform isn't just a tool; it's a service. The option to pair it with expert consultancy (from vCISO to project-based) provides a level of support that pure SaaS competitors can't match.",
      keywords: ["Expert-Guided", "vCISO Services", "Consultancy-as-a-Service"]
    },
    {
      icon: FileText,
      title: "Actionable, Board-Ready Reporting",
      description: "Our focus on generating clear, professional PDF reports and downloadable risk summaries (Excel) translates complex data into actionable insights for stakeholders and auditors.",
      keywords: ["Executive Reporting", "Audit-Ready", "Data-Driven Decisions"]
    }
  ];

  const targetAudiences = [
    {
      title: "Small to Medium-sized Enterprises (SMEs)",
      painPoints: [
        "Lacks a dedicated security team or CISO.",
        "Struggles with the complexity and cost of enterprise GRC tools.",
        "Needs to demonstrate compliance for key clients or contracts.",
        "Manages multiple vendors but lacks a formal risk process."
      ],
      solution: "Our platform offers an affordable, all-in-one solution that simplifies compliance and vendor management, backed by optional expert help when they need it."
    },
    {
      title: "Managed Service Providers (MSPs) & Consultants",
      painPoints: [
        "Manages security for multiple clients with disparate tools.",
        "Needs an efficient way to conduct and report on client assessments.",
        "Wants to add higher-value security services to their portfolio."
      ],
      solution: "Provide a scalable, multi-tenant-ready platform to streamline client assessments, demonstrate value, and expand their service offerings."
    },
    {
      title: "Companies Adopting AI",
      painPoints: [
        "Unsure how to manage the unique risks of AI implementation.",
        "Needs to align with emerging standards like the NIST AI RMF.",
        "Struggles to explain AI risk posture to stakeholders."
      ],
      solution: "We provide the specific tools and frameworks to confidently navigate AI risks, ensuring responsible and compliant innovation."
    }
  ];

  const taglines = {
    main: "Integrated Risk Management, Simplified.",
    compliance: "Go from compliance chaos to automated confidence.",
    vendor: "Your vendor risk? Managed.",
    ai: "Navigate the future of risk with AI-ready compliance.",
    reporting: "Turn security data into decisions."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Marketing Insights - Admin Dashboard</title>
        <meta name="description" content="Key differentiators and marketing points for the Cy-Sec FortifyOne." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-blue-600" />
                Marketing Insights
              </h1>
              <p className="text-slate-600 mt-1">Key selling points for the FortifyOne platform.</p>
            </div>
            <Button onClick={() => navigate('/admin')}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Core Taglines</CardTitle>
              <CardDescription>Punchy one-liners for various marketing contexts.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <h4 className="font-bold text-blue-800">Overall Platform</h4>
                <p className="text-lg">"{taglines.main}"</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <h4 className="font-bold text-green-800">Compliance</h4>
                <p>"{taglines.compliance}"</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-lg">
                <h4 className="font-bold text-purple-800">Vendor Risk</h4>
                <p>"{taglines.vendor}"</p>
              </div>
              <div className="p-4 bg-cyan-100 rounded-lg">
                <h4 className="font-bold text-cyan-800">AI Risk</h4>
                <p>"{taglines.ai}"</p>
              </div>
              <div className="p-4 bg-orange-100 rounded-lg">
                <h4 className="font-bold text-orange-800">Reporting</h4>
                <p>"{taglines.reporting}"</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Unique Differentiators (What Makes Us Different)</CardTitle>
              <CardDescription>Focus on these points to stand out from competitors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-4 border rounded-lg bg-white">
                  <item.icon className="h-10 w-10 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-600 mt-1">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.keywords.map(kw => <Badge key={kw} variant="secondary">{kw}</Badge>)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target Audience & Pain Points</CardTitle>
              <CardDescription>Tailor your message to solve these specific problems.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {targetAudiences.map((audience, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> {audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h5 className="font-semibold mb-2 text-red-600">Their Pains:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                      {audience.painPoints.map((pain, i) => <li key={i}>{pain}</li>)}
                    </ul>
                    <h5 className="font-semibold mt-4 mb-2 text-green-600">Our Solution:</h5>
                    <p className="text-sm text-slate-700">{audience.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default MarketingInsights;