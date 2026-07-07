import express from 'express'
const app=express()
import cors from 'cors'
import newsRouter from './routers/news.route.js'

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