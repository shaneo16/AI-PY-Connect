
import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle, Home, Award, User, Settings, Users, Sparkles, Copy, Share2, Heart as HeartIcon, MessageSquare, FileCheck, Shield, Send, ArrowLeft, Instagram, Globe, PlayCircle, Briefcase, Plus, Video, Mic, MicOff, VideoOff, PhoneOff, UserCheck, Clock, Check, Bell, Mail, FileText, Trophy } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_SCHOOLS, MOCK_BADGES, MOCK_REFERRAL_STATS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_PROVIDERS, PRODUCTS, MOCK_JOBS } from '../constants';
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
            <p className="text-sm text-slate-500 mb-3 font-medium">{program.provider}</p>
            
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
        <div className="bg-slate-50 min-h-full">
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
  // ... (Other state - keep existing)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>(MOCK_JOBS.filter(j => j.parentName === 'Sarah Schmidt'));
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', category: 'Education', description: '', budget: '', interviewRequired: false });
  const [viewingProviderId, setViewingProviderId] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);
  const [childSchool, setChildSchool] = useState(MOCK_SCHOOLS[0].id);
  const [healthInfo, setHealthInfo] = useState('');
  const [photoConsent, setPhotoConsent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyRequests, setNotifyRequests] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [subscription, setSubscription] = useState<'Free' | 'Active'>('Free');

  // Computed Values
  const getGoalMotivation = (percent: number) => {
    if (percent >= 80) return "You're absolutely crushing it! 🏆";
    if (percent >= 50) return "Halfway there! Keep the momentum going!";
    return "Let's get moving! Every step counts.";
  };
  const goalPercentage = 80;

  // ... (Rest of logic: filteredPrograms, handlers, etc. - keep existing)
  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prog.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSchool = selectedSchool === 'All' || (prog.schoolId === selectedSchool);
    return matchesSearch && matchesCategory && matchesSchool;
  });
  const categories = ['All', 'Sports', 'Arts', 'Music', 'Education', 'Life Skills', 'Camps', 'Workshops'];
  const saveSettings = (e: React.FormEvent) => { e.preventDefault(); setShowToast(true); setTimeout(() => setShowToast(false), 3000); }
  const copyReferral = () => { navigator.clipboard.writeText(MOCK_REFERRAL_STATS.code); alert('Referral code copied!'); }
  const currentSchool = MOCK_SCHOOLS.find(s => s.id === childSchool);
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);
  const currentProvider = viewingProviderId ? MOCK_PROVIDERS.find(p => p.id === viewingProviderId) : null;
  const handleSendMessage = (e: React.FormEvent) => { e.preventDefault(); if (!newMessage.trim()) return; alert(`Message sent: ${newMessage}`); setNewMessage(''); };
  const handleProviderClick = (providerId: string) => { setViewingProviderId(providerId); setSelectedProgram(null); setActiveTab('explore'); };
  const closeProviderProfile = () => { setViewingProviderId(null); };
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = { id: Math.random().toString(), title: newJob.title, description: newJob.description, parentName: "Sarah Schmidt", location: "Mitte", datePosted: "Just now", category: newJob.category, budget: newJob.budget, interviewRequired: newJob.interviewRequired };
    setMyJobs([...myJobs, job]); setShowJobModal(false); setNewJob({ title: '', category: 'Education', description: '', budget: '', interviewRequired: false }); alert("Job Posted Successfully!");
  }

  if (viewingProviderId && currentProvider) {
     return (
        <ProviderProfileView provider={currentProvider} onBack={closeProviderProfile} onProgramClick={(p) => setSelectedProgram(p)} />
     );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 relative">
      {/* Video Call Overlay */}
      {showVideoCall && <VideoCallModal onClose={() => setShowVideoCall(false)} />}
      
      {/* Schedule Interview Modal */}
      {showScheduleInterview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl max-w-md w-full p-6 animate-in zoom-in-95">
              <h2 className="text-xl font-bold mb-4">Schedule Video Interview</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
                    <input type="datetime-local" className="w-full border border-slate-200 rounded-lg p-2" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                    <select className="w-full border border-slate-200 rounded-lg p-2">
                       <option>Prime Video (Internal)</option>
                       <option>Google Meet</option>
                       <option>Zoom</option>
                    </select>
                 </div>
                 <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost" onClick={() => setShowScheduleInterview(false)}>Cancel</Button>
                    <Button onClick={() => { setShowScheduleInterview(false); alert('Interview Requested'); }}>Send Request</Button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0 z-10 overflow-y-auto">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Dashboard</h2>
          <nav className="space-y-2">
            {['home', 'explore', 'community', 'chat', 'planner', 'settings'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {tab === 'home' && <Home size={20} />}
                  {tab === 'explore' && <Search size={20} />}
                  {tab === 'community' && <Users size={20} />}
                  {tab === 'chat' && <MessageCircle size={20} />}
                  {tab === 'planner' && <CalendarIcon size={20} />}
                  {tab === 'settings' && <Settings size={20} />}
                  <span>{tab}</span>
                </button>
            ))}
          </nav>
        </div>
        
        {/* Prime Points Widget */}
        <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-amber-400 flex items-center"><Award size={14} className="mr-1"/> Prime Points</h3>
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">GOLD</span>
          </div>
          <div className="text-3xl font-bold mb-1">3,450</div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] text-slate-400">550 pts to Platinum Tier</p>
          <button className="w-full mt-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-center transition-colors">Redeem Rewards</button>
        </div>

        {/* Plan Toggle for Demo */}
        <div className="mt-auto pt-6 border-t border-slate-100">
           <p className="text-xs text-slate-400 mb-2">Simulate Plan:</p>
           <div className="flex bg-slate-100 rounded-lg p-1">
              <button onClick={() => setSubscription('Free')} className={`flex-1 text-xs py-1 rounded-md ${subscription === 'Free' ? 'bg-white shadow-sm font-bold' : 'text-slate-500'}`}>Free</button>
              <button onClick={() => setSubscription('Active')} className={`flex-1 text-xs py-1 rounded-md ${subscription === 'Active' ? 'bg-white shadow-sm font-bold text-secondary' : 'text-slate-500'}`}>Active</button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto mb-16 md:mb-0">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            {/* 1. Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">👦</div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Leo Fischer</h3>
                        <p className="text-slate-500">Age 10 • {currentSchool?.name || 'Berlin Intl School'}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-2xl">👧</div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Emma Schmidt</h3>
                        <p className="text-slate-500">Age 8 • {currentSchool?.name || 'Berlin Intl School'}</p>
                    </div>
                </div>
            </div>

            {/* 2. Weekly Goal */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                Weekly Activity Goal 
                                <Trophy className="ml-2 text-amber-300 fill-amber-300" size={28} />
                            </h2>
                            <p className="text-cyan-100 font-medium text-lg mt-1">{getGoalMotivation(goalPercentage)}</p>
                        </div>
                        <div className="text-4xl font-bold">{goalPercentage}%</div>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-3 mb-2">
                        <div className="bg-white h-3 rounded-full shadow-lg transition-all duration-1000 ease-out" style={{ width: `${goalPercentage}%` }}></div>
                    </div>
                </div>
            </div>

            {/* 3. Achievements & Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center text-slate-900"><Award className="mr-2 text-amber-500"/> Family Achievements</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                        {MOCK_BADGES.map(badge => (
                            <div key={badge.id} className="min-w-[100px] flex flex-col items-center text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="text-3xl mb-2">{badge.icon}</div>
                                <div className="font-bold text-xs text-slate-700">{badge.name}</div>
                                <div className="text-[10px] text-slate-400 mt-1">{badge.earnedDate}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-lg mb-4 flex items-center text-slate-900"><Sparkles className="mr-2 text-secondary"/> Recommended for Leo</h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="w-10 h-10 rounded bg-slate-200 overflow-hidden shrink-0">
                                <img src={MOCK_PROGRAMS[0].image} className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm truncate">Advanced Soccer Drills</h4>
                                <p className="text-xs text-slate-500">Because he liked Junior Soccer Academy</p>
                            </div>
                            <Button size="sm" variant="ghost" className="text-primary hover:text-primaryDark"><ArrowLeft className="rotate-180" size={16}/></Button>
                        </div>
                     </div>
                </div>
            </div>
            
            {/* 4. Refer & Earn (Bottom) */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div>
                         <h2 className="text-2xl font-bold mb-2 flex items-center"><Share2 className="mr-3 text-secondary"/> Refer & Earn Prime Points</h2>
                         <p className="text-slate-400 mb-6">Give friends €10 off their first booking. You earn 200 points!</p>
                         
                         <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 max-w-md">
                             <div className="flex-1">
                                 <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Your Referral Code</div>
                                 <div className="font-mono text-xl font-bold text-primary tracking-widest">{MOCK_REFERRAL_STATS.code}</div>
                             </div>
                             <Button onClick={copyReferral} size="sm" className="bg-white text-slate-900 hover:bg-slate-200"><Copy size={16} className="mr-2"/> Copy</Button>
                         </div>
                     </div>
                     
                     <div className="w-full md:w-auto min-w-[250px] bg-white/5 rounded-xl p-5 border border-white/10">
                         <h3 className="font-bold mb-4 text-sm text-slate-300 uppercase">Your Milestones</h3>
                         <div className="space-y-4">
                             {MOCK_REFERRAL_STATS.milestones.map((m, i) => (
                                 <div key={i} className="flex items-center justify-between text-sm">
                                     <span className={m.achieved ? 'text-white' : 'text-slate-500'}>{m.label}</span>
                                     {m.achieved ? <CheckCircle size={16} className="text-green-400"/> : <div className="w-4 h-4 rounded-full border border-slate-600"></div>}
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
            </div>
          </div>
        )}

        {/* EXPLORE TAB (Keep existing logic) */}
        {activeTab === 'explore' && (
           <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h1 className="text-2xl font-bold text-slate-900">Explore Programs</h1>
                 <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}><List size={20}/></button>
                    <button onClick={() => setViewMode('map')} className={`p-2 rounded ${viewMode === 'map' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}><MapIcon size={20}/></button>
                 </div>
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <input 
                       type="text" 
                       placeholder="Search activities..." 
                       className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <select 
                    value={selectedSchool} 
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                     <option value="All">All Schools</option>
                     {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
              </div>

              {/* List vs Map View */}
              {viewMode === 'list' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map(program => (
                    <ProgramCard 
                        key={program.id} 
                        program={program} 
                        onClick={() => setSelectedProgram(program)} 
                        onProviderClick={handleProviderClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-200 rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden border border-slate-300 shadow-inner">
                    <div className={`absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/13.4050,52.5200,10,0/800x600?access_token=pk.xxx')] bg-cover bg-center ${subscription === 'Free' ? 'blur-md scale-105' : ''}`}></div>
                    {subscription === 'Free' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-10">
                           <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                              <Lock className="mx-auto mb-3 text-secondary" size={32}/>
                              <h3 className="font-bold text-lg mb-2">Map View Locked</h3>
                              <p className="text-slate-600 text-sm mb-4">Upgrade to Active Family to see precise provider locations on the map.</p>
                              <Button onClick={() => setSubscription('Active')} className="bg-secondary text-white">Upgrade Now</Button>
                           </div>
                        </div>
                    )}
                </div>
              )}
           </div>
        )}

        {/* COMMUNITY TAB (Keep existing) */}
        {activeTab === 'community' && (
            <div className="p-6 md:p-8 h-full flex flex-col md:flex-row gap-8 overflow-hidden">
                <div className="flex-1 md:w-2/3 overflow-y-auto pr-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 sticky top-0 bg-slate-50 z-10 py-2">Community Highlights</h2>
                    <div className="space-y-8">
                        {MOCK_FEED_POSTS.map(post => (
                            <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden">
                                            <img src={post.providerImage} alt={post.providerName} className="w-full h-full object-cover"/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">{post.providerName}</h4>
                                            <p className="text-xs text-slate-500">{post.timeAgo}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost"><Share2 size={18}/></Button>
                                </div>
                                <div className="aspect-video bg-slate-100">
                                    <img src={post.image} alt="Post content" className="w-full h-full object-cover"/>
                                </div>
                                <div className="p-4">
                                    <div className="flex gap-4 mb-3">
                                        <button className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                                            <HeartIcon size={24} fill={post.liked ? "currentColor" : "none"} />
                                        </button>
                                        <button className="text-slate-600 hover:text-primary"><MessageSquare size={24}/></button>
                                    </div>
                                    <div className="text-sm font-bold text-slate-900 mb-1">{post.likes} likes</div>
                                    <p className="text-sm text-slate-700">
                                        <span className="font-bold mr-2">{post.providerName}</span>
                                        {post.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-140px)] sticky top-6">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h2 className="font-bold text-lg text-slate-900">My Job Posts</h2>
                        <Button size="sm" onClick={() => setShowJobModal(true)} className="bg-primary hover:bg-primaryDark text-slate-900 font-bold text-xs"><Plus size={14} className="mr-1"/> Post Job</Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {myJobs.map(job => (
                            <div key={job.id} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50">
                                <h4 className="font-bold text-slate-900 mb-1">{job.title}</h4>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{job.description}</p>
                                <div className="flex justify-between items-center text-xs font-medium">
                                    <span className="text-primaryDark">{job.budget || 'Negotiable'}</span>
                                    <span className="text-slate-400">{job.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* CHAT TAB (Keep existing) */}
        {activeTab === 'chat' && (
           <div className="flex h-full bg-white">
              <div className="w-24 md:w-80 border-r border-slate-200 flex flex-col">
                  <div className="p-4 border-b border-slate-100 font-bold text-lg hidden md:block">Messages</div>
                  <div className="flex-1 overflow-y-auto">
                      {MOCK_CONVERSATIONS.map(conv => (
                          <div 
                            key={conv.id} 
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex gap-3 ${activeConversationId === conv.id ? 'bg-cyan-50' : ''}`}
                          >
                              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                  <img src={conv.participantImage} alt="" className="w-full h-full object-cover"/>
                              </div>
                              <div className="hidden md:block flex-1 min-w-0">
                                  <h4 className="font-bold text-sm truncate">{conv.participantName}</h4>
                                  <p className="text-xs truncate text-slate-500">{conv.lastMessage}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="flex-1 flex flex-col bg-slate-50">
                  {subscription === 'Free' ? (
                       <div className="flex-1 flex items-center justify-center">
                           <div className="text-center max-w-sm p-6">
                               <Lock size={48} className="mx-auto text-secondary mb-4"/>
                               <h2 className="text-xl font-bold mb-2">Messaging Locked</h2>
                               <Button onClick={() => setSubscription('Active')} className="bg-secondary text-white">Upgrade Plan</Button>
                           </div>
                       </div>
                  ) : (
                      <>
                        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
                            <h3 className="font-bold text-slate-900">{activeConversation?.participantName}</h3>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => setShowVideoCall(true)}><Video size={18} className="md:mr-2"/> <span className="hidden md:inline">Video</span></Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeConversation?.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.isMe ? 'bg-primary text-slate-900 rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 border border-slate-200 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <Button type="submit" className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-primary hover:bg-primaryDark text-slate-900"><Send size={18}/></Button>
                        </form>
                      </>
                  )}
              </div>
           </div>
        )}

        {/* PLANNER & SETTINGS (Keep existing) */}
        {activeTab === 'planner' && <div className="p-8"><h1 className="text-2xl font-bold">My Planner</h1><p>Calendar view goes here.</p></div>}
        {activeTab === 'settings' && <div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p>Preferences go here.</p></div>}
        
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {['home', 'explore', 'community', 'chat', 'planner'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex flex-col items-center justify-center w-full py-1 ${activeTab === tab ? 'text-primary' : 'text-slate-400'}`}
            >
               {tab === 'home' && <Home size={22} />}
               {tab === 'explore' && <Search size={22} />}
               {tab === 'community' && <Users size={22} />}
               {tab === 'chat' && <MessageCircle size={22} />}
               {tab === 'planner' && <CalendarIcon size={22} />}
               <span className="text-[10px] mt-1 capitalize">{tab}</span>
            </button>
        ))}
      </div>

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl w-full max-w-lg p-6 animate-in zoom-in-95">
               <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
               <form onSubmit={handlePostJob} className="space-y-4">
                   <input required className="w-full border border-slate-200 rounded-lg p-2" placeholder="Job Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                   <div className="flex justify-end gap-3 pt-4">
                       <Button type="button" variant="ghost" onClick={() => setShowJobModal(false)}>Cancel</Button>
                       <Button type="submit">Post Job</Button>
                   </div>
               </form>
           </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-bottom duration-300 z-50 w-max">
              Settings Saved Successfully!
          </div>
      )}
    </div>
  );
};
