import { useRef, useState } from "react";
import { Upload, ImageIcon } from "lucide-react";

export default function ImageUpload({ onImageSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-200 p-10 text-center
          ${isDragging
            ? "border-violet-500 bg-violet-50 scale-[0.99]"
            : "border-gray-200 bg-white hover:border-violet-400 hover:bg-violet-50/50"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => processFile(e.target.files[0])}
        />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
            ${isDragging ? "bg-violet-200" : "bg-violet-100"}`}>
            <Upload className={`w-8 h-8 transition-colors ${isDragging ? "text-violet-700" : "text-violet-500"}`} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">Upload a screenshot</p>
            <p className="text-sm text-gray-400 mt-1">Tap to choose or drag & drop</p>
          </div>
          <p className="text-xs text-gray-300">JPG, PNG, WebP supported</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
        <ImageIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">What works best</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Screenshots of WhatsApp, Instagram DMs, iMessage, or SMS with a confirmed date & time.
          </p>
        </div>
      </div>
    </div>
  );
}