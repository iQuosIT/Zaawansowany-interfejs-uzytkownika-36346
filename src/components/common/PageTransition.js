import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useAppReducedMotion } from '../../hooks/useAppReducedMotion';
// Animacja przejścia między widokami (respektuje preferencję "reduce motion").
export default function PageTransition({ children }) {
    const reduce = useAppReducedMotion();
    return (_jsx(motion.div, { initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: reduce ? undefined : { opacity: 0, y: -16 }, transition: { duration: 0.3, ease: 'easeOut' }, children: children }));
}
