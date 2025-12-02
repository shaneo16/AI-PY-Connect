
import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle, Home, Award, User, Settings, Users, Sparkles, Copy, Share2, Heart as HeartIcon, MessageSquare, FileCheck, Shield, Send, ArrowLeft, Instagram, Globe, PlayCircle, Briefcase, Plus, Video, Mic, MicOff, VideoOff, PhoneOff, UserCheck, Clock, Check } from 'lucide-react';
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

export const ParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'planner' | 'community' | 'chat' | 'settings'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Job Board State
  const [myJobs, setMyJobs] = useState<Job[]>(MOCK_JOBS.filter(j => j.parentName === 'Sarah Schmidt'));
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', category: 'Education', description: '', budget: '' });
  
  // Provider Profile State
  const [viewingProviderId, setViewingProviderId] = useState<string | null>(null);
  
  // Chat State
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  // Settings State
  const [childSchool, setChildSchool] = useState(MOCK_SCHOOLS[0].id);
  const [healthInfo, setHealthInfo] = useState('');
  const [photoConsent, setPhotoConsent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Booking State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Simulation for Gating Features
  const [subscription, setSubscription] = useState<'Free' | 'Active'>('Free');

  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prog.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSchool = selectedSchool === 'All' || (prog.schoolId === selectedSchool);
    
    return matchesSearch && matchesCategory && matchesSchool;
  });

  const categories = ['All', 'Sports', 'Arts', 'Music', 'Education', 'Life Skills', 'Camps', 'Workshops'];

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  const copyReferral = () => {
    navigator.clipboard.writeText(MOCK_REFERRAL_STATS.code);
    alert('Referral code copied!');
  }

  const currentSchool = MOCK_SCHOOLS.find(s => s.id === childSchool);
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);
  const currentProvider = viewingProviderId ? MOCK_PROVIDERS.find(p => p.id === viewingProviderId) : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    alert(`Message sent: ${newMessage}`);
    setNewMessage('');
  };
  
  const handleProviderClick = (providerId: string) => {
     setViewingProviderId(providerId);
     setSelectedProgram(null);
     setActiveTab('explore'); // Ensures we stay within a view context
  };

  const closeProviderProfile = () => {
    setViewingProviderId(null);
  };

  const handleBooking = () => {
    setShowBookingModal(false);
    setBookingStep(1);
    setSelectedAddons([]);
    alert('Booking Confirmed! (Mock)');
  };
  
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = {
        id: Math.random().toString(),
        title: newJob.title,
        description: newJob.description,
        parentName: "Sarah Schmidt",
        location: "Mitte",
        datePosted: "Just now",
        category: newJob.category,
        budget: newJob.budget
    };
    setMyJobs([...myJobs, job]);
    setShowJobModal(false);
    setNewJob({ title: '', category: 'Education', description: '', budget: '' });
    alert("Job Posted Successfully!");
  }

  if (viewingProviderId && currentProvider) {
     return (
        <ProviderProfileView 
           provider={currentProvider} 
           onBack={closeProviderProfile} 
           onProgramClick={(p) => setSelectedProgram(p)}
        />
     );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 relative">
      {/* Video Call Overlay */}
      {showVideoCall && <VideoCallModal onClose={() => setShowVideoCall(false)} />}

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0 z-10 overflow-y-auto">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'explore' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Search size={20} />
              <span>Explore</span>
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'community' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Users size={20} />
              <span>Community</span>
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'chat' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <MessageCircle size={20} />
              <span>Messages</span>
            </button>
            <button 
              onClick={() => setActiveTab('planner')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'planner' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CalendarIcon size={20} />
              <span>My Planner</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
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
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {activeTab === 'home' && (
          <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8">
            <header>
               <h1 className="text-2xl font-bold text-slate-900">Welcome back, Sarah!</h1>
               <p className="text-slate-500">Here is what's happening with your family today.</p>
            </header>

            {/* 1. Children Profiles */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h2 className="font-bold text-lg mb-4 flex items-center">
                  <User className="text-primary mr-2" size={20}/> My Children
               </h2>
               <div className="flex flex-col md:flex-row gap-6">
                   {/* Emma */}
                   <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex-1">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                          <img src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Emma" className="w-full h-full object-cover"/>
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900">Emma Schmidt (8)</h3>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                             <MapPin size={12} className="mr-1"/> {MOCK_SCHOOLS[0].name}
                          </div>
                          <div className="flex gap-2 mt-2">
                             <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded uppercase">Soccer</span>
                             <span className="px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold rounded uppercase">Art</span>
                          </div>
                      </div>
                   </div>

                   {/* Leo */}
                   <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex-1">
                      <div className="h-16 w-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm">L</div>
                      <div>
                          <h3 className="font-bold text-slate-900">Leo Fischer (10)</h3>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                             <MapPin size={12} className="mr-1"/> {MOCK_SCHOOLS[1].name}
                          </div>
                          <div className="flex gap-2 mt-2">
                             <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">Math</span>
                          </div>
                      </div>
                   </div>
               </div>
            </div>
            
            {/* 2. Weekly Goal */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h2 className="font-bold text-lg mb-4 flex items-center justify-between">
                  <div className="flex items-center"><Sparkles className="text-secondary mr-2" size={20}/> Weekly Activity Goal</div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">On Track</span>
               </h2>
               <div className="flex items-center gap-4">
                  <div className="flex-1">
                     <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">4 of 5 activities completed</span>
                        <span className="font-bold text-secondary">80%</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className="bg-secondary h-3 rounded-full transition-all" style={{ width: '80%' }}></div>
                     </div>
                  </div>
               </div>
               <p className="text-sm text-slate-500 mt-3">Keep it up! One more activity to reach your weekly goal and earn 50 Prime Points.</p>
            </div>
          </div>
        )}

        {activeTab === 'planner' && (
           <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">
               <div className="mb-8 flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Planner</h1>
                    <p className="text-slate-500">Upcoming schedule for Emma and Leo.</p>
                  </div>
                  <Button className="bg-primary hover:bg-primaryDark text-slate-900 font-bold"><Plus size={16} className="mr-1"/> Add Activity</Button>
               </div>
               
               {subscription === 'Free' ? (
                   <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
                       <Lock className="mx-auto text-slate-400 mb-4" size={48} />
                       <h2 className="text-xl font-bold text-slate-900 mb-2">Planner is Locked</h2>
                       <p className="text-slate-600 mb-6">Upgrade to the Active Family plan to organize your family's schedule and sync with providers.</p>
                       <Button onClick={() => setSubscription('Active')} className="bg-secondary text-white">Unlock Planner</Button>
                   </div>
               ) : (
                   <div className="space-y-6">
                       {/* Today */}
                       <div>
                           <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center"><CalendarIcon size={20} className="mr-2 text-primaryDark"/> Today, June 12</h3>
                           <div className="space-y-3">
                               <div className="bg-white p-4 rounded-xl border-l-4 border-cyan-400 shadow-sm flex items-center justify-between">
                                   <div>
                                       <div className="font-bold text-slate-900">Junior Soccer Academy</div>
                                       <div className="text-xs text-slate-500 flex items-center mt-1"><Clock size={12} className="mr-1"/> 16:00 - 17:30 • Emma</div>
                                   </div>
                                   <div className="text-right">
                                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Confirmed</span>
                                   </div>
                               </div>
                           </div>
                       </div>

                       {/* Tomorrow */}
                       <div>
                           <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center"><CalendarIcon size={20} className="mr-2 text-primaryDark"/> Tomorrow, June 13</h3>
                           <div className="space-y-3">
                               <div className="bg-white p-4 rounded-xl border-l-4 border-amber-400 shadow-sm flex items-center justify-between">
                                   <div>
                                       <div className="font-bold text-slate-900">Math Tutoring</div>
                                       <div className="text-xs text-slate-500 flex items-center mt-1"><Clock size={12} className="mr-1"/> 15:00 - 16:00 • Leo</div>
                                   </div>
                                   <div className="text-right">
                                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Confirmed</span>
                                   </div>
                               </div>
                               <div className="bg-white p-4 rounded-xl border-l-4 border-fuchsia-400 shadow-sm flex items-center justify-between">
                                   <div>
                                       <div className="font-bold text-slate-900">Creative Art Workshop</div>
                                       <div className="text-xs text-slate-500 flex items-center mt-1"><Clock size={12} className="mr-1"/> 16:30 - 18:00 • Emma</div>
                                   </div>
                                   <div className="text-right">
                                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Confirmed</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               )}
           </div>
        )}
        
        {/* ... Reuse existing Community, Chat, Settings implementations ... */}
        {activeTab === 'explore' && (
           <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900">Explore Programs</h1>
                    <p className="text-slate-500">Find the perfect activity for your child.</p>
                 </div>
                 <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}><List size={20}/></button>
                    <button onClick={() => setViewMode('map')} className={`p-2 rounded ${viewMode === 'map' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}><MapIcon size={20}/></button>
                 </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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

              {/* Content */}
              {viewMode === 'list' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map(program => (
                    <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program)} onProviderClick={handleProviderClick} />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-200 rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden border border-slate-300 shadow-inner">
                    {/* Simulated Map */}
                    <div className={`absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/13.4050,52.5200,10,0/800x600?access_token=pk.xxx')] bg-cover bg-center ${subscription === 'Free' ? 'blur-md scale-105' : ''}`}></div>
                    
                    {subscription === 'Free' && (
                       <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-10">
                          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                             <Lock className="mx-auto mb-3 text-secondary" size={32}/>
                             <h3 className="font-bold text-lg mb-2">Map View is Locked</h3>
                             <p className="text-slate-600 text-sm mb-4">Upgrade to Active Family to see precise program locations and filter by proximity.</p>
                             <Button onClick={() => setSubscription('Active')} className="bg-secondary text-white">Unlock Map</Button>
                          </div>
                       </div>
                    )}

                    {subscription === 'Active' && (
                        <div className="relative z-10">
                           <span className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-slate-700">Interactive Map View (Mock)</span>
                        </div>
                    )}
                </div>
              )}
           </div>
        )}
      </main>
      
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
                          {selectedProgram.type === 'workshop' && <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase rounded-md tracking-wider border border-amber-200">Workshop</span>}
                       </div>
                       <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProgram.title}</h2>
                       <div className="flex items-center text-slate-600 mb-4">
                          <MapPin size={16} className="mr-1" /> {selectedProgram.location}
                       </div>
                       
                       <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProgram.verifications.map(v => (
                             <div key={v} className="flex items-center px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                                <VerificationIcon type={v} size={14} className="mr-1.5" />
                                {v.replace('_', ' ')}
                             </div>
                          ))}
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <div className="text-3xl font-bold text-primaryDark">€{selectedProgram.price}</div>
                       <div className="text-sm text-slate-400">per session</div>
                    </div>
                 </div>

                 {/* Provider Info - Clickable */}
                 <div 
                   onClick={() => handleProviderClick(selectedProgram.providerId)}
                   className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 mb-8 cursor-pointer hover:bg-slate-100 transition-colors group"
                 >
                    <div className="relative w-14 h-14 mr-4 mt-20"> {/* Fixed mt-20 overlap */}
                       <img src={selectedProgram.providerImage} alt={selectedProgram.provider} className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                       <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Online Now"></div>
                    </div>
                    <div className="flex-1 mt-20"> {/* Fixed mt-20 overlap */}
                       <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{selectedProgram.provider}</h3>
                       <div className="flex items-center text-sm text-slate-500">
                          <Star size={14} className="text-amber-400 fill-amber-400 mr-1" />
                          <span className="font-medium text-slate-700 mr-1">{selectedProgram.rating}</span>
                          <span>({selectedProgram.reviews} reviews)</span>
                       </div>
                    </div>
                    <ArrowLeft size={20} className="text-slate-300 rotate-180 group-hover:text-primary transition-colors"/>
                 </div>

                 <div className="space-y-6 mb-8">
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 mb-2">About this program</h3>
                       <p className="text-slate-600 leading-relaxed">
                          This comprehensive program is designed to build fundamental skills in a fun and supportive environment. 
                          Students will engage in structured activities that promote teamwork, creativity, and confidence.
                       </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 border border-slate-100 rounded-lg">
                          <div className="text-sm text-slate-400 mb-1">Next Session</div>
                          <div className="font-bold text-slate-900">{selectedProgram.nextSession}</div>
                       </div>
                       <div className="p-4 border border-slate-100 rounded-lg">
                          <div className="text-sm text-slate-400 mb-1">Age Group</div>
                          <div className="font-bold text-slate-900">6 - 10 years</div>
                       </div>
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-4 pt-6 border-t border-slate-100">
                    <Button variant="outline" className="flex-1 h-12 border-slate-200 hover:border-slate-300 text-slate-700">Message Provider</Button>
                    <Button onClick={() => setShowBookingModal(true)} className="flex-[2] h-12 bg-primary hover:bg-primaryDark text-slate-900 hover:text-white font-bold text-lg shadow-lg shadow-primary/20">Book Now</Button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// ... ProviderProfileView Component ...

// Program Card Component Exported
export const ProgramCard: React.FC<{ program: Program; onClick: () => void; onProviderClick: (id: string) => void }> = ({ program, onClick, onProviderClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
  >
     <div className="h-48 w-full overflow-hidden relative">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-3 left-3 flex gap-1">
           {program.verifications.map(type => (
              <div key={type} className="bg-white/90 backdrop-blur p-1.5 rounded-full shadow-sm" title={type.replace('_', ' ')}>
                 <VerificationIcon type={type} size={14} />
              </div>
           ))}
        </div>
        {program.recommended && (
            <div className="absolute top-3 right-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                POPULAR
            </div>
        )}
     </div>
     <div className="p-5 pt-8 relative">
        {/* Provider Avatar Overlay */}
        <div 
          onClick={(e) => { e.stopPropagation(); onProviderClick(program.providerId); }}
          className="absolute -top-8 right-5 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md bg-white z-10 hover:scale-105 transition-transform"
          title="View Provider Profile"
        >
          <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-between mb-1">
           <div className="flex items-center text-xs font-bold text-primaryDark bg-cyan-50 px-2 py-0.5 rounded uppercase tracking-wide">
              {program.type}
           </div>
           {program.isOnline && (
               <div className="flex items-center text-[10px] text-green-600 font-bold">
                   <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div> Online
               </div>
           )}
        </div>

        <h3 className="font-bold text-slate-900 truncate text-lg mb-1 group-hover:text-primary transition-colors">{program.title}</h3>
        <p className="text-sm text-slate-500 mb-3 truncate font-medium">{program.provider}</p>
        
        <div className="flex items-center text-xs text-slate-400 mb-4">
           <MapPin size={14} className="mr-1" />
           <span className="truncate">{program.location}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
           <div>
              <span className="font-bold text-xl text-primaryDark">€{program.price}</span>
              <span className="text-xs text-slate-400 ml-1">/session</span>
           </div>
           <div className="flex items-center text-sm font-bold text-slate-700">
               <Star size={14} className="text-amber-400 fill-amber-400 mr-1" /> {program.rating}
           </div>
        </div>
     </div>
  </div>
);

// Provider Profile View Component
export const ProviderProfileView: React.FC<{ provider: ProviderProfile; onBack: () => void; onProgramClick: (p: Program) => void }> = ({ provider, onBack, onProgramClick }) => {
   const isPremium = provider.tier === 'Professional' || provider.tier === 'Business';
   const providerPrograms = MOCK_PROGRAMS.filter(p => p.providerId === provider.id);

   return (
      <div className="flex-1 overflow-y-auto bg-slate-50 relative">
         {/* Cover Image (Premium Only) */}
         <div className="h-48 md:h-64 bg-slate-200 relative">
            {isPremium && provider.coverImage ? (
               <img src={provider.coverImage} className="w-full h-full object-cover" alt="Cover" />
            ) : (
               <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            )}
            <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-colors z-20">
               <ArrowLeft size={24} />
            </button>
         </div>

         <div className="max-w-5xl mx-auto px-6 pb-12">
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row items-end md:items-end gap-6">
               <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white shrink-0">
                  <img src={provider.image} className="w-full h-full object-cover" alt={provider.name} />
               </div>
               <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                     <h1 className="text-3xl font-bold text-slate-900">{provider.name}</h1>
                     {isPremium && <ShieldCheck className="text-secondary fill-secondary/10" size={24} />}
                  </div>
                  <p className="text-lg text-slate-600 font-medium">{provider.tagline}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                     <span className="flex items-center"><MapPin size={14} className="mr-1"/> {provider.location}</span>
                     <span className="flex items-center"><Star size={14} className="text-amber-400 fill-amber-400 mr-1"/> {provider.rating} ({provider.reviewCount} reviews)</span>
                  </div>
               </div>
               <div className="flex gap-3 pb-2">
                   <Button variant="outline">Message</Button>
                   <Button className="bg-primary hover:bg-primaryDark text-slate-900">Follow</Button>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-8">
                  {/* About */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h2 className="font-bold text-lg text-slate-900 mb-4">About</h2>
                     <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{provider.bio}</p>
                     
                     {isPremium && provider.video && (
                        <div className="mt-6">
                           <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center"><PlayCircle size={16} className="mr-2"/> Video Introduction</h3>
                           <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                 <PlayCircle className="text-primaryDark ml-1" size={24}/>
                              </div>
                              <img src={provider.gallery?.[0] || ""} className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60" />
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Programs */}
                  <div>
                     <h2 className="font-bold text-lg text-slate-900 mb-4">Available Programs</h2>
                     <div className="grid sm:grid-cols-2 gap-4">
                        {providerPrograms.map(p => (
                           <ProgramCard key={p.id} program={p} onClick={() => onProgramClick(p)} onProviderClick={() => {}} />
                        ))}
                     </div>
                  </div>

                  {/* Gallery (Premium) */}
                  {isPremium && provider.gallery && (
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="font-bold text-lg text-slate-900 mb-4">Gallery</h2>
                        <div className="grid grid-cols-3 gap-2">
                           {provider.gallery.map((img, idx) => (
                              <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                                 <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               <div className="space-y-6">
                  {/* Info Card */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                     <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Badges</h3>
                        <div className="flex flex-wrap gap-2">
                           {provider.verifications.map(v => (
                              <div key={v} className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100" title={v}>
                                 <VerificationIcon type={v} size={14} className="mr-1.5"/>
                                 <span className="font-medium">{v.replace('_', ' ')}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="pt-4 border-t border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Response Time</h3>
                        <p className="text-sm font-medium text-slate-700">{provider.responseRate || 'Within 24 hours'}</p>
                     </div>
                     <div className="pt-4 border-t border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Member Since</h3>
                        <p className="text-sm font-medium text-slate-700">{provider.joinedDate}</p>
                     </div>
                     {isPremium && provider.socialLinks && (
                        <div className="pt-4 border-t border-slate-100 flex gap-4">
                           {provider.socialLinks.instagram && (
                              <a href="#" className="text-slate-400 hover:text-secondary transition-colors"><Instagram size={20}/></a>
                           )}
                           {provider.socialLinks.website && (
                              <a href="#" className="text-slate-400 hover:text-primaryDark transition-colors"><Globe size={20}/></a>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
