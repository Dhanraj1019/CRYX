import LabCard from '../Required/LabCard'
import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function PlatformSection({ platform, index,onDelete }) {
  const [filterDiff, setFilterDiff] = useState("All");
  const navigate = useNavigate();
  
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const pro_plat={
      id: platform.id,
      name: platform.name,
      shortName: platform.shortName,
      tagline: platform.tagline,
      color: platform.color,
      accentColor: platform.accentColor,
      icon: platform.icon,
      borderColor: platform.borderColor,
      bgColor: platform.bgColor,
      logo: platform.logo,
  }

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
            <LabCard key={lab.id} lab={lab} platform={pro_plat} onDelete= {onDelete}/>
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