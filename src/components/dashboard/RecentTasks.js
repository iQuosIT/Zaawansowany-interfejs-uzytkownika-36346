import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineItemClasses, } from '@mui/lab';
import { useTodoContext } from '../../context/TodoContext';
import { useSettings } from '../../context/SettingsContext';
export default function RecentTasks() {
    const { todos } = useTodoContext();
    const { t, language } = useSettings();
    const recentTodos = [...todos]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    return (_jsx(Card, { sx: { mt: 4 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, gutterBottom: true, children: t('recent.heading') }), recentTodos.length === 0 ? (_jsx(Typography, { color: "text.secondary", sx: { mt: 2 }, children: t('recent.empty') })) : (_jsx(Timeline, { sx: {
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    }, children: recentTodos.map((todo, index) => (_jsxs(TimelineItem, { children: [_jsxs(TimelineSeparator, { children: [_jsx(TimelineDot, { color: todo.completed ? 'success' : 'primary' }), index < recentTodos.length - 1 && _jsx(TimelineConnector, {})] }), _jsx(TimelineContent, { children: _jsxs(Box, { children: [_jsx(Typography, { variant: "body1", sx: {
                                                textDecoration: todo.completed ? 'line-through' : 'none',
                                                color: todo.completed ? 'text.secondary' : 'text.primary'
                                            }, children: todo.title }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: new Date(todo.createdAt).toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US', {
                                                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                            }) })] }) })] }, todo.id))) }))] }) }));
}
