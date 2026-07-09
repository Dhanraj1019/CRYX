export default function Loader({ size = 150 }) {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {[
          { r: 30, stroke: "#00ff88", dash: "52 142", dur: "1.2s", dir: "normal" },
          { r: 22, stroke: "#00e5ff", dash: "34 104", dur: "1.8s", dir: "reverse" },
          { r: 14, stroke: "#ff3860", dash: "18 70",  dur: "2.4s", dir: "normal" },
        ].map(({ r, stroke, dash, dur, dir }, i) => (
          <svg key={i} className="absolute inset-0 animate-spin"
            style={{ animationDuration: dur, animationDirection: dir }}
            viewBox="0 0 72 72" width={size} height={size} aria-hidden="true">
            <circle cx="36" cy="36" r={r} fill="none" stroke={stroke}
              strokeWidth="1.8" strokeDasharray={dash} strokeLinecap="round" />
          </svg>
        ))}
        {/* Red center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      </div>
    </div>
  );
}