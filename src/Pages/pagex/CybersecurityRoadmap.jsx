import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// ROADMAP DATA  (top → bottom, type: "root" | "main" | "branch" | "end")
// ─────────────────────────────────────────────────────────────────────────────
const nodes = [
  // ── ENTRY ──────────────────────────────────────────────────────────────────
  {
    id: "start",
    label: "Start Here",
    sublabel: "Your Cybersecurity Journey",
    type: "root",
    color: "#34d399",
    icon: "⚡",
    children: ["net", "linux"],
  },

  // ── PHASE 1 – FOUNDATIONS ──────────────────────────────────────────────────
  {
    id: "net",
    label: "Networking Fundamentals",
    sublabel: "OSI, TCP/IP, DNS, HTTP/S, Subnetting",
    type: "main",
    color: "#34d399",
    icon: "🌐",
    side: "left",
    children: ["linux"],
    leaf_children: ["nmap-leaf", "wireshark-leaf"],
  },
  {
    id: "nmap-leaf",
    label: "Nmap & Scanning",
    type: "branch",
    color: "#34d399",
    icon: "📡",
    parent: "net",
  },
  {
    id: "wireshark-leaf",
    label: "Wireshark & Traffic",
    type: "branch",
    color: "#34d399",
    icon: "🔬",
    parent: "net",
  },

  {
    id: "linux",
    label: "Linux & Command Line",
    sublabel: "Bash, File Permissions, SSH, Processes",
    type: "main",
    color: "#34d399",
    icon: "🐧",
    side: "right",
    children: ["prog"],
    leaf_children: ["bash-leaf", "vim-leaf"],
  },
  {
    id: "bash-leaf",
    label: "Bash Scripting",
    type: "branch",
    color: "#34d399",
    icon: "💻",
    parent: "linux",
  },
  {
    id: "vim-leaf",
    label: "Vim / Nano",
    type: "branch",
    color: "#34d399",
    icon: "📝",
    parent: "linux",
  },

  {
    id: "prog",
    label: "Programming Basics",
    sublabel: "Python, Scripting, Regex, Git",
    type: "main",
    color: "#34d399",
    icon: "🐍",
    side: "left",
    children: ["crypto"],
    leaf_children: ["py-leaf", "git-leaf"],
  },
  {
    id: "py-leaf",
    label: "Python for Hackers",
    type: "branch",
    color: "#34d399",
    icon: "🔧",
    parent: "prog",
  },
  {
    id: "git-leaf",
    label: "Git & Version Control",
    type: "branch",
    color: "#34d399",
    icon: "📦",
    parent: "prog",
  },

  // ── PHASE 2 – CORE SECURITY ────────────────────────────────────────────────
  {
    id: "crypto",
    label: "Cryptography",
    sublabel: "Hashing, PKI, TLS, Asymmetric Encryption",
    type: "main",
    color: "#67e8f9",
    icon: "🔐",
    side: "right",
    children: ["web"],
    leaf_children: ["hash-leaf", "rsa-leaf"],
  },
  {
    id: "hash-leaf",
    label: "Hashing & Encoding",
    type: "branch",
    color: "#67e8f9",
    icon: "🔑",
    parent: "crypto",
  },
  {
    id: "rsa-leaf",
    label: "RSA & PKI",
    type: "branch",
    color: "#67e8f9",
    icon: "🗝️",
    parent: "crypto",
  },

  {
    id: "web",
    label: "Web Application Security",
    sublabel: "OWASP Top 10, HTTP, REST APIs, Cookies",
    type: "main",
    color: "#67e8f9",
    icon: "🕸️",
    side: "left",
    children: ["osint"],
    leaf_children: ["owasp-leaf", "burp-leaf"],
  },
  {
    id: "owasp-leaf",
    label: "OWASP Top 10",
    type: "branch",
    color: "#67e8f9",
    icon: "📋",
    parent: "web",
  },
  {
    id: "burp-leaf",
    label: "Burp Suite",
    type: "branch",
    color: "#67e8f9",
    icon: "🎯",
    parent: "web",
  },

  {
    id: "osint",
    label: "OSINT & Recon",
    sublabel: "Google Dorking, Shodan, Maltego, Passive Recon",
    type: "main",
    color: "#67e8f9",
    icon: "🔍",
    side: "right",
    children: ["enum"],
    leaf_children: ["shodan-leaf", "recon-leaf"],
  },
  {
    id: "shodan-leaf",
    label: "Shodan & Censys",
    type: "branch",
    color: "#67e8f9",
    icon: "🌍",
    parent: "osint",
  },
  {
    id: "recon-leaf",
    label: "Passive Recon",
    type: "branch",
    color: "#67e8f9",
    icon: "🕵️",
    parent: "osint",
  },

  // ── PHASE 3 – OFFENSIVE ───────────────────────────────────────────────────
  {
    id: "enum",
    label: "Enumeration & Scanning",
    sublabel: "Port Scanning, Service Detection, Fingerprinting",
    type: "main",
    color: "#f87171",
    icon: "🎯",
    side: "left",
    children: ["exploit"],
    leaf_children: ["gobuster-leaf", "enum4linux-leaf"],
  },
  {
    id: "gobuster-leaf",
    label: "Gobuster / Feroxbuster",
    type: "branch",
    color: "#f87171",
    icon: "📂",
    parent: "enum",
  },
  {
    id: "enum4linux-leaf",
    label: "Enum4linux & SMB",
    type: "branch",
    color: "#f87171",
    icon: "🖥️",
    parent: "enum",
  },

  {
    id: "exploit",
    label: "Exploitation",
    sublabel: "Metasploit, Manual Exploits, CVE Research",
    type: "main",
    color: "#f87171",
    icon: "💥",
    side: "right",
    children: ["privesc"],
    leaf_children: ["msf-leaf", "searchsploit-leaf"],
  },
  {
    id: "msf-leaf",
    label: "Metasploit Framework",
    type: "branch",
    color: "#f87171",
    icon: "🚀",
    parent: "exploit",
  },
  {
    id: "searchsploit-leaf",
    label: "SearchSploit / ExploitDB",
    type: "branch",
    color: "#f87171",
    icon: "🔎",
    parent: "exploit",
  },

  {
    id: "privesc",
    label: "Privilege Escalation",
    sublabel: "LinPEAS, WinPEAS, SUID, Token Impersonation",
    type: "main",
    color: "#f87171",
    icon: "⬆️",
    side: "left",
    children: ["ad"],
    leaf_children: ["linpeas-leaf", "gtfobins-leaf"],
  },
  {
    id: "linpeas-leaf",
    label: "LinPEAS / WinPEAS",
    type: "branch",
    color: "#f87171",
    icon: "🔓",
    parent: "privesc",
  },
  {
    id: "gtfobins-leaf",
    label: "GTFOBins & LOLBAS",
    type: "branch",
    color: "#f87171",
    icon: "📚",
    parent: "privesc",
  },

  // ── PHASE 4 – ADVANCED ────────────────────────────────────────────────────
  {
    id: "ad",
    label: "Active Directory Attacks",
    sublabel: "Kerberoasting, BloodHound, DCSync, Pass-the-Hash",
    type: "main",
    color: "#a855f7",
    icon: "🏛️",
    side: "right",
    children: ["webadv"],
    leaf_children: ["kerb-leaf", "blood-leaf"],
  },
  {
    id: "kerb-leaf",
    label: "Kerberoasting / AS-REP",
    type: "branch",
    color: "#a855f7",
    icon: "🎟️",
    parent: "ad",
  },
  {
    id: "blood-leaf",
    label: "BloodHound & SharpHound",
    type: "branch",
    color: "#a855f7",
    icon: "🩸",
    parent: "ad",
  },

  {
    id: "webadv",
    label: "Advanced Web Attacks",
    sublabel: "SQLi, SSRF, XXE, RCE, Deserialization",
    type: "main",
    color: "#a855f7",
    icon: "💉",
    side: "left",
    children: ["defense"],
    leaf_children: ["sqli-leaf", "ssrf-leaf"],
  },
  {
    id: "sqli-leaf",
    label: "SQL Injection & SQLMap",
    type: "branch",
    color: "#a855f7",
    icon: "🗃️",
    parent: "webadv",
  },
  {
    id: "ssrf-leaf",
    label: "SSRF / XXE / IDOR",
    type: "branch",
    color: "#a855f7",
    icon: "🔗",
    parent: "webadv",
  },

  // ── PHASE 5 – DEFENSIVE ──────────────────────────────────────────────────
  {
    id: "defense",
    label: "Defensive Security",
    sublabel: "SIEM, Log Analysis, Incident Response, Forensics",
    type: "main",
    color: "#f59e0b",
    icon: "🛡️",
    side: "right",
    children: ["advanced"],
    leaf_children: ["siem-leaf", "ir-leaf"],
  },
  {
    id: "siem-leaf",
    label: "SIEM & Splunk / ELK",
    type: "branch",
    color: "#f59e0b",
    icon: "📊",
    parent: "defense",
  },
  {
    id: "ir-leaf",
    label: "Incident Response",
    type: "branch",
    color: "#f59e0b",
    icon: "🚨",
    parent: "defense",
  },

  // ── END ──────────────────────────────────────────────────────────────────
  {
    id: "advanced",
    label: "Advanced Roadmap",
    sublabel: "Red Team · Malware Analysis · Cloud Security · OSCP",
    type: "end",
    color: "#f59e0b",
    icon: "🏆",
  },
];

// Build a lookup map
const nodeMap = {};
nodes.forEach((n) => (nodeMap[n.id] = n));

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT — main spine nodes (in order)
// ─────────────────────────────────────────────────────────────────────────────
const spineOrder = [
  "start",
  "net",
  "linux",
  "prog",
  "crypto",
  "web",
  "osint",
  "enum",
  "exploit",
  "privesc",
  "ad",
  "webadv",
  "defense",
  "advanced",
];

// Leaf pairs per main node
const leafMap = {
  net: ["nmap-leaf", "wireshark-leaf"],
  linux: ["bash-leaf", "vim-leaf"],
  prog: ["py-leaf", "git-leaf"],
  crypto: ["hash-leaf", "rsa-leaf"],
  web: ["owasp-leaf", "burp-leaf"],
  osint: ["shodan-leaf", "recon-leaf"],
  enum: ["gobuster-leaf", "enum4linux-leaf"],
  exploit: ["msf-leaf", "searchsploit-leaf"],
  privesc: ["linpeas-leaf", "gtfobins-leaf"],
  ad: ["kerb-leaf", "blood-leaf"],
  webadv: ["sqli-leaf", "ssrf-leaf"],
  defense: ["siem-leaf", "ir-leaf"],
};

// Phase label blocks
const phaseBlocks = [
  { afterId: "start", label: "Phase 01 — Foundations", color: "#34d399" },
  { afterId: "prog", label: "Phase 02 — Core Security", color: "#67e8f9" },
  { afterId: "osint", label: "Phase 03 — Offensive Security", color: "#f87171" },
  { afterId: "privesc", label: "Phase 04 — Advanced Attacks", color: "#a855f7" },
  { afterId: "webadv", label: "Phase 05 — Defensive & Certs", color: "#f59e0b" },
];

// ─────────────────────────────────────────────────────────────────────────────
// NODE CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function NodeCard({ node, delay = 0, compact = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const isRoot = node.type === "root";
  const isEnd = node.type === "end";
  const isBranch = node.type === "branch";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay, ease: "easeOut" },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "6px",
        border: `1px solid ${hovered ? node.color + "80" : node.color + "30"}`,
        background: isRoot || isEnd
          ? `linear-gradient(135deg, ${node.color}18, ${node.color}08)`
          : isBranch
          ? `rgba(10,14,23,0.7)`
          : `rgba(17,24,39,0.6)`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 0 24px ${node.color}30, 0 0 48px ${node.color}10, inset 0 0 12px ${node.color}08`
          : isRoot || isEnd
          ? `0 0 16px ${node.color}20`
          : "none",
        cursor: "default",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
        padding: compact ? "8px 14px" : isRoot || isEnd ? "18px 24px" : "12px 18px",
        minWidth: compact ? "120px" : isRoot || isEnd ? "260px" : "200px",
        maxWidth: compact ? "160px" : isRoot || isEnd ? "340px" : "280px",
        textAlign: "center",
      }}
    >
      {/* Animated corner accents */}
      {(isRoot || isEnd) && (
        <>
          <div style={{
            position: "absolute", top: 0, left: 0, width: 12, height: 12,
            borderTop: `2px solid ${node.color}80`,
            borderLeft: `2px solid ${node.color}80`,
            borderRadius: "2px 0 0 0",
          }} />
          <div style={{
            position: "absolute", top: 0, right: 0, width: 12, height: 12,
            borderTop: `2px solid ${node.color}80`,
            borderRight: `2px solid ${node.color}80`,
            borderRadius: "0 2px 0 0",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: 12, height: 12,
            borderBottom: `2px solid ${node.color}80`,
            borderLeft: `2px solid ${node.color}80`,
            borderRadius: "0 0 0 2px",
          }} />
          <div style={{
            position: "absolute", bottom: 0, right: 0, width: 12, height: 12,
            borderBottom: `2px solid ${node.color}80`,
            borderRight: `2px solid ${node.color}80`,
            borderRadius: "0 0 2px 0",
          }} />
        </>
      )}

      {/* Glow top line */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: `linear-gradient(90deg, transparent, ${node.color}, transparent)`,
        }}
      />

      {/* Icon */}
      {node.icon && (
        <div style={{
          fontSize: compact ? "14px" : isRoot || isEnd ? "22px" : "16px",
          marginBottom: compact ? "2px" : "6px",
          filter: `drop-shadow(0 0 6px ${node.color}60)`,
        }}>
          {node.icon}
        </div>
      )}

      {/* Label */}
      <div style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: compact ? "11px" : isRoot || isEnd ? "16px" : "13px",
        fontWeight: isRoot || isEnd ? 700 : 600,
        color: hovered ? node.color : "#cbd5e1",
        textShadow: hovered ? `0 0 8px ${node.color}60` : "none",
        transition: "color 0.3s ease, text-shadow 0.3s ease",
        letterSpacing: "0.05em",
        lineHeight: 1.3,
      }}>
        {node.label}
      </div>

      {/* Sublabel */}
      {node.sublabel && !compact && (
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: "10px",
          color: "#64748b",
          marginTop: "5px",
          lineHeight: 1.4,
          letterSpacing: "0.03em",
        }}>
          {node.sublabel}
        </div>
      )}

      {/* Bottom glow line */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute", bottom: 0, left: 0, height: 1,
          background: node.color,
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG CONNECTOR  (animated dashed line)
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedConnector({ color, height = 48, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const pathD = `M 1 0 L 1 ${height}`;

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", alignItems: "center", height }}>
      <svg width="14" height={height} overflow="visible" style={{ overflow: "visible" }}>
        {/* Static faint track */}
        <path d={pathD} stroke={color + "20"} strokeWidth="2" fill="none" />
        {/* Animated drawing path */}
        <motion.path
          d={pathD}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.5, delay, ease: "easeInOut" },
            },
          }}
        />
        {/* Arrow tip (triangle) */}
        <motion.polygon
          points={`-4,${height - 7} 7,${height - 7} 1,${height + 1}`}
          fill={color}
          style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          initial={{ opacity: 0, y: -4 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: delay + 0.45 },
            },
          }}
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BRANCH ROW  (2 side nodes + curved SVG paths)
// ─────────────────────────────────────────────────────────────────────────────
function BranchRow({ leafIds, color, delay = 0, side = "left" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  if (!leafIds || leafIds.length === 0) return null;

  const leftLeaf = nodeMap[leafIds[0]];
  const rightLeaf = nodeMap[leafIds[1]];

  // SVG canvas dimensions
  const W = 520; // total svg width
  const H = 52;  // height
  const cx = W / 2; // center x
  const leftX = 90;
  const rightX = W - 90;

  const leftPath = `M ${cx} 0 C ${cx} ${H / 2}, ${leftX} ${H / 2}, ${leftX} ${H}`;
  const rightPath = `M ${cx} 0 C ${cx} ${H / 2}, ${rightX} ${H / 2}, ${rightX} ${H}`;

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 560, margin: "0 auto", position: "relative" }}>
      {/* SVG curves */}
      <svg
        width="100%" viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", marginBottom: -8 }}
        preserveAspectRatio="none"
      >
        {/* Faint tracks */}
        <path d={leftPath} stroke={color + "20"} strokeWidth="1.5" fill="none" />
        <path d={rightPath} stroke={color + "20"} strokeWidth="1.5" fill="none" />
        {/* Animated paths */}
        <motion.path
          d={leftPath} stroke={color} strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: { pathLength: 1, opacity: 0.7, transition: { duration: 0.6, delay } },
          }}
        />
        <motion.path
          d={rightPath} stroke={color} strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: { pathLength: 1, opacity: 0.7, transition: { duration: 0.6, delay: delay + 0.05 } },
          }}
        />
      </svg>

      {/* Leaf cards row */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        {leftLeaf && <NodeCard node={leftLeaf} delay={delay + 0.2} compact />}
        {rightLeaf && <NodeCard node={rightLeaf} delay={delay + 0.3} compact />}
      </div>

      {/* Curves from leaves back up to center */}
      <svg
        width="100%" viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", marginTop: -8 }}
        preserveAspectRatio="none"
      >
        <path d={`M ${leftX} 0 C ${leftX} ${H / 2}, ${cx} ${H / 2}, ${cx} ${H}`}
          stroke={color + "20"} strokeWidth="1.5" fill="none" />
        <path d={`M ${rightX} 0 C ${rightX} ${H / 2}, ${cx} ${H / 2}, ${cx} ${H}`}
          stroke={color + "20"} strokeWidth="1.5" fill="none" />
        <motion.path
          d={`M ${leftX} 0 C ${leftX} ${H / 2}, ${cx} ${H / 2}, ${cx} ${H}`}
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: { pathLength: 1, opacity: 0.7, transition: { duration: 0.6, delay: delay + 0.35 } },
          }}
        />
        <motion.path
          d={`M ${rightX} 0 C ${rightX} ${H / 2}, ${cx} ${H / 2}, ${cx} ${H}`}
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: { pathLength: 1, opacity: 0.7, transition: { duration: 0.6, delay: delay + 0.4 } },
          }}
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE LABEL DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
function PhaseDivider({ label, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "8px 0",
        width: "100%",
        maxWidth: 560,
        alignSelf: "center",
      }}
    >
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}50)` }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.15em",
        color: color,
        textTransform: "uppercase",
        padding: "3px 10px",
        border: `1px solid ${color}30`,
        borderRadius: 4,
        background: `${color}08`,
        whiteSpace: "nowrap",
        textShadow: `0 0 8px ${color}50`,
      }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}50, transparent)` }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ROADMAP GRAPH
// ─────────────────────────────────────────────────────────────────────────────
export default function CybersecurityRoadmap() {
  // Build render sequence
  const sequence = [];
  let globalDelay = 0.1;
  const STEP = 0.08;

  // We iterate spine and insert phase dividers + branch rows
  for (let i = 0; i < spineOrder.length; i++) {
    const id = spineOrder[i];
    const node = nodeMap[id];

    // Phase divider BEFORE this node?
    const phase = phaseBlocks.find((p) => p.afterId === (spineOrder[i - 1] || ""));
    if (phase) {
      sequence.push({
        kind: "phase",
        label: phase.label,
        color: phase.color,
        delay: globalDelay,
      });
      globalDelay += STEP * 2;
      // connector
      sequence.push({ kind: "connector", color: phase.color, delay: globalDelay });
      globalDelay += STEP;
    }

    // The main node
    sequence.push({ kind: "node", node, delay: globalDelay });
    globalDelay += STEP * 2;

    // Branch leaves for this node
    const leaves = leafMap[id];
    if (leaves) {
      sequence.push({
        kind: "branches",
        leafIds: leaves,
        color: node.color,
        delay: globalDelay,
        side: node.side,
      });
      globalDelay += STEP * 4;
    }

    // Connector to next node (not after last)
    if (i < spineOrder.length - 1) {
      sequence.push({
        kind: "connector",
        color: node.color,
        nextColor: nodeMap[spineOrder[i + 1]]?.color,
        delay: globalDelay,
      });
      globalDelay += STEP;
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: "#cbd5e1",
    }}>
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", paddingBottom: 48, paddingTop: 16 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ height: 1, width: 48, background: "rgba(52,211,153,0.3)" }} />
          <span style={{
            fontSize: "11px", letterSpacing: "0.5em", color: "rgba(52,211,153,0.6)",
            textTransform: "uppercase",
          }}>
            CRYX // ROADMAP
          </span>
          <div style={{ height: 1, width: 48, background: "rgba(52,211,153,0.3)" }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(24px, 5vw, 48px)",
            fontWeight: 800,
            color: "#34d399",
            textShadow: "0 0 4px rgba(52,211,153,0.35), 0 0 14px rgba(52,211,153,0.15)",
            letterSpacing: "0.05em",
            margin: 0,
          }}
        >
          Cybersecurity Roadmap
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 14,
            fontSize: "13px",
            color: "#64748b",
            letterSpacing: "0.05em",
          }}
        >
          {"// Structured learning path · Click and explore each node"}
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: 12, marginTop: 20,
          }}
        >
          {[
            { label: "Phase 01 · Foundations", color: "#34d399" },
            { label: "Phase 02 · Core Security", color: "#67e8f9" },
            { label: "Phase 03 · Offensive", color: "#f87171" },
            { label: "Phase 04 · Advanced", color: "#a855f7" },
            { label: "Phase 05 · Defensive", color: "#f59e0b" },
          ].map((p) => (
            <div key={p.label} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: "10px", color: p.color, letterSpacing: "0.05em",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 2,
                background: p.color,
                boxShadow: `0 0 6px ${p.color}80`,
              }} />
              {p.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, #34d399, #67e8f9, transparent)",
        opacity: 0.3,
        marginBottom: 48,
      }} />

      {/* ── GRAPH ─────────────────────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        paddingBottom: 80,
        paddingLeft: 16,
        paddingRight: 16,
      }}>
        {sequence.map((item, idx) => {
          if (item.kind === "node") {
            return (
              <NodeCard
                key={`node-${item.node.id}-${idx}`}
                node={item.node}
                delay={item.delay}
              />
            );
          }

          if (item.kind === "connector") {
            const blendColor = item.nextColor
              ? item.color
              : item.color;
            return (
              <AnimatedConnector
                key={`conn-${idx}`}
                color={blendColor}
                height={40}
                delay={item.delay}
              />
            );
          }

          if (item.kind === "branches") {
            return (
              <BranchRow
                key={`branch-${idx}`}
                leafIds={item.leafIds}
                color={item.color}
                delay={item.delay}
                side={item.side}
              />
            );
          }

          if (item.kind === "phase") {
            return (
              <PhaseDivider
                key={`phase-${idx}`}
                label={item.label}
                color={item.color}
                delay={item.delay}
              />
            );
          }

          return null;
        })}
      </div>

      {/* ── FOOTER NOTE ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 560,
          margin: "0 auto 60px",
          border: "1px solid rgba(52,211,153,0.15)",
          borderRadius: 6,
          padding: "20px 24px",
          background: "rgba(17,24,39,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ color: "#34d399", fontSize: "12px", marginTop: 2 }}>[!]</span>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.7 }}>
            This roadmap is maintained by the CRYX team. The path is not strictly linear — explore
            based on your goals. Join our weekly labs to practice these skills hands-on every weekend.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
