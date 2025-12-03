
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { 
  LayoutDashboard, List, Users, TrendingUp, Plus, Edit, Share2, Upload, Send, X, Megaphone, Printer, Download, Clock, Briefcase, MapPin, User, Video, Shield, DollarSign, Rocket, BookOpen, MessageSquare, FileText
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_FEED_POSTS, MOCK_CONVERSATIONS, MOCK_STUDENTS, MOCK_JOBS, MOCK_EXPENSES } from '../constants';
import { Button } from './Button';
import { VerificationType } from '../types';
import { VerificationIcon, VideoCallModal } from './ParentPortal';

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState<'Starter' | 'Professional' | 'Business'>('Professional');
  
  // Profile Editing State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showRosterModal, setShowRosterModal] = useState(false);
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  
  // Chat State
  const [activeConversationId, setActiveConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);

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

      {/* Provider Sidebar (Desktop) */}
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
           </div>
        </div>
      </aside>

      {/* Main Business Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative mb-16 lg:mb-0">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Berlin Kickers Dashboard</h1>
            <div className="flex items-center space-x-2 mt-1">
               <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide text-white ${tier === 'Starter' ? 'bg-slate-500' : tier === 'Professional' ? 'bg-secondary' : 'bg-cyan-600'}`}>
                  {tier} Plan
               </span>
            </div>
          </div>
          {(activeTab === 'overview' || activeTab === 'programs') && (
            <Button 
                onClick={() => setShowCreateProgramModal(true)}
                className="hidden md:flex items-center gap-2 bg-secondary hover:bg-fuchsia-600 border-none shadow-lg shadow-secondary/20"
            >
                <Plus size={18} /> New Program
            </Button>
          )}
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="space-y-8">
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
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Provider Profile</h2>
                        {!isEditingProfile && (
                            <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(true)}>
                                <Edit size={16} className="mr-2"/> Edit
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
                                    {['background_check', 'first_aid'].map(v => (
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
                            <input type="text" defaultValue="Berlin Kickers" className="w-full p-2 border rounded-lg" />
                            <textarea defaultValue="Bio..." className="w-full p-2 border rounded-lg" rows={3}/>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                                <Button onClick={() => setIsEditingProfile(false)}>Save</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* MY PROGRAMS TAB */}
        {activeTab === 'programs' && (
             <div className="space-y-8">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">All Programs</h3>
                    <Button onClick={() => setShowCreateProgramModal(true)} size="sm" className="md:hidden"><Plus size={16}/></Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Program Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {MOCK_PROGRAMS.map((prog) => (
                            <tr key={prog.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                            <td className="px-6 py-4 text-slate-500">{prog.category}</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                <button onClick={() => setShowRosterModal(true)} className="p-1 text-slate-400 hover:text-secondary" title="View Roster"><Users size={16}/></button>
                                <button className="p-1 text-slate-400 hover:text-secondary"><Edit size={16}/></button>
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

        {/* COMMUNITY TAB */}
        {activeTab === 'community' && (
            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Highlights Feed */}
                <div className="lg:w-2/3 space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Highlights Feed</h2>
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
                            </div>
                            <img src={post.image} alt="Post" className="w-full aspect-video object-cover"/>
                            <div className="p-4">
                                <p className="text-sm text-slate-700"><span className="font-bold mr-2">{post.providerName}</span>{post.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Job Board */}
                <div className="lg:w-1/3">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Job Board</h2>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        {MOCK_JOBS.map(job => (
                            <div key={job.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 relative">
                                {tier === 'Starter' && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                                        <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded">Upgrade to view</div>
                                    </div>
                                )}
                                <h4 className="font-bold text-slate-900">{job.title}</h4>
                                <p className="text-xs text-slate-500 mb-2">{job.category} • {job.location}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-bold text-primaryDark">{job.budget || 'Negotiable'}</span>
                                    <Button size="sm" variant="outline" className="text-xs h-7">Contact</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'chat' && (
            <div className="flex flex-col md:flex-row h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
                                 <Button size="sm" onClick={handleBroadcast} className="bg-secondary hover:bg-fuchsia-600"><Megaphone size={16} className="mr-1"/> Broadcast</Button>
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

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-slate-900">Analytics & Growth</h2>
                   <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hidden md:flex"><Printer size={16} className="mr-2"/> Print Report</Button>
                      <Button variant="outline" size="sm" className="hidden md:flex"><Download size={16} className="mr-2"/> Download CSV</Button>
                   </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
                   <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={ANALYTICS_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="revenue" fill="#0cf2f2" radius={[4, 4, 0, 0]} barSize={40} />
                         </BarChart>
                       </ResponsiveContainer>
                   </div>
                </div>

                {/* Financial Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center"><DollarSign className="mr-2 text-green-500"/> Profit & Loss</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Revenue (YTD)</span>
                                <span className="font-bold text-slate-900">€24,350.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Expenses</span>
                                <span className="font-bold text-red-500">-€4,120.00</span>
                            </div>
                            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                                <span className="font-bold text-slate-900">Net Income</span>
                                <span className="font-bold text-green-600 text-lg">€20,230.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center"><FileText className="mr-2 text-primary"/> Recent Expenses</h3>
                        <div className="space-y-3">
                            {MOCK_EXPENSES.map(exp => (
                                <div key={exp.id} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded">
                                    <div>
                                        <div className="font-medium">{exp.category}</div>
                                        <div className="text-xs text-slate-500">{exp.date}</div>
                                    </div>
                                    <div className="font-bold">-€{exp.amount}</div>
                                </div>
                            ))}
                            <Button size="sm" variant="ghost" className="w-full text-xs text-primary">View All Expenses</Button>
                        </div>
                    </div>
                </div>

                {/* Growth Tools (Merged) */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Growth Tools</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
                            <Rocket size={32} className="mb-4"/>
                            <h4 className="font-bold text-lg mb-2">Dynamic Pricing</h4>
                            <p className="text-sm opacity-90 mb-4">AI suggests you increase prices by 5% based on demand.</p>
                            <Button size="sm" className="bg-white text-blue-600 w-full hover:bg-slate-100">Review</Button>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <Shield size={32} className="mb-4 text-secondary"/>
                            <h4 className="font-bold text-lg mb-2">Insurance</h4>
                            <p className="text-sm text-slate-500 mb-4">Protect your business with our partner liability plans.</p>
                            <Button size="sm" variant="outline" className="w-full">Get Quote</Button>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <BookOpen size={32} className="mb-4 text-amber-500"/>
                            <h4 className="font-bold text-lg mb-2">Academy</h4>
                            <p className="text-sm text-slate-500 mb-4">Learn "How to retain 90% of your students".</p>
                            <Button size="sm" variant="outline" className="w-full">Read Guide</Button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {['overview', 'programs', 'chat', 'community', 'analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center w-full py-1 ${activeTab === tab ? 'text-secondary' : 'text-slate-400'}`}
            >
               {tab === 'overview' && <LayoutDashboard size={22} />}
               {tab === 'programs' && <List size={22} />}
               {tab === 'chat' && <MessageSquare size={22} />}
               {tab === 'community' && <Users size={22} />}
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
