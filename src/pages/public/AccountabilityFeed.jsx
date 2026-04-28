import React, { useState } from 'react';
import { 
  CheckCircle, 
  RefreshCw, 
  Clock, 
  MapPin, 
  ArrowRight,
  Filter,
  Camera,
  Search,
  ChevronDown
} from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const mockFeed = [
  { id: 1, title: "Pothole Repaired", category: "Road Damage", status: "Resolved", ward: "Ward 4", reporter: "Anita S.", resolver: "Roads Dept.", time: "2h ago", color: "emerald" },
  { id: 2, title: "Cleanup in Progress", category: "Sanitation", status: "In Progress", ward: "Ward 12", reporter: "John D.", resolver: "Waste Management", time: "5h ago", color: "amber" },
  { id: 3, title: "Streetlight Fixed", category: "Utilities", status: "Resolved", ward: "Ward 7", reporter: "Vikram R.", resolver: "Electricity Board", time: "1d ago", color: "emerald" },
  { id: 4, title: "Water Leak Reported", category: "Utilities", status: "Open", ward: "Ward 1", reporter: "Sita S.", resolver: "Water Board", time: "3h ago", color: "danger" },
  { id: 5, title: "Tree Removed", category: "Parks", status: "Resolved", ward: "Ward 2", reporter: "Alex P.", resolver: "Forestry Dept.", time: "2d ago", color: "emerald" },
  { id: 6, title: "Signal Repaired", category: "Traffic", status: "Resolved", ward: "Ward 4", reporter: "Citizen #402", resolver: "Traffic Dept.", time: "4h ago", color: "emerald" },
];

const AccountabilityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      
      {/* Hero Banner */}
      <div className="bg-indigo py-6 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
           <div className="text-center md:text-left">
              <h1 className="text-white text-xl font-bold tracking-tight">Civic Accountability Feed</h1>
              <p className="text-indigo-light text-xs font-medium mt-1">See what's being fixed in your city, in real time.</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] bg-emerald text-white px-3 py-1 rounded-full font-black uppercase">24 Fixed Today</span>
              <span className="text-[10px] bg-white/20 text-white px-3 py-1 rounded-full font-black uppercase">8 In Progress</span>
           </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Search & Filter Card */}
        <Card className="p-4 mb-10 border-none shadow-sm flex flex-col md:flex-row items-center gap-4">
           <div className="flex-1 relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search wards or categories..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 font-medium"
              />
           </div>
           <div className="flex gap-3 w-full md:w-auto">
              {['All', 'Fixed', 'Pending'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === f ? 'bg-indigo text-white shadow-lg shadow-indigo/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
           </div>
        </Card>

        {/* Feed List */}
        <div className="space-y-6">
          {mockFeed.map((item) => (
            <Card key={item.id} className={`group border-none shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}>
               {/* Side Status Bar */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color === 'emerald' ? 'bg-emerald' : item.color === 'amber' ? 'bg-amber' : 'bg-danger'}`}></div>
               
               <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.color === 'emerald' ? 'bg-emerald/10 text-emerald' : 'bg-amber/10 text-amber'}`}>
                        {item.status === 'Resolved' ? <CheckCircle size={12} /> : <RefreshCw size={12} className="animate-spin-slow" />}
                        {item.status}
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                  </div>

                  <div className="flex gap-6 mb-6">
                     <div className="w-24 h-24 bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-300 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <Camera size={32} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-indigo transition-colors">{item.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                           <Badge variant="indigo" className="text-[10px] py-0.5">{item.category}</Badge>
                           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                              <MapPin size={10} /> {item.ward}
                           </div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium line-clamp-2">The issue reported at this location has been successfully addressed by the local authorities.</p>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <span>Reported by</span>
                        <span className="font-black text-slate-900">{item.reporter}</span>
                     </div>
                     <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <span>Resolved by</span>
                        <span className="font-black text-indigo bg-indigo-light px-2 py-0.5 rounded-md">{item.resolver}</span>
                     </div>
                  </div>
               </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
           <Button variant="secondary" className="px-10 py-4 font-bold rounded-2xl hover:bg-white border-2">
              Load More Updates
           </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountabilityFeed;
