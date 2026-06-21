const BLOCK_COLOR = {
  emerald: "bg-emerald-100 border-emerald-300 text-emerald-800",
  blue: "bg-blue-100 border-blue-300 text-blue-800",
  violet: "bg-violet-100 border-violet-300 text-violet-800",
  amber: "bg-amber-100 border-amber-300 text-amber-800",
  pink: "bg-pink-100 border-pink-300 text-pink-800",
};

export default function WeekCalendar({ days, slots, sessions, onSessionClick, highlightDay, compact = false }) {
  const byKey = {};
  sessions.forEach((s) => { byKey[`${s.day}-${s.time}`] = s; });

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[640px]" style={{ gridTemplateColumns: `56px repeat(${days.length}, 1fr)` }}>
        <div />
        {days.map((d) => (
          <div key={d.fullDay} className="pb-2 text-center">
            <p className="text-xs font-semibold text-slate-500">{d.label}</p>
            {d.dateLabel && (
              <span className={`mt-1 inline-grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${highlightDay === d.label ? "bg-violet-600 text-white" : "text-slate-700"}`}>
                {d.dateLabel}
              </span>
            )}
          </div>
        ))}
        {slots.map((s) => (
          <div key={s} className="contents">
            <div className={`flex items-center justify-end pr-2 text-[11px] text-slate-400 ${compact ? "h-12" : "h-16"}`}>{s}</div>
            {days.map((d) => {
              const session = byKey[`${d.fullDay}-${s}`];
              return (
                <div key={`${d.fullDay}-${s}`} className={`border-t border-slate-100 p-1 ${compact ? "h-12" : "h-16"}`}>
                  {session ? (
                    <button onClick={() => onSessionClick && onSessionClick(session)}
                      className={`flex h-full w-full flex-col items-start justify-center gap-0.5 rounded-lg border px-2 py-1 text-left text-[11px] font-medium transition hover:opacity-80 ${BLOCK_COLOR[session.color] || BLOCK_COLOR.violet}`}>
                      <span className="truncate font-semibold">{session.name}</span>
                      <span className="truncate text-[10px] opacity-80">{session.room}</span>
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
