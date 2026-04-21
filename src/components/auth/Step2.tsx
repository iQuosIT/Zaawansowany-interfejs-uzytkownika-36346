import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, Step2Data } from './schemas';

interface Step2Props {
  defaultValues?: Partial<Step2Data>;
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
}

export function Step2({ defaultValues, onComplete, onBack }: Step2Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Step2Data>({
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

  return (
    <form onSubmit={handleSubmit(onComplete)} className="flex flex-col gap-4 mt-4">
      
      {/* Kategorie (useFieldArray) */}
      <div className="flex flex-col border p-4 rounded border-gray-600">
        <p className="font-semibold mb-2" id="categories-group">Kategorie zainteresowań</p>
        <div role="group" aria-labelledby="categories-group" className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input
                {...register(`categories.${index}.value` as const)}
                aria-label={`Kategoria ${index + 1}`}
                className="p-2 border rounded text-black flex-1"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-400">Usuń</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ value: '' })} className="self-start text-blue-400 mt-2">
            + Dodaj kategorię
          </button>
        </div>
        {errors.categories?.root && <span role="alert" className="text-red-500 text-sm mt-1">{errors.categories.root.message}</span>}
      </div>

      {/* Powiadomienia (Controller) */}
      <div className="flex flex-col gap-2">
        <Controller
          name="notifications.email"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="notif-email" aria-label="Powiadomienia e-mail" checked={field.value} onChange={field.onChange} />
              Powiadomienia e-mail
            </label>
          )}
        />
        <Controller
          name="notifications.push"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={field.value} onChange={field.onChange} />
              Powiadomienia push
            </label>
          )}
        />
        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={field.value} onChange={field.onChange} />
              Zapisz mnie do newslettera (opcjonalnie)
            </label>
          )}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Wstecz</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Dalej</button>
      </div>
    </form>
  );
}