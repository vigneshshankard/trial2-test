import React from 'react';
import clsx from 'clsx';
import { Loader } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all focus:outline-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-2 focus:ring-primary-300',
    secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 focus:ring-2 focus:ring-secondary-300',
    accent: 'bg-accent text-neutral-900 hover:bg-accent-600 active:bg-accent-700 focus:ring-2 focus:ring-accent-300',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-50 active:bg-primary-100 focus:ring-2 focus:ring-primary-300',
    ghost: 'bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100',
    link: 'bg-transparent text-secondary underline hover:text-secondary-700 p-0 h-auto',
  };
  
  const sizes = {
    xs: 'text-xs py-1 px-2',
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
    xl: 'text-xl py-3 px-6',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'relative text-opacity-0';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        widthStyles,
        isDisabled && disabledStyles,
        isLoading && loadingStyles,
        variant !== 'link' && 'shadow-sm',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && !isLoading && (
        <span className="mr-2 -ml-1">{leftIcon}</span>
      )}
      
      {children}
      
      {rightIcon && !isLoading && (
        <span className="ml-2 -mr-1">{rightIcon}</span>
      )}
      
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader className="w-5 h-5 animate-spin" />
        </span>
      )}
    </button>
  );
};

export default Button;