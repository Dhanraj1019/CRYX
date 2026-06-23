export default function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider rounded-sm px-5 py-2.5 transition-all duration-300 cursor-pointer";

  const variants = {
    filled:
      "bg-[#34d399] text-black font-bold border border-[#34d399] hover:shadow-[0_0_10px_rgba(52,211,153,0.4)] hover:scale-105",
    default:
      "bg-transparent text-[#34d399] border border-[#34d399] hover:shadow-[0_0_10px_rgba(52,211,153,0.3)] hover:scale-105 hover:bg-[#34d39910]",
  };

  const classes = `${base} ${variants[variant] || variants.default} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}