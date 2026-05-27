import type { Variants } from 'framer-motion';
import {
  DURATION,
  EASING,
  OFFSET,
  SCALE,
  SPRING,
  STAGGER,
} from '../constants/animations';

// Wszystkie fabryki przyjmują flag `reduce` (z `useReducedMotion`).
// Przy reduce zostaje sam fade, bez przesunięć i bez spring - zgodnie
// z WCAG 2.3.3 i strategią opt-out z sekcji 6 konspektu.

const fadeOnly = (duration: number): Variants => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration } },
  exit: { opacity: 0, transition: { duration } },
});

// === Page transitions (Etap B) ==========================================
export function createPageVariants(reduce: boolean): Variants {
  if (reduce) return fadeOnly(DURATION.micro);
  return {
    initial: { opacity: 0, x: -OFFSET.pageX },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION.page, ease: EASING.out },
    },
    exit: {
      opacity: 0,
      x: OFFSET.pageX,
      transition: { duration: DURATION.fast, ease: EASING.in },
    },
  };
}

// === Lista filmow + stagger (Etap C) ====================================
export function createListContainerVariants(reduce: boolean): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : STAGGER.childrenStep,
        delayChildren: reduce ? 0 : STAGGER.initialDelay,
      },
    },
  };
}

export function createListItemVariants(reduce: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : OFFSET.listItemY },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASING.out },
    },
  };
}

// === Modal (Etap B) =====================================================
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.micro } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export function createModalVariants(reduce: boolean): Variants {
  if (reduce) return fadeOnly(DURATION.micro);
  return {
    initial: { opacity: 0, scale: SCALE.enter, y: OFFSET.modalY },
    animate: { opacity: 1, scale: 1, y: 0, transition: SPRING.soft },
    exit: {
      opacity: 0,
      scale: SCALE.enter,
      y: OFFSET.cardLiftY * 4,
      transition: { duration: DURATION.fast },
    },
  };
}

// === Toast (Etap D) =====================================================
export function createToastVariants(reduce: boolean): Variants {
  if (reduce) return fadeOnly(DURATION.micro);
  return {
    initial: { opacity: 0, x: OFFSET.toastX, scale: SCALE.toastEnter },
    animate: { opacity: 1, x: 0, scale: 1, transition: SPRING.base },
    exit: {
      opacity: 0,
      x: OFFSET.toastX,
      scale: SCALE.toastExit,
      transition: { duration: DURATION.fast },
    },
  };
}

// === Pozycja na liscie ulubionych (Etap C) ==============================
export function createFavoriteItemVariants(reduce: boolean): Variants {
  if (reduce) return fadeOnly(DURATION.micro);
  return {
    initial: { opacity: 0, y: -OFFSET.favoriteItemY },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASING.out },
    },
    exit: {
      opacity: 0,
      x: -OFFSET.favoriteItemExitX,
      transition: { duration: DURATION.fast, ease: EASING.in },
    },
  };
}
