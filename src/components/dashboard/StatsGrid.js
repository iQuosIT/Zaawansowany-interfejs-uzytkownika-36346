import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material'; // Zmieniamy import z Grid na Box
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StatsCard from './StatsCard';
import { useTodoContext } from '../../context/TodoContext';
import { useSettings } from '../../context/SettingsContext';
export default function StatsGrid() {
    const { todos } = useTodoContext();
    const { t } = useSettings();
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;
    return (
    // Używamy CSS Grid i clamp() dla odstępów - pełna responsywność bez breakpointów
    _jsxs(Box, { sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            mb: 3
        }, children: [_jsx(StatsCard, { title: t('stats.total'), value: total, icon: FormatListBulletedIcon, color: '#1565C0', bgColor: '#E3F2FD' }), _jsx(StatsCard, { title: t('stats.completed'), value: completed, icon: CheckCircleIcon, color: '#2E7D32', bgColor: '#E8F5E9' }), _jsx(StatsCard, { title: t('stats.pending'), value: pending, icon: RadioButtonUncheckedIcon, color: '#E65100', bgColor: '#FFF3E0' })] }));
}
