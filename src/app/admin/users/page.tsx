import { getAllUsers } from '@/services/user.service';
import { format } from 'date-fns';

export default async function UsersPage() {
  const users = await getAllUsers();

  const roleColors: Record<string, string> = {
    super_admin: 'bg-red-50 text-red-700',
    educator: 'bg-indigo-50 text-indigo-700',
    editor: 'bg-purple-50 text-purple-700',
    student: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 text-sm mt-1">{users.length} registered accounts</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">User</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Role</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-12 text-slate-400">No users yet.</td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{user.name || '—'}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${roleColors[user.role] || 'bg-slate-100 text-slate-500'}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">
                  {format(new Date(user.createdAt), 'dd MMM yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
