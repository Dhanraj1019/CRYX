import { useState } from 'react'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import { href, Link, useNavigate } from 'react-router-dom'
import {logout as stateLogout} from '../../../store/AuthSclice'
import { useSelector } from 'react-redux'
import AuthObj from '../../../Supabase/auth'

export default function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate();
  const loginstatus=useSelector((state)=>state.auth.status);
  const navitems = [
    { title: 'home', href: '/home',scroll:false },
    { title: 'about us', href: '/about-us' ,scroll:true,target:"about-us"},
    { title: 'contact us', href: '/contect-us' ,scroll:true,target:"contect-us"},
    { title: "login", href: '/login' ,scroll:false},
    { title:"signup", href:"/signup",scroll:false}
  ]

  const logout=async()=>{
    const result = await AuthObj.signOut();
    console.log("result in logoout = ");
    console.log("logout clicked");
    if(result){
      navigate("/login")
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-strong border-b border-border-subtle shadow-[0_1px_12px_rgba(0,255,136,0.15)] animate-slide-down">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
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
            </Button> :null:<Button
              key={item.title}
              onClick={() => navigate(item.href)}
              children={item.title}
            />
          ))}
          {loginstatus && <Button
              key="logout"
              children="logout"
              onClick={() => logout()}
            />}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
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
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down border-t border-border-subtle glass-strong px-6 py-4">
          <div className="flex flex-col gap-2">
            {navitems.map((item) => {
              if(item.scroll){
                return <Button key={item.title} children={item.title} onClick={()=>{
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })
                    setMobileOpen(false)
                  }}
                />
              }
              else{
                return <Button
                key={item.title}
                onClick={() => {
                  navigate(item.href)
                  setMobileOpen(false)
                }}
                children={item.title}
              />
              }
                
              })
            }
            {loginstatus && <Button
              key="logout"
              children="Logout"
              onClick={() => {
                logout
                setMobileOpen(false)
              }}
            />}
          </div>
        </div>
      )}
      
    </nav>
  )
}
