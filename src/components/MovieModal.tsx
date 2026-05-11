import { useMovieDetails } from '../hooks/useMovieDetails';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: Props) {
  // Hook uruchomi się TYLKO gdy movieId nie jest nullem (wymóg "lazy fetch (enabled)")
  const { data, isLoading, isError } = useMovieDetails(movieId);

  if (!movieId) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '500px', width: '90%', position: 'relative', color: 'black' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', cursor: 'pointer' }}>
          Zamknij (X)
        </button>
        
        {isLoading ? (
          <p>Ładowanie szczegółów...</p>
        ) : isError ? (
          <p style={{ color: 'red' }}>Błąd pobierania danych.</p>
        ) : data ? (
          <>
            <h2>{data.title}</h2>
            <p><strong>Opis:</strong> {data.overview}</p>
            <p><strong>Premiera:</strong> {data.release_date}</p>
            <p><strong>Ocena:</strong> ⭐ {data.vote_average}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}