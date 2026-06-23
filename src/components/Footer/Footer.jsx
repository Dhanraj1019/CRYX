import { Link } from 'react-router-dom'

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about-us' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
  ]

  const resources = [
    { label: 'Blog', href: '/blog' },
    { label: 'CTF Platform', href: '/ctf' },
    { label: 'Tools', href: '/tools' },
    { label: 'Documentation', href: '/docs' },
  ]

  const socials = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Discord', href: 'https://discord.com' },
    { label: 'Email', href: 'mailto:contact@cryx.club' },
  ]

  return (
    <footer id='contect-us' className="relative z-20 bg-bg-surface">
      {/* Neon gradient top line */}
      <div className="mb-2 gradient-line h-px w-full" />
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neon-green text-glow-green mb-3 sm:mb-4 tracking-tight">
          CRYX
        </h2>
        <div className="border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-text-muted text-sm font-mono">
              © 2025 CRYX Cybersecurity Club. All rights reserved.
            </p>
            <p className="text-text-dim text-sm font-mono">
              Hack the planet 🌍
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}