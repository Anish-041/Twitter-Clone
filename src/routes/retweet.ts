import { Request,Response,NextFunction } from 'express';
// const express = require("express");
import express from 'express';
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient()
const router= express.Router();
router.use(express.json());

router.post("/:tweetid" , verifyToken , async(req: Request,res: Response,next: NextFunction) => {
    const {tweetid} = req.params;
    const userId = req.user.id;

    let retweeted = await prisma.retweet.findFirst({
        where : {
            tweetId : Number (tweetid),
            retweetby: userId,
        },
    });

    if (retweeted != null) {
        res.send({alreadyRetweeted : true})
    }

    let result  = await prisma.retweet.create({
        data : {
            tweetId :Number(tweetid),
            retweetby: userId,
        },
    });

    await prisma.tweet.update({
        where: {
            id : Number(tweetid),
        },
        data : {
            retweetCount: {increment: 1}
        }
    })
    res.send({result});
})

router.delete("/:tweetid", verifyToken ,async (req,res,next) => {
    const {tweetid} = req.params
    const userid = req.user.id

    let rewtweet = await prisma.retweet.findFirst({
        where : {
            tweetId : Number(tweetid),
            retweetby : userid,
        }
    });

    if (rewtweet != null) {
        let response = await prisma.retweet.delete({
            where :{
                id : Number(tweetid),
                retweetby : userid
            }
        });
        await prisma.tweet.update({
            where : {
                id: response.tweetId
            },
            data : {
                retweetCount : {decrement: 1}
            }
        })
    }

    res.send("retweet does not exist");
})


export default router;