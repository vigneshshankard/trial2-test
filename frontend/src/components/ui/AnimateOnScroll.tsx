import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const animations = {
  fadeIn: {
    visible: { opacity: 1, transition: { duration: 0.6 } },
    hidden: { opacity: 0 }
  },
  slideUp: {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, y: 30 }
  },
  slideIn: {
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, x: -30 }
  },
  scale: {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hidden: { opacity: 0, scale: 0.8 }
  },
  none: {
    visible: {},
    hidden: {}
  }
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  const selectedAnimation = animations[animation];
  
  // Apply custom duration
  const visibleVariant: Variant = {
    ...selectedAnimation.visible,
    transition: { 
      ...selectedAnimation.visible.transition, 
      duration,
      delay 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: visibleVariant,
        hidden: selectedAnimation.hidden
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;