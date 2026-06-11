import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, 'Tytuł musi mieć co najmniej 3 znaki')
    .max(80, 'Tytuł może mieć maksymalnie 80 znaków'),
  priority: z.enum(['low', 'medium', 'high']),
  forceError: z.boolean().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
