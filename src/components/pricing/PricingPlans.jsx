import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown, FileText, BarChart, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { FORTIFYONE_LOGO_URL } from '@/lib/logoConfig';

const PricingPlans = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Foundation',
      icon: Shield,
      price: { monthly: 249, annual: 2540 },
      description: 'Essential tools for SMBs to build a strong security posture.',
      features: [
        'Up to 2 Users',
        'Core Platform Access',
        'Compliance Automation (2 Frameworks)',
        'Vendor Risk Management (10 Vendors)',
        'Standard Reporting',
        'Email & Chat Support',
      ],
      cta: 'Choose Foundation',
      popular: false,
      colour: 'blue'
    },
    {
      name: 'Business Suite',
      icon: Zap,
      price: { monthly: 499, annual: 5090 },
      description: 'A comprehensive suite for growing businesses to manage risk.',
      features: [
        'Up to 5 Users',
        'Everything in Foundation',
        'Compliance Automation (All Frameworks)',
        'Vendor Risk Management (Unlimited)',
        'DPIA Tool',
        'All Report Types (6 Templates)',
        'Priority Support',
      ],
      cta: 'Choose Business',
      popular: true,
      colour: 'purple'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      description: 'Tailored solutions for large organisations and consultants.',
      features: [
        'Unlimited Users',
        'Everything in Business Suite',
        'FRIA Tool (EU AI Act)',
        'API Access',
        'SSO / SAML Integration',
        'Dedicated Account Manager',
        'SLA Guarantees',
        'Audit-Ready Evidence Packs',
        'Multi-Org Management'
      ],
      cta: 'Contact Sales',
      popular: false,
      colour: 'gold'
    }
  ];

  const individualOfferings = [
    {
      icon: FileText,
      title: 'Individual Assessment',
      description: 'A one-time, comprehensive assessment against a single framework of your choice (e.g., ISO 27001, NIST).',
      price: '£899',
    },
    {
      icon: BarChart,
      title: 'Assessment + Roadmap',
      description: 'Includes the full assessment plus a strategic, actionable roadmap to address identified gaps and improve your posture.',
      price: '£1299',
    },
    {
      icon: UserCheck,
      title: 'Assessment Pro',
      description: 'The complete package: assessment, roadmap, and add dedicated consultation with a vCISO to guide in implementation.',
      price: '£2999',
      caveat: 'Price to be confirmed after consultant and agreement of scope of work.'
    },
  ];

  const handlePlanSelect = (plan) => {
    navigate(`/contact?plan=${plan.name.toLowerCase()}`);
  };

  const getColourClasses = (colour, popular = false) => {
    const colours = {
      blue: {
        border: popular ? 'border-blue-500' : 'border-gray-200',
        button: 'bg-blue-600 hover:bg-blue-700',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      },
      purple: {
        border: popular ? 'border-purple-500' : 'border-gray-200',
        button: 'bg-purple-600 hover:bg-purple-700',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800'
      },
      gold: {
        border: popular ? 'border-yellow-500' : 'border-gray-200',
        button: 'bg-yellow-600 hover:bg-yellow-700',
        icon: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-800'
      }
    };
    return colours[colour];
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <img 
            src={FORTIFYONE_LOGO_URL} 
            alt="FortifyOne Pricing" 
            className="h-16 w-auto mb-8"
          />
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 mt-2">
            Flexible Plans for <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Choose a subscription or a one-time assessment. All our solutions are designed to be flexible, powerful, and affordable for SMBs.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'annual' ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <Badge className="bg-green-100 text-green-800 ml-2 font-semibold shadow-md">
                Save 15%!
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const colours = getColourClasses(plan.colour, plan.popular);
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-purple-600 text-white px-4 py-1 text-sm">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`flex-grow flex flex-col ${colours.border} ${plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="text-center pb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${colours.icon}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                      {plan.name}
                    </CardTitle>
                    <p className="text-slate-600 text-sm mb-4 min-h-[40px]">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      {typeof plan.price === 'string' ? (
                        <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-slate-800">
                            £{billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)}
                          </span>
                          <span className="text-slate-500 ml-1">
                            /month
                          </span>
                        </>
                      )}
                       <p className="text-xs text-slate-500 mt-1">(exc. VAT)</p>
                      {billingCycle === 'annual' && typeof plan.price !== 'string' && (
                        <div className="text-sm text-slate-500 mt-1">
                          Billed annually (£{plan.price.annual} exc. VAT)
                        </div>
                      )}
                       {billingCycle === 'monthly' && typeof plan.price !== 'string' && (
                        <div className="text-xs text-slate-500 mt-1">
                          Minimum 12-month term
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 flex-grow flex flex-col">
                    <div className="space-y-3 flex-grow">
                      <h4 className="font-medium text-slate-800 mb-3">Key features:</h4>
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-600">
                            {typeof feature === 'string' ? feature : feature.text}
                            {typeof feature === 'object' && feature.comingSoon && (
                              <Badge variant="outline" className="ml-2 text-xs border-purple-200 text-purple-600 bg-purple-50">Coming Soon</Badge>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                     <Button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full mt-6 ${colours.button} text-white`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              One-Time <span className="gradient-text">Assessments & Services</span>
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Perfect for project-based needs or getting a detailed snapshot of your current security posture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {individualOfferings.map((offering, index) => (
              <Card key={index} className="feature-card-border bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <offering.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800">{offering.title}</CardTitle>
                  </div>
                  <CardDescription>{offering.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between items-start flex-grow">
                  <div className="flex-grow w-full">
                    <p className="text-2xl font-bold text-slate-800">{offering.price}</p>
                    <div className="flex flex-col mb-4">
                      <p className="text-xs text-slate-500">(exc. VAT)</p>
                      {offering.caveat && (
                        <p className="text-xs text-slate-500 italic">{offering.caveat}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => navigate(`/contact?service=${offering.title.toLowerCase().replace(/ /g, '_')}`)}>
                    Enquire Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPlans;