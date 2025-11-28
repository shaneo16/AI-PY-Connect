import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  LayoutDashboard, List, Users, Calendar, TrendingUp, DollarSign, Plus, Settings, Search, Edit, Trash2 
} from 'lucide-react';
import { PROVIDER_STATS, ANALYTICS_DATA, MOCK_PROGRAMS } from '../constants';
import { Button } from './Button';

export const ProviderPortal: React.FC = () => {
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
            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active />
            <SidebarLink icon={<List size={20} />} label="My Programs" />
            <SidebarLink icon={<Calendar size={20} />} label="Schedule" />
            <SidebarLink icon={<Users size={20} />} label="Students" />
            <SidebarLink icon={<TrendingUp size={20} />} label="Analytics" />
          </nav>
        </div>
        <div className="mt-auto pt-6 border-t border-slate-800">
          <SidebarLink icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Business Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Berlin Kickers Dashboard</h1>
            <p className="text-slate-500">Welcome back, Shane.</p>
          </div>
          <Button className="flex items-center gap-2 bg-secondary hover:bg-fuchsia-600">
            <Plus size={18} /> New Program
          </Button>
        </header>

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
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h3>
            <div className="h-72">
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

        {/* Program Management */}
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
                      <button className="p-1 text-slate-400 hover:text-primary transition-colors"><Edit size={16}/></button>
                      <button className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-secondary text-white font-medium shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
    {icon}
    <span>{label}</span>
  </button>
);