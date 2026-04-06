import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Clock,
  Briefcase,
  Download,
  Target,
  FileText,
  Activity,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const NIS2CompliancePage = () => {
  const navigate = useNavigate();

  const handleBookAssessment = () => {
    navigate('/contact?source=nis2_assessment');
  };

  const handleDownloadChecklist = () => {
    // In a real scenario, this would trigger a download or navigate to a lead magnet form
    navigate('/contact?source=nis2_checklist');
  };

  const sectors = [
    "Energy (Electricity, Oil, Gas)",
    "Transport (Air, Rail, Water, Road)",
    "Banking & Financial Markets",
    "Health (Hospitals, R&D, Pharma)",
    "Drinking & Waste Water",
    "Digital Infrastructure (Cloud, DNS)",
    "ICT Service Management (MSPs, MSSPs)",
    "Public Administration",
    "Space",
    "Postal & Courier Services",
    "Waste Management",
    "Manufacturing (Critical Products)"
  ];

  const requirements = [
    {
      icon: ShieldCheck,
      title: "1. Risk Management",
      description: "Implement robust technical, operational, and organizational measures. This includes incident handling, supply chain security, network security, and access control policies."
    },
    {
      icon: Clock,
      title: "2. Incident Reporting",
      description: "Strict phased reporting obligations: A 24-hour early warning, a 72-hour detailed incident notification, and a comprehensive 1-month final report for significant incidents."
    },
    {
      icon: Activity,
      title: "3. Business Continuity",
      description: "Develop and maintain comprehensive plans for backup management, disaster recovery, and crisis management to ensure continuous operations during severe disruptions."
    },
    {
      icon: AlertTriangle,
      title: "4. Accountability",
      description: "Management bodies must approve cybersecurity measures and oversee implementation. Senior management can be held personally liable for non-compliance, facing temporary bans from leadership roles."
    }
  ];

  const reviewDeliverables = [
    "Comprehensive NIS2 Gap Analysis",
    "Entity Applicability & Scope Assessment",
    "Supply Chain & Third-Party Risk Review",
    "Written, Prioritized Remediation Roadmap",
    "2-Hour Executive Leadership Debrief",
    "30-Day Free Trial of Cy-Sec FortifyOne Platform"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>NIS2 Compliance for UK & EU Businesses | Cy-Sec</title>
        <meta name="description" content="Cy-Sec helps businesses achieve NIS2 compliance quickly. Book a readiness review, avoid massive fines, and secure your supply chain against cyber threats." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034)',
            filter: 'brightness(0.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/95" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider mb-6 uppercase">
              Regulatory Compliance
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-cyan-400">NIS2 Compliance</span> <br/>for UK & EU Businesses
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light">
              Are You Ready for NIS2? Don't Wait for Enforcement — Get Compliant Now.
            </p>
            <p className="text-lg text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              NIS2 is now in force, bringing stricter cybersecurity requirements and massive fines for non-compliance. Cy-Sec helps businesses baseline their posture and achieve compliance quickly and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button 
                onClick={handleBookAssessment}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-7 text-lg shadow-xl shadow-blue-900/20"
              >
                <Target className="mr-3 h-5 w-5" />
                Book a Free NIS2 Assessment
              </Button>
              <Button 
                onClick={handleDownloadChecklist}
                variant="outline" 
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400 px-8 py-7 text-lg bg-slate-900/50 backdrop-blur-sm"
              >
                <Download className="mr-3 h-5 w-5" /> 
                Download NIS2 Checklist
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* WHO DOES NIS2 APPLY TO SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              Who Does <span className="gradient-text">NIS2</span> Apply To?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The scope has expanded dramatically. Even if your business wasn't covered by the original NIS Directive, you may now be directly regulated or impacted via supply chain requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Sectors */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <Building2 className="mr-3 text-blue-600 h-6 w-6" /> Covered Sectors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sectors.map((sector, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm font-medium">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Entity Classifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100 hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                    Essential Entities
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Large enterprises in highly critical sectors (e.g., Energy, Transport, Banking). Subject to direct, proactive supervision.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-semibold flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                      Maximum Fines:
                    </p>
                    <p className="text-red-600 mt-1">Up to <strong>€10,000,000</strong> or <strong>2%</strong> of the total worldwide annual turnover, whichever is higher.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                    Important Entities
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Medium enterprises in highly critical sectors, or medium/large enterprises in other critical sectors (e.g., Waste, Manufacturing). Subject to reactive supervision.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 font-semibold flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                      Maximum Fines:
                    </p>
                    <p className="text-orange-600 mt-1">Up to <strong>€7,000,000</strong> or <strong>1.4%</strong> of the total worldwide annual turnover, whichever is higher.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT NIS2 REQUIRES SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What <span className="text-cyan-400">NIS2</span> Requires
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              The directive shifts the focus from mere suggestions to legally binding, rigorous cybersecurity hygiene.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <req.icon className="h-12 w-12 text-blue-400 mb-6 group-hover:text-cyan-400 transition-colors" />
                <h3 className="text-2xl font-bold text-white mb-4">{req.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {req.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CY-SEC NIS2 READINESS REVIEW SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-8 text-center">
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Cy-Sec NIS2 Readiness Review</h2>
              <p className="text-blue-200">A clear, actionable roadmap to compliance.</p>
            </div>
            
            <div className="p-8 md:p-12 text-center">
              <div className="mb-10 flex flex-col items-center justify-center">
                <div className="flex items-baseline text-6xl font-extrabold text-slate-800">
                  £2,500
                </div>
                <span className="text-slate-500 text-lg font-medium mt-1">fixed price, no hidden fees</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
                {reviewDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg py-4 px-6 mb-10 inline-block">
                <p className="text-blue-800 font-bold flex items-center">
                  <Clock className="mr-2 h-5 w-5" /> Delivery Timeframe: 2-3 Weeks
                </p>
              </div>

              <Button 
                onClick={handleBookAssessment}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-7 text-xl font-bold shadow-lg glow-effect"
              >
                Book Your NIS2 Review — £2,500
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ONGOING COMPLIANCE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Need Ongoing Compliance Support?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Achieving compliance is only half the battle; maintaining it requires continuous oversight. Our Virtual CISO (vCISO) service provides board-level security leadership, ongoing risk management, and regulatory compliance maintenance at a fraction of the cost of a full-time hire.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/vciso')}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
          >
            Explore our vCISO Service <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ShieldCheck className="h-16 w-16 text-cyan-400 mx-auto mb-6 pulse-glow" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Don't Wait for a Fine. <br />
            <span className="text-cyan-400">Get NIS2-Ready Today.</span>
          </h2>
          <Button 
            onClick={handleBookAssessment}
            className="bg-white text-blue-900 hover:bg-slate-100 px-12 py-7 text-xl font-bold shadow-2xl"
          >
            Book Free Assessment <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NIS2CompliancePage;