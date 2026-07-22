export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage portal configuration</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Portal Info</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Portal Name</label>
          <input defaultValue="CivilsPage UPSC Academy" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Support Email</label>
          <input defaultValue="rajivranjansingh@civilspage.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Supabase Project</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400 font-medium mb-1">Project URL</p>
            <p className="font-mono text-slate-700 text-xs break-all">aqczscppwjibyxaymdym.supabase.co</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
            <p className="text-emerald-700 font-semibold text-xs">✓ Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
