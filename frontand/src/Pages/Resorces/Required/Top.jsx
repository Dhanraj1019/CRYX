export default function Top({features}){
    return (
        <>
              <div className="mb-12 min-w-0 text-center md:mb-16">
                {/* System label */}
                <div className="mb-6 flex min-w-0 items-center justify-center gap-3">
                  <div className="h-px min-w-6 flex-1 bg-neon-green/30 sm:max-w-16" />
                  <span className="shrink-0 break-words text-center font-mono text-[10px] uppercase tracking-[3px] text-neon-green/60 sm:text-xs sm:tracking-[8px]">
                    CRYX // WEEKLY LABS
                  </span>
                  <div className="h-px min-w-6 flex-1 bg-neon-green/30 sm:max-w-16" />
                </div>
        
                <h1
                  className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-neon-green mb-4"
                  style={{
                    textShadow:
                      "0 0 4px rgba(52,211,153,0.35), 0 0 8px rgba(52,211,153,0.2), 0 0 14px rgba(52,211,153,0.08)",
                  }}
                >
                  Weekend Labs
                </h1>
        
                <p className="mx-auto max-w-2xl break-words px-2 font-mono text-sm leading-relaxed text-text-muted sm:text-base">
                  {"// Every weekend we conduct hands-on hacking labs together."}
                  <br />
                  {"// Click any card to open the lab on its platform."}
                </p>
        
                {/* Stats row */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8">
                  {features.map((stat) => (
                    <div key={stat.label} className="min-w-0 text-center">
                      <div
                        className="font-mono text-xl sm:text-2xl font-bold"
                        style={{
                          color: stat.color,
                          textShadow: `0 0 8px ${stat.color}40`,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div className="break-words font-mono text-xs uppercase tracking-wider text-text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        </>
    )
}
