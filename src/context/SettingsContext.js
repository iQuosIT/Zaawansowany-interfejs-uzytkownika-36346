import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from '../i18n/translations';
export const accentOptions = [
    { id: 'blue', label: 'Niebieski', value: '#3B82F6' },
    { id: 'violet', label: 'Fioletowy', value: '#8B5CF6' },
    { id: 'emerald', label: 'Zielony', value: '#10B981' },
    { id: 'rose', label: 'Różowy', value: '#F43F5E' },
    { id: 'amber', label: 'Pomarańczowy', value: '#F59E0B' },
];
const STORAGE_KEY = 'taskflow.settings';
const defaultSettings = {
    mode: 'dark',
    accent: '#3B82F6',
    language: 'pl',
    reduceMotion: false,
    notifications: { email: true, push: false, reminders: true, weeklySummary: false },
    privacy: { profilePublic: false, shareUsage: true, activityStatus: true, searchIndexing: false },
};
function readSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw)
            return { ...defaultSettings, ...JSON.parse(raw) };
    }
    catch {
        /* użyj wartości domyślnych */
    }
    return defaultSettings;
}
const SettingsContext = createContext(undefined);
export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(readSettings);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);
    useEffect(() => {
        document.documentElement.lang = settings.language;
    }, [settings.language]);
    const toggleMode = useCallback(() => setSettings((s) => ({ ...s, mode: s.mode === 'dark' ? 'light' : 'dark' })), []);
    const setMode = useCallback((mode) => setSettings((s) => ({ ...s, mode })), []);
    const setAccent = useCallback((accent) => setSettings((s) => ({ ...s, accent })), []);
    const setLanguage = useCallback((language) => setSettings((s) => ({ ...s, language })), []);
    const setReduceMotion = useCallback((reduceMotion) => setSettings((s) => ({ ...s, reduceMotion })), []);
    const setNotification = useCallback((key, value) => setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: value } })), []);
    const setPrivacy = useCallback((key, value) => setSettings((s) => ({ ...s, privacy: { ...s.privacy, [key]: value } })), []);
    const t = useCallback((key, vars) => {
        let str = translations[settings.language][key] ?? translations.pl[key] ?? key;
        if (vars) {
            for (const [k, v] of Object.entries(vars)) {
                str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
            }
        }
        return str;
    }, [settings.language]);
    const value = useMemo(() => ({
        ...settings,
        toggleMode,
        setMode,
        setAccent,
        setLanguage,
        setReduceMotion,
        setNotification,
        setPrivacy,
        t,
    }), [settings, toggleMode, setMode, setAccent, setLanguage, setReduceMotion, setNotification, setPrivacy, t]);
    return _jsx(SettingsContext.Provider, { value: value, children: children });
}
export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx)
        throw new Error('useSettings musi być użyty wewnątrz SettingsProvider');
    return ctx;
}
/** Skrót do funkcji tłumaczenia. */
export function useTranslation() {
    return useSettings().t;
}
