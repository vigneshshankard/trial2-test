import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'link';
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'default', onClick }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2',
    link: 'text-blue-600 hover:underline',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;