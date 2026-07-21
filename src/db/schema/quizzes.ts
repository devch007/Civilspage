import { pgTable, uuid, text, integer, boolean, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';

export const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  subject: text('subject').notNull(),
  question: text('question').notNull(),
  optionA: text('option_a').notNull(),
  optionB: text('option_b').notNull(),
  optionC: text('option_c').notNull(),
  optionD: text('option_d').notNull(),
  correctAnswer: integer('correct_answer').notNull(), // 0-3 index
  explanation: text('explanation'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('quizzes_subject_idx').on(t.subject),
  index('quizzes_active_idx').on(t.active),
]);

export type Quiz = typeof quizzes.$inferSelect;
export type NewQuiz = typeof quizzes.$inferInsert;
