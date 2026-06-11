import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Priority, RequestStatus, Todo } from '../types/todo.types';
import { todoReducer, initialTodoState } from '../reducers/todoReducer';
import { todoApi, ApiError } from '../api/todoApi';
import { useAuth } from './AuthContext';

interface AddOptions {
  title: string;
  priority: Priority;
  forceError?: boolean;
}

interface TodoContextType {
  todos: Todo[];
  status: RequestStatus;
  error: string | null;
  refetch: () => Promise<void>;
  addTodo: (options: AddOptions) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function toMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  return 'Wystąpił nieoczekiwany błąd.';
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const refetch = useCallback(async () => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const todos = await todoApi.getAll();
      dispatch({ type: 'SET_TODOS', payload: todos });
    } catch (err) {
      dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
    }
  }, []);

  // Zadania pobieramy wyłącznie dla zalogowanego użytkownika.
  // Po wylogowaniu czyścimy stan, aby dane nie były widoczne dla osób niezalogowanych.
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    } else {
      dispatch({ type: 'SET_TODOS', payload: [] });
    }
  }, [isAuthenticated, refetch]);

  const addTodo = useCallback(async ({ title, priority, forceError }: AddOptions) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const created = await todoApi.create({ title, priority, forceError });
      dispatch({ type: 'UPSERT_TODO', payload: created });
      return true;
    } catch (err) {
      dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
      return false;
    }
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      const target = state.todos.find((t) => t.id === id);
      if (!target) return;
      dispatch({ type: 'REQUEST_START' });
      try {
        const updated = await todoApi.update(id, { completed: !target.completed });
        dispatch({ type: 'UPSERT_TODO', payload: updated });
      } catch (err) {
        dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
      }
    },
    [state.todos]
  );

  const editTodo = useCallback(async (id: string, title: string) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const updated = await todoApi.update(id, { title });
      dispatch({ type: 'UPSERT_TODO', payload: updated });
      return true;
    } catch (err) {
      dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
      return false;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      await todoApi.remove(id);
      dispatch({ type: 'REMOVE_TODO', payload: id });
    } catch (err) {
      dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        status: state.status,
        error: state.error,
        refetch,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext musi być użyty wewnątrz TodoProvider');
  }
  return context;
}
