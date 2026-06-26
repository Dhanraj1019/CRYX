import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../store/Notifucation";
import { useEffect, useState } from "react";

const CYBER_CONFIG = {
  success: {
    tag: "ACCESS GRANTED",
    color: "text-[#00ff88]",
    border: "border-[rgba(0,255,136,0.4)]",
    bg: "bg-[rgba(0,255,136,0.08)]",
    iconBg: "bg-[rgba(0,255,136,0.12)]",
    tagBg: "bg-[rgba(0,255,136,0.12)]",
    bar: "bg-[#00ff88]",
    cornerColor: "border-[#00ff88]",
    icon: "✦",
  },
  error: {
    tag: "THREAT DETECTED",
    color: "text-[#ff3b5c]",
    border: "border-[rgba(255,59,92,0.4)]",
    bg: "bg-[rgba(255,59,92,0.08)]",
    iconBg: "bg-[rgba(255,59,92,0.12)]",
    tagBg: "bg-[rgba(255,59,92,0.12)]",
    bar: "bg-[#ff3b5c]",
    cornerColor: "border-[#ff3b5c]",
    icon: "✕",
  },
};

export default function Notification() {
  const dispatch = useDispatch();
  const notificationData = useSelector((state) => state.notification);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!notificationData?.status) return;
    setHiding(false);

    const hideTimer = setTimeout(() => setHiding(true), 8750);
    const removeTimer = setTimeout(() => dispatch(removeNotification()), 9000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [notificationData.status, dispatch]);

  if (!notificationData?.status) return null;

  const type = notificationData.type === "success" ? "success" : "error";
  const cfg = CYBER_CONFIG[type];

  return (
    <div
      className={`
        fixed top-5 right-5 z-2000 w-88
        flex items-start gap-3 p-4 rounded overflow-hidden
        border font-mono
        ${cfg.bg} ${cfg.border}
        transition-all duration-200
        ${hiding ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}
      `}
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      {/* corner accents */}
      <span
        className={`absolute top-0 left-0 w-2 h-2 border-t border-l opacity-50 ${cfg.cornerColor}`}
      />
      <span
        className={`absolute bottom-0.5 right-0 w-2 h-2 border-b border-r opacity-50 ${cfg.cornerColor}`}
      />

      {/* icon */}
      <div
        className={`
          hrink-0 w-8 h-8 rounded-full
          flex items-center justify-center
          border text-sm
          ${cfg.iconBg} ${cfg.border} ${cfg.color}
        `}
      >
        {cfg.icon}
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <span
          className={`
            inline-block text-[9px] tracking-[0.15em] uppercase
            px-1.5 py-0.5 rounded-sm mb-1 border
            ${cfg.color} ${cfg.tagBg} ${cfg.border}
          `}
        >
          {cfg.tag}
        </span>
        <p className={`text-[13px] font-semibold tracking-wide m-0 mb-0.5 ${cfg.color}`}>
          {notificationData.title}
        </p>
        <p className="text-[11px] m-0 leading-relaxed text-[#8899aa]">
          {notificationData.message}
        </p>
      </div>

      {/* close */}
      <button
        onClick={() => dispatch(removeNotification())}
        aria-label="Dismiss"
        className="shrink-0 w-5 h-5 flex items-center justify-center
          bg-transparent border-none cursor-pointer text-sm
          text-gray-500 hover:text-gray-200 transition-colors"
      >
        ✕
      </button>

      {/* progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left ${cfg.bar}`}
        style={{ animation: "scanShrink 3s linear forwards" }}
      />

      <style>{`
        @keyframes scanShrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}