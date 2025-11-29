
import React, { useState } from 'react';
import { ShieldCheck, Calendar, Users, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, Edit, MessageCircle, TrendingUp, Search } from 'lucide-react';
import { Button } from './Button';
import { PARENT_PRICING, PROVIDER_PRICING, FAQ_ITEMS, MOCK_PROGRAMS } from '../constants';
import { VerificationIcon } from './ParentPortal';

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
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-peach pt-24 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 relative inline-block">
            {/* Real Paint Splash Decoration */}
            <img 
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=500&q=80" 
              alt="Colorful Paint Splash" 
              className="absolute -top-20 -right-20 w-48 h-48 object-cover pointer-events-none z-0 opacity-90 mix-blend-multiply"
              style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
            />
            Connecting Families with <br />
            <span className="relative z-10 text-primaryDark">Trusted Youth Educators</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 mt-4 relative z-10">
            Prime Youth Connect modernizes how families discover and book children's programs. 
            A safety-first, vetted two-way marketplace for education and recreation.
          </p>
          
          {/* Simplified Search Bar */}
          <div className="max-w-xl mx-auto bg-white p-2 rounded-full shadow-xl shadow-slate-200/50 flex items-center mb-8 border border-slate-100 relative z-10">
             <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primaryDark" size={24} />
                <input 
                  type="text" 
                  placeholder="Find Programs (e.g. Soccer, Math)" 
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none rounded-full"
                />
             </div>
             <Button onClick={onGetStarted} className="rounded-full px-8 py-3 h-auto text-lg shadow-lg bg-primary hover:bg-primaryDark text-slate-900 hover:text-white transition-all font-bold">
                Search
             </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
             <div>
                <span className="text-primary font-bold uppercase tracking-wider text-sm bg-cyan-50 px-3 py-1 rounded-full border border-primary/20 mb-2 inline-block">For Families</span>
                <h2 className="text-3xl font-bold text-slate-900">Featured Programs</h2>
                <p className="text-slate-500 mt-2">Explore top-rated activities for your children</p>
             </div>
             <button onClick={onGetStarted} className="text-primaryDark font-bold hover:underline">View All Programs</button>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
            {MOCK_PROGRAMS.map((program) => (
              <div key={program.id} className="min-w-[320px] bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 snap-start hover:-translate-y-1 transition-transform duration-300">
                 <div className="h-48 w-full overflow-hidden relative">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {program.verifications.map(type => (
                        <div key={type} className="bg-white/90 backdrop-blur p-1 rounded-full shadow-sm" title={type.replace('_', ' ')}>
                           <VerificationIcon type={type} size={12} />
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="px-5 pb-5 pt-8 relative">
                    <div className="absolute -top-10 right-5 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                      <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star size={16} className="text-amber-400 fill-amber-400 mr-1" />
                      <span className="font-bold text-slate-900 mr-1">{program.rating}</span>
                      <span className="text-sm text-slate-400">({program.reviews})</span>
                    </div>

                    <h3 className="font-bold text-slate-900 truncate text-lg mb-1">{program.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 truncate font-medium">{program.provider}</p>
                    <div className="flex items-center text-xs text-slate-400 mb-4">
                       <MapPin size={14} className="mr-1" />
                       <span className="truncate">{program.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                       <span className="font-bold text-xl text-primaryDark">€{program.price}</span>
                       <Button size="sm" variant="outline" onClick={onGetStarted} className="rounded-full px-4 border-primary text-primaryDark hover:bg-primary hover:text-slate-900 font-bold">Book Now</Button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider "How It Works" */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
         {/* Background accent */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
             <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary rounded-full blur-[100px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
               <span className="text-secondary font-bold uppercase tracking-wider text-sm bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">For Providers</span>
               <h2 className="text-4xl font-bold mt-4">Grow Your Passion Business</h2>
               <p className="text-slate-400 mt-4 max-w-2xl mx-auto">We provide the tools you need to focus on what you love—teaching.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
               {/* Step 1 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                     <Edit className="text-secondary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">1. Create a Program</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Sign up, build your verified profile, and list your programs or services. We handle the SEO and marketing.
                  </p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                     <MessageCircle className="text-primary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">2. Deliver Quality</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Communicate with families, manage rosters, and deliver outstanding experiences that earn 5-star reviews.
                  </p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                     <TrendingUp className="text-accent" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">3. Get Paid & Grow</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Receive payments on time. Use our invoicing and analytics tools to track your growth and build your brand.
                  </p>
               </div>
            </div>

            <div className="mt-20 text-center">
               <Button size="lg" onClick={onLogin} className="bg-secondary hover:bg-fuchsia-600 rounded-full px-10 py-4 text-lg shadow-lg shadow-secondary/30">Start Teaching Today</Button>
            </div>
         </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-peach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm bg-cyan-50 px-3 py-1 rounded-full border border-primary/20 mb-4 inline-block">For Families</span>
            <h2 className="text-3xl font-bold text-slate-900">Why Prime Youth Connect?</h2>
            <p className="mt-4 text-slate-600">Safety, quality, and convenience for modern families.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-md transition-all">
              <div className="h-16 w-16 bg-cyan-50 text-primaryDark rounded-2xl flex items-center justify-center mb-6 rotate-3 border border-primary/20">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Safety First</h3>
              <p className="text-slate-600">
                Every provider is rigorously vetted. We prioritize child safety above all else, giving parents peace of mind.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-md transition-all">
              <div className="h-16 w-16 bg-fuchsia-50 text-secondary rounded-2xl flex items-center justify-center mb-6 -rotate-3 border border-secondary/20">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Easy Scheduling</h3>
              <p className="text-slate-600">
                Book camps, tutors, and workshops instantly. Our integrated planner helps you manage your child's busy life.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-md transition-all">
              <div className="h-16 w-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 border border-accent/20">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Community Focused</h3>
              <p className="text-slate-600">
                Built for the Berlin international community. Connect with local families and trusted educators nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <div className="mt-8 inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setPricingMode('families')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  pricingMode === 'families' ? 'bg-white text-primaryDark shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                For Families
              </button>
              <button
                onClick={() => setPricingMode('providers')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  pricingMode === 'providers' ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-900'
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
                className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all duration-300 ${
                  tier.recommended 
                    ? `border-2 ${pricingMode === 'families' ? 'border-primary shadow-primary/20' : 'border-secondary shadow-secondary/20'} shadow-xl scale-105 z-10` 
                    : 'border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {tier.recommended && (
                  <span className={`absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${pricingMode === 'families' ? 'bg-primary text-slate-900' : 'bg-secondary'}`}>
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500 min-h-[40px]">{tier.tagline}</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500 font-medium">/{tier.period}</span>
                </div>
                
                {/* AI & Support Differentiator */}
                {tier.name.includes('Active') && (
                   <div className="mb-4 bg-cyan-50 p-3 rounded-lg text-xs text-cyan-800 flex items-center">
                      <Star size={14} className="mr-2 text-primaryDark fill-primaryDark"/> Includes AI Support Bot
                   </div>
                )}
                {tier.name.includes('Business') && (
                   <div className="mb-4 bg-fuchsia-50 p-3 rounded-lg text-xs text-fuchsia-800 flex items-center">
                      <Star size={14} className="mr-2 text-secondary fill-secondary"/> Priority Support & Schools
                   </div>
                )}

                <ul className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className={`mr-3 shrink-0 ${pricingMode === 'families' ? 'text-primaryDark' : 'text-secondary'}`} />
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? (pricingMode === 'families' ? 'primary' : 'secondary') : 'outline'}
                  className={`w-full rounded-xl py-3 ${tier.recommended && pricingMode === 'families' ? 'text-slate-900 font-bold' : ''}`}
                  onClick={pricingMode === 'families' ? onGetStarted : onLogin}
                >
                  {pricingMode === 'families' ? 'Start Exploring' : 'Start Teaching'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Schools */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-8">Trusted by Leading Schools</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {['Berlin International School', 'John F. Kennedy School', 'Nelson Mandela School', 'Berlin British School'].map(school => (
                  <div key={school} className="text-xl font-bold font-serif text-slate-600 flex items-center">
                     <div className="w-8 h-8 bg-slate-300 rounded-full mr-3"></div> {school}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
           </div>
           <div className="space-y-4">
             {FAQ_ITEMS.map((item, idx) => (
               <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                 <button 
                   onClick={() => toggleFaq(idx)}
                   className="w-full flex justify-between items-center p-5 text-left transition-colors"
                 >
                   <span className="font-bold text-slate-800">{item.question}</span>
                   {openFaqIndex === idx ? <ChevronUp size={20} className="text-primaryDark"/> : <ChevronDown size={20} className="text-slate-400"/>}
                 </button>
                 {openFaqIndex === idx && (
                   <div className="px-5 pb-5 text-slate-600 border-t border-slate-50 pt-4 leading-relaxed bg-slate-50/50">
                     {item.answer}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Prime Youth Connect</h3>
            <p className="text-sm leading-relaxed">Building the future of youth education by connecting communities.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">For Families</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">For Providers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Safety & Vetting</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Press</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Imprint</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
