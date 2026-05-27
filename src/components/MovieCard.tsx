import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from './Toast';
import { OFFSET, SCALE, SPRING } from '../constants/animations';
import type { Movie } from '../hooks/useFetchMovies';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_POSTER =
  'https://placehold.co/500x750/eeeeee/999999?text=Brak+plakatu';

interface Props {
  movie: Movie;
  onSelect?: (id: number) => void;
}

export function MovieCard({ movie, onSelect }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { show } = useToast();
  const shouldReduce = useReducedMotion();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setOptimisticFav(!displayedFav);
      try {
        const wasAdded = await toggleFavorite(movie);
        setOptimisticFav(null);
        show(
          wasAdded
            ? `Dodano "${movie.title}" do ulubionych`
            : `Usunięto "${movie.title}" z ulubionych`,
          wasAdded ? 'success' : 'info'
        );
      } catch {
        setOptimisticFav(null);
        show('Nie udało się zaktualizować ulubionych', 'error');
      }
    },
    [displayedFav, toggleFavorite, movie, show]
  );

  const handleClick = () => onSelect?.(movie.id);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(movie.id);
    }
  };

  return (
    <motion.div
      className='movie-card'
      onClick={handleClick}
      onKeyDown={handleKey}
      role='button'
      tabIndex={0}
      aria-label={`Otwórz szczegóły filmu ${movie.title}`}
      // Etap A + Sekcja 6 - przy reduce zostaje sam hover CSS
      whileHover={shouldReduce ? undefined : { y: -OFFSET.cardLiftY }}
      whileTap={shouldReduce ? undefined : { scale: SCALE.tap }}
      transition={SPRING.snappy}
    >
      <img
        src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : FALLBACK_POSTER}
        alt={movie.title}
        style={{
          width: '100%',
          borderRadius: '6px',
          aspectRatio: '2/3',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <h3>{movie.title}</h3>
      <p>
        {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average.toFixed(1)}
      </p>
      <button
        onClick={handleToggle}
        aria-label={displayedFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        aria-pressed={displayedFav}
        className={`fav-btn ${displayedFav ? 'active' : ''}`}
      >
        {displayedFav ? '❤️' : '🤍'}
      </button>
    </motion.div>
  );
}
