
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, List, Users, Calendar, TrendingUp, DollarSign, Plus, Settings, Search, Edit, Trash2, Rocket, Shield, BookOpen, Heart as HeartIcon, MessageSquare, Share2, Image, Upload, AlertTriangle, Send, Mic, Radio, X, Megaphone, Printer, Download, PlusCircle, CheckCircle, Clock
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_FEED_POSTS, MOCK_INCIDENTS, MOCK_CONVERSATIONS, MOCK_STUDENTS, MOCK_EXPENSES, PROGRAM_PERFORMANCE } from '../constants';
import { Button } from './Button';
import { IncidentReport, Expense } from '../types';

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState<'Starter' | 'Professional' | 'Business'>('Professional');
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'performance' | 'financials'>('performance');
  
  // Incident Modal State
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');

  // Roster Modal State
  const [showRosterModal, setShowRosterModal] = useState(false);

  // Expenses State
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', date: '' });

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

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  // Financial Calculations
  const totalRevenue = PROGRAM_PERFORMANCE.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Provider Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-6">
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
             <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold shadow shadow-secondary/50">P</div>
             <span className="text-white font-bold text-lg tracking-tight">Prime Provider</span>
          </div>
          <nav className="space-y-1">
            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarLink icon={<Users size={20} />} label="My Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SidebarLink icon={<List size={20} />} label="My Programs" active={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
            <SidebarLink icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <SidebarLink icon={<Megaphone size={20} />} label="Promote" active={activeTab === 'promote'} onClick={() => setActiveTab('promote')} />
            <SidebarLink icon={<HeartIcon size={20} />} label="Highlights" active={activeTab === 'highlights'} onClick={() => setActiveTab('highlights')} />
            <SidebarLink icon={<Calendar size={20} />} label="Schedule" active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
            <SidebarLink icon={<Rocket size={20} />} label="Growth Tools" active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
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
          <Button className="flex items-center gap-2 bg-secondary hover:bg-fuchsia-600 border-none shadow-lg shadow-secondary/20">
            <Plus size={18} /> New Program
          </Button>
        </header>

        {activeTab === 'promote' && (
           <div className="max-w-6xl mx-auto">
             <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Promote Your Programs</h2>
                <p className="text-slate-500">Share your activities on social media to attract more families. Available to all providers.</p>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PROGRAMS.slice(0, 3).map((prog) => (
                   <div key={prog.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:border-secondary/50 transition-colors">
                      <div className="relative h-48 bg-slate-100">
                         <img src={prog.image} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold text-lg">{prog.title}</h3>
                            <p className="text-white/80 text-sm">{prog.provider}</p>
                         </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                         <p className="text-sm text-slate-600 mb-4 flex-1">
                            Ready to share? Post this program to your followers to fill up your spots!
                         </p>
                         <div className="space-y-2">
                            <Button className="w-full bg-[#E1306C] hover:bg-[#C13584] text-white flex items-center justify-center">
                               <Share2 size={16} className="mr-2" /> Share on Instagram
                            </Button>
                            <Button className="w-full bg-[#1877F2] hover:bg-[#165EAB] text-white flex items-center justify-center">
                               <Share2 size={16} className="mr-2" /> Share on Facebook
                            </Button>
                            <Button variant="outline" className="w-full flex items-center justify-center hover:bg-secondary/5 hover:text-secondary hover:border-secondary">
                               <Download size={16} className="mr-2" /> Download Social Card
                            </Button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           </div>
        )}

        {/* ... (Previous code logic for tabs maintained, but ensuring Secondary color usage) ... */}
        {activeTab === 'analytics' && (
           <div className="max-w-6xl mx-auto">
              {/* Analytics Tab Content (Shortened for brevity - logic identical to previous but ensuring colors) */}
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900">Analytics & Financials</h2>
                    <p className="text-sm text-slate-500">Track your business performance and manage finances.</p>
                 </div>
                 
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                       onClick={() => setAnalyticsSubTab('performance')}
                       className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${analyticsSubTab === 'performance' ? 'bg-white shadow-sm text-secondary font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                       Performance
                    </button>
                    <button 
                       onClick={() => setAnalyticsSubTab('financials')}
                       className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${analyticsSubTab === 'financials' ? 'bg-white shadow-sm text-secondary font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                       Financials & Reports
                    </button>
                 </div>
              </div>
              
              {tier === 'Starter' ? (
                 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 bg-fuchsia-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <TrendingUp size={32} className="text-secondary" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Analytics are locked</h2>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">Upgrade to the Professional Plan to access detailed revenue tracking, expense management, and tax reports.</p>
                    <Button variant="secondary" onClick={() => setTier('Professional')}>Upgrade Now</Button>
                 </div>
              ) : (
                  <>
                    {analyticsSubTab === 'performance' && (
                        <div className="space-y-6">
                            {/* Charts and Tables */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg mb-6">Revenue Trends</h3>
                                <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ANALYTICS_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                                        <Bar dataKey="revenue" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                                </div>
                            </div>
                            
                            {/* ... Table logic ... */}
                             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                             <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-lg">Revenue by Program</h3>
                             </div>
                             <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-medium">
                                   <tr>
                                      <th className="px-6 py-3">Program Name</th>
                                      <th className="px-6 py-3">Bookings</th>
                                      <th className="px-6 py-3">Rating</th>
                                      <th className="px-6 py-3 text-right">Revenue Generated</th>
                                   </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                   {PROGRAM_PERFORMANCE.map(prog => (
                                      <tr key={prog.id} className="hover:bg-slate-50">
                                         <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                                         <td className="px-6 py-4 text-slate-600">{prog.bookings}</td>
                                         <td className="px-6 py-4 text-amber-500 font-bold">{prog.rating}</td>
                                         <td className="px-6 py-4 text-right font-bold text-slate-900">€{prog.revenue.toLocaleString()}</td>
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                          </div>
                        </div>
                    )}
                    
                    {analyticsSubTab === 'financials' && (
                        <div className="space-y-6">
                            {/* Financial Cards */}
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-sm text-slate-500 mb-1">Total Revenue</div>
                                <div className="text-2xl font-bold text-green-600">€{totalRevenue.toLocaleString()}</div>
                             </div>
                             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-sm text-slate-500 mb-1">Total Expenses</div>
                                <div className="text-2xl font-bold text-red-500">€{totalExpenses.toLocaleString()}</div>
                             </div>
                             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-sm text-slate-500 mb-1">Net Income</div>
                                <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-slate-900' : 'text-red-500'}`}>
                                   €{netIncome.toLocaleString()}
                                </div>
                             </div>
                          </div>
                          
                           {/* Actions Bar */}
                          <div className="flex flex-wrap gap-4">
                             <Button onClick={() => alert('Exporting CSV...')} variant="outline" className="flex items-center hover:bg-secondary hover:text-white hover:border-secondary">
                                <Download size={16} className="mr-2"/> Export Tax Report (CSV)
                             </Button>
                             <Button onClick={() => alert('Printing P&L...')} variant="outline" className="flex items-center hover:bg-secondary hover:text-white hover:border-secondary">
                                <Printer size={16} className="mr-2"/> Print Profit & Loss
                             </Button>
                             <div className="flex-1"></div>
                             <Button onClick={() => setShowExpenseModal(true)} className="flex items-center bg-secondary hover:bg-fuchsia-600">
                                <PlusCircle size={16} className="mr-2"/> Add Expense
                             </Button>
                          </div>
                          
                          {/* Expenses Table */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                             <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-lg">Expense Ledger</h3>
                             </div>
                             <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-medium">
                                   <tr>
                                      <th className="px-6 py-3">Date</th>
                                      <th className="px-6 py-3">Category</th>
                                      <th className="px-6 py-3">Status</th>
                                      <th className="px-6 py-3 text-right">Amount</th>
                                   </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                   {expenses.map(exp => (
                                      <tr key={exp.id} className="hover:bg-slate-50">
                                         <td className="px-6 py-4 text-slate-600">{exp.date}</td>
                                         <td className="px-6 py-4 font-medium text-slate-900">{exp.category}</td>
                                         <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                               exp.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                               {exp.status}
                                            </span>
                                         </td>
                                         <td className="px-6 py-4 text-right font-bold text-red-500">-€{exp.amount}</td>
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                             {expenses.length === 0 && (
                                <div className="p-8 text-center text-slate-500">No expenses recorded yet.</div>
                             )}
                          </div>
                        </div>
                    )}
                  </>
              )}
           </div>
        )}

        {(activeTab === 'overview' || activeTab === 'programs') && (
            // Overview logic
            <div className="space-y-8">
               {activeTab === 'overview' && (
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
               )}

               {/* Active Programs Table */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Active Programs</h3>
                    {activeTab === 'programs' && (
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                    )}
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
                      {MOCK_PROGRAMS.slice(0, activeTab === 'overview' ? 3 : undefined).map((prog) => (
                        <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                          <td className="px-6 py-4 text-slate-500">{prog.category}</td>
                          <td className="px-6 py-4 text-slate-900">12/20</td>
                          <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
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
                  {activeTab === 'overview' && (
                     <div className="p-4 text-center border-t border-slate-100">
                        <Button variant="ghost" className="text-secondary hover:text-fuchsia-700" onClick={() => setActiveTab('programs')}>View All Programs</Button>
                     </div>
                  )}
                </div>
            </div>
        )}
        
        {/* Other Tabs Rendering (Highlights, Profile, etc.) - Ensuring Colors */}
        {activeTab === 'profile' && (
             <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Edit Profile</h2>
                    <p className="text-sm text-slate-500">Update your public provider profile.</p>
                 </div>
                 <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Company / Provider Name</label>
                          <input type="text" defaultValue="Berlin Kickers" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                          <input type="text" defaultValue="Youth Soccer Academy" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                       </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">About</label>
                        <textarea rows={4} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" defaultValue="We provide high-quality soccer training for children of all ages. Our methodology focuses on skill development, teamwork, and fun." />
                    </div>

                    {/* Photos */}
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo</label>
                       <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                             <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                          </div>
                          <Button variant="outline" size="sm" className="hover:bg-secondary hover:text-white hover:border-secondary">Change Photo</Button>
                       </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[1,2,3].map(i => (
                              <div key={i} className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 relative group overflow-hidden">
                                 <Image size={24} />
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Trash2 className="text-white cursor-pointer" size={20} />
                                 </div>
                              </div>
                           ))}
                           <div className="aspect-square bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-secondary hover:text-secondary transition-colors">
                              <Upload size={24} className="mb-1"/>
                              <span className="text-xs font-medium">Upload</span>
                           </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                       <Button className="bg-secondary hover:bg-fuchsia-600">Save Profile</Button>
                    </div>
                 </div>
              </div>
           </div>
        )}
        
        {activeTab === 'tools' && (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative">
              {tier === 'Starter' && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                    <Rocket size={48} className="text-secondary mb-4" />
                    <h2 className="text-xl font-bold text-slate-900">Unlock Growth Tools</h2>
                    <p className="text-slate-600 mb-4 max-w-sm">Upgrade to Professional to access insurance partners, pricing insights, and educational resources.</p>
                    <Button variant="secondary" onClick={() => setTier('Professional')}>Upgrade Plan</Button>
                 </div>
              )}

              {/* Insurance Recommendation */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    <Shield size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Insurance Partners</h3>
                 <p className="text-slate-500 text-sm mb-4">
                    Protect your business and your students. We've curated top insurance providers for youth activities in Germany.
                 </p>
                 <div className="space-y-3">
                    <div className="p-3 border border-slate-100 rounded-lg flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                       <span className="font-bold text-slate-700">Allianz for Educators</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <div className="p-3 border border-slate-100 rounded-lg flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                       <span className="font-bold text-slate-700">Hiscox Sports</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
                    </div>
                 </div>
                 <Button variant="outline" className="w-full mt-4 hover:border-secondary hover:text-secondary">Compare Rates</Button>
              </div>

              {/* Pricing Insights */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                    <DollarSign size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Dynamic Pricing</h3>
                 <p className="text-slate-500 text-sm mb-4">
                    See how your prices compare to the Berlin market average for Sports Classes.
                 </p>
                 <div className="mt-4 mb-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                       <span>Low (€10)</span>
                       <span>Market Avg (€18)</span>
                       <span>High (€25)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full relative">
                       <div className="absolute left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-400 top-[-2px]"></div> {/* Market Avg */}
                       <div className="absolute left-[40%] -translate-x-1/2 w-3 h-3 bg-secondary rounded-full top-[-2px] border border-white shadow"></div> {/* Your Price */}
                    </div>
                    <p className="text-xs text-secondary font-bold mt-2 text-center">You are slightly below average.</p>
                 </div>
                 <Button variant="outline" className="w-full mt-4 hover:border-secondary hover:text-secondary">Optimize Pricing</Button>
              </div>

              {/* Learning Hub */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                    <BookOpen size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Development</h3>
                 <p className="text-slate-500 text-sm mb-4">
                    Resources to help you scale your business and improve teaching quality.
                 </p>
                 <ul className="space-y-3">
                    <li className="text-sm text-slate-700 hover:text-secondary cursor-pointer underline decoration-slate-200">
                       How to retain students semester over semester
                    </li>
                    <li className="text-sm text-slate-700 hover:text-secondary cursor-pointer underline decoration-slate-200">
                       Tax guide for freelance educators in Berlin
                    </li>
                    <li className="text-sm text-slate-700 hover:text-secondary cursor-pointer underline decoration-slate-200">
                       Safety certification workshop (Webinar)
                    </li>
                 </ul>
                 <Button variant="outline" className="w-full mt-4 hover:border-secondary hover:text-secondary">View Library</Button>
              </div>
           </div>
        )}
        
        {/* Chat / Highlights - use existing logic but verify button/color classes */}
         {activeTab === 'chat' && (
          <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             {/* Chat Sidebar */}
             <div className="w-72 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                   <h2 className="font-bold text-slate-900">Messages</h2>
                   <button onClick={handleBroadcast} className="text-secondary hover:bg-fuchsia-50 p-1 rounded" title="Broadcast to all">
                      <Radio size={18} />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                   {MOCK_CONVERSATIONS.map(conv => (
                      <div 
                        key={conv.id} 
                        onClick={() => setActiveConversationId(conv.id)}
                        className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 ${activeConversationId === conv.id ? 'bg-fuchsia-50' : ''}`}
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
                   ))}
                </div>
             </div>

             {/* Chat Window */}
             <div className="flex-1 flex flex-col bg-slate-50">
                {activeConversation ? (
                   <>
                      <div className="p-4 bg-white border-b border-slate-200 flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                             <img src={activeConversation.participantImage} alt={activeConversation.participantName} className="w-full h-full object-cover"/>
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900 text-sm">{activeConversation.participantName}</h3>
                            <span className="text-xs text-slate-500">Parent</span>
                         </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                         {activeConversation.messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isMe ? 'bg-secondary text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                                  {msg.text}
                                  <div className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-fuchsia-100' : 'text-slate-400'}`}>{msg.timestamp}</div>
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
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <Button type="submit" disabled={!newMessage.trim()} className="bg-secondary hover:bg-fuchsia-600"><Send size={18}/></Button>
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
          <div className="max-w-2xl mx-auto w-full">
             <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-xl font-bold text-slate-900">Highlights Feed</h2>
                  <p className="text-sm text-slate-500">Engage with the community.</p>
               </div>
               <Button className="bg-secondary hover:bg-fuchsia-600">Create Post</Button>
             </div>

             <div className="space-y-6">
                {MOCK_FEED_POSTS.map(post => (
                   <div key={post.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                         <button className="text-slate-400 hover:text-secondary"><Share2 size={18}/></button>
                      </div>
                      
                      <div className="aspect-square w-full bg-slate-100 relative">
                         <img src={post.image} alt="Post" className="w-full h-full object-cover"/>
                      </div>

                      <div className="p-4">
                         <div className="flex items-center space-x-4 mb-3">
                            <button className={`flex items-center space-x-1 ${post.liked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                               <HeartIcon size={24} className={post.liked ? 'fill-red-500' : ''} />
                            </button>
                            <button className="flex items-center space-x-1 text-slate-600 hover:text-secondary">
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
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

      </main>

      {/* Modals (Incident, Roster, Expense) - Ensure Secondary button usage */}
      {showIncidentModal && (
         <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center">
                     <AlertTriangle className="text-amber-500 mr-2" size={20}/> Report Incident
                  </h3>
                  <button onClick={() => setShowIncidentModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
                     <input type="text" placeholder="Who was involved?" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                  </div>
                   {/* ... inputs ... */}
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                     <textarea rows={3} placeholder="Describe exactly what happened..." className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none"></textarea>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => { alert('Incident Logged'); setShowIncidentModal(false); }}>Submit Report</Button>
               </div>
            </div>
         </div>
      )}

      {showExpenseModal && (
         <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900">Add New Expense</h3>
                  <button onClick={() => setShowExpenseModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
               </div>
               <form onSubmit={handleAddExpense} className="p-6 space-y-4">
                  {/* ... inputs ... */}
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                     <select 
                       value={newExpense.category} 
                       onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                       className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
                       required
                     >
                        <option value="">Select Category</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Rent">Venue Rental</option>
                        <option value="Salaries">Salaries</option>
                        <option value="Other">Other</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Amount (€)</label>
                     <input 
                       type="number" 
                       value={newExpense.amount}
                       onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                       className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
                       placeholder="0.00"
                       required
                     />
                  </div>
                   {/* ... */}
                  <Button type="submit" className="w-full bg-secondary hover:bg-fuchsia-600">Add Expense</Button>
               </form>
            </div>
         </div>
      )}

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
               {/* ... Roster Table ... */}
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
                  <Button onClick={() => alert('Report Printed')} className="bg-secondary hover:bg-fuchsia-600">Print Report</Button>
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