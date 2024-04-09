import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import express from 'express';
import userRoute from "./routes/user"
import tweetRoute from "./routes/tweet";
import loginRoute from "./routes/login";
import likeRoute from "./routes/like";
import retweetRoute from "./routes/retweet";
import cookieParser from 'cookie-parser';
import CORS from 'cors';
const PORT = 9011;
const app = express();
const path = require("path");
app.set("view engine", "hbs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use(CORS());
app.use("/user",userRoute);
app.use("/tweet",tweetRoute);
app.use("/login",loginRoute);
app.use("/likes",likeRoute);
app.use("/retweet",retweetRoute);


app.get("/" , (req,res) => {
    res.render("home");
})

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})