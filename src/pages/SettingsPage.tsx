import {
  Box, Paper, Typography, Stack, ToggleButton, ToggleButtonGroup, Switch,
  FormControlLabel, Button, Divider, Tooltip,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckIcon from '@mui/icons-material/Check';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PageTransition from '../components/common/PageTransition';
import { useSettings, accentOptions, ThemeMode } from '../context/SettingsContext';
import { Language } from '../i18n/translations';
import { useTodoContext } from '../context/TodoContext';
import { useFeedback } from '../context/FeedbackContext';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default function SettingsPage() {
  const {
    t, mode, setMode, accent, setAccent, language, setLanguage, reduceMotion, setReduceMotion,
  } = useSettings();
  const { refetch } = useTodoContext();
  const { notify } = useFeedback();

  const handleClearData = () => {
    localStorage.removeItem('taskflow.todos');
    refetch();
    notify(t('settings.cleared'), 'info');
  };

  return (
    <PageTransition>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
        {t('settings.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('settings.subtitle')}
      </Typography>

      <Stack spacing={3}>
        <Section title={t('settings.appearance')}>
          <Stack spacing={4}>
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1.5 }}>{t('settings.theme')}</Typography>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, v: ThemeMode | null) => v && setMode(v)}
                aria-label={t('settings.theme')}
                color="primary"
              >
                <ToggleButton value="light" aria-label={t('settings.themeLight')} sx={{ gap: 1, px: 3 }}>
                  <LightModeIcon fontSize="small" />
                  {t('settings.themeLight')}
                </ToggleButton>
                <ToggleButton value="dark" aria-label={t('settings.themeDark')} sx={{ gap: 1, px: 3 }}>
                  <DarkModeIcon fontSize="small" />
                  {t('settings.themeDark')}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1.5 }}>{t('settings.accent')}</Typography>
              <Stack direction="row" spacing={1.5}>
                {accentOptions.map((opt) => {
                  const selected = accent === opt.value;
                  return (
                    <Tooltip key={opt.id} title={opt.label}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => setAccent(opt.value)}
                        aria-label={opt.label}
                        aria-pressed={selected}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: opt.value,
                          border: '2px solid',
                          borderColor: selected ? 'text.primary' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          transition: 'transform 0.15s',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        {selected && <CheckIcon fontSize="small" />}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Section>

        <Section title={t('settings.language')}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(_, v: Language | null) => v && setLanguage(v)}
            aria-label={t('settings.language')}
            color="primary"
          >
            <ToggleButton value="pl" sx={{ px: 3 }}>🇵🇱 {t('settings.polish')}</ToggleButton>
            <ToggleButton value="en" sx={{ px: 3 }}>🇬🇧 {t('settings.english')}</ToggleButton>
          </ToggleButtonGroup>
        </Section>

        <Section title={t('settings.motion')}>
          <FormControlLabel
            control={<Switch checked={reduceMotion} onChange={(e) => setReduceMotion(e.target.checked)} />}
            label={
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{t('settings.reduceMotion')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('settings.reduceMotionDesc')}
                </Typography>
              </Box>
            }
          />
        </Section>

        <Section title={t('settings.data')}>
          <Typography variant="subtitle2" color="error" sx={{ fontWeight: 700, mb: 1 }}>
            {t('settings.dangerZone')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('settings.clearDataDesc')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={handleClearData}
            sx={{ borderRadius: '8px' }}
          >
            {t('settings.clearData')}
          </Button>
        </Section>
      </Stack>
    </PageTransition>
  );
}
