// Centralne tokeny animacji - jedno źródło prawdy dla durations, easings,
// spring configs i offsets. Wykorzystywane przez warianty w
// src/animations/variants.ts oraz przez komponenty FM bezpośrednio.

// === Czasy trwania (sekundy) ============================================
// Zgodnie z konspektem 7.1 (Material/HIG):
//  - mikrointerakcje 100-200 ms, UI transitions 200-300 ms, page 250-400 ms
export const DURATION = {
  micro: 0.15,   // hover/feedback (150 ms)
  fast: 0.18,    // exit, toast exit (180 ms)
  base: 0.25,    // standardowe UI transitions (250 ms)
  page: 0.28,    // page transitions (280 ms)
  reduced: 0.1,  // wartość fallback dla prefers-reduced-motion
} as const;

// === Krzywe easing ======================================================
// ease-out: wejście, ease-in: wyjście, ease-in-out: ruch wewnątrz ekranu
export const EASING = {
  out: 'easeOut',
  in: 'easeIn',
  inOut: 'easeInOut',
} as const;

// === Konfiguracje spring (Framer Motion) ================================
// Niskie damping = bardziej "sprężyste". 24-28 to balans (bez bounce).
export const SPRING = {
  soft:  { type: 'spring', stiffness: 280, damping: 28 },  // modal
  base:  { type: 'spring', stiffness: 300, damping: 24 },  // toast
  snappy:{ type: 'spring', stiffness: 320, damping: 26 },  // card hover
} as const;

// === Offsety ruchu (px) =================================================
export const OFFSET = {
  pageX: 16,        // przesunięcie X dla page transitions
  toastX: 48,       // toast wjeżdża z prawej krawędzi
  listItemY: 20,    // pojawianie się elementu listy
  cardLiftY: 2,     // hover lift na karcie
  modalY: 16,       // pojawienie modala od dołu
  favoriteItemY: 8, // dodanie elementu do listy ulubionych
  favoriteItemExitX: 32, // exit element ulubionych (slide w lewo)
} as const;

// === Skale ==============================================================
export const SCALE = {
  enter: 0.95,     // modal/toast scale w stanie initial
  toastExit: 0.85, // mocniejszy collapse przy exit toasta
  toastEnter: 0.9, // toast initial scale
  drag: 1.02,      // delikatne podniesienie przy drag
  tap: 0.98,       // tap feedback
} as const;

// === Stagger ============================================================
// Konspekt 5/Etap C: "każdy element listy pojawia się z opóźnieniem 80 ms".
export const STAGGER = {
  childrenStep: 0.08, // 80 ms odstęp między dziećmi
  initialDelay: 0.05, // małe opóźnienie startu sekwencji
} as const;
