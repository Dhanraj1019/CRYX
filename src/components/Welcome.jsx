import { useEffect, useState } from "react";

const FIRST_LINE = "WELCOME TO CRYX : THE";
const SECOND_LINE = " INFOSEC CLUB";
const FULL_TEXT = `${FIRST_LINE} ${SECOND_LINE}`;

export default function Welcome() {
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);

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

      {/* Main heading */}
      <h1
        className="max-w-full break-words bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-center font-mono text-[clamp(1.35rem,9vw,4rem)] font-bold leading-tight tracking-wide text-transparent sm:tracking-wider"
        style={{
          filter: "drop-shadow(0 0 10px rgba(103,232,249,0.2))",
        }}
      >
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
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-6 max-w-full text-center font-mono text-xs tracking-[1px] transition-all duration-700 select-none sm:text-base sm:tracking-[4px] md:text-lg ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-text-muted">// </span>
        <span className="text-neon-cyan font-bold transition-all duration-300">Learn. </span>
        <span className="text-neon-red font-bold transition-all duration-300">Hack. </span>
        <span className="text-neon-green font-bold transition-all duration-300">Build. </span>
        <span className="text-neon-purple font-bold transition-all duration-300">Secure.</span>
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
        {/* Button 1 — Explore Roadmap (gradient fill + scan sweep) */}
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
          {/* Scan sweep overlay */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "ctaScan 1.2s linear infinite",
            }}
          />
          {/* Icon + label */}
          <span className="relative flex min-w-0 items-center justify-center gap-2">
            <span className="text-base">🗺️</span>
            Explore Roadmap
          </span>
        </a>

        {/* Button 2 — Weekend Labs (dashed animated border + corner accents) */}
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
          {/* Animated corner accents */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Blinking status dot */}
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

      {/* Inline keyframes for the gradient button */}
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
