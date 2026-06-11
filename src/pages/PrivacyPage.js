import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { SettingSection, ToggleRow } from '../components/settings/SettingControls';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import { useFeedback } from '../context/FeedbackContext';
export default function PrivacyPage() {
    const { t, privacy, setPrivacy } = useSettings();
    const { isAuthenticated, user } = useAuth();
    const { todos } = useTodoContext();
    const { notify } = useFeedback();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated)
            navigate('/login', { replace: true, state: { from: '/privacy' } });
    }, [isAuthenticated, navigate]);
    if (!isAuthenticated)
        return null;
    const handleExport = () => {
        const payload = {
            exportedAt: new Date().toISOString(),
            user,
            privacy,
            todos,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'taskflow-data.json';
        link.click();
        URL.revokeObjectURL(url);
        notify(t('privacy.exported'), 'success');
    };
    return (_jsxs(PageTransition, { children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 800, mb: 1 }, children: t('privacy.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 4 }, children: t('privacy.subtitle') }), _jsxs(Stack, { spacing: 3, children: [_jsxs(SettingSection, { title: t('privacy.account'), children: [_jsx(ToggleRow, { label: t('privacy.profilePublic'), description: t('privacy.profilePublicDesc'), checked: privacy.profilePublic, onChange: (v) => setPrivacy('profilePublic', v), divider: true }), _jsx(ToggleRow, { label: t('privacy.activityStatus'), description: t('privacy.activityStatusDesc'), checked: privacy.activityStatus, onChange: (v) => setPrivacy('activityStatus', v) })] }), _jsxs(SettingSection, { title: t('privacy.data'), children: [_jsx(ToggleRow, { label: t('privacy.shareUsage'), description: t('privacy.shareUsageDesc'), checked: privacy.shareUsage, onChange: (v) => setPrivacy('shareUsage', v), divider: true }), _jsx(ToggleRow, { label: t('privacy.searchIndexing'), description: t('privacy.searchIndexingDesc'), checked: privacy.searchIndexing, onChange: (v) => setPrivacy('searchIndexing', v) })] }), _jsx(Button, { variant: "outlined", startIcon: _jsx(DownloadIcon, {}), onClick: handleExport, sx: { alignSelf: 'flex-start', borderRadius: '8px' }, children: t('privacy.export') })] })] }));
}
