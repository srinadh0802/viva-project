import { useState } from "react";
import { Check, Save } from "lucide-react";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-violet-600" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsView() {
  const [profile, setProfile] = useState({ name: "Srinadh Darla", email: "staff@viva.com", department: "School of Computing", office: "ATT-305" });
  const [prefs, setPrefs] = useState({ emailNotifs: true, slotReminders: true, weeklyDigest: false });
  const [saved, setSaved] = useState(false);

  const update = (key, value) => { setSaved(false); setProfile((p) => ({ ...p, [key]: value })); };
  const togglePref = (key) => { setSaved(false); setPrefs((p) => ({ ...p, [key]: !p[key] })); };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Manage your profile and notification preferences.</p>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">Profile</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-slate-500">Full name</label>
            <input value={profile.name} onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email address</label>
            <input value={profile.email} onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Department</label>
            <input value={profile.department} onChange={(e) => update("department", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Office</label>
            <input value={profile.office} onChange={(e) => update("office", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">Notification preferences</h2>
        <div className="mt-3 space-y-3">
          {[
            { key: "emailNotifs", label: "Email me when a slot is proposed or confirmed" },
            { key: "slotReminders", label: "Remind me about upcoming vivas the day before" },
            { key: "weeklyDigest", label: "Send a weekly summary digest" },
          ].map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
              <span className="text-sm text-slate-700">{row.label}</span>
              <Toggle on={prefs[row.key]} onChange={() => togglePref(row.key)} />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 flex items-center gap-3">
        <button onClick={() => setSaved(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800">
          <Save size={16} /> Save changes
        </button>
        {saved && <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600"><Check size={15} /> Saved.</span>}
      </div>
    </div>
  );
}
