import { useState } from "react";
import { X, BookOpen, User, UserCheck, FileText, CalendarDays, MapPin, MessageSquarePlus, Send, Check } from "lucide-react";
import Avatar from "./Avatar";
import { STATUS_STYLE } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const REASON_STYLE = {
  emerald: "border-emerald-100 bg-emerald-50/60 text-emerald-800",
  violet: "border-violet-100 bg-violet-50/60 text-violet-800",
  amber: "border-amber-100 bg-amber-50/60 text-amber-800",
};

function reasoningFor(student) {
  if (student.status === "Completed") {
    return {
      tone: "emerald",
      title: "Viva completed",
      lines: [`This viva took place on ${student.day} at ${student.time} in ${student.room}.`, "Marking has been finalised for this student."],
    };
  }
  if (student.status === "Scheduled") {
    const lines = [
      `You, ${student.marker === "You (Second marker)" ? student.supervisor : student.marker} and ${student.name} were all marked available at this time.`,
    ];
    if (student.room !== "—") lines.push(`Room ${student.room} was free for this slot.`);
    lines.push("No clashes with your other supervised or second-marker duties.");
    return { tone: "emerald", title: "Why this slot was confirmed", lines };
  }
  if (student.status === "Proposed") {
    return {
      tone: "violet",
      title: "Why this slot was proposed",
      lines: [
        "This time fits everyone's marked availability and avoids known clashes.",
        "It's not final yet — confirm it, or reschedule from the Timetable if it doesn't work.",
      ],
    };
  }
  return {
    tone: "amber",
    title: "Why no slot has been suggested yet",
    lines: ["Not everyone involved has submitted availability for this viva period yet.", "A slot can be proposed as soon as that's complete."],
  };
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon size={16} className="mt-0.5 shrink-0 text-violet-500" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function StudentDrawer({ student, notes, onAddNote, onConfirm, onClose }) {
  const [draft, setDraft] = useState("");
  const submit = () => { const t = draft.trim(); if (!t) return; onAddNote(t); setDraft(""); };
  const reasoning = reasoningFor(student);

  return (
    <div className="fixed inset-0 z-40">
      <div className="fade-in absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <aside className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white p-5">
          <div className="flex items-center gap-3">
            <Avatar name={student.name} idx={0} size="h-12 w-12 text-sm" />
            <div>
              <h3 className="text-lg font-bold leading-tight" style={DISPLAY}>{student.name}</h3>
              <p className="text-xs text-slate-500">{student.course}</p>
              <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[student.status]}`}>{student.status}</span>
            </div>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"><X size={18} /></button>
        </div>

        <div className="thin-scroll flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center gap-2 text-violet-700"><BookOpen size={15} /><span className="text-[11px] font-semibold uppercase tracking-wide">Project</span></div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">{student.project}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{student.desc}</p>
          </div>
          <div className="mt-2 divide-y divide-slate-100">
            <InfoRow icon={User} label="Supervisor" value={student.supervisor} />
            <InfoRow icon={UserCheck} label="Second marker" value={student.marker} />
            <InfoRow icon={FileText} label="Course" value={student.course} />
            <InfoRow icon={CalendarDays} label="Viva slot" value={student.day === "—" ? "Not scheduled yet" : `${student.day} · ${student.time}`} />
            <InfoRow icon={MapPin} label="Room" value={student.room === "—" ? "To be confirmed" : student.room} />
          </div>

          <div className={`mt-4 rounded-xl border p-4 text-xs leading-relaxed ${REASON_STYLE[reasoning.tone]}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide">{reasoning.title}</p>
            <ul className="mt-1.5 list-none space-y-1">
              {reasoning.lines.map((line, i) => (<li key={i}>• {line}</li>))}
            </ul>
            {student.status === "Proposed" && onConfirm && (
              <button onClick={() => onConfirm(student.id)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-violet-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-800">
                <Check size={13} /> Confirm this slot
              </button>
            )}
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-2 text-slate-700"><MessageSquarePlus size={16} className="text-violet-600" /><h4 className="text-sm font-semibold" style={DISPLAY}>Notes & questions for the viva</h4></div>
            <ul className="mt-3 list-none space-y-2">
              {notes.length === 0 ? (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-3 text-center text-xs text-slate-400">No notes yet. Add a question to raise during {student.name.split(" ")[0]}'s viva.</li>
              ) : notes.map((n, i) => (
                <li key={i} className="rounded-lg border border-violet-100 bg-violet-50/50 p-3"><p className="text-sm text-slate-700">{n.text}</p><p className="mt-1 text-[10px] text-slate-400">{n.time}</p></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-end gap-2">
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
              placeholder="Add a note or question…"
              className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
            <button onClick={submit} disabled={!draft.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-700 text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"><Send size={16} /></button>
          </div>
          <p className="mt-1.5 text-[10px] text-slate-400">Press ⌘/Ctrl + Enter to add</p>
        </div>
      </aside>
    </div>
  );
}
