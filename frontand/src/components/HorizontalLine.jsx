import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";

export default function HorizontalLine({ title, status }) {
  const navigate=useNavigate();
  return (
    <div className="my-8 flex min-w-0 flex-wrap items-center gap-2 animate-fade-in sm:gap-4 md:my-14">
      <h2 className="min-w-0 max-w-full break-words font-mono text-xs uppercase tracking-wider text-neon-green text-glow-green sm:text-sm md:text-base">
        {`> ${title}`}
      </h2>

      <div className="relative h-px min-w-12 flex-1 overflow-hidden">
        <div className="absolute inset-0 gradient-line opacity-60"></div>
        <div className="absolute top-0 h-full w-8 bg-neon-green/40 blur-sm animate-scan"></div>
      </div>

      <div className="group flex min-h-9 max-w-full items-center gap-1.5 rounded-sm border border-neon-red/50 px-2 py-1 transition-colors duration-300 hover:border-neon-red sm:gap-2 sm:px-3 sm:py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-glow-pulse"></span>
        {status==="Keep Eye" ? <span className="text-neon-red font-mono text-xs tracking-wider uppercase">
          {status}
        </span> : 
          <button onClick={()=>navigate(`/${status.replace(/\s+/g, "-").toLowerCase()}`)} className="min-h-8 max-w-full cursor-pointer truncate font-bold text-neon-red transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-neon-red">{status}</button>
        }
      </div>
    </div>
  );
}
