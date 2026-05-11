// src/components/ErrorBanner.tsx
export function ErrorBanner({ message }: { message: string }) {
  return <div style={{ color: 'red', padding: '1rem', background: '#fee' }}>Błąd: {message}</div>;
}