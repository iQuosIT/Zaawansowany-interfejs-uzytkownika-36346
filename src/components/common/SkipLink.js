import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from '../../context/SettingsContext';
export default function SkipLink() {
    const t = useTranslation();
    return (_jsx("a", { href: "#main-content", className: "skip-link", children: t('common.skipLink') }));
}
