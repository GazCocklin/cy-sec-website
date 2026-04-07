import React from 'react';

const points = [
  {
    title: 'Training + Compliance, Combined',
    desc: 'Unlike point solutions, Cy-Sec delivers certified training AND compliance automation AND vCISO leadership — all from one trusted partner.',
  },
  {
    title: 'FortifyOne Included',
    desc: 'Every vCISO engagement includes FortifyOne — covering ISO 27001, NIST CSF 2.0, DORA, NIS2 and more. Competitors charge extra.',
  },
  {
    title: 'Fixed Prices. No Surprises.',
    desc: 'DORA Sprint from £4,000. NIS2 from £2,500. vCISO from £995/month. Know exactly what you\'re paying before you commit.',
  },
];

const WhyCySecSection = () => (
  <section className="py-24 bg-slate-800">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Why Cy-Sec</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">One partner. Everything covered.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {points.map((p, i) => (
          <div key={i} className="border border-white/10 rounded-2xl p-8 bg-white/[0.04]">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-5">
              <span className="text-blue-400 text-sm font-bold">{i + 1}</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyCySecSection;
