
import React, { useState } from 'react';
import { ShieldCheck, Calendar, Users, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, Edit, MessageCircle, TrendingUp, Search } from 'lucide-react';
import { Button } from './Button';
import { PARENT_PRICING, PROVIDER_PRICING, FAQ_ITEMS, MOCK_PROGRAMS } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const [pricingMode, setPricingMode] = useState<'families' | 'providers'>('families');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark text-white pt-24 pb-16 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1502086223501-6e001550c69d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Connecting Families with <br />
            <span className="text-primary">Trusted Youth Educators</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Prime Youth Connect modernizes how families discover and book children's programs. 
            A safety-first, vetted two-way marketplace for education and recreation.
          </p>
          
          {/* Dual Search Bar */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 mb-8">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Find Programs (e.g. Soccer, Math)" 
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                />
             </div>
             <div className="hidden md:block w-px bg-slate-200"></div>
             <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Location (e.g. Mitte)" 
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                />
             </div>
             <Button onClick={onGetStarted} className="md:w-auto w-full h-auto py-3 px-6">
                Search
             </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={onLogin}>
              Provider Login
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">Featured Programs</h2>
             <button onClick={onGetStarted} className="text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x">
            {MOCK_PROGRAMS.map((program) => (
              <div key={program.id} className="min-w-[300px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm snap-start">
                 <div className="h-40 w-full overflow-hidden relative">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="px-4 pb-4 pt-8 relative">
                    <div className="absolute -top-8 right-4 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm bg-white">
                      <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <Star size={14} className="text-amber-400 fill-amber-400 mr-1" />
                      <span className="text-sm font-bold text-slate-900">{program.rating}</span>
                      <span className="text-xs text-slate-400 ml-1">({program.reviews})</span>
                    </div>

                    <h3 className="font-bold text-slate-900 truncate text-lg">{program.title}</h3>
                    <p className="text-sm text-slate-500 mb-2 truncate">{program.provider}</p>
                    <div className="flex items-center text-xs text-slate-400 mb-4">
                       <MapPin size={12} className="mr-1" />
                       <span className="truncate">{program.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                       <span className="font-bold text-primary">€{program.price}</span>
                       <Button size="sm" variant="outline" onClick={onGetStarted} className="h-8 text-xs">Book</Button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider "How It Works" */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
               <span className="text-secondary font-bold uppercase tracking-wider text-sm">For Providers</span>
               <h2 className="text-3xl font-bold mt-2">Grow Your Passion Business in 3 Steps</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
               {/* Removed vertical line */}

               {/* Step 1 */}
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-secondary mb-6 shadow-lg shadow-secondary/20">
                     <Edit className="text-secondary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. List Your Expertise</h3>
                  <p className="text-slate-400">
                    Sign up, build your profile, and list your programs or services. We handle the marketing so you can focus on teaching.
                  </p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-primary mb-6 shadow-lg shadow-primary/20">
                     <MessageCircle className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. Connect & Deliver</h3>
                  <p className="text-slate-400">
                    Communicate directly with families via our secure platform to understand their needs and deliver outstanding experiences.
                  </p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-green-400 mb-6 shadow-lg shadow-green-400/20">
                     <TrendingUp className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Grow & Earn</h3>
                  <p className="text-slate-400">
                    Get paid on time with automated invoicing and use our business tools to track growth and build your personal brand.
                  </p>
               </div>
            </div>

            <div className="mt-12 text-center">
               <Button size="lg" onClick={onLogin} className="bg-secondary hover:bg-fuchsia-600">Start Teaching Today</Button>
            </div>
         </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Prime Youth Connect?</h2>
            <p className="mt-4 text-slate-600">Safety, quality, and convenience for modern families.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-16 w-16 bg-cyan-100 text-primary rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-slate-600">
                Every provider is rigorously vetted. We prioritize child safety above all else, giving parents peace of mind.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-16 w-16 bg-fuchsia-100 text-secondary rounded-full flex items-center justify-center mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Scheduling</h3>
              <p className="text-slate-600">
                Book camps, tutors, and workshops instantly. Our integrated planner helps you manage your child's busy life.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-16 w-16 bg-amber-100 text-accent rounded-full flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-slate-600">
                Built for the Berlin international community. Connect with local families and trusted educators nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <div className="mt-6 inline-flex p-1 bg-white rounded-lg border border-slate-200">
              <button
                onClick={() => setPricingMode('families')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  pricingMode === 'families' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Families
              </button>
              <button
                onClick={() => setPricingMode('providers')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  pricingMode === 'providers' ? 'bg-secondary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Providers
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(pricingMode === 'families' ? PARENT_PRICING : PROVIDER_PRICING).map((tier) => (
              <div 
                key={tier.name}
                className={`relative flex flex-col p-8 bg-white rounded-2xl border ${
                  tier.recommended 
                    ? `border-2 ${pricingMode === 'families' ? 'border-primary' : 'border-secondary'} shadow-xl z-10` 
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {tier.recommended && (
                  <span className={`absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${pricingMode === 'families' ? 'bg-primary' : 'bg-secondary'}`}>
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500 min-h-[40px]">{tier.tagline}</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500">/{tier.period}</span>
                </div>
                <ul className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className={`mr-3 shrink-0 ${pricingMode === 'families' ? 'text-primary' : 'text-secondary'}`} />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? (pricingMode === 'families' ? 'primary' : 'secondary') : 'outline'}
                  className="w-full"
                  onClick={pricingMode === 'families' ? onGetStarted : onLogin}
                >
                  {pricingMode === 'families' ? 'Start Exploring' : 'Start Teaching'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
           </div>
           <div className="space-y-4">
             {FAQ_ITEMS.map((item, idx) => (
               <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                 <button 
                   onClick={() => toggleFaq(idx)}
                   className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                 >
                   <span className="font-semibold text-slate-900">{item.question}</span>
                   {openFaqIndex === idx ? <ChevronUp size={20} className="text-slate-500"/> : <ChevronDown size={20} className="text-slate-500"/>}
                 </button>
                 {openFaqIndex === idx && (
                   <div className="p-4 bg-white text-slate-600 border-t border-slate-200">
                     {item.answer}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Prime Youth Connect</h3>
            <p className="text-sm">Building the future of youth education.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>For Families</li>
              <li>For Providers</li>
              <li>Safety & Vetting</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Imprint</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
