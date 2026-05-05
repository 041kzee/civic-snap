import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ThumbsUp, 
  Users, 
  MessageSquare, 
  Send,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  User as UserIcon,
  ChevronRight,
  RefreshCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import issueService from '../../services/issueService';
import commentService from '../../services/commentService';
import departmentService from '../../services/departmentService';
import socketService from '../../services/socket';
import { getStatusColor } from '../../utils/statusColors';

const IssueDetail = () => {
  const { id } = useParams();
  const { role, user: currentUser } = useAuthStore();
  
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingTicket, setUpdatingTicket] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  const [editStatus, setEditStatus] = useState('');
  const [editDept, setEditDept] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [issueData, commentData, deptData] = await Promise.all([
        issueService.getIssueById(id),
        commentService.getComments(id),
        role === 'authority' ? departmentService.getDepartments() : Promise.resolve([])
      ]);

      setIssue(issueData);
      setComments(commentData);
      setDepartments(deptData);
      setEditStatus(issueData.status);
      setEditDept(issueData.department?._id || '');
      setUpvoted(issueData.upvoterIds?.includes(currentUser?.id));
    } catch (err) {
      setError('Failed to load issue details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, role, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Socket listener for real-time status updates
  useEffect(() => {
    socketService.connect();
    socketService.on('issue:statusUpdate', ({ id: updatedId, status }) => {
      if (updatedId === id) {
        setIssue(prev => ({ ...prev, status }));
        setEditStatus(status);
      }
    });

    return () => {
      socketService.off('issue:statusUpdate');
    };
  }, [id]);

  const handleUpvote = async () => {
    if (!issue) return;
    
    // Optimistic update
    const previousState = { upvoted, count: issue.upvoteCount };
    setUpvoted(!upvoted);
    setIssue(prev => ({
      ...prev,
      upvoteCount: upvoted ? prev.upvoteCount - 1 : prev.upvoteCount + 1
    }));

    try {
      await issueService.upvoteIssue(id);
    } catch (err) {
      // Revert on error
      setUpvoted(previousState.upvoted);
      setIssue(prev => ({ ...prev, upvoteCount: previousState.count }));
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const newComment = await commentService.addComment(id, commentText);
      setComments(prev => [...prev, newComment]);
      setCommentText('');
    } catch (err) {
      console.error('Failed to post comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleAuthorityUpdate = async () => {
    setUpdatingTicket(true);
    try {
      // 1. Update Status
      await issueService.updateIssueStatus(id, editStatus);
      
      // 2. Update Department if changed
      if (editDept !== (issue.department?._id || '')) {
        await departmentService.assignDepartment(id, editDept);
      }
      
      // Refresh local data
      fetchData();
    } catch (err) {
      console.error('Failed to update ticket');
    } finally {
      setUpdatingTicket(false);
    }
  };

  const getSLADisplay = () => {
    if (!issue || !issue.slaDue) return null;
    const now = new Date();
    const due = new Date(issue.slaDue);
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return { text: `Overdue by ${Math.abs(days)}d`, color: 'text-red-500' };
    if (days === 0) return { text: 'Due today', color: 'text-amber-500' };
    return { text: `Due in ${days}d`, color: 'text-emerald-500' };
  };

  const sla = getSLADisplay();

  // Timeline Step calculation based on status
  const timelineSteps = [
    { label: "Reported", status: "completed", time: new Date(issue?.createdAt).toLocaleDateString() },
    { label: "Under Review", status: issue?.status === 'open' ? 'current' : 'completed', time: "" },
    { label: "In Progress", status: issue?.status === 'in-progress' ? 'current' : (issue?.status === 'resolved' ? 'completed' : 'pending'), time: "" },
    { label: "Resolved", status: issue?.status === 'resolved' ? 'completed' : 'pending', time: issue?.resolvedAt ? new Date(issue.resolvedAt).toLocaleDateString() : "Pending" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo" size={48} />
          <p className="font-bold text-slate-500">Loading live issue data...</p>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-6">{error || 'Issue not found'}</p>
          <Button onClick={fetchData}>
            <RefreshCcw size={18} /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
        
        {/* Left Column (60%) */}
        <div className="lg:w-[60%] space-y-6">
          {/* Image */}
          <div className="w-full h-80 bg-slate-200 rounded-2xl overflow-hidden shadow-sm border border-slate-100 group relative">
            <img 
              src={issue.photoUrl} 
              alt={issue.category} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
               <Badge variant={issue.severity > 3 ? 'danger' : 'warning'} className="shadow-lg">
                 Severity {issue.severity}/5
               </Badge>
            </div>
          </div>

          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
               <h2 className="text-3xl font-bold text-slate-900 capitalize">{issue.category}</h2>
               <Badge status={issue.status} className="px-4 py-1.5" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-500 bg-white flex items-center gap-1">
                <MapPin size={14} className="text-indigo" />
                {issue.ward}
              </div>
              <span className="text-xs font-medium text-slate-400 self-center">
                Reported {new Date(issue.createdAt).toLocaleDateString()} • {issue.reportedBy?.name || 'Anonymous'}
              </span>
            </div>
            <Card className="p-5 bg-indigo-light/20 border-indigo/10">
               <p className="text-slate-700 leading-relaxed italic text-sm">
                 "{issue.aiDescription}"
               </p>
            </Card>
          </div>

          {/* Status Timeline */}
          <Card className="p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Resolution Timeline</h3>
            <div className="space-y-8 relative pl-4">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100"></div>
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.status === 'completed' ? 'bg-emerald text-white' : 
                    step.status === 'current' ? 'bg-amber text-white ring-4 ring-amber/20' : 
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                     step.status === 'current' ? <Loader2 size={20} className="animate-spin" /> : 
                     <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <p className={`font-bold text-sm ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo" />
              Community Discussion ({comments.length})
            </h3>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {comments.map(c => (
                <div key={c._id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-indigo flex items-center justify-center font-bold text-sm shrink-0">
                    {c.authorName.charAt(0)}
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{c.authorName}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-center text-slate-400 py-8 text-sm italic">No comments yet. Be the first to join the conversation.</p>
              )}
            </div>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 text-sm font-medium"
                onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
              />
              <Button 
                onClick={handlePostComment} 
                disabled={submittingComment || !commentText.trim()}
                className="rounded-xl px-6 h-[46px]"
              >
                {submittingComment ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                Post
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:w-[40%] space-y-6">
          
          {/* Authority Panel (Conditional) */}
          {role === 'authority' && (
            <Card className="border-2 border-indigo overflow-hidden shadow-xl shadow-indigo/10">
               <div className="bg-indigo p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} />
                    <span className="font-bold text-xs uppercase tracking-widest">Authority Control</span>
                  </div>
                  <Badge variant="white" className="text-[10px]">Official View</Badge>
               </div>
               <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Update Ticket Status</label>
                    <select 
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20 transition-all"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Assign Department</label>
                    <select 
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20 transition-all"
                    >
                      <option value="">No Department Assigned</option>
                      {departments.map(d => (
                        <option key={d._id} value={d._id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <Button 
                    onClick={handleAuthorityUpdate} 
                    disabled={updatingTicket}
                    className="w-full py-4 font-bold shadow-lg shadow-indigo/20"
                  >
                    {updatingTicket && <Loader2 className="animate-spin" size={20} />}
                    Apply Changes
                  </Button>
               </div>
            </Card>
          )}

          {/* Metadata Card */}
          <Card className="p-8 space-y-6">
            <div className="flex justify-center mb-2">
               <Badge status={issue.status} className="px-8 py-2.5 text-sm shadow-md" />
            </div>
            
            <div className="space-y-5 pt-4 border-t border-slate-50">
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</span>
                  <span className="text-sm font-bold text-slate-700">{issue.department?.name || 'Unassigned'}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">SLA Deadline</span>
                  <div className={`flex items-center gap-1.5 font-bold text-sm ${sla?.color}`}>
                    <Clock size={16} />
                    {sla?.text}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
               <button 
                 onClick={handleUpvote}
                 className={`py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                   upvoted ? 'bg-indigo text-white shadow-xl shadow-indigo/20' : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-indigo hover:text-indigo'
                 }`}
               >
                 <ThumbsUp size={20} fill={upvoted ? "white" : "none"} />
                 <span className="text-xs font-bold">Upvoted ({issue.upvoteCount})</span>
               </button>
               <button 
                 className="py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 bg-white border-2 border-slate-100 text-slate-500 hover:border-indigo hover:text-indigo transition-all duration-300"
               >
                 <Users size={20} />
                 <span className="text-xs font-bold">Me Too (0)</span>
               </button>
            </div>
          </Card>

          {/* Map Card */}
          <Card className="p-5">
            <div className="h-44 rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-inner">
              <MapContainer 
                center={[issue.location.coordinates[1], issue.location.coordinates[0]]} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                dragging={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <Marker position={[issue.location.coordinates[1], issue.location.coordinates[0]]} />
              </MapContainer>
            </div>
            <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-light flex items-center justify-center text-indigo shrink-0">
                 <MapPin size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-900 mb-0.5">{issue.ward}</p>
                 <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-tight">
                   Exact coordinates detected via GPS
                 </p>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
