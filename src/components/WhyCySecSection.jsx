import React from 'react';

const points = [
  {
    n: '01',
    title: 'Training + Compliance, Combined',
    desc: 'Unlike point solutions, Cy-Sec delivers certified training AND compliance automation AND vCISO leadership — all from one trusted partner.',
  },
  {
    n: '02',
    title: 'FortifyOne Included',
    desc: 'Every vCISO engagement includes FortifyOne — covering ISO 27001, NIST CSF 2.0, DORA, NIS2 and more. Competitors charge extra.',
  },
  {
    n: '03',
    title: 'Fixed Prices. No Surprises.',
    desc: 'DORA Sprint from £4,000. NIS2 from £2,500. vCISO from £995/month. Know exactly what you\'re paying before you commit.',
  },
];

export default function WhyCySecSection() {
  return (
    <section className="py-20 px-8" style={{ background: '#0B1D3A' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>Why Cy-Sec</p>
          <h2 className="text-3xl font-extrabold text-white" style={{ letterSpacing: '-0.8px' }}>
            One partner. Everything covered.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {points.map(({ n, title, desc }) => (
            <div key={n}
              className="rounded-2xl p-6 border"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 text-xs font-black"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff', border: '1px solid rgba(8,145,178,0.4)' }}>
                {n}
              </div>
              <h3 className="font-extrabold text-white text-[16px] mb-3" style={{ letterSpacing: '-0.3px' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
