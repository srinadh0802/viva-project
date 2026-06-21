import { useState } from "react";
import { ChevronRight, Link2 } from "lucide-react";
import Avatar from "../components/Avatar";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const DOT_COLOR = {
  emerald: "bg-emerald-500", blue: "bg-blue-500", violet: "bg-violet-500", amber: "bg-amber-500", pink: "bg-pink-500", slate: "bg-slate-300",
};

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildMonth(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndex, d));
  return cells;
}

function dayLabel(date) {
  return `${WEEKDAY_SHORT[date.getDay()]} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;
}

export default function CalendarView({ students, onSelect }) {
  const cells = buildMonth(2025, 8); // September 2025
  const [picked, setPicked] = useState(new Date(2025, 8, 24));

  const sessionsOn = (date) => (date ? students.filter((s) => s.day === dayLabel(date)) : []);
  const pickedSessions = sessionsOn(picked);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Calendar</h1>
          <p className="mt-1 text-sm text-slate-500">September 2025 — all your supervised and second-marker vivas.</p>
        </div>
        <button onClick={() => alert("Outlook Calendar sync is an optional integration (see project spec, D1) — not part of this prototype's core scheduling MVP.")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
          <Link2 size={13} /> Sync with Outlook
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold text-slate-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (<div key={d}>{d}</div>))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const sessions = sessionsOn(date);
              const isPicked = date.toDateString() === picked.toDateString();
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return (
                <button key={i} onClick={() => setPicked(date)}
                  className={`flex h-16 flex-col items-center justify-center gap-1 rounded-lg border text-sm transition
                    ${isPicked ? "border-violet-400 bg-violet-50" : "border-slate-100 hover:border-violet-200"}
                    ${isWeekend ? "text-slate-300" : "text-slate-700"}`}>
                  <span className="font-medium">{date.getDate()}</span>
                  <div className="flex h-1.5 items-center gap-0.5">
                    {sessions.slice(0, 3).map((s) => (<span key={s.id} className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[s.color]}`} />))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">{picked.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long" })}</h2>
          <div className="mt-3 space-y-2">
            {pickedSessions.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 text-center text-xs text-slate-400">No vivas on this date.</p>
            ) : pickedSessions.map((s, i) => (
              <button key={s.id} onClick={() => onSelect(s)}
                className="flex w-full items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-left transition hover:bg-violet-50">
                <Avatar name={s.name} idx={i} size="h-8 w-8 text-[11px]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-slate-800">{s.name}</span>
                  <span className="block truncate text-[11px] text-slate-400">{s.time} · {s.room}</span>
                </span>
                <ChevronRight size={14} className="shrink-0 text-slate-300" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
