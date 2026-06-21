import { useState } from "react";
import {
  LayoutDashboard, CalendarClock, Users, ClipboardCheck, CalendarDays,
  ListChecks, GraduationCap, UserCog, Bell, BarChart3, Calendar,
  MessageSquare, Settings, Plus, ChevronDown, ChevronRight,
} from "lucide-react";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "availability", label: "My Availability", icon: CalendarClock },
  { key: "supervisor", label: "Supervisor Duties", icon: Users },
  { key: "marker", label: "Second Marker Duties", icon: ClipboardCheck },
  { key: "timetable", label: "Timetable", icon: CalendarDays },
  { key: "sessions", label: "Viva Sessions", icon: ListChecks },
  { key: "students", label: "Students", icon: GraduationCap },
  { key: "examiners", label: "Examiners", icon: UserCog },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "settings", label: "Settings", icon: Settings },
];

const QUICK_ACTIONS = [
  { key: "availability", label: "Add Availability" },
  { key: "timetable", label: "Schedule Viva" },
  { key: "reports", label: "Upload Report" },
  { key: "reports", label: "Generate Report" },
];

export default function Sidebar({ active, onNavigate, unreadCount = 0 }) {
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="thin-scroll flex-1 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const on = active === key;
            return (
              <button key={key} onClick={() => onNavigate(key)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300
                  ${on ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon size={17} className={on ? "text-violet-600" : "text-slate-400"} />
                <span className="flex-1">{label}</span>
                {key === "notifications" && unreadCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{unreadCount}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative border-t border-slate-100 p-4">
        <button onClick={() => setQuickOpen((o) => !o)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800">
          <Plus size={16} /> Quick Actions <ChevronDown size={14} className={`transition ${quickOpen ? "rotate-180" : ""}`} />
        </button>

        {quickOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setQuickOpen(false)} />
            <div className="absolute bottom-full left-4 right-4 z-40 mb-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              {QUICK_ACTIONS.map((a, i) => (
                <button key={i} onClick={() => { onNavigate(a.key); setQuickOpen(false); }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-violet-50">
                  {a.label} <ChevronRight size={14} className="text-slate-300" />
                </button>
              ))}
            </div>
          </>
        )}

        <button onClick={() => onNavigate("settings")} className="mt-3 flex w-full items-center gap-2.5 rounded-xl p-1.5 text-left transition hover:bg-slate-50">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">SR</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-slate-800" style={DISPLAY}>Srinadh</span>
            <span className="block truncate text-[11px] text-slate-400">Supervisor</span>
          </span>
          <ChevronRight size={15} className="shrink-0 text-slate-300" />
        </button>
      </div>
    </aside>
  );
}
