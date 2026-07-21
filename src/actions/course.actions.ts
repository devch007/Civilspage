'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createCourseSchema, updateCourseSchema } from '@/lib/validations/course';
import * as courseService from '@/services/course.service';
import { logAudit } from '@/lib/audit';

export async function createCourseAction(formData: unknown) {
  await requireAdmin();
  const parsed = createCourseSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const course = await courseService.createCourse(parsed.data);

  await logAudit({
    action: 'course.created',
    resourceType: 'course',
    resourceId: course.id,
    resourceTitle: course.title,
    metadata: { level: course.level, price: course.price },
  });

  revalidatePath('/admin/courses');
  return { data: course };
}

export async function updateCourseAction(formData: unknown) {
  await requireAdmin();
  const parsed = updateCourseSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const course = await courseService.updateCourse(parsed.data);

  await logAudit({
    action: 'course.updated',
    resourceType: 'course',
    resourceId: course.id,
    resourceTitle: course.title,
  });

  revalidatePath('/admin/courses');
  return { data: course };
}

export async function deleteCourseAction(id: string) {
  await requireAdmin();
  await courseService.deleteCourse(id);

  await logAudit({
    action: 'course.deleted',
    resourceType: 'course',
    resourceId: id,
  });

  revalidatePath('/admin/courses');
  return { success: true };
}
