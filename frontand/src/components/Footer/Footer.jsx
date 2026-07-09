import Button from '../Button/Button'
import { href, Link } from 'react-router-dom'

export default function Footer() {

const socials = [
  {
    label: "WHATSAPP CHANNEL",
    src: "/SocialMediaIcons/whatsapp.png",
    href: "https://whatsapp.com/channel/0029VbDE1qU89inecrscr90W",
    border: "border-green-500/40",
    hoverBorder: "hover:border-green-400",
    text: "text-green-400",
    hoverText: "group-hover:text-green-400",
    glow: "rgba(34,197,94,0.3)",
  },
  {
    label: "EMAIL",
    src: "/SocialMediaIcons/email.png",
    href: "mailto:choudharydhanraj714@gmail.com",
    border: "border-cyan-500/40",
    hoverBorder: "hover:border-cyan-400",
    text: "text-cyan-400",
    hoverText: "group-hover:text-cyan-400",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    label: "WHATSAPP GROUP",
    src: "/SocialMediaIcons/whatsapp.png",
    href: "https://chat.whatsapp.com/Fx1FhRzo5UyDxd79dCjTpv",
    border: "border-green-500/40",
    hoverBorder: "hover:border-green-400",
    text: "text-green-400",
    hoverText: "group-hover:text-green-400",
    glow: "rgba(34,197,94,0.3)",
  },
  {
    label: "INSTAGRAM",
    src: "/SocialMediaIcons/instagram.png",
    href: "https://www.instagram.com/cryx.mnit/",
    border: "border-pink-500/40",
    hoverBorder: "hover:border-pink-400",
    text: "text-pink-400",
    hoverText: "group-hover:text-pink-400",
    glow: "rgba(236,72,153,0.3)",
  },
];

  return (
    <footer id='contect-us' className="bg-transparent pb-5 relative z-20 overflow-hidden">
      {/* Neon gradient top line */}
      <div className="mb-2 gradient-line h-px w-full" />
      <div className="flex min-w-0 flex-col items-center gap-6 px-4 text-center">
        <div className='flex justify-center items-center'>
          <h2 className="text-2xl sm:text-3xl font-bold text-neon-green text-glow-green tracking-tight">
            CRYX
          </h2>
        </div>
        <div className="border-t pt-8 border-border-subtle">
          <div className="flex flex-wrap justify-center gap-8">
            {socials.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <div
                  className={`
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-xl
                    border
                    ${it.border}
                    ${it.hoverBorder}
                    bg-black/60
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:scale-100
                  `}
                  style={{
                    boxShadow: "0 0 0 transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 22px ${it.glow},
                                                      0 0 45px ${it.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 transparent";
                  }}
                >
                  <img
                    src={it.src}
                    alt={it.label}
                    className="
                      h-8
                      w-8
                      grayscale
                      brightness-110
                      opacity-70
                      transition-all
                      duration-300
                      group-hover:grayscale-0
                      group-hover:opacity-100
                      group-hover:scale-100
                      group-hover:rotate-6
                    "
                  />
                </div>

                <span
                  className={`
                    mt-3
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-white
                    ${it.hoverText}
                    transition-colors
                    duration-300
                    font-mono
                  `}
                  style={{
                    textShadow: `0 0 8px ${it.glow}`,
                  }}
                >
                  {it.label}
                </span>
              </a>
            ))}
          </div>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-5 sm:flex-row sm:px-6">
            <p className="wrap-break-words font-mono text-sm text-text-muted">
              © 2026 CRYX : The Infosic Club. All rights reserved.
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
