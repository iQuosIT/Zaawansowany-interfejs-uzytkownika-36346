import { Todo, TodoAction } from '../types/todo.types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      // Zwracamy nową tablicę z nowym zadaniem na samym początku
      return [
        {
          id: crypto.randomUUID(), // Generujemy ID w reducerze
          title: action.payload,
          completed: false,
          createdAt: new Date()
        },
        ...state
      ];

    case 'TOGGLE':
      // Mapujemy po tablicy: jeśli ID się zgadza, odwracamy stan 'completed'
      return state.map(todo => 
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed } 
          : todo
      );

    case 'DELETE':
      // Zostawiamy w tablicy wszystkie zadania OPRÓCZ tego z podanym ID
      return state.filter(todo => todo.id !== action.payload);

    case 'EDIT':
      return state.map(t =>
        t.id === action.payload.id ? { ...t, title: action.payload.title } : t
      );

    default:
      return state;
  }
}