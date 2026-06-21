import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Bell, ChevronDown, LogOut, Settings as SettingsIcon, X } from "lucide-react";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const NOTIF_DOT = { emerald: "bg-emerald-500", violet: "bg-violet-500", amber: "bg-amber-500", blue: "bg-blue-500" };

export default function Topbar({
  query, onQueryChange, results, onResultClick,
  notifications, unreadCount, onOpenNotifications, onMarkAllRead,
  onNavigate,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-700 font-bold text-white" style={DISPLAY}>VCS</div>
        <p className="hidden text-sm font-semibold text-slate-800 sm:block" style={DISPLAY}>Viva Coordination System</p>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search students, sessions, duties…"
          className="w-full rounded-full border border-transparent bg-slate-100 py-2 pl-10 pr-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100" />
        {query && (
          <button onClick={() => onQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>
        )}

        {query && (
          <div className="thin-scroll absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {results.length === 0 ? (
              <p className="p-3 text-center text-xs text-slate-400">No matches for "{query}"</p>
            ) : results.map((r) => (
              <button key={r.id} onClick={() => { onResultClick(r); onQueryChange(""); }}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-violet-50">
                <span className="min-w-0">
                  <span className="block truncate font-medium text-slate-800">{r.label}</span>
                  <span className="block truncate text-xs text-slate-400">{r.sublabel}</span>
                </span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{r.kind}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-violet-700 px-3 py-1.5 text-[11px] font-medium text-white sm:inline-flex">
          <Sparkles size={13} /> Viva Period: 22 Sep – 3 Oct
        </span>

        <div className="relative">
          <button onClick={() => { setNotifOpen((o) => !o); onMarkAllRead(); }}
            className="relative grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200">
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-xs font-semibold text-slate-700">Notifications</span>
                  <button onClick={() => { setNotifOpen(false); onOpenNotifications(); }} className="text-[11px] font-medium text-violet-600 hover:underline">View all</button>
                </div>
                <ul className="thin-scroll max-h-72 list-none space-y-1 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <li key={n.id} className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50">
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${NOTIF_DOT[n.tone]}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs leading-relaxed text-slate-700">{n.text}</span>
                        <span className="mt-0.5 block text-[10px] text-slate-400">{n.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-slate-100">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">SR</span>
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-semibold leading-tight text-slate-800">Srinadh</span>
              <span className="block text-[10px] leading-tight text-slate-400">Supervisor</span>
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-40 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                <button onClick={() => { setProfileOpen(false); onNavigate("settings"); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                  <SettingsIcon size={15} /> Settings
                </button>
                <button onClick={() => navigate("/login")}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
