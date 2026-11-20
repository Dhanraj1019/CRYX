import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"; // or: from "motion/react"

/* ====== CONFIGURATION ====== */
const AOC_URL = "https://tryhackme.com/adventofcyber26"; // replace with the exact AoC event URL
const AOC_IMAGE_URL = "https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/Neon%20Cyber%20Christmas%20Badge.png"; // replace with your image URL
const EVENT_START = { year: 2026, month: 12, day: 1 }; // month is 1-12
const TOOLTIP_UPCOMING = "ADVENT OF CYBER 2026 ON TRYHACKME | JOIN THE CHALLENGE";
const TOOLTIP_LIVE = "ADVENT OF CYBER 2026 ON TRYHACKME | JOIN THE LIVE CHALLENGE";
/* =========================== */

const MS_PER_DAY = 86_400_000;

/**
 * Whole calendar days from today to the event start.
 * Both dates are reduced to Y/M/D and compared in UTC, so hours, time zones
 * and DST shifts can never skew the result. Returns 0 or less once started.
 */
function getDaysUntilStart(now = new Date()) {
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const start = Date.UTC(EVENT_START.year, EVENT_START.month - 1, EVENT_START.day);
  return Math.round((start - today) / MS_PER_DAY);
}

/**
 * Returns days remaining (null until mounted, which keeps SSR/hydration safe).
 * Re-evaluates at each local midnight and when the tab becomes visible again.
 * Stops scheduling timers once the event is live.
 */
function useDaysUntilStart() {
  const [days, setDays] = useState(null);

  useEffect(() => {
    let timeoutId;

    const update = () => {
      clearTimeout(timeoutId);
      const remaining = getDaysUntilStart();
      setDays(Math.max(remaining, 0)); // never negative

      if (remaining > 0) {
        const now = new Date();
        const nextMidnight = new Date(
          now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1 // 1s past midnight
        );
        timeoutId = setTimeout(update, nextMidnight - now);
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };

    update();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return days;
}

export default function FloatingAoC() {
  const reduceMotion = useReducedMotion();
  const days = useDaysUntilStart();

  const isReady = days !== null;
  const isLive = isReady && days === 0;
  const badgeText = !isReady
    ? ""
    : isLive
    ? "LIVE NOW"
    : `${days} ${days === 1 ? "DAY" : "DAYS"} LEFT`;
  const tooltipText = isLive ? TOOLTIP_LIVE : TOOLTIP_UPCOMING;

  return (
    <motion.a
      href={AOC_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Advent of Cyber 2026${badgeText ? `, ${badgeText.toLowerCase()}` : ""} – ${
        isLive ? "join the live challenge" : "join the challenge"
      } on TryHackMe (opens in a new tab)`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.6 }}
      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      className="group fixed z-[9999] flex h-[54px] w-[54px] items-center justify-center rounded-full
                 right-[max(0.875rem,env(safe-area-inset-right))]
                 bottom-[max(0.875rem,env(safe-area-inset-bottom))]
                 sm:h-16 sm:w-16 sm:right-6 sm:bottom-6
                 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                 focus-visible:ring-offset-4 focus-visible:ring-offset-black
                 [-webkit-tap-highlight-color:transparent]"
    >
      {/* Pulsing glow */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full bg-[#00FF88]/40 blur-md"
        animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.12, 1] }}
        transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating outer ring (only this layer spins) */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full
                   bg-[conic-gradient(from_0deg,#00FF88,#00E5FF_35%,#A855F7_55%,transparent_70%,#00FF88)]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Stable dark core with your image */}
      <span
        aria-hidden="true"
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full
                   border-2 border-[#00FF88] bg-[#05080d] p-[3px]
                   shadow-[0_0_12px_rgba(0,255,136,0.5),0_0_24px_rgba(0,229,255,0.2),inset_0_0_12px_rgba(0,255,136,0.15)]
                   transition-all duration-300
                   group-hover:border-cyan-400
                   group-hover:shadow-[0_0_18px_rgba(0,255,136,0.85),0_0_38px_rgba(0,229,255,0.55),inset_0_0_16px_rgba(0,255,136,0.3)]
                   group-focus-visible:border-cyan-400"
      >
        <img
          src={AOC_IMAGE_URL}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="h-full w-full select-none rounded-full object-cover"
        />
      </span>

      {/* Badge: wrapper handles centering so Framer's transforms don't clash with Tailwind's */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2.5 left-1/2 -translate-x-1/2"
      >
        <AnimatePresence mode="wait" initial={false}>
          {badgeText && (
            <motion.span
              key={badgeText}
              initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5 font-mono
                          text-[8px] font-bold leading-none tracking-wider sm:px-2 sm:text-[9px]
                          ${
                            isLive
                              ? "border border-[#00FF88] bg-[#05080d] text-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.6)]"
                              : "bg-[#00FF88] text-[#05080d] shadow-[0_0_10px_rgba(0,255,136,0.7)]"
                          }`}
            >
              {isLive && (
                <span className="relative flex h-1.5 w-1.5">
                  {!reduceMotion && (
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-[#00FF88]"
                      animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FF88]" />
                </span>
              )}
              {badgeText}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* Tooltip (hover + keyboard focus) */}
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute right-full top-1/2 mr-4 w-max
                   max-w-[min(260px,calc(100vw-100px))] -translate-y-1/2 translate-x-1.5 rounded-md
                   border border-cyan-400 bg-[#05080d]/95 px-3 py-2 font-mono text-[10px] font-semibold
                   leading-snug tracking-wider text-[#00FF88] opacity-0
                   shadow-[0_0_14px_rgba(0,229,255,0.3)] transition-all duration-200
                   group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
                   group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100
                   sm:text-[11px]"
      >
        {tooltipText}
      </span>
    </motion.a>
  );
}