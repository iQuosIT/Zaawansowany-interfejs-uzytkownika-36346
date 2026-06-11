import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Paper, Typography, Switch, FormControlLabel, Box, Divider } from '@mui/material';
export function SettingSection({ title, children }) {
    return (_jsxs(Paper, { elevation: 0, sx: { p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3 }, children: title }), children] }));
}
export function ToggleRow({ label, description, checked, onChange, divider }) {
    return (_jsxs(_Fragment, { children: [_jsx(FormControlLabel, { sx: { width: '100%', m: 0, alignItems: 'flex-start', justifyContent: 'space-between' }, labelPlacement: "start", control: _jsx(Switch, { checked: checked, onChange: (e) => onChange(e.target.checked) }), label: _jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600 }, children: label }), description && (_jsx(Typography, { variant: "body2", color: "text.secondary", children: description }))] }) }), divider && _jsx(Divider, { sx: { my: 2 } })] }));
}
