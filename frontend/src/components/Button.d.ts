declare module './Button' {
  import React from 'react';

  export interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'link';
    onClick?: () => void;
  }

  const Button: React.FC<ButtonProps>;
  export default Button;
}