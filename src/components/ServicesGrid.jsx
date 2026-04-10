import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, AlertTriangle, BookOpen, GraduationCap, Monitor } from 'lucide-react';

const consultancy = [
  { icon: Shield,       title: 'Virtual CISO',           desc: 'Dedicated cybersecurity leadership from £995/month. FortifyOne platform included.',              href: '/vciso' },
  { icon: Zap,          title: 'DORA Compliance Sprint', desc: 'Get DORA-ready in weeks, not months. Fixed price from £4,000.',                                   href: '/dora-compliance' },
  { icon: AlertTriangle,title: 'NIS2 Compliance',        desc: 'NIS2 is in force. Know your obligations and get compliant fast. From £2,500.',                   href: '/nis2-compliance' },
];

const training = [
  { icon: GraduationCap, title: 'Professional Certifications', desc: 'CompTIA & CertNexus authorised training. Security+, CySA+, Network+ and more.', href: '/training/comptia-certifications' },
  { icon: BookOpen,      title: 'Security Awareness',         desc: 'Role-specific, bespoke cybersecurity training for your entire organisation.',    href: '/training-delivery' },
  { icon: Monitor,       title: 'FortifyLearn PBQ Engine',    desc: 'CompTIA performance-based question simulations in representative CLI environments.',href: '/pbq-engine' },
];

const ServiceCard = ({ service, navigate }) => {
  const { icon: Icon, title, desc, href } = service;
  return (
    <div
      onClick={() => navigate(href)}
      className="group relative bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#0891B2]/30"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'linear-gradient(135deg,rgba(11,29,58,0.08),rgba(8,145,178,0.12))' }}>
        <Icon className="w-5 h-5" style={{ color: '#0891B2' }} />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors group-hover:text-[#0891B2]">
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};

export default function ServicesGrid() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#0891B2' }}>What We Do</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything in one place</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Consultancy, compliance, and certified training — all from a single trusted partner.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Consultancy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0891B2' }}>Consultancy Services</span>
              <div className="h-px flex-1" style={{ background: 'rgba(8,145,178,0.2)' }} />
            </div>
            <div className="space-y-4">
              {consultancy.map(s => <ServiceCard key={s.title} service={s} navigate={navigate} />)}
            </div>
          </div>

          {/* Training */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0891B2' }}>Training Services</span>
              <div className="h-px flex-1" style={{ background: 'rgba(8,145,178,0.2)' }} />
            </div>
            <div className="space-y-4">
              {training.map(s => <ServiceCard key={s.title} service={s} navigate={navigate} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
