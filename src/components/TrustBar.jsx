import React from 'react';

const TrustBar = () => {
  const items = [
    "Authorised CompTIA Partner",
    "Authorised CertNexus Partner",
    "Cyber Essentials Certified",
    "1,000+ Students Trained",
    "10+ Countries"
  ];

  return (
    <div className="bg-[#0A1E3F] border-y border-[#00D9FF]/20 py-4 w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm md:text-base font-medium text-[#00D9FF]">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-center">{item}</span>
              {index < items.length - 1 && (
                <span className="hidden md:inline-block text-[#00D9FF]/40">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;