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
            "https://cryx.vercel.app",
        ],
    }
));

app.use("/api/news",newsRouter);