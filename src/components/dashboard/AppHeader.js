import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useSettings } from '../../context/SettingsContext';
export default function AppHeader({ handleDrawerToggle }) {
    const { user, isAuthenticated, logout } = useAuth();
    const { notify } = useFeedback();
    const { t, mode, toggleMode } = useSettings();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const navLinks = [
        { label: t('nav.dashboard'), to: '/' },
        { label: t('nav.tasks'), to: '/tasks' },
        { label: t('nav.projects'), to: '/projects' },
    ];
    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        notify(t('auth.logoutSuccess'), 'info');
        navigate('/');
    };
    const go = (to) => {
        setAnchorEl(null);
        navigate(to);
    };
    return (_jsx(AppBar, { position: "sticky", sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
        }, children: _jsxs(Toolbar, { sx: { justifyContent: 'space-between', py: 1, position: 'relative' }, children: [_jsx(Box, { sx: { display: 'flex', alignItems: 'center' }, children: _jsxs(Typography, { component: NavLink, to: "/", variant: "h6", sx: { fontWeight: 800, color: 'primary.main', lineHeight: 1.2, textDecoration: 'none' }, children: [t('app.name'), _jsx("br", {}), _jsx(Typography, { component: "span", sx: { fontSize: '0.75rem', color: 'text.primary', fontWeight: 600 }, children: t('app.subtitle') })] }) }), _jsx(Box, { component: "nav", "aria-label": t('nav.mainAria'), sx: {
                        display: { xs: 'none', md: 'flex' },
                        gap: 1,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }, children: navLinks.map((link) => (_jsx(Button, { component: NavLink, to: link.to, end: link.to === '/', color: "inherit", sx: { fontWeight: 600, opacity: 0.7, '&.active': { opacity: 1, color: 'primary.main' } }, children: link.label }, link.to))) }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Tooltip, { title: mode === 'dark' ? t('settings.themeLight') : t('settings.themeDark'), children: _jsx(IconButton, { color: "inherit", onClick: toggleMode, "aria-label": t('settings.theme'), children: mode === 'dark' ? _jsx(LightModeIcon, {}) : _jsx(DarkModeIcon, {}) }) }), isAuthenticated ? (_jsxs(_Fragment, { children: [_jsxs(Button, { id: "user-menu-button", onClick: (e) => setAnchorEl(e.currentTarget), "aria-controls": menuOpen ? 'user-menu' : undefined, "aria-haspopup": "true", "aria-expanded": menuOpen ? 'true' : undefined, color: "inherit", sx: { textTransform: 'none', gap: 1.5, borderRadius: '999px', pl: 1, pr: { xs: 1, sm: 2 } }, children: [_jsx(Avatar, { sx: { width: 36, height: 36, bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }, children: user?.initials }), _jsx(Typography, { variant: "body2", sx: { display: { xs: 'none', sm: 'block' }, fontWeight: 600 }, children: user?.name })] }), _jsxs(Menu, { id: "user-menu", anchorEl: anchorEl, open: menuOpen, onClose: () => setAnchorEl(null), MenuListProps: { 'aria-labelledby': 'user-menu-button' }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, children: [_jsxs(MenuItem, { onClick: () => go('/profile'), children: [_jsx(ListItemIcon, { children: _jsx(PersonOutlineIcon, { fontSize: "small" }) }), t('nav.myProfile')] }), _jsxs(MenuItem, { onClick: () => go('/tasks'), children: [_jsx(ListItemIcon, { children: _jsx(TaskAltIcon, { fontSize: "small" }) }), t('nav.myTasks')] }), _jsxs(MenuItem, { onClick: () => go('/settings'), children: [_jsx(ListItemIcon, { children: _jsx(SettingsIcon, { fontSize: "small" }) }), t('nav.settings')] }), _jsxs(MenuItem, { onClick: () => go('/privacy'), children: [_jsx(ListItemIcon, { children: _jsx(LockOutlinedIcon, { fontSize: "small" }) }), t('nav.privacy')] }), _jsxs(MenuItem, { onClick: () => go('/notifications'), children: [_jsx(ListItemIcon, { children: _jsx(NotificationsNoneIcon, { fontSize: "small" }) }), t('nav.notifications')] }), _jsx(Divider, {}), _jsxs(MenuItem, { onClick: handleLogout, children: [_jsx(ListItemIcon, { children: _jsx(LogoutIcon, { fontSize: "small" }) }), t('nav.logout')] })] })] })) : (_jsxs(Box, { sx: { display: { xs: 'none', sm: 'flex' }, gap: 1 }, children: [_jsx(Button, { component: NavLink, to: "/login", variant: "outlined", size: "small", sx: { borderRadius: '8px' }, children: t('nav.login') }), _jsx(Button, { component: NavLink, to: "/register", variant: "contained", size: "small", sx: { borderRadius: '8px' }, children: t('nav.register') })] })), _jsx(IconButton, { color: "inherit", "aria-label": t('nav.mobileAria'), edge: "end", onClick: handleDrawerToggle, sx: { display: { md: 'none' } }, children: _jsx(MenuIcon, {}) })] })] }) }));
}
