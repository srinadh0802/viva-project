import { ChevronRight } from "lucide-react";
import Avatar from "./Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const TINTS = {
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-blue-100 text-blue-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
};

export default function KpiListCard({ icon: Icon, tint, label, sub, value, items, onSelect, emptyHint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex gap-5">
        <div className="flex w-28 shrink-0 flex-col justify-between">
          <span className={`grid h-9 w-9 place-items-center rounded-lg ${TINTS[tint]}`}><Icon size={18} /></span>
          <div>
            <p className="text-4xl font-bold tracking-tight" style={DISPLAY}>{value}</p>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{sub}</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 border-l border-slate-100 pl-4">
          {items.length === 0 ? (
            <p className="py-4 text-xs leading-relaxed text-slate-400">{emptyHint}</p>
          ) : (
            <ul className="max-h-44 list-none space-y-1.5 overflow-y-auto pr-1">
              {items.map((it, i) => (
                <li key={it.id}>
                  <button onClick={() => onSelect(it)}
                    className="flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
                    <Avatar name={it.name} idx={i} size="h-8 w-8 text-[11px]" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800">{it.name}</span>
                      <span className="block truncate text-[11px] text-slate-400">{it.course}</span>
                    </span>
                    <span className={`hidden rounded-full px-2 py-0.5 text-[10px] font-semibold sm:inline ${STATUS_STYLE[it.status]}`}>
                      {it.status === "Awaiting availability" ? "Awaiting" : it.status}
                    </span>
                    <ChevronRight size={15} className="shrink-0 text-slate-300" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
