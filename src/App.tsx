import DashboardLayout from './components/dashboard/DashboardLayout';
import MultiStepForm from './components/auth/MultiStepForm';

function App() {
  return (
    <>
      {/* Żeby widzieć formularz od razu, osadziłem go nad Dashboardem. 
          W docelowej aplikacji przeniósłbyś go na stronę /register. */}
      <div className="bg-gray-950 py-10 min-h-screen">
        <MultiStepForm />
      </div>
      
      {/* Zakomentuj lub usuń jeśli nie chcesz renderować reszty pod spodem */}
      {/* <DashboardLayout /> */}
    </>
  );
}

export default App;