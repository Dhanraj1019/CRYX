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
    {title:"news",href:"/news",scroll:true,target:"news"},
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/home" className="min-w-0 shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden min-w-0 items-center gap-1 md:flex lg:gap-2">
          {navitems.map((item) => {
            if (item.title === "login" || item.title === "signup") {
              if (loginstatus) return null;
              if (item.title === "login") {
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.href)}
                    className="ml-2 min-h-11 rounded-sm border border-neon-green/35 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-neon-green transition-all duration-300 hover:scale-[1.02] hover:border-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_10px_rgba(52,211,153,0.2)] active:scale-95 focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:px-4"
                  >
                    {item.title}
                  </button>
                );
              } else {
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.href)}
                    className="ml-1 min-h-11 rounded-sm border border-neon-green bg-neon-green px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(52,211,153,0.35)] active:scale-95 focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:px-4"
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
                className="group relative min-h-11 max-w-36 cursor-pointer truncate px-2 py-2 font-mono text-xs uppercase tracking-wider text-text-primary transition-all duration-300 hover:text-neon-green focus-visible:ring-2 focus-visible:ring-neon-green lg:max-w-none lg:px-4 lg:text-sm"
              >
                {item.title}
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </button>
            );
          })}

          {loginstatus && <Avatar />}
        </div>

        {/* Mobile: Avatar + Hamburger */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">

          {loginstatus && <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative h-11 w-11 cursor-pointer overflow-hidden rounded-full border-2 border-neon-green/40 transition-all duration-300 hover:border-neon-green hover:shadow-[0_0_12px_rgba(52,211,153,0.25)] focus-visible:ring-2 focus-visible:ring-neon-green"
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
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-sm transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-neon-green"
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
        <div className="md:hidden animate-slide-down border-t border-border-subtle glass-strong px-3 py-4 sm:px-6">
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
                      className="mt-1.5 min-h-11 w-full rounded-sm border border-neon-green/30 py-3 text-center font-mono text-xs font-semibold uppercase tracking-widest text-neon-green transition-all duration-200 hover:bg-neon-green/10 active:scale-[0.99]"
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
                      className="mt-1 min-h-11 w-full rounded-sm border border-neon-green bg-neon-green py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:shadow-[0_0_10px_rgba(52,211,153,0.3)] active:scale-[0.99]"
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
                  className="min-h-11 w-full rounded-sm px-3 py-2.5 text-left font-mono text-sm uppercase tracking-wider text-text-primary transition-all duration-200 hover:bg-neon-green/5 hover:text-neon-green active:scale-[0.99]"
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
                  className="min-h-11 w-full rounded-sm px-3 py-2.5 text-left font-mono text-sm uppercase tracking-wider text-text-primary transition-all duration-200 hover:bg-neon-green/5 hover:text-neon-green active:scale-[0.99]"
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
                  className="min-h-11 w-full rounded-sm px-3 py-2.5 text-left font-mono text-sm uppercase tracking-wider text-text-primary transition-all duration-200 hover:bg-neon-green/5 hover:text-neon-green active:scale-[0.99]"
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
                  className="mt-2 min-h-11 w-full rounded-sm border border-neon-red/30 bg-neon-red/10 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-neon-red transition-all duration-200 hover:border-neon-red hover:bg-neon-red/20 hover:shadow-[0_0_10px_rgba(248,113,113,0.25)] active:scale-[0.99]"
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
