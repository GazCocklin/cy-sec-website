import React from 'react';

const TrustedByBanner = () => {
  const logos = [
    {
      name: 'CompTIA',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/f3adcc0f0a048a7ff6288a4cdeee069c.png'
    },
    {
      name: 'Masterschool',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/7feced81897266f9be544c8da2de3733.png'
    },
    {
      name: 'BCS',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/c432b20175e01e50965f92ccddac7438.png'
    },
    {
      name: 'Hatch Digital',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/3d8855347a02bd731727cb373b2ebcf8.png'
    },
    {
      name: 'SudoCyber',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/67df7683d10817f1dd1e7f413c52c574.png'
    },
    {
      name: 'Firebrand',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/dfa524306f21db1e50965f92ccddac7438.png'
    },
    {
      name: 'Learning People',
      url: 'https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/e33f1515048d082aee51da2a7e33d070.png'
    }
  ];

  return (
    <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold tracking-wider text-gray-400 text-center uppercase mb-10">
          Trusted By Organisations Including
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="group bg-gray-200 w-36 h-28 md:w-40 md:h-32 rounded-lg p-4 flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={`${logo.name} logo`}
                className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedByBanner;