export const statusColors = {
  'Open': '#EF4444',
  'In Progress': '#F59E0B',
  'Resolved': '#10B981',
};

export const getStatusColor = (status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case 'open': return 'text-danger';
    case 'in-progress': return 'text-amber';
    case 'resolved': return 'text-emerald';
    default: return 'text-slate-500';
  }
};

export const getStatusBg = (status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case 'open': return 'bg-danger-light text-danger';
    case 'in-progress': return 'bg-amber-light text-amber';
    case 'resolved': return 'bg-emerald/10 text-emerald';
    default: return 'bg-slate-100 text-slate-500';
  }
};

