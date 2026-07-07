export default function UnderDevelopment({header,content="// Model Under Development..."}){
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="max-w-2xl min-w-0 text-center font-mono">
                <h1 className="break-words text-2xl font-bold tracking-wider text-neon-green text-glow-green sm:text-3xl">{header}</h1>
                <p className="mt-4 break-words text-sm tracking-wider text-text-muted">{content}</p>
            </div>
        </div>
    )
}
