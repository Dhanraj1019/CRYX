const express = require("express")
const app=express()
const cors = require("cors")
const newsRouter = require("./routers/news.route.js")
const port =5000;
app.listen(port,()=>{
    console.log(`express is listining on port ${port}`);
})

app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "https://cryx-iota.vercel.app",
        ],
    }
));

app.use("/api/news",newsRouter);


//=========== ping render continuesly in every 14 sec ==========

if (process.env.RENDER_EXTERNAL_URL) {
    const KEEP_ALIVE_URL = `${process.env.RENDER_EXTERNAL_URL}/health`;
    const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

    setInterval(async () => {
        try {
            await fetch(KEEP_ALIVE_URL);
        } catch (_) {
            // Non-critical — don't crash if the ping fails
        }
    }, INTERVAL_MS);

    console.log(`[keep-alive] pinging ${KEEP_ALIVE_URL} every 14 min`);
}