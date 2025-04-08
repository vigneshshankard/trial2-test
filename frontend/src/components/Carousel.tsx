import React from 'react';
import clsx from 'clsx';

type CarouselProps = {
  children: React.ReactNode;
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  return (
    <div className={clsx('overflow-hidden relative', className)}>
      <div className="flex transition-transform ease-in-out duration-500">
        {children}
      </div>
    </div>
  );
};

export default Carousel;