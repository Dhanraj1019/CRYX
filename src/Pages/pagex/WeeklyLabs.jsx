import { useState } from "react";

// ── Platform Data ──────────────────────────────────────────────────────────────
const tryhackmeLabs = [
  {
    id: "thm1",
    title: "Blue",
    description: "Exploit a Windows machine via EternalBlue (MS17-010). Classic SMB vulnerability.",
    difficulty: "Easy",
    tags: ["Windows", "Metasploit", "SMB", "EternalBlue"],
    url: "https://tryhackme.com/room/blue",
    date: "Week 01",
  },
  {
    id: "thm2",
    title: "Kenobi",
    description: "Enumerate Samba shares and exploit vulnerable ProFtpd to gain root on Linux.",
    difficulty: "Easy",
    tags: ["Linux", "SMB", "FTP", "PrivEsc"],
    url: "https://tryhackme.com/room/kenobi",
    date: "Week 02",
  },
  {
    id: "thm3",
    title: "Steel Mountain",
    description: "Hack into a Windows machine using Rejetto HTTP File Server vulnerability.",
    difficulty: "Easy",
    tags: ["Windows", "Metasploit", "PowerShell", "PrivEsc"],
    url: "https://tryhackme.com/room/steelmountain",
    date: "Week 03",
  },
  {
    id: "thm4",
    title: "Brooklyn Nine Nine",
    description: "Steganography and brute-force challenge inspired by the TV show.",
    difficulty: "Easy",
    tags: ["Steganography", "FTP", "Brute Force", "sudo"],
    url: "https://tryhackme.com/room/brooklynninenine",
    date: "Week 04",
  },
  {
    id: "thm5",
    title: "Pickle Rick",
    description: "Morty needs your help to find Rick's secret ingredients. Web exploitation challenge.",
    difficulty: "Easy",
    tags: ["Web", "LFI", "Command Injection", "Enumeration"],
    url: "https://tryhackme.com/room/picklerick",
    date: "Week 05",
  },
  {
    id: "thm6",
    title: "Overpass",
    description: "Hack a web application with a weak password manager and exploit misconfiguration.",
    difficulty: "Easy",
    tags: ["Web", "SSH", "Cron Jobs", "OWASP"],
    url: "https://tryhackme.com/room/overpass",
    date: "Week 06",
  },
  {
    id: "thm7",
    title: "Anthem",
    description: "Windows OSINT challenge — find the administrator credentials through clues.",
    difficulty: "Easy",
    tags: ["OSINT", "Windows", "CMS", "Hidden Files"],
    url: "https://tryhackme.com/room/anthem",
    date: "Week 07",
  },
  {
    id: "thm8",
    title: "Relevant",
    description: "Hack a vulnerable Windows machine using SMB and token impersonation.",
    difficulty: "Medium",
    tags: ["Windows", "SMB", "Token Impersonation", "IIS"],
    url: "https://tryhackme.com/room/relevant",
    date: "Week 08",
  },
  {
    id: "thm9",
    title: "Hackpark",
    description: "Brute-force BlogEngine CMS login and exploit an authenticated RCE vulnerability.",
    difficulty: "Medium",
    tags: ["Windows", "BlogEngine", "RCE", "WinPEAS"],
    url: "https://tryhackme.com/room/hackpark",
    date: "Week 09",
  },
  {
    id: "thm10",
    title: "Internal",
    description: "A fully internal pentest — from web enumeration to WordPress exploitation.",
    difficulty: "Hard",
    tags: ["WordPress", "Jenkins", "Pivoting", "Docker"],
    url: "https://tryhackme.com/room/internal",
    date: "Week 10",
  },
];

const hacktheboxLabs = [
  {
    id: "htb1",
    title: "Lame",
    description: "One of HTB's easiest boxes. Exploit Samba vulnerability to get root directly.",
    difficulty: "Easy",
    tags: ["Linux", "Samba", "CVE-2007-2447", "Metasploit"],
    url: "https://app.hackthebox.com/machines/Lame",
    date: "Week 01",
  },
  {
    id: "htb2",
    title: "Legacy",
    description: "Exploit MS08-067 or MS17-010 on Windows XP to get SYSTEM access.",
    difficulty: "Easy",
    tags: ["Windows", "EternalBlue", "MS08-067", "Metasploit"],
    url: "https://app.hackthebox.com/machines/Legacy",
    date: "Week 02",
  },
  {
    id: "htb3",
    title: "Jerry",
    description: "Exploit Apache Tomcat default credentials to deploy a malicious WAR file.",
    difficulty: "Easy",
    tags: ["Windows", "Tomcat", "Default Creds", "WAR Deploy"],
    url: "https://app.hackthebox.com/machines/Jerry",
    date: "Week 03",
  },
  {
    id: "htb4",
    title: "Bashed",
    description: "Discover a phpbash shell on a web server and escalate through sudo misconfig.",
    difficulty: "Easy",
    tags: ["Linux", "PHP", "Web Shell", "Sudo"],
    url: "https://app.hackthebox.com/machines/Bashed",
    date: "Week 04",
  },
  {
    id: "htb5",
    title: "Nibbles",
    description: "Exploit Nibbleblog CMS through a file upload vulnerability to get RCE.",
    difficulty: "Easy",
    tags: ["Linux", "Web", "File Upload", "Sudo"],
    url: "https://app.hackthebox.com/machines/Nibbles",
    date: "Week 05",
  },
  {
    id: "htb6",
    title: "Shocker",
    description: "Shellshock CGI vulnerability exploitation on a web server.",
    difficulty: "Easy",
    tags: ["Linux", "Shellshock", "CGI", "Perl"],
    url: "https://app.hackthebox.com/machines/Shocker",
    date: "Week 06",
  },
  {
    id: "htb7",
    title: "Netmon",
    description: "PRTG Network Monitor exploitation through authenticated RCE.",
    difficulty: "Easy",
    tags: ["Windows", "PRTG", "FTP", "CVE-2018-9276"],
    url: "https://app.hackthebox.com/machines/Netmon",
    date: "Week 07",
  },
  {
    id: "htb8",
    title: "Devel",
    description: "FTP write access to IIS webroot — upload ASPX shell to gain foothold.",
    difficulty: "Easy",
    tags: ["Windows", "FTP", "IIS", "ASPX", "PrivEsc"],
    url: "https://app.hackthebox.com/machines/Devel",
    date: "Week 08",
  },
  {
    id: "htb9",
    title: "Valentine",
    description: "Exploit the Heartbleed OpenSSL vulnerability to extract private keys.",
    difficulty: "Easy",
    tags: ["Linux", "Heartbleed", "OpenSSL", "SSH", "tmux"],
    url: "https://app.hackthebox.com/machines/Valentine",
    date: "Week 09",
  },
  {
    id: "htb10",
    title: "Knife",
    description: "PHP 8.1.0-dev backdoor vulnerability — trivial RCE to root.",
    difficulty: "Easy",
    tags: ["Linux", "PHP Backdoor", "Sudo", "Knife"],
    url: "https://app.hackthebox.com/machines/Knife",
    date: "Week 10",
  },
];

const picoCTFLabs = [
  {
    id: "pico1",
    title: "Reverse Engineering 101",
    description: "Disassemble a binary and extract hidden flags through static analysis.",
    difficulty: "Easy",
    tags: ["Reverse Engineering", "Ghidra", "Binary", "Assembly"],
    url: "https://picoctf.org/",
    date: "Week 01",
  },
  {
    id: "pico2",
    title: "Web Exploitation: SQL Lab",
    description: "Bypass login and extract database contents using SQL injection techniques.",
    difficulty: "Easy",
    tags: ["SQLi", "Web", "Authentication Bypass", "Database"],
    url: "https://picoctf.org/",
    date: "Week 02",
  },
  {
    id: "pico3",
    title: "Cryptography: Caesar",
    description: "Decrypt classic Caesar cipher messages and modern encoding schemes.",
    difficulty: "Easy",
    tags: ["Cryptography", "Caesar Cipher", "ROT13", "Encoding"],
    url: "https://picoctf.org/",
    date: "Week 03",
  },
  {
    id: "pico4",
    title: "Forensics: File Carving",
    description: "Recover hidden data from image files using steganography tools.",
    difficulty: "Easy",
    tags: ["Forensics", "Steganography", "Exif", "Binwalk"],
    url: "https://picoctf.org/",
    date: "Week 04",
  },
  {
    id: "pico5",
    title: "Binary Exploitation: Buffer Overflow",
    description: "Exploit a buffer overflow vulnerability to control program execution flow.",
    difficulty: "Medium",
    tags: ["Buffer Overflow", "PWN", "GDB", "ASLR"],
    url: "https://picoctf.org/",
    date: "Week 05",
  },
  {
    id: "pico6",
    title: "General Skills: Shell",
    description: "Master Linux command line fu to navigate and extract flags from the system.",
    difficulty: "Easy",
    tags: ["Linux", "Bash", "Shell", "Grep", "Awk"],
    url: "https://picoctf.org/",
    date: "Week 06",
  },
  {
    id: "pico7",
    title: "Netcat & Sockets",
    description: "Connect to remote services using netcat and interact with custom protocols.",
    difficulty: "Easy",
    tags: ["Networking", "Netcat", "Sockets", "Python"],
    url: "https://picoctf.org/",
    date: "Week 07",
  },
  {
    id: "pico8",
    title: "RSA Challenge",
    description: "Break weak RSA implementations by factoring small public keys.",
    difficulty: "Medium",
    tags: ["Cryptography", "RSA", "Math", "Python", "Factoring"],
    url: "https://picoctf.org/",
    date: "Week 08",
  },
];

// ── Platform Config ─────────────────────────────────────────────────────────────
const platforms = [
  {
    id: "tryhackme",
    name: "TryHackMe",
    shortName: "THM",
    tagline: "// Beginner-friendly guided rooms",
    color: "#34d399",
    accentColor: "#10b981",
    icon: "🟢",
    borderColor: "rgba(52,211,153,0.25)",
    bgColor: "rgba(52,211,153,0.05)",
    labs: tryhackmeLabs,
    logo: "THM",
  },
  {
    id: "hackthebox",
    name: "HackTheBox",
    shortName: "HTB",
    tagline: "// Real-world pentesting challenges",
    color: "#9fef00",
    accentColor: "#a3e635",
    icon: "🟩",
    borderColor: "rgba(163,230,53,0.25)",
    bgColor: "rgba(163,230,53,0.05)",
    labs: hacktheboxLabs,
    logo: "HTB",
  },
  {
    id: "picoctf",
    name: "PicoCTF",
    shortName: "PICO",
    tagline: "// CTF challenges for all skill levels",
    color: "#67e8f9",
    accentColor: "#22d3ee",
    icon: "🔵",
    borderColor: "rgba(103,232,249,0.25)",
    bgColor: "rgba(103,232,249,0.05)",
    labs: picoCTFLabs,
    logo: "CTF",
  },
];

const difficultyConfig = {
  Easy: { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  Hard: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
};

// ── Lab Card ──────────────────────────────────────────────────────────────────
function LabCard({ lab, platform }) {
  const diff = difficultyConfig[lab.difficulty] || difficultyConfig["Easy"];
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open(lab.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="group relative overflow-hidden border bg-bg-surface/50 backdrop-blur-sm rounded-sm cursor-pointer transition-all duration-500 flex flex-col"
      style={{
        borderColor: hovered ? `${platform.color}50` : "rgba(52,211,153,0.1)",
        boxShadow: hovered ? `0 0 24px ${platform.color}18, 0 4px 20px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Open ${lab.title} on ${platform.name}`}
    >
      {/* Top color accent */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Card content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Platform mini badge */}
            <span
              className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm shrink-0"
              style={{
                color: platform.color,
                background: platform.bgColor,
                border: `1px solid ${platform.borderColor}`,
              }}
            >
              {platform.logo}
            </span>
            <span className="font-mono text-xs text-text-muted tracking-wider">{lab.date}</span>
          </div>
          {/* Difficulty */}
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-sm shrink-0"
            style={{
              color: diff.color,
              background: diff.bg,
              border: `1px solid ${diff.border}`,
            }}
          >
            {lab.difficulty}
          </span>
        </div>

        {/* Title */}
        <h4
          className="font-mono text-base sm:text-lg font-semibold tracking-wider mb-2 transition-all duration-300"
          style={{
            color: hovered ? platform.color : "#cbd5e1",
            textShadow: hovered ? `0 0 8px ${platform.color}40` : "none",
          }}
        >
          {lab.title}
        </h4>

        {/* Description */}
        <p className="text-text-muted font-mono text-xs leading-relaxed mb-4 flex-1">
          {lab.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lab.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded-sm"
              style={{
                color: platform.color,
                background: `${platform.color}10`,
                border: `1px solid ${platform.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-all duration-300"
          style={{ color: platform.color }}
        >
          <span
            className="transition-transform duration-300"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          >
            ›
          </span>
          <span>Open on {platform.name}</span>
          <span
            className="ml-auto text-base transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0.5 }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-700"
        style={{
          width: hovered ? "100%" : "0%",
          background: platform.color,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-6 h-6 transition-all duration-500"
        style={{
          borderTop: `1px solid ${platform.color}`,
          borderRight: `1px solid ${platform.color}`,
          opacity: hovered ? 0.6 : 0.15,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 transition-all duration-500"
        style={{
          borderBottom: `1px solid ${platform.color}`,
          borderLeft: `1px solid ${platform.color}`,
          opacity: hovered ? 0.6 : 0.15,
        }}
      />
    </div>
  );
}

// ── Platform Section ──────────────────────────────────────────────────────────
function PlatformSection({ platform, index }) {
  const [filterDiff, setFilterDiff] = useState("All");
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filtered =
    filterDiff === "All"
      ? platform.labs
      : platform.labs.filter((l) => l.difficulty === filterDiff);

  return (
    <section
      id={platform.id}
      className="animate-fade-in"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          {/* Platform logo badge */}
          <div
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-sm flex items-center justify-center font-mono font-bold text-sm sm:text-base tracking-wider border"
            style={{
              color: platform.color,
              borderColor: platform.borderColor,
              background: platform.bgColor,
              textShadow: `0 0 8px ${platform.color}50`,
            }}
          >
            {platform.logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-wider"
                style={{
                  color: platform.color,
                  textShadow: `0 0 6px ${platform.color}30`,
                }}
              >
                {platform.name}
              </h2>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-sm"
                style={{
                  color: platform.color,
                  background: platform.bgColor,
                  border: `1px solid ${platform.borderColor}`,
                }}
              >
                {platform.labs.length} Labs
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted tracking-wider mt-0.5">
              {platform.tagline}
            </p>
          </div>
        </div>

        {/* Animated separator */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, ${platform.color}50, transparent)`,
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
            style={{ background: platform.color }}
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="font-mono text-xs text-text-muted tracking-wider uppercase">Filter:</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setFilterDiff(d)}
              className="font-mono text-xs px-3 py-1 rounded-sm border transition-all duration-300 cursor-pointer"
              style={
                filterDiff === d
                  ? {
                      color: platform.color,
                      background: platform.bgColor,
                      borderColor: platform.borderColor,
                    }
                  : {
                      color: "#64748b",
                      background: "transparent",
                      borderColor: "rgba(52,211,153,0.1)",
                    }
              }
            >
              {d}
            </button>
          ))}
          {filterDiff !== "All" && (
            <span className="font-mono text-xs text-text-muted">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Lab Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} platform={platform} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 border border-dashed rounded-sm font-mono text-text-muted text-sm"
          style={{ borderColor: "rgba(52,211,153,0.1)" }}>
          No {filterDiff} labs available yet.
        </div>
      )}
    </section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function WeeklyLabs() {
  const [activeTab, setActiveTab] = useState("all");

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="text-center mb-12 md:mb-16">
        {/* System label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 sm:w-16 bg-neon-green/30" />
          <span className="text-neon-green/60 font-mono text-xs tracking-[5px] sm:tracking-[8px] uppercase">
            CRYX // WEEKLY LABS
          </span>
          <div className="h-px w-10 sm:w-16 bg-neon-green/30" />
        </div>

        <h1
          className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-neon-green mb-4"
          style={{
            textShadow:
              "0 0 4px rgba(52,211,153,0.35), 0 0 8px rgba(52,211,153,0.2), 0 0 14px rgba(52,211,153,0.08)",
          }}
        >
          Weekend Labs
        </h1>

        <p className="font-mono text-text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
          {"// Every weekend we conduct hands-on hacking labs together."}
          <br />
          {"// Click any card to open the lab on its platform."}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 flex-wrap">
          {[
            { label: "Total Labs", value: `${tryhackmeLabs.length + hacktheboxLabs.length + picoCTFLabs.length}+`, color: "#34d399" },
            { label: "TryHackMe", value: `${tryhackmeLabs.length}`, color: "#34d399" },
            { label: "HackTheBox", value: `${hacktheboxLabs.length}`, color: "#9fef00" },
            { label: "PicoCTF", value: `${picoCTFLabs.length}`, color: "#67e8f9" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-xl sm:text-2xl font-bold"
                style={{
                  color: stat.color,
                  textShadow: `0 0 8px ${stat.color}40`,
                }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-xs text-text-muted tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-px gradient-line opacity-40 mb-8" />

      {/* ── Sticky Platform Nav ── */}
      <div className="sticky top-16 sm:top-20 z-30 mb-8">
        <div className="glass-strong border border-neon-green/15 rounded-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <span className="font-mono text-xs text-text-muted tracking-wider uppercase shrink-0 hidden sm:block">
            Jump to:
          </span>
          {[
            { id: "all", label: "All Platforms" },
            ...platforms.map((p) => ({ id: p.id, label: p.name, color: p.color })),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                tab.id === "all"
                  ? (setActiveTab("all"), window.scrollTo({ top: 0, behavior: "smooth" }))
                  : scrollToSection(tab.id)
              }
              className="font-mono text-xs px-3 py-1.5 rounded-sm border whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0"
              style={
                activeTab === tab.id
                  ? {
                      color: tab.color || "#34d399",
                      background: tab.color ? `${tab.color}12` : "rgba(52,211,153,0.12)",
                      borderColor: tab.color ? `${tab.color}40` : "rgba(52,211,153,0.4)",
                    }
                  : {
                      color: "#64748b",
                      background: "transparent",
                      borderColor: "rgba(52,211,153,0.1)",
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Platform Sections ── */}
      <div className="space-y-14 sm:space-y-20">
        {platforms.map((platform, index) => (
          <PlatformSection key={platform.id} platform={platform} index={index} />
        ))}
      </div>

      {/* ── Footer Note ── */}
      <div className="mt-12 md:mt-16 border border-neon-cyan/15 rounded-sm p-5 sm:p-6 bg-bg-surface/30 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <span className="text-neon-cyan font-mono text-xs mt-0.5">[i]</span>
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            Labs are conducted every weekend. Members solve the lab together, then a senior walks
            through the methodology. New labs are added every week. VPN access (OpenVPN /
            WireGuard) is required for HTB and THM machines — reach out on the club Discord for
            setup help.
          </p>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
