export default function Card({ heading="", content, image, icon, ...props }) {
  return (
    <div
      className="group relative overflow-hidden border border-border-subtle bg-bg-surface/60 backdrop-blur-sm p-6 transition-all duration-500 hover:border-neon-green/40 rounded-sm animate-fade-in"
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
            className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="text-neon-green text-2xl mb-3">{icon}</div>
      )}

      {/* Heading */}
      {heading && (
        <h3 className="text-neon-green font-mono text-lg font-semibold tracking-wider mb-2 group-hover:text-glow-green transition-all duration-300">
          {heading}
        </h3>
      )}

      {/* Content */}
      {content && (
        <p className="text-text-muted font-mono text-sm leading-relaxed">
          {content}
        </p>
      )}

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-green transition-all duration-700 group-hover:w-full"></div>
    </div>
  );
}