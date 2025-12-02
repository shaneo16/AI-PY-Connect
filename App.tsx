
import React, { useState } from 'react';
import { UserRole } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { ParentPortal } from './components/ParentPortal';
import { ProviderPortal } from './components/ProviderPortal';
import { AboutPage } from './components/AboutPage';
import { PublicPrograms } from './components/PublicPrograms';

type View = 'HOME' | 'ABOUT' | 'DASHBOARD' | 'PROGRAMS';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [view, setView] = useState<View>('HOME');

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setRole(UserRole.GUEST);
    setView('HOME');
  };

  const handleNavigate = (page: 'home' | 'about' | 'programs') => {
    if (role !== UserRole.GUEST) {
      return; 
    }
    setView(page === 'home' ? 'HOME' : page === 'about' ? 'ABOUT' : 'PROGRAMS');
  };

  const renderContent = () => {
    if (role !== UserRole.GUEST) {
       switch (role) {
        case UserRole.PARENT:
          return <ParentPortal />;
        case UserRole.PROVIDER:
          return <ProviderPortal />;
        default:
          return null;
       }
    }

    // Guest Views
    switch (view) {
      case 'ABOUT':
        return <AboutPage onContact={() => setView('HOME')} />;
      case 'PROGRAMS':
        return <PublicPrograms onLoginRequest={() => handleLogin(UserRole.PARENT)} />;
      case 'HOME':
      default:
        return (
          <LandingPage 
            onGetStarted={() => setView('PROGRAMS')}
            onLogin={() => handleLogin(UserRole.PROVIDER)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary selection:text-white">
      <Navigation 
        role={role} 
        onLogout={handleLogout} 
        onLogin={handleLogin}
        onNavigate={handleNavigate}
      />
      {renderContent()}
    </div>
  );
};

export default App;
