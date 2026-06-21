import { useState } from "react";
import { Check, ChevronRight, MapPin } from "lucide-react";
import Avatar from "../components/Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const WEEK_DAYS = [
  { label: "Mon 22 Sep", short: "Mon" }, { label: "Tue 23 Sep", short: "Tue" }, { label: "Wed 24 Sep", short: "Wed" },
  { label: "Thu 25 Sep", short: "Thu" }, { label: "Fri 26 Sep", short: "Fri" },
];
const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const BLOCK_COLOR = {
  emerald: "bg-emerald-100 border-emerald-300 text-emerald-800", blue: "bg-blue-100 border-blue-300 text-blue-800",
  violet: "bg-violet-100 border-violet-300 text-violet-800", amber: "bg-amber-100 border-amber-300 text-amber-800",
  pink: "bg-pink-100 border-pink-300 text-pink-800",
};

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
      <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded border bg-white border-slate-200" /> Free</span>
      <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded border bg-violet-100 border-violet-300" /> Booked</span>
      <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded border bg-violet-500 border-violet-600" /> Selected</span>
    </div>
  );
}

function WeekTab({ all, onSelect, onReschedule }) {
  const [moving, setMoving] = useState(null);
  const [toast, setToast] = useState("");
  const sessions = all.filter((s) => s.day !== "—");
  const byKey = {};
  sessions.forEach((s) => { byKey[`${s.day}-${s.time}`] = s; });

  const handleClick = (day, time) => {
    const key = `${day}-${time}`;
    const session = byKey[key];

    if (moving) {
      if (session && session.id === moving.id) { setMoving(null); return; }
      if (session) return;
      onReschedule(moving.id, day, time);
      setToast(`Moved ${moving.name}'s viva to ${day} · ${time}.`);
      setMoving(null);
      return;
    }
    if (session) setMoving(session);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Click a booked viva, then click a free slot to move it.</p>
        <Legend />
      </div>

      {moving && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-xs text-violet-800">
          <span>Rescheduling <strong>{moving.name}</strong>'s viva — pick a free slot, or click it again to cancel.</span>
          <button onClick={() => setMoving(null)} className="shrink-0 rounded-lg bg-white px-2.5 py-1 font-semibold text-violet-700 shadow-sm hover:bg-violet-100">Cancel</button>
        </div>
      )}
      {!moving && toast && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs font-medium text-emerald-700">
          <Check size={14} /> {toast}
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <div className="grid min-w-[640px]" style={{ gridTemplateColumns: `64px repeat(${WEEK_DAYS.length}, 1fr)` }}>
          <div />
          {WEEK_DAYS.map((d) => (<div key={d.short} className="pb-2 text-center text-xs font-semibold text-slate-500">{d.short}</div>))}
          {HOURS.map((h) => (
            <div className="contents" key={h}>
              <div className="flex h-14 items-center justify-end pr-2 text-[11px] text-slate-400">{h}</div>
              {WEEK_DAYS.map((d) => {
                const key = `${d.label}-${h}`;
                const session = byKey[key];
                const isSource = moving && moving.id === session?.id;
                const isTarget = moving && !session;
                return (
                  <div key={key} className="border-t border-slate-100 p-1">
                    {session ? (
                      <button onClick={() => handleClick(d.label, h)}
                        className={`flex h-12 w-full flex-col items-start justify-center gap-0.5 rounded-lg border px-2 py-1 text-left text-[11px] font-medium transition hover:opacity-80 ${BLOCK_COLOR[session.color] || BLOCK_COLOR.violet} ${isSource ? "ring-2 ring-violet-500" : ""}`}>
                        <span className="truncate font-semibold">{session.name}</span>
                        <span className="truncate text-[10px] opacity-80">{session.room}</span>
                      </button>
                    ) : (
                      <button onClick={() => handleClick(d.label, h)} disabled={!isTarget}
                        className={`h-12 w-full rounded-lg border border-dashed transition ${isTarget ? "border-violet-400 bg-violet-50 hover:bg-violet-100" : "border-transparent"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DayTab({ all, onSelect }) {
  const [day, setDay] = useState(WEEK_DAYS[2].label);
  const sessions = all.filter((s) => s.day === day).sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {WEEK_DAYS.map((d) => (
          <button key={d.label} onClick={() => setDay(d.label)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${day === d.label ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {d.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center text-sm text-slate-400">No vivas scheduled on {day}.</div>
        ) : sessions.map((s, i) => (
          <button key={s.id} onClick={() => onSelect(s)}
            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-violet-200 hover:shadow-sm">
            <span className="w-16 shrink-0 text-sm font-semibold text-violet-700">{s.time}</span>
            <Avatar name={s.name} idx={i} size="h-9 w-9 text-xs" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
              <p className="truncate text-xs text-slate-400">{s.project}</p>
            </div>
            <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex"><MapPin size={12} /> {s.room}</span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[s.status]}`}>{s.status === "Awaiting availability" ? "Awaiting" : s.status}</span>
            <ChevronRight size={15} className="shrink-0 text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
}

function MonthTab({ all, onSelect }) {
  const dates = [
    { date: 22, day: "Mon 22 Sep" }, { date: 23, day: "Tue 23 Sep" }, { date: 24, day: "Wed 24 Sep" },
    { date: 25, day: "Thu 25 Sep" }, { date: 26, day: "Fri 26 Sep" }, { date: 29, day: "Mon 29 Sep" },
    { date: 30, day: "Tue 30 Sep" }, { date: 1, day: "Wed 01 Oct" }, { date: 2, day: "Thu 02 Oct" }, { date: 3, day: "Fri 03 Oct" },
  ];
  const [picked, setPicked] = useState("Wed 24 Sep");
  const sessionsFor = (day) => all.filter((s) => s.day === day);
  const pickedSessions = sessionsFor(picked);

  return (
    <div>
      <p className="text-xs text-slate-400">Viva period: 22 Sep – 3 Oct. Click a date to see that day's sessions.</p>
      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {dates.map((d) => {
          const sessions = sessionsFor(d.day);
          return (
            <button key={d.day} onClick={() => setPicked(d.day)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition ${picked === d.day ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-200"}`}>
              <span className="text-sm font-semibold text-slate-800">{d.date}</span>
              <div className="flex h-2 items-center gap-0.5">
                {sessions.slice(0, 3).map((s) => (<span key={s.id} className={`h-1.5 w-1.5 rounded-full ${BLOCK_COLOR[s.color]?.split(" ")[0].replace("100", "500") || "bg-violet-500"}`} />))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2">
        {pickedSessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center text-sm text-slate-400">No vivas scheduled on {picked}.</div>
        ) : pickedSessions.map((s, i) => (
          <button key={s.id} onClick={() => onSelect(s)}
            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-violet-200 hover:shadow-sm">
            <span className="w-16 shrink-0 text-sm font-semibold text-violet-700">{s.time}</span>
            <Avatar name={s.name} idx={i} size="h-9 w-9 text-xs" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
              <p className="truncate text-xs text-slate-400">{s.room}</p>
            </div>
            <ChevronRight size={15} className="shrink-0 text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TimetableView({ supervised, marking, onSelect, onReschedule }) {
  const [tab, setTab] = useState("week");
  const all = [...supervised, ...marking];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Timetable</h1>
          <p className="mt-1 text-sm text-slate-500">Your confirmed vivas and availability for the period.</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {["day", "week", "month"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 capitalize transition ${tab === t ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:bg-white/60"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {tab === "week" && <WeekTab all={all} onSelect={onSelect} onReschedule={onReschedule} />}
        {tab === "day" && <DayTab all={all} onSelect={onSelect} />}
        {tab === "month" && <MonthTab all={all} onSelect={onSelect} />}
      </section>
    </div>
  );
}
