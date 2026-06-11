import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Paper, Typography, TextField, Button, CircularProgress, Link as MuiLink, Stack,
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { loginSchema, LoginData } from '../components/auth/schemas';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../context/FeedbackContext';
import { useSettings } from '../context/SettingsContext';

// Tworzy czytelną nazwę wyświetlaną z części adresu e-mail (np. "jan.kowalski" -> "Jan Kowalski").
function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? '';
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length === 0) return 'Użytkownik';
  return parts.map((p) => p[0].toUpperCase() + p.slice(1)).join(' ');
}

export default function LoginPage() {
  const { login } = useAuth();
  const { notify } = useFeedback();
  const { t } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginData) => {
    // Symulacja żądania logowania (mock — bez prawdziwego backendu).
    await new Promise((resolve) => setTimeout(resolve, 900));
    login(nameFromEmail(data.email));
    notify(t('login.success'), 'success');
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/tasks';
    navigate(redirectTo, { replace: true });
  };

  return (
    <PageTransition>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 2, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 440,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
            {t('login.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {t('login.subtitle')}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <TextField
                label={t('login.email')}
                type="email"
                fullWidth
                required
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                FormHelperTextProps={{ role: errors.email ? 'alert' : undefined }}
                {...register('email')}
              />
              <TextField
                label={t('login.password')}
                type="password"
                fullWidth
                required
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                FormHelperTextProps={{ role: errors.password ? 'alert' : undefined }}
                {...register('password')}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                sx={{ py: 1.4, borderRadius: '8px' }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    {t('login.loading')}
                  </Box>
                ) : (
                  t('login.submit')
                )}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
            {t('login.noAccount')}{' '}
            <MuiLink component={RouterLink} to="/register" sx={{ fontWeight: 600 }}>
              {t('nav.register')}
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </PageTransition>
  );
}
