import React, { useState } from 'react';
import { UserRole } from '../types';
import { LogOut, User, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface NavigationProps {
  role: UserRole;
  onLogout: () => void;
  onLogin: (role: UserRole) => void;
  onNavigate: (page: 'home' | 'about' | 'programs' | 'resources' | 'parents_resources') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ role, onLogout, onLogin, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (page: 'home' | 'about' | 'programs' | 'resources' | 'parents_resources') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b-2 border-accent sticky top-0 z-50 h-16 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="h-12 w-12 mr-2 transition-transform group-hover:scale-105 flex-shrink-0">
            <Logo className="w-full h-full" />
          </div>
          <span className="text-3xl tracking-tight text-black hidden sm:block font-display mt-1">
            KLASS HERO
          </span>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {role === UserRole.GUEST ? (
            <>
              <div className="flex items-center space-x-6 text-sm font-bold text-slate-700 mr-4 font-sans">
                <button onClick={() => onNavigate('programs')} className="hover:text-primary transition-colors uppercase tracking-wide">Programs</button>
                <button onClick={() => onNavigate('parents_resources')} className="hover:text-primary transition-colors uppercase tracking-wide">For Parents</button>
                <button onClick={() => onNavigate('resources')} className="hover:text-secondary transition-colors uppercase tracking-wide">For Providers</button>
                <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors uppercase tracking-wide">About</button>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" onClick={() => onLogin(UserRole.PARENT)} className="text-black hover:text-black hover:bg-white border-2 border-transparent">Parent Log In</Button>
                 <Button onClick={() => onLogin(UserRole.PROVIDER)} variant="secondary">Provider Log In</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-600 hidden md:block uppercase font-sans">
                {role === UserRole.PARENT ? 'Explorer Family' : 'Professional Account'}
              </span>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 border-black text-black ${role === UserRole.PARENT ? 'bg-primary' : 'bg-secondary'}`}>
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
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-900">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-peach border-b border-accent shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {role === UserRole.GUEST ? (
             <>
               <button onClick={() => handleMobileNavigate('programs')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans">Programs</button>
               <button onClick={() => handleMobileNavigate('parents_resources')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans">For Parents</button>
               <button onClick={() => handleMobileNavigate('resources')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans">For Providers</button>
               <button onClick={() => handleMobileNavigate('about')} className="text-left px-4 py-2 hover:bg-white rounded-lg font-bold font-sans">About Us</button>
               <div className="border-t border-accent pt-4 flex flex-col gap-2">
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