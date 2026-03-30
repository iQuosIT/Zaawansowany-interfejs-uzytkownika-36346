// src/hooks/useLocalStorage.ts
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Stan przechowujący naszą wartość.
  // Używamy funkcji inicjalizującej, aby pobrać z localStorage tylko przy pierwszym renderze
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Jeśli mamy zapisane zadania, parsujemy je, jeśli nie - zwracamy początkową tablicę
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Zwracamy własną funkcję set, która aktualizuje stan i jednocześnie zapisuje do localStorage
  const setValue = (value: T) => {
    try {
      // Pozwala na to samo co zwykły setter, czyli np. setState(prev => prev + 1) - choć tu w uproszczeniu
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}