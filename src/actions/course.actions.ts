'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createCourseSchema, updateCourseSchema } from '@/lib/validations/course';
import * as courseService from '@/services/course.service';

export async function createCourseAction(formData: unknown) {
  await requireAdmin();
  const parsed = createCourseSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const course = await courseService.createCourse(parsed.data);
  revalidatePath('/admin/courses');
  return { data: course };
}

export async function updateCourseAction(formData: unknown) {
  await requireAdmin();
  const parsed = updateCourseSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const course = await courseService.updateCourse(parsed.data);
  revalidatePath('/admin/courses');
  return { data: course };
}

export async function deleteCourseAction(id: string) {
  await requireAdmin();
  await courseService.deleteCourse(id);
  revalidatePath('/admin/courses');
  return { success: true };
}
