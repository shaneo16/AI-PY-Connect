import React from 'react';
import { Button } from './Button';
import { ShieldCheck, Leaf, Heart } from 'lucide-react';

interface AboutPageProps {
  onContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onContact }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-dark text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-slate-300">
            To modernize how families discover children's programs by creating a vetted, safe, and community-driven marketplace.
          </p>
        </div>
      </div>

      {/* Story/Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">Built for Berlin Families</h2>
               <p className="text-slate-600 mb-4">
                 Over the past 5 years, Prime Youth has built a reputation as one of the leading extra-curricular program providers in the Berlin area. 
                 We saw a need to solve the "chicken and egg" problem for families finding trusted activities.
               </p>
               <p className="text-slate-600">
                 Our platform connects families with verified providers regardless of location or income level, democratizing quality youth education.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
               <div className="flex items-start">
                  <div className="bg-cyan-100 p-3 rounded-lg mr-4 text-primary"><ShieldCheck size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Safety First</h3>
                    <p className="text-sm text-slate-500">We are the only platform to focus heavily on safety standards for families and schools.</p>
                  </div>
               </div>
               <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4 text-green-600"><Leaf size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Sustainability</h3>
                    <p className="text-sm text-slate-500">We reduce the physical footprint through digital tools and support local freelance educators.</p>
                  </div>
               </div>
               <div className="flex items-start">
                  <div className="bg-fuchsia-100 p-3 rounded-lg mr-4 text-secondary"><Heart size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Community</h3>
                    <p className="text-sm text-slate-500">Building relationships between 800+ parent subscribers and trusted youth educators.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">The Founding Team</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {/* Shane */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Shane+Ogilvie&background=06b6d4&color=fff" alt="Shane" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Shane Ogilvie</h3>
                 <p className="text-primary font-medium mb-4">CEO & Co-Founder</p>
                 <p className="text-sm text-slate-500">
                   Masters in Sport Performance Analysis with 5+ years building the Prime Youth brand. The visionary connector.
                 </p>
              </div>

              {/* Max */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Max+Pergl&background=d946ef&color=fff" alt="Max" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Max Pergl</h3>
                 <p className="text-secondary font-medium mb-4">CTO & Co-Founder</p>
                 <p className="text-sm text-slate-500">
                   Full-stack development expertise and MBA. Architecting our scalable and sustainable platform.
                 </p>
              </div>

              {/* Konstantin */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Konstantin+Pergl&background=f59e0b&color=fff" alt="Konstantin" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Konstantin Pergl</h3>
                 <p className="text-amber-500 font-medium mb-4">CFO & Co-Founder</p>
                 <p className="text-sm text-slate-500">
                   International Business Administration student managing finance and analysis. Driven and energetic.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to join the movement?</h2>
          <Button size="lg" onClick={onContact}>Get Started Today</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p className="text-sm">© 2024 Prime Youth Connect UG</p>
            <div className="flex space-x-6 text-sm">
               <span>Privacy</span>
               <span>Imprint</span>
            </div>
        </div>
      </footer>
    </div>
  );
};