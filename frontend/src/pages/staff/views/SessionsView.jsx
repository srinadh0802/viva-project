import { useState } from "react";
import { ChevronRight, MapPin, CalendarDays } from "lucide-react";
import Avatar from "../components/Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const ROLE_FILTERS = [
  { key: "all", label: "All" },
  { key: "supervisor", label: "Supervisor" },
  { key: "marker", label: "Second marker" },
];
const STATUS_FILTERS = ["All statuses", "Scheduled", "Proposed", "Awaiting availability"];

export default function SessionsView({ students, onSelect }) {
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("All statuses");

  const filtered = students.filter((s) => {
    if (role !== "all" && s.role !== role) return false;
    if (status !== "All statuses" && s.status !== status) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Viva Sessions</h1>
      <p className="mt-1 text-sm text-slate-500">Every viva you're involved in, as supervisor or second marker.</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {ROLE_FILTERS.map((r) => (
            <button key={r.key} onClick={() => setRole(r.key)}
              className={`rounded-md px-3 py-1.5 transition ${role === r.key ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:bg-white/60"}`}>
              {r.label}
            </button>
          ))}
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-100">
          {STATUS_FILTERS.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>

      <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No sessions match these filters.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((s, i) => (
              <button key={s.id} onClick={() => onSelect(s)}
                className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-violet-50/50">
                <Avatar name={s.name} idx={i} size="h-10 w-10 text-xs" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                  <p className="truncate text-xs text-slate-400">{s.project}</p>
                </div>
                <span className="hidden w-28 shrink-0 text-xs font-medium text-slate-500 md:block">{s.role === "supervisor" ? "Supervisor" : "Second marker"}</span>
                <span className="hidden shrink-0 items-center gap-1 text-xs text-slate-500 sm:flex sm:w-36">
                  <CalendarDays size={12} /> {s.day === "—" ? "Not scheduled" : `${s.day} · ${s.time}`}
                </span>
                <span className="hidden shrink-0 items-center gap-1 text-xs text-slate-500 sm:flex sm:w-16">
                  <MapPin size={12} /> {s.room}
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[s.status]}`}>
                  {s.status === "Awaiting availability" ? "Awaiting" : s.status}
                </span>
                <ChevronRight size={15} className="shrink-0 text-slate-300" />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
