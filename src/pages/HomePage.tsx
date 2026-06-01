import { useState, useEffect, useRef } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useDebounce } from '../hooks/useDebounce';
import { MovieList } from '../components/MovieList';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorBanner } from '../components/ErrorBanner';
import { EmptyState } from '../components/EmptyState';
import { MovieModal } from '../components/MovieModal';
import { trackSearchAbandoned, trackSearchUsed } from '../analytics';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  // Przechowujemy ostatnią aktywną długość zapytania do detekcji porzucenia.
  const lastActiveQueryLength = useRef(0);

  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error, isPlaceholderData } =
    useFetchMovies(page, debouncedQuery);

  // Zdarzenie: search_used — wyszukiwanie zakończone sukcesem (odpowiednik form submit).
  // Rejestrowane gdy debouncowany query ma ≥2 znaki i dane zostały załadowane.
  // Minimalizacja: zbieramy tylko długość zapytania i liczbę wyników, NIE treść query.
  useEffect(() => {
    if (debouncedQuery.length >= 2 && !isLoading && data) {
      trackSearchUsed(debouncedQuery.length, data.results.length);
      lastActiveQueryLength.current = debouncedQuery.length;
    }
  }, [debouncedQuery, isLoading, data]);

  // Zdarzenie: search_abandoned — użytkownik wyczyścił wyszukiwarkę po wpisaniu ≥2 znaków.
  // Minimalizacja: przekazujemy tylko długość przerwanego zapytania, NIE jego treść.
  useEffect(() => {
    if (query === '' && lastActiveQueryLength.current >= 2) {
      trackSearchAbandoned(lastActiveQueryLength.current);
      lastActiveQueryLength.current = 0;
    }
  }, [query]);

  return (
    <div className='page'>
      <h1 style={{ marginTop: 0 }}>Popularne filmy</h1>

      <input
        type='text'
        placeholder='Szukaj filmów…'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        className='search-input'
      />

      {isError && (
        <ErrorBanner message={error?.message || 'Wystąpił nieznany błąd'} />
      )}

      <div style={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 0.2s ease' }}>
        {isLoading ? (
          <div className='movie-grid'>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !data ? null : data.results.length === 0 ? (
          <EmptyState />
        ) : (
          <MovieList movies={data.results} onSelect={setSelectedMovieId} />
        )}
      </div>

      <div className='pagination'>
        <button
          className='btn'
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Poprzednia
        </button>
        <span>
          Strona {data?.page || 1} z {data?.total_pages || 1}
        </span>
        <button
          className='btn'
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data?.total_pages}
        >
          Następna
        </button>
      </div>

      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
