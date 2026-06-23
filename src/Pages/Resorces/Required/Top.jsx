export default function Top({features}){
    return (
        <>
              <div className="text-center mb-12 md:mb-16">
                {/* System label */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-10 sm:w-16 bg-neon-green/30" />
                  <span className="text-neon-green/60 font-mono text-xs tracking-[5px] sm:tracking-[8px] uppercase">
                    CRYX // WEEKLY LABS
                  </span>
                  <div className="h-px w-10 sm:w-16 bg-neon-green/30" />
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
        
                <p className="font-mono text-text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
                  {"// Every weekend we conduct hands-on hacking labs together."}
                  <br />
                  {"// Click any card to open the lab on its platform."}
                </p>
        
                {/* Stats row */}
                <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 flex-wrap">
                  {features.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="font-mono text-xl sm:text-2xl font-bold"
                        style={{
                          color: stat.color,
                          textShadow: `0 0 8px ${stat.color}40`,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-mono text-xs text-text-muted tracking-wider uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        </>
    )
}