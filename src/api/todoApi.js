const BASE = '/api/todos';
/** Błąd sieciowy/HTTP z czytelnym komunikatem dla UI. */
export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}
async function handle(promise) {
    let res;
    try {
        res = await promise;
    }
    catch {
        throw new ApiError('Brak połączenia z serwerem. Sprawdź sieć i spróbuj ponownie.');
    }
    if (!res.ok) {
        let message = `Błąd serwera (${res.status}). Spróbuj ponownie.`;
        try {
            const data = await res.json();
            if (data?.message)
                message = data.message;
        }
        catch {
            /* odpowiedź bez treści */
        }
        throw new ApiError(message, res.status);
    }
    if (res.status === 204)
        return undefined;
    return (await res.json());
}
const jsonHeaders = { 'Content-Type': 'application/json' };
export const todoApi = {
    getAll: () => handle(fetch(BASE)),
    create: (payload) => handle(fetch(BASE, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(payload) })),
    update: (id, payload) => handle(fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
    })),
    remove: (id) => handle(fetch(`${BASE}/${id}`, { method: 'DELETE' })),
};
