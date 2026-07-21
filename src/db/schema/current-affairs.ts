import {
  pgTable, uuid, text, boolean, timestamp, date, index, uniqueIndex
} from 'drizzle-orm/pg-core';

export const currentAffairs = pgTable('current_affairs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  content: text('content'),
  featuredImage: text('featured_image'),
  pdfUrl: text('pdf_url'),
  date: date('date').notNull(),
  category: text('category').notNull().default('General'),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('ca_date_idx').on(t.date),
  index('ca_category_idx').on(t.category),
  uniqueIndex('ca_slug_idx').on(t.slug),
]);

export type CurrentAffair = typeof currentAffairs.$inferSelect;
export type NewCurrentAffair = typeof currentAffairs.$inferInsert;
