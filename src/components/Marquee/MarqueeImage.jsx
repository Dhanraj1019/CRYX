import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function MarqueeImage({ images = [], speed = 30 }) {
  const controls = useAnimationControls();
  const isHovered = useRef(false);

  // Duplicate so the strip loops seamlessly at the -50% mark
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
    controls.stop();          // freeze in place — no jump
  };

  const handleHoverEnd = () => {
    isHovered.current = false;
    startAnimation();         // resume smoothly from frozen position
  };

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        animate={controls}
        onViewportEnter={startAnimation}   // starts when scrolled into view
        className="flex gap-4"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {images.map((i) => (
          <img
            key={i}
            src={i}
            alt=""
            aria-hidden={i >= images.length}   // screen readers skip duplicates
            className="h-32 w-auto rounded-lg object-cover shrink-0"
            draggable={false}
          />
        ))}
      </motion.div>
    </div>
  );
}