/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DwfProvider, useDwf } from './context/DwfContext';

// Public Components
import { EmergencyTopBar } from './components/public/EmergencyTopBar';
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { CentralCommitteeSection } from './components/public/CentralCommitteeSection';
import { LiveStatsSection } from './components/public/LiveStatsSection';
import { ProgramsSection } from './components/public/ProgramsSection';
import { MembershipRulesSection } from './components/public/MembershipRulesSection';
import { BenefitCalculatorSection } from './components/public/BenefitCalculatorSection';
import { NewsNoticesSection } from './components/public/NewsNoticesSection';
import { GallerySection } from './components/public/GallerySection';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';

// Modals
import { PublicVerificationModal } from './components/public/PublicVerificationModal';
import { MembershipApplicationModal } from './components/public/MembershipApplicationModal';
import { LoginModal } from './components/auth/LoginModal';
import { DocumentVaultModal } from './components/common/DocumentVaultModal';

// Protected Portals
import { MemberPortal } from './components/member/MemberPortal';
import { AdminPanel } from './components/admin/AdminPanel';

const DwfAppContent: React.FC = () => {
  const { user } = useDwf();

  // If logged in as Member, show Driver Member Portal
  if (user?.role === 'MEMBER') {
    return (
      <>
        <MemberPortal />
        <PublicVerificationModal />
        <DocumentVaultModal />
      </>
    );
  }

  // If logged in as Admin / Staff, show Executive Admin Panel
  if (user?.role === 'ADMIN') {
    return (
      <>
        <AdminPanel />
        <PublicVerificationModal />
        <DocumentVaultModal />
      </>
    );
  }

  // Public Landing Experience
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Emergency Top Notice Bar */}
      <EmergencyTopBar />

      {/* 2. Institutional Navigation */}
      <PublicNavbar />

      {/* 3. Hero Section with Quick ID & Benefit CTAs */}
      <HeroSection />

      {/* 4. Live Core Statistics Counter */}
      <LiveStatsSection />

      {/* 5. Central Executive Committee Section (কেন্দ্রীয় কমিটি) */}
      <CentralCommitteeSection />

      {/* 6. Welfare, Health Card & Legal Programs */}
      <ProgramsSection />

      {/* 6. Membership Rules & Transparent Policies */}
      <MembershipRulesSection />

      {/* 7. Interactive Benefit & Emergency Relief Calculator */}
      <BenefitCalculatorSection />

      {/* 8. Organizational News & Urgent Notices */}
      <NewsNoticesSection />

      {/* 9. Field Activities & Visual Gallery */}
      <GallerySection />

      {/* 10. Contact, Helpline & Member Support */}
      <ContactSection />

      {/* 11. Institutional Footer */}
      <PublicFooter />

      {/* Floating System Modals */}
      <PublicVerificationModal />
      <MembershipApplicationModal />
      <LoginModal />
      <DocumentVaultModal />
    </div>
  );
};

export default function App() {
  return (
    <DwfProvider>
      <DwfAppContent />
    </DwfProvider>
  );
}

