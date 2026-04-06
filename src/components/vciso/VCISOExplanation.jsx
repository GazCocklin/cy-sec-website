import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Lock } from 'lucide-react';

const VCISOExplanation = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            What is a <span className="gradient-text">Virtual CISO?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A Virtual Chief Information Security Officer (vCISO) provides executive-level cybersecurity 
            leadership without the cost and commitment of a full-time hire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">The Role</h3>
            <p className="text-slate-600 leading-relaxed">
              Our Virtual CISO services deliver strategic security leadership, governance, and expertise 
              tailored to your organisation's unique needs. We act as your dedicated security executive, 
              providing guidance, oversight, and hands-on support across all aspects of your cybersecurity 
              programme.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From developing comprehensive security strategies to managing compliance requirements and 
              incident response planning, our vCISO team becomes an integrated extension of your leadership.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="feature-card-border rounded-xl p-6 bg-white shadow-lg">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Strategic Leadership</h4>
              <p className="text-sm text-slate-600">Executive-level security direction and oversight</p>
            </div>
            <div className="feature-card-border rounded-xl p-6 bg-white shadow-lg">
              <TrendingUp className="h-10 w-10 text-cyan-600 mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Risk Management</h4>
              <p className="text-sm text-slate-600">Proactive identification and mitigation</p>
            </div>
            <div className="feature-card-border rounded-xl p-6 bg-white shadow-lg">
              <Users className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Team Guidance</h4>
              <p className="text-sm text-slate-600">Leadership and mentorship for security teams</p>
            </div>
            <div className="feature-card-border rounded-xl p-6 bg-white shadow-lg">
              <Lock className="h-10 w-10 text-cyan-600 mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Compliance</h4>
              <p className="text-sm text-slate-600">Regulatory adherence and governance</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="feature-card-border rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-blue-50/30"
        >
          <h3 className="text-3xl font-bold text-slate-800 mb-6">Why Choose Virtual Over Traditional?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-600 mb-3">Cost-Effective</h4>
              <p className="text-slate-600">
                Access senior-level expertise at a fraction of the cost of a full-time executive hire, 
                with no overhead, benefits, or long-term commitments.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-600 mb-3">Flexible & Scalable</h4>
              <p className="text-slate-600">
                Scale services up or down based on your needs. Perfect for growing organisations or 
                those with fluctuating security requirements.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-600 mb-3">Immediate Impact</h4>
              <p className="text-slate-600">
                Deploy experienced leadership quickly without lengthy recruitment processes. Start 
                strengthening your security posture from day one.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VCISOExplanation;