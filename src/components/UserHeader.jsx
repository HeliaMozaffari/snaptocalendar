import { useEffect, useState } from "react";
import { LogOut, User, LogIn } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function UserHeader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex justify-end px-4 pt-4">
        <button
          onClick={() => base44.auth.redirectToLogin()}
          className="flex items-center gap-1.5 bg-violet-600 text-white text-xs font-semibold rounded-2xl px-3 py-2 shadow-sm active:scale-95 transition-transform"
        >
          <LogIn className="w-3.5 h-3.5" />
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm">
        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-violet-600" />
        </div>
        <span className="text-xs font-medium text-gray-700 max-w-[120px] truncate">{user.full_name || user.email}</span>
      </div>
      <button
        onClick={() => base44.auth.logout()}
        className="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign out
      </button>
    </div>
  );
}