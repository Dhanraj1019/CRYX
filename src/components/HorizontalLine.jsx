import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";

export default function HorizontalLine({ title, status }) {
  const navigate=useNavigate();
  return (
    <div className="flex items-center gap-2 sm:gap-4 my-8 md:my-14 animate-fade-in">
      <h2 className="text-neon-green font-mono text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap text-glow-green">
        {`> ${title}`}
      </h2>

      <div className="flex-1 h-px relative overflow-hidden">
        <div className="absolute inset-0 gradient-line opacity-60"></div>
        <div className="absolute top-0 h-full w-8 bg-neon-green/40 blur-sm animate-scan"></div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 border border-neon-red/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm whitespace-nowrap group hover:border-neon-red transition-colors duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-glow-pulse"></span>
        {status==="Keep Eye" ? <span className="text-neon-red font-mono text-xs tracking-wider uppercase">
          {status}
        </span> : 
          <button onClick={()=>navigate(`/${status.replace(/\s+/g, "-").toLowerCase()}`)} className="cursor-pointer text-neon-red font-bold ">{status}</button>
        }
      </div>
    </div>
  );
}