import { z } from 'zod';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().optional().transform((val, ctx) => {
    if (val && val.length > 0) return val;
    const titleField = (ctx as any)?.parent?.title;
    return titleField ? generateSlug(titleField) : undefined;
  }),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  featuredImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  pdfUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  categoryId: z.string().uuid().optional(),
  published: z.boolean().default(false),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export { generateSlug };
