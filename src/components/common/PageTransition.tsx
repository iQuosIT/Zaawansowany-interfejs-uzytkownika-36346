import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAppReducedMotion } from '../../hooks/useAppReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
}

// Animacja przejścia między widokami (respektuje preferencję "reduce motion").
export default function PageTransition({ children }: PageTransitionProps) {
  const reduce = useAppReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
