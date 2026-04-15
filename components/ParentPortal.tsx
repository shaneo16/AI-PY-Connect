
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle, Home, Award, User, Settings, Users, Sparkles, Copy, Share2, Heart as HeartIcon, MessageSquare, FileCheck, Shield, Send, ArrowLeft, Instagram, Globe, PlayCircle, Briefcase, Plus, Video, Mic, MicOff, VideoOff, PhoneOff, UserCheck, Clock, Check, Bell, Mail, FileText, Trophy, ArrowRight, LayoutDashboard, Target, Zap, AlertTriangle, Info, Palette, Dumbbell, Book, Coffee, Car, Smile, Music } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_SCHOOLS, MOCK_BADGES, MOCK_REFERRAL_STATS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_PROVIDERS, PRODUCTS, MOCK_JOBS, TRENDING_SEARCHES } from '../constants';
import { Program, VerificationType, Conversation, ChatMessage, ProviderProfile, Job, ParentGoal, GoalType } from '../types';
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
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-preply transition-all cursor-pointer group flex flex-col md:flex-row h-full md:h-64"
      onClick={onClick}
    >
        <div className="h-48 md:h-full w-full md:w-64 overflow-hidden relative shrink-0">
           <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
           {showBadges && (
               <div className="absolute top-3 left-3 flex flex-col gap-1">
                 {program.verifications.map(type => (
                   <div key={type} className="bg-white/90 backdrop-blur border border-slate-100 p-1.5 rounded-full shadow-sm" title={type.replace('_', ' ')}>
                      <VerificationIcon type={type} size={14} />
                   </div>
                 ))}
               </div>
           )}
        </div>
        <div className="p-6 flex flex-col flex-1 relative">
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider ${
                            program.category === 'Sports' ? 'bg-cyan-50 text-cyan-700' :
                            program.category === 'Arts' ? 'bg-fuchsia-50 text-fuchsia-700' :
                            program.category === 'Music' ? 'bg-amber-50 text-amber-700' :
                            'bg-slate-50 text-slate-600'
                        }`}>{program.category}</span>
                        {program.isOnline && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider flex items-center">
                                <div className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></div> ONLINE
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl leading-tight tracking-tight">{program.title}</h3>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">€{program.price}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per session</div>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div 
                   className="w-10 h-10 rounded-full border border-slate-100 overflow-hidden shadow-sm bg-white hover:scale-110 transition-transform cursor-pointer"
                   onClick={(e) => {
                      if (onProviderClick) {
                          e.stopPropagation();
                          onProviderClick(program.providerId);
                      }
                   }}
                >
                  <img src={program.providerImage} alt={program.provider} className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-sm text-slate-700 font-bold">{program.provider}</p>
                    <div className="flex items-center text-xs text-slate-400">
                        <MapPin size={12} className="mr-1" />
                        <span className="truncate">{program.location}</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                Join our expert instructors for an immersive {program.category.toLowerCase()} experience designed to build confidence and skills in a fun environment.
            </p>

            <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
               <div className="flex items-center gap-4">
                   <div className="flex items-center">
                      <Star size={16} className="text-amber-400 fill-amber-400 mr-1" />
                      <span className="font-bold text-slate-900 text-sm">{program.rating}</span>
                      <span className="text-xs text-slate-400 ml-1">({program.reviews})</span>
                   </div>
                   <div className="flex items-center text-xs text-slate-500 font-medium">
                       <Users size={14} className="mr-1.5 text-slate-400"/>
                       {program.type}
                   </div>
               </div>
               <Button size="sm" variant="primary" className="rounded-full px-6">Book Now</Button>
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
                                   <h1 className="text-3xl font-display uppercase tracking-tight text-slate-900 flex items-center">
                                       {provider.name}
                                       {isPremium && <CheckCircle size={24} className="text-secondary ml-2 fill-current/10" />}
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
                        <h3 className="font-display uppercase tracking-wider text-lg mb-4 text-slate-900 flex items-center">
                            <Shield size={20} className="mr-2 text-primary"/> Safety & Verification
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {provider.verifications.map(v => (
                                <div key={v} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <VerificationIcon type={v as VerificationType} size={20} className="mr-3"/>
                                    <div>
                                        <div className="text-xs font-black uppercase text-slate-900 tracking-tight">{v.replace('_', ' ')}</div>
                                        <div className="text-[10px] text-slate-500">Verified by Klass Hero</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-display uppercase tracking-wider text-lg mb-4 text-slate-900">About Us</h3>
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

interface PlannerActivity {
    id: string;
    title: string;
    childName: string;
    day: number; // 0-6 (Mon-Sun)
    startTime: string; // "HH:mm"
    duration: number; // minutes
    type: 'PROGRAM' | 'CUSTOM';
    icon?: string;
    location?: string;
}

export const ParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'planner' | 'community' | 'chat' | 'settings'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  // Planner State
  const [activities, setActivities] = useState<PlannerActivity[]>([
      { id: 'a1', title: 'Soccer Practice', childName: 'Leo', day: 1, startTime: '16:00', duration: 90, type: 'PROGRAM', location: 'JFK School Pitch' },
      { id: 'a2', title: 'Art Class', childName: 'Emma', day: 2, startTime: '15:30', duration: 60, type: 'PROGRAM', location: 'Kreativ Studio' },
      { id: 'a3', title: 'Swimming', childName: 'Emma', day: 1, startTime: '17:00', duration: 45, type: 'PROGRAM', location: 'Stadtbad Mitte' },
      { id: 'a4', title: 'Piano Lesson', childName: 'Leo', day: 3, startTime: '15:00', duration: 45, type: 'CUSTOM', icon: 'Music', location: 'Home' }
  ]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<PlannerActivity | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Goals State
  const [goals, setGoals] = useState<ParentGoal[]>([
      { id: 'g1', type: 'ATTENDANCE', title: 'Weekly Soccer Attendance', currentValue: 3, targetValue: 4, childName: 'Leo', rewardPoints: 100 },
      { id: 'g2', type: 'FEEDBACK', title: 'Request Feedback Reports', currentValue: 1, targetValue: 2, childName: 'Leo', rewardPoints: 50 }
  ]);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Computed Goals Progress
  const overallGoalProgress = useMemo(() => {
    if (goals.length === 0) return 0;
    const totalCurrent = goals.reduce((acc, g) => acc + (g.currentValue / g.targetValue), 0);
    return Math.round((totalCurrent / goals.length) * 100);
  }, [goals]);

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

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value as GoalType;
    const target = parseInt((form.elements.namedItem('target') as HTMLInputElement).value);
    const child = (form.elements.namedItem('child') as HTMLSelectElement).value;

    const titles: Record<GoalType, string> = {
        ATTENDANCE: 'Class Attendance Target',
        FEEDBACK: 'Request Progress Feedback',
        VARIETY: 'Try New Categories',
        MASTERY: 'Earn Skill Badges'
    };

    const newGoal: ParentGoal = {
        id: `g${Date.now()}`,
        type,
        title: titles[type],
        currentValue: 0,
        targetValue: target,
        childName: child,
        rewardPoints: target * 25
    };

    setGoals([...goals, newGoal]);
    setShowGoalModal(false);
  };

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
                   <div key={i} className="flex items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm min-w-[220px]">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 font-bold text-primaryDark border border-primary/20">
                          {child[0]}
                      </div>
                      <div>
                          <div className="font-bold text-sm text-slate-900 tracking-tight">{child.split(' - ')[0]}</div>
                          <div className="text-[10px] font-semibold text-slate-500 truncate uppercase">{child.split(' - ')[1]}</div>
                      </div>
                   </div>
                ))}
                <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-slate-200 text-slate-400 hover:bg-white hover:border-primary transition-all shrink-0 self-center ml-2">
                    <Plus size={20}/>
                </button>
             </div>

             {/* Safety Verified Banner */}
             <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                 <div className="flex items-center">
                     <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shadow-sm">
                         <ShieldCheck size={28} className="text-primary"/>
                     </div>
                     <div>
                         <h4 className="font-bold text-lg text-slate-900 tracking-tight">Trust & Safety First</h4>
                         <p className="text-sm text-slate-500">All providers on Klass Hero undergo a multi-layered verification process.</p>
                     </div>
                 </div>
                 <Button variant="outline" size="sm" className="rounded-full px-6">Learn More</Button>
             </div>

             {/* Dynamic Weekly Activity Goal */}
             <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-preply relative overflow-hidden border border-slate-100">
                <div className="absolute right-0 top-0 opacity-5 rotate-12 -mr-8 -mt-8"><Trophy size={200} /></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold flex items-center tracking-tight"><Target size={28} className="mr-3 text-primary"/> Progress to Rewards</h2>
                        <span className="font-bold text-4xl text-primary">{overallGoalProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${overallGoalProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-sm text-slate-500 font-medium">
                            {overallGoalProgress === 100 ? "Goal Smashed! Points Awarded!" : "Keep pushing to earn Prime Points!"}
                        </p>
                        <Button size="sm" onClick={() => setShowGoalModal(true)} variant="primary" className="rounded-full px-6">Adjust Goals</Button>
                    </div>
                </div>
             </div>

             {/* Detailed Goals Tracker */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Active Goals</h3>
                    <button onClick={() => setShowGoalModal(true)} className="text-primary hover:underline text-sm font-bold flex items-center"><Plus size={18} className="mr-1"/> Set New Target</button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {goals.map(goal => (
                        <div key={goal.id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl relative group hover:border-primary/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-primary tracking-widest bg-primary/10 px-2 py-1 rounded-md mb-2 inline-block">{goal.childName} • {goal.type}</span>
                                    <h4 className="font-bold text-slate-900 text-lg">{goal.title}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-primary">+{goal.rewardPoints} PTS</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-bold text-slate-600">{goal.currentValue}/{goal.targetValue}</span>
                            </div>
                            <button 
                                onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500"
                            >
                                <X size={18}/>
                            </button>
                        </div>
                    ))}
                    {goals.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <Target size={48} className="mx-auto text-slate-200 mb-3"/>
                            <p className="text-slate-500 font-bold">No active goals set. Start tracking to earn rewards!</p>
                            <Button size="sm" variant="outline" className="mt-4" onClick={() => setShowGoalModal(true)}>Create Your First Goal</Button>
                        </div>
                    )}
                </div>
             </div>

             {/* Achievements */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center tracking-tight"><Award className="mr-3 text-amber-500"/> Family Achievements</h3>
                <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                    {MOCK_BADGES.map(badge => (
                        <div key={badge.id} className="flex flex-col items-center min-w-[120px] text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</div>
                            <div className="font-bold text-sm text-slate-900 mb-1">{badge.name}</div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{badge.earnedDate}</div>
                        </div>
                    ))}
                </div>
             </div>
             
             {/* Recommendations */}
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight"><Sparkles className="mr-3 text-fuchsia-500"/> Recommended for Leo</h3>
                    <div className="flex items-center text-[10px] font-bold uppercase text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                        <Shield size={14} className="mr-1.5 text-primary"/> 100% Vetted Providers
                    </div>
                </div>
                <div className="grid gap-6">
                    {MOCK_PROGRAMS.slice(0,2).map(p => (
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
             <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-preply flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                 <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(15,195,255,0.1),transparent)] pointer-events-none"></div>
                 <div className="relative z-10 max-w-md">
                     <h3 className="text-3xl font-bold flex items-center mb-3 tracking-tight"><Users className="mr-3 text-primary"/> Refer & Earn</h3>
                     <p className="text-slate-400 text-lg mb-6 leading-relaxed">Invite friends and earn Prime Points towards free bookings for your family!</p>
                     <div className="flex items-center gap-8">
                         <div>
                             <div className="font-bold text-3xl text-primary">{MOCK_REFERRAL_STATS.totalReferrals}</div>
                             <div className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Referrals</div>
                         </div>
                         <div className="w-px h-10 bg-slate-800"></div>
                         <div>
                             <div className="font-bold text-3xl text-secondary">{MOCK_REFERRAL_STATS.earnedPoints}</div>
                             <div className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Points</div>
                         </div>
                     </div>
                 </div>
                 <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 w-full md:w-auto min-w-[300px] relative z-10">
                     <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold">Your Hero Code</div>
                     <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/10 mb-4">
                         <code className="font-mono text-xl font-bold text-primary tracking-widest">{MOCK_REFERRAL_STATS.code}</code>
                         <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"><Copy size={20}/></button>
                     </div>
                     <Button size="lg" className="w-full bg-primary hover:bg-primaryDark text-slate-900 font-bold rounded-xl">Copy & Share</Button>
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
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in h-full pb-20">
            {/* Left Sidebar Filters */}
            <aside className="lg:w-64 shrink-0 space-y-8">
                <div>
                   <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Categories</h3>
                   <div className="flex flex-col gap-1">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                            selectedCategory === cat 
                              ? 'bg-primary/10 text-primaryDark font-bold' 
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                          {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>}
                        </button>
                      ))}
                   </div>
                </div>

                <div>
                   <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Trending</h3>
                   <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map(t => (
                          <button 
                            key={t} 
                            onClick={() => setSearchTerm(t)} 
                            className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:border-primary hover:text-primary transition-all shadow-sm"
                          >
                            {t}
                          </button>
                      ))}
                   </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Star size={16} className="text-amber-500 fill-amber-500"/>
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Top Rated</span>
                    </div>
                    <p className="text-[10px] text-amber-600 font-medium">Browse only providers with 4.8+ rating and verified reviews.</p>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search activities, providers, or subjects..." 
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-slate-900 placeholder:text-slate-400 font-medium"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        Showing {filteredPrograms.length} Results
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        Sort by: <span className="text-slate-900 cursor-pointer hover:text-primary">Relevance</span>
                    </div>
                </div>

                <div className="grid gap-6 overflow-y-auto pb-4">
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
                  {filteredPrograms.length === 0 && (
                      <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                          <Search size={48} className="mx-auto text-slate-200 mb-4"/>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
                          <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                          <Button variant="outline" className="mt-6 rounded-full" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>Clear All Filters</Button>
                      </div>
                  )}
                </div>
            </div>
          </div>
        );

      case 'planner':
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const timeToMinutes = (time: string) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };

        const checkConflicts = (activity: PlannerActivity) => {
            return activities.filter(a => {
                if (a.id === activity.id || a.day !== activity.day || a.childName !== activity.childName) return false;
                const start1 = timeToMinutes(activity.startTime);
                const end1 = start1 + activity.duration;
                const start2 = timeToMinutes(a.startTime);
                const end2 = start2 + a.duration;
                return (start1 < end2 && end1 > start2);
            });
        };

        const checkTravelBuffer = (activity: PlannerActivity) => {
            const BUFFER_MINS = 30;
            return activities.filter(a => {
                if (a.id === activity.id || a.day !== activity.day || a.childName !== activity.childName) return false;
                const start1 = timeToMinutes(activity.startTime);
                const end1 = start1 + activity.duration;
                const start2 = timeToMinutes(a.startTime);
                const end2 = start2 + a.duration;
                
                const gapBefore = start1 - end2;
                const gapAfter = start2 - end1;
                
                return (gapBefore >= 0 && gapBefore < BUFFER_MINS) || (gapAfter >= 0 && gapAfter < BUFFER_MINS);
            });
        };

        const handleAddActivity = (e: React.FormEvent) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
            const childName = (form.elements.namedItem('childName') as HTMLSelectElement).value;
            const day = parseInt((form.elements.namedItem('day') as HTMLSelectElement).value);
            const startTime = (form.elements.namedItem('startTime') as HTMLInputElement).value;
            const duration = parseInt((form.elements.namedItem('duration') as HTMLInputElement).value);
            const icon = (form.elements.namedItem('icon') as HTMLSelectElement).value;

            const newActivity: PlannerActivity = {
                id: editingActivity?.id || `a${Date.now()}`,
                title,
                childName,
                day,
                startTime,
                duration,
                type: 'CUSTOM',
                icon,
                location: 'Custom Location'
            };

            if (editingActivity) {
                setActivities(activities.map(a => a.id === editingActivity.id ? newActivity : a));
            } else {
                setActivities([...activities, newActivity]);
            }
            setShowActivityModal(false);
            setEditingActivity(null);
        };

        const handleDragEnd = (event: any, info: any, activity: PlannerActivity) => {
            if (!gridRef.current) return;
            const gridWidth = gridRef.current.offsetWidth;
            const colWidth = gridWidth / 7;
            const xOffset = info.offset.x;
            const dayDelta = Math.round(xOffset / colWidth);
            let newDay = activity.day + dayDelta;
            
            // Clamp to 0-6
            newDay = Math.max(0, Math.min(6, newDay));
            
            if (newDay !== activity.day) {
                setActivities(prev => prev.map(a => a.id === activity.id ? { ...a, day: newDay } : a));
            }
        };

        return (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pb-20">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                    <h2 className="text-3xl font-display uppercase tracking-tight text-slate-900">Parent Planner</h2>
                    <p className="text-slate-500 text-sm font-medium">Coordinate schedules, detect conflicts, and plan travel buffers.</p>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { setEditingActivity(null); setShowActivityModal(true); }} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <Plus size={18} className="mr-2"/> Add Custom Activity
                    </Button>
                    <Button variant="outline" className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <Share2 size={18} className="mr-2"/> Sync Calendar
                    </Button>
                 </div>
             </div>
             
             {/* Legend & Info */}
             <div className="flex flex-wrap gap-4 px-2">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                     <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                     Conflict Detected
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                     <div className="w-3 h-3 bg-amber-50 border border-amber-200 rounded"></div>
                     Travel Buffer Suggestion
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-auto">
                     <Info size={12} className="text-primary"/>
                     Drag activities horizontally to change days
                 </div>
             </div>

             {/* Weekly Grid */}
             <div className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                 <div className="grid grid-cols-7 border-b-4 border-black bg-slate-50">
                     {days.map((day, idx) => (
                         <div key={day} className={`p-4 text-center border-r-2 border-black last:border-r-0 ${new Date().getDay() === (idx + 1) % 7 ? 'bg-primary/10' : ''}`}>
                             <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Day</div>
                             <div className="text-lg font-display uppercase text-slate-900">{day}</div>
                         </div>
                     ))}
                 </div>
                 <div ref={gridRef} className="grid grid-cols-7 min-h-[600px] bg-slate-50/30">
                     {days.map((_, dayIdx) => (
                         <div key={dayIdx} className="border-r-2 border-black last:border-r-0 p-2 space-y-3 relative">
                             {activities.filter(a => a.day === dayIdx).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)).map(activity => {
                                 const conflicts = checkConflicts(activity);
                                 const buffers = checkTravelBuffer(activity);
                                 
                                 return (
                                     <motion.div 
                                        layout
                                        drag="x"
                                        dragConstraints={gridRef}
                                        dragElastic={0.1}
                                        onDragEnd={(e, info) => handleDragEnd(e, info, activity)}
                                        whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                                        key={activity.id}
                                        className={`p-3 rounded-xl border-2 shadow-sm relative group cursor-pointer transition-all ${
                                            activity.childName === 'Leo' ? 'bg-cyan-50 border-cyan-200' : 'bg-fuchsia-50 border-fuchsia-200'
                                        } ${conflicts.length > 0 ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}
                                        onClick={() => { setEditingActivity(activity); setShowActivityModal(true); }}
                                     >
                                         <div className="flex justify-between items-start mb-1">
                                             <div className="flex items-center gap-1.5">
                                                 {activity.icon === 'Music' && <Music size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Palette' && <Palette size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Dumbbell' && <Dumbbell size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Book' && <Book size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Coffee' && <Coffee size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Car' && <Car size={12} className="text-slate-400"/>}
                                                 {activity.icon === 'Smile' && <Smile size={12} className="text-slate-400"/>}
                                                 <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">{activity.childName}</span>
                                             </div>
                                             <span className="text-[10px] font-bold text-slate-500">{activity.startTime}</span>
                                         </div>
                                         <h4 className="font-bold text-xs text-slate-900 leading-tight mb-1">{activity.title}</h4>
                                         <div className="flex items-center text-[9px] text-slate-500 font-medium">
                                             <Clock size={10} className="mr-1"/> {activity.duration}m
                                         </div>

                                         {/* Conflict Warning */}
                                         {conflicts.length > 0 && (
                                             <div className="mt-2 p-1.5 bg-red-100 rounded border border-red-200 flex items-start gap-1.5">
                                                 <AlertTriangle size={10} className="text-red-600 shrink-0 mt-0.5"/>
                                                 <p className="text-[8px] font-bold text-red-700 leading-tight">
                                                     This overlaps with {conflicts[0].childName}'s {conflicts[0].title}
                                                 </p>
                                             </div>
                                         )}

                                         {/* Buffer Suggestion */}
                                         {conflicts.length === 0 && buffers.length > 0 && (
                                             <div className="mt-2 p-1.5 bg-amber-50 rounded border border-amber-200 flex items-start gap-1.5">
                                                 <Car size={10} className="text-amber-600 shrink-0 mt-0.5"/>
                                                 <p className="text-[8px] font-bold text-amber-700 leading-tight">
                                                     Tight gap with {buffers[0].title}. Suggest 30m travel buffer.
                                                 </p>
                                             </div>
                                         )}

                                         <button 
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500"
                                            onClick={(e) => { e.stopPropagation(); setActivities(activities.filter(a => a.id !== activity.id)); }}
                                         >
                                             <X size={10}/>
                                         </button>
                                     </motion.div>
                                 );
                             })}
                             
                             {/* Quick Add Button */}
                             <motion.button 
                                  whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all group"
                                  onClick={() => { setEditingActivity({ id: '', title: '', childName: 'Leo', day: dayIdx, startTime: '12:00', duration: 60, type: 'CUSTOM' }); setShowActivityModal(true); }}
                             >
                                 <Plus size={20} className="mb-1 group-hover:rotate-90 transition-transform duration-300"/>
                                 <span className="text-[10px] font-black uppercase tracking-widest">Add Activity</span>
                             </motion.button>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Activity Modal */}
             {showActivityModal && (
                 <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
                     <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 border-4 border-black">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="text-2xl font-display uppercase tracking-wide">{editingActivity?.id ? 'Edit Activity' : 'Add Activity'}</h2>
                             <button onClick={() => setShowActivityModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
                         </div>
                         <form onSubmit={handleAddActivity} className="space-y-4">
                             <div>
                                 <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Activity Title</label>
                                 <input name="title" required defaultValue={editingActivity?.title} placeholder="e.g. Piano Lesson" className="w-full p-3 border-2 border-slate-100 rounded-xl font-bold text-slate-900" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Child</label>
                                     <select name="childName" defaultValue={editingActivity?.childName} className="w-full p-3 border-2 border-slate-100 rounded-xl bg-white font-bold">
                                         <option value="Leo">Leo</option>
                                         <option value="Emma">Emma</option>
                                     </select>
                                 </div>
                                 <div>
                                     <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Icon</label>
                                     <select name="icon" defaultValue={editingActivity?.icon} className="w-full p-3 border-2 border-slate-100 rounded-xl bg-white font-bold">
                                         <option value="">None</option>
                                         <option value="Music">Music</option>
                                         <option value="Palette">Arts</option>
                                         <option value="Dumbbell">Sports</option>
                                         <option value="Book">Study</option>
                                         <option value="Coffee">Break</option>
                                         <option value="Car">Travel</option>
                                         <option value="Smile">Fun</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="grid grid-cols-3 gap-4">
                                 <div className="col-span-1">
                                     <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Day</label>
                                     <select name="day" defaultValue={editingActivity?.day} className="w-full p-3 border-2 border-slate-100 rounded-xl bg-white font-bold">
                                         {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
                                     </select>
                                 </div>
                                 <div className="col-span-1">
                                     <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Start</label>
                                     <input name="startTime" type="time" required defaultValue={editingActivity?.startTime} className="w-full p-3 border-2 border-slate-100 rounded-xl font-bold" />
                                 </div>
                                 <div className="col-span-1">
                                     <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Mins</label>
                                     <input name="duration" type="number" required defaultValue={editingActivity?.duration || 60} className="w-full p-3 border-2 border-slate-100 rounded-xl font-bold" />
                                 </div>
                             </div>
                             <div className="flex gap-4 pt-4">
                                 <Button variant="ghost" type="button" onClick={() => setShowActivityModal(false)} className="flex-1">Cancel</Button>
                                 <Button type="submit" className="flex-1 bg-primary text-slate-900 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                     {editingActivity?.id ? 'Update' : 'Add to Planner'}
                                 </Button>
                             </div>
                         </form>
                     </div>
                 </div>
             )}

             <div>
                 <h3 className="font-display text-xl text-slate-900 uppercase mb-4">Upcoming This Week</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                     {activities.filter(a => a.day >= new Date().getDay() - 1).slice(0, 4).map(a => (
                         <div key={a.id} className="bg-white p-4 rounded-xl border-2 border-slate-100 flex justify-between items-center hover:border-black transition-all">
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200">
                                     <span className="text-[8px] font-black uppercase text-slate-400">{days[a.day]}</span>
                                     <span className="font-black text-slate-900">{a.startTime.split(':')[0]}</span>
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900 font-display uppercase tracking-wide">{a.title}</h4>
                                     <p className="text-xs text-slate-500 font-medium">{a.childName} • {a.location || 'Berlin'}</p>
                                 </div>
                             </div>
                             <Button size="sm" variant="outline" onClick={() => { setEditingActivity(a); setShowActivityModal(true); }}>Edit</Button>
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
             <div className="lg:w-2/3 space-y-8">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Community Highlights</h2>
                {MOCK_FEED_POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-3xl border border-slate-100 shadow-preply overflow-hidden group">
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={post.providerImage} className="w-12 h-12 rounded-2xl bg-slate-100 object-cover border border-slate-100" alt=""/>
                                <div>
                                    <h4 className="font-bold text-slate-900">{post.providerName}</h4>
                                    <p className="text-xs text-slate-400 font-medium">{post.timeAgo}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className={`rounded-full w-10 h-10 p-0 ${post.liked ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'}`}>
                                <HeartIcon fill={post.liked ? "currentColor" : "none"} size={20}/>
                            </Button>
                        </div>
                        <div className="px-5 pb-5">
                            <img src={post.image} alt="Post" className="w-full aspect-video object-cover rounded-2xl"/>
                        </div>
                        <div className="px-5 pb-6">
                            <div className="flex gap-6 mb-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><HeartIcon size={14} className="text-slate-300"/> {post.likes} likes</span>
                                <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-slate-300"/> {post.comments} comments</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed"><span className="font-bold text-slate-900 mr-2">{post.providerName}</span>{post.caption}</p>
                        </div>
                    </div>
                ))}
             </div>

             {/* Jobs Sidebar */}
             <div className="lg:w-1/3 space-y-6">
                 <div className="flex justify-between items-center mb-4">
                     <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Jobs</h2>
                     <Button size="sm" onClick={() => setShowJobModal(true)} className="rounded-full px-5"><Plus size={16} className="mr-1"/> Post Job</Button>
                 </div>
                 
                 <div className="space-y-4">
                     {jobs.map(job => (
                         <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-preply transition-all">
                             <h4 className="font-bold text-slate-900 text-lg tracking-tight">{job.title}</h4>
                             <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>
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
                               <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.isMe ? 'bg-primary text-slate-900' : 'bg-white border border-slate-200 rounded-tl-none shadow-sm'}`}>
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
                 <h3 className="font-bold text-lg mb-4 flex items-center"><FileText size={20} className="mr-2 text-slate-400"/> Legal & Trust</h3>
                 <div className="space-y-2">
                     <button className="text-sm text-primaryDark hover:underline block">Trust & Safety Standards</button>
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 space-y-6 shrink-0 h-screen sticky top-0">
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-slate-900 font-bold shadow-sm">E</div>
             <span className="text-slate-900 font-bold text-lg tracking-tight">Explorer Hub</span>
          </div>
          <nav className="space-y-1 font-sans">
            <NavSidebarLink icon={<Home size={20} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavSidebarLink icon={<Search size={20} />} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <NavSidebarLink icon={<CalendarIcon size={20} />} label="Planner" active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
            <NavSidebarLink icon={<Users size={20} />} label="Community" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
            <NavSidebarLink icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <NavSidebarLink icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>
        <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary"/>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Klass Rewards</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-wider">You have 600 points available!</p>
            <Button size="sm" className="w-full text-[10px] h-7 bg-primary border-none text-slate-900 font-bold">View Rewards</Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        {renderContent()}
      </main>

      {/* Goal Setting Modal */}
      {showGoalModal && (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 border-4 border-black">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-display uppercase tracking-wide">Set New Goal</h2>
                      <button onClick={() => setShowGoalModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
                  </div>
                  <form onSubmit={handleAddGoal} className="space-y-6">
                      <div>
                          <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Which Child?</label>
                          <select name="child" className="w-full p-3 border-2 border-slate-100 rounded-xl bg-white font-bold text-slate-900">
                              <option value="Leo">Leo</option>
                              <option value="Emma">Emma</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Goal Category</label>
                          <select name="type" className="w-full p-3 border-2 border-slate-100 rounded-xl bg-white font-bold text-slate-900">
                              <option value="ATTENDANCE">Class Attendance</option>
                              <option value="FEEDBACK">Provider Feedback Requests</option>
                              <option value="VARIETY">Explore New Subjects</option>
                              <option value="MASTERY">Skill Mastery (Badges)</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Target Number</label>
                          <input name="target" type="number" defaultValue={4} min={1} className="w-full p-3 border-2 border-slate-100 rounded-xl font-bold text-slate-900" />
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Hit this target to earn Prime Points!</p>
                      </div>
                      <div className="flex gap-4 pt-2">
                          <Button variant="ghost" type="button" onClick={() => setShowGoalModal(false)} className="flex-1">Cancel</Button>
                          <Button type="submit" className="flex-1 bg-primary text-slate-900 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Create Goal</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}

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
                       <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display uppercase tracking-wide">{selectedProgram.title}</h2>
                       <div className="flex items-center text-slate-600 mb-4">
                          <MapPin size={16} className="mr-1" /> {selectedProgram.location}
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <div className="text-3xl font-bold text-primaryDark">€{selectedProgram.price}</div>
                       <div className="text-sm text-slate-400">per session</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl border-2 border-slate-100 cursor-pointer hover:border-black transition-colors" 
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
                       <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">View Provider Profile</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-400"/>
                 </div>

                 {selectedProgram.assignedToName && (
                     <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                         <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                             {selectedProgram.assignedToImage && <img src={selectedProgram.assignedToImage} alt="" className="w-full h-full object-cover"/>}
                         </div>
                         <div>
                             <div className="text-xs font-black uppercase text-slate-500 mb-1 tracking-widest">Your Instructor</div>
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

                    <Button className="w-full py-4 text-lg font-black bg-primary hover:bg-primaryDark text-slate-900 shadow-lg shadow-primary/20 border-2 border-black uppercase tracking-widest">Book Now</Button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showJobModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 border-4 border-black">
                 <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Post a New Job</h2>
                 <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowJobModal(false); }}>
                     <input required placeholder="Job Title (e.g. Math Tutor)" className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold" />
                     <div className="grid grid-cols-2 gap-4">
                         <select className="border-2 border-slate-100 p-3 rounded-xl bg-white font-bold">
                             <option>Education</option>
                             <option>Sports</option>
                             <option>Care</option>
                         </select>
                         <input placeholder="Budget (Optional)" className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold" />
                     </div>
                     <textarea placeholder="Description of needs..." rows={4} className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold" />
                     
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="vidReq" className="rounded text-primary focus:ring-primary w-5 h-5 border-2 border-slate-300"/>
                        <label htmlFor="vidReq" className="text-sm text-slate-700 font-bold">Require Video Interview before hiring</label>
                     </div>

                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowJobModal(false)}>Cancel</Button>
                         <Button type="submit" className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-slate-900 font-black">Post Job</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black flex justify-around p-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
               <span className="text-[10px] mt-1 capitalize font-black tracking-widest">{tab}</span>
            </button>
        ))}
      </div>
    </div>
  );
};

const NavSidebarLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-primary/10 text-primaryDark font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
  >
    <span className={`${active ? 'text-primaryDark' : 'text-slate-400'}`}>{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);
