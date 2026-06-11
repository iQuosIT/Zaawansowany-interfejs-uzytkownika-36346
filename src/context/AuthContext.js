import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
const AuthContext = createContext(undefined);
const STORAGE_KEY = 'taskflow.user';
function toInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}
function readUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === 'null')
            return null; // jawne wylogowanie
        if (raw)
            return JSON.parse(raw);
    }
    catch {
        /* brak zapisanego użytkownika */
    }
    // Domyślnie aplikacja startuje w stanie zalogowanym (konto demonstracyjne).
    return { name: 'Jan Kowalski', initials: 'JK' };
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(readUser);
    const login = useCallback((name) => {
        const newUser = { name, initials: toInitials(name) || 'U' };
        setUser(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    }, []);
    const logout = useCallback(() => {
        setUser(null);
        localStorage.setItem(STORAGE_KEY, 'null');
    }, []);
    return (_jsx(AuthContext.Provider, { value: { user, isAuthenticated: user !== null, login, logout }, children: children }));
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
    return ctx;
}
