import { z } from 'zod';

export const createCurrentAffairSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().optional(),
  content: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  pdfUrl: z.string().url().optional().or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  category: z.string().min(1).default('General'),
  published: z.boolean().default(false),
});

export const updateCurrentAffairSchema = createCurrentAffairSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateCurrentAffairInput = z.infer<typeof createCurrentAffairSchema>;
export type UpdateCurrentAffairInput = z.infer<typeof updateCurrentAffairSchema>;
