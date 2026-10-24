export default function TeamCard({ data, idx }) {
  const displayName =
    data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : data.username;

  return (
    <div
      className="group relative flex w-full min-w-0 shrink-0 flex-col overflow-hidden rounded-sm border border-neon-cyan/20 bg-bg-surface/80 backdrop-blur-sm transition-all duration-500 hover:border-neon-cyan/50 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
      style={{
        boxShadow: "0 0 0 rgba(6,182,212,0)",
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 25px rgba(6,182,212,0.2), 0 0 50px rgba(6,182,212,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 rgba(6,182,212,0)";
      }}
    >
      {/* Header */}
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-neon-cyan/15 px-4 py-3 sm:px-5">
        <span className="truncate font-mono text-xs tracking-wider text-text-muted">
          ID: {String(idx).padStart(3, "0")}
        </span>
        <span className="flex shrink-0 items-center gap-2 border border-neon-green/40 px-2.5 py-1 font-mono text-xs tracking-wider text-neon-green">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-glow-pulse"></span>
          ACTIVE
        </span>
      </div>

      {/* Body: stacked + centered on mobile, side-by-side from sm up */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
        {/* Fixed square avatar on mobile so the image can't stretch or collapse */}
        <div className="h-40 w-40 shrink-0 overflow-hidden rounded-sm border border-neon-cyan/20 sm:h-44 sm:w-36">
          <img
            src={data.publicurl}
            alt={data.username}
            draggable={false}
            className="h-full w-full object-cover transition-all duration-700 sm:grayscale sm:group-hover:scale-105 sm:group-hover:grayscale-0"
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col">
          <h2 className="break-words text-center font-mono text-lg font-bold tracking-wider text-neon-cyan sm:text-left sm:text-xl md:text-2xl">
            {displayName}
          </h2>

          <p className="mt-1.5 break-words text-center font-mono text-xs uppercase tracking-[2px] text-text-muted sm:text-left sm:tracking-[3px]">
            {data?.role || "// OPERATIVE"}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {data.instagramid && (
              <a
                href={`https://instagram.com/${data.instagramid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative overflow-hidden rounded-md border border-pink-500/70 bg-pink-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pink-400 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.45)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/link:translate-x-full" />
                <span className="relative flex items-center gap-2">Instagram</span>
              </a>
            )}

            {data.linkdinid && (
              <a
                href={`https://linkedin.com/in/${data.linkdinid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative overflow-hidden rounded-md border border-blue-500/70 bg-blue-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/link:translate-x-full" />
                <span className="relative flex items-center gap-2">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sync bar: always full on mobile (no hover on touch), animates on hover from sm up */}
      <div className="px-4 pb-4 sm:px-5">
        <div className="mb-1.5 flex justify-between font-mono text-xs text-text-dim">
          <span>SYNC_STATUS</span>
          <span>100%</span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-full bg-bg-elevated">
          <div className="h-full w-full rounded-full bg-neon-cyan transition-all duration-700 sm:w-0 sm:group-hover:w-full"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-cyan transition-all duration-700 group-hover:w-full"></div>
    </div>
  );
}
