import React from 'react';
import { Todo } from '../types/todo.types'; // Upewnij się, że ścieżka do typów jest poprawna

// 1. Props i ich typowanie
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    // Używamy znaczników <li> jeśli renderujemy wewnątrz <ul> lub <ol>, w przeciwnym razie <div>
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      
      {/* Checkbox przełączający stan completed */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {/* Tytuł zadania (przekreślony gdy completed === true) - Warunkowe stylowanie */}
      <span 
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none',
          flexGrow: 1 
        }}
      >
        {todo.title}
      </span>

      {/* Przycisk usuwania */}
      <button onClick={() => onDelete(todo.id)}>
        Usuń
      </button>

    </li>
  );
};

export default TodoItem;