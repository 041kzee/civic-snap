import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ThumbsUp, 
  Users, 
  MessageSquare, 
  Send,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const IssueDetail = () => {
  const { id } = useParams();
  const { role } = useAuthStore();
  const [upvoted, setUpvoted] = useState(false);
  const [meToo, setMeToo] = useState(false);
  const [commentText, setCommentText] = useState('');

  const timelineSteps = [
    { label: "Reported", status: "completed", time: "Oct 24, 10:30 AM" },
    { label: "Assigned to Department", status: "completed", time: "Oct 24, 2:15 PM" },
    { label: "In Progress", status: "current", time: "Oct 25, 9:00 AM" },
    { label: "Resolved", status: "pending", time: "Expected 2 days" },
  ];

  const mockComments = [
    { id: 1, name: "Anita S.", time: "1h ago", initials: "AS", text: "This pothole is extremely deep, please be careful." },
    { id: 2, name: "Vikram R.", time: "5h ago", initials: "VR", text: "Reported this twice before, hope it gets fixed now." },
    { id: 3, name: "Sita K.", time: "1d ago", initials: "SK", text: "It's right in front of the school gate." },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (60%) */}
        <div className="lg:w-[60%] space-y-6">
          {/* Image */}
          <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1599423300746-b62533397364?w=800&q=80" 
              alt="Issue evidence" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Large Pothole — MG Road</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="indigo">Road Damage</Badge>
              <Badge variant="danger">High Severity</Badge>
              <div className="px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-500 bg-white">
                Ward 4 - Green Valley
              </div>
              <span className="text-xs font-medium text-slate-400 self-center">Reported 2 days ago • Anonymous</span>
            </div>
          </div>

          {/* Status Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Status Updates</h3>
            <div className="space-y-8 relative pl-4">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100"></div>
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.status === 'completed' ? 'bg-emerald text-white' : 
                    step.status === 'current' ? 'bg-amber text-white ring-4 ring-amber/20' : 
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                     step.status === 'current' ? <Loader2 size={20} className="animate-spin" /> : 
                     <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <p className={`font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Community Comments (3)</h3>
            <div className="space-y-6 mb-8">
              {mockComments.map(c => (
                <div key={c.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{c.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 text-sm font-medium"
              />
              <Button onClick={() => setCommentText('')} className="rounded-xl px-6">
                <Send size={18} />
                Post
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:w-[40%] space-y-6">
          
          {/* Authority Panel (Conditional) */}
          {role === 'authority' && (
            <Card className="border-2 border-indigo overflow-hidden">
               <div className="bg-indigo p-4 text-white flex items-center gap-2">
                  <ShieldCheck size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">Manage Ticket</span>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Update Status</label>
                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none">
                      <option>Open</option>
                      <option selected>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reassign Dept</label>
                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none">
                      <option selected>Roads & Highways</option>
                      <option>Public Works</option>
                      <option>Traffic Police</option>
                    </select>
                  </div>
                  <Button className="w-full py-4 font-bold">Save Changes</Button>
               </div>
            </Card>
          )}

          {/* Metadata Card */}
          <Card className="p-6 space-y-6">
            <div className="flex justify-center">
               <Badge status="In Progress" className="px-6 py-2 text-sm shadow-sm" />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-50">
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</span>
                  <span className="text-sm font-bold text-slate-700">Roads Dept.</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">SLA Deadline</span>
                  <div className="flex items-center gap-1.5 text-danger font-bold text-sm">
                    <Clock size={16} />
                    Overdue
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
               <button 
                 onClick={() => setUpvoted(!upvoted)}
                 className={`py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                   upvoted ? 'bg-indigo text-white shadow-lg' : 'bg-white border-2 border-indigo text-indigo'
                 }`}
               >
                 <ThumbsUp size={18} fill={upvoted ? "white" : "none"} />
                 {upvoted ? 'Upvoted' : 'Upvote'} (24)
               </button>
               <button 
                 onClick={() => setMeToo(!meToo)}
                 className={`py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                   meToo ? 'bg-indigo text-white shadow-lg' : 'bg-white border-2 border-indigo text-indigo'
                 }`}
               >
                 <Users size={18} />
                 {meToo ? 'Me Too!' : 'Me Too'} (8)
               </button>
            </div>
          </Card>

          {/* Map Card */}
          <Card className="p-4">
            <div className="h-40 rounded-xl overflow-hidden mb-4 border border-slate-100">
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
            <div className="flex items-start gap-2">
               <MapPin className="text-indigo mt-0.5 shrink-0" size={16} />
               <p className="text-xs font-medium text-slate-500 leading-relaxed">
                 Sector 4, MG Road Intersection, Near Central Metro Entrance.
               </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
