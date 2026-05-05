import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Crown, 
  Medal, 
  ChevronDown, 
  Lock,
  Hexagon,
  Award,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Loader2
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import leaderboardService from '../../services/leaderboardService';

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

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [ward, setWard] = useState('City Wide');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await leaderboardService.getLeaderboard(ward === 'City Wide' ? '' : ward);
      setData(res || []);
    } catch (err) {
      console.error('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, [ward]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const top3 = data.slice(0, 3);
  const ranked = data.slice(3);
  const selfEntry = data.find(item => item._id === user?.id);
  const selfRank = data.findIndex(item => item._id === user?.id) + 1;

  const badges = [
    { name: "First Report", icon: Zap, desc: "Submitted your very first civic issue report.", earned: (user?.reportCount || 0) >= 1 },
    { name: "Street Warrior", icon: Shield, desc: "10 safety hazards identified and reported.", earned: (user?.reportCount || 0) >= 10 },
    { name: "10 Resolved", icon: CheckCircle, desc: "Have 10 of your reports marked as resolved.", earned: false },
    { name: "Community Hero", icon: Award, desc: "Voted top contributor in your ward.", earned: selfRank > 0 && selfRank <= 5 },
    { name: "Top Reporter", icon: Trophy, desc: "Filed 100+ reports for the city.", earned: (user?.reportCount || 0) >= 100 },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 font-inter">
      {/* Header Section */}
      <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-amber-500" size={32} />
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Leaderboard</h1>
        </div>
        
        <div className="relative">
          <select 
            value={ward} 
            onChange={(e) => setWard(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 transition-all cursor-pointer min-w-[180px]"
          >
            <option>City Wide</option>
            {[...Array(20)].map((_, i) => (
              <option key={i+1} value={`Ward ${i+1}`}>Ward {i+1}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-indigo" size={48} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Recalculating Rankings...</p>
        </div>
      ) : (
        <>
          {/* Podium Section */}
          <div className="flex items-end justify-center gap-2 md:gap-8 mb-16 px-4 pt-10">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center flex-1 max-w-[120px] animate-in slide-in-from-bottom duration-500 delay-150">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[1].name}`} alt="avatar" />
                  </div>
                  <div className="absolute -top-3 -right-1 text-slate-400 drop-shadow-md">
                    <Medal size={24} />
                  </div>
                  <div className="absolute -bottom-1 right-0 w-6 h-6 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">2</div>
                </div>
                <div className="w-full h-24 bg-slate-400 rounded-t-xl flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5"></div>
                  2nd
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-slate-900 text-sm truncate w-full">{top3[1].name}</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{top3[1].reportCount} reports</p>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center flex-1 max-w-[140px] animate-in slide-in-from-bottom duration-700">
                <div className="relative mb-2">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-amber-500">
                    <Crown size={40} className="drop-shadow-lg animate-bounce duration-1000" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-indigo-light flex items-center justify-center text-indigo font-bold border-4 border-white shadow-xl overflow-hidden ring-4 ring-indigo/10">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[0].name}`} alt="avatar" />
                  </div>
                  <div className="absolute -bottom-1 right-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white">1</div>
                </div>
                <div className="w-full h-36 bg-indigo rounded-t-xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  1st
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-slate-900 text-base truncate w-full">{top3[0].name}</p>
                  <p className="text-xs text-indigo font-black uppercase tracking-tighter">{top3[0].reportCount} reports</p>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center flex-1 max-w-[120px] animate-in slide-in-from-bottom duration-500 delay-300">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold border-2 border-white shadow-sm overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[2].name}`} alt="avatar" />
                  </div>
                  <div className="absolute -top-3 -right-1 text-amber-700/60 drop-shadow-md">
                    <Medal size={24} />
                  </div>
                  <div className="absolute -bottom-1 right-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">3</div>
                </div>
                <div className="w-full h-20 bg-amber-600 rounded-t-xl flex items-center justify-center text-white font-bold text-lg shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5"></div>
                  3rd
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-slate-900 text-sm truncate w-full">{top3[2].name}</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{top3[2].reportCount} reports</p>
                </div>
              </div>
            )}
          </div>

          {/* Ranked List Section */}
          <div className="px-6 mb-12">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-20 text-center">Rank</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Citizen</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Ward</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Reports</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ranked.length > 0 ? ranked.map((entry, i) => {
                    const isSelf = entry._id === user?.id;
                    return (
                      <tr 
                        key={entry._id} 
                        className={`hover:bg-slate-50/50 transition-colors ${isSelf ? 'bg-indigo-light/30' : ''}`}
                      >
                        <td className="px-6 py-5 text-center font-black text-slate-400 text-xs">#{i + 4}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm ${isSelf ? 'bg-indigo' : 'bg-slate-300'}`}>
                              {entry.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 flex items-center gap-2">
                                {entry.name}
                                {i + 4 <= 10 && <Star size={12} className="text-amber-500 fill-amber-500" />}
                              </p>
                              <p className="text-[10px] text-slate-500 md:hidden font-medium">{entry.ward || '--'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs font-bold text-slate-500 hidden md:table-cell">{entry.ward || '--'}</td>
                        <td className="px-6 py-5 text-center font-black text-indigo text-sm">{entry.reportCount}</td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No additional rankings</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Badges Section */}
      <div className="px-6 mb-12">
        <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Badges Progress</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {badges.map((b, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-36 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md ${!b.earned ? 'opacity-60' : 'ring-2 ring-indigo/5'}`}
            >
              <div className={!b.earned ? 'grayscale' : ''}>
                <BadgeIcon icon={b.icon} earned={b.earned} />
              </div>
              <p className="mt-4 font-bold text-slate-900 text-xs leading-tight">{b.name}</p>
              <p className="mt-2 text-[10px] text-slate-400 font-medium leading-tight line-clamp-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Rank Card */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center justify-between z-50 backdrop-blur-lg bg-white/90">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-2xl bg-indigo text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo/20">
            {selfRank > 0 ? `#${selfRank}` : '--'}
          </div>
          <div className="flex flex-col">
            <span className="text-slate-900 font-black text-lg leading-none mb-1">Your Rank</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {user?.reportCount || 0} reports · {user?.streakCount || 0} day streak 🔥
            </span>
          </div>
        </div>
        
        <div className="flex-1 max-w-md w-full mx-0 md:mx-12 mb-4 md:mb-0">
          <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">
            <span>Progress to next rank</span>
            <span>{Math.min(100, Math.round(((user?.reportCount || 0) % 10) * 10))}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-indigo rounded-full shadow-[0_0_8px_rgba(55,48,163,0.3)] transition-all duration-1000" 
              style={{ width: `${Math.min(100, Math.round(((user?.reportCount || 0) % 10) * 10))}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/report')}
          className="bg-[#3730A3] text-white px-8 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-indigo/20 transition-all active:scale-95 w-full md:w-auto uppercase tracking-wider"
        >
          Rise Up
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;

