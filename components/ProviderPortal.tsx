

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  LayoutDashboard, List, Users, Calendar, TrendingUp, DollarSign, Plus, Settings, Search, Edit, Trash2, Rocket, Shield, BookOpen, Heart as HeartIcon, MessageSquare, Share2, Image, Upload, AlertTriangle, Send, Mic, Radio, X
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS, MOCK_FEED_POSTS, MOCK_INCIDENTS, MOCK_CONVERSATIONS } from '../constants';
import { Button } from './Button';
import { IncidentReport } from '../types';

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState<'Starter' | 'Professional' | 'Business'>('Professional');
  
  // Incident Modal State
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');

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

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Provider Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-6">
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
             <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold">P</div>
             <span className="text-white font-bold text-lg tracking-tight">Prime Provider</span>
          </div>
          <nav className="space-y-1">
            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarLink icon={<Users size={20} />} label="My Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SidebarLink icon={<List size={20} />} label="My Programs" active={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
            <SidebarLink icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
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
          <Button className="flex items-center gap-2 bg-secondary hover:bg-fuchsia-600">
            <Plus size={18} /> New Program
          </Button>
        </header>

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
                          <Button variant="outline" size="sm">Change Photo</Button>
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
                       <Button>Save Profile</Button>
                    </div>
                 </div>
              </div>
           </div>
        )}

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
                 <Button variant="outline" className="w-full mt-4">Compare Rates</Button>
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
                 <Button variant="outline" className="w-full mt-4">Optimize Pricing</Button>
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
                    <li className="text-sm text-slate-700 hover:text-primary cursor-pointer underline decoration-slate-200">
                       How to retain students semester over semester
                    </li>
                    <li className="text-sm text-slate-700 hover:text-primary cursor-pointer underline decoration-slate-200">
                       Tax guide for freelance educators in Berlin
                    </li>
                    <li className="text-sm text-slate-700 hover:text-primary cursor-pointer underline decoration-slate-200">
                       Safety certification workshop (Webinar)
                    </li>
                 </ul>
                 <Button variant="outline" className="w-full mt-4">View Library</Button>
              </div>
           </div>
        )}

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {PROVIDER_STATS.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
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

            {/* Charts & Lists Row */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h3>
                
                {tier === 'Starter' && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col text-center p-6">
                      <TrendingUp size={48} className="text-secondary mb-2" />
                      <h3 className="font-bold text-lg text-slate-900">Advanced Analytics Locked</h3>
                      <p className="text-sm text-slate-600 mb-4">Upgrade to Professional to see detailed revenue and booking trends.</p>
                      <Button variant="secondary" onClick={() => setTier('Professional')}>Unlock Analytics</Button>
                   </div>
                )}

                <div className={`h-72 ${tier === 'Starter' ? 'opacity-30 blur-sm' : ''}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f1f5f9' }}
                      />
                      <Bar dataKey="revenue" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Actions / Recent Bookings */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Bookings</h3>
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {['JS', 'MK', 'AL', 'TR', 'BB'][i-1]}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Soccer Camp</div>
                          <div className="text-xs text-slate-500">Today, 16:00</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-secondary">+€15</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">View All</Button>
              </div>
            </div>

            {/* Program Management with Incidents */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Active Programs</h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
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
                  {MOCK_PROGRAMS.slice(0, 3).map((prog) => (
                    <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{prog.title}</td>
                      <td className="px-6 py-4 text-slate-500">{prog.category}</td>
                      <td className="px-6 py-4 text-slate-900">12/20</td>
                      <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button 
                              onClick={() => { setSelectedProgramId(prog.id); setShowIncidentModal(true); }}
                              className="p-1 text-slate-400 hover:text-amber-500 transition-colors" 
                              title="Report Incident"
                           >
                              <AlertTriangle size={16}/>
                           </button>
                          <button className="p-1 text-slate-400 hover:text-primary transition-colors"><Edit size={16}/></button>
                          <button className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Incident Reporting Modal */}
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
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
                     <input type="datetime-local" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                     <select className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none">
                        <option>Low (Minor scratch, argument)</option>
                        <option>Medium (Requires first aid, parent contact)</option>
                        <option>High (Emergency services, serious injury)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                     <textarea rows={3} placeholder="Describe exactly what happened..." className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none"></textarea>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => { alert('Incident Logged'); setShowIncidentModal(false); }}>Submit Report</Button>
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
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-secondary text-white font-medium shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
