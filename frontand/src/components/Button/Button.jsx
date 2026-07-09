export default function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex min-h-11 max-w-full items-center justify-center gap-2 overflow-hidden rounded-sm px-4 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out cursor-pointer focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm";

  const variants = {
    filled:
      "bg-[#34d399] text-black font-bold border border-[#34d399] hover:shadow-[0_0_10px_rgba(52,211,153,0.4)] hover:scale-[1.02]",
    default:
      "bg-transparent text-[#34d399] border border-[#34d399] hover:shadow-[0_0_10px_rgba(52,211,153,0.3)] hover:scale-[1.02] hover:bg-[#34d39910]",
  };

  const classes = `${base} ${variants[variant] || variants.default} ${className}`;

  return (
    <button className={classes} {...props}>
      <span className="min-w-0 truncate">{children}</span>
    </button>
  );
}
