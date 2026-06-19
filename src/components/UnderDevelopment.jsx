export default function UnderDevelopment({header,content="// Model Under Development..."}){
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center font-mono">
                <h1 className="text-neon-green text-3xl font-bold tracking-wider text-glow-green">{header}</h1>
                <p className="mt-4 text-text-muted text-sm tracking-wider">{content}</p>
            </div>
        </div>
    )
}