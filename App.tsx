import React, { useState } from 'react';
import { UserRole } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { ParentPortal } from './components/ParentPortal';
import { ProviderPortal } from './components/ProviderPortal';
import { AboutPage } from './components/AboutPage';

type View = 'HOME' | 'ABOUT' | 'DASHBOARD';

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

  const handleNavigate = (page: 'home' | 'about') => {
    if (role !== UserRole.GUEST) {
      // If logged in, navigating home logs out or goes to dashboard? 
      // Typically clicking logo goes to dashboard if logged in. 
      // For now, let's keep it simple: if logged in, you stay in dashboard unless logout.
      return; 
    }
    setView(page === 'home' ? 'HOME' : 'ABOUT');
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
      case 'HOME':
      default:
        return (
          <LandingPage 
            onGetStarted={() => handleLogin(UserRole.PARENT)}
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