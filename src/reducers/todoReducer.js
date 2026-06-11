export const initialTodoState = {
    todos: [],
    status: 'idle',
    error: null,
};
export function todoReducer(state, action) {
    switch (action.type) {
        case 'REQUEST_START':
            return { ...state, status: 'loading', error: null };
        case 'REQUEST_ERROR':
            return { ...state, status: 'error', error: action.payload };
        case 'SET_TODOS':
            return { ...state, status: 'success', error: null, todos: action.payload };
        case 'UPSERT_TODO': {
            const exists = state.todos.some((t) => t.id === action.payload.id);
            const todos = exists
                ? state.todos.map((t) => (t.id === action.payload.id ? action.payload : t))
                : [action.payload, ...state.todos];
            return { ...state, status: 'success', error: null, todos };
        }
        case 'REMOVE_TODO':
            return {
                ...state,
                status: 'success',
                error: null,
                todos: state.todos.filter((t) => t.id !== action.payload),
            };
        default:
            return state;
    }
}
