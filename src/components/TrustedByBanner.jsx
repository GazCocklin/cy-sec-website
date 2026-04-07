import React from 'react';

const partners = [
  { name: 'CompTIA',        color: '#E8001C', textColor: 'white' },
  { name: 'Masterschool',   color: '#1A1A2E', textColor: 'white' },
  { name: 'BCS',            color: '#003F7F', textColor: 'white' },
  { name: 'Hatch Digital',  color: '#0A2540', textColor: 'white' },
  { name: 'Firebrand',      color: '#E63900', textColor: 'white' },
  { name: 'Learning People',color: '#1B4F72', textColor: 'white' },
];

const TrustedByBanner = () => (
  <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold tracking-wider text-gray-400 text-center uppercase mb-10">
        Trusted By Organisations Including
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {partners.map((p, i) => (
          <div key={i}
            className="w-36 h-16 md:w-40 md:h-18 rounded-lg flex items-center justify-center shadow-sm border border-gray-100
                       grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            style={{ background: p.color }}>
            <span style={{
              color: p.textColor,
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '-0.2px',
              textAlign: 'center',
              padding: '0 8px',
            }}>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedByBanner;
