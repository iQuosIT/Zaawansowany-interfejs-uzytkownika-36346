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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader handleDrawerToggle={handleDrawerToggle} />

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, bgcolor: 'background.paper' },
        }}
      >
        <nav aria-label={t('nav.mobileAria')}>
          <List sx={{ pt: 2 }}>
            {baseNav.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                onClick={handleDrawerToggle}
                sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            {isAuthenticated ? (
              <>
                <ListItemButton
                  component={NavLink}
                  to="/profile"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.myProfile')} />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/settings"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.settings')} />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/privacy"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.privacy')} />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/notifications"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.notifications')} />
                </ListItemButton>
                <ListItemButton onClick={handleMobileLogout}>
                  <ListItemText primary={t('nav.logout')} sx={{ color: 'error.main' }} />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  component={NavLink}
                  to="/login"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.login')} />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/register"
                  onClick={handleDrawerToggle}
                  sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
                >
                  <ListItemText primary={t('nav.register')} sx={{ color: 'primary.main' }} />
                </ListItemButton>
              </>
            )}
          </List>
        </nav>
      </Drawer>

      <Box component="main" id="main-content" tabIndex={-1} sx={{ flexGrow: 1, py: { xs: 4, md: 8 }, outline: 'none' }}>
        <Container maxWidth="lg">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 4, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Typography>
          <nav aria-label={t('footer.aria')}>
            <Typography variant="body2" color="text.secondary">
              {t('footer.legal')}
            </Typography>
          </nav>
        </Container>
      </Box>
    </Box>
  );
}
