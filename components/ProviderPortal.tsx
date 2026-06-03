
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  LayoutDashboard, List, Users, TrendingUp, Plus, Edit, Share2, Upload, Send, X, Megaphone, Printer, Download, Clock, Briefcase, MapPin, User, Video, Shield, DollarSign, Rocket, BookOpen, MessageSquare, FileText, Settings, CreditCard, UserPlus, Eye, CheckCircle, AlertTriangle, Search, Filter, Copy, FileCheck, Calendar, Receipt, Lock, Info, Award
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_CONVERSATIONS, MOCK_STUDENTS, MOCK_EXPENSES, MOCK_TEAM_MEMBERS, MOCK_INVOICES } from '../constants';
import { Button } from './Button';
import { VerificationType, PaymentRouting, Program, TeamMember, Expense, Invoice } from '../types';
import { VerificationIcon, VideoCallModal, ProgramCard } from './ParentPortal';



export const ProviderPortal: React.FC = () => {
   const [activeTab, setActiveTab] = useState('overview');
   const [bookingsAmount, setBookingsAmount] = useState<number>(2850);
   const [isEarlyAdopter, setIsEarlyAdopter] = useState<boolean>(true);
   const [showEarningsModal, setShowEarningsModal] = useState<boolean>(false);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isBusinessVerified, setIsBusinessVerified] = useState(true);

  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [previewProgram, setPreviewProgram] = useState<Program | null>(null);
  const [showRosterModal, setShowRosterModal] = useState(false);
  
  const [programSearchTerm, setProgramSearchTerm] = useState('');
  const [staffFilter, setStaffFilter] = useState('All');
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStaffForInvoice, setSelectedStaffForInvoice] = useState<string>('');

  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);

  const hasAccessToTeam = true;
  const hasAccessToFinance = true;

  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
      const matchesSearch = prog.title.toLowerCase().includes(programSearchTerm.toLowerCase());
      const matchesStaff = staffFilter === 'All' || prog.assignedTo === staffFilter;
      return matchesSearch && matchesStaff;
  });

  const currentProgramCount = filteredPrograms.length;
  const canCreateProgram = true;

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
      const newProgram = { ...program, id: `copy_${Date.now()}`, title: `${program.title} (Copy)`, enrolledCount: 0 };
      setEditingProgram(newProgram);
      setShowCreateProgramModal(true);
  }

  const handleAddMember = (e: React.FormEvent) => {
      e.preventDefault();
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

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const scheduleEvents = [
     { id: 'ev1', title: 'Junior Soccer Academy', day: 'Tue', time: '16:00', duration: '90m', category: 'Sports', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
     { id: 'ev2', title: 'Creative Art Workshop', day: 'Wed', time: '15:30', duration: '120m', category: 'Arts', color: 'bg-fuchsia-100 text-secondary border-fuchsia-200' },
     { id: 'ev3', title: 'Piano for Beginners', day: 'Thu', time: '14:00', duration: '45m', category: 'Music', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  ];

  const totalRevenue = ANALYTICS_DATA.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = ANALYTICS_DATA.reduce((acc, curr) => acc + (curr.expenses || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 relative">
      {showVideoCall && <VideoCallModal onClose={() => setShowVideoCall(false)} />}

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

      {showEarningsModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setShowEarningsModal(false)}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200 text-left" onClick={e => e.stopPropagation()}>
                  {/* Header */}
                  <div className="p-6 bg-slate-900 text-white flex justify-between items-center relative">
                      <div>
                          <h2 className="text-xl font-bold font-sans flex items-center gap-2">
                              <Award size={20} className="text-yellow-400 shrink-0" />
                              Earnings progress
                          </h2>
                          <p className="text-xs text-slate-300 mt-1 font-sans">Track your monthly bookings volume milestones and unlock lower commission tiers.</p>
                      </div>
                      <button 
                          onClick={() => setShowEarningsModal(false)}
                          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border-none"
                      >
                          <X size={20} />
                      </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                      
                      {/* Overall Progress Stat Ring / Card */}
                      <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest">Active Performance Level</span>
                              <div className="text-lg font-bold text-slate-900 leading-tight font-sans">Level 2 – Early Adopter <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 ml-1">Grandfathered Baseline</span></div>
                              <p className="text-xs text-slate-500">Your base rate is locked at <strong className="text-slate-800 font-bold">18%</strong> (normally 22% for new accounts).</p>
                          </div>
                      </div>

                      {/* Gamified Tier Map */}
                      <div>
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-mono">Commission Milestone Levels</h3>
                          <div className="space-y-4">
                              {/* Tier 1 */}
                              <div className="flex gap-4 relative">
                                  {/* Line connector */}
                                  <div className="absolute top-6 bottom-0 left-4 w-0.5 bg-slate-200"></div>
                                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold font-mono z-10 shrink-0">
                                      01
                                  </div>
                                  <div className="flex-1 bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                                      <div>
                                          <h4 className="text-sm font-bold text-slate-500 line-through">Standard Partner Tier</h4>
                                          <p className="text-[10px] text-slate-400">Regular account base rate is 22%</p>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-sm font-medium text-slate-400 font-mono">22% Rate</div>
                                          <span className="text-[9px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">Bypassed</span>
                                      </div>
                                  </div>
                              </div>

                              {/* Tier 2 */}
                              <div className="flex gap-4 relative">
                                  <div className="absolute top-6 bottom-0 left-4 w-0.5 bg-slate-200"></div>
                                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-green-100 text-white flex items-center justify-center text-xs font-bold font-mono z-10 shrink-0">
                                      02
                                  </div>
                                  <div className="flex-1 bg-green-50/20 p-4 rounded-xl border border-green-200 flex justify-between items-center">
                                      <div>
                                          <h4 className="text-sm font-bold text-green-950 flex items-center gap-1.5">
                                              Early Adopter Status
                                              <span className="relative flex h-2 w-2">
                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                              </span>
                                          </h4>
                                          <p className="text-[10px] text-green-700">Permanent baseline safeguard</p>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-sm font-bold text-green-900 font-mono">18% Rate</div>
                                          <span className="text-[9px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded font-bold">Active Now</span>
                                      </div>
                                  </div>
                              </div>

                              {/* Tier 3 */}
                              <div className="flex gap-4 relative">
                                  <div className="absolute top-6 bottom-0 left-4 w-0.5 bg-slate-200"></div>
                                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 flex items-center justify-center text-xs font-bold font-mono z-10 shrink-0">
                                      03
                                  </div>
                                  <div className="flex-1 bg-indigo-50/25 p-4 rounded-xl border border-indigo-200 flex justify-between items-center">
                                      <div>
                                          <h4 className="text-sm font-bold text-indigo-950">Pro Achiever Milestone</h4>
                                          <p className="text-[10px] text-indigo-700">Unlocks when monthly GMV reaches €4,000</p>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-sm font-bold text-indigo-900 font-mono">12% Rate</div>
                                          <span className="text-[9px] text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded font-bold">71% Earned</span>
                                      </div>
                                  </div>
                              </div>

                              {/* Tier 4 */}
                              <div className="flex gap-4">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold font-mono z-10 shrink-0">
                                      04
                                  </div>
                                  <div className="flex-1 bg-slate-50/30 p-4 rounded-xl border border-slate-150 flex justify-between items-center opacity-65">
                                      <div>
                                          <h4 className="text-sm font-bold text-slate-700">Premier Elite Milestone</h4>
                                          <p className="text-[10px] text-slate-400 font-normal">Unlocks when monthly GMV reaches €8,000</p>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-sm font-bold text-slate-650 font-mono">8% Rate</div>
                                          <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-bold">Locked</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Real tips block */}
                      <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/50 flex gap-3">
                          <Info className="text-amber-600 shrink-0 mt-0.5" size={18} />
                          <div>
                              <h4 className="text-xs font-bold text-amber-900">How to level up this month</h4>
                              <p className="text-[11px] text-amber-700 mt-1 leading-relaxed text-left">
                                  You are only <strong className="text-amber-905 font-bold">€1,150</strong> away from unlocking the <strong className="font-bold text-amber-905">12% commission level</strong>! Sharing your direct enrollment links in team communications or newsletters typically boosts bookings by over 30% and can get you over the line.
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-slate-50 border-t flex justify-end">
                      <Button onClick={() => setShowEarningsModal(false)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-lg text-sm shadow-sm transition-all border-none">
                          Close Overview
                      </Button>
                  </div>
              </div>
          </div>
      )}

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
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative mb-16 lg:mb-0 font-sans">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Berlin Kickers Dashboard</h1>
            <div className="flex items-center space-x-2 mt-1">
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
                <Button 
                    onClick={() => { 
                        setEditingProgram(null); 
                        setShowCreateProgramModal(true); 
                    }}
                    className="hidden md:flex items-center gap-2 border-none shadow bg-secondary text-black hover:bg-yellow-300"
                    disabled={!isBusinessVerified}
                >
                    <Plus size={18} /> New Program
                </Button>
            </div>
          )}
        </header>

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

                 {/* Commission Curve Overview Widget */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow shadow-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 uppercase tracking-widest font-mono">My Rate</span>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Commission Protection</h2>
                            <p className="text-xs text-slate-500">Your rate adjusts automatically based on your bookings volume. Resets on the 1st of each month.</p>
                        </div>
                        <Button 
                            onClick={() => setShowEarningsModal(true)} 
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 px-4 rounded-xl flex items-center gap-2 font-bold shadow-sm transition-all border-none"
                        >
                            <Award size={14} className="text-yellow-400" />
                            Track Milestones
                        </Button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">This Month's GMV</div>
                                <div className="text-xl font-bold text-slate-900">€{bookingsAmount.toLocaleString()}</div>
                                <p className="text-[10px] text-slate-400 mt-1 font-sans">Accumulated sales volume</p>
                            </div>
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Your Rate</div>
                                <div className="text-xl font-bold text-slate-950 flex items-center gap-1.5">
                                    <span>18%</span>
                                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100 uppercase tracking-tight font-sans">Early Adopter</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 font-sans">Guaranteed baseline safeguard</p>
                            </div>
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Next Tier Rate</div>
                                <div className="text-xl font-bold text-slate-700 font-sans">12% <span className="text-xs font-normal text-slate-400 font-mono">at €4,000</span></div>
                                <p className="text-[10px] text-slate-400 mt-1 font-sans">€{(4000 - bookingsAmount).toLocaleString()} remaining</p>
                            </div>
                            <div className="p-4 bg-green-50/40 rounded-xl border border-green-100">
                                <div className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1 font-mono">Active Savings</div>
                                <div className="text-xl font-bold text-green-600">€{Math.round(bookingsAmount * 0.04).toLocaleString()}</div>
                                <p className="text-[10px] text-green-700 mt-1 font-sans">Saved vs standard 22% rate</p>
                            </div>
                        </div>

                        {/* Progress Bar with Gamified Target */}
                        <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-700 font-sans">Level 2: Early Adopter (18% Locked)</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-indigo-700 font-mono">{(bookingsAmount / 4000 * 100).toFixed(0)}% Completed</span>
                                </div>
                            </div>
                            
                            <div className="relative">
                                {/* Track Background */}
                                <div className="h-4 bg-slate-200/65 rounded-full overflow-hidden p-0.5 border border-slate-200 relative">
                                    {/* Filled progress with a luxurious glow */}
                                    <div 
                                        className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-indigo-600 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden" 
                                        style={{ width: `${Math.min(100, (bookingsAmount / 4000) * 100)}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
                                <span>€0 (Guaranteed Safe Baseline)</span>
                                <span className="font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs flex items-center gap-1">
                                    ⭐ Level 3 Goal: €4,000 GMV
                                </span>
                                <span>€4,000 (Target Rate 12%)</span>
                            </div>
                        </div>
                    </div>
                </div>

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
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Business Name</label>
                                    <input type="text" defaultValue="Berlin Kickers" className="w-full p-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Business Logo</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 p-2 border rounded-lg bg-slate-50 text-slate-400 text-sm truncate">logo.png</div>
                                        <Button size="sm" variant="outline">Upload</Button>
                                    </div>
                                </div>
                            </div>
                            <textarea defaultValue="Bio..." className="w-full p-2 border rounded-lg" rows={3}/>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                                <Button onClick={() => { setIsEditingProfile(false); setIsBusinessVerified(false); }}>Save & Submit</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'team' && (
            <div className="space-y-8 relative animate-in fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Team & Provider Profiles</h2>
                        <p className="text-slate-500">Create profiles for your staff. These will be visible to parents when assigned to programs.</p>
                    </div>
                    <Button onClick={() => setShowAddMemberModal(true)} className="bg-primary hover:bg-primaryDark text-slate-900 font-bold"><UserPlus size={18} className="mr-2"/> Add Team Member</Button>
                </div>

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
                                <div className="flex items-center text-xs text-slate-500 mb-4">
                                    <DollarSign size={14} className="mr-1"/> Rate: €{member.hourlyRate}/hr
                                </div>
                                <div className="flex gap-2 pt-4 border-t border-slate-100 mt-auto">
                                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50"><X size={16}/></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => setShowAddMemberModal(true)} className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-cyan-50 transition-all min-h-[300px]">
                        <UserPlus size={48} className="mb-4"/>
                        <span className="font-bold">Add New Profile</span>
                    </button>
                </div>
            </div>
        )}

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
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[800px]">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Program Name</th>
                            <th className="px-6 py-3">Assigned Staff</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filteredPrograms.map((prog) => (
                            <tr key={prog.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <div>{prog.title}</div>
                                    <div className="text-xs text-slate-400">€{prog.price}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {teamMembers.find(t => t.id === prog.assignedTo)?.name || 'Unassigned'}
                                </td>
                                <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                        <button onClick={() => setPreviewProgram(prog)} className="p-2 text-slate-400 hover:text-primary rounded"><Eye size={16}/></button>
                                        <button onClick={() => handleEditProgram(prog)} className="p-2 text-slate-400 hover:text-secondary rounded"><Edit size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                  </div>
               </div>

               {/* MOVED INVOICES HERE */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 flex items-center"><FileText size={18} className="mr-2 text-primaryDark"/> Staff Invoices</h3>
                        <Button onClick={() => setShowInvoiceModal(true)} variant="outline" size="sm"><Receipt size={16} className="mr-2"/> New Invoice</Button>
                    </div>
                    <div className="overflow-auto max-h-[400px]">
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
        )}

        {activeTab === 'finances' && (
            <div className="space-y-8 relative animate-in fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Financial Performance</h2>
                        <p className="text-slate-500">Revenue and expenses tracking.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Download size={16} className="mr-2"/> Export CSV</Button>
                        <Button onClick={() => setShowExpenseModal(true)} className="bg-secondary text-black hover:bg-yellow-300"><Plus size={16} className="mr-2"/> Log Expense</Button>
                    </div>
                </div>

                {/* BAR CHART AT THE TOP */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Revenue vs Expenses (YTD)</h3>
                    <div className="h-72">
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

                {/* FINANCIAL "RECIPE" (Summary and P&L Breakdown) */}
                <div className="grid lg:grid-cols-1 gap-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center"><TrendingUp className="mr-2 text-primaryDark"/> Profit & Loss Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-500 font-medium uppercase tracking-wider text-xs">Total Revenue</span>
                                <span className="font-bold text-slate-900">€{totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-500 font-medium uppercase tracking-wider text-xs">Total Expenses</span>
                                <span className="font-bold text-red-500">-€{totalExpenses.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-black/5 pt-4 flex justify-between items-center px-3">
                                <span className="font-bold text-slate-900 text-lg uppercase font-display">Net Profit</span>
                                <span className="font-bold text-green-600 text-2xl">€{netProfit.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EXPENSES TABLE (Recipe Details) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 flex items-center"><DollarSign size={18} className="mr-2 text-red-500"/> Recent Expenses</h3>
                        <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded">Last 30 Days</span>
                    </div>
                    <div className="overflow-auto max-h-[400px]">
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase sticky top-0">
                                <tr>
                                    <th className="px-4 py-2">Program / Category</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2 text-right">Amount</th>
                                    <th className="px-4 py-2 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {expenses.map(e => (
                                    <tr key={e.id}>
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-slate-800">{e.programName || 'General'}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{e.category}</div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 text-xs">{e.description}</td>
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
            </div>
        )}
        
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
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {['overview', 'programs', 'finances', 'chat'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center w-full py-1 ${activeTab === tab ? 'text-secondary' : 'text-slate-400'}`}
            >
               {tab === 'overview' && <LayoutDashboard size={22} />}
               {tab === 'programs' && <List size={22} />}
               {tab === 'finances' && <DollarSign size={22} />}
               {tab === 'chat' && <MessageSquare size={22} />}
               <span className="text-[10px] mt-1 capitalize">{tab}</span>
            </button>
        ))}
      </div>

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
                     </div>
                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowAddMemberModal(false)}>Cancel</Button>
                         <Button type="submit">Create Profile</Button>
                     </div>
                 </form>
             </div>
          </div>
      )}

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

      {showInvoiceModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">Generate Staff Invoice</h2>
                 <div className="space-y-4">
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
                     <div className="flex justify-end gap-2 pt-2">
                         <Button type="button" variant="ghost" onClick={() => setShowInvoiceModal(false)}>Cancel</Button>
                         <Button onClick={handleGenerateInvoice} disabled={!selectedStaffForInvoice}>Generate & Send</Button>
                     </div>
                 </div>
             </div>
          </div>
      )}

      {showCreateProgramModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95">
                 <h2 className="text-xl font-bold mb-4">{editingProgram ? 'Edit Program' : 'Create New Program'}</h2>
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
