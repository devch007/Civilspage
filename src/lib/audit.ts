import { headers } from 'next/headers';
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
  | 'auth.login' | 'auth.logout';

export interface AuditOptions {
  action: AuditAction;
  resourceType: string;
  resourceId?: string;
  resourceTitle?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Call this inside any Server Action to record the action.
 * Captures user info from session, IP from request headers.
 * Never throws — audit failures are silent to not block main flow.
 */
export async function logAudit(options: AuditOptions): Promise<void> {
  try {
    const [headersList, userProfile] = await Promise.all([
      headers(),
      getUserProfile(),
    ]);

    if (!userProfile) return; // Not authenticated — skip

    // Best-effort IP extraction
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      headersList.get('cf-connecting-ip') ?? // Cloudflare
      'unknown';

    const userAgent = headersList.get('user-agent') ?? 'unknown';

    await db.insert(auditLogs).values({
      userId: userProfile.id,
      userEmail: userProfile.email,
      userName: userProfile.name ?? null,
      userRole: userProfile.role,
      action: options.action,
      resourceType: options.resourceType,
      resourceId: options.resourceId ?? null,
      resourceTitle: options.resourceTitle ?? null,
      ipAddress: ip,
      userAgent,
      metadata: options.metadata ?? null,
    });
  } catch (err) {
    // Silent fail — audit must never block the main operation
    console.error('[Audit] Failed to log action:', err);
  }
}

/**
 * Fetch audit logs for the admin page.
 */
export async function getAuditLogs(limit = 100, resourceType?: string) {
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

/**
 * Human-readable label for an action.
 */
export function actionLabel(action: string): string {
  const labels: Record<string, string> = {
    'blog.created': 'Created Blog',
    'blog.updated': 'Updated Blog',
    'blog.deleted': 'Deleted Blog',
    'blog.published': 'Published Blog',
    'blog.unpublished': 'Unpublished Blog',
    'current_affair.created': 'Added Current Affair',
    'current_affair.updated': 'Updated Current Affair',
    'current_affair.deleted': 'Deleted Current Affair',
    'note.uploaded': 'Uploaded Note',
    'note.deleted': 'Deleted Note',
    'course.created': 'Created Course',
    'course.updated': 'Updated Course',
    'course.deleted': 'Deleted Course',
    'lesson.created': 'Added Lesson',
    'lesson.deleted': 'Deleted Lesson',
    'pyq.created': 'Added PYQ',
    'pyq.updated': 'Updated PYQ',
    'pyq.deleted': 'Deleted PYQ',
    'quiz.created': 'Added Quiz Question',
    'quiz.deleted': 'Deleted Quiz Question',
    'quiz.activated': 'Activated Quiz Question',
    'quiz.deactivated': 'Deactivated Quiz Question',
    'category.created': 'Created Category',
    'category.deleted': 'Deleted Category',
    'tag.created': 'Created Tag',
    'tag.deleted': 'Deleted Tag',
    'comment.approved': 'Approved Comment',
    'comment.rejected': 'Rejected Comment',
    'user.role_changed': 'Changed User Role',
    'user.invited': 'Invited User',
    'user.deleted': 'Deleted User',
    'file.uploaded': 'Uploaded File to R2',
    'file.deleted': 'Deleted File from R2',
    'auth.login': 'Logged In',
    'auth.logout': 'Logged Out',
  };
  return labels[action] ?? action;
}

/**
 * Color class for action badges.
 */
export function actionColor(action: string): string {
  if (action.includes('deleted') || action.includes('rejected')) return 'bg-red-50 text-red-700';
  if (action.includes('created') || action.includes('uploaded') || action.includes('invited')) return 'bg-emerald-50 text-emerald-700';
  if (action.includes('published') || action.includes('activated') || action.includes('approved')) return 'bg-indigo-50 text-indigo-700';
  if (action.includes('updated') || action.includes('changed')) return 'bg-amber-50 text-amber-700';
  return 'bg-slate-100 text-slate-600';
}
