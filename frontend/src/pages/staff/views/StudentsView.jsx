import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import Avatar from "../components/Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

export default function StudentsView({ students, onSelect }) {
  const [query, setQuery] = useState("");
  const filtered = students.filter((s) =>
    !query.trim() || s.name.toLowerCase().includes(query.toLowerCase()) || s.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Students</h1>
      <p className="mt-1 text-sm text-slate-500">Every student you supervise or second-mark this viva period.</p>

      <div className="relative mt-5 max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or course…"
          className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100" />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">No students match "{query}".</div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <button key={s.id} onClick={() => onSelect(s)}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
              <div className="flex items-center gap-3">
                <Avatar name={s.name} idx={i} size="h-11 w-11 text-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{s.name}</p>
                  <p className="truncate text-xs text-slate-400">{s.course}</p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-slate-300" />
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{s.project}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">{s.role === "supervisor" ? "You supervise" : "You second-mark"}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[s.status]}`}>
                  {s.status === "Awaiting availability" ? "Awaiting" : s.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
