// Typ reprezentujący jedno zadanie
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Możliwe wartości filtra
export type FilterType = 'all' | 'active' | 'completed';

// Typy akcji dla useReducer (Krok 4)
export type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string } };