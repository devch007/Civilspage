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
    'pyq.created': 'Uploaded PYQ PDF',
    'pyq.updated': 'Updated PYQ PDF',
    'pyq.deleted': 'Deleted PYQ PDF',
    'mock_test.created': 'Uploaded Mock Test PDF',
    'mock_test.updated': 'Updated Mock Test PDF',
    'mock_test.deleted': 'Deleted Mock Test PDF',
    'model_answer.created': 'Uploaded Model Answer PDF',
    'model_answer.updated': 'Updated Model Answer PDF',
    'model_answer.deleted': 'Deleted Model Answer PDF',
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
    'settings.updated': 'Updated Settings',
  };
  return labels[action] ?? action;
}

export function actionColor(action: string): string {
  if (action.includes('deleted') || action.includes('rejected')) return 'bg-red-50 text-red-700 border border-red-200';
  if (action.includes('created') || action.includes('uploaded') || action.includes('invited')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (action.includes('published') || action.includes('activated') || action.includes('approved') || action.includes('login')) return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
  if (action.includes('updated') || action.includes('changed')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-slate-100 text-slate-600 border border-slate-200';
}
