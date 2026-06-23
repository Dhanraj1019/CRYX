import { useState } from 'react'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import { href, Link, useNavigate } from 'react-router-dom'
import {logout as stateLogout} from '../../../store/AuthSclice'
import { useSelector } from 'react-redux'
import AuthObj from '../../../Supabase/auth'
import Avatar from '../Avatar/Avatar'
export default function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate();
  const loginstatus=useSelector((state)=>state.auth.status);
  const profileData=useSelector((state)=>state.auth.user);
  // console.log(profileData)
  const navitems = [
    { title: "login", href: '/login' ,scroll:false},
    { title:"signup", href:"/signup",scroll:false},
    { title: 'home', href: '/',scroll:false },
    { title: 'about us', href: '/about-us' ,scroll:true,target:"about-us"},
    { title: 'contact us', href: '/contect-us' ,scroll:true,target:"contect-us"},
  ]

  const logout=async()=>{
    const result = await AuthObj.signOut();
    // console.log("result in logoout = ");
    // console.log("logout clicked");
    if(result){
      navigate("/login")
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
          {navitems.map((item) => (
            (item.title=="login" || item.title=="signup") ? !loginstatus ?
            <Button
              key={item.title}
              onClick={() => navigate(item.href)}
            >
              {item.title}
            </Button> :null:item.scroll ?
                 <Button key={item.title} children={item.title} onClick={()=>{
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })
                    setMobileOpen(false)
                  }}
                />
              :
                <Button
                key={item.title}
                onClick={() => {
                  navigate(item.href)
                  setMobileOpen(false)
                }}
                children={item.title}
              />
          ))}

          {loginstatus && <Avatar
            />}
        </div>

        {/* Mobile: Avatar + Hamburger */}
        <div className="md:hidden flex items-center gap-2">

          {loginstatus && <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative cursor-pointer w-13 h-13 rounded-full overflow-hidden border-2 border-neon-green/40 hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)] focus:outline-none focus:border-neon-green"
            aria-label="Open user menu"
            // aria-expanded={droverOpen}
          >
            <img
              src="/hacker.png"
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
            {navitems.map((item) => (
            (item.title=="login" || item.title=="signup") ? !loginstatus ?
            <Button
              key={item.title}
              onClick={() => {
                navigate(item.href)
                setMobileOpen(false)
              }}
            >
              {item.title}
            </Button> :null:item.scroll ?
                 <Button key={item.title} children={item.title} onClick={()=>{
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })
                    setMobileOpen(false)
                  }}
                />
              :
                <Button
                key={item.title}
                onClick={() => {
                  navigate(item.href)
                  setMobileOpen(false)
                }}
                children={item.title}
              />
            )
          )}

            {loginstatus && (
              <>
                <div className="h-px w-full gradient-line opacity-30 my-1" />
                <Button
                  key="update-profile"
                  children="Update Profile"
                  onClick={() => {
                    navigate("/update-profile")
                    setMobileOpen(false)
                  }}
                />
                <Button
                  key="appearance"
                  children="Appearance"
                  onClick={() => {
                    navigate("/appearance")
                    setMobileOpen(false)
                  }}
                />
                <Button
                  key="logout"
                  children="Logout"
                  className="text-neon-red border-neon-red hover:shadow-[0_0_10px_rgba(248,113,113,0.3)] hover:bg-[#f8717110]"
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
      
    </nav>
  )
}
