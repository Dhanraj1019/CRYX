export default function HorizontalLine({ title, status }) {
  return (
    <div className="flex items-center gap-4 my-10 md:my-14 animate-fade-in">
      <h2 className="text-neon-green font-mono text-sm md:text-base tracking-wider uppercase whitespace-nowrap text-glow-green">
        {`> ${title}`}
      </h2>

      <div className="flex-1 h-px relative overflow-hidden">
        <div className="absolute inset-0 gradient-line opacity-60"></div>
        <div className="absolute top-0 h-full w-8 bg-neon-green/40 blur-sm animate-scan"></div>
      </div>

      <div className="flex items-center gap-2 border border-neon-red/50 px-3 py-1.5 rounded-sm whitespace-nowrap group hover:border-neon-red transition-colors duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-glow-pulse"></span>
        <span className="text-neon-red font-mono text-xs tracking-wider uppercase">
          {status}
        </span>
      </div>
    </div>
  );
}