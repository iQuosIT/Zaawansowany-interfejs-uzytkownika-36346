import { useTranslation } from '../../context/SettingsContext';

export default function SkipLink() {
  const t = useTranslation();
  return (
    <a href="#main-content" className="skip-link">
      {t('common.skipLink')}
    </a>
  );
}
