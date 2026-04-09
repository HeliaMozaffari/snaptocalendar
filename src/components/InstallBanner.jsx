import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

  useEffect(() => {
    if (isInStandaloneMode || dismissed) return;

    if (isIOS) {
      // Show iOS instructions after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    // Android / Chrome: listen for the install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [dismissed]);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSInstructions(false);
    setDismissed(true);
  };

  if (!showBanner || isInStandaloneMode) return null;

  return (
    <>
      {/* Install Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">Add to Home Screen</p>
            <p className="text-xs text-gray-400 truncate">Use SnapToCalendar like a native app</p>
          </div>
          <button
            onClick={handleInstall}
            className="flex-shrink-0 px-3 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-transform"
          >
            Install
          </button>
          <button onClick={handleDismiss} className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* iOS Step-by-step instructions */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Add to Home Screen</h3>
              <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <ol className="space-y-3">
              {[
                { step: "1", text: 'Tap the Share button at the bottom of Safari (the box with an arrow)' },
                { step: "2", text: 'Scroll down and tap "Add to Home Screen"' },
                { step: "3", text: 'Tap "Add" in the top right corner' },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <p className="text-sm text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
            <button
              onClick={handleDismiss}
              className="mt-5 w-full py-3 bg-violet-600 text-white font-semibold rounded-2xl active:scale-95 transition-transform"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}