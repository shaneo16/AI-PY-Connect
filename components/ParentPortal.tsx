

import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle, Home, Award, User, Settings, Users, Sparkles, Copy, Share2, Heart as HeartIcon, MessageSquare, FileCheck, Shield, Send, ArrowLeft, Instagram, Globe, PlayCircle, Briefcase, Plus, Video, Mic, MicOff, VideoOff, PhoneOff, UserCheck, Clock, Check, Bell, Mail, FileText, Trophy, ArrowRight, LayoutDashboard } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_SCHOOLS, MOCK_BADGES, MOCK_REFERRAL_STATS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_PROVIDERS, PRODUCTS, MOCK_JOBS, TRENDING_SEARCHES } from '../constants';
import { Program, VerificationType, Conversation, ChatMessage, ProviderProfile, Job } from '../types';
import { Button } from './Button';

// Export VerificationIcon for reuse
export const VerificationIcon: React.FC<{ type: VerificationType; size?: number; className?: string }> = ({ type, size = 16, className = '' }) => {
    switch (type) {
        case 'background_check':
            return <ShieldCheck size={size} className={`text-blue-600 ${className}`} />; // Police/Background
        case 'first_aid':
            return <Heart size={size} className={`text-red-500 ${className}`} />; // First Aid
        case 'child_safeguarding':
            return <UserCheck size={size} className={`text-purple-600 ${className}`} />; // Safeguarding
        case 'insurance':
            return <FileCheck size={size} className={`text-green-600 ${className}`} />; // Insurance
        default:
            return <CheckCircle size={size} className={`text-slate-400 ${className}`} />;
    }
};

// Export Video Call Modal for reuse
export const VideoCallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [muted, setMuted] = useState(false);
    const [videoOff, setVideoOff] = useState(false);

    return (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in">
             <div className="w-full max-w-4xl h-[80vh] bg-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
                 {/* Main Video Area */}
                 <div className="absolute inset-0 flex items-center justify-center">
                     <div className="text-center">
                        <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User size={64} className="text-slate-500"/>
                        </div>
                        <h2 className="text-white text-2xl font-bold">Connecting...</h2>
                     </div>
                 </div>
                 
                 {/* Self View */}
                 <div className="absolute top-6 right-6 w-48 h-36 bg-black rounded-lg border border-slate-700 shadow-lg overflow-hidden flex items-center justify-center">
                     {videoOff ? <User size={24} className="text-slate-500"/> : <div className="text-slate-500 text-xs">You</div>}
                 </div>

                 {/* Controls */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                     <button onClick={() => setMuted(!muted)} className={`p-4 rounded-full ${muted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                         {muted ? <MicOff size={24}/> : <Mic size={24}/>}
                     </button>
                     <button onClick={() => setVideoOff(!videoOff)} className={`p-4 rounded-full ${videoOff ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                         {videoOff ? <VideoOff size={24}/> : <Video size={24}/>}
                     </button>
                     <button onClick={onClose} className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700">
                         <PhoneOff size={24}/>
                     </button>
                 </div>
             </div>
        </div>
    );
};

// Export ProgramCard for reuse
export const ProgramCard: React.FC<{ 
  program: Program; 
  onClick: () => void; 
  onProviderClick?: (providerId: string) => void;
  showBadges?: boolean;
}> = ({ program, onClick, onProviderClick, showBadges = true }) => (
    <div 
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
        <div className="h-48 w-full overflow-hidden relative">
           <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
           {showBadges && (
               <div className="absolute top-3 left-3 flex gap-1">
                 {program.verifications.map(type => (
                   <div key={type} className="bg-white/90 backdrop-blur p-1 rounded-full shadow-sm" title={type.replace('_', ' ')}>
                      <VerificationIcon type={type} size={12} />
                   </div>
                 ))}
               </div>
           )}
           {program.isOnline && (
               <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div> ONLINE
               </div>
           )}
        </div>
        <div className="p-5 flex flex-col flex-1 relative">
            <div 
               className="absolute -top-8 right-5 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md bg-white z-10 hover:scale-110 transition-transform cursor-pointer"
               onClick={(e) => {
                  if (onProviderClick) {
                      e.stopPropagation();
                      onProviderClick(program.providerId);
                  }
               }}
            >
              <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
            </div>

            <div className="flex gap-2 mb-2">
                 <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider border ${
                     program.category === 'Sports' ? 'bg-cyan-50 text-cyan-700 border-cyan-100' :
                     program.category === 'Arts' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100' :
                     program.category === 'Music' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                     'bg-slate-50 text-slate-600 border-slate-100'
                 }`}>{program.category}</span>
                 <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider border border-slate-200">
                     {program.type}
                 </span>
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{program.title}</h3>
            
            {/* Provider Info + Assigned Staff Logic */}
            <div className="mb-3">
                 <p className="text-sm text-slate-500 font-medium">{program.provider}</p>
                 {program.assignedToName && (
                     <div className="flex items-center mt-1 text-xs text-slate-500 bg-slate-50 w-fit px-1.5 py-0.5 rounded border border-slate-100">
                         <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden mr-1.5">
                            {program.assignedToImage && <img src={program.assignedToImage} alt="" className="w-full h-full object-cover"/>}
                         </div>
                         Instructor: <span className="font-bold ml-1">{program.assignedToName}</span>
                     </div>
                 )}
            </div>
            
            <div className="flex items-center text-xs text-slate-400 mb-4">
               <MapPin size={14} className="mr-1 shrink-0" />
               <span className="truncate">{program.location}</span>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
               <div className="flex items-center">
                  <Star size={14} className="text-amber-400 fill-amber-400 mr-1" />
                  <span className="font-bold text-slate-900 text-sm">{program.rating}</span>
                  <span className="text-xs text-slate-400 ml-1">({program.reviews})</span>
               </div>
               <span className="font-bold text-lg text-primaryDark">€{program.price}</span>
            </div>
        </div>
    </div>
);

// Export ProviderProfileView for reuse
export const ProviderProfileView: React.FC<{ provider: ProviderProfile; onBack: () => void; onProgramClick?: (program: Program) => void }> = ({ provider, onBack, onProgramClick }) => {
    const isPremium = provider.tier === 'Professional' || provider.tier === 'Business';
    const providerPrograms = MOCK_PROGRAMS.filter(p => p.providerId === provider.id);

    return (
        <div className="bg-slate-50 min-h-full pb-20">
            <div className="relative">
               {/* Cover Image (Premium) */}
               <div className="h-48 md:h-64 bg-slate-200 overflow-hidden relative">
                   {isPremium && provider.coverImage ? (
                       <img src={provider.coverImage} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                       <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20"></div>
                   )}
                   <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
                       <ArrowLeft size={20} className="text-slate-700"/>
                   </button>
               </div>
               
               {/* Profile Info */}
               <div className="max-w-5xl mx-auto px-6 relative -top-16 mb-[-3rem]">
                   <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 flex flex-col md:flex-row items-start gap-6">
                       <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white shrink-0">
                           <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 pt-2">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                               <div>
                                   <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                                       {provider.name}
                                       {isPremium && <CheckCircle size={20} className="text-secondary ml-2 fill-secondary/10" />}
                                   </h1>
                                   <p className="text-slate-500 font-medium">{provider.tagline}</p>
                               </div>
                               <div className="flex gap-2">
                                   <Button variant="outline" size="sm" className="rounded-full"><Share2 size={16} className="mr-2"/> Share</Button>
                                   <Button size="sm" className="rounded-full bg-primary hover:bg-primaryDark text-slate-900 font-bold"><MessageSquare size={16} className="mr-2"/> Message</Button>
                               </div>
                           </div>
                           
                           <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                               <div className="flex items-center"><Star size={16} className="text-amber-400 fill-amber-400 mr-1"/> <strong>{provider.rating}</strong> ({provider.reviewCount} reviews)</div>
                               <div className="flex items-center"><MapPin size={16} className="mr-1 text-slate-400"/> {provider.location}</div>
                               <div className="flex items-center"><Clock size={16} className="mr-1 text-slate-400"/> Responds in {provider.responseRate}</div>
                           </div>

                           <div className="flex flex-wrap gap-2">
                               {provider.verifications.map(v => (
                                   <span key={v} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-600 flex items-center">
                                       <VerificationIcon type={v as VerificationType} size={12} className="mr-1"/>
                                       {v.replace('_', ' ').toUpperCase()}
                                   </span>
                               ))}
                           </div>
                       </div>
                   </div>
               </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Bio & Details */}
                <div className="md:col-span-2 space-y-8">
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-slate-900">About Us</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{provider.bio}</p>
                        
                        {isPremium && provider.socialLinks && (
                            <div className="mt-6 flex gap-4 pt-4 border-t border-slate-100">
                                {provider.socialLinks.instagram && (
                                    <a href="#" className="flex items-center text-slate-500 hover:text-fuchsia-600 transition-colors"><Instagram size={18} className="mr-2"/> {provider.socialLinks.instagram}</a>
                                )}
                                {provider.socialLinks.website && (
                                    <a href="#" className="flex items-center text-slate-500 hover:text-cyan-600 transition-colors"><Globe size={18} className="mr-2"/> Website</a>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Premium Gallery */}
                    {isPremium && provider.gallery && (
                        <section>
                            <h3 className="font-bold text-lg mb-4 text-slate-900">Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {provider.gallery.map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-200 shadow-sm">
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Programs List */}
                    <section>
                         <h3 className="font-bold text-lg mb-4 text-slate-900">Active Programs ({providerPrograms.length})</h3>
                         <div className="grid md:grid-cols-2 gap-4">
                             {providerPrograms.map(prog => (
                                 <ProgramCard key={prog.id} program={prog} onClick={() => onProgramClick?.(prog)} showBadges={false} />
                             ))}
                         </div>
                    </section>
                </div>

                {/* Right Column: Video & Reviews */}
                <div className="space-y-6">
                    {isPremium && provider.video && (
                        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                            <div className="aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center group cursor-pointer">
                                {/* Placeholder Video UI */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-center text-xs text-slate-500 mt-2 font-medium">Intro Video</p>
                        </div>
                    )}
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-slate-900">Reviews</h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-sm text-slate-800">Happy Parent</span>
                                        <div className="flex text-amber-400"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                                    </div>
                                    <p className="text-xs text-slate-600 italic">"My daughter absolutely loves the classes. Highly recommend!"</p>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full">Read all reviews</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'planner' | 'community' | 'chat' | 'settings'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  // Jobs State
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS.filter(j => j.parentName === 'Sarah Schmidt')); // Mock current user jobs

  // Settings State
  const [notificationSettings, setNotificationSettings] = useState({
      messages: true,
      requests: true,
      marketing: false
  });

  const categories = ['All', 'Sports', 'Arts', 'Music', 'Education', 'Life Skills', 'Camps'];

  const renderContent = () => {
    // If viewing a provider profile
    if (selectedProvider) {
        return <ProviderProfileView provider={selectedProvider} onBack={() => setSelectedProvider(null)} onProgramClick={setSelectedProgram} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-20">
             {/* Children Overview */}
             <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {['Leo (10) - JFK School', 'Emma (8) - BIS'].map((child, i) => (
                   <div key={i} className="flex items-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm min-w-[200px]">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-3 font-bold text-slate-500">
                          {child[0]}
                      </div>
                      <div>
                          <div className="font-bold text-sm text-slate-900">{child.split(' - ')[0]}</div>
                          <div className="text-xs text-slate-500 truncate">{child.split(' - ')[1]}</div>
                      </div>
                   </div>
                ))}
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-slate-300 text-slate-400 hover:bg-slate-50 shrink-0 self-center ml-2">
                    <Plus size={20}/>
                </button>
             </div>

             {/* Weekly Activity Goal */}
             <div className="bg-gradient-to-r from-primaryDark to-primary p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10"><Trophy size={140} /></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold flex items-center"><Trophy size={20} className="mr-2 text-yellow-300"/> Weekly Activity Goal</h2>
                        <span className="font-bold text-2xl">80%</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-3 mb-2">
                        <div className="bg-yellow-300 h-3 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-sm text-cyan-50 font-medium">You're doing great! Just 1 more activity to reach your goal!</p>
                </div>
             </div>

             {/* Achievements */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center"><Award className="mr-2 text-amber-500"/> Family Achievements</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {MOCK_BADGES.map(badge => (
                        <div key={badge.id} className="flex flex-col items-center min-w-[100px] text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <div className="font-bold text-xs text-slate-900">{badge.name}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{badge.earnedDate}</div>
                        </div>
                    ))}
                </div>
             </div>
             
             {/* Recommendations */}
             <div>
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center"><Sparkles className="mr-2 text-fuchsia-500"/> Recommended for Leo</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {MOCK_PROGRAMS.slice(0,3).map(p => (
                        <ProgramCard 
                          key={p.id} 
                          program={p} 
                          onClick={() => setSelectedProgram(p)}
                          onProviderClick={(id) => {
                             const prov = MOCK_PROVIDERS.find(pr => pr.id === id);
                             if (prov) setSelectedProvider(prov);
                          }}
                        />
                    ))}
                </div>
             </div>

             {/* Refer & Earn */}
             <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                     <h3 className="text-xl font-bold flex items-center mb-2"><Users className="mr-2 text-primary"/> Refer & Earn</h3>
                     <p className="text-slate-400 text-sm mb-4">Invite friends and earn Prime Points towards free bookings!</p>
                     <div className="flex items-center gap-4 text-sm">
                         <div>
                             <div className="font-bold text-2xl text-primary">{MOCK_REFERRAL_STATS.totalReferrals}</div>
                             <div className="text-slate-500">Referrals</div>
                         </div>
                         <div className="w-px h-8 bg-slate-700"></div>
                         <div>
                             <div className="font-bold text-2xl text-accent">{MOCK_REFERRAL_STATS.earnedPoints}</div>
                             <div className="text-slate-500">Points</div>
                         </div>
                     </div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-xl border border-white/10 w-full md:w-auto min-w-[250px]">
                     <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-bold">Your Code</div>
                     <div className="flex items-center justify-between bg-black/30 rounded-lg p-2 border border-white/10">
                         <code className="font-mono text-lg font-bold text-primary tracking-widest">{MOCK_REFERRAL_STATS.code}</code>
                         <button className="p-2 hover:bg-white/10 rounded-md transition-colors"><Copy size={16}/></button>
                     </div>
                     <Button size="sm" className="w-full mt-3 bg-primary hover:bg-primaryDark text-slate-900 font-bold">Share Code</Button>
                 </div>
             </div>
          </div>
        );

      case 'explore':
        const filteredPrograms = MOCK_PROGRAMS.filter(p => 
            (selectedCategory === 'All' || p.category === selectedCategory) &&
            (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.provider.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return (
          <div className="space-y-6 animate-in fade-in h-full flex flex-col pb-20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search activities, providers, or subjects..." 
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Trending Chips */}
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar md:max-w-md">
                  {TRENDING_SEARCHES.map(t => (
                      <button 
                        key={t} 
                        onClick={() => setSearchTerm(t)} 
                        className="whitespace-nowrap px-3 py-1 bg-white border border-slate-200 rounded-full text-xs hover:bg-cyan-50 hover:border-cyan-200 hover:text-primaryDark transition-colors"
                      >
                        {t}
                      </button>
                  ))}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4">
              {filteredPrograms.map(program => (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  onClick={() => setSelectedProgram(program)}
                  onProviderClick={(id) => {
                     const prov = MOCK_PROVIDERS.find(pr => pr.id === id);
                     if (prov) setSelectedProvider(prov);
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'planner':
        return (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-20">
             <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-slate-900">My Planner</h2>
                 <Button variant="outline"><Share2 size={16} className="mr-2"/> Sync Calendar</Button>
             </div>
             
             {/* Simple Calendar View */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                         <div key={day} className="p-4 text-center text-sm font-bold text-slate-500">{day}</div>
                     ))}
                 </div>
                 <div className="grid grid-cols-7 min-h-[400px]">
                     {/* Mock Schedule items */}
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]"></div>
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]">
                         <div className="bg-cyan-100 text-cyan-800 p-2 rounded text-xs font-bold mb-1">Soccer 16:00</div>
                     </div>
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]">
                         <div className="bg-fuchsia-100 text-secondary p-2 rounded text-xs font-bold mb-1">Art 15:30</div>
                     </div>
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]"></div>
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]"></div>
                     <div className="border-r border-b border-slate-100 p-2 min-h-[100px]">
                         <div className="bg-amber-100 text-amber-800 p-2 rounded text-xs font-bold mb-1">Babysitter 18:00</div>
                     </div>
                     <div className="border-b border-slate-100 p-2 min-h-[100px]"></div>
                 </div>
             </div>

             <div>
                 <h3 className="font-bold text-lg mb-4">Upcoming This Week</h3>
                 <div className="space-y-4">
                     {MOCK_PROGRAMS.slice(0, 2).map(p => (
                         <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
                                     {p.nextSession.split(' ')[0]}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900">{p.title}</h4>
                                     <p className="text-sm text-slate-500">{p.nextSession}</p>
                                 </div>
                             </div>
                             <Button size="sm" variant="outline">Details</Button>
                         </div>
                     ))}
                 </div>
             </div>
          </div>
        );

      case 'community':
        return (
          <div className="flex flex-col lg:flex-row gap-6 h-full pb-20">
             {/* Highlights Feed */}
             <div className="lg:w-2/3 space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Community Highlights</h2>
                {MOCK_FEED_POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={post.providerImage} className="w-10 h-10 rounded-full bg-slate-200" alt=""/>
                                <div>
                                    <h4 className="font-bold text-sm">{post.providerName}</h4>
                                    <p className="text-xs text-slate-500">{post.timeAgo}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className={post.liked ? 'text-red-500' : 'text-slate-400'}><HeartIcon fill={post.liked ? "currentColor" : "none"} size={20}/></Button>
                        </div>
                        <img src={post.image} alt="Post" className="w-full aspect-video object-cover"/>
                        <div className="p-4">
                            <div className="flex gap-4 mb-2 text-sm text-slate-500 font-bold">
                                <span>{post.likes} likes</span>
                                <span>{post.comments} comments</span>
                            </div>
                            <p className="text-sm text-slate-700"><span className="font-bold mr-2">{post.providerName}</span>{post.caption}</p>
                        </div>
                    </div>
                ))}
             </div>

             {/* Jobs Sidebar */}
             <div className="lg:w-1/3">
                 <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-slate-900">My Jobs</h2>
                     <Button size="sm" onClick={() => setShowJobModal(true)}><Plus size={16} className="mr-1"/> Post Job</Button>
                 </div>
                 
                 <div className="space-y-4">
                     {jobs.map(job => (
                         <div key={job.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                             <h4 className="font-bold text-slate-900">{job.title}</h4>
                             <p className="text-sm text-slate-600 mt-1 mb-2">{job.description}</p>
                             <div className="flex justify-between items-center text-xs text-slate-500">
                                 <span>{job.datePosted}</span>
                                 <span className="font-bold text-primaryDark">{job.budget}</span>
                             </div>
                             <div className="mt-3 pt-3 border-t border-slate-50 flex justify-end gap-2">
                                 <Button size="sm" variant="outline" className="text-xs h-7">Edit</Button>
                                 <Button size="sm" variant="outline" className="text-xs h-7 text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                             </div>
                         </div>
                     ))}
                     {jobs.length === 0 && (
                         <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                             <Briefcase className="mx-auto text-slate-300 mb-2" size={32}/>
                             <p className="text-sm text-slate-500">No active job posts</p>
                         </div>
                     )}
                 </div>
             </div>
          </div>
        );

      case 'chat':
        return (
          <div className="h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
              {showVideoCall && <VideoCallModal onClose={() => setShowVideoCall(false)} />}
              
              <div className="md:w-80 border-r border-slate-200 flex flex-col">
                  <div className="p-4 border-b border-slate-100 font-bold bg-slate-50">Messages</div>
                  <div className="flex-1 overflow-y-auto">
                      {MOCK_CONVERSATIONS.filter(c => !c.isGroup).map(c => (
                          <div key={c.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex gap-3">
                              <img src={c.participantImage} className="w-10 h-10 rounded-full bg-slate-200" alt=""/>
                              <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-sm truncate">{c.participantName}</span>
                                      {c.unreadCount > 0 && <span className="bg-primary text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{c.unreadCount}</span>}
                                  </div>
                                  <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="flex-1 flex flex-col bg-slate-50/50">
                   <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                       <h3 className="font-bold">Berlin Kickers</h3>
                       <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => alert("Schedule Interview?")}><CalendarIcon size={16} className="mr-2"/> Schedule Interview</Button>
                          <Button size="sm" onClick={() => setShowVideoCall(true)} className="bg-primary hover:bg-primaryDark text-slate-900"><Video size={16} className="mr-2"/> Video Call</Button>
                       </div>
                   </div>
                   <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                       {MOCK_CONVERSATIONS[0].messages.map(msg => (
                           <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.isMe ? 'bg-primary text-slate-900 rounded-tr-none' : 'bg-white border border-slate-200 rounded-tl-none shadow-sm'}`}>
                                   {msg.text}
                               </div>
                           </div>
                       ))}
                   </div>
                   <div className="p-4 bg-white border-t border-slate-200">
                       <div className="flex gap-2">
                           <input className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Type a message..." />
                           <Button size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center"><Send size={18}/></Button>
                       </div>
                   </div>
              </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-3xl mx-auto space-y-6 pb-20">
             <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
             
             {/* Profile Settings */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-lg mb-4 flex items-center"><User size={20} className="mr-2 text-slate-400"/> Profile Information</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                     <input className="border p-2 rounded" defaultValue="Sarah Schmidt" placeholder="Full Name"/>
                     <input className="border p-2 rounded" defaultValue="sarah@example.com" placeholder="Email"/>
                     <input className="border p-2 rounded" placeholder="Phone Number"/>
                 </div>
             </div>

             {/* Notifications */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-lg mb-4 flex items-center"><Bell size={20} className="mr-2 text-slate-400"/> Notification Preferences</h3>
                 <div className="space-y-4">
                     <div className="flex justify-between items-center">
                         <div>
                             <div className="font-bold text-sm text-slate-900">New Messages</div>
                             <div className="text-xs text-slate-500">Receive emails when you get a new message</div>
                         </div>
                         <input 
                            type="checkbox" 
                            checked={notificationSettings.messages} 
                            onChange={e => setNotificationSettings({...notificationSettings, messages: e.target.checked})}
                            className="toggle"
                         />
                     </div>
                     <div className="flex justify-between items-center">
                         <div>
                             <div className="font-bold text-sm text-slate-900">Booking Requests</div>
                             <div className="text-xs text-slate-500">Updates on your booking status</div>
                         </div>
                         <input 
                            type="checkbox" 
                            checked={notificationSettings.requests} 
                            onChange={e => setNotificationSettings({...notificationSettings, requests: e.target.checked})}
                         />
                     </div>
                     <div className="flex justify-between items-center">
                         <div>
                             <div className="font-bold text-sm text-slate-900">Marketing & Tips</div>
                             <div className="text-xs text-slate-500">Receive weekly activity ideas</div>
                         </div>
                         <input 
                            type="checkbox" 
                            checked={notificationSettings.marketing} 
                            onChange={e => setNotificationSettings({...notificationSettings, marketing: e.target.checked})}
                         />
                     </div>
                 </div>
             </div>

             {/* Legal */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-lg mb-4 flex items-center"><FileText size={20} className="mr-2 text-slate-400"/> Legal & Compliance</h3>
                 <div className="space-y-2">
                     <button className="text-sm text-primaryDark hover:underline block">Terms of Service</button>
                     <button className="text-sm text-primaryDark hover:underline block">Privacy Policy</button>
                 </div>
             </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Desktop Nav could be added here if not using top nav only */}
      <div className="p-4 md:p-8">
        {renderContent()}
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="w-full max-w-2xl bg-white h-full overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
              <div className="relative h-64">
                 <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover" />
                 <button onClick={() => setSelectedProgram(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-8">
                 <div className="flex items-start justify-between mb-6">
                    <div>
                       <div className="flex gap-2 mb-3">
                          <span className="px-2 py-1 bg-cyan-50 text-primaryDark text-xs font-bold uppercase rounded-md tracking-wider border border-primary/20">{selectedProgram.category}</span>
                       </div>
                       <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProgram.title}</h2>
                       <div className="flex items-center text-slate-600 mb-4">
                          <MapPin size={16} className="mr-1" /> {selectedProgram.location}
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <div className="text-3xl font-bold text-primaryDark">€{selectedProgram.price}</div>
                       <div className="text-sm text-slate-400">per session</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors" 
                      onClick={() => {
                          const provider = MOCK_PROVIDERS.find(p => p.id === selectedProgram.providerId);
                          if (provider) {
                              setSelectedProvider(provider);
                              setSelectedProgram(null);
                          }
                      }}
                 >
                    <img src={selectedProgram.providerImage} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                    <div>
                       <div className="font-bold text-slate-900">{selectedProgram.provider}</div>
                       <div className="text-xs text-slate-500">View Provider Profile</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-400"/>
                 </div>

                 {/* Assigned Staff Display in Detail Modal */}
                 {selectedProgram.assignedToName && (
                     <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                         <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                             {selectedProgram.assignedToImage && <img src={selectedProgram.assignedToImage} alt="" className="w-full h-full object-cover"/>}
                         </div>
                         <div>
                             <div className="text-xs font-bold uppercase text-slate-500 mb-1">Your Instructor</div>
                             <div className="font-bold text-slate-900">{selectedProgram.assignedToName}</div>
                         </div>
                     </div>
                 )}
                 
                 <div className="space-y-6">
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 mb-2">About this program</h3>
                       <p className="text-slate-600 leading-relaxed">
                          This comprehensive program is designed to build fundamental skills in a fun and supportive environment.
                       </p>
                    </div>
                    
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 mb-2">Schedule</h3>
                       <div className="flex items-center text-slate-600">
                          <Clock size={18} className="mr-2 text-slate-400"/> Next Session: <span className="font-bold ml-1">{selectedProgram.nextSession}</span>
                       </div>
                    </div>

                    <Button className="w-full py-4 text-lg font-bold bg-primary hover:bg-primaryDark text-slate-900 shadow-lg shadow-primary/20">Book Now</Button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showJobModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                 <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowJobModal(false); }}>
                     <input required placeholder="Job Title (e.g. Math Tutor)" className="w-full border p-2 rounded" />
                     <div className="grid grid-cols-2 gap-4">
                         <select className="border p-2 rounded">
                             <option>Education</option>
                             <option>Sports</option>
                             <option>Care</option>
                         </select>
                         <input placeholder="Budget (Optional)" className="w-full border p-2 rounded" />
                     </div>
                     <textarea placeholder="Description of needs..." rows={4} className="w-full border p-2 rounded" />
                     
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="vidReq" className="rounded text-primary focus:ring-primary"/>
                        <label htmlFor="vidReq" className="text-sm text-slate-700">Require Video Interview before hiring</label>
                     </div>

                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowJobModal(false)}>Cancel</Button>
                         <Button type="submit">Post Job</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {['home', 'explore', 'planner', 'community', 'chat', 'settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex flex-col items-center justify-center w-full py-1 ${activeTab === tab ? 'text-primaryDark' : 'text-slate-400'}`}
            >
               {tab === 'home' && <Home size={22} />}
               {tab === 'explore' && <Search size={22} />}
               {tab === 'planner' && <CalendarIcon size={22} />}
               {tab === 'community' && <Users size={22} />}
               {tab === 'chat' && <MessageSquare size={22} />}
               {tab === 'settings' && <Settings size={22} />}
               <span className="text-[10px] mt-1 capitalize">{tab}</span>
            </button>
        ))}
      </div>
    </div>
  );
};