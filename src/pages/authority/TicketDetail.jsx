import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  LayoutDashboard, 
  Ticket, 
  BarChart2, 
  Map as MapIcon, 
  Building2, 
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  History,
  FileText
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAuthStore from '../../store/authStore';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [priority, setPriority] = useState('High');
  const [showAudit, setShowAudit] = useState(true);
  const [status, setStatus] = useState('In Progress');

  const timelineSteps = [
    { label: "Reported", status: "completed", time: "Oct 24, 10:30 AM" },
    { label: "Assigned", status: "completed", time: "Oct 24, 2:15 PM" },
    { label: "In Progress", status: "current", time: "Oct 25, 9:00 AM" },
    { label: "Resolved", status: "pending", time: "Expected 2 days" },
  ];

  const auditLog = [
    { action: "SLA Breach Alert Triggered", user: "System Automated", time: "2 hours ago", type: "system" },
    { action: 'Ticket Status Changed to "In Progress"', user: "Officer J. Doe", time: "5 hours ago", type: "user" },
    { action: "Ticket Assigned to Water & Sanitation", user: "Admin System", time: "1 day ago", type: "system" },
    { action: "Initial Report Submitted", user: "Citizen", time: "2 days ago", type: "user" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#3730A3] flex flex-col flex-shrink-0 z-20">
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
            { icon: BarChart2, label: "Analytics", path: "/authority/analytics" },
            { icon: MapIcon, label: "Heatmap", path: "/authority/heatmap" },
            { icon: Building2, label: "Departments", path: "/authority/departments" },
            { icon: Settings, label: "Settings", path: "/authority/settings" },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 transition-all ${
                  item.label === "All Tickets" 
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

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-white">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/20">
              {user?.name?.charAt(0) || 'O'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user?.name || 'Officer Mitchell'}</p>
              <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[8px] font-black uppercase tracking-wider text-white/80">Authority</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* SLA Banner */}
        <div className="bg-[#B91C1C] text-white py-3 px-8 flex items-center gap-3 flex-shrink-0 z-10">
          <AlertTriangle size={20} />
          <span className="text-sm font-bold">SLA Breached — This ticket was due 2 days ago. Escalated to Department Head.</span>
          <button className="ml-auto bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all">View Policy</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left Column (65%) */}
              <div className="lg:w-[65%] space-y-8">
                {/* Header Image & Status */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
                  <div className="h-[400px] w-full overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1584210660322-01256338e55e?w=1000&q=80" 
                      className="w-full h-full object-cover" 
                      alt="Water leak evidence" 
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-indigo-light text-[#3730A3] text-[10px] font-black rounded uppercase">WATER</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded uppercase">HIGH SEVERITY</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase">WARD: SUNSET HILL</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">REPORTED: 2 DAYS AGO</p>
                    <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Major Water Leak - Water & Sanitation</h1>
                    <p className="text-slate-600 leading-relaxed">
                      A significant water main burst has been reported near the intersection of Elm and Sunset. 
                      The water pressure is causing damage to the road surface and flooding adjacent sidewalks. 
                      Multiple residents have reported low water pressure in the area.
                    </p>
                  </div>
                </div>

                {/* Resolution Progress */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">RESOLUTION PROGRESS</h3>
                  <div className="flex justify-between relative">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-100 -z-0"></div>
                    {timelineSteps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          step.status === 'completed' ? 'bg-emerald text-white' : 
                          step.status === 'current' ? 'bg-amber text-white ring-4 ring-amber/20' : 
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                           step.status === 'current' ? <History size={20} className="animate-pulse" /> : 
                           <FileText size={20} />}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Feedback */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                   <div className="flex items-center justify-between mb-8">
                     <h3 className="text-lg font-black text-slate-900">Community Feedback</h3>
                     <span className="text-xs font-bold text-slate-400">3 Comments</span>
                   </div>
                   <div className="space-y-6">
                      {[
                        { name: "Mark Stevenson", time: "4 hours ago", text: "The water is starting to freeze on the sidewalk. This is becoming a slip hazard for the elderly neighbors." },
                        { name: "Sarah Chen", time: "1 day ago", text: "Called the emergency line but was on hold for 15 mins. Glad to see it's marked as In Progress now." }
                      ].map((c, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`} alt="avatar" />
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-slate-900">{c.name}</span>
                                <span className="text-[10px] text-slate-400">• {c.time}</span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                           </div>
                        </div>
                      ))}
                      <div className="flex gap-4 pt-4 border-t border-slate-50">
                         <div className="w-10 h-10 rounded-full bg-indigo-light flex items-center justify-center text-[#3730A3] flex-shrink-0">
                            <Shield size={20} />
                         </div>
                         <div className="flex-1">
                            <textarea 
                              placeholder="Add a public response..." 
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20"
                            ></textarea>
                            <div className="flex justify-end mt-2">
                               <button className="bg-[#3730A3] text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest">Post</button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Audit Trail Section */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
                  <button 
                    onClick={() => setShowAudit(!showAudit)}
                    className="w-full flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                       <History size={20} className="text-[#3730A3]" />
                       <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Activity Log & Audit Trail</h3>
                    </div>
                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${showAudit ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showAudit && (
                    <div className="p-8 space-y-6">
                      {auditLog.map((log, i) => (
                        <div key={i} className="flex gap-4 relative group">
                          {i !== auditLog.length - 1 && <div className="absolute left-[5px] top-4 bottom-[-24px] w-0.5 bg-slate-100"></div>}
                          <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${log.type === 'system' ? 'bg-red-500' : 'bg-[#3730A3]'}`}></div>
                          <div className="flex-1 border-b border-slate-50 pb-4 last:border-0">
                            <p className="text-sm font-black text-slate-800">{log.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-slate-400 font-bold">{log.time}</span>
                              <span className="text-[10px] text-slate-400 font-bold">• {log.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (35%) */}
              <div className="lg:w-[35%] space-y-8">
                {/* Authority Action Panel */}
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 ring-1 ring-black/5">
                  <div className="bg-[#1E1B4B] p-6 text-white flex items-center gap-3">
                    <Shield size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Manage Ticket</h3>
                  </div>
                  <div className="p-8 space-y-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">TICKET STATUS</label>
                      <div className="relative">
                        <select 
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-900 outline-none appearance-none"
                        >
                          <option>Open</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                          <option>Escalated</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">ASSIGN DEPARTMENT</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-900 outline-none appearance-none">
                          <option>Water & Sanitation</option>
                          <option>Public Works</option>
                          <option>Sanitation Dept.</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">PRIORITY LEVEL</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Low', 'Med', 'High', 'Critical'].map((p) => (
                          <button
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`py-3 rounded-xl text-[10px] font-black border transition-all ${
                              priority === p 
                              ? 'bg-[#3730A3] text-white border-[#3730A3] shadow-lg shadow-indigo/20' 
                              : p === 'Critical' ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">INTERNAL NOTES (OFFICER ONLY)</label>
                      <textarea 
                        placeholder="Type internal update here..." 
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-indigo/20 italic"
                      ></textarea>
                      <p className="mt-2 text-[10px] text-slate-400 italic">Not visible to citizens</p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <button className="w-full bg-[#1E1B4B] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-indigo-900 transition-all flex items-center justify-center gap-2">
                         <History size={16} />
                         Save Changes
                      </button>
                      <button className="w-full border-2 border-[#B91C1C] text-[#B91C1C] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 transition-all">
                         Escalate to Supervisor
                      </button>
                    </div>
                  </div>
                </div>

                {/* Incident Location Card */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Incident Location</h4>
                      <span className="text-[10px] font-bold text-indigo tracking-tight">GPS: -33.924, 18.423</span>
                   </div>
                   <div className="h-48 bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-200 relative group">
                      <MapContainer 
                        center={[-33.924, 18.423]} 
                        zoom={15} 
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                        dragging={false}
                      >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <Marker position={[-33.924, 18.423]} />
                      </MapContainer>
                      <button className="absolute bottom-2 right-2 bg-white p-1.5 rounded shadow-md border border-slate-200 text-slate-400 hover:text-indigo">
                         <ChevronRight size={16} />
                      </button>
                   </div>
                   <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-slate-400 mt-0.5" />
                      <p className="text-xs font-bold text-slate-600">452 Elm Street, Sunset Hill District</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
