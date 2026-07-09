import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, className = "", placeholder, type = "text", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 max-w-full break-words font-mono text-sm uppercase tracking-wider text-neon-green"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`min-h-11 w-full min-w-0 rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-sm text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 file:max-w-full file:truncate focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
