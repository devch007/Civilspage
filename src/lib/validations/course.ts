import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  thumbnail: z.string().url().optional().or(z.literal('')),
  price: z.number().min(0).default(0),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  published: z.boolean().default(false),
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
