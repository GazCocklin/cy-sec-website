import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, AlertTriangle, BookOpen, GraduationCap, Monitor } from 'lucide-react';

const consultancy = [
  { icon: Shield, title: 'Virtual CISO', desc: 'Dedicated cybersecurity leadership from £995/month. FortifyOne platform included.', href: '/vciso', colour: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
  { icon: Zap, title: 'DORA Compliance Sprint', desc: 'Get DORA-ready in weeks, not months. Fixed price from £4,000.', href: '/dora-compliance', colour: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
  { icon: AlertTriangle, title: 'NIS2 Compliance', desc: 'NIS2 is in force. Know your obligations and get compliant fast. From £2,500.', href: '/nis2-compliance', colour: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
];

const training = [
  { icon: GraduationCap, title: 'Professional Certifications', desc: 'CompTIA & CertNexus authorised training. Security+, CySA+, Network+ and more.', href: '/training/comptia-certifications', colour: 'bg-cyan-50 text-cyan-600', border: 'hover:border-cyan-200' },
  { icon: BookOpen, title: 'Security Awareness', desc: 'Role-specific, bespoke cybersecurity training for your entire organisation.', href: '/training-delivery', colour: 'bg-cyan-50 text-cyan-600', border: 'hover:border-cyan-200' },
  { icon: Monitor, title: 'FortifyLearn PBQ Engine', desc: 'CompTIA performance-based question simulations with live Cisco IOS topology.', href: '/pbq-engine', colour: 'bg-cyan-50 text-cyan-600', border: 'hover:border-cyan-200',  },
];

const ServiceCard = ({ service, navigate }) => {
  const { icon: Icon, title, desc, href, colour, border, badge } = service;
  return (
    <div
      onClick={() => navigate(href)}
      className={`group relative bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${border}`}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">{badge}</span>
      )}
      <div className={`w-10 h-10 rounded-xl ${colour} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};

const ServicesGrid = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">What We Do</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything in one place</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Consultancy, compliance, and certified training — all from a single trusted partner.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Consultancy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Consultancy Services</span>
              <div className="h-px flex-1 bg-blue-100" />
            </div>
            <div className="space-y-4">
              {consultancy.map(s => <ServiceCard key={s.title} service={s} navigate={navigate} />)}
            </div>
          </div>

          {/* Training */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Training Services</span>
              <div className="h-px flex-1 bg-cyan-100" />
            </div>
            <div className="space-y-4">
              {training.map(s => <ServiceCard key={s.title} service={s} navigate={navigate} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
