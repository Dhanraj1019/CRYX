import Button from '../Button/Button'
import { href, Link } from 'react-router-dom'

export default function Footer() {

  const socials = [
    { label: 'GitHub', src:"/SocialMediaIcons/github.png", href: 'https://github.com' },
    { label: 'LinkedIn',src:"/SocialMediaIcons/linkedin.png", href: 'https://linkedin.com' },
    { label: 'Discord',src:"/SocialMediaIcons/discord.png", href: 'https://discord.com' },
    {label:'Whatsapp Channel',src:"/SocialMediaIcons/whatsapp.png",href:"#"},
    { label: 'Email',src:"/SocialMediaIcons/email.png", href: 'mailto:contact@cryx.club' },
    {label:'Whatsapp Group' ,src:"/SocialMediaIcons/whatsapp.png", href:"#"},
    {label:"Instagram",src:"/SocialMediaIcons/instagram.png",href:"#"}
  ]

  return (
    <footer id='contect-us' className="pb-5 relative z-20 overflow-hidden bg-bg-surface">
      {/* Neon gradient top line */}
      <div className="mb-2 gradient-line h-px w-full" />
      <div className="flex min-w-0 flex-col items-center gap-6 px-4 text-center">
        <div className='flex justify-center items-center'>
          <h2 className="text-2xl sm:text-3xl font-bold text-neon-green text-glow-green tracking-tight">
            CRYX
          </h2>
        </div>
        <div className="border-t pt-8 border-border-subtle">
          <div className='flex gap-3 justify-center items-center'>
            {socials.map((it)=><a href={it.href} ><img key={it.label} className='h-8 w-8 text-neon-green' src={it.src} alt={it.label}></img></a>)}
          </div>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-5 sm:flex-row sm:px-6">
            <p className="wrap-break-words font-mono text-sm text-text-muted">
              © 2025 CRYX Cybersecurity Club. All rights reserved.
            </p>
          </div>
          <div>
            <p className="wrap-break-words font-mono text-sm text-text-dim">
              Hack the planet 🌍
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
