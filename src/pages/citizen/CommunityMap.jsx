import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Map as MapIcon, 
  Layers, 
  Navigation,
  Camera,
  Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

// Mock Data for Issues
const mockIssues = [
  { id: 1, title: "Pothole", category: "Road Damage", status: "Open", description: "Hazardous road damage on 5th Ave.", ward: "Ward 4", time: "12m ago", lat: 20.5937, lng: 78.9629, img: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=100&h=100&fit=crop" },
  { id: 2, title: "Garbage...", category: "Waste Management", status: "In Progress", description: "Overflowing bin at park entrance.", ward: "Ward 12", time: "2h ago", lat: 20.6137, lng: 78.9829, img: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=100&h=100&fit=crop" },
  { id: 3, title: "Graffiti Re...", category: "Vandalism", status: "Resolved", description: "Mural cleanup completed.", ward: "Ward 4", time: "5h ago", lat: 20.5737, lng: 78.9429, img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=100&h=100&fit=crop" },
  { id: 4, title: "Street Light", category: "Public Lighting", status: "Open", description: "Luminaire failure reported near bus stop.", ward: "Ward 1", time: "8h ago", lat: 20.6037, lng: 78.9529, img: "https://images.unsplash.com/photo-1498612753354-772a30629934?w=100&h=100&fit=crop" },
  { id: 5, title: "Water Leak", category: "Utilities", status: "Open", description: "Major pipe burst on Main St.", ward: "Ward 7", time: "1d ago", lat: 20.5837, lng: 78.9729, img: "https://images.unsplash.com/photo-1584210660322-01256338e55e?w=100&h=100&fit=crop" },
  { id: 6, title: "Broken Sign", category: "Traffic", status: "In Progress", description: "Stop sign fallen down.", ward: "Ward 3", time: "3h ago", lat: 20.6237, lng: 78.9329, img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=100&h=100&fit=crop" },
];

// Custom Marker Creator
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const icons = {
  'Open': createMarkerIcon('#EF4444'),
  'In Progress': createMarkerIcon('#F59E0B'),
  'Resolved': createMarkerIcon('#10B981')
};

const IssueCard = ({ issue, onClick }) => (
  <Card className="p-3 mb-3 cursor-pointer hover:border-indigo transition-all group" onClick={() => onClick(issue.id)}>
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
        {issue.img ? (
          <img src={issue.img} alt={issue.title} className="w-full h-full object-crop" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Camera size={20} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-900 truncate">{issue.title}</h4>
          <Badge status={issue.status} />
        </div>
        <p className="text-xs text-slate-500 truncate mb-2">AI: {issue.description}</p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
           <span className="flex items-center gap-0.5"><Navigation size={8} /> {issue.ward}</span>
           <span>•</span>
           <span className="flex items-center gap-0.5"><Clock size={8} /> {issue.time}</span>
        </div>
      </div>
    </div>
  </Card>
);

const CommunityMap = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Categories');

  const handleCardClick = (id) => {
    console.log("Issue clicked:", id);
    navigate(`/issues/${id}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col z-10 shadow-lg shadow-slate-200/50">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Live Issues</h2>
            <span className="bg-indigo-light text-indigo px-2 py-0.5 rounded-full text-xs font-bold">{mockIssues.length}</span>
          </div>
          <p className="text-xs text-slate-400 font-medium mb-6">City District 4 • Recent Activity</p>
          
          <div className="space-y-3">
             <div className="relative">
                <select className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10">
                  <option>All Categories</option>
                  <option>Road Damage</option>
                  <option>Waste Management</option>
                </select>
                <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>
             <div className="grid grid-cols-2 gap-3">
                <select className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10">
                  <option>Status</option>
                  <option>Open</option>
                  <option>Resolved</option>
                </select>
                <select className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/10">
                  <option>Ward</option>
                  <option>Ward 4</option>
                  <option>Ward 12</option>
                </select>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {mockIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onClick={handleCardClick} />
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
          {mockIssues.map(issue => (
            <Marker 
              key={issue.id} 
              position={[issue.lat, issue.lng]}
              icon={icons[issue.status]}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[150px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">{issue.category}</span>
                    <Badge status={issue.status} />
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{issue.description}</p>
                  <button 
                    onClick={() => navigate(`/issues/${issue.id}`)}
                    className="w-full py-1.5 bg-indigo text-white text-[10px] font-bold rounded-md hover:bg-indigo-dark transition-colors"
                  >
                    View Issue Details
                  </button>
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
