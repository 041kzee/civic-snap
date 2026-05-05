import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Settings, 
  Info, 
  BellOff,
  Clock,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import notificationService from '../../services/notificationService';
import useNotificationStore from '../../store/notificationStore';
import socketService from '../../services/socket';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUnreadCount, incrementUnread } = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
      const unread = data.filter(n => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [setUnreadCount]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Socket setup
  useEffect(() => {
    socketService.connect();
    socketService.on('notification:new', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      incrementUnread();
    });

    return () => {
      socketService.off('notification:new');
    };
  }, [incrementUnread]);

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all read');
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      try {
        await notificationService.markAsRead([notif._id]);
        setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, read: true } : n));
        useNotificationStore.getState().decrementUnread();
      } catch (err) {
        console.error('Failed to mark read');
      }
    }
    
    // Navigate if there's a related link
    if (notif.relatedId) {
      navigate(`/issues/${notif.relatedId}`);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'status_update':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald">
            <CheckCircle size={20} />
          </div>
        );
      case 'escalation':
        return (
          <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center text-red-500">
            <AlertTriangle size={20} />
          </div>
        );
      case 'assignment':
        return (
          <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo">
            <ShieldCheck size={20} />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Info size={20} />
          </div>
        );
    }
  };

  const groupNotifications = () => {
    const today = new Date().setHours(0,0,0,0);
    const yesterday = new Date(today - 86400000).setHours(0,0,0,0);

    const groups = {
      Today: [],
      Yesterday: [],
      Earlier: []
    };

    notifications.forEach(n => {
      const d = new Date(n.createdAt).setHours(0,0,0,0);
      if (d === today) groups.Today.push(n);
      else if (d === yesterday) groups.Yesterday.push(n);
      else groups.Earlier.push(n);
    });

    return groups;
  };

  const grouped = groupNotifications();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          {notifications.length > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-sm font-bold text-indigo hover:text-indigo-dark transition-colors px-4 py-2 hover:bg-indigo-light rounded-xl"
            >
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl border border-slate-100 h-24"></div>
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {Object.entries(grouped).map(([group, items]) => {
              if (items.length === 0) return null;

              return (
                <div key={group} className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">{group}</h3>
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    {items.map((n) => (
                      <div 
                        key={n._id}
                        onClick={() => handleNotificationClick(n)}
                        className={`relative flex items-center gap-4 p-5 cursor-pointer transition-all border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 ${
                          !n.read ? 'bg-indigo-light/20 border-l-4 border-l-indigo' : 'bg-white'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {getIcon(n.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-12">
                          <h4 className={`text-sm font-bold truncate ${n.read ? 'text-slate-600' : 'text-slate-900'}`}>
                            {n.message}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 font-medium italic">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        {!n.read && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-6 w-2.5 h-2.5 bg-indigo rounded-full shadow-lg shadow-indigo/30 animate-pulse"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
              <BellOff size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Inbox is clear</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium leading-relaxed">
              Snap a civic issue to get real-time updates on its resolution journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

