import { useState } from "react";
import { Check, CheckCheck } from "lucide-react";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const NOTIF_DOT = { emerald: "bg-emerald-500", violet: "bg-violet-500", amber: "bg-amber-500", blue: "bg-blue-500" };

export default function NotificationsView({ notifications, setNotifications }) {
  const [filter, setFilter] = useState("all");
  const visible = notifications.filter((n) => (filter === "unread" ? !n.read : true));

  const markRead = (id) => setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setNotifications((list) => list.map((n) => ({ ...n, read: true })));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">Updates about your viva sessions, confirmations and reminders.</p>
        </div>
        <button onClick={markAllRead} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
          <CheckCheck size={14} /> Mark all as read
        </button>
      </div>

      <div className="mt-4 flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-sm font-medium w-fit">
        {[{ key: "all", label: "All" }, { key: "unread", label: "Unread" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`rounded-md px-3 py-1.5 transition ${filter === f.key ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:bg-white/60"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {visible.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">You're all caught up.</div>
        ) : (
          <ul className="list-none divide-y divide-slate-100">
            {visible.map((n) => (
              <li key={n.id} className={`flex items-start gap-3 p-4 ${n.read ? "" : "bg-violet-50/30"}`}>
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${NOTIF_DOT[n.tone]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-slate-50">
                    <Check size={12} className="inline -mt-0.5 mr-1" />Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
