import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, CheckCircle, Mail, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const LeadMagnet = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const leadMagnets = [
    {
      title: 'Free Cybersecurity Assessment',
      description: 'Get a comprehensive 50-point security checklist tailored to your business',
      icon: Shield,
      value: '£299 Value',
      downloadUrl: '#',
      colour: 'blue'
    },
    {
      title: 'GDPR Compliance Toolkit',
      description: 'Complete templates and checklists for GDPR compliance implementation',
      icon: CheckCircle,
      value: '£199 Value',
      downloadUrl: '#',
      colour: 'green'
    },
    {
      title: 'ISO 27001 Implementation Guide',
      description: 'Step-by-step guide to achieving ISO 27001 certification',
      icon: Download,
      value: '£399 Value',
      downloadUrl: '#',
      colour: 'purple'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead to database
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: `Lead Magnet Request - Role: ${formData.role}`,
            status: 'new'
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: '🎉 Download Ready!',
        description: 'Check your email for download links to all free resources.',
        duration: 5000
      });

    } catch (error) {
      console.error('Error submitting lead form:', error);
      toast({
        title: 'Error',
        description: 'Failed to process request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-12">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Resources Sent Successfully!
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Check your email for download links to all free cybersecurity resources. 
                Our team will also follow up with personalised recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {leadMagnets.map((magnet, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                    <magnet.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium text-sm">{magnet.title}</h4>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => window.location.href = '/fortify-one/login'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Access FortifyOne GRC
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Free <span className="gradient-text">Cybersecurity Resources</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Download our comprehensive cybersecurity toolkit - completely free. 
            Get the same resources we use with Fortune 500 companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lead Magnets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {leadMagnets.map((magnet, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-${magnet.colour}-100 flex items-center justify-center flex-shrink-0`}>
                      <magnet.icon className={`h-6 w-6 text-${magnet.colour}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {magnet.title}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${magnet.colour}-100 text-${magnet.colour}-800`}>
                          {magnet.value}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {magnet.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-slate-800 mb-2">
                  🎁 Bonus: Free 30-Minute Consultation
                </h4>
                <p className="text-sm text-slate-600">
                  Get personalised cybersecurity recommendations from our experts
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                  Download All Resources Free
                </CardTitle>
                <p className="text-slate-600">
                  Enter your details below to get instant access to our complete cybersecurity toolkit
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-white"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Business Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-white"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name *"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-white"
                    />
                  </div>
                  
                  <div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Your Role *</option>
                      <option value="ceo">CEO/Founder</option>
                      <option value="cto">CTO/Technical Director</option>
                      <option value="ciso">CISO/Security Manager</option>
                      <option value="it-manager">IT Manager</option>
                      <option value="compliance">Compliance Officer</option>
                      <option value="consultant">Consultant</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Get Free Resources Now
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-slate-500 text-center">
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;