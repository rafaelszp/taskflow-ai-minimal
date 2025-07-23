import { z } from 'zod';

export const taskPriority = ['LOW', 'MEDIUM', 'HIGH'] as const;
export const taskStatus = ['TODO', 'IN_PROGRESS', 'DONE'] as const;

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .max(1000, 'A descrição deve ter no máximo 1000 caracteres')
    .optional(),
  dueDate: z.date({
    required_error: 'A data de vencimento é obrigatória',
    invalid_type_error: 'Data inválida',
  }),
  priority: z.enum(taskPriority, {
    required_error: 'A prioridade é obrigatória',
  }),
  status: z.enum(taskStatus, {
    required_error: 'O status é obrigatório',
  }),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
