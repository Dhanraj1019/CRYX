import { useState } from "react";

const newsEntries = [
  { id: 1, time: "[10:42]", text: "Microsoft patches Exchange vulnerability", sev: "high" },
  { id: 2, time: "[09:15]", text: "CISA issues ransomware advisory", sev: "high" },
  { id: 3, time: "[08:00]", text: "New Linux malware discovered", sev: "med" },
  { id: 4, time: "[Yesterday]", text: "Chrome emergency update released", sev: "med" },
  { id: 5, time: "[Yesterday]", text: "GitHub phishing campaign", sev: "low" },
];

const sevColor = {
  high: "bg-red-500",
  med:  "bg-amber-400",
  low:  "bg-emerald-400",
};

export default function CyberNewsLog() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto font-mono text-emerald-400"
      style={{ background: "#050d0f" }}
    >
      {/* Outer border with corner accent */}
      <div
        className="relative border border-emerald-900 rounded-sm overflow-hidden"
        style={{ boxShadow: "0 0 0 1px #064e3b22" }}
      >
        {/* Top scanning line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-emerald-900 bg-black/40">
          <span className="text-emerald-400 text-sm">{">"}</span>
          <span className="text-emerald-400 text-sm tracking-widest">latest_cyber_news.log</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-emerald-900 border-b border-emerald-900">
          {[
            { val: "5",  label: "ALERTS"   },
            { val: "2",  label: "CRITICAL"  },
            { val: "48h", label: "WINDOW"   },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-4 gap-1 bg-black/20">
              <span
                className="font-mono font-bold text-emerald-300 leading-none"
                style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.5rem" }}
              >
                {val}
              </span>
              <span className="text-emerald-700 tracking-widest text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* News entries */}
        <ul>
          {newsEntries.map((entry, i) => (
            <li
              key={entry.id}
              onMouseEnter={() => setHovered(entry.id)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors duration-150",
                i !== newsEntries.length - 1 ? "border-b border-emerald-900/50" : "",
                hovered === entry.id ? "bg-emerald-950/40" : "bg-transparent",
              ].join(" ")}
            >
              {/* Severity dot */}
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${sevColor[entry.sev]}`}
                style={{ boxShadow: hovered === entry.id ? `0 0 6px currentColor` : "none" }}
              />

              {/* Timestamp */}
              <span className="text-emerald-700 text-sm w-24 flex-shrink-0 tracking-wide">
                {entry.time}
              </span>

              {/* Text */}
              <span
                className={`flex-1 text-sm tracking-wide transition-colors duration-150 ${
                  hovered === entry.id ? "text-emerald-300" : "text-emerald-400/80"
                }`}
              >
                {entry.text}
              </span>

              {/* Arrow */}
              <span
                className={`text-sm transition-all duration-150 ${
                  hovered === entry.id
                    ? "text-emerald-300 translate-x-1"
                    : "text-emerald-800"
                }`}
              >
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}