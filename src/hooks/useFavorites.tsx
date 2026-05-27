import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Movie } from './useFetchMovies';

const STORAGE_KEY = 'movie-browser-favorites';

function loadFavorites(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

interface FavoritesContextValue {
  favorites: Movie[];
  setFavorites: (next: Movie[]) => void;
  toggleFavorite: (movie: Movie) => Promise<boolean>;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavoritesState] = useState<Movie[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const setFavorites = useCallback((next: Movie[]) => {
    setFavoritesState(next);
  }, []);

  const toggleFavorite = useCallback(async (movie: Movie) => {
    let wasAdded = false;
    setFavoritesState((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      wasAdded = !exists;
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
    return wasAdded;
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavoritesState((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((m) => m.id === id),
    [favorites]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({ favorites, setFavorites, toggleFavorite, removeFavorite, isFavorite }),
    [favorites, setFavorites, toggleFavorite, removeFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
}
