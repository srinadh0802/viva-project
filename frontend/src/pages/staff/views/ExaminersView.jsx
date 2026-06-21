import { Building2, MapPin } from "lucide-react";
import Avatar from "../components/Avatar";
import { EXAMINERS } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

export default function ExaminersView({ students }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Examiners</h1>
      <p className="mt-1 text-sm text-slate-500">Colleagues you're paired with as supervisor or second marker this period.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMINERS.map((ex, i) => {
          const shared = students.filter((s) => s.supervisor === ex.name || s.marker === ex.name);
          return (
            <div key={ex.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <Avatar name={ex.name} idx={i} size="h-11 w-11 text-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{ex.name}</p>
                  <p className="truncate text-xs text-slate-400">{ex.role}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <p className="flex items-center gap-1.5"><Building2 size={12} /> {ex.department}</p>
                <p className="flex items-center gap-1.5"><MapPin size={12} /> {ex.office}</p>
              </div>
              {shared.length > 0 && (
                <div className="mt-3 border-t border-slate-100 pt-2.5">
                  <p className="text-[11px] font-medium text-slate-400">Shared vivas</p>
                  <p className="mt-1 truncate text-xs text-slate-600">{shared.map((s) => s.name).join(", ")}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
