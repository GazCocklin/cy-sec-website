import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const comparisonData = {
  features: [
    {
      name: 'Transparent Pricing (SMB-Friendly)',
      cysec: true,
      cysecTooltip: 'Clear, tiered pricing designed for SMBs, no hidden costs.',
      vgrc: false,
      vgrcTooltip: 'Often enterprise-focused with complex, opaque, and high per-user pricing.',
      manual: true,
      manualTooltip: 'No direct software cost, but high hidden costs in time and errors.'
    },
    {
      name: 'Compliance Automation (All Frameworks)',
      cysec: true,
      cysecTooltip: 'Automated assessments for ISO 27001, NIST, DORA, PCI-DSS, NIS2, etc.',
      vgrc: true,
      vgrcTooltip: 'Typically offers automation for common frameworks, but may lack niche ones.',
      manual: false,
      manualTooltip: 'Requires manual tracking and updates, prone to human error.'
    },
    {
      name: 'Built-in Vendor Risk Management',
      cysec: true,
      cysecTooltip: 'Comprehensive tools for assessing, monitoring, and managing third-party risks.',
      vgrc: true,
      vgrcTooltip: 'Core feature for most VGRC platforms.',
      manual: false,
      manualTooltip: 'Manual vendor tracking, often inconsistent and difficult to scale.'
    },
    {
      name: 'Advanced Reporting & Analytics',
      cysec: true,
      cysecTooltip: 'Generate professional PDF reports, executive summaries, and detailed analytics.',
      vgrc: true,
      vgrcTooltip: 'Generally offers robust reporting capabilities.',
      manual: false,
      manualTooltip: 'Basic reporting, often requires significant manual effort to compile.'
    },
    {
      name: 'Custom Module Creation',
      cysec: true,
      cysecTooltip: 'Flexibility to create custom assessment modules for unique needs.',
      vgrc: true,
      vgrcTooltip: 'Some platforms offer customization, but often complex or an add-on.',
      manual: true,
      manualTooltip: 'Fully customizable, but requires significant manual effort to build and maintain.'
    },
    {
      name: 'vCISO & Expert Consultancy',
      cysec: true,
      cysecTooltip: 'Integrated expert support, from vCISO services to project-based consultancy.',
      vgrc: false,
      vgrcTooltip: 'Pure software solutions, requiring external consultants for expert guidance.',
      manual: false,
      manualTooltip: 'Requires hiring external experts or developing in-house expertise.'
    },
    {
      name: 'Unlimited Users Option',
      cysec: true,
      cysecTooltip: 'Available on higher tiers, allowing unlimited team collaboration without extra costs.',
      vgrc: false,
      vgrcTooltip: 'Often charges per-user, leading to escalating costs for growing teams.',
      manual: true,
      manualTooltip: 'No direct user limits, but collaboration becomes chaotic with many users.'
    },
    {
      name: 'AI-Specific Risk Assessments (NIST AI RMF)',
      cysec: true,
      cysecTooltip: 'Dedicated modules and guidance for assessing AI-specific risks.',
      vgrc: false,
      vgrcTooltip: 'Emerging area, most platforms do not yet offer dedicated AI risk modules.',
      manual: false,
      manualTooltip: 'Requires manual interpretation and application of complex AI frameworks.'
    },
    {
      name: 'Phone & On-site Support',
      cysec: true,
      cysecTooltip: 'Direct phone and optional on-site support for premium plans.',
      vgrc: true,
      vgrcTooltip: 'Typically offered for enterprise-level clients, may be limited for smaller plans.',
      manual: false,
      manualTooltip: 'No inherent support; relies on internal knowledge or external hires.'
    },
  ],
};

const Checkmark = ({ included, tooltipText }) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-default">
          {included ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-400" />
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ComparisonTable = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            How <span className="text-blue-600">FortifyOne</span> Stacks Up
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See how our integrated platform provides more value than separate, costly solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden shadow-xl border-slate-200">
            <div className="grid grid-cols-4 text-sm font-semibold text-slate-700 bg-slate-100/80 border-b border-slate-200">
              <div className="p-4 text-left">Feature</div>
              <div className="p-4">Cy-Sec FortifyOne</div>
              <div className="p-4">Typical VGRC Platform</div>
              <div className="p-4">Manual / Spreadsheets</div>
            </div>
            <div className="divide-y divide-slate-200">
              {comparisonData.features.map((feature, index) => (
                <div key={index} className="grid grid-cols-4 items-center">
                  <div className="p-4 text-left text-sm font-medium text-slate-800">{feature.name}</div>
                  <div className="p-4"><Checkmark included={feature.cysec} tooltipText={feature.cysecTooltip} /></div>
                  <div className="p-4"><Checkmark included={feature.vgrc} tooltipText={feature.vgrcTooltip} /></div>
                  <div className="p-4"><Checkmark included={feature.manual} tooltipText={feature.manualTooltip} /></div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-100 text-right">
              <p className="text-xs text-slate-500 italic">
                Based on publicly available feature sets as of July 2025.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;