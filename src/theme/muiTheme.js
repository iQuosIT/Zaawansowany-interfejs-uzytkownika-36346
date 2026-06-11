import { createTheme } from '@mui/material/styles';
const darkPalette = {
    background: { default: '#161622', paper: '#1F1F2E' },
    text: { primary: '#FFFFFF', secondary: '#9CA3AF' },
    divider: 'rgba(255,255,255,0.10)',
};
const lightPalette = {
    background: { default: '#F4F6F8', paper: '#FFFFFF' },
    text: { primary: '#15192B', secondary: '#566072' },
    divider: 'rgba(0,0,0,0.12)',
};
export function createAppTheme(mode = 'dark', accent = '#3B82F6') {
    const palette = mode === 'dark' ? darkPalette : lightPalette;
    return createTheme({
        palette: {
            mode,
            primary: {
                main: accent,
                contrastText: '#FFFFFF',
            },
            background: palette.background,
            text: palette.text,
            divider: palette.divider,
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h3: { fontWeight: 800, fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.2 },
            h4: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: 'clamp(1.5rem, 4vw, 2.125rem)' },
            h5: { fontWeight: 600, fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' },
            h6: { fontWeight: 600, fontSize: 'clamp(1.125rem, 2vw, 1.25rem)' },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: { borderRadius: 16 },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        borderRadius: 16,
                    },
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: { borderRadius: 8, paddingLeft: 20, paddingRight: 20 },
                },
            },
        },
    });
}
export default createAppTheme();
