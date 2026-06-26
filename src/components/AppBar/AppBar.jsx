import { useState } from 'react'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import { href, Link, useNavigate } from 'react-router-dom'
import {logout as stateLogout} from '../../../store/AuthSclice'
import { useSelector,useDispatch } from 'react-redux'
import AuthObj from '../../../Supabase/auth'
import Avatar from '../Avatar/Avatar'
import { setNotification } from '../../../store/Notifucation'
export default function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate();
  const loginstatus=useSelector((state)=>state.auth.status);
  const profileData=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  const navitems = [
    { title: "login", href: '/login' ,scroll:false},
    { title:"signup", href:"/signup",scroll:false},
    { title: 'home', href: '/',scroll:false },
    { title: 'about us', href: '/about-us' ,scroll:true,target:"about-us"},
    { title: 'contact us', href: '/contect-us' ,scroll:true,target:"contect-us"},
  ]
  const tempurl="https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/avatarlogo.png";
  const logout=async()=>{
    console.log("in logour")
    const result = await AuthObj.signOut();
    console.log("after db logout");
    if(result){
      dispatch(setNotification({
        type:"success",message:"Logged out successfully",title:"Logout"
      }))
      console.log("notification dispatched ");
      dispatch(stateLogout());
      navigate("/home")
    }else{
      dispatch(setNotification({
        type:"error",message:"Logout failed, please try again",title:"Logout"
      }))
      navigate("/home")
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-strong border-b border-border-subtle shadow-[0_1px_8px_rgba(52,211,153,0.08)] animate-slide-down">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navitems.map((item) => {
            if (item.title === "login" || item.title === "signup") {
              if (loginstatus) return null;
              if (item.title === "login") {
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.href)}
                    className="font-mono text-xs font-semibold tracking-widest uppercase px-4.5 py-2 border border-neon-green/35 text-neon-green rounded-sm hover:bg-neon-green/10 hover:border-neon-green hover:shadow-[0_0_10px_rgba(52,211,153,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ml-2"
                  >
                    {item.title}
                  </button>
                );
              } else {
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.href)}
                    className="font-mono text-xs font-bold tracking-widest uppercase px-4.5 py-2 bg-neon-green border border-neon-green text-black rounded-sm hover:shadow-[0_0_12px_rgba(52,211,153,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ml-1"
                  >
                    {item.title}
                  </button>
                );
              }
            }

            return (
              <button
                key={item.title}
                onClick={() => {
                  if (item.scroll) {
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(item.href);
                  }
                  setMobileOpen(false);
                }}
                className="font-mono text-sm tracking-wider uppercase px-4 py-2 text-text-primary hover:text-neon-green transition-all duration-300 relative group cursor-pointer"
              >
                {item.title}
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </button>
            );
          })}

          {loginstatus && <Avatar />}
        </div>

        {/* Mobile: Avatar + Hamburger */}
        <div className="md:hidden flex items-center gap-2">

          {loginstatus && <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-neon-green/40 hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)] focus:outline-none focus:border-neon-green"
            aria-label="Open user menu"
            // aria-expanded={droverOpen}
          >
            <img
              src={profileData.publicurl ? profileData.publicurl : tempurl}
              alt="User avatar"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Online indicator dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-bg-elevated animate-glow-pulse" />
          </button>
          || 
          <button
            className="flex flex-col justify-center items-center gap-1.25 w-10 h-10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block w-5 h-0.5 bg-neon-green rounded-full transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-1.75' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-neon-green rounded-full transition-all duration-300 ${
                mobileOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-neon-green rounded-full transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-1.75' : ''
              }`}
            />
          </button>}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down border-t border-border-subtle glass-strong px-6 py-4">
          <div className="flex flex-col gap-2">
            {navitems.map((item) => {
              if (item.title === "login" || item.title === "signup") {
                if (loginstatus) return null;
                if (item.title === "login") {
                  return (
                    <button
                      key={item.title}
                      onClick={() => {
                        navigate(item.href);
                        setMobileOpen(false);
                      }}
                      className="w-full font-mono text-xs font-semibold tracking-widest uppercase py-3 text-center border border-neon-green/30 text-neon-green rounded-sm hover:bg-neon-green/10 transition-all duration-200 cursor-pointer mt-1.5"
                    >
                      {item.title}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={item.title}
                      onClick={() => {
                        navigate(item.href);
                        setMobileOpen(false);
                      }}
                      className="w-full font-mono text-xs font-bold tracking-widest uppercase py-3 text-center bg-neon-green text-black border border-neon-green rounded-sm hover:shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-all duration-200 cursor-pointer mt-1"
                    >
                      {item.title}
                    </button>
                  );
                }
              }

              return (
                <button
                  key={item.title}
                  onClick={() => {
                    if (item.scroll) {
                      document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate(item.href);
                    }
                    setMobileOpen(false);
                  }}
                  className="w-full text-left font-mono text-sm tracking-wider uppercase py-2.5 px-3 text-text-primary hover:text-neon-green hover:bg-neon-green/5 transition-all duration-200 cursor-pointer rounded-sm"
                >
                  <span className="text-neon-green/40 mr-1.5 font-bold">›</span>
                  {item.title}
                </button>
              );
            })}

            {loginstatus && (
              <>
                <div className="h-px w-full gradient-line opacity-30 my-1.5" />
                <button
                  key="update-profile"
                  onClick={() => {
                    navigate("/update-profile");
                    setMobileOpen(false);
                  }}
                  className="w-full text-left font-mono text-sm tracking-wider uppercase py-2.5 px-3 text-text-primary hover:text-neon-green hover:bg-neon-green/5 transition-all duration-200 cursor-pointer rounded-sm"
                >
                  <span className="text-neon-green/40 mr-1.5 font-bold">›</span>
                  Update Profile
                </button>
                <button
                  key="appearance"
                  onClick={() => {
                    navigate("/appearance");
                    setMobileOpen(false);
                  }}
                  className="w-full text-left font-mono text-sm tracking-wider uppercase py-2.5 px-3 text-text-primary hover:text-neon-green hover:bg-neon-green/5 transition-all duration-200 cursor-pointer rounded-sm"
                >
                  <span className="text-neon-green/40 mr-1.5 font-bold">›</span>
                  Appearance
                </button>
                <button
                  key="logout"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full font-mono text-xs font-bold tracking-widest uppercase py-3 text-center bg-neon-red/10 border border-neon-red/30 text-neon-red rounded-sm hover:bg-neon-red/20 hover:border-neon-red hover:shadow-[0_0_10px_rgba(248,113,113,0.25)] transition-all duration-200 cursor-pointer mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
    </nav>
  )
}
