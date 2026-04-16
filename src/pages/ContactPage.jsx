import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Mail, Phone, Building2, User, MessageSquare,
  Send, CheckCircle, Shield, Clock, BookOpen, Cpu, Globe
} from 'lucide-react';

// Shared secret required by send-contact-confirmation edge function.
// Not a true secret (it ships in the browser bundle and can be read via DevTools),
// but blocks unauthenticated direct calls that bypass the form UI.
const CONTACT_FORM_SECRET = 'I0EaNqHxvPPlvuqbWZnpokVefeXReIpfUfDXCIUlQYk';

const INTERESTS = [
  { value: 'vciso',        label: 'Virtual CISO (vCISO)' },
  { value: 'dora',         label: 'DORA Compliance Sprint' },
  { value: 'nis2',         label: 'NIS2 Compliance' },
  { value: 'training',     label: 'Security Training' },
  { value: 'fortifyone',   label: 'FortifyOne GRC' },
  { value: 'fortifylearn', label: 'FortifyLearn PBQ' },
  { value: 'other',        label: 'General Enquiry' },
];

const INFO = [
  { icon: Clock,  title: 'Response Time',  body: 'We respond to all enquiries within one business day.' },
  { icon: Shield, title: 'Confidential',   body: 'All conversations are treated with complete discretion.' },
  { icon: Phone,  title: 'Prefer a call?', body: "Note your preferred time and we'll call you directly." },
];

const inputCls = `w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm
  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0891B2]/25 focus:border-[#0891B2]
  transition-all duration-150`;

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}{required && <span className="text-[#0891B2] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm]             = useState({ name:'', email:'', company:'', phone:'', interest:'', message:'' });
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const set = (k, v) => { setForm(f => ({...f, [k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:''})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name.';
    if (!form.email.trim())   e.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = "Please tell us what you're looking for.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      // 1. Insert into Supabase
      const { error } = await supabase.from('contact_submissions').insert([{
        name:     form.name.trim(),
        email:    form.email.trim(),
        company:  form.company.trim() || null,
        phone:    form.phone.trim() || null,
        interest: form.interest || null,
        message:  form.message.trim(),
        status:   'new',
      }]);
      if (error) throw error;

      // 2. Fire confirmation + admin notification emails via Edge Function
      // Non-blocking — submission never fails if the email call fails
      supabase.functions.invoke('send-contact-confirmation', {
        headers: {
          'x-contact-secret': CONTACT_FORM_SECRET,
        },
        body: {
          name:     form.name.trim(),
          email:    form.email.trim(),
          company:  form.company.trim() || null,
          phone:    form.phone.trim() || null,
          interest: form.interest || null,
          message:  form.message.trim(),
        },
      }).catch((emailErr) => {
        console.warn('Contact email failed to send:', emailErr);
      });

      setSubmitted(true);
    } catch {
      setErrors({ _global: 'Something went wrong. Please email us at info@cy-sec.co.uk' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-16 px-4">
      <Helmet>
        <title>Contact Us | Cy-Sec</title>
        <meta name="description" content="Get in touch with the Cy-Sec team about vCISO, compliance, training, or our GRC platforms." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#0891B2] uppercase tracking-widest bg-[#0891B2]/8 px-4 py-2 rounded-full mb-4">
            <Mail className="h-3.5 w-3.5" /> Get in touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {"Let's talk about your"}<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>security needs</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Whether you need a vCISO, compliance support, training, or want to explore our platforms — we are here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left sidebar */}
          <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.1}} className="flex flex-col gap-5">
            {INFO.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-[#0891B2]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}


          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="thanks" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
                    className="flex flex-col items-center text-center py-12 gap-5">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Message received</h2>
                      <p className="text-slate-500 max-w-sm mx-auto">
                        Thanks {form.name.split(' ')[0]}. We will be in touch within one business day.
                      </p>
                    </div>
                    <button onClick={() => { setSubmitted(false); setForm({name:'',email:'',company:'',phone:'',interest:'',message:''}); }}
                      className="text-sm text-[#0891B2] font-semibold hover:underline mt-2">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{opacity:0}} animate={{opacity:1}} onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Your Name" required error={errors.name}>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input type="text" placeholder="Jane Smith" value={form.name}
                            onChange={e => set('name', e.target.value)}
                            className={`${inputCls} pl-10 ${errors.name ? 'border-red-400 ring-2 ring-red-200' : ''}`} />
                        </div>
                      </Field>
                      <Field label="Email" required error={errors.email}>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input type="email" placeholder="jane@company.com" value={form.email}
                            onChange={e => set('email', e.target.value)}
                            className={`${inputCls} pl-10 ${errors.email ? 'border-red-400 ring-2 ring-red-200' : ''}`} />
                        </div>
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Company">
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input type="text" placeholder="Acme Ltd" value={form.company}
                            onChange={e => set('company', e.target.value)} className={`${inputCls} pl-10`} />
                        </div>
                      </Field>
                      <Field label="Phone">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input type="tel" placeholder="+44 7700 900000" value={form.phone}
                            onChange={e => set('phone', e.target.value)} className={`${inputCls} pl-10`} />
                        </div>
                      </Field>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2.5">What are you interested in? <span className="text-slate-400 font-normal">(optional)</span></p>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map(({ value, label }) => (
                          <button
                            key={value} type="button"
                            onClick={() => set('interest', form.interest === value ? '' : value)}
                            className={`text-sm px-4 py-2 rounded-full border font-medium transition-all ${
                              form.interest === value
                                ? 'text-white border-transparent shadow-sm'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#0891B2]'
                            }`}
                            style={form.interest === value ? { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' } : {}}
                          >{label}</button>
                        ))}
                      </div>
                    </div>

                    <Field label="How can we help?" required error={errors.message}>
                      <textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                        placeholder={"Tell us about your organisation, what you're trying to achieve, any compliance targets or deadlines you're working toward…"}
                        className={`${inputCls} resize-none leading-relaxed ${errors.message ? 'border-red-400 ring-2 ring-red-200' : ''}`} />
                    </Field>

                    {errors._global && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{errors._global}</div>
                    )}

                    <button type="submit" disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl
                        text-white font-bold text-base
                        transition-all shadow-md hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                      {submitting ? (
                        <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</>
                      ) : (
                        <>Send Message <Send className="h-4 w-4" /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400">Your details are kept confidential and never sold.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
