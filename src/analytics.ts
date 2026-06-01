/**
 * Moduł analityczny — Google Analytics 4 via react-ga4
 *
 * RODO / minimalizacja danych (art. 5 ust. 1 lit. c):
 *  - anonymize_ip: true  → ostatni oktet IPv4 (lub ostatnie 80 bitów IPv6) jest zerowany
 *    przed wysłaniem do Google; adres IP nigdy nie trafia na serwery GA w pełnej formie.
 *  - Zbierane są wyłącznie zdarzenia behawioralne opisane poniżej; brak zbierania
 *    treści wpisywanych w pola tekstowe (haseł, danych osobowych).
 *  - Identyfikator sesji to anonimowy client_id generowany przez GA4 (UUID bez powiązania
 *    z danymi osobowymi).
 *  - Czas przechowywania danych w GA4 ograniczony do 14 miesięcy (ustawienie w panelu GA4).
 *  - Cookie consent powinien być uzyskany PRZED wywołaniem ReactGA.initialize().
 */

import ReactGA from 'react-ga4';

/** Zastąp rzeczywistym Measurement ID z panelu GA4 (np. "G-XXXXXXXXXX") */
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Lokalny endpoint analityczny obsługiwany przez MSW w trybie deweloperskim.
 * Wysyłanie na /analytics/event (ten sam origin = brak CORS) pozwala zobaczyć
 * zdarzenia w Network tab jako wpisy XHR ze statusem 202 — identycznie jak
 * w narzędziach privacy-first (np. Plausible).
 * W produkcji zdarzenia przechodzą przez react-ga4 / gtag.js (GA_MEASUREMENT_ID).
 */
const DEV_ANALYTICS_ENDPOINT = '/analytics/event';

/**
 * Wewnętrzna funkcja wysyłająca zdarzenie dwiema ścieżkami:
 *  1. fetch → /analytics/event (przechwytywany przez MSW, widoczny w Network tab)
 *  2. ReactGA.event → standardowe gtag.js (do produkcji / prawdziwego Measurement ID)
 */
function sendEvent(eventName: string, params: Record<string, unknown> = {}) {
  // Ścieżka 1 — fetch do lokalnego endpointu MSW (widoczny w DevTools Network jako XHR 202).
  // Używa tego samego originu co aplikacja — brak CORS, brak blokowania przez ad-blockery.
  // Zdarzenie jest async/non-blocking: nie wstrzymuje renderowania UI.
  fetch(DEV_ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, ...params }),
  }).catch(() => { /* ignoruj błędy sieciowe */ });

  // Ścieżka 2 — react-ga4 / gtag.js (działa gdy podano prawdziwy Measurement ID).
  ReactGA.event(eventName, params as Record<string, string>);
}

export function initGA() {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      // RODO: anonimizacja IP — usuwa ostatni oktet adresu IPv4 przed wysłaniem
      anonymize_ip: true,
    },
  });
}

/**
 * Zdarzenie 1 — śledzenie pageview przy zmianie trasy.
 * Dane: pathname (ścieżka URL bez parametrów ani fragmentów identyfikujących użytkownika).
 * Cel: pomiar ruchu między stronami aplikacji (SPA).
 */
export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path });
}

/**
 * Zdarzenie 2 — kliknięcie przycisku CTA "Dodaj/Usuń z ulubionych" na karcie filmu.
 * Dane: action ('add' | 'remove'), movie_id (numeryczne ID z TMDB — nie jest daną osobową),
 *       movie_title (tytuł publiczny).
 * Cel: pomiar zaangażowania użytkowników z funkcją ulubionych (konwersja mikro).
 * Minimalizacja: brak danych osobowych; ID i tytuł są danymi publicznymi TMDB.
 */
export function trackFavoriteToggle(action: 'add' | 'remove', movieId: number, movieTitle: string) {
  sendEvent('favorite_toggle', { action, movie_id: movieId, movie_title: movieTitle });
}

/**
 * Zdarzenie 3 — porzucenie wyszukiwania (form abandonment).
 * Rejestrowane gdy użytkownik wpisał ≥2 znaki w pole wyszukiwania, a następnie je wyczyścił.
 * Dane: partial_query_length (długość wpisanego tekstu, NIE sam tekst — ochrona przed
 *       przypadkowym przechwyceniem danych osobowych lub haseł wpisanych w zły input).
 * Cel: identyfikacja problemu UX z funkcją wyszukiwania (drop-off).
 */
export function trackSearchAbandoned(partialQueryLength: number) {
  sendEvent('search_abandoned', { partial_query_length: partialQueryLength });
}

/**
 * Zdarzenie 4 — użycie wyszukiwarki (odpowiednik form submit w SPA).
 * Rejestrowane gdy debouncowany zapyt zwrócił wyniki (query.length >= 2).
 * Dane: results_count (liczba wyników), query_length (długość zapytania, NIE treść).
 * Cel: pomiar skuteczności funkcji wyszukiwania i odkrywania treści.
 * Minimalizacja: NIE zbieramy treści zapytania — tylko jego długość i liczbę wyników.
 */
export function trackSearchUsed(queryLength: number, resultsCount: number) {
  sendEvent('search_used', { query_length: queryLength, results_count: resultsCount });
}
