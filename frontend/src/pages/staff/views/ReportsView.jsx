import { useState } from "react";
import { FileText, FileSpreadsheet, Download, BarChart3, Check } from "lucide-react";
import { REPORTS } from "../data";

const DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

export default function ReportsView({ supervised, marking }) {
  const [reports, setReports] = useState(REPORTS);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");

  const all = [...supervised, ...marking];
  const stats = [
    { label: "Supervised students", value: supervised.length },
    { label: "Second-marker duties", value: marking.length },
    { label: "Scheduled vivas", value: all.filter((s) => s.status === "Scheduled").length },
    { label: "Awaiting availability", value: all.filter((s) => s.status === "Awaiting availability").length },
  ];

  const generateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setReports((r) => [{ id: `r${Date.now()}`, name: "Duties Summary — Generated Just Now", type: "PDF", updated: "Just now" }, ...r]);
      setGenerating(false);
      setToast("Report generated successfully.");
      setTimeout(() => setToast(""), 3000);
    }, 900);
  };

  const downloadReport = (name) => {
    setToast(`Downloading "${name}"…`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={DISPLAY}>Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Export your timetable and duty records for your own records.</p>
        </div>
        <button onClick={generateReport} disabled={generating}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 disabled:opacity-60">
          <BarChart3 size={16} /> {generating ? "Generating…" : "Generate Report"}
        </button>
      </div>

      {toast && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs font-medium text-emerald-700">
          <Check size={14} /> {toast}
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-slate-900" style={DISPLAY}>{s.value}</p>
            <p className="mt-1 text-[11px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <h2 className="text-sm font-semibold text-slate-700">Available reports</h2>
        </div>
        <ul className="list-none divide-y divide-slate-100">
          {reports.map((r) => (
            <li key={r.id} className="flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-600">
                {r.type === "PDF" ? <FileText size={16} /> : <FileSpreadsheet size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{r.name}</p>
                <p className="text-xs text-slate-400">{r.type} · Updated {r.updated}</p>
              </div>
              <button onClick={() => downloadReport(r.name)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                <Download size={13} /> Export
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
