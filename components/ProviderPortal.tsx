
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  LayoutDashboard, List, Users, TrendingUp, Plus, Edit, Share2, Upload, Send, X, Megaphone, Printer, Download, Clock, Briefcase, MapPin, User, Video, Shield, DollarSign, Rocket, BookOpen, MessageSquare, FileText, Settings, CreditCard, UserPlus, Eye, CheckCircle, AlertTriangle, Search, Filter, Copy, FileCheck, Calendar, Receipt, Lock
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_STUDENTS, MOCK_JOBS, MOCK_EXPENSES, MOCK_TEAM_MEMBERS, MOCK_INVOICES } from '../constants';
import { Button } from './Button';
import { VerificationType, PaymentRouting, Program, TeamMember, Expense, Invoice } from '../types';
import { VerificationIcon, VideoCallModal, ProgramCard } from './ParentPortal';

// --- Upgrade Overlay Component ---
type OverlayProps = {
    title: string;
    description: string;
    targetTier: 'Professional' | 'Business';
    onUpgrade: (tier: 'Professional' | 'Business') => void;
};

const UpgradeOverlay: React.FC<OverlayProps> = ({ title, description, targetTier, onUpgrade }) => (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md border border-slate-200">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-black">
                <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed font-sans">{description}</p>
            <Button onClick={() => onUpgrade(targetTier)} className="w-full py-4 text-lg bg-secondary hover:bg-yellow-300 text-black shadow-xl shadow-secondary/20">
                Upgrade to {targetTier}
            </Button>
        </div>
    </div>
);

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Default to Business for this demo as requested by user
  const [tier, setTier] = useState<'Starter' | 'Professional' | 'Business'>('Business');
  
  // Profile/Business Verification State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isBusinessVerified, setIsBusinessVerified] = useState(true); // Toggle for demo

  // Program Management State
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [previewProgram, setPreviewProgram] = useState<Program | null>(null);
  const [showRosterModal, setShowRosterModal] = useState(false);
  
  // Program List Filtering
  const [programSearchTerm, setProgramSearchTerm] = useState('');
  const [staffFilter, setStaffFilter] = useState('All');
  
  // Team Management State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  // Finance State
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStaffForInvoice, setSelectedStaffForInvoice] = useState<string>('');

  // Chat State
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);

  // Business State
  const [paymentRouting, setPaymentRouting] = useState<PaymentRouting>('POOL');

  // --- Tier Limits Logic ---
  const PROGRAM_LIMITS = {
      'Starter': 2,
      'Professional': 5,
      'Business': 999 // Unlimited
  };

  const hasAccessToTeam = tier === 'Business';
  const hasAccessToFinance = tier === 'Business';
  const hasAccessToAnalytics = tier !== 'Starter';

  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
      const matchesSearch = prog.title.toLowerCase().includes(programSearchTerm.toLowerCase());
      const matchesStaff = staffFilter === 'All' || prog.assignedTo === staffFilter;
      return matchesSearch && matchesStaff;
  });

  const currentProgramCount = filteredPrograms.length; // In real app, this would come from DB count
  const canCreateProgram = currentProgramCount < PROGRAM_LIMITS[tier];

  // Computed Values
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);
  const directMessages = MOCK_CONVERSATIONS.filter(c => !c.isGroup);
  const groupMessages = MOCK_CONVERSATIONS.filter(c => c.isGroup);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    alert(`Message sent: ${newMessage}`);
    setNewMessage('');
  };

  const handleBroadcast = () => {
    const msg = prompt("Enter message to broadcast to all families:");
    if (msg) alert(`Broadcast sent to 45 families!`);
  }

  const handleEditProgram = (program: Program) => {
      setEditingProgram(program);
      setShowCreateProgramModal(true);
  }
  
  const handleDuplicateProgram = (program: Program) => {
      if (!canCreateProgram) {
          alert(`You have reached the limit of ${PROGRAM_LIMITS[tier]} programs for the ${tier} plan.`);
          return;
      }
      const newProgram = { ...program, id: `copy_${Date.now()}`, title: `${program.title} (Copy)`, enrolledCount: 0 };
      setEditingProgram(newProgram);
      setShowCreateProgramModal(true);
  }

  const handleAddMember = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock addition
      const newMember: TeamMember = {
          id: `new_${Date.now()}`,
          name: "New Coach",
          role: "Instructor",
          status: 'Active',
          email: 'new@berlinkickers.de',
          bio: 'Enthusiastic new addition to the team.',
          image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80',
          qualifications: ['First Aid'],
          hourlyRate: 35
      };
      setTeamMembers([...teamMembers, newMember]);
      setShowAddMemberModal(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
      const desc = (form.elements.namedItem('desc') as HTMLInputElement).value;
      const progId = (form.elements.namedItem('progId') as HTMLSelectElement).value;
      const program = MOCK_PROGRAMS.find(p => p.id === progId);

      const newExpense: Expense = {
          id: `e${Date.now()}`,
          amount,
          description: desc,
          date: new Date().toISOString().split('T')[0],
          category: 'Miscellaneous',
          status: 'Pending',
          programId: progId,
          programName: program?.title
      };
      setExpenses([newExpense, ...expenses]);
      setShowExpenseModal(false);
  }

  const handleGenerateInvoice = () => {
      const staff = teamMembers.find(t => t.id === selectedStaffForInvoice);
      if (!staff) return;

      // Mock calculation: 4 weeks * 2 sessions * 2 hours * rate
      const amount = (4 * 2 * 2 * (staff.hourlyRate || 30));
      
      const newInvoice: Invoice = {
          id: `inv${Date.now()}`,
          staffId: staff.id,
          staffName: staff.name,
          amount: amount,
          dateGenerated: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 12096e5).toISOString().split('T')[0],
          status: 'Sent',
          items: [{ description: 'Monthly Coaching Hours (Est)', amount }]
      };
      setInvoices([newInvoice, ...invoices]);
      setShowInvoiceModal(false);
  }

  // Schedule Logic
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const scheduleEvents = [
     { id: 'ev1', title: 'Junior Soccer Academy', day: 'Tue', time: '16:00', duration: '90m', category: 'Sports', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
     { id: 'ev2', title: 'Creative Art Workshop', day: 'Wed', time: '15:30', duration: '120m', category: 'Arts', color: 'bg-fuchsia-100 text-secondary border-fuchsia-200' },
     { id: 'ev3', title: 'Piano for Beginners', day: 'Thu', time: '14:00', duration: '45m', category: 'Music', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 relative">
      {/* Video Call Overlay */}
      {showVideoCall && <VideoCallModal onClose={() => setShowVideoCall(false)} />}

      {/* Program Preview Overlay */}
      {previewProgram && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreviewProgram(null)}>
              <div className="max-w-sm w-full" onClick={e => e.stopPropagation()}>
                  <div className="bg-white p-2 rounded-t-xl flex justify-between items-center border-b">
                      <span className="font-bold text-sm">Parent View Preview</span>
                      <button onClick={() => setPreviewProgram(null)}><X size={18}/></button>
                  </div>
                  <ProgramCard program={previewProgram} onClick={() => {}} />
              </div>
          </div>
      )}

      {/* Provider Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-6 shrink-0 overflow-y-auto">
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
             <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-slate-900 font-bold shadow shadow-secondary/50">P</div>
             <span className="text-white font-bold text-lg tracking-tight">Prime Business</span>
          </div>
          <nav className="space-y-1 font-sans">
            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarLink icon={<Briefcase size={20} />} label="Team & Profiles" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
            <SidebarLink icon={<List size={20} />} label="My Programs" active={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
            <SidebarLink icon={<DollarSign size={20} />} label="Finances" active={activeTab === 'finances'} onClick={() => setActiveTab('finances')} />
            <SidebarLink icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <SidebarLink icon={<TrendingUp size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          </nav>
        </div>
        
        {/* Tier Simulation Toggle */}
        <div className="mt-auto pt-6 border-t border-slate-800 font-sans">
           <p className="text-xs text-slate-500 mb-2 font-bold uppercase">Plan Tier</p>
           <div className="space-y-2">
              <button onClick={() => setTier('Business')} className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${tier === 'Business' ? 'bg-primary text-slate-900 font-bold' : 'hover:bg-slate-800'}`}>Business Plus (€48)</button>
              <button onClick={() => setTier('Professional')} className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${tier === 'Professional' ? 'bg-secondary text-slate-900 font-bold' : 'hover:bg-slate-800'}`}>Professional (€8)</button>
              <button onClick={() => setTier('Starter')} className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${tier === 'Starter' ? 'bg-slate-600 text-white font-bold' : 'hover:bg-slate-800'}`}>Starter (Free)</button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative mb-16 lg:mb-0 font-sans">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Berlin Kickers Dashboard</h1>
            <div className="flex items-center space-x-2 mt-1">
               <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide text-white ${tier === 'Starter' ? 'bg-slate-500' : tier === 'Professional' ? 'bg-secondary text-black' : 'bg-cyan-600'}`}>
                  {tier} Plan
               </span>
               {isBusinessVerified ? (
                   <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                       <CheckCircle size={12} className="mr-1"/> Verified Business
                   </span>
               ) : (
                   <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer" onClick={() => setIsBusinessVerified(true)}>
                       <AlertTriangle size={12} className="mr-1"/> Verification Pending
                   </span>
               )}
            </div>
          </div>
          {(activeTab === 'overview' || activeTab === 'programs') && (
            <div className="flex items-center gap-4">
                 {/* Inventory Usage Indicator */}
                 <div className="hidden md:block text-right">
                     <div className="text-[10px] font-bold uppercase text-slate-400">Program Slots</div>
                     <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full ${currentProgramCount >= PROGRAM_LIMITS[tier] ? 'bg-red-500' : 'bg-primary'}`} style={{width: `${Math.min((currentProgramCount / PROGRAM_LIMITS[tier]) * 100, 100)}%`}}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">{currentProgramCount}/{tier === 'Business' ? '∞' : PROGRAM_LIMITS[tier]}</span>
                     </div>
                 </div>

                <Button 
                    onClick={() => { 
                        if (canCreateProgram) {
                            setEditingProgram(null); 
                            setShowCreateProgramModal(true); 
                        } else {
                            // In a real app, open upgrade modal
                            alert(`You have reached the limit of ${PROGRAM_LIMITS[tier]} programs for the ${tier} plan. Please upgrade to add more.`);
                        }
                    }}
                    className={`hidden md:flex items-center gap-2 border-none shadow-lg ${canCreateProgram ? 'bg-secondary text-black hover:bg-yellow-300' : 'bg-slate-300 cursor-not-allowed'}`}
                    disabled={!isBusinessVerified}
                >
                    {canCreateProgram ? <><Plus size={18} /> New Program</> : 'Limit Reached'}
                </Button>
            </div>
          )}
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in">
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {PROVIDER_STATS.map((stat) => (
                    <div key={stat.name} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
                      <div className="text-xs md:text-sm font-medium text-slate-500 mb-1">{stat.name}</div>
                      <div className="text-xl md:text-2xl font-bold text-slate-900">{stat.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                
                {/* Profile Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Business Profile</h2>
                            <p className="text-xs text-slate-500">This is your main business identity. Verification is required to list programs.</p>
                        </div>
                        {!isEditingProfile && (
                            <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(true)}>
                                <Edit size={16} className="mr-2"/> Edit Profile
                            </Button>
                        )}
                    </div>
                    
                    {!isEditingProfile ? (
                        <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-100 shadow-sm overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Berlin Kickers</h3>
                                <p className="text-lg text-slate-500 mb-4">Professional Youth Soccer Coaching</p>
                                <div className="flex flex-wrap gap-2">
                                    {['business_registration', 'insurance'].map(v => (
                                        <div key={v} className="flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                            <VerificationIcon type={v as VerificationType} size={14} className="mr-1" />
                                            {v.replace('_', ' ').toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                        Business Name
                                    </label>
                                    <input type="text" defaultValue="Berlin Kickers" className="w-full p-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                        Business Logo
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 p-2 border rounded-lg bg-slate-50 text-slate-400 text-sm truncate">logo.png</div>
                                        <Button size="sm" variant="outline">Upload</Button>
                                    </div>
                                    <p className="text-[10px] text-primaryDark mt-1">This logo will be stamped on all your programs.</p>
                                </div>
                            </div>
                            
                            <textarea defaultValue="Bio..." className="w-full p-2 border rounded-lg" rows={3}/>
                            
                            {/* Verification Uploads */}
                            <div className="border-t border-slate-100 pt-4 mt-4">
                                <h4 className="font-bold text-sm mb-3">Verification Documents (Admin Approval Required)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                                        <Upload className="mx-auto text-slate-400 mb-2" size={20}/>
                                        <span className="text-xs text-slate-500">Business Registration</span>
                                    </div>
                                    <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                                        <Upload className="mx-auto text-slate-400 mb-2" size={20}/>
                                        <span className="text-xs text-slate-500">Liability Insurance</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">Uploading new documents will set your account to "Pending Verification".</p>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                                <Button onClick={() => { setIsEditingProfile(false); setIsBusinessVerified(false); }}>Save & Submit for Verification</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* TEAM & PROFILES TAB */}
        {activeTab === 'team' && (
            <div className="space-y-8 relative animate-in fade-in">
                {/* GUARDRAIL */}
                {!hasAccessToTeam && (
                    <UpgradeOverlay 
                        title="Team Management is Locked" 
                        description="Manage your staff, assign instructors to classes, and track hours. This feature is available on the Business plan."
                        targetTier="Business"
                        onUpgrade={setTier}
                    />
                )}
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Team & Provider Profiles</h2>
                        <p className="text-slate-500">Create profiles for your staff. These will be visible to parents when assigned to programs.</p>
                    </div>
                    <Button onClick={() => setShowAddMemberModal(true)} className="bg-primary hover:bg-primaryDark text-slate-900 font-bold"><UserPlus size={18} className="mr-2"/> Add Team Member</Button>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="h-32 bg-slate-100 relative">
                                <img src={member.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover opacity-80" alt={member.name}/>
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-bold text-slate-700">{member.role}</div>
                            </div>
                            <div className="p-6 pt-12 relative flex-1 flex flex-col">
                                <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-full border-4 border-white shadow-md overflow-hidden">
                                     <img src={member.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" alt={member.name}/>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">{member.email}</p>
                                <p className="text-sm text-slate-600 mb-4 flex-1">{member.bio || "No bio added."}</p>
                                
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {member.qualifications?.map((q, i) => (
                                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">{q}</span>
                                    ))}
                                </div>
                                <div className="flex items-center text-xs text-slate-500 mb-4">
                                    <DollarSign size={14} className="mr-1"/> Rate: €{member.hourlyRate}/hr
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-slate-100">
                                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50"><X size={16}/></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add New Placeholder */}
                    <button onClick={() => setShowAddMemberModal(true)} className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-cyan-50 transition-all min-h-[300px]">
                        <UserPlus size={48} className="mb-4"/>
                        <span className="font-bold">Add New Profile</span>
                    </button>
                </div>
            </div>
        )}

        {/* MY PROGRAMS TAB */}
        {activeTab === 'programs' && (
             <div className="space-y-8 animate-in fade-in">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-lg font-bold text-slate-900">Program Inventory</h3>
                    
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                            <input 
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full md:w-64" 
                                placeholder="Search by name..."
                                value={programSearchTerm}
                                onChange={(e) => setProgramSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                            <select 
                                className="pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm w-full md:w-auto bg-white appearance-none cursor-pointer"
                                value={staffFilter}
                                onChange={(e) => setStaffFilter(e.target.value)}
                            >
                                <option value="All">All Staff</option>
                                {teamMembers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <Button 
                            onClick={() => { 
                                if(canCreateProgram) { 
                                    setEditingProgram(null); 
                                    setShowCreateProgramModal(true); 
                                } else {
                                    alert('Limit reached. Please upgrade.');
                                }
                            }} 
                            size="sm" 
                            className={`md:hidden ${!canCreateProgram && 'opacity-50'}`}
                            disabled={!canCreateProgram}
                        >
                            <Plus size={16}/>
                        </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[800px]">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Program Name</th>
                            <th className="px-6 py-3">Assigned Staff</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Enrollment</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filteredPrograms.map((prog) => (
                            <tr key={prog.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">
                                <div>{prog.title}</div>
                                <div className="text-xs text-slate-400">{prog.category} • €{prog.price}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
                                        <img src={teamMembers.find(t => t.id === prog.assignedTo)?.image || "https://via.placeholder.com/50"} alt="" className="w-full h-full object-cover"/>
                                    </div>
                                    <span className="text-sm truncate max-w-[120px]">{teamMembers.find(t => t.id === prog.assignedTo)?.name || 'Unassigned'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary" 
                                            style={{ width: `${((prog.enrolledCount || 0) / (prog.maxSpots || 20)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-slate-500">{prog.enrolledCount}/{prog.maxSpots || 20}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end space-x-1">
                                <button onClick={() => setPreviewProgram(prog)} className="p-2 text-slate-400 hover:text-primary hover:bg-cyan-50 rounded" title="Preview"><Eye size={16}/></button>
                                <button onClick={() => setShowRosterModal(true)} className="p-2 text-slate-400 hover:text-secondary hover:bg-fuchsia-50 rounded" title="View Roster"><Users size={16}/></button>
                                <button onClick={() => handleEditProgram(prog)} className="p-2 text-slate-400 hover:text-secondary hover:bg-fuchsia-50 rounded" title="Edit"><Edit size={16}/></button>
                                <button onClick={() => handleDuplicateProgram(prog)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded" title="Duplicate"><Copy size={16}/></button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="p-4 border-b border-slate-200"><h2 className="text-xl font-bold">Weekly Schedule</h2></div>
                    <div className="flex overflow-x-auto divide-x divide-slate-200">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="flex flex-col min-w-[120px] p-2">
                                <div className="text-center font-bold text-slate-700 mb-2">{day}</div>
                                <div className="space-y-2">
                                    {scheduleEvents.filter(e => e.day === day).map(event => (
                                        <div key={event.id} className={`p-2 rounded border text-xs ${event.color}`}>{event.title}<br/>{event.time}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* FINANCES TAB */}
        {activeTab === 'finances' && (
            <div className="space-y-8 relative animate-in fade-in">
                {/* GUARDRAIL */}
                {!hasAccessToFinance && (
                    <UpgradeOverlay 
                        title="Financial Suite Locked" 
                        description="Track expenses per program, generate invoices for staff, and manage payouts. Upgrade to Business Plus to access these tools."
                        targetTier="Business"
                        onUpgrade={setTier}
                    />
                )}

                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Financial Suite</h2>
                        <p className="text-slate-500">Manage program expenses and team invoicing.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setShowInvoiceModal(true)} variant="outline"><Receipt size={16} className="mr-2"/> Create Invoice</Button>
                        <Button onClick={() => setShowExpenseModal(true)} className="bg-secondary text-black hover:bg-yellow-300"><Plus size={16} className="mr-2"/> Log Expense</Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Expense Tracking */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center"><DollarSign size={18} className="mr-2 text-red-500"/> Program Expenses</h3>
                            <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded">Last 30 Days</span>
                        </div>
                        <div className="flex-1 overflow-auto max-h-[400px]">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs text-slate-500 bg-slate-50 uppercase sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Program</th>
                                        <th className="px-4 py-2">Expense</th>
                                        <th className="px-4 py-2 text-right">Amount</th>
                                        <th className="px-4 py-2 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {expenses.map(e => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-3">
                                                <div className="font-bold text-slate-800">{e.programName || 'General'}</div>
                                                <div className="text-xs text-slate-400">{e.date}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-slate-600">{e.description}</div>
                                                <div className="text-[10px] bg-slate-100 px-1 rounded w-fit">{e.category}</div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-slate-900">€{e.amount}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${e.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {e.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Invoices */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center"><FileText size={18} className="mr-2 text-primaryDark"/> Staff Invoices</h3>
                            <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded">Outgoing</span>
                        </div>
                        <div className="flex-1 overflow-auto max-h-[400px]">
                             <table className="w-full text-left text-sm">
                                <thead className="text-xs text-slate-500 bg-slate-50 uppercase sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Staff</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2 text-right">Total</th>
                                        <th className="px-4 py-2 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {invoices.map(inv => (
                                        <tr key={inv.id}>
                                            <td className="px-4 py-3 font-bold text-slate-800">{inv.staffName}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{inv.dateGenerated}</td>
                                            <td className="px-4 py-3 text-right font-bold text-slate-900">€{inv.amount}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )}
        
        {/* Messages Tab */}
        {activeTab === 'chat' && (
            <div className="flex flex-col md:flex-row h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in">
                <div className="md:w-72 border-r border-slate-200 flex flex-col">
                    <div className="p-4 font-bold border-b border-slate-100">Conversations</div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase">Groups</div>
                        {groupMessages.map(c => (
                            <div key={c.id} onClick={() => setActiveConversationId(c.id)} className={`p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 ${activeConversationId === c.id ? 'bg-cyan-50' : ''}`}>
                                <Users size={16} className="text-slate-400"/>
                                <span className="text-sm font-medium truncate">{c.participantName}</span>
                            </div>
                        ))}
                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase mt-2">Direct</div>
                        {directMessages.map(c => (
                            <div key={c.id} onClick={() => setActiveConversationId(c.id)} className={`p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 ${activeConversationId === c.id ? 'bg-cyan-50' : ''}`}>
                                <User size={16} className="text-slate-400"/>
                                <span className="text-sm font-medium truncate">{c.participantName}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold">{activeConversation?.participantName}</h3>
                        <div className="flex gap-2">
                             {activeConversation?.isGroup && (
                                 <Button size="sm" onClick={handleBroadcast} className="bg-secondary hover:bg-yellow-300 text-black"><Megaphone size={16} className="mr-1"/> Broadcast</Button>
                             )}
                             <Button size="sm" variant="outline" onClick={() => setShowVideoCall(true)}><Video size={16}/></Button>
                        </div>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {activeConversation?.messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.isMe ? 'bg-primary text-slate-900' : 'bg-slate-100'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2">
                        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1 border rounded-full px-4 py-2 text-sm" placeholder="Type a message..." />
                        <Button type="submit" size="sm" className="rounded-full"><Send size={16}/></Button>
                    </form>
                </div>
            </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
             <div className="space-y-8 relative animate-in fade-in">
                {/* GUARDRAIL */}
                {!hasAccessToAnalytics && (
                    <UpgradeOverlay 
                        title="Advanced Analytics Locked" 
                        description="Unlock detailed insights into your revenue, bookings, and growth trends. Upgrade to the Professional plan to see your data."
                        targetTier="Professional"
                        onUpgrade={setTier}
                    />
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-slate-900">Analytics & Growth</h2>
                   <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hidden md:flex"><Printer size={16} className="mr-2"/> Print Report</Button>
                      <Button variant="outline" size="sm" className="hidden md:flex"><Download size={16} className="mr-2"/> Download CSV</Button>
                   </div>
                </div>
                
                {/* Charts */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Revenue vs Expenses</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ANALYTICS_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#0cf2f2" name="Revenue" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center"><DollarSign className="mr-2 text-green-500"/> Profit & Loss</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Revenue (YTD)</span>
                                <span className="font-bold text-slate-900">€{ANALYTICS_DATA.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Expenses</span>
                                <span className="font-bold text-red-500">-€{ANALYTICS_DATA.reduce((acc, curr) => acc + (curr.expenses || 0), 0).toLocaleString()}</span>
                            </div>
                            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                                <span className="font-bold text-slate-900">Net Profit</span>
                                <span className="font-bold text-green-600 text-lg">
                                    €{(ANALYTICS_DATA.reduce((acc, curr) => acc + curr.revenue, 0) - ANALYTICS_DATA.reduce((acc, curr) => acc + (curr.expenses || 0), 0)).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {['overview', 'programs', 'finances', 'chat', 'analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center w-full py-1 ${activeTab === tab ? 'text-secondary' : 'text-slate-400'}`}
            >
               {tab === 'overview' && <LayoutDashboard size={22} />}
               {tab === 'programs' && <List size={22} />}
               {tab === 'finances' && <DollarSign size={22} />}
               {tab === 'chat' && <MessageSquare size={22} />}
               {tab === 'analytics' && <TrendingUp size={22} />}
               <span className="text-[10px] mt-1 capitalize">{tab}</span>
            </button>
        ))}
      </div>

      {/* Roster Modal */}
      {showRosterModal && (
         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg h-[80vh] flex flex-col">
               <div className="p-4 border-b flex justify-between">
                  <h3 className="font-bold">Class Roster</h3>
                  <button onClick={() => setShowRosterModal(false)}><X size={20}/></button>
               </div>
               <div className="flex-1 p-4 overflow-y-auto">
                   {MOCK_STUDENTS.map(s => (
                       <div key={s.id} className="flex justify-between p-3 border-b">
                           <div><div className="font-bold">{s.name}</div><div className="text-xs text-slate-500">{s.parentName}</div></div>
                           <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded h-fit">{s.status}</span>
                       </div>
                   ))}
               </div>
            </div>
         </div>
      )}

      {/* Add Team Member Modal */}
      {showAddMemberModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
                 <form className="space-y-4" onSubmit={handleAddMember}>
                     <div className="grid grid-cols-2 gap-4">
                         <input required placeholder="Full Name" className="w-full border p-2 rounded" />
                         <input required placeholder="Role (e.g. Head Coach)" className="w-full border p-2 rounded" />
                     </div>
                     <input required type="email" placeholder="Email Address" className="w-full border p-2 rounded" />
                     <div className="grid grid-cols-2 gap-4">
                        <input required type="number" placeholder="Hourly Rate (€)" className="w-full border p-2 rounded" />
                        <div className="flex items-center text-xs text-slate-500">For invoice calculation</div>
                     </div>
                     <textarea placeholder="Bio (Visible to parents)" rows={3} className="w-full border p-2 rounded" />
                     
                     <div className="border-t border-slate-100 pt-3">
                        <label className="text-xs font-bold text-slate-500">Qualifications</label>
                        <div className="flex gap-2 mt-2">
                            <label className="flex items-center text-sm"><input type="checkbox" className="mr-1"/> First Aid</label>
                            <label className="flex items-center text-sm"><input type="checkbox" className="mr-1"/> Child Safeguarding</label>
                        </div>
                     </div>
                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowAddMemberModal(false)}>Cancel</Button>
                         <Button type="submit">Create Profile</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">Log Program Expense</h2>
                 <form className="space-y-4" onSubmit={handleAddExpense}>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Select Program</label>
                        <select name="progId" className="w-full border p-2 rounded bg-white">
                            {MOCK_PROGRAMS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <input required name="amount" type="number" placeholder="Amount (€)" className="w-full border p-2 rounded" />
                         <input required type="date" className="w-full border p-2 rounded" defaultValue={new Date().toISOString().split('T')[0]} />
                     </div>
                     <input required name="desc" placeholder="Description (e.g. Art Supplies)" className="w-full border p-2 rounded" />
                     
                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowExpenseModal(false)}>Cancel</Button>
                         <Button type="submit">Log Expense</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}

      {/* Create Invoice Modal */}
      {showInvoiceModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">Generate Staff Invoice</h2>
                 <div className="space-y-4">
                     <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-4">
                         <p>Select a staff member to auto-calculate their hours based on assigned classes.</p>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Select Staff Member</label>
                        <select 
                            className="w-full border p-2 rounded bg-white"
                            onChange={(e) => setSelectedStaffForInvoice(e.target.value)}
                            value={selectedStaffForInvoice}
                        >
                            <option value="">-- Select --</option>
                            {teamMembers.map(t => <option key={t.id} value={t.id}>{t.name} (Rate: €{t.hourlyRate}/hr)</option>)}
                        </select>
                     </div>
                     
                     {selectedStaffForInvoice && (
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <div className="flex justify-between mb-2">
                                 <span className="text-sm text-slate-600">Assigned Classes:</span>
                                 <span className="font-bold">4</span>
                             </div>
                             <div className="flex justify-between mb-2">
                                 <span className="text-sm text-slate-600">Est. Hours (Month):</span>
                                 <span className="font-bold">16 hrs</span>
                             </div>
                             <div className="border-t border-slate-200 pt-2 flex justify-between">
                                 <span className="font-bold text-slate-900">Total Payable:</span>
                                 <span className="font-bold text-xl text-primaryDark">€{16 * (teamMembers.find(t => t.id === selectedStaffForInvoice)?.hourlyRate || 30)}</span>
                             </div>
                         </div>
                     )}

                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowInvoiceModal(false)}>Cancel</Button>
                         <Button onClick={handleGenerateInvoice} disabled={!selectedStaffForInvoice}>Generate & Send</Button>
                     </div>
                 </div>
             </div>
          </div>
      )}

      {/* Create/Edit Program Modal */}
      {showCreateProgramModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">{editingProgram ? (editingProgram.title.includes('Copy') ? 'Duplicate Program' : 'Edit Program') : 'Create New Program'}</h2>
                 <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCreateProgramModal(false); alert('Saved!'); }}>
                     <input required placeholder="Program Title" defaultValue={editingProgram?.title} className="w-full border p-2 rounded" />
                     <div className="grid grid-cols-2 gap-4">
                         <select className="border p-2 rounded" defaultValue={editingProgram?.category}>
                             <option>Sports</option>
                             <option>Arts</option>
                             <option>Music</option>
                             <option>Camps</option>
                         </select>
                         <input required placeholder="Price (€)" type="number" defaultValue={editingProgram?.price} className="w-full border p-2 rounded" />
                     </div>
                     
                     {/* Business Tier: Assign to Team Member */}
                     {hasAccessToTeam ? (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                             <label className="text-xs font-bold text-slate-500 mb-1 block">Assign to Provider Profile</label>
                             <p className="text-[10px] text-slate-400 mb-2">Parents will see this profile listed as the instructor.</p>
                             <select className="w-full border p-2 rounded bg-white" defaultValue={editingProgram?.assignedTo}>
                                 <option value="">-- Select Instructor --</option>
                                 {teamMembers.map(w => <option key={w.id} value={w.id}>{w.name} - {w.role}</option>)}
                             </select>
                        </div>
                     ) : (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 opacity-50 cursor-not-allowed">
                             <label className="text-xs font-bold text-slate-500 mb-1 block">Assign to Provider Profile</label>
                             <p className="text-xs text-slate-500 italic">Available on Business Plan</p>
                        </div>
                     )}

                     <textarea placeholder="Description" rows={3} className="w-full border p-2 rounded" />
                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowCreateProgramModal(false)}>Cancel</Button>
                         <Button type="submit">Save</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-secondary text-black font-medium shadow-lg shadow-secondary/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);