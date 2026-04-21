import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, Step3Data, Step1Data, Step2Data } from './schemas';

interface Step3Props {
  data: { step1?: Step1Data; step2?: Step2Data };
  onBack: () => void;
  onSuccess: () => void;
  onEmailTaken: () => void;
  onServerError: (msg: string) => void;
}

export function Step3({ data, onBack, onSuccess, onEmailTaken, onServerError }: Step3Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
  });

  const onSubmit = async () => {
    try {
      // Symulacja API z opóźnieniem
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mockowanie - specjalnie rzucamy błąd, jeśli wpisano np. zajęty e-mail
          if (data.step1?.email === 'zajety@test.pl') reject({ status: 409 });
          else if (data.step1?.email === 'error@test.pl') reject({ status: 500 });
          else resolve(true);
        }, 1500);
      });
      
      onSuccess();
    } catch (err: any) {
      if (err.status === 409) {
        onEmailTaken();
      } else {
        onServerError('Błąd serwera, spróbuj ponownie');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="font-bold text-lg mb-2 text-white">Podsumowanie danych</h3>
        <p><strong>Imię:</strong> {data.step1?.firstName}</p>
        <p><strong>Nazwisko:</strong> {data.step1?.lastName}</p>
        <p><strong>E-mail:</strong> {data.step1?.email}</p>
        <p><strong>Kategorie:</strong> {data.step2?.categories.map(c => c.value).join(', ')}</p>
        <p><strong>Powiadomienia:</strong> E-mail: {data.step2?.notifications.email ? 'Tak' : 'Nie'}, Push: {data.step2?.notifications.push ? 'Tak' : 'Nie'}</p>
        <p><strong>Newsletter:</strong> {data.step2?.newsletter ? 'Tak' : 'Nie'}</p>
      </div>

      <div className="flex flex-col mt-2">
        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input 
            type="checkbox" 
            aria-required="true"
            aria-invalid={!!errors.rodo}
            aria-describedby={errors.rodo ? 'rodo-err' : undefined}
            {...register('rodo')} 
            className="w-5 h-5"
          />
          Akceptuję regulamin i politykę prywatności RODO *
        </label>
        {errors.rodo && <span id="rodo-err" role="alert" className="text-red-500 text-sm mt-1">{errors.rodo.message}</span>}
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} disabled={isSubmitting} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 disabled:opacity-50">
          Wstecz
        </button>
        {/* Przycisk zablokowany i aria-busy na czas isSubmitting [cite: 571] */}
        <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 font-bold">
          {isSubmitting ? 'Wysyłanie...' : 'Zarejestruj się'}
        </button>
      </div>
    </form>
  );
}