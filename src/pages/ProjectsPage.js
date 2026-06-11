import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import PageTransition from '../components/common/PageTransition';
import ProjectCards from '../components/dashboard/ProjectCards';
import { useSettings } from '../context/SettingsContext';
export default function ProjectsPage() {
    const { t } = useSettings();
    return (_jsxs(PageTransition, { children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 800, mb: 1 }, children: t('projects.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 4 }, children: t('projects.subtitle') }), _jsx(ProjectCards, {})] }));
}
