import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Key, Building } from 'lucide-react';

const SignUpPage = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'The passwords you entered do not match.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      data: {
        full_name: formData.fullName,
        company_name: formData.companyName,
      },
    });

    if (error) {
      setLoading(false);
      return;
    }

    toast({
      title: 'Sign Up Successful!',
      description: 'Please check your email to verify your account.',
    });
    navigate('/fortify-one/login', { state: { message: 'Sign up successful! Please check your email to verify and log in.' } });
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Cy-Sec FortifyOne</title>
        <meta name="description" content="Create your Cy-Sec FortifyOne account to get started with our FortifyOne GRC platform." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-2xl">
            <CardHeader className="text-center">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/01f303354e5d6ca92144a867dc53f612.png" 
                alt="Cy-Sec FortifyOne Logo" 
                className="h-20 w-auto mx-auto mb-4"
              />
              <CardTitle className="text-3xl font-bold text-slate-800">Create Your Account</CardTitle>
              <CardDescription>Join Cy-Sec FortifyOne and enhance your security posture.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center"><User className="h-4 w-4 mr-2" />Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center"><Building className="h-4 w-4 mr-2" />Company Name</Label>
                  <Input id="companyName" placeholder="Your Company Inc." required onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center"><Mail className="h-4 w-4 mr-2" />Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" required onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center"><Key className="h-4 w-4 mr-2" />Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center"><Key className="h-4 w-4 mr-2" />Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required onChange={handleInputChange} />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link to="/fortify-one/login" className="font-medium text-blue-600 hover:underline">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignUpPage;