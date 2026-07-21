'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as quizService from '@/services/quiz.service';
import { z } from 'zod';

const quizSchema = z.object({
  subject: z.string().min(1),
  question: z.string().min(5),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctAnswer: z.number().int().min(0).max(3),
  explanation: z.string().optional(),
  active: z.boolean().default(true),
});

export async function createQuizAction(input: unknown) {
  await requireAdmin();
  const parsed = quizSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const quiz = await quizService.createQuiz(parsed.data);
  revalidatePath('/admin/quizzes');
  return { data: quiz };
}

export async function deleteQuizAction(id: string) {
  await requireAdmin();
  await quizService.deleteQuiz(id);
  revalidatePath('/admin/quizzes');
  return { success: true };
}

export async function toggleQuizAction(id: string, active: boolean) {
  await requireAdmin();
  const quiz = await quizService.toggleQuizActive(id, active);
  revalidatePath('/admin/quizzes');
  return { data: quiz };
}
