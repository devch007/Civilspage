import { pgTable, uuid, text, jsonb, timestamp, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  // Who
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  userEmail: text('user_email').notNull(),       // denormalized — survives user deletion
  userName: text('user_name'),
  userRole: text('user_role'),
  // What
  action: text('action').notNull(),              // e.g. 'blog.published', 'pyq.deleted'
  resourceType: text('resource_type').notNull(), // e.g. 'blog', 'pyq', 'note'
  resourceId: text('resource_id'),               // UUID of affected record
  resourceTitle: text('resource_title'),         // human-readable label for display
  // Where / How
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  // Extra
  metadata: jsonb('metadata'),                   // any extra context as JSON
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('audit_user_idx').on(t.userId),
  index('audit_action_idx').on(t.action),
  index('audit_resource_idx').on(t.resourceType),
  index('audit_created_idx').on(t.createdAt),
]);

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
