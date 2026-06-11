import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CircularProgress, Alert, AlertTitle, Stack, InputAdornment, MenuItem, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PageTransition from '../components/common/PageTransition';
import TodoList from '../components/TodoList';
import FilterBar from '../components/FilterBar';
import AddTaskModal from '../components/dashboard/AddTaskModal';
import { useTodoContext } from '../context/TodoContext';
import { useFeedback } from '../context/FeedbackContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
export default function TasksPage() {
    const { todos, status, error, refetch, toggleTodo, deleteTodo } = useTodoContext();
    const { notify } = useFeedback();
    const { isAuthenticated } = useAuth();
    const { t } = useSettings();
    const location = useLocation();
    const navigate = useNavigate();
    const priorityOptions = [
        { value: 'all', label: t('tasks.allPriorities') },
        { value: 'high', label: t('priority.high') },
        { value: 'medium', label: t('priority.medium') },
        { value: 'low', label: t('priority.low') },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    // Otwórz okno dodawania, jeśli przyszliśmy z przyciskiem "Dodaj zadanie" z dashboardu.
    useEffect(() => {
        if (location.state?.openAdd) {
            setEditTask(null);
            setIsModalOpen(true);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location, navigate]);
    const isInitialLoading = status === 'loading' && todos.length === 0;
    const hasError = status === 'error';
    const filteredTodos = useMemo(() => todos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
        return matchesSearch && matchesPriority;
    }), [todos, searchQuery, priorityFilter]);
    const handleDelete = async (id) => {
        await deleteTodo(id);
        notify(t('tasks.deleted'), 'info');
    };
    const handleOpenAdd = () => {
        setEditTask(null);
        setIsModalOpen(true);
    };
    const handleOpenEdit = (todo) => {
        setEditTask(todo);
        setIsModalOpen(true);
    };
    // Bramka prywatności: niezalogowany użytkownik nie widzi cudzych zadań.
    if (!isAuthenticated) {
        return (_jsx(PageTransition, { children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: { xs: 4, md: 8 } }, children: _jsxs(Box, { sx: {
                        maxWidth: 460,
                        textAlign: 'center',
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.08)',
                        bgcolor: 'background.paper',
                    }, children: [_jsx(LockOutlinedIcon, { sx: { fontSize: 48, color: 'primary.main', mb: 2 } }), _jsx(Typography, { variant: "h5", component: "h1", sx: { fontWeight: 700, mb: 1 }, children: t('tasks.gateTitle') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 4 }, children: t('tasks.gateSubtitle') }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, justifyContent: "center", children: [_jsx(Button, { variant: "contained", onClick: () => navigate('/login', { state: { from: '/tasks' } }), sx: { borderRadius: '8px' }, children: t('dashboard.login') }), _jsx(Button, { variant: "outlined", onClick: () => navigate('/register'), sx: { borderRadius: '8px' }, children: t('dashboard.createAccount') })] })] }) }) }));
    }
    return (_jsxs(PageTransition, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 800 }, children: t('tasks.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('tasks.subtitle') })] }), _jsx(Button, { variant: "contained", color: "primary", startIcon: _jsx(AddIcon, {}), onClick: handleOpenAdd, "aria-haspopup": "dialog", children: t('tasks.add') })] }), _jsxs(Stack, { direction: { xs: 'column', md: 'row' }, spacing: 2, sx: { mb: 3 }, alignItems: { md: 'center' }, justifyContent: "space-between", children: [_jsx(TextField, { component: "search", variant: "outlined", size: "small", placeholder: t('tasks.search'), value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), inputProps: { 'aria-label': t('tasks.searchAria') }, InputProps: {
                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { fontSize: "small" }) })),
                        }, sx: { minWidth: { md: 260 } } }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, alignItems: { sm: 'center' }, children: [_jsx(TextField, { select: true, size: "small", label: t('tasks.priority'), value: priorityFilter, onChange: (e) => setPriorityFilter(e.target.value), sx: { minWidth: 190 }, children: priorityOptions.map((opt) => (_jsx(MenuItem, { value: opt.value, children: opt.label }, opt.value))) }), _jsx(FilterBar, { activeFilter: filter, onFilterChange: setFilter })] })] }), hasError && (_jsxs(Alert, { severity: "error", sx: { mb: 3 }, action: _jsx(Button, { color: "inherit", size: "small", startIcon: _jsx(RefreshIcon, {}), onClick: () => refetch(), children: t('tasks.retry') }), children: [_jsx(AlertTitle, { children: t('tasks.errorTitle') }), error] })), isInitialLoading ? (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }, role: "status", "aria-live": "polite", children: [_jsx(CircularProgress, {}), _jsx(Typography, { color: "text.secondary", children: t('tasks.loading') })] })) : (_jsxs(Box, { sx: { position: 'relative' }, children: [status === 'loading' && (_jsxs(Box, { sx: { position: 'absolute', top: -36, right: 0, display: 'flex', alignItems: 'center', gap: 1 }, "aria-hidden": true, children: [_jsx(CircularProgress, { size: 16 }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: t('tasks.syncing') })] })), _jsx(TodoList, { todos: filteredTodos, filter: filter, onToggle: toggleTodo, onDelete: handleDelete, onEdit: handleOpenEdit })] })), _jsx(AddTaskModal, { open: isModalOpen, onClose: () => setIsModalOpen(false), editTask: editTask })] }));
}
