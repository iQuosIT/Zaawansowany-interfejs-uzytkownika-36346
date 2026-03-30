// src/context/TodoContext.tsx  (przykład z Theme dla przejrzystości)
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

// TODO (5a): utwórz ThemeContext za pomocą createContext
// Inicjalizujemy kontekst jako 'undefined', ponieważ prawdziwe wartości zostaną dostarczone przez Provider.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // TODO (5b): opakuj children w ThemeContext.Provider przekazując { theme, setTheme }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook do konsumpcji kontekstu
export function useTheme() {
  // TODO (5c): zwróć wynik useContext(ThemeContext)
  // Wskazówka: sprawdź czy kontekst nie jest undefined
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme musi być używany wewnątrz ThemeProvider');
  }
  
  return context;
}