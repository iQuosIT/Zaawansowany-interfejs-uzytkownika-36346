import { motion, useReducedMotion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import {
  createListContainerVariants,
  createListItemVariants,
} from '../animations/variants';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  movies: Movie[];
  onSelect: (id: number) => void;
}

// Etap C - lista z efektem stagger. Wariant pochodzi z fabryki -
// dzieki temu nazwy (hidden/visible) i offsets sa wspolne dla calej apki.
export function MovieList({ movies, onSelect }: Props) {
  const shouldReduce = useReducedMotion();
  const containerVariants = createListContainerVariants(!!shouldReduce);
  const itemVariants = createListItemVariants(!!shouldReduce);

  return (
    <motion.ul
      className='movie-grid'
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {movies.map((movie) => (
        <motion.li key={movie.id} variants={itemVariants}>
          <MovieCard movie={movie} onSelect={onSelect} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
