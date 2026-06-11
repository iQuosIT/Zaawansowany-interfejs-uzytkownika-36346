import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { useSettings } from '../context/SettingsContext';
export default function NotFoundPage() {
    const navigate = useNavigate();
    const { t } = useSettings();
    return (_jsx(PageTransition, { children: _jsxs(Box, { sx: { textAlign: 'center', py: 10 }, children: [_jsx(Typography, { variant: "h2", component: "h1", sx: { fontWeight: 800, color: 'primary.main' }, children: "404" }), _jsx(Typography, { variant: "h6", color: "text.secondary", sx: { mt: 1, mb: 4 }, children: t('notFound.subtitle') }), _jsx(Button, { variant: "contained", onClick: () => navigate('/'), children: t('notFound.back') })] }) }));
}
