import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Crown, Zap, Shield, FileText, BarChart, UserCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const planDefinitions = [
    {
      id: 'plan_foundation',
      name: 'Foundation',
      icon: Shield,
      description: 'Essential tools for SMBs to build a strong security posture.',
      price: '£199/month',
      term: 'Minimum 12-month term',
      features: [
        'Up to 5 Users',
        'Core Platform Access',
        'Compliance Automation (1 Framework)',
        'Vendor Risk Management (10 Vendors)',
        'Standard Reporting',
        'Email & Chat Support',
      ],
      tier: 'standard',
      colour: 'blue',
      included_modules: ['compliance', 'vendor_risk'],
      limits: {
        frameworks: 1,
        vendors: 10,
        users: 5,
      }
    },
    {
      id: 'plan_business_suite',
      name: 'Business Suite',
      icon: Zap,
      description: 'A comprehensive suite for growing businesses to manage risk.',
      price: '£399/month',
      term: 'Minimum 12-month term',
      features: [
        'Up to 15 Users',
        'Everything in Foundation',
        'Compliance Automation (All Frameworks)',
        'Vendor Risk Management (Unlimited)',
        'DPIA Tool (Coming Soon)',
        'Advanced Reporting & Analytics',
        'Priority Support',
      ],
      tier: 'premium',
      colour: 'purple',
      included_modules: ['compliance', 'vendor_risk', 'reports', 'settings'],
      limits: {
        frameworks: Infinity,
        vendors: Infinity,
        users: 15,
      }
    },
    {
      id: 'plan_enterprise',
      name: 'Enterprise',
      icon: Crown,
      description: 'Tailored solutions for large organisations and consultants.',
      price: 'Custom',
      term: 'Bespoke contracts',
      features: [
        'Unlimited Users',
        'Everything in Business Suite',
        'Custom Module Creation',
        'vCISO & Expert Consultancy',
        'Dedicated Account Manager',
        'Phone & On-site Support',
      ],
      tier: 'enterprise',
      colour: 'gold',
      included_modules: ['all'],
      limits: {
        frameworks: Infinity,
        vendors: Infinity,
        users: Infinity,
      }
    },
    {
      id: 'service_individual_assessment',
      name: 'Individual Assessment',
      icon: FileText,
      description: 'A one-time, comprehensive assessment against a single framework.',
      price: 'From £499',
      term: 'One-off service',
      features: ['One-time assessment', 'Single framework of choice'],
      tier: 'one-off',
      colour: 'gray',
      included_modules: ['compliance'],
      limits: {
        frameworks: 1,
        vendors: 0,
        users: 1,
      }
    },
    {
      id: 'service_assessment_roadmap',
      name: 'Assessment + Roadmap',
      icon: BarChart,
      description: 'Assessment plus a strategic, actionable roadmap.',
      price: 'From £999',
      term: 'One-off service',
      features: ['Full assessment', 'Strategic roadmap to address gaps'],
      tier: 'one-off',
      colour: 'gray',
      included_modules: ['compliance', 'reports'],
      limits: {
        frameworks: 1,
        vendors: 0,
        users: 1,
      }
    },
    {
      id: 'service_assessment_pro',
      name: 'Assessment Pro',
      icon: UserCheck,
      description: 'The complete package: assessment, roadmap, and consultancy.',
      price: 'From £1,999',
      term: 'One-off service',
      features: ['Assessment', 'Roadmap', 'Dedicated consultant hours'],
      tier: 'one-off',
      colour: 'gray',
      included_modules: ['compliance', 'reports', 'vendor_risk'],
      limits: {
        frameworks: 1,
        vendors: 10,
        users: 1,
      }
    },
  ];

const PlanManagement = () => {
  const { toast } = useToast();

  const getColourClasses = (colour) => {
    const colours = {
      blue: { icon: 'text-blue-600', border: 'border-l-4 border-blue-500' },
      purple: { icon: 'text-purple-600', border: 'border-l-4 border-purple-500' },
      gold: { icon: 'text-yellow-600', border: 'border-l-4 border-yellow-500' },
      gray: { icon: 'text-gray-600', border: 'border-l-4 border-gray-500' },
    };
    return colours[colour] || colours['gray'];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plan & Service Management</CardTitle>
          <CardDescription>
            These are the subscription plans and one-off services offered to clients. You can assign these to users in the 'User Management' tab.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planDefinitions.map((plan) => {
          const Icon = plan.icon;
          const colours = getColourClasses(plan.colour);
          return (
            <Card key={plan.id} className={`relative flex flex-col ${colours.border}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-8 w-8 ${colours.icon}`} />
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-1 line-clamp-2">
                      {plan.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{plan.price}</Badge>
                    <Badge variant="outline" className="capitalize">{plan.tier.replace('_', '-')}</Badge>
                  </div>

                  {plan.features && plan.features.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2 mt-4">Key Features</p>
                      <div className="space-y-1.5">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 4 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{plan.features.length - 4} more features
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 pt-4 mt-4 border-t">
                  Plan ID: <code className="bg-gray-100 px-1 rounded">{plan.id}</code>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlanManagement;