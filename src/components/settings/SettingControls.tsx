import { ReactNode } from 'react';
import { Paper, Typography, Switch, FormControlLabel, Box, Divider } from '@mui/material';

export function SettingSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  divider?: boolean;
}

export function ToggleRow({ label, description, checked, onChange, divider }: ToggleRowProps) {
  return (
    <>
      <FormControlLabel
        sx={{ width: '100%', m: 0, alignItems: 'flex-start', justifyContent: 'space-between' }}
        labelPlacement="start"
        control={<Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />}
        label={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        }
      />
      {divider && <Divider sx={{ my: 2 }} />}
    </>
  );
}
