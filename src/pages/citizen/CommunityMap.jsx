import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Map as MapIcon, 
  Layers, 
  Navigation,
  Camera,
  Clock,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import issueService from '../../services/issueService';
import socketService from '../../services/socket';
import { getStatusColor } from '../../utils/statusColors';

// Custom Marker Creator
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const IssueCard = ({ issue, onClick }) => (
  <Card className="p-3 mb-3 cursor-pointer hover:border-indigo transition-all group" onClick={() => onClick(issue._id)}>
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
        {issue.thumbnailUrl ? (
          <img src={issue.thumbnailUrl} alt={issue.category} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Camera size={20} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-900 capitalize truncate">{issue.category}</h4>
          <Badge status={issue.status} />
        </div>
        <p className="text-xs text-slate-500 truncate mb-2">{issue.aiDescription}</p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
           <span className="flex items-center gap-0.5"><Navigation size={8} /> {issue.ward}</span>
           <span>•</span>
           <span className="flex items-center gap-0.5"><Clock size={8} /> {new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </Card>
);

const CommunityMap = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    ward: ''
  });

  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await issueService.getIssues({ ...filters, limit: 50 });
      setIssues(data.issues || []);
    } catch (err) {
      setError('Failed to load issues. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Debounced effect for filters
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchIssues();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchIssues]);

  // Socket.io Real-time setup
  useEffect(() => {
    socketService.connect();

    socketService.on('issue:new', (newIssue) => {
      setIssues(prev => [newIssue, ...prev]);
    });

    socketService.on('issue:statusUpdate', ({ id, status }) => {
      setIssues(prev => prev.map(issue => 
        issue._id === id ? { ...issue, status } : issue
      ));
    });

    return () => {
      socketService.off('issue:new');
      socketService.off('issue:statusUpdate');
      socketService.disconnect();
    };
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCardClick = (id) => {
    navigate(`/issues/${id}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col z-10 shadow-lg shadow-slate-200/50">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Live Issues</h2>
            <span className="bg-indigo-light text-indigo px-2 py-0.5 rounded-full text-xs font-bold">
              {loading ? '...' : issues.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mb-6">City District • Real-time Monitoring</p>
          
          <div className="space-y-3">
             <div className="relative">
                <select 
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10"
                >
                  <option value="">All Categories</option>
                  <option value="pothole">Pothole</option>
                  <option value="streetlight">Street Light</option>
                  <option value="garbage">Garbage</option>
                  <option value="waterlogging">Waterlogging</option>
                </select>
                <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>
             <div className="grid grid-cols-2 gap-3">
                <select 
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10"
                >
                  <option value="">Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select 
                  name="ward"
                  value={filters.ward}
                  onChange={handleFilterChange}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10"
                >
                  <option value="">Ward</option>
                  <option value="Ward 1">Ward 1</option>
                  <option value="Ward 4">Ward 4</option>
                  <option value="Ward 12">Ward 12</option>
                </select>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-white p-3 rounded-xl border border-slate-100 h-24"></div>
              ))}
            </div>
          )}
          
          {error && (
            <div className="p-8 text-center">
              <AlertCircle className="mx-auto text-red-400 mb-3" size={32} />
              <p className="text-sm text-slate-500 font-medium mb-4">{error}</p>
              <button 
                onClick={fetchIssues}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-indigo text-white rounded-lg text-xs font-bold"
              >
                <RefreshCcw size={14} /> Retry
              </button>
            </div>
          )}

          {!loading && !error && issues.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-400 font-medium">No issues found matching your filters.</p>
            </div>
          )}

          {!loading && issues.map(issue => (
            <IssueCard key={issue._id} issue={issue} onClick={handleCardClick} />
          ))}
        </div>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative bg-slate-100">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {issues.map(issue => (
            <Marker 
              key={issue._id} 
              position={[issue.location.coordinates[1], issue.location.coordinates[0]]}
              icon={createMarkerIcon(getStatusColor(issue.status))}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[150px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 capitalize">{issue.category}</span>
                    <Badge status={issue.status} />
                  </div>
                  <p className="text-xs text-slate-500 mb-1 font-bold">{issue.ward}</p>
                  <p className="text-[10px] text-slate-400 italic mb-3 leading-tight">{issue.aiDescription}</p>
                  <Link 
                    to={`/issues/${issue._id}`}
                    className="block w-full py-2 bg-indigo text-white text-[10px] font-bold rounded-md hover:bg-indigo-dark transition-colors text-center"
                  >
                    View Issue Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Custom Legend */}
        <div className="absolute bottom-6 left-6 z-[1000]">
          <Card className="p-4 shadow-xl border-none bg-white/90 backdrop-blur-md">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Status Legend</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-danger"></div> Open Issues
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-amber"></div> In Progress
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-emerald"></div> Resolved
              </div>
            </div>
          </Card>
        </div>

        {/* Heatmap Toggle */}
        <div className="absolute bottom-32 right-6 z-[1000]">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 transition-all font-bold text-sm">
            <Layers size={18} className="text-indigo" />
            Heatmap Toggle
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[1000]">
           <div className="flex flex-col bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
              <button className="p-3 hover:bg-slate-50 text-slate-600 border-b border-slate-100 font-bold text-xl">+</button>
              <button className="p-3 hover:bg-slate-50 text-slate-600 font-bold text-xl">−</button>
           </div>
           
           {/* FAB */}
           <button 
             onClick={() => navigate('/report')}
             className="w-14 h-14 bg-indigo text-white rounded-2xl shadow-xl shadow-indigo/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative"
             title="Report Issue"
           >
             <Plus size={28} />
             <div className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Report Issue
             </div>
           </button>
        </div>
      </main>
    </div>
  );
};

export default CommunityMap;
