import { useState } from "react";
import PlatformSection from '../Resorces/Required/PlatformSection'
import LabCard from '../Resorces/Required/LabCard'
import Top from '../Resorces/Required/Top'
import Bottom from '../Resorces/Required/Bottom'
import Sticky from '../Resorces/Required/Sticky'
// ── Platform Data ──────────────────────────────────────────────────────────────
const tryhackmeLabs = [];
const hacktheboxLabs = [];
const picoCTFLabs = [];

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



export default function WeeklyLabs() {
  const [tryhackmeList, setTryhackmeList] = useState(() => {
    const saved = localStorage.getItem("cryx_labs_tryhackme");
    return saved ? JSON.parse(saved) : tryhackmeLabs;
  });
  const [hacktheboxList, setHacktheboxList] = useState(() => {
    const saved = localStorage.getItem("cryx_labs_hackthebox");
    return saved ? JSON.parse(saved) : hacktheboxLabs;
  });
  const [picoList, setPicoList] = useState(() => {
    const saved = localStorage.getItem("cryx_labs_picoctf");
    return saved ? JSON.parse(saved) : picoCTFLabs;
  });

  const handleAddLab = (platformId, newLab) => {
    if (platformId === "tryhackme") {
      const updated = [...tryhackmeList, newLab];
      setTryhackmeList(updated);
      localStorage.setItem("cryx_labs_tryhackme", JSON.stringify(updated));
    } else if (platformId === "hackthebox") {
      const updated = [...hacktheboxList, newLab];
      setHacktheboxList(updated);
      localStorage.setItem("cryx_labs_hackthebox", JSON.stringify(updated));
    } else if (platformId === "picoctf") {
      const updated = [...picoList, newLab];
      setPicoList(updated);
      localStorage.setItem("cryx_labs_picoctf", JSON.stringify(updated));
    }
  };

  const dynamicPlatforms = [
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
      labs: tryhackmeList,
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
      labs: hacktheboxList,
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
      labs: picoList,
      logo: "CTF",
    },
  ];

  const features = [
    { label: "Total Labs", value: `${tryhackmeList.length + hacktheboxList.length + picoList.length}+`, color: "#34d399" },
    { label: "TryHackMe", value: `${tryhackmeList.length}`, color: "#34d399" },
    { label: "HackTheBox", value: `${hacktheboxList.length}`, color: "#9fef00" },
    { label: "PicoCTF", value: `${picoList.length}`, color: "#67e8f9" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-6 animate-fade-in">
      <Top features={features} />

      {/* Gradient divider */}
      <div className="h-px gradient-line opacity-40 mb-8" />

      <Sticky platforms={dynamicPlatforms} />

      {/* ── Platform Sections ── */}
      <div className="space-y-14 sm:space-y-20">
        {dynamicPlatforms.map((platform, index) => (
          <PlatformSection
            key={platform.id}
            platform={platform}
            index={index}
            onAddLab={handleAddLab}
          />
        ))}
      </div>

      <Bottom />

      <div className="h-16" />
    </div>
  );
}
