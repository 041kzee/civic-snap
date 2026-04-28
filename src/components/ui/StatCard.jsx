import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon: Icon, color = 'indigo', className = '' }) => {
  const colorMap = {
    indigo: 'text-indigo bg-indigo-light',
    amber: 'text-amber bg-amber-light',
    emerald: 'text-emerald bg-emerald/10',
    danger: 'text-danger bg-danger-light',
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-indigo">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorMap[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
