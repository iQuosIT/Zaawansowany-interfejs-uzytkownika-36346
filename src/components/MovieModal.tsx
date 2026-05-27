import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMovieDetails } from '../hooks/useMovieDetails';
import {
  backdropVariants,
  createModalVariants,
} from '../animations/variants';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

// Etap B/D - modal z exit-animation przez AnimatePresence.
// Backdrop ma osobny wariant (sam fade), modal sprezynowe pojawienie.
export function MovieModal({ movieId, onClose }: Props) {
  const { data, isLoading, isError } = useMovieDetails(movieId);
  const shouldReduce = useReducedMotion();
  const modalVariants = createModalVariants(!!shouldReduce);

  useEffect(() => {
    if (movieId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [movieId, onClose]);

  return (
    <AnimatePresence>
      {movieId !== null && (
        <motion.div
          className='modal-backdrop'
          variants={backdropVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          onClick={onClose}
        >
          <motion.div
            className='modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='movie-modal-title'
            variants={modalVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className='modal__close'
              aria-label='Zamknij okno dialogowe'
            >
              ×
            </button>

            {isLoading ? (
              <p>Ładowanie szczegółów…</p>
            ) : isError ? (
              <p style={{ color: '#ef4444' }}>Błąd pobierania danych.</p>
            ) : data ? (
              <>
                <h2 id='movie-modal-title' style={{ marginTop: 0 }}>
                  {data.title}
                </h2>
                <p>
                  <strong>Opis:</strong> {data.overview}
                </p>
                <p>
                  <strong>Premiera:</strong> {data.release_date}
                </p>
                <p>
                  <strong>Ocena:</strong> ⭐ {data.vote_average}
                </p>
              </>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
