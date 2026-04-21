import { z } from 'zod';

// Krok 1: Dane osobowe [cite: 421, 422, 439-452]
export const step1Schema = z.object({
  firstName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  password: z.string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
    .regex(/[0-9]/, 'Hasło musi zawierać cyfrę'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła muszą być identyczne',
  path: ['confirmPassword'],
});

export type Step1Data = z.infer<typeof step1Schema>;

// Krok 2: Preferencje 
export const step2Schema = z.object({
  // useFieldArray wymaga tablicy obiektów
  categories: z.array(z.object({ value: z.string().min(1, 'Kategoria nie może być pusta') }))
    .min(1, 'Wybierz co najmniej jedną kategorię'),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }),
  newsletter: z.boolean().optional(),
});

export type Step2Data = z.infer<typeof step2Schema>;

// Krok 3: RODO [cite: 426, 428]
export const step3Schema = z.object({
  rodo: z.literal(true, {
    errorMap: () => ({ message: 'Akceptacja RODO jest wymagana' }),
  }),
});

export type Step3Data = z.infer<typeof step3Schema>;