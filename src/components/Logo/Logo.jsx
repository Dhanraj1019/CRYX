export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00ff88"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 drop-shadow-[0_0_6px_#00ff88]"
      >
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" />
        <path d="M12 8v4m0 2v1" opacity="0.7" />
      </svg>
      <span
        className="font-mono text-3xl font-bold tracking-widest text-neon-green"
        style={{
          textShadow:
            "0 0 7px #00ff88, 0 0 14px #00ff8866, 0 0 28px #00ff8833",
        }}
      >
        CRYX
      </span>
    </div>
  );
}