import { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import conf from '../../conf/conf'
const sevColor = {
  high: "bg-red-500",
  med: "bg-amber-400",
  low: "bg-emerald-400",
};

export default function CyberNewsLog() {
  const [loader, setLoader] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [newsEntries, setNewsEntries] = useState([]);
  const controls = useAnimationControls();
  const containerRef = useRef(null);
  const backend_api=conf.RENDER_API;
  // Detect severity from title
  const getSeverity = (title) => {
    const text = title.toLowerCase();

    if (
      text.includes("critical") ||
      text.includes("ransomware") ||
      text.includes("exploit") ||
      text.includes("0-day") ||
      text.includes("zero-day") ||
      text.includes("vulnerability") ||
      text.includes("breach") ||
      text.includes("cve")
    ) {
      return "high";
    }

    if (
      text.includes("malware") ||
      text.includes("phishing") ||
      text.includes("attack") ||
      text.includes("hack") ||
      text.includes("trojan")
    ) {
      return "med";
    }

    return "low";
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoader(true);
        const res = await fetch(`${backend_api}/api/news`);
        const data = await res.json();

        const formatted = data.map((el, index) => ({
          id: index,
          title: el.title,
          url: el.guid || el.link,
          date: new Date(el.pubDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          }),
          sev: getSeverity(el.title),
        }));

        setNewsEntries(formatted);
        setLoader(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  // Animation Controls logic auto-scroll ke liye
  useEffect(() => {
    if (newsEntries.length > 0) {
      controls.start({
        y: ["0%", "-50%"],
        transition: {
          duration: newsEntries.length * 4,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [newsEntries, controls]);

  const [paused, setPaused] = useState(false);

  // Jab hover ho to motion controls ko pause karna aur scroll enable rakhna
  const handleMouseEnter = () => {
    setPaused(true);
    controls.stop(); // Animation ko hold/stop karega jisse manual scroll ho sake
  };

  const handleMouseLeave = () => {
    setPaused(false);
    // Jab mouse bahar jaye to animation dobara wahin se start ho jaye
    controls.start({
      y: ["0%", "-50%"],
      transition: {
        duration: newsEntries.length * 4,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  const scrollingNews =
    newsEntries.length > 5
      ? [...newsEntries, ...newsEntries]
      : newsEntries;

  return loader ? (
    <div id="news" className="py-8 text-center text-emerald-600 animate-pulse">
      Fetching latest cyber intelligence...
    </div>
  ) : (
    <div
      id="news"
      className="relative mx-auto w-full max-w-4xl min-w-0 font-mono text-emerald-400"
      style={{ background: "#050d0f" }}
    >
      <div
        className="relative overflow-hidden rounded-sm border border-emerald-900"
        style={{ boxShadow: "0 0 0 1px #064e3b22" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-emerald-900 bg-black/40 px-4 py-2.5">
          <span>{">"}</span>
          <span className="truncate text-sm tracking-widest">
            latest_cyber_news.log
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-emerald-900 border-b border-emerald-900">
          {[
            { val: newsEntries.length, label: "ALERTS" },
            {
              val: newsEntries.filter((n) => n.sev === "high").length,
              label: "CRITICAL",
            },
            { val: "RSS", label: "TheHackersNews" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-4 gap-1 bg-black/20"
            >
              <span
                className="font-bold text-emerald-300"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "1.5rem",
                }}
              >
                {val}
              </span>
              <span className="text-xs tracking-widest text-emerald-700">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* News */}
        <div className="relative">
          {/* Top Fade */}
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#050d0f] to-transparent z-10 pointer-events-none" />

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#050d0f] to-transparent z-10 pointer-events-none" />

          {/* 
            yahan humne:
            1. 'overflow-y-auto' add kiya manual scroll ke liye.
            2. custom scrollbar hide karne ke liye utility classes add ki hain.
            3. height wrapper check kiya.
          */}
          <div
            ref={containerRef}
            className="h-[355px] overflow-y-auto scrollbar-none"
            style={{
              scrollbarWidth: "none", /* Firefox */
              msOverflowStyle: "none", /* IE/Edge */
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 
              Jab custom manual scroll active ho (paused === true) 
              tab framer-motion ki animation transform offset hat jaani chahiye taki 
              default behavior break na ho. Isliye ternary condition lagai hai animate property me.
            */}
            <motion.div
              animate={paused ? { y: 0 } : controls}
            >
              <ul>
                {scrollingNews.map((entry, i) => (
                  <li
                    key={`${entry.id}-${i}`}
                    onMouseEnter={() => setHovered(entry.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => window.open(entry.url, "_blank")}
                    className={[
                      "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-150 sm:items-center sm:gap-4 sm:px-5",
                      "border-b border-emerald-900/50",
                      hovered === entry.id
                        ? "bg-emerald-950/40"
                        : "bg-transparent",
                    ].join(" ")}
                  >
                    {/* Severity */}
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${sevColor[entry.sev]}`}
                    />

                    {/* Date */}
                    <span className="w-20 shrink-0 text-sm text-emerald-700">
                      [{entry.date}]
                    </span>

                    {/* Title */}
                    <span
                      className={`flex-1 text-sm wrap-break-words transition-colors ${
                        hovered === entry.id
                          ? "text-emerald-300"
                          : "text-emerald-400/80"
                      }`}
                    >
                      {entry.title}
                    </span>

                    {/* Badge */}
                    <span
                      className={`hidden sm:block text-[10px] uppercase px-2 py-1 rounded border ${
                        entry.sev === "high"
                          ? "border-red-500 text-red-400"
                          : entry.sev === "med"
                          ? "border-amber-400 text-amber-300"
                          : "border-emerald-400 text-emerald-300"
                      }`}
                    >
                      {entry.sev}
                    </span>

                    {/* Arrow */}
                    <span
                      className={`transition-all ${
                        hovered === entry.id
                          ? "text-emerald-300 translate-x-1"
                          : "text-emerald-800"
                      }`}
                    >
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {newsEntries.length === 0 && (
          <div className="py-8 text-center text-emerald-600 animate-pulse">
            Fetching latest cyber intelligence...
          </div>
        )}
      </div>
    </div>
  );
}