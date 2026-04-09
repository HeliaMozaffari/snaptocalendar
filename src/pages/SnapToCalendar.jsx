import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import ImageUpload from "../components/ImageUpload";
import AppointmentCard from "../components/AppointmentCard";
import UserHeader from "../components/UserHeader";
import InstallBanner from "../components/InstallBanner";

export default function SnapToCalendar() {
  useEffect(() => {
    base44.auth.isAuthenticated().then((authed) => {
      if (!authed) base44.auth.redirectToLogin();
    });
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = async (file, preview) => {
    setImageFile(file);
    setImagePreview(preview);
    setError(null);
    setLoading(true);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Extract appointment/meeting details from this screenshot of a conversation.
Return a JSON object with these fields:
- title: event title (e.g. "Haircut with Sarah")
- date: in YYYY-MM-DD format
- time: in HH:MM 24h format
- duration_minutes: estimated duration as number (default 60)
- client_name: who the appointment is with
- location: where (if mentioned)
- notes: any extra context
- confidence: a number 0-1 how confident you are the data is correct
- platform: messaging platform (WhatsApp, iMessage, etc.)

If you cannot find an appointment, still return the object with best guesses and low confidence.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            date: { type: "string" },
            time: { type: "string" },
            duration_minutes: { type: "number" },
            client_name: { type: "string" },
            location: { type: "string" },
            notes: { type: "string" },
            confidence: { type: "number" },
            platform: { type: "string" },
          },
        },
      });

      const me = await base44.auth.me();
      setAppointment(result);
      await base44.entities.Appointment.create({ ...result, user_email: me?.email || "", user_name: me?.full_name || "" });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAppointment(null);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <UserHeader />
      <InstallBanner />

      <div className="max-w-lg mx-auto px-4 pt-6 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100 mb-4">
            <span className="text-2xl">📸</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SnapToCalendar</h1>
          <p className="text-gray-400 text-sm mt-1">
            Screenshot a convo → instant calendar event
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Reading your screenshot…</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-600 text-center mb-4">
            {error}
            <button onClick={handleReset} className="block mx-auto mt-2 text-xs underline text-red-400">
              Try again
            </button>
          </div>
        )}

        {!loading && !appointment && !error && (
          <ImageUpload onImageSelect={handleImageSelect} />
        )}

        {!loading && appointment && (
          <AppointmentCard
            appointment={appointment}
            imagePreview={imagePreview}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}