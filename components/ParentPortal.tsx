
import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle, Home, Award, User, Settings, Users, Sparkles, Copy, Share2, Heart as HeartIcon, MessageSquare, FileCheck, Shield, Send, ArrowLeft, Instagram, Globe, PlayCircle, Briefcase, Plus } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_SCHOOLS, MOCK_BADGES, MOCK_REFERRAL_STATS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_PROVIDERS, PRODUCTS, MOCK_JOBS } from '../constants';
import { Program, VerificationType, Conversation, ChatMessage, ProviderProfile, Job } from '../types';
import { Button } from './Button';

export const ParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'planner' | 'highlights' | 'chat' | 'settings' | 'jobs'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Job Board State
  const [myJobs, setMyJobs] = useState<Job[]>(MOCK_JOBS.filter(j => j.parentName === 'Sarah Schmidt'));
  const [showJobModal, setShowJobModal] = useState(false);
  
  // Provider Profile State
  const [viewingProviderId, setViewingProviderId] = useState<string | null>(null);
  
  // Chat State
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  
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
    const newJob: Job = {
        id: Math.random().toString(),
        title: "New Job Request",
        description: "Mock job description...",
        parentName: "Sarah Schmidt",
        location: "Mitte",
        datePosted: "Just now",
        category: "Education",
        budget: "Negotiable"
    };
    setMyJobs([...myJobs, newJob]);
    setShowJobModal(false);
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
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'explore' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Search size={20} />
              <span>Explore</span>
            </button>
            <button 
              onClick={() => setActiveTab('highlights')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'highlights' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <HeartIcon size={20} />
              <span>Highlights</span>
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'jobs' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Briefcase size={20} />
              <span>My Jobs</span>
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
        {activeTab === 'jobs' && (
            <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
               <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Jobs</h1>
                    <p className="text-slate-500">Post a request for tutors, coaches, or babysitters.</p>
                 </div>
                 <Button onClick={() => setShowJobModal(true)}><Plus size={18} className="mr-2"/> Post a Job</Button>
               </div>

               <div className="space-y-4">
                  {myJobs.length === 0 ? (
                      <div className="text-center py-20 text-slate-400">
                          <Briefcase size={48} className="mx-auto mb-4 opacity-50"/>
                          <p>You haven't posted any jobs yet.</p>
                      </div>
                  ) : (
                      myJobs.map(job => (
                          <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">{job.category}</span>
                             </div>
                             <p className="text-slate-600 text-sm mb-4">{job.description}</p>
                             <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center"><MapPin size={12} className="mr-1"/> {job.location}</span>
                                <span className="flex items-center"><CalendarIcon size={12} className="mr-1"/> {job.datePosted}</span>
                                {job.budget && <span className="font-bold text-slate-700">{job.budget}</span>}
                             </div>
                          </div>
                      ))
                  )}
               </div>
            </div>
        )}

        {activeTab === 'home' && (
          <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8">
            <header>
               <h1 className="text-2xl font-bold text-slate-900">Welcome back, Sarah!</h1>
               <p className="text-slate-500">Here is what's happening with your family today.</p>
            </header>

            {/* 1. Children Profiles (Top of Overview) */}
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
                          <h3 className="font-bold text-slate-900">Leo Schmidt (12)</h3>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                             <MapPin size={12} className="mr-1"/> {MOCK_SCHOOLS[1].name}
                          </div>
                          <div className="flex gap-2 mt-2">
                             <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase">Math</span>
                          </div>
                      </div>
                   </div>
                   
                   <button className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-primary hover:text-primary transition-colors w-full md:w-32">
                      <div className="text-center">
                         <div className="mx-auto mb-1"><Users size={20}/></div>
                         <span className="text-xs font-bold">+ Add</span>
                      </div>
                   </button>
               </div>
            </div>
            
            {/* 2. Activity Progress (Full Width) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg flex items-center">
                    <Sparkles className="text-secondary mr-2" size={20}/> Weekly Activity Goal
                  </h2>
                  <span className="text-sm font-medium text-slate-500">2/3 Activities Completed</span>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-end justify-between mb-2">
                    <div className="flex gap-2">
                       <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">Emma: On Track</span>
                       <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded">Leo: 1 to go</span>
                    </div>
                    <span className="text-3xl font-bold text-slate-900">80%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-secondary to-purple-500 h-4 rounded-full transition-all duration-1000 shadow-lg" style={{ width: '80%' }}>
                       <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">Great job! Emma has 1 more session this week to hit the family goal.</p>
                </div>
            </div>

            {/* 3. Badges */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="font-bold text-lg mb-4 flex items-center">
                  <Award className="text-amber-500 mr-2" size={20}/> Family Achievements
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                  {MOCK_BADGES.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center text-center group cursor-pointer min-w-[100px]">
                        <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-4xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          {badge.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{badge.name}</span>
                        <span className="text-[10px] text-slate-400">{badge.earnedDate}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center text-center opacity-40 min-w-[100px]">
                      <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-3xl mb-3">
                        🔒
                      </div>
                      <span className="text-xs font-bold text-slate-500">Level 5</span>
                  </div>
                </div>
            </div>

            {/* 4. Recommendations */}
            <div>
               <h2 className="font-bold text-xl mb-4 flex items-center text-slate-900">
                 Recommended for you
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {MOCK_PROGRAMS.filter(p => p.recommended).map(prog => (
                   <ProgramCard key={prog.id} program={prog} onClick={() => setSelectedProgram(prog)} onProviderClick={handleProviderClick} />
                 ))}
               </div>
            </div>

            {/* 5. Refer & Earn (Bottom) */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Users size={150} />
                </div>
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                   <div>
                      <h2 className="font-bold text-xl mb-2 flex items-center text-primary">
                        <Users className="mr-2" size={24}/> Refer & Earn
                      </h2>
                      <p className="text-slate-300 mb-6">Give your friends €10 off their first booking and earn 200 Prime Points for yourself!</p>
                      
                      <div className="flex gap-2 max-w-sm">
                        <div className="bg-white/10 rounded-lg px-4 py-3 flex-1 font-mono text-sm border border-white/10 flex items-center justify-between">
                            <span className="text-amber-400 font-bold tracking-widest">{MOCK_REFERRAL_STATS.code}</span>
                            <button onClick={copyReferral} className="text-white hover:text-primary"><Copy size={16}/></button>
                        </div>
                        <Button onClick={copyReferral} className="bg-primary hover:bg-cyan-600 border-none">Copy Code</Button>
                      </div>
                   </div>

                   <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3 text-slate-200">Your Progress</h3>
                      <div className="space-y-3">
                        {MOCK_REFERRAL_STATS.milestones.map((m, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${m.achieved ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-500'}`}>
                                  <CheckCircle size={12} />
                              </div>
                              <span className={m.achieved ? 'text-white font-medium' : 'text-slate-500'}>{m.label}</span>
                            </div>
                        ))}
                      </div>
                   </div>
                </div>
            </div>
          </div>
        )}

        {/* ... (Other tabs logic remains the same) ... */}
        {/* For brevity, omitting duplicate code of activeTab 'explore', 'chat', 'highlights', 'planner', 'settings' if no changes there */}
        {/* BUT since I must return full file content, I will paste the rest of the file ... */}
        
        {activeTab === 'explore' && (
          <>
            {/* Header / Search Bar */}
            <div className="bg-white border-b border-slate-200 p-4 md:p-6 shadow-sm z-20 sticky top-0">
               <div className="max-w-6xl mx-auto">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Find Programs</h1>
                      <p className="text-sm text-slate-500">Discover vetted programs & services.</p>
                    </div>
                    <div className="flex-1 md:max-w-lg relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="science tutor, sports coach, babysitter..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar flex-1">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            selectedCategory === cat 
                              ? 'bg-primary text-white' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    
                    {/* School Filter */}
                    <div className="flex items-center gap-2">
                       <select 
                         value={selectedSchool}
                         onChange={(e) => setSelectedSchool(e.target.value)}
                         className="bg-slate-100 text-slate-700 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-2 focus:ring-primary outline-none"
                       >
                         <option value="All">All Schools</option>
                         {MOCK_SCHOOLS.map(s => (
                           <option key={s.id} value={s.id}>{s.name}</option>
                         ))}
                       </select>

                       <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
                          <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                             <List size={20} />
                          </button>
                          <button onClick={() => setViewMode('map')} className={`p-1.5 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                             <MapIcon size={20} />
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
              <div className="max-w-6xl mx-auto">
                {viewMode === 'list' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {filteredPrograms.length > 0 ? (
                       filteredPrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program)} onProviderClick={handleProviderClick} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-20 text-slate-500">
                        No programs found matching your filters.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-200 rounded-xl h-[500px] w-full flex items-center justify-center relative overflow-hidden border border-slate-300">
                     {/* Mock Map */}
                     <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Berlin_map_grayscale.png')] bg-cover opacity-50 grayscale"></div>
                     {subscription === 'Free' ? (
                        <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex flex-col items-center justify-center text-center p-6">
                           <Lock size={48} className="text-secondary mb-4" />
                           <h3 className="text-xl font-bold text-slate-900">Upgrade to View Map</h3>
                           <p className="text-slate-600 mb-4 max-w-sm">Active Family members can see exact provider locations on the map.</p>
                           <Button variant="secondary" onClick={() => setSubscription('Active')}>Unlock Map View</Button>
                        </div>
                     ) : (
                        <div className="absolute inset-0">
                           {filteredPrograms.map(p => p.coordinates && (
                              <div 
                                key={p.id} 
                                className="absolute cursor-pointer hover:z-10 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                                style={{ top: `${(p.coordinates.lat - 52.4) * 600}%`, left: `${(p.coordinates.lng - 13.2) * 400}%` }}
                                onClick={() => setSelectedProgram(p)}
                              >
                                 <div className="w-8 h-8 rounded-full bg-primary border-2 border-white shadow-lg overflow-hidden">
                                    <img src={p.providerImage} alt={p.provider} className="w-full h-full object-cover" />
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'chat' && (
          <div className="flex h-full">
             {/* Chat Sidebar */}
             <div className="w-72 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-200">
                   <h2 className="font-bold text-slate-900">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                   {subscription === 'Free' ? (
                      <div className="p-6 text-center text-slate-400 flex flex-col items-center justify-center h-full">
                         <Lock size={32} className="mb-4 text-slate-300"/>
                         <p className="text-sm font-medium text-slate-600 mb-2">Messaging Locked</p>
                         <p className="text-xs mb-4">Upgrade to Active Family to chat with providers directly.</p>
                         <Button variant="secondary" size="sm" onClick={() => setSubscription('Active')}>Unlock Chat</Button>
                      </div>
                   ) : (
                      MOCK_CONVERSATIONS.map(conv => (
                        <div 
                          key={conv.id} 
                          onClick={() => setActiveConversationId(conv.id)}
                          className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 ${activeConversationId === conv.id ? 'bg-cyan-50' : ''}`}
                        >
                           <div className="relative">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                 <img src={conv.participantImage} alt={conv.participantName} className="w-full h-full object-cover"/>
                              </div>
                              {conv.unreadCount > 0 && (
                                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border border-white">
                                    {conv.unreadCount}
                                 </div>
                              )}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-0.5">
                                 <h3 className="font-bold text-sm text-slate-900 truncate">{conv.participantName}</h3>
                                 <span className="text-[10px] text-slate-400">10:00</span>
                              </div>
                              <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                           </div>
                        </div>
                     ))
                   )}
                </div>
             </div>

             {/* Chat Window */}
             <div className="flex-1 flex flex-col bg-slate-50">
                {subscription === 'Free' ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <Lock size={40} className="text-slate-300" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">Messaging is a Premium Feature</h2>
                      <p className="text-slate-600 max-w-md">Communicate directly with providers to coordinate schedules, ask questions, and get updates.</p>
                   </div>
                ) : activeConversation ? (
                   <>
                      <div className="p-4 bg-white border-b border-slate-200 flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                             <img src={activeConversation.participantImage} alt={activeConversation.participantName} className="w-full h-full object-cover"/>
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900 text-sm">{activeConversation.participantName}</h3>
                            <span className="text-xs text-green-500 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Online</span>
                         </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                         {activeConversation.messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isMe ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                                  {msg.text}
                                  <div className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-cyan-100' : 'text-slate-400'}`}>{msg.timestamp}</div>
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="p-4 bg-white border-t border-slate-200">
                         <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input 
                              type="text" 
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Type a message..."
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button type="submit" disabled={!newMessage.trim()}><Send size={18}/></Button>
                         </form>
                      </div>
                   </>
                ) : (
                   <div className="flex-1 flex items-center justify-center text-slate-400">
                      Select a conversation
                   </div>
                )}
             </div>
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
             <header className="mb-6 text-center">
               <h1 className="text-2xl font-bold text-slate-900">Community Highlights</h1>
               <p className="text-slate-500">Updates from your favorite providers.</p>
             </header>

             <div className="space-y-6">
                {MOCK_FEED_POSTS.map(post => (
                   <div key={post.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="p-4 flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                               <img src={post.providerImage} alt={post.providerName} className="w-full h-full object-cover"/>
                            </div>
                            <div>
                               <h3 className="font-bold text-slate-900 text-sm">{post.providerName}</h3>
                               <p className="text-xs text-slate-500">{post.timeAgo}</p>
                            </div>
                         </div>
                         <button className="text-slate-400 hover:text-slate-600"><Share2 size={18}/></button>
                      </div>
                      
                      <div className="aspect-square w-full bg-slate-100 relative">
                         <img src={post.image} alt="Post" className="w-full h-full object-cover"/>
                      </div>

                      <div className="p-4">
                         <div className="flex items-center space-x-4 mb-3">
                            <button className={`flex items-center space-x-1 ${post.liked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                               <HeartIcon size={24} className={post.liked ? 'fill-red-500' : ''} />
                            </button>
                            <button className="flex items-center space-x-1 text-slate-600 hover:text-primary">
                               <MessageSquare size={24} />
                            </button>
                         </div>
                         <div className="mb-2">
                            <span className="font-bold text-sm text-slate-900">{post.likes} likes</span>
                         </div>
                         <p className="text-sm text-slate-700">
                            <span className="font-bold mr-2">{post.providerName}</span>
                            {post.caption}
                         </p>
                         {post.comments > 0 && (
                            <button className="text-xs text-slate-400 mt-2 hover:text-slate-600">View all {post.comments} comments</button>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="max-w-4xl mx-auto p-4 md:p-8">
             {subscription === 'Free' ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <CalendarIcon size={48} className="text-slate-300" />
                   </div>
                   <h1 className="text-3xl font-bold text-slate-900 mb-4">Unlock Your Family Planner</h1>
                   <p className="text-slate-600 max-w-lg mb-8">
                      Upgrade to Active Family to sync calendars, track schedules for multiple children, and get reminders.
                   </p>
                   <Button size="lg" variant="secondary" onClick={() => setSubscription('Active')}>Upgrade Now - €8/mo</Button>
                </div>
             ) : (
                <>
                  <header className="mb-8 flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 mb-2">Family Schedule</h1>
                      <p className="text-slate-500">Upcoming sessions for Emma and Leo.</p>
                    </div>
                    <Button>Sync Calendar</Button>
                  </header>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg">This Week</h3>
                      <span className="text-sm text-slate-500">June 12 - June 18</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {[
                        { day: 'Mon', date: '12', title: 'Math Whiz Tutoring', time: '17:00 - 18:00', child: 'Leo', color: 'bg-orange-100 text-orange-700' },
                        { day: 'Tue', date: '13', title: 'Junior Soccer Academy', time: '16:00 - 17:30', child: 'Emma', color: 'bg-purple-100 text-purple-700' },
                      ].map((event, i) => (
                        <div key={i} className="flex p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col items-center justify-center w-16 mr-4">
                              <span className="text-xs text-slate-500 uppercase font-bold">{event.day}</span>
                              <span className="text-xl font-bold text-slate-900">{event.date}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-slate-900">{event.title}</h4>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${event.color}`}>{event.child}</span>
                              </div>
                              <div className="flex items-center text-sm text-slate-500 mt-1">
                                <CalendarIcon size={14} className="mr-1" />
                                {event.time}
                              </div>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
             )}
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="max-w-3xl mx-auto p-4 md:p-8">
             <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Account Settings</h1>
                <p className="text-slate-500">Manage your family profile and preferences.</p>
             </header>

             {showToast && (
                <div className="fixed top-20 right-8 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-in slide-in-from-right z-50">
                   Settings Saved Successfully!
                </div>
             )}

             <form onSubmit={saveSettings} className="space-y-8">
                {/* Child Profile */}
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                   <h3 className="text-lg font-bold mb-4">Child Profile: Emma</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">School</label>
                         <select 
                           value={childSchool} 
                           onChange={(e) => setChildSchool(e.target.value)}
                           className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                         >
                            {MOCK_SCHOOLS.map(s => (
                               <option key={s.id} value={s.id}>{s.name} ({s.district})</option>
                            ))}
                         </select>
                         <p className="text-xs text-slate-400 mt-1">This helps us find programs near your school.</p>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Health / Allergies</label>
                         <input 
                            type="text" 
                            value={healthInfo}
                            onChange={(e) => setHealthInfo(e.target.value)}
                            placeholder="e.g. Peanut Allergy, Asthma"
                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                         />
                      </div>
                   </div>
                   
                   <div className="mt-4">
                      <label className="flex items-center space-x-2">
                         <input 
                           type="checkbox" 
                           checked={photoConsent}
                           onChange={(e) => setPhotoConsent(e.target.checked)}
                           className="rounded text-primary focus:ring-primary" 
                         />
                         <span className="text-sm text-slate-700">I grant permission for photos of my child to be taken during activities.</span>
                      </label>
                   </div>
                </div>

                {/* Payment */}
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                   <h3 className="text-lg font-bold mb-4">Payment Method</h3>
                   <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-slate-50 mb-3">
                      <div className="w-10 h-6 bg-slate-300 rounded mr-3"></div>
                      <span className="font-mono text-slate-600">•••• •••• •••• 4242</span>
                      <button type="button" className="ml-auto text-sm text-primary hover:underline">Edit</button>
                   </div>
                   <Button variant="outline" size="sm" type="button">+ Add New Card</Button>
                </div>

                {/* Legal */}
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                   <h3 className="text-lg font-bold mb-4">Legal</h3>
                   <ul className="space-y-2 text-sm text-primary">
                      <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                      <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                      <li><a href="#" className="hover:underline">Data Processing Agreement</a></li>
                   </ul>
                </div>

                <div className="flex justify-end">
                   <Button type="submit" size="lg">Save Changes</Button>
                </div>
             </form>
           </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedProgram && (
         <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-lg text-slate-900">Complete Booking</h3>
                  <button onClick={() => setShowBookingModal(false)}><X size={20} className="text-slate-400"/></button>
               </div>
               
               <div className="p-6 overflow-y-auto">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-8 relative">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
                  </div>

                  {bookingStep === 1 && (
                     <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                           <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                              <img src={selectedProgram.image} className="w-full h-full object-cover"/>
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{selectedProgram.title}</h4>
                              <p className="text-sm text-slate-500 mb-1">{selectedProgram.provider}</p>
                              <div className="flex items-center text-xs text-slate-500">
                                 <CalendarIcon size={12} className="mr-1"/> {selectedProgram.nextSession}
                              </div>
                           </div>
                        </div>

                        <div>
                           <h4 className="font-bold text-sm mb-2">Select Child</h4>
                           <div className="flex gap-2">
                              <button className="flex-1 py-2 px-3 rounded-lg border-2 border-primary bg-cyan-50 text-primary font-bold text-sm">Emma</button>
                              <button className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-slate-500 text-sm hover:border-primary/50">Leo</button>
                           </div>
                        </div>
                     </div>
                  )}

                  {bookingStep === 2 && (
                     <div>
                        <h4 className="font-bold text-lg mb-4">Add Gear & Essentials</h4>
                        <div className="space-y-3">
                           {PRODUCTS.map(product => (
                              <div key={product.id} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${selectedAddons.includes(product.id) ? 'border-primary bg-cyan-50 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300'}`}
                                 onClick={() => {
                                    if (selectedAddons.includes(product.id)) {
                                       setSelectedAddons(selectedAddons.filter(id => id !== product.id));
                                    } else {
                                       setSelectedAddons([...selectedAddons, product.id]);
                                    }
                                 }}
                              >
                                 <div className="w-12 h-12 bg-white rounded border border-slate-100 mr-3 overflow-hidden">
                                    <img src={product.image} className="w-full h-full object-cover"/>
                                 </div>
                                 <div className="flex-1">
                                    <div className="font-bold text-sm text-slate-900">{product.name}</div>
                                    <div className="text-xs text-slate-500">Essential for this class</div>
                                 </div>
                                 <div className="font-bold text-slate-900">+€{product.price}</div>
                                 <div className={`ml-3 w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddons.includes(product.id) ? 'bg-primary border-primary text-white' : 'border-slate-300'}`}>
                                    {selectedAddons.includes(product.id) && <CheckCircle size={12}/>}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {bookingStep === 3 && (
                     <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                           <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Program Fee</span>
                              <span className="font-medium">€{selectedProgram.price}</span>
                           </div>
                           {selectedAddons.map(id => {
                              const p = PRODUCTS.find(prod => prod.id === id);
                              return p ? (
                                 <div key={id} className="flex justify-between text-sm">
                                    <span className="text-slate-600">{p.name}</span>
                                    <span className="font-medium">€{p.price}</span>
                                 </div>
                              ) : null;
                           })}
                           <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-lg mt-2">
                              <span>Total</span>
                              <span>€{selectedProgram.price + selectedAddons.reduce((acc, id) => acc + (PRODUCTS.find(p => p.id === id)?.price || 0), 0)}</span>
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">Card Details</label>
                           <div className="p-3 border border-slate-300 rounded-lg bg-white flex items-center space-x-3">
                              <div className="w-8 h-5 bg-slate-200 rounded"></div>
                              <input type="text" placeholder="Card number" className="flex-1 outline-none text-sm"/>
                           </div>
                           <div className="grid grid-cols-2 gap-3 mt-3">
                              <input type="text" placeholder="MM/YY" className="p-3 border border-slate-300 rounded-lg outline-none text-sm"/>
                              <input type="text" placeholder="CVC" className="p-3 border border-slate-300 rounded-lg outline-none text-sm"/>
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               <div className="p-4 border-t border-slate-100 flex justify-between">
                  {bookingStep > 1 ? (
                     <Button variant="outline" onClick={() => setBookingStep(bookingStep - 1)}>Back</Button>
                  ) : (
                     <div></div>
                  )}
                  {bookingStep < 3 ? (
                     <Button onClick={() => setBookingStep(bookingStep + 1)}>Next Step</Button>
                  ) : (
                     <Button onClick={handleBooking}>Pay & Confirm</Button>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* New Job Modal */}
      {showJobModal && (
         <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900">Post a Job Request</h3>
                  <button onClick={() => setShowJobModal(false)}><X size={20} className="text-slate-400"/></button>
               </div>
               <form onSubmit={handlePostJob} className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                     <input type="text" placeholder="e.g. Math Tutor needed" className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                     <textarea rows={3} placeholder="Describe what you need..." className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" required></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
                        <input type="text" placeholder="e.g. €20/hr" className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <input type="text" placeholder="e.g. Mitte" className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                     </div>
                  </div>
                  <Button type="submit" className="w-full">Post Job</Button>
               </form>
            </div>
         </div>
      )}

      {/* Detail Modal / Overlay */}
      {selectedProgram && !showBookingModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
           <div className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="relative">
                 <button onClick={() => setSelectedProgram(null)} className="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full z-10 transition-colors">
                    <X size={20} />
                 </button>
                 <div className="h-48 w-full relative">
                    <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="px-6 relative">
                    {/* Clickable Provider Photo - Fixed Position and Spacing */}
                    <div 
                      className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md z-10 cursor-pointer group"
                      onClick={() => handleProviderClick(selectedProgram.providerId)}
                      title="View Profile"
                    >
                       <img src={selectedProgram.providerImage} alt={selectedProgram.provider} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    {selectedProgram.isOnline && (
                       <div className="absolute top-8 left-24 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white z-10">
                          ONLINE
                       </div>
                    )}
                    
                    {/* Increased Top Margin to prevent text overlap */}
                    <div className="mt-20 mb-6">
                       <div className="flex items-start justify-between">
                          <div>
                            <h2 
                              className="text-2xl font-bold text-slate-900 leading-tight hover:text-primary cursor-pointer transition-colors"
                              onClick={() => handleProviderClick(selectedProgram.providerId)}
                            >
                              {selectedProgram.provider}
                            </h2>
                            <p className="text-slate-500 text-sm">Member since 2019 • Response time: 1hr</p>
                          </div>
                          <div className="flex flex-col items-end">
                             <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700 font-bold text-sm">
                                <Star size={14} className="fill-amber-500 text-amber-500 mr-1" />
                                {selectedProgram.rating}
                             </div>
                             <span className="text-xs text-slate-400 mt-1">{selectedProgram.reviews} reviews</span>
                          </div>
                       </div>
                       
                       <div className="flex flex-wrap gap-2 mt-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold uppercase rounded">{selectedProgram.category}</span>
                          {selectedProgram.verifications.map((type) => (
                             <span key={type} className={`px-2 py-1 text-xs font-semibold uppercase rounded flex items-center ${
                                type === 'background_check' ? 'bg-blue-100 text-blue-700' :
                                type === 'first_aid' ? 'bg-red-100 text-red-700' :
                                type === 'child_safeguarding' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700' // insurance
                             }`}>
                                <VerificationIcon type={type} size={12} className="mr-1" />
                                {type.replace('_', ' ')}
                             </span>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6 pb-20">
                       <section>
                          <h3 className="font-bold text-slate-900 mb-2">About the Program</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Join us for {selectedProgram.title}! We focus on building confidence and skills in a fun, safe environment. 
                            Perfect for beginners and intermediate learners alike.
                          </p>
                       </section>

                       <section>
                          <h3 className="font-bold text-slate-900 mb-2">Location</h3>
                          <div className="relative h-32 bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                             {/* Blurred map for Free users */}
                             <div className={`absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Berlin_map_grayscale.png')] bg-cover ${subscription === 'Free' ? 'blur-md' : ''}`}></div>
                             {subscription === 'Free' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                                   <div className="bg-white/90 px-4 py-2 rounded-lg shadow-sm text-xs font-bold flex items-center">
                                      <Lock size={12} className="mr-1 text-secondary" /> Location hidden
                                   </div>
                                </div>
                             )}
                          </div>
                          <div className="flex items-center mt-2 text-sm text-slate-600">
                             <MapPin size={16} className="mr-2 text-slate-400" />
                             {selectedProgram.location}
                          </div>
                       </section>

                       <section>
                          <h3 className="font-bold text-slate-900 mb-2">Schedule</h3>
                          <div className="flex items-center text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                             <CalendarIcon size={18} className="text-slate-400 mr-3" />
                             <div>
                                <span className="block font-medium text-slate-900">{selectedProgram.nextSession}</span>
                                <span className="text-xs text-slate-500">{selectedProgram.type === 'service' ? 'Request Availability' : 'Next Session'}</span>
                             </div>
                          </div>
                       </section>
                    </div>
                 </div>

                 {/* Sticky Footer */}
                 <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex gap-3 items-center">
                     <div className="flex-1">
                        <span className="block text-2xl font-bold text-slate-900">€{selectedProgram.price}</span>
                        <span className="text-xs text-slate-500">{selectedProgram.type === 'service' ? 'per hour' : 'per session'}</span>
                     </div>
                     
                     {selectedProgram.type === 'service' ? (
                       <Button className="flex-1" onClick={() => alert('Request Sent!')}>Request Booking</Button>
                     ) : (
                       <Button className="flex-1" onClick={() => setShowBookingModal(true)}>Book Now</Button>
                     )}
                     
                     {/* Locked for Free Users */}
                     <button 
                       disabled={subscription === 'Free'}
                       onClick={() => { setActiveTab('chat'); setSelectedProgram(null); }}
                       className={`p-3 rounded-lg border flex items-center justify-center transition-colors ${
                          subscription === 'Free' 
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-white border-slate-200 text-primary hover:bg-slate-50'
                        }`}
                       title={subscription === 'Free' ? "Upgrade to message" : "Message Provider"}
                     >
                        {subscription === 'Free' ? <Lock size={20} /> : <MessageCircle size={20} />}
                     </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const ProviderProfileView: React.FC<{ provider: ProviderProfile; onBack: () => void; onProgramClick: (p: Program) => void }> = ({ provider, onBack, onProgramClick }) => {
  const isPremium = provider.tier !== 'Starter';
  const providerPrograms = MOCK_PROGRAMS.filter(p => p.providerId === provider.id);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Hero / Cover */}
      <div className="relative h-64 bg-slate-800">
        <button onClick={onBack} className="absolute top-6 left-6 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors">
           <ArrowLeft size={24} />
        </button>
        {isPremium && provider.coverImage ? (
           <img src={provider.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
        ) : (
           <div className="w-full h-full bg-gradient-to-br from-primary to-cyan-800 opacity-90"></div>
        )}
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 -mt-20 relative mb-12">
         {/* Profile Card */}
         <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden shrink-0 -mt-16 md:-mt-10 mx-auto md:mx-0">
               <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
               <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                  <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    {provider.name}
                    {isPremium && <CheckCircle size={24} className="text-blue-500 fill-blue-50" />}
                  </h1>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold mt-2 md:mt-0">
                     <Star size={16} className="fill-amber-500 text-amber-500" />
                     {provider.rating} ({provider.reviewCount})
                  </div>
               </div>
               <p className="text-lg text-slate-600 mb-4">{provider.tagline}</p>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  {provider.verifications.map(v => (
                     <div key={v} className="flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        <VerificationIcon type={v} size={14} className="mr-1" />
                        {v.replace('_', ' ').toUpperCase()}
                     </div>
                  ))}
               </div>

               <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-500">
                     <MapPin size={16} className="mr-2" /> {provider.location}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 md:ml-6">
                     <CalendarIcon size={16} className="mr-2" /> Joined {provider.joinedDate}
                  </div>
                  {provider.responseRate && (
                     <div className="flex items-center text-sm text-slate-500 md:ml-6">
                        <MessageCircle size={16} className="mr-2" /> Responds in {provider.responseRate}
                     </div>
                  )}
               </div>
            </div>
         </div>
         
         <div className="mt-8 grid md:grid-cols-3 gap-8">
            {/* Left Column: About & Premium Info */}
            <div className="md:col-span-2 space-y-8">
               <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{provider.bio}</p>
                  
                  {isPremium && provider.socialLinks && (
                     <div className="flex gap-4 mt-6">
                        {provider.socialLinks.website && (
                           <a href="#" className="flex items-center text-primary hover:underline font-medium">
                              <Globe size={18} className="mr-2" /> Website
                           </a>
                        )}
                        {provider.socialLinks.instagram && (
                           <a href="#" className="flex items-center text-secondary hover:underline font-medium">
                              <Instagram size={18} className="mr-2" /> Instagram
                           </a>
                        )}
                     </div>
                  )}
               </section>

               {/* Video - Premium Only */}
               {isPremium && provider.video && (
                  <section>
                     <h2 className="text-xl font-bold text-slate-900 mb-4">Video Introduction</h2>
                     <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Placeholder for video thumb */}
                        <div className="absolute bottom-4 left-4 text-white text-sm font-bold bg-black/40 px-2 py-1 rounded">
                           Meet the team
                        </div>
                     </div>
                  </section>
               )}

               {/* Programs List */}
               <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Available Programs ({providerPrograms.length})</h2>
                  <div className="space-y-4">
                     {providerPrograms.map(p => (
                        <div 
                           key={p.id} 
                           onClick={() => onProgramClick(p)}
                           className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all cursor-pointer flex gap-4"
                        >
                           <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                              <img src={p.image} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                              <p className="text-sm text-slate-500 mb-2">{p.category}</p>
                              <div className="flex items-center text-xs text-slate-500 mb-2">
                                 <CalendarIcon size={14} className="mr-1" /> {p.nextSession}
                              </div>
                              <div className="font-bold text-primary">€{p.price}</div>
                           </div>
                           <div className="flex items-center justify-center px-4">
                              <Button variant="outline" size="sm">View</Button>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            </div>

            {/* Right Column: Gallery (Premium) & Contact */}
            <div className="space-y-8">
               {/* Gallery - Premium Only */}
               {isPremium && provider.gallery && (
                  <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h2 className="text-lg font-bold text-slate-900 mb-4">Gallery</h2>
                     <div className="grid grid-cols-2 gap-2">
                        {provider.gallery.map((img, i) => (
                           <div key={i} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                              <img src={img} className="w-full h-full object-cover" />
                           </div>
                        ))}
                     </div>
                  </section>
               )}

               <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Contact Provider</h2>
                  <Button className="w-full mb-3 flex items-center justify-center">
                     <MessageCircle size={18} className="mr-2" /> Message
                  </Button>
                  <p className="text-xs text-center text-slate-400">
                     Usually responds within {provider.responseRate || '24 hours'}
                  </p>
               </section>
            </div>
         </div>
      </div>
    </div>
  );
};

export const VerificationIcon: React.FC<{ type: VerificationType, size?: number, className?: string }> = ({ type, size = 16, className }) => {
  switch (type) {
    case 'background_check': return <ShieldCheck size={size} className={`text-blue-500 ${className}`} />;
    case 'first_aid': return <Heart size={size} className={`text-red-500 fill-red-500 ${className}`} />;
    case 'child_safeguarding': return <Shield size={size} className={`text-purple-500 ${className}`} />;
    case 'insurance': return <FileCheck size={size} className={`text-green-500 ${className}`} />;
    default: return <CheckCircle size={size} className={`text-slate-500 ${className}`} />;
  }
};

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
  onProviderClick?: (providerId: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick, onProviderClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Visual Header */}
      <div className="relative h-40">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent"></div>
        <button className="absolute top-3 right-3 p-1.5 bg-black/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
          <Heart size={16} />
        </button>
        
        {/* Type Badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-wider">
           {program.type === 'service' ? 'Service' : 'Program'}
        </span>

        {/* AI Recommended Badge */}
        {program.recommended && (
           <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-secondary/90 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center shadow-lg">
             <Sparkles size={10} className="mr-1"/> Recommended
           </span>
        )}

        {/* Provider Avatar Overlay */}
        <div className="absolute -bottom-6 left-4 flex items-end z-10">
           <div className="relative group/avatar" onClick={(e) => {
              if (onProviderClick && program.providerId) {
                 e.stopPropagation();
                 onProviderClick(program.providerId);
              }
           }}>
             <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
             </div>
             {program.isOnline && (
               <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10" title="Online Now"></div>
             )}
           </div>
        </div>
      </div>

      <div className="pt-8 pb-4 px-4 flex-1 flex flex-col">
        <div className="mb-1 flex justify-between items-start">
           <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{program.title}</h3>
           <div className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded ml-2 shrink-0">
               <Star size={10} className="fill-current mr-1" />
               {program.rating}
           </div>
        </div>
        
        <p 
           className="text-sm text-slate-500 mb-2 font-medium hover:text-primary cursor-pointer transition-colors"
           onClick={(e) => {
              if (onProviderClick && program.providerId) {
                 e.stopPropagation();
                 onProviderClick(program.providerId);
              }
           }}
        >
           {program.provider}
        </p>
        
        {/* Verification Icons Only */}
        <div className="flex gap-1 mb-2">
           {program.verifications.map(type => (
              <div key={type} title={type.replace('_', ' ')} className="bg-slate-50 p-1 rounded-full">
                 <VerificationIcon type={type} size={12} />
              </div>
           ))}
        </div>

        <div className="flex items-center text-xs text-slate-400 mb-4">
          <MapPin size={12} className="mr-1 shrink-0" />
          <span className="truncate">{program.location}</span>
