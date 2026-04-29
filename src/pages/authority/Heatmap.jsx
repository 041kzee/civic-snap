import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Map as MapIcon, 
  Search, 
  LayoutDashboard, 
  Ticket, 
  BarChart2, 
  Building2, 
  Settings, 
  MapPin,
  Flame,
  AlertCircle,
  Filter,
  Maximize2
} from 'lucide-react';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup, Polygon } from 'react-leaflet';
import useAuthStore from '../../store/authStore';

const mockWards = [
  { id: 1, name: "Ward 04: Central District", score: 92, health: 'Healthy', open: 24, resolved: 145, goal: 90 },
  { id: 2, name: "Ward 09: Riverside Hub", score: 56, health: 'Moderate', open: 142, resolved: 88, goal: 90 },
  { id: 3, name: "Ward 11: East Industrial", score: 32, health: 'Critical', open: 389, resolved: 40, goal: 90 },
  { id: 4, name: "Ward 02: North Parks", score: 98, health: 'Healthy', open: 15, resolved: 156, goal: 90 },
  { id: 5, name: "Ward 07: Sunset Hill", score: 72, health: 'Moderate', open: 65, resolved: 110, goal: 90 },
  { id: 6, name: "Ward 15: Tech Park", score: 88, health: 'Healthy', open: 21, resolved: 95, goal: 90 },
  { id: 7, name: "Ward 22: Old City", score: 41, health: 'Critical', open: 210, resolved: 60, goal: 90 },
  { id: 8, name: "Ward 03: South Wharf", score: 65, health: 'Moderate', open: 84, resolved: 102, goal: 90 },
];

const Heatmap = () => {
  const { user } = useAuthStore();
  const [view, setView] = useState('Heatmap');
  const [selectedWard, setSelectedWard] = useState(mockWards[1]);
  const [searchQuery, setSearchQuery] = useState('');

  const heatmapPoints = [
    { center: [-33.924, 18.423], radius: 400, color: '#EF4444', intensity: 0.6 },
    { center: [-33.926, 18.425], radius: 600, color: '#EF4444', intensity: 0.4 },
    { center: [-33.922, 18.420], radius: 300, color: '#F59E0B', intensity: 0.5 },
    { center: [-33.928, 18.430], radius: 500, color: '#F59E0B', intensity: 0.3 },
  ];

  const getHealthColor = (health) => {
    if (health === 'Healthy') return 'text-green-600 bg-green-50';
    if (health === 'Moderate') return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getProgressColor = (health) => {
    if (health === 'Healthy') return 'bg-green-500';
    if (health === 'Moderate') return 'bg-amber-500';
    return 'bg-red-500';
  };

  const filteredWards = mockWards.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#3730A3] flex flex-col flex-shrink-0 z-20 shadow-xl">
        <div className="py-6 px-4 mb-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CivicSnap</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", path: "/authority/dashboard" },
            { icon: Ticket, label: "All Tickets", path: "/authority/dashboard/tickets" },
            { icon: MapIcon, label: "Ward Overview", path: "/authority/heatmap" },
            { icon: BarChart2, label: "Analytics", path: "/authority/analytics" },
            { icon: Settings, label: "Settings", path: "/authority/settings" },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 transition-all ${
                  item.label === "Ward Overview" 
                  ? 'bg-white text-[#3730A3] font-bold rounded-lg mx-2' 
                  : 'text-white/70 hover:text-white hover:bg-white/5 mx-2'
                }`
              }
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button className="w-full bg-[#1E1B4B] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-900 transition-all">
             <AlertCircle size={14} />
             Report Emergency
          </button>
        </div>
      </aside>

      {/* Ward Overview Sidebar (Left Panel) */}
      <div className="w-80 bg-white border-r border-slate-100 flex flex-col shadow-sm z-10">
        <div className="p-6">
           <h2 className="text-2xl font-black text-[#1E1B4B] mb-2 tracking-tight">Ward Overview</h2>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Monitoring 12 administrative wards</p>
           
           <div className="relative mb-6">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ward..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo/20 transition-all"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
          {filteredWards.map((ward) => (
            <div 
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedWard?.id === ward.id 
                ? 'bg-white border-[#3730A3] shadow-lg shadow-indigo/5' 
                : 'bg-white border-slate-50 hover:border-slate-200'
              }`}
            >
               <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-slate-900 text-sm leading-tight pr-2">{ward.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${getHealthColor(ward.health)}`}>
                     {ward.health}
                  </span>
               </div>
               
               <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <AlertCircle size={14} />
                  <span className="text-xs font-bold">{ward.open} Open Issues</span>
               </div>

               <div className="space-y-1">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className={`h-full rounded-full transition-all duration-500 ${getProgressColor(ward.health)}`}
                       style={{ width: `${ward.score}%` }}
                     ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                     <span>Resolved: {ward.score}%</span>
                     <span>Goal: {ward.goal}%</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <main className="flex-1 relative bg-slate-100 overflow-hidden">
         <MapContainer 
           center={[-33.924, 18.423]} 
           zoom={14} 
           style={{ height: '100%', width: '100%' }}
           zoomControl={false}
         >
           <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
           
           {view === 'Heatmap' && heatmapPoints.map((point, i) => (
             <Circle 
               key={i}
               center={point.center}
               radius={point.radius}
               pathOptions={{ fillColor: point.color, color: 'transparent', fillOpacity: point.intensity }}
             />
           ))}

           {view === 'Pin View' && mockWards.map((w, i) => (
             <CircleMarker 
               key={i}
               center={[-33.924 + (Math.random() - 0.5) * 0.05, 18.423 + (Math.random() - 0.5) * 0.05]}
               radius={8}
               pathOptions={{ fillColor: '#3730A3', color: 'white', weight: 2, fillOpacity: 0.8 }}
             >
                <Popup>
                  <div className="p-2">
                    <p className="font-black text-xs mb-1">{w.name}</p>
                    <p className="text-[10px] text-slate-500">{w.open} Active Issues</p>
                  </div>
                </Popup>
             </CircleMarker>
           ))}

           {view === 'Boundaries' && (
             <Polygon 
               positions={[
                 [-33.91, 18.41], [-33.91, 18.44], [-33.94, 18.44], [-33.94, 18.41]
               ]}
               pathOptions={{ color: '#3730A3', weight: 1, dashArray: '5, 10', fillOpacity: 0.05 }}
             />
           )}
         </MapContainer>

         {/* View Toggle Bar (Floating) */}
         <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex p-1 bg-white rounded-2xl shadow-2xl border border-slate-100">
            {[
              { id: 'Heatmap', icon: Flame },
              { id: 'Pin View', icon: MapPin },
              { id: 'Boundaries', icon: Filter }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === v.id ? 'bg-[#3730A3] text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <v.icon size={14} />
                {v.id}
              </button>
            ))}
         </div>

         {/* Ward Details Popup (Center-ish Map) */}
         {selectedWard && (
            <div className="absolute top-1/2 right-12 -translate-y-1/2 z-[1000] w-64 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-slide-left">
               <div className="bg-[#1E1B4B] p-4 text-white relative">
                  <h3 className="font-black text-sm pr-4">{selectedWard.name} <span className="text-amber-400">●</span></h3>
                  <button className="absolute top-4 right-4 text-white/50 hover:text-white transition-all"><Maximize2 size={16} /></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold">Health Score:</span>
                     <span className="text-amber-500 font-black">{selectedWard.score}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold">Active Alerts:</span>
                     <span className="text-slate-900 font-black">{selectedWard.open}</span>
                  </div>
                  <button className="w-full bg-[#1E1B4B] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest mt-2">View Details</button>
               </div>
            </div>
         )}

         {/* Bottom Ward Summary Strip */}
         <div className="absolute bottom-0 left-0 right-0 z-[1000] h-32 bg-white/95 backdrop-blur-sm border-t border-slate-100 flex items-center px-4 overflow-x-auto gap-4 scrollbar-hide">
            {[
              { type: 'CRITICAL ALERT', ward: 'Ward 11: East Industrial', category: 'Sanitation', count: 389, color: 'border-red-500' },
              { type: 'RISING TREND', ward: 'Ward 09: Riverside Hub', category: 'Infrastructure', count: 142, color: 'border-amber-500' },
              { type: 'DELAYED FIX', ward: 'Ward 22: Old City', category: 'Public Lighting', count: 210, color: 'border-red-500' },
              { type: 'STABLE', ward: 'Ward 04: Central District', category: 'Water Supply', count: 24, color: 'border-green-500' },
              { type: 'NEW HOTSPOT', ward: 'Ward 07: Sunset Hill', category: 'Road Damage', count: 65, color: 'border-amber-500' },
            ].map((card, i) => (
              <div key={i} className={`flex-shrink-0 w-72 bg-white rounded-2xl p-4 border-l-4 shadow-sm ${card.color} border border-slate-100`}>
                 <p className={`text-[8px] font-black mb-1 ${card.color.replace('border-', 'text-')}`}>{card.type}</p>
                 <h5 className="text-xs font-black text-slate-900 mb-3 truncate">{card.ward}</h5>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[8px] text-slate-400 font-bold mb-0.5">Top Category:</p>
                       <p className="text-[10px] font-black text-slate-700">{card.category}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] text-slate-400 font-bold mb-0.5">Issue Count:</p>
                       <p className="text-xs font-black text-slate-900">{card.count}</p>
                    </div>
                 </div>
                 <button className="w-full mt-3 text-[8px] font-black text-[#3730A3] uppercase tracking-widest hover:underline">View All Issues</button>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
};

export default Heatmap;

