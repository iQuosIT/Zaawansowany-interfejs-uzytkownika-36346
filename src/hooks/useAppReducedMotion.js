import { useReducedMotion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
/** Łączy systemową preferencję "reduce motion" z ustawieniem użytkownika w aplikacji. */
export function useAppReducedMotion() {
    const system = useReducedMotion();
    const { reduceMotion } = useSettings();
    return Boolean(system) || reduceMotion;
}
