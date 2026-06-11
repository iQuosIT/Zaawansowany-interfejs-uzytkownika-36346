import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { todoReducer, initialTodoState } from '../reducers/todoReducer';
import { todoApi, ApiError } from '../api/todoApi';
import { useAuth } from './AuthContext';
const TodoContext = createContext(undefined);
function toMessage(err) {
    if (err instanceof ApiError)
        return err.message;
    return 'Wystąpił nieoczekiwany błąd.';
}
export function TodoProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const refetch = useCallback(async () => {
        dispatch({ type: 'REQUEST_START' });
        try {
            const todos = await todoApi.getAll();
            dispatch({ type: 'SET_TODOS', payload: todos });
        }
        catch (err) {
            dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
        }
    }, []);
    // Zadania pobieramy wyłącznie dla zalogowanego użytkownika.
    // Po wylogowaniu czyścimy stan, aby dane nie były widoczne dla osób niezalogowanych.
    useEffect(() => {
        if (isAuthenticated) {
            refetch();
        }
        else {
            dispatch({ type: 'SET_TODOS', payload: [] });
        }
    }, [isAuthenticated, refetch]);
    const addTodo = useCallback(async ({ title, priority, forceError }) => {
        dispatch({ type: 'REQUEST_START' });
        try {
            const created = await todoApi.create({ title, priority, forceError });
            dispatch({ type: 'UPSERT_TODO', payload: created });
            return true;
        }
        catch (err) {
            dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
            return false;
        }
    }, []);
    const toggleTodo = useCallback(async (id) => {
        const target = state.todos.find((t) => t.id === id);
        if (!target)
            return;
        dispatch({ type: 'REQUEST_START' });
        try {
            const updated = await todoApi.update(id, { completed: !target.completed });
            dispatch({ type: 'UPSERT_TODO', payload: updated });
        }
        catch (err) {
            dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
        }
    }, [state.todos]);
    const editTodo = useCallback(async (id, title) => {
        dispatch({ type: 'REQUEST_START' });
        try {
            const updated = await todoApi.update(id, { title });
            dispatch({ type: 'UPSERT_TODO', payload: updated });
            return true;
        }
        catch (err) {
            dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
            return false;
        }
    }, []);
    const deleteTodo = useCallback(async (id) => {
        dispatch({ type: 'REQUEST_START' });
        try {
            await todoApi.remove(id);
            dispatch({ type: 'REMOVE_TODO', payload: id });
        }
        catch (err) {
            dispatch({ type: 'REQUEST_ERROR', payload: toMessage(err) });
        }
    }, []);
    return (_jsx(TodoContext.Provider, { value: {
            todos: state.todos,
            status: state.status,
            error: state.error,
            refetch,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodo,
        }, children: children }));
}
export function useTodoContext() {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext musi być użyty wewnątrz TodoProvider');
    }
    return context;
}
