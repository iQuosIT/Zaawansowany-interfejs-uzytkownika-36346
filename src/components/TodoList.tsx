import { useMemo } from 'react';
import {
  List, ListItem, ListItemText, ListItemIcon, Checkbox,
  IconButton, Typography, Paper, Chip, Box, Stack,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo, FilterType, Priority } from '../types/todo.types';
import { useAppReducedMotion } from '../hooks/useAppReducedMotion';
import { useSettings } from '../context/SettingsContext';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const priorityColor: Record<Priority, 'default' | 'info' | 'warning' | 'error'> = {
  low: 'info',
  medium: 'warning',
  high: 'error',
};

const MotionListItem = motion(ListItem);

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  const reduce = useAppReducedMotion();
  const { t } = useSettings();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
        {t('tasks.empty')}
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <List disablePadding aria-label="Lista zadań">
        <AnimatePresence initial={false}>
          {filteredTodos.map((todo, idx) => {
            const priorityLabel = t(`priority.${todo.priority}` as 'priority.low');
            return (
              <MotionListItem
                key={todo.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
                divider={idx < filteredTodos.length - 1}
                sx={{ bgcolor: todo.completed ? 'action.hover' : 'background.paper' }}
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => onEdit(todo)}
                      aria-label={`Edytuj zadanie: ${todo.title}`}
                      sx={{ mr: 0.5 }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => onDelete(todo.id)}
                      aria-label={`Usuń zadanie: ${todo.title}`}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    inputProps={{ 'aria-label': `Oznacz jako ${todo.completed ? 'nieukończone' : 'ukończone'}: ${todo.title}` }}
                  />
                </ListItemIcon>

                <ListItemText
                  primary={todo.title}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 0.75 }}>
                      <Chip
                        label={`${t('tasks.priority')}: ${priorityLabel}`}
                        size="small"
                        color={priorityColor[todo.priority]}
                        variant="outlined"
                      />
                      {todo.completed && (
                        <Chip label={t('filter.completed')} size="small" color="success" />
                      )}
                    </Stack>
                  }
                  sx={{
                    pr: { xs: 9, sm: 12 },
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                  }}
                />
              </MotionListItem>
            );
          })}
        </AnimatePresence>
      </List>
    </Paper>
  );
}
