import React from 'react';

const partners = [
  'CompTIA',
  'Masterschool', 
  'BCS',
  'Hatch Digital',
  'Firebrand',
  'Learning People',
];

const TrustedByBanner = () => (
  <section className="bg-white py-10 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase text-center mb-8">
        Trusted by organisations including
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
        {partners.map((name, i) => (
          <React.Fragment key={name}>
            <span className="text-slate-400 font-semibold text-lg tracking-tight hover:text-slate-600 transition-colors duration-200 cursor-default select-none">
              {name}
            </span>
            {i < partners.length - 1 && (
              <span className="text-slate-200 text-lg hidden sm:inline">·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedByBanner;
