
import React, { useState } from 'react';
import { ShieldCheck, Calendar, Users, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, Edit, MessageCircle, TrendingUp, Search, X } from 'lucide-react';
import { Button } from './Button';
import { PARENT_PRICING, PROVIDER_PRICING, FAQ_ITEMS, MOCK_PROGRAMS, TRENDING_SEARCHES } from '../constants';
import { VerificationIcon } from './ParentPortal';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const [pricingMode, setPricingMode] = useState<'families' | 'providers'>('families');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-peach">
      
      {/* --- Feature Comparison Modal --- */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-peach/95 backdrop-blur overflow-y-auto animate-in fade-in">
           <div className="max-w-6xl mx-auto p-6 md:p-12">
               <div className="flex justify-between items-center mb-8">
                   <div>
                       <h2 className="text-3xl font-bold text-slate-900">Feature Comparison</h2>
                       <p className="text-slate-500 font-sans">Detailed breakdown of all plan features.</p>
                   </div>
                   <button onClick={() => setShowCompareModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                       <X size={32} className="text-slate-500"/>
                   </button>
               </div>

               <div className="space-y-12">
                   {/* Provider Table */}
                   <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                           <span className="bg-secondary text-black px-2 py-0.5 rounded text-sm uppercase border border-black font-sans">Provider Plans</span>
                       </h3>
                       <div className="overflow-x-auto border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                           <table className="w-full text-left text-sm border-collapse bg-white font-sans">
                               <thead className="bg-slate-50 text-slate-900 border-b-2 border-black">
                                   <tr>
                                       <th className="p-4 border-r-2 border-black font-bold min-w-[200px]">Feature Logic</th>
                                       <th className="p-4 border-r-2 border-black font-bold min-w-[200px]">Starter (Free)</th>
                                       <th className="p-4 border-r-2 border-black font-bold min-w-[200px]">Professional (€8/mo)</th>
                                       <th className="p-4 font-bold min-w-[200px] bg-secondary/20">Business Plus (€48/mo)</th>
                                   </tr>
                               </thead>
                               <tbody className="text-slate-900 divide-y-2 divide-black">
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Program Listing Limit</td>
                                       <td className="p-4 border-r-2 border-black">Max 2 Active Programs</td>
                                       <td className="p-4 border-r-2 border-black">Max 5 Active Programs</td>
                                       <td className="p-4 bg-secondary/10 font-bold text-slate-900">Unlimited</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Platform Commission</td>
                                       <td className="p-4 border-r-2 border-black">18% per transaction</td>
                                       <td className="p-4 border-r-2 border-black">12% per transaction</td>
                                       <td className="p-4 bg-secondary/10 font-bold text-slate-900">Custom / Lower (or 12%)</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Media Entitlements</td>
                                       <td className="p-4 border-r-2 border-black">Avatar & Bio only</td>
                                       <td className="p-4 border-r-2 border-black">Cover Image, Gallery, Video</td>
                                       <td className="p-4 bg-secondary/10">All Professional features</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Team Management</td>
                                       <td className="p-4 border-r-2 border-black">Owner Only (Solo)</td>
                                       <td className="p-4 border-r-2 border-black">Owner Only (Solo)</td>
                                       <td className="p-4 bg-secondary/10 font-bold text-slate-900">3 Seats Included (+€5/seat)</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Financial Tools</td>
                                       <td className="p-4 border-r-2 border-black">Basic Invoicing</td>
                                       <td className="p-4 border-r-2 border-black">Basic Invoicing + Analytics</td>
                                       <td className="p-4 bg-secondary/10 font-bold text-slate-900">Expense Tracking, Split Pay</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Verification Level</td>
                                       <td className="p-4 border-r-2 border-black">Identity + Background</td>
                                       <td className="p-4 border-r-2 border-black">Identity + Background</td>
                                       <td className="p-4 bg-secondary/10">Business Registration (Inc/LLC)</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Search Priority</td>
                                       <td className="p-4 border-r-2 border-black">Standard</td>
                                       <td className="p-4 border-r-2 border-black">Boosted (Recommended tag)</td>
                                       <td className="p-4 bg-secondary/10">Standard (high volume)</td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>

                   {/* Family Table */}
                   <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                           <span className="bg-primary text-black px-2 py-0.5 rounded text-sm uppercase border border-black font-sans">Family Plans</span>
                       </h3>
                       <div className="overflow-x-auto border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                           <table className="w-full text-left text-sm border-collapse bg-white font-sans">
                               <thead className="bg-slate-50 text-slate-900 border-b-2 border-black">
                                   <tr>
                                       <th className="p-4 border-r-2 border-black font-bold min-w-[200px]">Feature Logic</th>
                                       <th className="p-4 border-r-2 border-black font-bold min-w-[200px]">Explorer Family (Free)</th>
                                       <th className="p-4 font-bold min-w-[200px] bg-primary/20">Active Family (€8/mo)</th>
                                   </tr>
                               </thead>
                               <tbody className="text-slate-900 divide-y-2 divide-black">
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Booking Cap</td>
                                       <td className="p-4 border-r-2 border-black">Max 2 bookings/month</td>
                                       <td className="p-4 bg-primary/10 font-bold text-slate-900">Unlimited bookings</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Cancellation Policy</td>
                                       <td className="p-4 border-r-2 border-black">Standard Provider Policy</td>
                                       <td className="p-4 bg-primary/10 font-bold text-slate-900">1 Free Cancellation/mo (Max €50)</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Progress Tracking</td>
                                       <td className="p-4 border-r-2 border-black">Basic History</td>
                                       <td className="p-4 bg-primary/10">Detailed Progress / Badges</td>
                                   </tr>
                                   <tr>
                                       <td className="p-4 border-r-2 border-black font-bold">Messaging</td>
                                       <td className="p-4 border-r-2 border-black">Read Only (or limited)</td>
                                       <td className="p-4 bg-primary/10 font-bold text-slate-900">Direct Chat with Providers</td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
               
               <div className="mt-8 flex justify-end">
                    <Button onClick={() => setShowCompareModal(false)} size="lg">Close Comparison</Button>
               </div>
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-24 px-6 lg:px-8 overflow-hidden bg-peach">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl mb-6 font-extrabold tracking-tight leading-tight font-sans">
            <span className="text-slate-500">Connecting Families with Trusted</span> <br />
            <span className="text-black">Heroes for Our Youth</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-800 max-w-3xl mx-auto mb-10 mt-4 relative z-10 font-medium font-sans">
            Klass Hero is Berlin's leading marketplace for <strong>youth education, sports, and recreational activities</strong>. 
            Find verified tutors, coaches, and camps near you.
          </p>
          
          {/* Simplified Search Bar */}
          <div className="max-w-xl mx-auto bg-white p-2 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center mb-4 border-2 border-black relative z-10">
             <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} />
                <input 
                  type="text" 
                  placeholder="Find Programs (e.g. Soccer, Math, Swimming)" 
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none rounded-full font-bold font-sans"
                />
             </div>
             <Button onClick={onGetStarted} className="rounded-lg px-8 py-3 h-auto text-lg bg-primary hover:bg-primaryDark text-black font-black uppercase border-l-2 border-black">
                Search
             </Button>
          </div>
          
          {/* Trending Searches */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10 font-sans">
              <span className="text-xs text-slate-700 font-bold uppercase tracking-wider mt-1.5">Trending in Berlin:</span>
              {TRENDING_SEARCHES.map(term => (
                  <button key={term} onClick={onGetStarted} className="px-3 py-1 bg-white border-2 border-black rounded-lg text-xs text-black font-bold hover:bg-secondary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none">
                      {term}
                  </button>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel */}
      <section className="py-20 bg-white border-t-2 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
             <div>
                <h2 className="text-3xl font-bold text-slate-900 uppercase">Featured Kids Programs</h2>
                <p className="text-slate-500 mt-2 font-medium font-sans">Top-rated after-school activities, sports clubs, and tutoring in your area.</p>
             </div>
             <button onClick={onGetStarted} className="text-primaryDark font-black uppercase hover:underline font-sans">View All Programs</button>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x font-sans">
            {MOCK_PROGRAMS.map((program) => (
              <div key={program.id} className="min-w-[320px] bg-white border border-slate-200 rounded-xl overflow-hidden snap-start hover:shadow-md transition-shadow duration-300">
                 <div className="h-48 w-full overflow-hidden relative border-b border-slate-100">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {program.verifications.map(type => (
                        <div key={type} className="bg-white border border-slate-200 p-1 rounded-full shadow-sm" title={type.replace('_', ' ')}>
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
                      <Star size={16} className="text-secondary fill-secondary mr-1 stroke-black stroke-1" />
                      <span className="font-bold text-slate-900 mr-1">{program.rating}</span>
                      <span className="text-sm text-slate-400">({program.reviews})</span>
                    </div>

                    {/* Keep font-display on Program Title */}
                    <h3 className="font-bold text-slate-900 truncate text-lg mb-1 font-display">{program.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 truncate font-medium">{program.provider}</p>
                    <div className="flex items-center text-xs text-slate-400 mb-4">
                       <MapPin size={14} className="mr-1" />
                       <span className="truncate">{program.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                       <span className="font-black text-xl text-black">€{program.price}</span>
                       <Button size="sm" variant="primary" onClick={onGetStarted} className="rounded-lg px-4 font-bold border border-slate-200 shadow-sm">Book Now</Button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider "How It Works" */}
      <section className="py-24 bg-slate-300 text-slate-900 overflow-hidden relative border-t-2 border-black">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
               <span className="text-black font-bold uppercase tracking-wider text-sm bg-secondary px-3 py-1 rounded border-2 border-black font-sans">For Providers</span>
               <h2 className="text-4xl font-bold mt-4 uppercase text-black">Grow Your Passion Business</h2>
               <p className="text-slate-700 mt-4 max-w-2xl mx-auto font-sans font-medium">
                 Are you a kids' coach, music teacher, or tutor? We provide the tools you need to manage bookings, payments, and marketing so you can focus on teaching.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative font-sans">
               {/* Step 1 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-4 border-black mb-8 shadow-[6px_6px_0px_0px_#FFFF36] group-hover:scale-110 transition-transform duration-300">
                     <Edit className="text-black" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">1. Create a Program</h3>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    Sign up, build your verified profile, and list your programs or services. We handle the SEO and marketing to reach Berlin families.
                  </p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-4 border-black mb-8 shadow-[6px_6px_0px_0px_#0FC3FF] group-hover:scale-110 transition-transform duration-300">
                     <MessageCircle className="text-black" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">2. Deliver Quality</h3>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    Communicate with families, manage rosters, and deliver outstanding experiences that earn 5-star reviews.
                  </p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-4 border-black mb-8 shadow-[6px_6px_0px_0px_#ffffff] group-hover:scale-110 transition-transform duration-300">
                     <TrendingUp className="text-black" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">3. Get Paid & Grow</h3>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    Receive payments on time. Use our invoicing and analytics tools to track your growth and build your brand.
                  </p>
               </div>
            </div>

            <div className="mt-20 text-center">
               <Button size="lg" onClick={onLogin} className="bg-secondary hover:bg-yellow-300 text-black font-black uppercase rounded-xl px-10 py-4 text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000000]">Start Teaching Today</Button>
            </div>
         </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-peach border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-black font-bold uppercase tracking-wider text-sm bg-primary px-3 py-1 rounded border-2 border-black font-sans">For Families</span>
            <h2 className="text-3xl font-black text-slate-900 uppercase mt-4">Why Klass Hero?</h2>
            <p className="mt-4 text-slate-700 font-bold font-sans">Safety, quality, and convenience for modern families.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 font-sans">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border-2 border-slate-300 shadow-[4px_4px_0px_0px_#cbd5e1] hover:-translate-y-1 transition-transform">
              <div className="h-16 w-16 bg-cyan-100 text-black rounded-2xl flex items-center justify-center mb-6 border-2 border-black">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Safety First</h3>
              <p className="text-slate-600 font-medium">
                Every provider is rigorously vetted. We prioritize child safety above all else, giving parents peace of mind.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border-2 border-slate-300 shadow-[4px_4px_0px_0px_#cbd5e1] hover:-translate-y-1 transition-transform">
              <div className="h-16 w-16 bg-fuchsia-100 text-black rounded-2xl flex items-center justify-center mb-6 border-2 border-black">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Easy Scheduling</h3>
              <p className="text-slate-600 font-medium">
                Book camps, tutors, and workshops instantly. Our integrated planner helps you manage your child's busy life.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border-2 border-slate-300 shadow-[4px_4px_0px_0px_#cbd5e1] hover:-translate-y-1 transition-transform">
              <div className="h-16 w-16 bg-yellow-100 text-black rounded-2xl flex items-center justify-center mb-6 border-2 border-black">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Community Focused</h3>
              <p className="text-slate-600 font-medium">
                Built for the Berlin international community. Connect with local families and trusted educators nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase">Simple, Transparent Pricing</h2>
            <div className="mt-8 inline-flex p-1 bg-slate-200 rounded-xl border-2 border-slate-300 shadow-[4px_4px_0px_0px_#cbd5e1] font-sans">
              <button
                onClick={() => setPricingMode('families')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  pricingMode === 'families' ? 'bg-primary text-black border-2 border-black' : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                For Families
              </button>
              <button
                onClick={() => setPricingMode('providers')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  pricingMode === 'providers' ? 'bg-secondary text-black border-2 border-black' : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                For Providers
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto font-sans">
            {(pricingMode === 'families' ? PARENT_PRICING : PROVIDER_PRICING).map((tier) => (
              <div 
                key={tier.name}
                className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all duration-300 ${
                  tier.recommended 
                    ? `border-4 ${pricingMode === 'families' ? 'border-primary shadow-[8px_8px_0px_0px_#0FC3FF]' : 'border-secondary shadow-[8px_8px_0px_0px_#FFFF36]'} z-10` 
                    : 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {tier.recommended && (
                  <span className={`absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-black border-2 border-black shadow-sm ${pricingMode === 'families' ? 'bg-primary' : 'bg-secondary'}`}>
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 uppercase">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500 min-h-[40px] font-medium">{tier.tagline}</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500 font-medium">/{tier.period}</span>
                </div>
                
                {/* AI & Support Differentiator */}
                {tier.name.includes('Active') && (
                   <div className="mb-4 bg-cyan-50 border border-cyan-200 p-3 rounded-lg text-xs text-cyan-800 flex items-center font-bold">
                      <Star size={14} className="mr-2 text-primary fill-current"/> Includes AI Support Bot
                   </div>
                )}
                {tier.name.includes('Business') && (
                   <div className="mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-800 flex items-center font-bold">
                      <Star size={14} className="mr-2 text-secondary fill-current"/> Priority Support & Schools
                   </div>
                )}

                <ul className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className={`mr-3 shrink-0 ${pricingMode === 'families' ? 'text-primary' : 'text-secondary'}`} />
                      <span className="text-slate-700 text-sm font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? (pricingMode === 'families' ? 'primary' : 'secondary') : 'outline'}
                  className={`w-full rounded-xl py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${tier.recommended && pricingMode === 'families' ? 'text-black font-black' : 'font-bold'}`}
                  onClick={pricingMode === 'families' ? onGetStarted : onLogin}
                >
                  {pricingMode === 'families' ? 'Start Exploring' : 'Start Teaching'}
                </Button>
              </div>
            ))}
          </div>
          
          {/* Comparison Trigger */}
          <div className="text-center mt-12">
             <button onClick={() => setShowCompareModal(true)} className="text-slate-500 hover:text-black font-bold underline decoration-slate-300 hover:decoration-black underline-offset-4 transition-all uppercase font-sans">
                 Compare all plan features details
             </button>
          </div>
        </div>
      </section>

      {/* Trusted By Schools */}
      <section className="py-16 bg-peach border-t-2 border-black">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8 font-sans">Trusted by Leading Schools</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['Berlin International School', 'John F. Kennedy School', 'Nelson Mandela School', 'Berlin British School'].map(school => (
                  <div key={school} className="text-xl font-bold font-serif text-slate-800 flex items-center">
                     <div className="w-8 h-8 bg-slate-400 rounded-full mr-3 border border-black"></div> {school}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t-2 border-black">
        <div className="max-w-3xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-slate-900 uppercase">Frequently Asked Questions</h2>
           </div>
           <div className="space-y-4 font-sans">
             {FAQ_ITEMS.map((item, idx) => (
               <div key={idx} className="border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                 <button 
                   onClick={() => toggleFaq(idx)}
                   className="w-full flex justify-between items-center p-5 text-left transition-colors hover:bg-slate-50"
                 >
                   <span className="font-bold text-slate-900">{item.question}</span>
                   {openFaqIndex === idx ? <ChevronUp size={20} className="text-black"/> : <ChevronDown size={20} className="text-slate-400"/>}
                 </button>
                 {openFaqIndex === idx && (
                   <div className="px-5 pb-5 text-slate-700 border-t-2 border-black pt-4 leading-relaxed bg-peach/30 font-medium">
                     {item.answer}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 font-sans">
          <div>
            <h3 className="text-primary font-bold mb-4 text-lg uppercase">Klass Hero</h3>
            <p className="text-sm leading-relaxed text-slate-300">Building the future of youth education by connecting communities.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Platform</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li className="hover:text-primary cursor-pointer transition-colors">For Families</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">For Providers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Safety & Vetting</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Press</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
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
