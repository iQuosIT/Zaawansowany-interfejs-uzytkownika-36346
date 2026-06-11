import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, IconButton, Typography, Paper, Chip, Box, Stack, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppReducedMotion } from '../hooks/useAppReducedMotion';
import { useSettings } from '../context/SettingsContext';
const priorityColor = {
    low: 'info',
    medium: 'warning',
    high: 'error',
};
const MotionListItem = motion(ListItem);
export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
    const reduce = useAppReducedMotion();
    const { t } = useSettings();
    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === 'active')
                return !todo.completed;
            if (filter === 'completed')
                return todo.completed;
            return true;
        });
    }, [todos, filter]);
    if (filteredTodos.length === 0) {
        return (_jsx(Typography, { color: "text.secondary", textAlign: "center", sx: { mt: 4 }, children: t('tasks.empty') }));
    }
    return (_jsx(Paper, { variant: "outlined", sx: { overflow: 'hidden' }, children: _jsx(List, { disablePadding: true, "aria-label": "Lista zada\u0144", children: _jsx(AnimatePresence, { initial: false, children: filteredTodos.map((todo, idx) => {
                    const priorityLabel = t(`priority.${todo.priority}`);
                    return (_jsxs(MotionListItem, { layout: !reduce, initial: reduce ? false : { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, exit: reduce ? undefined : { opacity: 0, x: 16 }, transition: { duration: 0.2 }, divider: idx < filteredTodos.length - 1, sx: { bgcolor: todo.completed ? 'action.hover' : 'background.paper' }, secondaryAction: _jsxs(Box, { children: [_jsx(IconButton, { edge: "end", onClick: () => onEdit(todo), "aria-label": `Edytuj zadanie: ${todo.title}`, sx: { mr: 0.5 }, children: _jsx(EditOutlinedIcon, {}) }), _jsx(IconButton, { edge: "end", color: "error", onClick: () => onDelete(todo.id), "aria-label": `Usuń zadanie: ${todo.title}`, children: _jsx(DeleteOutlineIcon, {}) })] }), children: [_jsx(ListItemIcon, { children: _jsx(Checkbox, { checked: todo.completed, onChange: () => onToggle(todo.id), inputProps: { 'aria-label': `Oznacz jako ${todo.completed ? 'nieukończone' : 'ukończone'}: ${todo.title}` } }) }), _jsx(ListItemText, { primary: todo.title, secondaryTypographyProps: { component: 'div' }, secondary: _jsxs(Stack, { direction: "row", spacing: 1, useFlexGap: true, flexWrap: "wrap", sx: { mt: 0.75 }, children: [_jsx(Chip, { label: `${t('tasks.priority')}: ${priorityLabel}`, size: "small", color: priorityColor[todo.priority], variant: "outlined" }), todo.completed && (_jsx(Chip, { label: t('filter.completed'), size: "small", color: "success" }))] }), sx: {
                                    pr: { xs: 9, sm: 12 },
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? 'text.disabled' : 'text.primary',
                                } })] }, todo.id));
                }) }) }) }));
}
