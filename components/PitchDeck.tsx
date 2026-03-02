
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Rocket, ShieldCheck, Users, TrendingUp, Target, Layout, Briefcase, Award, Zap, X } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface SlideProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  slideNumber: number;
}

const Slide: React.FC<SlideProps> = ({ title, subtitle, icon, content, slideNumber }) => (
  <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-secondary rounded-xl text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {icon || <Target size={32} />}
      </div>
      <div>
        <h2 className="text-4xl md:text-5xl font-display text-black uppercase leading-tight">{title}</h2>
        {subtitle && <p className="text-xl text-slate-500 font-bold font-sans uppercase tracking-widest">{subtitle}</p>}
      </div>
    </div>
    <div className="flex-1 font-sans text-lg text-slate-700 leading-relaxed">
      {content}
    </div>
    <div className="mt-8 flex justify-between items-center text-xs font-black text-slate-300 uppercase tracking-widest border-t border-slate-100 pt-6">
      <span>Klass Hero // Internal Investor Deck</span>
      <span>Slide {slideNumber} / 10</span>
    </div>
  </div>
);

export const PitchDeck: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 9));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slides = [
    {
      title: "Klass Hero",
      subtitle: "The Vetted Marketplace for Youth Education",
      icon: <Logo className="w-8 h-8" />,
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full gap-8">
          <div className="w-48 h-48 bg-white p-4 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Logo className="w-full h-full" />
          </div>
          <p className="text-2xl font-bold text-slate-800 max-w-2xl">
            Modernizing how families discover and book trusted after-school programs, sports, and tutoring.
          </p>
          <div className="flex gap-4">
             <span className="bg-primary px-4 py-1 rounded-full border-2 border-black text-sm font-bold">Berlin Based</span>
             <span className="bg-secondary px-4 py-1 rounded-full border-2 border-black text-sm font-bold">Vetted Providers</span>
          </div>
        </div>
      )
    },
    {
      title: "The Problem",
      subtitle: "Fragmentation & The Trust Deficit",
      icon: <Zap size={32} />,
      content: (
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
              <h4 className="font-black text-red-500 uppercase mb-2">Safety Concerns</h4>
              <p>Parents lack a standardized way to verify background checks and qualifications of freelance educators.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
              <h4 className="font-black text-red-500 uppercase mb-2">Information Chaos</h4>
              <p>Programs are scattered across WhatsApp, FB Groups, and physical boards. Scheduling is a manual nightmare.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-slate-900 text-white p-8 rounded-3xl border-4 border-black shadow-lg">
            <p className="italic text-xl mb-4">"Finding a safe, local soccer coach for my son took 3 weeks of asking around. There had to be a better way."</p>
            <p className="font-bold text-primary">— Berlin Parent Profile</p>
          </div>
        </div>
      )
    },
    {
      title: "The Solution",
      subtitle: "The 4-Step Verified Ecosystem",
      icon: <ShieldCheck size={32} />,
      content: (
        <div className="space-y-8">
          <p className="text-xl font-medium">Klass Hero isn't just a list; it's a **Trust Engine**.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { n: 1, t: "ID Check", d: "Legal verification" },
               { n: 2, t: "Police Clear", d: "Führungszeugnis" },
               { n: 3, t: "Certificates", d: "First Aid & Edu" },
               { n: 4, t: "Interview", d: "Values Alignment" }
             ].map(step => (
               <div key={step.n} className="bg-white p-4 rounded-xl border-2 border-black text-center shadow-sm">
                  <div className="w-10 h-10 bg-primary border-2 border-black rounded-full flex items-center justify-center mx-auto mb-2 font-black">{step.n}</div>
                  <h5 className="font-black text-sm uppercase">{step.t}</h5>
                  <p className="text-xs text-slate-500">{step.d}</p>
               </div>
             ))}
          </div>
          <p className="bg-cyan-50 border border-cyan-100 p-4 rounded-xl text-sm font-medium">
             <strong>Mission over Luxury:</strong> We focus on the educational mandate, making quality tutoring and sports accessible and safe for all families, not just as a status symbol.
          </p>
        </div>
      )
    },
    {
      title: "The Product",
      subtitle: "A Two-Way Specialized Marketplace",
      icon: <Layout size={32} />,
      content: (
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex gap-4 items-start">
                 <div className="p-2 bg-primary rounded-lg border-2 border-black shrink-0"><Users size={20}/></div>
                 <div>
                    <h5 className="font-black text-sm uppercase">For Families</h5>
                    <p className="text-sm">Unified Activity Planner, verified booking, and Klass Points loyalty rewards.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="p-2 bg-secondary rounded-lg border-2 border-black shrink-0"><Briefcase size={20}/></div>
                 <div>
                    <h5 className="font-black text-sm uppercase">For Providers</h5>
                    <p className="text-sm">Full SaaS Suite: Team management, per-program expense tracking, and automated invoicing.</p>
                 </div>
              </div>
           </div>
           <div className="border-4 border-black rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" alt="Product Demo" className="w-full h-full object-cover" />
           </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "Focus: Berlin & International Schools",
      icon: <TrendingUp size={32} />,
      content: (
        <div className="grid md:grid-cols-3 gap-6">
           <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl text-center">
              <div className="text-3xl font-black text-primary mb-2">€450M</div>
              <p className="text-xs uppercase font-bold text-slate-400">Total Addressable Market (Germany Youth Edu)</p>
           </div>
           <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl text-center">
              <div className="text-3xl font-black text-primary mb-2">800+</div>
              <p className="text-xs uppercase font-bold text-slate-400">Early Access Parent Subscribers</p>
           </div>
           <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl text-center">
              <div className="text-3xl font-black text-primary mb-2">3 Pilot</div>
              <p className="text-xs uppercase font-bold text-slate-400">International Schools (BIS, JFK, NMS)</p>
           </div>
           <div className="col-span-3 p-6 bg-slate-100 rounded-2xl">
              <p className="font-bold mb-2">Strategic Entry:</p>
              <p className="text-sm">By targeting Berlin's International Schools first, we capture high-density clusters of parents and qualified providers, creating immediate liquidity in the marketplace.</p>
           </div>
        </div>
      )
    },
    {
      title: "Business Model",
      subtitle: "Scalable SaaS + Transaction Fee",
      icon: <Briefcase size={32} />,
      content: (
        <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
                 <h5 className="font-black text-sm uppercase mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-secondary"/> SaaS Subscriptions
                 </h5>
                 <ul className="text-sm space-y-2 font-medium">
                    <li>• Active Family: €8/mo</li>
                    <li>• Pro Provider: €8/mo</li>
                    <li>• Business Plus: €48/mo</li>
                 </ul>
              </div>
              <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
                 <h5 className="font-black text-sm uppercase mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-primary"/> Marketplace Commission
                 </h5>
                 <ul className="text-sm space-y-2 font-medium">
                    <li>• 18% per transaction (Starter)</li>
                    <li>• 12% per transaction (Pro/Business)</li>
                    <li>• Automated split payments</li>
                 </ul>
              </div>
           </div>
           <p className="text-xs text-slate-400 font-bold uppercase text-center">Projection: Profitability within 18 months of launch.</p>
        </div>
      )
    },
    {
      title: "Go-to-Market",
      subtitle: "The School Multiplier Effect",
      icon: <Target size={32} />,
      content: (
        <div className="space-y-6">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0 font-bold">A</div>
                 <p className="text-sm">**Partnerships:** Partnering with school parents' associations (PTAs) to become the official provider-vetting platform.</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0 font-bold">B</div>
                 <p className="text-sm">**Referral Loop:** Our "Klass Points" system rewards parents for referring providers, fueling inventory growth for free.</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0 font-bold">C</div>
                 <p className="text-sm">**In-House Brand:** Leveraging the established "Prime" reputation to build the "Klass Hero" marketplace.</p>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Competition",
      subtitle: "Why Klass Hero Wins",
      icon: <Award size={32} />,
      content: (
        <div className="overflow-x-auto border-2 border-black rounded-2xl">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white">
                 <tr>
                    <th className="p-4 border-r border-slate-700">Feature</th>
                    <th className="p-4 border-r border-slate-700 bg-primary/20">Klass Hero</th>
                    <th className="p-4">Pure Directories</th>
                 </tr>
              </thead>
              <tbody className="bg-white">
                 <tr className="border-b border-slate-100">
                    <td className="p-4 border-r font-bold">Vetting Process</td>
                    <td className="p-4 border-r text-green-600 font-black">4-Step (ID + Police)</td>
                    <td className="p-4 text-slate-400">Self-Reporting</td>
                 </tr>
                 <tr className="border-b border-slate-100">
                    <td className="p-4 border-r font-bold">Provider SaaS</td>
                    <td className="p-4 border-r text-green-600 font-black">Team & Finance Suite</td>
                    <td className="p-4 text-slate-400">None</td>
                 </tr>
                 <tr>
                    <td className="p-4 border-r font-bold">Job Board</td>
                    <td className="p-4 border-r text-green-600 font-black">Parents Post Needs</td>
                    <td className="p-4 text-slate-400">Static Listings Only</td>
                 </tr>
              </tbody>
           </table>
        </div>
      )
    },
    {
      title: "The Team",
      subtitle: "Deep Domain & Technical Expertise",
      icon: <Users size={32} />,
      content: (
        <div className="grid md:grid-cols-3 gap-8">
           <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 mb-4 border-2 border-black overflow-hidden shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=Shane+Ogilvie&background=06b6d4&color=fff" alt="Shane" />
              </div>
              <h5 className="font-black text-sm uppercase">Shane Ogilvie</h5>
              <p className="text-xs font-bold text-slate-500">CEO / Strategy & Vision</p>
           </div>
           <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 mb-4 border-2 border-black overflow-hidden shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=Max+Pergl&background=d946ef&color=fff" alt="Max" />
              </div>
              <h5 className="font-black text-sm uppercase">Max Pergl</h5>
              <p className="text-xs font-bold text-slate-500">CTO / Technical Architect</p>
           </div>
           <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 mb-4 border-2 border-black overflow-hidden shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=Konstantin+Pergl&background=f59e0b&color=fff" alt="Konstantin" />
              </div>
              <h5 className="font-black text-sm uppercase">Konstantin Pergl</h5>
              <p className="text-xs font-bold text-slate-500">CFO / Operations & Growth</p>
           </div>
           <div className="col-span-3 text-center pt-4 border-t border-slate-100">
              <p className="text-sm font-medium">Supported by scientific advisors from EUV Viadrina Gründungszentrum.</p>
           </div>
        </div>
      )
    },
    {
      title: "The Ask",
      subtitle: "Join the Modernization of Youth Edu",
      icon: <Rocket size={32} />,
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full gap-8">
           <h4 className="text-3xl font-black uppercase text-slate-900 leading-tight">We are seeking strategic partners and pre-seed funding.</h4>
           <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
              <div className="text-left">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status</p>
                 <p className="font-black text-lg">PWA Beta Complete</p>
              </div>
              <div className="text-left">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Next Milestone</p>
                 <p className="font-black text-lg">Full Berlin Launch Q3 2024</p>
              </div>
           </div>
           <div className="mt-8">
              <Button size="lg" className="px-12 py-4 text-xl" onClick={onClose}>Contact Us</Button>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-peach flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="absolute top-6 right-6 z-[110]">
         <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <X size={32} className="text-black" />
         </button>
      </div>

      <div className="w-full h-full relative flex flex-col">
         {/* Slide Content Area */}
         <div className="flex-1 overflow-y-auto">
            <Slide 
              title={slides[currentSlide].title}
              subtitle={slides[currentSlide].subtitle}
              icon={slides[currentSlide].icon}
              content={slides[currentSlide].content}
              slideNumber={currentSlide + 1}
            />
         </div>

         {/* Navigation Controls */}
         <div className="h-20 bg-white border-t-4 border-black flex items-center justify-between px-8 relative">
            {/* Progress Bar */}
            <div className="absolute top-[-4px] left-0 h-1 bg-secondary transition-all duration-300" style={{width: `${((currentSlide + 1) / 10) * 100}%`}}></div>
            
            <button 
              disabled={currentSlide === 0}
              onClick={prevSlide}
              className="flex items-center gap-2 font-black uppercase text-sm disabled:opacity-20 hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            <div className="flex gap-1">
               {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 border-black ${currentSlide === i ? 'bg-secondary' : 'bg-transparent'}`}></div>
               ))}
            </div>

            <button 
              disabled={currentSlide === 9}
              onClick={nextSlide}
              className="flex items-center gap-2 font-black uppercase text-sm disabled:opacity-20 hover:text-primary transition-colors"
            >
              Next <ChevronRight size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};
