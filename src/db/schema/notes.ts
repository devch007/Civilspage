import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  thumbnail: text('thumbnail'),
  subject: text('subject').notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('notes_subject_idx').on(t.subject),
  index('notes_category_idx').on(t.category),
]);

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
