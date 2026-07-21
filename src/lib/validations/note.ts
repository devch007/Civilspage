import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(3),
  pdfUrl: z.string().url('Must be a valid Cloudflare R2 URL'),
  thumbnail: z.string().url().optional().or(z.literal('')),
  subject: z.string().min(1),
  category: z.string().min(1),
});

export const updateNoteSchema = createNoteSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
