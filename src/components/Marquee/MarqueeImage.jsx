import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import StorageObj from '../../../Supabase/storage';
import { useSelector } from "react-redux";

const formatEventDate = (date) => {
  if (!date) return "Date TBA";
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const formatEventTime = (time) => {
  if (!time) return "Time TBA";
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`2000-01-01T${time}`));
};
// ... formatEventDate and formatEventTime stay same ...

export default function MarqueeImage({ onDelete, images = [], speed = 30, detail_status = false }) {
  const userRole = useSelector((state) => state.auth.role);
  const isHovered = useRef(false);
  const xPos = useRef(0);           // tracks position in pixels
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const doubled = [...images, ...images];

  // useAnimationFrame runs every frame — we manually move x
  useAnimationFrame((_, delta) => {
    if (isHovered.current) return; // paused on hover
    if (!containerRef.current) return;

    const totalWidth = containerRef.current.scrollWidth / 2; // half = one set of images
    const pxPerMs = totalWidth / (speed * 1000);             // speed = seconds for full loop

    xPos.current -= delta * pxPerMs;

    // reset when we've scrolled one full set width
    if (Math.abs(xPos.current) >= totalWidth) {
      xPos.current = 0;
    }

    x.set(xPos.current);
  });

  const handleHoverStart = () => { isHovered.current = true; };
  const handleHoverEnd = () => { isHovered.current = false; };

  const deleteEvent = async (data) => {
    const result = await DatabaseObj.deleteRow({ bucket: "event", id: data.id });
    if (result) {
      const result = await StorageObj.deleteFile({ bucket: "eventimage", path: [data.imageurl] });
      if (result.error) {
        // console.log("error in marqueeimage.jsx ", result.error);
      } else {
        const temp = images.filter((it) => it.id !== data.id);
        onDelete(temp);
      }
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full py-4 group"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-liner-to-r from-bg-primary to-transparent z-10 pointer-events-none" />

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-liner-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        style={{ x, width: "max-content", willChange: "transform" }}
        className="flex gap-5"
      >
        {doubled.map((i, idx) => {
          const isDuplicate = idx >= images.length;
          const registrationHref = `/event/${i.id}`;
          return (
            <div
              key={`${idx}-${i.imageurl}`}
              aria-hidden={isDuplicate}
              className="relative shrink-0 overflow-hidden rounded-sm border border-border-subtle group/img hover:border-neon-cyan/60 focus-within:border-neon-cyan/60 transition-all duration-500"
              style={{ boxShadow: "0 0 0 rgba(6,182,212,0)", transition: "box-shadow 0.5s ease, border-color 0.5s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 rgba(6,182,212,0)";
              }}
            >
              <img
                src={i.publicurl}
                alt={i.title || "CRYX event"}
                className="h-32 w-64 sm:h-40 sm:w-80 md:h-52 md:w-104 object-cover shrink-0 transition-all duration-700 group-hover/img:scale-105 group-hover/img:brightness-50 group-focus-within/img:scale-105 group-focus-within/img:brightness-50"
                draggable={false}
              />
              <div className="absolute inset-0 bg-liner-to-b from-black/20 via-black/65 to-black/80 opacity-0 group-hover/img:opacity-100 group-focus-within/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col justify-end gap-2 p-3 sm:p-4 opacity-0 translate-y-3 group-hover/img:opacity-100 group-hover/img:translate-y-0 group-focus-within/img:opacity-100 group-focus-within/img:translate-y-0 transition-all duration-500">
                <div>
                  <h3 className="font-mono text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-neon-green line-clamp-2">
                    {i.title || "Untitled Event"}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-text-primary">
                    <span>{formatEventDate(i.date)}</span>
                    <span className="text-neon-cyan/70">|</span>
                    <span>{formatEventTime(i.time)}</span>
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  {detail_status && (
                    <Link
                      to={registrationHref}
                      tabIndex={isDuplicate ? -1 : 0}
                      className="w-fit rounded-sm border border-neon-cyan/70 bg-neon-cyan/10 px-3 py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[2px] text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_16px_rgba(103,232,249,0.35)] focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                    >
                      Details
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <button
                      onClick={() => deleteEvent(i)}
                      className="cursor-pointer border-2 text-red-600 border-red-500 rounded-md px-3 py-0.5 hover:shadow-2xs font-bold transition-all duration-300 hover:shadow-red-400 hover:bg-red-500 hover:text-black"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}