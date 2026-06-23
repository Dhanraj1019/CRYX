import LabCard from '../Required/LabCard'
import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";

export default function PlatformSection({ platform, index, onAddLab }) {
  const [filterDiff, setFilterDiff] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [url, setUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filtered =
    filterDiff === "All"
      ? platform.labs
      : platform.labs.filter((l) => l.difficulty === filterDiff);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !url.trim()) {
      alert("Please fill in all required fields (Title, Description, URL).");
      return;
    }

    const tags = tagsInput
      ? tagsInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
      : ["Lab"];

    const newLab = {
      id: `${platform.id}-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      difficulty,
      url: url.trim(),
      tags,
      date: dateInput.trim() || "New",
    };

    onAddLab(platform.id, newLab);

    // Reset fields
    setTitle("");
    setDescription("");
    setDifficulty("Easy");
    setUrl("");
    setTagsInput("");
    setDateInput("");
    setIsAddModalOpen(false);
  };

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
              
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 font-mono text-lg font-bold"
                style={{
                  color: platform.color,
                  borderColor: platform.borderColor,
                  background: platform.bgColor,
                  boxShadow: `0 0 8px ${platform.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${platform.color}20`;
                  e.currentTarget.style.boxShadow = `0 0 12px ${platform.color}40`;
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = platform.bgColor;
                  e.currentTarget.style.boxShadow = `0 0 8px ${platform.color}20`;
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
              >
                +
              </button>
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

      {/* ── ADD LAB MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-md p-6 border relative overflow-hidden"
              style={{
                background: "rgba(10, 14, 23, 0.98)",
                borderColor: `${platform.color}60`,
                boxShadow: `0 0 32px ${platform.color}20`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {/* Radial glow accent */}
              <div style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                background: `radial-gradient(circle, ${platform.color}15 0%, transparent 70%)`,
                pointerEvents: "none"
              }} />

              {/* Close Button */}
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-350 cursor-pointer text-xl transition-colors duration-200"
                style={{ background: "none", border: "none" }}
                onMouseEnter={(e) => e.target.style.color = platform.color}
                onMouseLeave={(e) => e.target.style.color = "#64748b"}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <span className="text-[9px] uppercase tracking-widest block" style={{ color: platform.color }}>
                    Add New Target //
                  </span>
                  <h3 className="text-base font-bold text-slate-200">
                    Add {platform.name} Lab
                  </h3>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Lab Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Blue"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors duration-200"
                    onFocus={(e) => {
                      e.target.style.borderColor = platform.color;
                      e.target.style.boxShadow = `0 0 8px ${platform.color}25`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary of the vulnerability or challenge..."
                    rows="3"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors duration-200 resize-none"
                    onFocus={(e) => {
                      e.target.style.borderColor = platform.color;
                      e.target.style.boxShadow = `0 0 8px ${platform.color}25`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Double row: Difficulty and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-500 transition-colors duration-200"
                      onFocus={(e) => {
                        e.target.style.borderColor = platform.color;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                      }}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                      Release Date / Week
                    </label>
                    <input
                      type="text"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      placeholder="e.g. Week 11"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors duration-200"
                      onFocus={(e) => {
                        e.target.style.borderColor = platform.color;
                        e.target.style.boxShadow = `0 0 8px ${platform.color}25`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Lab URL */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Lab URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors duration-200"
                    onFocus={(e) => {
                      e.target.style.borderColor = platform.color;
                      e.target.style.boxShadow = `0 0 8px ${platform.color}25`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Windows, SMB, EternalBlue..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors duration-200"
                    onFocus={(e) => {
                      e.target.style.borderColor = platform.color;
                      e.target.style.boxShadow = `0 0 8px ${platform.color}25`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(30, 41, 59, 1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-350 rounded-sm text-xs font-semibold cursor-pointer transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border rounded-sm text-xs font-semibold cursor-pointer transition-all duration-300"
                    style={{
                      color: platform.color,
                      borderColor: `${platform.color}40`,
                      background: `${platform.color}10`,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `${platform.color}20`;
                      e.target.style.borderColor = platform.color;
                      e.target.style.boxShadow = `0 0 12px ${platform.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${platform.color}10`;
                      e.target.style.borderColor = `${platform.color}40`;
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Deploy Lab
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}