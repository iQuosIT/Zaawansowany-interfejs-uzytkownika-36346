import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  // TODO (1): zadeklaruj stan inputValue za pomocą useState<string>
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO (2): sprawdź, czy inputValue.trim() nie jest pusty
    //           jeśli tak: wywołaj onAdd(inputValue.trim())
    //           i zresetuj inputValue do pustego stringa
    if (inputValue.trim() !== '') {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <input 
        type="text"
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Dodaj nowe zadanie..."
      />
      <button type='submit'>Dodaj</button>
    </form>
  );
}