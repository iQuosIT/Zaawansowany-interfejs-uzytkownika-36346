import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from './schemas';
export function Step1({ defaultValues, onComplete }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(step1Schema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: defaultValues || { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
    });
    const passwordValue = watch('password');
    const getPasswordStrength = (pwd) => {
        if (!pwd)
            return '';
        let score = 0;
        if (pwd.length >= 8)
            score++;
        if (/[A-Z]/.test(pwd))
            score++;
        if (/[0-9]/.test(pwd))
            score++;
        if (/[^A-Za-z0-9]/.test(pwd))
            score++;
        if (score < 2)
            return 'Słabe';
        if (score === 2)
            return 'Średnie';
        return 'Silne';
    };
    const strength = getPasswordStrength(passwordValue || '');
    return (_jsxs("form", { onSubmit: handleSubmit(onComplete), className: "flex flex-col gap-4 mt-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "firstName", className: "mb-1 font-semibold", children: "Imi\u0119 *" }), _jsx("input", { id: "firstName", type: "text", "aria-required": "true", "aria-invalid": !!errors.firstName, "aria-describedby": errors.firstName ? 'firstName-err' : undefined, ...register('firstName'), className: "p-2 border rounded text-black" }), errors.firstName && _jsx("span", { id: "firstName-err", role: "alert", className: "text-red-500 text-sm", children: errors.firstName.message })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "lastName", className: "mb-1 font-semibold", children: "Nazwisko *" }), _jsx("input", { id: "lastName", type: "text", "aria-required": "true", "aria-invalid": !!errors.lastName, "aria-describedby": errors.lastName ? 'lastName-err' : undefined, ...register('lastName'), className: "p-2 border rounded text-black" }), errors.lastName && _jsx("span", { id: "lastName-err", role: "alert", className: "text-red-500 text-sm", children: errors.lastName.message })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "email", className: "mb-1 font-semibold", children: "E-mail *" }), _jsx("input", { id: "email", type: "email", "aria-required": "true", "aria-invalid": !!errors.email, "aria-describedby": errors.email ? 'email-err' : undefined, ...register('email'), className: "p-2 border rounded text-black" }), errors.email && _jsx("span", { id: "email-err", role: "alert", className: "text-red-500 text-sm", children: errors.email.message })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "password", className: "mb-1 font-semibold", children: "Has\u0142o *" }), _jsx("input", { id: "password", type: "password", "aria-required": "true", "aria-invalid": !!errors.password, "aria-describedby": errors.password ? 'pwd-err' : 'pwd-hint', ...register('password'), className: "p-2 border rounded text-black" }), _jsxs("span", { id: "pwd-hint", "aria-live": "polite", className: `text-sm mt-1 ${strength === 'Słabe' ? 'text-red-400' : strength === 'Średnie' ? 'text-yellow-400' : 'text-green-400'}`, children: ["Si\u0142a has\u0142a: ", strength || 'Brak'] }), errors.password && _jsx("span", { id: "pwd-err", role: "alert", className: "text-red-500 text-sm", children: errors.password.message })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "confirmPassword", className: "mb-1 font-semibold", children: "Potwierd\u017A has\u0142o *" }), _jsx("input", { id: "confirmPassword", type: "password", "aria-required": "true", "aria-invalid": !!errors.confirmPassword, "aria-describedby": errors.confirmPassword ? 'cpwd-err' : undefined, ...register('confirmPassword'), className: "p-2 border rounded text-black" }), errors.confirmPassword && _jsx("span", { id: "cpwd-err", role: "alert", className: "text-red-500 text-sm", children: errors.confirmPassword.message })] }), _jsx("button", { type: "submit", className: "mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700", children: "Dalej" })] }));
}
