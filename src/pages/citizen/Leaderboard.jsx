import React, { useState } from 'react';
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
  CheckCircle
} from 'lucide-react';

const mockTop3 = [
  { rank: 1, name: "Julian Thorne", reports: 156, avatar: "JT", color: "bg-indigo" },
  { rank: 2, name: "Elena Vance", reports: 128, avatar: "EV", color: "bg-slate-400" },
  { rank: 3, name: "Marcus Wright", reports: 112, avatar: "MW", color: "bg-amber-600" },
];

const mockRanked = [
  { rank: 4, name: "Sarah Jenkins", ward: "Downtown", submitted: 104, resolved: 98, initials: "SJ", badge: true },
  { rank: 5, name: "Omar Hassan", ward: "Riverlands", submitted: 89, resolved: 85, initials: "OH", badge: false },
  { rank: 6, name: "Yuki Tanaka", ward: "Sunset Hill", submitted: 82, resolved: 79, initials: "YT", badge: false },
  { rank: 7, name: "Fatima Bi", ward: "North Sector", submitted: 76, resolved: 70, initials: "FB", badge: true },
  { rank: 8, name: "Liam Chen", ward: "Greenwood", submitted: 64, resolved: 58, initials: "LC", badge: false },
  { rank: 12, name: "Arjun Singh", ward: "Central District", submitted: 24, resolved: 18, initials: "AS", badge: false, isSelf: true },
];

const badges = [
  { name: "First Report", icon: Zap, desc: "Submitted your very first civic issue report.", earned: true },
  { name: "Street Warrior", icon: Shield, desc: "10 safety hazards identified and reported.", earned: true },
  { name: "10 Resolved", icon: CheckCircle, desc: "Have 10 of your reports marked as resolved.", earned: false },
  { name: "Community Hero", icon: Award, desc: "Voted top contributor in your ward.", earned: false },
  { name: "Top Reporter", icon: Trophy, desc: "Filed 100+ reports for the city.", earned: false },
];

// Simple component for Hexagonal-ish icon
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
  const [ward, setWard] = useState('City Wide');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-amber-500" size={32} />
          <h1 className="text-3xl font-bold text-slate-900">Community Leaderboard</h1>
        </div>
        
        <div className="relative">
          <select 
            value={ward} 
            onChange={(e) => setWard(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 transition-all cursor-pointer"
          >
            <option>City Wide</option>
            <option>Downtown</option>
            <option>Riverlands</option>
            <option>Sunset Hill</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        </div>
      </div>

      {/* Podium Section */}
      <div className="flex items-end justify-center gap-2 md:gap-8 mb-12 px-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockTop3[1].name}`} alt="avatar" />
            </div>
            <div className="absolute -top-3 -right-1 text-slate-400 drop-shadow-md">
              <Medal size={24} />
            </div>
            <div className="absolute -bottom-1 right-0 w-6 h-6 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">2</div>
          </div>
          <div className="w-full h-24 bg-slate-400 rounded-t-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            2nd
          </div>
          <div className="text-center mt-3">
            <p className="font-bold text-slate-900 text-sm">{mockTop3[1].name}</p>
            <p className="text-xs text-slate-500">{mockTop3[1].reports} reports</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center flex-1 max-w-[140px]">
          <div className="relative mb-2">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-amber-500">
              <Crown size={40} className="drop-shadow-lg" />
            </div>
            <div className="w-20 h-20 rounded-full bg-indigo-light flex items-center justify-center text-indigo font-bold border-4 border-white shadow-xl overflow-hidden ring-4 ring-indigo/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockTop3[0].name}`} alt="avatar" />
            </div>
            <div className="absolute -bottom-1 right-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white">1</div>
          </div>
          <div className="w-full h-32 bg-indigo rounded-t-xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            1st
          </div>
          <div className="text-center mt-3">
            <p className="font-bold text-slate-900 text-base">{mockTop3[0].name}</p>
            <p className="text-sm text-indigo font-semibold">{mockTop3[0].reports} reports resolved</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold border-2 border-white shadow-sm overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockTop3[2].name}`} alt="avatar" />
            </div>
            <div className="absolute -top-3 -right-1 text-amber-700/60 drop-shadow-md">
              <Medal size={24} />
            </div>
            <div className="absolute -bottom-1 right-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">3</div>
          </div>
          <div className="w-full h-20 bg-amber-600 rounded-t-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            3rd
          </div>
          <div className="text-center mt-3">
            <p className="font-bold text-slate-900 text-sm">{mockTop3[2].name}</p>
            <p className="text-xs text-slate-500">{mockTop3[2].reports} reports</p>
          </div>
        </div>
      </div>

      {/* Ranked List Section */}
      <div className="px-6 mb-12">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-20 text-center">Rank</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Citizen</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Ward</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Submitted</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Resolved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockRanked.map((user) => (
                <tr 
                  key={user.rank} 
                  className={`hover:bg-slate-50/50 transition-colors ${user.isSelf ? 'bg-indigo-light/30' : ''}`}
                >
                  <td className="px-6 py-4 text-center font-bold text-slate-400">#{user.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${user.isSelf ? 'bg-indigo' : 'bg-slate-300'}`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-2">
                          {user.name}
                          {user.badge && <Trophy size={14} className="text-amber-500" />}
                        </p>
                        <p className="text-[10px] text-slate-500 md:hidden">{user.ward}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{user.ward}</td>
                  <td className="px-6 py-4 text-center font-bold text-indigo">{user.submitted}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">{user.resolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mb-12">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Badges You Can Earn</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {badges.map((b, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-36 bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center text-center shadow-sm transition-all ${!b.earned ? 'opacity-70' : ''}`}
            >
              <div className={!b.earned ? 'grayscale' : ''}>
                <BadgeIcon icon={b.icon} earned={b.earned} />
              </div>
              <p className="mt-3 font-bold text-slate-900 text-xs leading-tight">{b.name}</p>
              <p className="mt-1 text-[10px] text-slate-400 leading-tight line-clamp-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Rank Card */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.1)] flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-indigo font-bold text-lg">Your Rank: #12</span>
            <span className="text-xs text-slate-500 font-medium">24 reports · 7 day streak 🔥</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-xs mx-8">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 capitalize">
            <span>Progress to next rank</span>
            <span>75%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-indigo rounded-full"></div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/report')}
          className="bg-indigo text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-dark transition-all shadow-md active:scale-95"
        >
          Rise Up
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;

