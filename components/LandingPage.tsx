
import React, { useState } from 'react';
import { ShieldCheck, Calendar, Users, Star, CheckCircle2, MapPin, Edit, MessageCircle, TrendingUp, Search, Instagram, Globe } from 'lucide-react';
import { Button } from './Button';
import { PARENT_PRICING, PROVIDER_PRICING, MOCK_PROGRAMS, TRENDING_SEARCHES } from '../constants';
import { VerificationIcon } from './ParentPortal';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onLoginDirect: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onLoginDirect }) => {
  const [pricingMode, setPricingMode] = useState<'families' | 'providers'>('families');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-peach">
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 px-6 lg:px-8 overflow-hidden bg-peach">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl mb-6 font-display uppercase tracking-tight leading-none text-black">
            The Vetted Network <br />
            <span className="text-primaryDark">for Berlin Families</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 mt-6 relative z-10 font-bold font-sans">
            Modernizing how parents discover, book, and trust educators. <br />
            <span className="text-sm font-black uppercase tracking-widest text-slate-400">Sports • Music • Arts • Education</span>
          </p>
          
          {/* Simplified Search Bar */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex items-center mb-6 border-4 border-black relative z-10">
             <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input 
                  type="text" 
                  placeholder="Find Programs (e.g. Soccer, Math, Swimming)" 
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none rounded-full font-bold font-sans text-lg"
                />
             </div>
             <Button onClick={onGetStarted} className="rounded-xl px-10 py-4 h-auto text-xl bg-primary hover:bg-primaryDark text-black font-black uppercase">
                Find
             </Button>
          </div>
          
          <div className="flex justify-center gap-4 relative z-10">
              <Button onClick={onLogin} variant="secondary" className="px-8 py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Join as Provider</Button>
              <Button onClick={onLoginDirect} variant="outline" className="px-8 py-3 rounded-xl border-4 border-slate-300">Provider Login</Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel */}
      <section className="py-20 bg-white border-y-4 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-4xl font-display uppercase text-black">Featured Programs</h2>
                <p className="text-slate-500 mt-2 font-bold font-sans uppercase text-sm tracking-widest">Top-rated activities this month</p>
             </div>
             <button onClick={onGetStarted} className="text-primaryDark font-black uppercase hover:underline font-sans text-sm tracking-widest">View All</button>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x font-sans">
            {MOCK_PROGRAMS.map((program) => (
              <div key={program.id} className="min-w-[320px] bg-white border-4 border-black rounded-3xl overflow-hidden snap-start hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                 <div className="h-48 w-full overflow-hidden relative border-b-4 border-black">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {program.verifications.map(type => (
                        <div key={type} className="bg-white border-2 border-black p-1.5 rounded-full shadow-sm">
                           <VerificationIcon type={type} size={14} />
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="px-6 pb-6 pt-10 relative">
                    <div className="absolute -top-10 right-6 w-20 h-20 rounded-full border-4 border-black overflow-hidden shadow-lg bg-white">
                      <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star size={18} className="text-secondary fill-current mr-1" />
                      <span className="font-black text-slate-900 mr-1">{program.rating}</span>
                      <span className="text-xs font-bold text-slate-400">({program.reviews})</span>
                    </div>

                    <h3 className="font-display text-2xl text-black truncate mb-1 uppercase">{program.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 truncate font-bold">{program.provider}</p>
                    
                    <div className="flex justify-between items-center pt-5 border-t-2 border-slate-100">
                       <span className="font-black text-2xl text-black">€{program.price}</span>
                       <Button size="sm" variant="primary" onClick={onGetStarted} className="rounded-xl px-5 font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">Book</Button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-100 text-slate-900 border-b-4 border-black">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
               <h2 className="text-5xl font-display uppercase text-black">Modernizing Discovery</h2>
               <p className="text-slate-600 mt-6 max-w-2xl mx-auto font-sans font-bold text-lg">
                 From sports and music to tutoring and camps. We bring every high-quality youth activity in Berlin under one trusted roof.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 font-sans">
               <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-black mb-8 group-hover:bg-primary transition-colors">
                     <ShieldCheck className="text-black" size={36} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4">1. Vetted Trust</h3>
                  <p className="text-slate-500 leading-relaxed font-bold">
                    Every provider undergoes our 4-step safety check. Peace of mind is baked into every booking.
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center border-2 border-black mb-8 group-hover:bg-secondary transition-colors">
                     <Calendar className="text-black" size={36} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4">2. Easy Planning</h3>
                  <p className="text-slate-500 leading-relaxed font-bold">
                    Manage your family calendar in one place. One-click booking and automated reminders.
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center border-2 border-black mb-8 group-hover:bg-green-400 transition-colors">
                     <Users className="text-black" size={36} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4">3. Community</h3>
                  <p className="text-slate-500 leading-relaxed font-bold">
                    Connect with other parents, share reviews, and find recommendations for every age and interest.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display uppercase text-black">Simple Pricing</h2>
            <div className="mt-10 inline-flex p-2 bg-slate-100 rounded-2xl border-2 border-black shadow-sm font-sans">
              <button
                onClick={() => setPricingMode('families')}
                className={`px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  pricingMode === 'families' ? 'bg-primary text-black border-2 border-black shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                Families
              </button>
              <button
                onClick={() => setPricingMode('providers')}
                className={`px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  pricingMode === 'providers' ? 'bg-secondary text-black border-2 border-black shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                Providers
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto font-sans">
            {(pricingMode === 'families' ? PARENT_PRICING : PROVIDER_PRICING).map((tier) => (
              <div 
                key={tier.name}
                className={`relative flex flex-col p-10 bg-white rounded-[2rem] transition-all duration-300 ${
                  tier.recommended 
                    ? `border-4 ${pricingMode === 'families' ? 'border-primary' : 'border-secondary'} shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 scale-105` 
                    : 'border-2 border-slate-200 hover:border-black'
                }`}
              >
                <h3 className="text-2xl font-black uppercase text-black">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500 font-bold">{tier.tagline}</p>
                <div className="my-8">
                  <span className="text-5xl font-black text-black">{tier.price}</span>
                  <span className="text-slate-400 font-bold ml-1">/{tier.period}</span>
                </div>
                
                <ul className="flex-1 space-y-5 mb-10">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className={`mr-4 shrink-0 mt-0.5 ${pricingMode === 'families' ? 'text-primary' : 'text-secondary'}`} />
                      <span className="text-slate-700 text-sm font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? (pricingMode === 'families' ? 'primary' : 'secondary') : 'outline'}
                  className={`w-full rounded-2xl py-4 font-black uppercase tracking-widest text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                  onClick={pricingMode === 'families' ? onGetStarted : onLogin}
                >
                  {pricingMode === 'families' ? 'Start Free' : 'Get Started'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 border-t-8 border-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 font-sans">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-primary font-display mb-6 text-3xl uppercase">Klass Hero</h3>
            <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
              Modernizing youth education <br />
              Berlin, Germany
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Discovery</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li className="hover:text-primary cursor-pointer transition-colors">Programs</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Camps</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Tutors</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Partners</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li className="hover:text-secondary cursor-pointer transition-colors">Become a Hero</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Resource Center</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">SaaS Suite</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
              <li className="hover:text-white cursor-pointer transition-colors">Imprint</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-900 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
           <span>© 2024 Klass Hero UG</span>
           <div className="flex gap-6">
              <Instagram size={16} className="hover:text-white cursor-pointer" />
              <Globe size={16} className="hover:text-white cursor-pointer" />
           </div>
        </div>
      </footer>
    </div>
  );
};
