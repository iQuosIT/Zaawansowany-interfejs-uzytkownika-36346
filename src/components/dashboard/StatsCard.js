import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
export default function StatsCard({ title, value, icon: Icon, color, bgColor }) {
    return (_jsx(Card, { sx: { height: '100%' }, children: _jsx(CardContent, { children: _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', gutterBottom: true, children: title }), _jsx(Typography, { variant: 'h4', fontWeight: 700, children: value })] }), _jsx(Avatar, { sx: {
                            bgcolor: bgColor,
                            color,
                            width: 48,
                            // Ustawienie wysokości na auto pozwala właściwości aspect-ratio
                            // na poprawne zdefiniowanie proporcji elementu.
                            height: 'auto',
                            aspectRatio: '1 / 1',
                            // objectFit zapewnia, że zawartość nie zostanie zniekształcona
                            objectFit: 'cover'
                        }, children: _jsx(Icon, {}) })] }) }) }));
}
