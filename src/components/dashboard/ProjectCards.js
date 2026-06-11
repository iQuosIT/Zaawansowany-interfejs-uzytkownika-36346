import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
const projects = [
    {
        titleKey: 'projects.p1.title',
        descKey: 'projects.p1.desc',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500',
    },
    {
        titleKey: 'projects.p2.title',
        descKey: 'projects.p2.desc',
        img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500',
    },
    {
        titleKey: 'projects.p3.title',
        descKey: 'projects.p3.desc',
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500',
    },
];
export default function ProjectCards() {
    const { t } = useSettings();
    return (_jsx(Box, { sx: {
            display: 'grid',
            // LAB 6: Automatyczne dopasowanie kolumn bez Media Queries [cite: 112-113, 128]
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            // LAB 6: Płynny odstęp (Fluid Gap) [cite: 114, 128]
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            mb: 6
        }, children: projects.map((project, index) => (_jsxs(Card, { sx: {
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
            }, children: [_jsx(CardMedia, { component: "img", image: project.img, alt: t(project.titleKey), sx: {
                        // LAB 6: Nowoczesne zachowanie proporcji obrazu [cite: 119-122]
                        aspectRatio: '16/9',
                        objectFit: 'cover'
                    } }), _jsxs(CardContent, { sx: { flexGrow: 1, p: 3 }, children: [_jsx(Typography, { variant: "h6", fontWeight: "700", sx: { mb: 1 }, children: t(project.titleKey) }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: t(project.descKey) }), _jsx(Button, { type: "button", variant: "contained", fullWidth: true, onClick: (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }, sx: {
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: '600',
                            }, children: t('projects.openTasks') })] })] }, index))) }));
}
