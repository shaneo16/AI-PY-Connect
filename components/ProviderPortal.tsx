
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { 
  LayoutDashboard, List, Users, Calendar, TrendingUp, DollarSign, Plus, Settings, Search, Edit, Trash2, Rocket, Shield, BookOpen, Heart as HeartIcon, MessageSquare, Share2, Image, Upload, AlertTriangle, Send, X, Megaphone, Printer, Download, PlusCircle, Clock, Briefcase, MapPin, User, Lock, ChevronLeft, ChevronRight, FileText, CheckCircle, Radio, Save
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_STUDENTS, MOCK_EXPENSES, PROGRAM_PERFORMANCE, MOCK_JOBS } from '../constants';
import { Button } from './Button';
import { Expense, Program, VerificationType } from '../types';
import { VerificationIcon } from './ParentPortal';

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState<'Starter' | 'Professional' | 'Business'>('Professional');
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'performance' | 'financials'>('performance');
  
  // Profile Editing State
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Incident Modal State
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');

  // Roster Modal State
  const [showRosterModal, setShowRosterModal] = useState(false);

  // Promote Modal State
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [programToPromote, setProgramToPromote] = useState<Program | null>(null);

  // Create Program Modal State
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);

  // Expenses State
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', date: '' });

  // Invoices State
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', student: 'Leo Fischer', date: '2024-06-10', amount: 120, status: 'Paid' },
    { id: 'INV-002', student: 'Emma Schmidt', date: '2024-06-12', amount: 45, status: 'Pending' }
  ]);

  // Chat State
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');

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
  
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.category) return;
    const expense: Expense = {
       id: Math.random().toString(),
       category: newExpense.category,
       amount: parseFloat(newExpense.amount),
       date: newExpense.date || new Date().toISOString().split('T')[0],
       status: 'Pending'
    };
    setExpenses([...expenses, expense]);
    setShowExpenseModal(false);
    setNewExpense({ category: '', amount: '', date: '' });
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
     e.preventDefault();
     const newInv = {
        id: `INV-00${invoices.length + 1}`,
        student: 'New Student',
        date: new Date().toISOString().split('T')[0],
        amount: 100,
        status: 'Pending',
        items: [{ desc: 'Tuition Fee', price: 100 }]
     };
     setInvoices([...invoices, newInv]);
     setShowInvoiceModal(false);
     setCurrentInvoice(newInv);
     setShowInvoicePreview(true);
  };

  const handleCreateProgram = (e: React.FormEvent) => {
      e.preventDefault();
      alert("New Program Created!");
      setShowCreateProgramModal(false);
  }

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  // Financial Calculations
  const totalRevenue = PROGRAM_PERFORMANCE.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  // Schedule Logic
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const scheduleEvents = [
     { id: 'ev1', title: 'Junior Soccer Academy', day: 'Tue', time: '16:00', duration: '90m', category: 'Sports', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
     { id: 'ev2', title: 'Creative Art Workshop', day: 'Wed', time: '15:30', duration: '120m', category: 'Arts', color: 'bg-fuchsia-100 text-secondary border-fuchsia-200' },
     { id: 'ev3', title: 'Piano for Beginners', day: 'Thu', time: '14:00', duration: '45m', category: 'Music', color: 'bg-amber-100 text-amber-700 border-amber-200' },
     { id: 'ev4', title: 'Junior Soccer Academy', day: 'Thu', time: '16:00', duration: '90m', category: 'Sports', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
     { id: 'ev5', title: 'Weekend Babysitting', day: 'Sat', time: '18:00', duration: '4h', category: 'Life Skills', color: 'bg-green-100 text-green-800 border-green-200' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Provider Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-6 shrink-0 overflow-y-auto">
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
             <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold shadow shadow-secondary/50">P</div>
             <span className="text-white font-bold text-lg tracking-tight">Prime Provider</span>
          </div>
          <nav className="space-y-1">
            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarLink icon={<List size={20} />} label="My Programs" active={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
            <SidebarLink icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <SidebarLink icon={<Users size={20} />} label="Community" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
            <SidebarLink icon={<TrendingUp size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          </nav>
        </div>
        
        {/* Tier Simulation Toggle */}
        <div className="mt-auto pt-6 border-t border-slate-800">
           <p className="text-xs text-slate-500 mb-2 font-bold uppercase">Simulate Plan Tier</p>
           <div className="space-y-2">
              <button onClick={() => setTier('Starter')} className={`w-full text-left px-3 py-2 rounded text-xs ${tier === 'Starter' ? 'bg-slate-700 text-white font-bold' : 'hover:bg-slate-800'}`}>Starter (Free)</button>
              <button onClick={() => setTier('Professional')} className={`w-full text-left px-3 py-2 rounded text-xs ${tier === 'Professional' ? 'bg-secondary text-white font-bold' : 'hover:bg-slate-800'}`}>Professional (€8)</button>
              <button onClick={() => setTier('Business')} className={`w-full text-left px-3 py-2 rounded text-xs ${tier === 'Business' ? 'bg-cyan-600 text-white font-bold' : 'hover:bg-slate-800'}`}>Business Plus (€48)</button>
           </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <SidebarLink icon={<Settings size={20} />} label="Settings" onClick={() => setActiveTab('settings')} />
        </div>
      </aside>

      {/* Main Business Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Berlin Kickers Dashboard</h1>
            <div className="flex items-center space-x-2 mt-1">
               <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide text-white ${tier === 'Starter' ? 'bg-slate-500' : tier === 'Professional' ? 'bg-secondary' : 'bg-cyan-600'}`}>
                  {tier} Plan
               </span>
               <span className="text-slate-500 text-sm">Welcome back, Shane.</span>
            </div>
          </div>
          {(activeTab === 'overview' || activeTab === 'programs') && (
            <Button 
                onClick={() => setShowCreateProgramModal(true)}
                className="flex items-center gap-2 bg-secondary hover:bg-fuchsia-600 border-none shadow-lg shadow-secondary/20"
            >
                <Plus size={18} /> New Program
            </Button>
          )}
        </header>

        {(activeTab === 'overview') && (
            <div className="space-y-8">
                {/* 1. Stats Row */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROVIDER_STATS.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-slate-500 mb-1">{stat.name}</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-slate-900">
                          {stat.name.includes('Revenue') ? '€' : ''}{stat.value.toLocaleString()}
                        </div>
                        {stat.change && (
                          <div className="text-xs font-medium text-secondary bg-fuchsia-50 px-2 py-1 rounded-full">
                            {stat.change}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 2. Profile Section (Merged) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Provider Profile</h2>
                        {!isEditingProfile && (
                            <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(true)}>
                                <Edit size={16} className="mr-2"/> Edit Profile
                            </Button>
                        )}
                    </div>
                    
                    {!isEditingProfile ? (
                        // View Mode
                        <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-32 h-32 rounded-full border-4 border-slate-100 shadow-sm overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Berlin Kickers</h3>
                                <p className="text-lg text-slate-500 mb-4">Professional Youth Soccer Coaching</p>
                                <p className="text-slate-600 leading-relaxed mb-4 max-w-2xl">
                                    Berlin Kickers was founded in 2010 with a mission to develop young talent through structured, fun, and competitive soccer training. Our coaches are UEFA B certified.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['background_check', 'first_aid', 'child_safeguarding'].map(v => (
                                        <div key={v} className="flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                            <VerificationIcon type={v as VerificationType} size={14} className="mr-1" />
                                            {v.replace('_', ' ').toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Edit Mode
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company / Provider Name</label>
                                    <input type="text" defaultValue="Berlin Kickers" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                                    <input type="text" defaultValue="Professional Youth Soccer Coaching" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Description</label>
                                <textarea rows={4} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" defaultValue="Berlin Kickers was founded in 2010..." />
                            </div>

                            <div className="pt-4 flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                                <Button className="bg-secondary hover:bg-fuchsia-600" onClick={() => setIsEditingProfile(false)}>
                                    <Save size={16} className="mr-2"/> Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

               {/* Active Programs Summary Table (reused) */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Active Programs</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-3">Program Name</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Enrolled</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_PROGRAMS.slice(0, 3).map((prog) => (
                        <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                          <td className="px-6 py-4 text-slate-500">{prog.category}</td>
                          <td className="px-6 py-4 text-slate-900">12/20</td>
                          <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 text-center border-t border-slate-100">
                    <Button variant="ghost" className="text-secondary hover:text-fuchsia-700" onClick={() => setActiveTab('programs')}>View All Programs</Button>
                  </div>
                </div>
            </div>
        )}

        {/* My Programs Tab */}
        {activeTab === 'programs' && (
             <div className="space-y-8">
               {/* Active Programs Table */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">All Programs</h3>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-3">Program Name</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Enrolled</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_PROGRAMS.map((prog) => (
                        <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                          <td className="px-6 py-4 text-slate-500">{prog.category}</td>
                          <td className="px-6 py-4 text-slate-900">12/20</td>
                          <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                               <button 
                                  onClick={() => { setProgramToPromote(prog); setShowPromoteModal(true); }}
                                  className="p-1 text-slate-400 hover:text-secondary transition-colors" 
                                  title="Promote Program"
                               >
                                  <Share2 size={16}/>
                               </button>
                               <button 
                                  onClick={() => { setSelectedProgramId(prog.id); setShowRosterModal(true); }}
                                  className="p-1 text-slate-400 hover:text-secondary transition-colors" 
                                  title="View Roster"
                               >
                                  <Users size={16}/>
                               </button>
                               <button 
                                  onClick={() => { setSelectedProgramId(prog.id); setShowIncidentModal(true); }}
                                  className="p-1 text-slate-400 hover:text-amber-500 transition-colors" 
                                  title="Report Incident"
                               >
                                  <AlertTriangle size={16}/>
                               </button>
                              <button className="p-1 text-slate-400 hover:text-secondary transition-colors"><Edit size={16}/></button>
                              <button className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-slate-900">Weekly Schedule</h2>
                            <div className="flex bg-slate-100 rounded-lg p-0.5">
                                <button className="p-1 hover:bg-white rounded text-slate-500"><ChevronLeft size={18}/></button>
                                <span className="px-3 py-1 text-sm font-medium text-slate-700">June 12 - 18</span>
                                <button className="p-1 hover:bg-white rounded text-slate-500"><ChevronRight size={18}/></button>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">View Calendar</Button>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-7 divide-x divide-slate-200 overflow-hidden">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="flex flex-col min-w-[100px]">
                                <div className="p-3 text-center border-b border-slate-200 bg-slate-50">
                                    <span className="text-sm font-bold text-slate-700 block">{day}</span>
                                </div>
                                <div className="flex-1 p-2 space-y-2 bg-white relative min-h-[150px]">
                                    {scheduleEvents.filter(e => e.day === day).map(event => (
                                        <div key={event.id} className={`p-2 rounded-lg border text-xs cursor-pointer hover:shadow-md transition-shadow ${event.color}`}>
                                            <div className="font-bold truncate">{event.title}</div>
                                            <div className="flex items-center mt-1 opacity-80">
                                                <Clock size={10} className="mr-1"/>
                                                {event.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* ... Community and Analytics ... */}
      </main>

      {/* Roster Modal */}
      {showRosterModal && (
         <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 h-[80vh] flex flex-col">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                     <h3 className="font-bold text-lg text-slate-900 flex items-center">
                        <Users className="text-secondary mr-2" size={20}/> Class Roster
                     </h3>
                     <p className="text-sm text-slate-500">Junior Soccer Academy - 16:00 Session</p>
                  </div>
                  <button onClick={() => setShowRosterModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
               </div>
               <div className="flex-1 overflow-y-auto p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3">Student Name</th>
                        <th className="px-6 py-3">Age</th>
                        <th className="px-6 py-3">Parent</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_STUDENTS.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{student.name}</td>
                          <td className="px-6 py-4 text-slate-500">{student.age}</td>
                          <td className="px-6 py-4 text-slate-500">{student.parentName}</td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                student.status === 'Present' ? 'bg-green-100 text-green-700' :
                                student.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                'bg-amber-100 text-amber-700'
                             }`}>
                                {student.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="text-xs text-secondary hover:underline">Message Parent</button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowRosterModal(false)}>Close</Button>
                  <Button onClick={() => alert('Broadcast sent to all parents in roster!')} className="bg-secondary hover:bg-fuchsia-600 flex items-center">
                      <Megaphone size={16} className="mr-2" /> Send Broadcast
                  </Button>
                  <Button onClick={() => alert('Report Printed')} variant="ghost" className="text-slate-500 hover:text-slate-700">Print Report</Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-secondary text-white font-medium shadow-lg shadow-secondary/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
