import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { useSettings } from '../context/SettingsContext';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useSettings();
  return (
    <PageTransition>
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          {t('notFound.subtitle')}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          {t('notFound.back')}
        </Button>
      </Box>
    </PageTransition>
  );
}
