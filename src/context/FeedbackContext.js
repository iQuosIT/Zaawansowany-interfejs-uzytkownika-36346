import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
const FeedbackContext = createContext(undefined);
export function FeedbackProvider({ children }) {
    const [snack, setSnack] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const notify = useCallback((message, severity = 'success') => {
        setSnack({ open: true, message, severity });
    }, []);
    const handleClose = (_, reason) => {
        if (reason === 'clickaway')
            return;
        setSnack((prev) => ({ ...prev, open: false }));
    };
    return (_jsxs(FeedbackContext.Provider, { value: { notify }, children: [children, _jsx(Snackbar, { open: snack.open, autoHideDuration: 4000, onClose: handleClose, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleClose, severity: snack.severity, variant: "filled", sx: { width: '100%' }, children: snack.message }) })] }));
}
export function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx)
        throw new Error('useFeedback musi być użyty wewnątrz FeedbackProvider');
    return ctx;
}
