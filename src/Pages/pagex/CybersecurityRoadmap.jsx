import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";


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

const nodeDetails = {
  start: {
    desc: "Welcome to your cybersecurity journey! Before diving into security tools, you must build strong foundations in networking, Linux systems, and basic automation.",
    topics: [
      "Understand the cybersecurity landscape",
      "Set up your virtual lab environment",
      "Learn how to research technical problems",
      "Practice ethical hacking etiquette"
    ],
    resources: [
      "TryHackMe - Pre-Security Path",
      "PortSwigger Web Security Academy",
      "OverTheWire Wargames"
    ]
  },
  net: {
    desc: "Networking is the backbone of cybersecurity. You cannot defend or attack what you don't understand. Focus on packet flows and protocols.",
    topics: [
      "OSI Model & TCP/IP stack",
      "Subnetting and IP addressing",
      "Common protocols (HTTP/S, DNS, SSH, SMB, DHCP)",
      "Routing & Switching basics"
    ],
    resources: [
      "Professor Messer Network+",
      "Network Chuck CCNA Course",
      "Wireshark Packet Analysis Labs"
    ]
  },
  "nmap-leaf": {
    desc: "Network scanning is the first step of active recon. Nmap allows you to discover active hosts, open ports, and running services.",
    topics: [
      "TCP Connect vs SYN scans",
      "Service detection & OS identification",
      "Nmap Scripting Engine (NSE)",
      "Firewall evasion techniques"
    ],
    resources: [
      "Nmap Official Documentation",
      "TryHackMe - Nmap Room",
      "HTB Academy - Network Analysis"
    ]
  },
  "wireshark-leaf": {
    desc: "Packet analysis is essential for incident response and debugging. Wireshark lets you capture and interactively browse traffic on a network.",
    topics: [
      "Display & Capture filters",
      "TCP Stream reassembly",
      "Identifying malicious payloads",
      "Analyzing TLS handshakes"
    ],
    resources: [
      "Wireshark Workbook",
      "Chris Greer - Wireshark Training",
      "Active Packet Analysis Labs"
    ]
  },
  linux: {
    desc: "Most servers and hacking tools run on Linux. Mastering the command line, file system, and permissions is non-negotiable.",
    topics: [
      "File system hierarchy & navigation",
      "File permissions & ownership (chmod, chown)",
      "Process management & system monitoring",
      "Package managers (apt, pacman, yum)"
    ],
    resources: [
      "Linux Journey (free website)",
      "OverTheWire Bandit Wargame",
      "LPI Linux Essentials Course"
    ]
  },
  "bash-leaf": {
    desc: "Automation makes you efficient. Bash scripting allows you to chain commands, parse logs, and build quick custom recon tools.",
    topics: [
      "Variables, loops, and conditionals",
      "Piping and redirection (|, >, >>)",
      "Regex and text filtering (grep, sed, awk)",
      "Automating scans and recon pipelines"
    ],
    resources: [
      "Bash Guide for Beginners",
      "Learn Bash on Exercism",
      "Command Line Power User Courses"
    ]
  },
  "vim-leaf": {
    desc: "When hacking remote systems, you won't have a GUI. Knowing how to efficiently edit files inside the terminal is crucial.",
    topics: [
      "Vim modal editing modes",
      "Navigation and editing shortcuts",
      "Configuring .vimrc for productivity",
      "Alternative terminal editors (Nano, Micro)"
    ],
    resources: [
      "Vimtutor (run `vimtutor` in bash)",
      "Vim Adventures game",
      "Vim Cheat Sheet"
    ]
  },
  prog: {
    desc: "Coding enables you to read exploit scripts, understand software vulnerabilities, and build custom hacking tools.",
    topics: [
      "Programming fundamentals (variables, loops, functions)",
      "Object-Oriented Programming (OOP) basics",
      "Using Git and Github for code management",
      "Interacting with APIs and web requests"
    ],
    resources: [
      "Automate the Boring Stuff with Python",
      "CS50 Introduction to Computer Science",
      "Git & GitHub Crash Course"
    ]
  },
  "py-leaf": {
    desc: "Python is the de-facto scripting language for cybersecurity professionals. Use it to write rapid exploits, scrapers, and scanners.",
    topics: [
      "Socket programming in Python",
      "Building custom web scrapers & brute-forcers",
      "Using libraries like Scapy, Requests, and pwntools",
      "Creating shell listeners and custom tools"
    ],
    resources: [
      "Black Hat Python book",
      "Violent Python book",
      "TryHackMe - Python for Pentesting"
    ]
  },
  "git-leaf": {
    desc: "Version control is crucial for managing scripts and collaborating. Understand how to push, pull, branch, and merge code safely.",
    topics: [
      "Git repository lifecycle (add, commit, status)",
      "Branching, merging, and resolving conflicts",
      "Working with remotes (GitHub, GitLab)",
      "Best practices for writing commit messages"
    ],
    resources: [
      "GitHub Skills Interactive Courses",
      "Learn Git Branching (Visualizer)",
      "Pro Git Book (Free)"
    ]
  },
  crypto: {
    desc: "Cryptography secures modern data. Learning about encryption algorithms and public-key infrastructure is vital for defense and exploitation.",
    topics: [
      "Symmetric vs Asymmetric Encryption",
      "Hashing algorithms (MD5, SHA256, bcrypt)",
      "Digital signatures and Certificates",
      "TLS/SSL protocol inner workings"
    ],
    resources: [
      "CryptoHack (Interactive platform)",
      "Khan Academy - Cryptography",
      "Serious Cryptography Book"
    ]
  },
  "hash-leaf": {
    desc: "Hashing is a one-way function used for integrity and password storage. Encoding (Base64, Hex) is NOT encryption.",
    topics: [
      "Hashing algorithms and collision resistance",
      "Salting and stretching password hashes",
      "Encoding vs Hashing vs Encryption",
      "Cracking hashes with Hashcat & John the Ripper"
    ],
    resources: [
      "Hashcat Official Wiki",
      "TryHackMe - Crack The Hash",
      "CyberChef (Swiss army knife tool)"
    ]
  },
  "rsa-leaf": {
    desc: "RSA is the cornerstone of asymmetric cryptography, utilizing prime factorization to enable secure key exchanges.",
    topics: [
      "Prime numbers and modular arithmetic",
      "Public/Private key pairs generation",
      "Key exchange protocols (Diffie-Hellman)",
      "Common RSA mathematical vulnerabilities"
    ],
    resources: [
      "CryptoHack RSA challenges",
      "Computerphile Cryptography (YT)",
      "Standard PKI Architectures"
    ]
  },
  web: {
    desc: "Web applications are a massive attack surface. Learn how web browsers interact with servers and explore common vulnerabilities.",
    topics: [
      "OWASP Top 10 Vulnerabilities",
      "HTTP Request/Response lifecycle",
      "Session management, cookies, and JWTs",
      "API security (REST, GraphQL)"
    ],
    resources: [
      "PortSwigger Web Security Academy",
      "OWASP Top 10 documentation",
      "HackTheBox - Web Path"
    ]
  },
  "owasp-leaf": {
    desc: "The OWASP Top 10 is the standard awareness document for web application security, listing the most critical web risks.",
    topics: [
      "SQL Injection & Cross-Site Scripting (XSS)",
      "Broken Authentication & Access Control",
      "Security Misconfigurations",
      "XML External Entities (XXE) & SSRF"
    ],
    resources: [
      "OWASP Top 10 Official Site",
      "PortSwigger Vulnerability Labs",
      "TryHackMe - OWASP Top 10 Room"
    ]
  },
  "burp-leaf": {
    desc: "Burp Suite is the industry-standard web proxy. It intercepts, analyzes, and modifies web traffic between your browser and the target.",
    topics: [
      "Configuring browser proxy & SSL certificates",
      "Intercepting & modifying requests (Proxy)",
      "Automating attacks using Intruder & Repeater",
      "Extending Burp with BApp Store plugins"
    ],
    resources: [
      "PortSwigger Burp Suite Tutorials",
      "InsiderPhD - Burp Suite Guide (YT)",
      "TryHackMe - Burp Suite Rooms"
    ]
  },
  osint: {
    desc: "Open Source Intelligence (OSINT) involves gathering publicly available information to profile targets and identify leaks.",
    topics: [
      "Google Dorking and advanced search operators",
      "Metadata analysis in documents (ExifTool)",
      "Email & domain investigation",
      "Social engineering recon pipelines"
    ],
    resources: [
      "IntelTechniques (Michael Bazzell)",
      "OSINT Framework website",
      "Bellingcat Guides"
    ]
  },
  "shodan-leaf": {
    desc: "Shodan is a search engine for internet-connected devices. Learn to find vulnerable servers, IoT devices, and database leaks.",
    topics: [
      "Shodan search filters (port, country, os)",
      "Monitoring your own IP range for leaks",
      "Shodan CLI automation",
      "Censys and Zoomeye alternatives"
    ],
    resources: [
      "Shodan Help Center & Guides",
      "TryHackMe - Shodan Room",
      "SANS Securing IoT Devices"
    ]
  },
  "recon-leaf": {
    desc: "Passive reconnaissance allows you to gather intelligence about a target without directly sending packets to their servers.",
    topics: [
      "WHOIS and DNS records mapping",
      "Subdomain discovery (Subfinder, Amass)",
      "Analyzing public code repos for secrets",
      "Certificate Transparency (CT) logs inspection"
    ],
    resources: [
      "TCM Security - Practical Ethical Hacking",
      "Bug Bounty Hunter Recon Guides",
      "OSINT Combine Courses"
    ]
  },
  enum: {
    desc: "Active enumeration is about systematically questioning services on target systems to find vulnerabilities and entry points.",
    topics: [
      "Directory and file brute-forcing",
      "SMB, SNMP, and LDAP enumeration",
      "Service banners grabbing",
      "Default credential testing"
    ],
    resources: [
      "HackTricks Wiki (Enumeration page)",
      "HTB Academy - Footprinting",
      "TryHackMe - Network Services"
    ]
  },
  "gobuster-leaf": {
    desc: "Gobuster is a fast tool to brute-force directories, files, DNS subdomains, and virtual hosts.",
    topics: [
      "Directory brute-forcing with custom wordlists",
      "Subdomain enumeration via DNS mode",
      "Searching for specific file extensions (-x)",
      "Configuring rate limits and custom headers"
    ],
    resources: [
      "Gobuster GitHub Wiki",
      "SecLists Wordlists collection",
      "Directory Busting tutorials"
    ]
  },
  "enum4linux-leaf": {
    desc: "Enum4linux is a tool for enumerating information from Windows and Samba systems, including shares, users, and groups.",
    topics: [
      "Extracting user lists and group memberships",
      "Identifying open SMB shares & permissions",
      "Null session testing",
      "Samba configuration auditing"
    ],
    resources: [
      "Enum4linux Documentation",
      "TryHackMe - Windows Enumeration",
      "Samba Auditing Guides"
    ]
  },
  exploit: {
    desc: "Exploitation is taking advantage of a software vulnerability to execute code, read sensitive data, or gain control of a machine.",
    topics: [
      "Understanding CVEs and vulnerability databases",
      "Exploitation lifecycle and payloads",
      "Metasploit Framework exploitation",
      "Buffer overflow basics and memory safety"
    ],
    resources: [
      "Exploit-DB",
      "Metasploit Unleashed",
      "Buffer Overflow Prep - TryHackMe"
    ]
  },
  "msf-leaf": {
    desc: "Metasploit is the world's most used penetration testing framework. Learn to use modules, payloads, and post-exploitation scripts.",
    topics: [
      "Metasploit CLI (msfconsole) navigation",
      "Exploit, Auxiliary, and Post modules",
      "Staged vs Unstaged payloads (Meterpreter)",
      "Evasion and encoding modules"
    ],
    resources: [
      "Offensive Security Metasploit Guide",
      "TryHackMe - Metasploit Rooms",
      "HackTheBox - Metasploit Labs"
    ]
  },
  "searchsploit-leaf": {
    desc: "Searchsploit is a command-line search utility for Exploit-DB, letting you search for public exploits offline.",
    topics: [
      "Searching by CVE, platform, or author",
      "Copying exploit scripts to working directories",
      "Compiling C/C++ exploit payloads",
      "Verifying exploit safety before running"
    ],
    resources: [
      "Exploit-DB Searchsploit Manual",
      "TryHackMe - Exploit Research",
      "Ethical Hacking offline manuals"
    ]
  },
  privesc: {
    desc: "Once inside a target, you usually start with low privileges. Privilege escalation is the art of becoming Administrator or Root.",
    topics: [
      "SUID/SGID binary exploits on Linux",
      "Kernel vulnerabilities and patch levels",
      "Unquoted Service Paths on Windows",
      "Token Impersonation & Potato attacks"
    ],
    resources: [
      "Tib3rius Linux/Windows PrivEsc",
      "PayloadsAllTheThings PrivEsc Guides",
      "HackTricks - Windows/Linux PrivEsc"
    ]
  },
  "linpeas-leaf": {
    desc: "LinPEAS and WinPEAS are scripts that search for possible paths to escalate privileges on Linux/Windows hosts.",
    topics: [
      "Reading PEAS color-coded script outputs",
      "Finding weak file permissions on config files",
      "Detecting cleartext passwords in memory or files",
      "Automating privilege check reporting"
    ],
    resources: [
      "LinPEAS GitHub repository",
      "PEAS Suite Documentation",
      "TryHackMe - Privilege Escalation Rooms"
    ]
  },
  "gtfobins-leaf": {
    desc: "GTFOBins (Linux) and LOLBAS (Windows) list binaries that can be abused to bypass security restrictions or escalate privileges.",
    topics: [
      "Abusing SUID binaries (like find, nano, vim)",
      "Executing commands through unexpected utilities",
      "Bypassing Application Whitelisting (AppLocker)",
      "Exploitation via LOLBins"
    ],
    resources: [
      "GTFOBins website",
      "LOLBAS project website",
      "TryHackMe - LOLBAS/GTFOBins tutorials"
    ]
  },
  ad: {
    desc: "Active Directory manages identities in 90% of enterprise environments. Focus on configuration flaws rather than exploits.",
    topics: [
      "Kerberos Authentication protocol flow",
      "Domain controllers and Active Directory databases",
      "BloodHound graph-based pathing",
      "Domain dominance (Golden/Silver Tickets)"
    ],
    resources: [
      "Wadcoms AD Database",
      "The Cyber Mentor - Practical Ethical Hacking",
      "HackTheBox - Active Directory 101"
    ]
  },
  "kerb-leaf": {
    desc: "Kerberoasting is an attack technique targeting Active Directory service accounts, allowing offline password cracking of service tickets.",
    topics: [
      "Requesting TGS tickets from Active Directory",
      "Extracting ticket hashes from memory",
      "AS-REP Roasting (pre-auth disabled)",
      "Offline cracking of TGS hashes with Hashcat"
    ],
    resources: [
      "ADSecurity.org (Sean Metcalf)",
      "TryHackMe - Attacking Kerberos",
      "SpecterOps blog posts"
    ]
  },
  "blood-leaf": {
    desc: "BloodHound uses graph theory to reveal hidden relationships and attack paths in an Active Directory environment.",
    topics: [
      "Running SharpHound collectors in domains",
      "Analyzing attack graphs (shortest paths)",
      "ACL abuse and User Rights Assignment",
      "Mitigating Active Directory risk pathways"
    ],
    resources: [
      "BloodHound GitHub & Documentation",
      "TryHackMe - BloodHound Room",
      "SpecterOps Training courses"
    ]
  },
  webadv: {
    desc: "Advanced web hacking targets complex application logic, server-side configurations, and data parsers.",
    topics: [
      "SQL Injection filter bypasses",
      "Server-Side Request Forgery (SSRF) in cloud networks",
      "XML External Entity (XXE) data extraction",
      "Insecure Deserialization attacks"
    ],
    resources: [
      "PortSwigger Web Academy (Expert)",
      "OWASP Web Security Testing Guide",
      "Bug Bounty Hunter platform"
    ]
  },
  "sqli-leaf": {
    desc: "SQL Injection allows attackers to execute arbitrary SQL queries, bypassing authentication or dumping databases.",
    topics: [
      "Union-based, Boolean-based, and Blind SQLi",
      "Dumping tables and bypassing authentication",
      "SQLMap automated detection & extraction",
      "Out-of-band SQL Injection"
    ],
    resources: [
      "PortSwigger SQL Injection Labs",
      "SQLMap User Manual",
      "PentesterLab SQL Injection path"
    ]
  },
  "ssrf-leaf": {
    desc: "SSRF allows an attacker to abuse server functionality to read or write resources from internal networks or cloud metadata.",
    topics: [
      "Exploiting SSRF to access AWS/GCP metadata",
      "Bypassing DNS blacklists and firewall rules",
      "XXE injection for local file reading",
      "Blind SSRF exploitation techniques"
    ],
    resources: [
      "PortSwigger SSRF/XXE Labs",
      "PayloadsAllTheThings SSRF Cheat Sheet",
      "OWASP SSRF prevention guides"
    ]
  },
  defense: {
    desc: "Defensive security (Blue Teaming) involves monitoring networks, detecting threat actors, and responding to security incidents.",
    topics: [
      "SIEM architectures and log aggregation",
      "Windows event logs & Sysmon analysis",
      "Incident response frameworks (NIST, SANS)",
      "Threat hunting and detection engineering"
    ],
    resources: [
      "Sherlocks (HTB Blue Team Labs)",
      "Blue Team Labs Online (BTLO)",
      "LetsDefend.io"
    ]
  },
  "siem-leaf": {
    desc: "SIEM tools aggregate logs from across an enterprise, providing search, correlation, and alerting capabilities.",
    topics: [
      "Writing Splunk search queries (SPL)",
      "Building Elastic security detection rules",
      "Parsing firewall, proxy, and endpoint logs",
      "Configuring log forwards (Universal Forwarder)"
    ],
    resources: [
      "Splunk Fundamentals Course (Free)",
      "Elastic Security Documentation",
      "TryHackMe - Splunk Rooms"
    ]
  },
  "ir-leaf": {
    desc: "Incident Response is the structured process of detecting, containing, and recovering from security breaches.",
    topics: [
      "Preparation, Detection, Containment, Eradication, Recovery",
      "Memory forensics (Volatility)",
      "Disk imaging & forensic triage",
      "Root cause analysis & post-incident reporting"
    ],
    resources: [
      "NIST SP 800-61 r2 (IR Guide)",
      "TryHackMe - Incident Response",
      "SANS FOR508 (Digital Forensics & IR)"
    ]
  },
  advanced: {
    desc: "Congratulations! You have covered the core roadmap. To specialize, choose a branch: Red Teaming, Malware Analysis, Cloud Security, or obtain industry certs (OSCP, CISSP).",
    topics: [
      "Red Team operations and adversary simulation",
      "Reverse engineering and malware analysis",
      "Cloud Security (AWS, Azure, GCP)",
      "Professional certifications preparation (OSCP, PNPT)"
    ],
    resources: [
      "Offensive Security OSCP Certification",
      "Malware Unicorn Reverse Engineering",
      "TCM Security Academy"
    ]
  }
};


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
function NodeCard({ node, delay = 0, compact = false, onClick }) {
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
      onClick={onClick}
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
        cursor: "pointer",
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

  const pathD = `M 8 0 L 8 ${height}`;

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", alignItems: "center", height }}>
      <svg width="16" height={height} overflow="visible" style={{ overflow: "visible" }}>
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
          points={`3,${height - 7} 13,${height - 7} 8,${height + 1}`}
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
function BranchRow({ leafIds, color, delay = 0, side = "left", onNodeClick }) {
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
  const leftX = 104; // 20% of 520
  const rightX = 416; // 80% of 520

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
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
          {leftLeaf && <NodeCard node={leftLeaf} delay={delay + 0.2} compact onClick={() => onNodeClick(leftLeaf)} />}
        </div>
        <div style={{ width: "20%" }} />
        <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
          {rightLeaf && <NodeCard node={rightLeaf} delay={delay + 0.3} compact onClick={() => onNodeClick(rightLeaf)} />}
        </div>
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
  const [selectedNode, setSelectedNode] = useState(null);

  // Build render sequence
  const sequence = [];
  const STEP = 0.08;

  // We iterate spine and insert phase dividers + branch rows
  for (let i = 0; i < spineOrder.length; i++) {
    const id = spineOrder[i];
    const node = nodeMap[id];
    let localDelay = 0.05;

    // Phase divider BEFORE this node?
    const phase = phaseBlocks.find((p) => p.afterId === (spineOrder[i - 1] || ""));
    if (phase) {
      sequence.push({
        kind: "phase",
        label: phase.label,
        color: phase.color,
        delay: localDelay,
      });
      localDelay += STEP;
      // connector
      sequence.push({ kind: "connector", color: phase.color, delay: localDelay });
      localDelay += STEP;
    }

    // The main node
    sequence.push({ kind: "node", node, delay: localDelay });
    localDelay += STEP;

    // Branch leaves for this node
    const leaves = leafMap[id];
    if (leaves) {
      sequence.push({
        kind: "branches",
        leafIds: leaves,
        color: node.color,
        delay: localDelay,
        side: node.side,
      });
      localDelay += STEP;
    }

    // Connector to next node (not after last)
    if (i < spineOrder.length - 1) {
      sequence.push({
        kind: "connector",
        color: node.color,
        nextColor: nodeMap[spineOrder[i + 1]]?.color,
        delay: localDelay,
      });
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
                onClick={() => setSelectedNode(item.node)}
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
                onNodeClick={(node) => setSelectedNode(node)}
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

      {/* ── DETAIL MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedNode && (() => {
          const details = nodeDetails[selectedNode.id] || {
            desc: "Detailed curriculum structure and labs for this module are currently being compiled by the CRYX team.",
            topics: ["General concepts & foundations", "Best practices & hands-on tool usage", "Lab setups & environment configuration"],
            resources: ["CRYX Learning Portal", "TryHackMe Security Rooms"]
          };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(5, 8, 16, 0.85)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  maxWidth: 480,
                  background: "rgba(10, 14, 23, 0.95)",
                  border: `1px solid ${selectedNode.color}60`,
                  borderRadius: 8,
                  padding: 24,
                  boxShadow: `0 0 32px ${selectedNode.color}20, inset 0 0 16px ${selectedNode.color}05`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Diagonal radial glow background accent */}
                <div style={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  background: `radial-gradient(circle, ${selectedNode.color}15 0%, transparent 70%)`,
                  pointerEvents: "none"
                }} />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "20px",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.color = selectedNode.color}
                  onMouseLeave={(e) => e.target.style.color = "#64748b"}
                >
                  ✕
                </button>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{
                    fontSize: "32px",
                    filter: `drop-shadow(0 0 8px ${selectedNode.color}60)`
                  }}>
                    {selectedNode.icon}
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: selectedNode.color,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 2
                    }}>
                      Module Exploration //
                    </span>
                    <h2 style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#cbd5e1",
                      letterSpacing: "0.02em"
                    }}>
                      {selectedNode.label}
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: `linear-gradient(90deg, ${selectedNode.color}40, transparent)`, marginBottom: 18 }} />

                {/* Description */}
                <p style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  margin: "0 0 20px 0",
                  letterSpacing: "0.01em"
                }}>
                  {details.desc}
                </p>

                {/* Key Concepts */}
                {details.topics && details.topics.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: selectedNode.color,
                      margin: "0 0 10px 0",
                    }}>
                      Core Concepts
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {details.topics.map((topic, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: "11px",
                            color: "#cbd5e1"
                          }}
                        >
                          <span style={{ color: selectedNode.color, fontFamily: "monospace" }}>[x]</span>
                          <span style={{ lineHeight: 1.4 }}>{topic}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Resources */}
                {details.resources && details.resources.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: selectedNode.color,
                      margin: "0 0 10px 0",
                    }}>
                      Recommended Labs & Resources
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {details.resources.map((res, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 10px",
                            borderRadius: 4,
                            border: `1px solid rgba(255, 255, 255, 0.03)`,
                            background: `rgba(255, 255, 255, 0.015)`,
                            fontSize: "11px",
                            color: "#94a3b8",
                          }}
                        >
                          <span style={{ color: selectedNode.color }}>✦</span>
                          <span>{res}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer / Close Action */}
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: selectedNode.color,
                    background: `${selectedNode.color}10`,
                    border: `1px solid ${selectedNode.color}30`,
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `${selectedNode.color}20`;
                    e.target.style.borderColor = selectedNode.color;
                    e.target.style.boxShadow = `0 0 12px ${selectedNode.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = `${selectedNode.color}10`;
                    e.target.style.borderColor = `${selectedNode.color}30`;
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Acknowledge & Close
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
