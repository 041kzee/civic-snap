import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle className="text-emerald" size={20} />,
    warning: <AlertCircle className="text-amber" size={20} />,
    error: <XCircle className="text-danger" size={20} />,
  };

  const bgColors = {
    success: 'bg-emerald/10 border-emerald/20',
    warning: 'bg-amber-light border-amber/20',
    error: 'bg-danger-light border-danger/20',
  };

  return (
    <div className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg border shadow-lg ${bgColors[type]} animate-in slide-in-from-right duration-300`}>
      <div className="mr-3">{icons[type]}</div>
      <p className="text-sm font-medium text-slate-900 mr-8">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded transition-colors">
        <X size={16} className="text-slate-500" />
      </button>
    </div>
  );
};

export default Toast;
