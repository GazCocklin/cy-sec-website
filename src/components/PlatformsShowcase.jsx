import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const GradText = ({ children }) => (
  <span style={{
    background: 'linear-gradient(90deg, #1A56DB, #06B6D4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
  }}>{children}</span>
);

const PlatformsShowcase = () => (
  <section className="py-24 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Our Platforms</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Built by practitioners</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Two platforms that extend Cy-Sec's reach — available independently or as part of a managed vCISO engagement.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* FortifyLearn */}
        <div className="relative bg-slate-900 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, #1A56DB 0%, #06B6D4 100%)' }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black">
                
              </div>
              <span className="font-bold text-white text-xl">Fortify<GradText>Learn</GradText></span>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              CompTIA PBQ simulations with live Cisco IOS topology, real CLI commands, and objective-by-objective scoring. Study mode and exam mode included.
            </p>
            <div className="space-y-2 mb-8">
              {['Live Cisco IOS & Linux environment','Network+ and Security+ coverage','Free to start — no payment required'].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Try FortifyLearn <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-slate-500 text-sm">Free to start</span>
            </div>
          </div>
        </div>

        {/* FortifyOne */}
        <div className="relative bg-slate-900 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, #1E3A8A 0%, #1A56DB 100%)' }} />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black">
                
              </div>
              <span className="font-bold text-white text-xl">Fortify<GradText>One</GradText></span>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              GRC compliance platform covering ISO 27001, NIST CSF 2.0, GDPR, DORA, and NIS2. Gap analysis, vendor risk, DPIA tools, and audit-ready reports.
            </p>
            <div className="space-y-2 mb-8">
              {['ISO 27001, DORA, NIS2, NIST & more','Vendor risk management built in','Included with every vCISO engagement'].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Explore FortifyOne <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-slate-500 text-sm">From £149/month</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default PlatformsShowcase;
