import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography, Button, Paper, LinearProgress, Stack, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import StatsGrid from '../components/dashboard/StatsGrid';
import RecentTasks from '../components/dashboard/RecentTasks';
import { useAuth } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import { useSettings } from '../context/SettingsContext';
import { useAppReducedMotion } from '../hooks/useAppReducedMotion';
function HeroPreview() {
    const reduce = useAppReducedMotion();
    const { t } = useSettings();
    const { todos } = useTodoContext();
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;
    const preview = todos.slice(0, 3);
    return (_jsx(motion.div, { "aria-hidden": true, initial: reduce ? false : { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 }, style: { width: '100%' }, children: _jsxs(Paper, { elevation: 0, sx: {
                p: 3,
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 60px -30px rgba(59,130,246,0.5)',
            }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }, children: [_jsx(Typography, { variant: "subtitle1", sx: { fontWeight: 700 }, children: t('dashboard.progressToday') }), _jsx(Chip, { label: `${progress}%`, color: "primary", size: "small", sx: { fontWeight: 700 } })] }), _jsx(LinearProgress, { variant: "determinate", value: progress, sx: { height: 8, borderRadius: 4, mb: 3 } }), _jsx(Stack, { spacing: 1.5, children: preview.length === 0 ? (_jsx(Typography, { variant: "body2", color: "text.secondary", children: t('dashboard.noTasks') })) : (preview.map((todo) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [todo.completed ? (_jsx(CheckCircleIcon, { color: "success", fontSize: "small" })) : (_jsx(RadioButtonUncheckedIcon, { color: "disabled", fontSize: "small" })), _jsx(Typography, { variant: "body2", noWrap: true, sx: {
                                    flex: 1,
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? 'text.disabled' : 'text.primary',
                                }, children: todo.title })] }, todo.id)))) })] }) }));
}
export default function DashboardPage() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { t } = useSettings();
    const firstName = user?.name.split(' ')[0];
    return (_jsxs(PageTransition, { children: [_jsxs(Box, { component: "section", "aria-labelledby": "hero-title", sx: {
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
                    alignItems: 'center',
                    gap: { xs: 5, md: 6 },
                    mb: 8,
                }, children: [_jsxs(Box, { children: [isAuthenticated && firstName && (_jsx(Typography, { variant: "overline", sx: { color: 'primary.main', fontWeight: 700, letterSpacing: 1 }, children: t('dashboard.greeting', { name: firstName }) })), _jsx(Typography, { id: "hero-title", variant: "h3", component: "h1", sx: { fontWeight: 800, mb: 2, mt: 1 }, children: t('dashboard.heroTitle') }), _jsx(Typography, { variant: "h6", color: "text.secondary", sx: { mb: 4, fontWeight: 400 }, children: t('dashboard.heroSubtitle') }), _jsx(Box, { sx: { display: 'flex', gap: 2, flexWrap: 'wrap' }, children: isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "contained", size: "large", onClick: () => navigate('/tasks'), sx: { px: 4, py: 1.5, borderRadius: '8px' }, children: t('dashboard.goToTasks') }), _jsx(Button, { variant: "outlined", size: "large", onClick: () => navigate('/tasks', { state: { openAdd: true } }), sx: { px: 4, py: 1.5, borderRadius: '8px' }, children: t('dashboard.addTask') })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "contained", size: "large", onClick: () => navigate('/login', { state: { from: '/tasks' } }), sx: { px: 4, py: 1.5, borderRadius: '8px' }, children: t('dashboard.login') }), _jsx(Button, { variant: "outlined", size: "large", onClick: () => navigate('/register'), sx: { px: 4, py: 1.5, borderRadius: '8px' }, children: t('dashboard.createAccount') })] })) })] }), _jsx(Box, { sx: { display: { xs: 'none', md: 'block' } }, children: _jsx(HeroPreview, {}) })] }), isAuthenticated && (_jsxs(Box, { component: "section", "aria-labelledby": "stats-heading", children: [_jsx(Typography, { id: "stats-heading", variant: "h5", component: "h2", sx: { fontWeight: 700, mb: 3 }, children: t('dashboard.statsHeading') }), _jsx(StatsGrid, {}), _jsx(RecentTasks, {})] }))] }));
}
