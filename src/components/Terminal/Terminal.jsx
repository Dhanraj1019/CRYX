import { useState, useRef, useEffect } from "react";
import "./Terminal.css";

function Terminal() {
  const [output, setOutput] = useState([]);
  const [boot, setBoot] = useState(true);
  const inputRef = useRef(null);

  const commands = {
    help: "Available commands: about, mission, status, ls, pwd, clear",
    about: "CRYX is Cyber Security Club of MNIT Jaipur",
    mission: "Learn, Hack, Build, Secure",
    ls: "events members resources",
    pwd: "/home/guest/cryx",
  };

  // Boot animation
  useEffect(() => {
    setTimeout(() => {
      setBoot(false);
      inputRef.current?.focus();
    }, 2500);
  }, []);

  function handleCommand(cmd) {
    if (cmd === "clear") {
      setOutput([]);
      return;
    }

    const result = commands[cmd] || "Command not found";

    setOutput((prev) => [
      ...prev,
      `guest@cryx:~$ ${cmd}`,
      result,
    ]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleCommand(e.target.value);
      e.target.value = "";
    }
  }

  if (boot) {
    return (
      <div className="boot">
        Booting system... Welcome to CRYX
      </div>
    );
  }

  return (
    <div id="terminal" className="terminal">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="title">
          🛡️ root@cryx — server :~
        </div>

        <div className="buttons">
          <span className="btn red"></span>
          <span className="btn yellow"></span>
          <span className="btn green"></span>
        </div>
      </div>

      {/* BODY */}
      <div className="body">

        <div className="terminalText">
          <p>Initializing connection... [ OK ]</p>
          <br></br>
          <p>Loading member database... [ 34 MEMBERS ]</p>
          <br></br>
          <p>Type 'help' for available commands</p>
        </div>

        {/* OUTPUT */}
        <div className="output">
          {output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-line">
          <span className="prompt">guest@cryx:~$</span>

          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="topbar">
        <div className="title">root@cryx — server</div>
      </div>

    </div>
  );
}

export default Terminal;