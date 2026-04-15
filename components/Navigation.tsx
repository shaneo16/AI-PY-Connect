
import React, { useState } from 'react';
import { UserRole } from '../types';
import { LogOut, User, Menu, X, Presentation } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface NavigationProps {
  role: UserRole;
  onLogout: () => void;
  onLogin: (role: UserRole) => void;
  onNavigate: (page: 'home' | 'about' | 'programs' | 'resources' | 'parents_resources' | 'pitch_deck' | 'trust_safety' | 'provider_checklist') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ role, onLogout, onLogin, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (page: 'home' | 'about' | 'programs' | 'resources' | 'parents_resources' | 'pitch_deck' | 'trust_safety' | 'provider_checklist') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 h-16 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="h-10 w-10 mr-2 transition-transform group-hover:scale-105 flex-shrink-0">
            <Logo className="w-full h-full" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 hidden sm:block mt-1">
            Klass Hero
          </span>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {role === UserRole.GUEST ? (
            <>
              <div className="flex items-center space-x-8 text-sm font-semibold text-slate-600 mr-4">
                <button onClick={() => onNavigate('programs')} className="hover:text-primary transition-colors">Programs</button>
                <button onClick={() => onNavigate('parents_resources')} className="hover:text-primary transition-colors">For Parents</button>
                <button onClick={() => onNavigate('resources')} className="hover:text-primary transition-colors">For Providers</button>
                <button onClick={() => onNavigate('provider_checklist')} className="hover:text-primary transition-colors">Provider Checklist</button>
                <button onClick={() => onNavigate('trust_safety')} className="hover:text-primary transition-colors">Trust & Safety</button>
                <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors">About</button>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" onClick={() => onNavigate('pitch_deck')} className="text-slate-600 hover:text-primary">
                   <Presentation size={18} className="mr-2"/> Pitch Deck
                 </Button>
                 <Button variant="ghost" onClick={() => onLogin(UserRole.PARENT)} className="text-slate-600 hover:text-slate-900">Log In</Button>
                 <Button onClick={() => onLogin(UserRole.PROVIDER)} variant="primary" size="sm">Get Started</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600 hidden md:block">
                {role === UserRole.PARENT ? 'Explorer Family' : 'Professional Account'}
              </span>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border border-slate-200 text-slate-700 ${role === UserRole.PARENT ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                <User size={18} />
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-500 hover:text-red-500">
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            {role !== UserRole.GUEST && (
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-500 hover:text-red-500 mr-2">
                   <LogOut size={18} />
                </Button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-black">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-slate-200 border-b border-slate-300 shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {role === UserRole.GUEST ? (
             <>
               <button onClick={() => handleMobileNavigate('programs')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">Programs</button>
               <button onClick={() => handleMobileNavigate('parents_resources')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">For Parents</button>
               <button onClick={() => handleMobileNavigate('resources')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">For Providers</button>
               <button onClick={() => handleMobileNavigate('provider_checklist')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">Provider Checklist</button>
               <button onClick={() => handleMobileNavigate('trust_safety')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">Trust & Safety</button>
               <button onClick={() => handleMobileNavigate('about')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black">About Us</button>
               <button onClick={() => handleMobileNavigate('pitch_deck')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans text-black flex items-center">
                 <Presentation size={18} className="mr-2"/> Investor Pitch Deck
               </button>
               <div className="border-t border-slate-300 pt-4 flex flex-col gap-2">
                  <Button variant="ghost" onClick={() => { onLogin(UserRole.PARENT); setIsMobileMenuOpen(false); }} className="w-full justify-start text-black">Parent Log In</Button>
                  <Button onClick={() => { onLogin(UserRole.PROVIDER); setIsMobileMenuOpen(false); }} className="w-full bg-secondary text-black">Provider Log In</Button>
               </div>
             </>
           ) : (
             <div className="text-center py-4 text-slate-500 font-bold font-sans">
                Menu is available in the bottom bar.
             </div>
           )}
        </div>
      )}
    </nav>
  );
};
