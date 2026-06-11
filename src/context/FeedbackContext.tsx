import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface FeedbackContextType {
  notify: (message: string, severity?: AlertColor) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

interface SnackState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [snack, setSnack] = useState<SnackState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const notify = useCallback((message: string, severity: AlertColor = 'success') => {
    setSnack({ open: true, message, severity });
  }, []);

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <FeedbackContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useFeedback musi być użyty wewnątrz FeedbackProvider');
  return ctx;
}
