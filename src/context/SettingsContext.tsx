import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export type ThemeMode = 'light' | 'dark';

export interface AccentOption {
  id: string;
  label: string;
  value: string;
}

export const accentOptions: AccentOption[] = [
  { id: 'blue', label: 'Niebieski', value: '#3B82F6' },
  { id: 'violet', label: 'Fioletowy', value: '#8B5CF6' },
  { id: 'emerald', label: 'Zielony', value: '#10B981' },
  { id: 'rose', label: 'Różowy', value: '#F43F5E' },
  { id: 'amber', label: 'Pomarańczowy', value: '#F59E0B' },
];

export type NotificationKey = 'email' | 'push' | 'reminders' | 'weeklySummary';
export type PrivacyKey = 'profilePublic' | 'shareUsage' | 'activityStatus' | 'searchIndexing';

interface Settings {
  mode: ThemeMode;
  accent: string;
  language: Language;
  reduceMotion: boolean;
  notifications: Record<NotificationKey, boolean>;
  privacy: Record<PrivacyKey, boolean>;
}

interface SettingsContextType extends Settings {
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: string) => void;
  setLanguage: (language: Language) => void;
  setReduceMotion: (value: boolean) => void;
  setNotification: (key: NotificationKey, value: boolean) => void;
  setPrivacy: (key: PrivacyKey, value: boolean) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'taskflow.settings';

const defaultSettings: Settings = {
  mode: 'dark',
  accent: '#3B82F6',
  language: 'pl',
  reduceMotion: false,
  notifications: { email: true, push: false, reminders: true, weeklySummary: false },
  privacy: { profilePublic: false, shareUsage: true, activityStatus: true, searchIndexing: false },
};

function readSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    /* użyj wartości domyślnych */
  }
  return defaultSettings;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(readSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
  }, [settings.language]);

  const toggleMode = useCallback(
    () => setSettings((s) => ({ ...s, mode: s.mode === 'dark' ? 'light' : 'dark' })),
    []
  );
  const setMode = useCallback((mode: ThemeMode) => setSettings((s) => ({ ...s, mode })), []);
  const setAccent = useCallback((accent: string) => setSettings((s) => ({ ...s, accent })), []);
  const setLanguage = useCallback((language: Language) => setSettings((s) => ({ ...s, language })), []);
  const setReduceMotion = useCallback(
    (reduceMotion: boolean) => setSettings((s) => ({ ...s, reduceMotion })),
    []
  );
  const setNotification = useCallback(
    (key: NotificationKey, value: boolean) =>
      setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: value } })),
    []
  );
  const setPrivacy = useCallback(
    (key: PrivacyKey, value: boolean) =>
      setSettings((s) => ({ ...s, privacy: { ...s.privacy, [key]: value } })),
    []
  );

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      let str: string = translations[settings.language][key] ?? translations.pl[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }
      return str;
    },
    [settings.language]
  );

  const value = useMemo(
    () => ({
      ...settings,
      toggleMode,
      setMode,
      setAccent,
      setLanguage,
      setReduceMotion,
      setNotification,
      setPrivacy,
      t,
    }),
    [settings, toggleMode, setMode, setAccent, setLanguage, setReduceMotion, setNotification, setPrivacy, t]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings musi być użyty wewnątrz SettingsProvider');
  return ctx;
}

/** Skrót do funkcji tłumaczenia. */
export function useTranslation() {
  return useSettings().t;
}
