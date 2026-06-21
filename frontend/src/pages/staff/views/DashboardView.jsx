import {
  GraduationCap, ClipboardCheck, CalendarCheck2, CheckCircle2, AlertTriangle, Check,
  ChevronRight, FileText, UserPlus, CalendarDays, CalendarPlus, FileUp, BarChart3, Megaphone,
} from "lucide-react";
import KpiListCard from "../components/KpiListCard";
import DonutChart from "../components/DonutChart";
import WeekCalendar from "../components/WeekCalendar";
import Avatar from "../components/Avatar";
import { ANNOUNCEMENTS, ACTIVITY, COMPLETED, findClashes, TODAY_LABEL, DAY_ORDER, sortByWhen } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const ACTIVITY_ICON = {
  checkin: { icon: ClipboardCheck, tint: "bg-violet-100 text-violet-600" },
  approve: { icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-600" },
  schedule: { icon: CalendarDays, tint: "bg-pink-100 text-pink-600" },
  report: { icon: FileText, tint: "bg-blue-100 text-blue-600" },
  person: { icon: UserPlus, tint: "bg-slate-100 text-slate-600" },
};

const WEEK_DAYS = [
  { label: "Mon", dateLabel: "22", fullDay: "Mon 22 Sep" }, { label: "Tue", dateLabel: "23", fullDay: "Tue 23 Sep" },
  { label: "Wed", dateLabel: "24", fullDay: "Wed 24 Sep" }, { label: "Thu", dateLabel: "25", fullDay: "Thu 25 Sep" },
  { label: "Fri", dateLabel: "26", fullDay: "Fri 26 Sep" },
];
const SLOTS = ["09:00", "11:00", "14:00"];

export default function DashboardView({ supervised, marking, onSelect, onNavigate }) {
  const all = [...supervised, ...marking];
  const pending = all.filter((s) => s.status !== "Scheduled");
  const proposed = all.filter((s) => s.status === "Proposed");
  const awaiting = all.filter((s) => s.status === "Awaiting availability");
  const todaysSessions = all.filter((s) => s.day === TODAY_LABEL);
  const completedCount = COMPLETED.length;
  const clashes = findClashes(all);

  const upcoming = sortByWhen(all.filter((s) => s.day !== "—" && DAY_ORDER[s.day] >= DAY_ORDER[TODAY_LABEL]))[0];

  const donutSegments = [
    { label: "Pending Review", value: proposed.length, color: "#7c3aed" },
    { label: "Upcoming", value: all.filter((s) => s.status === "Scheduled").length, color: "#3b82f6" },
    { label: "In Progress", value: todaysSessions.length, color: "#ec4899" },
    { label: "Completed", value: completedCount, color: "#10b981" },
  ];
  const totalDuties = donutSegments.reduce((s, x) => s + x.value, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Good afternoon, Srinadh! 👋</h1>
      <p className="mt-1 text-sm text-slate-500">Here's what's happening with your viva coordination today.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <KpiListCard icon={GraduationCap} tint="violet" label="Supervised Students" sub="You are the supervisor"
          value={supervised.length} items={supervised} onSelect={onSelect}
          emptyHint="Students you supervise appear here once the coordinator assigns them." />
        <KpiListCard icon={ClipboardCheck} tint="rose" label="Pending Duties" sub="Awaiting confirmation"
          value={pending.length} items={pending} onSelect={onSelect}
          emptyHint="Nothing pending — every viva on your list has a confirmed slot." />
        <KpiListCard icon={CalendarCheck2} tint="emerald" label="Today's Sessions" sub={TODAY_LABEL}
          value={todaysSessions.length} items={todaysSessions} onSelect={onSelect}
          emptyHint="No vivas on your timetable for today." />
        <KpiListCard icon={CheckCircle2} tint="blue" label="Completed" sub="Earlier this year"
          value={completedCount} items={COMPLETED} onSelect={onSelect}
          emptyHint="Completed vivas will appear here once marking is finalised." />
      </div>

      {clashes.length > 0 ? (
        <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-xs text-rose-800">
          <p className="flex items-center gap-2 font-semibold"><AlertTriangle size={14} /> {clashes.length} scheduling clash{clashes.length === 1 ? "" : "es"} detected</p>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs font-medium text-emerald-700">
          <Check size={14} /> No scheduling clashes detected across your supervised and second-marker duties.
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={DISPLAY}>Duties Overview</h2>
              <select defaultValue="week" className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-100">
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative grid shrink-0 place-items-center">
                <DonutChart segments={donutSegments} />
                <div className="absolute grid place-items-center text-center">
                  <p className="text-3xl font-bold text-slate-900" style={DISPLAY}>{totalDuties}</p>
                  <p className="text-[11px] text-slate-400">Total Duties</p>
                </div>
              </div>
              <ul className="flex-1 list-none space-y-2.5">
                {donutSegments.map((seg) => (
                  <li key={seg.label} className="flex items-center gap-2.5 text-sm">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: seg.color }} />
                    <span className="flex-1 text-slate-600">{seg.label}</span>
                    <span className="font-semibold text-slate-800">{seg.value} ({totalDuties ? Math.round((seg.value / totalDuties) * 100) : 0}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold" style={DISPLAY}>Your week at a glance</h2>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-xs font-medium">
                <button onClick={() => onNavigate("timetable")} className="rounded-md px-2.5 py-1 text-slate-500 hover:bg-white">Day</button>
                <span className="rounded-md bg-white px-2.5 py-1 text-violet-700 shadow-sm">Week</span>
                <button onClick={() => onNavigate("timetable")} className="rounded-md px-2.5 py-1 text-slate-500 hover:bg-white">Month</button>
              </div>
            </div>
            <div className="mt-4">
              <WeekCalendar days={WEEK_DAYS} slots={SLOTS} sessions={all.filter((s) => s.day !== "—")} onSessionClick={onSelect} highlightDay="Wed" compact />
            </div>
            <button onClick={() => onNavigate("timetable")} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 hover:underline">
              <CalendarDays size={14} /> View Full Timetable
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={DISPLAY}>Recent Activity</h2>
              <button onClick={() => onNavigate("sessions")} className="text-xs font-medium text-violet-600 hover:underline">View all</button>
            </div>
            <ul className="mt-3 list-none divide-y divide-slate-100">
              {ACTIVITY.map((a) => {
                const { icon: Icon, tint } = ACTIVITY_ICON[a.icon];
                return (
                  <li key={a.id} className="flex items-center gap-3 py-2.5">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tint}`}><Icon size={15} /></span>
                    <span className="min-w-0 flex-1 text-sm text-slate-700">{a.text}</span>
                    <span className="shrink-0 text-xs text-slate-400">{a.time}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          {upcoming && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold" style={DISPLAY}>Upcoming Session</h2>
                <button onClick={() => onNavigate("sessions")} className="text-xs font-medium text-violet-600 hover:underline">View all</button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl font-bold text-violet-700" style={DISPLAY}>{upcoming.time}</p>
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">{upcoming.day}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Avatar name={upcoming.name} idx={0} size="h-10 w-10 text-sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{upcoming.name}</p>
                  <p className="truncate text-xs text-slate-400">{upcoming.course}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <p>Room: <span className="font-medium text-slate-700">{upcoming.room}</span></p>
                <p>Supervisor: <span className="font-medium text-slate-700">{upcoming.supervisor}</span></p>
                <p>Second marker: <span className="font-medium text-slate-700">{upcoming.marker}</span></p>
              </div>
              <button onClick={() => onSelect(upcoming)}
                className="mt-4 w-full rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800">
                View Session Details
              </button>
            </section>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold" style={DISPLAY}>Alerts &amp; Reminders</h2>
            </div>
            <ul className="mt-3 list-none space-y-2">
              {proposed.length > 0 && (
                <li className="flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50/60 p-2.5">
                  <AlertTriangle size={15} className="mt-0.5 shrink-0 text-rose-500" />
                  <button onClick={() => onNavigate("sessions")} className="min-w-0 flex-1 text-left">
                    <span className="block text-xs font-semibold text-slate-800">{proposed.length} viva{proposed.length === 1 ? "" : "s"} awaiting your review</span>
                    <span className="block truncate text-[11px] text-slate-500">{proposed.map((s) => s.name).join(", ")}</span>
                  </button>
                  <ChevronRight size={14} className="mt-0.5 shrink-0 text-slate-300" />
                </li>
              )}
              {awaiting.length > 0 && (
                <li className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/60 p-2.5">
                  <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
                  <button onClick={() => onNavigate("students")} className="min-w-0 flex-1 text-left">
                    <span className="block text-xs font-semibold text-slate-800">{awaiting.length} student{awaiting.length === 1 ? "" : "s"} waiting on a slot</span>
                    <span className="block truncate text-[11px] text-slate-500">{awaiting.map((s) => s.name).join(", ")}</span>
                  </button>
                  <ChevronRight size={14} className="mt-0.5 shrink-0 text-slate-300" />
                </li>
              )}
              <li className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-2.5">
                <CalendarPlus size={15} className="mt-0.5 shrink-0 text-blue-500" />
                <button onClick={() => onNavigate("calendar")} className="min-w-0 flex-1 text-left">
                  <span className="block text-xs font-semibold text-slate-800">Timetable update</span>
                  <span className="block truncate text-[11px] text-slate-500">Room V1-02 is now available on 26 Sep</span>
                </button>
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-slate-300" />
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold" style={DISPLAY}>Announcements</h2>
            </div>
            <ul className="mt-3 list-none space-y-3">
              {ANNOUNCEMENTS.map((a) => (
                <li key={a.id} className="border-l-2 border-violet-300 pl-3">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-violet-700"><Megaphone size={13} /> {a.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{a.body}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{a.time}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold" style={DISPLAY}>Quick Links</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button onClick={() => onNavigate("availability")} className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 p-3 text-center transition hover:bg-violet-50">
                <CalendarPlus size={18} className="text-violet-600" /><span className="text-xs font-medium text-slate-700">Add Availability</span>
              </button>
              <button onClick={() => onNavigate("timetable")} className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 p-3 text-center transition hover:bg-violet-50">
                <CalendarDays size={18} className="text-violet-600" /><span className="text-xs font-medium text-slate-700">Schedule Viva</span>
              </button>
              <button onClick={() => onNavigate("reports")} className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 p-3 text-center transition hover:bg-violet-50">
                <FileUp size={18} className="text-violet-600" /><span className="text-xs font-medium text-slate-700">Upload Report</span>
              </button>
              <button onClick={() => onNavigate("reports")} className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 p-3 text-center transition hover:bg-violet-50">
                <BarChart3 size={18} className="text-violet-600" /><span className="text-xs font-medium text-slate-700">Generate Report</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
