import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  AlertTitle,
  Stack,
  InputAdornment,
  MenuItem,
} from '@mui/material';
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
import { FilterType, Priority, Todo } from '../types/todo.types';

type PriorityFilter = 'all' | Priority;

export default function TasksPage() {
  const { todos, status, error, refetch, toggleTodo, deleteTodo } = useTodoContext();
  const { notify } = useFeedback();
  const { isAuthenticated } = useAuth();
  const { t } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const priorityOptions: { value: PriorityFilter; label: string }[] = [
    { value: 'all', label: t('tasks.allPriorities') },
    { value: 'high', label: t('priority.high') },
    { value: 'medium', label: t('priority.medium') },
    { value: 'low', label: t('priority.low') },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

  // Otwórz okno dodawania, jeśli przyszliśmy z przyciskiem "Dodaj zadanie" z dashboardu.
  useEffect(() => {
    if ((location.state as { openAdd?: boolean } | null)?.openAdd) {
      setEditTask(null);
      setIsModalOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const isInitialLoading = status === 'loading' && todos.length === 0;
  const hasError = status === 'error';

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
        return matchesSearch && matchesPriority;
      }),
    [todos, searchQuery, priorityFilter]
  );

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    notify(t('tasks.deleted'), 'info');
  };

  const handleOpenAdd = () => {
    setEditTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (todo: Todo) => {
    setEditTask(todo);
    setIsModalOpen(true);
  };

  // Bramka prywatności: niezalogowany użytkownik nie widzi cudzych zadań.
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 4, md: 8 } }}>
          <Box
            sx={{
              maxWidth: 460,
              textAlign: 'center',
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'background.paper',
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              {t('tasks.gateTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              {t('tasks.gateSubtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => navigate('/login', { state: { from: '/tasks' } })}
                sx={{ borderRadius: '8px' }}
              >
                {t('dashboard.login')}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/register')} sx={{ borderRadius: '8px' }}>
                {t('dashboard.createAccount')}
              </Button>
            </Stack>
          </Box>
        </Box>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
            {t('tasks.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('tasks.subtitle')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          aria-haspopup="dialog"
        >
          {t('tasks.add')}
        </Button>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems={{ md: 'center' }} justifyContent="space-between">
        <TextField
          component="search"
          variant="outlined"
          size="small"
          placeholder={t('tasks.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputProps={{ 'aria-label': t('tasks.searchAria') }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: { md: 260 } }}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
          <TextField
            select
            size="small"
            label={t('tasks.priority')}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
            sx={{ minWidth: 190 }}
          >
            {priorityOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        </Stack>
      </Stack>

      {/* Stan: błąd sieci */}
      {hasError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={() => refetch()}>
              {t('tasks.retry')}
            </Button>
          }
        >
          <AlertTitle>{t('tasks.errorTitle')}</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Stan: ładowanie początkowe */}
      {isInitialLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }} role="status" aria-live="polite">
          <CircularProgress />
          <Typography color="text.secondary">{t('tasks.loading')}</Typography>
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {/* Subtelny wskaźnik podczas operacji w tle */}
          {status === 'loading' && (
            <Box sx={{ position: 'absolute', top: -36, right: 0, display: 'flex', alignItems: 'center', gap: 1 }} aria-hidden>
              <CircularProgress size={16} />
              <Typography variant="caption" color="text.secondary">
                {t('tasks.syncing')}
              </Typography>
            </Box>
          )}
          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
          />
        </Box>
      )}

      <AddTaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} editTask={editTask} />
    </PageTransition>
  );
}
