import React, { useState, useReducer, useEffect } from 'react';
import { Todo, FilterType } from './types/todo.types';
import { AddTodoForm } from './components/AddTodoForm';
import { todoReducer } from './reducers/todoReducer';

// Funkcja pomocnicza: bezpieczne pobieranie z localStorage
const initTodos = (): Todo[] => {
  try {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  } catch (e) {
    return [];
  }
};

export default function App() {
  // 1. Zmieniamy inicjalizację reducera! Zamiast pustej tablicy [], ładujemy dane z localStorage
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);
  
  const [filter, setFilter] = useState<FilterType>('all');

  // 2. NOWOŚĆ: Efekt, który zapisuje stan za każdym razem, gdy się zmieni
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Ten kod uruchomi się przy każdym renderze, w którym 'todos' uległo zmianie

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active')    return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; 
  });

  const activeCount = todos.filter(t => !t.completed).length;

  const handleAdd = (title: string) => {
    dispatch({ type: 'ADD', payload: title });
  };

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const handleEdit = (id: string, newTitle: string) => {
    dispatch({ type: 'EDIT', payload: { id, title: newTitle } });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Moja Lista Zadań</h1>
      
      <AddTodoForm onAdd={handleAdd} />
      
      {/* Tutaj reszta Twojego kodu renderującego (FilterBar, TodoList / ul) */}
      <ul>
        {filteredTodos.map(todo => (
           <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
             <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
             {' '}{todo.title}{' '}
             <button onClick={() => handleDelete(todo.id)}>Usuń</button>
           </li>
        ))}
      </ul>
    </div>
  );
}