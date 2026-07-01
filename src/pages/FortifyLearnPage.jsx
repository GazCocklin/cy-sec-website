import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import HeroFortifyLearn from '@/components/HeroFortifyLearn';
import ProofStripFL from '@/components/ProofStripFL';
import ExamPrepSection from '@/components/ExamPrepSection';

/* Free-taster banner — FortifyLearn page only.
   RULE 5: external link (free labs live on FortifyLearn, not a purchase) → <a>. */
function FreeTasterBanner() {
  return (
    <section className="px-8 pb-20" style={{ background: '#f4f7fa' }}>
      <div
        className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap rounded-2xl px-8 py-7"
        style={{ background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.25)' }}
      >
        <div>
          <p className="text-[17px] font-bold text-[#0B1D3A] mb-1">
            Try before you buy — taster labs are always free.
          </p>
          <p className="text-sm text-slate-600">
            Two Network+ and two Security+ tasters (CLI + visual). Just enter your email — no card needed.
          </p>
        </div>
        <a
          href="https://fortifylearn.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
          style={{ color: '#10B981', background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.3)' }}
        >
          Start free labs <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

// Navbar + Footer are rendered globally in App.jsx — do NOT add them here.
export default function FortifyLearnPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>FortifyLearn — CompTIA prep platform with realistic PBQ labs and a full Exam Engine | Cy-Sec</title>
        <meta name="description" content="FortifyLearn is the Cy-Sec CompTIA prep platform. Two engines, one platform: PBQ Engine for realistic CLI, SIEM and visual-tool simulations, and Exam Engine for 2,000 MCQs per cert with timed mock exams. Network+, Security+, CySA+ and A+. Try a free lab — no card required." />
        <link rel="canonical" href="https://cy-sec.co.uk/fortifylearn" />
      </Helmet>

      <HeroFortifyLearn />
      <ProofStripFL />
      <ExamPrepSection cert="secplus" certLabel="Security+" code="SY0-701" />
      <FreeTasterBanner />
    </div>
  );
}
