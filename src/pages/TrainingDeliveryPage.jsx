import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Zap, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const TrainingDeliveryPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleContactUs = (source) => {
    navigate(`/contact?source=training_${source}`);
  };

  const CorporateCard = ({ icon: Icon, title, description, points, buttonText, onButtonClick, colorClass, buttonColorClass }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
    >
      <Icon className={`h-12 w-12 ${colorClass} mb-6`} />
      <h3 className={`text-2xl font-bold mb-4 ${colorClass}`}>{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <ul className="space-y-3 text-slate-600 mb-8">
        {points.map((point, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className={`h-5 w-5 ${colorClass} mr-3 mt-1 flex-shrink-0`} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={onButtonClick}
        variant="outline"
        className={`w-full mt-auto ${buttonColorClass}`}
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
  
  const CertificationCard = ({ logo, title, description, buttonText, onButtonClick, colorClass, buttonColorClass }) => (
     <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <img src={logo} alt={`${title} logo`} className="h-12 max-w-[150px] object-contain object-left mb-6" />
      <h3 className={`text-2xl font-bold mb-4 ${colorClass}`}>{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <Button
        onClick={onButtonClick}
        variant="outline"
        className={`w-full mt-auto ${buttonColorClass}`}
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );


  const frameworks = [
    { name: 'DOD 8140m', logo: '/dod-logo.svg', description: 'Department of Defense Directive' },
    { name: 'SFIA', logo: '/sfia-logo.svg', description: 'Skills Framework for the Information Age' },
    { name: 'UK Cyber Security Council', logo: '/ukcsc-logo.svg', description: 'Skills & Competency Framework' },
  ];

  return (
    <>
      <Helmet>
        <title>CompTIA & CertNexus Cybersecurity Training UK | Cy-Sec</title>
        <meta name="description" content="Authorised CompTIA and CertNexus training partner. Security+, CySA+, CASP+ and more. Corporate security awareness training, role-specific modules, and tabletop exercises for UK businesses." />
      </Helmet>
      <div className="min-h-screen">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-slate-50 to-blue-100/30">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
              Expert <span className="gradient-text">Training Delivery</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Empower your team and advance your career with our comprehensive suite of training solutions, from corporate programmes to professional certifications.
            </p>
          </motion.div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                   Professional Certifications
                 </h2>
                 <p className="mt-4 text-lg text-slate-600">Earn industry-recognised certifications to validate your skills and advance your career path.</p>
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <CertificationCard
                 logo="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/390c3df2ac99cc7ad0233de0dda0a060.png"
                 title="CompTIA"
                 description="Globally recognized certifications for IT professionals covering infrastructure, cybersecurity, data, and analytics."
                 buttonText="View CompTIA Courses"
                 onButtonClick={() => handleNavigation('/training/comptia-certifications')}
                 colorClass="text-[#0072C6]"
                 buttonColorClass="border-[#0072C6] text-[#0072C6] hover:bg-[#0072C6]/10"
               />
               <CertificationCard
                 logo="https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/3c564edf4197ff2826b29bfb622cb01b.png"
                 title="CertNexus"
                 description="Vendor-neutral, emerging technology certifications and micro-credentials for IT and security professionals."
                 buttonText="View CertNexus Courses"
                 onButtonClick={() => handleNavigation('/training/certnexus-certifications')}
                 colorClass="text-[#007ACC]"
                 buttonColorClass="border-[#007ACC] text-[#007ACC] hover:bg-[#007ACC]/10"
               />
               <div className="feature-card-border rounded-xl p-8 bg-slate-100/80 backdrop-blur-sm flex flex-col justify-center items-center text-center shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-700">Launching Summer 2026</h3>
                  <p className="text-slate-500 mt-2">Join the Waitlist! We are always expanding our certification offerings. BCS and ISACA partnerships are on the horizon!</p>
               </div>
             </div>
           </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                   Corporate & Custom Solutions
                 </h2>
                 <p className="mt-4 text-lg text-slate-600">Strengthen your organisation's security posture with training designed for your team.</p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CorporateCard
                icon={Briefcase}
                title="Corporate Solutions"
                description="Comprehensive training including security awareness, role-specific modules, and executive-level tabletop exercises."
                points={["Security Awareness Training", "Individual Modules (Role Specific)", "TableTop Scenarios (Executive & Technical)"]}
                buttonText="Discuss Corporate Needs"
                onButtonClick={() => handleContactUs('corporate')}
                colorClass="text-blue-600"
                buttonColorClass="border-blue-500 text-blue-600 hover:bg-blue-500/10"
              />
              <CorporateCard
                icon={Zap}
                title="Custom / Bespoke Content"
                description="Develop a unique training programme tailored precisely to your business objectives and team requirements."
                points={["Combination of all our offerings", "Unique content created for you", "Address specific skill gaps"]}
                buttonText="Create a Custom Plan"
                onButtonClick={() => handleContactUs('bespoke')}
                colorClass="text-green-600"
                buttonColorClass="border-green-500 text-green-600 hover:bg-green-500/10"
              />
            </div>
          </div>
        </section>

        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                 <h2 className="text-lg font-semibold text-blue-600 uppercase tracking-wider">Aligned with Industry Standards</h2>
                 <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                   Mapped to Global Skills Frameworks
                 </p>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {frameworks.map((framework, index) => (
                  <motion.div 
                    key={framework.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center border border-slate-200/80"
                  >
                    <ShieldCheck className="h-10 w-10 text-blue-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-slate-800">{framework.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{framework.description}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-8 text-slate-600">
                Our curriculum is aligned with leading frameworks to ensure your team's skills meet recognised global standards where applicable.
              </p>
            </motion.div>
          </div>
        </section>


        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm shadow-xl"
            >
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
                Ready to <span className="gradient-text">Advance Your Skills?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Whether you're an individual looking to upskill or an organisation seeking to empower your team, we have the right cybersecurity training solution. Let's discuss your goals.
              </p>
              <Button
                onClick={() => handleContactUs('final_cta')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg glow-effect"
              >
                Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrainingDeliveryPage;