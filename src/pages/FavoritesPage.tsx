import { useState } from 'react';
import {
  AnimatePresence,
  Reorder,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../components/Toast';
import { MovieModal } from '../components/MovieModal';
import { createFavoriteItemVariants } from '../animations/variants';
import { SCALE } from '../constants/animations';
import type { Movie } from '../hooks/useFetchMovies';

// Etap C - drag & drop z Reorder + AnimatePresence dla usuwania pozycji.
export default function FavoritesPage() {
  const { favorites, setFavorites, removeFavorite } = useFavorites();
  const { show } = useToast();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();
  const itemVariants = createFavoriteItemVariants(!!shouldReduce);

  const handleRemove = (movie: Movie) => {
    removeFavorite(movie.id);
    show(`Usunięto "${movie.title}" z ulubionych`, 'info');
  };

  return (
    <div className='page'>
      <h1 style={{ marginTop: 0 }}>Ulubione filmy</h1>
      <p style={{ color: '#6b7280', marginTop: 0 }}>
        Przeciągnij elementy, aby zmienić kolejność (drag &amp; drop).
      </p>

      {favorites.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          Brak ulubionych filmów. Dodaj kilka z poziomu listy popularnych.
        </div>
      ) : (
        <Reorder.Group
          axis='y'
          values={favorites}
          onReorder={setFavorites}
          className='favorites-list'
          as='ul'
        >
          <AnimatePresence initial={false}>
            {favorites.map((movie) => (
              <Reorder.Item
                key={movie.id}
                value={movie}
                as='li'
                className='favorite-item'
                variants={itemVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                whileDrag={
                  shouldReduce
                    ? undefined
                    : { scale: SCALE.drag, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
                }
              >
                <span className='favorite-item__drag-handle' aria-hidden='true'>
                  ☰
                </span>
                <motion.button
                  type='button'
                  className='favorite-item__title'
                  onClick={() => setSelectedMovieId(movie.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {movie.title}{' '}
                  <small style={{ color: '#6b7280' }}>
                    ({movie.release_date?.slice(0, 4)})
                  </small>
                </motion.button>
                <button
                  className='favorite-item__remove'
                  onClick={() => handleRemove(movie)}
                  aria-label={`Usuń ${movie.title} z ulubionych`}
                >
                  Usuń
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}

      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
