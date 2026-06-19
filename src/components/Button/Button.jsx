export default function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider rounded-sm px-5 py-2.5 transition-all duration-300 cursor-pointer";

  const variants = {
    filled:
      "bg-[#00ff88] text-black font-bold border border-[#00ff88] hover:shadow-[0_0_14px_#00ff88] hover:scale-105",
    default:
      "bg-transparent text-[#00ff88] border border-[#00ff88] hover:shadow-[0_0_14px_#00ff88] hover:scale-105 hover:bg-[#00ff8810]",
  };

  const classes = `${base} ${variants[variant] || variants.default} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}