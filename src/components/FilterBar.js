import { jsx as _jsx } from "react/jsx-runtime";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSettings } from '../context/SettingsContext';
export const FilterBar = ({ activeFilter, onFilterChange }) => {
    const { t } = useSettings();
    const options = [
        { value: 'all', label: t('filter.all') },
        { value: 'active', label: t('filter.active') },
        { value: 'completed', label: t('filter.completed') },
    ];
    return (_jsx(ToggleButtonGroup, { value: activeFilter, exclusive: true, onChange: (_, value) => value && onFilterChange(value), "aria-label": t('filter.aria'), size: "small", color: "primary", children: options.map((opt) => (_jsx(ToggleButton, { value: opt.value, "aria-label": opt.label, children: opt.label }, opt.value))) }));
};
export default FilterBar;
