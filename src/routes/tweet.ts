import { Request,Response,NextFunction } from 'express';
// const express = require("express");
import express from 'express';
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router = express.Router();
router.use(express.json());

router.post("/", verifyToken , async (req: Request,res: Response,next: NextFunction) => {
    const {title , content} = req.body;
    const userId = req.user.id;

    let result = await prisma.tweet.create({
        data : {
            title,
            content,
            userId
        }
    });
    console.log(result);
    res.send({result:result});
})

router.delete("/:id" , verifyToken , async(req: Request,res: Response,next: NextFunction) => {
    const tweetid = req.params.id;
    const userid = req.user.id;

    let result = await prisma.tweet.delete({
        where : {
            id : Number(tweetid),
            userId : userid
        },
    });

    res.send({result:result});
})

router.get("/",verifyToken, async (req: Request,res: Response,next: NextFunction) => {
    const userId = req.user.id;
    let tweets = await prisma.tweet.findMany({
        where : {
            id: userId,
        },
    });

    res.send({tweets:tweets});
})

export default router;