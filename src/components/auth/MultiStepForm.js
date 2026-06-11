import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { useAuth } from '../../context/AuthContext';
export default function MultiStepForm({ onCancel }) {
    const { login } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [serverError, setServerError] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const headingRef = useRef(null);
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
    const handleStep1Complete = (data) => {
        setFormData(prev => ({ ...prev, step1: data }));
        setServerError(null);
        setCurrentStep(2);
    };
    const handleStep2Complete = (data) => {
        setFormData(prev => ({ ...prev, step2: data }));
        setCurrentStep(3);
    };
    const handleEmailTaken = () => {
        setCurrentStep(1);
        setServerError('Ten adres e-mail jest już zarejestrowany. Proszę użyć innego.');
    };
    // Ekran końcowy po sukcesie
    if (currentStep === 4) {
        return (_jsxs("section", { "aria-labelledby": "success-heading", className: "max-w-xl mx-auto p-8 text-center bg-gray-900 rounded-xl shadow-lg border border-gray-700 mt-10", children: [_jsx("div", { role: "status", "aria-live": "polite", className: "sr-only", children: "Rejestracja zako\u0144czona sukcesem!" }), _jsx("h2", { id: "success-heading", tabIndex: -1, ref: headingRef, className: "text-2xl font-bold text-green-400 mb-2 outline-none", children: "Rejestracja zako\u0144czona sukcesem!" }), _jsx("p", { className: "text-white mb-6", children: "Witaj w TaskFlow." }), onCancel && (_jsx("button", { onClick: onCancel, className: "bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-bold transition-colors", children: "Przejd\u017A do Dashboardu" }))] }));
    }
    return (_jsxs("section", { "aria-labelledby": "form-heading", className: "max-w-xl mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700", children: [_jsx("div", { role: "status", "aria-live": "polite", className: "sr-only", children: statusMsg }), _jsxs("div", { className: "flex justify-between items-center mb-6 border-b border-gray-700 pb-4", children: [_jsx("nav", { "aria-label": "Post\u0119p rejestracji", className: "flex gap-2", children: [1, 2, 3].map(step => (_jsxs("span", { "aria-current": currentStep === step ? 'step' : undefined, className: `px-3 py-1 rounded-full text-sm font-bold ${currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`, children: [_jsx("span", { className: "sr-only", children: "Krok " }), step] }, step))) }), onCancel && (_jsx("button", { onClick: onCancel, className: "text-gray-400 hover:text-white text-sm font-semibold transition-colors", children: "Anuluj" }))] }), _jsx("h2", { id: "form-heading", tabIndex: -1, ref: headingRef, className: "text-2xl font-bold text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500 rounded", children: stepTitles[currentStep - 1] }), serverError && (_jsx("div", { role: "alert", className: "bg-red-900 border border-red-500 text-white px-4 py-3 rounded mb-4", children: serverError })), currentStep === 1 && (_jsx(Step1, { defaultValues: formData.step1, onComplete: handleStep1Complete })), currentStep === 2 && (_jsx(Step2, { defaultValues: formData.step2, onComplete: handleStep2Complete, onBack: () => setCurrentStep(1) })), currentStep === 3 && (_jsx(Step3, { data: formData, onBack: () => setCurrentStep(2), onSuccess: handleRegistrationSuccess, onEmailTaken: handleEmailTaken, onServerError: (msg) => setServerError(msg) }))] }));
}
