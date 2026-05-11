// src/App.tsx
import { useState } from 'react';
import { useFetchMovies } from './hooks/useFetchMovies';
import { useDebounce } from './hooks/useDebounce';
import { MovieCard } from './components/MovieCard';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorBanner } from './components/ErrorBanner';
import { EmptyState } from './components/EmptyState';
import { MovieModal } from './components/MovieModal'; // DODANO

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); // DODANO
  
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error, isPlaceholderData } = useFetchMovies(page, debouncedQuery);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Movie Browser</h1>
      
      <input 
        type="text" 
        placeholder="Szukaj filmów..." 
        value={query}
        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {isError && <ErrorBanner message={error?.message || 'Wystąpił nieznany błąd'} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', opacity: isPlaceholderData ? 0.5 : 1 }}>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
        ) : data?.results.length === 0 ? (
          <EmptyState />
        ) : (
          data?.results.map((movie) => (
            // Opakowano MovieCard w div, aby obsłużyć kliknięcie
            <div key={movie.id} onClick={() => setSelectedMovieId(movie.id)} style={{ cursor: 'pointer' }}>
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Poprzednia</button>
        <span>Strona {data?.page || 1} z {data?.total_pages || 1}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === data?.total_pages}>Następna</button>
      </div>

      {/* DODANO MODAL */}
      <MovieModal movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
    </div>
  );
}