import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Settings, 
  Info, 
  BellOff
} from 'lucide-react';

const initialNotifications = [
  { id: 1, message: "Your pothole report on MG Road has been resolved", subtext: "MG Road, Central District", time: "2 hours ago", type: 'resolved', read: false, dateGroup: "Today" },
  { id: 2, message: "New team assigned to broken streetlight near Park Ave", subtext: "Park Ave, North Sector", time: "5 hours ago", type: 'assigned', read: false, dateGroup: "Today" },
  { id: 3, message: "Maintenance is in-progress for the reported water leakage", subtext: "Greenwood Circle", time: "1 day ago", type: 'in-progress', read: true, dateGroup: "Yesterday" },
  { id: 4, message: "Waste collection request for Zone 4 completed", subtext: "Zone 4 Industrial Area", time: "1 day ago", type: 'resolved', read: true, dateGroup: "Yesterday" },
  { id: 5, message: "Your account was logged in from a new device", subtext: "Web Browser, Mumbai", time: "3 days ago", type: 'assigned', read: true, dateGroup: "This Week" },
  { id: 6, message: "Emergency repair scheduled for water main break", subtext: "Downing St", time: "4 days ago", type: 'in-progress', read: true, dateGroup: "This Week" },
  { id: 7, message: "Community cleanup drive starting in your area", subtext: "Sector 5 Park", time: "5 days ago", type: 'assigned', read: true, dateGroup: "This Week" },
  { id: 8, message: "Scheduled maintenance for electrical grid completed", subtext: "North Block", time: "6 days ago", type: 'resolved', read: true, dateGroup: "This Week" },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    navigate('/issues/1');
  };

  const groups = ["Today", "Yesterday", "This Week"];

  const getIcon = (type) => {
    switch (type) {
      case 'resolved':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald">
            <CheckCircle size={20} />
          </div>
        );
      case 'in-progress':
        return (
          <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber">
            <Settings size={20} />
          </div>
        );
      case 'assigned':
        return (
          <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo">
            <Info size={20} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm font-semibold text-indigo hover:text-indigo-dark transition-colors"
          >
            Mark all as read
          </button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-8">
            {groups.map(group => {
              const groupItems = notifications.filter(n => n.dateGroup === group);
              if (groupItems.length === 0) return null;

              return (
                <div key={group} className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{group}</h3>
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    {groupItems.map((n, idx) => (
                      <div 
                        key={n.id}
                        onClick={() => handleNotificationClick(n.id)}
                        className={`relative flex items-center gap-4 p-5 cursor-pointer transition-all border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 ${
                          !n.read ? 'bg-indigo-light border-l-4 border-l-indigo' : 'bg-white'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {getIcon(n.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-12">
                          <h4 className={`text-sm font-bold truncate ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                            {n.message}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {n.subtext}
                          </p>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <span className="text-[10px] font-medium text-slate-400">
                            {n.time}
                          </span>
                        </div>

                        {!n.read && (
                          <div className="absolute top-4 right-4 w-2 h-2 bg-indigo rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <BellOff size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No notifications yet</h3>
            <p className="text-slate-500 mt-2 max-w-xs">
              We'll notify you when there's an update on your reported issues or community activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

