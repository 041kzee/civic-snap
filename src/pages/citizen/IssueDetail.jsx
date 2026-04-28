import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ThumbsUp, 
  Users, 
  MessageSquare, 
  Send,
  MoreVertical,
  AlertTriangle,
  ChevronDown,
  ShieldCheck,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAuthStore from '../../store/authStore';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const IssueDetail = () => {
  const { id } = useParams();
  const { role } = useAuthStore();
  const [upvoted, setUpvoted] = useState(false);
  const [meToo, setMeToo] = useState(false);
  const [comment, setComment] = useState('');

  const timeline = [
    { label: "Reported", date: "Oct 24, 10:30 AM", status: "completed" },
    { label: "Assigned to Department", date: "Oct 24, 2:15 PM", status: "completed" },
    { label: "In Progress", date: "Oct 25, 9:00 AM", status: "current" },
    { label: "Resolved", date: "Pending", status: "pending" },
  ];

  const comments = [
    { id: 1, name: "Anita S.", time: "1h ago", text: "This is really dangerous at night, please fix soon!", initials: "AS" },
    { id: 2, name: "Vikram R.", time: "5h ago", text: "I've seen three cyclists almost fall here today.", initials: "VR" },
    { id: 3, name: "Ward Officer", time: "2h ago", text: "Team has been dispatched for a temporary fix.", initials: "WO", isOfficial: true },
  ];

  return (
    <div className="min-h-screen bg-background py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (60%) */}
        <div className="lg:w-[65%] space-y-8">
          {/* Main Image Card */}
          <div className="relative group">
            <div className="w-full h-96 bg-slate-200 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1599423300746-b62533397364?w=1000" 
                alt="Issue detail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="absolute top-6 left-6 flex gap-2">
              <Badge status="Open" className="px-4 py-2 text-sm shadow-xl" />
              <Badge variant="danger" className="px-4 py-2 text-sm shadow-xl flex items-center gap-2">
                <AlertTriangle size={14} /> High Severity
              </Badge>
            </div>
          </div>

          {/* Title & Meta */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Large Pothole — MG Road Main Intersection</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
               <div className="flex items-center gap-2 text-indigo bg-indigo-light px-3 py-1.5 rounded-xl">
                  <MapPin size={16} /> Ward 4 - Green Valley
               </div>
               <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                  <Clock size={16} /> Reported 2 days ago
               </div>
               <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                  <UserIcon size={16} /> Reported by Anonymous
               </div>
            </div>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg italic">
              "Severe road degradation near the drainage vent. It's collecting water and causing major traffic slowdowns. Deep enough to damage tires."
            </p>
          </div>

          {/* Status Timeline */}
          <Card className="p-8 border-none shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Clock className="text-indigo" size={24} />
              Resolution Timeline
            </h3>
            <div className="relative space-y-12">
              {/* Connector line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
              
              {timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-center gap-6 group">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-emerald text-white shadow-lg shadow-emerald/20' : 
                    step.status === 'current' ? 'bg-amber text-white animate-pulse shadow-lg shadow-amber/20' : 
                    'bg-white border-2 border-slate-200 text-slate-300'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 size={16} /> : 
                     step.status === 'current' ? <Loader2 size={16} className="animate-spin" /> : 
                     <div className="w-2 h-2 rounded-full bg-slate-200"></div>}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className={`font-bold transition-colors ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                      {step.status === 'current' && <p className="text-[10px] text-amber font-bold uppercase tracking-wider">In Progress</p>}
                    </div>
                    <p className="text-xs font-semibold text-slate-400">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-8 border-none shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="text-indigo" size={24} />
                Community Activity ({comments.length})
              </h3>
            </div>
            
            <div className="space-y-6 mb-10">
              {comments.map((c) => (
                <div key={c.id} className={`flex gap-4 p-4 rounded-2xl ${c.isOfficial ? 'bg-indigo-light border-l-4 border-indigo' : 'bg-slate-50'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${c.isOfficial ? 'bg-indigo' : 'bg-slate-300'}`}>
                    {c.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900">{c.name}</span>
                      {c.isOfficial && <Badge variant="indigo" className="text-[10px] py-0">Official</Badge>}
                      <span className="text-[10px] text-slate-400 ml-auto font-medium">{c.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input 
                type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 font-medium"
              />
              <Button 
                onClick={() => setComment('')}
                className="px-6 rounded-xl flex items-center gap-2"
              >
                <Send size={18} />
                Post
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:w-[35%] space-y-6">
          {/* Authority Manage Ticket Panel (Conditional) */}
          {role === 'authority' && (
            <Card className="border-2 border-indigo shadow-xl overflow-hidden">
               <div className="bg-indigo p-4 flex items-center gap-3 text-white">
                  <ShieldCheck size={20} />
                  <span className="font-bold tracking-wide">Authority Control Panel</span>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Update Ticket Status</label>
                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20">
                      <option>Open</option>
                      <option selected>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Assign Department</label>
                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20">
                      <option selected>Roads & Highways</option>
                      <option>Public Health</option>
                      <option>Electricity</option>
                    </select>
                  </div>
                  <Button className="w-full py-3 font-bold mt-2 shadow-lg shadow-indigo/20">Save Changes</Button>
               </div>
            </Card>
          )}

          {/* Ticket Stats Card */}
          <Card className="p-8 border-none shadow-sm space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Official Status</label>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-900">In Progress</span>
                <div className="w-3 h-3 rounded-full bg-amber animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Department</p>
                <p className="text-sm font-bold text-slate-900">Roads Dept.</p>
              </div>
              <div className="p-4 bg-danger-light rounded-2xl border border-danger/10">
                <p className="text-[10px] font-bold text-danger uppercase mb-1">SLA Deadline</p>
                <div className="flex items-center gap-1 text-sm font-bold text-danger">
                  <Clock size={14} /> Overdue
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setUpvoted(!upvoted)}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all ${
                  upvoted ? 'bg-indigo text-white shadow-lg shadow-indigo/20' : 'bg-white border-2 border-indigo text-indigo hover:bg-indigo-light'
                }`}
              >
                <ThumbsUp size={20} fill={upvoted ? "white" : "none"} />
                {upvoted ? 'Upvoted' : 'Upvote This Issue'} (24)
              </button>
              <button 
                onClick={() => setMeToo(!meToo)}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all ${
                  meToo ? 'bg-emerald text-white shadow-lg shadow-emerald/20' : 'bg-white border-2 border-emerald text-emerald hover:bg-emerald/5'
                }`}
              >
                <Users size={20} />
                {meToo ? 'Reported by You Too' : 'Me Too! (8)'}
              </button>
            </div>
          </Card>

          {/* Map Location Card */}
          <Card className="p-6 border-none shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="text-indigo" size={18} />
                  Exact Location
                </h4>
             </div>
             <div className="rounded-2xl h-40 overflow-hidden mb-4 shadow-inner border border-slate-100">
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
             <p className="text-xs font-medium text-slate-500 leading-relaxed">
               Sector 4, MG Road Intersection, Near Central Plaza Mall.
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
