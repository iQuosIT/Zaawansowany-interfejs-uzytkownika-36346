import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, Step1Data } from './schemas';

interface Step1Props {
  defaultValues?: Partial<Step1Data>;
  onComplete: (data: Step1Data) => void;
}

export function Step1({ defaultValues, onComplete }: Step1Props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultValues || { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  });

  const passwordValue = watch('password');

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return '';
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score < 2) return 'Słabe';
    if (score === 2) return 'Średnie';
    return 'Silne';
  };

  const strength = getPasswordStrength(passwordValue || '');

  return (
    <form onSubmit={handleSubmit(onComplete)} className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-1 font-semibold">Imię *</label>
        <input
          id="firstName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-err' : undefined}
          {...register('firstName')}
          className="p-2 border rounded text-black"
        />
        {errors.firstName && <span id="firstName-err" role="alert" className="text-red-500 text-sm">{errors.firstName.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName" className="mb-1 font-semibold">Nazwisko *</label>
        <input
          id="lastName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-err' : undefined}
          {...register('lastName')}
          className="p-2 border rounded text-black"
        />
        {errors.lastName && <span id="lastName-err" role="alert" className="text-red-500 text-sm">{errors.lastName.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-semibold">E-mail *</label>
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          {...register('email')}
          className="p-2 border rounded text-black"
        />
        {errors.email && <span id="email-err" role="alert" className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-semibold">Hasło *</label>
        <input
          id="password"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'pwd-err' : 'pwd-hint'}
          {...register('password')}
          className="p-2 border rounded text-black"
        />
        <span id="pwd-hint" aria-live="polite" className={`text-sm mt-1 ${strength === 'Słabe' ? 'text-red-400' : strength === 'Średnie' ? 'text-yellow-400' : 'text-green-400'}`}>
          Siła hasła: {strength || 'Brak'}
        </span>
        {errors.password && <span id="pwd-err" role="alert" className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="mb-1 font-semibold">Potwierdź hasło *</label>
        <input
          id="confirmPassword"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'cpwd-err' : undefined}
          {...register('confirmPassword')}
          className="p-2 border rounded text-black"
        />
        {errors.confirmPassword && <span id="cpwd-err" role="alert" className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Dalej</button>
    </form>
  );
}