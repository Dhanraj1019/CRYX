import {createHotContext as __vite__createHotContext} from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/components/News/News.jsx");
const useEffect = __vite__cjsImport0_react["useEffect"];
const useState = __vite__cjsImport0_react["useState"];
const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=3f40820f";
import {motion, useAnimationControls} from "/node_modules/.vite/deps/framer-motion.js?v=3f40820f";
var _jsxFileName = "C:/Users/ooo/Desktop/CRYX/CRYX/frontand/src/components/News/News.jsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3f40820f";
var _s = $RefreshSig$();
const sevColor = {
    high: "bg-red-500",
    med: "bg-amber-400",
    low: "bg-emerald-400"
};
export default function CyberNewsLog() {
    _s();
    const [loader,setLoader] = useState(false);
    const [hovered,setHovered] = useState(null);
    const [newsEntries,setNewsEntries] = useState([]);
    const controls = useAnimationControls();
    // Detect severity from title
    const getSeverity = (title) => {
        const text = title.toLowerCase();
        if (text.includes("critical") || text.includes("ransomware") || text.includes("exploit") || text.includes("0-day") || text.includes("zero-day") || text.includes("vulnerability") || text.includes("breach") || text.includes("cve")) {
            return "high";
        }
        if (text.includes("malware") || text.includes("phishing") || text.includes("attack") || text.includes("hack") || text.includes("trojan")) {
            return "med";
        }
        return "low";
    }
    ;
    useEffect( () => {
        const fetchNews = async () => {
            try {
                setLoader(true);
                const res = await fetch("http://localhost:5000/api/news");
                const data = await res.json();
                const formatted = data.map( (el, index) => ({
                    id: index,
                    title: el.title,
                    url: el.guid || el.link,
                    date: new Date(el.pubDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short"
                    }),
                    sev: getSeverity(el.title)
                }));
                setNewsEntries(formatted);
                setLoader(false);
            } catch (err) {
                console.error(err);
            }
        }
        ;
        fetchNews();
    }
    , []);
    const [paused,setPaused] = useState(false);
    const scrollingNews = newsEntries.length > 5 ? [...newsEntries, ...newsEntries] : newsEntries;
    return loader ? /* @__PURE__ */
    _jsxDEV("div", {
        id: "news",
        className: "py-8 text-center text-emerald-600 animate-pulse",
        children: "Fetching latest cyber intelligence..."
    }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 19
    }, this) : /* @__PURE__ */
    _jsxDEV("div", {
        id: "news",
        className: "relative mx-auto w-full max-w-4xl min-w-0 font-mono text-emerald-400",
        style: {
            background: "#050d0f"
        },
        children: /* @__PURE__ */
        _jsxDEV("div", {
            className: "relative overflow-hidden rounded-sm border border-emerald-900",
            style: {
                boxShadow: "0 0 0 1px #064e3b22"
            },
            children: [/* @__PURE__ */
            _jsxDEV("div", {
                className: "absolute top-0 left-0 right-0 h-px",
                style: {
                    background: "linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)",
                    opacity: .6
                }
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 91,
                columnNumber: 9
            }, this), /* @__PURE__ */
            _jsxDEV("span", {
                className: "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400"
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 100,
                columnNumber: 9
            }, this), /* @__PURE__ */
            _jsxDEV("span", {
                className: "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400"
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 101,
                columnNumber: 9
            }, this), /* @__PURE__ */
            _jsxDEV("div", {
                className: "flex items-center gap-2 border-b border-emerald-900 bg-black/40 px-4 py-2.5",
                children: [/* @__PURE__ */
                _jsxDEV("span", {
                    children: ">"
                }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 105,
                    columnNumber: 11
                }, this), /* @__PURE__ */
                _jsxDEV("span", {
                    className: "truncate text-sm tracking-widest",
                    children: "latest_cyber_news.log"
                }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 106,
                    columnNumber: 11
                }, this)]
            }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 104,
                columnNumber: 9
            }, this), /* @__PURE__ */
            _jsxDEV("div", {
                className: "grid grid-cols-3 divide-x divide-emerald-900 border-b border-emerald-900",
                children: [{
                    val: newsEntries.length,
                    label: "ALERTS"
                }, {
                    val: newsEntries.filter( (n) => n.sev === "high").length,
                    label: "CRITICAL"
                }, {
                    val: "RSS",
                    label: "TheHackersNews"
                }].map( ({val, label}) => /* @__PURE__ */
                _jsxDEV("div", {
                    className: "flex flex-col items-center justify-center py-4 gap-1 bg-black/20",
                    children: [/* @__PURE__ */
                    _jsxDEV("span", {
                        className: "font-bold text-emerald-300",
                        style: {
                            fontFamily: "'Orbitron', monospace",
                            fontSize: "1.5rem"
                        },
                        children: val
                    }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 125,
                        columnNumber: 15
                    }, this), /* @__PURE__ */
                    _jsxDEV("span", {
                        className: "text-xs tracking-widest text-emerald-700",
                        children: label
                    }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 134,
                        columnNumber: 15
                    }, this)]
                }, label, true, {
                    fileName: _jsxFileName,
                    lineNumber: 121,
                    columnNumber: 13
                }, this))
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 112,
                columnNumber: 9
            }, this), /* @__PURE__ */
            _jsxDEV("div", {
                children: [/* @__PURE__ */
                _jsxDEV("div", {
                    className: "absolute top-0 left-0 w-full h-8 bg-liner-to-b from-[#050d0f] to-transparent z-10 pointer-events-none"
                }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 144,
                    columnNumber: 11
                }, this), /* @__PURE__ */
                _jsxDEV("div", {
                    className: "absolute bottom-0 left-0 w-full h-8 bg-liner-to-t from-[#050d0f] to-transparent z-10 pointer-events-none"
                }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 147,
                    columnNumber: 11
                }, this), /* @__PURE__ */
                _jsxDEV("div", {
                    className: "h-88.75 overflow-hidden",
                    onMouseEnter: () => setPaused(true),
                    onMouseLeave: () => setPaused(false),
                    children: /* @__PURE__ */
                    _jsxDEV(motion.div, {
                        animate: {
                            y: "-50%"
                        },
                        transition: {
                            duration: newsEntries.length * 4,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        },
                        style: {
                            animationPlayState: paused ? "paused" : "running"
                        },
                        children: /* @__PURE__ */
                        _jsxDEV("ul", {
                            children: scrollingNews.map( (entry, i) => /* @__PURE__ */
                            _jsxDEV("li", {
                                onMouseEnter: () => setHovered(entry.id),
                                onMouseLeave: () => setHovered(null),
                                onClick: () => window.open(entry.url, "_blank"),
                                className: ["flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-150 sm:items-center sm:gap-4 sm:px-5", "border-b border-emerald-900/50", hovered === entry.id ? "bg-emerald-950/40" : "bg-transparent"].join(" "),
                                children: [/* @__PURE__ */
                                _jsxDEV("span", {
                                    className: `w-2 h-2 rounded-full shrink-0 ${sevColor[entry.sev]}`
                                }, void 0, false, {
                                    fileName: _jsxFileName,
                                    lineNumber: 184,
                                    columnNumber: 21
                                }, this), /* @__PURE__ */
                                _jsxDEV("span", {
                                    className: "w-20 shrink-0 text-sm text-emerald-700",
                                    children: ["[", entry.date, "]"]
                                }, void 0, true, {
                                    fileName: _jsxFileName,
                                    lineNumber: 189,
                                    columnNumber: 21
                                }, this), /* @__PURE__ */
                                _jsxDEV("span", {
                                    className: `flex-1 text-sm wrap-break-words transition-colors ${hovered === entry.id ? "text-emerald-300" : "text-emerald-400/80"}`,
                                    children: entry.title
                                }, void 0, false, {
                                    fileName: _jsxFileName,
                                    lineNumber: 194,
                                    columnNumber: 21
                                }, this), /* @__PURE__ */
                                _jsxDEV("span", {
                                    className: `hidden sm:block text-[10px] uppercase px-2 py-1 rounded border ${entry.sev === "high" ? "border-red-500 text-red-400" : entry.sev === "med" ? "border-amber-400 text-amber-300" : "border-emerald-400 text-emerald-300"}`,
                                    children: entry.sev
                                }, void 0, false, {
                                    fileName: _jsxFileName,
                                    lineNumber: 205,
                                    columnNumber: 21
                                }, this), /* @__PURE__ */
                                _jsxDEV("span", {
                                    className: `transition-all ${hovered === entry.id ? "text-emerald-300 translate-x-1" : "text-emerald-800"}`,
                                    children: "→"
                                }, void 0, false, {
                                    fileName: _jsxFileName,
                                    lineNumber: 218,
                                    columnNumber: 21
                                }, this)]
                            }, `${entry.id}-${i}`, true, {
                                fileName: _jsxFileName,
                                lineNumber: 170,
                                columnNumber: 19
                            }, this))
                        }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 168,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 154,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 149,
                    columnNumber: 11
                }, this)]
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 143,
                columnNumber: 9
            }, this), newsEntries.length === 0 && /* @__PURE__ */
            _jsxDEV("div", {
                className: "py-8 text-center text-emerald-600 animate-pulse",
                children: "Fetching latest cyber intelligence..."
            }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 235,
                columnNumber: 11
            }, this)]
        }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(CyberNewsLog, "v+A73nRCT3C2BcXhYKowuwjLHiQ=", false, function() {
    return [useAnimationControls];
});
_c = CyberNewsLog;
var _c;
$RefreshReg$(_c, "CyberNewsLog");
import*as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import*as __vite_react_currentExports from "/src/components/News/News.jsx";
if (import.meta.hot && !inWebWorker) {
    if (!window.$RefreshReg$) {
        throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong.");
    }

    const currentExports = __vite_react_currentExports;
    queueMicrotask( () => {
        RefreshRuntime.registerExportsForReactRefresh("C:/Users/ooo/Desktop/CRYX/CRYX/frontand/src/components/News/News.jsx", currentExports);
        import.meta.hot.accept( (nextExports) => {
            if (!nextExports)
                return;
            const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/ooo/Desktop/CRYX/CRYX/frontand/src/components/News/News.jsx", currentExports, nextExports);
            if (invalidateMessage)
                import.meta.hot.invalidate(invalidateMessage);
        }
        );
    }
    );
}
function $RefreshReg$(type, id) {
    return RefreshRuntime.register(type, "C:/Users/ooo/Desktop/CRYX/CRYX/frontand/src/components/News/News.jsx" + ' ' + id);
}
function $RefreshSig$() {
    return RefreshRuntime.createSignatureFunctionForTransform();
}