import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControlLabel, Switch, CircularProgress, Box, } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useSettings } from '../../context/SettingsContext';
import { taskSchema } from './taskSchema';
const defaultValues = { title: '', priority: 'medium', forceError: false };
export default function AddTaskModal({ open, onClose, editTask }) {
    const { addTodo, editTodo } = useTodoContext();
    const { notify } = useFeedback();
    const { t } = useSettings();
    const isEdit = Boolean(editTask);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(taskSchema),
        mode: 'onBlur',
        defaultValues,
    });
    useEffect(() => {
        if (open) {
            reset(editTask
                ? { title: editTask.title, priority: editTask.priority, forceError: false }
                : defaultValues);
        }
    }, [open, editTask, reset]);
    const onSubmit = async (data) => {
        let ok;
        if (isEdit && editTask) {
            ok = await editTodo(editTask.id, data.title);
        }
        else {
            ok = await addTodo({ title: data.title, priority: data.priority, forceError: data.forceError });
        }
        if (ok) {
            notify(isEdit ? t('modal.updated') : t('modal.added'), 'success');
            onClose();
        }
        else {
            notify(t('modal.saveError'), 'error');
        }
    };
    return (_jsx(Dialog, { open: open, onClose: isSubmitting ? undefined : onClose, "aria-labelledby": "add-task-dialog-title", fullWidth: true, maxWidth: "sm", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, children: [_jsx(DialogTitle, { id: "add-task-dialog-title", sx: { fontWeight: 'bold' }, children: isEdit ? t('modal.editTitle') : t('modal.addTitle') }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", id: "task-title", label: t('modal.content'), fullWidth: true, variant: "outlined", required: true, error: !!errors.title, helperText: errors.title?.message ?? t('modal.minChars'), FormHelperTextProps: { role: errors.title ? 'alert' : undefined }, ...register('title'), sx: { mt: 2 } }), _jsx(Controller, { name: "priority", control: control, render: ({ field }) => (_jsxs(TextField, { ...field, select: true, label: t('tasks.priority'), fullWidth: true, margin: "dense", disabled: isEdit, helperText: isEdit ? t('modal.priorityLocked') : t('modal.priorityHint'), sx: { mt: 2 }, children: [_jsx(MenuItem, { value: "low", children: t('priority.low') }), _jsx(MenuItem, { value: "medium", children: t('priority.medium') }), _jsx(MenuItem, { value: "high", children: t('priority.high') })] })) }), !isEdit && (_jsx(Controller, { name: "forceError", control: control, render: ({ field }) => (_jsx(FormControlLabel, { sx: { mt: 1 }, control: _jsx(Switch, { checked: !!field.value, onChange: field.onChange }), label: t('modal.simulateError') })) }))] }), _jsxs(DialogActions, { sx: { p: 3, pt: 0 }, children: [_jsx(Button, { onClick: onClose, color: "inherit", disabled: isSubmitting, sx: { fontWeight: 600 }, children: t('modal.cancel') }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", disabled: isSubmitting, "aria-busy": isSubmitting, sx: { fontWeight: 600, minWidth: 150 }, children: isSubmitting ? (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(CircularProgress, { size: 18, color: "inherit" }), t('modal.saving')] })) : isEdit ? (t('modal.save')) : (t('modal.add')) })] })] }) }));
}
