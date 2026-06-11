import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Paper, Typography, Stack, ToggleButton, ToggleButtonGroup, Switch, FormControlLabel, Button, Divider, Tooltip, } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckIcon from '@mui/icons-material/Check';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PageTransition from '../components/common/PageTransition';
import { useSettings, accentOptions } from '../context/SettingsContext';
import { useTodoContext } from '../context/TodoContext';
import { useFeedback } from '../context/FeedbackContext';
function Section({ title, children }) {
    return (_jsxs(Paper, { elevation: 0, sx: { p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3 }, children: title }), children] }));
}
export default function SettingsPage() {
    const { t, mode, setMode, accent, setAccent, language, setLanguage, reduceMotion, setReduceMotion, } = useSettings();
    const { refetch } = useTodoContext();
    const { notify } = useFeedback();
    const handleClearData = () => {
        localStorage.removeItem('taskflow.todos');
        refetch();
        notify(t('settings.cleared'), 'info');
    };
    return (_jsxs(PageTransition, { children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 800, mb: 1 }, children: t('settings.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 4 }, children: t('settings.subtitle') }), _jsxs(Stack, { spacing: 3, children: [_jsx(Section, { title: t('settings.appearance'), children: _jsxs(Stack, { spacing: 4, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600, mb: 1.5 }, children: t('settings.theme') }), _jsxs(ToggleButtonGroup, { value: mode, exclusive: true, onChange: (_, v) => v && setMode(v), "aria-label": t('settings.theme'), color: "primary", children: [_jsxs(ToggleButton, { value: "light", "aria-label": t('settings.themeLight'), sx: { gap: 1, px: 3 }, children: [_jsx(LightModeIcon, { fontSize: "small" }), t('settings.themeLight')] }), _jsxs(ToggleButton, { value: "dark", "aria-label": t('settings.themeDark'), sx: { gap: 1, px: 3 }, children: [_jsx(DarkModeIcon, { fontSize: "small" }), t('settings.themeDark')] })] })] }), _jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600, mb: 1.5 }, children: t('settings.accent') }), _jsx(Stack, { direction: "row", spacing: 1.5, children: accentOptions.map((opt) => {
                                                const selected = accent === opt.value;
                                                return (_jsx(Tooltip, { title: opt.label, children: _jsx(Box, { component: "button", type: "button", onClick: () => setAccent(opt.value), "aria-label": opt.label, "aria-pressed": selected, sx: {
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            bgcolor: opt.value,
                                                            border: '2px solid',
                                                            borderColor: selected ? 'text.primary' : 'transparent',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            transition: 'transform 0.15s',
                                                            '&:hover': { transform: 'scale(1.1)' },
                                                        }, children: selected && _jsx(CheckIcon, { fontSize: "small" }) }) }, opt.id));
                                            }) })] })] }) }), _jsx(Section, { title: t('settings.language'), children: _jsxs(ToggleButtonGroup, { value: language, exclusive: true, onChange: (_, v) => v && setLanguage(v), "aria-label": t('settings.language'), color: "primary", children: [_jsxs(ToggleButton, { value: "pl", sx: { px: 3 }, children: ["\uD83C\uDDF5\uD83C\uDDF1 ", t('settings.polish')] }), _jsxs(ToggleButton, { value: "en", sx: { px: 3 }, children: ["\uD83C\uDDEC\uD83C\uDDE7 ", t('settings.english')] })] }) }), _jsx(Section, { title: t('settings.motion'), children: _jsx(FormControlLabel, { control: _jsx(Switch, { checked: reduceMotion, onChange: (e) => setReduceMotion(e.target.checked) }), label: _jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600 }, children: t('settings.reduceMotion') }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('settings.reduceMotionDesc') })] }) }) }), _jsxs(Section, { title: t('settings.data'), children: [_jsx(Typography, { variant: "subtitle2", color: "error", sx: { fontWeight: 700, mb: 1 }, children: t('settings.dangerZone') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: t('settings.clearDataDesc') }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(Button, { variant: "outlined", color: "error", startIcon: _jsx(DeleteSweepIcon, {}), onClick: handleClearData, sx: { borderRadius: '8px' }, children: t('settings.clearData') })] })] })] }));
}
