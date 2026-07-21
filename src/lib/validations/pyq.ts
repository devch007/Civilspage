import { z } from 'zod';

export const createPyqSchema = z.object({
  question: z.string().min(10),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctAnswer: z.enum(['a', 'b', 'c', 'd']),
  explanation: z.string().optional(),
  year: z.number().int().min(1990).max(new Date().getFullYear()),
  subject: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
});

export const updatePyqSchema = createPyqSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreatePyqInput = z.infer<typeof createPyqSchema>;
export type UpdatePyqInput = z.infer<typeof updatePyqSchema>;
