
import React, { useState } from 'react';
import { Search, MapPin, List, Map as MapIcon, Lock, X, ArrowLeft } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_SCHOOLS } from '../constants';
import { Program } from '../types';
import { Button } from './Button';
import { ProgramCard } from './ParentPortal';

interface PublicProgramsProps {
  onLoginRequest: () => void;
}

export const PublicPrograms: React.FC<PublicProgramsProps> = ({ onLoginRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prog.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSchool = selectedSchool === 'All' || (prog.schoolId === selectedSchool);
    
    return matchesSearch && matchesCategory && matchesSchool;
  });

  const categories = ['All', 'Sports', 'Arts', 'Music', 'Education', 'Life Skills', 'Camps', 'Workshops'];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
               <h1 className="text-3xl font-bold text-slate-900">Explore Programs</h1>
               <p className="text-slate-500">Discover top-rated activities for your children. Join to book!</p>
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
               <ProgramCard 
                 key={program.id} 
                 program={program} 
                 onClick={() => setSelectedProgram(program)} 
                 onProviderClick={onLoginRequest} // Guest cannot view full provider profile without login
               />
             ))}
           </div>
         ) : (
           <div className="bg-slate-200 rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden border border-slate-300 shadow-inner">
               <div className={`absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/13.4050,52.5200,10,0/800x600?access_token=pk.xxx')] bg-cover bg-center blur-md scale-105`}></div>
               <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-10">
                  <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                     <Lock className="mx-auto mb-3 text-secondary" size={32}/>
                     <h3 className="font-bold text-lg mb-2">Map View Locked</h3>
                     <p className="text-slate-600 text-sm mb-4">Please log in to view precise locations and filter by proximity.</p>
                     <Button onClick={onLoginRequest} className="bg-primary text-slate-900 font-bold">Log In</Button>
                  </div>
               </div>
           </div>
         )}
      </div>

      {/* Program Detail Modal (Public Version) */}
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
                       <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProgram.title}</h2>
                       <div className="flex items-center text-slate-600 mb-4">
                          <MapPin size={16} className="mr-1" /> {selectedProgram.location}
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <div className="text-3xl font-bold text-primaryDark">€{selectedProgram.price}</div>
                       <div className="text-sm text-slate-400">per session</div>
                    </div>
                 </div>

                 <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center mb-8">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Ready to Book?</h3>
                    <p className="text-slate-600 mb-4">Create a free account to book this program, message the provider, and track your child's progress.</p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={onLoginRequest}>Log In</Button>
                        <Button className="bg-primary hover:bg-primaryDark text-slate-900 font-bold" onClick={onLoginRequest}>Register Now</Button>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 mb-2">About this program</h3>
                       <p className="text-slate-600 leading-relaxed">
                          This comprehensive program is designed to build fundamental skills in a fun and supportive environment.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
