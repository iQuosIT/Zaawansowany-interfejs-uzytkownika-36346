import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
export const worker = setupWorker(...handlers);
// Uruchamia mockowane API. Działa zarówno lokalnie, jak i na wdrożeniu
// (Vercel / Netlify / GitHub Pages) dzięki ścieżce opartej o BASE_URL.
export async function startMockServiceWorker() {
    await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
            url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        },
    });
}
