import { useEffect, useState } from "react";

const FULL_TEXT = "WELCOME TO CRYX CLUB";

export default function Welcome() {
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full justify-center px-4">
      <h1
        className="font-mono text-center text-2xl sm:text-3xl md:text-5xl font-bold tracking-wider"
        style={{
          color: "#00FF88",
          textShadow:
            "0 0 4px rgba(0,255,136,0.7), 0 0 10px rgba(0,255,136,0.5), 0 0 20px rgba(0,255,136,0.3)",
        }}
      >
        {typed}
        <span
          aria-hidden="true"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 80ms linear" }}
        >
          _
        </span>
      </h1>
    </div>
  );
}

