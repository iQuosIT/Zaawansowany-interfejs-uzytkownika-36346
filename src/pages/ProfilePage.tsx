import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box, Paper, Typography, TextField, Button, Avatar, Stack, Divider,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { useAuth } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import { useSettings } from '../context/SettingsContext';
import { useFeedback } from '../context/FeedbackContext';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Nazwa musi mieć co najmniej 2 znaki').max(40, 'Maksymalnie 40 znaków'),
});
type ProfileData = z.infer<typeof profileSchema>;

const MEMBER_KEY = 'taskflow.memberSince';

function getMemberSince(): string {
  let raw = localStorage.getItem(MEMBER_KEY);
  if (!raw) {
    raw = new Date().toISOString();
    localStorage.setItem(MEMBER_KEY, raw);
  }
  return raw;
}

export default function ProfilePage() {
  const { user, isAuthenticated, login } = useAuth();
  const { todos } = useTodoContext();
  const { t, language } = useSettings();
  const { notify } = useFeedback();
  const navigate = useNavigate();

  const [memberSince] = useState(getMemberSince);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true, state: { from: '/profile' } });
  }, [isAuthenticated, navigate]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, rate };
  }, [todos]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    values: { displayName: user?.name ?? '' },
  });

  if (!isAuthenticated || !user) return null;

  const onSubmit = (data: ProfileData) => {
    login(data.displayName.trim());
    notify(t('profile.nameUpdated'), 'success');
  };

  const memberDate = new Date(memberSince).toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageTransition>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
        {t('profile.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('profile.subtitle')}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
              {user.initials}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('profile.memberSince')}: {memberDate}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <TextField
                label={t('profile.displayName')}
                fullWidth
                required
                error={!!errors.displayName}
                helperText={errors.displayName?.message}
                FormHelperTextProps={{ role: errors.displayName ? 'alert' : undefined }}
                {...register('displayName')}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !isDirty}
                sx={{ alignSelf: 'flex-start', borderRadius: '8px' }}
              >
                {t('profile.save')}
              </Button>
            </Stack>
          </form>
        </Paper>

        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            {t('profile.statsHeading')}
          </Typography>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">{t('profile.totalTasks')}</Typography>
              <Typography sx={{ fontWeight: 700 }}>{stats.total}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">{t('profile.completedTasks')}</Typography>
              <Typography sx={{ fontWeight: 700 }}>{stats.completed}</Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">{t('profile.completionRate')}</Typography>
                <Typography sx={{ fontWeight: 700 }}>{stats.rate}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={stats.rate} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </PageTransition>
  );
}
