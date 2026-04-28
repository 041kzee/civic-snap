import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight,
  Camera,
  Calendar,
  Layers
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';

const mockMyReports = [
  { id: 1, title: "Large Pothole", category: "Road Damage", status: "In Progress", description: "Deep pothole at main junction", ward: "Ward 4", date: "Oct 24, 2025", color: "amber" },
  { id: 2, title: "Broken Streetlight", category: "Public Lighting", status: "Open", description: "Complete dark zone for 100m", ward: "Ward 12", date: "Oct 25, 2025", color: "danger" },
  { id: 3, title: "Garbage Pile", category: "Waste Management", status: "Resolved", description: "Illegal dumping site cleared", ward: "Ward 7", date: "Oct 22, 2025", color: "emerald" },
  { id: 4, title: "Water Leak", category: "Utilities", status: "Open", description: "Pipeline burst on sidewalk", ward: "Ward 4", date: "Oct 26, 2025", color: "danger" },
  { id: 5, title: "Fallen Tree", category: "Parks", status: "Resolved", description: "Tree blocked the service road", ward: "Ward 2", date: "Oct 20, 2025", color: "emerald" },
  { id: 6, title: "Open Manhole", category: "Sanitation", status: "In Progress", description: "Dangerous open cover", ward: "Ward 4", date: "Oct 25, 2025", color: "amber" },
];

const MyReports = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredReports = filter === 'All' 
    ? mockMyReports 
    : mockMyReports.filter(r => r.status === filter);

  const filterOptions = ['All', 'Open', 'In Progress', 'Resolved'];

  const stats = [
    { title: "Total Reported", value: "24", icon: Layers, color: "indigo" },
    { title: "Resolved", value: "18", icon: Badge, color: "emerald" },
    { title: "Pending", value: "6", icon: Clock, color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-background py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Reports</h1>
            <p className="text-slate-500 font-medium">Track and manage the issues you've reported in your community.</p>
          </div>
          <Button 
            variant="primary" 
            className="px-6 py-3 flex items-center gap-2 shadow-lg shadow-indigo/20"
            onClick={() => navigate('/report')}
          >
            <Plus size={20} />
            Report New Issue
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Reported" value="24" icon={Layers} color="indigo" />
          <StatCard title="Resolved" value="18" icon={Badge} color="emerald" />
          <StatCard title="Pending" value="6" icon={Calendar} color="amber" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === opt 
                ? 'bg-indigo text-white shadow-md shadow-indigo/20' 
                : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report) => (
              <Card 
                key={report.id} 
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative border-none"
                onClick={() => navigate(`/issues/${report.id}`)}
              >
                {/* Visual Status Header */}
                <div className={`h-40 relative flex items-center justify-center overflow-hidden`}>
                   <div className={`absolute inset-0 opacity-10 bg-${report.color === 'danger' ? 'danger' : report.color === 'amber' ? 'amber' : 'emerald'}`}></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   <div className="z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
                      <Camera className={`text-${report.color === 'danger' ? 'danger' : report.color === 'amber' ? 'amber' : 'emerald'}`} size={32} />
                   </div>
                   
                   {/* Bottom Status Stripe */}
                   <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${report.color === 'danger' ? 'danger' : report.color === 'amber' ? 'amber' : 'emerald'}`}></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="indigo">{report.category}</Badge>
                    <Badge status={report.status} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo transition-colors">{report.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">{report.description}</p>
                  
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <MapPin size={12} /> {report.ward}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <Calendar size={12} /> {report.date}
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <MapPin size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No reports yet</h3>
            <p className="text-slate-500 mb-8 max-w-xs text-center">Snap your first issue and help make your community better.</p>
            <Button 
              variant="primary" 
              className="px-8 py-3 font-bold flex items-center gap-2"
              onClick={() => navigate('/report')}
            >
              Report an Issue
              <Plus size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
