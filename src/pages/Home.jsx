const AVATAR_URL = "https://media.base44.com/images/public/69d72179891bde79c8a7ee1a/6027bd016_ChatGPTImageApr3202610_06_23AM.png";

function Pin({ color, style }) {
  return (
    <div style={{
      position: "absolute",
      width: 16, height: 16,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${color}ee, ${color}88)`,
      boxShadow: `0 3px 8px rgba(0,0,0,0.45), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4)`,
      zIndex: 20,
      ...style,
    }} />
  );
}

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(160deg, #c8954a 0%, #a0692a 40%, #8B5E1A 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "16px",
      boxSizing: "border-box",
    }}>
      {/* Wooden frame */}
      <div style={{
        width: "100%",
        maxWidth: 700,
        borderRadius: 18,
        padding: "14px 12px",
        background: "linear-gradient(135deg, #d4a55a 0%, #b07830 25%, #c89040 50%, #8B5E1A 75%, #c89040 100%)",
        boxShadow: "0 10px 50px rgba(0,0,0,0.55), inset 0 1px 3px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.3)",
      }}>
        {/* Cork board inner */}
        <div style={{
          borderRadius: 10,
          position: "relative",
          overflow: "hidden",
          padding: "20px 16px 24px",
          minHeight: "calc(100vh - 60px)",
          // Realistic cork texture using layered gradients + SVG noise
          background: `
            radial-gradient(ellipse at 20% 15%, rgba(210,160,80,0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(160,100,30,0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(190,130,50,0.3) 0%, transparent 80%),
            repeating-linear-gradient(
              42deg,
              transparent,
              transparent 2px,
              rgba(120,70,20,0.04) 2px,
              rgba(120,70,20,0.04) 4px
            ),
            repeating-linear-gradient(
              -42deg,
              transparent,
              transparent 3px,
              rgba(100,60,10,0.03) 3px,
              rgba(100,60,10,0.03) 5px
            ),
            #c49050
          `,
          boxShadow: "inset 0 3px 10px rgba(0,0,0,0.25), inset 0 -2px 6px rgba(0,0,0,0.15)",
        }}>
          {/* Cork grain dots */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `
              radial-gradient(circle, rgba(100,60,10,0.15) 1px, transparent 1px),
              radial-gradient(circle, rgba(160,100,30,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "18px 18px, 31px 31px",
            backgroundPosition: "0 0, 9px 9px",
          }} />

          {/* Content sits above grain */}
          <div style={{ position: "relative", zIndex: 1 }}>

            {/* Header row: logo + brand name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Pin color="#e74c3c" style={{ top: -6, left: "50%", transform: "translateX(-50%)" }} />
                <div style={{
                  width: 52, height: 52,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                  marginTop: 4,
                }}>
                  <img src={AVATAR_URL} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #fffde7, #fff9c4)",
                padding: "8px 16px",
                borderRadius: 3,
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                fontSize: "clamp(16px, 4vw, 22px)",
                fontWeight: "bold",
                color: "#4e342e",
                boxShadow: "2px 4px 8px rgba(0,0,0,0.25)",
                transform: "rotate(-1.5deg)",
                letterSpacing: 0.5,
              }}>
                helia &amp; lucky forever ✨
              </div>
            </div>

            {/* Main grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}>

              {/* Big notepad with photo */}
              <div style={{ position: "relative", alignSelf: "start" }}>
                <Pin color="#f39c12" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                <div style={{
                  background: "white",
                  borderRadius: "3px 3px 2px 2px",
                  boxShadow: "3px 6px 18px rgba(0,0,0,0.3), 1px 2px 4px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  transform: "rotate(-2deg)",
                  marginTop: 4,
                }}>
                  {/* Spiral binding */}
                  <div style={{
                    background: "linear-gradient(180deg, #e0e0e0, #bdbdbd)",
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    borderBottom: "1px solid #9e9e9e",
                  }}>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} style={{
                        width: 11, height: 11,
                        borderRadius: "50%",
                        border: "2px solid #757575",
                        background: "linear-gradient(135deg, #fff, #e0e0e0)",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                      }} />
                    ))}
                  </div>
                  {/* Photo */}
                  <img src={AVATAR_URL} alt="helia & lucky forever" style={{
                    width: "100%",
                    height: "clamp(160px, 30vw, 220px)",
                    objectFit: "cover",
                    display: "block",
                  }} />
                  {/* Lined section */}
                  <div style={{ padding: "10px 12px 12px 30px", position: "relative", background: "white" }}>
                    <div style={{
                      position: "absolute", left: 22, top: 0, bottom: 0,
                      width: 1.5, background: "#ffcdd2",
                    }} />
                    {[...Array(3)].map((_, i) => (
                      <div key={i} style={{ height: 1, background: "#bbdefb", marginBottom: 13 }} />
                    ))}
                    <p style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(10px, 2.5vw, 13px)",
                      color: "#37474f",
                      marginTop: -36,
                      lineHeight: 2,
                    }}>
                      Helia the human<br />&amp; Lucky the Bordercollie
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* SnapToCalendar sticky */}
                <div style={{ position: "relative" }}>
                  <Pin color="#2ecc71" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                  <a
                    href="/snaptocalendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      background: "linear-gradient(160deg, #fff9c4, #fff176 80%, #ffee58)",
                      borderRadius: 3,
                      padding: "18px 16px 16px",
                      boxShadow: "3px 5px 14px rgba(0,0,0,0.25), 1px 2px 4px rgba(0,0,0,0.1)",
                      transform: "rotate(1.8deg)",
                      marginTop: 4,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                      fontSize: "clamp(15px, 4vw, 20px)",
                      fontWeight: "bold",
                      color: "#4a148c",
                      marginBottom: 8,
                    }}>
                      📸 SnapToCalendar
                    </div>
                    <div style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      color: "#4e342e",
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}>
                      Screenshot any convo and turn it into a calendar event instantly!
                    </div>
                    <div style={{
                      display: "inline-block",
                      background: "#7b1fa2",
                      color: "white",
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(10px, 2.5vw, 12px)",
                      fontWeight: "bold",
                      padding: "4px 12px",
                      borderRadius: 20,
                      boxShadow: "0 2px 6px rgba(123,31,162,0.4)",
                    }}>
                      tap to try it →
                    </div>
                  </a>
                </div>

                {/* Coming soon note */}
                <div style={{ position: "relative" }}>
                  <Pin color="#3498db" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                  <div style={{
                    background: "linear-gradient(160deg, #f5f5f5, #eeeeee)",
                    borderRadius: 3,
                    padding: "16px 14px",
                    boxShadow: "3px 5px 14px rgba(0,0,0,0.2)",
                    transform: "rotate(-1.2deg)",
                    marginTop: 4,
                    minHeight: 80,
                  }}>
                    {/* Lines */}
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ height: 1, background: "#e0e0e0", marginBottom: 14 }} />
                    ))}
                    <p style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      color: "#9e9e9e",
                      fontStyle: "italic",
                      marginTop: -52,
                      lineHeight: 2,
                    }}>
                      more coming soon...
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
