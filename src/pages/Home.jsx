const AVATAR_URL = "https://media.base44.com/images/public/69d72179891bde79c8a7ee1a/6027bd016_ChatGPTImageApr3202610_06_23AM.png";

const pins = [
  { color: "#e74c3c", top: "6%", left: "22%" },
  { color: "#3498db", top: "8%", left: "58%" },
  { color: "#2ecc71", top: "38%", left: "10%" },
  { color: "#f39c12", top: "55%", left: "42%" },
  { color: "#9b59b6", top: "72%", left: "68%" },
  { color: "#e74c3c", top: "80%", left: "20%" },
  { color: "#3498db", top: "15%", left: "88%" },
];

function Pin({ color, style }) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 2px 6px rgba(0,0,0,0.4), inset 0 -2px 3px rgba(0,0,0,0.2)`,
        position: "absolute",
        zIndex: 10,
        ...style,
      }}
    />
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#8B6914" }}
    >
      {/* Wooden frame */}
      <div
        className="relative w-full max-w-2xl rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #c8954a 0%, #a0692a 30%, #c8954a 60%, #8B5E1A 100%)",
          padding: "18px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)",
        }}
      >
        {/* Cork surface */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            minHeight: 580,
            background: "radial-gradient(ellipse at 30% 20%, #d4a96a 0%, #c49050 30%, #b8803a 60%, #c49050 100%)",
            backgroundImage: `
              radial-gradient(ellipse at 30% 20%, #d4a96a 0%, #c49050 30%, #b8803a 60%, #c49050 100%),
              url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23a07030' opacity='0.3'/%3E%3Ccircle cx='3' cy='3' r='0.6' fill='%23906020' opacity='0.2'/%3E%3C/svg%3E")
            `,
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
            padding: "24px",
          }}
        >
          {/* Floating pins */}
          {pins.map((p, i) => (
            <Pin key={i} color={p.color} style={{ top: p.top, left: p.left }} />
          ))}

          {/* Header note - helia & lucky logo */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={AVATAR_URL}
              alt="helia & lucky"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div
              className="px-4 py-1.5 rounded-sm shadow-md"
              style={{
                background: "#fffde7",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                fontSize: 20,
                fontWeight: "bold",
                color: "#5d4037",
                transform: "rotate(-1deg)",
                boxShadow: "2px 3px 6px rgba(0,0,0,0.2)",
              }}
            >
              helia &amp; lucky
            </div>
          </div>

          {/* Main layout: big photo note + sticky notes */}
          <div className="flex gap-5 flex-wrap">

            {/* Big lined notepad with avatar */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: 200,
                background: "white",
                borderRadius: 4,
                boxShadow: "3px 4px 12px rgba(0,0,0,0.25)",
                transform: "rotate(-2deg)",
                overflow: "hidden",
              }}
            >
              {/* Spiral top */}
              <div
                style={{
                  height: 18,
                  background: "#e0e0e0",
                  borderBottom: "2px solid #bdbdbd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      border: "2px solid #9e9e9e",
                      background: "white",
                    }}
                  />
                ))}
              </div>
              {/* Pin on notepad */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 16,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#e74c3c",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                  zIndex: 5,
                }}
              />
              {/* Avatar image */}
              <img
                src={AVATAR_URL}
                alt="helia & lucky"
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              {/* Lined area */}
              <div style={{ padding: "8px 10px", paddingLeft: 28, position: "relative" }}>
                {/* Red margin line */}
                <div
                  style={{
                    position: "absolute",
                    left: 22,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: "#ffcdd2",
                  }}
                />
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 1,
                      background: "#bbdefb",
                      marginBottom: 10,
                    }}
                  />
                ))}
                <p
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: 11,
                    color: "#5d4037",
                    marginTop: -36,
                    lineHeight: 1.8,
                  }}
                >
                  Helia the human<br />&amp; Lucky the Bordercollie
                </p>
              </div>
            </div>

            {/* Right side: sticky notes */}
            <div className="flex flex-col gap-4 flex-1">

              {/* SnapToCalendar sticky note */}
              <a
                href="https://heliaandlucky.com/snaptocalendar"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                style={{
                  background: "linear-gradient(135deg, #fff9c4, #fff176)",
                  borderRadius: 4,
                  padding: "16px 14px",
                  boxShadow: "3px 4px 10px rgba(0,0,0,0.2)",
                  transform: "rotate(1.5deg)",
                  textDecoration: "none",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "rotate(1.5deg) scale(1.04)"; e.currentTarget.style.boxShadow = "5px 7px 16px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "rotate(1.5deg)"; e.currentTarget.style.boxShadow = "3px 4px 10px rgba(0,0,0,0.2)"; }}
              >
                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "#2ecc71",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "#4a148c",
                    marginBottom: 6,
                  }}
                >
                  📸 SnapToCalendar
                </div>
                <div
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: 12,
                    color: "#5d4037",
                    lineHeight: 1.5,
                  }}
                >
                  Screenshot any convo and turn it into a calendar event instantly!
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: 11,
                    color: "#7b1fa2",
                    fontWeight: "bold",
                  }}
                >
                  tap to try it →
                </div>
              </a>

              {/* Coming soon blank note */}
              <div
                style={{
                  background: "white",
                  borderRadius: 4,
                  padding: "16px 14px",
                  boxShadow: "3px 4px 10px rgba(0,0,0,0.15)",
                  transform: "rotate(-1deg)",
                  position: "relative",
                  minHeight: 80,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "#3498db",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: 12,
                    color: "#bdbdbd",
                    fontStyle: "italic",
                  }}
                >
                  more coming soon...
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}