import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  CheckCircle, 
  Flame, 
  Trophy, 
  Settings, 
  Edit3, 
  Lock, 
  Bell, 
  EyeOff, 
  ChevronRight, 
  Trash2, 
  Award,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const StatCard = ({ title, value, icon: Icon, colorClass, iconColor }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between flex-1">
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon size={20} className={iconColor} />
    </div>
  </div>
);

const BadgeIcon = ({ icon: Icon, earned }) => (
  <div className={`relative w-12 h-12 flex items-center justify-center rounded-lg ${earned ? 'bg-indigo text-white' : 'bg-slate-200 text-slate-400'}`}>
    <Icon size={24} />
    {!earned && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
        <Lock size={14} className="text-white" />
      </div>
    )}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const badges = [
    { name: "First Report", icon: Zap, earned: true },
    { name: "Street Warrior", icon: Shield, earned: true },
    { name: "Clean Ward", icon: Award, earned: true },
    { name: "Top Contributor", icon: Trophy, earned: false },
    { name: "Infrastructure", icon: Settings, earned: false },
    { name: "Expert Eye", icon: Star, earned: false },
  ];

  const recentActivity = [
    { id: 1, title: "Pothole on Main St.", status: "IN PROGRESS", time: "2 hours ago", statusColor: "bg-amber-100 text-amber-700" },
    { id: 2, title: "Illegal Graffiti Removal", status: "RESOLVED", time: "1 day ago", statusColor: "bg-emerald-100 text-emerald-700" },
    { id: 3, title: "Broken Street Light #402", status: "SUBMITTED", time: "3 days ago", statusColor: "bg-slate-100 text-slate-700" },
    { id: 4, title: "Illegal Dumping Site", status: "RESOLVED", time: "4 days ago", statusColor: "bg-emerald-100 text-emerald-700" },
  ];

  const settingsItems = [
    { icon: Edit3, label: "Edit Profile" },
    { icon: Lock, label: "Change Password" },
    { icon: Bell, label: "Notification Preferences" },
    { icon: EyeOff, label: "Anonymous Reporting Default" },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-r from-indigo via-indigo-dark to-slate-900 flex flex-col items-center justify-center pt-8">
        <div className="relative mb-2">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-indigo overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Marcus'}`} alt="avatar" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-indigo hover:scale-110 transition-transform">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-white">{user?.name || 'Marcus Thorne'}</h2>
        <p className="text-sm font-semibold text-indigo-light">WARD 42 • NORTH CENTRAL</p>
        <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Citizen since March 2024</p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Stats Row - Overlapping Banner */}
        <div className="flex flex-col md:flex-row gap-4 -mt-8 relative z-10 mb-10">
          <StatCard title="Reports Filed" value="24" icon={MapPin} colorClass="bg-indigo/10" iconColor="text-indigo" />
          <StatCard title="Issues Resolved" value="18" icon={CheckCircle} colorClass="bg-emerald/10" iconColor="text-emerald" />
          <StatCard title="Current Streak" value="7 days 🔥" icon={Flame} colorClass="bg-amber/10" iconColor="text-amber" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">My Badges <span className="text-slate-400 font-medium ml-2">6</span></h3>
                <button className="text-xs font-bold text-indigo hover:underline">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {badges.map((b, i) => (
                  <div key={i} className="flex-shrink-0 w-28 flex flex-col items-center text-center">
                    <BadgeIcon icon={b.icon} earned={b.earned} />
                    <p className="mt-2 text-[10px] font-bold text-slate-800 leading-tight">{b.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((a) => (
                  <div 
                    key={a.id} 
                    onClick={() => navigate('/issues/1')}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                       <img src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop`} alt="issue" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-sm text-slate-900 truncate">{a.title}</h4>
                       <p className="text-[10px] text-slate-400">{a.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-wider ${a.statusColor}`}>
                      {a.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Settings</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {settingsItems.map((s, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3 text-slate-600 group-hover:text-indigo">
                      <s.icon size={18} />
                      <span className="font-bold text-xs">{s.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
                <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-all group">
                  <div className="flex items-center gap-3 text-red-500">
                    <Trash2 size={18} />
                    <span className="font-bold text-xs">Delete Account</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-indigo-light rounded-2xl p-6 text-center">
               <h4 className="font-bold text-slate-900 text-sm mb-2">Need help?</h4>
               <p className="text-xs text-indigo-dark/70 mb-4">Contact our citizen support team for help with your reports or account.</p>
               <button className="w-full bg-white text-indigo font-bold py-2 rounded-xl text-sm shadow-sm hover:shadow-md transition-all">Support Center</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

