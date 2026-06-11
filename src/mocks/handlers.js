import { http, HttpResponse, delay } from 'msw';
import { readTodos, writeTodos } from './db';
const API = '/api/todos';
// Sztuczne opóźnienie sieci, aby zaprezentować stany loading w UI.
const NETWORK_DELAY = 600;
export const handlers = [
    // GET - pobranie listy zadań
    http.get(API, async () => {
        await delay(NETWORK_DELAY);
        return HttpResponse.json(readTodos());
    }),
    // POST - utworzenie nowego zadania
    http.post(API, async ({ request }) => {
        await delay(NETWORK_DELAY);
        const body = (await request.json());
        if (body.forceError) {
            return new HttpResponse(null, { status: 500 });
        }
        if (!body.title || !body.title.trim()) {
            return HttpResponse.json({ message: 'Tytuł zadania jest wymagany' }, { status: 422 });
        }
        const todos = readTodos();
        const newTodo = {
            id: crypto.randomUUID(),
            title: body.title.trim(),
            completed: false,
            priority: body.priority ?? 'medium',
            createdAt: new Date().toISOString(),
        };
        const updated = [newTodo, ...todos];
        writeTodos(updated);
        return HttpResponse.json(newTodo, { status: 201 });
    }),
    // PUT - aktualizacja zadania (toggle / edycja tytułu / priorytet)
    http.put(`${API}/:id`, async ({ params, request }) => {
        await delay(NETWORK_DELAY);
        const { id } = params;
        const body = (await request.json());
        if (body.forceError) {
            return new HttpResponse(null, { status: 500 });
        }
        const todos = readTodos();
        const index = todos.findIndex((t) => t.id === id);
        if (index === -1) {
            return HttpResponse.json({ message: 'Nie znaleziono zadania' }, { status: 404 });
        }
        const updatedTodo = {
            ...todos[index],
            ...(body.title !== undefined ? { title: body.title.trim() } : {}),
            ...(body.completed !== undefined ? { completed: body.completed } : {}),
            ...(body.priority !== undefined ? { priority: body.priority } : {}),
        };
        todos[index] = updatedTodo;
        writeTodos(todos);
        return HttpResponse.json(updatedTodo);
    }),
    // DELETE - usunięcie zadania
    http.delete(`${API}/:id`, async ({ params }) => {
        await delay(NETWORK_DELAY);
        const { id } = params;
        const todos = readTodos();
        const exists = todos.some((t) => t.id === id);
        if (!exists) {
            return HttpResponse.json({ message: 'Nie znaleziono zadania' }, { status: 404 });
        }
        writeTodos(todos.filter((t) => t.id !== id));
        return new HttpResponse(null, { status: 204 });
    }),
];
