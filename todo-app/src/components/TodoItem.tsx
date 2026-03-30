import React from 'react';
import { Todo } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // --- (6) LocalStorage (cd.) ---

  // UWAGA: musimy ręcznie naprawić typ daty, bo po JSON.parse() jest stringiem.
  // Jeśli todo.createdAt już jest obiektem Date (nowo dodane zadanie), to po prostu z niego korzystamy.
  // Jeśli jest stringiem (zadanie wczytane z localStorage), tworzymy nowy obiekt Date na jego bazie.
  const dateObj = todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt);

  // (6b) Formatowanie do formatu polskiego (dd.mm.yyyy, HH:mm)
  // Używamy toLocaleString, bo chcemy zarówno datę, jak i godzinę.
  const formattedDate = dateObj.toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center', // Centrujemy pionowo checkbox i przycisk względem bloku tekstu
      gap: '12px',
      marginBottom: '10px',
      padding: '8px',
      borderBottom: '1px solid #eee', // Drobna kosmetyka, żeby oddzielić zadania
    }}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ cursor: 'pointer' }}
      />

      {/* (6a) Kontener na tytuł i datę - ułożenie w kolumnie */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tytuł zadania (przekreślony gdy gotowe) */}
        <span style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          fontSize: '1rem', // Standardowy rozmiar tytułu
          color: todo.completed ? '#888' : 'black', // Jeśli gotowe, robimy jaśniejszy tekst
          fontWeight: 500
        }}>
          {todo.title}
        </span>

        {/* (6c) Data utworzenia - mała i szara (sugestywny, rozmyty kolor) */}
        <span style={{
          fontSize: '0.8rem', // Odpowiednik 'small'
          color: '#6c757d', // Przygaszony, szary kolor (jak w przykładzie)
          marginTop: '2px' // Margines między tytułem a datą
        }}>
          {formattedDate}
        </span>
      </div>

      {/* Przycisk usuwania */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '4px 8px',
          backgroundColor: '#dc3545', // Czerwony kolor
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Usuń
      </button>
    </li>
  );
};

export default TodoItem;