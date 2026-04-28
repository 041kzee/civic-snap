import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  Building2, 
  Plus, 
  MoreVertical, 
  Clock, 
  Users, 
  AlertCircle, 
  Trash, 
  Droplets, 
  Zap, 
  TreePine, 
  Wrench, 
  Trash2,
  Map as MapIcon,
  LayoutDashboard,
  Ticket,
  BarChart2,
  Camera,
  X,
  User,
  Shield,
  Save,
  Loader2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const mockDepts = [
  { id: 1, name: "Roads & Highways", icon: Wrench, sla: "48 hours", officers: 12, open: 42, perf: "Excellent" },
  { id: 2, name: "Public Health", icon: Droplets, sla: "24 hours", officers: 8, open: 15, perf: "Good" },
  { id: 3, name: "Sanitation Dept.", icon: Trash2, sla: "12 hours", officers: 24, open: 68, perf: "Poor" },
  { icon: Zap, name: "Electricity", sla: "6 hours", officers: 15, open: 8, perf: "Excellent" },
  { icon: TreePine, name: "Urban Forestry", sla: "72 hours", officers: 6, open: 3, perf: "Good" },
  { icon: Building2, name: "General Admin", sla: "24 hours", officers: 5, open: 12, perf: "Good" },
];

const Departments = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Sidebar - Authority Style */}
      <aside className="w-64 bg-indigo-dark text-white flex flex-col flex-shrink-0">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg">
            <Camera size={20} className="text-indigo" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CivicSnap</span>
        </div>
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard' },
            { icon: Ticket, label: 'All Tickets', path: '/authority/tickets' },
            { icon: BarChart2, label: 'Analytics', path: '/authority/analytics' },
            { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap' },
            { icon: Building2, label: 'Departments', path: '/authority/departments', active: true },
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 flex-shrink-0">
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Department Management</h1>
           <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-6 shadow-xl shadow-indigo/20">
              <Plus size={18} />
              Add Department
           </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockDepts.map((dept, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                  onClick={() => setSelectedDept(dept)}
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-indigo-light rounded-2xl flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-all">
                        {dept.icon ? <dept.icon size={24} /> : <Building2 size={24} />}
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                   </div>
                   
                   <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">{dept.name}</h3>
                   
                   <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-xs font-bold">
                         <span className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Clock size={14} /> SLA Period</span>
                         <span className="text-slate-700">{dept.sla}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                         <span className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Users size={14} /> Officers</span>
                         <span className="text-slate-700">{dept.officers} active</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                         <span className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><AlertCircle size={14} /> Open Issues</span>
                         <span className="text-danger">{dept.open} pending</span>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <Badge status={dept.perf === 'Excellent' ? 'Resolved' : dept.perf === 'Poor' ? 'Open' : 'In Progress'}>
                        {dept.perf} Performance
                      </Badge>
                      <button className="text-indigo font-bold text-xs hover:underline">Manage Team</button>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      </main>

      {/* Right Drawer */}
      {selectedDept && (
        <>
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-[2000]" onClick={() => setSelectedDept(null)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-[2001] animate-slide-left flex flex-col">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo text-white">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/20 rounded-lg">
                      {selectedDept.icon ? <selectedDept.icon size={20} /> : <Building2 size={20} />}
                   </div>
                   <h3 className="text-xl font-bold">{selectedDept.name}</h3>
                </div>
                <button onClick={() => setSelectedDept(null)} className="hover:bg-white/10 p-1.5 rounded-lg transition-all">
                  <X size={24} />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Department Officers</h4>
                   <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-indigo border border-slate-100">
                                 {String.fromCharCode(64 + i)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">Officer {['Ravi', 'Anita', 'Sita', 'Vikram'][i-1]}</p>
                                 <p className="text-[10px] text-emerald font-black uppercase tracking-wider">Active • {i*2} Tickets</p>
                              </div>
                           </div>
                           <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={18} /></button>
                        </div>
                      ))}
                      <Button variant="secondary" className="w-full py-3 text-xs border-dashed border-2">Assign New Officer</Button>
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Service Level Config</h4>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Max Resolution Time</label>
                         <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              defaultValue={48} 
                              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo/20" 
                            />
                            <span className="text-xs font-bold text-slate-400">hours</span>
                         </div>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">Changing this will affect the SLA countdown for all future tickets assigned to this department.</p>
                   </div>
                </div>
             </div>

             <div className="p-8 border-t border-slate-100 flex gap-4">
                <Button className="flex-1 flex items-center justify-center gap-2 font-bold py-4">
                   <Save size={18} />
                   Save Changes
                </Button>
             </div>
          </div>
        </>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-[3000] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
           <Card className="w-full max-w-lg relative z-10 p-8 border-none shadow-2xl animate-scale-up rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Department</h3>
                 <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Department Name</label>
                    <input type="text" placeholder="e.g. Traffic Management" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-indigo/20" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Target SLA (Hours)</label>
                       <input type="number" placeholder="24" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-indigo/20" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Icon Library</label>
                       <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none appearance-none">
                          <option>Wrench</option>
                          <option>Droplets</option>
                          <option>Zap</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Officer Assignment</label>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-h-40 overflow-y-auto space-y-3">
                       {[1, 2, 3, 4, 5].map(i => (
                         <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded text-indigo focus:ring-indigo outline-none" />
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Officer {['Ravi', 'Anita', 'Sita', 'Vikram', 'Raj'][i-1]}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 
                 <div className="flex gap-4 pt-4">
                    <Button variant="secondary" className="flex-1 py-4 font-bold" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button className="flex-1 py-4 font-bold shadow-xl shadow-indigo/20">Create Dept</Button>
                 </div>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
};

export default Departments;
