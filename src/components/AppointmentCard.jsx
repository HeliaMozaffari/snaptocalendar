import { useState } from "react";
import { Calendar, Clock, MapPin, User, FileText, Download, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

const confidenceInfo = (c) => {
  if (c >= 0.8) return { label: "High confidence", color: "text-green-600 bg-green-50 border-green-200" };
  if (c >= 0.5) return { label: "Medium confidence", color: "text-amber-600 bg-amber-50 border-amber-200" };
  return { label: "Low confidence — please review", color: "text-red-500 bg-red-50 border-red-200" };
};

const pad = (n) => String(n).padStart(2, "0");

const downloadICS = (appt) => {
  const [hour, minute] = appt.time.split(":").map(Number);
  const totalEnd = hour * 60 + minute + (parseInt(appt.duration_minutes) || 60);
  const endHour = Math.floor(totalEnd / 60) % 24;
  const endMin = totalEnd % 60;
  const dateStr = appt.date.replace(/-/g, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SnapToCalendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `SUMMARY:${appt.title}`,
    `DTSTART:${dateStr}T${pad(hour)}${pad(minute)}00`,
    `DTEND:${dateStr}T${pad(endHour)}${pad(endMin)}00`,
    appt.location ? `LOCATION:${appt.location}` : null,
    `DESCRIPTION:${appt.notes || ""}`,
    `UID:snaptocalendar-${Date.now()}@app`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(appt.title || "event").replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

const Field = ({ label, icon: Icon, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
    />
  </div>
);

export default function AppointmentCard({ appointment, imagePreview, onReset }) {
  const [appt, setAppt] = useState(appointment);
  const [showImage, setShowImage] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const set = (key) => (val) => setAppt((prev) => ({ ...prev, [key]: val }));
  const conf = confidenceInfo(appt.confidence);

  const handleDownload = () => {
    downloadICS(appt);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Top row: confidence + reset */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${conf.color}`}>
          ✓ {conf.label}
        </span>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> New scan
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Colored header with editable title */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-5">
          <input
            value={appt.title || ""}
            onChange={(e) => set("title")(e.target.value)}
            className="w-full bg-transparent text-white text-xl font-bold placeholder-white/60 focus:outline-none border-b border-white/30 pb-1"
            placeholder="Event title"
          />
          {appt.client_name && (
            <p className="text-white/70 text-sm mt-1">with {appt.client_name}</p>
          )}
        </div>

        {/* Editable fields */}
        <div className="px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" icon={Calendar} value={appt.date} onChange={set("date")} type="date" />
            <Field label="Time" icon={Clock} value={appt.time} onChange={set("time")} type="time" />
          </div>
          <Field label="Duration (min)" icon={Clock} value={appt.duration_minutes} onChange={set("duration_minutes")} type="number" />
          <Field label="Location" icon={MapPin} value={appt.location} onChange={set("location")} />
          <Field label="With" icon={User} value={appt.client_name} onChange={set("client_name")} />
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
              <FileText className="w-3.5 h-3.5" /> Notes
            </label>
            <textarea
              value={appt.notes || ""}
              onChange={(e) => set("notes")(e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Screenshot toggle */}
      {imagePreview && (
        <>
          <button
            onClick={() => setShowImage((v) => !v)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors w-full justify-center py-1"
          >
            {showImage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showImage ? "Hide screenshot" : "View screenshot"}
          </button>
          {showImage && (
            <img src={imagePreview} alt="Screenshot" className="w-full rounded-2xl border border-gray-100 shadow-sm" />
          )}
        </>
      )}

      {/* CTA */}
      <button
        onClick={handleDownload}
        className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg
          ${downloaded
            ? "bg-green-500 text-white shadow-green-200"
            : "bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700"
          }`}
      >
        {downloaded ? "✓ Download started!" : <><Download className="w-5 h-5" /> Add to Calendar</>}
      </button>
      <p className="text-xs text-center text-gray-400">Downloads a .ics file — open it to add to any calendar app</p>
    </div>
  );
}