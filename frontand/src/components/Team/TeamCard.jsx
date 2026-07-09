import Button from '../Button/Button'

export default function TeamCard({ data,idx }) {
  return (
    <div className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-sm border border-neon-cyan/20 bg-bg-surface/80 backdrop-blur-sm transition-all duration-500 hover:border-neon-cyan/50 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
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
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-neon-cyan/15 px-4 py-3 sm:px-5">
        <span className="truncate font-mono text-xs tracking-wider text-text-muted">
          ID: {`00${idx}`}
        </span>
        <span className="flex shrink-0 items-center gap-2 border border-neon-green/40 px-2.5 py-1 font-mono text-xs tracking-wider text-neon-green">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-glow-pulse"></span>
          ACTIVE
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-center gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
        <div className="shrink-0 overflow-hidden rounded-sm border border-neon-cyan/20">
          <img
            src={data.publicurl}
            alt={data.username}
            className="h-36 w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 sm:h-44 sm:w-36"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col w-full">
          <h2 className="break-words text-center font-mono text-lg font-bold tracking-wider text-neon-cyan sm:text-left sm:text-xl md:text-2xl">
            {data.firstName && data.lastName ? data.firstName+" "+data.lastName : data.username}
          </h2>

          <p className="mt-1.5 break-words text-center font-mono text-xs uppercase tracking-[3px] text-text-muted sm:text-left">
            {data.role || "// OPERATIVE"}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4 sm:justify-start">
            <Button className="text-xs px-3 py-1.5">Instagram</Button>
            <Button className="text-xs px-3 py-1.5">LinkedIn</Button>
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <div className="flex justify-between text-text-dim font-mono text-xs mb-1.5">
          <span>SYNC_STATUS</span>
          <span>100%</span>
        </div>
        <div className="h-0.5 bg-bg-elevated overflow-hidden rounded-full">
          <div className="h-full w-0 bg-neon-cyan transition-all duration-700 group-hover:w-full rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-cyan transition-all duration-700 group-hover:w-full"></div>
    </div>
  );
}
