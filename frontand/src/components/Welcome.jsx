import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Cpu,
  Terminal,
  Bug,
  Hammer,
  Code2,
  ShieldCheck,
  Lock,
} from "lucide-react";

const FIRST_LINE = "WELCOME TO CRYX : THE";
const SECOND_LINE = " INFOSEC CLUB";
const FULL_TEXT = `${FIRST_LINE} ${SECOND_LINE}`;

const HEADING_CLASS =
  "max-w-full break-words bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-center font-mono text-[clamp(1.35rem,9vw,4rem)] font-bold leading-tight tracking-wide text-transparent sm:tracking-wider";

// icon set that pops out per word — 2 icons each, looping while hovered
const WORD_ICONS = {
  learn: [BookOpen, Cpu],
  hack: [Terminal, Bug],
  build: [Hammer, Code2],
  secure: [ShieldCheck, Lock],
};

const WORD_COLORS = {
  learn: { text: "text-neon-cyan", glow: "#67e8f9" },
  hack: { text: "text-neon-red", glow: "#f87171" },
  build: { text: "text-neon-green", glow: "#34d399" },
  secure: { text: "text-neon-purple", glow: "#c084fc" },
};

function HoverWord({ id, label }) {
  const [active, setActive] = useState(false);
  const Icons = WORD_ICONS[id];
  const { text, glow } = WORD_COLORS[id];

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span className={`${text} font-bold transition-all duration-300`}>
        {label}{" "}
      </span>

      <AnimatePresence>
        {active && (
          <span className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2">
            {Icons.map((Icon, i) => {
              const dir = i === 0 ? -1 : 1;
              return (
                <motion.span
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.3 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [-4, -26 - i * 8, -36 - i * 8, -46 - i * 8],
                    x: dir * (14 + i * 10),
                    scale: [0.3, 1, 1, 0.8],
                    rotate: dir * 12,
                  }}
                  exit={{ opacity: 0, y: -50, scale: 0.4 }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 0.25,
                    ease: "easeOut",
                  }}
                  style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
                >
                  <Icon size={16} strokeWidth={2.25} style={{ color: glow }} />
                </motion.span>
              );
            })}
          </span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Welcome() {
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // ── cyber scanner lens (scoped to the heading only) ─────────
  const headingWrapRef = useRef(null);
  const [lensOn, setLensOn] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.6);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const rafRef = useRef(null);

  const LENS_RADIUS = 62; // smaller, tighter lens

  const handleMouseMove = (e) => {
    const rect = headingWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const dt = Math.max(now - lastPos.current.t, 1);
    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
    const speed = dist / dt;
    lastPos.current = { x, y, t: now };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPos({ x, y });
      setZoom(1.6 + Math.min(speed * 1.4, 0.6)); // 1.6 -> up to ~2.2
    });
  };

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(id);
        setTimeout(() => setShowSubtitle(true), 400);
      }
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 700);
    return () => clearInterval(id);
  }, []);

  const headingInner = (
    <>
      <span className="block whitespace-normal">{typed.slice(0, FIRST_LINE.length)}</span>
      <span className="block whitespace-normal">
        {typed.slice(FIRST_LINE.length + 1)}
        <span
          aria-hidden="true"
          className="inline-block ml-1 text-neon-cyan"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 80ms linear" }}
        >
          _
        </span>
      </span>
    </>
  );

  const clipStyle = `circle(${LENS_RADIUS}px at ${pos.x}px ${pos.y}px)`;

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center overflow-hidden px-3 py-10 animate-fade-in sm:px-4 md:py-20">
      {/* Decorative top line */}
      <div className="mb-6 flex w-full max-w-md items-center justify-center gap-3">
        <div className="h-px min-w-6 flex-1 bg-neon-green/30"></div>
        <span className="shrink-0 text-center font-mono text-[10px] uppercase tracking-[3px] text-neon-green/50 sm:text-xs sm:tracking-[6px]">
          System Initialized
        </span>
        <div className="h-px min-w-6 flex-1 bg-neon-green/30"></div>
      </div>

      {/* ── Heading + cyber scanner lens wrapper ── */}
      <div
        ref={headingWrapRef}
        className="relative w-full"
        onMouseEnter={() => setLensOn(true)}
        onMouseLeave={() => setLensOn(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Real heading, always visible */}
        <h1
          className={HEADING_CLASS}
          style={{ filter: "drop-shadow(0 0 10px rgba(103,232,249,0.2))" }}
        >
          {headingInner}
        </h1>

        {/* Zoomed duplicate — only the circle under the cursor shows this, magnified */}
        {lensOn && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ clipPath: clipStyle, WebkitClipPath: clipStyle }}
          >
            {/* solid backdrop so the magnified text reads cleanly, not doubled */}
            <div className="absolute inset-0 bg-bg-primary" />
            {/* fine cyber grid, sells the "zoomed into data" feel */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
            <h1
              className={HEADING_CLASS}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
                filter: "drop-shadow(0 0 10px rgba(103,232,249,0.5))",
              }}
            >
              {headingInner}
            </h1>
          </div>
        )}

        {/* Scanner ring — thin reticle that tracks the cursor */}
        {lensOn && (
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: pos.x,
              top: pos.y,
              width: LENS_RADIUS * 2,
              height: LENS_RADIUS * 2,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="relative flex h-full w-full items-center justify-center rounded-full"
              style={{
                border: "1px solid rgba(103,232,249,0.65)",
                boxShadow:
                  "0 0 14px rgba(103,232,249,0.35), inset 0 0 16px rgba(103,232,249,0.12)",
              }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-neon-cyan/80" />
              <span className="absolute left-1/2 bottom-0 h-2.5 w-px -translate-x-1/2 bg-neon-cyan/80" />
              <span className="absolute top-1/2 left-0 h-px w-2.5 -translate-y-1/2 bg-neon-cyan/80" />
              <span className="absolute top-1/2 right-0 h-px w-2.5 -translate-y-1/2 bg-neon-cyan/80" />
              <motion.span
                className="absolute inset-1 rounded-full"
                style={{ border: "1px dashed rgba(103,232,249,0.4)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <span className="font-mono text-[8px] tracking-[2px] text-neon-cyan/90">
                SCAN
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Subtitle — words pop icons continuously on hover */}
      <p
        className={`relative z-10 mt-6 max-w-full text-center font-mono text-xs tracking-[1px] transition-all duration-700 select-none sm:text-base sm:tracking-[4px] md:text-lg ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-text-muted">// </span>
        <HoverWord id="learn" label="Learn." />
        <HoverWord id="hack" label="Hack." />
        <HoverWord id="build" label="Build." />
        <HoverWord id="secure" label="Secure." />
      </p>

      {/* Decorative bottom element */}
      <div className={`mt-8 flex items-center gap-4 transition-all duration-700 delay-300 ${
        showSubtitle ? "opacity-100" : "opacity-0"
      }`}>
        <div className="h-px w-20 md:w-32 gradient-line"></div>
        <div className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-glow-pulse shadow-[0_0_10px_#67e8f9]"></div>
        <div className="h-px w-20 md:w-32 gradient-line"></div>
      </div>

      {/* ── CTA Buttons ─────────────────────────────────────────── */}
      <div
        className={`mt-10 flex w-full max-w-xl flex-col items-stretch gap-4 transition-all duration-700 delay-500 sm:flex-row sm:items-center sm:justify-center sm:gap-5 ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <a
          href="/roadmap"
          id="cta-roadmap"
          className="group relative inline-flex min-h-11 max-w-full items-center justify-center overflow-hidden rounded-sm px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-[2px] text-black transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:px-7 sm:text-sm sm:tracking-[3px]"
          style={{
            background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #34d399 100%)",
            backgroundSize: "200% 200%",
            boxShadow: "0 0 14px rgba(52,211,153,0.35), 0 0 28px rgba(52,211,153,0.12)",
            animation: "ctaBgShift 3s ease infinite",
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "ctaScan 1.2s linear infinite",
            }}
          />
          <span className="relative flex min-w-0 items-center justify-center gap-2">
            <span className="text-base">🗺️</span>
            Explore Roadmap
          </span>
        </a>

        <a
          href="/weeklylabs"
          id="cta-labs"
          className="group relative inline-flex min-h-11 max-w-full items-center justify-center rounded-sm px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-[2px] text-neon-cyan transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:px-7 sm:text-sm sm:tracking-[3px]"
          style={{
            background: "rgba(103,232,249,0.04)",
            border: "1px dashed rgba(103,232,249,0.45)",
            boxShadow: "0 0 0 rgba(103,232,249,0)",
            transition: "box-shadow 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 18px rgba(103,232,249,0.25), inset 0 0 12px rgba(103,232,249,0.06)";
            e.currentTarget.style.background = "rgba(103,232,249,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 rgba(103,232,249,0)";
            e.currentTarget.style.background = "rgba(103,232,249,0.04)";
          }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

          <span className="relative flex min-w-0 items-center justify-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-neon-cyan animate-glow-pulse"
              style={{ boxShadow: "0 0 6px rgba(103,232,249,0.8)" }}
            />
            Weekend Labs
            <span className="text-base">⚡</span>
          </span>
        </a>
      </div>

      <style>{`
        @keyframes ctaBgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ctaScan {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}