import React from 'react';

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '', disabled = false }) => {
  const variants = {
    primary: 'bg-indigo text-white hover:bg-indigo-dark',
    secondary: 'border border-indigo text-indigo hover:bg-indigo-light',
    danger: 'bg-danger text-white hover:opacity-90',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
