import {
  pgTable, uuid, text, numeric, boolean, timestamp, pgEnum, index
} from 'drizzle-orm/pg-core';

export const courseLevelEnum = pgEnum('course_level', ['beginner', 'intermediate', 'advanced']);

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0'),
  level: courseLevelEnum('level').notNull().default('beginner'),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('courses_published_idx').on(t.published),
]);

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  videoUrl: text('video_url'),
  pdfUrl: text('pdf_url'),
  order: numeric('order').notNull().default('0'),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('lessons_course_idx').on(t.courseId),
]);

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
