export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface TodoState {
  todos: Todo[];
  status: RequestStatus;
  error: string | null;
}

export type TodoAction =
  | { type: 'REQUEST_START' }
  | { type: 'REQUEST_ERROR'; payload: string }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'UPSERT_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: string };
