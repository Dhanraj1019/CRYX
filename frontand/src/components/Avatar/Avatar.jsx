import { useState, useRef, useEffect } from "react";
import Drover from "./Drover";
import { useSelector } from "react-redux";

export default function Avatar() {
  const [profile_logo,setProfile_logo]=useState("https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/avatarlogo.png");
  const [droverOpen, setDroverOpen] = useState(false);
  const avatarRef = useRef(null);
  const userProfileLogo=useSelector((state)=>state.auth.user.publicurl);
  useEffect(()=>{
    setProfile_logo(userProfileLogo);
  },[userProfileLogo])
  
  const setAvatar=(logo)=>setProfile_logo(logo);
  useEffect(()=>{
    if(userProfileLogo) setProfile_logo(userProfileLogo);
  },[])
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
  return (
    <div className="relative shrink-0" ref={avatarRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setDroverOpen((prev) => !prev)}
        className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-neon-red/40 transition-all duration-300 hover:border-neon-red hover:shadow-[0_0_12px_rgba(52,211,153,0.25)] focus-visible:ring-2 focus-visible:ring-neon-green"
        aria-label="Open user menu"
        aria-expanded={droverOpen}
        draggable={false}
      >
        <img
          src={profile_logo}
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
