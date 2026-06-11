import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema } from './schemas';
export function Step3({ data, onBack, onSuccess, onEmailTaken, onServerError }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(step3Schema),
    });
    const onSubmit = async () => {
        try {
            // Symulacja API z opóźnieniem
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Mockowanie - specjalnie rzucamy błąd, jeśli wpisano np. zajęty e-mail
                    if (data.step1?.email === 'zajety@test.pl')
                        reject({ status: 409 });
                    else if (data.step1?.email === 'error@test.pl')
                        reject({ status: 500 });
                    else
                        resolve(true);
                }, 1500);
            });
            onSuccess();
        }
        catch (err) {
            if (err.status === 409) {
                onEmailTaken();
            }
            else {
                onServerError('Błąd serwera, spróbuj ponownie');
            }
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4 mt-4", children: [_jsxs("div", { className: "bg-gray-800 p-4 rounded-lg border border-gray-700", children: [_jsx("h3", { className: "font-bold text-lg mb-2 text-white", children: "Podsumowanie danych" }), _jsxs("p", { children: [_jsx("strong", { children: "Imi\u0119:" }), " ", data.step1?.firstName] }), _jsxs("p", { children: [_jsx("strong", { children: "Nazwisko:" }), " ", data.step1?.lastName] }), _jsxs("p", { children: [_jsx("strong", { children: "E-mail:" }), " ", data.step1?.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Kategorie:" }), " ", data.step2?.categories.map(c => c.value).join(', ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Powiadomienia:" }), " E-mail: ", data.step2?.notifications.email ? 'Tak' : 'Nie', ", Push: ", data.step2?.notifications.push ? 'Tak' : 'Nie'] }), _jsxs("p", { children: [_jsx("strong", { children: "Newsletter:" }), " ", data.step2?.newsletter ? 'Tak' : 'Nie'] })] }), _jsxs("div", { className: "flex flex-col mt-2", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer font-semibold", children: [_jsx("input", { type: "checkbox", "aria-required": "true", "aria-invalid": !!errors.rodo, "aria-describedby": errors.rodo ? 'rodo-err' : undefined, ...register('rodo'), className: "w-5 h-5" }), "Akceptuj\u0119 regulamin i polityk\u0119 prywatno\u015Bci RODO *"] }), errors.rodo && _jsx("span", { id: "rodo-err", role: "alert", className: "text-red-500 text-sm mt-1", children: errors.rodo.message })] }), _jsxs("div", { className: "flex justify-between mt-4", children: [_jsx("button", { type: "button", onClick: onBack, disabled: isSubmitting, className: "bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 disabled:opacity-50", children: "Wstecz" }), _jsx("button", { type: "submit", disabled: isSubmitting, "aria-busy": isSubmitting, className: "bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 font-bold", children: isSubmitting ? 'Wysyłanie...' : 'Zarejestruj się' })] })] }));
}
