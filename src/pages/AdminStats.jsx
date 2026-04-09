import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    base44.auth.me()
      .then(async (user) => {
        if (user?.role !== "admin") { setUnauthorized(true); return; }
        const all = await base44.entities.Appointment.list();
        const counts = {};
        all.forEach((a) => {
          const key = a.created_by || "unknown";
          counts[key] = (counts[key] || 0) + 1;
        });
        const sorted = Object.entries(counts)
          .map(([email, count]) => ({ email, count }))
          .sort((a, b) => b.count - a.count);
        setStats(sorted);
      })
      .catch(() => setUnauthorized(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
    </div>
  );

  if (unauthorized) return (
    <div className="flex items-center justify-center min-h-screen text-gray-500">Access denied.</div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Screenshot Stats</h1>
      <p className="text-sm text-gray-400 mb-6">Screenshots per user</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Email</th>
              <th className="text-right px-5 py-3 font-semibold text-gray-500">Screenshots</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(({ email, count }, i) => (
              <tr key={email} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-5 py-3 text-gray-700">{email}</td>
                <td className="px-5 py-3 text-right font-bold text-violet-600">{count}</td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr><td colSpan={2} className="px-5 py-8 text-center text-gray-400">No data yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}