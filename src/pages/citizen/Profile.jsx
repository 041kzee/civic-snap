import React, { useState, useEffect, useCallback } from 'react';
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
  Star,
  LogOut,
  Loader2
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import authService from '../../services/authService';
import issueService from '../../services/issueService';
import { getStatusColor } from '../../utils/statusColors';

const StatCard = ({ title, value, icon: Icon, colorClass, iconColor }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between flex-1">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon size={20} className={iconColor} />
    </div>
  </div>
);

const BadgeIcon = ({ icon: Icon, earned }) => (
  <div className={`relative w-12 h-12 flex items-center justify-center rounded-lg ${earned ? 'bg-indigo text-white shadow-lg shadow-indigo/20' : 'bg-slate-200 text-slate-400'}`}>
    <Icon size={24} />
    {!earned && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-lg">
        <Lock size={14} className="text-white/50" />
      </div>
    )}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout: clearStore } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const [freshUser, activityRes] = await Promise.all([
        authService.getMe(),
        issueService.getIssues({ reportedBy: 'me', limit: 4 })
      ]);
      setProfileData(freshUser);
      setUser(freshUser, freshUser.role, localStorage.getItem('accessToken'));
      setRecentActivity(activityRes.issues || []);
    } catch (err) {
      console.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearStore();
      navigate('/auth');
    } catch (err) {
      clearStore();
      navigate('/auth');
    }
  };

  const badges = [
    { name: "First Report", icon: Zap, earned: (profileData?.reportCount || 0) >= 1 },
    { name: "Street Warrior", icon: Shield, earned: (profileData?.reportCount || 0) >= 10 },
    { name: "Clean Ward", icon: Award, earned: (profileData?.reportCount || 0) >= 25 },
    { name: "Top Contributor", icon: Trophy, earned: false },
    { name: "Infrastructure", icon: Settings, earned: false },
    { name: "Expert Eye", icon: Star, earned: false },
  ];

  const settingsItems = [
    { icon: Edit3, label: "Edit Profile" },
    { icon: Lock, label: "Change Password" },
    { icon: Bell, label: "Notification Preferences" },
    { icon: EyeOff, label: "Anonymous Reporting Default" },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo" size={48} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Identity...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-inter">
      {/* Header Banner */}
      <div className="relative h-64 bg-gradient-to-br from-[#3730A3] via-[#4338CA] to-[#1E1B4B] flex flex-col items-center justify-center pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center animate-in zoom-in duration-500">
          <div className="relative mb-4">
            <div className="w-28 h-28 bg-white rounded-[2rem] border-4 border-white/20 shadow-2xl flex items-center justify-center text-4xl font-black text-indigo overflow-hidden rotate-3">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.name}`} alt="avatar" className="-rotate-3" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-indigo hover:scale-110 transition-all hover:rotate-12">
              <Camera size={18} />
            </button>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">{profileData?.name}</h2>
          <p className="text-xs font-bold text-indigo-light uppercase tracking-[0.2em] mt-1">{profileData?.ward || 'UNASSIGNED WARD'}</p>
          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mt-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Citizen Since {new Date(profileData?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Stats Row - Overlapping Banner */}
        <div className="flex flex-col md:flex-row gap-6 -mt-10 relative z-20 mb-12 animate-in slide-in-from-bottom duration-700">
          <StatCard title="Reports Filed" value={profileData?.reportCount || '0'} icon={MapPin} colorClass="bg-indigo-light" iconColor="text-indigo" />
          <StatCard title="Issues Resolved" value="--" icon={CheckCircle} colorClass="bg-emerald-50" iconColor="text-emerald" />
          <StatCard title="Activity Streak" value={`${profileData?.streakCount || '0'} days 🔥`} icon={Flame} colorClass="bg-amber-50" iconColor="text-amber" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Badges Section */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Civic Achievements</h3>
                <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">
                  {badges.filter(b => b.earned).length} / {badges.length} Earned
                </span>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {badges.map((b, i) => (
                  <div key={i} className="flex-shrink-0 w-28 flex flex-col items-center text-center group cursor-default">
                    <BadgeIcon icon={b.icon} earned={b.earned} />
                    <p className={`mt-3 text-[10px] font-black uppercase tracking-tighter transition-colors ${b.earned ? 'text-slate-800' : 'text-slate-400'}`}>{b.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Snapshots</h3>
                <button 
                  onClick={() => navigate('/my-reports')}
                  className="text-[10px] font-black text-indigo uppercase tracking-widest hover:bg-indigo-light px-3 py-1.5 rounded-lg transition-colors"
                >
                  View All History
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((a) => (
                  <div 
                    key={a._id} 
                    onClick={() => navigate(`/issues/${a._id}`)}
                    className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                       <img src={a.thumbnailUrl} alt="issue" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-base text-slate-900 truncate group-hover:text-indigo transition-colors">{a.category} • {a.ward}</h4>
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{new Date(a.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] ${getStatusColor(a.status).replace('text-', 'bg-').replace('500', '100')} ${getStatusColor(a.status)}`}>
                      {a.status}
                    </div>
                  </div>
                )) : (
                  <div className="py-10 text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                      <Camera size={32} />
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No reports yet. Start snaping!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Account Command</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {settingsItems.map((s, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-4 text-slate-600 group-hover:text-indigo">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-indigo-light transition-colors">
                        <s.icon size={16} />
                      </div>
                      <span className="font-bold text-xs">{s.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-4 text-red-500">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut size={16} />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider">Secure Logout</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-[#3730A3] rounded-[2rem] p-8 text-center shadow-xl shadow-indigo/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
               <div className="relative z-10">
                 <h4 className="font-black text-white text-base mb-2 tracking-tight">Need Citizen Support?</h4>
                 <p className="text-[11px] font-medium text-indigo-light/80 mb-6 leading-relaxed">Our civic team is available 24/7 to assist with your reports.</p>
                 <button className="w-full bg-white text-indigo font-black py-3 rounded-2xl text-xs shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest">
                   Open Support Ticket
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

