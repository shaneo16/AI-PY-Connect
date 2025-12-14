import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide';
  
  const variants = {
    // Blue background, Black text, Yellow border accent potentially? keeping clean for now
    primary: 'bg-primary text-black hover:bg-primaryDark border-2 border-transparent hover:border-black',
    // Yellow background, Black text
    secondary: 'bg-secondary text-black hover:bg-yellow-300 border-2 border-transparent hover:border-black',
    // Outline uses the Grey border
    outline: 'border-2 border-accent bg-transparent hover:bg-white text-black',
    ghost: 'bg-transparent hover:bg-white/50 text-black',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};