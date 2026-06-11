import React, { useMemo, ReactNode } from 'react';
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

function ThemedApp({ children }: { children: ReactNode }) {
  const { mode, accent } = useSettings();
  const theme = useMemo(() => createAppTheme(mode, accent), [mode, accent]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

async function enableMocking() {
  const { startMockServiceWorker } = await import('./mocks/browser');
  return startMockServiceWorker();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SettingsProvider>
        <ThemedApp>
          <FeedbackProvider>
            <HashRouter>
              <AuthProvider>
                <TodoProvider>
                  <App />
                </TodoProvider>
              </AuthProvider>
            </HashRouter>
          </FeedbackProvider>
        </ThemedApp>
      </SettingsProvider>
    </React.StrictMode>
  );
});
