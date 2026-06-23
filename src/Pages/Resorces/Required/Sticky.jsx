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
        </>
    )
}