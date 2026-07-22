import { getComments } from '@/services/comment.service';
import { approveCommentAction, rejectCommentAction } from '@/actions/comment.actions';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default async function CommentsPage() {
  const all = await getComments();
  const pending = all.filter(c => !c.approved);
  const approved = all.filter(c => c.approved);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Comments Moderation</h1>
        <p className="text-slate-500 text-sm mt-1">
          <span className="text-amber-600 font-semibold">{pending.length} pending</span>
          {' '}· {approved.length} approved · {all.length} total
        </p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="bg-white border border-amber-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-50 flex items-center gap-2 bg-amber-50/40">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="font-semibold text-slate-800 text-sm">Pending Review ({pending.length})</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {pending.map((c) => (
              <div key={c.id} className="px-5 py-5">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900">{c.userName || c.userEmail || 'Unknown'}</span>
                      <span className="text-xs text-slate-400">on</span>
                      <span className="text-xs font-medium text-indigo-600 truncate max-w-[200px]">{c.blogTitle || 'Unknown Blog'}</span>
                      <span className="text-xs text-slate-400 ml-auto">{format(new Date(c.createdAt), 'dd MMM, h:mm a')}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-lg px-3 py-2.5">
                      {c.content}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <form action={async () => { 'use server'; await approveCommentAction(c.id); }}>
                      <button type="submit" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                    </form>
                    <form action={async () => { 'use server'; await rejectCommentAction(c.id); }}>
                      <button type="submit" className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 border border-red-100 transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <h2 className="font-semibold text-slate-800 text-sm">Approved ({approved.length})</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {approved.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No approved comments yet.</p>}
          {approved.map((c) => (
            <div key={c.id} className="px-5 py-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-medium text-slate-700">{c.userName || c.userEmail}</span>
                  <span className="text-xs text-slate-400">on</span>
                  <span className="text-xs text-indigo-500">{c.blogTitle}</span>
                  <span className="text-xs text-slate-300 ml-auto">{format(new Date(c.createdAt), 'dd MMM')}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{c.content}</p>
              </div>
              <form action={async () => { 'use server'; await rejectCommentAction(c.id); }}>
                <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-xs">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
