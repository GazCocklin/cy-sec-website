import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LandingPageHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 40%, #0A2A4A 70%, #061428 100%)' }}
      />

      {/* Subtle photo texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1698337313210-baf78bfa4f05)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#1A56DB 1px, transparent 1px), linear-gradient(to right, #1A56DB 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Logo — white SVG, prominent size, subtle glow */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/logos/cysec-logo-dark.svg"
                alt="Cy-Sec Awareness and Consultancy Ltd"
                className="h-14 lg:h-[72px] w-auto"
                style={{ filter: 'drop-shadow(0 0 18px rgba(14,165,233,0.45))' }}
              />
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
              Cybersecurity<br />
              Leadership.<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #06B6D4, #1A56DB)' }}
              >
                Compliance.<br />Training.
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              One partner. Board-level vCISO guidance, DORA &amp; NIS2
              readiness, CompTIA certified training, and the FortifyOne
              compliance platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-[#1A56DB] hover:bg-[#1e40af] text-white px-7 py-5 text-base font-semibold border-0 shadow-lg shadow-blue-900/40"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Discovery Call
              </Button>
              <Button
                onClick={() => navigate('/vciso')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-7 py-5 text-base font-medium bg-transparent"
              >
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
