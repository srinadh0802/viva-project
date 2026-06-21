import { ChevronRight } from "lucide-react";
import Avatar from "../components/Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

export default function DutyView({ title, subtitle, students, onSelect }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      {students.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
          Nothing assigned yet.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {students.map((st, i) => (
            <button key={st.id} onClick={() => onSelect(st)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-violet-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
              <Avatar name={st.name} idx={i} size="h-11 w-11 text-sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800">{st.name}</p>
                <p className="truncate text-xs text-slate-400">{st.project}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[st.status]}`}>
                {st.status === "Awaiting availability" ? "Awaiting" : st.status}
              </span>
              <ChevronRight size={16} className="shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
