import { useState } from "react";
import { CalendarClock, CalendarDays, Clock, Plus, Check, AlertTriangle, CalendarPlus, Eye } from "lucide-react";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const HOURS = Array.from({ length: 11 }, (_, i) => `${String(8 + i).padStart(2, "0")}:00`); // 08:00–18:00
const FROM_OPTS = HOURS.slice(0, -1);
const TO_OPTS = HOURS.slice(1);

function periodDates(start, count) {
  const out = [];
  const d = new Date(start);
  for (let i = 0; i < count; i++) {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    const dow = dd.getDay();
    if (dow !== 0 && dow !== 6) out.push(dd);
  }
  return out;
}
function fmtDate(d) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
}
function isoDate(d) { return d.toISOString().slice(0, 10); }
const slotCount = (from, to) => Math.max(0, parseInt(to) - parseInt(from));

function TimeSelect({ value, options, onChange, disabled }) {
  return (
    <select value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border px-2.5 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-100
        ${disabled ? "border-slate-100 bg-slate-50 text-slate-300" : "border-slate-200 bg-white text-slate-800 focus:border-violet-400"}`}>
      {options.map((o) => (<option key={o} value={o}>{o}</option>))}
    </select>
  );
}

export default function AvailabilityView() {
  const dates = periodDates(new Date(2025, 8, 22), 12);
  const [rows, setRows] = useState(() =>
    dates.map((d, i) => ({
      iso: isoDate(d), label: fmtDate(d),
      on: i !== 2 && i !== 7,
      from: i === 1 ? "11:00" : "09:00", to: "17:00",
    }))
  );
  const [newDate, setNewDate] = useState("");
  const [saved, setSaved] = useState(false);

  const update = (i, patch) => { setSaved(false); setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row))); };
  const addDate = () => {
    if (!newDate || rows.some((r) => r.iso === newDate)) return;
    const d = new Date(newDate + "T00:00:00");
    const next = [...rows, { iso: newDate, label: fmtDate(d), on: true, from: "09:00", to: "17:00" }]
      .sort((a, b) => a.iso.localeCompare(b.iso));
    setRows(next); setNewDate(""); setSaved(false);
  };

  const activeRows = rows.filter((r) => r.on && slotCount(r.from, r.to) > 0);
  const totalSlots = activeRows.reduce((s, r) => s + slotCount(r.from, r.to), 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>My Availability</h1>
          <p className="mt-1 text-sm text-slate-500">Pick the dates and times you can attend vivas. The scheduler only places you inside these windows.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="text-center">
            <p className="text-xl font-bold leading-none text-violet-700" style={DISPLAY}>{activeRows.length}</p>
            <p className="text-[10px] text-slate-400">dates</p>
          </div>
          <span className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-xl font-bold leading-none text-violet-700" style={DISPLAY}>{totalSlots}</p>
            <p className="text-[10px] text-slate-400">slots</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-xs text-violet-800">
        <Clock size={15} className="mt-0.5 shrink-0" />
        <p>Each viva lasts <strong>1 hour</strong>, so slots are generated on the hour. A 09:00–17:00 window gives 8 possible viva slots that day.</p>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 p-5">
          <CalendarClock size={18} className="text-violet-600" />
          <h2 className="text-lg font-semibold" style={DISPLAY}>Available dates this period</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map((row, i) => {
            const n = slotCount(row.from, row.to);
            const bad = row.on && n <= 0;
            return (
              <div key={row.iso} className={`flex flex-wrap items-center gap-4 px-5 py-3.5 transition ${row.on ? "" : "opacity-60"}`}>
                <button onClick={() => update(i, { on: !row.on })}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${row.on ? "bg-violet-600" : "bg-slate-300"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${row.on ? "left-[22px]" : "left-0.5"}`} />
                </button>

                <div className="flex w-32 items-center gap-2">
                  <CalendarDays size={15} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-800">{row.label}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <label className="text-xs text-slate-400">From</label>
                  <TimeSelect value={row.from} options={FROM_OPTS} disabled={!row.on} onChange={(v) => update(i, { from: v })} />
                  <label className="text-xs text-slate-400">to</label>
                  <TimeSelect value={row.to} options={TO_OPTS} disabled={!row.on} onChange={(v) => update(i, { to: v })} />
                </div>

                {row.on ? (
                  bad ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
                      <AlertTriangle size={12} /> End must be after start
                    </span>
                  ) : (
                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">{n} slots</span>
                  )
                ) : (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-400">Unavailable</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4">
          <CalendarPlus size={16} className="text-violet-600" />
          <span className="text-sm text-slate-600">Add another date:</span>
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          <button onClick={addDate} disabled={!newDate}
            className="inline-flex items-center gap-1 rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:bg-slate-200 disabled:text-slate-400">
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 p-5">
          <button onClick={() => setSaved(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
            <Check size={16} /> Save availability
          </button>
          {saved
            ? <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600"><Check size={15} /> Saved — the scheduler will use these slots.</span>
            : <span className="text-sm text-slate-400">Changes apply the next time the coordinator runs the scheduler.</span>}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-violet-600" />
          <h2 className="text-lg font-semibold" style={DISPLAY}>What the scheduler sees</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">Only these date and time windows are offered to the scheduling engine.</p>
        {activeRows.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-400">
            No availability set. Turn on at least one date so the scheduler can place your vivas.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {activeRows.map((r) => (
              <div key={r.iso} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-center">
                <p className="text-sm font-semibold text-slate-800">{r.label}</p>
                <p className="mt-1 text-xs text-violet-700">{r.from} – {r.to}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{slotCount(r.from, r.to)} × 1h slots</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
