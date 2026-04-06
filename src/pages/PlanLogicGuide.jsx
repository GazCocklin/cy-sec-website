import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Zap, Crown, FileText, BarChart, UserCheck, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import AdminSystem from '@/components/admin/AdminSystem';

const PlanLogicGuide = () => {
  const plans = [
    {
      name: 'Foundation Plan',
      icon: Shield,
      color: 'text-blue-500',
      limits: [
        '1 Active Compliance Assessment (Framework)',
        '10 Active Vendor Assessments',
        '5 Users',
      ],
      enforcement: 'When a user on this plan has 1 active framework assessment, the option to create a new one is disabled. They will be prompted to either complete/archive the existing assessment or upgrade their plan. The same logic applies to vendor assessments.'
    },
    {
      name: 'Business Suite Plan',
      icon: Zap,
      color: 'text-purple-500',
      limits: [
        'Unlimited Compliance Assessments',
        'Unlimited Vendor Assessments',
        '15 Users',
      ],
      enforcement: 'This plan removes the limits on compliance and vendor assessments, offering full access to all available frameworks and unlimited vendor tracking.'
    },
    {
      name: 'Enterprise Plan',
      icon: Crown,
      color: 'text-yellow-500',
      limits: [
        'Fully Customisable',
        'Unlimited Everything',
        'Dedicated vCISO Support',
      ],
      enforcement: 'Enterprise plans are tailored to specific client needs and do not have built-in platform limits. Access and features are configured on a case-by-case basis.'
    }
  ];

  const oneOffServices = [
    {
      name: 'Individual Assessment',
      icon: FileText,
      description: 'A one-time purchase for a single, in-depth assessment against one framework. This does not grant ongoing access to the platform.'
    },
    {
      name: 'Assessment + Roadmap',
      icon: BarChart,
      description: 'Includes the individual assessment plus a strategic roadmap. This is also a one-time service.'
    },
    {
      name: 'Assessment Pro',
      icon: UserCheck,
      description: 'The full package including assessment, roadmap, and dedicated vCISO hours. A one-time, project-based service.'
    }
  ];

  return (
    <AdminSystem>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Plan Logic & Enforcement Guide</h1>
          <p className="mt-2 text-lg text-slate-600">
            Understanding how subscription plans and one-off services are managed and enforced within the platform.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Core Principle: Plan-Based Access Control</CardTitle>
            <CardDescription>
              The platform automatically controls user access to features based on their active subscription plan. This ensures users only access what they've paid for and provides clear upgrade paths.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800">Automatic Enforcement</h3>
                <p className="text-blue-700">
                  Limits are checked in real-time when a user attempts to perform an action, such as creating a new assessment. The UI will dynamically disable buttons and show informative messages if a user reaches their plan's limit.
                </p>
              </div>
            </div>
             <div className="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800">Upgrade Prompts</h3>
                <p className="text-yellow-700">
                  When a limit is reached, users are presented with a clear call-to-action, prompting them to upgrade their plan to unlock the desired feature. This is a key mechanism for driving revenue growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Subscription Plan Rules</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <plan.icon className={`h-8 w-8 ${plan.color}`} />
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="font-semibold mb-2 text-slate-700">Key Limits:</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {plan.limits.map((limit, index) => (
                        <li key={index} className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                          {limit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold mb-2 text-slate-700">Enforcement Logic:</p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-md border">
                      {plan.enforcement}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">One-Off Services vs. Subscriptions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">How are one-off services different?</AccordionTrigger>
              <AccordionContent className="text-base text-slate-600 space-y-4">
                <p>
                  One-off services are treated as distinct projects rather than ongoing subscriptions. They grant access for a specific purpose and do not provide continuous access to the platform's features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {oneOffServices.map(service => (
                    <div key={service.name} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center gap-3 mb-2">
                        <service.icon className="h-6 w-6 text-slate-500" />
                        <h4 className="font-semibold text-slate-800">{service.name}</h4>
                      </div>
                      <p className="text-sm text-slate-500">{service.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Can a user have both a subscription and a one-off service?</AccordionTrigger>
              <AccordionContent className="text-base text-slate-600">
                Yes. A user can have an active subscription (e.g., Foundation Plan) and also purchase a one-off service (e.g., Assessment Pro for a specific, complex framework not covered by their plan). The system manages these entitlements separately.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </AdminSystem>
  );
};

export default PlanLogicGuide;