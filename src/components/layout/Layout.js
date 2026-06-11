import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Container, Drawer, List, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppHeader from '../dashboard/AppHeader';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useSettings } from '../../context/SettingsContext';
export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { notify } = useFeedback();
    const { t } = useSettings();
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
    const handleMobileLogout = () => {
        setMobileOpen(false);
        logout();
        notify(t('auth.logoutSuccess'), 'info');
        navigate('/');
    };
    const baseNav = [
        { label: t('nav.dashboard'), to: '/' },
        { label: t('nav.tasks'), to: '/tasks' },
        { label: t('nav.projects'), to: '/projects' },
    ];
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }, children: [_jsx(AppHeader, { handleDrawerToggle: handleDrawerToggle }), _jsx(Drawer, { variant: "temporary", anchor: "right", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: { keepMounted: true }, sx: {
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, bgcolor: 'background.paper' },
                }, children: _jsx("nav", { "aria-label": t('nav.mobileAria'), children: _jsxs(List, { sx: { pt: 2 }, children: [baseNav.map((item) => (_jsx(ListItemButton, { component: NavLink, to: item.to, end: item.to === '/', onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: item.label }) }, item.to))), _jsx(Divider, { sx: { my: 1 } }), isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(ListItemButton, { component: NavLink, to: "/profile", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.myProfile') }) }), _jsx(ListItemButton, { component: NavLink, to: "/settings", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.settings') }) }), _jsx(ListItemButton, { component: NavLink, to: "/privacy", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.privacy') }) }), _jsx(ListItemButton, { component: NavLink, to: "/notifications", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.notifications') }) }), _jsx(ListItemButton, { onClick: handleMobileLogout, children: _jsx(ListItemText, { primary: t('nav.logout'), sx: { color: 'error.main' } }) })] })) : (_jsxs(_Fragment, { children: [_jsx(ListItemButton, { component: NavLink, to: "/login", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.login') }) }), _jsx(ListItemButton, { component: NavLink, to: "/register", onClick: handleDrawerToggle, sx: { '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }, children: _jsx(ListItemText, { primary: t('nav.register'), sx: { color: 'primary.main' } }) })] }))] }) }) }), _jsx(Box, { component: "main", id: "main-content", tabIndex: -1, sx: { flexGrow: 1, py: { xs: 4, md: 8 }, outline: 'none' }, children: _jsx(Container, { maxWidth: "lg", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(Outlet, {}, location.pathname) }) }) }), _jsx(Box, { component: "footer", sx: { py: 4, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }, children: _jsxs(Container, { maxWidth: "lg", sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: t('footer.copyright', { year: new Date().getFullYear() }) }), _jsx("nav", { "aria-label": t('footer.aria'), children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('footer.legal') }) })] }) })] }));
}
