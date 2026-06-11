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

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 60px -30px rgba(59,130,246,0.5)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {t('dashboard.progressToday')}
          </Typography>
          <Chip label={`${progress}%`} color="primary" size="small" sx={{ fontWeight: 700 }} />
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4, mb: 3 }}
        />

        <Stack spacing={1.5}>
          {preview.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.noTasks')}
            </Typography>
          ) : (
            preview.map((todo) => (
              <Box key={todo.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {todo.completed ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                  }}
                >
                  {todo.title}
                </Typography>
              </Box>
            ))
          )}
        </Stack>
      </Paper>
    </motion.div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useSettings();
  const firstName = user?.name.split(' ')[0];

  return (
    <PageTransition>
      <Box
        component="section"
        aria-labelledby="hero-title"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
          alignItems: 'center',
          gap: { xs: 5, md: 6 },
          mb: 8,
        }}
      >
        <Box>
          {isAuthenticated && firstName && (
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}>
              {t('dashboard.greeting', { name: firstName })}
            </Typography>
          )}
          <Typography id="hero-title" variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, mt: 1 }}>
            {t('dashboard.heroTitle')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
            {t('dashboard.heroSubtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/tasks')}
                  sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
                >
                  {t('dashboard.goToTasks')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/tasks', { state: { openAdd: true } })}
                  sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
                >
                  {t('dashboard.addTask')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login', { state: { from: '/tasks' } })}
                  sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
                >
                  {t('dashboard.login')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
                >
                  {t('dashboard.createAccount')}
                </Button>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <HeroPreview />
        </Box>
      </Box>

      {isAuthenticated && (
        <Box component="section" aria-labelledby="stats-heading">
          <Typography id="stats-heading" variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            {t('dashboard.statsHeading')}
          </Typography>
          <StatsGrid />
          <RecentTasks />
        </Box>
      )}
    </PageTransition>
  );
}
