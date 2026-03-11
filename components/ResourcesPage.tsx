
import React from 'react';
import { 
  Users, 
  Zap, 
  FileText, 
  Heart, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Star, 
  ShieldAlert,
  Clock,
  Search,
  Video,
  GraduationCap,
  Award,
  ShieldCheck
} from 'lucide-react';
import { Button } from './Button';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-100 text-black py-20 px-6 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display mb-6 uppercase tracking-tight">
            Why Join <span className="text-primary">Klass Hero?</span>
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Klass Hero is more than a marketplace; it is a comprehensive operational infrastructure designed by parents and partners of teachers to empower independent educators and youth organizations.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-primary text-white hover:bg-primaryDark">
              Start Your Application Today
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 px-6 bg-peach/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display text-black mb-6 uppercase">Empowering Educators & Organizations</h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Whether you are an independent instructor or a small youth organization looking to fill your workshops and camps, we provide the professional tools you need to succeed.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit text-primary">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Reach a Ready-Made Community</h3>
                    <p className="text-slate-600">Gain immediate access to the Prime Youth network of 800+ families and partner international schools in Berlin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit text-primary">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Get Paid Faster</h3>
                    <p className="text-slate-600">Secure payments upfront through our Stripe integration. No more chasing invoices or dealing with no-shows.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit text-primary">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Focus on Teaching</h3>
                    <p className="text-slate-600">We handle the scheduling, parent communication, and marketing so you can focus on inspiring kids.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                alt="Teacher with students" 
                className="rounded-2xl mb-6 w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <blockquote className="text-xl italic text-slate-800 border-l-4 border-primary pl-4">
                "Klass Hero allowed me to double my student base in just three months while cutting my admin time in half."
              </blockquote>
              <p className="mt-4 font-bold text-slate-900">— Sarah, Independent Art Instructor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-black mb-4 uppercase">Our "Safety-First" Standards</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              To maintain our position as Berlin’s most trusted network, every "Hero" must pass our 8-step verification process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SafetyStep icon={<Clock />} title="Age Requirement" desc="Must be 18 years or older." />
            <SafetyStep icon={<Award />} title="Experience" desc="Minimum of one year of experience working with children." />
            <SafetyStep icon={<Shield />} title="Background Check" desc="Submission of a current, extended police background check." />
            <SafetyStep icon={<Video />} title="Video Screening" desc="An interactive screening to assess pedagogical approach." />
            <SafetyStep icon={<Heart />} title="Child Safeguarding" desc="Completion of a mandatory safeguarding course." />
            <SafetyStep icon={<GraduationCap />} title="Qualifications" desc="Verification of degrees or relevant certifications." />
            <SafetyStep icon={<CheckCircle />} title="Community Guidelines" desc="Formal agreement to Klass Hero standards." />
            <SafetyStep icon={<ShieldAlert />} title="Insurance & Compliance" desc="Proof of liability insurance and health requirements." />
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-6 bg-peach text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display mb-12 uppercase text-center">The Application Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep number="1" title="Create Your Profile" desc="Sign up for free and build your professional bio." />
            <ProcessStep number="2" title="Verification" desc="Complete the 8-step safety check with support from KH." />
            <ProcessStep number="3" title="List Your Programs" desc="Set up your first class or camp using our intuitive tools." />
            <ProcessStep number="4" title="Go Live" desc="Your programs become bookable by thousands of families." />
          </div>
        </div>
      </section>

      {/* Support & Review */}
      <section className="py-20 px-6 bg-peach/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
              <h2 className="text-2xl font-display text-black mb-8 uppercase">How We Support Our Heroes</h2>
              <div className="space-y-6">
                <SupportItem 
                  icon={<Star className="text-yellow-500" />} 
                  title="Quality Ratings" 
                  desc="Build a 5-star reputation through parent reviews that drive more bookings." 
                />
                <SupportItem 
                  icon={<BarChart3 className="text-primary" />} 
                  title="Business Analytics" 
                  desc="Access a real-time dashboard to track revenue and booking trends." 
                />
                <SupportItem 
                  icon={<Zap className="text-secondary" />} 
                  title="Dedicated Growth Support" 
                  desc="Personalized business development support for Business Plus members." 
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
               <h2 className="text-3xl font-display text-black mb-6 uppercase">Choose the Plan That Fits Your Growth</h2>
               <div className="space-y-4">
                  <PricingCard 
                    title="Starter" 
                    price="Free" 
                    commission="18% commission" 
                    desc="Best for those just getting started with no upfront costs." 
                  />
                  <PricingCard 
                    title="Professional" 
                    price="€8/month" 
                    commission="12% commission" 
                    desc="Ideal for active educators booking 4+ sessions a month." 
                    highlighted
                  />
                  <PricingCard 
                    title="Business Plus" 
                    price="€48/month" 
                    commission="8% commission" 
                    desc="Featured placement and advanced marketing tools for established teams." 
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-display text-black mb-6 uppercase">Ready to Inspire the Next Generation?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Join Berlin's most trusted network of educators and start growing your independent business today.
          </p>
          <Button size="lg" className="px-12 py-6 text-xl bg-primary text-white hover:bg-primaryDark shadow-xl">
            Start Your Application Today <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const SafetyStep = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-primary transition-colors">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

const ProcessStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="relative">
    <div className="text-6xl font-display text-black/10 absolute -top-4 -left-2 select-none">{number}</div>
    <div className="relative z-10">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-700 text-sm">{desc}</p>
    </div>
  </div>
);

const SupportItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  </div>
);

const PricingCard = ({ title, price, commission, desc, highlighted = false }: { title: string, price: string, commission: string, desc: string, highlighted?: boolean }) => (
  <div className={`p-6 rounded-xl border-2 transition-all ${highlighted ? 'border-primary bg-primary/5 shadow-md scale-105' : 'border-slate-100 bg-white'}`}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <div className="text-lg font-display text-primary">{price}</div>
    </div>
    <div className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{commission}</div>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);
