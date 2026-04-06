import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  FileText, 
  Activity, 
  Network, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Zap, 
  ShieldCheck, 
  Target,
  BarChart,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DORAComplianceSprintPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact?source=dora_sprint');
  };

  const features = [
    {
      icon: Search,
      title: "Comprehensive Gap Analysis",
      description: "Identify precisely where your current security posture falls short of DORA requirements.",
      points: ["Policy review", "Technical control assessment", "Process evaluation"]
    },
    {
      icon: Activity,
      title: "Incident Reporting Readiness",
      description: "Streamline your ICT-related incident classification and reporting mechanisms.",
      points: ["Classification frameworks", "Reporting templates", "Workflow automation"]
    },
    {
      icon: Network,
      title: "Third-Party Risk Management",
      description: "Robust assessment and management of your ICT third-party service providers.",
      points: ["Vendor assessments", "Contract reviews", "Continuous monitoring strategy"]
    },
    {
      icon: ShieldAlert,
      title: "Resilience Testing Strategy",
      description: "Develop a proportionate and effective digital operational resilience testing programme.",
      points: ["TLPT planning", "Vulnerability assessments", "Scenario-based testing"]
    },
    {
      icon: Target,
      title: "Targeted Remediation Plan",
      description: "Actionable, prioritized roadmap to address identified compliance gaps efficiently.",
      points: ["Risk-based prioritization", "Resource estimation", "Timeline mapping"]
    },
    {
      icon: FileText,
      title: "Documentation Toolkit",
      description: "Access to tailored templates and policies aligned with DORA RTS and ITS.",
      points: ["ICT risk policies", "BCDR plans", "Information security policies"]
    }
  ];

  const phases = [
    {
      phase: "Phase 1: Discovery & Scoping",
      duration: "Weeks 1-2",
      description: "Understand your environment, identify critical functions, and map the ICT landscape.",
      deliverables: ["Scoping Document", "Information Gathering Request"]
    },
    {
      phase: "Phase 2: Gap Assessment",
      duration: "Weeks 3-5",
      description: "Detailed evaluation of current controls against DORA pillars and regulatory technical standards.",
      deliverables: ["Gap Analysis Report", "Initial Risk Register"]
    },
    {
      phase: "Phase 3: Remediation Strategy",
      duration: "Weeks 6-7",
      description: "Develop a prioritized action plan to close identified gaps and achieve compliance.",
      deliverables: ["Remediation Roadmap", "Resource Plan"]
    },
    {
      phase: "Phase 4: Implementation Support",
      duration: "Week 8+",
      description: "Ongoing guidance, documentation drafting, and support as you execute the remediation plan.",
      deliverables: ["Updated Policies", "Testing Frameworks", "Vendor Management Templates"]
    }
  ];

  const capabilities = [
    {
      title: "ICT Risk Management Framework",
      description: "We help you establish or align your existing risk management framework to meet DORA's stringent requirements, ensuring resilient ICT systems and continuous risk monitoring."
    },
    {
      title: "Business Continuity & Disaster Recovery",
      description: "Enhance your BCDR strategies to ensure rapid recovery of critical functions following severe ICT disruptions, minimizing operational downtime."
    },
    {
      title: "Threat-Led Penetration Testing (TLPT)",
      description: "Guidance on preparing for and executing advanced TLPT engagements, simulating sophisticated cyber attacks on critical live production systems."
    },
    {
      title: "Information Sharing Arrangements",
      description: "Facilitate participation in cyber threat information sharing communities, enhancing collective resilience while maintaining data protection standards."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>DORA Compliance Sprint | Cy-Sec</title>
        <meta name="description" content="Accelerate your path to Digital Operational Resilience Act (DORA) compliance with Cy-Sec's specialized sprint service. Expert gap analysis, remediation, and reporting for financial entities." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wider mb-4 uppercase">
              Regulatory Readiness
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              DORA Compliance <span className="text-cyan-400">Sprint</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
              Accelerate your path to Digital Operational Resilience Act compliance with our expert-led, phased assessment and remediation methodology.
            </p>
            <div className="pt-8">
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-6 text-lg glow-effect shadow-2xl"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Schedule Your Sprint Assessment
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Explanation Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Understanding <span className="gradient-text">DORA</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              The Digital Operational Resilience Act (DORA) is a comprehensive EU regulation that entered into force to ensure the financial sector can withstand, respond to, and recover from severe ICT-related disruptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="feature-card-border rounded-xl p-8 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <ShieldCheck className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Who is Affected?</h3>
              <p className="text-slate-600">
                Financial entities (banks, insurance companies, investment firms) and critical ICT third-party service providers (cloud platforms, data analytics) operating within the EU.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="feature-card-border rounded-xl p-8 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <BarChart className="h-12 w-12 text-cyan-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Core Objectives</h3>
              <p className="text-slate-600">
                Harmonize ICT risk management rules across the EU, elevate digital resilience, and ensure business continuity during operational disruptions or cyber attacks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="feature-card-border rounded-xl p-8 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Calendar className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Why Act Now?</h3>
              <p className="text-slate-600">
                With strict compliance deadlines approaching, organizations must proactively assess gaps, implement complex technical standards, and modernize vendor management practices to avoid penalties.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Sprint <span className="gradient-text">Deliverables & Benefits</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our DORA Compliance Sprint delivers actionable insights, structured frameworks, and expert guidance to fast-track your regulatory readiness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card-border rounded-xl p-8 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
              >
                <feature.icon className="h-10 w-10 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{feature.description}</p>
                <ul className="space-y-3 text-slate-600 mt-auto">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              The <span className="gradient-text">Sprint Methodology</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A structured, highly focused timeline designed to efficiently baseline your posture and chart the path forward.
            </p>
          </motion.div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">
            {phases.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {index + 1}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl feature-card-border bg-white shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h3 className="font-bold text-xl text-slate-800">{item.phase}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-slate-800 mb-2">Key Deliverables:</p>
                    <ul className="flex flex-wrap gap-2">
                      {item.deliverables.map((del, i) => (
                        <li key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {del}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Strategic <span className="text-cyan-400">Capabilities</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl">
              Beyond gap analysis, our team provides deep domain expertise across all foundational pillars of the DORA framework.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-3">{cap.title}</h3>
                <p className="text-slate-300 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm shadow-xl"
          >
            <Zap className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Ready to Accelerate Your <span className="gradient-text">DORA Compliance?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Don't wait for deadlines to dictate your strategy. Partner with Cy-Sec to build a robust, compliant digital resilience framework.
            </p>
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-lg glow-effect shadow-lg"
            >
              Contact Our Experts <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DORAComplianceSprintPage;