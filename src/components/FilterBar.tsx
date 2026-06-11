import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterType } from '../types/todo.types';
import { useSettings } from '../context/SettingsContext';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const { t } = useSettings();

  const options: { value: FilterType; label: string }[] = [
    { value: 'all', label: t('filter.all') },
    { value: 'active', label: t('filter.active') },
    { value: 'completed', label: t('filter.completed') },
  ];

  return (
    <ToggleButtonGroup
      value={activeFilter}
      exclusive
      onChange={(_, value: FilterType | null) => value && onFilterChange(value)}
      aria-label={t('filter.aria')}
      size="small"
      color="primary"
    >
      {options.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value} aria-label={opt.label}>
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterBar;
