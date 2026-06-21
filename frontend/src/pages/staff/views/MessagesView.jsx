import { useState } from "react";
import { Send } from "lucide-react";
import Avatar from "../components/Avatar";
import { MESSAGE_THREADS } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

export default function MessagesView() {
  const [threads, setThreads] = useState(MESSAGE_THREADS);
  const [activeId, setActiveId] = useState(MESSAGE_THREADS[0].id);
  const [draft, setDraft] = useState("");

  const active = threads.find((t) => t.id === activeId);

  const openThread = (id) => {
    setActiveId(id);
    setThreads((list) => list.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setThreads((list) => list.map((t) => (
      t.id === activeId
        ? { ...t, lastMessage: text, time: "Just now", messages: [...t.messages, { from: "me", text, time: "now" }] }
        : t
    )));
    setDraft("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Messages</h1>
      <p className="mt-1 text-sm text-slate-500">Quick conversations with the coordinator, students and fellow examiners.</p>

      <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[280px_1fr]">
        <div className="thin-scroll max-h-[560px] divide-y divide-slate-100 overflow-y-auto border-b border-slate-100 lg:max-h-none lg:border-b-0 lg:border-r">
          {threads.map((t, i) => (
            <button key={t.id} onClick={() => openThread(t.id)}
              className={`flex w-full items-center gap-2.5 p-3.5 text-left transition ${activeId === t.id ? "bg-violet-50" : "hover:bg-slate-50"}`}>
              <Avatar name={t.name} idx={i} size="h-9 w-9 text-xs" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-slate-800">{t.name}</span>
                  <span className="shrink-0 text-[10px] text-slate-400">{t.time}</span>
                </span>
                <span className="block truncate text-xs text-slate-500">{t.lastMessage}</span>
              </span>
              {t.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-slate-100 p-4">
            <Avatar name={active.name} idx={0} size="h-9 w-9 text-xs" />
            <p className="text-sm font-semibold text-slate-800">{active.name}</p>
          </div>

          <div className="thin-scroll flex-1 space-y-2.5 overflow-y-auto p-4" style={{ maxHeight: 380 }}>
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${m.from === "me" ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-700"}`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-violet-200" : "text-slate-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-2 border-t border-slate-100 p-3">
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={1}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Write a message…"
              className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
            <button onClick={send} disabled={!draft.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-700 text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
