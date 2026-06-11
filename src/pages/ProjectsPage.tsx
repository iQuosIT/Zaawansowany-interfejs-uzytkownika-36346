import { Typography } from '@mui/material';
import PageTransition from '../components/common/PageTransition';
import ProjectCards from '../components/dashboard/ProjectCards';
import { useSettings } from '../context/SettingsContext';

export default function ProjectsPage() {
  const { t } = useSettings();
  return (
    <PageTransition>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
        {t('projects.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('projects.subtitle')}
      </Typography>
      <ProjectCards />
    </PageTransition>
  );
}
