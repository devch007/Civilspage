import { pgTable, uuid, text, integer, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const correctAnswerEnum = pgEnum('correct_answer', ['a', 'b', 'c', 'd']);

export const pyqs = pgTable('pyqs', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  optionA: text('option_a').notNull(),
  optionB: text('option_b').notNull(),
  optionC: text('option_c').notNull(),
  optionD: text('option_d').notNull(),
  correctAnswer: correctAnswerEnum('correct_answer').notNull(),
  explanation: text('explanation'),
  year: integer('year').notNull(),
  subject: text('subject').notNull(),
  difficulty: difficultyEnum('difficulty').notNull().default('medium'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('pyqs_year_idx').on(t.year),
  index('pyqs_subject_idx').on(t.subject),
  index('pyqs_difficulty_idx').on(t.difficulty),
]);

export type Pyq = typeof pyqs.$inferSelect;
export type NewPyq = typeof pyqs.$inferInsert;
