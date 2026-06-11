import { Todo, Priority } from '../types/todo.types';

const BASE = '/api/todos';

/** Błąd sieciowy/HTTP z czytelnym komunikatem dla UI. */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handle<T>(promise: Promise<Response>): Promise<T> {
  let res: Response;
  try {
    res = await promise;
  } catch {
    throw new ApiError('Brak połączenia z serwerem. Sprawdź sieć i spróbuj ponownie.');
  }

  if (!res.ok) {
    let message = `Błąd serwera (${res.status}). Spróbuj ponownie.`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      /* odpowiedź bez treści */
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const jsonHeaders = { 'Content-Type': 'application/json' };

export const todoApi = {
  getAll: () => handle<Todo[]>(fetch(BASE)),

  create: (payload: { title: string; priority: Priority; forceError?: boolean }) =>
    handle<Todo>(
      fetch(BASE, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(payload) })
    ),

  update: (
    id: string,
    payload: Partial<Pick<Todo, 'title' | 'completed' | 'priority'>> & { forceError?: boolean }
  ) =>
    handle<Todo>(
      fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      })
    ),

  remove: (id: string) => handle<void>(fetch(`${BASE}/${id}`, { method: 'DELETE' })),
};
