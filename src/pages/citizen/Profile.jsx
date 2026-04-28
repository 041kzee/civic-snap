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
  LogOut,
  Award,
  Zap,
  Shield
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const badges = [
    { name: "Top Reporter", icon: Trophy, color: "indigo" },
    { name: "First Respon.", icon: Zap, color: "amber" },
    { name: "Guardian", icon: Shield, color: "emerald" },
  ];

  const recentActivity = [
    { id: 1, title: "Large Pothole", status: "In Progress", time: "2h ago", color: "amber" },
    { id: 2, title: "Garbage Pile", status: "Resolved", time: "1d ago", color: "emerald" },
    { id: 3, title: "Broken Sign", status: "Open", time: "3d ago", color: "danger" },
  ];

  const settings = [
    { icon: Edit3, label: "Edit Profile" },
    { icon: Lock, label: "Change Password" },
    { icon: Bell, label: "Notification Preferences" },
    { icon: EyeOff, label: "Anonymous Reporting Default" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-indigo via-indigo-dark to-slate-900 relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative -mt-24 md:-mt-32 pb-20">
        {/* Profile Card Overlay */}
        <div className="flex flex-col items-center mb-8">
           <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-2xl border-4 border-white overflow-hidden">
                 <div className="w-full h-full bg-indigo-light rounded-full flex items-center justify-center text-4xl md:text-5xl font-black text-indigo">
                    {user?.name?.charAt(0) || 'C'}
                 </div>
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-indigo hover:scale-110 transition-transform">
                <Camera size={20} />
              </button>
           </div>
           
           <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white md:text-slate-900 mb-2 drop-shadow-sm md:drop-shadow-none">{user?.name || 'Citizen User'}</h1>
              <div className="flex items-center justify-center gap-2 text-indigo-light md:text-slate-500 font-bold text-sm">
                 <MapPin size={16} /> Ward 4 - Green Valley
              </div>
              <p className="mt-3 text-[10px] font-bold text-indigo-light/60 md:text-slate-400 uppercase tracking-[0.2em]">Citizen since March 2024</p>
           </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Reports Filed" value="24" icon={MapPin} color="indigo" className="shadow-lg" />
          <StatCard title="Issues Resolved" value="18" icon={CheckCircle} color="emerald" className="shadow-lg" />
          <StatCard title="7 Day Streak" value="7 days" icon={Flame} color="amber" className="shadow-lg" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left / Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <Card className="p-8 border-none shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="text-indigo" size={24} />
                  My Badges ({badges.length})
                </h3>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {badges.map((b, i) => (
                  <div key={i} className="flex-shrink-0 w-32 flex flex-col items-center group">
                    <div className="w-20 h-20 bg-indigo-light rounded-3xl flex items-center justify-center text-indigo mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <b.icon size={32} />
                    </div>
                    <span className="font-bold text-xs text-slate-900 text-center">{b.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-8 border-none shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <CheckCircle className="text-indigo" size={24} />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((a) => (
                  <div 
                    key={a.id} 
                    onClick={() => navigate(`/issues/${a.id}`)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-slate-300">
                      <Camera size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-slate-900 truncate mb-1">{a.title}</h4>
                       <Badge status={a.status} />
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-400 uppercase">{a.time}</p>
                       <ChevronRight size={18} className="text-slate-300 ml-auto mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right / Settings Sidebar */}
          <div className="space-y-8">
             <Card className="overflow-hidden border-none shadow-sm">
                <div className="p-6 border-b border-slate-50">
                   <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="text-indigo" size={24} />
                    Settings
                  </h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {settings.map((s, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all group">
                       <div className="flex items-center gap-4 text-slate-600 group-hover:text-indigo">
                          <s.icon size={20} />
                          <span className="font-bold text-sm">{s.label}</span>
                       </div>
                       <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                  <button className="w-full flex items-center justify-between p-5 hover:bg-danger/5 transition-all group text-danger">
                     <div className="flex items-center gap-4">
                        <Trash2 size={20} />
                        <span className="font-bold text-sm">Delete Account</span>
                     </div>
                  </button>
                </div>
             </Card>

             <Button 
               variant="secondary" 
               className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 border-danger/20 text-danger hover:bg-danger-light hover:border-danger/30 font-bold"
               onClick={handleLogout}
             >
               <LogOut size={20} />
               Sign Out
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
