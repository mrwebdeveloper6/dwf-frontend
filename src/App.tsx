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
import { StoreSection } from './components/public/StoreSection';
import { CentralCommitteeSection } from './components/public/CentralCommitteeSection';
import { LiveStatsSection } from './components/public/LiveStatsSection';
import { ProgramsSection } from './components/public/ProgramsSection';
import { MembershipRulesSection } from './components/public/MembershipRulesSection';
import { BenefitCalculatorSection } from './components/public/BenefitCalculatorSection';
import { NewsNoticesSection } from './components/public/NewsNoticesSection';
import { GallerySection } from './components/public/GallerySection';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';

// Dedicated Pages
import { StorePage } from './components/pages/StorePage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { CommitteePage } from './components/pages/CommitteePage';
import { RulesPage } from './components/pages/RulesPage';
import { CalculatorPage } from './components/pages/CalculatorPage';
import { NewsPage } from './components/pages/NewsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';

// Modals
import { PublicVerificationModal } from './components/public/PublicVerificationModal';
import { MembershipApplicationModal } from './components/public/MembershipApplicationModal';
import { LoginModal } from './components/auth/LoginModal';
import { DocumentVaultModal } from './components/common/DocumentVaultModal';

// Protected Portals
import { MemberPortal } from './components/member/MemberPortal';
import { AdminPanel } from './components/admin/AdminPanel';

const DwfAppContent: React.FC = () => {
  const { user, activeView } = useDwf();

  // If logged in as Member, show Driver Member Portal
  if (user?.role === 'MEMBER' && activeView === 'member-portal') {
    return (
      <>
        <MemberPortal />
        <PublicVerificationModal />
        <DocumentVaultModal />
      </>
    );
  }

  // If logged in as Admin / Staff, show Executive Admin Panel
  if (user?.role === 'ADMIN' && activeView === 'admin-panel') {
    return (
      <>
        <AdminPanel />
        <PublicVerificationModal />
        <DocumentVaultModal />
      </>
    );
  }

  // Dedicated Pages or Home Experience
  const renderCurrentView = () => {
    switch (activeView) {
      case 'store':
      case 'page-store':
        return <StorePage />;
      case 'programs':
      case 'page-programs':
        return <ProgramsPage />;
      case 'central-committee':
      case 'committee':
      case 'page-committee':
        return <CommitteePage />;
      case 'rules':
      case 'page-rules':
        return <RulesPage />;
      case 'calculator':
      case 'page-calculator':
        return <CalculatorPage />;
      case 'news':
      case 'page-news':
        return <NewsPage />;
      case 'gallery':
      case 'page-gallery':
        return <GalleryPage />;
      case 'contact':
      case 'page-contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <>
            {/* 3. Hero Section with Quick ID & Benefit CTAs */}
            <HeroSection />

            {/* 4. Live Core Statistics Counter */}
            <LiveStatsSection />

            {/* 5. Featured Digital Media & E-Book Store */}
            <StoreSection />

            {/* 6. Central Executive Committee Section (কেন্দ্রীয় কমিটি) */}
            <CentralCommitteeSection />

            {/* 7. Welfare, Health Card & Legal Programs */}
            <ProgramsSection />

            {/* 8. Membership Rules & Transparent Policies */}
            <MembershipRulesSection />

            {/* 9. Interactive Benefit & Emergency Relief Calculator */}
            <BenefitCalculatorSection />

            {/* 10. Organizational News & Urgent Notices */}
            <NewsNoticesSection />

            {/* 11. Field Activities & Visual Gallery */}
            <GallerySection />

            {/* 12. Contact, Helpline & Member Support */}
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
      {/* 1. Emergency Top Notice Bar */}
      <EmergencyTopBar />

      {/* 2. Institutional Navigation */}
      <PublicNavbar />

      {/* Dynamic View Body */}
      {renderCurrentView()}

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

