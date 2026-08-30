import postgres from 'postgres';
import SettingsClient from './_components/SettingsClient';
import { Settings as SettingsIcon } from 'lucide-react';

export default async function SettingsPage() {
  let stats = {
    pyqs: 0,
    mocks: 0,
    modelAnswers: 0,
    currentAffairs: 0,
    auditLogs: 0,
  };

  try {
    const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
    const [p, m, a, c, l] = await Promise.all([
      sql`SELECT COUNT(*)::int as count FROM pyq_pdfs`.catch(() => [{ count: 0 }]),
      sql`SELECT COUNT(*)::int as count FROM mock_test_pdfs`.catch(() => [{ count: 0 }]),
      sql`SELECT COUNT(*)::int as count FROM model_answer_pdfs`.catch(() => [{ count: 0 }]),
      sql`SELECT COUNT(*)::int as count FROM current_affairs`.catch(() => [{ count: 0 }]),
      sql`SELECT COUNT(*)::int as count FROM audit_logs`.catch(() => [{ count: 0 }]),
    ]);

    stats = {
      pyqs: p[0]?.count || 0,
      mocks: m[0]?.count || 0,
      modelAnswers: a[0]?.count || 0,
      currentAffairs: c[0]?.count || 0,
      auditLogs: l[0]?.count || 0,
    };
  } catch (err) {
    console.error('Failed to fetch settings diagnostics:', err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-indigo-600" />
          <span>System &amp; Portal Settings</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage administrator profile, security credentials, Cloudflare R2 storage, and database services.
        </p>
      </div>

      <SettingsClient stats={stats} />
    </div>
  );
}
