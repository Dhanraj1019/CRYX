import { useNavigate } from "react-router-dom";
import AuthObj from "../../../Supabase/auth";
import { useSelector } from "react-redux";

export default function Drover({ isOpen, onClose }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const tempurl="https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/avatarlogo.png";
  const handleLogout = async () => {
    const result = await AuthObj.signOut();
    if (result) {
      onClose();
      navigate("/login");
    }
  };

  const handleUpdateProfile = () => {
    onClose();
    navigate("/update-profile");
  };

  const handleAppearance = () => {
    onClose();
    navigate("/appearance");
  };

  const menuItems = [
    {
      label: "Update Profile",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      onClick: handleUpdateProfile,
    },
    {
      label: "Appearance",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      onClick: handleAppearance,
    },
    {
      label: "Logout",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      ),
      onClick: handleLogout,
      isDanger: true,
    },
  ];

  return (
    <div
      className={`absolute right-0 top-full mt-3 w-56 z-100 transition-all duration-300 origin-top-right ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
    >
      {/* Dropdown Card */}
      <div
        className="border border-border-subtle bg-bg-surface/95 backdrop-blur-xl rounded-sm overflow-hidden"
        style={{
          boxShadow:
            "0 0 20px rgba(52,211,153,0.06), 0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-border-subtle bg-bg-elevated/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-green/30 shrink-0">
              <img
                src={user.publicurl || tempurl}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-neon-green font-mono text-sm font-semibold truncate">
                {user?.email?.split("@")[0] || "agent"}
              </p>
              <p className="text-text-dim font-mono text-[10px] tracking-wider uppercase">
                // {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-4 py-2.5 font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                item.isDanger
                  ? "text-neon-red hover:bg-neon-red/10 hover:text-neon-red"
                  : "text-text-primary hover:bg-neon-green/8 hover:text-neon-green"
              }`}
            >
              <span
                className={`transition-colors duration-200 ${
                  item.isDanger ? "text-neon-red/60" : "text-text-muted"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Bottom glow line */}
        <div className="h-px w-full gradient-line opacity-40" />
      </div>
    </div>
  );
}