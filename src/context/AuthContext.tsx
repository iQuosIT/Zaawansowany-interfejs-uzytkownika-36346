import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  name: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'taskflow.user';

function toInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'null') return null; // jawne wylogowanie
    if (raw) return JSON.parse(raw) as User;
  } catch {
    /* brak zapisanego użytkownika */
  }
  // Domyślnie aplikacja startuje w stanie zalogowanym (konto demonstracyjne).
  return { name: 'Jan Kowalski', initials: 'JK' };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser);

  const login = useCallback((name: string) => {
    const newUser: User = { name, initials: toInitials(name) || 'U' };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.setItem(STORAGE_KEY, 'null');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
  return ctx;
}
