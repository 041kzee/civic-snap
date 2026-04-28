import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Shield,
  Activity,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';

const barData = [
  { name: 'Potholes', value: 45 },
  { name: 'Garbage', value: 82 },
  { name: 'Lights', value: 34 },
  { name: 'Water', value: 21 },
  { name: 'Traffic', value: 18 },
];

const mockRecent = [
  { id: 1, title: "Street Light Out", category: "Utilities", status: "Open", date: "2h ago" },
  { id: 2, title: "Large Pothole", category: "Roads", status: "In Progress", date: "5h ago" },
  { id: 3, title: "Illegal Dumping", category: "Sanitation", status: "Open", date: "1d ago" },
];

const WardReport = () => {
  const navigate = useNavigate();
  const [selectedWard, setSelectedWard] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handleWardSelect = (e) => {
    setSelectedWard(e.target.value);
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Ward Selector Card */}
        <Card className={`p-10 border-none shadow-xl transition-all duration-700 ${showContent ? 'mb-12' : 'mt-20'}`}>
           <div className="text-center max-w-sm mx-auto">
              <div className="w-16 h-16 bg-indigo-light rounded-2xl flex items-center justify-center text-indigo mx-auto mb-6">
                 <MapPin size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Ward Accountability</h2>
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">Select your ward to see local resolution performance and civic health stats.</p>
              
              <div className="relative group">
                 <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo transition-colors" />
                 <select 
                   value={selectedWard} 
                   onChange={handleWardSelect}
                   className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo/10 appearance-none shadow-inner"
                 >
                    <option value="" disabled>Search & Select Your Ward...</option>
                    <option value="Ward 4">Ward 4 - Green Valley</option>
                    <option value="Ward 12">Ward 12 - Downtown</option>
                    <option value="Ward 7">Ward 7 - West Coast</option>
                 </select>
                 <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </div>
        </Card>

        {showContent && (
          <div className="space-y-10 animate-fade-in-up">
             {/* Civic Health Score Card */}
             <Card className="p-10 border-none shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald via-amber to-danger"></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Civic Health Score</h3>
                
                <div className="relative w-64 h-32 mb-8">
                   {/* Simple SVG Semicircle Gauge */}
                   <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 65 15" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="40" className="animate-draw" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-end">
                      <span className="text-6xl font-black text-slate-900 leading-none">68</span>
                      <span className="text-xs font-black text-emerald uppercase tracking-widest mt-2">Moderate Health</span>
                   </div>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-2">{selectedWard} Summary</h4>
                <p className="text-sm text-slate-500 italic max-w-sm">"Moderate civic health — 24 open issues need attention. Resolution rate is up by 12% this month."</p>
             </Card>

             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Reported" value="142" icon={Activity} color="indigo" />
                <StatCard title="Resolved This Month" value="38" icon={CheckCircle} color="emerald" />
                <StatCard title="Avg Resolution Time" value="4.2d" icon={Clock} color="amber" />
             </div>

             <div className="grid lg:grid-cols-2 gap-10">
                {/* Category Breakdown */}
                <Card className="p-8 border-none shadow-sm">
                   <h4 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                      <TrendingUp size={20} className="text-indigo" />
                      Top Issue Types
                   </h4>
                   <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} layout="vertical">
                           <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F8FAFC" />
                           <XAxis type="number" hide />
                           <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748B'}} width={80} />
                           <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                           <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                              {barData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={index === 1 ? '#F59E0B' : '#3730A3'} />
                              ))}
                           </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                </Card>

                {/* Recent Issues List */}
                <Card className="p-8 border-none shadow-sm">
                   <h4 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                      <Clock size={20} className="text-indigo" />
                      Recent Open Issues
                   </h4>
                   <div className="space-y-4">
                      {mockRecent.map((issue, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-300">
                                 <Activity size={20} />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{issue.title}</p>
                                 <div className="flex items-center gap-2">
                                    <Badge variant="indigo" className="text-[9px] px-1.5 py-0">{issue.category}</Badge>
                                    <span className="text-[10px] text-slate-400 font-bold">{issue.date}</span>
                                 </div>
                              </div>
                           </div>
                           <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo transition-all" />
                        </div>
                      ))}
                      <button className="w-full text-center text-xs font-bold text-indigo mt-4 hover:underline">View All Issues →</button>
                   </div>
                </Card>
             </div>

             {/* CTA Banner */}
             <div className="bg-indigo-dark rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10">
                   <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">See a problem in {selectedWard}?</h3>
                   <p className="text-indigo-light mb-10 max-w-sm mx-auto text-sm leading-relaxed">Report it now and hold your city accountable. Every report helps improve our Civic Health Score.</p>
                   <Button 
                     onClick={() => navigate('/auth')}
                     variant="secondary" 
                     className="px-10 py-4 font-bold text-base hover:bg-white border-2 border-white/20 hover:border-white transition-all shadow-xl"
                   >
                     Start Reporting Now
                   </Button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardReport;
