
import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Star, Heart, CheckCircle, ShieldCheck, List, Map as MapIcon, X, Lock, MessageCircle } from 'lucide-react';
import { MOCK_PROGRAMS } from '../constants';
import { Program } from '../types';
import { Button } from './Button';

export const ParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'planner' | 'messages'>('explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Simulation for Gating Features
  const [subscription, setSubscription] = useState<'Free' | 'Active'>('Free');

  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prog.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Sports', 'Arts', 'Music', 'Education', 'Life Skills', 'Camps', 'Workshops'];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 relative">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0 z-10">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'explore' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Search size={20} />
              <span>Explore</span>
            </button>
            <button 
              onClick={() => setActiveTab('planner')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'planner' ? 'bg-cyan-50 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CalendarIcon size={20} />
              <span>My Planner</span>
            </button>
          </nav>
        </div>
        
        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">My Children</h2>
          <div className="flex items-center space-x-3 mb-3">
             <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">E</div>
             <span className="text-sm font-medium">Emma (8)</span>
          </div>
          <div className="flex items-center space-x-3">
             <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">L</div>
             <span className="text-sm font-medium">Leo (12)</span>
          </div>
          <button className="mt-4 text-xs text-primary hover:underline">+ Add Child</button>
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
      <main className="flex-1 flex flex-col min-w-0">
        {activeTab === 'explore' && (
          <>
            {/* Header / Search Bar */}
            <div className="bg-white border-b border-slate-200 p-4 md:p-6 shadow-sm z-20">
               <div className="max-w-5xl mx-auto">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Find Activities</h1>
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

                 <div className="flex flex-wrap items-center justify-between gap-4">
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

            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
              <div className="max-w-5xl mx-auto">
                {viewMode === 'list' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {filteredPrograms.map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program)} />
                    ))}
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

        {activeTab === 'planner' && (
          <div className="max-w-4xl mx-auto p-4 md:p-8">
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
          </div>
        )}
      </main>

      {/* Detail Modal / Overlay */}
      {selectedProgram && (
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
                    <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                       <img src={selectedProgram.providerImage} alt={selectedProgram.provider} className="w-full h-full object-cover" />
                    </div>
                    {selectedProgram.isOnline && (
                       <div className="absolute top-8 left-24 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                          ONLINE
                       </div>
                    )}
                    
                    <div className="mt-14 mb-6">
                       <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedProgram.provider}</h2>
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
                       
                       <div className="flex gap-2 mt-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold uppercase rounded">{selectedProgram.category}</span>
                          {selectedProgram.verified && (
                             <span className="px-2 py-1 bg-cyan-50 text-primary text-xs font-semibold uppercase rounded flex items-center">
                                <ShieldCheck size={12} className="mr-1" /> Vetted
                             </span>
                          )}
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
                       <Button className="flex-1">Book Now</Button>
                     )}
                     
                     {/* Locked for Free Users */}
                     <button 
                       disabled={subscription === 'Free'}
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

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick }) => {
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

        {/* Provider Avatar Overlay */}
        <div className="absolute -bottom-6 left-4 flex items-end">
           <div className="relative">
             <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
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
        
        <p className="text-sm text-slate-500 mb-2 font-medium">{program.provider}</p>
        
        <div className="flex items-center text-xs text-slate-400 mb-4">
          <MapPin size={12} className="mr-1 shrink-0" />
          <span className="truncate">{program.location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
           <div>
             <span className="text-lg font-bold text-slate-900">€{program.price}</span>
             <span className="text-xs text-slate-400"> {program.type === 'service' ? '/hr' : '/session'}</span>
           </div>
           {program.type === 'service' ? (
              <span className="text-xs font-semibold text-primary bg-cyan-50 px-3 py-1.5 rounded-full">Request Info</span>
           ) : (
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">Book Now</span>
           )}
        </div>
      </div>
    </div>
  );
};
