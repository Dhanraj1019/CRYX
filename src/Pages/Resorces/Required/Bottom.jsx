export default function Bottom(){
    return (
        <>
                {/* ── Footer Note ── */}
        <div className="mt-12 md:mt-16 border border-neon-cyan/15 rounded-sm p-5 sm:p-6 bg-bg-surface/30 backdrop-blur-sm">
            <div className="flex items-start gap-3">
            <span className="text-neon-cyan font-mono text-xs mt-0.5">[i]</span>
            <p className="font-mono text-xs text-text-muted leading-relaxed">
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