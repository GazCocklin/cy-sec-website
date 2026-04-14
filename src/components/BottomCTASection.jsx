import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BottomCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-8" style={{ background: '#060e1f' }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-px h-10 mx-auto mb-8"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,145,178,0.5))' }} />
        <h2 className="text-3xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.8px' }}>
          Ready to secure your organisation?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16 }}>
          Book a free 30-minute discovery call. No jargon. No hard sell. Just clarity on where you stand and what you need.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3.5 rounded-xl text-sm font-bold text-white hover:brightness-110 transition-all"
            style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', border: '1px solid rgba(8,145,178,0.4)' }}
          >
            Book your free call →
          </button>
          <button
            onClick={() => navigate('/vciso')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white border hover:bg-white/10 transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Explore vCISO services
          </button>
        </div>
      </div>
    </section>
  );
}
