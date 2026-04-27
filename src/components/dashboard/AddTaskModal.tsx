import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const { dispatch } = useTodoContext();

  const handleAdd = () => {
    if (title.trim()) {
      dispatch({ type: 'ADD', payload: title.trim() });
      setTitle('');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    onClose();
  };

  return (
    // MUI Dialog domyślnie posiada role="dialog" i zarządza Focus Trapem
    <Dialog 
      open={open} 
      onClose={handleClose}
      aria-labelledby="add-task-dialog-title"
      aria-describedby="add-task-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="add-task-dialog-title" sx={{ fontWeight: 'bold' }}>
        Dodaj nowe zadanie
      </DialogTitle>
      
      <DialogContent>
        {/* Opis dla czytników ekranu */}
        <div id="add-task-dialog-description" className="sr-only">
          Wprowadź treść nowego zadania poniżej i zatwierdź klawiszem Enter lub przyciskiem Dodaj.
        </div>
        
        <TextField
          autoFocus // Ustawia fokus na polu od razu po otwarciu modala
          margin="dense"
          id="task-title"
          label="Treść zadania"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>
          Anuluj
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary" sx={{ fontWeight: 600 }}>
          Dodaj zadanie
        </Button>
      </DialogActions>
    </Dialog>
  );
}