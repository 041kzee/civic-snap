import React from 'react';
import { getStatusBg } from '../../utils/statusColors';

const Badge = ({ children, status }) => {
  const colorClass = status ? getStatusBg(status) : 'bg-slate-100 text-slate-500';
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {children || status}
    </span>
  );
};

export default Badge;
