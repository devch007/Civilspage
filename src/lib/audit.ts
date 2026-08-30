import { headers, cookies } from 'next/headers';
import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { getUserProfile } from '@/lib/auth';

export type AuditAction =
  // Blogs
  | 'blog.created' | 'blog.updated' | 'blog.deleted' | 'blog.published' | 'blog.unpublished'
  // Current Affairs
  | 'current_affair.created' | 'current_affair.updated' | 'current_affair.deleted'
  // Notes
  | 'note.uploaded' | 'note.deleted'
  // Courses & Lessons
  | 'course.created' | 'course.updated' | 'course.deleted'
  | 'lesson.created' | 'lesson.deleted'
  // PYQs
  | 'pyq.created' | 'pyq.updated' | 'pyq.deleted'
  // Mock Tests
  | 'mock_test.created' | 'mock_test.updated' | 'mock_test.deleted'
  // Model Answers
  | 'model_answer.created' | 'model_answer.updated' | 'model_answer.deleted'
  // Quizzes
  | 'quiz.created' | 'quiz.deleted' | 'quiz.activated' | 'quiz.deactivated'
  // Categories & Tags
  | 'category.created' | 'category.deleted'
  | 'tag.created' | 'tag.deleted'
  // Comments
  | 'comment.approved' | 'comment.rejected'
  // Users
  | 'user.role_changed' | 'user.invited' | 'user.deleted'
  // Files
  | 'file.uploaded' | 'file.deleted'
  // Auth
  | 'auth.login' | 'auth.logout'
  // Settings
  | 'settings.updated';

export interface AuditOptions {
  action: AuditAction;
  resourceType: string;
  resourceId?: string;
  resourceTitle?: string;
  metadata?: Record<string, unknown>;
  userEmail?: string;
  userName?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Call this inside Server Actions or API routes to record an audit log.
 * Resolves user from Supabase session OR admin cookie session.
 */
export async function logAudit(options: AuditOptions): Promise<void> {
  try {
    let email = options.userEmail;
    let name = options.userName;
    let role = options.userRole;
    let ip = options.ipAddress;
    let userAgent = options.userAgent;

    // Extract headers and cookies if not explicitly passed
    try {
      const [headersList, cookieStore] = await Promise.all([
        headers(),
        cookies()
      ]);

      if (!ip) {
        ip =
          headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
          headersList.get('x-real-ip') ??
          headersList.get('cf-connecting-ip') ??
          '127.0.0.1';
      }

      if (!userAgent) {
        userAgent = headersList.get('user-agent') ?? 'Browser';
      }

      // Check Supabase session first
      const profile = await getUserProfile();
      if (profile) {
        email = profile.email;
        name = profile.name ?? 'Rajiv Ranjan Singh';
        role = profile.role;
      } else {
        // Check admin session cookie
        const adminSession = cookieStore.get('civilspage_admin_session')?.value;
        if (adminSession) {
          email = 'rajivranjansingh@civilspage.com';
          name = 'Rajiv Ranjan Singh';
          role = 'super_admin';
        }
      }
    } catch {
      // Background or API context
    }

    if (!email) {
      email = 'rajivranjansingh@civilspage.com';
      name = 'Rajiv Ranjan Singh';
      role = 'super_admin';
    }

    await db.insert(auditLogs).values({
      userEmail: email,
      userName: name ?? 'Rajiv Ranjan Singh',
      userRole: role ?? 'super_admin',
      action: options.action,
      resourceType: options.resourceType,
      resourceId: options.resourceId ?? null,
      resourceTitle: options.resourceTitle ?? null,
      ipAddress: ip || '127.0.0.1',
      userAgent: userAgent || 'Admin Console',
      metadata: options.metadata ?? null,
    });
  } catch (err) {
    console.error('[Audit] Failed to log action:', err);
  }
}

/**
 * Fetch audit logs for the admin page.
 */
export async function getAuditLogs(limit = 200, resourceType?: string) {
  const { desc, eq } = await import('drizzle-orm');

  const query = db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);

  return resourceType
    ? query.where(eq(auditLogs.resourceType, resourceType))
    : query;
}

export { actionLabel, actionColor } from '@/lib/audit-helpers';
