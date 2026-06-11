import { Todo } from '../types/todo.types';

const STORAGE_KEY = 'taskflow.todos';

const seedTodos: Todo[] = [
  {
    id: 'seed-1',
    title: 'Zaprojektować prototyp lo-fi w Figmie',
    completed: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Wdrożyć responsywny layout (mobile + desktop)',
    completed: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Przeprowadzić audyt dostępności (Lighthouse / AXE)',
    completed: false,
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export function readTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTodos));
      return seedTodos;
    }
    return JSON.parse(raw) as Todo[];
  } catch {
    return seedTodos;
  }
}

export function writeTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
