import React from 'react';
import clsx from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'feature' | 'premium' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded shadow bg-white overflow-hidden';
  
  const variants = {
    default: '',
    feature: 'border-l-4 border-secondary',
    premium: 'border-t-4 border-accent',
    outline: 'border border-neutral-200 shadow-sm',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };
  
  const hoverStyles = hover
    ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer'
    : '';

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx('mb-4', className)}>{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <h3 className={clsx('text-lg font-bold', className)}>{children}</h3>;
};

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <p className={clsx('text-neutral-600 text-sm', className)}>{children}</p>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-neutral-100', className)}>
      {children}
    </div>
  );
};

export default Card;