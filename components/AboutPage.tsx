
import React from 'react';
import { Button } from './Button';
import { ShieldCheck, Leaf, Heart, Search, FileCheck, UserCheck, Video } from 'lucide-react';

interface AboutPageProps {
  onContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onContact }) => {
  return (
    <div className="flex flex-col min-h-screen bg-peach">
      {/* Header */}
      <div className="bg-black text-white py-20 px-6 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display uppercase">Our Mission</h1>
          <p className="text-xl text-slate-300 font-medium">
            To modernize how families discover children's programs by creating a vetted, safe, and community-driven marketplace.
          </p>
        </div>
      </div>

      {/* Story/Values */}
      <section className="py-20 bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase">Built for Berlin Families</h2>
               <p className="text-slate-700 mb-4 font-medium">
                 Over the past 5 years, Klass Hero has built a reputation as one of the leading extra-curricular program providers in the Berlin area. 
                 We saw a need to solve the "chicken and egg" problem for families finding trusted activities.
               </p>
               <p className="text-slate-700 font-medium">
                 Our platform connects families with verified providers regardless of location or income level, democratizing quality youth education.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
               <div className="flex items-start bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-primary p-3 rounded-lg mr-4 text-black border-2 border-black"><ShieldCheck size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Safety First</h3>
                    <p className="text-sm text-slate-600 font-medium">We are the only platform to focus heavily on safety standards for families and schools.</p>
                  </div>
               </div>
               <div className="flex items-start bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-green-400 p-3 rounded-lg mr-4 text-black border-2 border-black"><Leaf size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Sustainability</h3>
                    <p className="text-sm text-slate-600 font-medium">We reduce the physical footprint through digital tools and support local freelance educators.</p>
                  </div>
               </div>
               <div className="flex items-start bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-secondary p-3 rounded-lg mr-4 text-black border-2 border-black"><Heart size={24}/></div>
                  <div>
                    <h3 className="font-bold text-lg">Community</h3>
                    <p className="text-sm text-slate-600 font-medium">Building relationships between 800+ parent subscribers and trusted youth educators.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Vetting Process */}
      <section className="py-20 bg-peach border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase">Our 4-Step Vetting Process</h2>
              <p className="text-slate-700 max-w-2xl mx-auto font-bold">
                 We take safety seriously. Every provider on Klass Hero must pass our rigorous verification process before they can list a single program.
              </p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative text-center">
                 <div className="w-16 h-16 bg-blue-100 text-black border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black">1</div>
                 <UserCheck className="mx-auto mb-4 text-slate-400" size={32}/>
                 <h3 className="font-bold text-lg mb-2">Identity Verification</h3>
                 <p className="text-sm text-slate-600 font-medium">We verify the legal identity of every provider using government-issued ID.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative text-center">
                 <div className="w-16 h-16 bg-purple-100 text-black border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black">2</div>
                 <Search className="mx-auto mb-4 text-slate-400" size={32}/>
                 <h3 className="font-bold text-lg mb-2">Background Check</h3>
                 <p className="text-sm text-slate-600 font-medium">Mandatory "Polizeiliches Führungszeugnis" (Police Clearance) check for all youth workers.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative text-center">
                 <div className="w-16 h-16 bg-red-100 text-black border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black">3</div>
                 <FileCheck className="mx-auto mb-4 text-slate-400" size={32}/>
                 <h3 className="font-bold text-lg mb-2">Qualifications</h3>
                 <p className="text-sm text-slate-600 font-medium">Verification of First Aid certificates and relevant educational degrees or coaching licenses.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative text-center">
                 <div className="w-16 h-16 bg-green-100 text-black border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black">4</div>
                 <Video className="mx-auto mb-4 text-slate-400" size={32}/>
                 <h3 className="font-bold text-lg mb-2">Personal Interview</h3>
                 <p className="text-sm text-slate-600 font-medium">Our team conducts interviews to ensure providers align with our safety and educational values.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 uppercase">The Founding Team</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {/* Shane */}
              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-y-1 hover:shadow-none transition-all">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden border-2 border-black">
                    <img src="https://ui-avatars.com/api/?name=Shane+Ogilvie&background=06b6d4&color=fff" alt="Shane" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Shane Ogilvie</h3>
                 <p className="text-primaryDark font-bold mb-4">CEO & Co-Founder</p>
                 <p className="text-sm text-slate-600 font-medium">
                   Masters in Sport Performance Analysis with 5+ years building the Klass Hero brand. The visionary connector.
                 </p>
              </div>

              {/* Max */}
              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-y-1 hover:shadow-none transition-all">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden border-2 border-black">
                    <img src="https://ui-avatars.com/api/?name=Max+Pergl&background=d946ef&color=fff" alt="Max" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Max Pergl</h3>
                 <p className="text-secondary font-bold mb-4">CTO & Co-Founder</p>
                 <p className="text-sm text-slate-600 font-medium">
                   Full-stack development expertise and MBA. Architecting our scalable and sustainable platform.
                 </p>
              </div>

              {/* Konstantin */}
              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-y-1 hover:shadow-none transition-all">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 overflow-hidden border-2 border-black">
                    <img src="https://ui-avatars.com/api/?name=Konstantin+Pergl&background=f59e0b&color=fff" alt="Konstantin" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Konstantin Pergl</h3>
                 <p className="text-amber-600 font-bold mb-4">CFO & Co-Founder</p>
                 <p className="text-sm text-slate-600 font-medium">
                   International Business Administration student managing finance and analysis. Driven and energetic.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-peach">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase">Ready to join the movement?</h2>
          <Button size="lg" onClick={onContact} className="bg-primary text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Get Started Today</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-slate-400 py-12 border-t-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p className="text-sm font-medium">© 2024 Klass Hero UG</p>
            <div className="flex space-x-6 text-sm font-medium">
               <span>Privacy</span>
               <span>Imprint</span>
            </div>
        </div>
      </footer>
    </div>
  );
};