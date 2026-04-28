export const statusColors = {
  'Open': '#EF4444',
  'In Progress': '#F59E0B',
  'Resolved': '#10B981',
};

export const getStatusBg = (status) => {
  switch (status) {
    case 'Open': return 'bg-danger-light text-danger';
    case 'In Progress': return 'bg-amber-light text-amber';
    case 'Resolved': return 'bg-emerald/10 text-emerald';
    default: return 'bg-slate-100 text-slate-500';
  }
};
