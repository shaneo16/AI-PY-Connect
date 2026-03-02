
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronRight, Rocket, ShieldCheck, Star, Users, Briefcase, MapPin, Search } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

export const ApplyToTeach: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    subject: '',
    location: '',
    experience: '',
    vetted: false,
    reason: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
               <h2 className="text-4xl md:text-5xl font-display uppercase text-black mb-4">Join the Hero Network</h2>
               <p className="text-xl text-slate-600 font-medium">Klass Hero is the world's most trusted marketplace for youth education. We're looking for the best coaches, tutors, and teachers in Berlin.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
               <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                    <Star className="text-secondary" fill="currentColor"/> Tell us who you are
                  </h3>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name or Business Name</label>
                        <input 
                           type="text" 
                           placeholder="e.g. Berlin Soccer Academy" 
                           className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                        <input 
                           type="email" 
                           placeholder="hello@provider.com" 
                           className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold"
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                  </div>
                  <Button className="w-full mt-8 py-4 text-lg" onClick={nextStep} disabled={!formData.name || !formData.email}>Continue <ChevronRight size={20} className="ml-2"/></Button>
               </div>
               
               <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                     <div className="p-3 bg-primary rounded-xl border-2 border-black"><Users size={24}/></div>
                     <div>
                        <h4 className="font-black uppercase text-sm">Reach 800+ Families</h4>
                        <p className="text-sm text-slate-500 font-medium">Direct access to Berlin's most engaged parents at international schools.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="p-3 bg-secondary rounded-xl border-2 border-black"><Briefcase size={24}/></div>
                     <div>
                        <h4 className="font-black uppercase text-sm">Business Management</h4>
                        <p className="text-sm text-slate-500 font-medium">Invoicing, scheduling, and staff management tools built specifically for educators.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="p-3 bg-white rounded-xl border-2 border-black"><ShieldCheck size={24}/></div>
                     <div>
                        <h4 className="font-black uppercase text-sm">Pre-Vetted Trust</h4>
                        <p className="text-sm text-slate-500 font-medium">Our badge shows parents you are safe and professional before they even book.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
             <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-6">What do you teach?</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                   {['Sports', 'Music', 'Tutoring', 'Arts', 'Camps', 'Other'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setFormData({...formData, businessType: cat})}
                        className={`p-4 rounded-xl border-2 text-sm font-bold uppercase tracking-wider transition-all ${
                          formData.businessType === cat ? 'bg-black text-white border-black scale-[1.02]' : 'bg-white border-slate-200 text-slate-500 hover:border-black hover:text-black'
                        }`}
                      >
                        {cat}
                      </button>
                   ))}
                </div>
                <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Specific Subjects or Programs</label>
                    <textarea 
                        placeholder="e.g. U12 Soccer, SAT Prep, Pottery Workshops..." 
                        className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold"
                        rows={3}
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                </div>
                <div className="flex gap-4 mt-8">
                   <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                   <Button className="flex-[2]" onClick={nextStep} disabled={!formData.businessType}>Continue</Button>
                </div>
             </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
             <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                   <MapPin className="text-primary"/> Where is your practice?
                </h3>
                <div className="space-y-6">
                    <div>
                       <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Primary District in Berlin</label>
                       <select 
                          className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold bg-white"
                          value={formData.location}
                          onChange={e => setFormData({...formData, location: e.target.value})}
                       >
                          <option value="">Select District</option>
                          <option value="Mitte">Mitte</option>
                          <option value="Prenzlauer Berg">Prenzlauer Berg</option>
                          <option value="Charlottenburg">Charlottenburg</option>
                          <option value="Zehlendorf">Zehlendorf / Dahlem</option>
                          <option value="Kreuzberg">Kreuzberg</option>
                          <option value="Neukölln">Neukölln</option>
                          <option value="Online">Fully Online</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Years of Experience</label>
                       <input 
                          type="text" 
                          placeholder="e.g. 5 years" 
                          className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold"
                          value={formData.experience}
                          onChange={e => setFormData({...formData, experience: e.target.value})}
                       />
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                   <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                   <Button className="flex-[2]" onClick={nextStep} disabled={!formData.location}>Continue</Button>
                </div>
             </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
             <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-2">Verification Readiness</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">Klass Hero requires a 4-step vetting process. Are you prepared to provide background checks and certifications?</p>
                
                <div className="space-y-4">
                   <button 
                      onClick={() => setFormData({...formData, vetted: true})}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                        formData.vetted ? 'bg-cyan-50 border-primary' : 'bg-white border-slate-200'
                      }`}
                   >
                      <span className="font-bold">Yes, I have all documents ready.</span>
                      {formData.vetted && <CheckCircle className="text-primary" size={20}/>}
                   </button>
                   <button 
                      onClick={() => setFormData({...formData, vetted: false})}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                        !formData.vetted ? 'bg-white border-slate-200' : 'bg-white border-slate-200'
                      }`}
                   >
                      <span className="font-bold">I need help obtaining these.</span>
                   </button>
                </div>
                
                <div className="mt-8">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Why do you want to join Klass Hero?</label>
                    <textarea 
                        placeholder="Tell us about your mission..." 
                        className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-black outline-none font-bold"
                        rows={3}
                        value={formData.reason}
                        onChange={e => setFormData({...formData, reason: e.target.value})}
                    />
                </div>

                <div className="flex gap-4 mt-8">
                   <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                   <Button className="flex-[2]" onClick={nextStep} disabled={!formData.reason}>Submit Application</Button>
                </div>
             </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-in zoom-in-95 duration-500 text-center space-y-8 max-w-xl mx-auto">
             <div className="w-24 h-24 bg-secondary rounded-full border-4 border-black flex items-center justify-center mx-auto shadow-xl">
                <Rocket size={48} className="text-black"/>
             </div>
             <div>
                <h2 className="text-4xl font-display uppercase mb-4">Application Sent!</h2>
                <p className="text-xl text-slate-600 font-medium">Thanks, {formData.name}. Our vetting team will review your details and reach out within 48 hours to schedule your personal interview.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm text-left">
                <h4 className="font-black uppercase text-xs text-slate-400 mb-4">What's Next?</h4>
                <ul className="space-y-3">
                   <li className="flex items-start gap-3 text-sm font-bold"><div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] shrink-0">1</div> Document Request Email</li>
                   <li className="flex items-start gap-3 text-sm font-bold"><div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] shrink-0">2</div> Schedule 15-min Video Call</li>
                   <li className="flex items-start gap-3 text-sm font-bold"><div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] shrink-0">3</div> Platform Onboarding</li>
                </ul>
             </div>
             <Button size="lg" className="px-12" onClick={onBack}>Back to Home</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-peach flex flex-col pt-12 px-6 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center mb-12">
         <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-display text-2xl uppercase mt-1">Provider Onboarding</span>
         </div>
         <button onClick={onBack} className="text-sm font-bold flex items-center hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-1"/> Cancel Application
         </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
         {renderStep()}
      </div>

      {step < 5 && (
        <div className="mt-12 flex justify-center gap-2">
           {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-2 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-black' : 'w-2 bg-slate-300'}`}></div>
           ))}
        </div>
      )}
    </div>
  );
};
