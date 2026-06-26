import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../store/Notifucation";
import { useEffect, useState } from "react";

/* ── Theme config — matches site token colours exactly ── */
const CYBER_CONFIG = {
  success: {
    label:       "ACCESS GRANTED",
    accentColor: "#34d399",                          // --color-neon-green
    borderColor: "rgba(52, 211, 153, 0.35)",
    bgColor:     "rgba(52, 211, 153, 0.06)",
    glowColor:   "rgba(52, 211, 153, 0.18)",
    tagBg:       "rgba(52, 211, 153, 0.10)",
    barColor:    "#34d399",
    textShadow:  "0 0 8px rgba(52,211,153,0.6)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    label:       "THREAT DETECTED",
    accentColor: "#f87171",                          // --color-neon-red
    borderColor: "rgba(248, 113, 113, 0.35)",
    bgColor:     "rgba(248, 113, 113, 0.06)",
    glowColor:   "rgba(248, 113, 113, 0.18)",
    tagBg:       "rgba(248, 113, 113, 0.10)",
    barColor:    "#f87171",
    textShadow:  "0 0 8px rgba(248,113,113,0.6)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6"  y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
};

/* Auto-dismiss timing (ms) */
const TOTAL_MS   = 5000;
const HIDE_AT_MS = 4700;

export default function Notification() {
  const dispatch         = useDispatch();
  const notificationData = useSelector((state) => state.notification);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!notificationData?.status) return;
    setHiding(false);

    const hideTimer   = setTimeout(() => setHiding(true),              HIDE_AT_MS);
    const removeTimer = setTimeout(() => dispatch(removeNotification()), TOTAL_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [notificationData.status, notificationData.message, dispatch]);

  if (!notificationData?.status) return null;

  const type = notificationData.type === "success" ? "success" : "error";
  const cfg  = CYBER_CONFIG[type];

  return (
    <div
      style={{
        position:       "fixed",
        top:            "80px",           /* below the fixed AppBar */
        right:          "20px",
        zIndex:         9999,
        width:          "340px",
        fontFamily:     "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
        /* glassmorphism panel */
        background:     "rgba(10, 14, 23, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border:         `1px solid ${cfg.borderColor}`,
        borderRadius:   "4px",
        boxShadow:      `0 0 0 1px rgba(0,0,0,0.4),
                         0 8px 32px rgba(0,0,0,0.55),
                         0 0 24px ${cfg.glowColor}`,
        overflow:       "hidden",
        /* slide in / out */
        transition:     "opacity 0.3s ease, transform 0.3s ease",
        opacity:        hiding ? 0   : 1,
        transform:      hiding ? "translateX(24px) scale(0.97)" : "translateX(0) scale(1)",
      }}
    >
      {/* ── Corner bracket accents ── */}
      <span style={{
        position:"absolute", top:0, left:0,
        width:10, height:10,
        borderTop:`1.5px solid ${cfg.accentColor}`,
        borderLeft:`1.5px solid ${cfg.accentColor}`,
        opacity:0.7,
      }} />
      <span style={{
        position:"absolute", bottom:4, right:0,
        width:10, height:10,
        borderBottom:`1.5px solid ${cfg.accentColor}`,
        borderRight:`1.5px solid ${cfg.accentColor}`,
        opacity:0.7,
      }} />

      {/* ── Top accent line (scanline) ── */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:"1.5px",
        background:`linear-gradient(90deg, transparent, ${cfg.accentColor}, transparent)`,
        opacity:0.7,
      }} />

      {/* ── Main content row ── */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"14px 14px 18px 14px" }}>

        {/* Icon bubble */}
        <div style={{
          flexShrink: 0,
          width:      32,
          height:     32,
          borderRadius:"50%",
          border:     `1px solid ${cfg.borderColor}`,
          background: cfg.tagBg,
          display:    "flex",
          alignItems: "center",
          justifyContent:"center",
          boxShadow:  `0 0 10px ${cfg.glowColor}`,
        }}>
          {cfg.icon}
        </div>

        {/* Text block */}
        <div style={{ flex:1, minWidth:0 }}>

          {/* Status tag */}
          <span style={{
            display:       "inline-block",
            fontSize:      "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding:       "2px 6px",
            marginBottom:  "5px",
            borderRadius:  "2px",
            border:        `1px solid ${cfg.borderColor}`,
            background:    cfg.tagBg,
            color:         cfg.accentColor,
            textShadow:    cfg.textShadow,
          }}>
            {cfg.label}
          </span>

          {/* Title */}
          <p style={{
            margin:        "0 0 3px 0",
            fontSize:      "13px",
            fontWeight:    700,
            letterSpacing: "0.06em",
            color:         cfg.accentColor,
            textShadow:    cfg.textShadow,
            whiteSpace:    "nowrap",
            overflow:      "hidden",
            textOverflow:  "ellipsis",
          }}>
            {notificationData.title}
          </p>

          {/* Message */}
          <p style={{
            margin:     "0",
            fontSize:   "11px",
            lineHeight: 1.55,
            color:      "#94a3b8",          /* --color-text-muted-ish */
            fontFamily: "inherit",
          }}>
            {notificationData.message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(removeNotification())}
          aria-label="Dismiss notification"
          style={{
            flexShrink:  0,
            width:       20,
            height:      20,
            background:  "transparent",
            border:      "none",
            cursor:      "pointer",
            color:       "#475569",
            fontSize:    "14px",
            lineHeight:  1,
            padding:     0,
            display:     "flex",
            alignItems:  "center",
            justifyContent:"center",
            transition:  "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = cfg.accentColor}
          onMouseLeave={e => e.currentTarget.style.color = "#475569"}
        >
          ✕
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       0,
        height:     "2px",
        width:      "100%",
        transformOrigin: "left",
        background: `linear-gradient(90deg, ${cfg.accentColor}, ${cfg.accentColor}88)`,
        boxShadow:  `0 0 6px ${cfg.accentColor}`,
        animation:  `cryx-shrink ${TOTAL_MS}ms linear forwards`,
      }} />

      {/* ── Keyframe (scoped inline) ── */}
      <style>{`
        @keyframes cryx-shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}