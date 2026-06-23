import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, className = "", placeholder, type = "text", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833] ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;