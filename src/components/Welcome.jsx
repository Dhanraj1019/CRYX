import { useEffect, useState } from "react";

const FULL_TEXT = "WELCOME TO CRYX : THE INFOSEC CLUB";
const SUBTITLE = "// Learn. Hack. Build. Secure.";

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
    <div className="flex flex-col items-center justify-center w-full px-3 sm:px-4 py-10 md:py-20 animate-fade-in">
      {/* Decorative top line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-12 bg-neon-green/30"></div>
        <span className="text-neon-green/50 font-mono text-xs tracking-[6px] uppercase">
          System Initialized
        </span>
        <div className="h-px w-12 bg-neon-green/30"></div>
      </div>

      {/* Main heading */}
      <h1
        className="font-mono text-center text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide sm:tracking-wider bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent"
        style={{
          filter: "drop-shadow(0 0 10px rgba(103,232,249,0.2))",
        }}
      >
        {typed}
        <span
          aria-hidden="true"
          className="inline-block ml-1 text-neon-cyan"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 80ms linear" }}
        >
          _
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-6 font-mono text-sm sm:text-base md:text-lg tracking-[2px] sm:tracking-[4px] transition-all duration-700 select-none ${
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
        className={`mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 transition-all duration-700 delay-500 ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Button 1 — Explore Roadmap (gradient fill + scan sweep) */}
        <a
          href="/roadmap"
          id="cta-roadmap"
          className="group relative overflow-hidden font-mono text-xs sm:text-sm font-bold uppercase tracking-[3px] px-7 py-3 rounded-sm text-black"
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
          <span className="relative flex items-center gap-2">
            <span className="text-base">🗺️</span>
            Explore Roadmap
          </span>
        </a>

        {/* Button 2 — Weekend Labs (dashed animated border + corner accents) */}
        <a
          href="/weeklylabs"
          id="cta-labs"
          className="group relative font-mono text-xs sm:text-sm font-bold uppercase tracking-[3px] px-7 py-3 rounded-sm text-neon-cyan"
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
          <span className="relative flex items-center gap-2">
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