import { useState, useRef, useEffect } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step1Data, Step2Data } from './schemas';
import { useAuth } from '../../context/AuthContext';

// Dodajemy interfejs dla propsów, aby przyjąć funkcję onCancel
interface MultiStepFormProps {
  onCancel?: () => void;
}

export default function MultiStepForm({ onCancel }: MultiStepFormProps) {
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{ step1?: Step1Data; step2?: Step2Data }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleRegistrationSuccess = () => {
    if (formData.step1) {
      login(`${formData.step1.firstName} ${formData.step1.lastName}`);
    }
    setCurrentStep(4);
  };

  const stepTitles = ["Krok 1: Dane osobowe", "Krok 2: Preferencje", "Krok 3: Potwierdzenie"];

  // Focus management i Live Region
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
    setStatusMsg(`Zmieniono na krok ${currentStep}: ${stepTitles[currentStep - 1]}`);
  }, [currentStep]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setServerError(null);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleEmailTaken = () => {
    setCurrentStep(1);
    setServerError('Ten adres e-mail jest już zarejestrowany. Proszę użyć innego.');
  };

  // Ekran końcowy po sukcesie
  if (currentStep === 4) {
    return (
      <section aria-labelledby="success-heading" className="max-w-xl mx-auto p-8 text-center bg-gray-900 rounded-xl shadow-lg border border-gray-700 mt-10">
        <div role="status" aria-live="polite" className="sr-only">Rejestracja zakończona sukcesem!</div>
        <h2 id="success-heading" tabIndex={-1} ref={headingRef} className="text-2xl font-bold text-green-400 mb-2 outline-none">
          Rejestracja zakończona sukcesem!
        </h2>
        <p className="text-white mb-6">Witaj w TaskFlow.</p>
        
        {/* Przycisk powrotu do strony głównej na ekranie sukcesu */}
        {onCancel && (
          <button 
            onClick={onCancel}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-bold transition-colors"
          >
            Przejdź do Dashboardu
          </button>
        )}
      </section>
    );
  }

  return (
    <section aria-labelledby="form-heading" className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
      
      {/* ARIA Live Region - komunikaty statusu */}
      <div role="status" aria-live="polite" className="sr-only">
        {statusMsg}
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        {/* Nawigacja okruszkowa z aria-current */}
        <nav aria-label="Postęp rejestracji" className="flex gap-2">
          {[1, 2, 3].map(step => (
            <span 
              key={step}
              aria-current={currentStep === step ? 'step' : undefined}
              className={`px-3 py-1 rounded-full text-sm font-bold ${currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              <span className="sr-only">Krok </span>{step}
            </span>
          ))}
        </nav>

        {/* Przycisk "Anuluj" do zamykania formularza (przekazywany z App.tsx) */}
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors"
          >
            Anuluj
          </button>
        )}
      </div>

      {/* Heading z tabIndex={-1} aby można było zogniskować focus */}
      <h2 id="form-heading" tabIndex={-1} ref={headingRef} className="text-2xl font-bold text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500 rounded">
        {stepTitles[currentStep - 1]}
      </h2>

      {serverError && (
        <div role="alert" className="bg-red-900 border border-red-500 text-white px-4 py-3 rounded mb-4">
          {serverError}
        </div>
      )}

      {currentStep === 1 && (
        <Step1 defaultValues={formData.step1} onComplete={handleStep1Complete} />
      )}
      {currentStep === 2 && (
        <Step2 defaultValues={formData.step2} onComplete={handleStep2Complete} onBack={() => setCurrentStep(1)} />
      )}
      {currentStep === 3 && (
        <Step3 
          data={formData} 
          onBack={() => setCurrentStep(2)}
          onSuccess={handleRegistrationSuccess}
          onEmailTaken={handleEmailTaken}
          onServerError={(msg) => setServerError(msg)}
        />
      )}
    </section>
  );
}