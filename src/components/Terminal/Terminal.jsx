import { useState, useRef, useEffect } from "react";

function Terminal() {
  const [output, setOutput] = useState([]);
  const [boot, setBoot] = useState(true);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: "Available commands: whoami,about, mission, status, team, ls, pwd, clear",
    about: "CRYX is the premier Cybersecurity Club — where code meets defense.",
    mission: ">> Learn. Hack. Build. Secure. <<",
    status: "[SYSTEMS ONLINE] — All nodes operational. Threat level: LOW",
    team: "4 active operatives | 34 total members | 12 events completed",
    ls: "drwxr-x--- events/\n drwxr-x--- members/\n drwxr-x--- resources/\n -rw-r----- README.md",
    pwd: "/home/guest/cryx",
  };

  useEffect(() => {
    setTimeout(() => {
      setBoot(false);
      inputRef.current?.focus();
    }, 2500);
  }, []);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  function handleCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setOutput([]);
      return;
    }
    if (trimmed === "") return;

    const result = commands[trimmed] || `bash: ${trimmed}: command not found`;

    setOutput((prev) => [
      ...prev,
      { type: "cmd", text: `guest@cryx:~$ ${trimmed}` },
      { type: "result", text: result },
    ]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleCommand(e.target.value);
      e.target.value = "";
    }
  }

  // Boot screen
  if (boot) {
    return (
      <div className="flex items-center justify-center h-64 w-3/4 mx-auto animate-fade-in">
        <div className="text-center font-mono">
          <div className="text-neon-green text-lg animate-glow-pulse text-glow-green">
            ⟡ Booting system...
          </div>
          <div className="mt-3 text-text-muted text-sm tracking-wider">
            WELCOME TO CRYX
          </div>
          {/* Loading bar */}
          <div className="mt-4 w-48 h-1 bg-bg-surface mx-auto rounded-full overflow-hidden">
            <div
              className="h-full bg-neon-green rounded-full"
              style={{
                animation: "boot-load 2.2s ease-in-out forwards",
              }}
            ></div>
          </div>
          <style>{`
            @keyframes boot-load {
              0% { width: 0%; }
              30% { width: 35%; }
              60% { width: 70%; }
              90% { width: 90%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      id="terminal"
      className="h-100 w-full max-w-4xl mx-auto border border-neon-green/30 overflow-hidden flex flex-col animate-fade-in"
      style={{
        boxShadow: "0 0 25px rgba(0,255,136,0.1), 0 0 50px rgba(0,255,136,0.05)",
      }}
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-bg-elevated border-b border-neon-green/20 shrink-0">
        <div className="flex items-center gap-2 text-neon-green text-sm font-mono">
          <span>🛡️</span>
          <span className="text-text-muted">root@cryx</span>
          <span className="text-text-dim">—</span>
          <span className="text-neon-green/70">server :~</span>
        </div>

        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 transition cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-125 transition cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-neon-green hover:brightness-125 transition cursor-pointer"></span>
        </div>
      </div>

      {/* BODY */}
      <div
        ref={outputRef}
        className="flex-1 p-4 bg-[#0b0f14] overflow-y-auto font-mono text-sm"
      >
        {/* Initial text */}
        <div className="text-text-muted mb-4 space-y-1">
          <p>
            <span className="text-neon-green">✓</span> Initializing connection...{" "}
            <span className="text-neon-green">[ OK ]</span>
          </p>
          <p>
            <span className="text-neon-green">✓</span> Loading member database...{" "}
            <span className="text-neon-cyan">[ 34 MEMBERS ]</span>
          </p>
          <p>
            <span className="text-neon-green">✓</span> Securing channel...{" "}
            <span className="text-neon-green">[ ENCRYPTED ]</span>
          </p>
          <p className="mt-3 text-text-primary">
            Type <span className="text-neon-green">'help'</span> for available commands
          </p>
        </div>

        {/* OUTPUT */}
        <div className="space-y-1">
          {output.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "cmd"
                  ? "text-neon-green"
                  : "text-text-primary pl-2 whitespace-pre-line"
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="flex items-center mt-3 text-neon-green">
          <span className="mr-2 shrink-0">guest@cryx:~$</span>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            className="bg-transparent border-none outline-none text-text-primary w-full font-mono text-sm caret-neon-green"
          />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center px-4 py-1.5 bg-bg-elevated border-t border-neon-green/20 shrink-0">
        <span className="text-text-dim text-xs font-mono">root@cryx — server</span>
        <span className="ml-auto text-text-dim text-xs font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-glow-pulse"></span>
          CONNECTED
        </span>
      </div>
    </div>
  );
}

export default Terminal;