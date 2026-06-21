import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StudentDrawer from "./components/StudentDrawer";
import { SUPERVISED, MARKING, EXAMINERS, NOTIFICATIONS, allStudents } from "./data";

import DashboardView from "./views/DashboardView";
import AvailabilityView from "./views/AvailabilityView";
import DutyView from "./views/DutyView";
import TimetableView from "./views/TimetableView";
import SessionsView from "./views/SessionsView";
import StudentsView from "./views/StudentsView";
import ExaminersView from "./views/ExaminersView";
import NotificationsView from "./views/NotificationsView";
import ReportsView from "./views/ReportsView";
import CalendarView from "./views/CalendarView";
import MessagesView from "./views/MessagesView";
import SettingsView from "./views/SettingsView";

const PAGES = [
  { key: "dashboard", label: "Dashboard" },
  { key: "availability", label: "My Availability" },
  { key: "supervisor", label: "Supervisor Duties" },
  { key: "marker", label: "Second Marker Duties" },
  { key: "timetable", label: "Timetable" },
  { key: "sessions", label: "Viva Sessions" },
  { key: "students", label: "Students" },
  { key: "examiners", label: "Examiners" },
  { key: "reports", label: "Reports" },
  { key: "calendar", label: "Calendar" },
  { key: "messages", label: "Messages" },
  { key: "settings", label: "Settings" },
];

function buildSearchResults(query, students) {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results = [];

  students.forEach((s) => {
    if (s.name.toLowerCase().includes(q) || s.project.toLowerCase().includes(q) || s.course.toLowerCase().includes(q)) {
      results.push({ id: `st-${s.id}`, label: s.name, sublabel: s.project, kind: "Student", student: s });
    }
  });
  EXAMINERS.forEach((e) => {
    if (e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)) {
      results.push({ id: `ex-${e.id}`, label: e.name, sublabel: e.department, kind: "Examiner" });
    }
  });
  PAGES.forEach((p) => {
    if (p.label.toLowerCase().includes(q)) {
      results.push({ id: `pg-${p.key}`, label: p.label, sublabel: "Go to page", kind: "Page", navigateTo: p.key });
    }
  });

  return results.slice(0, 8);
}

export default function StaffPortal() {
  const [active, setActive] = useState("dashboard");
  const [supervisedList, setSupervisedList] = useState(SUPERVISED);
  const [markingList, setMarkingList] = useState(MARKING);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState({
    s1: [{ text: "Bring slides on the privacy-budget trade-offs — I'll ask about epsilon choices.", time: "20 Jun, 16:10" }],
  });
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [query, setQuery] = useState("");

  const addNote = (id, text) =>
    setNotes((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { text, time: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) }],
    }));

  const confirmSlot = (id) => {
    const markScheduled = (list) => list.map((s) => (s.id === id ? { ...s, status: "Scheduled" } : s));
    setSupervisedList(markScheduled);
    setMarkingList(markScheduled);
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status: "Scheduled" } : prev));
  };

  const rescheduleSession = (id, day, time) => {
    const move = (list) => list.map((s) => (s.id === id ? { ...s, day, time } : s));
    setSupervisedList(move);
    setMarkingList(move);
    setSelected((prev) => (prev && prev.id === id ? { ...prev, day, time } : prev));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((list) => list.map((n) => ({ ...n, read: true })));

  const students = allStudents(supervisedList, markingList);
  const searchResults = buildSearchResults(query, students);

  const handleResultClick = (r) => {
    if (r.student) setSelected(r.student);
    else if (r.navigateTo) setActive(r.navigateTo);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer-in { animation: slideIn .22s ease-out; } .fade-in { animation: fadeIn .18s ease-out; }
      `}</style>

      <Sidebar active={active} onNavigate={setActive} unreadCount={unreadCount} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          query={query} onQueryChange={setQuery} results={searchResults} onResultClick={handleResultClick}
          notifications={notifications} unreadCount={unreadCount}
          onOpenNotifications={() => setActive("notifications")} onMarkAllRead={markAllRead}
          onNavigate={setActive}
        />

        <main className="thin-scroll flex-1 overflow-y-auto p-6">
          {active === "dashboard" && <DashboardView supervised={supervisedList} marking={markingList} onSelect={setSelected} onNavigate={setActive} />}
          {active === "availability" && <AvailabilityView />}
          {active === "supervisor" && <DutyView title="Supervisor Duties" subtitle="Students you supervise this viva period." students={supervisedList} onSelect={setSelected} />}
          {active === "marker" && <DutyView title="Second Marker Duties" subtitle="Vivas where you act as second marker." students={markingList} onSelect={setSelected} />}
          {active === "timetable" && <TimetableView supervised={supervisedList} marking={markingList} onSelect={setSelected} onReschedule={rescheduleSession} />}
          {active === "sessions" && <SessionsView students={students} onSelect={setSelected} />}
          {active === "students" && <StudentsView students={students} onSelect={setSelected} />}
          {active === "examiners" && <ExaminersView students={students} />}
          {active === "notifications" && <NotificationsView notifications={notifications} setNotifications={setNotifications} />}
          {active === "reports" && <ReportsView supervised={supervisedList} marking={markingList} />}
          {active === "calendar" && <CalendarView students={students} onSelect={setSelected} />}
          {active === "messages" && <MessagesView />}
          {active === "settings" && <SettingsView />}
        </main>
      </div>

      {selected && (
        <StudentDrawer student={selected} notes={notes[selected.id] || []}
          onAddNote={(text) => addNote(selected.id, text)} onConfirm={confirmSlot} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
