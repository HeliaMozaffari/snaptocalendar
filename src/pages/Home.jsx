import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import InstallBanner from "../components/InstallBanner";
import { base44 } from "@/api/base44Client";
import ImageUpload from "../components/ImageUpload";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar, Sparkles } from "lucide-react";

const TODAY = new Date().toISOString().split("T")[0];

const EXTRACTION_PROMPT = `You are an AI assistant that extracts appointment details from text conversations.

The input is an image of a screenshot of a conversation (WhatsApp, Instagram DMs, iMessage, SMS, etc). The text may be messy, informal, incomplete, or contain multiple messages.

Your task is to determine whether an appointment or booking is being confirmed, and extract the relevant details.

Return ONLY raw valid JSON — no markdown fences, no explanation.

Fields:
- title (string)
- date (YYYY-MM-DD)
- time (HH:MM, 24h format)
- duration_minutes (number, default 60 if missing)
- client_name (string or null)
- location (string or null)
- notes (string)
- confidence (number 0 to 1)

Rules:
- Understand natural language like "tomorrow", "this Friday" — today's date is ${TODAY}
- Infer missing details when reasonable
- Choose the most clearly confirmed time
- If unclear or no booking exists, return the JSON value null (not an object)
- Lower confidence if guessing

Example if appointment found:
{"title":"Haircut","date":"2026-04-10","time":"14:00","duration_minutes":60,"client_name":"John","location":"Main St Salon","notes":"Confirmed via DM","confidence":0.9}

Example if no appointment:
null`;

export default function Home() {
  const [step, setStep] = useState("upload");
  const [imagePreview, setImagePreview] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleImageSelect = async (file, previewUrl) => {
    setImagePreview(previewUrl);
    setError(null);
    setStep("processing");

    try {
      // First upload the file to get a real URL
      const uploadRes = await base44.integrations.Core.UploadFile({ file });
      const fileUrl = uploadRes.file_url;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: EXTRACTION_PROMPT,
        file_urls: [fileUrl],
      });

      let parsed = null;
      try {
        const cleaned = (typeof response === "string" ? response : JSON.stringify(response))
          .trim()
          .replace(/^```json\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = null;
      }

      if (parsed && typeof parsed === "object" && parsed.title) {
        // Save to database
        const me = await base44.auth.me().catch(() => null);
        base44.entities.Appointment.create({
          ...parsed,
          user_name: me?.full_name || null,
          user_email: me?.email || null,
        }).catch(() => {});
        setAppointment(parsed);
        setStep("result");
      } else {
        setStep("no-result");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStep("upload");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setImagePreview(null);
    setAppointment(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <InstallBanner />
      <UserHeader />
      {/* Header */}
      <div className="px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-600 rounded-2xl shadow-lg mb-4">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SnapToCalendar</h1>
        <p className="text-sm text-gray-500 mt-1">Upload a screenshot → instant calendar event</p>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 max-w-lg mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {step === "upload" && (
          user ? (
            <ImageUpload onImageSelect={handleImageSelect} />
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="text-4xl mb-3">🔒</div>
              <p className="font-semibold text-gray-800 mb-1">Sign in to continue</p>
              <p className="text-sm text-gray-400 mb-6">You need an account to scan screenshots and save appointments.</p>
              <button
                onClick={() => base44.auth.redirectToLogin()}
                className="w-full py-3 bg-violet-600 text-white font-semibold rounded-2xl active:scale-95 transition-transform"
              >
                Sign in
              </button>
            </div>
          )
        )}

        {step === "processing" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded screenshot"
                className="w-full max-h-48 object-cover rounded-2xl mb-6 opacity-60"
              />
            )}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />
                <Sparkles className="w-4 h-4 text-violet-600 absolute inset-0 m-auto" />
              </div>
              <p className="font-semibold text-gray-800">Reading your screenshot…</p>
              <p className="text-sm text-gray-400">AI is extracting appointment details</p>
            </div>
          </div>
        )}

        {step === "no-result" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded screenshot"
                className="w-full max-h-48 object-cover rounded-2xl mb-6 opacity-50"
              />
            )}
            <div className="text-4xl mb-3">🤔</div>
            <p className="font-semibold text-gray-800 mb-1">No appointment detected</p>
            <p className="text-sm text-gray-400 mb-6">
              Try another screenshot with a confirmed booking or meeting.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-violet-600 text-white font-semibold rounded-2xl active:scale-95 transition-transform"
            >
              Try Another Screenshot
            </button>
          </div>
        )}

        {step === "result" && appointment && (
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