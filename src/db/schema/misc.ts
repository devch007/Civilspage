import {
  pgTable, uuid, text, numeric, boolean, timestamp, pgEnum, index
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { blogs } from './blogs';
import { courses } from './courses';

// ── STUDENTS (extended profile for student role users) ──────────────────────
export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').unique().notNull().references(() => users.id, { onDelete: 'cascade' }),
  phone: text('phone'),
  targetYear: text('target_year'),
  upscStage: text('upsc_stage'), // prelims | mains | interview
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── PAYMENTS ────────────────────────────────────────────────────────────────
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending', 'completed', 'failed', 'refunded'
]);

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('INR'),
  status: paymentStatusEnum('status').notNull().default('pending'),
  transactionId: text('transaction_id').unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('payments_user_idx').on(t.userId),
  index('payments_status_idx').on(t.status),
]);

// ── BOOKMARKS ───────────────────────────────────────────────────────────────
export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  blogId: uuid('blog_id').references(() => blogs.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('bookmarks_user_idx').on(t.userId),
]);

// ── COMMENTS ────────────────────────────────────────────────────────────────
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  blogId: uuid('blog_id').notNull().references(() => blogs.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  approved: boolean('approved').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('comments_blog_idx').on(t.blogId),
  index('comments_approved_idx').on(t.approved),
]);

// ── NEWSLETTER SUBSCRIBERS ──────────────────────────────────────────────────
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  name: text('name'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Student = typeof students.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
