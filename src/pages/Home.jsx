import { useNavigate } from 'react-router-dom';

const AVATAR_URL = "https://base44.app/api/apps/69e39242fd68a250ce80b1bd/files/mp/public/69e39242fd68a250ce80b1bd/4427974ca_ChatGPTImageApr3202610_06_23AM11.png";

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
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(160deg, #8B6F47 0%, #6B5233 40%, #5D4A2F 100%)",
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
                <Pin color="#ffffff" style={{ top: -6, left: "50%", transform: "translateX(-50%)" }} />
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
                helia &amp; lucky
              </div>
            </div>

            {/* Main grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* SnapToCalendar sticky */}
                <div style={{ position: "relative" }}>
                  <Pin color="#2ecc71" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                  <div
                    onClick={() => navigate('/snaptocalendar')}
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
                      📅 SnapToCalendar
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/snaptocalendar');
                      }}
                      style={{
                        background: "#4a148c",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontFamily: "'Comic Sans MS', cursive",
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      Open SnapToCalendar 📅
                    </button>
                  </div>
                </div>

                {/* Congratulations sticky note */}
                <div style={{ position: "relative" }}>
                  <Pin color="#f59e0b" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                  <div
                    onClick={() => navigate('/congratulations')}
                    style={{
                      display: "block",
                      background: "linear-gradient(160deg, #fef9c3, #fef08a 80%, #fde047)",
                      borderRadius: 3,
                      padding: "18px 16px 16px",
                      boxShadow: "3px 5px 14px rgba(0,0,0,0.25), 1px 2px 4px rgba(0,0,0,0.1)",
                      transform: "rotate(1.0deg)",
                      marginTop: 4,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                      fontSize: "clamp(15px, 4vw, 20px)",
                      fontWeight: "bold",
                      color: "#92400e",
                      marginBottom: 8,
                    }}>
                      🎉 Congratulations!
                    </div>
                    <div style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      color: "#4e342e",
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}>
                      Welcome to the team, new user! Click here to celebrate! 🥳
                    </div>
                    <button
                      style={{
                        background: "#d97706",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontFamily: "'Comic Sans MS', cursive",
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      congratulations 🎊
                    </button>
                  </div>
                </div>

                {/* New Button sticky note */}
                <div style={{ position: "relative" }}>
                  <Pin color="#3b82f6" style={{ top: -8, left: "50%", transform: "translateX(-50%)" }} />
                  <div
                    style={{
                      background: "linear-gradient(160deg, #dbeafe, #bfdbfe 80%, #93c5fd)",
                      borderRadius: 3,
                      padding: "18px 16px 16px",
                      boxShadow: "3px 5px 14px rgba(0,0,0,0.25), 1px 2px 4px rgba(0,0,0,0.1)",
                      transform: "rotate(-1.2deg)",
                      marginTop: 4,
                    }}
                  >
                    <div style={{
                      fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                      fontSize: "clamp(15px, 4vw, 20px)",
                      fontWeight: "bold",
                      color: "#1e3a8a",
                      marginBottom: 8,
                    }}>
                      ✨ New Button
                    </div>
                    <div style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      color: "#1e40af",
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}>
                      Click the button below to do something awesome!
                    </div>
                    <button
                      onClick={() => navigate('/success')}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontFamily: "'Comic Sans MS', cursive",
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        transition: "transform 0.1s",
                      }}
                    >
                      Click Me! ✨
                    </button>
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
