import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar,
  Menu, MenuItem, ListItemIcon, Divider, Tooltip,
} from '@mui/material';
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

interface AppHeaderProps {
  handleDrawerToggle: () => void;
}

export default function AppHeader({ handleDrawerToggle }: AppHeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { notify } = useFeedback();
  const { t, mode, toggleMode } = useSettings();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const go = (to: string) => {
    setAnchorEl(null);
    navigate(to);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2, textDecoration: 'none' }}
          >
            {t('app.name')}
            <br />
            <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 600 }}>
              {t('app.subtitle')}
            </Typography>
          </Typography>
        </Box>

        <Box
          component="nav"
          aria-label={t('nav.mainAria')}
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === '/'}
              color="inherit"
              sx={{ fontWeight: 600, opacity: 0.7, '&.active': { opacity: 1, color: 'primary.main' } }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title={mode === 'dark' ? t('settings.themeLight') : t('settings.themeDark')}>
            <IconButton color="inherit" onClick={toggleMode} aria-label={t('settings.theme')}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <>
              <Button
                id="user-menu-button"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-controls={menuOpen ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                color="inherit"
                sx={{ textTransform: 'none', gap: 1.5, borderRadius: '999px', pl: 1, pr: { xs: 1, sm: 2 } }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  {user?.initials}
                </Avatar>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}>
                  {user?.name}
                </Typography>
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ 'aria-labelledby': 'user-menu-button' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => go('/profile')}>
                  <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
                  {t('nav.myProfile')}
                </MenuItem>
                <MenuItem onClick={() => go('/tasks')}>
                  <ListItemIcon><TaskAltIcon fontSize="small" /></ListItemIcon>
                  {t('nav.myTasks')}
                </MenuItem>
                <MenuItem onClick={() => go('/settings')}>
                  <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                  {t('nav.settings')}
                </MenuItem>
                <MenuItem onClick={() => go('/privacy')}>
                  <ListItemIcon><LockOutlinedIcon fontSize="small" /></ListItemIcon>
                  {t('nav.privacy')}
                </MenuItem>
                <MenuItem onClick={() => go('/notifications')}>
                  <ListItemIcon><NotificationsNoneIcon fontSize="small" /></ListItemIcon>
                  {t('nav.notifications')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                  {t('nav.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button component={NavLink} to="/login" variant="outlined" size="small" sx={{ borderRadius: '8px' }}>
                {t('nav.login')}
              </Button>
              <Button component={NavLink} to="/register" variant="contained" size="small" sx={{ borderRadius: '8px' }}>
                {t('nav.register')}
              </Button>
            </Box>
          )}

          <IconButton
            color="inherit"
            aria-label={t('nav.mobileAria')}
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
