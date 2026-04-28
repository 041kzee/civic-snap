import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Settings, 
  Info, 
  BellOff, 
  X,
  Bell,
  ChevronRight,
  Circle
} from 'lucide-react';
import Card from '../../components/ui/Card';

const initialNotifications = [
  { id: 1, message: "Issue Resolved", subtext: "Your report on Pothole at MG Road is now resolved.", type: 'resolved', read: false, date: "Today", time: "2m ago" },
  { id: 2, message: "Assigned to Department", subtext: "Streetlight issue in Ward 12 was assigned to Electricity Dept.", type: 'assigned', read: false, date: "Today", time: "1h ago" },
  { id: 3, message: "In Progress", subtext: "Cleanup crew is currently at the site in Ward 7.", type: 'in-progress', read: true, date: "Today", time: "4h ago" },
  { id: 4, message: "Resolution Pending", subtext: "Verification needed for Garbage removal in Sector 4.", type: 'assigned', read: true, date: "Yesterday", time: "1d ago" },
  { id: 5, message: "Issue Resolved", subtext: "Water leak near Park St. has been fixed successfully.", type: 'resolved', read: true, date: "Yesterday", time: "1d ago" },
  { id: 6, message: "Profile Updated", subtext: "You earned the 'Civic Hero' badge for 10 reports!", type: 'info', read: true, date: "This Week", time: "3d ago" },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    navigate('/issues/1');
  };

  const groups = ["Today", "Yesterday", "This Week"];

  const getIcon = (type) => {
    switch (type) {
      case 'resolved': return <CheckCircle className="text-emerald" size={20} />;
      case 'in-progress': return <Settings className="text-amber animate-spin-slow" size={20} />;
      case 'assigned': return <Info className="text-indigo" size={20} />;
      default: return <Bell className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo">
              <Bell size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-sm font-bold text-indigo hover:underline"
          >
            Mark all as read
          </button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-10">
            {groups.map(group => {
              const groupItems = notifications.filter(n => n.date === group);
              if (groupItems.length === 0) return null;

              return (
                <div key={group} className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">{group}</h3>
                  <div className="space-y-3">
                    {groupItems.map(n => (
                      <div 
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                          n.read 
                          ? 'bg-white border-slate-100 opacity-80' 
                          : 'bg-indigo-light border-indigo/20 shadow-sm'
                        }`}
                      >
                        {!n.read && <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-indigo rounded-full shadow-sm"></div>}
                        {!n.read && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo rounded-r-full"></div>}
                        
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                          {getIcon(n.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className={`font-bold text-sm truncate transition-colors ${n.read ? 'text-slate-600' : 'text-slate-900 group-hover:text-indigo'}`}>
                               {n.message}
                             </h4>
                             <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-4">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{n.subtext}</p>
                        </div>

                        <div className="flex items-center text-slate-300 group-hover:text-indigo transition-colors self-center">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <BellOff size={40} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">No notifications yet</h3>
             <p className="text-slate-500 max-w-xs text-center">We'll notify you when your reports are assigned or resolved.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
