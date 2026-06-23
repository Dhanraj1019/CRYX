import { useState, useRef, useEffect } from "react";
import Drover from "./Drover";
import { useSelector } from "react-redux";

export default function Avatar() {
  const [droverOpen, setDroverOpen] = useState(false);
  const avatarRef = useRef(null);
  const userProfileLogo=useSelector((state)=>state.auth.user.publicurl);
  // Close drover when clicking outside
  console.log("userProfileLogo = ",userProfileLogo);
  useEffect(() => {
    function handleClickOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setDroverOpen(false);
      }
    }
    if (droverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [droverOpen]);

  // Close drover on Escape key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setDroverOpen(false);
    }
    if (droverOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [droverOpen]);
  const profile_logo="https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/avatarlogo.png";
  return (
    <div className="relative" ref={avatarRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setDroverOpen((prev) => !prev)}
        className="relative cursor-pointer w-15 h-15 rounded-full overflow-hidden border-2 border-neon-red/40 hover:border-neon-red transition-all duration-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)] focus:outline-none focus:border-neon-green"
        aria-label="Open user menu"
        aria-expanded={droverOpen}
      >
        <img
          src={userProfileLogo || profile_logo}
          alt="User avatar"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Online indicator dot */}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-bg-elevated animate-glow-pulse" />
      </button>

      {/* Drover Dropdown */}
      <Drover
        isOpen={droverOpen}
        onClose={() => setDroverOpen(false)}
      />
    </div>
  );
}