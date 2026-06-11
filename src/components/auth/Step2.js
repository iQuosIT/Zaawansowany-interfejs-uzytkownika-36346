import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema } from './schemas';
export function Step2({ defaultValues, onComplete, onBack }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(step2Schema),
        mode: 'onBlur',
        defaultValues: defaultValues || {
            categories: [{ value: 'Technologia' }],
            notifications: { email: false, push: false },
            newsletter: false
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'categories'
    });
    return (_jsxs("form", { onSubmit: handleSubmit(onComplete), className: "flex flex-col gap-4 mt-4", children: [_jsxs("div", { className: "flex flex-col border p-4 rounded border-gray-600", children: [_jsx("p", { className: "font-semibold mb-2", id: "categories-group", children: "Kategorie zainteresowa\u0144" }), _jsxs("div", { role: "group", "aria-labelledby": "categories-group", className: "flex flex-col gap-2", children: [fields.map((field, index) => (_jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { ...register(`categories.${index}.value`), "aria-label": `Kategoria ${index + 1}`, className: "p-2 border rounded text-black flex-1" }), _jsx("button", { type: "button", onClick: () => remove(index), className: "text-red-500 hover:text-red-400", children: "Usu\u0144" })] }, field.id))), _jsx("button", { type: "button", onClick: () => append({ value: '' }), className: "self-start text-blue-400 mt-2", children: "+ Dodaj kategori\u0119" })] }), errors.categories?.root && _jsx("span", { role: "alert", className: "text-red-500 text-sm mt-1", children: errors.categories.root.message })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Controller, { name: "notifications.email", control: control, render: ({ field }) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", id: "notif-email", "aria-label": "Powiadomienia e-mail", checked: field.value, onChange: field.onChange }), "Powiadomienia e-mail"] })) }), _jsx(Controller, { name: "notifications.push", control: control, render: ({ field }) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: field.value, onChange: field.onChange }), "Powiadomienia push"] })) }), _jsx(Controller, { name: "newsletter", control: control, render: ({ field }) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: field.value, onChange: field.onChange }), "Zapisz mnie do newslettera (opcjonalnie)"] })) })] }), _jsxs("div", { className: "flex justify-between mt-4", children: [_jsx("button", { type: "button", onClick: onBack, className: "bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700", children: "Wstecz" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700", children: "Dalej" })] })] }));
}
