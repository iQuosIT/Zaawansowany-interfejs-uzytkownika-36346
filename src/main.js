import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import './index.css';
import { createAppTheme } from './theme/muiTheme';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { TodoProvider } from './context/TodoContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { AuthProvider } from './context/AuthContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function ThemedApp({ children }) {
    const { mode, accent } = useSettings();
    const theme = useMemo(() => createAppTheme(mode, accent), [mode, accent]);
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), children] }));
}
async function enableMocking() {
    const { startMockServiceWorker } = await import('./mocks/browser');
    return startMockServiceWorker();
}
enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(SettingsProvider, { children: _jsx(ThemedApp, { children: _jsx(FeedbackProvider, { children: _jsx(HashRouter, { children: _jsx(AuthProvider, { children: _jsx(TodoProvider, { children: _jsx(App, {}) }) }) }) }) }) }) }));
});
