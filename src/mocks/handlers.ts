import { http, HttpResponse, delay } from 'msw';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export const handlers = [
  // 1. Mock listy popularnych filmów (obowiązkowy punkt 1)
  http.get(`${TMDB_BASE}/movie/popular`, async ({ request }) => {
    await delay(800); // symuluje ładowanie
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    
    return HttpResponse.json({
      page,
      total_pages: 10,
      results: Array.from({ length: 20 }, (_, i) => ({
        id: page * 100 + i,
        title: `Film testowy (Mock) ${page}-${i + 1}`,
        overview: 'Opis testowego filmu.',
        poster_path: null,
        release_date: '2024-01-01',
        vote_average: 7.5,
        genre_ids: [28, 12],
      })),
    });
  }),

  // 2. Mock wyszukiwania filmów (obowiązkowy punkt 2 z debouncingiem)
  http.get(`${TMDB_BASE}/search/movie`, async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const query = url.searchParams.get('query') ?? 'szukany';
    
    return HttpResponse.json({
      page,
      total_pages: 5,
      results: Array.from({ length: 20 }, (_, i) => ({
        id: 9000 + page * 100 + i,
        title: `Wynik dla "${query}" ${page}-${i + 1}`,
        overview: `Zmockowany wynik wyszukiwania dla wpisanej frazy: ${query}.`,
        poster_path: null,
        release_date: '2024-05-11',
        vote_average: 8.0,
        genre_ids: [12],
      })),
    });
  }),

  // 3. Mock szczegółów filmu (obowiązkowy punkt 3 i 5 - Modal + lazy fetch)
  http.get(`${TMDB_BASE}/movie/:id`, async ({ params }) => {
    await delay(500); // symuluje szybkie pobranie pojedynczego elementu
    return HttpResponse.json({
      id: Number(params.id),
      title: `Szczegóły filmu (Mock) ${params.id}`,
      overview: 'To jest symulowany, bardzo długi opis filmu. Zwróć uwagę, że pobrał się DOPIERO w momencie otwarcia Modala (lazy fetch), co w pełni spełnia kryterium nr 5 ze specyfikacji.',
      release_date: '2024-01-01',
      vote_average: 8.5,
      poster_path: null,
    });
  }),
];