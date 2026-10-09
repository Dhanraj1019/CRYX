import { useState } from "react";
export default function Sticky({platforms}){
  const [activeTab, setActiveTab] = useState("all");

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
    return (
        <>
            {/* ── Sticky Platform Nav ── */}
      <div className="sticky top-16 z-30 mb-8 sm:top-20">
        <div className="glass-strong flex items-center gap-2 overflow-x-auto rounded-sm border border-neon-green/15 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
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
              className="min-h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-sm border px-3 py-1.5 font-mono text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-neon-green"
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
        </>
    )
}
