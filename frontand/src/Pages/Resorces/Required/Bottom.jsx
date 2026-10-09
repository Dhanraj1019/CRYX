export default function Bottom(){
    return (
        <>
                {/* ── Footer Note ── */}
        <div className="mt-12 min-w-0 rounded-sm border border-neon-cyan/15 bg-bg-surface/30 p-5 backdrop-blur-sm sm:p-6 md:mt-16">
            <div className="flex min-w-0 items-start gap-3">
            <span className="text-neon-cyan font-mono text-xs mt-0.5">[i]</span>
            <p className="min-w-0 break-words font-mono text-xs leading-relaxed text-text-muted">
                Labs are conducted every weekend. Members solve the lab together, then a senior walks
                through the methodology. New labs are added every week. VPN access (OpenVPN /
                WireGuard) is required for HTB and THM machines — reach out on the club Discord for
                setup help.
            </p>
            </div>
        </div>
        </>
    )
}
