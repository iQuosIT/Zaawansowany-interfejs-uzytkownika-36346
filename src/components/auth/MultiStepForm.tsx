import { useState, useRef, useEffect } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step1Data, Step2Data } from './schemas';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{ step1?: Step1Data; step2?: Step2Data }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Zarządzanie focusem po przejściu do nowego kroku 
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
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

  if (currentStep === 4) {
    return (
      <div className="p-8 text-center bg-gray-900 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Rejestracja zakończona sukcesem!</h2>
        <p>Witaj w TaskFlow.</p>
      </div>
    );
  }

  const stepTitles = ["Krok 1: Dane osobowe", "Krok 2: Preferencje", "Krok 3: Potwierdzenie"];

  return (
    <main aria-label="Formularz rejestracji" className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
      
      {/* Breadcrumb z aria-current [cite: 511, 532-534] */}
      <nav aria-label="Postęp rejestracji" className="mb-6 flex gap-2 border-b border-gray-700 pb-4">
        {[1, 2, 3].map(step => (
          <span 
            key={step}
            aria-current={currentStep === step ? 'step' : undefined}
            className={`px-3 py-1 rounded-full text-sm font-bold ${currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            Krok {step}
          </span>
        ))}
      </nav>

      {/* Tytuł kroku z tabIndex={-1} do łapania focusa [cite: 511, 535-537] */}
      <h2 tabIndex={-1} ref={headingRef} className="text-2xl font-bold text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500 rounded">
        {stepTitles[currentStep - 1]}
      </h2>

      {/* Globalny błąd z serwera, np. 500 [cite: 431] lub przekazany błąd 409 z powrotem do kroku 1 */}
      {serverError && (
        <div role="alert" className="bg-red-900 border border-red-500 text-white px-4 py-3 rounded mb-4">
          {serverError}
        </div>
      )}

      {currentStep === 1 && (
        <Step1 
          defaultValues={formData.step1} 
          onComplete={handleStep1Complete} 
        />
      )}
      
      {currentStep === 2 && (
        <Step2 
          defaultValues={formData.step2} 
          onComplete={handleStep2Complete} 
          onBack={() => setCurrentStep(1)} 
        />
      )}
      
      {currentStep === 3 && (
        <Step3 
          data={formData} 
          onBack={() => setCurrentStep(2)}
          onSuccess={() => setCurrentStep(4)}
          onEmailTaken={handleEmailTaken}
          onServerError={(msg) => setServerError(msg)}
        />
      )}
    </main>
  );
}