import { useState, useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props { movie: Movie; }

export function MovieCard({ movie }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation(); // Blokuje otwarcie Modala przy klikaniu w przycisk ulubionych
    setOptimisticFav(!displayedFav);
    try {
      await toggleFavorite(movie);
      setOptimisticFav(null);
    } catch {
      setOptimisticFav(null);
    }
  }, [displayedFav, toggleFavorite, movie]);

  return (
    <div className='movie-card'>
      <img
        src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : 'https://placehold.co/500x750/eeeeee/999999?text=Brak+plakatu'}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '8px', aspectRatio: '2/3', objectFit: 'cover' }}
      />
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average.toFixed(1)}</p>
      <button
        onClick={handleToggle}
        aria-label={displayedFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        className={`fav-btn ${displayedFav ? 'active' : ''}`}
      >
        {displayedFav ? '❤️' : '🤍'}
      </button>
    </div>
  );
}