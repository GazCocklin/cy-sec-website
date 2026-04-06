import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Linkedin, Send, Lightbulb, Copy, ArrowRight, ShieldCheck, Zap, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Integrated Risk Management",
    description: "Unlike single-point solutions, Cy-Sec FortifyOne offers a unified platform for both internal compliance (ISO, NIST, DORA) and external third-party vendor risk. This provides a holistic view of an organisation's entire risk landscape.",
    keywords: ["HolisticSecurity", "UnifiedPlatform", "RiskManagement", "ComplianceAutomation", "VendorRisk"]
  },
  {
    icon: Zap,
    title: "AI-Powered & Future-Ready",
    description: "We are one of the few platforms explicitly supporting AI-specific risk assessments (NIST AI RMF). This positions us as a forward-thinking partner ready for the next wave of technology challenges.",
    keywords: ["AIRiskManagement", "NISTAIRMF", "FutureProofCompliance", "AIEthics", "ResponsibleAI"]
  },
  {
    icon: Users,
    title: "Consultancy-Backed Platform",
    description: "The platform isn't just a tool; it's a service. The option to pair it with expert consultancy (from vCISO to project-based) provides a level of support that pure SaaS competitors can't match.",
    keywords: ["ExpertGuided", "vCISO", "CyberConsulting", "SaaSPlus", "Partnership"]
  },
  {
    icon: FileText,
    title: "Actionable, Board-Ready Reporting",
    description: "Our focus on generating clear, professional PDF reports and downloadable risk summaries (Excel) translates complex data into actionable insights for stakeholders and auditors.",
    keywords: ["ExecutiveReporting", "AuditReady", "DataDrivenDecisions", "CybersecurityReports", "ComplianceReporting"]
  }
];

const targetAudiences = [
  {
    title: "Small to Medium-sized Enterprises (SMEs)",
    painPoints: [
      "Struggle with the complexity and cost of enterprise GRC tools.",
      "Need to demonstrate compliance for key clients or contracts.",
      "Manage multiple vendors but lack a formal risk process."
    ],
    solution: "Cy-Sec FortifyOne offers an affordable, all-in-one solution that simplifies compliance and vendor management, backed by optional expert help when they need it. Get enterprise-grade security without the enterprise price tag! #SMBsecurity #ComplianceSimplified"
  },
  {
    title: "Managed Service Providers (MSPs) & Consultants",
    painPoints: [
      "Manage security for multiple clients with disparate tools.",
      "Need an efficient way to conduct and report on client assessments.",
      "Want to add higher-value security services to their portfolio."
    ],
    solution: "Cy-Sec FortifyOne provides a scalable, multi-tenant-ready platform to streamline client assessments, demonstrate value, and expand their service offerings. Elevate your client services and operational efficiency! #MSPSolutions #CybersecurityConsulting"
  },
  {
    title: "Companies Adopting AI",
    painPoints: [
      "Unsure how to manage the unique risks of AI implementation.",
      "Need to align with emerging standards like the NIST AI RMF.",
      "Struggle to explain AI risk posture to stakeholders."
    ],
    solution: "Cy-Sec FortifyOne provides the specific tools and frameworks to confidently navigate AI risks, ensuring responsible and compliant innovation. Stay ahead in the AI revolution, securely and compliantly! #AIRisk #NISTAIRMF #AICompliance"
  }
];

const LinkedinMarketingGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const generatePost = (type, data = null) => {
    let post = '';
    let hashtags = ['#CySecFortifyOne', '#Cybersecurity', '#RiskManagement'];

    switch (type) {
      case 'intro':
        post = `🛡️ Introducing Cy-Sec FortifyOne: Your ultimate all-in-one platform for comprehensive cyber risk and compliance management! 🚀\n\nGain total control over your internal compliance (ISO 27001, NIST, DORA) AND effectively manage third-party vendor risks from a single, intuitive dashboard.\n\nSimplify complex regulations, get actionable insights, and strengthen your security posture. Ready to transform your cyber risk management? Learn more: [Link to Security Suite Page]`;
        hashtags = [...hashtags, '#Compliance', '#VendorRisk', '#UnifiedSecurity'];
        break;
      case 'differentiator':
        if (data) {
          post = `🌟 Spotlight on ${data.title} with Cy-Sec FortifyOne!\n\n${data.description} Our platform helps you to achieve seamless integration and unparalleled oversight.\n\nReady to experience the difference? Discover how we're redefining cyber risk management: [Link to Security Suite Page]`;
          hashtags = [...hashtags, ...data.keywords];
        }
        break;
      case 'problem_solution':
        if (data) {
          post = `Is your organization facing challenges with ${data.painPoints[0].toLowerCase()}? Or struggling to ${data.painPoints[1].toLowerCase()}?\n\n💡 Cy-Sec FortifyOne is built to solve exactly these issues for ${data.title}! ${data.solution}\n\nDon't let cyber complexities slow you down. See how FortifyOne can empower your business: [Link to Security Suite Page]`;
          hashtags = [...hashtags, '#ProblemSolved', '#BusinessSecurity', '#Innovation'];
        }
        break;
      default:
        post = 'Select a post type to generate content.';
    }

    setGeneratedContent(post + '\n\n' + hashtags.map(tag => `${tag}`).join(' '));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Content Copied! 🎉",
      description: "The LinkedIn post content has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>LinkedIn Marketing Generator - Cy-Sec</title>
        <meta name="description" content="Generate ready-to-use LinkedIn marketing content for Cy-Sec FortifyOne." />
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
                <Linkedin className="h-8 w-8 text-blue-600" />
                LinkedIn Marketing Generator
              </h1>
              <p className="text-slate-600 mt-1">Craft compelling posts for your Cy-Sec FortifyOne campaigns!</p>
            </div>
            <Button onClick={() => navigate('/admin')}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generated LinkedIn Post</CardTitle>
              <CardDescription>Copy the content below and paste it directly into your LinkedIn post.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedContent}
                readOnly
                rows={10}
                placeholder="Generated LinkedIn content will appear here..."
                className="font-mono text-sm"
              />
              <Button onClick={copyToClipboard} disabled={!generatedContent} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" /> General Introduction</CardTitle>
                <CardDescription>A broad post introducing FortifyOne and its core benefits.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('intro')} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5" /> Feature Spotlight: Integrated Risk Management</CardTitle>
                <CardDescription>Highlighting our unified platform for compliance & vendor risk.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('differentiator', differentiators[0])} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Feature Spotlight: AI-Powered & Future-Ready</CardTitle>
                <CardDescription>Emphasizing support for NIST AI RMF and AI risk assessment.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('differentiator', differentiators[1])} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Problem/Solution: For SMEs</CardTitle>
                <CardDescription>Addressing common challenges faced by Small to Medium-sized Enterprises.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('problem_solution', targetAudiences[0])} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Problem/Solution: For MSPs & Consultants</CardTitle>
                <CardDescription>How FortifyOne helps Managed Service Providers and Consultants.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('problem_solution', targetAudiences[1])} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Problem/Solution: For Companies Adopting AI</CardTitle>
                <CardDescription>Guidance for businesses navigating AI implementation risks.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generatePost('problem_solution', targetAudiences[2])} className="w-full">
                  Generate Post
                </Button>
              </CardContent>
            </Card>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LinkedinMarketingGenerator;