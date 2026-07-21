'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as lessonService from '@/services/lesson.service';
import { z } from 'zod';
import { logAudit } from '@/lib/audit';

const lessonSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(2),
  content: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  pdfUrl: z.string().url().optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(false),
});

export async function createLessonAction(input: unknown) {
  await requireAdmin();
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const lesson = await lessonService.createLesson({
    ...parsed.data,
    order: parsed.data.order.toString(),
    videoUrl: parsed.data.videoUrl || null,
    pdfUrl: parsed.data.pdfUrl || null,
    content: parsed.data.content || null,
  });

  await logAudit({
    action: 'lesson.created',
    resourceType: 'lesson',
    resourceId: lesson.id,
    resourceTitle: lesson.title,
    metadata: { courseId: lesson.courseId },
  });

  revalidatePath('/admin/courses');
  return { data: lesson };
}

export async function deleteLessonAction(id: string, courseId: string) {
  await requireAdmin();
  await lessonService.deleteLesson(id);

  await logAudit({
    action: 'lesson.deleted',
    resourceType: 'lesson',
    resourceId: id,
    metadata: { courseId },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  return { success: true };
}
