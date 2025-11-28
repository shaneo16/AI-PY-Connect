
import React from 'react';
import { UserRole } from '../types';
import { LogOut, User } from 'lucide-react';
import { Button } from './Button';

interface NavigationProps {
  role: UserRole;
  onLogout: () => void;
  onLogin: (role: UserRole) => void;
  onNavigate: (page: 'home' | 'about') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ role, onLogout, onLogin, onNavigate }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-700 flex items-center justify-center text-white font-bold text-xl mr-2 shadow-sm">
            P
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
            Prime Youth Connect
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {role === UserRole.GUEST ? (
            <>
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 mr-4">
                <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">For Families</button>
                <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">For Providers</button>
                <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors">About</button>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" onClick={() => onLogin(UserRole.PARENT)}>Parent Log In</Button>
                 <Button onClick={() => onLogin(UserRole.PROVIDER)} variant="secondary">Provider Log In</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 hidden md:block">
                {role === UserRole.PARENT ? 'Explorer Family' : 'Professional Account'}
              </span>
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600">
                <User size={18} />
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-500">
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
