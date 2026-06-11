import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
  Box,
} from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useSettings } from '../../context/SettingsContext';
import { taskSchema, TaskFormData } from './taskSchema';
import { Todo } from '../../types/todo.types';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  /** Gdy ustawione, modal działa w trybie edycji tytułu. */
  editTask?: Todo | null;
}

const defaultValues: TaskFormData = { title: '', priority: 'medium', forceError: false };

export default function AddTaskModal({ open, onClose, editTask }: AddTaskModalProps) {
  const { addTodo, editTodo } = useTodoContext();
  const { notify } = useFeedback();
  const { t } = useSettings();
  const isEdit = Boolean(editTask);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(
        editTask
          ? { title: editTask.title, priority: editTask.priority, forceError: false }
          : defaultValues
      );
    }
  }, [open, editTask, reset]);

  const onSubmit = async (data: TaskFormData) => {
    let ok: boolean;
    if (isEdit && editTask) {
      ok = await editTodo(editTask.id, data.title);
    } else {
      ok = await addTodo({ title: data.title, priority: data.priority, forceError: data.forceError });
    }

    if (ok) {
      notify(isEdit ? t('modal.updated') : t('modal.added'), 'success');
      onClose();
    } else {
      notify(t('modal.saveError'), 'error');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      aria-labelledby="add-task-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id="add-task-dialog-title" sx={{ fontWeight: 'bold' }}>
          {isEdit ? t('modal.editTitle') : t('modal.addTitle')}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task-title"
            label={t('modal.content')}
            fullWidth
            variant="outlined"
            required
            error={!!errors.title}
            helperText={errors.title?.message ?? t('modal.minChars')}
            FormHelperTextProps={{ role: errors.title ? 'alert' : undefined }}
            {...register('title')}
            sx={{ mt: 2 }}
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={t('tasks.priority')}
                fullWidth
                margin="dense"
                disabled={isEdit}
                helperText={isEdit ? t('modal.priorityLocked') : t('modal.priorityHint')}
                sx={{ mt: 2 }}
              >
                <MenuItem value="low">{t('priority.low')}</MenuItem>
                <MenuItem value="medium">{t('priority.medium')}</MenuItem>
                <MenuItem value="high">{t('priority.high')}</MenuItem>
              </TextField>
            )}
          />

          {!isEdit && (
            <Controller
              name="forceError"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={<Switch checked={!!field.value} onChange={field.onChange} />}
                  label={t('modal.simulateError')}
                />
              )}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit" disabled={isSubmitting} sx={{ fontWeight: 600 }}>
            {t('modal.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            sx={{ fontWeight: 600, minWidth: 150 }}
          >
            {isSubmitting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} color="inherit" />
                {t('modal.saving')}
              </Box>
            ) : isEdit ? (
              t('modal.save')
            ) : (
              t('modal.add')
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
