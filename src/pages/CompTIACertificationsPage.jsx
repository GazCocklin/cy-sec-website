import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, BookOpenCheck, GraduationCap, UserCheck, Combine, Monitor, Users, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';

const certLogos = {
  'comptia-network-plus': '/logos/comptia-network-plus.svg',
  'comptia-security-plus': '/logos/comptia-security-plus.svg',
  'comptia-cysa-plus': '/logos/comptia-cysa-plus.svg',
  'comptia-cloud-plus': '/logos/comptia-cloud-plus.svg',
  'comptia-ai-essentials': '/logos/comptia-ai-essentials.svg',
};

const allCourses = [
  // Self-Study
  { name: 'CompTIA Network+', code: 'N10-009', delivery: 'self-study', logo: 'comptia-network-plus', features: ['Access to CompTIA CertMaster', 'Access to CompTIA eBook', 'Access to CompTIA Labs', 'Exam Voucher Included'], ctaSource: 'network_plus_self_study' },
  { name: 'CompTIA Security+', code: 'SY0-701', delivery: 'self-study', logo: 'comptia-security-plus', features: ['Access to CompTIA CertMaster', 'Access to CompTIA eBook', 'Access to CompTIA Labs', 'Exam Voucher Included'], ctaSource: 'security_plus_self_study' },
  { name: 'CompTIA CySA+', code: 'CS0-003', delivery: 'self-study', logo: 'comptia-cysa-plus', features: ['Access to CompTIA CertMaster', 'Access to CompTIA eBook', 'Access to CompTIA Labs', 'Exam Voucher Included'], ctaSource: 'cysa_plus_self_study' },
  { name: 'CompTIA Cloud+', code: 'CV0-004', delivery: 'self-study', logo: 'comptia-cloud-plus', features: ['Access to CompTIA CertMaster', 'Access to CompTIA eBook', 'Access to CompTIA Labs', 'Exam Voucher Included'], ctaSource: 'cloud_plus_self_study' },
  { name: 'CompTIA AI Essentials', code: 'FC0-U71', delivery: 'self-study', logo: 'comptia-ai-essentials', features: ['Access to CompTIA CertMaster', 'Access to CompTIA eBook', 'Access to CompTIA Labs'], ctaSource: 'ai_essentials_self_study' },
  // Instructor-Led
  { name: 'CompTIA Network+', code: 'N10-009', delivery: 'instructor-led', logo: 'comptia-network-plus', features: ['Live Instructor-Led Sessions', 'Interactive Q&A with Experts', 'Structured Class Schedule', 'All Self-Study Materials Included'], ctaSource: 'network_plus_instructor_led' },
  { name: 'CompTIA Security+', code: 'SY0-701', delivery: 'instructor-led', logo: 'comptia-security-plus', features: ['Live Instructor-Led Sessions', 'Interactive Q&A with Experts', 'Structured Class Schedule', 'All Self-Study Materials Included'], ctaSource: 'security_plus_instructor_led' },
  { name: 'CompTIA CySA+', code: 'CS0-003', delivery: 'instructor-led', logo: 'comptia-cysa-plus', features: ['Live Instructor-Led Sessions', 'Interactive Q&A with Experts', 'Structured Class Schedule', 'All Self-Study Materials Included'], ctaSource: 'cysa_plus_instructor_led' },
  { name: 'CompTIA Cloud+', code: 'CV0-004', delivery: 'instructor-led', logo: 'comptia-cloud-plus', features: ['Live Instructor-Led Sessions', 'Interactive Q&A with Experts', 'Structured Class Schedule', 'All Self-Study Materials Included'], ctaSource: 'cloud_plus_instructor_led' },
  { name: 'CompTIA AI Essentials', code: 'FC0-U71', delivery: 'instructor-led', logo: 'comptia-ai-essentials', features: ['Live Instructor-Led Sessions', 'Interactive Q&A with Experts', 'Structured Class Schedule', 'All Self-Study Materials Included'], ctaSource: 'ai_essentials_instructor_led' },
  // Hybrid
  { name: 'CompTIA Network+', code: 'N10-009', delivery: 'hybrid', logo: 'comptia-network-plus', features: ['Self-Paced Learning with Instructor Support', 'On-Demand Videos & Live Workshops', 'Dedicated Mentor Access', 'All Self-Study Materials Included'], ctaSource: 'network_plus_hybrid' },
  { name: 'CompTIA Security+', code: 'SY0-701', delivery: 'hybrid', logo: 'comptia-security-plus', features: ['Self-Paced Learning with Instructor Support', 'On-Demand Videos & Live Workshops', 'Dedicated Mentor Access', 'All Self-Study Materials Included'], ctaSource: 'security_plus_hybrid' },
  { name: 'CompTIA CySA+', code: 'CS0-003', delivery: 'hybrid', logo: 'comptia-cysa-plus', features: ['Self-Paced Learning with Instructor Support', 'On-Demand Videos & Live Workshops', 'Dedicated Mentor Access', 'All Self-Study Materials Included'], ctaSource: 'cysa_plus_hybrid' },
  { name: 'CompTIA Cloud+', code: 'CV0-004', delivery: 'hybrid', logo: 'comptia-cloud-plus', features: ['Self-Paced Learning with Instructor Support', 'On-Demand Videos & Live Workshops', 'Dedicated Mentor Access', 'All Self-Study Materials Included'], ctaSource: 'cloud_plus_hybrid' },
  { name: 'CompTIA AI Essentials', code: 'FC0-U71', delivery: 'hybrid', logo: 'comptia-ai-essentials', features: ['Self-Paced Learning with Instructor Support', 'On-Demand Videos & Live Workshops', 'Dedicated Mentor Access', 'All Self-Study Materials Included'], ctaSource: 'ai_essentials_hybrid' },
];

const deliveryModes = [
  {
    key: 'self-study',
    label: 'Self Study',
    icon: Monitor,
    title: 'Self-Study Modules',
    description: 'Master certifications at your own pace. Access CompTIA CertMaster, official eBooks, practice labs and an exam voucher — everything you need, on your schedule.',
  },
  {
    key: 'instructor-led',
    label: 'Instructor Led',
    icon: Users,
    title: 'Instructor-Led Courses',
    description: 'Learn directly from industry practitioners in structured, interactive sessions. Live Q&A, real-world scenarios and expert guidance throughout.',
  },
  {
    key: 'hybrid',
    label: 'Hybrid',
    icon: Layers,
    title: 'Hybrid Programmes',
    description: 'The best of both formats. Self-paced study combined with scheduled live workshops and a dedicated mentor to keep you on track.',
  },
];

export default function CompTIACertificationsPage() {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('self-study');

  const courses = useMemo(() => allCourses.filter(c => c.delivery === delivery), [delivery]);
  const currentMode = deliveryModes.find(m => m.key === delivery);

  return (
    <>
      <Helmet>
        <title>CompTIA Professional Certifications | Self-Study & Instructor-Led | Cy-Sec</title>
        <meta name="description" content="Official CompTIA certification training from an Authorised Partner. Network+, Security+, CySA+, Cloud+ and AI Essentials — self-study, instructor-led and hybrid options." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        {/* Photo background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80&fit=crop"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(7,19,38,0.97) 0%, rgba(10,26,63,0.95) 40%, rgba(8,92,138,0.85) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#1A56DB 1px, transparent 1px), linear-gradient(to right, #1A56DB 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logos/comptia-partner-badge.webp" alt="CompTIA Authorised Partner" className="h-14 w-auto" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-0.03em', fontFamily: 'Bricolage Grotesque, Inter, system-ui, sans-serif', lineHeight: 1.1 }}>
                CompTIA<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #0891B2)' }}>
                  Certifications.
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed mb-8">
                Industry-recognised certifications delivered by a CompTIA Authorised Partner. Choose the format that works for you — study independently, with an instructor, or a blend of both.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Network+', 'Security+', 'CySA+', 'Cloud+', 'AI Essentials'].map(cert => (
                  <span key={cert} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}>
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — delivery mode cards */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
              className="hidden lg:flex flex-col gap-3">
              {deliveryModes.map(mode => {
                const Icon = mode.icon;
                const active = delivery === mode.key;
                return (
                  <button key={mode.key} onClick={() => setDelivery(mode.key)}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: active ? 'rgba(8,145,178,0.2)' : 'rgba(255,255,255,0.06)',
                      border: active ? '1px solid rgba(8,145,178,0.5)' : '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: active ? 'rgba(8,145,178,0.3)' : 'rgba(255,255,255,0.08)' }}>
                      <Icon size={18} style={{ color: active ? '#22d3ee' : 'rgba(255,255,255,0.6)' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: active ? 'white' : 'rgba(255,255,255,0.7)' }}>{mode.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{mode.title}</div>
                    </div>
                    {active && <ArrowRight size={14} className="ml-auto" style={{ color: '#0891B2' }} />}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY MODE SELECTOR (mobile) ── */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white sticky top-[121px] z-30">
        {deliveryModes.map(mode => (
          <button key={mode.key} onClick={() => setDelivery(mode.key)}
            className={cn('flex-1 py-3 text-xs font-semibold transition-colors', delivery === mode.key ? 'text-[#0891B2] border-b-2 border-[#0891B2]' : 'text-slate-500')}>
            {mode.label}
          </button>
        ))}
      </div>

      {/* ── COURSES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">

          {/* Desktop tab pills */}
          <div className="hidden lg:flex justify-center mb-12">
            <div className="bg-white border border-slate-200 p-1 rounded-2xl flex gap-1 shadow-sm">
              {deliveryModes.map(mode => {
                const Icon = mode.icon;
                return (
                  <button key={mode.key} onClick={() => setDelivery(mode.key)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                      delivery === mode.key
                        ? 'text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-700'
                    )}
                    style={delivery === mode.key ? { background: 'linear-gradient(135deg, #065F7A, #0891B2)' } : {}}>
                    <Icon size={15} />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode description */}
          <AnimatePresence mode="wait">
            <motion.div key={delivery}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentMode.title}</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">{currentMode.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                  <motion.div key={`${course.code}-${delivery}`}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col">

                    {/* Card header */}
                    <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #065F7A, #0891B2)' }} />

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-5">
                        {course.logo ? (
                          <img src={certLogos[course.logo]} alt={course.name} className="w-12 h-12 object-contain" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(8,145,178,0.08)' }}>
                            <GraduationCap size={22} style={{ color: '#0891B2' }} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm leading-tight">{course.name}</h3>
                          <span className="text-xs font-mono font-semibold" style={{ color: '#0891B2' }}>{course.code}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6 flex-grow">
                        {course.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#0891B2' }} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => navigate(`/contact?source=comptia_cert_${course.ctaSource}`)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 group"
                        style={{ background: 'rgba(8,145,178,0.08)', color: '#0891B2', border: '1px solid rgba(8,145,178,0.2)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(8,145,178,0.15)'; e.currentTarget.style.borderColor = 'rgba(8,145,178,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(8,145,178,0.08)'; e.currentTarget.style.borderColor = 'rgba(8,145,178,0.2)'; }}>
                        Enquire About Course
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── STANDARDS ALIGNMENT ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Aligned With</p>
            <h2 className="text-xl font-bold text-slate-800">Global Skills Frameworks</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'DOD 8140m', desc: 'Department of Defense Directive' },
              { name: 'SFIA', desc: 'Skills Framework for the Information Age' },
              { name: 'UK Cyber Security Council', desc: 'Skills & Competency Framework' },
              { name: 'CompTIA Authorised', desc: 'Official Partner Programme' },
            ].map(item => (
              <div key={item.name} className="text-center p-4 rounded-xl border border-slate-100 bg-slate-50">
                <p className="font-bold text-slate-700 text-sm mb-1">{item.name}</p>
                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #071326 0%, #0A1E3F 60%, #0a5c8a 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Award size={40} className="mx-auto mb-5" style={{ color: '#0891B2' }} />
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Ready to start your certification journey?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Whether you're an individual looking to upskill or an organisation building team capability — we'll find the right format and programme for your goals.
          </p>
          <button
            onClick={() => navigate('/contact?source=comptia_cert_page_cta')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #065F7A, #0891B2)', boxShadow: '0 4px 20px rgba(8,145,178,0.35)' }}>
            Get in Touch <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}
