
import React from 'react';
import { Shield, CheckCircle, UserCheck, Video, GraduationCap, Heart, MessageCircle } from 'lucide-react';
import { Button } from './Button';

export const TrustSafetyPage: React.FC = () => {
  return (
    <div className="bg-peach min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b-2 border-slate-300 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-black mb-6 uppercase tracking-tight">
            Trust & Safety <span className="text-primary">at Klass Hero</span>
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed font-sans max-w-2xl mx-auto">
            At Klass Hero, trust isn’t a feature — it’s the foundation of everything we do. Our platform is built to connect families, schools, and organizations with qualified, vetted, and safety-verified educators and activity providers.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-display text-black uppercase">Our Commitment to Child Safety</h2>
            <p className="text-lg text-slate-800 leading-relaxed">
              We believe that children thrive best in environments that are safe, respectful, and professionally led. That’s why Klass Hero applies a multi-layered safety and verification framework before any provider can offer sessions on our platform.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Protect children and families",
                "Support schools and institutions with reliable providers",
                "Uphold professional and ethical teaching practices",
                "Create long-term trust across our community"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-bold text-slate-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-3xl p-8 shadow-xl transform rotate-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <h3 className="text-2xl font-display text-white mb-4 uppercase">Vetted with Care</h3>
              <p className="text-white/90 mb-6 text-lg">
                From academic tutoring to sports, arts, and enrichment programs, every provider on Klass Hero is carefully reviewed to ensure they meet our high standards for child safety, professionalism, and educational quality.
              </p>
              <div className="h-1 w-20 bg-secondary mb-6" />
              <Shield className="w-24 h-24 text-white/20 absolute bottom-0 right-0 -mb-6 -mr-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Verification */}
      <div className="bg-white border-y-2 border-slate-300 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-black mb-4 uppercase">How We Verify Providers</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Every educator and enrichment professional on Klass Hero completes a 6-step verification process before being approved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VerificationStep 
              icon={<UserCheck className="w-6 h-6" />}
              title="Identity & Age Verification"
              description="All providers must be 18 years or older, ensuring legal accountability and professional responsibility."
            />
            <VerificationStep 
              icon={<GraduationCap className="w-6 h-6" />}
              title="Experience Validation"
              description="Providers must demonstrate at least one year of experience working with children in their area of expertise."
            />
            <VerificationStep 
              icon={<Shield className="w-6 h-6" />}
              title="Extended Background Checks"
              description="Each provider submits an extended police background check, confirming their eligibility to work safely with minors."
            />
            <VerificationStep 
              icon={<Video className="w-6 h-6" />}
              title="Video Screening"
              description="Applicants complete a video screening to assess communication skills and alignment with our values."
            />
            <VerificationStep 
              icon={<Heart className="w-6 h-6" />}
              title="Child Safeguarding Training"
              description="All Heroes must hold or complete a recognized child safeguarding course, ensuring up-to-date knowledge."
            />
            <VerificationStep 
              icon={<CheckCircle className="w-6 h-6" />}
              title="Community Standards Agreement"
              description="Every provider agrees to follow our Community Guidelines, defining expectations around professionalism."
            />
          </div>
        </div>
      </div>

      {/* Ongoing Quality */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl">
          <h2 className="text-3xl font-display mb-8 uppercase text-secondary">Ongoing Quality & Accountability</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Trust doesn’t stop at onboarding. Klass Hero continuously works to maintain a safe and high-quality ecosystem by:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Monitoring provider activity and feedback",
              "Enforcing platform standards and guidelines",
              "Reviewing concerns or reports promptly and seriously",
              "Taking action when standards are not met"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-black font-bold text-xs mt-1">
                  {i + 1}
                </div>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-400 italic border-l-4 border-secondary pl-4">
            Providers who fail to uphold our expectations may be suspended or removed from the platform.
          </p>
        </div>
      </div>

      {/* Final Section */}
      <div className="bg-white py-20 border-t-2 border-slate-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display text-black mb-8 uppercase">A Trusted Marketplace for Families & Schools</h2>
          <p className="text-xl text-slate-700 mb-12 leading-relaxed">
            Klass Hero exists to make finding reliable, high-quality educational support simple and safe. Our Trust & Safety framework ensures that every provider is carefully vetted and professionally accountable.
          </p>
          
          <div className="bg-peach p-8 rounded-2xl border-2 border-slate-200 mb-12">
            <h3 className="text-2xl font-display text-black mb-4 uppercase">Have Questions?</h3>
            <p className="text-slate-800 mb-6">
              If you’d like to learn more about our Trust & Safety standards or provider verification process, we’re happy to help.
            </p>
            <Button variant="primary" className="px-8 py-4 text-lg">
              <MessageCircle className="mr-2" /> Contact Support
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-px w-32 bg-slate-300 mb-8" />
            <p className="text-2xl font-display text-black uppercase tracking-widest">
              Trust is earned. Safety is non-negotiable.
            </p>
            <p className="text-xl text-primary font-bold mt-2">
              And at Klass Hero, both come standard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VerificationStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ icon, title, description, className = "" }) => (
  <div className={`bg-slate-100 p-6 rounded-2xl border-2 border-slate-200 hover:border-primary transition-all group ${className}`}>
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-black mb-2 font-sans">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);
