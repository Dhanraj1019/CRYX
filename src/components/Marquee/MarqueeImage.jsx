import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function MarqueeImage({ images = [], speed = 30 }) {
  const controls = useAnimationControls();
  const isHovered = useRef(false);

  const doubled = [...images, ...images];

  const startAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const handleHoverStart = () => {
    isHovered.current = true;
    controls.stop();
  };

  const handleHoverEnd = () => {
    isHovered.current = false;
    startAnimation();
  };

  return (
    <div
      className="relative overflow-hidden w-full py-4 group"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-liner-to-r from-bg-primary to-transparent z-10 pointer-events-none"></div>

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-liner-to-l from-bg-primary to-transparent z-10 pointer-events-none"></div>

      <motion.div
        animate={controls}
        onViewportEnter={startAnimation}
        className="flex gap-5"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {doubled.map((i,idx) => (
          <div
            key={`${idx}-${i.imageurl}`}
            className="relative shrink-0 overflow-hidden rounded-sm border border-border-subtle group/img hover:border-neon-cyan/60 transition-all duration-500"
            style={{
              boxShadow: "0 0 0 rgba(6,182,212,0)",
              transition: "box-shadow 0.5s ease, border-color 0.5s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(6,182,212,0)";
            }}
          >
            <img
              src={i.publicurl}
              alt=""
              aria-hidden={idx >= images.length}
              className="h-32 sm:h-40 md:h-52 w-auto object-cover shrink-0 transition-transform duration-700 hover:scale-105"
              draggable={false}
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-liner-to-b from-transparent via-neon-cyan/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}