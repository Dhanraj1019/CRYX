import { useEffect, useState } from "react";

const FULL_TEXT = "WELCOME TO CRYX CLUB";
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
    <div className="flex flex-col items-center justify-center w-full px-4 py-16 md:py-24 animate-fade-in">
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
        className="font-mono text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-neon-green"
        style={{
          textShadow:
            "0 0 4px rgba(0,255,136,0.7), 0 0 10px rgba(0,255,136,0.5), 0 0 20px rgba(0,255,136,0.3), 0 0 40px rgba(0,255,136,0.15)",
        }}
      >
        {typed}
        <span
          aria-hidden="true"
          className="inline-block ml-1"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 80ms linear" }}
        >
          _
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-6 font-mono text-sm sm:text-base md:text-lg tracking-[4px] text-neon-cyan transition-all duration-700 ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {SUBTITLE}
      </p>

      {/* Decorative bottom element */}
      <div className={`mt-8 flex items-center gap-4 transition-all duration-700 delay-300 ${
        showSubtitle ? "opacity-100" : "opacity-0"
      }`}>
        <div className="h-px w-20 md:w-32 gradient-line"></div>
        <div className="w-2 h-2 bg-neon-green rounded-full animate-glow-pulse"></div>
        <div className="h-px w-20 md:w-32 gradient-line"></div>
      </div>
    </div>
  );
}
