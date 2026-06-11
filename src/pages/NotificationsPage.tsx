import { useEffect } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { SettingSection, ToggleRow } from '../components/settings/SettingControls';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../context/FeedbackContext';

export default function NotificationsPage() {
  const { t, notifications, setNotification } = useSettings();
  const { isAuthenticated } = useAuth();
  const { notify } = useFeedback();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true, state: { from: '/notifications' } });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <PageTransition>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
        {t('notif.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('notif.subtitle')}
      </Typography>

      <Stack spacing={3}>
        <SettingSection title={t('notif.channels')}>
          <ToggleRow
            label={t('notif.email')}
            description={t('notif.emailDesc')}
            checked={notifications.email}
            onChange={(v) => setNotification('email', v)}
            divider
          />
          <ToggleRow
            label={t('notif.push')}
            description={t('notif.pushDesc')}
            checked={notifications.push}
            onChange={(v) => setNotification('push', v)}
          />
        </SettingSection>

        <SettingSection title={t('notif.types')}>
          <ToggleRow
            label={t('notif.reminders')}
            description={t('notif.remindersDesc')}
            checked={notifications.reminders}
            onChange={(v) => setNotification('reminders', v)}
            divider
          />
          <ToggleRow
            label={t('notif.weekly')}
            description={t('notif.weeklyDesc')}
            checked={notifications.weeklySummary}
            onChange={(v) => setNotification('weeklySummary', v)}
          />
        </SettingSection>

        <Button
          variant="outlined"
          startIcon={<SendIcon />}
          onClick={() => notify(t('notif.testSent'), 'info')}
          disabled={!notifications.email && !notifications.push}
          sx={{ alignSelf: 'flex-start', borderRadius: '8px' }}
        >
          {t('notif.test')}
        </Button>
      </Stack>
    </PageTransition>
  );
}
