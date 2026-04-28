import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  ChevronDown, 
  Star, 
  Lock,
  ArrowRight,
  MapPin,
  TrendingUp,
  Award,
  Zap,
  Shield
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const mockTop3 = [
  { rank: 1, name: "Ravi Kumar", reports: 142, avatar: "RK", color: "bg-indigo" },
  { rank: 2, name: "Sita Sharma", reports: 98, avatar: "SS", color: "bg-slate-400" },
  { rank: 3, name: "Alex Paul", reports: 76, avatar: "AP", color: "bg-amber-600" },
];

const mockRanked = [
  { rank: 4, name: "Maria Garcia", ward: "Ward 12", reports: 64, resolved: 52, initials: "MG" },
  { rank: 5, name: "Chen Wei", ward: "Ward 4", reports: 59, resolved: 45, initials: "CW" },
  { rank: 6, name: "Arjun Singh", ward: "Ward 7", reports: 52, resolved: 38, initials: "AS", isSelf: true },
  { rank: 7, name: "Fatima B.", ward: "Ward 12", reports: 48, resolved: 30, initials: "FB" },
  { rank: 8, name: "Kenji S.", ward: "Ward 2", reports: 41, resolved: 28, initials: "KS" },
];

const badges = [
  { name: "Top Reporter", icon: Trophy, desc: "Filed 100+ issues", earned: true },
  { name: "First Respon.", icon: Zap, desc: "First to report 5 issues", earned: true },
  { name: "Guardian", icon: Shield, desc: "Ward resolved 50+ issues", earned: false },
  { name: "Expert Eye", icon: Star, desc: "10 correct AI tags", earned: false },
  { name: "Community King", icon: Award, desc: "Voted top of ward", earned: false },
];

const Leaderboard = () => {
  const [ward, setWard] = useState('City Wide');

  return (
    <div className="min-h-screen bg-background py-10 px-6 lg:px-12 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo">
              <Trophy size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Leaderboard</h1>
          </div>
          
          <div className="relative w-full md:w-auto">
             <select 
               value={ward} 
               onChange={(e) => setWard(e.target.value)}
               className="w-full md:w-48 pl-4 pr-10 py-3 bg-white border border-slate-100 rounded-xl font-bold text-slate-700 outline-none shadow-sm appearance-none"
             >
               <option>City Wide</option>
               <option>Ward 4</option>
               <option>Ward 12</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Podium Section */}
        <div className="flex flex-row items-end justify-center gap-4 mb-16 px-4">
           {/* 2nd Place */}
           <div className="flex flex-col items-center flex-1 max-w-[120px]">
              <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-bold text-slate-400 mb-2 relative">
                {mockTop3[1].avatar}
                <div className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-slate-400 text-white border-2 border-white flex items-center justify-center">
                   <Medal size={16} />
                </div>
              </div>
              <div className="w-full h-24 bg-slate-400 rounded-t-2xl shadow-xl flex flex-col items-center justify-center p-2 text-white">
                 <span className="text-2xl font-bold italic">2nd</span>
              </div>
              <div className="text-center mt-3">
                 <p className="font-bold text-xs text-slate-900 truncate w-full">{mockTop3[1].name}</p>
                 <p className="text-[10px] text-slate-500 font-bold">{mockTop3[1].reports} reports</p>
              </div>
           </div>

           {/* 1st Place */}
           <div className="flex flex-col items-center flex-1 max-w-[140px] -mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-light border-4 border-indigo/20 flex items-center justify-center font-bold text-indigo mb-2 relative shadow-2xl">
                {mockTop3[0].avatar}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber animate-bounce">
                   <Crown size={32} fill="currentColor" />
                </div>
              </div>
              <div className="w-full h-36 bg-indigo rounded-t-2xl shadow-2xl shadow-indigo/30 flex flex-col items-center justify-center p-2 text-white border-x-4 border-t-4 border-white/10">
                 <span className="text-4xl font-black italic mb-1">1st</span>
                 <TrendingUp size={24} className="text-indigo-light opacity-50" />
              </div>
              <div className="text-center mt-5">
                 <p className="font-bold text-sm text-slate-900 truncate w-full">{mockTop3[0].name}</p>
                 <p className="text-xs text-indigo font-bold">{mockTop3[0].reports} reports</p>
              </div>
           </div>

           {/* 3rd Place */}
           <div className="flex flex-col items-center flex-1 max-w-[120px]">
              <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center font-bold text-amber-600 mb-2 relative">
                {mockTop3[2].avatar}
                <div className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-amber-600 text-white border-2 border-white flex items-center justify-center">
                   <Medal size={16} />
                </div>
              </div>
              <div className="w-full h-20 bg-amber-600 rounded-t-2xl shadow-xl flex flex-col items-center justify-center p-2 text-white">
                 <span className="text-xl font-bold italic">3rd</span>
              </div>
              <div className="text-center mt-3">
                 <p className="font-bold text-xs text-slate-900 truncate w-full">{mockTop3[2].name}</p>
                 <p className="text-[10px] text-slate-500 font-bold">{mockTop3[2].reports} reports</p>
              </div>
           </div>
        </div>

        {/* Ranked List */}
        <Card className="overflow-hidden border-none shadow-sm mb-12">
           <div className="divide-y divide-slate-50">
             {mockRanked.map((user) => (
               <div 
                 key={user.rank} 
                 className={`flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors ${user.isSelf ? 'bg-indigo-light/50 border-l-4 border-indigo' : ''}`}
               >
                 <div className="w-8 font-black text-slate-300 text-lg">#{user.rank}</div>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${user.isSelf ? 'bg-indigo' : 'bg-slate-300'}`}>
                   {user.initials}
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate flex items-center gap-2">
                      {user.name}
                      {user.isSelf && <span className="text-[10px] bg-indigo text-white px-1.5 py-0.5 rounded-md">You</span>}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.ward}</p>
                 </div>
                 <div className="text-right">
                    <p className="font-black text-slate-900 leading-none">{user.reports}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Reports</p>
                 </div>
                 <div className="h-8 w-px bg-slate-100 mx-2"></div>
                 <div className="text-right">
                    <p className="font-black text-emerald leading-none">{user.resolved}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Fixed</p>
                 </div>
                 <div className="ml-4 text-amber opacity-40">
                   <Trophy size={18} />
                 </div>
               </div>
             ))}
           </div>
        </Card>

        {/* Badges Section */}
        <div className="mb-8 flex items-center justify-between">
           <h3 className="text-xl font-bold text-slate-900">Badges You Can Earn</h3>
           <Button variant="secondary" className="py-1 px-3 text-xs">View All</Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
           {badges.map((b, i) => (
             <div key={i} className="flex-shrink-0 w-40 text-center relative group">
                <div className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center mb-4 transition-all ${b.earned ? 'bg-indigo shadow-xl shadow-indigo/20 scale-105' : 'bg-slate-100 opacity-50 grayscale'}`}>
                   <b.icon size={32} className="text-white" />
                   {!b.earned && (
                     <div className="absolute inset-0 flex items-center justify-center text-slate-900">
                        <Lock size={20} />
                     </div>
                   )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{b.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium px-2">{b.desc}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Sticky Bottom Rank Card */}
      <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-white border-t border-slate-100 shadow-2xl p-4 md:px-12 flex items-center justify-between max-w-7xl mx-auto rounded-t-[2.5rem]">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo text-white flex flex-col items-center justify-center">
               <span className="text-[10px] font-bold uppercase">Rank</span>
               <span className="text-xl font-black leading-none">#6</span>
            </div>
            <div>
               <p className="font-bold text-slate-900">Your Standing: <span className="text-indigo">Expert Reporter</span></p>
               <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  52 reports · 7 day streak 🔥
               </p>
            </div>
         </div>
         
         <div className="flex-1 max-w-xs mx-8 hidden md:block">
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-1.5">
               <span>Next Rank: Master</span>
               <span>8/20 more</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
               <div className="w-2/5 h-full bg-indigo rounded-full shadow-[0_0_8px_rgba(55,48,163,0.4)]"></div>
            </div>
         </div>

         <Button 
           variant="primary" 
           className="px-8 py-3 font-bold"
           onClick={() => navigate('/report')}
         >
           New Report
         </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
