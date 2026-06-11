import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Paper, Typography, TextField, Button, CircularProgress, Link as MuiLink, Stack, } from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { loginSchema } from '../components/auth/schemas';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../context/FeedbackContext';
import { useSettings } from '../context/SettingsContext';
// Tworzy czytelną nazwę wyświetlaną z części adresu e-mail (np. "jan.kowalski" -> "Jan Kowalski").
function nameFromEmail(email) {
    const local = email.split('@')[0] ?? '';
    const parts = local.split(/[._-]+/).filter(Boolean);
    if (parts.length === 0)
        return 'Użytkownik';
    return parts.map((p) => p[0].toUpperCase() + p.slice(1)).join(' ');
}
export default function LoginPage() {
    const { login } = useAuth();
    const { notify } = useFeedback();
    const { t } = useSettings();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        defaultValues: { email: '', password: '' },
    });
    const onSubmit = async (data) => {
        // Symulacja żądania logowania (mock — bez prawdziwego backendu).
        await new Promise((resolve) => setTimeout(resolve, 900));
        login(nameFromEmail(data.email));
        notify(t('login.success'), 'success');
        const redirectTo = location.state?.from ?? '/tasks';
        navigate(redirectTo, { replace: true });
    };
    return (_jsx(PageTransition, { children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: { xs: 2, md: 6 } }, children: _jsxs(Paper, { elevation: 0, sx: {
                    width: '100%',
                    maxWidth: 440,
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.08)',
                }, children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 800, mb: 1 }, children: t('login.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 4 }, children: t('login.subtitle') }), _jsx("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, children: _jsxs(Stack, { spacing: 3, children: [_jsx(TextField, { label: t('login.email'), type: "email", fullWidth: true, required: true, autoComplete: "email", error: !!errors.email, helperText: errors.email?.message, FormHelperTextProps: { role: errors.email ? 'alert' : undefined }, ...register('email') }), _jsx(TextField, { label: t('login.password'), type: "password", fullWidth: true, required: true, autoComplete: "current-password", error: !!errors.password, helperText: errors.password?.message, FormHelperTextProps: { role: errors.password ? 'alert' : undefined }, ...register('password') }), _jsx(Button, { type: "submit", variant: "contained", size: "large", disabled: isSubmitting, "aria-busy": isSubmitting, sx: { py: 1.4, borderRadius: '8px' }, children: isSubmitting ? (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(CircularProgress, { size: 20, color: "inherit" }), t('login.loading')] })) : (t('login.submit')) })] }) }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 4, textAlign: 'center' }, children: [t('login.noAccount'), ' ', _jsx(MuiLink, { component: RouterLink, to: "/register", sx: { fontWeight: 600 }, children: t('nav.register') })] })] }) }) }));
}
