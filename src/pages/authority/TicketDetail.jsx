import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Camera, 
  LayoutDashboard, 
  Ticket, 
  BarChart2, 
  Map as MapIcon, 
  Building2, 
  Shield, 
  LogOut,
  ChevronDown,
  MessageSquare,
  Send,
  Loader2,
  Trash2,
  History,
  FileText,
  User as UserIcon,
  ShieldCheck,
  Flag
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [priority, setPriority] = useState('High');
  const [showAudit, setShowAudit] = useState(false);

  const timeline = [
    { label: "Reported", date: "Oct 24, 10:30 AM", user: "Citizen #12", action: "Created via Web" },
    { label: "Validated", date: "Oct 24, 11:45 AM", user: "AI System", action: "Categorized as Pothole" },
    { label: "Assigned", date: "Oct 24, 2:15 PM", user: "System", action: "Assigned to Roads Dept." },
    { label: "In Progress", date: "Oct 25, 9:00 AM", user: "Officer Ravi", action: "Inspection Completed" },
  ];

  const auditLog = [
    { action: "Priority changed from Medium to High", user: "Officer Ravi", time: "2h ago" },
    { action: "Internal note added", user: "Dept Head", time: "5h ago" },
    { action: "SLA Deadline extended", user: "System", time: "1d ago" },
    { action: "Initial validation", user: "AI Assistant", time: "2d ago" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Authority Style */}
      <aside className="w-64 bg-indigo-dark text-white flex flex-col flex-shrink-0">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-xl shadow-black/20">
            <Camera size={20} className="text-indigo" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CivicSnap</span>
        </div>
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard' },
            { icon: Ticket, label: 'All Tickets', path: '/authority/tickets', active: true },
            { icon: BarChart2, label: 'Analytics', path: '/authority/analytics' },
            { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap' },
            { icon: Building2, label: 'Departments', path: '/authority/departments' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active 
                ? 'bg-white text-indigo font-bold shadow-xl shadow-black/10' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 mt-auto">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo font-bold text-sm">A</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Officer Ravi</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">Authority</p>
              </div>
              <button onClick={() => { logout(); navigate('/auth'); }} className="text-white/30 hover:text-danger transition-colors"><LogOut size={16} /></button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* SLA Banner */}
        <div className="bg-danger text-white py-3 px-10 flex items-center gap-3 shadow-lg z-10 animate-slide-down">
           <AlertTriangle size={18} />
           <span className="text-sm font-bold tracking-wide uppercase">SLA Breached — This ticket was due 2 days ago. Escalated to Department Head.</span>
           <button className="ml-auto text-[10px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full font-bold uppercase transition-colors">Request SLA Extension</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column (60%) */}
            <div className="lg:w-[60%] space-y-8">
              {/* Image & Header */}
              <div className="space-y-6">
                <div className="relative group h-96 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                   <img 
                     src="https://images.unsplash.com/photo-1599423300746-b62533397364?w=1000" 
                     className="w-full h-full object-cover" 
                     alt="Ticket evidence" 
                   />
                   <div className="absolute top-6 left-6 flex gap-2">
                      <Badge variant="indigo" className="shadow-lg">CS-398</Badge>
                      <Badge variant="danger" className="shadow-lg flex items-center gap-1.5"><Flag size={12} /> High Priority</Badge>
                   </div>
                </div>
                <div>
                   <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Large Pothole — MG Road Intersection</h1>
                   <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><MapPin size={14} /> Ward 4</span>
                      <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><Clock size={14} /> Reported Oct 24, 2025</span>
                   </div>
                </div>
              </div>

              {/* Internal Notes */}
              <Card className="p-8 border-none shadow-sm bg-indigo-light/20">
                 <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-indigo" />
                    Officer Observations
                 </h3>
                 <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    "Site visited on Oct 25. The damage is indeed severe and reaches the base layer. A permanent patch is required, temporary filling won't hold due to heavy bus traffic."
                 </p>
                 <div className="flex gap-3">
                    <input type="text" placeholder="Add internal note..." className="flex-1 px-4 py-2 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 text-sm font-medium" />
                    <Button variant="secondary" className="px-4 py-2 text-xs">Add Note</Button>
                 </div>
              </Card>

              {/* Status Timeline */}
              <Card className="p-8 border-none shadow-sm">
                 <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <History size={20} className="text-indigo" />
                    Ticket Lifecycle
                 </h3>
                 <div className="relative space-y-10 pl-6 border-l-2 border-slate-50">
                    {timeline.map((item, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald border-4 border-white shadow-lg"></div>
                         <div className="flex justify-between items-start">
                            <div>
                               <p className="text-sm font-bold text-slate-900">{item.label}</p>
                               <p className="text-xs text-slate-500">{item.action}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</p>
                               <p className="text-[10px] font-bold text-indigo italic">{item.user}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              {/* Audit Trail Section */}
              <div className="space-y-4">
                 <button 
                   onClick={() => setShowAudit(!showAudit)}
                   className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all font-bold text-slate-900"
                 >
                    <span className="flex items-center gap-2"><ShieldCheck size={20} className="text-emerald" /> Official Audit Log</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${showAudit ? 'rotate-180' : ''}`} />
                 </button>
                 
                 {showAudit && (
                   <div className="bg-white rounded-2xl p-6 shadow-inner border border-slate-100 space-y-4 animate-expand">
                      {auditLog.map((log, i) => (
                        <div key={i} className="flex justify-between items-center text-xs py-2 border-b border-slate-50 last:border-0">
                           <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo"></div>
                              <span className="font-bold text-slate-700">{log.action}</span>
                           </div>
                           <div className="text-right flex items-center gap-4">
                              <span className="text-indigo font-bold">{log.user}</span>
                              <span className="text-slate-400">{log.time}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
            </div>

            {/* Right Column (40%) */}
            <div className="lg:w-[40%] space-y-6">
              {/* Authority Action Panel */}
              <Card className="border-2 border-indigo shadow-2xl overflow-hidden rounded-[2.5rem]">
                 <div className="bg-indigo p-6 text-white">
                    <h3 className="text-xl font-bold flex items-center gap-3 uppercase tracking-widest text-sm">
                       Manage Ticket
                    </h3>
                 </div>
                 <div className="p-8 space-y-8">
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Resolution Status</label>
                       <div className="relative">
                          <select className="w-full pl-5 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                             <option>Open</option>
                             <option selected>In Progress</option>
                             <option>Resolved</option>
                             <option>Rejected / Not an issue</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Assign To Department</label>
                       <div className="relative">
                          <select className="w-full pl-5 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                             <option selected>Roads & Highways</option>
                             <option>Public Health</option>
                             <option>Sanitation Dept.</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Priority Level</label>
                       <div className="flex gap-2">
                          {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                            <button
                              key={p}
                              onClick={() => setPriority(p)}
                              className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${
                                priority === p 
                                ? 'bg-indigo text-white shadow-lg shadow-indigo/20 scale-105' 
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-4 space-y-3">
                       <Button className="w-full py-4 text-sm font-black shadow-xl shadow-indigo/20 tracking-widest uppercase">Save Changes</Button>
                       <button className="w-full py-4 rounded-2xl border-2 border-danger text-danger font-black text-xs tracking-widest uppercase hover:bg-danger-light transition-all flex items-center justify-center gap-2">
                          <AlertTriangle size={16} />
                          Escalate Issue
                       </button>
                    </div>
                 </div>
              </Card>

              {/* Map Location Card */}
              <Card className="p-6 border-none shadow-sm rounded-[2.5rem]">
                 <div className="rounded-[2rem] h-48 overflow-hidden mb-4 shadow-inner border border-slate-100">
                    <MapContainer 
                      center={[20.5937, 78.9629]} 
                      zoom={15} 
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={false}
                      dragging={false}
                    >
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                      <Marker position={[20.5937, 78.9629]} />
                    </MapContainer>
                 </div>
                 <div className="px-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><MapPin size={12} /> MG Road Intersection</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Near the Central Metro Station Entrance Gate 2. Busy junction.</p>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetail;
