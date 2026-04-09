import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { CartProvider } from '@/hooks/useCart';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import SecuritySuitePage from '@/pages/SecuritySuitePage';
import SecuritySuiteLogin from '@/pages/SecuritySuiteLogin';
import SignUpPage from '@/pages/SignUpPage';
import ContactPage from '@/pages/ContactPage'; 
import NewsBanner from '@/components/NewsBanner';
import HybridCoursesPage from '@/pages/HybridCoursesPage';
import SelfStudyModulesPage from '@/pages/SelfStudyModulesPage';
import InstructorLedPage from '@/pages/InstructorLedPage';
import CompTIACertificationsPage from '@/pages/CompTIACertificationsPage';
import CertNexusCertificationsPage from '@/pages/CertNexusCertificationsPage';
import PricingPage from '@/pages/PricingPage';
import LeadMagnetPage from '@/pages/LeadMagnetPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import PreLaunchChecklist from '@/pages/PreLaunchChecklist';
import MarketingInsights from '@/pages/MarketingInsights';
import PlanLogicGuide from '@/pages/PlanLogicGuide';
import SecurityCalendar from '@/pages/security-suite/SecurityCalendar';
import TrainingDeliveryPage from '@/pages/TrainingDeliveryPage';
import LinkedinMarketingGenerator from '@/pages/LinkedinMarketingGenerator';
import VCISOPage from '@/pages/VCISOPage';
import DORAComplianceSprintPage from '@/pages/DORAComplianceSprintPage';
import NIS2CompliancePage from '@/pages/NIS2CompliancePage';
import ComingSoonPage from '@/pages/ComingSoonPage';
import PBQEnginePage from '@/pages/PBQEnginePage';
import StorePage from '@/pages/StorePage';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import usePageTracking from '@/hooks/usePageTracking';

import ProtectedRoute from '@/components/ProtectedRoute';
import AuthErrorInterceptor from '@/components/AuthErrorInterceptor';

import SecurityDashboard from '@/pages/security-suite/SecurityDashboard';
import ComplianceAssessments from '@/pages/security-suite/ComplianceAssessments';
import VendorRiskManagement from '@/pages/security-suite/VendorRiskManagement';
import VendorDetailsPage from '@/pages/security-suite/VendorDetailsPage';
import VendorAssessmentWizard from '@/pages/security-suite/VendorAssessmentWizard';
import VendorAssessmentReport from '@/pages/security-suite/VendorAssessmentReport';
import SecuritySettings from '@/pages/security-suite/SecuritySettings';
import SecurityReports from '@/pages/security-suite/SecurityReports';
import AssessmentReport from '@/pages/security-suite/AssessmentReport';
import AdminHomePage from '@/pages/AdminHomePage';
import AdminLogin from '@/pages/AdminLogin';

import AdminPlatformPage from '@/pages/AdminPlatformPage';
import AdminPagesList from '@/pages/AdminPagesList';
import StrategicRoadmap from '@/pages/StrategicRoadmap';
import FullAdminDashboard from '@/pages/FullAdminDashboard';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, session } = useAuth();
  
  usePageTracking();

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/fortify-one/login', { 
      state: { 
        from: location, 
        message: 'Your session has expired. Please sign in again.' 
      },
      replace: true 
    });
  }, [signOut, navigate, location]);

  useEffect(() => {
    if (!session && localStorage.getItem('sb-aixxbakynzjkdezzklbk-auth-token')) {
      supabase.auth.signOut();
    }
  }, [session]);

  const isFortifyOnePage = location.pathname.startsWith('/fortify-one/') && 
                              location.pathname !== '/fortify-one' && 
                              location.pathname !== '/fortify-one/login' &&
                              location.pathname !== '/fortify-one/signup';
  const isAdminPage = location.pathname.startsWith('/admin');

  // Adjust padding for new immersive home page design
  const isHomePage = location.pathname === '/';
  const mainPaddingClass = isHomePage ? "pt-0" : (isFortifyOnePage || isAdminPage ? "pt-20" : "pt-32");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!isAdminPage && <Navbar />}
      
      <div className={`flex-grow ${mainPaddingClass}`}>
        {!isFortifyOnePage && !isAdminPage && !isHomePage && <NewsBanner />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/training-delivery" element={<TrainingDeliveryPage />} />
            <Route path="/training/hybrid" element={<HybridCoursesPage />} />
            <Route path="/training/self-study" element={<SelfStudyModulesPage />} />
            <Route path="/training/instructor-led" element={<InstructorLedPage />} />
            <Route path="/training/comptia-certifications" element={<CompTIACertificationsPage />} />
            <Route path="/training/certnexus-certifications" element={<CertNexusCertificationsPage />} />
            <Route path="/fortify-one" element={<SecuritySuitePage />} />
            <Route path="/fortify-one/login" element={<SecuritySuiteLogin />} />
            <Route path="/fortify-one/signup" element={<SignUpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vciso" element={<VCISOPage />} />
            <Route path="/dora-compliance" element={<DORAComplianceSprintPage />} />
            <Route path="/nis2-compliance" element={<NIS2CompliancePage />} />
            <Route path="/pbq-engine" element={<PBQEnginePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            <Route path="/fortify-one/dashboard" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/fortify-one/compliance" element={<ProtectedRoute><ComplianceAssessments /></ProtectedRoute>} />
            <Route path="/fortify-one/vendor-risk" element={<ProtectedRoute><VendorRiskManagement /></ProtectedRoute>} />
            <Route path="/fortify-one/vendor-risk/:vendorId" element={<ProtectedRoute><VendorDetailsPage /></ProtectedRoute>} />
            <Route path="/fortify-one/vendor-assessment/:questionnaireId" element={<ProtectedRoute><VendorAssessmentWizard /></ProtectedRoute>} />
            <Route path="/fortify-one/vendor-assessment-report/:questionnaireId" element={<ProtectedRoute><VendorAssessmentReport /></ProtectedRoute>} />
            <Route path="/fortify-one/settings" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />
            <Route path="/fortify-one/reports" element={<ProtectedRoute><SecurityReports /></ProtectedRoute>} />
            <Route path="/fortify-one/assessment-report/:id" element={<ProtectedRoute><AssessmentReport /></ProtectedRoute>} />
            <Route path="/fortify-one/calendar" element={<ProtectedRoute><SecurityCalendar /></ProtectedRoute>} />

            {/* Legacy /security-suite/* redirects → /fortify-one/* */}
            <Route path="/security-suite" element={<Navigate to="/fortify-one" replace />} />
            <Route path="/security-suite/login" element={<Navigate to="/fortify-one/login" replace />} />
            <Route path="/security-suite/signup" element={<Navigate to="/fortify-one/signup" replace />} />
            <Route path="/security-suite/dashboard" element={<Navigate to="/fortify-one/dashboard" replace />} />
            <Route path="/security-suite/compliance" element={<Navigate to="/fortify-one/compliance" replace />} />
            <Route path="/security-suite/vendor-risk" element={<Navigate to="/fortify-one/vendor-risk" replace />} />
            <Route path="/security-suite/settings" element={<Navigate to="/fortify-one/settings" replace />} />
            <Route path="/security-suite/reports" element={<Navigate to="/fortify-one/reports" replace />} />
            <Route path="/security-suite/calendar" element={<Navigate to="/fortify-one/calendar" replace />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminHomePage /></ProtectedRoute>} />
            <Route path="/admin/crm" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/platform" element={<ProtectedRoute adminOnly={true}><AdminPlatformPage /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute adminOnly={true}><AdminPagesList /></ProtectedRoute>} />
            <Route path="/admin/legacy" element={<ProtectedRoute adminOnly={true}><FullAdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/pre-launch-checklist" element={<ProtectedRoute adminOnly={true}><PreLaunchChecklist /></ProtectedRoute>} />
            <Route path="/admin/marketing-insights" element={<ProtectedRoute adminOnly={true}><MarketingInsights /></ProtectedRoute>} />
            <Route path="/admin/plan-logic-guide" element={<ProtectedRoute adminOnly={true}><PlanLogicGuide /></ProtectedRoute>} />
            <Route path="/admin/strategic-roadmap" element={<ProtectedRoute adminOnly={true}><StrategicRoadmap /></ProtectedRoute>} />
            <Route path="/admin/linkedin-marketing" element={<ProtectedRoute adminOnly={true}><LinkedinMarketingGenerator /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>

      {!isAdminPage && <Footer />}
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <AuthErrorInterceptor>
            <AppContent />
          </AuthErrorInterceptor>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;