import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight,
  Camera,
  Calendar,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import issueService from '../../services/issueService';

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [counts, setCounts] = useState({ open: 0, 'in-progress': 0, resolved: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  // Fetch counts once from all reports
  const fetchCounts = useCallback(async () => {
    try {
      const data = await issueService.getIssues({ reportedBy: 'me', limit: 100 });
      const all = data.issues || [];
      setCounts({
        total: all.length,
        open: all.filter(r => r.status === 'open').length,
        'in-progress': all.filter(r => r.status === 'in-progress').length,
        resolved: all.filter(r => r.status === 'resolved').length,
      });
    } catch (err) {
      console.error('Failed to fetch counts', err);
    }
  }, []);

  const fetchFilteredReports = useCallback(async (status) => {
    try {
      setLoading(true);
      setError(null);
      const query = { reportedBy: 'me', limit: 50 };
      if (status !== 'All') {
        query.status = status.toLowerCase().replace(' ', '-');
      }
      const data = await issueService.getIssues(query);
      setReports(data.issues || []);
    } catch (err) {
      setError('Failed to load your reports.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  useEffect(() => {
    fetchFilteredReports(filter);
  }, [filter, fetchFilteredReports]);

  const filterOptions = [
    { label: 'All', count: counts.total },
    { label: 'Open', count: counts.open },
    { label: 'In Progress', count: counts['in-progress'] },
    { label: 'Resolved', count: counts.resolved },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <Button onClick={() => fetchFilteredReports(filter)}>
            <RefreshCcw size={18} /> Retry
          </Button>
        </div>
      </div>
    );
  }

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
          <StatCard title="Total Reported" value={counts.total} icon={Layers} color="indigo" />
          <StatCard title="Resolved" value={counts.resolved} icon={CheckCircle2} color="emerald" />
          <StatCard title="Pending Action" value={counts.open + counts['in-progress']} icon={Clock} color="amber" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setFilter(opt.label)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                filter === opt.label 
                ? 'bg-indigo text-white shadow-md shadow-indigo/20' 
                : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {opt.label}
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === opt.label ? 'bg-white/20' : 'bg-slate-100'}`}>
                {opt.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 h-96"></div>
            ))}
          </div>
        ) : reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {reports.map((report) => (
              <Card 
                key={report._id} 
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative border-none"
                onClick={() => navigate(`/issues/${report._id}`)}
              >
                {/* Visual Status Header */}
                <div className={`h-40 relative flex items-center justify-center overflow-hidden`}>
                   <img 
                     src={report.thumbnailUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                     alt={report.category}
                     className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   
                   {/* Badge Over Image */}
                   <div className="absolute top-4 right-4">
                      <Badge status={report.status} className="shadow-lg" />
                   </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="indigo" className="capitalize">{report.category}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo transition-colors capitalize">
                    {report.category} — {report.ward}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed italic">
                    "{report.aiDescription}"
                  </p>
                  
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        <MapPin size={12} className="text-indigo" /> {report.ward}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        <Calendar size={12} className="text-indigo" /> {new Date(report.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-indigo/30 group-hover:text-indigo group-hover:translate-x-1 transition-all" />
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
            <p className="text-slate-500 mb-8 max-w-xs text-center">Snapshot your first issue and help make your community better.</p>
            <Button 
              variant="primary" 
              className="px-8 py-3 font-bold flex items-center gap-2 shadow-lg shadow-indigo/20"
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
