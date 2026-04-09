import { Calendar, ArrowRight } from "lucide-react";

const products = [
  {
    name: "SnapToCalendar",
    tagline: "Screenshot → Calendar event in seconds",
    description: "Upload a screenshot of any conversation — WhatsApp, Instagram, iMessage — and instantly extract the appointment details into a calendar event.",
    icon: <Calendar className="w-7 h-7 text-violet-600" />,
    iconBg: "bg-violet-100",
    accent: "from-violet-600 to-blue-500",
    href: "https://snaptocalendar.heliaandlucky.com",
    badge: "Free to use",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">helia & lucky</h1>
        <p className="text-gray-400 mt-2 text-base">A small collection of tools we built for ourselves and you.</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-2xl mx-auto px-6 pb-20 space-y-4">
        {products.map((product) => (
          <a
            key={product.name}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${product.accent}`} />
            <div className="p-6 flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl ${product.iconBg} flex items-center justify-center flex-shrink-0`}>
                {product.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{product.badge}</span>
                </div>
                <p className="text-sm font-medium text-gray-500 mb-2">{product.tagline}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </div>
          </a>
        ))}

        {/* Placeholder for future products */}
        <div className="bg-white/50 rounded-3xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-300 font-medium">More tools coming soon...</p>
        </div>
      </div>
    </div>
  );
}