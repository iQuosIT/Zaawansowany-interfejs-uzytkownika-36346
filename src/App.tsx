import { useState } from 'react';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MultiStepForm from './components/auth/MultiStepForm';
import SkipLink from './components/common/SkipLink';

function App() {
  // Stan sterujący widokiem: 'dashboard' lub 'register'
  const [view, setView] = useState<'dashboard' | 'register'>('dashboard');

  return (
    <>
      <SkipLink />
      <div className="bg-gray-950 min-h-screen">
        {view === 'register' ? (
          <div className="py-10">
            {/* Przekazujemy funkcję powrotu do dashboardu */}
            <MultiStepForm onCancel={() => setView('dashboard')} />
          </div>
        ) : (
          /* Przekazujemy funkcję zmiany widoku do DashboardLayout */
          <DashboardLayout onRegisterClick={() => setView('register')} />
        )}
      </div>
    </>
  );
}

export default App;