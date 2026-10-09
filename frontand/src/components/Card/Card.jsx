export default function Card({ heading="", content, image, icon, ...props }) {
  return (
    <div
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-border-subtle bg-bg-surface/60 p-4 backdrop-blur-sm transition-all duration-500 hover:border-neon-green/40 animate-fade-in sm:p-6"
      style={{
        boxShadow: "0 0 0 rgba(0,255,136,0)",
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 20px rgba(0,255,136,0.15), 0 0 40px rgba(0,255,136,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 rgba(0,255,136,0)";
      }}
      {...props}
    >
      {image && (
        <div className="overflow-hidden rounded-sm mb-4 border border-border-subtle">
          <img
            src={image}
            alt={heading}
          className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-44"
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="mb-3 max-w-full break-words text-2xl text-neon-green">{icon}</div>
      )}

      {/* Heading */}
      {heading && (
        <h3 className="mb-2 min-w-0 break-words font-mono text-lg font-semibold tracking-wider text-neon-green transition-all duration-300 group-hover:text-glow-green">
          {heading}
        </h3>
      )}

      {/* Content */}
      {content && (
        <p className="min-w-0 break-words font-mono text-sm leading-relaxed text-text-muted">
          {content}
        </p>
      )}

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-green transition-all duration-700 group-hover:w-full"></div>
    </div>
  );
}
